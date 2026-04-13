import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonCard } from "@/components/home/comparison-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";

const compareIntro = {
  tr: {
    title: "AI karşılaştırmalarını tek yerde keşfet",
    description:
      "Karar vermeden önce popüler karşılaştırmaları, hızlı seçim bloklarını ve canlı compare akışını kompakt bir dizinde gez.",
    heroBadge: "Compare hub",
    allComparisons: "Tüm karşılaştırmalar",
    autoCompare: "Canlı karşılaştırma",
    featuredTitle: "Öne çıkan karşılaştırmalar",
    featuredDescription: "En çok trafik çeken ve karar açısından güçlü compare sayfaları.",
    recentTitle: "Yakın karşılaştırmalar",
    recentDescription: "Benzer araç çiftleri ve yüksek niyetli karar sayfaları.",
    compareOpen: "Karşılaştırmayı aç"
  },
  en: {
    title: "Explore AI comparisons in one place",
    description:
      "Browse popular comparisons, quick decision blocks, and the live compare flow inside one compact hub.",
    heroBadge: "Compare hub",
    allComparisons: "All comparisons",
    autoCompare: "Live compare",
    featuredTitle: "Featured comparisons",
    featuredDescription: "High-intent comparison pages that drive the strongest decisions.",
    recentTitle: "Nearby comparisons",
    recentDescription: "Adjacent tool pairs and other high-intent decision pages.",
    compareOpen: "Open comparison"
  }
} as const;

function buildFeaturedPairs(locale: Locale) {
  const cards = getComparisonDirectoryCards(locale);
  return cards.slice(0, 8);
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

  const safeLocale = normalizeLocale(locale);

  return {
    title: safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons",
    description:
      safeLocale === "tr"
        ? "AI araç karşılaştırmalarını, canlı compare akışını ve karar odaklı bağlantıları tek yerde keşfet."
        : "Browse AI comparisons, live compare flows, and decision-focused links in one place.",
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/compare`),
      languages: buildAlternates("/compare")
    }
  };
}

export default async function CompareHubPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const copy = compareIntro[safeLocale];
  const featured = buildFeaturedPairs(safeLocale);
  const recent = getComparisonDirectoryCards(safeLocale).slice(8, 16);

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-transparent px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="ui-card ui-card-hover rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <Badge variant="accent">{copy.heroBadge}</Badge>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{copy.description}</p>
          </div>

          <div className="ui-card rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.14)]">
            <div className="flex flex-wrap gap-2">
              <Badge variant="ghost">{copy.allComparisons}</Badge>
              <Badge variant="ghost">{copy.autoCompare}</Badge>
              <Badge variant="ghost">{safeLocale === "tr" ? "Karar rehberi" : "Decision guides"}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <PremiumButton href={`/${safeLocale}/compare-auto`}>{copy.autoCompare}</PremiumButton>
              <PremiumButton href={`/${safeLocale}/categories/comparisons`} variant="secondary">
                {copy.allComparisons}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow={copy.featuredTitle}
        title={copy.featuredTitle}
        description={copy.featuredDescription}
        actions={<PremiumButton href={`/${safeLocale}/compare-auto`}>{copy.autoCompare}</PremiumButton>}
        className="px-0 sm:px-0"
        contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {featured.map((item) => (
          <ComparisonCard
            key={item.href}
            locale={safeLocale}
            item={item}
            linkLabel={copy.compareOpen}
            tone="light"
          />
        ))}
      </SectionShell>

      <SectionShell
        eyebrow={copy.recentTitle}
        title={copy.recentTitle}
        description={copy.recentDescription}
        className="px-0 sm:px-0"
        contentClassName="grid gap-3 md:grid-cols-2"
      >
        {recent.map((item) => {
          return (
            <Link
              key={item.href}
              href={`/${safeLocale}${item.href}`}
              className="group flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:border-sky-200 hover:bg-slate-50"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {safeLocale === "tr" ? "Karşılaştır" : "Compare"}
                </span>
                <span className="block truncate text-sm font-semibold text-slate-950">{item.title}</span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-sky-700 transition group-hover:translate-x-0.5">
                {copy.compareOpen}
              </span>
            </Link>
          );
        })}
      </SectionShell>
    </div>
  );
}
