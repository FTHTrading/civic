import React, { useState } from 'react';
import type { AssertionItem } from '../types';
import type { ExecutiveTabType } from './Navigation';
import { Search, ExternalLink, FileText } from 'lucide-react';

interface PlatformViewProps {
  assertions: AssertionItem[];
  setActiveTab: (tab: ExecutiveTabType) => void;
}

export const PlatformView: React.FC<PlatformViewProps> = ({ assertions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const departments = ['ALL', ...Array.from(new Set(assertions.map((a) => a.department)))];

  const filtered = assertions.filter((a) => {
    const matchesSearch =
      a.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || a.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalSpend = assertions
    .filter((a) => a.state === 'PUBLISHED')
    .reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="exec-view-container">
      <div className="exec-page-header">
        <div className="section-label">PUBLIC DATA PROVENANCE PLATFORM</div>
        <h1>Explore Public Records</h1>
        <p>
          Open Trust makes unsourced numbers mechanically impossible to publish. Every published municipal dollar links directly to its primary instrument with exact page and row locators.
        </p>
      </div>

      <div className="platform-summary-box">
        <div className="platform-stat">
          <span className="stat-label">TOTAL AUDITED PUBLISHED RECORD VALUE</span>
          <span className="stat-val text-teal">${totalSpend.toLocaleString()} USD</span>
        </div>
        <div className="platform-stat">
          <span className="stat-label">PRIMARY SOURCE COVERAGE</span>
          <span className="stat-val">100% Traceable</span>
        </div>
        <div className="platform-stat">
          <span className="stat-label">VERIFICATION PRINCIPLE</span>
          <span className="stat-val">Source-Linked Provenance</span>
        </div>
      </div>

      <div className="exec-toolbar-row margin-top">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search vendor, purpose, or record ID..."
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

      <div className="table-responsive margin-top">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Department & Vendor</th>
              <th>Purpose & Scope</th>
              <th>Audited Amount</th>
              <th>State</th>
              <th>Primary Source Instrument</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td className="mono bold text-teal">{item.id}</td>
                <td>
                  <div className="bold">{item.vendorName}</div>
                  <div className="text-xs text-muted">{item.department}</div>
                </td>
                <td>
                  <div className="text-sm text-subtext">{item.purpose}</div>
                </td>
                <td className="amount-display">${item.amount.toLocaleString()}</td>
                <td>
                  <span className={`status-badge state-${item.state.toLowerCase()}`}>{item.state}</span>
                </td>
                <td>
                  <div className="instrument-card">
                    <div className="inst-title">
                      <FileText size={14} className="text-cyan" /> {item.primaryInstrument.title}
                    </div>
                    <div className="inst-locator">
                      <span className="locator-badge">Page {item.primaryInstrument.pageLocator}</span>
                      <span className="locator-badge">Row {item.primaryInstrument.rowLocator}</span>
                      <span className={`kind-badge kind-${item.primaryInstrument.kind.toLowerCase()}`}>
                        {item.primaryInstrument.kind}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a
                    href={item.primaryInstrument.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-icon-link"
                    title="View Primary Source"
                  >
                    <ExternalLink size={16} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
