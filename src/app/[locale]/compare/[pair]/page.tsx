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
import { ComparisonCtaPanel } from "@/components/comparison/comparison-cta-panel";
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
  parseComparisonPairSlug,
  SPECIAL_TEAM_COMPARISON_SLUG
} from "@/lib/comparisons";
import { getLocalizedBlogArticleBySlug } from "@/lib/blog";
import { formatPricing, getCatalogContent, getCategoryNamesMap, getToolOutboundUrl } from "@/lib/catalog";
import type { LocalizedTool } from "@/types/catalog";
const copy = {
  tr: {
    compareLabel: "KarÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±r",
    breadcrumbsHome: "Ana sayfa",
    breadcrumbsTools: "AraÃƒÂ§lar",
    breadcrumbsCompare: "KarÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmalar",
    eyebrow: "Karar odaklÃ„Â± karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rma",
    heroSummary: "Bu karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rma; kullanÃ„Â±m alanÃ„Â±, fiyat, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ yÃƒÂ¶nler ve sÃ„Â±nÃ„Â±rlamalar ÃƒÂ¼zerinden daha net karar vermeniz iÃƒÂ§in hazÃ„Â±rlandÃ„Â±.",
    primaryCta: "AracÃ„Â± incele",
    tableTitle: "Yan yana karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rma",
    tableDescription: "Ã„Â°ki aracÃ„Â± temel karar kriterleriyle aynÃ„Â± tabloda gÃƒÂ¶rÃƒÂ¼n.",
    bestForTitle: "Hangi araÃƒÂ§ kimler iÃƒÂ§in daha uygun?",
    bestForDescription: "En iyi kullanÃ„Â±m senaryosunu ve kullanÃ„Â±cÃ„Â± profilini hÃ„Â±zlÃ„Â±ca karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rÃ„Â±n.",
    pricingTitle: "Fiyat karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmasÃ„Â±",
    pricingDescription: "ÃƒÅ“cretsiz baÃ…Å¸lama imkanÃ„Â±, fiyat modeli ve ticari kullanÃ„Â±m aÃƒÂ§Ã„Â±sÃ„Â±ndan farklarÃ„Â± gÃƒÂ¶rÃƒÂ¼n.",
    strengthsTitle: "GÃƒÂ¼ÃƒÂ§lÃƒÂ¼ yÃƒÂ¶nler",
    strengthsDescription: "Her iki aracÃ„Â±n ÃƒÂ¶ne ÃƒÂ§Ã„Â±ktÃ„Â±Ã„Å¸Ã„Â± alanlarÃ„Â± ayrÃ„Â± ayrÃ„Â± deÃ„Å¸erlendirin.",
    limitationsTitle: "SÃ„Â±nÃ„Â±rlamalar",
    limitationsDescription: "Karar vermeden ÃƒÂ¶nce darboÃ„Å¸az yaratabilecek noktalarÃ„Â± gÃƒÂ¶rÃƒÂ¼n.",
    verdictTitle: "Son karar",
    verdictDescription: "KazananÃ„Â± zorla seÃƒÂ§mek yerine hangi senaryoda hangi aracÃ„Â±n daha mantÃ„Â±klÃ„Â± olduÃ„Å¸unu ÃƒÂ¶zetler.",
    relatedComparisonsTitle: "Ã„Â°lgili karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmalar",
    relatedComparisonsDescription: "KÃ„Â±yaslama alanÃ„Â±nÃ„Â± geniÃ…Å¸letmek iÃƒÂ§in bu benzer karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmalarÃ„Â± da aÃƒÂ§Ã„Â±n.",
    relatedBlogsTitle: "Ã„Â°lgili bloglar",
    relatedBlogsDescription: "KararÃ„Â± daha geniÃ…Å¸ bir iÃƒÂ§erik kÃƒÂ¼mesiyle desteklemek iÃƒÂ§in bu rehberleri de inceleyin.",
    relatedBlogCtaLabel: "Rehberi oku",
    relatedAlternativesTitle: "Ã„Â°lgili alternatifler",
    relatedAlternativesDescription: "Karar alanÃ„Â±nÃ„Â± biraz daha daraltmak isterseniz bu araÃƒÂ§lara da gÃƒÂ¶z atÃ„Â±n.",
    faqTitle: "SÃ„Â±k sorulan sorular",
    faqDescription: "Bu comparison sayfasÃ„Â±nda en sÃ„Â±k sorulan karar sorularÃ„Â±na kÃ„Â±sa cevaplar.",
    tableLabels: {
      criteria: "Kriter",
      bestFor: "En uygun kullanÃ„Â±m",
      pricing: "Fiyat modeli",
      whatItDoes: "Ne yapar",
      whoShouldUse: "Kim kullanmalÃ„Â±",
      strengths: "GÃƒÂ¼ÃƒÂ§lÃƒÂ¼ yÃƒÂ¶nler",
      limitations: "SÃ„Â±nÃ„Â±rlamalar",
      realUseCase: "GerÃƒÂ§ek kullanÃ„Â±m ÃƒÂ¶rneÃ„Å¸i"
    },
    pricingFreeStart: "ÃƒÅ“cretsiz baÃ…Å¸langÃ„Â±ÃƒÂ§",
    pricingCommercial: "Ticari kullanÃ„Â±m aÃƒÂ§Ã„Â±sÃ„Â±ndan",
    verdictLeftTitle: "Ne zaman bu araÃƒÂ§ daha mantÃ„Â±klÃ„Â±?",
    verdictRightTitle: "Ne zaman diÃ„Å¸er araÃƒÂ§ daha mantÃ„Â±klÃ„Â±?"
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
      ? `${leftTool.name} vs ${rightTool.name} ekipler iÃƒÂ§in karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rma (2026)`
      : `${leftTool.name} vs ${rightTool.name} for teams (2026)`;
  }

  return locale === "tr"
    ? `${leftTool.name} vs ${rightTool.name} karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmasÃ„Â± (2026)`
    : `${leftTool.name} vs ${rightTool.name} Comparison (2026)`;
}

function buildComparisonDescription(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool, pair?: string) {
  if (pair === SPECIAL_TEAM_COMPARISON_SLUG) {
    return locale === "tr"
      ? `${leftTool.name} ve ${rightTool.name} iÃƒÂ§in ekip odaklÃ„Â± kullanÃ„Â±m, fiyat ve iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± farklarÃ„Â±nÃ„Â± inceleyin.`
      : `Compare ${leftTool.name} and ${rightTool.name} through a team-focused workflow lens, including pricing and practical fit.`;
  }

  return locale === "tr"
    ? `${leftTool.name} ve ${rightTool.name} iÃƒÂ§in fiyat, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ yÃƒÂ¶nler, sÃ„Â±nÃ„Â±rlamalar, kullanÃ„Â±m senaryolarÃ„Â± ve final verdict ÃƒÂ¶zetini inceleyin.`
    : `Compare ${leftTool.name} and ${rightTool.name} across pricing, strengths, limitations, best-fit workflows, and final verdict.`;
}

function buildHeroIntro(locale: Locale, leftTool: LocalizedTool, rightTool: LocalizedTool) {
  return locale === "tr"
    ? `${leftTool.name} ve ${rightTool.name} arasÃ„Â±ndaki farkÃ„Â± iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±, fiyat, ÃƒÂ§Ã„Â±ktÃ„Â± kalitesi ve hÃ„Â±z ÃƒÂ¼zerinden deÃ„Å¸erlendirin.`
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
        question: `Hangi iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â± hangi araca daha yakÃ„Â±n?`,
        answer: `${leftTool.name} ${leftTool.bestUseCase.toLowerCase()} tarafÃ„Â±nda, ${rightTool.name} ise ${rightTool.bestUseCase.toLowerCase()} tarafÃ„Â±nda daha doÃ„Å¸al hissedebilir. En iyi seÃƒÂ§im, bugÃƒÂ¼nkÃƒÂ¼ iÃ…Å¸ akÃ„Â±Ã…Å¸Ã„Â±na en az sÃƒÂ¼rtÃƒÂ¼nme ekleyen araÃƒÂ§tÃ„Â±r.`
      },
      {
        question: `Yeni baÃ…Å¸layan biri ilk olarak neye bakmalÃ„Â±?`,
        answer: `Ãƒ�€“nce fiyat etiketinden ÃƒÂ§ok, ilk 10 dakikada hangi aracÃ„Â±n daha rahat baÃ…Å¸ladÃ„Â±Ã„Å¸Ã„Â±na bakÃ„Â±n. Kolay baÃ…Å¸langÃ„Â±ÃƒÂ§ ve net ÃƒÂ§Ã„Â±ktÃ„Â± ÃƒÂ§oÃ„Å¸u zaman daha iyi sinyal verir.`
      },
      {
        question: `Fiyat mÃ„Â±, ÃƒÂ§Ã„Â±ktÃ„Â± kalitesi mi, hÃ„Â±z mÃ„Â±?`,
        answer: `ÃƒÅ“ÃƒÂ§ÃƒÂ¼ de ÃƒÂ¶nemlidir ama doÃ„Å¸ru seÃƒÂ§im genelde tek bir metrikten ÃƒÂ§Ã„Â±kmaz. HÃ„Â±z, kalite ve tekrar ÃƒÂ¼retilebilirlik birlikte deÃ„Å¸erlendirilmelidir.`
      },
      {
        question: `Ekip veya creator iÃ…Å¸leri iÃƒÂ§in neye dikkat edilmeli?`,
        answer: `TutarlÃ„Â± ÃƒÂ§Ã„Â±ktÃ„Â±, paylaÃ…Å¸Ã„Â±labilir kullanÃ„Â±m ve aynÃ„Â± brief ÃƒÂ¼zerinde tekrar eden testler, ekip ve creator kararlarÃ„Â±nÃ„Â± daha gÃƒÂ¼venilir hale getirir.`
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

            <ComparisonCtaPanel
              locale={safeLocale}
              tools={[
                {
                  name: leftTool.name,
                  rating: leftTool.rating,
                  openHref: leftOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${leftTool.slug}`
                },
                {
                  name: rightTool.name,
                  rating: rightTool.rating,
                  openHref: rightOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${rightTool.slug}`
                }
              ]}
              neutralHref={`/${safeLocale}/categories/comparisons`}
              className="w-full"
            />
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

        <ComparisonDecisionBoxes
          locale={safeLocale}
          leftTool={leftTool}
          rightTool={rightTool}
          alternativesHref={compareAlternativesHref}
        />

        <InfoSection title={dictionary.bestForTitle} description={dictionary.bestForDescription}>
          <div className="grid gap-4 md:grid-cols-2">
            {[leftTool, rightTool].map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]">
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
                          ? "DoÃ„Å¸rudan ÃƒÂ¼cretli giriÃ…Å¸ gerektirir."
                          : "Starts as a paid product."
                        : safeLocale === "tr"
                          ? "ÃƒÅ“cretsiz veya freemium giriÃ…Å¸ sunar."
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
            <ComparisonCtaPanel
              locale={safeLocale}
              tools={[
                {
                  name: leftTool.name,
                  rating: leftTool.rating,
                  openHref: leftOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${leftTool.slug}`
                },
                {
                  name: rightTool.name,
                  rating: rightTool.rating,
                  openHref: rightOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${rightTool.slug}`
                }
              ]}
              neutralHref={`/${safeLocale}/categories/comparisons`}
              className="w-full"
            />
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

        <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{safeLocale === "tr" ? "DÃƒÂ¶nÃƒÂ¼Ã…Å¸ÃƒÂ¼m odaklÃ„Â± karar" : "Conversion-ready decision"}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{safeLocale === "tr" ? "Bir sonraki adÃ„Â±mÃ„Â± Ã…Å¸imdi seÃƒÂ§in" : "Choose the next step now"}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{safeLocale === "tr" ? "ÃƒÅ“stteki sÃ„Â±rayÃ„Â± koruyun: ÃƒÂ¶nce aÃƒÂ§, sonra incele, en son alternatifleri karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±r." : "Keep the order clear: open first, review second, compare alternatives last."}</p>
            </div>
            <ComparisonCtaPanel
              locale={safeLocale}
              tools={[
                {
                  name: leftTool.name,
                  rating: leftTool.rating,
                  openHref: leftOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${leftTool.slug}`
                },
                {
                  name: rightTool.name,
                  rating: rightTool.rating,
                  openHref: rightOfficialHref,
                  reviewHref: `/${safeLocale}/tools/${rightTool.slug}`
                }
              ]}
              neutralHref={`/${safeLocale}/categories/comparisons`}
              className="w-full"
            />
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
            {alternatives.slice(0, 6).map((tool) => {
              const matchedTool = getBetterMatchedPairTool(tool, leftTool, rightTool);
              const compareHref = buildComparisonPath(safeLocale, tool.slug, matchedTool.slug);

              return (
                <div key={tool.slug} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-100">{matchedTool.name} {safeLocale === "tr" ? "ile karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±r" : "comparison"}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{safeLocale === "tr" ? "Ã„Â°lgili compare sayfasÃ„Â±nÃ„Â± aÃƒÂ§arak farklÃ„Â± kullanÃ„Â±m ve fiyat sinyallerini yan yana gÃƒÂ¶rÃƒÂ¼n." : "Open the related comparison page to review use-case and pricing signals side by side."}</p>
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
          title={safeLocale === "tr" ? "Ã„Â°lgili alternatifler" : "Related alternatives"}
          description={
            safeLocale === "tr"
              ? "Bu karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmayÃ„Â± aÃƒÂ§tÃ„Â±ktan sonra ilgili alternatif sayfalarÃ„Â±nÃ„Â± da inceleyin."
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
                  {safeLocale === "tr" ? "Alternatifleri, fiyat farkÃ„Â±nÃ„Â± ve kullanÃ„Â±m alanÃ„Â±nÃ„Â± ayrÃ„Â± sayfada gÃƒÂ¶rÃƒÂ¼n." : "Review alternatives, pricing differences, and workflow fit on a dedicated page."}
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

























