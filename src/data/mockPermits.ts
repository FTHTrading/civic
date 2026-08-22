import type { PermitCredential, ServiceStatus, TrustControl } from '../types';

export const MOCK_PERMITS: PermitCredential[] = [
  {
    id: 'DEMO-PERMIT-2026-01',
    permitNumber: 'MIA-SOLAR-2026-8841',
    permitType: 'Commercial Solar Installation',
    status: 'ACTIVE',
    validThrough: 'December 31, 2026',
    issuer: 'Miami-Dade Building Department',
    department: 'Building & Permitting',
    scope: 'Roof-mounted PV Solar System installation and grid interconnection',
    issuedDate: 'January 15, 2026',
    demo: true,
    holderName: 'Fictional Contractor LLC',
    streetAddress: '100 Biscayne Blvd, Suite 400 (DEMO ADDRESS - WITHHELD)',
    parcelNumber: '01-3137-020-0010'
  },
  {
    id: 'DEMO-PERMIT-2026-02',
    permitNumber: 'MIA-ELEC-2026-4492',
    permitType: 'Master Electrical Upgrade',
    status: 'ACTIVE',
    validThrough: 'March 15, 2027',
    issuer: 'Miami-Dade Electrical Inspection Division',
    department: 'Building & Permitting',
    scope: '400A Service Upgrade and EV Fast Charger Wiring',
    issuedDate: 'February 10, 2026',
    demo: true,
    holderName: 'Sample Electrical Corp (DEMO)',
    streetAddress: '450 Coral Way (DEMO ADDRESS - WITHHELD)',
    parcelNumber: '02-4215-010-0050'
  },
  {
    id: 'DEMO-PERMIT-2026-03',
    permitNumber: 'MIA-BIZ-2026-9904',
    permitType: 'County Business Registration',
    status: 'ACTIVE',
    validThrough: 'October 31, 2026',
    issuer: 'Miami-Dade Finance Department',
    department: 'Consumer Services & Licensing',
    scope: 'Retail Trade & Commercial Services Certificate',
    issuedDate: 'November 1, 2025',
    demo: true,
    holderName: 'Biscayne Cafe & Bakery (DEMO)',
    streetAddress: '1200 NW 7th Ave (DEMO ADDRESS - WITHHELD)',
    parcelNumber: '01-4112-005-0020'
  }
];

export const MOCK_SERVICES: ServiceStatus[] = [
  {
    id: 'SVC-01',
    name: 'Permit & License Verification',
    description: 'Confirm active building permits, electrical licenses, and business credentials instantly.',
    status: 'DEMONSTRATION_PROTOTYPE',
    statusLabel: 'Demonstration Prototype',
    department: 'Building & Permitting'
  },
  {
    id: 'SVC-02',
    name: 'Resident Program Records',
    description: 'Keep approved municipal records, program enrollments, and receipts in one private wallet.',
    status: 'CONCEPT_PLANNED_PILOT',
    statusLabel: 'Concept / Planned Pilot',
    department: 'Parks & Human Services'
  },
  {
    id: 'SVC-03',
    name: 'Business Credential Verification',
    description: 'Help customers, inspectors, and commercial partners verify active county business registrations.',
    status: 'CONCEPT_PLANNED_PILOT',
    statusLabel: 'Concept / Planned Pilot',
    department: 'Consumer Services'
  },
  {
    id: 'SVC-04',
    name: 'Program Eligibility Confirmation',
    description: 'Confirm district residency or age eligibility without disclosing date of birth or home address.',
    status: 'CONCEPT_PLANNED_PILOT',
    statusLabel: 'Concept / Planned Pilot',
    department: 'Community Services'
  }
];

export const MOCK_CONTROLS: TrustControl[] = [
  {
    id: 'CTRL-01',
    name: 'Zero PII On-Chain Storage',
    category: 'PRIVACY',
    status: 'PASSED',
    criteria: 'HEARTH Rule #1: No personally identifiable information written to public ledgers.',
    notes: 'Verified local state root hashing with zero public PII exposure.'
  },
  {
    id: 'CTRL-02',
    name: 'Default Minimum Disclosure',
    category: 'PRIVACY',
    status: 'PASSED',
    criteria: 'Resident name and street address disabled by default in all verification screens.',
    notes: 'Enforced via resident consent simulation UI.'
  },
  {
    id: 'CTRL-03',
    name: 'Source-Linked Primary Instrument Locators',
    category: 'GOVERNANCE',
    status: 'PASSED',
    criteria: 'Published claims require primary source instrument locators.',
    notes: 'Linter verifies source locators before rendering certificate.'
  },
  {
    id: 'CTRL-04',
    name: 'Controlled Sandbox Adapters',
    category: 'OPERATIONS',
    status: 'PASSED',
    criteria: 'Live County API endpoints stubbed behind authorized issuer interfaces.',
    notes: 'Throws controlled integration unavailable state without production credentials.'
  }
];
