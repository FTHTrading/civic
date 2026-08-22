import React from 'react';
import type { ExecutiveTabType } from '../Navigation';
import { authService } from '../../lib/authService';
import type { SandboxUser } from '../../lib/authService';
import { Shield, LayoutDashboard, Key, Lock, Cpu, Layers, Database, FileText, CheckCircle2, LogOut, ShieldAlert } from 'lucide-react';

interface SandboxLayoutProps {
  user: SandboxUser;
  activeSandboxTab: string;
  setActiveSandboxTab: (tab: string) => void;
  setActiveTab: (tab: ExecutiveTabType) => void;
  children: React.ReactNode;
}

export const SandboxLayout: React.FC<SandboxLayoutProps> = ({
  user,
  activeSandboxTab,
  setActiveSandboxTab,
  setActiveTab,
  children,
}) => {
  const handleLogout = () => {
    authService.logout();
    setActiveTab('HOME');
  };

  const navItems = [
    { id: 'dashboard', label: 'Platform Overview', icon: LayoutDashboard },
    { id: 'identity', label: 'Identity & Credentials', icon: Key },
    { id: 'consent', label: 'Consent & Disclosure', icon: Lock },
    { id: 'workflows', label: 'Service Workflows', icon: Cpu },
    { id: 'integrations', label: 'Integration Adapters', icon: Layers },
    { id: 'governance', label: 'Governance & Assurance', icon: CheckCircle2 },
    { id: 'demo-data', label: 'Demo Data Manager', icon: Database },
    { id: 'docs', label: 'Technical Documentation', icon: FileText },
  ];

  return (
    <div className="sandbox-app-shell">
      {/* Persistent Disclaimer Header Banner */}
      <div className="sandbox-persistent-banner">
        <ShieldAlert size={15} className="text-coral" />
        <span>MIA by VIA Infrastructure Sandbox · Built and operated by UnyKorn LLC · Authorized partner review environment · Fictional data. Simulated services. No live public records.</span>
      </div>

      <div className="sandbox-body-layout">
        {/* Fixed Left Navigation */}
        <aside className="sandbox-sidebar">
          <div className="sandbox-brand-header">
            <div className="sandbox-logo-mark">
              <Shield size={20} className="text-biscayne" />
            </div>
            <div>
              <div className="sandbox-title">MIA by VIA</div>
              <div className="sandbox-subtitle">Infrastructure Sandbox</div>
            </div>
          </div>

          <div className="sandbox-operator-tag">
            Built by UnyKorn LLC
          </div>

          <nav className="sandbox-nav-list margin-top">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSandboxTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSandboxTab(item.id)}
                  className={`sandbox-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="sandbox-user-box margin-top">
            <div className="user-role-badge">ROLE: {user.role.toUpperCase()}</div>
            <div className="user-email text-xs">{user.email}</div>
            <button onClick={handleLogout} className="btn-logout margin-top">
              <LogOut size={14} /> Exit Sandbox
            </button>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="sandbox-workspace">
          {/* Top Status Bar */}
          <div className="sandbox-status-bar">
            <div className="status-item">
              <span className="status-label">Environment:</span>
              <span className="status-val text-biscayne">Demonstration Sandbox</span>
            </div>
            <div className="status-item">
              <span className="status-label">Data Classification:</span>
              <span className="status-val">Fictional / Isolated</span>
            </div>
            <div className="status-item">
              <span className="status-label">Integration Status:</span>
              <span className="status-val text-palm">Mock Adapters Active</span>
            </div>
            <div className="status-item">
              <span className="status-label">User Role:</span>
              <span className="status-val text-violet">{user.role}</span>
            </div>
          </div>

          <div className="sandbox-workspace-content margin-top">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
