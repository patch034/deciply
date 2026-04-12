const BRANDFETCH_CLIENT_ID = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID?.trim();

function getHostname(websiteUrl: string) {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./i, "");
  } catch {
    return "";
  }
}

export function getBrandfetchLogoUrl(
  websiteUrl: string,
  options?: {
    size?: number;
    type?: "icon" | "logo" | "symbol";
    theme?: "light" | "dark";
    fallback?: "brandfetch" | "transparent" | "lettermark" | "404";
  }
) {
  const hostname = getHostname(websiteUrl);

  if (!hostname || !BRANDFETCH_CLIENT_ID) {
    return "";
  }

  const size = options?.size ?? 128;
  const type = options?.type ?? "icon";
  const theme = options?.theme ? `/theme/${options.theme}` : "";
  const fallback = options?.fallback ? `/fallback/${options.fallback}` : "/fallback/lettermark";

  return `https://cdn.brandfetch.io/${encodeURIComponent(hostname)}/w/${size}/h/${size}${theme}${fallback}/type/${type}?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`;
}

export function getToolLogoUrl(websiteUrl: string) {
  const brandfetchLogoUrl = getBrandfetchLogoUrl(websiteUrl, {
    size: 128,
    type: "icon",
    fallback: "lettermark"
  });

  if (brandfetchLogoUrl) {
    return brandfetchLogoUrl;
  }

  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./i, "");
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    try {
      const origin = new URL(websiteUrl).origin;
      return `${origin}/favicon.ico`;
    } catch {
      return "";
    }
  }
}
