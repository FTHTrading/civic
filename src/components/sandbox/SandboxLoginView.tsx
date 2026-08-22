import React, { useState } from 'react';
import { authService } from '../../lib/authService';
import type { AuthSession } from '../../lib/authService';
import type { ExecutiveTabType } from '../Navigation';
import { LockKeyhole, ArrowRight, ShieldAlert } from 'lucide-react';

interface SandboxLoginViewProps {
  onLoginSuccess: (session: AuthSession) => void;
  setActiveTab: (tab: ExecutiveTabType) => void;
}

export const SandboxLoginView: React.FC<SandboxLoginViewProps> = ({ onLoginSuccess, setActiveTab }) => {
  const [email, setEmail] = useState('reviewer@partner.org');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const session = await authService.login(password, email);
    setIsSubmitting(false);

    if (session.isAuthenticated) {
      onLoginSuccess(session);
    } else {
      setErrorMessage(session.error || 'Authentication failed.');
    }
  };

  return (
    <div className="sandbox-login-container full-bleed-sandbox-login">
      {/* Background Video Canvas (Sandbox Film) */}
      <div className="sandbox-video-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="sandbox-video-element"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="sandbox-login-overlay"></div>
      </div>

      <div className="login-card-frame glass-panel-dark relative z-10">
        <div className="login-header text-center">
          <div className="login-logo-mark margin-bottom inline-block bg-dark-ocean p-3 rounded-xl border border-white/10">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L16 26L26 6" stroke="#F43F7D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 26L22 14C22 14 26 12 28 8" stroke="#43D8E8" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="6" r="2" fill="#FF6A3D" />
            </svg>
          </div>
          <h2 className="text-pearl">MIA by VIA Infrastructure Sandbox</h2>
          <div className="text-xs text-aqua margin-top font-bold">Built and operated by UnyKorn LLC</div>
          <p className="text-sm text-coral-stone margin-top">
            Authorized municipal, security, and integration partner review environment.
          </p>
        </div>

        <div className="sandbox-persistent-banner margin-top glass-banner">
          <ShieldAlert size={14} className="text-flamingo" strokeWidth={1.5} />
          <span>Demonstration environment. Password access is configured for controlled partner review. No live County systems connected.</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form margin-top">
          {errorMessage && (
            <div className="error-banner">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label className="form-label text-coral-stone">Partner Reviewer Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input glass-input"
              required
            />
          </div>

          <div className="form-group margin-top">
            <label className="form-label text-coral-stone">Review Access Password / Key:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter partner access password..."
              className="login-input glass-input"
              required
            />
            <span className="text-xs text-subtle margin-top block text-coral-stone opacity-80">
              Hint: Enter any review key (e.g., <code>unykorn-review</code>) for instant demonstration access.
            </span>
          </div>

          <div className="action-row margin-top">
            <button type="submit" disabled={isSubmitting} className="btn-exec-primary btn-sunset width-full">
              <LockKeyhole size={16} strokeWidth={1.5} /> {isSubmitting ? 'Authenticating...' : 'Authenticate & Enter Sandbox'} <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </form>

        <div className="login-footer margin-top text-center">
          <button onClick={() => setActiveTab('HOME')} className="btn-link-action text-xs text-aqua">
            Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
