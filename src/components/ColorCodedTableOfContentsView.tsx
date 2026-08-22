import React, { useState } from 'react';
import { BookOpen, Cpu, Wallet, Shield, FileText, CheckSquare, LockKeyhole, ArrowRight } from 'lucide-react';
import type { ExecutiveTabType } from './Navigation';

interface ColorCodedTableOfContentsViewProps {
  setActiveTab: (tab: ExecutiveTabType) => void;
}

export const ColorCodedTableOfContentsView: React.FC<ColorCodedTableOfContentsViewProps> = ({ setActiveTab }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const tocSections = [
    {
      id: 'SEC-1',
      title: 'Section 1: Executive Summary & Core Foundations',
      domain: 'FOUNDATIONS',
      badgeColor: '#00F2FE',
      borderColor: 'border-[#00F2FE]',
      bgGlow: 'shadow-[0_0_20px_rgba(0,242,254,0.15)]',
      textColor: 'text-[#00F2FE]',
      icon: BookOpen,
      targetTab: 'INFRASTRUCTURE' as ExecutiveTabType,
      items: [
        { num: '1.1', name: 'Executive Overview & Platform Purpose (mia.unykorn.ai)' },
        { num: '1.2', name: 'W3C Decentralized Identifiers (DIDs) Architecture' },
        { num: '1.3', name: 'Smart Contract Governance & Automation' },
        { num: '1.4', name: 'Self-Sovereign Identity (SSI) Core Principles' }
      ]
    },
    {
      id: 'SEC-2',
      title: 'Section 2: Government Codes (G-codes) Registry',
      domain: 'GCODES',
      badgeColor: '#FF007A',
      borderColor: 'border-[#FF007A]',
      bgGlow: 'shadow-[0_0_20px_rgba(255,0,122,0.15)]',
      textColor: 'text-[#FF007A]',
      icon: Cpu,
      targetTab: 'G_CODES' as ExecutiveTabType,
      items: [
        { num: '2.1', name: 'G-Code Smart Contract & DID Specification' },
        { num: '2.2', name: 'Miami-Dade Building & Permitting Service (permit-building-01)' },
        { num: '2.3', name: 'Commercial & Occupational Licensing (business-licensing-02)' },
        { num: '2.4', name: 'Department of Transportation & Mobility (transit-publicworks-03)' },
        { num: '2.5', name: 'Water & Sewer Utility Attestation (water-sewer-04)' },
        { num: '2.6', name: 'Biscayne Bay Eco-Stewardship Rewards (biscayne-env-06)' }
      ]
    },
    {
      id: 'SEC-3',
      title: 'Section 3: Citizen Nodes (C-nodes) Wallet & ZKP',
      domain: 'CNODES',
      badgeColor: '#FFAB00',
      borderColor: 'border-[#FFAB00]',
      bgGlow: 'shadow-[0_0_20px_rgba(255,171,0,0.15)]',
      textColor: 'text-[#FFAB00]',
      icon: Wallet,
      targetTab: 'C_NODES' as ExecutiveTabType,
      items: [
        { num: '3.1', name: 'Resident Non-Custodial Wallet Architecture' },
        { num: '3.2', name: 'Verifiable Credentials & Soulbound VC NFTs' },
        { num: '3.3', name: 'Groth16/BN254 Zero-Knowledge Proof (ZKP) SNARK Engine' },
        { num: '3.4', name: 'Selective Disclosure: District 3 Residency Proof' },
        { num: '3.5', name: 'Selective Disclosure: Age 21+ & Solar Permit Verification' }
      ]
    },
    {
      id: 'SEC-4',
      title: 'Section 4: The Three Pillars — IDs, Data, and Dollars',
      domain: 'PILLARS',
      badgeColor: '#10B981',
      borderColor: 'border-[#10B981]',
      bgGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      textColor: 'text-[#10B981]',
      icon: Shield,
      targetTab: 'THREE_PILLARS' as ExecutiveTabType,
      items: [
        { num: '4.1', name: 'Pillar 1: IDs — Unified Cryptographic Identity Vault' },
        { num: '4.2', name: 'Pillar 2: Data — Immutable SHA-256 Receipts & Sovereignty' },
        { num: '4.3', name: 'Pillar 3: Dollars — Multi-Asset Rails (USD, USDC, MIA Tokens)' }
      ]
    },
    {
      id: 'SEC-5',
      title: 'Section 5: Open Trust (OTM) Civic Artifacts (A1, A2, A3)',
      domain: 'OPENTRUST',
      badgeColor: '#A835C4',
      borderColor: 'border-[#A835C4]',
      bgGlow: 'shadow-[0_0_20px_rgba(168,53,196,0.15)]',
      textColor: 'text-[#A835C4]',
      icon: FileText,
      targetTab: 'OPEN_CHECKBOOK' as ExecutiveTabType,
      items: [
        { num: '5.1', name: 'Artifact A1 — Open Checkbook Expenditure Ledger' },
        { num: '5.2', name: 'Artifact A2 — EIP-712 Attestation Standard' },
        { num: '5.3', name: 'Artifact A3 — Provenance Ledger & Blocking Linter' }
      ]
    },
    {
      id: 'SEC-6',
      title: 'Section 6: ANVIL Gate Board & Governance',
      domain: 'GATES',
      badgeColor: '#FF6A3D',
      borderColor: 'border-[#FF6A3D]',
      bgGlow: 'shadow-[0_0_20px_rgba(255,106,61,0.15)]',
      textColor: 'text-[#FF6A3D]',
      icon: CheckSquare,
      targetTab: 'GATE_BOARD' as ExecutiveTabType,
      items: [
        { num: '6.1', name: 'Exit Gates G0–G7 Exit Criteria Verification' },
        { num: '6.2', name: 'Human Blocking Gates (G-M01 to G-M14) Governance' }
      ]
    },
    {
      id: 'SEC-7',
      title: 'Section 7: Legal Perimeter & Design Laws',
      domain: 'PERIMETER',
      badgeColor: '#060C1B',
      borderColor: 'border-white/20',
      bgGlow: 'shadow-[0_0_20px_rgba(255,255,255,0.08)]',
      textColor: 'text-pearl',
      icon: LockKeyhole,
      targetTab: 'BOUNDARIES' as ExecutiveTabType,
      items: [
        { num: '7.1', name: 'Design Law 0: Zero County Signature or Vendor Lock-in' },
        { num: '7.2', name: 'Design Law 1: One-Way Wall Network Topology' },
        { num: '7.3', name: 'Design Law 2: Summary Law (Primary Instrument Requirement)' },
        { num: '7.4', name: 'Design Law 3: Third-Party Cryptographic Verifiability' }
      ]
    }
  ];

  const filteredSections = tocSections.filter(
    (sec) => selectedDomain === 'ALL' || sec.domain === selectedDomain
  );

  return (
    <div className="exec-view-container tropical-theme">
      {/* Header */}
      <div className="exec-page-header glass-card-strip">
        <div className="unykorn-brand-tag text-xs text-aqua font-bold tracking-wider uppercase">
          MIA BY VIA · MASTER SYSTEM INDEX
        </div>
        <h1 className="text-pearl margin-top">Color-Coded Table of Contents</h1>
        <p className="text-coral-stone margin-top">
          Master architectural index categorizing all sections of the MIA by VIA Whitepaper, OPEN TRUST (OTM) artifacts, ANVIL gates, and legal perimeter rules.
        </p>
      </div>

      {/* Domain Filters */}
      <div className="flex flex-wrap gap-2 margin-top">
        <button
          onClick={() => setSelectedDomain('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
            selectedDomain === 'ALL'
              ? 'bg-sunset text-white shadow-md'
              : 'bg-white/5 border border-white/10 text-coral-stone hover:bg-white/10'
          }`}
        >
          All Domains (7 Sections)
        </button>
        <button
          onClick={() => setSelectedDomain('FOUNDATIONS')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border border-[#00F2FE]/40 text-[#00F2FE] ${
            selectedDomain === 'FOUNDATIONS' ? 'bg-[#00F2FE]/20 shadow-md' : 'bg-white/5'
          }`}
        >
          🩵 Foundations (L0–L1)
        </button>
        <button
          onClick={() => setSelectedDomain('GCODES')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border border-[#FF007A]/40 text-[#FF007A] ${
            selectedDomain === 'GCODES' ? 'bg-[#FF007A]/20 shadow-md' : 'bg-white/5'
          }`}
        >
          🩷 G-Codes Directory
        </button>
        <button
          onClick={() => setSelectedDomain('CNodes')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border border-[#FFAB00]/40 text-[#FFAB00] ${
            selectedDomain === 'CNODES' ? 'bg-[#FFAB00]/20 shadow-md' : 'bg-white/5'
          }`}
        >
          💛 C-Nodes Wallet & ZKP
        </button>
        <button
          onClick={() => setSelectedDomain('PILLARS')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border border-[#10B981]/40 text-[#10B981] ${
            selectedDomain === 'PILLARS' ? 'bg-[#10B981]/20 shadow-md' : 'bg-white/5'
          }`}
        >
          💚 3 Pillars (IDs, Data, Dollars)
        </button>
        <button
          onClick={() => setSelectedDomain('OPENTRUST')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border border-[#A835C4]/40 text-[#A835C4] ${
            selectedDomain === 'OPENTRUST' ? 'bg-[#A835C4]/20 shadow-md' : 'bg-white/5'
          }`}
        >
          💜 Open Trust Artifacts
        </button>
        <button
          onClick={() => setSelectedDomain('GATES')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition border border-[#FF6A3D]/40 text-[#FF6A3D] ${
            selectedDomain === 'GATES' ? 'bg-[#FF6A3D]/20 shadow-md' : 'bg-white/5'
          }`}
        >
          🧡 ANVIL Gate Board
        </button>
      </div>

      {/* Table of Contents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 margin-top">
        {filteredSections.map((sec) => {
          const IconComp = sec.icon;
          return (
            <div
              key={sec.id}
              className={`liquid-glass-card p-6 border ${sec.borderColor} ${sec.bgGlow} flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-dark-ocean">
                      <IconComp size={22} className={sec.textColor} />
                    </div>
                    <div>
                      <span className={`text-[11px] font-mono font-bold tracking-wider ${sec.textColor}`}>
                        {sec.domain} DOMAIN
                      </span>
                      <h2 className="text-pearl text-lg font-bold margin-top">{sec.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="margin-top pt-3 border-t border-white/10 flex flex-col gap-2">
                  {sec.items.map((item) => (
                    <div key={item.num} className="flex items-start gap-2 text-xs">
                      <span className={`font-mono font-bold ${sec.textColor}`}>{item.num}</span>
                      <span className="text-coral-stone">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="margin-top pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveTab(sec.targetTab)}
                  className="btn-doc-secondary glass-btn text-xs flex items-center gap-1"
                >
                  Jump to {sec.domain} Module <ArrowRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
