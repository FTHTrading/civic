import React, { useState } from 'react';
import type { CNodeProfile, ZKPProof } from '../types';
import { Wallet, ShieldCheck, Key, CheckCircle2, LockKeyhole, DollarSign, Award, Bus, Sparkles, UserCheck } from 'lucide-react';

interface CNodesWalletViewProps {
  profile: CNodeProfile;
  zkpProofs: ZKPProof[];
}

export const CNodesWalletView: React.FC<CNodesWalletViewProps> = ({ profile, zkpProofs: initialProofs }) => {
  const [activeTab, setActiveTab] = useState<'CREDENTIALS' | 'BALANCES' | 'ZKP' | 'TRANSACTIONS'>('CREDENTIALS');
  const [proofs, setProofs] = useState<ZKPProof[]>(initialProofs);
  const [isGeneratingZkp, setIsGeneratingZkp] = useState(false);
  const [selectedZkpType, setSelectedZkpType] = useState('DISTRICT_RESIDENCY');
  const [generatedProofHash, setGeneratedProofHash] = useState<string | null>(null);

  const handleGenerateZkp = () => {
    setIsGeneratingZkp(true);
    setGeneratedProofHash(null);
    setTimeout(() => {
      const newHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newProof: ZKPProof = {
        proofId: `ZKP-MIA-${Date.now()}`,
        claimType: selectedZkpType,
        statement:
          selectedZkpType === 'DISTRICT_RESIDENCY'
            ? 'Proves resident lives in Miami-Dade District 3 without disclosing street address.'
            : selectedZkpType === 'AGE_ELIGIBILITY'
            ? 'Proves resident is over 21 years old without disclosing full Date of Birth.'
            : 'Proves holder holds an active Solar Installation Permit without revealing parcel number.',
        publicInputs: { VerificationScheme: 'Groth16/BN254', District: '3', Timestamp: new Date().toISOString() },
        zkProofHash: newHash,
        isVerified: true,
        timestamp: new Date().toISOString()
      };
      setProofs([newProof, ...proofs]);
      setGeneratedProofHash(newHash);
      setIsGeneratingZkp(false);
    }, 1200);
  };

  return (
    <div className="exec-view-container tropical-theme">
      {/* Header */}
      <div className="exec-page-header glass-card-strip">
        <div className="unykorn-brand-tag text-xs text-flamingo font-bold tracking-wider">
          MIA BY VIA · SECTION 3.2 C-NODES CITIZEN WALLET
        </div>
        <h1 className="text-pearl margin-top">Resident Non-Custodial C-Node Wallet</h1>
        <p className="text-coral-stone margin-top">
          Self-Sovereign Identity (SSI) vault where Miami residents hold their W3C DIDs, Verifiable Credentials (NFTs), zero-knowledge selective disclosure proofs, and multi-asset civic tokens.
        </p>
      </div>

      {/* Wallet Identity Card */}
      <div className="liquid-glass-card p-6 border border-white/15 margin-top">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#FF007A] to-[#00F2FE] p-0.5 shadow-lg flex items-center justify-center">
              <div className="h-full w-full bg-[#060C1B] rounded-[14px] flex items-center justify-center">
                <Wallet className="text-aqua" size={28} />
              </div>
            </div>
            <div>
              <span className="text-xs text-flamingo font-bold tracking-wider">{profile.alias}</span>
              <h2 className="text-pearl text-2xl font-bold">{profile.citizenName || 'Resident Identity Node'}</h2>
              <div className="text-xs text-aqua font-mono margin-top flex items-center gap-1">
                <Key size={12} /> {profile.did}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 rounded-full text-xs font-bold flex items-center gap-1">
              <UserCheck size={12} /> District 3 Verified
            </span>
            <span className="px-3 py-1 bg-palm/20 text-palm border border-palm/30 rounded-full text-xs font-bold flex items-center gap-1">
              <ShieldCheck size={12} /> ZKP Engine Active
            </span>
            <span className="px-3 py-1 bg-sunset/20 text-sunset border border-sunset/30 rounded-full text-xs font-bold flex items-center gap-1">
              <LockKeyhole size={12} /> Non-Custodial
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 margin-top pt-4">
          <button
            onClick={() => setActiveTab('CREDENTIALS')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'CREDENTIALS'
                ? 'border-[#00F2FE] text-[#00F2FE]'
                : 'border-transparent text-coral-stone hover:text-pearl'
            }`}
          >
            Verifiable Credentials ({profile.soulboundCredentials?.length || 3})
          </button>
          <button
            onClick={() => setActiveTab('BALANCES')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'BALANCES'
                ? 'border-[#00F2FE] text-[#00F2FE]'
                : 'border-transparent text-coral-stone hover:text-pearl'
            }`}
          >
            Multi-Asset Balances (Pillar 3: Dollars)
          </button>
          <button
            onClick={() => setActiveTab('ZKP')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'ZKP'
                ? 'border-[#00F2FE] text-[#00F2FE]'
                : 'border-transparent text-coral-stone hover:text-pearl'
            }`}
          >
            Zero-Knowledge Proof Generator
          </button>
          <button
            onClick={() => setActiveTab('TRANSACTIONS')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'TRANSACTIONS'
                ? 'border-[#00F2FE] text-[#00F2FE]'
                : 'border-transparent text-coral-stone hover:text-pearl'
            }`}
          >
            Cryptographic Receipts (Pillar 2: Data)
          </button>
        </div>

        {/* Tab 1: Verifiable Credentials */}
        {activeTab === 'CREDENTIALS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 margin-top">
            {profile.soulboundCredentials?.map((cred: any) => (
              <div key={cred.id} className="bg-dark-ocean p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-flamingo">
                      {cred.isSoulbound ? 'SOULBOUND NFT VC' : 'PERMIT CREDENTIAL'}
                    </span>
                    <span className="chip-success-small">VERIFIED</span>
                  </div>
                  <h3 className="text-pearl font-bold text-base margin-top">{cred.title}</h3>
                  <div className="text-xs text-subtle margin-top font-mono">Issuer: {cred.issuer}</div>

                  <div className="margin-top pt-3 border-t border-white/10 flex flex-col gap-1 text-xs">
                    {Object.entries(cred.fields || {}).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-coral-stone">{k}:</span>
                        <span className="text-pearl font-mono">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="margin-top pt-3 flex justify-between items-center text-xs text-aqua">
                  <span className="flex items-center gap-1">
                    <LockKeyhole size={12} /> Privacy Protected
                  </span>
                  <span className="font-mono text-subtle">{cred.issuedDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Multi-Asset Balances (Pillar 3 Dollars) */}
        {activeTab === 'BALANCES' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 margin-top">
            <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
              <div className="text-xs text-subtle flex items-center gap-1">
                <DollarSign size={16} className="text-palm" /> FIAT BANKING RAILS
              </div>
              <div className="text-2xl font-bold text-pearl margin-top font-mono">
                ${profile.balances?.fiatUSD?.toLocaleString() || '2,450.00'} USD
              </div>
              <div className="text-xs text-coral-stone margin-top">Direct Bank Integration · ACH/Wire</div>
            </div>

            <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
              <div className="text-xs text-subtle flex items-center gap-1">
                <DollarSign size={16} className="text-aqua" /> STABLECOIN USDF/USDC
              </div>
              <div className="text-2xl font-bold text-aqua margin-top font-mono">
                ${profile.balances?.usdc?.toLocaleString() || '500.00'} USDC
              </div>
              <div className="text-xs text-coral-stone margin-top">Zero-Fee Municipal Instant Settlement</div>
            </div>

            <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
              <div className="text-xs text-subtle flex items-center gap-1">
                <Bus size={16} className="text-sunset" /> METRORAIL TRANSIT PASSES
              </div>
              <div className="text-2xl font-bold text-sunset margin-top font-mono">
                {profile.balances?.transitTokens || 24} Rides
              </div>
              <div className="text-xs text-coral-stone margin-top">G-Code Transit Pass VC Active</div>
            </div>

            <div className="bg-dark-ocean p-5 rounded-2xl border border-white/10">
              <div className="text-xs text-subtle flex items-center gap-1">
                <Award size={16} className="text-flamingo" /> CIVIC REWARDS (MIA)
              </div>
              <div className="text-2xl font-bold text-flamingo margin-top font-mono">
                {profile.balances?.civicRewards || 150} MIA Tokens
              </div>
              <div className="text-xs text-coral-stone margin-top">Eco-Stewardship Recycling Bonus</div>
            </div>
          </div>
        )}

        {/* Tab 3: Zero-Knowledge Proof Generator */}
        {activeTab === 'ZKP' && (
          <div className="margin-top">
            <div className="p-5 bg-dark-ocean rounded-2xl border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-xs text-aqua font-bold tracking-wider flex items-center gap-1">
                    <Sparkles size={14} /> ZERO-KNOWLEDGE PROOF (ZKP) GENERATOR
                  </div>
                  <h3 className="text-pearl text-lg font-bold margin-top">Generate Privacy-Preserving Attestation</h3>
                  <p className="text-coral-stone text-xs margin-top">
                    Prove attributes (age, district residency, active permit status) to third parties without exposing raw underlying data or PII.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    value={selectedZkpType}
                    onChange={(e) => setSelectedZkpType(e.target.value)}
                    className="bg-white/10 border border-white/20 text-pearl text-xs rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="DISTRICT_RESIDENCY" className="bg-[#060C1B]">
                      Prove District 3 Residency
                    </option>
                    <option value="AGE_ELIGIBILITY" className="bg-[#060C1B]">
                      Prove Age 21+
                    </option>
                    <option value="SOLAR_PERMIT_ACTIVE" className="bg-[#060C1B]">
                      Prove Solar Permit Active
                    </option>
                  </select>

                  <button
                    onClick={handleGenerateZkp}
                    disabled={isGeneratingZkp}
                    className="btn-exec-primary btn-sunset text-xs px-4 py-2 whitespace-nowrap"
                  >
                    {isGeneratingZkp ? 'Computing ZKP SNARK...' : 'Generate Proof'}
                  </button>
                </div>
              </div>

              {generatedProofHash && (
                <div className="margin-top p-4 bg-palm/10 border border-palm/30 rounded-xl">
                  <div className="text-xs text-palm font-bold flex items-center gap-1">
                    <CheckCircle2 size={14} /> ZKP Proof Generated & Verified (Groth16 / BN254)
                  </div>
                  <div className="text-xs font-mono text-pearl margin-top break-all">
                    Proof Hash: {generatedProofHash}
                  </div>
                </div>
              )}
            </div>

            {/* List of active ZKP proofs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 margin-top">
              {proofs.map((proof) => (
                <div key={proof.proofId} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-pearl">{proof.claimType}</span>
                    <span className="chip-success-small flex items-center gap-1">
                      <CheckCircle2 size={10} /> VERIFIED
                    </span>
                  </div>
                  <div className="text-xs text-coral-stone margin-top">{proof.statement}</div>
                  <div className="text-[11px] font-mono text-aqua margin-top break-all">
                    Hash: {proof.zkProofHash}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Cryptographic Receipts (Pillar 2 Data) */}
        {activeTab === 'TRANSACTIONS' && (
          <div className="margin-top flex flex-col gap-3">
            {profile.transactionHistory?.map((tx: any) => (
              <div key={tx.id} className="bg-dark-ocean p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-pearl font-bold text-sm">{tx.title}</span>
                    <span className="text-xs font-mono text-flamingo">[{tx.type}]</span>
                  </div>
                  <div className="text-xs text-coral-stone margin-top font-mono">
                    G-Code: {tx.gCode} · Hash: {tx.hash}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-pearl font-mono font-bold text-sm">{tx.amount}</div>
                  <div className="text-xs text-subtle margin-top">{tx.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
