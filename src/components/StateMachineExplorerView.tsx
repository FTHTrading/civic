import React, { useState } from 'react';
import { commandGateway } from '../lib/commandGateway';
import type { Command, TransitionResult } from '../lib/commandGateway';
import {
  CITIZEN_IDENTITY_TRANSITIONS,
  CREDENTIAL_TRANSITIONS,
  GCODE_TRANSITIONS,
  PROOF_REQUEST_TRANSITIONS,
  VALUE_INSTRUCTION_TRANSITIONS
} from '../lib/stateMachines';
import { CheckCircle, AlertTriangle, Cpu, Terminal, Lock, Play } from 'lucide-react';

export const StateMachineExplorerView: React.FC = () => {
  const [selectedAggregate, setSelectedAggregate] = useState<
    'CitizenIdentity' | 'CitizenNode' | 'GovernmentCode' | 'Credential' | 'ProofRequest' | 'ValueInstruction'
  >('CitizenIdentity');

  const [aggregateId, setAggregateId] = useState('id-citizen-9921');
  const [actorRole, setActorRole] = useState<'Citizen' | 'GCodeOwner' | 'PlatformOperator' | 'GovernanceAuthority'>('GovernanceAuthority');
  const [selectedTrigger, setSelectedTrigger] = useState('APPROVE_VERIFICATION');

  const [lastResult, setLastResult] = useState<TransitionResult | null>(null);
  const [receipts, setReceipts] = useState(commandGateway.getReceipts());

  const currentState = commandGateway.getAggregateState(aggregateId);

  const getTriggersForAggregate = () => {
    if (selectedAggregate === 'CitizenIdentity') {
      return Object.keys(CITIZEN_IDENTITY_TRANSITIONS[currentState as keyof typeof CITIZEN_IDENTITY_TRANSITIONS] || {});
    }
    if (selectedAggregate === 'Credential') {
      return Object.keys(CREDENTIAL_TRANSITIONS[currentState as keyof typeof CREDENTIAL_TRANSITIONS] || {});
    }
    if (selectedAggregate === 'GovernmentCode') {
      return Object.keys(GCODE_TRANSITIONS[currentState as keyof typeof GCODE_TRANSITIONS] || {});
    }
    if (selectedAggregate === 'ProofRequest') {
      return Object.keys(PROOF_REQUEST_TRANSITIONS[currentState as keyof typeof PROOF_REQUEST_TRANSITIONS] || {});
    }
    if (selectedAggregate === 'ValueInstruction') {
      return Object.keys(VALUE_INSTRUCTION_TRANSITIONS[currentState as keyof typeof VALUE_INSTRUCTION_TRANSITIONS] || {});
    }
    return ['ACTIVATE_NODE', 'MARK_COMPROMISED', 'REVOKE_NODE'];
  };

  const handleExecuteCommand = () => {
    const cmd: Command = {
      commandId: `cmd-${Date.now()}`,
      aggregateType: selectedAggregate,
      aggregateId: aggregateId,
      trigger: selectedTrigger,
      actorRole: actorRole,
      actorId: `actor-${actorRole.toLowerCase()}-01`,
      payload: { note: 'Executed via State Machine Command Gateway' },
      timestamp: new Date().toISOString()
    };

    const result = commandGateway.executeCommand(cmd);
    setLastResult(result);
    setReceipts([...commandGateway.getReceipts()]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-teal-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-black tracking-tight text-white">
                MIA by VIA <span className="text-cyan-400">State Machine Kernel</span>
              </h1>
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-mono font-bold">
                PROCESS-G ENFORCED
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Object + State + Allowed Transition + Evidence Receipt · 10 Core Aggregates · Hash-Chained Sealer
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-mono block">ORCHESTRATOR STATUS</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE COMMAND GATEWAY
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Command Gateway Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Command Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            Command Ingress Pipeline
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Select Aggregate Machine
            </label>
            <select
              value={selectedAggregate}
              onChange={(e: any) => {
                setSelectedAggregate(e.target.value);
                if (e.target.value === 'CitizenIdentity') setAggregateId('id-citizen-9921');
                if (e.target.value === 'Credential') setAggregateId('vc-solar-8841');
                if (e.target.value === 'GovernmentCode') setAggregateId('did:via:gcode:permit-building-01');
                if (e.target.value === 'ProofRequest') setAggregateId('prf-req-101');
                if (e.target.value === 'ValueInstruction') setAggregateId('val-inst-901');
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-sm"
            >
              <option value="CitizenIdentity">1. CitizenIdentity (Resident Profile)</option>
              <option value="CitizenNode">2. CitizenNode (C-Node & Wallet)</option>
              <option value="GovernmentCode">3. GovernmentCode (G-Code Service)</option>
              <option value="Credential">4. Credential (W3C Verifiable Credential)</option>
              <option value="ProofRequest">5. ProofRequest (Selective Disclosure)</option>
              <option value="ValueInstruction">9. ValueInstruction (Civic Payment)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Aggregate ID
            </label>
            <input
              type="text"
              value={aggregateId}
              onChange={(e) => setAggregateId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Actor Role (Separation of Duties)
            </label>
            <select
              value={actorRole}
              onChange={(e: any) => setActorRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-sm"
            >
              <option value="GovernanceAuthority">GovernanceAuthority (Full Legitimate Power)</option>
              <option value="GCodeOwner">GCodeOwner (Departmental Admin)</option>
              <option value="PlatformOperator">PlatformOperator (Infrastructure Key)</option>
              <option value="Citizen">Citizen (Resident Node Key)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Command Trigger
            </label>
            <select
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-sm"
            >
              {getTriggersForAggregate().map((trig) => (
                <option key={trig} value={trig}>
                  {trig}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleExecuteCommand}
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Execute Command & Seal Receipt
          </button>
        </div>

        {/* Current State & Validation Result */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active State Container */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Active Aggregate State Monitor
            </h3>
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400">{selectedAggregate}</span>
                <h4 className="text-xl font-bold text-white font-mono">{aggregateId}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">CURRENT STATE</span>
                <span className="text-lg font-black text-amber-400 font-mono px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-lg">
                  {currentState}
                </span>
              </div>
            </div>

            {/* Execution Feedback */}
            {lastResult && (
              <div
                className={`mt-4 p-4 rounded-xl border ${
                  lastResult.success
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {lastResult.success ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-rose-400" />}
                  <span>{lastResult.success ? 'State Transition Sealed Cleanly' : 'Command Execution Blocked'}</span>
                </div>
                <p className="text-xs font-mono opacity-90">
                  {lastResult.success
                    ? `Transition: ${lastResult.previousState} ➔ ${lastResult.newState} | Policy: ${lastResult.policyDecision}`
                    : `Error: ${lastResult.error}`}
                </p>
                {lastResult.receiptId && (
                  <div className="mt-2 text-[10px] font-mono text-cyan-300 bg-slate-950/60 p-2 rounded">
                    Receipt ID: {lastResult.receiptId} | Event Hash: {lastResult.eventHash.substring(0, 16)}...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sealed Evidence Receipts Chain */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                Hash-Chained Operational Receipts (.anvil/ops.receipts.jsonl)
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                CHAIN INTEGRITY VERIFIED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2">Receipt ID</th>
                    <th className="pb-2">Aggregate</th>
                    <th className="pb-2">Transition</th>
                    <th className="pb-2">Previous Hash</th>
                    <th className="pb-2">Receipt Hash (SHA-256)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {receipts.slice(-5).map((rcpt) => (
                    <tr key={rcpt.receiptId} className="hover:bg-slate-800/30">
                      <td className="py-2.5 text-cyan-400">{rcpt.receiptId}</td>
                      <td className="py-2.5 text-white">{rcpt.aggregateId}</td>
                      <td className="py-2.5 text-amber-300">
                        {rcpt.prevState} ➔ {rcpt.newState}
                      </td>
                      <td className="py-2.5 text-slate-500">{rcpt.prevHash.substring(0, 12)}...</td>
                      <td className="py-2.5 text-emerald-400">{rcpt.receiptHash.substring(0, 12)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
