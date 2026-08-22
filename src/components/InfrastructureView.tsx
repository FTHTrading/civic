import React from 'react';
import type { ExecutiveTabType } from './Navigation';
import { ArrowRight, CheckCircle2, Shield, UserCheck, Cpu, Building2, Lock, Clock } from 'lucide-react';

interface InfrastructureProps {
  setActiveTab: (tab: ExecutiveTabType) => void;
}

export const InfrastructureView: React.FC<InfrastructureProps> = ({ setActiveTab }) => {
  return (
    <div className="exec-view-container">
      {/* HERO */}
      <div className="exec-page-header">
        <div className="section-label">CIVIC INFRASTRUCTURE</div>
        <h1>Civic infrastructure, built for real-world delivery.</h1>
        <p>
          VIA provides the product layer, integration layer, trust layer, and operational framework required to take digital public services from pilot to scale—built to connect what already works and make it work better.
        </p>
        <div className="hero-cta-group margin-top">
          <button onClick={() => setActiveTab('PARTNERS')} className="btn-hero-primary">
            Request infrastructure briefing
          </button>
          <button onClick={() => setActiveTab('STANDARDS')} className="btn-hero-secondary">
            Review technical documentation <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* SECTION 1: Built around the service */}
      <section className="miami-services-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag">SERVICE FOCUS</div>
          <h2 className="miami-section-title">Built around the service, not the technology.</h2>
        </div>

        <div className="service-cards-grid margin-top">
          <div className="tactile-service-card">
            <div className="service-icon-box">
              <UserCheck size={24} className="text-biscayne" />
            </div>
            <h3>Resident Experience</h3>
            <p>Secure access, simple consent controls, clear records, and privacy by design without complex technical jargon.</p>
          </div>

          <div className="tactile-service-card">
            <div className="service-icon-box">
              <Building2 size={24} className="text-coral" />
            </div>
            <h3>Partner Operations</h3>
            <p>Streamlined issuance, instant verification, workflow tools, and field inspection access for authorized teams.</p>
          </div>

          <div className="tactile-service-card">
            <div className="service-icon-box">
              <Shield size={24} className="text-palm" />
            </div>
            <h3>Public Accountability</h3>
            <p>Transparent controls, tamper-evident audit trails, and governance-ready reporting for municipal oversight.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Four Layers. One Operating Model */}
      <section className="assurance-summary-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag">ARCHITECTURE</div>
          <h2 className="miami-section-title">Four layers. One operating model.</h2>
        </div>

        <div className="layers-stack margin-top">
          <div className="layer-horizontal-card">
            <div className="layer-number text-biscayne">01</div>
            <div className="layer-info">
              <h4>EXPERIENCE LAYER</h4>
              <p>Resident portal, mobile credential view, verification links, multilingual access (EN/ES/HT), accessibility-first service design.</p>
              <div className="text-xs text-subtle margin-top">VIA Provides: Polished web/mobile product shell & responsive UX.</div>
            </div>
          </div>

          <div className="layer-horizontal-card">
            <div className="layer-number text-violet">02</div>
            <div className="layer-info">
              <h4>TRUST LAYER</h4>
              <p>W3C DID method (`did:via`), credential issuance rules, selective disclosure, verification policies, consent receipts, recovery workflows.</p>
              <div className="text-xs text-subtle margin-top">VIA Provides: Privacy-preserving credential engine & ZKP verification logic.</div>
            </div>
          </div>

          <div className="layer-horizontal-card">
            <div className="layer-number text-coral">03</div>
            <div className="layer-info">
              <h4>INTEGRATION LAYER</h4>
              <p>Adapters for agency ERPs, permit databases, case platforms, approved payment providers (ACH/Cards/USDC), and field tools.</p>
              <div className="text-xs text-subtle margin-top">VIA Provides: Modular integration API adapters & sandbox mocks.</div>
            </div>
          </div>

          <div className="layer-horizontal-card">
            <div className="layer-number text-palm">04</div>
            <div className="layer-info">
              <h4>GOVERNANCE LAYER</h4>
              <p>Role-based permissions, audit logs, control register, policy configuration, vendor boundaries, incident handling.</p>
              <div className="text-xs text-subtle margin-top">VIA Provides: ANVIL control board & governance documentation framework.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Maturity Matrix */}
      <section className="boundaries-summary-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag">CAPABILITY MATURITY</div>
          <h2 className="miami-section-title">What is already built.</h2>
        </div>

        <div className="maturity-grid margin-top">
          <div className="maturity-card ready-now">
            <div className="maturity-badge tag-ready">READY NOW</div>
            <h3>Public-Facing Civic Experience</h3>
            <ul className="maturity-list">
              <li><CheckCircle2 size={14} className="text-palm" /> Responsive resident and partner UX</li>
              <li><CheckCircle2 size={14} className="text-palm" /> Mock permit-verification journey</li>
              <li><CheckCircle2 size={14} className="text-palm" /> Consent & data-minimization model</li>
              <li><CheckCircle2 size={14} className="text-palm" /> Multilingual foundation: EN, ES, HT</li>
              <li><CheckCircle2 size={14} className="text-palm" /> Privacy & trust center</li>
            </ul>
          </div>

          <div className="maturity-card pilot-build">
            <div className="maturity-badge tag-pilot">PILOT BUILD</div>
            <h3>Partner Pilot Adaptation</h3>
            <ul className="maturity-list">
              <li><Clock size={14} className="text-biscayne" /> Partner-specific workflow config</li>
              <li><Clock size={14} className="text-biscayne" /> Authorized agency sandbox adapter</li>
              <li><Clock size={14} className="text-biscayne" /> Field verification tools</li>
              <li><Clock size={14} className="text-biscayne" /> Accessibility cohort testing</li>
              <li><Clock size={14} className="text-biscayne" /> Privacy Impact Assessment (PIA) support</li>
            </ul>
          </div>

          <div className="maturity-card prod-impl">
            <div className="maturity-badge tag-prod">AUTHORIZED PRODUCTION</div>
            <h3>Municipal Deployment</h3>
            <ul className="maturity-list">
              <li><Lock size={14} className="text-muted" /> Approved agency issuer integrations</li>
              <li><Lock size={14} className="text-muted" /> Production identity lifecycle</li>
              <li><Lock size={14} className="text-muted" /> Formal data-processing contracts</li>
              <li><Lock size={14} className="text-muted" /> Production security monitoring</li>
              <li><Lock size={14} className="text-muted" /> Formal release governance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: 90-Day Implementation Path */}
      <section className="how-it-works-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag">PILOT TIMELINE</div>
          <h2 className="miami-section-title">A pilot that produces a real decision.</h2>
          <p className="section-subtitle">Structured 90-day implementation path for municipal partners:</p>
        </div>

        <div className="workflow-cards-grid margin-top">
          <div className="workflow-card">
            <div className="step-number text-biscayne">0–30</div>
            <h3>Discovery & Service Design</h3>
            <p>Identify one high-value verification workflow. Map data, issuer, resident, verifier, and support roles. Define legal, privacy, and operational boundaries.</p>
          </div>

          <div className="workflow-card">
            <div className="step-number text-violet">31–60</div>
            <h3>Sandbox Pilot</h3>
            <p>Configure agency adapter in a sandbox. Set credential and verification rules. Run accessibility, security, and staff workflow testing.</p>
          </div>

          <div className="workflow-card">
            <div className="step-number text-coral">61–90</div>
            <h3>Controlled Launch Decision</h3>
            <p>Conduct limited participant pilot. Measure completion time and support demand. Deliver formal go/no-go production recommendation.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Built to Integrate, Not Replace */}
      <section className="boundaries-summary-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag">OPERATIONAL RESPONSIBILITY</div>
          <h2 className="miami-section-title">Built to integrate, not replace.</h2>
        </div>

        <div className="split-panel-container margin-top">
          <div className="split-panel-card">
            <div className="panel-header text-biscayne">
              <Building2 size={18} /> WHAT STAYS WITH THE AGENCY
            </div>
            <ul className="check-list">
              <li><CheckCircle2 size={16} className="text-palm" /> Source-of-truth records and official databases</li>
              <li><CheckCircle2 size={16} className="text-palm" /> Service eligibility rules and statutory authority</li>
              <li><CheckCircle2 size={16} className="text-palm" /> Formal permit issuance decisions</li>
              <li><CheckCircle2 size={16} className="text-palm" /> Public accountability and policy governance</li>
            </ul>
          </div>

          <div className="split-panel-card">
            <div className="panel-header text-coral">
              <Cpu size={18} /> WHAT VIA PROVIDES
            </div>
            <ul className="check-list">
              <li><CheckCircle2 size={16} className="text-biscayne" /> Polished digital product experience and service flows</li>
              <li><CheckCircle2 size={16} className="text-biscayne" /> Credential and verification engine infrastructure</li>
              <li><CheckCircle2 size={16} className="text-biscayne" /> Resident consent controls and privacy receipts</li>
              <li><CheckCircle2 size={16} className="text-biscayne" /> Integration adapters and operational audit tooling</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
