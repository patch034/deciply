import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { getHomeContent } from "@/data/home";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";
import { buildHomeMetaDescription, buildHomeTitle } from "@/lib/seo";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;
  const content = getHomeContent(safeLocale);
  const title = buildHomeTitle(safeLocale);
  const description = buildHomeMetaDescription(safeLocale);
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

  const safeLocale = locale as Locale;
  const content = getHomeContent(safeLocale);

  return <HomePage locale={safeLocale} content={content} />;
}