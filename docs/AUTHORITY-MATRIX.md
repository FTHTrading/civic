# ⚖️ MIA BY VIA — FOUR-PARTY AUTHORITY MATRIX & SEPARATION OF DUTIES

## 1. Four-Party Actor Model

| Actor | May Do | Cannot Do Alone |
| :--- | :--- | :--- |
| **Citizen** | Control C-Node, accept VCs, grant/revoke consent, request recovery | Rewrite municipal records, issue official credentials, override revocation |
| **G-Code Owner** | Operate departmental workflow, request VC issuance/suspension, verify proofs | Alter foundational policy, invoke another department's authority |
| **Platform Operator** | Maintain infrastructure, monitor health, run reconciliations, rotate infra keys | Access citizen private keys, create civic authority, alter official decisions |
| **Governance Authority** | Approve G-codes, authorize major policy changes, execute emergency pauses | Bypass evidence logging, bypass legal retention, skip review requirements |

---

## 2. Separation of Duties Enforcement Rule

```text
Requestor ≠ Reviewer ≠ Approver ≠ Executor ≠ Auditor
```

Every high-impact state transition requires distinct authenticated key identities across all 5 operational roles.
