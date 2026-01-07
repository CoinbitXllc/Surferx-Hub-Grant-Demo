const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const { getXrplClient } = require("./xrpl/client");
const { getAccountInfo, getAccountLines } = require("./xrpl/token");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// -------- Health --------
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "surferx-hub-mvp-backend",
    network: process.env.XRPL_NETWORK || "unknown",
    xrplRpc: process.env.XRPL_RPC_URL || "unset"
  });
});

// -------- Registry (local JSON example) --------
app.get("/registry", (req, res) => {
  const registryPath =
    process.env.REGISTRY_JSON_PATH ||
    path.join(__dirname, "registry", "registry.json");

  try {
    const raw = fs.readFileSync(registryPath, "utf-8");
    const data = JSON.parse(raw);
    res.json({ ok: true, source: "local", data });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: "Failed to read registry",
      details: err.message
    });
  }
});

// -------- XRPL Read-Only Endpoints --------

// 1) Basic account info (balance, flags, etc.)
app.get("/xrpl/account/:address", async (req, res) => {
  const address = req.params.address;

  try {
    const client = await getXrplClient();
    const info = await getAccountInfo(client, address);
    res.json({ ok: true, address, info });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: "XRPL account lookup failed",
      details: err.message
    });
  }
});

// 2) Trustlines (issued tokens the account holds)
app.get("/xrpl/account/:address/lines", async (req, res) => {
  const address = req.params.address;

  try {
    const client = await getXrplClient();
    const lines = await getAccountLines(client, address);
    res.json({ ok: true, address, lines });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: "XRPL trustline lookup failed",
      details: err.message
    });
  }
});

// 3) Token quick view by issuer+currency (read-only)
app.get("/xrpl/token", async (req, res) => {
  const { issuer, currency } = req.query;

  if (!issuer || !currency) {
    return res.status(400).json({
      ok: false,
      error: "Missing query params: issuer, currency"
    });
  }

  try {
    // For Phase 1: we provide a simple "issuer trustlines existence" check
    // using account_lines against issuer (not perfect for discovery, but safe and runnable).
    const client = await getXrplClient();
    const issuerLines = await getAccountLines(client, issuer);

    // Filter lines that match the currency (best-effort)
    const matches = issuerLines.filter((l) => l.currency === currency);

    res.json({
      ok: true,
      token: { issuer, currency },
      matchesCount: matches.length,
      sample: matches.slice(0, 10)
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: "XRPL token lookup failed",
      details: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
