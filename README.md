# 🏛️ Civic Stack — Identity + Verification

Codename: **CIVIC / OTM** · Operator: **UnyKorn LLC** · Platform: `mia.unykorn.ai`

This repository hosts two coordinated civic infrastructure layers:

- **`mia-via/`** — Municipal credentials, resident wallets (C-nodes), verifier UI, agency issuance & audit (G-codes).
- **`new-money/`** — Public-data transparency, attested numbers, provenance ledger, blocking linter.

MIA issues and verifies **who/what** is eligible.  
OPEN TRUST ensures **every published number** tied to those identities is sourced, attested, and independently verifiable.

---

## 🎨 Master Color-Coded Architecture Index

| Color Badge | Color Hex | Architectural Domain | Core Components Covered |
| :--- | :--- | :--- | :--- |
| 🩵 **NEON CYAN** | `#00F2FE` | **L0–L1 Core Foundations** | W3C DIDs, SSI Engine, EIP-712 Cryptography |
| 🩷 **NEON FLAMINGO** | `#FF007A` | **G-Codes (Government Codes)** | Municipal Smart Contracts & Service Endpoints |
| 💛 **SUNSET GOLD** | `#FFAB00` | **C-Nodes (Citizen Nodes)** | Resident Wallet, Soulbound VC NFTs, ZKP SNARK Proofs |
| 💚 **PALM EMERALD** | `#10B981` | **The Three Pillars** | IDs (SSI), Data (Receipts), Dollars (Payment Rails) |
| 💜 **BOUGAINVILLEA** | `#A835C4` | **Open Trust Artifacts (A1–A3)** | Open Checkbook A1, Attestation A2, Blocking Linter A3 |
| 🧡 **CORAL AMBER** | `#FF6A3D` | **ANVIL Gate Board** | Exit Gates G0–G7 & Human Blocking Gates G-M01–G-M14 |
| 🛡️ **BISCAYNE OCEAN** | `#060C1B` | **Legal Perimeter & Design Laws** | Design Laws 0–3, One-Way Wall, Zero PII Isolation |

---

## 📚 Table of Contents Summary

- **Section 1: Executive Summary & Core Foundations** (`#00F2FE`)
- **Section 2: Government Codes (G-codes) Directory** (`#FF007A`)
- **Section 3: Citizen Nodes (C-nodes) Wallet & ZKP** (`#FFAB00`)
- **Section 4: The Three Pillars — IDs, Data, and Dollars** (`#10B981`)
- **Section 5: Open Trust (OTM) Civic Artifacts (A1, A2, A3)** (`#A835C4`)
- **Section 6: ANVIL Gate Board & Governance** (`#FF6A3D`)
- **Section 7: Legal Perimeter & Design Laws** (`#060C1B`)

See full index details in [`TABLE_OF_CONTENTS.md`](./TABLE_OF_CONTENTS.md).

---

## ⚖️ Design Laws

0. 🏛️ **No County Dependency**: Tier 1 runs on public data only. Zero county signature, budget line, or vendor number required.
1. 🧱 **One-Way Wall**: Public edge never writes to internal government origin databases.
2. 📄 **Summary Law**: Summaries, briefings, or press releases can never serve as primary supporting instruments.
3. 🔍 **Verifiability Without Trust**: Every published number publishes with its EIP-712 signed payload.

---

## ⚡ Quickstart

```bash
git clone https://github.com/FTHTrading/civic.git
cd civic
npm install
npm run dev
```

Operator: UnyKorn LLC · Engineering control layer only · No custody, no securities, no county dependency.
