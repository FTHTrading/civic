import React, { useState } from 'react';
import type { AnvilGate } from '../types';
import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, XCircle } from 'lucide-react';

interface AnvilGateBoardViewProps {
  gates: AnvilGate[];
  onToggleGateStatus: (id: string) => void;
}

export const AnvilGateBoardView: React.FC<AnvilGateBoardViewProps> = ({ gates, onToggleGateStatus }) => {
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'EXIT_GATE' | 'BLOCKING_GATE'>('ALL');

  const exitGates = gates.filter((g) => g.category === 'EXIT_GATE');
  const blockingGates = gates.filter((g) => g.category === 'BLOCKING_GATE');

  const filteredGates = gates.filter((g) => filterCategory === 'ALL' || g.category === filterCategory);

  return (
    <div className="view-container">
      <div className="view-header-card">
        <div>
          <span className="pill-tag text-amber">ANVIL ENGINEERING DISCIPLINE</span>
          <h2>ANVIL Gate Board (G0–G7) & Blocking Gates</h2>
          <p>
            ANVIL discipline enforces spec-before-code, test-first, blocking gates, and receipted changes. No gate is passed by a mockup or design comp.
          </p>
        </div>
        <div className="card-stat-box">
          <span className="stat-box-title">GATE STATUS</span>
          <span className="stat-box-value">
            {gates.filter((g) => g.status === 'PASSED').length} / {gates.length} PASSED
          </span>
          <span className="stat-box-sub">Mandatory Engineering Control</span>
        </div>
      </div>

      <div className="glass-card perimeter-alert-card margin-bottom">
        <div className="card-header">
          <ShieldCheck className="text-emerald" size={24} />
          <h3>Perimeter Security Defense & Tier 3 Exclusion Tripwires</h3>
        </div>

        <p className="perimeter-desc">
          System structural boundaries are enforced in code. If any of the following Tier 3 tripwires appear, execution immediately halts:
        </p>

        <div className="grid-2col margin-top">
          <div className="tripwire-item">
            <XCircle className="text-emerald" size={18} />
            <div>
              <strong>NO Municipal Debt Tokenization</strong>
              <p>System strictly rejects tokenizing municipal debt instruments or municipal bonds.</p>
            </div>
          </div>

          <div className="tripwire-item">
            <XCircle className="text-emerald" size={18} />
            <div>
              <strong>NO Funds Custody or Disbursal</strong>
              <p>System holds no funds, disburses no cash, and operates no municipal banking accounts.</p>
            </div>
          </div>

          <div className="tripwire-item">
            <XCircle className="text-emerald" size={18} />
            <div>
              <strong>NO Citizen Subsidy Delivery</strong>
              <p>No citizen cash payouts or subsidy routing is processed through Tier 1 layer.</p>
            </div>
          </div>

          <div className="tripwire-item">
            <XCircle className="text-emerald" size={18} />
            <div>
              <strong>NO Success-Fee Pricing</strong>
              <p>No fee is tied to a federal contract award or municipal budget line item.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="toolbar-row margin-bottom">
        <div className="filter-group">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`btn-tab ${filterCategory === 'ALL' ? 'active' : ''}`}
          >
            All Gates ({gates.length})
          </button>
          <button
            onClick={() => setFilterCategory('EXIT_GATE')}
            className={`btn-tab ${filterCategory === 'EXIT_GATE' ? 'active' : ''}`}
          >
            ANVIL Exit Gates G0-G7 ({exitGates.length})
          </button>
          <button
            onClick={() => setFilterCategory('BLOCKING_GATE')}
            className={`btn-tab ${filterCategory === 'BLOCKING_GATE' ? 'active' : ''}`}
          >
            Human-Blocked Gates ({blockingGates.length})
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Gate ID</th>
              <th>Gate Name & Category</th>
              <th>Exit Criteria & Specifications</th>
              <th>Blocking Status</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredGates.map((gate) => (
              <tr key={gate.id}>
                <td className="mono bold font-lg">{gate.id}</td>
                <td>
                  <div className="gate-name">{gate.name}</div>
                  <span className={`category-tag category-${gate.category.toLowerCase()}`}>{gate.category}</span>
                </td>
                <td>
                  <div className="gate-criteria">{gate.exitCriteria}</div>
                  <div className="gate-notes text-xs text-muted">{gate.notes}</div>
                </td>
                <td>
                  {gate.isBlocking ? (
                    <span className="badge-blocking">
                      <Lock size={12} /> MANDATORY BLOCKING
                    </span>
                  ) : (
                    <span className="text-muted text-xs">Standard Exit</span>
                  )}
                </td>
                <td>
                  <span className={`status-badge status-${gate.status.toLowerCase()}`}>
                    {gate.status === 'PASSED' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} {gate.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => onToggleGateStatus(gate.id)}
                    className={`btn-sm ${gate.status === 'PASSED' ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
