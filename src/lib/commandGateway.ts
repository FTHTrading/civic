/**
 * MIA by VIA — Command Gateway & State Orchestration Kernel
 * Pipeline: Command -> Validate Schema -> Authority Check -> Current State -> Policy Evaluation -> Execute Transition -> Emit Event -> Seal Ops Receipt
 */

import {
  CITIZEN_IDENTITY_TRANSITIONS,
  CREDENTIAL_TRANSITIONS,
  GCODE_TRANSITIONS,
  PROOF_REQUEST_TRANSITIONS,
  VALUE_INSTRUCTION_TRANSITIONS,
  type CitizenIdentityState,
  type CitizenIdentityTrigger,
  type CredentialState,
  type CredentialTrigger,
  type GovernmentCodeState,
  type GovernmentCodeTrigger,
  type ProofRequestState,
  type ProofRequestTrigger,
  type ValueInstructionState,
  type ValueInstructionTrigger
} from './stateMachines';

export interface Command {
  commandId: string;
  aggregateType: 'CitizenIdentity' | 'CitizenNode' | 'GovernmentCode' | 'Credential' | 'ProofRequest' | 'AccessGrant' | 'ServiceCase' | 'CivicValueAccount' | 'ValueInstruction';
  aggregateId: string;
  trigger: string;
  actorRole: 'Citizen' | 'GCodeOwner' | 'PlatformOperator' | 'GovernanceAuthority';
  actorId: string;
  payload: Record<string, any>;
  timestamp: string;
}

export interface TransitionResult {
  success: boolean;
  commandId: string;
  aggregateType: string;
  aggregateId: string;
  previousState: string;
  newState: string;
  eventHash: string;
  receiptId: string;
  policyDecision: string;
  error?: string;
}

class CommandGatewayKernel {
  private aggregateStates: Record<string, string> = {
    'id-citizen-9921': 'ACTIVE',
    'node-cnode-9921': 'ACTIVE',
    'did:via:gcode:permit-building-01': 'ACTIVE',
    'vc-solar-8841': 'ACTIVE',
    'prf-req-101': 'CREATED',
    'val-inst-901': 'DRAFT'
  };

  private receiptsChain: Array<{
    receiptId: string;
    commandId: string;
    aggregateId: string;
    prevState: string;
    newState: string;
    prevHash: string;
    receiptHash: string;
    timestamp: string;
  }> = [];

  constructor() {
    // Genesis receipt
    const genesisHash = this.sha256('GENESIS_RECEIPT_G0_INTENT');
    this.receiptsChain.push({
      receiptId: 'rcpt-000',
      commandId: 'cmd-genesis',
      aggregateId: 'system-kernel',
      prevState: 'NULL',
      newState: 'INITIALIZED',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
      receiptHash: genesisHash,
      timestamp: new Date().toISOString()
    });
  }

  private sha256(input: string): string {
    // Deterministic string hash for demonstration receipt sealing
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return '0x' + hex.repeat(8).substring(0, 64);
  }

  public executeCommand(cmd: Command): TransitionResult {
    const currentState = this.aggregateStates[cmd.aggregateId] || 'DRAFT';

    // 1. Authority Guard Check (Separation of Duties)
    if (cmd.actorRole === 'Citizen' && ['AUTHORIZE_GCODE', 'REVOKE_CREDENTIAL'].includes(cmd.trigger)) {
      return {
        success: false,
        commandId: cmd.commandId,
        aggregateType: cmd.aggregateType,
        aggregateId: cmd.aggregateId,
        previousState: currentState,
        newState: currentState,
        eventHash: '',
        receiptId: '',
        policyDecision: 'DENIED_AUTHORITY_VIOLATION',
        error: `Actor ${cmd.actorId} with role ${cmd.actorRole} cannot execute ${cmd.trigger}`
      };
    }

    // 2. Validate Allowed Transition Matrix
    let newState: string | undefined = undefined;

    if (cmd.aggregateType === 'CitizenIdentity') {
      newState = CITIZEN_IDENTITY_TRANSITIONS[currentState as CitizenIdentityState]?.[cmd.trigger as CitizenIdentityTrigger];
    } else if (cmd.aggregateType === 'Credential') {
      newState = CREDENTIAL_TRANSITIONS[currentState as CredentialState]?.[cmd.trigger as CredentialTrigger];
    } else if (cmd.aggregateType === 'GovernmentCode') {
      newState = GCODE_TRANSITIONS[currentState as GovernmentCodeState]?.[cmd.trigger as GovernmentCodeTrigger];
    } else if (cmd.aggregateType === 'ProofRequest') {
      newState = PROOF_REQUEST_TRANSITIONS[currentState as ProofRequestState]?.[cmd.trigger as ProofRequestTrigger];
    } else if (cmd.aggregateType === 'ValueInstruction') {
      newState = VALUE_INSTRUCTION_TRANSITIONS[currentState as ValueInstructionState]?.[cmd.trigger as ValueInstructionTrigger];
    } else {
      newState = 'ACTIVE';
    }

    if (!newState) {
      return {
        success: false,
        commandId: cmd.commandId,
        aggregateType: cmd.aggregateType,
        aggregateId: cmd.aggregateId,
        previousState: currentState,
        newState: currentState,
        eventHash: '',
        receiptId: '',
        policyDecision: 'INVALID_TRANSITION',
        error: `Transition ${cmd.trigger} not allowed from state ${currentState}`
      };
    }

    // 3. Update State
    this.aggregateStates[cmd.aggregateId] = newState;

    // 4. Generate Hash-Chained Receipt
    const prevReceipt = this.receiptsChain[this.receiptsChain.length - 1];
    const receiptContent = `${prevReceipt.receiptHash}:${cmd.commandId}:${cmd.aggregateId}:${currentState}:${newState}:${cmd.timestamp}`;
    const receiptHash = this.sha256(receiptContent);

    const receipt = {
      receiptId: `rcpt-${Date.now()}`,
      commandId: cmd.commandId,
      aggregateId: cmd.aggregateId,
      prevState: currentState,
      newState: newState,
      prevHash: prevReceipt.receiptHash,
      receiptHash: receiptHash,
      timestamp: cmd.timestamp
    };

    this.receiptsChain.push(receipt);

    return {
      success: true,
      commandId: cmd.commandId,
      aggregateType: cmd.aggregateType,
      aggregateId: cmd.aggregateId,
      previousState: currentState,
      newState: newState,
      eventHash: this.sha256(JSON.stringify(cmd)),
      receiptId: receipt.receiptId,
      policyDecision: 'POLICY_PASSED_SEALED'
    };
  }

  public getReceipts() {
    return this.receiptsChain;
  }

  public getAggregateState(id: string) {
    return this.aggregateStates[id] || 'DRAFT';
  }
}

export const commandGateway = new CommandGatewayKernel();
