export const siteConfig = {
  name: "Deciply",
  description: "Choose the right AI. Faster, smarter, confidently.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://deciply.com",
  host: "deciply.com"
};

export function buildSiteUrl(path = "") {
  const safePath = !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const url = new URL(safePath, siteConfig.url);

  return safePath === "/" ? siteConfig.url : url.toString();
}
