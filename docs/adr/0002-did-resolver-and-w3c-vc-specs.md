# ADR 0002: W3C DID Resolver & Verifiable Credential Schema Specification

- **Status:** Accepted
- **Deciders:** Office of the Chairman (VIA.miami), MIA Technical Architecture Committee
- **Date:** 2026-08-22
- **Technical Story:** Select Decentralized Identifier (DID) method and Verifiable Credential (VC) format for Citizen Nodes (C-nodes) and Government Codes (G-codes).

## Context and Problem Statement

MIA by VIA requires verifiable, tamper-evident digital identity credentials for residents and municipal services in Miami-Dade County. We must select DID methods and VC schemas that avoid vendor lock-in, support zero-knowledge proofs (ZKPs), and comply with W3C standards.

## Decision Drivers

* Need for sovereign, key-controlled DIDs without single points of failure.
* Support for RevocationList2020 / StatusList2021 status registries.
* Compatibility with mobile secure enclaves (FIDO2 / WebAuthn).

## Decision Outcome

Chosen Option: **W3C `did:via` Method with JSON-LD / JWT Verifiable Credentials**.

### Identifier Specifications
- **Citizen Nodes (C-nodes):** `did:via:cnode:<hash>`
- **Government Codes (G-codes):** `did:via:gcode:<department>-<service-id>`

### Key Controls
- Resident C-nodes control private keys stored in hardware enclaves (iOS Secure Enclave / Android StrongBox).
- G-codes store municipal issuer keys in FIPS 140-2 Level 3 Hardware Security Modules (HSMs).
