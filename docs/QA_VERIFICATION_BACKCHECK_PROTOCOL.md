# Build Procedures, Verification Flow & Quality Assurance Back-Check Protocol
**System Codename:** CIVIC / OPEN TRUST (OTM)  
**Security Standard:** ANVIL Release Gate System (G0–G7 & G-M01–G-M14)  
**Custody & Verification Architecture:** BitGo Bank & Trust (OCC) · USTIB (USVI DBIR) · Unykorn StateEngine  
**Protocol Version:** 2026.1-STABLE-QA  

---

## 1. Four-Stage Continuous Verification Pipeline

```mermaid
graph TD
    subgraph Stage 1: Static Pre-Build & Linting
        LINT1["A3 Blocking Linter<br>• Zero-PII Regex Scan<br>• Integer Minor-Unit Math Enforcement"]
        LINT2["EIP-712 Parity Linter<br>• Typehash & Domain Separator Match"]
        LINT3["Strict Type Compiler<br>• Solc v0.8.24+ / TS 5.x / Rust 1.80+"]
    end

    subgraph Stage 2: Cryptographic & State-Machine Verification
        TEST1["Foundry Unit & Fuzz Suite<br>• Replay Nonce Attacks<br>• Signature Expiry Bounds<br>• Multi-Party Rejections"]
        TEST2["Rust Invariant Engine<br>• secp256k1 Address Recovery<br>• Digest Invariant Checks"]
        TEST3["10 State-Machine Flow Invariants<br>• Strict Monotonic Status Progression"]
    end

    subgraph Stage 3: Dual-Oracle Attestation & Fiduciary Check
        ORACLE1["Step 3.1: USTIB Physical Ingestion<br>• Title/Assay SHA-256 Hash Digest"]
        ORACLE2["Step 3.2: EIP-712 Payload Creation<br>• USTIB Oracle Signature (σ_USTIB)"]
        ORACLE3["Step 3.3: BitGo Custody Validation<br>• Whitelist Registry & Co-Sign (σ_BitGo)"]
        ORACLE4["Step 3.4: Automated Reserve Reconciliation<br>• On-Chain Supply == Physical Vault Vaulted Units"]
    end

    subgraph Stage 4: ANVIL Gate Board & Human Checkpoints
        GATES_AUTO["Automated Execution Gates<br>• Gate G0 (Intent) ➔ Gate G7 (Operate)"]
        GATES_HUMAN["Human Fiduciary Sign-Offs<br>• Gates G-M01 through G-M14"]
    end

    Stage 1 --> Stage 2
    Stage 2 --> Stage 3
    Stage 3 --> Stage 4
```

---

## 2. Standard Operating Procedures (SOPs)

### SOP-01: Build Invariant & Static Code Analysis
* **Trigger:** Invoked automatically on every commit, pull request, and CI/CD pipeline execution.
* **Procedures:**
  1. **Zero-PII Isolation Check (A3 Linter):** Scans all contracts, public logs, telemetry events, and smart contract ABIs to ensure zero cleartext names, email addresses, phone numbers, or physical addresses exist. All identity verification is strictly anchored via W3C DIDs and zk-SNARK commitments.
  2. **Integer Money Math Enforcement (Gate G1):** Validates that no floating-point data types (`float`, `double`, non-integer division) are utilized for financial calculations, civic credit issuance, or fee ledgers. All math operates strictly in integer minor units (cents, base-wei, basis points).
  3. **One-Way Wall Verification (Design Law 1):** Verifies that client-facing verifier UIs, public kiosks, and edge API routers possess zero direct write access to internal municipal databases or banking origin systems.

---

### SOP-02: Cryptographic Proof-of-Reserve (PoR) Mint Gating
* **Trigger:** Any on-chain minting request for commodity-backed tokens (e.g., gold bullion), municipal credit instruments, or tokenized private credit notes.
* **Procedures:**
  1. **Inspection Ingestion:** USTIB Trust Officer ingests physical warehouse receipts, refinery assay certificates, or county title deeds into the secure vault administration interface.
  2. **Canonical SHA-256 Digest Generation:**
     $$\text{evidenceHash} = \text{SHA256}(\text{Inspection Document Binary})$$
  3. **Attestation Struct Population:** Construct the canonical `AssetAttestation` typed struct with `spvId`, `assetClass`, `unitCount`, `valuationUSD`, `recipient`, `tokenAmount`, `nonce`, and `expiry`.
  4. **USTIB Oracle Signature ($\sigma_{\text{USTIB}}$):** USTIB signs the EIP-712 digest using its hardware security module (HSM) oracle key.
  5. **BitGo Custodial Verification ($\sigma_{\text{BitGo}}$):** BitGo validates ERC-3643 whitelist compliance, checks velocity policy ceilings, and countersigns the EIP-712 digest.
  6. **On-Chain Settlement:** Submit both signatures to `ProofOfReserveMintGate.sol`. The contract verifies both cryptographic signatures against authorized public keys before executing the mint.

---

### SOP-03: Construction Draw & Escrow Milestone Verification
* **Trigger:** Request for capital disbursement under AIA Document G702/G703.
* **Procedures:**
  1. **Inspector Signal:** Certified municipal or third-party engineering inspector executes a signed milestone completion report.
  2. **2-of-3 Multi-Sig Authorization:** Multi-signature transaction initiated across:
     * **Key 1 (Issuer / Project Manager):** Draw initiation and vendor payment request.
     * **Key 2 (Unykorn StateEngine):** Automated verification of milestone parameters, retainage percentages, and lien waiver attachments.
     * **Key 3 (USTIB / BitGo Trust):** Fiduciary release authorization.
  3. **Settlement:** Payout executed via direct Fedwire clearing or USD1 stablecoin transfer directly into contractor operating accounts.

---

## 3. Master Quality Gate & Back-Check Matrix

| Gate / Phase | Verification Checkpoint | Method | Blocking Condition | Owner |
| :--- | :--- | :--- | :--- | :--- |
| **G-M01** | Primary Source Verification | Manual | Unsubstantiated claims or missing legal instruments | Legal / Policy |
| **G-M04** | Seal & Brand Isolation | Automated / Linter | Any unauthorized County Seal or official logo lockup | Compliance |
| **G-M12** | Statutory Authority Check | Manual | No explicit enabling municipal ordinance or statute | Fiduciary |
| **G-M14** | Fiduciary Balance Reconciliation | Automated | Any discrepancy between physical vault ledger and on-chain supply | Custody Auditor |
| **G1 (Spec)** | State-Machine Transition Table | Automated Test | Illegal transition possible (e.g., `DRAFT` ➔ `ACTIVE` without `VERIFIED`) | Engineering |
| **G2 (Plan)** | EIP-712 Replay Defense | Foundry Test | Reusing nonce or expired timestamp executes successfully | Security |
| **G4 (Audit)** | ZKP Data Minimization | Automated Test | Proof request leaks underlying attribute values | Privacy Engineer |
| **G6 (Launch)** | Canary Node Verification | Manual / Testnet | Verification kiosk fails to read Soulbound VC NFT | DevSecOps |

---

## 4. Automated Incident Response & Circuit Breakers

* **Reserve Drift Trigger:** If total on-chain token supply exceeds total verified USTIB vault reserves by $> 0.00$ units, `ProofOfReserveMintGate.sol` automatically pauses minting functions globally and alerts compliance.
* **Signature Expiration Window:** EIP-712 attestations carry a strict maximum validity window ($\le 3600\text{ seconds}$). Signatures presented after expiration are permanently rejected by the contract assembly.
* **Key Rotation Protocol:** If an oracle key compromise is detected, an emergency multi-sig command from BitGo + Unykorn transitions the oracle state to `PAUSED`, revoking the affected key and activating the standby HSM key.
