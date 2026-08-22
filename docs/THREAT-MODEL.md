# 🔒 MIA BY VIA — THREAT MODEL & COMPROMISE RECOVERY

## Threat Matrix & Failure Modes

1. **Lost Device / Key Compromise**:
   - *Mitigation*: Citizen Node enters `RECOVERY_PENDING`. High-value actions fail closed until 2-of-3 social/institutional recovery completes and old keys are revoked.
2. **Malicious G-Code Issuance**:
   - *Mitigation*: G-Code transition requires `AUTHORIZE_GCODE` by Governance Authority. Key rotation ceremonies emit hash-chained receipts.
3. **Replay & Stale Proof Attacks**:
   - *Mitigation*: Proof requests contain short-lived nonces, short expiry windows (`expires_at`), and purpose limitation claims.
4. **Data Leakage in Verifier Logs**:
   - *Mitigation*: Zero-Knowledge proofs disclose zero PII (`disclosed_pii: false`). Verifiers receive boolean claims only.
