# SurferX Hub — Security Model (Phase 1)

## Security Philosophy

Security is a core design constraint of SurferX Hub.
Phase 1 is architected to **minimize attack surface** by eliminating
all high-risk behaviors.

---

## Non-Custodial Design

Phase 1 guarantees:
- No private key storage
- No seed phrase handling
- No transaction signing
- No user fund custody

All wallet interactions are read-only.

---

## Backend Security

### Characteristics
- Stateless services
- No user authentication storage
- No secrets exposed to frontend
- Environment variables isolated

### Attack Surface Reduction
- No write access to XRPL
- No off-ledger accounting
- No balance manipulation
- No privileged roles

---

## Frontend Security

- Wallet address used only for context
- No signing prompts
- No embedded secrets
- No iframe wallet injection

---

## XRPL Safety Considerations

- Public ledger verification only
- Issuer validation performed server-side
- Malformed metadata safely rejected
- NFT standards compliant with XLS-20

---

## Incident Response (Future)

Phase 2+ will introduce:
- Monitoring and logging
- Rate limiting
- Formal security audits

These are intentionally deferred until write-capable features exist.
