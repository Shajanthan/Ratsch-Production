/**
 * Public API base (e.g. `https://your-api.run.app/api`).
 * Set `VITE_API_URL` in Vercel → Environment Variables for production; then redeploy.
 */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const base = String(raw).trim().replace(/\/+$/, "");

  if (import.meta.env.PROD && base.includes("localhost")) {
    console.warn(
      "[Ratsch] VITE_API_URL is not set for production (still using localhost). Add it in Vercel → Settings → Environment Variables and redeploy.",
    );
  }

  return base;
}
