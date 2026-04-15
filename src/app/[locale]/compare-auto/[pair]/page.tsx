import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AutoCompareWorkspace } from "@/components/comparison/auto-compare-workspace";
import { ComparisonCard } from "@/components/home/comparison-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { SectionShell } from "@/components/ui/section-shell";
import { getCatalogContent, getLocalizedToolBySlug, getLocalizedTools } from "@/lib/catalog";
import { buildCanonicalUrl, buildAlternates, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";
import { getComparisonDirectoryCards, parseAutoComparisonPairSlug } from "@/lib/comparisons";

export function generateStaticParams() {
  return [] as { locale: string; pair: string }[];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; pair: string }>;
}): Promise<Metadata> {
  const { locale, pair } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const parsed = parseAutoComparisonPairSlug(pair);

  if (!parsed) {
    return {};
  }

  const leftTool = getLocalizedToolBySlug(safeLocale, parsed.leftSlug);
  const rightTool = getLocalizedToolBySlug(safeLocale, parsed.rightSlug);

  if (!leftTool || !rightTool || leftTool.slug === rightTool.slug) {
    return {};
  }

  const canonicalPath = `/${safeLocale}/compare-auto/${pair}`;
  const alternatesPath = `/compare-auto/${pair}`;
  const title = safeLocale === "tr" ? `${leftTool.name} vs ${rightTool.name} | Canlı karşılaştırma` : `${leftTool.name} vs ${rightTool.name} | Live compare`;
  const description =
    safeLocale === "tr"
      ? `${leftTool.name} ile ${rightTool.name} arasında fiyat, hız, kullanım kolaylığı ve kullanım alanı farklarını otomatik panelde görün.`
      : `Review pricing, speed, ease of use, and workflow fit between ${leftTool.name} and ${rightTool.name} in a live comparison panel.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true
    },
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(alternatesPath)
    }
  };
}

export default async function CompareAutoPairPage({
  params
}: {
  params: Promise<{ locale: string; pair: string }>;
}) {
  const { locale, pair } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const parsed = parseAutoComparisonPairSlug(pair);

  if (!parsed) {
    notFound();
  }

  const content = getCatalogContent(safeLocale);
  const tools = getLocalizedTools(safeLocale);
  const leftTool = getLocalizedToolBySlug(safeLocale, parsed.leftSlug);
  const rightTool = getLocalizedToolBySlug(safeLocale, parsed.rightSlug);

  if (!leftTool || !rightTool || leftTool.slug === rightTool.slug) {
    notFound();
  }

  const comparisonCards = getComparisonDirectoryCards(safeLocale).slice(0, 6);

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumb
        items={[
          { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
          { label: content.common.categoriesLabel, href: `/${safeLocale}/categories` },
          { label: safeLocale === "tr" ? "Canlı karşılaştırma" : "Live compare" },
          { label: `${leftTool.name} vs ${rightTool.name}` }
        ]}
      />

      <section className="rounded-[36px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.94),rgba(11,15,25,0.98))] px-6 py-8 shadow-[0_28px_84px_-48px_rgba(14,165,233,0.14)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/88">
            {safeLocale === "tr" ? "Anında karşılaştırma" : "Instant compare"}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl lg:text-[3.7rem] lg:leading-[1.04]">
            {leftTool.name} vs {rightTool.name}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {safeLocale === "tr"
              ? "Aynı veri modelinden gelen fiyat, hız, kullanım kolaylığı ve kalite skorlarını anında görün."
              : "See pricing, speed, ease of use, and quality scores pulled from the same catalog data instantly."}
          </p>
        </div>
      </section>

      <AutoCompareWorkspace locale={safeLocale} tools={tools} initialLeftSlug={leftTool.slug} initialRightSlug={rightTool.slug} />

      <SectionShell
        eyebrow={safeLocale === "tr" ? "SEO karşılaştırmaları" : "SEO comparisons"}
        title={safeLocale === "tr" ? "Editoryal compare dizini" : "Editorial compare directory"}
        description={
          safeLocale === "tr"
            ? "Bu otomatik panelin yanında, derin SEO compare sayfalarına da geçebilirsiniz."
            : "Alongside the live panel, you can open the deeper editorial comparison pages."
        }
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {comparisonCards.map((item) => (
            <ComparisonCard key={item.href} locale={safeLocale} item={item} linkLabel={safeLocale === "tr" ? "Karşılaştırmayı aç" : "Open comparison"} />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
