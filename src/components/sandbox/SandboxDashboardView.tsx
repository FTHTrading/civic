import React from 'react';
import { MOCK_SERVICES, MOCK_CONTROLS } from '../../data/mockPermits';
import { AlertTriangle, CheckCircle2, Key, Lock, Cpu, Layers, ShieldCheck, Database, ArrowRight } from 'lucide-react';

interface SandboxDashboardViewProps {
  setActiveSandboxTab?: (tab: string) => void;
}

export const SandboxDashboardView: React.FC<SandboxDashboardViewProps> = ({ setActiveSandboxTab }) => {
  const passedControls = MOCK_CONTROLS.filter((c) => c.status === 'PASSED').length;

  return (
    <div className="sandbox-dashboard-container marina-theme">
      {/* Workspace Header */}
      <div className="sandbox-page-header">
        <h1 className="text-pearl">Civic Infrastructure Sandbox</h1>
        <p className="text-coral-stone">
          Miami Marina Control Room · Partner configuration, credential modeling, and operational readiness.
        </p>
      </div>

      {/* Operational Boundary Callout */}
      <div className="alert-blocked-card glass-panel margin-top">
        <AlertTriangle size={20} className="text-flamingo" />
        <div>
          <strong className="text-pearl">Operational Boundary Notice:</strong>
          <p className="text-coral-stone">This is an isolated demonstration sandbox environment. Zero production credentials, live municipal databases, or real public records are connected.</p>
        </div>
      </div>

      {/* Quick Demonstration Action Center */}
      <div className="sandbox-quick-actions-panel glass-panel margin-top">
        <h3 className="text-pearl">Choose a Working Demonstration:</h3>
        <div className="quick-actions-grid margin-top">
          <button
            onClick={() => setActiveSandboxTab && setActiveSandboxTab('identity')}
            className="btn-quick-action glass-btn"
          >
            <Key size={16} className="text-aqua" />
            <span>Configure a Credential</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveSandboxTab && setActiveSandboxTab('consent')}
            className="btn-quick-action glass-btn"
          >
            <Lock size={16} className="text-sunset" />
            <span>Model a Consent Policy</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveSandboxTab && setActiveSandboxTab('workflows')}
            className="btn-quick-action glass-btn"
          >
            <Cpu size={16} className="text-flamingo" />
            <span>Run a Permit Workflow</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveSandboxTab && setActiveSandboxTab('integrations')}
            className="btn-quick-action glass-btn"
          >
            <Layers size={16} className="text-palm" />
            <span>Review Integration Adapters</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveSandboxTab && setActiveSandboxTab('governance')}
            className="btn-quick-action glass-btn"
          >
            <ShieldCheck size={16} className="text-aqua" />
            <span>Inspect Assurance Controls</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => setActiveSandboxTab && setActiveSandboxTab('demo-data')}
            className="btn-quick-action glass-btn"
          >
            <Database size={16} className="text-coral-stone" />
            <span>Manage Demo Data</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="platform-summary-box margin-top">
        <div className="platform-stat glass-stat">
          <span className="stat-label text-coral-stone">PLATFORM ENVIRONMENT</span>
          <span className="stat-val text-aqua">Demonstration Sandbox</span>
        </div>
        <div className="platform-stat glass-stat">
          <span className="stat-label text-coral-stone">SECURITY & PRIVACY CONTROLS</span>
          <span className="stat-val text-palm">{passedControls} of {MOCK_CONTROLS.length} Verified</span>
        </div>
        <div className="platform-stat glass-stat">
          <span className="stat-label text-coral-stone">ACTIVE MOCK SERVICES</span>
          <span className="stat-val text-flamingo">{MOCK_SERVICES.length} Sandbox Services</span>
        </div>
        <div className="platform-stat glass-stat">
          <span className="stat-label text-coral-stone">OPERATOR</span>
          <span className="stat-val text-pearl">UnyKorn LLC</span>
        </div>
      </div>

      {/* Architecture Layers Overview */}
      <div className="assurance-summary-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag text-aqua">UNYKORN INFRASTRUCTURE SYSTEM MODEL</div>
          <h2 className="miami-section-title text-pearl">Four Active Platform Layers</h2>
        </div>

        <div className="layers-stack margin-top">
          <div className="layer-horizontal-card glass-panel">
            <div className="layer-number text-aqua">01</div>
            <div className="layer-info">
              <h4 className="text-pearl">EXPERIENCE LAYER</h4>
              <p className="text-coral-stone">Resident portal, mobile digital wallet interface, inspector verification screens, multilingual access (EN/ES/HT), WCAG 2.2 AA accessibility design.</p>
            </div>
          </div>

          <div className="layer-horizontal-card glass-panel">
            <div className="layer-number text-flamingo">02</div>
            <div className="layer-info">
              <h4 className="text-pearl">TRUST LAYER</h4>
              <p className="text-coral-stone">W3C Decentralized Identifiers (`did:via`), W3C Verifiable Credentials (Soulbound NFTs), Zero-Knowledge Proofs (zk-SNARKs), EIP-712 Secp256k1 attestation signing.</p>
            </div>
          </div>

          <div className="layer-horizontal-card glass-panel">
            <div className="layer-number text-sunset">03</div>
            <div className="layer-info">
              <h4 className="text-pearl">INTEGRATION LAYER</h4>
              <p className="text-coral-stone">Mock adapters for municipal ERPs, building permit databases, business registries, approved payment rails (Fiat/USDC/Closed-loop transit), and field tools.</p>
            </div>
          </div>

          <div className="layer-horizontal-card glass-panel">
            <div className="layer-number text-palm">04</div>
            <div className="layer-info">
              <h4 className="text-pearl">GOVERNANCE LAYER</h4>
              <p className="text-coral-stone">ANVIL engineering control framework, HEARTH runtime data isolation, audit log event anchors, role-based permission policies.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sandbox Services Matrix */}
      <div className="boundaries-summary-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag text-aqua">MOCK SERVICE MODULES</div>
          <h2 className="miami-section-title text-pearl">Configured Sandbox Services</h2>
        </div>

        <div className="table-responsive margin-top">
          <table className="ledger-table glass-table">
            <thead>
              <tr>
                <th className="text-pearl">Service Name</th>
                <th className="text-pearl">Department</th>
                <th className="text-pearl">Maturity Status</th>
                <th className="text-pearl">Sandbox Adapter State</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SERVICES.map((s) => (
                <tr key={s.id}>
                  <td className="bold text-aqua">{s.name}</td>
                  <td className="text-coral-stone">{s.department}</td>
                  <td>
                    <span className="tag-pilot">{s.statusLabel}</span>
                  </td>
                  <td>
                    <span className="chip-success">
                      <CheckCircle2 size={12} /> Sandbox Mock Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
