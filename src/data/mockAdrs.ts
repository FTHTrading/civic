export interface ADRItem {
  id: string;
  number: string;
  title: string;
  status: 'Accepted' | 'Proposed' | 'Under Review';
  deciders: string;
  date: string;
  summary: string;
  constitutionMapping: string;
  filePath: string;
}

export const MOCK_ADRS: ADRItem[] = [
  {
    id: 'ADR-0001',
    number: '0001',
    title: 'Technical Alignment & UnyKorn Constitution Mapping',
    status: 'Accepted',
    deciders: 'Office of the Chairman (VIA.miami), UnyKorn LLC Engineering Council',
    date: '2026-08-22',
    summary: 'Directly maps MIA by VIA municipal pillars (IDs, Data, Dollars, G-codes, C-nodes) to UnyKorn Constitution standards (HEARTH runtime, FORGE 7-phase process, ANVIL audit bar).',
    constitutionMapping: 'HEARTH Runtime + FORGE Process + ANVIL Gate Charter',
    filePath: 'docs/adr/0001-nygard-format-adr.md'
  },
  {
    id: 'ADR-0002',
    number: '0002',
    title: 'W3C DID Resolver & Verifiable Credential Schema Specification',
    status: 'Accepted',
    deciders: 'Office of the Chairman (VIA.miami), MIA Technical Architecture Committee',
    date: '2026-08-22',
    summary: 'Specifies did:via:cnode and did:via:gcode identifier methods with W3C JSON-LD / JWT Verifiable Credentials and mobile Secure Enclave key storage.',
    constitutionMapping: 'standards/CONVENTIONS.md & W3C/NIST Standards',
    filePath: 'docs/adr/0002-did-resolver-and-w3c-vc-specs.md'
  },
  {
    id: 'ADR-0003',
    number: '0003',
    title: 'HEARTH Compliance — No-PII On-Chain Isolation Architecture',
    status: 'Accepted',
    deciders: 'UnyKorn Security Council, VIA.miami Privacy Officer',
    date: '2026-08-22',
    summary: 'Enforces strict zero PII on public ledgers. Only SHA-256 hashes, status lists, and EIP-712 attestations are on-chain; sensitive data remains in encrypted C-node vaults.',
    constitutionMapping: 'constitution/07-HEARTH-runtime.md (Rule #1)',
    filePath: 'docs/adr/0003-hearth-no-pii-on-chain-isolation.md'
  },
  {
    id: 'ADR-0004',
    number: '0004',
    title: 'G-Code Smart Contract Governance & Human Appeal Boundaries',
    status: 'Accepted',
    deciders: 'Miami-Dade Municipal Legal Counsel, Office of the Chairman (VIA.miami)',
    date: '2026-08-22',
    summary: 'Establishes 3-of-5 multi-sig governance, 72-hour time-locks, and mandatory human escalation checkpoints for disputed permit decisions.',
    constitutionMapping: 'templates/ADR-TEMPLATE.md & ANVIL Charter',
    filePath: 'docs/adr/0004-smart-contract-boundaries-and-g-codes.md'
  },
  {
    id: 'ADR-0005',
    number: '0005',
    title: 'Multi-Asset Municipal Settlement & Payment Rails',
    status: 'Accepted',
    deciders: 'UnyKorn Treasury Team, Miami-Dade Finance & Procurement',
    date: '2026-08-22',
    summary: 'Defines non-speculative payment execution supporting Fiat banking rails, USDC stablecoin settlement, and closed-loop municipal tokens with instant SHA-256 receipts.',
    constitutionMapping: 'standards/STACK.md (Custody & Settlement)',
    filePath: 'docs/adr/0005-multi-asset-settlement-rails.md'
  }
];
