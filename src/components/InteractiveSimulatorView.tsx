import React, { useState } from 'react';
import type { AssertionItem, GCodeService, CNodeProfile } from '../types';
import { createEIP712Payload } from '../lib/eip712';
import { Cpu } from 'lucide-react';

interface InteractiveSimulatorViewProps {
  assertions: AssertionItem[];
  gCodes: GCodeService[];
  cNodeProfile: CNodeProfile;
}

export const InteractiveSimulatorView: React.FC<InteractiveSimulatorViewProps> = ({
  assertions: _assertions,
  gCodes,
  cNodeProfile
}) => {
  const [selectedGCode] = useState<GCodeService>(gCodes[0]);
  const [vendorName, setVendorName] = useState('SolarTech Miami LLC');
  const [amount, setAmount] = useState<number>(145000);
  const [purpose, setPurpose] = useState('Commercial Solar Roof Permit');
  const [createdAssertion, setCreatedAssertion] = useState<AssertionItem | null>(null);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `OTM-2026-MIA-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = createEIP712Payload(
      selectedGCode.id,
      cNodeProfile.did,
      '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      amount,
      purpose
    );

    const newAssertion: AssertionItem = {
      id: newId,
      department: selectedGCode.department,
      vendorName,
      amount,
      purpose,
      date: new Date().toISOString().split('T')[0],
      primaryInstrument: {
        id: `INST-${Math.floor(100 + Math.random() * 900)}`,
        title: `${selectedGCode.department} Authorization`,
        kind: 'COUNTY_RESOLUTION',
        issuingAuthority: selectedGCode.jurisdiction || 'Miami-Dade County',
        sourceUrl: 'https://www.miamidade.gov',
        fetchDate: new Date().toISOString().split('T')[0],
        pageLocator: 1,
        rowLocator: 1,
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        isStale: false
      },
      gCodeId: selectedGCode.id,
      cNodeId: cNodeProfile.did,
      attestationSignature: payload.signature,
      attestationSigner: payload.signerPublicKey,
      linterStatus: 'PASSED',
      state: 'VERIFIED'
    };

    setCreatedAssertion(newAssertion);
  };

  return (
    <div className="exec-view-container">
      <div className="exec-page-header">
        <div className="section-label">INTERACTIVE ATTESTATION SIMULATOR</div>
        <h1>Simulate Municipal Service Transaction</h1>
        <p>Simulate an end-to-end transaction between a resident C-node wallet and a G-code service endpoint.</p>
      </div>

      <form onSubmit={handleSimulate} className="glass-card">
        <div className="card-header">
          <Cpu className="text-teal" size={24} />
          <h3>Transaction Details</h3>
        </div>

        <div className="cert-row margin-top">
          <label className="cert-label">Vendor Name:</label>
          <input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="verify-search-input"
          />
        </div>

        <div className="cert-row margin-top">
          <label className="cert-label">Amount (USD):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="verify-search-input"
          />
        </div>

        <div className="cert-row margin-top">
          <label className="cert-label">Purpose:</label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="verify-search-input"
          />
        </div>

        <button type="submit" className="btn-exec-primary margin-top">
          Simulate Transaction & Sign Payload
        </button>
      </form>

      {createdAssertion && (
        <div className="verification-certificate-card margin-top">
          <h3>Generated Assertion: {createdAssertion.id}</h3>
          <p className="text-teal font-bold">State: {createdAssertion.state} — Attestation Signature Verified</p>
        </div>
      )}
    </div>
  );
};
