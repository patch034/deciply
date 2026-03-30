export const CANONICAL_SITE_URL = "https://deciply.com";

function normalizeSiteUrl(rawUrl?: string) {
  if (!rawUrl) {
    return CANONICAL_SITE_URL;
  }

  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.toLowerCase();
    const isLocalhost = host === "localhost" || host === "127.0.0.1";

    if (isLocalhost && process.env.NODE_ENV === "production") {
      return CANONICAL_SITE_URL;
    }

    if (host === "deciply.com" || host === "www.deciply.com") {
      return CANONICAL_SITE_URL;
    }

    return parsed.toString().replace(/\/$/, "");
  } catch {
    return CANONICAL_SITE_URL;
  }
}

const resolvedSiteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim());
const resolvedHost = new URL(resolvedSiteUrl).hostname;

export const siteConfig = {
  name: "Deciply",
  description: "Choose the right AI. Faster, smarter, confidently.",
  url: resolvedSiteUrl,
  host: resolvedHost
};

export function buildSiteUrl(path = "") {
  const safePath = !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const url = new URL(safePath, siteConfig.url);

  return safePath === "/" ? siteConfig.url : url.toString();
}
