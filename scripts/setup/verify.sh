### Create folders:
---

## `scripts/setup/verify.sh`

```bash
#!/bin/bash

echo "🔎 Verifying SurferX Hub Phase 1 services..."

API_URL=${API_URL:-http://localhost:4000}

echo "→ Checking backend health at $API_URL/health"
curl -s "$API_URL/health" | jq .

echo ""
echo "→ Checking registry endpoint"
curl -s "$API_URL/registry" | jq .

echo ""
echo "✅ Verification complete."
