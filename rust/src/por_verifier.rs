use alloy_sol_types::{sol, SolStruct};
use alloy_primitives::{Address, B256, U256, keccak256};
use secp256k1::{Message, PublicKey, Secp256k1, ecdsa::RecoverableSignature};

sol! {
    #[derive(Debug, PartialEq, Eq)]
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
}

pub struct ProofOfReserveVerifier {
    pub domain_separator: B256,
    pub ustib_oracle: Address,
    pub bitgo_custodian: Address,
}

impl ProofOfReserveVerifier {
    pub fn new(chain_id: u64, verifying_contract: Address, ustib_oracle: Address, bitgo_custodian: Address) -> Self {
        let domain_typehash = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)".as_bytes());
        let name_hash = keccak256("ProofOfReserveMintGate".as_bytes());
        let version_hash = keccak256("1.0.0".as_bytes());
        
        let mut encoded = Vec::new();
        encoded.extend_from_slice(domain_typehash.as_slice());
        encoded.extend_from_slice(name_hash.as_slice());
        encoded.extend_from_slice(version_hash.as_slice());
        encoded.extend_from_slice(&U256::from(chain_id).to_be_bytes::<32>());
        encoded.extend_from_slice(&verifying_contract.into_word().as_slice());
        
        let domain_separator = keccak256(&encoded);
        Self { domain_separator, ustib_oracle, bitgo_custodian }
    }

    pub fn compute_digest(&self, attestation: &AssetAttestation) -> B256 {
        let struct_hash = attestation.eip712_hash_struct();
        let mut digest_input = Vec::with_capacity(66);
        digest_input.extend_from_slice(b"\x19\x01");
        digest_input.extend_from_slice(self.domain_separator.as_slice());
        digest_input.extend_from_slice(struct_hash.as_slice());
        keccak256(&digest_input)
    }
}
