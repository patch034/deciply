import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/i18n/dictionaries";
import {
  buildAlternates,
  buildCanonicalUrl,
  isRtlLocale,
  isValidLocale,
  locales,
  type SupportedLocale,
} from "@/i18n/config";

export const dynamicParams = false;

// Do not generate all combinations. This project must not exceed safe static route limits.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale as SupportedLocale);

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

  const dictionary = getDictionary(locale as SupportedLocale);
  const supportedLocale = locale as SupportedLocale;

  return (
    <div className="min-h-screen" dir={isRtlLocale(locale) ? "rtl" : "ltr"} lang={locale}>
      <SiteHeader locale={supportedLocale} dictionary={dictionary} />
      <main className="pt-[94px] sm:pt-[104px] lg:pt-[116px]">{children}</main>
      <SiteFooter locale={supportedLocale} dictionary={dictionary} />
    </div>
  );
}


