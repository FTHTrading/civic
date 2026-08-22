# ADR 0004: G-Code Smart Contract Governance & Human Appeal Boundaries

- **Status:** Accepted
- **Deciders:** Miami-Dade Municipal Legal Counsel, Office of the Chairman (VIA.miami)
- **Date:** 2026-08-22
- **Technical Story:** Define governance, multi-sig controls, and human escalation boundaries for G-code smart contracts.

## Context and Problem Statement

Smart contracts automate municipal workflows (permit issuance, utility billing, business licensing). However, fully automated immutable code without administrative safeguards can result in locked funds, uncorrectable administrative errors, or denial of due process.

## Decision Drivers

* Preservation of municipal due process and resident appeal rights.
* Prevention of rogue smart contract updates or single-key compromises.
* Compliance with ANVIL Gate Board governance rules.

## Decision Outcome

Chosen Option: **Multi-Sig Governed Deterministic State Machines with Time-Locks & Human Appeal Gates**.

### Governance Specifications
1. **Multi-Signature Authority:** Minimum 3-of-5 authorized municipal signers for G-code policy modifications.
2. **Time-Locked Upgrades:** 72-hour time-lock on non-emergency smart contract updates.
3. **Emergency Pause:** Restricted pause function requiring multi-sig consent in case of security anomalies.
4. **Human Appeal Checkpoint:** Disputed permit rejections or license suspensions escalate to manual municipal review workflows.
