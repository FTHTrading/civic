use mia_via_kernel::command_gateway::{ActorRole, Command, CommandGatewayKernel};

fn main() {
    println!("============================================================");
    println!("  MIA BY VIA — STANDALONE RECEIPT CHAIN INTEGRITY VERIFIER");
    println!("  SPDX-License-Identifier: Apache-2.0 OR MIT");
    println!("============================================================\n");

    let mut kernel = CommandGatewayKernel::new();

    // Execute sample state transition
    let cmd = Command {
        command_id: "cmd_verify_001".to_string(),
        aggregate_type: "CitizenIdentity".to_string(),
        aggregate_id: "id-citizen-9921".to_string(),
        trigger: "SUBMIT_ENROLLMENT".to_string(),
        actor_role: ActorRole::Citizen,
        actor_id: "citizen_key_01".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    };

    let result = kernel.execute_command(cmd);
    println!("  [+] Command Execution Status: {}", if result.success { "PASSED" } else { "FAILED" });
    println!("  [+] Generated Receipt Hash: {}", result.receipt_hash);

    // Verify SHA-256 chain integrity
    let is_valid = kernel.receipt_sealer.verify_integrity();
    println!("  [+] Receipt Chain Records: {}", kernel.receipt_sealer.chain.len());
    println!("  [+] SHA-256 Hash Chain Integrity: {}", if is_valid { "100% VERIFIED & VALID" } else { "TAMPERED / INVALID" });

    if is_valid {
        println!("\n============================================================");
        println!("  VERIFICATION COMPLETE: ZERO TAMPERING DETECTED");
        println!("============================================================");
        std::process::exit(0);
    } else {
        eprintln!("\nERROR: Hash chain verification failed!");
        std::process::exit(1);
    }
}
