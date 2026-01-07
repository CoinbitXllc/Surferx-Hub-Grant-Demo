/**
 * XRPL Read-only helpers for Phase 1 MVP
 */
async function getAccountInfo(client, address) {
  const resp = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated"
  });
  return resp.result;
}

async function getAccountLines(client, address) {
  const resp = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated"
  });
  return resp.result.lines || [];
}

module.exports = { getAccountInfo, getAccountLines };
