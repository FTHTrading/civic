//! Double-Entry Integer Subledger Engine
//! Enforces strict integer minor unit accounting (cents, drops, wei, sats). Zero floating point math allowed.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum PostingType {
    Debit,
    Credit,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JournalPosting {
    pub account: String,
    pub posting_type: PostingType,
    pub amount_minor_units: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DoubleEntryJournalEntry {
    pub journal_id: String,
    pub description: String,
    pub reference_id: String,
    pub asset_symbol: String,
    pub postings: Vec<JournalPosting>,
    pub timestamp: String,
}

impl DoubleEntryJournalEntry {
    pub fn new(description: &str, reference_id: &str, asset_symbol: &str) -> Self {
        Self {
            journal_id: format!("jnl_{}", &reference_id[..std::cmp::min(8, reference_id.len())]),
            description: description.to_string(),
            reference_id: reference_id.to_string(),
            asset_symbol: asset_symbol.to_string(),
            postings: Vec::new(),
            timestamp: chrono::Utc::now().to_rfc3339(),
        }
    }

    pub fn add_debit(&mut self, account: &str, amount_minor_units: u64) {
        self.postings.push(JournalPosting {
            account: account.to_string(),
            posting_type: PostingType::Debit,
            amount_minor_units,
        });
    }

    pub fn add_credit(&mut self, account: &str, amount_minor_units: u64) {
        self.postings.push(JournalPosting {
            account: account.to_string(),
            posting_type: PostingType::Credit,
            amount_minor_units,
        });
    }

    pub fn validate_balanced(&self) -> Result<u64, String> {
        let total_debit: u64 = self
            .postings
            .iter()
            .filter(|p| matches!(p.posting_type, PostingType::Debit))
            .map(|p| p.amount_minor_units)
            .sum();

        let total_credit: u64 = self
            .postings
            .iter()
            .filter(|p| matches!(p.posting_type, PostingType::Credit))
            .map(|p| p.amount_minor_units)
            .sum();

        if total_debit != total_credit {
            return Err(format!(
                "Unbalanced Subledger Entry! Debits ({}) != Credits ({})",
                total_debit, total_credit
            ));
        }

        Ok(total_debit)
    }
}

pub struct IntegerSubledger {
    pub journal: Vec<DoubleEntryJournalEntry>,
}

impl IntegerSubledger {
    pub fn new() -> Self {
        Self {
            journal: Vec::new(),
        }
    }

    pub fn post_entry(&mut self, entry: DoubleEntryJournalEntry) -> Result<&DoubleEntryJournalEntry, String> {
        entry.validate_balanced()?;
        self.journal.push(entry);
        Ok(self.journal.last().unwrap())
    }
}
