import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { InfoSection } from "@/components/catalog/info-section";
import { ProsConsCard } from "@/components/catalog/pros-cons-card";
import { ToolCard } from "@/components/catalog/tool-card";
import { ComparisonBreakdownTable } from "@/components/comparison/comparison-breakdown-table";
import { ComparisonDecisionBoxes } from "@/components/comparison/comparison-decision-boxes";
import { ComparisonFaq } from "@/components/comparison/comparison-faq";
import { ComparisonActionGrid } from "@/components/comparison/comparison-action-grid";
import { ComparisonInsightPanel } from "@/components/comparison/comparison-insight-panel";
import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/ui/rating-badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionJumpNav } from "@/components/ui/section-jump-nav";
import type { ComparisonFaqItem, ComparisonRow } from "@/data/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import {
  buildComparisonPath,
  getComparisonAlternativeTools,
  getComparisonRelatedBlogSlugsForSlugs,
  getComparisonToolsFromPair,
  getStaticComparisonPairSlugs,
  parseComparisonPairSlug,
  SPECIAL_TEAM_COMPARISON_SLUG
} from "@/lib/comparisons";
import { getLocalizedBlogArticleBySlug } from "@/lib/blog";
import { formatPricing, getCatalogContent, getCategoryNamesMap, getToolOutboundUrl } from "@/lib/catalog";
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

function buildComparisonTitle(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool, pair?: string) {
  if (pair === SPECIAL_TEAM_COMPARISON_SLUG) {
    return locale === "tr"
      ? `${leftTool.name} vs ${rightTool.name} ekipler için karşılaştırma (2026)`
      : `${leftTool.name} vs ${rightTool.name} for teams (2026)`;
  }

  return locale === "tr"
    ? `${leftTool.name} vs ${rightTool.name} karşılaştırması (2026)`
    : `${leftTool.name} vs ${rightTool.name} Comparison (2026)`;
}

function buildComparisonDescription(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool, pair?: string) {
  if (pair === SPECIAL_TEAM_COMPARISON_SLUG) {
    return locale === "tr"
      ? `${leftTool.name} ve ${rightTool.name} için ekip odaklı kullanım, fiyat ve iş akışı farklarını inceleyin.`
      : `Compare ${leftTool.name} and ${rightTool.name} through a team-focused workflow lens, including pricing and practical fit.`;
  }

  return locale === "tr"
    ? `${leftTool.name} ve ${rightTool.name} için fiyat, güçlü yönler, sınırlamalar, kullanım senaryoları ve final verdict özetini inceleyin.`
    : `Compare ${leftTool.name} and ${rightTool.name} across pricing, strengths, limitations, best-fit workflows, and final verdict.`;
}

function buildHeroIntro(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  return locale === "tr"
    ? `${leftTool.name} ve ${rightTool.name} arasındaki farkı iş akışı, fiyat, çıktı kalitesi ve hız üzerinden değerlendirin.`
    : `Evaluate ${leftTool.name} and ${rightTool.name} through workflow fit, pricing, output quality, and speed.`;
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
        question: `Hangi iş akışı hangi araca daha yakın?`,
        answer: `${leftTool.name} ${leftTool.bestUseCase.toLowerCase()} tarafında, ${rightTool.name} ise ${rightTool.bestUseCase.toLowerCase()} tarafında daha doğal hissedebilir. En iyi seçim, bugünkü iş akışına en az sürtünme ekleyen araçtır.`
      },
      {
        question: `Yeni başlayan biri ilk olarak neye bakmalı?`,
        answer: `Önce fiyat etiketinden çok, ilk 10 dakikada hangi aracın daha rahat başladığına bakın. Kolay başlangıç ve net çıktı çoğu zaman daha iyi sinyal verir.`
      },
      {
        question: `Fiyat mı, çıktı kalitesi mi, hız mı?`,
        answer: `Üçü de önemlidir ama doğru seçim genelde tek bir metrikten çıkmaz. Hız, kalite ve tekrar üretilebilirlik birlikte değerlendirilmelidir.`
      },
      {
        question: `Ekip veya creator işleri için neye dikkat edilmeli?`,
        answer: `Tutarlı çıktı, paylaşılabilir kullanım ve aynı brief üzerinde tekrar eden testler, ekip ve creator kararlarını daha güvenilir hale getirir.`
      }
    ];
  }

  return [
    {
      question: `Which workflow is closer to each tool?`,
      answer: `${leftTool.name} may feel more natural for ${leftTool.bestUseCase.toLowerCase()}, while ${rightTool.name} may align better with ${rightTool.bestUseCase.toLowerCase()}. The best choice is the one that adds the least friction to today's workflow.`
    },
    {
      question: `What should a beginner check first?`,
      answer: `Start with the first 10 minutes of use rather than the sticker price. Ease of start and clear output often provide the strongest signal.`
    },
    {
      question: `What matters most: price, quality, or speed?`,
      answer: `All three matter, but the right choice usually comes from the combination rather than a single metric. Review speed, quality, and repeatability together.`
    },
    {
      question: `What matters most for teams or creators?`,
      answer: `Consistent output, shareable usage, and repeated tests on the same brief make team and creator decisions more reliable.`
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
  const title = buildComparisonTitle(safeLocale, comparison.leftTool, comparison.rightTool, pair);
  const description = buildComparisonDescription(safeLocale, comparison.leftTool, comparison.rightTool, pair);

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(`/compare/${comparison.canonicalPairSlug}`)
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
  const alternatives = getComparisonAlternativeTools(safeLocale, leftTool.slug, rightTool.slug, 6);
  const relatedBlogArticles = getComparisonRelatedBlogSlugsForSlugs([leftTool.slug, rightTool.slug], 3)
    .map((slug) => getLocalizedBlogArticleBySlug(safeLocale, slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
  const title = buildComparisonTitle(safeLocale, leftTool, rightTool, pair);
  const relatedAlternativePages = [leftTool, rightTool].map((tool) => ({
    label: safeLocale === "tr" ? `${tool.name} alternatifleri` : `${tool.name} alternatives`,
    href: `/${safeLocale}/alternatives/${tool.slug}`
  }));
  const compareAlternativesHref = relatedAlternativePages[0]?.href ?? `/${safeLocale}/alternatives/${leftTool.slug}`;
  const leftOfficialHref = getToolOutboundUrl(leftTool);
  const rightOfficialHref = getToolOutboundUrl(rightTool);
  const relatedBlogHref = relatedBlogArticles[0] ? `/${safeLocale}/blog/${relatedBlogArticles[0].slug}` : `/${safeLocale}/blog`;
  const sectionNavItems = [
    { label: safeLocale === "tr" ? "Genel Bakış" : "Overview", href: "#genel-bakis" },
    { label: safeLocale === "tr" ? "Özellikler" : "Features", href: "#ozellikler" },
    { label: safeLocale === "tr" ? "Fiyat" : "Pricing", href: "#fiyat" },
    { label: safeLocale === "tr" ? "Son Karar" : "Final verdict", href: "#son-karar" },
    { label: safeLocale === "tr" ? "Alternatifler" : "Alternatives", href: "#alternatifler" },
    { label: safeLocale === "tr" ? "FAQ" : "FAQ", href: "#faq" }
  ];
  const insightSlides = [
    {
      eyebrow: safeLocale === "tr" ? "Hızlı karar" : "Quick decision",
      title: safeLocale === "tr" ? "Hangi araç daha rahat başlatıyor?" : "Which tool starts faster?",
      description:
        safeLocale === "tr"
          ? `${leftTool.name} kısa taslak ve geniş kullanım için, ${rightTool.name} ise daha uzun ve düzenli metin akışları için daha doğal hissedebilir.`
          : `${leftTool.name} may feel better for short drafts and broad tasks, while ${rightTool.name} can feel more natural for longer, more structured output.`,
      badges: [`${leftTool.name} ${leftTool.rating.toFixed(1)}/5`, `${rightTool.name} ${rightTool.rating.toFixed(1)}/5`]
    },
    {
      eyebrow: safeLocale === "tr" ? "Fiyat sinyali" : "Pricing signal",
      title: safeLocale === "tr" ? "Ücretsiz başlangıç mı, ücretli derinlik mi?" : "Free start or paid depth?",
      description:
        safeLocale === "tr"
          ? `Fiyat tarafında ${leftTool.name} ${formatPricing(leftTool.pricing, safeLocale)} ile, ${rightTool.name} ise ${formatPricing(rightTool.pricing, safeLocale)} ile öne çıkabilir.`
          : `On pricing, ${leftTool.name} shows a ${formatPricing(leftTool.pricing, safeLocale)} path, while ${rightTool.name} follows a ${formatPricing(rightTool.pricing, safeLocale)} model.`,
      badges: [formatPricing(leftTool.pricing, safeLocale), formatPricing(rightTool.pricing, safeLocale)]
    },
    {
      eyebrow: safeLocale === "tr" ? "Workflow uyumu" : "Workflow fit",
      title: safeLocale === "tr" ? "Hangi iş akışı hangi araca daha yakın?" : "Which workflow fits which tool?",
      description:
        safeLocale === "tr"
          ? `${leftTool.bestUseCase} ile ${rightTool.bestUseCase} arasında seçim yaparken, hız, çıktı düzeni ve revizyon sayısı en iyi sinyali verir.`
          : `When choosing between ${leftTool.bestUseCase} and ${rightTool.bestUseCase}, speed, output structure, and revision load usually give the clearest signal.`,
      badges: [leftTool.bestUseCase, rightTool.bestUseCase]
    }
  ];
  const description = buildComparisonDescription(safeLocale, leftTool, rightTool, pair);
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

        <section className="rounded-[36px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.9),rgba(10,16,30,0.96),rgba(6,10,18,0.99))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
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

            <ComparisonInsightPanel
              locale={safeLocale}
              slides={insightSlides}
              tools={[
                {
                  name: leftTool.name,
                  openHref: leftOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${leftTool.slug}`
                },
                {
                  name: rightTool.name,
                  openHref: rightOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${rightTool.slug}`
                }
              ]}
              neutralHref={`/${safeLocale}/categories/comparisons`}
            />
          </div>
        </section>

        <SectionJumpNav items={sectionNavItems} />

        <div id="ozellikler" className="scroll-mt-24">
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
        </div>

        <div id="son-karar" className="scroll-mt-24">
          <ComparisonDecisionBoxes
            locale={safeLocale}
            leftTool={leftTool}
            rightTool={rightTool}
            alternativesHref={compareAlternativesHref}
          />
        </div>

        <InfoSection title={dictionary.bestForTitle} description={dictionary.bestForDescription}>
          <div className="grid gap-4 md:grid-cols-2">
            {[leftTool, rightTool].map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-sky-400/10 bg-slate-950/60 p-5 shadow-[0_16px_48px_-30px_rgba(14,165,233,0.1)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-100">{tool.bestUseCase}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{tool.whoShouldUseSummary}</p>
                <div className="mt-5">
                  <PremiumButton href={`/${safeLocale}/tools/${tool.slug}`} variant="secondary" className="w-full">
                    {safeLocale === "tr" ? tool.name + " incele" : "Review " + tool.name}
                  </PremiumButton>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>        <InfoSection id="fiyat" title={dictionary.pricingTitle} description={dictionary.pricingDescription}>
          <div className="grid gap-4 md:grid-cols-2">
            {[leftTool, rightTool].map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-sky-400/10 bg-slate-950/60 p-5 shadow-[0_16px_48px_-30px_rgba(14,165,233,0.1)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                <p className="mt-3 text-lg font-semibold text-slate-100">{formatPricing(tool.pricing, safeLocale)}</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-[20px] border border-sky-400/10 bg-slate-950/40 p-4">
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
                  <div className="rounded-[20px] border border-sky-400/10 bg-slate-950/40 p-4">
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

        <section className="rounded-[34px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(10,16,30,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{dictionary.verdictTitle}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{dictionary.verdictTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{dictionary.verdictDescription}</p>
            </div>
            <ComparisonActionGrid
              locale={safeLocale}
              tools={[
                {
                  name: leftTool.name,
                  openHref: leftOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${leftTool.slug}`
                },
                {
                  name: rightTool.name,
                  openHref: rightOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${rightTool.slug}`
                }
              ]}
              neutralHref={`/${safeLocale}/categories/comparisons`}
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-slate-100">{leftTool.name}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{dictionary.verdictLeftTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{leftTool.realUseCaseExample.description}</p>
            </div>
            <div className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5">
              <p className="text-sm font-semibold text-slate-100">{rightTool.name}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{dictionary.verdictRightTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{rightTool.realUseCaseExample.description}</p>
            </div>
          </div>
        </section>

        <section className="rounded-[34px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(10,16,30,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{safeLocale === "tr" ? "Dönüşüm odaklı karar" : "Conversion-ready decision"}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{safeLocale === "tr" ? "Bir sonraki adımı şimdi seçin" : "Choose the next step now"}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{safeLocale === "tr" ? "Üstteki sırayı koruyun: önce aç, sonra incele, en son alternatifleri karşılaştır." : "Keep the order clear: open first, review second, compare alternatives last."}</p>
            </div>
            <ComparisonActionGrid
              locale={safeLocale}
              tools={[
                {
                  name: leftTool.name,
                  openHref: leftOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${leftTool.slug}`
                },
                {
                  name: rightTool.name,
                  openHref: rightOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${rightTool.slug}`
                }
              ]}
              neutralHref={`/${safeLocale}/categories/comparisons`}
            />
          </div>
        </section>

        {alternatives.length ? (
          <InfoSection id="alternatifler" title={dictionary.relatedAlternativesTitle} description={dictionary.relatedAlternativesDescription}>
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
            {alternatives.slice(0, 6).map((tool) => {
              const matchedTool = getBetterMatchedPairTool(tool, leftTool, rightTool);
              const compareHref = buildComparisonPath(safeLocale, tool.slug, matchedTool.slug);

              return (
                <div key={tool.slug} className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5">
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
                className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5 transition hover:border-cyan-400/30 hover:bg-slate-950/72"
              >
                <p className="text-sm font-semibold text-cyan-300">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {safeLocale === "tr" ? "Alternatifleri, fiyat farkını ve kullanım alanını ayrı sayfada görün." : "Review alternatives, pricing differences, and workflow fit on a dedicated page."}
                </p>
              </Link>
            ))}
          </div>
        </InfoSection>

        <div id="faq" className="scroll-mt-24">
          <ComparisonFaq title={dictionary.faqTitle} description={dictionary.faqDescription} items={comparisonFaq} />
        </div>
      </div>
    </>
  );
}
































