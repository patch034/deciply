import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticPageShell } from "@/components/content/static-page-shell";
import { isValidLocale, type Locale } from "@/i18n/config";
import { buildStaticPageMetadata, getStaticPage } from "@/lib/static-pages";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return buildStaticPageMetadata(locale as Locale, "/affiliate-disclosure", "affiliateDisclosure");
}

export default async function AffiliateDisclosurePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <StaticPageShell content={getStaticPage(locale as Locale, "affiliateDisclosure")} />;
}