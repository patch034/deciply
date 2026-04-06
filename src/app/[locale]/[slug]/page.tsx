import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { ToolCard } from "@/components/catalog/tool-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { discoveryPages, getDiscoveryPage } from "@/data/discovery-pages";
import {
  formatPricing,
  getCatalogContent,
  getCategoryNamesMap,
  getLocalizedTools,
  getToolCount
} from "@/lib/catalog";
import { buildComparisonPath, getComparisonTargetTools } from "@/lib/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import { stripBrandSuffix } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => discoveryPages.map((page) => ({ locale, slug: page.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const page = getDiscoveryPage(locale as Locale, slug);

  if (!page) {
    return {};
  }

  return {
    title: stripBrandSuffix(page.seoTitle),
    description: page.seoDescription,
    alternates: {
      canonical: buildCanonicalUrl(`/${locale}/${slug}`),
      languages: buildAlternates(`/${slug}`)
    }
  };
}

export default async function DiscoveryPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const page = getDiscoveryPage(safeLocale, slug);

  if (!page) {
    notFound();
  }

  const content = getCatalogContent(safeLocale);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const toolMap = new Map(getLocalizedTools(safeLocale).map((tool) => [tool.slug, tool]));
  const selectedTools = page.toolSlugs
    .map((toolSlug) => toolMap.get(toolSlug))
    .filter((tool): tool is NonNullable<ReturnType<typeof toolMap.get>> => Boolean(tool));

  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/${page.slug}`);
  const toolCount = getToolCount();
  const bestForLabel = safeLocale === "tr" ? "Uygun kullanım" : "Best for";
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.title,
    description: page.description,
    url: canonicalUrl,
    inLanguage: safeLocale,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: selectedTools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: buildCanonicalUrl(`/${safeLocale}/tools/${tool.slug}`),
        name: tool.name
      }))
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: safeLocale === 'tr' ? 'Ana sayfa' : 'Home', href: `/${safeLocale}` },
            { label: page.title }
          ]}
        />

        <section className="rounded-[34px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(17,24,39,0.9),rgba(11,15,25,0.96))] px-5 py-8 shadow-[0_28px_90px_-44px_rgba(14,165,233,0.14)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="max-w-3xl">
              <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                {page.eyebrow}
              </Badge>
              <h1 className="mt-5 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.5rem] lg:leading-[1.04]">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{page.description}</p>
            </div>

            <div className="rounded-[28px] border border-sky-400/10 bg-slate-950/50 p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-[22px] border border-sky-400/10 bg-slate-950/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {safeLocale === 'tr' ? 'Bu sayfada' : 'On this page'}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{selectedTools.length} {safeLocale === 'tr' ? 'araç' : 'tools'}</p>
                </div>
                <div className="rounded-[22px] border border-sky-400/10 bg-slate-950/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {safeLocale === 'tr' ? 'Platformda' : 'Across Deciply'}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{toolCount} {safeLocale === 'tr' ? 'incelenen araç' : 'tools reviewed'}</p>
                </div>
                <div className="rounded-[22px] border border-sky-400/10 bg-slate-950/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {safeLocale === 'tr' ? 'Yaklaşım' : 'Approach'}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{safeLocale === 'tr' ? 'Senaryo bazlı' : 'Scenario based'}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="ghost">{safeLocale === 'tr' ? 'Tarafsız değerlendirme' : 'Neutral evaluation'}</Badge>
                <Badge variant="ghost">{safeLocale === 'tr' ? 'Gerçek kullanım alanları' : 'Real use cases'}</Badge>
                <Badge variant="ghost">{safeLocale === 'tr' ? 'Düzenli güncellenir' : 'Updated regularly'}</Badge>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
          <SectionShell
            eyebrow={safeLocale === 'tr' ? 'Araç seçimi' : 'Tool selection'}
            title={page.summaryTitle}
            description={page.summaryDescription}
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {selectedTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  locale={safeLocale}
                  tool={tool}
                  categoryNames={tool.categorySlugs.map((slugItem) => categoryNamesMap.get(slugItem) ?? slugItem)}
                  pricingLabel={formatPricing(tool.pricing, safeLocale)}
                  detailLabel={content.common.viewDetailsLabel}
                  bestForLabel={bestForLabel}
                  useCaseLabel={tool.bestUseCase}
                  compareHref={
                    (() => {
                      const target = getComparisonTargetTools(safeLocale, tool.slug, 1)[0];
                      return target ? buildComparisonPath(safeLocale, tool.slug, target.slug) : undefined;
                    })()
                  }
                />
              ))}
            </div>
          </SectionShell>

          <SectionShell title={page.audienceTitle}>
            <div className="grid gap-4 md:grid-cols-3">
              {page.audienceBullets.map((item) => (
                <div key={item} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 text-sm leading-7 text-slate-300 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
                  {item}
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell title={page.chooseTitle}>
            <div className="grid gap-4 md:grid-cols-3">
              {page.chooseBullets.map((item) => (
                <div key={item} className="rounded-[24px] border border-cyan-400/14 bg-cyan-400/[0.04] p-5 text-sm leading-7 text-slate-300 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
                  {item}
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell title={page.useCasesTitle}>
            <div className="grid gap-4 md:grid-cols-3">
              {page.useCases.map((item) => (
                <div key={item} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 text-sm leading-7 text-slate-300 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
                  {item}
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell>
            <div className="rounded-[30px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-5 py-8 shadow-[0_26px_80px_-44px_rgba(14,165,233,0.14)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {safeLocale === 'tr' ? 'Son adım' : 'Final step'}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{page.finalTitle}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{page.finalDescription}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <PremiumButton href={`/${safeLocale}/tools`}>
                    {safeLocale === 'tr' ? 'Tüm araçları incele' : 'Browse all tools'}
                  </PremiumButton>
                  <PremiumButton href={`/${safeLocale}/categories`} variant="secondary">
                    {safeLocale === 'tr' ? 'Kategorilere git' : 'View categories'}
                  </PremiumButton>
                </div>
              </div>
            </div>
          </SectionShell>
        </div>
      </div>
    </>
  );
}


