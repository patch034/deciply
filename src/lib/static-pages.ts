import type { Metadata } from "next";

import { staticPages } from "@/data/static-pages";
import { buildAlternates, buildCanonicalUrl, type SupportedLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";

export type StaticPageKey = keyof (typeof staticPages)["tr" | "en"];

export function getStaticPage(locale: SupportedLocale, key: StaticPageKey) {
  return localizeTree(locale, staticPages[getContentBaseLocale(locale)][key]);
}

export function buildStaticPageMetadata(locale: SupportedLocale, path: string, key: StaticPageKey): Metadata {
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
