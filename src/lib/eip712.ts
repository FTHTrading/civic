import type { EIP712Attestation, AssertionItem } from '../types';

export function createEIP712Payload(
  assertionOrGcode: any,
  cNodeId?: string,
  instrumentHash?: string,
  amountUsd?: number,
  _purpose?: string
): EIP712Attestation {
  if (typeof assertionOrGcode === 'object' && assertionOrGcode.primaryInstrument) {
    const assertion = assertionOrGcode as AssertionItem;
    return {
      id: `ATT-${assertion.id}`,
      gCodeId: assertion.gCodeId,
      cNodeId: assertion.cNodeId || 'did:via:citizen:demo',
      instrumentHash: assertion.primaryInstrument.sha256Hash,
      amountUsd: assertion.amount,
      timestamp: Math.floor(Date.now() / 1000),
      signature: `0x7f8a...${assertion.primaryInstrument.sha256Hash.substring(0, 12)}...9e2c`,
      signerPublicKey: '0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A',
      verdict: assertion.primaryInstrument.isStale ? 'EXPIRED_INSTRUMENT' : 'VALID',
      verified: !assertion.primaryInstrument.isStale,
    };
  }

  const gCodeId = typeof assertionOrGcode === 'object' ? assertionOrGcode.id || 'gcode-default' : String(assertionOrGcode);
  const hashStr = instrumentHash || '0x0000000000000000';

  return {
    id: `ATT-${Math.random().toString(36).substring(2, 9)}`,
    gCodeId,
    cNodeId: cNodeId || 'did:via:citizen:demo',
    instrumentHash: hashStr,
    amountUsd: amountUsd || 0,
    timestamp: Math.floor(Date.now() / 1000),
    signature: `0x7f8a...${hashStr.substring(0, 12)}...9e2c`,
    signerPublicKey: '0x8aced25DC8530FDaf0f86D53a0A1E02AAfA7Ac7A',
    verdict: 'VALID',
    verified: true,
  };
}

export const generateEIP712Payload = createEIP712Payload;

export function verifyEIP712Attestation(attestation: EIP712Attestation): boolean {
  if (!attestation.signature || attestation.signature.length < 10) {
    return false;
  }
  return attestation.verdict === 'VALID' || attestation.verified === true;
}
