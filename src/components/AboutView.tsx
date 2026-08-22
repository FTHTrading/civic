import React from 'react';
import { Globe, Cpu, Building2, Code2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="exec-view-container space-y-6">
      <div className="exec-page-header">
        <div className="section-label">OPERATOR & ARCHITECTURE REFERENCE</div>
        <h1 className="text-3xl font-black text-white">About MIA by VIA & UnyKorn LLC</h1>
        <p className="text-slate-400 mt-2 text-base">
          MIA by VIA is a state-governed municipal trust operating system engineered by UnyKorn LLC under the process-G stage-gate framework.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Operator Card */}
        <div className="glass-card bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-cyan-400" size={24} />
            <h3 className="text-xl font-bold text-white">Operator & Engineering</h3>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong>Engineering Lead:</strong> UnyKorn LLC (<a href="https://unykorn.ai" target="_blank" rel="noreferrer" className="text-cyan-400 underline">unykorn.ai</a>)
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              UnyKorn LLC builds sovereign identity, municipal trust operating systems, and double-entry institutional subledgers. Built to strict process-G controls: integer money math, non-custodial boundaries, and hash-chained operational evidence logging.
            </p>
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl font-mono text-xs text-amber-300">
              LEI: 984500129038012938 · MIC: UBEC · Registry: list.unykorn.ai
            </div>
          </div>
        </div>

        {/* License Card */}
        <div className="glass-card bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="text-emerald-400" size={24} />
            <h3 className="text-xl font-bold text-white">Open Source Licensing</h3>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong>Dual-Licensed:</strong> Apache License 2.0 & MIT License
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              The core MIA by VIA state machine kernel, command gateway, W3C DID interfaces, and evidence receipt sealer are fully open-sourced to encourage municipal adoption and interoperability across public agencies.
            </p>
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl font-mono text-xs text-emerald-300">
              SPDX-License-Identifier: Apache-2.0 OR MIT
            </div>
          </div>
        </div>
      </div>

      {/* 5 Controlled Planes Summary */}
      <div className="glass-card bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="text-purple-400" size={24} />
          <h3 className="text-xl font-bold text-white">5 Controlled Operational Planes</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-slate-950/60 border border-cyan-500/30 rounded-xl">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">PLANE 1</span>
            <h4 className="text-sm font-bold text-white mb-1">Civic Identity</h4>
            <p className="text-[11px] text-slate-400">Citizen Nodes, W3C DIDs, VC holding & key lifecycle.</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-emerald-500/30 rounded-xl">
            <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">PLANE 2</span>
            <h4 className="text-sm font-bold text-white mb-1">Gov Service</h4>
            <p className="text-[11px] text-slate-400">G-codes, departmental issuer authority & permit cases.</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-purple-500/30 rounded-xl">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">PLANE 3</span>
            <h4 className="text-sm font-bold text-white mb-1">Privacy & Consent</h4>
            <p className="text-[11px] text-slate-400">Selective disclosure, ZK proofs & data retention rules.</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-amber-500/30 rounded-xl">
            <span className="text-xs font-mono font-bold text-amber-400 block mb-1">PLANE 4</span>
            <h4 className="text-sm font-bold text-white mb-1">Civic Value</h4>
            <p className="text-[11px] text-slate-400">Integer double-entry ledger & payment adapters.</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-rose-500/30 rounded-xl">
            <span className="text-xs font-mono font-bold text-rose-400 block mb-1">PLANE 5</span>
            <h4 className="text-sm font-bold text-white mb-1">Trust & Ops</h4>
            <p className="text-[11px] text-slate-400">Policy decision point & hash-chained receipt sealer.</p>
          </div>
        </div>
      </div>

      {/* Governance & Disclaimer */}
      <div className="glass-card bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="text-amber-400" size={24} />
          <h3 className="text-lg font-bold text-white">Legal & Non-Custodial Boundaries</h3>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed">
          MIA by VIA is an independent municipal trust operating system framework. Not legal advice. Not a securities offering. On-chain records act strictly as cryptographic integrity anchors and revocation status lists; zero PII or raw resident case files are stored on public ledgers. All financial calculations operate on integer minor units.
        </p>
      </div>
    </div>
  );
};
