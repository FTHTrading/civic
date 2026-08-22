# Data Classification & Isolation Matrix — MIA by VIA

| Data Category | Data Elements | Storage Location | On-Chain Exposure | Access Control |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Public Provenance** | Primary document title, issuing authority, SHA-256 hash, fetch date | Public Ledgers / Open Checkbook | Full Content-Addressed Hash | Public Read-Only |
| **Tier 2: Verification State** | Credential status (ACTIVE/EXPIRED), permit type, valid-through date | Encrypted Off-Chain Storage / Sandbox API | Status List Root Commitment | Verifier Request + Consent |
| **Tier 3: Protected PII** | Resident legal name, street address, DOB, tax ID, phone number | Resident Non-Custodial Wallet (C-node) | **STRICTLY ZERO (HEARTH Rule #1)** | Resident Private Key Only |

---

## Data Minimization Rules
1. Verification screens withhold street address and resident identity by default.
2. Verification results expose only approved attributes.
3. No seed phrases, private keys, or actual payment credentials stored or logged.
