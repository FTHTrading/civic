import React, { useState } from 'react';
import { MOCK_ADRS } from '../data/mockAdrs';
import type { ADRItem } from '../data/mockAdrs';
import { BookOpen, FileCode2, CheckCircle2, Lock, Layers } from 'lucide-react';

export const UnykornConstitutionView: React.FC = () => {
  const [selectedAdr, setSelectedAdr] = useState<ADRItem>(MOCK_ADRS[0]);

  const mappingMatrix = [
    {
      pillar: 'Pillar 1: IDs (DIDs / VCs)',
      layer: 'standards/CONVENTIONS.md & NIST/W3C Specs',
      role: 'Cryptographic assertion of identity, credential revocation registries, and selective zero-knowledge disclosure.'
    },
    {
      pillar: 'Pillar 2: Data (Off-Chain / Receipts)',
      layer: 'constitution/07-HEARTH-runtime.md',
      role: 'Enforces zero PII on public ledgers; anchors tamper-evident state root hashes while isolating operational data.'
    },
    {
      pillar: 'Pillar 3: Dollars (Utility & Settlement)',
      layer: 'standards/STACK.md (Custody & Settlement Rails)',
      role: 'Non-speculative, purpose-bound smart contract execution for payments, fee reconciliation, and municipal credits.'
    },
    {
      pillar: 'G-Code Smart Contracts',
      layer: 'templates/ADR-TEMPLATE.md & ANVIL Charter',
      role: 'Deterministic state machines with multi-sig governance, time-locks, and human escalation/appeal checkpoints.'
    },
    {
      pillar: 'C-Node Client Vaults',
      layer: 'templates/project/ Scaffold & FIDO2/WebAuthn',
      role: 'Non-custodial, resident-controlled key storage with assisted social recovery mechanisms.'
    }
  ];

  return (
    <div className="view-container">
      <div className="view-header-card">
        <div>
          <span className="pill-tag text-cyan">UNYKORN BUILD CONSTITUTION & ADR GOVERNANCE</span>
          <h2>MIA by VIA Architecture Mapping & Nygard ADR Registry</h2>
          <p>
            The MIA by VIA municipal architecture maps directly into the UnyKorn Build Constitution (HEARTH runtime boundaries, FORGE 7-phase build lifecycle, and ANVIL engineering standards).
          </p>
        </div>
        <div className="card-stat-box">
          <span className="stat-box-title">CONSTITUTIONAL GOVERNANCE</span>
          <span className="stat-box-value">v1.0 Standard</span>
          <span className="stat-box-sub">HEARTH · FORGE · ANVIL</span>
        </div>
      </div>

      <div className="glass-card margin-bottom">
        <div className="card-header">
          <Layers className="text-cyan" size={22} />
          <h3>MIA Architecture to UnyKorn Constitution Mapping</h3>
        </div>

        <div className="table-responsive">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>MIA Architecture Pillar</th>
                <th>UnyKorn Constitution Layer</th>
                <th>Operational & Compliance Role</th>
              </tr>
            </thead>
            <tbody>
              {mappingMatrix.map((row, idx) => (
                <tr key={idx}>
                  <td className="bold text-main">{row.pillar}</td>
                  <td>
                    <span className="mono text-cyan text-xs">{row.layer}</span>
                  </td>
                  <td className="text-sm text-muted">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card perimeter-alert-card margin-bottom">
        <div className="card-header">
          <Lock className="text-emerald" size={22} />
          <h3>HEARTH Runtime Compliance — Zero PII On-Chain Guarantee</h3>
        </div>

        <div className="grid-2col margin-top">
          <div className="tripwire-item">
            <CheckCircle2 className="text-emerald" size={18} />
            <div>
              <strong>Encrypted Off-Chain Vault Storage</strong>
              <p>All demographic, permit media, and PII are stored strictly off-chain in encrypted resident C-node vaults.</p>
            </div>
          </div>

          <div className="tripwire-item">
            <CheckCircle2 className="text-emerald" size={18} />
            <div>
              <strong>SHA-256 State Root Hashes Only</strong>
              <p>Ledger layer strictly acts as an append-only anchor for cryptographic state roots and status lists.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2col">
        <div className="glass-card">
          <div className="card-header">
            <BookOpen className="text-purple" size={20} />
            <h3>Nygard ADR Registry</h3>
          </div>

          <div className="gcode-cards-list">
            {MOCK_ADRS.map((adr) => (
              <div
                key={adr.id}
                onClick={() => setSelectedAdr(adr)}
                className={`gcode-card-item ${adr.id === selectedAdr.id ? 'active-gcode' : ''}`}
              >
                <div className="gcode-card-top">
                  <span className="gcode-id-badge">{adr.id}</span>
                  <span className="status-badge status-passed">{adr.status}</span>
                </div>
                <div className="gcode-title">{adr.title}</div>
                <div className="gcode-dept mono text-xs">{adr.constitutionMapping}</div>
                <div className="gcode-did-text">{adr.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="card-header">
            <FileCode2 className="text-cyan" size={22} />
            <h3>Architecture Decision Record Inspector</h3>
          </div>

          <div className="gcode-detail-container">
            <div className="gcode-detail-header">
              <h4>{selectedAdr.id}: {selectedAdr.title}</h4>
              <span className="pill-tag text-emerald">{selectedAdr.status}</span>
            </div>

            <div className="eval-detail-box margin-top">
              <div className="eval-row">
                <span>Deciders:</span>
                <strong>{selectedAdr.deciders}</strong>
              </div>
              <div className="eval-row">
                <span>Date:</span>
                <span>{selectedAdr.date}</span>
              </div>
              <div className="eval-row">
                <span>Constitution Mapping:</span>
                <span className="mono text-cyan">{selectedAdr.constitutionMapping}</span>
              </div>
              <div className="eval-row">
                <span>Repository Path:</span>
                <span className="mono text-xs">{selectedAdr.filePath}</span>
              </div>
            </div>

            <div className="gcode-action-box margin-top">
              <h5>Executive Summary</h5>
              <p>{selectedAdr.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
