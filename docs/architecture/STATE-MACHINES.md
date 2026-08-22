# 📑 MIA BY VIA — AGGREGATE STATE MACHINES SPECIFICATION

MIA uses ten independent state machines. Every transition requires an explicit command, actor verification, policy check, and receipt generation.

```text
[Command] → [Policy Check] → [State Orchestrator] → [Event Emission] → [Hash-Chained Receipt]
```

---

## Aggregate Lifecycle Summary

* **`CitizenIdentity`:** `DRAFT` ➔ `VERIFICATION_PENDING` ➔ `ACTIVE` ➔ `RESTRICTED` | `SUSPENDED` | `RECOVERY_PENDING` ➔ `CLOSED`.
* **`CitizenNode`:** `UNBOUND` ➔ `BOUND` ➔ `ACTIVE` ➔ `ROTATION_PENDING` ➔ `RECOVERY_PENDING` ➔ `COMPROMISED` ➔ `REVOKED`.
* **`GovernmentCode`:** `DRAFT` ➔ `REVIEW` ➔ `AUTHORIZED` ➔ `ACTIVE` ➔ `PAUSED` ➔ `RETIRED`.
* **`Credential`:** `DRAFT` ➔ `PENDING_ISSUANCE` ➔ `ISSUED` ➔ `ACTIVE` ➔ `SUSPENDED` ➔ `REVOKED` ➔ `EXPIRED` ➔ `SUPERSEDED`.
* **`ProofRequest`:** `CREATED` ➔ `PRESENTED` ➔ `VERIFIED` | `DECLINED` | `EXPIRED` | `CANCELLED`.
* **`AccessGrant`:** `PROPOSED` ➔ `PENDING_CONSENT` ➔ `ACTIVE` ➔ `EXPIRED` | `REVOKED`.
* **`ServiceCase`:** `DRAFT` ➔ `SUBMITTED` ➔ `UNDER_REVIEW` ➔ `ACTION_REQUIRED` ➔ `APPROVED` | `DENIED` ➔ `ISSUED` ➔ `CLOSED` ➔ `APPEALED`.
* **`CivicValueAccount`:** `OPEN` ➔ `RESTRICTED` ➔ `SUSPENDED` ➔ `CLOSED`.
* **`ValueInstruction`:** `DRAFT` ➔ `VALIDATING` ➔ `PENDING_APPROVAL` ➔ `AUTHORIZED` ➔ `SUBMITTED` ➔ `SETTLING` ➔ `SETTLED` ➔ `FAILED` | `REVERSED` | `DISPUTED`.
* **`AuditReceipt`:** `CREATED` ➔ `SEALED` ➔ `VERIFIED` ➔ `EXCEPTION`.
