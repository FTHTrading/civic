import React from 'react';
import type { ExecutiveTabType } from './Navigation';
import { ArrowRight, ShieldCheck, LockKeyhole, Wallet, Cpu, Database, Shield, Sparkles } from 'lucide-react';

interface HomePageViewProps {
  setActiveTab: (tab: ExecutiveTabType) => void;
  passedGatesCount: number;
  totalGatesCount: number;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  setActiveTab
}) => {
  return (
    <div className="miami-home-container tropical-theme">
      {/* 1. HERO SECTION WITH CINEMATIC VIDEO BACKGROUND */}
      <section className="miami-hero-section full-bleed-hero">
        <div className="hero-video-bg">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-fullscreen"
          >
            <source src="/assets/media/we_need_miami_flamigos_and_tro.mp4" type="video/mp4" />
            <source src="/assets/media/Use_a_silent_cinematic_homepa.mp4" type="video/mp4" />
            <source src="/assets/media/we_are_building_for_this_syste.mp4" type="video/mp4" />
          </video>
          <div className="hero-gradient-overlay"></div>
        </div>

        <div className="miami-hero-content hero-glass-card">
          <div className="unykorn-brand-tag text-xs text-flamingo font-bold tracking-wider uppercase flex items-center justify-center gap-1">
            <Sparkles size={14} /> MIA by VIA · Built by UnyKorn LLC
          </div>

          <h1 className="miami-hero-headline text-pearl margin-top text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Decentralized Municipal Identification Platform for Miami-Dade County
          </h1>

          <p className="miami-hero-body margin-top text-coral-stone text-base md:text-lg">
            Self-Sovereign Identity (SSI), W3C DIDs, and smart contract verification connecting Government Codes (G-codes) and Citizen Nodes (C-nodes) across IDs, Data, and Dollars.
          </p>

          <div className="miami-hero-actions margin-top flex flex-wrap justify-center gap-3">
            <button onClick={() => setActiveTab('C_NODES')} className="btn-miami-primary btn-sunset flex items-center gap-2">
              <Wallet size={18} /> Open Resident C-Node Wallet
            </button>
            <button onClick={() => setActiveTab('G_CODES')} className="btn-miami-secondary glass-btn flex items-center gap-2">
              <Cpu size={18} /> Explore G-Codes Directory <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Persistent Non-Affiliation Status Pill */}
          <div className="margin-top pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#00F2FE] animate-pulse" aria-hidden="true" />
              <span>Decentralized Architecture · W3C DID Standard · Operates on mia.unykorn.ai</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE WHITEPAPER COMPONENTS */}
      <section className="miami-proof-cards-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag text-aqua">WHITEPAPER ARCHITECTURE COMPONENTS</div>
          <h2 className="miami-section-title text-pearl text-2xl font-bold">Government Codes (G-codes) & Citizen Nodes (C-nodes)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 margin-top">
          {/* G-Codes Card */}
          <div className="outcome-card liquid-glass-card p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="outcome-icon-box bg-dark-ocean p-3 rounded-xl w-fit">
                <Cpu size={24} className="text-aqua" strokeWidth={1.5} />
              </div>
              <div className="margin-top">
                <span className="text-xs text-aqua font-bold tracking-wider uppercase">SECTION 3.1 G-CODES</span>
                <h3 className="text-pearl text-xl font-bold margin-top">Government Codes</h3>
                <p className="text-coral-stone text-sm margin-top">
                  Unique smart contracts and DIDs assigned to municipal licenses, permits, utility accounts, task tickets, and authorized department agents.
                </p>
              </div>
            </div>
            <div className="proof-card-footer margin-top pt-4 border-t border-white/10">
              <button onClick={() => setActiveTab('G_CODES')} className="btn-doc-secondary glass-btn text-xs w-full flex items-center justify-between">
                <span>View G-Codes Directory</span> <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* C-Nodes Card */}
          <div className="outcome-card liquid-glass-card p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="outcome-icon-box bg-dark-ocean p-3 rounded-xl w-fit">
                <Wallet size={24} className="text-flamingo" strokeWidth={1.5} />
              </div>
              <div className="margin-top">
                <span className="text-xs text-flamingo font-bold tracking-wider uppercase">SECTION 3.2 C-NODES</span>
                <h3 className="text-pearl text-xl font-bold margin-top">Citizen Nodes</h3>
                <p className="text-coral-stone text-sm margin-top">
                  Non-custodial identity vaults controlled by residents and enterprises. Stores Verifiable Credentials, NFTs, multi-asset balances, and ZKP proofs.
                </p>
              </div>
            </div>
            <div className="proof-card-footer margin-top pt-4 border-t border-white/10">
              <button onClick={() => setActiveTab('C_NODES')} className="btn-doc-secondary glass-btn text-xs w-full flex items-center justify-between">
                <span>Launch C-Node Wallet</span> <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Three Pillars Card */}
          <div className="outcome-card liquid-glass-card p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="outcome-icon-box bg-dark-ocean p-3 rounded-xl w-fit">
                <Shield size={24} className="text-sunset" strokeWidth={1.5} />
              </div>
              <div className="margin-top">
                <span className="text-xs text-sunset font-bold tracking-wider uppercase">SECTION 4 THE 3 PILLARS</span>
                <h3 className="text-pearl text-xl font-bold margin-top">IDs, Data & Dollars</h3>
                <p className="text-coral-stone text-sm margin-top">
                  Comprehensive functional pillars uniting Self-Sovereign Identity, cryptographic transaction receipts, and non-custodial civic payment rails.
                </p>
              </div>
            </div>
            <div className="proof-card-footer margin-top pt-4 border-t border-white/10">
              <button onClick={() => setActiveTab('THREE_PILLARS')} className="btn-doc-secondary glass-btn text-xs w-full flex items-center justify-between">
                <span>Inspect 3 Pillars</span> <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPEN TRUST CIVIC STACK SUMMARY */}
      <section className="miami-outcomes-section margin-top">
        <div className="section-header-left">
          <div className="miami-section-tag text-aqua">CIVIC TRANSPARENCY STACK</div>
          <h2 className="miami-section-title text-pearl text-2xl font-bold">Open Trust (OTM) Integration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 margin-top">
          <div
            onClick={() => setActiveTab('OPEN_CHECKBOOK')}
            className="liquid-glass-card p-6 border border-white/10 cursor-pointer hover:border-[#00F2FE]/50 transition-all"
          >
            <div className="flex items-center gap-2 text-aqua font-bold text-base">
              <Database size={20} /> Artifact A1 · Open Checkbook
            </div>
            <p className="text-coral-stone text-xs margin-top">
              Public transparency ledger linking every municipal expenditure to primary instruments with page-and-row locators.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('STANDARDS')}
            className="liquid-glass-card p-6 border border-white/10 cursor-pointer hover:border-[#FF007A]/50 transition-all"
          >
            <div className="flex items-center gap-2 text-flamingo font-bold text-base">
              <ShieldCheck size={20} /> Artifact A2 · Attestation Standard
            </div>
            <p className="text-coral-stone text-xs margin-top">
              EIP-712 secp256k1 signature specification enabling third-party verification without county dependencies.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('PROVENANCE_LINTER')}
            className="liquid-glass-card p-6 border border-white/10 cursor-pointer hover:border-[#FFAB00]/50 transition-all"
          >
            <div className="flex items-center gap-2 text-sunset font-bold text-base">
              <LockKeyhole size={20} /> Artifact A3 · Provenance Linter
            </div>
            <p className="text-coral-stone text-xs margin-top">
              Automated gatekeeper refusing to render or publish unsourced municipal claims, summaries, or raw PII.
            </p>
          </div>
        </div>
      </section>

      {/* 4. BUILT BY UNYKORN LLC */}
      <section className="unykorn-block-section glass-card-strip margin-top">
        <div className="unykorn-block-content p-6">
          <div className="miami-section-tag text-flamingo uppercase font-bold tracking-wider">ENGINEERED BY UNYKORN LLC</div>
          <p className="unykorn-block-body text-pearl margin-top text-sm">
            UnyKorn LLC designs and builds the complete technical architecture, verification engine, resident C-node wallet, and G-code smart contract endpoints powering MIA by VIA at <span className="text-aqua font-mono">mia.unykorn.ai</span>.
          </p>
          <div className="margin-top">
            <button onClick={() => setActiveTab('INFRASTRUCTURE')} className="btn-unykorn-link glass-btn text-xs">
              Review Architecture Specs <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
