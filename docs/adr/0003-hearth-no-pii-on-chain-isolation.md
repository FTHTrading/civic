# ADR 0003: HEARTH Compliance — No-PII On-Chain Isolation Architecture

- **Status:** Accepted
- **Deciders:** UnyKorn Security Council, VIA.miami Privacy Officer
- **Date:** 2026-08-22
- **Technical Story:** Enforce strict HEARTH runtime rules prohibiting personally identifiable information (PII) on public ledgers.

## Context and Problem Statement

Public ledgers are permanent and immutable. Writing resident names, dates of birth, physical addresses, or tax IDs to a public blockchain violates privacy laws (GDPR, CCPA) and the UnyKorn HEARTH runtime constitution (`07-HEARTH-runtime.md`).

## Decision Drivers

* Absolute compliance with HEARTH Rule #1: Zero PII on public ledgers.
* Enable resident selective disclosure via Zero-Knowledge Proofs (ZKPs).
* Support off-chain encrypted data vaults with content-addressed SHA-256 state anchors.

## Decision Outcome

Chosen Option: **Hybrid On-Chain Proof / Off-Chain Vault Model**.

### Data Storage Boundaries
1. **On-Chain (Ledger Layer):** SHA-256 hashes of primary instruments, EIP-712 attestation signatures, G-code status commitments, and credential revocation roots.
2. **Off-Chain (C-Node & Municipal Vaults):** Encrypted Verifiable Credentials, resident demographic data, inspection media, and detailed service records.

### Zero-Knowledge Selective Disclosure
C-nodes present zk-SNARK cryptographic proofs to verifiers (e.g. proof of District 3 residency or age >= 21) without revealing underlying PII.
