# Infrastructure Sandbox Data Boundaries — UnyKorn LLC

## Data Isolation Policy
1. **Fictional Data Only**: All records in the sandbox are synthetic test cases created specifically for partner review.
2. **Zero PII**: No real names, physical addresses, parcel numbers, social security numbers, or tax IDs exist in the sandbox.
3. **Mock Integration Adapters**: External government APIs are stubbed behind `AuthorizedIssuerService` adapters that return a controlled "integration unavailable" state if called outside authorized deployment parameters.
4. **Persistent Warning Banner**: Displayed across all sandbox views:
   > *"MIA by VIA Infrastructure Sandbox · Built and operated by UnyKorn LLC · Authorized partner review environment · Fictional data. Simulated services. No live public records."*
