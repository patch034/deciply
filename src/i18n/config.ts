export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "deciply-locale";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function buildAlternates(path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;

  return {
    tr: `/tr${safePath === "/" ? "" : safePath}`,
    en: `/en${safePath === "/" ? "" : safePath}`,
    "x-default": `/en${safePath === "/" ? "" : safePath}`
  };
}

