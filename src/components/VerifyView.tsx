import React, { useState } from 'react';
import { Search, CheckCircle2, ShieldCheck, Lock, AlertTriangle, ArrowRight, RotateCcw, EyeOff, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

type StepType = 'A_SEARCH' | 'B_SUMMARY' | 'C_CONSENT' | 'D_RESULT';

export const VerifyView: React.FC = () => {
  const [step, setStep] = useState<StepType>('A_SEARCH');
  const [selectedDemoId, setSelectedDemoId] = useState('MIA-SOLAR-2026-8841');

  // Consent Toggles
  const [includeStatus] = useState(true);
  const [includeType] = useState(true);
  const [includeValidThrough, setIncludeValidThrough] = useState(true);
  const [includeAddress, setIncludeAddress] = useState(false);
  const [includeIdentity, setIncludeIdentity] = useState(false);

  const [isDeclined, setIsDeclined] = useState(false);

  const handleStartRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('B_SUMMARY');
  };

  const handleSendRequest = () => {
    setStep('C_CONSENT');
  };

  const handleApproveConsent = () => {
    setIsDeclined(false);
    setStep('D_RESULT');
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
  };

  const handleDeclineConsent = () => {
    setIsDeclined(true);
    setStep('D_RESULT');
  };

  const handleReset = () => {
    setStep('A_SEARCH');
    setIsDeclined(false);
    setIncludeAddress(false);
    setIncludeIdentity(false);
  };

  return (
    <div className="exec-view-container">
      {/* Page Header */}
      <div className="exec-page-header">
        <div className="section-label">INTERACTIVE PERMIT VERIFICATION DEMO</div>
        <h1>Verify a Record</h1>
        <p>
          Confirm a credential or permit status without requesting unnecessary personal information. Demonstration data — not an official Miami-Dade County record.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="demo-stepper-bar">
        <div className={`step-pill ${step === 'A_SEARCH' ? 'active' : 'completed'}`}>1. Select Record</div>
        <div className={`step-pill ${step === 'B_SUMMARY' ? 'active' : step === 'C_CONSENT' || step === 'D_RESULT' ? 'completed' : ''}`}>2. Request Summary</div>
        <div className={`step-pill ${step === 'C_CONSENT' ? 'active' : step === 'D_RESULT' ? 'completed' : ''}`}>3. Resident Consent</div>
        <div className={`step-pill ${step === 'D_RESULT' ? 'active' : ''}`}>4. Verified Result</div>
      </div>

      {/* SCREEN A: Verify a record */}
      {step === 'A_SEARCH' && (
        <div className="demo-card-frame">
          <div className="demo-notice-banner">
            <ShieldAlert size={16} />
            <span>Demonstration data — not an official Miami-Dade County record.</span>
          </div>

          <form onSubmit={handleStartRequest} className="verify-search-bar margin-top">
            <Search size={20} className="verify-search-icon" />
            <input
              type="text"
              value={selectedDemoId}
              onChange={(e) => setSelectedDemoId(e.target.value)}
              className="verify-search-input"
              placeholder="Enter permit ID..."
            />
            <button type="submit" className="btn-exec-primary">
              Request Verification
            </button>
          </form>

          <div className="preset-records-row margin-top">
            <span className="preset-label">Demonstration Records:</span>
            <button
              onClick={() => setSelectedDemoId('MIA-SOLAR-2026-8841')}
              className={`preset-chip ${selectedDemoId === 'MIA-SOLAR-2026-8841' ? 'active' : ''}`}
            >
              MIA-SOLAR-2026-8841 (Solar Roof Permit)
            </button>
            <button
              onClick={() => setSelectedDemoId('MIA-ELEC-2026-4492')}
              className={`preset-chip ${selectedDemoId === 'MIA-ELEC-2026-4492' ? 'active' : ''}`}
            >
              MIA-ELEC-2026-4492 (Electrical License)
            </button>
            <button
              onClick={() => setSelectedDemoId('MIA-BIZ-2026-9904')}
              className={`preset-chip ${selectedDemoId === 'MIA-BIZ-2026-9904' ? 'active' : ''}`}
            >
              MIA-BIZ-2026-9904 (Business Registration)
            </button>
          </div>
        </div>
      )}

      {/* SCREEN B: Request Summary */}
      {step === 'B_SUMMARY' && (
        <div className="demo-card-frame">
          <div className="card-header">
            <Search size={20} className="text-biscayne" />
            <h3>Step 2: Verification Request Summary</h3>
          </div>

          <div className="request-summary-box margin-top">
            <div className="summary-row">
              <span>Requested Permit ID:</span>
              <strong className="mono text-biscayne">{selectedDemoId}</strong>
            </div>

            <div className="summary-section margin-top">
              <h4 className="text-palm font-bold">Information Requested:</h4>
              <ul className="info-list">
                <li><CheckCircle2 size={14} className="text-palm" /> Permit Validity Status (Active / Expired)</li>
                <li><CheckCircle2 size={14} className="text-palm" /> Permit Type & Scope</li>
                <li><CheckCircle2 size={14} className="text-palm" /> Valid-Through Expiration Date</li>
              </ul>
            </div>

            <div className="summary-section margin-top">
              <h4 className="text-muted font-bold">Withheld By Default (Privacy Protected):</h4>
              <ul className="info-list text-muted">
                <li><EyeOff size={14} /> Resident Full Legal Name</li>
                <li><EyeOff size={14} /> Physical Street Address</li>
                <li><EyeOff size={14} /> Parcel & Tax Identifiers</li>
                <li><EyeOff size={14} /> Financial & Payment Records</li>
              </ul>
            </div>
          </div>

          <div className="action-button-row margin-top">
            <button onClick={handleSendRequest} className="btn-exec-primary">
              Send Request to Resident Wallet <ArrowRight size={16} />
            </button>
            <button onClick={handleReset} className="btn-exec-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SCREEN C: Resident Consent Simulation */}
      {step === 'C_CONSENT' && (
        <div className="demo-card-frame">
          <div className="card-header">
            <Lock size={20} className="text-coral" />
            <h3>Step 3: Review Verification Request</h3>
          </div>

          <div className="consent-banner-box">
            <ShieldCheck size={18} className="text-biscayne" />
            <span>This is a simulated consent flow. You control what information to share.</span>
          </div>

          <div className="toggles-container margin-top">
            <h4>Select Fields to Disclose:</h4>

            <div className="toggle-item">
              <div className="toggle-info">
                <strong>Permit Status</strong>
                <span className="text-xs text-muted">Required by verifier</span>
              </div>
              <input type="checkbox" checked={includeStatus} disabled className="toggle-checkbox" />
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <strong>Permit Type & Scope</strong>
                <span className="text-xs text-muted">Required by verifier</span>
              </div>
              <input type="checkbox" checked={includeType} disabled className="toggle-checkbox" />
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <strong>Valid-Through Date</strong>
                <span className="text-xs text-muted">Optional</span>
              </div>
              <input
                type="checkbox"
                checked={includeValidThrough}
                onChange={(e) => setIncludeValidThrough(e.target.checked)}
                className="toggle-checkbox"
              />
            </div>

            <div className="toggle-item disabled-toggle">
              <div className="toggle-info">
                <strong>Street Address</strong>
                <span className="text-xs text-coral">Disabled by default (Privacy Protected)</span>
              </div>
              <input
                type="checkbox"
                checked={includeAddress}
                onChange={(e) => setIncludeAddress(e.target.checked)}
                className="toggle-checkbox"
              />
            </div>

            <div className="toggle-item disabled-toggle">
              <div className="toggle-info">
                <strong>Resident Legal Identity</strong>
                <span className="text-xs text-coral">Disabled by default (Privacy Protected)</span>
              </div>
              <input
                type="checkbox"
                checked={includeIdentity}
                onChange={(e) => setIncludeIdentity(e.target.checked)}
                className="toggle-checkbox"
              />
            </div>
          </div>

          <div className="action-button-row margin-top">
            <button onClick={handleApproveConsent} className="btn-exec-primary bg-palm">
              Approve Selected Information
            </button>
            <button onClick={handleDeclineConsent} className="btn-exec-secondary">
              Decline Request
            </button>
          </div>
        </div>
      )}

      {/* SCREEN D: Verified Result */}
      {step === 'D_RESULT' && (
        <div className="demo-card-frame">
          {isDeclined ? (
            <div className="result-card-box border-declined">
              <div className="result-header text-coral">
                <AlertTriangle size={28} />
                <h2>Verification Request Declined</h2>
              </div>
              <p className="margin-top text-muted">
                The resident declined to share credential details. No information was disclosed to the requesting verifier.
              </p>
            </div>
          ) : (
            <div className="result-card-box border-verified">
              <div className="result-header text-palm">
                <CheckCircle2 size={32} />
                <h2>PERMIT STATUS: VERIFIED & ACTIVE</h2>
              </div>

              <div className="result-details-grid margin-top">
                <div className="result-row">
                  <span className="detail-label">Permit ID:</span>
                  <span className="mono bold">{selectedDemoId}</span>
                </div>
                <div className="result-row">
                  <span className="detail-label">Permit Type:</span>
                  <span>Commercial Solar Installation</span>
                </div>
                {includeValidThrough && (
                  <div className="result-row">
                    <span className="detail-label">Valid Through:</span>
                    <span className="bold text-palm">December 31, 2026</span>
                  </div>
                )}
                {includeAddress && (
                  <div className="result-row">
                    <span className="detail-label">Street Address:</span>
                    <span>100 Biscayne Blvd, Suite 400</span>
                  </div>
                )}
                {includeIdentity && (
                  <div className="result-row">
                    <span className="detail-label">Resident Name:</span>
                    <span>Fictional Contractor LLC</span>
                  </div>
                )}
                <div className="result-row">
                  <span className="detail-label">Verification Timestamp:</span>
                  <span className="mono text-xs">{new Date().toLocaleString()}</span>
                </div>
              </div>

              <div className="privacy-guarantee-banner margin-top">
                <Lock size={16} className="text-palm" />
                <span>No unneeded personal information was shared during this verification sequence.</span>
              </div>
            </div>
          )}

          <div className="action-button-row margin-top">
            <button onClick={handleReset} className="btn-exec-primary">
              <RotateCcw size={16} /> Start Another Verification
            </button>
            <button onClick={() => {}} className="btn-exec-secondary">
              Learn How Privacy Works
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
