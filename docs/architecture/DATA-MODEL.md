# 🗄️ MIA BY VIA — DATA MODEL & ZERO-FLOAT ACCOUNTING

## 1. Zero-Float Accounting Rule

All financial and civic credit values are stored exclusively in integer minor units (`u64` / `BIGINT` representing cents, satoshis, drops, or base token units). Floating-point math is prohibited across all backend services and ledger postings.

---

## 2. Subledger Schema

```sql
CREATE TABLE ledger_journals (
    journal_id VARCHAR(64) PRIMARY KEY,
    transaction_intent_id VARCHAR(64) NOT NULL,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total_minor_units BIGINT NOT NULL,
    currency_code VARCHAR(16) NOT NULL,
    receipt_hash VARCHAR(64) NOT NULL
);

CREATE TABLE ledger_postings (
    posting_id BIGSERIAL PRIMARY KEY,
    journal_id VARCHAR(64) REFERENCES ledger_journals(journal_id),
    account_id VARCHAR(64) NOT NULL,
    direction VARCHAR(10) CHECK (direction IN ('DEBIT', 'CREDIT')),
    minor_units BIGINT NOT NULL
);
```
