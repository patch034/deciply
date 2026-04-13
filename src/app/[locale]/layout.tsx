import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(normalizeLocale(locale));

  return {
    title: dictionary.meta.homeTitle,
    description: dictionary.meta.homeDescription,
    alternates: {
      canonical: buildCanonicalUrl(`/${locale}`),
      languages: buildAlternates("/")
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(normalizeLocale(locale));

  return (
    <div className="min-h-screen">
      <SiteHeader locale={normalizeLocale(locale)} dictionary={dictionary} />
      <main className="pt-[92px] sm:pt-[96px] lg:pt-[100px]">{children}</main>
      <SiteFooter locale={normalizeLocale(locale)} dictionary={dictionary} />
    </div>
  );
}


