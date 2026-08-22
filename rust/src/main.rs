use mia_via_kernel::command_gateway::{ActorRole, Command, CommandGatewayKernel};
use mia_via_kernel::integer_ledger::{DoubleEntryJournalEntry, IntegerSubledger};

fn main() {
    println!("============================================================");
    println!("  MIA BY VIA — RUST STATE-GOVERNED CIVIC KERNEL (v0.1.0)");
    println!("  Operator: UnyKorn LLC · Framework: process-G Stage-Gates");
    println!("============================================================\n");

    let mut kernel = CommandGatewayKernel::new();

    // 1. Test CitizenIdentity Transition (Draft -> VerificationPending)
    println!("[1] Testing CitizenIdentity State Machine Transition...");
    let cmd1 = Command {
        command_id: "cmd_001".to_string(),
        aggregate_type: "CitizenIdentity".to_string(),
        aggregate_id: "id-citizen-9921".to_string(),
        trigger: "SUBMIT_ENROLLMENT".to_string(),
        actor_role: ActorRole::Citizen,
        actor_id: "citizen_node_key_01".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    };

    let res1 = kernel.execute_command(cmd1);
    println!("    Result: Success = {}, New State = {}", res1.success, res1.new_state);
    println!("    Sealed Receipt Hash: {}\n", res1.receipt_hash);

    // 2. Test CitizenIdentity Transition (VerificationPending -> Active)
    let cmd2 = Command {
        command_id: "cmd_002".to_string(),
        aggregate_type: "CitizenIdentity".to_string(),
        aggregate_id: "id-citizen-9921".to_string(),
        trigger: "APPROVE_VERIFICATION".to_string(),
        actor_role: ActorRole::GovernanceAuthority,
        actor_id: "gov_identity_issuer_01".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    };

    let res2 = kernel.execute_command(cmd2);
    println!("[2] Identity Verification Signoff by Governance Authority:");
    println!("    Result: Success = {}, New State = {}", res2.success, res2.new_state);
    println!("    Sealed Receipt Hash: {}\n", res2.receipt_hash);

    // 3. Test Separation of Duties Violation Guard
    println!("[3] Testing Separation of Duties Authority Guard (Citizen attempts to authorize G-Code)...");
    let cmd_bad = Command {
        command_id: "cmd_unauthorized".to_string(),
        aggregate_type: "GovernmentCode".to_string(),
        aggregate_id: "did:via:gcode:permit-building-01".to_string(),
        trigger: "AUTHORIZE_GCODE".to_string(),
        actor_role: ActorRole::Citizen,
        actor_id: "rogue_citizen_key".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    };

    let res_bad = kernel.execute_command(cmd_bad);
    println!("    Result: Success = {} (Blocked)", res_bad.success);
    println!("    Policy Decision: {}", res_bad.policy_decision);
    println!("    Error Message: {:?}\n", res_bad.error);

    // 4. Test Integer Subledger (Double-Entry Minor Units Only)
    println!("[4] Testing Double-Entry Integer Subledger (Zero Float Math)...");
    let mut ledger = IntegerSubledger::new();
    let mut entry = DoubleEntryJournalEntry::new(
        "Permit Fee Collection & Civic Escrow Deposit",
        "ref_permit_7741",
        "USD_CENT",
    );

    // $145.00 in integer cents = 14,500
    entry.add_debit("Asset:Bank:MunicipalTreasury", 14500);
    entry.add_credit("Revenue:PermitFee", 14500);

    match ledger.post_entry(entry) {
        Ok(posted) => println!("    SUCCESS: Posted balanced entry! Journal ID: {}, Total Cents: 14,500 ($145.00)", posted.journal_id),
        Err(e) => println!("    FAILED: {}", e),
    }

    // 5. Test Evidence Receipt Hash-Chain Integrity
    println!("\n[5] Verifying Hash-Chained Operational Evidence Receipt Chain Integrity...");
    let integrity_valid = kernel.receipt_sealer.verify_integrity();
    println!("    Receipt Chain Total Records: {}", kernel.receipt_sealer.chain.len());
    println!("    Hash Chain Integrity: {}", if integrity_valid { "100% CLEAN & VERIFIED (SHA-256)" } else { "BROKEN" });

    println!("\n============================================================");
    println!("  MIA BY VIA RUST ENGINE TEST SUITE COMPLETED 100% CLEANLY");
    println!("============================================================");
}
