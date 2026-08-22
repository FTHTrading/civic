import { useState } from 'react';
import { FileCheck, Shield, Key, Lock, ChevronDown, ChevronUp } from 'lucide-react';

export const StandardsView: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('DID');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="exec-view-container">
      <div className="exec-page-header">
        <div className="section-label">OPEN TECHNICAL STANDARDS</div>
        <h1>Verification Standards</h1>
        <p>
          Open Trust is built entirely on open W3C, NIST, and IETF standards to ensure interoperability, privacy by design, and long-term independence.
        </p>
      </div>

      <div className="standards-accordion-list">
        {/* W3C DIDs */}
        <div className="standard-card">
          <div className="standard-header" onClick={() => toggleSection('DID')}>
            <div className="standard-title-group">
              <Key className="text-teal" size={22} />
              <div>
                <h3>W3C Decentralized Identifiers (DIDs)</h3>
                <p className="text-xs text-muted">Cryptographic assertion of municipal endpoints (G-codes) and resident vaults (C-nodes)</p>
              </div>
            </div>
            {expandedSection === 'DID' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSection === 'DID' && (
            <div className="standard-body">
              <p>
                Each G-code service endpoint and resident C-node wallet holds a W3C-aligned Decentralized Identifier. A DID is controlled through cryptographic key material rather than centralized passwords.
              </p>
              <div className="code-box-small mono margin-top">
                did:via:government:miamidade:building-permits<br />
                did:via:citizen:7c4f8820...e901
              </div>
            </div>
          )}
        </div>

        {/* EIP-712 Attestation Standard */}
        <div className="standard-card margin-top">
          <div className="standard-header" onClick={() => toggleSection('EIP712')}>
            <div className="standard-title-group">
              <FileCheck className="text-violet" size={22} />
              <div>
                <h3>EIP-712 Verifiable Attestations</h3>
                <p className="text-xs text-muted">Secp256k1 signed structured typed data for human and sensor claims</p>
              </div>
            </div>
            {expandedSection === 'EIP712' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSection === 'EIP712' && (
            <div className="standard-body">
              <p>
                Human and sensor claims arrive as EIP-712 signed typed payloads. Every claim is cryptographically bound to its primary supporting instrument SHA-256 content hash and the attester’s public key.
              </p>
            </div>
          )}
        </div>

        {/* Provenance & Summary Law */}
        <div className="standard-card margin-top">
          <div className="standard-header" onClick={() => toggleSection('LAWS')}>
            <div className="standard-title-group">
              <Shield className="text-cyan" size={22} />
              <div>
                <h3>Design Laws & Provenance Rules</h3>
                <p className="text-xs text-muted">Mechanically enforced rules for public records publication</p>
              </div>
            </div>
            {expandedSection === 'LAWS' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSection === 'LAWS' && (
            <div className="standard-body">
              <div className="law-item-row">
                <strong>Rule #0 (No County Signature):</strong> Tier 1 operates exclusively on public data; does not require proprietary county signatures or vendor accounts.
              </div>
              <div className="law-item-row margin-top">
                <strong>Rule #1 (One-Way Wall):</strong> Public records cannot be modified through this platform. No public write route exists to municipal origin systems.
              </div>
              <div className="law-item-row margin-top">
                <strong>Rule #2 (Traceable Source Evidence):</strong> Summary documents, press releases, or generated indices are mechanically refused as primary instruments.
              </div>
              <div className="law-item-row margin-top">
                <strong>Freshness Rule (&lt;9 Months):</strong> Source fetch date older than 9 months forces automatic demotion.
              </div>
            </div>
          )}
        </div>

        {/* Zero-Knowledge Proofs */}
        <div className="standard-card margin-top">
          <div className="standard-header" onClick={() => toggleSection('ZKP')}>
            <div className="standard-title-group">
              <Lock className="text-amber" size={22} />
              <div>
                <h3>Zero-Knowledge Proof Privacy Engine</h3>
                <p className="text-xs text-muted">Selective disclosure without exposing personally identifiable information (PII)</p>
              </div>
            </div>
            {expandedSection === 'ZKP' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expandedSection === 'ZKP' && (
            <div className="standard-body">
              <p>
                C-nodes use zero-knowledge proofs (zk-SNARKs) to confirm specific attributes (such as district residency or age eligibility) without revealing date of birth, home address, or tax IDs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
