# Infrastructure Sandbox Security Architecture — UnyKorn LLC

## Purpose & Scope
The **MIA by VIA Infrastructure Sandbox** is an isolated partner review environment designed to demonstrate platform configuration, credential lifecycle modeling, consent rules, and operational workflows.

---

## Authentication & Authorization Model
1. **Server-Backed Authentication**: Session validation via server authorization middleware.
2. **HttpOnly Cookie Tokens**: Short-lived, secure session cookies. No credentials exposed in URLs or `localStorage`.
3. **Role-Based Access Control (RBAC)**:
   - `admin`: Demonstration environment configuration.
   - `partner_reviewer`: Default read-only review access for municipal partners.
   - `auditor`: Technical security & control inspection role.
   - `read_only`: Restricted demonstration viewing.
4. **Rate Limiting**: Password attempt rate-limiting & audit logging.

---

## Data Boundaries
- **Zero Live County Systems**: Completely isolated from municipal databases or production API endpoints.
- **Conspicuously Fictional Data**: All demonstration records carry `demo: true` flags and fictional identifiers.
- **Zero Secrets Committed**: Environment variables managed via secret storage.
