import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { getHomeContent } from "@/data/home";
import {
  buildAlternates,
  buildCanonicalUrl,
  isValidLocale,
  locales,
  type Locale,
  type SupportedLocale,
  normalizeLocale
} from "@/i18n/config";
import { buildHomeMetaDescription, buildHomeTitle } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

// Do not generate all combinations. This project must not exceed safe static route limits.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const content = getHomeContent(safeLocale);
  const uiLocale = locale as SupportedLocale;
  const title = buildHomeTitle(uiLocale);
  const description = buildHomeMetaDescription(uiLocale);
  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}`);

  return {
    title,
    description,
    keywords:
      safeLocale === "tr"
        ? ["AI araçları", "AI karşılaştırma", "AI alternatifleri", "AI use case", "en iyi AI araçları"]
        : ["AI tools", "AI comparisons", "AI alternatives", "AI use cases", "best AI tools"],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates("")
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description
    }
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const content = getHomeContent(safeLocale);

  return <HomePage locale={safeLocale} content={content} />;
}
