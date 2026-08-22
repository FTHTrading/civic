import React from 'react';
import { ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

export const BoundariesView: React.FC = () => {
  return (
    <div className="exec-view-container">
      <div className="exec-page-header">
        <div className="section-label">OPERATING BOUNDARIES & COMPLIANCE</div>
        <h1>Platform Exclusions & Isolation</h1>
        <p>
          Open Trust maintains strict structural and operational boundaries to ensure platform independence, data security, and compliance.
        </p>
      </div>

      <div className="glass-card margin-bottom">
        <div className="card-header">
          <ShieldAlert className="text-muted" size={22} />
          <h3>Concise Compliance Exclusions</h3>
        </div>

        <div className="boundaries-grid margin-top">
          <div className="boundary-card-large">
            <Lock size={20} className="text-teal" />
            <div>
              <h4>No Municipal Debt Tokenization</h4>
              <p>The platform does not tokenize municipal debt instruments, municipal bonds, or securities of any kind.</p>
            </div>
          </div>

          <div className="boundary-card-large">
            <Lock size={20} className="text-teal" />
            <div>
              <h4>No Custody or Disbursement of Funds</h4>
              <p>Open Trust holds no citizen funds, disburses no cash, and operates no bank accounts or municipal escrow.</p>
            </div>
          </div>

          <div className="boundary-card-large">
            <Lock size={20} className="text-teal" />
            <div>
              <h4>No Citizen Subsidy Delivery</h4>
              <p>No citizen cash payouts or subsidy routing is processed through Tier 1 layer.</p>
            </div>
          </div>

          <div className="boundary-card-large">
            <Lock size={20} className="text-teal" />
            <div>
              <h4>No Success-Fee Arrangements</h4>
              <p>No fee is tied to a federal contract award, grant acquisition, or municipal budget line item.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="card-header">
          <CheckCircle2 className="text-teal" size={22} />
          <h3>HEARTH Runtime Privacy Isolation</h3>
        </div>

        <p className="text-muted text-sm">
          Under the UnyKorn HEARTH runtime constitution, zero personally identifiable information (PII) is written to public ledgers. Public ledgers contain only content-addressed SHA-256 state root hashes, EIP-712 attestation signatures, and status list commitments.
        </p>
      </div>
    </div>
  );
};
