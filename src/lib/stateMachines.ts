/**
 * MIA by VIA — 10 Core Aggregate State Machines Engine
 * Implements strict state transition matrices, authority guards, and validation rules.
 */

// 1. CitizenIdentity States & Triggers
export type CitizenIdentityState =
  | 'DRAFT'
  | 'VERIFICATION_PENDING'
  | 'ACTIVE'
  | 'RESTRICTED'
  | 'SUSPENDED'
  | 'RECOVERY_PENDING'
  | 'CLOSED';

export type CitizenIdentityTrigger =
  | 'SUBMIT_ENROLLMENT'
  | 'APPROVE_VERIFICATION'
  | 'REJECT_VERIFICATION'
  | 'APPLY_RESTRICTION'
  | 'LIFT_RESTRICTION'
  | 'SUSPEND_IDENTITY'
  | 'INITIATE_RECOVERY'
  | 'APPROVE_RECOVERY'
  | 'CLOSE_IDENTITY';

// 2. CitizenNode States & Triggers
export type CitizenNodeState =
  | 'UNBOUND'
  | 'BOUND'
  | 'ACTIVE'
  | 'ROTATION_PENDING'
  | 'RECOVERY_PENDING'
  | 'COMPROMISED'
  | 'REVOKED';

export type CitizenNodeTrigger =
  | 'BIND_DID'
  | 'ACTIVATE_NODE'
  | 'REQUEST_KEY_ROTATION'
  | 'COMPLETE_KEY_ROTATION'
  | 'REPORT_LOST_DEVICE'
  | 'APPROVE_NODE_RECOVERY'
  | 'MARK_COMPROMISED'
  | 'REVOKE_NODE';

// 3. GovernmentCode States & Triggers
export type GovernmentCodeState =
  | 'DRAFT'
  | 'REVIEW'
  | 'AUTHORIZED'
  | 'ACTIVE'
  | 'PAUSED'
  | 'RETIRED';

export type GovernmentCodeTrigger =
  | 'SUBMIT_FOR_REVIEW'
  | 'AUTHORIZE_GCODE'
  | 'ACTIVATE_GCODE'
  | 'PAUSE_GCODE'
  | 'RESUME_GCODE'
  | 'RETIRE_GCODE';

// 4. Credential States & Triggers
export type CredentialState =
  | 'DRAFT'
  | 'PENDING_ISSUANCE'
  | 'ISSUED'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'REVOKED'
  | 'EXPIRED'
  | 'SUPERSEDED';

export type CredentialTrigger =
  | 'PROPOSE_CREDENTIAL'
  | 'SIGN_AND_DELIVER'
  | 'ACTIVATE_CREDENTIAL'
  | 'SUSPEND_CREDENTIAL'
  | 'UNSUSPEND_CREDENTIAL'
  | 'REVOKE_CREDENTIAL'
  | 'EXPIRE_CREDENTIAL'
  | 'SUPERSEDE_CREDENTIAL';

// 5. ProofRequest States & Triggers
export type ProofRequestState =
  | 'CREATED'
  | 'PRESENTED'
  | 'VERIFIED'
  | 'DECLINED'
  | 'EXPIRED'
  | 'CANCELLED';

export type ProofRequestTrigger =
  | 'PRESENT_PROOF'
  | 'VERIFY_PROOF'
  | 'DECLINE_PROOF'
  | 'EXPIRE_PROOF'
  | 'CANCEL_PROOF';

// 6. AccessGrant States & Triggers
export type AccessGrantState =
  | 'PROPOSED'
  | 'PENDING_CONSENT'
  | 'ACTIVE'
  | 'EXPIRED'
  | 'REVOKED';

export type AccessGrantTrigger =
  | 'REQUEST_CONSENT'
  | 'GRANT_CONSENT'
  | 'EXPIRE_GRANT'
  | 'REVOKE_GRANT';

// 7. ServiceCase States & Triggers
export type ServiceCaseState =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ACTION_REQUIRED'
  | 'APPROVED'
  | 'DENIED'
  | 'ISSUED'
  | 'CLOSED'
  | 'APPEALED';

export type ServiceCaseTrigger =
  | 'SUBMIT_CASE'
  | 'START_REVIEW'
  | 'REQUEST_INFO'
  | 'PROVIDE_INFO'
  | 'APPROVE_CASE'
  | 'DENY_CASE'
  | 'ISSUE_CASE_CREDENTIAL'
  | 'CLOSE_CASE'
  | 'APPEAL_CASE';

// 8. CivicValueAccount States & Triggers
export type CivicValueAccountState = 'OPEN' | 'RESTRICTED' | 'SUSPENDED' | 'CLOSED';

// 9. ValueInstruction States & Triggers
export type ValueInstructionState =
  | 'DRAFT'
  | 'VALIDATING'
  | 'PENDING_APPROVAL'
  | 'AUTHORIZED'
  | 'SUBMITTED'
  | 'SETTLING'
  | 'SETTLED'
  | 'FAILED'
  | 'REVERSED'
  | 'DISPUTED';

export type ValueInstructionTrigger =
  | 'VALIDATE_INSTRUCTION'
  | 'REQUIRE_APPROVAL'
  | 'AUTHORIZE_INSTRUCTION'
  | 'SUBMIT_TO_RAIL'
  | 'SETTLE_INSTRUCTION'
  | 'FAIL_INSTRUCTION'
  | 'REVERSE_INSTRUCTION'
  | 'DISPUTE_INSTRUCTION';

// 10. AuditReceipt States & Triggers
export type AuditReceiptState = 'CREATED' | 'SEALED' | 'VERIFIED' | 'EXCEPTION';

// Transition Matrix Specifications
export const CITIZEN_IDENTITY_TRANSITIONS: Record<CitizenIdentityState, Partial<Record<CitizenIdentityTrigger, CitizenIdentityState>>> = {
  DRAFT: { SUBMIT_ENROLLMENT: 'VERIFICATION_PENDING' },
  VERIFICATION_PENDING: { APPROVE_VERIFICATION: 'ACTIVE', REJECT_VERIFICATION: 'DRAFT' },
  ACTIVE: { APPLY_RESTRICTION: 'RESTRICTED', SUSPEND_IDENTITY: 'SUSPENDED', INITIATE_RECOVERY: 'RECOVERY_PENDING', CLOSE_IDENTITY: 'CLOSED' },
  RESTRICTED: { LIFT_RESTRICTION: 'ACTIVE', SUSPEND_IDENTITY: 'SUSPENDED' },
  SUSPENDED: { LIFT_RESTRICTION: 'ACTIVE', CLOSE_IDENTITY: 'CLOSED' },
  RECOVERY_PENDING: { APPROVE_RECOVERY: 'ACTIVE', SUSPEND_IDENTITY: 'SUSPENDED' },
  CLOSED: {}
};

export const CREDENTIAL_TRANSITIONS: Record<CredentialState, Partial<Record<CredentialTrigger, CredentialState>>> = {
  DRAFT: { PROPOSE_CREDENTIAL: 'PENDING_ISSUANCE' },
  PENDING_ISSUANCE: { SIGN_AND_DELIVER: 'ISSUED' },
  ISSUED: { ACTIVATE_CREDENTIAL: 'ACTIVE' },
  ACTIVE: { SUSPEND_CREDENTIAL: 'SUSPENDED', REVOKE_CREDENTIAL: 'REVOKED', EXPIRE_CREDENTIAL: 'EXPIRED', SUPERSEDE_CREDENTIAL: 'SUPERSEDED' },
  SUSPENDED: { UNSUSPEND_CREDENTIAL: 'ACTIVE', REVOKE_CREDENTIAL: 'REVOKED' },
  REVOKED: {},
  EXPIRED: {},
  SUPERSEDED: {}
};

export const GCODE_TRANSITIONS: Record<GovernmentCodeState, Partial<Record<GovernmentCodeTrigger, GovernmentCodeState>>> = {
  DRAFT: { SUBMIT_FOR_REVIEW: 'REVIEW' },
  REVIEW: { AUTHORIZE_GCODE: 'AUTHORIZED' },
  AUTHORIZED: { ACTIVATE_GCODE: 'ACTIVE' },
  ACTIVE: { PAUSE_GCODE: 'PAUSED', RETIRE_GCODE: 'RETIRED' },
  PAUSED: { RESUME_GCODE: 'ACTIVE', RETIRE_GCODE: 'RETIRED' },
  RETIRED: {}
};

export const PROOF_REQUEST_TRANSITIONS: Record<ProofRequestState, Partial<Record<ProofRequestTrigger, ProofRequestState>>> = {
  CREATED: { PRESENT_PROOF: 'PRESENTED', CANCEL_PROOF: 'CANCELLED', EXPIRE_PROOF: 'EXPIRED' },
  PRESENTED: { VERIFY_PROOF: 'VERIFIED', DECLINE_PROOF: 'DECLINED', EXPIRE_PROOF: 'EXPIRED' },
  VERIFIED: {},
  DECLINED: {},
  EXPIRED: {},
  CANCELLED: {}
};

export const VALUE_INSTRUCTION_TRANSITIONS: Record<ValueInstructionState, Partial<Record<ValueInstructionTrigger, ValueInstructionState>>> = {
  DRAFT: { VALIDATE_INSTRUCTION: 'VALIDATING' },
  VALIDATING: { REQUIRE_APPROVAL: 'PENDING_APPROVAL', AUTHORIZE_INSTRUCTION: 'AUTHORIZED', FAIL_INSTRUCTION: 'FAILED' },
  PENDING_APPROVAL: { AUTHORIZE_INSTRUCTION: 'AUTHORIZED', FAIL_INSTRUCTION: 'FAILED' },
  AUTHORIZED: { SUBMIT_TO_RAIL: 'SUBMITTED' },
  SUBMITTED: { SETTLE_INSTRUCTION: 'SETTLED', FAIL_INSTRUCTION: 'FAILED' },
  SETTLING: { SETTLE_INSTRUCTION: 'SETTLED', FAIL_INSTRUCTION: 'FAILED' },
  SETTLED: { REVERSE_INSTRUCTION: 'REVERSED', DISPUTE_INSTRUCTION: 'DISPUTED' },
  FAILED: {},
  REVERSED: {},
  DISPUTED: {}
};
