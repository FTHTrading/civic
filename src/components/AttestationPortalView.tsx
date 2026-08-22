import React, { useState } from 'react';
import type { AssertionItem } from '../types';
import { createEIP712Payload } from '../lib/eip712';
import { FileCheck, ShieldCheck } from 'lucide-react';

interface AttestationPortalViewProps {
  assertions: AssertionItem[];
}

export const AttestationPortalView: React.FC<AttestationPortalViewProps> = ({ assertions }) => {
  const [selectedAssertion, setSelectedAssertion] = useState<AssertionItem>(assertions[0]);
  const [verificationResult, setVerificationResult] = useState<{ verified: boolean; message: string; hash: string } | null>(null);

  const handleSign = () => {
    const payload = createEIP712Payload(
      selectedAssertion.gCodeId,
      selectedAssertion.cNodeId,
      selectedAssertion.primaryInstrument.sha256Hash,
      selectedAssertion.amount,
      selectedAssertion.purpose
    );
    setVerificationResult({
      verified: payload.verdict === 'VALID',
      message: `Signed attestation generated for ${selectedAssertion.id}`,
      hash: payload.signature,
    });
  };

  return (
    <div className="exec-view-container">
      <div className="exec-page-header">
        <div className="section-label">EIP-712 ATTESTATION PORTAL</div>
        <h1>Attestation Signing Engine</h1>
        <p>Cryptographically sign structured municipal claims using Secp256k1 keys and EIP-712 payload schemas.</p>
      </div>

      <div className="glass-card">
        <div className="card-header">
          <FileCheck className="text-teal" size={24} />
          <h3>Generate Signed Attestation</h3>
        </div>

        <div className="cert-row margin-top">
          <span className="cert-label">Select Assertion Record:</span>
          <select
            value={selectedAssertion.id}
            onChange={(e) => setSelectedAssertion(assertions.find((a) => a.id === e.target.value) || assertions[0])}
            className="filter-select"
          >
            {assertions.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} — {a.vendorName} (${a.amount.toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSign} className="btn-exec-primary margin-top">
          Generate EIP-712 Signature
        </button>

        {verificationResult && (
          <div className="verification-certificate-card margin-top">
            <div className="cert-header">
              <ShieldCheck size={20} className="text-teal" />
              <span>{verificationResult.message}</span>
            </div>
            <div className="code-box-small mono text-xs margin-top">{verificationResult.hash}</div>
          </div>
        )}
      </div>
    </div>
  );
};
