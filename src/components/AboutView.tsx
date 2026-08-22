import React from 'react';
import { Globe, Cpu, Building2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="exec-view-container">
      <div className="exec-page-header">
        <div className="section-label">OPERATOR & ARCHITECTURE REFERENCE</div>
        <h1>About Open Trust & UnyKorn LLC</h1>
        <p>
          Open Trust is an independent verification platform for public-data provenance, designed and operated by UnyKorn LLC.
        </p>
      </div>

      <div className="grid-2col margin-top">
        <div className="glass-card">
          <div className="card-header">
            <Globe className="text-teal" size={22} />
            <h3>Operator Identity</h3>
          </div>

          <div className="about-details">
            <p>
              <strong>Operator:</strong> UnyKorn LLC
            </p>
            <p className="margin-top text-muted text-sm">
              UnyKorn LLC builds critical civic and institutional verification infrastructure. Open Trust is an independent platform focused on public-data provenance, source-linked auditability, and tamper-evident records.
            </p>
          </div>
        </div>

        <div className="glass-card">
          <div className="card-header">
            <Cpu className="text-violet" size={22} />
            <h3>MIA by VIA Architecture Reference</h3>
          </div>

          <div className="about-details">
            <p className="text-muted text-sm">
              The platform incorporates technical architecture principles from <strong>MIA by VIA</strong> (A Decentralized Municipal Identification Platform for Miami-Dade County), authored under the direction of Chairman Elijah John Bowdre, Office of the Chairman, VIA.miami (August 2026).
            </p>
            <p className="margin-top text-xs text-subtle">
              Presented as a descriptive technical reference; carefully separated from official county branding or partner lockups in compliance with branding controls.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card margin-top">
        <div className="card-header">
          <Building2 className="text-cyan" size={22} />
          <h3>Legal & Independence Disclaimer</h3>
        </div>

        <p className="text-muted text-sm">
          Open Trust is an independent platform. Not legal advice. Not a securities offering. Not a custody product. All public data displayed is sourced from public-domain government repositories (USASpending, Florida DEP, County Resolutions) under fair attribution guidelines.
        </p>
      </div>
    </div>
  );
};
