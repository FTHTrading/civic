// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * @title ProofOfReserveMintGate
 * @notice Dual-Custody Proof-of-Reserve (PoR) Minting Authority for MIA by VIA and Real-World Assets.
 * @dev Enforces dual-signature EIP-712 attestation from both USTIB (Physical/Fiduciary Oracle)
 *      and BitGo Bank & Trust (Digital Key Custodian) prior to authorizing token minting.
 *
 * Requirements:
 * 1. Integer Money Math (ANVIL Gate G1): Zero floating point operations; base units only.
 * 2. Replay Defense (ANVIL Gate G2): Sequential nonce tracking per recipient.
 * 3. Dual Oracle Quorum (ANVIL Gate G3): Simultaneous validation of sigma_USTIB and sigma_BitGo.
 * 4. Zero-PII (ANVIL Gate G4): Attestation payload references SPV IDs and cryptographic addresses only.
 */

interface IERC3643Mintable {
    function mint(address to, uint256 amount) external;
    function isWhitelisted(address user) external view returns (bool);
}

contract ProofOfReserveMintGate {
    // --- Constant Domain Definitions ---
    string public constant NAME = "ProofOfReserveMintGate";
    string public constant VERSION = "1.0.0";
    
    // EIP-712 Typehashes
    bytes32 public constant EIP712_DOMAIN_TYPEHASH = keccak256(
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );

    bytes32 public constant ATTESTATION_TYPEHASH = keccak256(
        "AssetAttestation(string spvId,string assetClass,uint256 unitCount,uint256 valuationUSD,address recipient,uint256 tokenAmount,uint256 nonce,uint256 expiry)"
    );

    // --- State Variables ---
    address public immutable ustibOracleSigner;
    address public immutable bitgoCustodianSigner;
    address public immutable tokenContract;
    address public owner;

    mapping(address => uint256) public nonces;
    mapping(bytes32 => bool) public executedAttestations;

    // --- Structs ---
    struct AssetAttestation {
        string spvId;
        string assetClass;
        uint256 unitCount;
        uint256 valuationUSD;
        address recipient;
        uint256 tokenAmount;
        uint256 nonce;
        uint256 expiry;
    }

    // --- Events ---
    event ProofOfReserveMintExecuted(
        string indexed spvId,
        address indexed recipient,
        uint256 tokenAmount,
        uint256 valuationUSD,
        uint256 nonce,
        bytes32 attestationHash
    );

    event SignerUpdated(string indexed role, address indexed oldSigner, address indexed newSigner);

    // --- Custom Errors ---
    error InvalidDomain();
    error SignatureExpired(uint256 currentTimestamp, uint256 expiry);
    error InvalidNonce(uint256 expectedNonce, uint256 actualNonce);
    error InvalidUSTIBSignature();
    error InvalidBitGoSignature();
    error AttestationAlreadyExecuted(bytes32 attestationHash);
    error RecipientNotWhitelisted(address recipient);
    error Unauthorized();
    error ZeroAddress();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor(
        address _ustibOracleSigner,
        address _bitgoCustodianSigner,
        address _tokenContract
    ) {
        if (_ustibOracleSigner == address(0) || _bitgoCustodianSigner == address(0) || _tokenContract == address(0)) {
            revert ZeroAddress();
        }
        ustibOracleSigner = _ustibOracleSigner;
        bitgoCustodianSigner = _bitgoCustodianSigner;
        tokenContract = _tokenContract;
        owner = msg.sender;
    }

    /**
     * @notice Computes the EIP-712 Domain Separator
     */
    function getDomainSeparator() public view returns (bytes32) {
        return keccak256(
            abi.encode(
                EIP712_DOMAIN_TYPEHASH,
                keccak256(bytes(NAME)),
                keccak256(bytes(VERSION)),
                block.chainid,
                address(this)
            )
        );
    }

    /**
     * @notice Hashes an AssetAttestation struct according to EIP-712 rules
     */
    function hashAttestation(AssetAttestation calldata attestation) public pure returns (bytes32) {
        return keccak256(
            abi.encode(
                ATTESTATION_TYPEHASH,
                keccak256(bytes(attestation.spvId)),
                keccak256(bytes(attestation.assetClass)),
                attestation.unitCount,
                attestation.valuationUSD,
                attestation.recipient,
                attestation.tokenAmount,
                attestation.nonce,
                attestation.expiry
            )
        );
    }

    /**
     * @notice Validates dual signatures and executes minting
     * @param attestation The attestation data struct
     * @param sigUSTIB The cryptographic signature from USTIB
     * @param sigBitGo The cryptographic signature from BitGo
     */
    function executeMintWithPoR(
        AssetAttestation calldata attestation,
        bytes calldata sigUSTIB,
        bytes calldata sigBitGo
    ) external {
        // 1. Expiry Check
        if (block.timestamp > attestation.expiry) {
            revert SignatureExpired(block.timestamp, attestation.expiry);
        }

        // 2. Nonce Check
        uint256 expectedNonce = nonces[attestation.recipient];
        if (attestation.nonce != expectedNonce) {
            revert InvalidNonce(expectedNonce, attestation.nonce);
        }

        // 3. Compute Digest
        bytes32 structHash = hashAttestation(attestation);
        bytes32 digest = keccak256(
            abi.encodePacked("\x19\x01", getDomainSeparator(), structHash)
        );

        if (executedAttestations[digest]) {
            revert AttestationAlreadyExecuted(digest);
        }

        // 4. Recover Signers
        address recoveredUSTIB = recoverSigner(digest, sigUSTIB);
        if (recoveredUSTIB != ustibOracleSigner) {
            revert InvalidUSTIBSignature();
        }

        address recoveredBitGo = recoverSigner(digest, sigBitGo);
        if (recoveredBitGo != bitgoCustodianSigner) {
            revert InvalidBitGoSignature();
        }

        // 5. Whitelist Compliance Check
        if (!IERC3643Mintable(tokenContract).isWhitelisted(attestation.recipient)) {
            revert RecipientNotWhitelisted(attestation.recipient);
        }

        // 6. State Updates (Anti-Replay & CEI Pattern)
        nonces[attestation.recipient] = expectedNonce + 1;
        executedAttestations[digest] = true;

        // 7. Execute Mint
        IERC3643Mintable(tokenContract).mint(attestation.recipient, attestation.tokenAmount);

        emit ProofOfReserveMintExecuted(
            attestation.spvId,
            attestation.recipient,
            attestation.tokenAmount,
            attestation.valuationUSD,
            attestation.nonce,
            digest
        );
    }

    function recoverSigner(bytes32 digest, bytes calldata sig) internal pure returns (address) {
        if (sig.length != 65) return address(0);
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := calldataload(sig.offset)
            s := calldataload(add(sig.offset, 32))
            v := byte(0, calldataload(add(sig.offset, 64)))
        }
        if (v < 27) v += 27;
        if (v != 27 && v != 28) return address(0);
        return ecrecover(digest, v, r, s);
    }
}
