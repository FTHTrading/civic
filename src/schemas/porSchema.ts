export interface TypedDataDomain {
  name?: string;
  version?: string;
  chainId?: number | bigint;
  verifyingContract?: `0x${string}`;
  salt?: `0x${string}`;
}

export const POR_DOMAIN: TypedDataDomain = {
  name: 'ProofOfReserveMintGate',
  version: '1.0.0',
  chainId: 8453, // Base Layer 2
  verifyingContract: '0x0000000000000000000000000000000000000000' as `0x${string}`,
};

export const POR_TYPES = {
  AssetAttestation: [
    { name: 'spvId', type: 'string' },
    { name: 'assetClass', type: 'string' },
    { name: 'unitCount', type: 'uint256' },
    { name: 'valuationUSD', type: 'uint256' },
    { name: 'recipient', type: 'address' },
    { name: 'tokenAmount', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
  ],
} as const;

export interface AssetAttestation {
  spvId: string;
  assetClass: string;
  unitCount: bigint;
  valuationUSD: bigint;
  recipient: `0x${string}`;
  tokenAmount: bigint;
  nonce: bigint;
  expiry: bigint;
}
