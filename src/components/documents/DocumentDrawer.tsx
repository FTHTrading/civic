import React, { useEffect } from 'react';
import { generateDocumentPDF } from '../../services/pdfGenerator';
import type { DocumentArtifact } from '../../services/pdfGenerator';
import { Download, X, Shield, Layers, Hash } from 'lucide-react';

interface DocumentDrawerProps {
  document: DocumentArtifact;
  onClose: () => void;
}

export const DocumentDrawer: React.FC<DocumentDrawerProps> = ({ document: doc, onClose }) => {
  // Handle ESC key listener & body lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <aside className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-[#031E2B] border-l border-white/15 text-pearl shadow-2xl">
        {/* Sticky Drawer Header */}
        <div className="flex items-start justify-between border-b border-white/10 bg-[#063E59]/80 px-6 py-4 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded bg-teal-500/20 border border-teal-400/30 px-2 py-0.5 text-[11px] font-bold text-electric-aqua uppercase tracking-wider">
                {doc.category}
              </span>
              <span className="text-xs font-mono font-semibold text-coral-stone">
                {doc.documentNumber}
              </span>
            </div>
            <h2 className="text-lg font-bold text-pearl">{doc.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-coral-stone hover:bg-white/10 hover:text-pearl transition"
            aria-label="Close specification"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* Executive Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-aqua">
              1. Executive Overview & Scope
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-coral-stone">
              {doc.executiveSummary}
            </p>
          </div>

          {/* Municipal Stakeholder ROI Box */}
          <div className="rounded-xl border border-teal-400/30 bg-teal-950/40 p-4">
            <div className="flex items-center gap-2 text-aqua">
              <Shield className="h-4 w-4 text-electric-aqua" strokeWidth={1.5} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Stakeholder Decision Value & Impact
              </h4>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-coral-stone">
              {doc.stakeholderValue}
            </p>
          </div>

          {/* Architectural Pillars */}
          <div>
            <div className="flex items-center gap-2 text-pearl mb-2">
              <Layers className="h-4 w-4 text-electric-aqua" strokeWidth={1.5} />
              <h4 className="text-xs font-bold uppercase tracking-wider text-aqua">
                2. Technical Architecture & Protocols
              </h4>
            </div>
            <ul className="space-y-2 mt-2">
              {doc.technicalArchitecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-coral-stone">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-electric-aqua shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Measurable Benchmark Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-aqua mb-2">
              3. Measurable Infrastructure Benchmarks
            </h4>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-dark-ocean">
              <table className="min-w-full divide-y divide-white/10 text-xs">
                <thead className="bg-slate-900/80">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-pearl">Dimension</th>
                    <th className="px-3 py-2 text-left font-semibold text-coral-stone">Baseline</th>
                    <th className="px-3 py-2 text-left font-semibold text-aqua">VIA Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-slate-900/40">
                  {doc.metrics.map((m, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-2 font-medium text-pearl">{m.label}</td>
                      <td className="px-3 py-2 text-coral-stone">{m.baseline}</td>
                      <td className="px-3 py-2 font-semibold text-aqua">{m.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
            <div>
              <span className="text-coral-stone/70">Custodian Authority</span>
              <p className="font-semibold text-pearl">{doc.custodian}</p>
            </div>
            <div>
              <span className="text-coral-stone/70">Statutory Framework</span>
              <p className="font-semibold text-pearl">{doc.complianceFramework}</p>
            </div>
          </div>

          {/* Cryptographic Hash Checksum */}
          <div className="rounded-lg bg-dark-ocean p-3 text-[11px] font-mono text-coral-stone flex items-start gap-2 border border-white/10">
            <Hash className="h-4 w-4 text-aqua shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="break-all">
              <span className="font-bold text-pearl">SHA-256 Checksum: </span>
              {doc.hashSignature}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#063E59]/80 px-6 py-4 backdrop-blur-md">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-pearl hover:bg-white/10 transition"
          >
            Close Viewer
          </button>
          <button
            onClick={() => generateDocumentPDF(doc)}
            className="inline-flex items-center gap-2 rounded-lg bg-sunset px-4 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90 transition btn-sunset"
          >
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Download Complete PDF Specification
          </button>
        </div>
      </aside>
    </div>
  );
};
