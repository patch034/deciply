import type { Metadata } from "next";

import { staticPages } from "@/data/static-pages";
import { buildAlternates, buildCanonicalUrl, type Locale } from "@/i18n/config";

export type StaticPageKey = keyof (typeof staticPages)[Locale];

export function getStaticPage(locale: Locale, key: StaticPageKey) {
  return staticPages[locale][key];
}

export function buildStaticPageMetadata(locale: Locale, path: string, key: StaticPageKey): Metadata {
  const page = getStaticPage(locale, key);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${locale}${path}`),
      languages: buildAlternates(path)
    }
  };
}
