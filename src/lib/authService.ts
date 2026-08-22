export type UserRole = 'admin' | 'partner_reviewer' | 'auditor' | 'read_only';

export interface SandboxUser {
  id: string;
  email: string;
  name: string;
  organization: string;
  role: UserRole;
  loginTime: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: SandboxUser | null;
  token: string | null;
  error: string | null;
}

class AuthService {
  private sessionKey = 'mia_via_sandbox_session';

  public getSession(): AuthSession {
    const stored = localStorage.getItem(this.sessionKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          isAuthenticated: true,
          user: parsed.user,
          token: parsed.token,
          error: null,
        };
      } catch (e) {
        // Fallback
      }
    }
    return {
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
    };
  }

  public async login(password: string, email: string = 'reviewer@partner.org'): Promise<AuthSession> {
    // Controlled server-backed sandbox authentication simulation
    // In production, this issues an HttpOnly SameSite cookie via server endpoint
    if (!password || password.trim().length < 4) {
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        error: 'Invalid authentication key or password. Please check your credentials.',
      };
    }

    const mockUser: SandboxUser = {
      id: 'USR-SANDBOX-001',
      email,
      name: 'Authorized Partner Reviewer',
      organization: 'Municipal Review Partner',
      role: 'partner_reviewer', // Default read-only reviewer
      loginTime: new Date().toISOString(),
    };

    const token = `sbx_token_${Math.random().toString(36).substring(2, 15)}`;
    const session = { user: mockUser, token };
    localStorage.setItem(this.sessionKey, JSON.stringify(session));

    return {
      isAuthenticated: true,
      user: mockUser,
      token,
      error: null,
    };
  }

  public logout(): void {
    localStorage.removeItem(this.sessionKey);
  }
}

export const authService = new AuthService();
