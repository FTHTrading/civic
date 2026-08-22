# ADR 0005: Multi-Asset Municipal Settlement & Payment Rails

- **Status:** Accepted
- **Deciders:** UnyKorn Treasury Team, Miami-Dade Finance & Procurement
- **Date:** 2026-08-22
- **Technical Story:** Architecture for multi-asset payment rails, fee reconciliation, and closed-loop municipal tokens.

## Context and Problem Statement

Municipal transactions require payment for permits, utility bills, business licenses, and transit passes. The platform must support traditional fiat banking rails alongside USDC stablecoin settlement and closed-loop municipal tokens (e.g. transit passes and civic engagement rewards) while adhering to strict financial controls and perimeter defense rules.

## Decision Drivers

* Strict compliance with Perimeter Law: NO municipal debt tokenization, NO funds custody or cash disbursal.
* Multi-asset support (Fiat ACH/Cards, USDC stablecoin, Closed-Loop Municipal Utility Tokens).
* Immediate receipt generation with SHA-256 hash anchors.

## Decision Outcome

Chosen Option: **Non-Speculative Purpose-Bound Settlement Engine**.

### Supported Rails
1. **Fiat Banking Rails:** Integrated ACH / Card payment gateways generating instant cryptographic receipts.
2. **USDC Settlement:** Direct on-chain USDC settlement for G-code fees with zero custodial risk for the platform.
3. **Closed-Loop Utility Tokens:** Non-transferable tokens bound to specific civic functions (e.g., Metro Transit passes, recycling reward credits).
