import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { CategoryHero } from "@/components/catalog/category-hero";
import { InfoSection } from "@/components/catalog/info-section";
import { ToolCard } from "@/components/catalog/tool-card";
import { ComparisonBreakdownTable } from "@/components/comparison/comparison-breakdown-table";
import { ComparisonFaq } from "@/components/comparison/comparison-faq";
import { RelatedComparisonCard } from "@/components/comparison/related-comparison-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { categories } from "@/data/categories";
import { getComparisonContent } from "@/data/comparisons";
import {
  formatPricing,
  getCatalogContent,
  getCategoryNamesMap,
  getLocalizedCategoryBySlug,
  getLocalizedToolBySlug,
  getToolsByCategory
} from "@/lib/catalog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import { buildComparisonPath, getComparisonTargetTools } from "@/lib/comparisons";
import { getToolTrustIndicators } from "@/lib/tool-ui";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      slug: category.slug
    }))
  );
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

  if (slug === "comparisons") {
    const comparison = getComparisonContent(locale as Locale);

    return {
      title: comparison.title,
      description: comparison.summary,
      alternates: {
        canonical: buildCanonicalUrl(`/${locale}/categories/${slug}`),
        languages: buildAlternates(`/categories/${slug}`)
      }
    };
  }

  const category = getLocalizedCategoryBySlug(locale as Locale, slug);

  if (!category) {
    return {};
  }

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: buildCanonicalUrl(`/${locale}/categories/${slug}`),
      languages: buildAlternates(`/categories/${slug}`)
    }
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const content = getCatalogContent(safeLocale);
  const category = getLocalizedCategoryBySlug(safeLocale, slug);

  if (!category) {
    notFound();
  }

  const categoryNamesMap = getCategoryNamesMap(safeLocale);

  if (slug === "comparisons") {
    const comparison = getComparisonContent(safeLocale);
    const primaryTool = getLocalizedToolBySlug(safeLocale, comparison.primaryToolSlug);
    const secondaryTool = getLocalizedToolBySlug(safeLocale, comparison.secondaryToolSlug);

    if (!primaryTool || !secondaryTool) {
      notFound();
    }

    const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/categories/comparisons`);
    const trustIndicators = getToolTrustIndicators(safeLocale);
    const editorNote = safeLocale === "tr"
      ? "Bu sayfa tek bir kazanan seçmez. Güçlü ve zayıf tarafları senaryoya göre gösterir."
      : "This page does not pick a single winner. It shows strengths and limitations by scenario.";
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: comparison.title,
      description: comparison.summary,
      url: canonicalUrl,
      inLanguage: safeLocale
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: comparison.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: content.common.breadcrumbsHome,
          item: `https://deciply.com/${safeLocale}`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: content.common.categoriesLabel,
          item: `https://deciply.com/${safeLocale}/categories`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: comparison.title,
          item: canonicalUrl
        }
      ]
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumb
            items={[
              { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
              { label: content.common.categoriesLabel, href: `/${safeLocale}/categories` },
              { label: comparison.title }
            ]}
          />

          <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                  {comparison.hero.eyebrow}
                </Badge>
                <h1 className="mt-5 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.8rem] lg:leading-[1.02]">
                  {comparison.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{comparison.summary}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="accent">{formatPricing(primaryTool.pricing, safeLocale)}</Badge>
                  <Badge>{primaryTool.name}</Badge>
                  <Badge>{secondaryTool.name}</Badge>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {trustIndicators.map((item) => (
                    <Badge key={item} variant="ghost">
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <PremiumButton href={`/${safeLocale}/tools/${primaryTool.slug}`} className="w-full">
                    {comparison.hero.leftButton}
                  </PremiumButton>
                  <PremiumButton href={`/${safeLocale}/tools/${secondaryTool.slug}`} className="w-full">
                    {comparison.hero.rightButton}
                  </PremiumButton>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{safeLocale === "tr" ? "Editör notu" : "Editor note"}</p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{editorNote}</p>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {comparison.selectionCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{item.title}</p>
                <h2 className="mt-4 text-lg font-semibold text-slate-100">{item.toolLabel}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            ))}
          </section>

          <InfoSection title={comparison.guidance.title} description={comparison.guidance.description}>
            <div className="grid gap-4 md:grid-cols-3">
              {comparison.guidance.items.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-sm font-semibold text-slate-100 md:text-base">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </InfoSection>

          <ComparisonBreakdownTable
            locale={safeLocale}
            title={comparison.table.title}
            description={comparison.table.description}
            columns={comparison.table.columns}
            rows={comparison.table.rows}
          />

          <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {safeLocale === "tr" ? "Ara CTA" : "Mid CTA"}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{comparison.midCta.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{comparison.midCta.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <PremiumButton href={`/${safeLocale}/tools/${primaryTool.slug}`} className="w-full">
                  {comparison.midCta.leftButton}
                </PremiumButton>
                <PremiumButton href={`/${safeLocale}/tools/${secondaryTool.slug}`} className="w-full">
                  {comparison.midCta.rightButton}
                </PremiumButton>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <InfoSection title={comparison.finalVerdict.title} description={comparison.finalVerdict.description}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm font-semibold text-slate-100">{comparison.finalVerdict.leftTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{comparison.finalVerdict.leftDescription}</p>
                  <div className="mt-5">
                    <PremiumButton href={`/${safeLocale}/tools/${primaryTool.slug}`} className="w-full">
                      {comparison.finalVerdict.leftButton}
                    </PremiumButton>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm font-semibold text-slate-100">{comparison.finalVerdict.rightTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{comparison.finalVerdict.rightDescription}</p>
                  <div className="mt-5">
                    <PremiumButton href={`/${safeLocale}/tools/${secondaryTool.slug}`} className="w-full">
                      {comparison.finalVerdict.rightButton}
                    </PremiumButton>
                  </div>
                </div>
              </div>
            </InfoSection>

            <InfoSection title={content.common.relatedToolsLabel} description={content.toolDetail.relatedToolsDescription}>
              <div className="grid gap-5 md:grid-cols-2">
                {[primaryTool, secondaryTool].map((tool) => (
                  <ToolCard
                    key={tool.slug}
                    locale={safeLocale}
                    tool={tool}
                    categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
                    pricingLabel={formatPricing(tool.pricing, safeLocale)}
                    detailLabel={content.common.viewDetailsLabel}
                    compareHref={buildComparisonPath(safeLocale, primaryTool.slug, secondaryTool.slug)}
                  />
                ))}
              </div>
            </InfoSection>
          </section>

          <ComparisonFaq
            title={comparison.faq.title}
            description={comparison.faq.description}
            items={comparison.faq.items}
          />

          <SectionShell
            eyebrow={content.common.relatedContentLabel}
            title={comparison.related.title}
            description={comparison.related.description}
          >
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {comparison.related.cards.map((card) => (
                <RelatedComparisonCard
                  key={card.title}
                  locale={safeLocale}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  ctaLabel={card.ctaLabel}
                  highlight={card.highlight}
                />
              ))}
            </div>
          </SectionShell>
        </div>
      </>
    );
  }

  const tools = getToolsByCategory(safeLocale, slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumb
        items={[
          { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
          { label: content.common.categoriesLabel, href: `/${safeLocale}/categories` },
          { label: category.name }
        ]}
      />

      <CategoryHero
        eyebrow={content.common.categoriesLabel}
        title={category.name}
        description={category.description}
        supportText={category.supportText}
        ctaLabel={content.categoryDetail.allToolsLink}
        ctaHref={`/${safeLocale}/tools`}
      />

      <SectionShell
        eyebrow={content.common.allToolsLabel}
        title={content.categoryDetail.toolsTitle}
        description={content.categoryDetail.toolsDescription}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              locale={safeLocale}
              tool={tool}
              categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
              pricingLabel={formatPricing(tool.pricing, safeLocale)}
              detailLabel={content.common.viewDetailsLabel}
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

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoSection title={content.categoryDetail.relatedTitle} description={content.categoryDetail.relatedDescription}>
          <div className="rounded-[24px] border border-dashed border-white/15 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">
            {content.common.placeholderLabel}: rehber içerikler, alternatif yazıları ve kategoriye özel karşılaştırmalar burada listelenecek.
          </div>
        </InfoSection>

        <InfoSection title={content.categoryDetail.internalLinksTitle} description={content.categoryDetail.internalLinksDescription}>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link href={`/${safeLocale}/tools`} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300">
              {content.categoryDetail.allToolsLink}
            </Link>
            <Link href={`/${safeLocale}/categories`} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300">
              {content.categoryDetail.allCategoriesLink}
            </Link>
            <Link href={`/${safeLocale}/categories/guides`} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300">
              {content.categoryDetail.guidesLink}
            </Link>
          </div>
        </InfoSection>
      </div>
    </div>
  );
}




