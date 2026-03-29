import { buildSiteUrl } from "@/lib/site";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "deciply-locale";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function buildCanonicalUrl(path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return buildSiteUrl(safePath === "/" ? "" : safePath);
}

export function buildAlternates(path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = safePath === "/" ? "" : safePath;

  return {
    tr: buildSiteUrl(`/tr${normalizedPath}`),
    en: buildSiteUrl(`/en${normalizedPath}`),
    "x-default": buildSiteUrl(`/en${normalizedPath}`)
  };
}
