import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { getHomeContent } from "@/data/home";
import { buildAlternates, isValidLocale, type Locale } from "@/i18n/config";

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

  return {
    title:
      safeLocale === "tr"
        ? "Deciply | AI araçlarını karşılaştır, keşfet ve doğru seçimi yap"
        : "Deciply | Compare AI tools and choose with confidence",
    description: content.hero.description,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: buildAlternates("")
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
