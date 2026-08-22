# 🎨 MIA BY VIA — MASTER COLOR-CODED TABLE OF CONTENTS & SYSTEM FLOW TREE
## Institutional Architecture, 5 Controlled Planes, & 10 Aggregate State Machines

> **Platform**: MIA by VIA (Miami Municipal Operating System)  
> **Repository**: [`FTHTrading/civic`](https://github.com/FTHTrading/civic)  
> **Operator**: UnyKorn LLC (`unykorn.ai`) · **Domain**: `mia.unykorn.ai`  
> **Licensing**: Dual-Licensed under Apache 2.0 & MIT License  
> **Framework**: Process-G Stage-Gated Operational Control

---

## 🌳 SYSTEM ARCHITECTURE FLOW TREE

```text
MIA by VIA (Municipal Trust Operating System)
│
├── 🟦 DOMAIN 1: CIVIC IDENTITY PLANE (COLOR: #00F2FE - ELECTRIC CYAN)
│   ├── Citizen Nodes (Resident/Enterprise Non-Custodial Wallets)
│   ├── W3C DID Registry & Key Lifecycle (Ed25519 / secp256k1)
│   ├── Verifiable Credential Issuance, Holding, & Presentation
│   └── Node Recovery, Suspension, Revocation, & Key Rotation
│
├── 🟩 DOMAIN 2: GOVERNMENT SERVICE PLANE (COLOR: #10B981 - PALM GREEN)
│   ├── Government Codes (G-codes: Authoritative Service Profiles)
│   ├── Departmental Issuer & Verifier Authority Matrices
│   ├── Permit, License, Benefit, & Case Workflows
│   └── System-of-Record Adapters (County Records, Tax, Zoning)
│
├── 🟪 DOMAIN 3: PRIVACY & CONSENT PLANE (COLOR: #A855F7 - PURPLE NEON)
│   ├── Selective Disclosure & Zero-Knowledge (Groth16 ZKP) Proofs
│   ├── Consent Receipts & Purpose Limitation Controls
│   ├── Delegated, Time-Boxed Access Grants
│   └── Data Minimization & Field-Level Retention Policies
│
├── 🟧 DOMAIN 4: CIVIC VALUE PLANE (COLOR: #F59E0B - SUNSET GOLD)
│   ├── Internal Double-Entry Integer Subledger (Zero Floating-Point Math)
│   ├── Fiat Payment Adapter (ACH / FedNow / Card Settlement)
│   ├── Authorized Stablecoin / Token Adapter (USD1 / USDY)
│   └── Civic Credits, Entitlements, Refunds, & 3-Way Reconciliation
│
└── 🟥 DOMAIN 5: TRUST & OPERATIONS PLANE (COLOR: #FF007A - FLAMINGO PINK)
    ├── Command Gateway & State-Machine Orchestration Kernel
    ├── Policy Decision Point (Allowlists, Velocity, Time Rules)
    ├── Tamper-Evident SHA-256 Hash-Chained Evidence Receipts (.anvil/ops.receipts.jsonl)
    └── Process-G Release Gate Board (G0 Intent ➔ G7 Operate)
```

---

## 🔄 10 CORE AGGREGATE STATE MACHINE FLOW TREES

### 1. `CitizenIdentity` (`#00F2FE`)
```text
DRAFT ──► VERIFICATION_PENDING ──► ACTIVE ──┬──► RESTRICTED (Scope Limited)
                                           ├──► SUSPENDED (Fraud/Audit)
                                           ├──► RECOVERY_PENDING (Lost Key)
                                           └──► CLOSED (Archived)
```

### 2. `CitizenNode` (`#00F2FE`)
```text
UNBOUND ──► BOUND ──► ACTIVE ──┬──► ROTATION_PENDING ──► ACTIVE
                              ├──► RECOVERY_PENDING ──► ACTIVE
                              └──► COMPROMISED ──► REVOKED
```

### 3. `GovernmentCode` (`#10B981`)
```text
DRAFT ──► REVIEW ──► AUTHORIZED ──► ACTIVE ──┬──► PAUSED
                                             └──► RETIRED
```

### 4. `Credential` (`#10B981`)
```text
DRAFT ──► PENDING_ISSUANCE ──► ISSUED ──► ACTIVE ──┬──► SUSPENDED ──► ACTIVE
                                                   ├──► REVOKED
                                                   ├──► EXPIRED
                                                   └──► SUPERSEDED
```

### 5. `ProofRequest` (`#A855F7`)
```text
CREATED ──► PRESENTED ──┬──► VERIFIED
                        ├──► DECLINED
                        ├──► EXPIRED
                        └──► CANCELLED
```

### 6. `AccessGrant` (`#A855F7`)
```text
PROPOSED ──► PENDING_CONSENT ──► ACTIVE ──┬──► EXPIRED
                                           └──► REVOKED
```

### 7. `ServiceCase` (`#10B981`)
```text
DRAFT ──► SUBMITTED ──► UNDER_REVIEW ──┬──► ACTION_REQUIRED ──► SUBMITTED
                                        ├──► APPROVED ──► ISSUED ──► CLOSED
                                        └──► DENIED ──► APPEALED ──► UNDER_REVIEW
```

### 8. `CivicValueAccount` (`#F59E0B`)
```text
OPEN ──► RESTRICTED ──► SUSPENDED ──► CLOSED
```

### 9. `ValueInstruction` (`#F59E0B`)
```text
DRAFT ──► VALIDATING ──► PENDING_APPROVAL ──► AUTHORIZED ──► SUBMITTED ──► SETTLING ──► SETTLED ──┬──► REVERSED
                                                                                                 ├──► FAILED
                                                                                                 └──► DISPUTED
```

### 10. `AuditReceipt` (`#FF007A`)
```text
CREATED ──► SEALED ──► VERIFIED ──► EXCEPTION
```

---

## 📜 OPEN SOURCE LICENSING

MIA by VIA is dual-licensed under the **Apache License, Version 2.0** and the **MIT License**.
See the repository [`LICENSE`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/LICENSE) file for complete text.
