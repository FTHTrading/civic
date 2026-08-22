# ADR 0001: Technical Alignment & UnyKorn Constitution Mapping

- **Status:** Accepted
- **Deciders:** Office of the Chairman (VIA.miami), UnyKorn LLC Engineering Council
- **Date:** 2026-08-22
- **Technical Story:** Align MIA by VIA municipal architecture with the UnyKorn Build Constitution (`FTHTrading/process`).

## Context and Problem Statement

Miami-Dade County requires a decentralized municipal identification and service platform (MIA by VIA) that handles resident digital identity, Verifiable Credentials, municipal services (G-codes), and multi-asset payment rails without compromising runtime privacy or engineering auditability. We need to formally map MIA primitives onto the UnyKorn Build Constitution layers: HEARTH (runtime limits), FORGE (7-phase build process), and ANVIL (audit & verification bar).

## Decision Drivers

* Need for zero personally identifiable information (PII) on public ledgers (HEARTH compliance).
* Requirement for deterministic G-code smart contracts with multi-sig governance and human appeal checkpoints.
* Standardized Nygard-format Architecture Decision Records (ADRs) for all architectural choices.
* Strict ANVIL Gate Board exit criteria (G0–G7 and G-M01–G-M14 blocking gates).

## Considered Options

1. Ad-hoc custom architecture without constitutional mapping.
2. UnyKorn Build Constitution Alignment (HEARTH + FORGE + ANVIL).

## Decision Outcome

Chosen Option: **Option 2 (UnyKorn Build Constitution Alignment)**.

### Architectural Mapping Matrix

| MIA Architecture Pillar | Constitution / Stack Layer | Operational & Compliance Role |
| :--- | :--- | :--- |
| **Pillar 1: IDs (DIDs / VCs)** | `standards/CONVENTIONS.md` & NIST/W3C Specs | Cryptographic assertion of identity, credential revocation registries, and selective zero-knowledge disclosure. |
| **Pillar 2: Data (Off-Chain / Receipts)** | `constitution/07-HEARTH-runtime.md` | Enforces zero PII on public ledgers; anchors tamper-evident state root hashes while isolating operational data. |
| **Pillar 3: Dollars (Utility & Settlement)** | `standards/STACK.md` (Custody & Settlement Rails) | Non-speculative, purpose-bound smart contract execution for payments, fee reconciliation, and municipal credits. |
| **G-Code Smart Contracts** | `templates/ADR-TEMPLATE.md` & `ANVIL` Charter | Deterministic state machines with multi-sig governance, time-locks, and human escalation/appeal checkpoints. |
| **C-Node Client Vaults** | `templates/project/` Scaffold & FIDO2/WebAuthn | Non-custodial, resident-controlled key storage with assisted social recovery mechanisms. |

### Positive Consequences

* **HEARTH Compliance:** Zero PII on-chain; only SHA-256 state roots and EIP-712 attestation hashes stored on public ledgers.
* **ANVIL Compliance:** 100% test coverage and blocking gate board (G0–G7) enforced before production promotion.
* **FORGE Alignment:** Clear 7-phase build lifecycle with Nygard ADR governance.

### Negative Consequences

* Higher upfront discipline required for ADR creation and cryptographic verification schemas.
