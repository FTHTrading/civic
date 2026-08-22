import { useState } from 'react';
import type { AnvilGate } from '../types';
import { CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Lock } from 'lucide-react';

interface AssuranceViewProps {
  gates: AnvilGate[];
}

export const AssuranceView: React.FC<AssuranceViewProps> = ({ gates }) => {
  const [expandedGateId, setExpandedGateId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'EXIT_GATE' | 'BLOCKING_GATE'>('ALL');

  const passedCount = gates.filter((g) => g.status === 'PASSED').length;
  const filteredGates = gates.filter((g) => filterCategory === 'ALL' || g.category === filterCategory);

  const toggleExpand = (id: string) => {
    setExpandedGateId(expandedGateId === id ? null : id);
  };

  return (
    <div className="exec-view-container">
      <div className="exec-page-header">
        <div className="section-label">ENGINEERING GOVERNANCE</div>
        <h1>Assurance Register</h1>
        <p>
          The platform operates under the ANVIL engineering control model. Every release constraint, data license, and boundary control is independently reviewable below.
        </p>
      </div>

      <div className="assurance-banner-card">
        <div className="assurance-chip-large">
          <CheckCircle2 size={20} className="text-teal" />
          <span>Assurance status: {passedCount} of {gates.length} controls verified</span>
        </div>
        <p className="text-sm text-muted margin-top">
          Mandatory engineering control board. System refuses outbound publication if any blocking control is linter-blocked.
        </p>
      </div>

      <div className="exec-toolbar-row margin-top">
        <div className="filter-group">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`btn-tab ${filterCategory === 'ALL' ? 'active' : ''}`}
          >
            All Controls ({gates.length})
          </button>
          <button
            onClick={() => setFilterCategory('EXIT_GATE')}
            className={`btn-tab ${filterCategory === 'EXIT_GATE' ? 'active' : ''}`}
          >
            ANVIL Exit Controls ({gates.filter((g) => g.category === 'EXIT_GATE').length})
          </button>
          <button
            onClick={() => setFilterCategory('BLOCKING_GATE')}
            className={`btn-tab ${filterCategory === 'BLOCKING_GATE' ? 'active' : ''}`}
          >
            Human-Blocked Controls ({gates.filter((g) => g.category === 'BLOCKING_GATE').length})
          </button>
        </div>
      </div>

      <div className="assurance-register-list margin-top">
        {filteredGates.map((gate) => {
          const isExpanded = expandedGateId === gate.id;
          return (
            <div key={gate.id} className="assurance-item-card">
              <div className="assurance-item-header" onClick={() => toggleExpand(gate.id)}>
                <div className="assurance-title-col">
                  <span className="gate-id-badge mono">{gate.id}</span>
                  <div className="assurance-name">{gate.name}</div>
                </div>

                <div className="assurance-status-col">
                  {gate.isBlocking && (
                    <span className="badge-blocking">
                      <Lock size={12} /> MANDATORY BLOCKING
                    </span>
                  )}
                  <span className={`status-badge status-${gate.status.toLowerCase()}`}>
                    {gate.status === 'PASSED' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} {gate.status}
                  </span>
                  <button className="btn-icon-chevron">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="assurance-item-body">
                  <div className="assurance-detail-row">
                    <span className="detail-label">Exit Criteria Specification:</span>
                    <span className="detail-val">{gate.exitCriteria}</span>
                  </div>
                  <div className="assurance-detail-row margin-top">
                    <span className="detail-label">Control Evidence & Notes:</span>
                    <span className="detail-val text-muted">{gate.notes}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
