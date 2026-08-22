import React, { useState } from 'react';
import { Shield, Database, DollarSign, LockKeyhole, ArrowRight, CheckCircle2, QrCode, FileText } from 'lucide-react';
import type { ExecutiveTabType } from './Navigation';

interface ThreePillarsViewProps {
  setActiveTab: (tab: ExecutiveTabType) => void;
}

export const ThreePillarsView: React.FC<ThreePillarsViewProps> = ({ setActiveTab }) => {
  const [activePillar, setActivePillar] = useState<'IDS' | 'DATA' | 'DOLLARS'>('IDS');

  return (
    <div className="exec-view-container tropical-theme">
      {/* Header */}
      <div className="exec-page-header glass-card-strip">
        <div className="unykorn-brand-tag text-xs text-aqua font-bold tracking-wider">
          MIA BY VIA · SECTION 4 THE THREE PILLARS
        </div>
        <h1 className="text-pearl margin-top">IDs, Data, and Dollars</h1>
        <p className="text-coral-stone margin-top">
          The core functional architecture powering Miami-Dade's decentralized municipal platform through Self-Sovereign Identity, cryptographic receipts, and civic payment rails.
        </p>
      </div>

      {/* Pillar Cards Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 margin-top">
        {/* Pillar 1: IDs */}
        <div
          onClick={() => setActivePillar('IDS')}
          className={`liquid-glass-card p-6 cursor-pointer border transition-all ${
            activePillar === 'IDS'
              ? 'border-[#00F2FE] bg-white/10 shadow-[0_0_25px_rgba(0,242,254,0.2)]'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="h-12 w-12 rounded-xl bg-dark-ocean p-2.5 flex items-center justify-center">
            <Shield className="text-aqua" size={24} />
          </div>
          <span className="text-xs text-aqua font-bold tracking-wider margin-top block">PILLAR 1</span>
          <h2 className="text-pearl text-xl font-bold margin-top">IDs (Identification)</h2>
          <p className="text-coral-stone text-xs margin-top">
            Unified digital identity via W3C DIDs, Soulbound VC NFTs, and Zero-Knowledge Selective Disclosure.
          </p>
        </div>

        {/* Pillar 2: Data */}
        <div
          onClick={() => setActivePillar('DATA')}
          className={`liquid-glass-card p-6 cursor-pointer border transition-all ${
            activePillar === 'DATA'
              ? 'border-[#FF007A] bg-white/10 shadow-[0_0_25px_rgba(255,0,122,0.2)]'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="h-12 w-12 rounded-xl bg-dark-ocean p-2.5 flex items-center justify-center">
            <Database className="text-flamingo" size={24} />
          </div>
          <span className="text-xs text-flamingo font-bold tracking-wider margin-top block">PILLAR 2</span>
          <h2 className="text-pearl text-xl font-bold margin-top">Data (Sovereignty & Audit)</h2>
          <p className="text-coral-stone text-xs margin-top">
            Cryptographic audit receipts, primary instrument attestation, and total resident data sovereignty.
          </p>
        </div>

        {/* Pillar 3: Dollars */}
        <div
          onClick={() => setActivePillar('DOLLARS')}
          className={`liquid-glass-card p-6 cursor-pointer border transition-all ${
            activePillar === 'DOLLARS'
              ? 'border-[#FFAB00] bg-white/10 shadow-[0_0_25px_rgba(255,171,0,0.2)]'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="h-12 w-12 rounded-xl bg-dark-ocean p-2.5 flex items-center justify-center">
            <DollarSign className="text-sunset" size={24} />
          </div>
          <span className="text-xs text-sunset font-bold tracking-wider margin-top block">PILLAR 3</span>
          <h2 className="text-pearl text-xl font-bold margin-top">Dollars (Financial Layer)</h2>
          <p className="text-coral-stone text-xs margin-top">
            Multi-asset wallets, traditional banking rails, USDC stablecoins, transit passes, and civic reward tokens.
          </p>
        </div>
      </div>

      {/* Interactive Detail Box */}
      <div className="liquid-glass-card p-8 border border-white/15 margin-top">
        {activePillar === 'IDS' && (
          <div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-aqua font-bold tracking-wider">DEEP DIVE: PILLAR 1</span>
                <h2 className="text-pearl text-2xl font-bold margin-top">Identification & Verifiable Credentials</h2>
              </div>
              <button onClick={() => setActiveTab('C_NODES')} className="btn-exec-primary btn-sunset text-xs">
                Launch Resident Wallet Demo <ArrowRight size={14} />
              </button>
            </div>

            <p className="text-coral-stone margin-top text-sm">
              MIA replaces physical cards and fragmented government portals with cryptographically secure digital credentials.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 margin-top">
              <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-aqua font-bold text-base">
                  <Shield size={18} /> Verifiable Credentials & Soulbound NFTs
                </div>
                <p className="text-coral-stone text-xs margin-top">
                  Issued by G-codes directly to C-node wallets as tamper-proof credentials. Licenses, business permits, and resident IDs are non-transferable and verifiable offline.
                </p>
              </div>

              <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-flamingo font-bold text-base">
                  <LockKeyhole size={18} /> Zero-Knowledge Proofs (ZKPs)
                </div>
                <p className="text-coral-stone text-xs margin-top">
                  Residents can confirm attributes—such as age eligibility or district residency—without revealing home address, SSN, or full date of birth.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePillar === 'DATA' && (
          <div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-flamingo font-bold tracking-wider">DEEP DIVE: PILLAR 2</span>
                <h2 className="text-pearl text-2xl font-bold margin-top">Data Sovereignty & Cryptographic Receipts</h2>
              </div>
              <button onClick={() => setActiveTab('PROVENANCE_LINTER')} className="btn-exec-primary btn-sunset text-xs">
                Inspect Provenance Linter <ArrowRight size={14} />
              </button>
            </div>

            <p className="text-coral-stone margin-top text-sm">
              All interactions between C-nodes and G-codes create indisputable cryptographic receipts while preserving resident privacy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 margin-top">
              <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-flamingo font-bold text-base">
                  <FileText size={18} /> Immutable Transaction Receipts
                </div>
                <p className="text-coral-stone text-xs margin-top">
                  Every permit application, utility fee receipt, and credential assertion produces a SHA-256 content-addressed receipt on the provenance ledger.
                </p>
              </div>

              <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-aqua font-bold text-base">
                  <CheckCircle2 size={18} /> Primary Instrument Locator
                </div>
                <p className="text-coral-stone text-xs margin-top">
                  Design Law 2 enforces that every published number links to its primary source document with exact page and row locators.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePillar === 'DOLLARS' && (
          <div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-sunset font-bold tracking-wider">DEEP DIVE: PILLAR 3</span>
                <h2 className="text-pearl text-2xl font-bold margin-top">Financial Layer & Civic Tokens</h2>
              </div>
              <button onClick={() => setActiveTab('OPEN_CHECKBOOK')} className="btn-exec-primary btn-sunset text-xs">
                View Open Checkbook A1 <ArrowRight size={14} />
              </button>
            </div>

            <p className="text-coral-stone margin-top text-sm">
              Integrated financial architecture enabling friction-free municipal transactions and civic reward incentives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 margin-top">
              <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-sunset font-bold text-base">
                  <DollarSign size={18} /> Multi-Asset Non-Custodial Payment Rails
                </div>
                <p className="text-coral-stone text-xs margin-top">
                  Supports traditional ACH/fiat, USDC stablecoins, and approved municipal payment tokens for instant zero-fee settlement.
                </p>
              </div>

              <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-palm font-bold text-base">
                  <QrCode size={18} /> Specialized Municipal Tokens
                </div>
                <p className="text-coral-stone text-xs margin-top">
                  Smart contracts manage transit passes, event access, and civic engagement incentives (e.g. recycling and environmental stewardship rewards).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
