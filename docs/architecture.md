# SurferX Hub — Phase 1 Architecture

## Overview

SurferX Hub Phase 1 is designed as a **read-only, non-custodial XRPL interface layer**.
The architecture prioritizes security, transparency, and modularity while maintaining
a clear upgrade path for future DeFi functionality.

Phase 1 intentionally avoids:
- Transaction execution
- Private key handling
- Custodial behavior
- Smart contract deployment

---

## High-Level Architecture

Frontend (Web Client)
→ Backend API Layer
→ XRPL Public Ledger

---

## Frontend Layer

### Responsibilities
- User interface for token, NFT, and project discovery
- Wallet connection (read-only)
- Display of XRPL-derived metadata
- Navigation of public project registry

### Characteristics
- Stateless UI
- No private key access
- No transaction signing
- Wallet connections used only for address context

---

## Backend Layer

### Responsibilities
- Query XRPL public ledger data
- Normalize token and NFT metadata
- Validate issuer and collection data
- Serve registry and analytics endpoints

### Characteristics
- Stateless services
- No session persistence
- No custody of assets or credentials
- No signing or transaction logic

---

## XRPL Integration

### Ledger Access
- Public XRPL RPC endpoints
- Read-only access
- XLS-20 NFT support
- Issued token metadata parsing

### Wallet Compatibility (Phase 1)
- XRPL-compatible wallets (e.g., Xaman)
- Address-based context only
- No approval or signing requests

---

## Data Flow

1. User connects wallet (address only)
2. Frontend requests data from backend
3. Backend queries XRPL ledger
4. Data normalized and returned to frontend
5. Frontend renders verified public data

---

## Upgrade Path (Post Phase 1)

Future phases may introduce:
- Transaction simulation
- Token creation tools
- DeFi integrations
- Escrow and locking primitives

These capabilities are intentionally excluded from Phase 1.
