import type { AssertionItem, GCodeService, CNodeProfile, AnvilGate, EIP712Attestation, ZKPProof } from '../types';

export const INITIAL_ASSERTIONS: AssertionItem[] = [
  {
    id: 'OTM-2026-MIA-0801',
    department: 'Miami-Dade Building & Permitting',
    vendorName: 'SolarTech Miami LLC',
    amount: 145000,
    purpose: 'Commercial Rooftop Solar Photovoltaic Installation & Inspection',
    date: '2026-08-15',
    primaryInstrument: {
      id: 'INST-2026-881',
      title: 'Miami-Dade County Resolution R-881-26 (Solar Permitting Mandate)',
      kind: 'COUNTY_RESOLUTION',
      issuingAuthority: 'Board of County Commissioners, Miami-Dade',
      sourceUrl: 'https://www.miamidade.gov/govaction/matter.asp?matter=260881',
      fetchDate: '2026-08-16',
      pageLocator: 4,
      rowLocator: 12,
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      isStale: false,
    },
    gCodeId: 'did:via:gcode:permit-building-01',
    cNodeId: 'did:via:cnode:contractor-solar-99',
    attestationSignature: '0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b2c3d4e5f6a7b8c9d0e1f2a',
    attestationSigner: '0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A',
    linterStatus: 'PASSED',
    state: 'PUBLISHED',
  },
  {
    id: 'OTM-2026-FL-0202',
    department: 'Florida Dept of Environmental Protection',
    vendorName: 'Biscayne Bay Restoration Taskforce',
    amount: 5200000,
    purpose: 'Coral Reef & Mangrove Ecological Protection Grant Phase 2',
    date: '2026-07-28',
    primaryInstrument: {
      id: 'INST-2026-442',
      title: 'State of Florida DEP Grant Agreement #DEP-2026-BB-04',
      kind: 'STATE_GRANT',
      issuingAuthority: 'Florida Department of Environmental Protection',
      sourceUrl: 'https://floridadep.gov/grants/biscayne-bay-2026',
      fetchDate: '2026-08-01',
      pageLocator: 18,
      rowLocator: 3,
      sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      isStale: false,
    },
    gCodeId: 'did:via:gcode:biscayne-env-06',
    cNodeId: 'did:via:cnode:biscayne-taskforce',
    attestationSignature: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    attestationSigner: '0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A',
    linterStatus: 'PASSED',
    state: 'PUBLISHED',
  },
  {
    id: 'OTM-2026-FED-9903',
    department: 'U.S. Department of Transportation (USDOT)',
    vendorName: 'Metrorail Rapid Transit Contractors',
    amount: 18400000,
    purpose: 'Federal Transit Infrastructure Modernization Warrant #US-DOT-2026-MIA',
    date: '2026-06-10',
    primaryInstrument: {
      id: 'INST-2026-990',
      title: 'US Treasury Obligation Warrant #US-DOT-2026-MIA-099',
      kind: 'FEDERAL_WARRANT',
      issuingAuthority: 'Federal Transit Administration / US Treasury',
      sourceUrl: 'https://www.usaspending.gov/award/CONT_AWD_DOT2026MIA',
      fetchDate: '2026-06-12',
      pageLocator: 1,
      rowLocator: 1,
      sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      isStale: false,
    },
    gCodeId: 'did:via:gcode:transit-publicworks-03',
    cNodeId: 'did:via:cnode:metrorail-transit-corp',
    attestationSignature: '0x9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    attestationSigner: '0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A',
    linterStatus: 'PASSED',
    state: 'VERIFIED',
  },
  {
    id: 'OTM-2026-UNSOURCED-99',
    department: 'Unverified Press Office Allocation',
    vendorName: 'Unregistered PR Firm',
    amount: 75000,
    purpose: 'Unverified Marketing & Media Distribution (Missing Primary Document)',
    date: '2026-08-20',
    primaryInstrument: {
      id: 'INST-SUMMARY-001',
      title: 'Press Release Summary (Invalid Supporting Instrument)',
      kind: 'SUMMARY',
      issuingAuthority: 'External PR Wire',
      sourceUrl: 'https://example.com/press-release',
      fetchDate: '2026-08-21',
      pageLocator: 1,
      rowLocator: 1,
      sha256Hash: '0000000000000000000000000000000000000000000000000000000000000000',
      isStale: true,
    },
    gCodeId: 'did:via:gcode:unverified-pr',
    linterStatus: 'BLOCKED',
    blockReason: 'Design Law 2 Violation: Summary or press release is never a supporting primary instrument.',
    state: 'LINTER_BLOCKED',
  }
];

export const MOCK_GCODES: GCodeService[] = [
  {
    id: 'did:via:gcode:permit-building-01',
    did: 'did:via:gcode:permit-building-01',
    type: 'Building & Safety Permits',
    name: 'Miami-Dade Building & Permitting Service G-Code',
    description: 'Authoritative municipal smart contract issuing building permits, solar installation approvals, and structural compliance credentials.',
    department: 'Building & Permitting',
    jurisdiction: 'Miami-Dade County',
    activeStatus: 'ACTIVE',
    status: 'ACTIVE',
    publicKeys: ['0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A'],
    totalAssertions: 1420,
    publishedVolumeUsd: 48500000,
    lastActive: '2026-08-22T17:00:00Z',
    fee: 0,
    smartContractAddress: '0x4E574939D460d284B5D990646D4aeaEF2D49Fa13',
    verifiableCredentialIssued: 'BuildingPermitVC (NFT)'
  },
  {
    id: 'did:via:gcode:business-licensing-02',
    did: 'did:via:gcode:business-licensing-02',
    type: 'Commercial Licensing',
    name: 'Miami-Dade Business & Tax Licensing G-Code',
    description: 'Manages municipal occupational licenses, commercial registration credentials, and tax clearance verification.',
    department: 'Tax Collector & Licensing',
    jurisdiction: 'Miami-Dade County',
    activeStatus: 'ACTIVE',
    status: 'ACTIVE',
    publicKeys: ['0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A'],
    totalAssertions: 890,
    publishedVolumeUsd: 12400000,
    lastActive: '2026-08-22T16:30:00Z',
    fee: 0,
    smartContractAddress: '0x9A12B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0',
    verifiableCredentialIssued: 'CommercialLicenseVC (NFT)'
  },
  {
    id: 'did:via:gcode:transit-publicworks-03',
    did: 'did:via:gcode:transit-publicworks-03',
    type: 'Transit & Infrastructure',
    name: 'Miami-Dade Mobility & Public Works G-Code',
    description: 'Issues transit passes, handles civic mobility tokens, and verifies public works infrastructure warrants.',
    department: 'Department of Transportation & Public Works',
    jurisdiction: 'Miami-Dade County',
    activeStatus: 'ACTIVE',
    status: 'ACTIVE',
    publicKeys: ['0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A'],
    totalAssertions: 5120,
    publishedVolumeUsd: 184000000,
    lastActive: '2026-08-22T18:15:00Z',
    fee: 0,
    smartContractAddress: '0x1F2E3D4C5B6A79887766554433221100FFDDEECC',
    verifiableCredentialIssued: 'TransitPassVC'
  },
  {
    id: 'did:via:gcode:water-sewer-04',
    did: 'did:via:gcode:water-sewer-04',
    type: 'Utility Services',
    name: 'Miami-Dade Water & Sewer Department G-Code',
    description: 'Processes utility attestation receipts, eco-rebates, and residential service verification.',
    department: 'Water & Sewer Department (WASD)',
    jurisdiction: 'Miami-Dade County',
    activeStatus: 'ACTIVE',
    status: 'ACTIVE',
    publicKeys: ['0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A'],
    totalAssertions: 3400,
    publishedVolumeUsd: 31000000,
    lastActive: '2026-08-22T15:10:00Z',
    fee: 0,
    smartContractAddress: '0x554433221100AABBCCDDEEFF0011223344556677',
    verifiableCredentialIssued: 'UtilityAccountVC'
  },
  {
    id: 'did:via:gcode:biscayne-env-06',
    did: 'did:via:gcode:biscayne-env-06',
    type: 'Environmental Stewardship',
    name: 'Biscayne Bay Conservation & Eco-Rewards G-Code',
    description: 'Tracks environmental protection grants, bay restoration milestones, and awards civic participation tokens.',
    department: 'Office of Resilience',
    jurisdiction: 'Miami-Dade County',
    activeStatus: 'ACTIVE',
    status: 'ACTIVE',
    publicKeys: ['0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A'],
    totalAssertions: 410,
    publishedVolumeUsd: 9800000,
    lastActive: '2026-08-22T14:00:00Z',
    fee: 0,
    smartContractAddress: '0x776655443322110099887766554433221100AABB',
    verifiableCredentialIssued: 'EcoStewardshipVC'
  }
];

export const MOCK_CNODE: CNodeProfile = {
  did: 'did:via:cnode:citizen-miami-9921',
  walletAddress: '0x7c4f8820a1b94e1d3c5f6a7b8c9d0e1f2a3b4567',
  citizenName: 'Elijah Bowdre (Resident Demo)',
  alias: 'Miami Resident C-Node #9921',
  district: 'Miami-Dade County District 3',
  verifiableCredentialsCount: 4,
  reputationScore: 98,
  zkpEnabled: true,
  walletBalanceUsdc: 500,
  walletBalanceToken: 150,
  balances: {
    fiatUSD: 2450.00,
    usdc: 500.00,
    transitTokens: 24,
    civicRewards: 150
  },
  soulboundCredentials: [
    {
      id: 'VC-MIA-RESIDENT-001',
      title: 'Miami-Dade Resident Passport',
      issuer: 'did:via:gcode:clerk-county-00',
      issuedDate: '2026-01-10',
      status: 'VERIFIED',
      isSoulbound: true,
      fields: {
        District: 'District 3',
        ResidencyStatus: 'Active Resident',
        VerificationLevel: 'Tier 3 Sovereignty'
      }
    },
    {
      id: 'VC-MIA-SOLAR-8841',
      title: 'Solar Installation Permit #SOLAR-2026-8841',
      issuer: 'did:via:gcode:permit-building-01',
      issuedDate: '2026-08-15',
      status: 'VERIFIED',
      isSoulbound: false,
      fields: {
        PermitType: 'Solar Photovoltaic Rooftop',
        InspectionStatus: 'PASSED',
        ValidThrough: '2027-08-15'
      }
    },
    {
      id: 'VC-MIA-BIZ-4409',
      title: 'Occupational Commercial License #BIZ-MIA-4409',
      issuer: 'did:via:gcode:business-licensing-02',
      issuedDate: '2026-03-01',
      status: 'VERIFIED',
      isSoulbound: false,
      fields: {
        Category: 'Clean Energy Engineering',
        Jurisdiction: 'Miami-Dade County',
        Status: 'Good Standing'
      }
    }
  ],
  transactionHistory: [
    {
      id: 'TX-9901',
      type: 'PERMIT_ISSUED',
      title: 'Solar Permit Credential Minted',
      amount: '$145,000.00',
      date: '2026-08-15',
      gCode: 'did:via:gcode:permit-building-01',
      hash: '0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c'
    },
    {
      id: 'TX-9902',
      type: 'CIVIC_REWARD',
      title: 'Biscayne Eco-Stewardship Reward',
      amount: '+50 MIA Tokens',
      date: '2026-07-28',
      gCode: 'did:via:gcode:biscayne-env-06',
      hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d'
    }
  ]
};

export const MOCK_ZKP_PROOFS: ZKPProof[] = [
  {
    proofId: 'ZKP-MIA-001-DISTRICT3',
    claimType: 'DISTRICT_RESIDENCY',
    statement: 'Proves holder resides in Miami-Dade District 3 without revealing exact home street address.',
    publicInputs: { District: '3', VerificationScheme: 'Groth16/BN254' },
    zkProofHash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    isVerified: true,
    timestamp: '2026-08-22T18:30:00Z'
  },
  {
    proofId: 'ZKP-MIA-002-AGE21',
    claimType: 'AGE_ELIGIBILITY',
    statement: 'Proves holder is over 21 years old without revealing full Date of Birth.',
    publicInputs: { MinAge: 21, CurrentYear: 2026 },
    zkProofHash: '0x8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    isVerified: true,
    timestamp: '2026-08-22T17:45:00Z'
  }
];

export const ANVIL_GATES: AnvilGate[] = [
  {
    id: 'G0',
    name: 'Charter & Scope Signoff',
    category: 'EXIT_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'Scope signed, Tier 3 exclusions accepted in writing, zero transaction fees.',
    notes: 'MIA by VIA Architecture Charter signed by Elijah Bowdre.'
  },
  {
    id: 'G1',
    name: 'Reconnaissance & Data Ingestion',
    category: 'EXIT_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'R1-R4 datasets landed with primary source URLs + fetch timestamps.',
    notes: 'Public federal and county sources indexed.'
  },
  {
    id: 'G2',
    name: 'Perimeter Wall Verification',
    category: 'EXIT_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'PERIMETER.md written, no public write path to origin databases.',
    notes: 'One-way static wall strictly enforced.'
  },
  {
    id: 'G3',
    name: 'Foundation Stack Merge',
    category: 'EXIT_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'core-ledger + attest + receipts packages clean under tsc --strict.',
    notes: 'TypeScript strict compilation 100% clean.'
  },
  {
    id: 'G4',
    name: 'Code Quality & Test Gates',
    category: 'EXIT_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'Code coverage ≥ 85%, zero TODOs, named errors at boundaries.',
    notes: 'All unit test suites passing.'
  },
  {
    id: 'G5',
    name: 'Live Data & Contradiction Catching',
    category: 'EXIT_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: '≥2 live sources on schedule, ≥1 real contradiction caught in staging.',
    notes: 'Linter caught unsourced press summary.'
  },
  {
    id: 'G6',
    name: 'Publication Safe & Blocking Linter',
    category: 'EXIT_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'Linter proven to BLOCK an unsourced or summary value in CI.',
    notes: 'Blocking linter test suite verified.'
  },
  {
    id: 'G7',
    name: 'Public Launch Readiness',
    category: 'EXIT_GATE',
    isBlocking: false,
    status: 'PASSED',
    exitCriteria: 'Domain live at mia.unykorn.ai, standard delivered, third-party verifiable receipts.',
    notes: 'Ready for public inspection.'
  },
  {
    id: 'G-M01',
    name: 'Zero PII On-Chain Linter Gate',
    category: 'BLOCKING_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'Refuse publication if raw PII detected in attestation payload.',
    notes: 'Cryptographic hash + zero-knowledge proof isolation.'
  },
  {
    id: 'G-M04',
    name: 'Branding Rule — No Official Seal',
    category: 'BLOCKING_GATE',
    isBlocking: true,
    status: 'PASSED',
    exitCriteria: 'No county seal or government lockup used without explicit license.',
    notes: 'Uses MIA by VIA branded mark built by UnyKorn LLC.'
  }
];

export const MOCK_EIP712_ATTESTATION: EIP712Attestation = {
  id: 'ATT-OTM-2026-MIA-0801',
  gCodeId: 'did:via:gcode:permit-building-01',
  cNodeId: 'did:via:cnode:contractor-solar-99',
  instrumentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  amountUsd: 145000,
  timestamp: 1786800000,
  signature: '0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b2c3d4e5f6a7b8c9d0e1f2a',
  signerPublicKey: '0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A',
  verdict: 'VALID',
  verified: true
};
