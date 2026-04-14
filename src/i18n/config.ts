import { buildSiteUrl } from "@/lib/site";

export const contentLocales = ["tr", "en"] as const;
export type ContentLocale = (typeof contentLocales)[number];

export const locales = ["tr", "en", "ar", "ru", "zh", "ja", "ko", "el", "da", "fa"] as const;
export type SupportedLocale = (typeof locales)[number];

export type Locale = SupportedLocale;

export const defaultLocale: Locale = "en";
export const localeCookieName = "deciply-locale";

export function isValidLocale(value: string): value is SupportedLocale {
  return locales.includes(value as SupportedLocale);
}

export function normalizeLocale(value: string): Locale {
  return isValidLocale(value) ? (value as Locale) : defaultLocale;
}

export function isRtlLocale(value: string) {
  return value === "ar" || value === "fa";
}

export function buildCanonicalUrl(path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return buildSiteUrl(safePath === "/" ? "" : safePath);
}

export function buildAlternates(path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = safePath === "/" ? "" : safePath;
  const alternates = Object.fromEntries(
    locales.map((locale) => [locale, buildSiteUrl(`/${locale}${normalizedPath}`)])
  ) as Record<SupportedLocale, string>;

  return {
    ...alternates,
    "x-default": buildSiteUrl(`/en${normalizedPath}`)
  };
}
