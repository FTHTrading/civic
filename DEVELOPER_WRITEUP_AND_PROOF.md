# 💻 DEVELOPER WRITE-UP & EMPIRICAL PROOF GUIDE
## Quick Reference for System Architects, Developers & Auditors

---

## 1. CODE FILE LOCATIONS

### Rust Core Engine (`rust/`)
- **Package Config**: [`rust/Cargo.toml`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/rust/Cargo.toml)
- **10 Aggregate State Machines**: [`rust/src/state_machines.rs`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/rust/src/state_machines.rs)
- **Command Gateway & Ingress**: [`rust/src/command_gateway.rs`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/rust/src/command_gateway.rs)
- **Integer Double-Entry Subledger**: [`rust/src/integer_ledger.rs`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/rust/src/integer_ledger.rs)
- **SHA-256 Receipt Sealer**: [`rust/src/receipt_sealer.rs`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/rust/src/receipt_sealer.rs)
- **CLI Verification Runner**: [`rust/src/main.rs`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/rust/src/main.rs)

### TypeScript Command Gateway (`src/`)
- **10 State Machine Matrices**: [`src/lib/stateMachines.ts`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/src/lib/stateMachines.ts)
- **Command Gateway Kernel**: [`src/lib/commandGateway.ts`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/src/lib/commandGateway.ts)
- **State Machine UI Explorer**: [`src/components/StateMachineExplorerView.tsx`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/src/components/StateMachineExplorerView.tsx)
- **Color-Coded Table of Contents Flow Tree**: [`src/components/ColorCodedTableOfContentsView.tsx`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/src/components/ColorCodedTableOfContentsView.tsx)

### Documentation & Specifications (`docs/`)
- **Master Engineering Dossier**: [`MIA_BY_VIA_SENIOR_ENGINEERING_DOSSIER.md`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/MIA_BY_VIA_SENIOR_ENGINEERING_DOSSIER.md)
- **State Machine Catalog**: [`docs/STATE-MACHINE-CATALOG.md`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/docs/STATE-MACHINE-CATALOG.md)
- **Authority Matrix & Separation of Duties**: [`docs/AUTHORITY-MATRIX.md`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/docs/AUTHORITY-MATRIX.md)
- **Trust Boundaries & Data Placement**: [`docs/TRUST-BOUNDARIES.md`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/docs/TRUST-BOUNDARIES.md)
- **Threat Model & Compromise Recovery**: [`docs/THREAT-MODEL.md`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/docs/THREAT-MODEL.md)
- **Master Table of Contents Index**: [`TABLE_OF_CONTENTS.md`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/TABLE_OF_CONTENTS.md)
- **Dual Open Source License**: [`LICENSE`](file:///C:/Users/Kevan/.gemini/antigravity-ide/scratch/new-money-open-trust/LICENSE)

---

## 2. HOW TO VERIFY CODE EXECUTIONS

### Run Rust Core Engine Verification
```powershell
cd C:\Users\Kevan\.gemini\antigravity-ide\scratch\new-money-open-trust\rust
C:\Users\Kevan\.cargo\bin\cargo.exe run
```

### Run Web Application Build
```powershell
cd C:\Users\Kevan\.gemini\antigravity-ide\scratch\new-money-open-trust
npm run build
```

### Run Python Institutional Infrastructure Verification
```powershell
cd C:\Users\Kevan\.gemini\antigravity-ide\scratch\mma-inc-unykorn-bitgo-platform
python verify_institutional_infrastructure.py
```

---

## 3. GITHUB REPOSITORIES & LATEST COMMITS

| Repository | URL | Latest Commit | Description |
| :--- | :--- | :--- | :--- |
| **`civic`** | [`https://github.com/FTHTrading/civic`](https://github.com/FTHTrading/civic) | `6cb4837` | MIA by VIA Municipal Trust OS & Rust Engine |
| **`mma`** | [`https://github.com/FTHTrading/mma`](https://github.com/FTHTrading/mma) | `98ea4f7` | BitGo Enterprise Custody & Go Network Treasury OS |
| **`process-G`** | [`https://github.com/FTHTrading/process-G`](https://github.com/FTHTrading/process-G) | `main` | Engineering & Control Plane Framework |
