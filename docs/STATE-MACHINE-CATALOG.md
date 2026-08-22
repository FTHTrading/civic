# 📑 MIA BY VIA — STATE MACHINE CATALOG
## 10 Core Aggregate State Machines & Validated Transitions

> **Operator**: UnyKorn LLC · **Domain**: `mia.unykorn.ai` · **Framework**: process-G  
> **Core Architecture**: Object + State + Allowed Transition + Evidence Receipt

---

### 1. `CitizenIdentity` Aggregate State Machine
Represents a verified resident or organizational identity profile.

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> VERIFICATION_PENDING: Submit Enrollment
    VERIFICATION_PENDING --> ACTIVE: Verification Approved
    VERIFICATION_PENDING --> DRAFT: Verification Rejected
    ACTIVE --> RESTRICTED: Service Restriction Applied
    RESTRICTED --> ACTIVE: Restriction Lifted
    ACTIVE --> SUSPENDED: Identity Suspended
    SUSPENDED --> ACTIVE: Suspension Lifted
    ACTIVE --> RECOVERY_PENDING: Recovery Initiated
    RECOVERY_PENDING --> ACTIVE: Recovery Approved
    ACTIVE --> CLOSED: Identity Closed
```

---

### 2. `CitizenNode` Aggregate State Machine
Represents a citizen-controlled wallet/DID endpoint and key lifecycle.

```mermaid
stateDiagram-v2
    [*] --> UNBOUND
    UNBOUND --> BOUND: Bind DID & Device
    BOUND --> ACTIVE: Prove Key Control
    ACTIVE --> ROTATION_PENDING: Key Rotation Request
    ROTATION_PENDING --> ACTIVE: Rotation Approved
    ACTIVE --> RECOVERY_PENDING: Report Device Loss
    RECOVERY_PENDING --> ACTIVE: Device Recovery Approved
    ACTIVE --> COMPROMISED: Fraud/Leakage Reported
    COMPROMISED --> REVOKED: Node Revoked
```

---

### 3. `GovernmentCode` Aggregate State Machine
Defines a municipal department's authorized service, issuer, verifier, and policy profile.

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> REVIEW: Submit for Department Review
    REVIEW --> AUTHORIZED: Legislative & Legal Signoff
    AUTHORIZED --> ACTIVE: Signing Ceremony & Launch
    ACTIVE --> PAUSED: Service Paused
    PAUSED --> ACTIVE: Service Resumed
    ACTIVE --> RETIRED: Service Retired
```

---

### 4. `Credential` Aggregate State Machine
Represents a permit, license, registration, or Verifiable Credential.

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> PENDING_ISSUANCE: Candidate Proposed
    PENDING_ISSUANCE --> ISSUED: Signed & Delivered to C-Node
    ISSUED --> ACTIVE: Holder Activated
    ACTIVE --> SUSPENDED: Invalidation Review
    SUSPENDED --> ACTIVE: Review Resolved
    ACTIVE --> REVOKED: Permanently Revoked
    ACTIVE --> EXPIRED: Expiry Policy Met
    ACTIVE --> SUPERSEDED: Newer VC Replaces
```

---

### 5. `ProofRequest` Aggregate State Machine
Governs a selective disclosure or zero-knowledge proof request.

- `CREATED` ➔ `PRESENTED` ➔ `VERIFIED` | `DECLINED` | `EXPIRED` | `CANCELLED`

---

### 6. `AccessGrant` Aggregate State Machine
Governs time-boxed data delegation and consent rules.

- `PROPOSED` ➔ `PENDING_CONSENT` ➔ `ACTIVE` ➔ `EXPIRED` | `REVOKED`

---

### 7. `ServiceCase` Aggregate State Machine
Tracks a municipal permit, application, license, or benefit case.

- `DRAFT` ➔ `SUBMITTED` ➔ `UNDER_REVIEW` ➔ `ACTION_REQUIRED` ➔ `APPROVED` | `DENIED` ➔ `ISSUED` ➔ `CLOSED` | `APPEALED`

---

### 8. `CivicValueAccount` Aggregate State Machine
Tracks civic credits, entitlement value, or subledger accounts.

- `OPEN` ➔ `RESTRICTED` ➔ `SUSPENDED` ➔ `CLOSED`

---

### 9. `ValueInstruction` Aggregate State Machine
Controls payments, disbursements, refunds, or token movements.

- `DRAFT` ➔ `VALIDATING` ➔ `PENDING_APPROVAL` ➔ `AUTHORIZED` ➔ `SUBMITTED` ➔ `SETTLING` ➔ `SETTLED` ➔ `FAILED` | `REVERSED` | `DISPUTED`

---

### 10. `AuditReceipt` Aggregate State Machine
Records immutable operational events in `.anvil/ops.receipts.jsonl`.

- `CREATED` ➔ `SEALED` ➔ `VERIFIED` ➔ `EXCEPTION`
