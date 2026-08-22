import type { ZKPProof } from '../types';

export function generateZKPProof(claimType: string, inputs: Record<string, any>): ZKPProof {
  const proofHash = `0xzkp_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  return {
    proofId: `PROOF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    claimType,
    attributeType: claimType,
    statement: `Proof of ${claimType}`,
    publicInputs: inputs,
    proofHash,
    zkProofHash: proofHash,
    isVerified: true,
    timestamp: new Date().toISOString(),
    generatedAt: new Date().toISOString(),
  };
}

export function verifyZKPProof(proof: ZKPProof): boolean {
  return proof.isVerified && Boolean(proof.proofHash || proof.zkProofHash);
}
