const xrpl = require("xrpl");

let cachedClient = null;

/**
 * Returns a connected XRPL Client.
 * Phase 1 is read-only: we do not sign or submit any transactions.
 */
async function getXrplClient() {
  if (cachedClient && cachedClient.isConnected()) return cachedClient;

  const rpcUrl = process.env.XRPL_RPC_URL;
  if (!rpcUrl) {
    throw new Error("XRPL_RPC_URL is not set. Add it to backend .env");
  }

  const client = new xrpl.Client(rpcUrl);
  await client.connect();

  cachedClient = client;
  return cachedClient;
}

module.exports = { getXrplClient };
