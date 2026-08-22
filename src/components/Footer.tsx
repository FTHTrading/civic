import React from 'react';
import { Shield } from 'lucide-react';
import type { ExecutiveTabType } from './Navigation';

interface FooterProps {
  setActiveTab?: (tab: ExecutiveTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleLink = (tab: ExecutiveTabType) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (setActiveTab) {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="miami-footer">
      <div className="footer-inner">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <Shield size={20} className="text-biscayne" />
              <span className="brand-company">MIA by VIA</span>
            </div>
            <p className="footer-tagline">
              Your verified connection to Miami-Dade services. Civic infrastructure built and operated by UnyKorn LLC.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-link-group">
              <h4>Platform</h4>
              <button onClick={handleLink('HOME')} className="footer-nav-btn">How It Works</button>
              <button onClick={handleLink('VERIFY')} className="footer-nav-btn">View Demonstration</button>
              <button onClick={handleLink('DOCUMENTS')} className="footer-nav-btn">Documents & Downloads</button>
            </div>

            <div className="footer-link-group">
              <h4>Infrastructure</h4>
              <button onClick={handleLink('INFRASTRUCTURE')} className="footer-nav-btn">Overview</button>
              <button onClick={handleLink('STANDARDS')} className="footer-nav-btn">System Architecture</button>
              <button onClick={handleLink('DOCUMENTS')} className="footer-nav-btn">Implementation Roadmap</button>
            </div>

            <div className="footer-link-group">
              <h4>Trust & Security</h4>
              <button onClick={handleLink('BOUNDARIES')} className="footer-nav-btn">Privacy & Data Boundaries</button>
              <button onClick={handleLink('ASSURANCE')} className="footer-nav-btn">Transparency & Assurance</button>
              <button onClick={handleLink('DOCUMENTS')} className="footer-nav-btn">Technical Review Docs</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row margin-top">
          <div className="footer-legal">
            MIA by VIA is civic infrastructure built and operated by UnyKorn LLC. UnyKorn LLC designs, deploys, and supports digital identity, consent, verification, integration, and accountability systems for trusted public-service delivery. Pilot demonstration environment. No live Miami-Dade County systems or public records are connected.
          </div>
          <div className="footer-copyright margin-top">
            © 2026 UnyKorn LLC & VIA.miami · All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
