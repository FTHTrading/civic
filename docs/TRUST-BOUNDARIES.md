# 🛡️ MIA BY VIA — TRUST BOUNDARIES & DATA CLASSIFICATION

## Data Placement Matrix

| Data Type | Authorized Storage Location | Never Do |
| :--- | :--- | :--- |
| **Resident PII** | Encrypted database with field-level KMS protection | Never put on public blockchains, IPFS, unencrypted logs, or receipts |
| **Verifiable Credential** | Holder-controlled encrypted storage / C-Node vault | Never put full credentials or reusable PII on-chain |
| **DID Document / Keys** | DID Registry & verifiable public directory | Never expose private keys or recovery seeds |
| **Credential Status** | Status registry bitstring / revocation list endpoint | Never publish reason codes or sensitive case details publicly |
| **Audit Receipts** | Append-only `.anvil/ops.receipts.jsonl` hash chain | Never treat a single blockchain hash alone as a complete audit trail |
| **Civic Financial Activity** | Double-entry integer subledger & bank/custody feeds | Never use unconfirmed chain balances as primary accounting system |
