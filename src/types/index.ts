import { z } from 'zod';

export type AssertionState = 'DRAFT' | 'PROPOSED' | 'LINTER_BLOCKED' | 'APPROVED' | 'PUBLISHED' | 'VERIFIED' | 'DEMOTED' | 'REJECTED';
export type InstrumentKind = 'PRIMARY' | 'SUMMARY' | 'INDEX' | 'GENERATED' | 'FEDERAL_WARRANT' | 'STATE_GRANT' | 'COUNTY_RESOLUTION' | 'SUMMARY_DOC';

export interface PrimaryInstrument {
  id?: string;
  title: string;
  kind: InstrumentKind;
  issuingAuthority: string;
  sourceUrl: string;
  fetchDate: string;
  pageLocator: number;
  rowLocator: number;
  sha256Hash: string;
  isStale: boolean;
}

export interface AssertionItem {
  id: string;
  department: string;
  vendorName: string;
  amount: number;
  purpose: string;
  date: string;
  primaryInstrument: PrimaryInstrument;
  gCodeId: string;
  cNodeId?: string;
  attestationSignature?: string;
  attestationSigner?: string;
  linterStatus: 'PASSED' | 'BLOCKED' | 'PENDING';
  blockReason?: string;
  state: AssertionState;
}

export interface GCodeService {
  id: string;
  did?: string;
  type?: string;
  name: string;
  description?: string;
  department: string;
  jurisdiction?: string;
  activeStatus?: 'ACTIVE' | 'PAUSED' | 'MAINTENANCE';
  status?: 'ACTIVE' | 'PAUSED' | 'MAINTENANCE';
  publicKeys?: string[];
  totalAssertions?: number;
  publishedVolumeUsd?: number;
  lastActive?: string;
  fee?: number;
  smartContractAddress?: string;
  verifiableCredentialIssued?: string;
}

export interface CNodeProfile {
  did: string;
  walletAddress?: string;
  citizenName?: string;
  alias: string;
  district: string;
  verifiableCredentialsCount: number;
  reputationScore: number;
  zkpEnabled: boolean;
  walletBalanceUsdc: number;
  walletBalanceToken: number;
  balances?: Record<string, number>;
  transactionHistory?: any[];
  soulboundCredentials?: any[];
}

export interface AnvilGate {
  id: string;
  name: string;
  category: 'EXIT_GATE' | 'BLOCKING_GATE';
  isBlocking: boolean;
  status: 'PASSED' | 'BLOCKED' | 'PENDING' | 'OPEN';
  exitCriteria: string;
  notes: string;
}

export interface EIP712Attestation {
  id?: string;
  gCodeId?: string;
  cNodeId?: string;
  instrumentHash?: string;
  amountUsd?: number;
  timestamp?: number;
  signature: string;
  signerPublicKey?: string;
  verdict?: 'VALID' | 'INVALID_SIGNATURE' | 'EXPIRED_INSTRUMENT';
  verified?: boolean;
  domain?: Record<string, any>;
  message?: Record<string, any>;
}

export interface ZKPProof {
  proofId: string;
  claimType: 'DISTRICT_RESIDENCY' | 'AGE_ELIGIBILITY' | 'TAX_EXEMPTION' | string;
  attributeType?: string;
  statement?: string;
  publicInputs: Record<string, any>;
  proofHash?: string;
  zkProofHash?: string;
  isVerified: boolean;
  timestamp: string;
  generatedAt?: string;
}

export interface PermitCredential {
  id: string;
  permitNumber: string;
  permitType: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'REVOKED';
  validThrough: string;
  issuer: string;
  department: string;
  scope: string;
  issuedDate: string;
  demo: true;
  holderName?: string;
  streetAddress?: string;
  parcelNumber?: string;
}

export interface DisclosureField {
  id: string;
  label: string;
  value: string;
  isRequired: boolean;
  isEnabled: boolean;
  isPrivateField: boolean;
}

export interface VerificationRequest {
  requestId: string;
  verifierName: string;
  permitId: string;
  requestedAt: string;
  requestedFields: string[];
  demo: true;
}

export interface ConsentDecision {
  requestId: string;
  approvedFields: string[];
  decidedAt: string;
  status: 'APPROVED' | 'DECLINED';
  demo: true;
}

export interface VerificationResult {
  verificationId: string;
  requestId: string;
  status: 'VERIFIED' | 'DECLINED' | 'INVALID';
  permitType: string;
  validThrough: string;
  permitStatus: string;
  verifiedAt: string;
  disclosedFields: Record<string, string>;
  withheldFieldsCount: number;
  privacySummary: string;
  demo: true;
}

export interface ServiceStatus {
  id: string;
  name: string;
  description: string;
  status: 'DEMONSTRATION_PROTOTYPE' | 'CONCEPT_PLANNED_PILOT' | 'AUTHORIZED_PRODUCTION';
  statusLabel: string;
  department: string;
}

export interface TrustControl {
  id: string;
  name: string;
  category: 'SECURITY' | 'PRIVACY' | 'GOVERNANCE' | 'OPERATIONS';
  status: 'PASSED' | 'REVIEW_PENDING';
  criteria: string;
  notes: string;
}

// Zod Schemas
export const VerificationRequestSchema = z.object({
  requestId: z.string(),
  verifierName: z.string(),
  permitId: z.string(),
  requestedAt: z.string(),
  requestedFields: z.array(z.string()),
  demo: z.literal(true)
});

export const ConsentDecisionSchema = z.object({
  requestId: z.string(),
  approvedFields: z.array(z.string()),
  decidedAt: z.string(),
  status: z.enum(['APPROVED', 'DECLINED']),
  demo: z.literal(true)
});
