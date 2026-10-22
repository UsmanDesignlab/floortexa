/**
 * In local dev, leave VITE_API_BASE_URL empty so requests go to the Vite
 * origin (/api/...) and get proxied to Floortexa admin (usually :3001).
 * Setting VITE_API_BASE_URL=http://localhost:3000 breaks the app because
 * that port is often a different website.
 */
function resolveApiBase() {
  const raw = String(import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
  if (!raw) return "";
  // Guard against the common misconfig that caused the 404s.
  if (raw === "http://localhost:3000" || raw === "http://127.0.0.1:3000") {
    console.warn(
      "[Floortex] Ignoring VITE_API_BASE_URL=%s — use Vite proxy to admin :3001 instead.",
      raw,
    );
    return "";
  }
  return raw;
}

const API_BASE = resolveApiBase();

export function mediaUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parseJson(response) {
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json?.error?.message || `Request failed (${response.status})`);
  }
  return json.data;
}

export async function listResource(resource, params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.set(key, String(value));
  });
  const query = search.toString();
  const response = await fetch(
    `${API_BASE}/api/storefront/${resource}${query ? `?${query}` : ""}`,
  );
  return parseJson(response);
}

export async function getResource(resource, id) {
  const response = await fetch(`${API_BASE}/api/storefront/${resource}/${id}`);
  return parseJson(response);
}

export async function submitContact(payload) {
  const response = await fetch(`${API_BASE}/api/storefront/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}
