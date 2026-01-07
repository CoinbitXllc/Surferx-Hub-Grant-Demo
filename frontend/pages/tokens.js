import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

export default function Tokens() {
  const [registry, setRegistry] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet("/registry");
        setRegistry(data.data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Token Registry (Phase 1)</h1>
      <p>Local registry.json served by backend (grant MVP demo).</p>
      <p><a href="/">← Back</a></p>

      {error && (
        <div style={{ marginTop: 16, color: "crimson" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!registry && !error && <p>Loading…</p>}

      {registry && (
        <div style={{ marginTop: 16 }}>
          <h2>Tokens</h2>
          {(registry.tokens || []).map((t) => (
            <div key={`${t.issuer}-${t.currency}`} style={{ padding: 12, border: "1px solid #ddd", marginBottom: 10 }}>
              <div><strong>{t.name}</strong> ({t.currency})</div>
              <div>Issuer: <code>{t.issuer}</code></div>
              <div style={{ marginTop: 6 }}>{t.description}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
