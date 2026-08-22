import React, { useState } from 'react';
import type { AssertionItem } from '../types';
import { ExternalLink, CheckCircle2, AlertTriangle, XCircle, Search, Hash, FileText } from 'lucide-react';

interface OpenCheckbookViewProps {
  assertions: AssertionItem[];
}

export const OpenCheckbookView: React.FC<OpenCheckbookViewProps> = ({ assertions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [inspectModalAssertion, setInspectModalAssertion] = useState<AssertionItem | null>(null);

  const departments = ['ALL', ...Array.from(new Set(assertions.map((a) => a.department)))];

  const filtered = assertions.filter((a) => {
    const matchesSearch =
      a.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.gCodeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || a.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalPublishedAmount = assertions
    .filter((a) => a.state === 'PUBLISHED')
    .reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="view-container">
      <div className="view-header-card">
        <div>
          <span className="pill-tag text-emerald">ARTIFACT A1 · OPEN CHECKBOOK</span>
          <h2>Public Municipal Expenditure Ledger</h2>
          <p>
            Every published dollar links directly to its primary instrument with exact page & row locators. Unsourced numbers are mechanically blocked from publishing.
          </p>
        </div>
        <div className="card-stat-box">
          <span className="stat-box-title">AUDITED PUBLISHED SPEND</span>
          <span className="stat-box-value">${totalPublishedAmount.toLocaleString()}</span>
          <span className="stat-box-sub">100% Primary Instrument Provenance</span>
        </div>
      </div>

      <div className="toolbar-row">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search vendor, purpose, G-Code ID, or warrant #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-select-wrapper">
          <label>Department:</label>
          <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="filter-select">
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>ID & G-Code</th>
              <th>Department & Vendor</th>
              <th>Purpose</th>
              <th>Amount (USD)</th>
              <th>State & Linter</th>
              <th>Primary Instrument (A1 Locator)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const inst = item.primaryInstrument;
              return (
                <tr key={item.id} className={`table-row-${item.state.toLowerCase()}`}>
                  <td>
                    <div className="item-id">{item.id}</div>
                    <div className="item-gcode">{item.gCodeId}</div>
                    <div className="item-date">{item.date}</div>
                  </td>
                  <td>
                    <div className="vendor-name">{item.vendorName}</div>
                    <div className="dept-tag">{item.department}</div>
                  </td>
                  <td>
                    <div className="purpose-text">{item.purpose}</div>
                  </td>
                  <td>
                    <div className="amount-display">${item.amount.toLocaleString()}</div>
                  </td>
                  <td>
                    <div className="state-badge-group">
                      <span className={`badge-state state-${item.state.toLowerCase()}`}>{item.state}</span>
                      {item.linterStatus === 'PASSED' ? (
                        <span className="badge-linter linter-passed">
                          <CheckCircle2 size={12} /> PASSED
                        </span>
                      ) : (
                        <span className="badge-linter linter-blocked">
                          <XCircle size={12} /> BLOCKED
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="instrument-card">
                      <div className="inst-title">
                        <FileText size={14} className="text-cyan" /> {inst.title}
                      </div>
                      <div className="inst-locator">
                        <span className="locator-badge">Page {inst.pageLocator}</span>
                        <span className="locator-badge">Row {inst.rowLocator}</span>
                        <span className={`kind-badge kind-${inst.kind.toLowerCase()}`}>{inst.kind}</span>
                        {inst.isStale && <span className="stale-badge">STALE (&gt;9 mo)</span>}
                      </div>
                      <div className="inst-authority">{inst.issuingAuthority}</div>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <a
                        href={inst.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-icon-link"
                        title="View Primary Instrument Source"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => setInspectModalAssertion(item)}
                        className="btn-icon-inspect"
                        title="Inspect Hash & Signature"
                      >
                        <Hash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {inspectModalAssertion && (
        <div className="modal-overlay" onClick={() => setInspectModalAssertion(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Primary Instrument Cryptographic Proof</h3>
              <button onClick={() => setInspectModalAssertion(null)} className="btn-close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="proof-detail-row">
                <span className="detail-label">Assertion ID:</span>
                <span className="detail-val mono">{inspectModalAssertion.id}</span>
              </div>
              <div className="proof-detail-row">
                <span className="detail-label">Primary Instrument:</span>
                <span className="detail-val">{inspectModalAssertion.primaryInstrument.title}</span>
              </div>
              <div className="proof-detail-row">
                <span className="detail-label">Locator Address:</span>
                <span className="detail-val highlight">
                  Page {inspectModalAssertion.primaryInstrument.pageLocator}, Row{' '}
                  {inspectModalAssertion.primaryInstrument.rowLocator}
                </span>
              </div>
              <div className="proof-detail-row">
                <span className="detail-label">Content-Addressed SHA-256 Hash:</span>
                <span className="detail-val mono hash-text">
                  {inspectModalAssertion.primaryInstrument.sha256Hash}
                </span>
              </div>
              <div className="proof-detail-row">
                <span className="detail-label">Fetch Date & Freshness:</span>
                <span className="detail-val">
                  {inspectModalAssertion.primaryInstrument.fetchDate}{' '}
                  {inspectModalAssertion.primaryInstrument.isStale ? (
                    <span className="text-red">(STALE - Lapsed)</span>
                  ) : (
                    <span className="text-emerald">(FRESH &lt; 9 mo)</span>
                  )}
                </span>
              </div>
              <div className="proof-detail-row">
                <span className="detail-label">EIP-712 Attester Signer:</span>
                <span className="detail-val mono">
                  {inspectModalAssertion.attestationSigner || 'Unsigned'}
                </span>
              </div>
              <div className="proof-detail-row">
                <span className="detail-label">EIP-712 Signature Payload:</span>
                <div className="code-box-small">
                  {inspectModalAssertion.attestationSignature || 'No signature present'}
                </div>
              </div>

              {inspectModalAssertion.blockReason && (
                <div className="alert-box alert-blocked">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>Linter Block Reason:</strong>
                    <p>{inspectModalAssertion.blockReason}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={() => setInspectModalAssertion(null)} className="btn-primary">
                Close Verification Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
