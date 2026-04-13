import type { Metadata } from "next";

import { AutoCompareWorkspace } from "@/components/comparison/auto-compare-workspace";
import { ComparisonCard } from "@/components/home/comparison-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getCatalogContent, getLocalizedTools } from "@/lib/catalog";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale, normalizeLocale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const canonicalPath = `/${safeLocale}/compare-auto`;

  return {
    title: safeLocale === "tr" ? "Canlı AI karşılaştırma | Deciply" : "Live AI compare | Deciply",
    description:
      safeLocale === "tr"
        ? "İstediğiniz iki AI aracını seçin, anında karşılaştırın ve manuel SEO compare sayfalarına da hızlıca geçin."
        : "Choose any two AI tools, compare them instantly, and jump into editorial comparison pages when you need more depth.",
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(canonicalPath)
    }
  };
}

export default async function CompareAutoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const content = getCatalogContent(safeLocale);
  const tools = getLocalizedTools(safeLocale);
  const comparisonCards = getComparisonDirectoryCards(safeLocale).slice(0, 6);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-7xl flex-col gap-10 overflow-x-clip bg-transparent px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumb
        items={[
          { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
          { label: content.common.categoriesLabel, href: `/${safeLocale}/categories` },
          { label: safeLocale === "tr" ? "Canlı karşılaştırma" : "Live compare" }
        ]}
      />

      <section className="ui-card ui-card-hover rounded-[36px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(247,250,253,0.988))] px-6 py-8 shadow-[0_24px_72px_-44px_rgba(15,23,42,0.16)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0055FF]">
            {safeLocale === "tr" ? "Anında karar paneli" : "Instant decision panel"}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-[3.7rem] lg:leading-[1.04]">
            {safeLocale === "tr" ? "İki aracı anında karşılaştırın" : "Compare any two tools instantly"}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            {safeLocale === "tr"
              ? "Aynı katalog verisini kullanarak fiyat, hız, kullanım kolaylığı ve kullanım alanı farklarını tek panelde görün."
              : "Use the same catalog data to review pricing, speed, ease of use, and workflow fit in one premium panel."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PremiumButton href={`/${safeLocale}/tools`} className="w-full sm:w-auto">
              {safeLocale === "tr" ? "Araçları aç" : "Browse tools"}
            </PremiumButton>
            <PremiumButton href={`/${safeLocale}/categories/comparisons`} variant="secondary" className="w-full sm:w-auto">
              {safeLocale === "tr" ? "Editoryal karşılaştırmalar" : "Editorial comparisons"}
            </PremiumButton>
          </div>
        </div>
      </section>

      <AutoCompareWorkspace locale={safeLocale} tools={tools} initialLeftSlug="chatgpt" initialRightSlug="claude" />

      <SectionShell
        eyebrow={safeLocale === "tr" ? "SEO karşılaştırmaları" : "SEO comparisons"}
        title={safeLocale === "tr" ? "Manuel compare sayfaları" : "Manual compare pages"}
        description={
          safeLocale === "tr"
            ? "Klasik SEO karşılaştırmaları, derin editoryal karar akışı için burada."
            : "Classic editorial comparison pages stay here for deeper SEO-driven decisions."
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
