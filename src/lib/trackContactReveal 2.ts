type ContactRevealType = "email" | "phone";

/**
 * Lightweight contact_reveal ping.
 * Never throws, never blocks UI — fails silently if analytics are unavailable.
 */
export function trackContactReveal(type: ContactRevealType): void {
  try {
    if (typeof window === "undefined") return;

    const endpoint = import.meta.env.VITE_VIEW_COUNTER_ENDPOINT;
    if (typeof endpoint !== "string" || !endpoint.trim()) return;

    const host = window.location.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") {
      return;
    }

    const url = endpoint.replace(/\/$/, "") + "/event";
    void fetch(url, {
      method: "POST",
      keepalive: true,
      mode: "cors",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "contact_reveal",
        type,
      }),
    }).catch(() => {
      /* ignore */
    });
  } catch {
    /* ignore */
  }
}
