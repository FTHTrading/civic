import { useState, useEffect } from 'react';
import type { AssertionItem, AnvilGate } from './types';
import { INITIAL_ASSERTIONS, ANVIL_GATES, MOCK_GCODES, MOCK_CNODE, MOCK_ZKP_PROOFS } from './data/mockData';
import { authService } from './lib/authService';
import type { AuthSession } from './lib/authService';
import { Navigation } from './components/Navigation';
import type { ExecutiveTabType } from './components/Navigation';
import { HomePageView } from './components/HomePageView';
import { InfrastructureView } from './components/InfrastructureView';
import { DocumentsView } from './components/DocumentsView';
import { PlatformView } from './components/PlatformView';
import { VerifyView } from './components/VerifyView';
import { AssuranceView } from './components/AssuranceView';
import { StandardsView } from './components/StandardsView';
import { BoundariesView } from './components/BoundariesView';
import { AboutView } from './components/AboutView';
import { GCodesRegistryView } from './components/GCodesRegistryView';
import { CNodesWalletView } from './components/CNodesWalletView';
import { ThreePillarsView } from './components/ThreePillarsView';
import { ColorCodedTableOfContentsView } from './components/ColorCodedTableOfContentsView';
import { OpenCheckbookView } from './components/OpenCheckbookView';
import { ProvenanceLinterView } from './components/ProvenanceLinterView';
import { AnvilGateBoardView } from './components/AnvilGateBoardView';
import { SandboxLoginView } from './components/sandbox/SandboxLoginView';
import { SandboxLayout } from './components/sandbox/SandboxLayout';
import { SandboxDashboardView } from './components/sandbox/SandboxDashboardView';
import { Footer } from './components/Footer';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState<ExecutiveTabType>('HOME');
  const [activeSandboxTab, setActiveSandboxTab] = useState('dashboard');
  const [session, setSession] = useState<AuthSession>(authService.getSession());
  const [assertions, setAssertions] = useState<AssertionItem[]>(INITIAL_ASSERTIONS);
  const [gates, setGates] = useState<AnvilGate[]>(ANVIL_GATES);

  useEffect(() => {
    setSession(authService.getSession());
  }, [activeTab]);

  const handleUpdateAssertionState = (id: string, newState: AssertionItem['state']) => {
    setAssertions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, state: newState } : item))
    );
  };

  const handleToggleGateStatus = (id: string) => {
    setGates((prev) =>
      prev.map((gate) =>
        gate.id === id
          ? {
              ...gate,
              status: gate.status === 'PASSED' ? 'BLOCKED' : 'PASSED'
            }
          : gate
      )
    );
  };

  const passedGatesCount = gates.filter((g) => g.status === 'PASSED').length;

  if (activeTab === 'SANDBOX_DASHBOARD' && session.isAuthenticated && session.user) {
    return (
      <SandboxLayout
        user={session.user}
        activeSandboxTab={activeSandboxTab}
        setActiveSandboxTab={setActiveSandboxTab}
        setActiveTab={setActiveTab}
      >
        {activeSandboxTab === 'dashboard' && <SandboxDashboardView setActiveSandboxTab={setActiveSandboxTab} />}
        {activeSandboxTab === 'identity' && <StandardsView />}
        {activeSandboxTab === 'consent' && <VerifyView />}
        {activeSandboxTab === 'workflows' && <InfrastructureView setActiveTab={setActiveTab} />}
        {activeSandboxTab === 'integrations' && <BoundariesView />}
        {activeSandboxTab === 'governance' && <AssuranceView gates={gates} />}
        {activeSandboxTab === 'demo-data' && <PlatformView assertions={assertions} setActiveTab={setActiveTab} />}
        {activeSandboxTab === 'docs' && <DocumentsView />}
      </SandboxLayout>
    );
  }

  if (activeTab === 'SANDBOX_LOGIN') {
    return (
      <div className="exec-app-layout">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          passedGatesCount={passedGatesCount}
          totalGatesCount={gates.length}
        />
        <main className="exec-main-content">
          <SandboxLoginView
            onLoginSuccess={(newSession) => {
              setSession(newSession);
              setActiveTab('SANDBOX_DASHBOARD');
            }}
            setActiveTab={setActiveTab}
          />
        </main>
        <Footer setActiveTab={setActiveTab} />
      </div>
    );
  }

  return (
    <div className="exec-app-layout">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        passedGatesCount={passedGatesCount}
        totalGatesCount={gates.length}
      />

      <main className="exec-main-content">
        {activeTab === 'HOME' && (
          <HomePageView
            setActiveTab={setActiveTab}
            passedGatesCount={passedGatesCount}
            totalGatesCount={gates.length}
          />
        )}
        {activeTab === 'TOC' && <ColorCodedTableOfContentsView setActiveTab={setActiveTab} />}
        {activeTab === 'G_CODES' && <GCodesRegistryView gCodes={MOCK_GCODES} />}
        {activeTab === 'C_NODES' && <CNodesWalletView profile={MOCK_CNODE} zkpProofs={MOCK_ZKP_PROOFS} />}
        {activeTab === 'THREE_PILLARS' && <ThreePillarsView setActiveTab={setActiveTab} />}
        {activeTab === 'OPEN_CHECKBOOK' && <OpenCheckbookView assertions={assertions} />}
        {activeTab === 'PROVENANCE_LINTER' && (
          <ProvenanceLinterView
            assertions={assertions}
            onUpdateAssertionState={handleUpdateAssertionState}
          />
        )}
        {activeTab === 'GATE_BOARD' && (
          <AnvilGateBoardView gates={gates} onToggleGateStatus={handleToggleGateStatus} />
        )}
        {activeTab === 'INFRASTRUCTURE' && <InfrastructureView setActiveTab={setActiveTab} />}
        {activeTab === 'DOCUMENTS' && <DocumentsView />}
        {activeTab === 'SERVICES' && <GCodesRegistryView gCodes={MOCK_GCODES} />}
        {activeTab === 'PRIVACY' && <BoundariesView />}
        {activeTab === 'PARTNERS' && <AboutView />}
        {activeTab === 'PLATFORM' && <PlatformView assertions={assertions} setActiveTab={setActiveTab} />}
        {activeTab === 'VERIFY' && <VerifyView />}
        {activeTab === 'ASSURANCE' && <AssuranceView gates={gates} />}
        {activeTab === 'STANDARDS' && <StandardsView />}
        {activeTab === 'BOUNDARIES' && <BoundariesView />}
        {activeTab === 'ABOUT' && <AboutView />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
