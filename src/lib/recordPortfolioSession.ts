const SESSION_KEY = "portfolio-session-recorded";

function shouldSkipRecording(): boolean {
  if (typeof window === "undefined") return true;

  const host = window.location.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") {
    return true;
  }

  // Common automated / preview hosts — never count these as portfolio visits.
  const skipHosts = [
    "webcontainer.io",
    "local-credentialless.webcontainer.io",
    "stackblitz.io",
    "stackblitz.com",
    "codesandbox.io",
    "csb.app",
    "gitpod.io",
    "github.dev",
    "githubpreview.dev",
    "preview.app",
    "netlify.app",
    "vercel.app",
    "cloudflarepages.dev",
    "pages.dev",
  ];
  if (skipHosts.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))) {
    return true;
  }

  // Playwright / headless markers when present.
  const nav = window.navigator as Navigator & { webdriver?: boolean };
  if (nav.webdriver) return true;

  return false;
}

/**
 * Silently record one portfolio browser session.
 * Never throws, never blocks render, never shows UI.
 */
export function recordPortfolioSession(): void {
  try {
    if (shouldSkipRecording()) return;

    const endpoint = import.meta.env.VITE_VIEW_COUNTER_ENDPOINT;
    if (typeof endpoint !== "string" || !endpoint.trim()) return;

    if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    sessionStorage.setItem(SESSION_KEY, "1");

    const url = endpoint.replace(/\/$/, "") + "/view";
    void fetch(url, {
      method: "POST",
      keepalive: true,
      mode: "cors",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    }).catch(() => {
      /* ignore — tracking must never affect the portfolio */
    });
  } catch {
    /* ignore sessionStorage / fetch errors */
  }
}
