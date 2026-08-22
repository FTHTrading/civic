# 📜 ARTIFACT A2 — EIP-712 ATTESTATION STANDARD & VERIFICATION WORKFLOWS

## 1. Overview

To ensure cross-jurisdictional verification without centralized server trust, human and sensor claims are signed using `EIP-712` typed structured data.

---

## 2. Standard Rules & Verification

* **Signer Authority:** Restricted to registered allowlisted signers with explicit key rotation records.
* **Nonce Validation:** Every attestation includes an increasing nonce to prevent replay attacks across state machine instances.
* **Verification CLI:** The `receipts` package provides a standalone verification binary (`cargo run --bin verify-receipts`) that checks SHA-256 chain integrity without network access.
