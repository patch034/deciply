import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { InfoSection } from "@/components/catalog/info-section";
import { ProsConsCard } from "@/components/catalog/pros-cons-card";
import { ToolCard } from "@/components/catalog/tool-card";
import { ComparisonBreakdownTable } from "@/components/comparison/comparison-breakdown-table";
import { ComparisonFaq } from "@/components/comparison/comparison-faq";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import type { ComparisonFaqItem, ComparisonRow } from "@/data/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import {
  buildComparisonPath,
  getComparisonAlternativeTools,
  getComparisonRelatedBlogSlugsForSlugs,
  getComparisonToolsFromPair,
  getStaticComparisonPairSlugs,
  parseComparisonPairSlug
} from "@/lib/comparisons";
import { getLocalizedBlogArticleBySlug } from "@/lib/blog";
import { formatPricing, getCatalogContent, getCategoryNamesMap } from "@/lib/catalog";
import type { LocalizedTool } from "@/types/catalog";

const copy = {
  tr: {
    compareLabel: "Karşılaştır",
    breadcrumbsHome: "Ana sayfa",
    breadcrumbsTools: "Araçlar",
    breadcrumbsCompare: "Karşılaştırmalar",
    eyebrow: "Karar odaklı karşılaştırma",
    heroSummary: "Bu karşılaştırma; kullanım alanı, fiyat, güçlü yönler ve sınırlamalar üzerinden daha net karar vermeniz için hazırlandı.",
    primaryCta: "Aracı incele",
    tableTitle: "Yan yana karşılaştırma",
    tableDescription: "İki aracı temel karar kriterleriyle aynı tabloda görün.",
    bestForTitle: "Hangi araç kimler için daha uygun?",
    bestForDescription: "En iyi kullanım senaryosunu ve kullanıcı profilini hızlıca karşılaştırın.",
    pricingTitle: "Fiyat karşılaştırması",
    pricingDescription: "Ücretsiz başlama imkanı, fiyat modeli ve ticari kullanım açısından farkları görün.",
    strengthsTitle: "Güçlü yönler",
    strengthsDescription: "Her iki aracın öne çıktığı alanları ayrı ayrı değerlendirin.",
    limitationsTitle: "Sınırlamalar",
    limitationsDescription: "Karar vermeden önce darboğaz yaratabilecek noktaları görün.",
    verdictTitle: "Son karar",
    verdictDescription: "Kazananı zorla seçmek yerine hangi senaryoda hangi aracın daha mantıklı olduğunu özetler.",
    relatedComparisonsTitle: "İlgili karşılaştırmalar",
    relatedComparisonsDescription: "Kıyaslama alanını genişletmek için bu benzer karşılaştırmaları da açın.",
    relatedBlogsTitle: "İlgili bloglar",
    relatedBlogsDescription: "Kararı daha geniş bir içerik kümesiyle desteklemek için bu rehberleri de inceleyin.",
    relatedBlogCtaLabel: "Rehberi oku",
    relatedAlternativesTitle: "İlgili alternatifler",
    relatedAlternativesDescription: "Karar alanını biraz daha daraltmak isterseniz bu araçlara da göz atın.",
    faqTitle: "Sık sorulan sorular",
    faqDescription: "Bu comparison sayfasında en sık sorulan karar sorularına kısa cevaplar.",
    tableLabels: {
      criteria: "Kriter",
      bestFor: "En uygun kullanım",
      pricing: "Fiyat modeli",
      whatItDoes: "Ne yapar",
      whoShouldUse: "Kim kullanmalı",
      strengths: "Güçlü yönler",
      limitations: "Sınırlamalar",
      realUseCase: "Gerçek kullanım örneği"
    },
    pricingFreeStart: "Ücretsiz başlangıç",
    pricingCommercial: "Ticari kullanım açısından",
    verdictLeftTitle: "Ne zaman bu araç daha mantıklı?",
    verdictRightTitle: "Ne zaman diğer araç daha mantıklı?"
  },
  en: {
    compareLabel: "Compare",
    breadcrumbsHome: "Home",
    breadcrumbsTools: "Tools",
    breadcrumbsCompare: "Comparisons",
    eyebrow: "Decision-focused comparison",
    heroSummary: "This page is built to make the decision clearer across use case, pricing, strengths, and trade-offs.",
    primaryCta: "Review tool",
    tableTitle: "Side-by-side comparison",
    tableDescription: "Review both tools against the main criteria that usually shape the decision.",
    bestForTitle: "Who is each tool best for?",
    bestForDescription: "Compare the strongest use case and the user profile each tool fits best.",
    pricingTitle: "Pricing comparison",
    pricingDescription: "See where free access, pricing model, and commercial fit differ.",
    strengthsTitle: "Strengths",
    strengthsDescription: "Review the areas where each tool stands out most.",
    limitationsTitle: "Limitations",
    limitationsDescription: "See the trade-offs that may slow the workflow or weaken the fit.",
    verdictTitle: "Final verdict",
    verdictDescription: "Instead of forcing one winner, this section shows where each tool makes more sense.",
    relatedComparisonsTitle: "Related comparisons",
    relatedComparisonsDescription: "Open these nearby comparisons to widen the decision context.",
    relatedBlogsTitle: "Related blog posts",
    relatedBlogsDescription: "Use these guides to add more context before you decide.",
    relatedBlogCtaLabel: "Read guide",
    relatedAlternativesTitle: "Related alternatives",
    relatedAlternativesDescription: "If you want to narrow the decision further, review these nearby options too.",
    faqTitle: "FAQ",
    faqDescription: "Short answers to the most common decision questions on this comparison page.",
    tableLabels: {
      criteria: "Criteria",
      bestFor: "Best for",
      pricing: "Pricing",
      whatItDoes: "What it does",
      whoShouldUse: "Who should use it",
      strengths: "Strengths",
      limitations: "Limitations",
      realUseCase: "Real use case"
    },
    pricingFreeStart: "Free start",
    pricingCommercial: "Commercial fit",
    verdictLeftTitle: "When is this tool the better fit?",
    verdictRightTitle: "When is the other tool the better fit?"
  }
} as const;

function joinItems(items: string[], locale: Locale, limit = 3) {
  return items.slice(0, limit).join(locale === "tr" ? ", " : ", ");
}

function buildComparisonTitle(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  return locale === "tr"
    ? `${leftTool.name} vs ${rightTool.name} karşılaştırması (2026)`
    : `${leftTool.name} vs ${rightTool.name} Comparison (2026)`;
}

function buildComparisonDescription(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  return locale === "tr"
    ? `${leftTool.name} ve ${rightTool.name} için fiyat, güçlü yönler, sınırlamalar, kullanım senaryoları ve final verdict özetini inceleyin.`
    : `Compare ${leftTool.name} and ${rightTool.name} across pricing, strengths, limitations, best-fit workflows, and final verdict.`;
}

function buildHeroIntro(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  return locale === "tr"
    ? `${leftTool.name}, ${leftTool.bestUseCase.toLowerCase()} için daha güçlü olabilir. ${rightTool.name} ise ${rightTool.bestUseCase.toLowerCase()} tarafında daha mantıklı durabilir.`
    : `${leftTool.name} may fit ${leftTool.bestUseCase.toLowerCase()} better, while ${rightTool.name} may make more sense for ${rightTool.bestUseCase.toLowerCase()}.`;
}

function buildComparisonRows(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool): ComparisonRow[] {
  const labels = copy[locale].tableLabels;

  return [
    {
      label: labels.bestFor,
      left: leftTool.bestUseCase,
      right: rightTool.bestUseCase
    },
    {
      label: labels.pricing,
      left: formatPricing(leftTool.pricing, locale),
      right: formatPricing(rightTool.pricing, locale)
    },
    {
      label: labels.whatItDoes,
      left: leftTool.whatItActuallyDoes,
      right: rightTool.whatItActuallyDoes
    },
    {
      label: labels.whoShouldUse,
      left: leftTool.whoShouldUseSummary,
      right: rightTool.whoShouldUseSummary
    },
    {
      label: labels.strengths,
      left: joinItems(leftTool.pros, locale),
      right: joinItems(rightTool.pros, locale)
    },
    {
      label: labels.limitations,
      left: joinItems(leftTool.cons, locale),
      right: joinItems(rightTool.cons, locale)
    },
    {
      label: labels.realUseCase,
      left: leftTool.realUseCaseExample.title,
      right: rightTool.realUseCaseExample.title
    }
  ];
}

function buildComparisonFaq(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool): ComparisonFaqItem[] {
  if (locale === "tr") {
    return [
      {
        question: `${leftTool.name} mi ${rightTool.name} mi daha mantıklı?`,
        answer: `${leftTool.name}, ${leftTool.bestUseCase.toLowerCase()} için daha mantıklı olabilir. ${rightTool.name} ise ${rightTool.bestUseCase.toLowerCase()} arayan kullanıcılar için daha iyi uyum sağlayabilir.`
      },
      {
        question: `Yeni başlayan biri önce hangisini denemeli?`,
        answer: `${leftTool.pricing !== "PAID" ? leftTool.name : rightTool.name} daha düşük bariyerle başlanabilecek taraf olabilir; yine de karar en çok hedef çıktınıza göre verilmelidir.`
      },
      {
        question: `Affiliate veya ticari kullanım açısından fark var mı?`,
        answer: `En doğru karar yalnızca fiyat değil, hangi aracın daha hızlı satılabilir çıktı ürettiğine göre verilir. Bu nedenle güçlü yönler ve sınırlamalar bölümünü birlikte değerlendirmek daha sağlıklıdır.`
      }
    ];
  }

  return [
    {
      question: `${leftTool.name} or ${rightTool.name}: which makes more sense?`,
      answer: `${leftTool.name} may be the better fit for ${leftTool.bestUseCase.toLowerCase()}, while ${rightTool.name} may work better when ${rightTool.bestUseCase.toLowerCase()} matters more.`
    },
    {
      question: `Which one should a beginner try first?`,
      answer: `${leftTool.pricing !== "PAID" ? leftTool.name : rightTool.name} may be easier to start with because the barrier is lower, but the real decision should still follow the workflow you care about.`
    },
    {
      question: `Is there a meaningful commercial difference?`,
      answer: `The better decision usually depends less on the sticker price and more on which tool creates faster sellable output in your workflow.`
    }
  ];
}

function getBetterMatchedPairTool(alternative: LocalizedTool, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  const leftScore = leftTool.toolCategorySlugs.filter((slug) => alternative.toolCategorySlugs.includes(slug)).length;
  const rightScore = rightTool.toolCategorySlugs.filter((slug) => alternative.toolCategorySlugs.includes(slug)).length;

  return leftScore >= rightScore ? leftTool : rightTool;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getStaticComparisonPairSlugs().map((pair) => ({
      locale,
      pair
    }))
  );
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

  const safeLocale = locale as Locale;
  const comparison = getComparisonToolsFromPair(safeLocale, pair);

  if (!comparison) {
    return {};
  }

  const canonicalPath = `/${safeLocale}/compare/${comparison.canonicalPairSlug}`;
  const title = buildComparisonTitle(safeLocale, comparison.leftTool, comparison.rightTool);
  const description = buildComparisonDescription(safeLocale, comparison.leftTool, comparison.rightTool);

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(canonicalPath)
    },
    openGraph: {
      type: "website",
      url: buildCanonicalUrl(canonicalPath),
      title,
      description
    }
  };
}

export default async function ComparisonPage({
  params
}: {
  params: Promise<{ locale: string; pair: string }>;
}) {
  const { locale, pair } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const dictionary = copy[safeLocale];
  const comparison = getComparisonToolsFromPair(safeLocale, pair);

  if (!comparison) {
    notFound();
  }

  if (!comparison.isCanonical) {
    redirect(`/${safeLocale}/compare/${comparison.canonicalPairSlug}`);
  }

  const { leftTool, rightTool, canonicalPairSlug } = comparison;
  const content = getCatalogContent(safeLocale);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const comparisonRows = buildComparisonRows(safeLocale, leftTool, rightTool);
  const comparisonFaq = buildComparisonFaq(safeLocale, leftTool, rightTool);
  const alternatives = getComparisonAlternativeTools(safeLocale, leftTool.slug, rightTool.slug, 4);
  const relatedBlogArticles = getComparisonRelatedBlogSlugsForSlugs([leftTool.slug, rightTool.slug], 3)
    .map((slug) => getLocalizedBlogArticleBySlug(safeLocale, slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
  const title = buildComparisonTitle(safeLocale, leftTool, rightTool);
  const relatedAlternativePages = [leftTool, rightTool].map((tool) => ({
    label: safeLocale === "tr" ? `${tool.name} alternatifleri` : `${tool.name} alternatives`,
    href: `/${safeLocale}/alternatives/${tool.slug}`
  }));
  const description = buildComparisonDescription(safeLocale, leftTool, rightTool);
  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/compare/${canonicalPairSlug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dictionary.breadcrumbsHome,
        item: `https://deciply.com/${safeLocale}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dictionary.breadcrumbsCompare,
        item: `https://deciply.com/${safeLocale}/compare/${canonicalPairSlug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${leftTool.name} vs ${rightTool.name}`,
        item: canonicalUrl
      }
    ]
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: safeLocale
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparisonFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: dictionary.breadcrumbsHome, href: `/${safeLocale}` },
            { label: dictionary.breadcrumbsTools, href: `/${safeLocale}/tools` },
            { label: dictionary.breadcrumbsCompare }
          ]}
        />

        <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                {dictionary.eyebrow}
              </Badge>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="accent">{formatPricing(leftTool.pricing, safeLocale)}</Badge>
                <Badge>{leftTool.name}</Badge>
                <Badge>{rightTool.name}</Badge>
              </div>
              <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.5rem] lg:leading-[1.03]">
                {leftTool.name} vs {rightTool.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{buildHeroIntro(safeLocale, leftTool, rightTool)}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">{dictionary.heroSummary}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {leftTool.name}: {leftTool.rating.toFixed(1)}/5
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {rightTool.name}: {rightTool.rating.toFixed(1)}/5
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <PremiumButton href={`/${safeLocale}/tools/${leftTool.slug}`} className="w-full">
                  {leftTool.name}
                </PremiumButton>
                <PremiumButton href={`/${safeLocale}/tools/${rightTool.slug}`} className="w-full" variant="secondary">
                  {rightTool.name}
                </PremiumButton>
              </div>
            </div>
          </div>
        </section>

        <ComparisonBreakdownTable
          locale={safeLocale}
          title={dictionary.tableTitle}
          description={dictionary.tableDescription}
          columns={{
            label: dictionary.tableLabels.criteria,
            left: leftTool.name,
            right: rightTool.name
          }}
          rows={comparisonRows}
        />

        <InfoSection title={dictionary.bestForTitle} description={dictionary.bestForDescription}>
          <div className="grid gap-4 md:grid-cols-2">
            {[leftTool, rightTool].map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-100">{tool.bestUseCase}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{tool.whoShouldUseSummary}</p>
                <div className="mt-5">
                  <PremiumButton href={`/${safeLocale}/tools/${tool.slug}`} variant="ghost" className="w-full">
                    {dictionary.primaryCta}
                  </PremiumButton>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title={dictionary.pricingTitle} description={dictionary.pricingDescription}>
          <div className="grid gap-4 md:grid-cols-2">
            {[leftTool, rightTool].map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                <p className="mt-3 text-lg font-semibold text-slate-100">{formatPricing(tool.pricing, safeLocale)}</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{dictionary.pricingFreeStart}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {tool.pricing === "PAID"
                        ? safeLocale === "tr"
                          ? "Doğrudan ücretli giriş gerektirir."
                          : "Starts as a paid product."
                        : safeLocale === "tr"
                          ? "Ücretsiz veya freemium giriş sunar."
                          : "Offers a free or freemium starting point."}
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{dictionary.pricingCommercial}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{tool.moneyUseCases[0]?.description ?? tool.realUseCaseExample.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <SectionShell
          eyebrow={dictionary.strengthsTitle}
          title={dictionary.strengthsTitle}
          description={dictionary.strengthsDescription}
          className="px-0 sm:px-0 lg:px-0"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ProsConsCard title={`${leftTool.name} ${dictionary.strengthsTitle.toLowerCase()}`} items={leftTool.pros} tone="positive" />
            <ProsConsCard title={`${rightTool.name} ${dictionary.strengthsTitle.toLowerCase()}`} items={rightTool.pros} tone="positive" />
          </div>
        </SectionShell>

        <SectionShell
          eyebrow={dictionary.limitationsTitle}
          title={dictionary.limitationsTitle}
          description={dictionary.limitationsDescription}
          className="px-0 sm:px-0 lg:px-0"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ProsConsCard title={`${leftTool.name} ${dictionary.limitationsTitle.toLowerCase()}`} items={leftTool.cons} tone="negative" />
            <ProsConsCard title={`${rightTool.name} ${dictionary.limitationsTitle.toLowerCase()}`} items={rightTool.cons} tone="negative" />
          </div>
        </SectionShell>

        <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{dictionary.verdictTitle}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{dictionary.verdictTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{dictionary.verdictDescription}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <PremiumButton href={`/${safeLocale}/tools/${leftTool.slug}`} className="w-full">
                {leftTool.name}
              </PremiumButton>
              <PremiumButton href={`/${safeLocale}/tools/${rightTool.slug}`} className="w-full" variant="secondary">
                {rightTool.name}
              </PremiumButton>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-slate-100">{leftTool.name}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{dictionary.verdictLeftTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{leftTool.realUseCaseExample.description}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-slate-100">{rightTool.name}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{dictionary.verdictRightTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{rightTool.realUseCaseExample.description}</p>
            </div>
          </div>
        </section>

        {alternatives.length ? (
          <InfoSection title={dictionary.relatedAlternativesTitle} description={dictionary.relatedAlternativesDescription}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {alternatives.map((tool) => {
                const matchedTool = getBetterMatchedPairTool(tool, leftTool, rightTool);

                return (
                  <ToolCard
                    key={tool.slug}
                    locale={safeLocale}
                    tool={tool}
                    categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
                    pricingLabel={formatPricing(tool.pricing, safeLocale)}
                    detailLabel={content.common.viewDetailsLabel}
                    bestForLabel={safeLocale === "tr" ? "En uygun" : "Best fit"}
                    useCaseLabel={tool.bestUseCase}
                    compareHref={buildComparisonPath(safeLocale, tool.slug, matchedTool.slug)}
                  />
                );
              })}
            </div>
          </InfoSection>
        ) : null}

        {alternatives.length ? (
          <SectionShell
            eyebrow={dictionary.relatedComparisonsTitle}
            title={dictionary.relatedComparisonsTitle}
            description={dictionary.relatedComparisonsDescription}
            className="px-0 sm:px-0 lg:px-0"
            contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {alternatives.slice(0, 3).map((tool) => {
              const matchedTool = getBetterMatchedPairTool(tool, leftTool, rightTool);
              const compareHref = buildComparisonPath(safeLocale, tool.slug, matchedTool.slug);

              return (
                <div key={tool.slug} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-100">{matchedTool.name} {safeLocale === "tr" ? "ile karşılaştır" : "comparison"}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{safeLocale === "tr" ? "İlgili compare sayfasını açarak farklı kullanım ve fiyat sinyallerini yan yana görün." : "Open the related comparison page to review use-case and pricing signals side by side."}</p>
                  <div className="mt-5">
                    <PremiumButton href={compareHref} className="w-full" variant="secondary">
                      {dictionary.compareLabel}
                    </PremiumButton>
                  </div>
                </div>
              );
            })}
          </SectionShell>
        ) : null}

        {relatedBlogArticles.length ? (
          <SectionShell
            eyebrow={dictionary.relatedBlogsTitle}
            title={dictionary.relatedBlogsTitle}
            description={dictionary.relatedBlogsDescription}
            className="px-0 sm:px-0 lg:px-0"
            contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {relatedBlogArticles.map((article) => (
              <BlogCard
                key={article.slug}
                locale={safeLocale}
                article={article}
                ctaLabel={dictionary.relatedBlogCtaLabel}
              />
            ))}
          </SectionShell>
        ) : null}

        <InfoSection
          title={safeLocale === "tr" ? "İlgili alternatifler" : "Related alternatives"}
          description={
            safeLocale === "tr"
              ? "Bu karşılaştırmayı açtıktan sonra ilgili alternatif sayfalarını da inceleyin."
              : "Review the related alternatives pages after this comparison."
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {relatedAlternativePages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
              >
                <p className="text-sm font-semibold text-cyan-300">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {safeLocale === "tr" ? "Alternatifleri, fiyat farkını ve kullanım alanını ayrı sayfada görün." : "Review alternatives, pricing differences, and workflow fit on a dedicated page."}
                </p>
              </Link>
            ))}
          </div>
        </InfoSection>

        <ComparisonFaq title={dictionary.faqTitle} description={dictionary.faqDescription} items={comparisonFaq} />
      </div>
    </>
  );
}
