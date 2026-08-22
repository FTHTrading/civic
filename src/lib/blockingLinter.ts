import type { AssertionItem } from '../types';

export interface LinterResult {
  passed: boolean;
  blockReason?: string;
  evaluatedState: 'PUBLISHED' | 'VERIFIED' | 'DEMOTED' | 'REJECTED';
  warnings: string[];
}

export function evaluateAssertionLinter(assertion: AssertionItem): LinterResult {
  const warnings: string[] = [];
  const instrument = assertion.primaryInstrument;

  // 1. Enforce Design Law 2 (Summary Law)
  if (instrument.kind === 'SUMMARY' || instrument.kind === 'INDEX' || instrument.kind === 'GENERATED') {
    return {
      passed: false,
      evaluatedState: 'REJECTED',
      blockReason: `DESIGN LAW 2 VIOLATION: Instrument kind is '${instrument.kind}'. Summary, index, or generated briefing documents CANNOT serve as primary supporting instruments.`,
      warnings
    };
  }

  // 2. Enforce Freshness Law (fetch date > 9 months = STALE)
  const fetchDate = new Date(instrument.fetchDate);
  const now = new Date('2026-08-22');
  const diffMonths = (now.getFullYear() - fetchDate.getFullYear()) * 12 + (now.getMonth() - fetchDate.getMonth());

  if (diffMonths > 9 || instrument.isStale) {
    warnings.push('Instrument fetch date exceeds 9 months. Freshness threshold lapsed.');
    return {
      passed: false,
      evaluatedState: 'DEMOTED',
      blockReason: `FRESHNESS LAW VIOLATION: Source fetch date (${instrument.fetchDate}) is older than 9 months. Assertion is DEMOTED automatically without requiring approval.`,
      warnings
    };
  }

  // 3. Enforce Design Law 3 (Verifiability without trust)
  if (!instrument.sha256Hash || instrument.sha256Hash.length < 32) {
    return {
      passed: false,
      evaluatedState: 'REJECTED',
      blockReason: 'DESIGN LAW 3 VIOLATION: Missing SHA-256 content-addressed hash of primary instrument.',
      warnings
    };
  }

  // 4. Validate locators
  if (!instrument.pageLocator || !instrument.rowLocator) {
    warnings.push('Missing precise page and row locators for primary instrument document.');
  }

  return {
    passed: true,
    evaluatedState: assertion.attestationSignature ? 'PUBLISHED' : 'VERIFIED',
    warnings
  };
}
