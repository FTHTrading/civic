// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "./ProofOfReserveMintGate.sol";

contract MockERC3643Token is IERC3643Mintable {
    mapping(address => uint256) public balanceOf;
    uint256 public totalSupply;
    bool public frozen;

    function mint(address to, uint256 amount) external override {
        require(!frozen, "Token frozen");
        balanceOf[to] += amount;
        totalSupply += amount;
    }

    function isFrozen() external view override returns (bool) {
        return frozen;
    }
}

contract ProofOfReserveMintGateTest is Test {
    ProofOfReserveMintGate public gate;
    MockERC3643Token public token;

    uint256 internal ustibPrivateKey = 0xA11CE;
    uint256 internal bitgoPrivateKey = 0xB0B;
    uint256 internal attackerPrivateKey = 0xBAD;

    address internal ustibSigner;
    address internal bitgoSigner;
    address internal attacker;
    address internal recipient = address(0x1337);
    address internal admin = address(this);

    bytes32 public constant ATTESTATION_TYPEHASH = keccak256(
        "AssetAttestation(bytes32 spvId,bytes32 assetClass,uint256 unitCount,uint256 valuationUSD,address recipient,uint256 tokenAmount,uint256 nonce,uint256 expiry)"
    );

    function setUp() public {
        ustibSigner = vm.addr(ustibPrivateKey);
        bitgoSigner = vm.addr(bitgoPrivateKey);
        attacker = vm.addr(attackerPrivateKey);

        token = new MockERC3643Token();
        gate = new ProofOfReserveMintGate(ustibSigner, bitgoSigner, admin);
    }

    function _buildDigest(ProofOfReserveMintGate.AssetAttestation memory attestation) internal view returns (bytes32) {
        bytes32 structHash = keccak256(
            abi.encode(
                ATTESTATION_TYPEHASH,
                attestation.spvId,
                attestation.assetClass,
                attestation.unitCount,
                attestation.valuationUSD,
                attestation.recipient,
                attestation.tokenAmount,
                attestation.nonce,
                attestation.expiry
            )
        );

        return keccak256(
            abi.encodePacked("\x19\x01", gate.DOMAIN_SEPARATOR(), structHash)
        );
    }

    function _sign(uint256 privateKey, bytes32 digest) internal pure returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        return abi.encodePacked(r, s, v);
    }

    function test_SuccessfulDualSignatureMint() public {
        ProofOfReserveMintGate.AssetAttestation memory attestation = ProofOfReserveMintGate.AssetAttestation({
            spvId: keccak256("SPV_MUNICIPAL_001"),
            assetClass: bytes32("GOLD_BULLION"),
            unitCount: 1000,
            valuationUSD: 2_750_000 * 1e18,
            recipient: recipient,
            tokenAmount: 1000 * 1e18,
            nonce: 0,
            expiry: block.timestamp + 3600
        });

        bytes32 digest = _buildDigest(attestation);
        bytes memory sigUstib = _sign(ustibPrivateKey, digest);
        bytes memory sigBitgo = _sign(bitgoPrivateKey, digest);

        gate.executeMintWithPoR(address(token), attestation, sigUstib, sigBitgo);

        assertEq(token.balanceOf(recipient), 1000 * 1e18);
        assertEq(gate.nonces(recipient), 1);
    }

    function test_RevertWhen_AttestationExpired() public {
        ProofOfReserveMintGate.AssetAttestation memory attestation = ProofOfReserveMintGate.AssetAttestation({
            spvId: keccak256("SPV_MUNICIPAL_001"),
            assetClass: bytes32("GOLD_BULLION"),
            unitCount: 1000,
            valuationUSD: 2_750_000 * 1e18,
            recipient: recipient,
            tokenAmount: 1000 * 1e18,
            nonce: 0,
            expiry: block.timestamp - 1 // Expired
        });

        bytes32 digest = _buildDigest(attestation);
        bytes memory sigUstib = _sign(ustibPrivateKey, digest);
        bytes memory sigBitgo = _sign(bitgoPrivateKey, digest);

        vm.expectRevert("PoR: Attestation expired");
        gate.executeMintWithPoR(address(token), attestation, sigUstib, sigBitgo);
    }

    function test_RevertWhen_InvalidUstibSignature() public {
        ProofOfReserveMintGate.AssetAttestation memory attestation = ProofOfReserveMintGate.AssetAttestation({
            spvId: keccak256("SPV_MUNICIPAL_001"),
            assetClass: bytes32("GOLD_BULLION"),
            unitCount: 1000,
            valuationUSD: 2_750_000 * 1e18,
            recipient: recipient,
            tokenAmount: 1000 * 1e18,
            nonce: 0,
            expiry: block.timestamp + 3600
        });

        bytes32 digest = _buildDigest(attestation);
        bytes memory sigAttacker = _sign(attackerPrivateKey, digest); // Fake USTIB
        bytes memory sigBitgo = _sign(bitgoPrivateKey, digest);

        vm.expectRevert("PoR: Invalid USTIB oracle signature");
        gate.executeMintWithPoR(address(token), attestation, sigAttacker, sigBitgo);
    }

    function test_RevertWhen_InvalidBitGoSignature() public {
        ProofOfReserveMintGate.AssetAttestation memory attestation = ProofOfReserveMintGate.AssetAttestation({
            spvId: keccak256("SPV_MUNICIPAL_001"),
            assetClass: bytes32("GOLD_BULLION"),
            unitCount: 1000,
            valuationUSD: 2_750_000 * 1e18,
            recipient: recipient,
            tokenAmount: 1000 * 1e18,
            nonce: 0,
            expiry: block.timestamp + 3600
        });

        bytes32 digest = _buildDigest(attestation);
        bytes memory sigUstib = _sign(ustibPrivateKey, digest);
        bytes memory sigAttacker = _sign(attackerPrivateKey, digest); // Fake BitGo

        vm.expectRevert("PoR: Invalid BitGo custody signature");
        gate.executeMintWithPoR(address(token), attestation, sigUstib, sigAttacker);
    }

    function test_RevertWhen_ReplayAttackWithSameNonce() public {
        ProofOfReserveMintGate.AssetAttestation memory attestation = ProofOfReserveMintGate.AssetAttestation({
            spvId: keccak256("SPV_MUNICIPAL_001"),
            assetClass: bytes32("GOLD_BULLION"),
            unitCount: 1000,
            valuationUSD: 2_750_000 * 1e18,
            recipient: recipient,
            tokenAmount: 1000 * 1e18,
            nonce: 0,
            expiry: block.timestamp + 3600
        });

        bytes32 digest = _buildDigest(attestation);
        bytes memory sigUstib = _sign(ustibPrivateKey, digest);
        bytes memory sigBitgo = _sign(bitgoPrivateKey, digest);

        // First execution succeeds
        gate.executeMintWithPoR(address(token), attestation, sigUstib, sigBitgo);

        // Replay attempt fails on nonce mismatch
        vm.expectRevert("PoR: Invalid nonce");
        gate.executeMintWithPoR(address(token), attestation, sigUstib, sigBitgo);
    }
}
```
