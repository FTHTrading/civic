# Technical Architecture Specification — MIA by VIA

## Platform Overview
MIA by VIA is civic infrastructure for trusted digital public services, built and operated by **UnyKorn LLC**.
The platform provides a modular software layer connecting identity, consent-based verification, municipal service workflows, and accountable records.

---

## System Layers
1. **Experience Layer**: Responsive React + TypeScript frontend, mobile digital wallet interface, multilingual support (EN/ES/HT), WCAG 2.2 AA accessibility.
2. **Trust Layer**: W3C Decentralized Identifier (`did:via`) resolver, W3C Verifiable Credentials, Zero-Knowledge Proofs (zk-SNARKs), and Secp256k1 EIP-712 attestation signing.
3. **Integration Layer**: Service adapters for municipal building permit systems, licensing databases, ERPs, case management, and payment gateways.
4. **Governance Layer**: ANVIL control framework, HEARTH runtime data isolation, role-based permissions, and audit log anchor verification.

---

## Security & Privacy Commitments
- **HEARTH Rule #1**: Zero personally identifiable information (PII) written to public ledgers.
- **Minimum Disclosure**: Resident name, physical address, and parcel numbers withheld by default during verification requests.
- **Controlled Integration Adapters**: Production APIs stubbed behind repository interfaces until formal municipal authorization, security review, and data-processing contracts are completed.
