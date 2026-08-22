import React, { useState, useMemo } from 'react';
import { MUNICIPAL_DOCUMENTS, generateDocumentPDF } from '../../services/pdfGenerator';
import type { DocumentArtifact } from '../../services/pdfGenerator';
import { DocumentCard } from './DocumentCard';
import { DocumentDrawer } from './DocumentDrawer';
import { Search, ShieldAlert, ArrowRight, Download, Server } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Transit & Mobility',
  'Aviation & Freight',
  'Resilience & Water',
  'Digital Trust & Identity',
  'Energy & Grid'
] as const;

export const DocumentLibraryPage: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentArtifact | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary Featured Item (DTPW Rapid Transit)
  const featuredArtifact = MUNICIPAL_DOCUMENTS[0];

  // Remaining list (excluding featured item when showing "All" with no active search)
  const isDefaultView = selectedCategory === 'All' && searchQuery.trim() === '';
  const displayArtifacts = useMemo(() => {
    const list = isDefaultView ? MUNICIPAL_DOCUMENTS.slice(1) : MUNICIPAL_DOCUMENTS;
    return list.filter((doc) => {
      const matchCat = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchQuery =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.custodian.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery, isDefaultView]);

  return (
    <div className="min-h-screen text-pearl">
      {/* Persistent Pilot Notice Banner */}
      <div className="bg-slate-950/90 border-b border-white/10 px-4 py-2 text-center text-xs font-medium text-coral-stone flex items-center justify-center gap-2">
        <ShieldAlert className="h-3.5 w-3.5 text-aqua" strokeWidth={1.5} />
        <span>
          Miami-Dade County Pilot Sandbox Environment — Technical Demonstrator v3.4. No live county databases connected.
        </span>
      </div>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="max-w-3xl mb-8">
          <div className="miami-section-tag text-aqua">STAKEHOLDER REVIEW LIBRARY</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-pearl sm:text-4xl margin-top">
            Civic Architecture & Technical Specifications
          </h1>
          <p className="mt-2 text-sm text-coral-stone leading-relaxed">
            Verified architectural blueprints, sub-second settlement runbooks, and municipal compliance frameworks for Miami-Dade digital public works.
          </p>
        </div>

        {/* Featured Infrastructure Card */}
        {isDefaultView && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-teal-400/30 bg-gradient-to-br from-[#063E59]/60 via-[#031E2B]/80 to-[#031E2B] p-6 sm:p-8 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-flamingo/20 border border-flamingo/40 px-2.5 py-1 text-xs font-bold text-flamingo">
                    FEATURED SPECIFICATION
                  </span>
                  <span className="text-xs font-mono font-medium text-coral-stone">
                    {featuredArtifact.documentNumber}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-pearl sm:text-2xl">
                  {featuredArtifact.title}
                </h2>
                <p className="mt-2 text-sm text-coral-stone leading-relaxed">
                  {featuredArtifact.executiveSummary}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-coral-stone">
                  <span><strong>Custodian:</strong> {featuredArtifact.custodian}</span>
                  <span><strong>Benchmark:</strong> Sub-380ms transit fare clearance</span>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                <button
                  onClick={() => setSelectedDocument(featuredArtifact)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-sunset px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90 transition btn-sunset"
                >
                  Review Complete Brief
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => generateDocumentPDF(featuredArtifact)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-pearl hover:bg-white/10 transition"
                >
                  <Download className="h-4 w-4 text-aqua" strokeWidth={1.5} />
                  Download Official PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-sunset text-white shadow-sm'
                    : 'bg-white/5 border border-white/10 text-coral-stone hover:bg-white/10 hover:text-pearl'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-coral-stone" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by topic, agency, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-dark-ocean py-2 pl-9 pr-3 text-xs text-pearl placeholder:text-coral-stone/60 focus:border-electric-aqua focus:outline-none"
            />
          </div>
        </div>

        {/* Grid of Clean Cards */}
        {displayArtifacts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayArtifacts.map((artifact) => (
              <DocumentCard
                key={artifact.id}
                document={artifact}
                onSelect={setSelectedDocument}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-dark-ocean p-12 text-center">
            <Server className="mx-auto h-8 w-8 text-coral-stone" strokeWidth={1.5} />
            <h3 className="mt-2 text-sm font-semibold text-pearl">No specifications found</h3>
            <p className="mt-1 text-xs text-coral-stone">
              No municipal documents matched your current search filters.
            </p>
          </div>
        )}
      </main>

      {/* Conditionally Rendered Overlay Drawer */}
      {selectedDocument && (
        <DocumentDrawer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};
