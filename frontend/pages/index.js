import { useState } from "react";
import { apiGet } from "../lib/api";

export default function Home() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function lookupAccount() {
    setError("");
    setResult(null);
    try {
      const data = await apiGet(`/xrpl/account/${address}`);
      setResult(data);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>SurferX Hub — Phase 1 MVP</h1>
      <p>Read-only XRPL viewer (non-custodial). No signing. No transactions.</p>

      <section style={{ marginTop: 20 }}>
        <h2>Account Lookup</h2>
        <input
          style={{ width: 520, padding: 10 }}
          placeholder="Enter XRPL address (r...)"
          value={address}
          onChange={(e) => setAddress(e.target.value.trim())}
        />
        <button style={{ marginLeft: 10, padding: 10 }} onClick={lookupAccount}>
          Lookup
        </button>
      </section>

      {error && (
        <div style={{ marginTop: 16, color: "crimson" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <pre style={{ marginTop: 16, padding: 16, background: "#f6f6f6" }}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}

      <section style={{ marginTop: 30 }}>
        <a href="/tokens">Go to Token Registry →</a>
      </section>
    </main>
  );
}
