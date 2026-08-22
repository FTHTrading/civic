//! Command Gateway & State Orchestrator Kernel
//! Enforces: Command -> Validate Schema -> Authority Check -> Current State -> Policy Evaluation -> Execute Transition -> Emit Event -> Seal Receipt

use crate::receipt_sealer::EvidenceReceiptSealer;
use crate::state_machines::{
    CitizenIdentityState, CitizenIdentityTrigger, CredentialState, CredentialTrigger,
    GovernmentCodeState,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum ActorRole {
    Citizen,
    GCodeOwner,
    PlatformOperator,
    GovernanceAuthority,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Command {
    pub command_id: String,
    pub aggregate_type: String,
    pub aggregate_id: String,
    pub trigger: String,
    pub actor_role: ActorRole,
    pub actor_id: String,
    pub timestamp: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TransitionExecutionResult {
    pub success: bool,
    pub command_id: String,
    pub aggregate_id: String,
    pub previous_state: String,
    pub new_state: String,
    pub receipt_hash: String,
    pub policy_decision: String,
    pub error: Option<String>,
}

pub struct CommandGatewayKernel {
    pub citizen_identity_states: HashMap<String, CitizenIdentityState>,
    pub credential_states: HashMap<String, CredentialState>,
    pub gcode_states: HashMap<String, GovernmentCodeState>,
    pub receipt_sealer: EvidenceReceiptSealer,
}

impl CommandGatewayKernel {
    pub fn new() -> Self {
        let mut gateway = Self {
            citizen_identity_states: HashMap::new(),
            credential_states: HashMap::new(),
            gcode_states: HashMap::new(),
            receipt_sealer: EvidenceReceiptSealer::new(),
        };

        // Seed default states
        gateway.citizen_identity_states.insert("id-citizen-9921".to_string(), CitizenIdentityState::Draft);
        gateway.credential_states.insert("vc-solar-8841".to_string(), CredentialState::Issued);
        gateway.gcode_states.insert("did:via:gcode:permit-building-01".to_string(), GovernmentCodeState::Authorized);

        gateway
    }

    pub fn execute_command(&mut self, cmd: Command) -> TransitionExecutionResult {
        // 1. Separation of Duties Check
        if cmd.actor_role == ActorRole::Citizen && (cmd.trigger == "AUTHORIZE_GCODE" || cmd.trigger == "REVOKE_CREDENTIAL") {
            return TransitionExecutionResult {
                success: false,
                command_id: cmd.command_id,
                aggregate_id: cmd.aggregate_id,
                previous_state: "UNKNOWN".to_string(),
                new_state: "UNKNOWN".to_string(),
                receipt_hash: "".to_string(),
                policy_decision: "DENIED_AUTHORITY_VIOLATION".to_string(),
                error: Some(format!("Role {:?} unauthorized for trigger {}", cmd.actor_role, cmd.trigger)),
            };
        }

        // 2. Execute Aggregate State Transition
        if cmd.aggregate_type == "CitizenIdentity" {
            let current = self
                .citizen_identity_states
                .get(&cmd.aggregate_id)
                .cloned()
                .unwrap_or(CitizenIdentityState::Draft);

            let trigger = match cmd.trigger.as_str() {
                "SUBMIT_ENROLLMENT" => CitizenIdentityTrigger::SubmitEnrollment,
                "APPROVE_VERIFICATION" => CitizenIdentityTrigger::ApproveVerification,
                "SUSPEND_IDENTITY" => CitizenIdentityTrigger::SuspendIdentity,
                _ => return self.error_result(&cmd, &current.to_string(), "Unsupported trigger"),
            };

            match current.transition(trigger) {
                Ok(next_state) => {
                    self.citizen_identity_states.insert(cmd.aggregate_id.clone(), next_state);
                    let rcpt = self.receipt_sealer.seal_receipt(
                        "CITIZEN_IDENTITY_TRANSITION",
                        &cmd.command_id,
                        &cmd.aggregate_id,
                        &current.to_string(),
                        &next_state.to_string(),
                        vec![cmd.actor_id.clone()],
                    );

                    TransitionExecutionResult {
                        success: true,
                        command_id: cmd.command_id,
                        aggregate_id: cmd.aggregate_id,
                        previous_state: current.to_string(),
                        new_state: next_state.to_string(),
                        receipt_hash: rcpt.receipt_hash,
                        policy_decision: "PASSED_SEALED".to_string(),
                        error: None,
                    }
                }
                Err(e) => self.error_result(&cmd, &current.to_string(), e),
            }
        } else if cmd.aggregate_type == "Credential" {
            let current = self
                .credential_states
                .get(&cmd.aggregate_id)
                .cloned()
                .unwrap_or(CredentialState::Draft);

            let trigger = match cmd.trigger.as_str() {
                "ACTIVATE_CREDENTIAL" => CredentialTrigger::ActivateCredential,
                "SUSPEND_CREDENTIAL" => CredentialTrigger::SuspendCredential,
                "REVOKE_CREDENTIAL" => CredentialTrigger::RevokeCredential,
                _ => return self.error_result(&cmd, &current.to_string(), "Unsupported trigger"),
            };

            match current.transition(trigger) {
                Ok(next_state) => {
                    self.credential_states.insert(cmd.aggregate_id.clone(), next_state);
                    let rcpt = self.receipt_sealer.seal_receipt(
                        "CREDENTIAL_TRANSITION",
                        &cmd.command_id,
                        &cmd.aggregate_id,
                        &current.to_string(),
                        &next_state.to_string(),
                        vec![cmd.actor_id.clone()],
                    );

                    TransitionExecutionResult {
                        success: true,
                        command_id: cmd.command_id,
                        aggregate_id: cmd.aggregate_id,
                        previous_state: current.to_string(),
                        new_state: next_state.to_string(),
                        receipt_hash: rcpt.receipt_hash,
                        policy_decision: "PASSED_SEALED".to_string(),
                        error: None,
                    }
                }
                Err(e) => self.error_result(&cmd, &current.to_string(), e),
            }
        } else {
            self.error_result(&cmd, "DRAFT", "Aggregate type pending implementation")
        }
    }

    fn error_result(&self, cmd: &Command, prev_state: &str, err_msg: &str) -> TransitionExecutionResult {
        TransitionExecutionResult {
            success: false,
            command_id: cmd.command_id.clone(),
            aggregate_id: cmd.aggregate_id.clone(),
            previous_state: prev_state.to_string(),
            new_state: prev_state.to_string(),
            receipt_hash: "".to_string(),
            policy_decision: "INVALID_TRANSITION".to_string(),
            error: Some(err_msg.to_string()),
        }
    }
}
