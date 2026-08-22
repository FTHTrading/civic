//! 10 Core Aggregate State Machines Specification for MIA by VIA
//! Defines explicit enums, valid state transitions, and authority requirements.

use serde::{Deserialize, Serialize};
use std::fmt;

// ---------------------------------------------------------
// 1. CitizenIdentity
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CitizenIdentityState {
    Draft,
    VerificationPending,
    Active,
    Restricted,
    Suspended,
    RecoveryPending,
    Closed,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CitizenIdentityTrigger {
    SubmitEnrollment,
    ApproveVerification,
    RejectVerification,
    ApplyRestriction,
    LiftRestriction,
    SuspendIdentity,
    InitiateRecovery,
    ApproveRecovery,
    CloseIdentity,
}

impl CitizenIdentityState {
    pub fn transition(&self, trigger: CitizenIdentityTrigger) -> Result<Self, &'static str> {
        match (self, trigger) {
            (Self::Draft, CitizenIdentityTrigger::SubmitEnrollment) => Ok(Self::VerificationPending),
            (Self::VerificationPending, CitizenIdentityTrigger::ApproveVerification) => Ok(Self::Active),
            (Self::VerificationPending, CitizenIdentityTrigger::RejectVerification) => Ok(Self::Draft),
            (Self::Active, CitizenIdentityTrigger::ApplyRestriction) => Ok(Self::Restricted),
            (Self::Restricted, CitizenIdentityTrigger::LiftRestriction) => Ok(Self::Active),
            (Self::Active, CitizenIdentityTrigger::SuspendIdentity) => Ok(Self::Suspended),
            (Self::Suspended, CitizenIdentityTrigger::LiftRestriction) => Ok(Self::Active),
            (Self::Active, CitizenIdentityTrigger::InitiateRecovery) => Ok(Self::RecoveryPending),
            (Self::RecoveryPending, CitizenIdentityTrigger::ApproveRecovery) => Ok(Self::Active),
            (Self::Active, CitizenIdentityTrigger::CloseIdentity) => Ok(Self::Closed),
            _ => Err("Invalid state transition for CitizenIdentity"),
        }
    }
}

// ---------------------------------------------------------
// 2. CitizenNode
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CitizenNodeState {
    Unbound,
    Bound,
    Active,
    RotationPending,
    RecoveryPending,
    Compromised,
    Revoked,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CitizenNodeTrigger {
    BindDid,
    ActivateNode,
    RequestKeyRotation,
    CompleteKeyRotation,
    ReportLostDevice,
    ApproveNodeRecovery,
    MarkCompromised,
    RevokeNode,
}

impl CitizenNodeState {
    pub fn transition(&self, trigger: CitizenNodeTrigger) -> Result<Self, &'static str> {
        match (self, trigger) {
            (Self::Unbound, CitizenNodeTrigger::BindDid) => Ok(Self::Bound),
            (Self::Bound, CitizenNodeTrigger::ActivateNode) => Ok(Self::Active),
            (Self::Active, CitizenNodeTrigger::RequestKeyRotation) => Ok(Self::RotationPending),
            (Self::RotationPending, CitizenNodeTrigger::CompleteKeyRotation) => Ok(Self::Active),
            (Self::Active, CitizenNodeTrigger::ReportLostDevice) => Ok(Self::RecoveryPending),
            (Self::RecoveryPending, CitizenNodeTrigger::ApproveNodeRecovery) => Ok(Self::Active),
            (Self::Active, CitizenNodeTrigger::MarkCompromised) => Ok(Self::Compromised),
            (Self::Compromised, CitizenNodeTrigger::RevokeNode) => Ok(Self::Revoked),
            _ => Err("Invalid state transition for CitizenNode"),
        }
    }
}

// ---------------------------------------------------------
// 3. GovernmentCode
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum GovernmentCodeState {
    Draft,
    Review,
    Authorized,
    Active,
    Paused,
    Retired,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum GovernmentCodeTrigger {
    SubmitForReview,
    AuthorizeGCode,
    ActivateGCode,
    PauseGCode,
    ResumeGCode,
    RetireGCode,
}

impl GovernmentCodeState {
    pub fn transition(&self, trigger: GovernmentCodeTrigger) -> Result<Self, &'static str> {
        match (self, trigger) {
            (Self::Draft, GovernmentCodeTrigger::SubmitForReview) => Ok(Self::Review),
            (Self::Review, GovernmentCodeTrigger::AuthorizeGCode) => Ok(Self::Authorized),
            (Self::Authorized, GovernmentCodeTrigger::ActivateGCode) => Ok(Self::Active),
            (Self::Active, GovernmentCodeTrigger::PauseGCode) => Ok(Self::Paused),
            (Self::Paused, GovernmentCodeTrigger::ResumeGCode) => Ok(Self::Active),
            (Self::Active, GovernmentCodeTrigger::RetireGCode) => Ok(Self::Retired),
            _ => Err("Invalid state transition for GovernmentCode"),
        }
    }
}

// ---------------------------------------------------------
// 4. Credential (Verifiable Credential)
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CredentialState {
    Draft,
    PendingIssuance,
    Issued,
    Active,
    Suspended,
    Revoked,
    Expired,
    Superseded,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CredentialTrigger {
    ProposeCredential,
    SignAndDeliver,
    ActivateCredential,
    SuspendCredential,
    UnsuspendCredential,
    RevokeCredential,
    ExpireCredential,
    SupersedeCredential,
}

impl CredentialState {
    pub fn transition(&self, trigger: CredentialTrigger) -> Result<Self, &'static str> {
        match (self, trigger) {
            (Self::Draft, CredentialTrigger::ProposeCredential) => Ok(Self::PendingIssuance),
            (Self::PendingIssuance, CredentialTrigger::SignAndDeliver) => Ok(Self::Issued),
            (Self::Issued, CredentialTrigger::ActivateCredential) => Ok(Self::Active),
            (Self::Active, CredentialTrigger::SuspendCredential) => Ok(Self::Suspended),
            (Self::Suspended, CredentialTrigger::UnsuspendCredential) => Ok(Self::Active),
            (Self::Active, CredentialTrigger::RevokeCredential) => Ok(Self::Revoked),
            (Self::Active, CredentialTrigger::ExpireCredential) => Ok(Self::Expired),
            (Self::Active, CredentialTrigger::SupersedeCredential) => Ok(Self::Superseded),
            _ => Err("Invalid state transition for Credential"),
        }
    }
}

// ---------------------------------------------------------
// 5. ProofRequest
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ProofRequestState {
    Created,
    Presented,
    Verified,
    Declined,
    Expired,
    Cancelled,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ProofRequestTrigger {
    PresentProof,
    VerifyProof,
    DeclineProof,
    ExpireProof,
    CancelProof,
}

impl ProofRequestState {
    pub fn transition(&self, trigger: ProofRequestTrigger) -> Result<Self, &'static str> {
        match (self, trigger) {
            (Self::Created, ProofRequestTrigger::PresentProof) => Ok(Self::Presented),
            (Self::Presented, ProofRequestTrigger::VerifyProof) => Ok(Self::Verified),
            (Self::Presented, ProofRequestTrigger::DeclineProof) => Ok(Self::Declined),
            (Self::Created, ProofRequestTrigger::CancelProof) => Ok(Self::Cancelled),
            (Self::Created, ProofRequestTrigger::ExpireProof) => Ok(Self::Expired),
            _ => Err("Invalid state transition for ProofRequest"),
        }
    }
}

// ---------------------------------------------------------
// 6. AccessGrant
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AccessGrantState {
    Proposed,
    PendingConsent,
    Active,
    Expired,
    Revoked,
}

// ---------------------------------------------------------
// 7. ServiceCase
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ServiceCaseState {
    Draft,
    Submitted,
    UnderReview,
    ActionRequired,
    Approved,
    Denied,
    Issued,
    Closed,
    Appealed,
}

// ---------------------------------------------------------
// 8. CivicValueAccount
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CivicValueAccountState {
    Open,
    Restricted,
    Suspended,
    Closed,
}

// ---------------------------------------------------------
// 9. ValueInstruction
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum ValueInstructionState {
    Draft,
    Validating,
    PendingApproval,
    Authorized,
    Submitted,
    Settling,
    Settled,
    Failed,
    Reversed,
    Disputed,
}

// ---------------------------------------------------------
// 10. AuditReceipt
// ---------------------------------------------------------
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AuditReceiptState {
    Created,
    Sealed,
    Verified,
    Exception,
}

impl fmt::Display for CitizenIdentityState {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl fmt::Display for CredentialState {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl fmt::Display for GovernmentCodeState {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}
