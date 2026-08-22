import React from 'react';
import { ShieldCheck, Cpu, Anchor, FileCheck2, Globe } from 'lucide-react';

interface HeaderProps {
  anvilGateSummary: { passed: number; total: number };
}

export const Header: React.FC<HeaderProps> = ({ anvilGateSummary }) => {
  return (
    <header className="header-container">
      <div className="header-top">
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <ShieldCheck className="brand-icon" size={28} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">NEW MONEY</h1>
              <span className="brand-badge">OPEN TRUST · OTM</span>
            </div>
            <p className="brand-subtitle">
              Civic Verification & Primary Provenance Infrastructure · Miami-Dade MIA by VIA Integration
            </p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-pill">
            <Globe size={16} className="text-cyan" />
            <div className="stat-text">
              <span className="stat-label">OPERATOR</span>
              <span className="stat-value">UnyKorn LLC</span>
            </div>
          </div>

          <div className="stat-pill">
            <Cpu size={16} className="text-emerald" />
            <div className="stat-text">
              <span className="stat-label">DECENTRALIZED ID</span>
              <span className="stat-value">W3C DID / EIP-712</span>
            </div>
          </div>

          <div className="stat-pill">
            <Anchor size={16} className="text-amber" />
            <div className="stat-text">
              <span className="stat-label">ANVIL GATES</span>
              <span className="stat-value">{anvilGateSummary.passed} / {anvilGateSummary.total} PASSED</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-law-bar">
        <div className="law-badge"><FileCheck2 size={14} /> LAW 0: No County Signature Required</div>
        <div className="law-badge"><FileCheck2 size={14} /> LAW 1: One-Way Wall (No Public Write Route)</div>
        <div className="law-badge"><FileCheck2 size={14} /> LAW 2: Summary Law (Linter Blocks Summaries)</div>
        <div className="law-badge"><FileCheck2 size={14} /> LAW 3: Trustless Verifiability (EIP-712 Bound)</div>
      </div>
    </header>
  );
};
