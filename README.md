# SurferX Hub — Phase 1 MVP (XRPL On-Chain Discovery & Interaction Layer)

SurferX Hub is a **non-custodial**, **read-only** discovery and interaction layer for XRPL assets:
- **Token discovery** (XRPL tokens / issuers / trustline context)
- **DEX Market Listing (read-only)** for **XRPL AMM pools** (price/liquidity/volume + deep links)
- **NFT utility layer (Phase-1 light)** (holder verification, collection stats, deep links to XRP.cafe)
- **Gaming Gateway (non-custodial)** (wallet connect, NFT-gated access, achievement proofs)
- **TrustLock™ MVP** (XRPL escrow-based lock registry + public proof-of-lock)

> 🚫 No custody  
> 🚫 No in-app trading  
> 🚫 No speculation features  
> ✅ Read-only data + deep links to trusted wallets/UIs (e.g., Xaman)

---

## Why this exists (Plain English)

XRPL users and builders are forced to hop between explorers, token lists, AMM tools, NFT sites, and wallets.
SurferX Hub unifies these discovery workflows into a single interface while keeping execution in user-controlled tools.

This is the anchor product for the SurferX ecosystem and a Phase-1 deliverable for XRPL Grants.

---

## Phase-1 Modules

### 1) SurferX Hub (Core Platform)
- Token discovery (search, filters, verified badges)
- Project profile pages (on-chain data + metadata)
- Wallet connect (for verification/gating only)

### 2) DEX Market Listing (Read-Only + Deep Links)
- Index XRPL AMM pools
- Show price, liquidity, volume (read-only)
- Deep-link out to wallet/DEX UIs for execution (no trading inside SurferX)

### 3) NFT Utility Layer (Phase-1 Light)
- NFT holder verification (connected wallet)
- NFT-gated access to selected features/games
- Collection stats + deep links to XRP.cafe

### 4) Gaming Gateway (Non-Custodial)
- Wallet connect
- NFT gating
- Achievement proofs (read-only tracking / references)
- 🚫 No gambling, no payouts

### 5) TrustLock™ (Phase-1 MVP)
- Escrow-based token/LP locking (XRPL escrow)
- Public proof-of-lock registry page
- Countdown timers + explorer links

---

## Architecture (MVP)

**Frontend**
- Web app (Next.js/React recommended)
- Wallet connect modal (Xaman / WalletConnect if applicable)
- Read-only views + deep-link actions

**Backend**
- API service for indexed views (tokens, pools, NFTs, projects)
- Job workers for indexing + caching
- Database for cached snapshots + verification status + metadata

**On-chain Data Sources**
- XRPL public nodes (read-only queries)
- AMM pool data from XRPL ledger methods
- NFT collection references (XRPL + links to XRP.cafe)
- TrustLock escrow proofs via XRPL transactions

> NOTE: SurferX Hub does not custody funds or execute trades.  
> All execution happens externally via user wallets / trusted UIs.

---

## Repositories (Suggested)
This repo can be monorepo or split:
- `apps/web` — frontend
- `apps/api` — backend API
- `packages/indexer` — indexer jobs
- `packages/shared` — shared types/utils
- `infra/` — deployment manifests (Docker, Terraform, etc.)

---

## Getting Started (Local)

### Prereqs
- Node.js (LTS)
- pnpm or npm
- A database (Postgres recommended) or SQLite for MVP
- Access to an XRPL public endpoint (or your own node)

### Install
```bash
git clone <YOUR_REPO_URL>
cd surferx-hub
pnpm install