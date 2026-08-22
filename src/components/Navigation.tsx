import React, { useState } from 'react';
import { LockKeyhole, ChevronDown, Search, ArrowUpRight, Cpu, Wallet, Shield, FileText, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

export type ExecutiveTabType =
  | 'HOME'
  | 'TOC'
  | 'INFRASTRUCTURE'
  | 'DOCUMENTS'
  | 'SERVICES'
  | 'PRIVACY'
  | 'VERIFY'
  | 'PLATFORM'
  | 'ASSURANCE'
  | 'STANDARDS'
  | 'BOUNDARIES'
  | 'ABOUT'
  | 'PARTNERS'
  | 'G_CODES'
  | 'C_NODES'
  | 'THREE_PILLARS'
  | 'OPEN_CHECKBOOK'
  | 'PROVENANCE_LINTER'
  | 'GATE_BOARD'
  | 'SANDBOX_LOGIN'
  | 'SANDBOX_DASHBOARD';

interface NavigationProps {
  activeTab: ExecutiveTabType;
  setActiveTab: (tab: ExecutiveTabType) => void;
  passedGatesCount?: number;
  totalGatesCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleNavClick = (tab: ExecutiveTabType) => {
    setActiveTab(tab);
    setOpenDropdown(null);
  };

  return (
    <header className="exec-header glass-header">
      <div className="exec-header-inner">
        {/* Brand Header */}
        <div className="unykorn-logo-wrapper cursor-pointer" onClick={() => handleNavClick('HOME')}>
          <div className="flamingo-logo-mark">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L16 26L26 6" stroke="#FF007A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 26L22 14C22 14 26 12 28 8" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="6" r="2.5" fill="#FFAB00" />
            </svg>
          </div>
          <div className="unykorn-brand-text">
            <span className="brand-company text-pearl font-bold text-base tracking-wide">MIA by VIA</span>
            <span className="brand-subtext text-flamingo text-[10px] uppercase font-mono">Built by UnyKorn LLC</span>
          </div>
        </div>

        {/* Four Grouped Dropdown Menus */}
        <nav className="exec-nav-menu">
          {/* Menu 1: Platform & Nodes */}
          <div className="dropdown-menu-wrapper">
            <button
              onClick={() => toggleDropdown('platform')}
              className={`exec-nav-item dropdown-btn ${['HOME', 'SERVICES', 'PLATFORM', 'G_CODES', 'C_NODES', 'THREE_PILLARS'].includes(activeTab) ? 'active' : ''}`}
            >
              Platform <ChevronDown size={14} strokeWidth={1.5} />
            </button>
            {openDropdown === 'platform' && (
              <div className="dropdown-panel glass-dropdown">
                <button onClick={() => handleNavClick('HOME')} className="dropdown-item">
                  <Sparkles size={14} className="text-aqua mr-2" /> Platform Overview
                </button>
                <button onClick={() => handleNavClick('TOC')} className="dropdown-item">
                  <BookOpen size={14} className="text-sunset mr-2" /> Color-Coded Table of Contents
                </button>
                <button onClick={() => handleNavClick('G_CODES')} className="dropdown-item">
                  <Cpu size={14} className="text-aqua mr-2" /> G-Codes Directory
                </button>
                <button onClick={() => handleNavClick('C_NODES')} className="dropdown-item">
                  <Wallet size={14} className="text-flamingo mr-2" /> C-Node Resident Wallet
                </button>
                <button onClick={() => handleNavClick('THREE_PILLARS')} className="dropdown-item">
                  <Shield size={14} className="text-sunset mr-2" /> Three Pillars (IDs, Data, Dollars)
                </button>
                <button onClick={() => handleNavClick('VERIFY')} className="dropdown-item">
                  View Demonstration
                </button>
              </div>
            )}
          </div>

          {/* Menu 2: Open Trust Civic Stack */}
          <div className="dropdown-menu-wrapper">
            <button
              onClick={() => toggleDropdown('opentrust')}
              className={`exec-nav-item dropdown-btn ${['OPEN_CHECKBOOK', 'PROVENANCE_LINTER', 'GATE_BOARD', 'ASSURANCE'].includes(activeTab) ? 'active' : ''}`}
            >
              Open Trust (OTM) <ChevronDown size={14} strokeWidth={1.5} />
            </button>
            {openDropdown === 'opentrust' && (
              <div className="dropdown-panel glass-dropdown">
                <button onClick={() => handleNavClick('OPEN_CHECKBOOK')} className="dropdown-item">
                  <FileText size={14} className="text-palm mr-2" /> Artifact A1 · Open Checkbook
                </button>
                <button onClick={() => handleNavClick('STANDARDS')} className="dropdown-item">
                  <Shield size={14} className="text-aqua mr-2" /> Artifact A2 · Attestation Standard
                </button>
                <button onClick={() => handleNavClick('PROVENANCE_LINTER')} className="dropdown-item">
                  <FileText size={14} className="text-flamingo mr-2" /> Artifact A3 · Provenance Linter
                </button>
                <button onClick={() => handleNavClick('GATE_BOARD')} className="dropdown-item">
                  <CheckSquare size={14} className="text-sunset mr-2" /> ANVIL G0–G7 Gate Board
                </button>
              </div>
            )}
          </div>

          {/* Menu 3: Infrastructure */}
          <div className="dropdown-menu-wrapper">
            <button
              onClick={() => toggleDropdown('infrastructure')}
              className={`exec-nav-item dropdown-btn ${['INFRASTRUCTURE', 'DOCUMENTS'].includes(activeTab) ? 'active' : ''}`}
            >
              Infrastructure <ChevronDown size={14} strokeWidth={1.5} />
            </button>
            {openDropdown === 'infrastructure' && (
              <div className="dropdown-panel glass-dropdown">
                <button onClick={() => handleNavClick('INFRASTRUCTURE')} className="dropdown-item">
                  Technical Architecture
                </button>
                <button onClick={() => handleNavClick('BOUNDARIES')} className="dropdown-item">
                  Legal Perimeter & Rules
                </button>
                <button onClick={() => handleNavClick('DOCUMENTS')} className="dropdown-item">
                  Documents & Whitepaper
                </button>
              </div>
            )}
          </div>

          {/* Menu 4: Partners & About */}
          <div className="dropdown-menu-wrapper">
            <button
              onClick={() => toggleDropdown('partners')}
              className={`exec-nav-item dropdown-btn ${['PARTNERS', 'ABOUT'].includes(activeTab) ? 'active' : ''}`}
            >
              About <ChevronDown size={14} strokeWidth={1.5} />
            </button>
            {openDropdown === 'partners' && (
              <div className="dropdown-panel glass-dropdown">
                <button onClick={() => handleNavClick('ABOUT')} className="dropdown-item">
                  About MIA by VIA
                </button>
                <button onClick={() => handleNavClick('PARTNERS')} className="dropdown-item">
                  UnyKorn LLC Engineering
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Action CTAs */}
        <div className="exec-header-cta">
          <button
            onClick={() => handleNavClick('SANDBOX_LOGIN')}
            className="btn-sandbox-lock glass-btn flex items-center gap-1 text-xs"
            title="Authorized Sandbox Access"
          >
            <LockKeyhole size={13} className="text-flamingo" strokeWidth={1.5} />
            <span>Authorized Sandbox</span>
            <ArrowUpRight size={13} className="text-coral-stone" strokeWidth={1.5} />
          </button>

          <button onClick={() => handleNavClick('VERIFY')} className="btn-exec-primary btn-sunset text-xs flex items-center gap-1">
            <Search size={14} strokeWidth={1.5} /> Demonstration
          </button>
        </div>
      </div>
    </header>
  );
};
