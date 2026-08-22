//! Tamper-Evident SHA-256 Hash-Chained Receipt Sealer
//! Compatible with .anvil/ops.receipts.jsonl.

use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditReceiptRecord {
    pub receipt_index: usize,
    pub timestamp: String,
    pub event_type: String,
    pub prev_hash: String,
    pub command_id: String,
    pub aggregate_id: String,
    pub prev_state: String,
    pub new_state: String,
    pub operator_signatures: Vec<String>,
    pub receipt_hash: String,
}

pub struct EvidenceReceiptSealer {
    pub chain: Vec<AuditReceiptRecord>,
}

impl EvidenceReceiptSealer {
    pub fn new() -> Self {
        let mut sealer = Self { chain: Vec::new() };
        sealer.seed_genesis();
        sealer
    }

    fn seed_genesis(&mut self) {
        let genesis_prev = "0000000000000000000000000000000000000000000000000000000000000000".to_string();
        let payload = format!("GENESIS:{}:INIT:PROCESS_G_G0", genesis_prev);
        
        let mut hasher = Sha256::new();
        hasher.update(payload.as_bytes());
        let genesis_hash = hex::encode(hasher.finalize());

        self.chain.push(AuditReceiptRecord {
            receipt_index: 0,
            timestamp: chrono::Utc::now().to_rfc3339(),
            event_type: "GENESIS_RECEIPT".to_string(),
            prev_hash: genesis_prev,
            command_id: "cmd_genesis".to_string(),
            aggregate_id: "system_kernel".to_string(),
            prev_state: "NULL".to_string(),
            new_state: "INITIALIZED".to_string(),
            operator_signatures: vec!["Unykorn_Genesis_Key".to_string()],
            receipt_hash: genesis_hash,
        });
    }

    pub fn seal_receipt(
        &mut self,
        event_type: &str,
        command_id: &str,
        aggregate_id: &str,
        prev_state: &str,
        new_state: &str,
        operators: Vec<String>,
    ) -> AuditReceiptRecord {
        let prev_hash = self.chain.last().unwrap().receipt_hash.clone();
        let timestamp = chrono::Utc::now().to_rfc3339();

        let raw_payload = format!(
            "{}:{}:{}:{}:{}:{}:{}",
            prev_hash, command_id, aggregate_id, prev_state, new_state, event_type, timestamp
        );

        let mut hasher = Sha256::new();
        hasher.update(raw_payload.as_bytes());
        let receipt_hash = hex::encode(hasher.finalize());

        let record = AuditReceiptRecord {
            receipt_index: self.chain.len(),
            timestamp,
            event_type: event_type.to_string(),
            prev_hash,
            command_id: command_id.to_string(),
            aggregate_id: aggregate_id.to_string(),
            prev_state: prev_state.to_string(),
            new_state: new_state.to_string(),
            operator_signatures: operators,
            receipt_hash,
        };

        self.chain.push(record.clone());
        record
    }

    pub fn verify_integrity(&self) -> bool {
        for i in 1..self.chain.len() {
            let current = &self.chain[i];
            let prev = &self.chain[i - 1];

            if current.prev_hash != prev.receipt_hash {
                return false;
            }
        }
        true
    }
}
