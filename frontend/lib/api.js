export function getApiBase() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

export async function apiGet(path) {
  const base = getApiBase();
  const res = await fetch(`${base}${path}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "API request failed");
  }
  return data;
}
