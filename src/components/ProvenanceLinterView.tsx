import { useState } from 'react';
import type { AssertionItem } from '../types';
import { evaluateAssertionLinter } from '../lib/blockingLinter';
import { ShieldAlert, AlertOctagon, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProvenanceLinterViewProps {
  assertions: AssertionItem[];
  onUpdateAssertionState: (id: string, newState: AssertionItem['state']) => void;
}

export const ProvenanceLinterView: React.FC<ProvenanceLinterViewProps> = ({ assertions, onUpdateAssertionState }) => {
  const [selectedAssertionId, setSelectedAssertionId] = useState<string>(assertions[3]?.id || assertions[0]?.id);

  const selectedItem = assertions.find((a) => a.id === selectedAssertionId) || assertions[0];
  const linterResult = evaluateAssertionLinter(selectedItem);

  return (
    <div className="view-container">
      <div className="view-header-card">
        <div>
          <span className="pill-tag text-amber">ARTIFACT A3 · PROVENANCE LEDGER & BLOCKING LINTER</span>
          <h2>Blocking Linter & Assertion State Engine</h2>
          <p>
            Design Law 2 prohibits summaries, briefings, or generated indices from serving as primary supporting instruments. The linter mechanically refuses to render or publish anything unverified or stale.
          </p>
        </div>
        <div className="card-stat-box">
          <span className="stat-box-title">STATE LAW</span>
          <span className="stat-box-value">Asymmetric Rules</span>
          <span className="stat-box-sub">Demotion needs no approval. Promotion does.</span>
        </div>
      </div>

      <div className="glass-card margin-bottom">
        <h3>Assertion Lifecycle State Machine</h3>
        <div className="state-machine-flow">
          <div className={`state-node ${selectedItem.state === 'PROPOSED' ? 'active-node node-proposed' : ''}`}>
            <span className="node-title">1. PROPOSED</span>
            <span className="node-desc">Draft assertion received</span>
          </div>
          <ArrowRight className="flow-arrow" size={20} />
          <div className={`state-node ${selectedItem.state === 'VERIFIED' ? 'active-node node-verified' : ''}`}>
            <span className="node-title">2. VERIFIED</span>
            <span className="node-desc">Primary instrument bound & EIP-712 signed</span>
          </div>
          <ArrowRight className="flow-arrow" size={20} />
          <div className={`state-node ${selectedItem.state === 'PUBLISHED' ? 'active-node node-published' : ''}`}>
            <span className="node-title">3. PUBLISHED</span>
            <span className="node-desc">Live on Open Checkbook</span>
          </div>
          <div className="flow-divider">OR</div>
          <div className={`state-node ${selectedItem.state === 'DEMOTED' ? 'active-node node-demoted' : ''}`}>
            <span className="node-title">DEMOTED</span>
            <span className="node-desc">Stale date (&gt;9 mo)</span>
          </div>
          <div className={`state-node ${selectedItem.state === 'REJECTED' ? 'active-node node-rejected' : ''}`}>
            <span className="node-title">REJECTED</span>
            <span className="node-desc">Summary Law violation</span>
          </div>
        </div>
      </div>

      <div className="grid-2col">
        <div className="glass-card">
          <h3>Select Assertion to Evaluate</h3>
          <div className="assertion-list-select">
            {assertions.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedAssertionId(item.id)}
                className={`assertion-select-item ${item.id === selectedAssertionId ? 'selected' : ''}`}
              >
                <div className="item-select-top">
                  <span className="mono bold">{item.id}</span>
                  <span className={`badge-state state-${item.state.toLowerCase()}`}>{item.state}</span>
                </div>
                <div className="item-select-vendor">{item.vendorName}</div>
                <div className="item-select-kind">
                  Kind: <span className="mono">{item.primaryInstrument.kind}</span> | Amount: ${item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="card-header">
            <ShieldAlert className="text-amber" size={22} />
            <h3>Blocking Linter Evaluation Details</h3>
          </div>

          <div className="eval-detail-box">
            <div className="eval-row">
              <span>Target ID:</span>
              <strong className="mono">{selectedItem.id}</strong>
            </div>
            <div className="eval-row">
              <span>Primary Instrument Title:</span>
              <span>{selectedItem.primaryInstrument.title}</span>
            </div>
            <div className="eval-row">
              <span>Instrument Kind:</span>
              <span className={`kind-badge kind-${selectedItem.primaryInstrument.kind.toLowerCase()}`}>
                {selectedItem.primaryInstrument.kind}
              </span>
            </div>
            <div className="eval-row">
              <span>Fetch Date:</span>
              <span>
                {selectedItem.primaryInstrument.fetchDate}{' '}
                {selectedItem.primaryInstrument.isStale && <strong className="text-red">(STALE)</strong>}
              </span>
            </div>
            <div className="eval-row">
              <span>SHA-256 Content Hash:</span>
              <span className="mono text-xs">{selectedItem.primaryInstrument.sha256Hash}</span>
            </div>
          </div>

          <div className="linter-verdict-card margin-top">
            <div className="verdict-title-row">
              {linterResult.passed ? (
                <>
                  <CheckCircle2 className="text-emerald" size={24} />
                  <span className="verdict-title text-emerald">LINTER VERDICT: PASSED (PUBLICATION SAFE)</span>
                </>
              ) : (
                <>
                  <AlertOctagon className="text-red" size={24} />
                  <span className="verdict-title text-red">LINTER VERDICT: BLOCKED (PUBLICATION REFUSED)</span>
                </>
              )}
            </div>

            {linterResult.blockReason && (
              <div className="alert-box alert-blocked margin-top">
                <AlertOctagon size={20} />
                <div>
                  <strong>Mechanical Block Triggered:</strong>
                  <p>{linterResult.blockReason}</p>
                </div>
              </div>
            )}

            {linterResult.warnings.length > 0 && (
              <div className="alert-box alert-warning margin-top">
                <ShieldCheck size={18} />
                <div>
                  <strong>Linter Warnings:</strong>
                  <ul>
                    {linterResult.warnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="state-control-group margin-top">
              <label>Simulate State Override:</label>
              <div className="btn-group-row">
                <button
                  disabled={!linterResult.passed}
                  onClick={() => onUpdateAssertionState(selectedItem.id, 'PUBLISHED')}
                  className="btn-success btn-sm"
                >
                  Promote to PUBLISHED
                </button>
                <button
                  onClick={() => onUpdateAssertionState(selectedItem.id, 'DEMOTED')}
                  className="btn-warning btn-sm"
                >
                  Demote to DEMOTED
                </button>
                <button
                  onClick={() => onUpdateAssertionState(selectedItem.id, 'REJECTED')}
                  className="btn-danger btn-sm"
                >
                  Reject Assertion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
