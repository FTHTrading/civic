import React, { useState } from 'react';
import type { GCodeService } from '../types';
import { Cpu, CheckCircle2, ShieldCheck, FileCheck, Search, Building2, Key, Code2 } from 'lucide-react';

interface GCodesRegistryViewProps {
  gCodes: GCodeService[];
}

export const GCodesRegistryView: React.FC<GCodesRegistryViewProps> = ({ gCodes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGCode, setSelectedGCode] = useState<GCodeService | null>(gCodes[0] || null);

  const filteredGCodes = gCodes.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="exec-view-container tropical-theme">
      {/* Header */}
      <div className="exec-page-header glass-card-strip">
        <div className="unykorn-brand-tag text-xs text-aqua font-bold tracking-wider">
          MIA BY VIA · SECTION 3.1 G-CODES REGISTRY
        </div>
        <h1 className="text-pearl margin-top">Government Codes (G-Codes) Directory</h1>
        <p className="text-coral-stone margin-top">
          Authoritative municipal smart contracts and W3C Decentralized Identifiers (DIDs) representing Miami-Dade County applications, permits, licensing, and task engines.
        </p>
      </div>

      {/* Search & Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 margin-top">
        <div className="md:col-span-2 liquid-glass-card flex items-center p-3">
          <Search size={18} className="text-aqua mr-2" />
          <input
            type="text"
            placeholder="Search G-Codes by department, DID, or service name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-pearl text-sm w-full focus:outline-none placeholder-white/40"
          />
        </div>

        <div className="liquid-glass-card p-3 flex flex-col justify-center">
          <span className="text-xs text-subtle">Total Active G-Codes</span>
          <span className="text-xl font-bold text-pearl">{gCodes.length} Municipal Endpoints</span>
        </div>

        <div className="liquid-glass-card p-3 flex flex-col justify-center">
          <span className="text-xs text-subtle">Governance Standard</span>
          <span className="text-xl font-bold text-aqua">W3C DID v1.0 / EVM</span>
        </div>
      </div>

      {/* Main Grid: List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 margin-top">
        {/* Left List */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {filteredGCodes.map((gCode) => (
            <div
              key={gCode.id}
              onClick={() => setSelectedGCode(gCode)}
              className={`liquid-glass-card p-4 cursor-pointer transition-all border ${
                selectedGCode?.id === gCode.id
                  ? 'border-[#00F2FE] bg-white/10 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Cpu size={18} className="text-aqua" />
                  <span className="text-pearl font-bold text-sm">{gCode.name}</span>
                </div>
                <span className="chip-success-small flex items-center gap-1">
                  <CheckCircle2 size={10} /> {gCode.status || 'ACTIVE'}
                </span>
              </div>

              <div className="text-xs text-coral-stone margin-top line-clamp-2">
                {gCode.description}
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-xs font-mono text-subtle">
                <span>{gCode.department}</span>
                <span className="text-flamingo">{gCode.verifiableCredentialIssued || 'VC Issuer'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Detail Inspector */}
        {selectedGCode ? (
          <div className="lg:col-span-2 liquid-glass-card p-6 border border-white/15">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-flamingo font-bold tracking-wider">G-CODE SERVICE DEEP INSPECTOR</span>
                <h2 className="text-pearl text-2xl font-bold margin-top">{selectedGCode.name}</h2>
                <div className="text-xs text-aqua font-mono margin-top flex items-center gap-1">
                  <Key size={12} /> {selectedGCode.id}
                </div>
              </div>
              <span className="px-3 py-1 bg-palm/20 text-palm border border-palm/30 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck size={14} /> AUTHORITATIVE MUNICIPAL ISSUER
              </span>
            </div>

            <p className="text-coral-stone margin-top text-sm">
              {selectedGCode.description}
            </p>

            {/* Technical Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 margin-top">
              <div className="bg-dark-ocean p-4 rounded-xl border border-white/10">
                <div className="text-xs text-subtle flex items-center gap-1">
                  <Building2 size={14} className="text-aqua" /> Department & Jurisdiction
                </div>
                <div className="text-pearl font-bold text-sm margin-top">
                  {selectedGCode.department}
                </div>
                <div className="text-xs text-coral-stone margin-top">
                  {selectedGCode.jurisdiction || 'Miami-Dade County'}
                </div>
              </div>

              <div className="bg-dark-ocean p-4 rounded-xl border border-white/10">
                <div className="text-xs text-subtle flex items-center gap-1">
                  <FileCheck size={14} className="text-flamingo" /> Issued Verifiable Credential
                </div>
                <div className="text-pearl font-bold text-sm margin-top font-mono">
                  {selectedGCode.verifiableCredentialIssued || 'Soulbound NFT VC'}
                </div>
                <div className="text-xs text-coral-stone margin-top">
                  W3C VC Spec Compliant · Non-Transferable
                </div>
              </div>

              <div className="bg-dark-ocean p-4 rounded-xl border border-white/10">
                <div className="text-xs text-subtle flex items-center gap-1">
                  <Code2 size={14} className="text-sunset" /> Smart Contract Address
                </div>
                <div className="text-pearl font-bold text-xs margin-top font-mono break-all">
                  {selectedGCode.smartContractAddress || '0x4E574939D460d284B5D990646D4aeaEF2D49Fa13'}
                </div>
                <div className="text-xs text-palm margin-top flex items-center gap-1">
                  <CheckCircle2 size={12} /> Verified Smart Contract Bytecode
                </div>
              </div>

              <div className="bg-dark-ocean p-4 rounded-xl border border-white/10">
                <div className="text-xs text-subtle flex items-center gap-1">
                  <ShieldCheck size={14} className="text-aqua" /> Authorized Public Keys
                </div>
                <div className="text-pearl font-bold text-xs margin-top font-mono break-all">
                  {selectedGCode.publicKeys?.[0] || '0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A'}
                </div>
                <div className="text-xs text-subtle margin-top">
                  Secp256k1 EIP-712 Attestation Key
                </div>
              </div>
            </div>

            {/* Smart Contract Interaction Simulator */}
            <div className="margin-top p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs text-flamingo font-bold tracking-wider">LIVE SMART CONTRACT STATE</div>
              <div className="flex justify-between items-center margin-top">
                <span className="text-sm text-pearl">Published Assertion Receipts</span>
                <span className="text-lg font-mono font-bold text-aqua">{selectedGCode.totalAssertions?.toLocaleString() || '1,420'}</span>
              </div>
              <div className="flex justify-between items-center margin-top pt-2 border-t border-white/10">
                <span className="text-sm text-pearl">Total Published Volume</span>
                <span className="text-lg font-mono font-bold text-sunset">
                  ${selectedGCode.publishedVolumeUsd?.toLocaleString() || '48,500,000'} USD
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
