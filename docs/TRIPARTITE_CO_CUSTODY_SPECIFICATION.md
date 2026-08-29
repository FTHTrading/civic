# Tripartite Co-Custody Product Specification & Institutional Brief
**Entity / Operator:** UnyKorn LLC (Non-Custodial Orchestrator)  
**Banking & Fiduciary Partner:** U.S. Trust International Bank / USVI Charter (USTIB)  
**Digital Key Custodian:** BitGo Bank & Trust, N.A. (OCC National Trust Charter)  
**Framework Version:** 2026.1-INSTITUTIONAL  
**Security & Gate Enforcement:** ANVIL G0–G7 / G-M01–G-M14 · ERC-3643 / ERC-1400  

---

## 1. Executive Summary & Dual-Custody Paradigm

The Tripartite Co-Custody framework establishes an institutional-grade, bankruptcy-remote separation of concerns between digital key custody and traditional physical/fiduciary asset administration. 

```mermaid
graph TD
    subgraph Custodial Locks
        USVI["🏛️ U.S. Trust International Bank (USTIB)<br><b>Physical & Fiduciary Lock</b><br>• USVI DBIR Single-State Charter<br>• Physical Title Deeds & Claim Filings<br>• Cash Escrow & AIA G703 Milestones<br>• Vaulted Commodities (Gold Bullion)"]
        BITGO["🔐 BitGo Bank & Trust, N.A.<br><b>Digital Custody Lock</b><br>• OCC National Trust Charter<br>• Isolated SPV Cold Vaults<br>• Multi-Sig Key Authority (2-of-3)<br>• Go Network & DvP Settlement"]
    end

    subgraph Middleware & Orchestration
        UNYKORN["⚡ Unykorn Platform<br><b>Non-Custodial Orchestrator</b><br>• ERC-3643 / Identity Registry<br>• Cryptographic PoR Oracle Daemon<br>• Policy & Velocity Engine<br>• ANVIL Gate Enforcement (G0-G7)"]
    end

    subgraph Client Asset Layer
        CLIENT["👥 Institutional Clients / Municipalities / SPVs<br>• Commodity-Backed Tokens (Dignity Gold)<br>• Municipal Infrastructure Credits (MIA / VIA)<br>• Private Credit & Construction Draws"]
    end

    USVI -->|Asset Attestation & Escrow Clear| UNYKORN
    BITGO -->|Cryptographic Co-Signing & Settlement| UNYKORN
    UNYKORN -->|Non-Custodial Interface & API Telemetry| CLIENT
```

### Institutional Role Division
1. **BitGo Bank & Trust, N.A. (Digital Custody Lock):** Operates under an OCC national trust bank charter. Responsible for securing cryptographic private keys, cold-storage vaulting, 2-of-3 multi-sig policy enforcement, and compliant ERC-3643 / ERC-1400 token minting/burning upon validated multi-party consensus.
2. **U.S. Trust International Bank / USVI Charter (Physical & Fiduciary Lock):** Operates under the USVI Division of Banking and Insurance (DBIR) banking charter. Responsible for holding hard asset deeds, statutory trusts, mining claims, vaulted physical commodities, and conducting USD fiat escrow clearing.
3. **Unykorn Platform (Non-Custodial Orchestrator):** Operates purely as a software and state-engine middleware layer. Unykorn never takes possession, custody, or beneficial ownership of funds or keys.

---

## 2. Core Architectural & Technical Enhancements

### A. BitGo Technical Enhancements
* **Isolated SPV Child Vaults:** Leverage BitGo Parent Enterprise account hierarchies to spin up isolated, bankruptcy-remote sub-accounts for every municipal program, statutory trust SPV, or private credit pool.
* **Cryptographic Proof-of-Reserve (PoR) Mint Gating:** Smart contract minting covenants enforce that no tokenized asset or municipal credit can be issued on-chain without an EIP-712 co-signature from USTIB (oracle/inspection sign-off) and BitGo (authorized keyholder).
* **Policy & Velocity Engines:** Configurable multi-signature threshold policies (e.g., 2-of-3 requiring SPV Manager, Unykorn StateEngine policy check, and BitGo Trust) with daily withdrawal ceilings and automated milestone inspection dependencies.
* **Atomic DvP & 24/7 Institutional Settlement:** Direct integration with BitGo's Go Network, USD1, and qualified bank stablecoin rails for zero-counterparty-risk Delivery-vs-Payment settlement.

### B. USVI Charter (USTIB) Enhancements
* **Statutory Trust SPV Framework:** Standardized Delaware and USVI Statutory Trusts established directly within the bank's trust department to hold underlying real-world assets (e.g., gold bullion certificates, real property deeds, commodity claims).
* **Direct USD Clearing & Construction Escrow Rails:** Automated handling of fiat capital formation and AIA Document G703 construction draw distributions against certified engineering inspection verifications.
* **Dual Fiduciary Sign-Off:** USTIB acts as the qualified institutional fiduciary verifying that all statutory covenants, KYC/AML records, and chain-of-custody proofs are fulfilled before releasing fiat or signing PoR attestations.

---

## 3. Tiered Implementation & Client Offering Options

| Dimension | **Option 1: Full RWA Tripartite Suite** | **Option 2: Traditional Trust & Escrow Gateway** | **Option 3: Institutional Digital Custody** |
| :--- | :--- | :--- | :--- |
| **Primary Collateral** | Physical Assets (Real Estate, Gold, Commodities) | Cash / Fiat / Project Escrows | Digital Assets (Liquid Staked, Native L1/L2) |
| **Physical/Fiduciary Custodian** | U.S. Trust International Bank (Statutory Trust) | U.S. Trust International Bank (Escrow Agent) | None (Pure Digital Treasury) |
| **Digital Key Custodian** | BitGo Bank & Trust, N.A. (Qualified Custody) | None (Direct Banking Fedwire Rails) | BitGo Bank & Trust, N.A. (Qualified Custody) |
| **Token Standard** | ERC-3643 / ERC-1400 (Identity-Whitelisted) | None (Traditional Banking Statements) | Native Token / Cold Storage Multisig |
| **Settlement Trigger** | Dual EIP-712 Attestation (USTIB + BitGo) | AIA Document G703 / Escrow Release Schedule | Multi-Sig Quorum / Webhook Policy Gating |
| **Target Clientele** | Commodity Funds, Tokenized Real Estate, RWA | Municipalities, Construction Contractors, Lenders | Civic platforms (MIA by VIA), Digital Treasuries |
| **Orchestration Layer** | Unykorn ERC-3643 + On-Chain Compliance + Identity Registries | Unykorn StateEngine milestone verifier & draw scheduler | Unykorn Policy Gateway + Go Network settlement engine |
| **Settlement Rails** | Atomic DvP, ERC-3643, USD1 / Regulated Stablecoins | Direct Fedwire, ACH, Bank Account Escrow | Go Network 24/7 atomic internal transfer, USD1 |
| **Regulatory Standing** | SEC/FINRA Qualified Custodian + USVI Trust Banking | USVI DBIR Regulated Depository & Escrow | OCC National Bank Qualified Key Custodian |

---

## 4. Cryptographic Proof-of-Reserve (PoR) & Minting Interface

### Cryptographic Multi-Party Minting Flow
```mermaid
sequenceDiagram
    autonumber
    participant Issuer as SPV / Municipal Issuer
    participant USTIB as USTIB (USVI Physical Lock)
    participant StateEngine as Unykorn StateEngine (Orchestrator)
    participant BitGo as BitGo Trust (Digital Lock)
    participant Contract as ERC-3643 Token Contract

    Issuer->>USTIB: 1. Deposit Collateral / Deed / Bullion
    USTIB->>USTIB: 2. Physical Inspection & Title Verification
    USTIB->>StateEngine: 3. Post Attestation Payload (EIP-712 Signed by USTIB)
    StateEngine->>StateEngine: 4. ANVIL Policy Check & KYC/AML Whitelist Match
    StateEngine->>BitGo: 5. Submit Minting Request with USTIB Attestation
    BitGo->>BitGo: 6. Verify USTIB Oracle Signature & Policy Threshold
    BitGo->>Contract: 7. Execute `mintWithAttestation(data, sigUSTIB, sigBitGo)`
    Contract-->>Issuer: 8. Minted Tokens Delivered to Qualified Investor Wallet
```

### Core API Data Payload: USTIB Proof-of-Reserve Attestation
```json
{
  "attestationVersion": "2026-v1",
  "spvId": "spv_usvi_dignity_gold_001",
  "assetType": "PHYSICAL_COMMODITY",
  "assetSubtype": "GOLD_BULLION_9999",
  "custodialDetails": {
    "fiduciary": "U.S. Trust International Bank",
    "jurisdiction": "USVI-DBIR",
    "statutoryTrustId": "TRUST-DE-USVI-7777-01",
    "vaultLocation": "USTIB-SECURE-VAULT-STT",
    "verifiedUnitCount": "100000.00",
    "unitOfMeasure": "TROY_OUNCES",
    "appraisalValueUSD": "275000000.00",
    "inspectionTimestamp": 1788004800
  },
  "compliance": {
    "kycAuditRef": "KYC-AML-USVI-89211",
    "secExemption": "REG_D_506C_REG_S",
    "transferAgentRegistry": "BitGo Transfer Agent Services"
  },
  "oracleProof": {
    "eip712Hash": "0x4b7c12a0d9...881f",
    "ustibSignature": "0x789abc...def01"
  }
}
```

---

## 5. Standardized SPV Onboarding & Implementation Roadmap

```mermaid
gantt
    title Tripartite Custody Implementation Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Legal & SPV
    Standardize USTIB Statutory Trust Templates       :done,    des1, 2026-09-01, 2026-09-15
    Draft BitGo Enterprise Parent-Child Agreement    :active,  des2, 2026-09-10, 2026-09-25
    section Phase 2: Tech & Integration
    Formalize EIP-712 PoR Attestation Schema         :active,  tech1, 2026-09-15, 2026-10-01
    Deploy Unykorn-to-BitGo Webhook Bridge          :         tech2, 2026-10-01, 2026-10-15
    AIA G703 Milestone Escrow Auto-Release Engine     :         tech3, 2026-10-10, 2026-10-30
    section Phase 3: Pilot & Launch
    Pilot Dignity Gold Physical Bullion Ingestion     :         test1, 2026-11-01, 2026-11-20
    Launch Civic MIA by VIA Option 3 Treasury Rails   :         test2, 2026-11-15, 2026-12-05
```

---

## 6. Institutional Executive Brief Summary (2-Page Deck Format)

### Slide 1: The Problem & The Solution
* **Institutional Dilemma:** Digital custodians cannot hold physical gold or municipal land titles; traditional charter banks cannot securely manage cryptographic keys, sub-second DvP, and smart-contract transfer restrictions.
* **The Tripartite Solution:** Combines the regulatory protections of an OCC-regulated Trust Bank (BitGo) with the physical holding power of a USVI-chartered Bank (USTIB) coordinated by Unykorn's non-custodial compliance middleware.

### Slide 2: Why This Wins Institutional Mandates
1. **Bankruptcy Remoteness:** Both digital keys and physical assets reside in dedicated statutory trusts and isolated child vaults—fully shielded from operating platform liability.
2. **Zero Naked Minting:** Cryptographic Proof-of-Reserve gating prevents issuance without verifiable fiduciary backing.
3. **Turnkey Flexibility:** Clients select between Full RWA Tripartite, Pure Escrow, or Pure Digital Custody without architectural re-engineering.
