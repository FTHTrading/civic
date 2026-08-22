import React from 'react';
import { generateDocumentPDF } from '../../services/pdfGenerator';
import type { DocumentArtifact } from '../../services/pdfGenerator';
import { Download, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface DocumentCardProps {
  document: DocumentArtifact;
  onSelect: (doc: DocumentArtifact) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onSelect }) => {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-slate-900/60 p-5 shadow-sm backdrop-blur-md transition hover:border-teal-500/50 hover:shadow-md">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-md bg-teal-950/80 border border-teal-500/30 px-2.5 py-1 text-xs font-semibold text-teal-300">
            {document.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-400" strokeWidth={1.5} />
            {document.documentNumber}
          </span>
        </div>

        {/* Document Title */}
        <h3 className="mt-3.5 text-base font-bold text-pearl leading-snug line-clamp-2">
          {document.title}
        </h3>

        {/* Executive Summary */}
        <p className="mt-2 text-xs leading-relaxed text-coral-stone line-clamp-2">
          {document.executiveSummary}
        </p>
      </div>

      {/* Footer & Actions */}
      <div className="mt-5 border-t border-white/10 pt-3.5">
        <div className="flex items-center justify-between text-[11px] text-coral-stone mb-3">
          <span className="truncate max-w-[170px]" title={docCustodian(document.custodian)}>
            {docCustodian(document.custodian)}
          </span>
          <span>{document.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(document)}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-teal-600 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-teal-700 active:scale-[0.99]"
          >
            Review Brief
            <ArrowUpRight className="h-3.5 w-3.5 opacity-80" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => generateDocumentPDF(document)}
            className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-coral-stone transition hover:bg-white/10 hover:text-pearl active:scale-[0.99]"
            title="Download Municipal PDF"
          >
            <Download className="h-3.5 w-3.5 text-teal-400" strokeWidth={1.5} />
            PDF
          </button>
        </div>
      </div>
    </div>
  );
};

function docCustodian(custodian: string): string {
  return custodian.split('/')[0].trim();
}
