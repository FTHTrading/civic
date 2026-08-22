import type {
  PermitCredential,
  VerificationRequest,
  ConsentDecision,
  VerificationResult
} from '../types';
import { MOCK_PERMITS } from '../data/mockPermits';

export interface CredentialServiceInterface {
  getPermitById(id: string): Promise<PermitCredential | null>;
  requestVerification(permitId: string, verifierName: string): Promise<VerificationRequest>;
  submitConsent(decision: ConsentDecision): Promise<VerificationResult>;
}

export class MockCredentialService implements CredentialServiceInterface {
  async getPermitById(id: string): Promise<PermitCredential | null> {
    const permit = MOCK_PERMITS.find((p) => p.id === id || p.permitNumber === id);
    return permit || MOCK_PERMITS[0];
  }

  async requestVerification(permitId: string, verifierName: string): Promise<VerificationRequest> {
    return {
      requestId: `REQ-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      verifierName,
      permitId,
      requestedAt: new Date().toISOString(),
      requestedFields: ['permitStatus', 'permitType', 'validThrough', 'streetAddress', 'holderName'],
      demo: true
    };
  }

  async submitConsent(decision: ConsentDecision): Promise<VerificationResult> {
    const permit = await this.getPermitById('DEMO-PERMIT-2026-01');

    if (decision.status === 'DECLINED') {
      return {
        verificationId: `VERIF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        requestId: decision.requestId,
        status: 'DECLINED',
        permitType: permit?.permitType || 'Unknown',
        validThrough: 'N/A',
        permitStatus: 'DECLINED_BY_USER',
        verifiedAt: new Date().toISOString(),
        disclosedFields: {},
        withheldFieldsCount: 5,
        privacySummary: 'Verification declined by resident. No information was shared.',
        demo: true
      };
    }

    const disclosed: Record<string, string> = {};
    let withheldCount = 0;

    if (decision.approvedFields.includes('permitStatus')) {
      disclosed['Permit Status'] = permit?.status || 'ACTIVE';
    } else { withheldCount++; }

    if (decision.approvedFields.includes('permitType')) {
      disclosed['Permit Type'] = permit?.permitType || 'Commercial Solar Installation';
    } else { withheldCount++; }

    if (decision.approvedFields.includes('validThrough')) {
      disclosed['Valid Through'] = permit?.validThrough || 'December 31, 2026';
    } else { withheldCount++; }

    if (decision.approvedFields.includes('streetAddress') && permit?.streetAddress) {
      disclosed['Street Address'] = permit.streetAddress;
    } else { withheldCount++; }

    if (decision.approvedFields.includes('holderName') && permit?.holderName) {
      disclosed['Holder Name'] = permit.holderName;
    } else { withheldCount++; }

    return {
      verificationId: `VERIF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      requestId: decision.requestId,
      status: 'VERIFIED',
      permitType: permit?.permitType || 'Commercial Solar Installation',
      validThrough: permit?.validThrough || 'December 31, 2026',
      permitStatus: permit?.status || 'ACTIVE',
      verifiedAt: new Date().toISOString(),
      disclosedFields: disclosed,
      withheldFieldsCount: withheldCount,
      privacySummary: `${withheldCount} private field(s) withheld from verifier. Zero unneeded personal information disclosed.`,
      demo: true
    };
  }
}

export class AuthorizedIssuerService implements CredentialServiceInterface {
  async getPermitById(): Promise<PermitCredential | null> {
    throw new Error(
      'Live County Integration Unavailable: MIA by VIA requires formal municipal authorization, data-processing agreement, and production issuer API credentials.'
    );
  }

  async requestVerification(): Promise<VerificationRequest> {
    throw new Error(
      'Live County Integration Unavailable: MIA by VIA requires formal municipal authorization, data-processing agreement, and production issuer API credentials.'
    );
  }

  async submitConsent(): Promise<VerificationResult> {
    throw new Error(
      'Live County Integration Unavailable: MIA by VIA requires formal municipal authorization, data-processing agreement, and production issuer API credentials.'
    );
  }
}

export const activeCredentialService: CredentialServiceInterface = new MockCredentialService();
