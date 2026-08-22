# 🏛️ MIA BY VIA — TECHNICAL BUILD SPECIFICATION & ARCHITECTURE

## 1. Overview & Objectives

MIA by VIA is a state-governed municipal trust operating system for Miami-Dade County. It provides tamper-evident transparency, self-sovereign identity management (SSI), and cryptographic verification across five controlled operational planes.

---

## 2. The Five Controlled Planes

* **Civic Identity Plane:** Manages Citizen Nodes (resident/enterprise non-custodial wallets) and W3C Decentralized Identifiers (DIDs).
* **Government Service Plane:** Governs Government Codes (G-codes) representing municipal departments, services, and authorized permit workflows.
* **Privacy & Consent Plane:** Enforces selective disclosure, Zero-Knowledge Proofs (ZKPs), and short-lived consent grants without exposing PII.
* **Civic Value Plane:** Operates an append-only double-entry integer subledger for minor-unit credit and payment accounting.
* **Trust & Operations Plane:** Orchestrates the policy-as-code decision engine, state transitions, and hash-chained operational receipts.

---

## 3. Design Laws & Invariants

* **Law 0 (No County Dependencies):** Tier 1 operates entirely on public data without requiring county budget lines, proprietary API keys, or direct database access.
* **Law 1 (One-Way Wall):** The edge never writes directly to municipal origin systems; write operations are strictly mediated through approved adapters.
* **Law 2 (Summary Law):** Summaries, indexes, and press releases are rejected as supporting instruments; every claim must point to a primary verifiable instrument.
* **Law 3 (Verifiability Without Trust):** All attested claims must publish with signed cryptographic payloads (`EIP-712` / `secp256k1`).
