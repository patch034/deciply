import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComparisonTriplePage as ComparisonTriplePageView } from "@/components/comparison/comparison-triple-page";
import { tripleComparisonContent, type ComparisonFaqItem } from "@/data/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale, normalizeLocale } from "@/i18n/config";
import {
  FEATURED_TRIPLE_COMPARISON_SLUG,
  FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS,
  getComparisonAlternativeToolsForSlugs
} from "@/lib/comparisons";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import { getLocalizedToolBySlug } from "@/lib/catalog";
import type { LocalizedTool } from "@/types/catalog";

type ComparisonThreeWayRow = {
  label: string;
  first: string;
  second: string;
  third: string;
};

function buildTripleComparisonRows(locale: Locale, firstTool: LocalizedTool, secondTool: LocalizedTool, thirdTool: LocalizedTool): ComparisonThreeWayRow[] {
  return [
    {
      label: locale === "tr" ? "En uygun" : "Best for",
      first: firstTool.bestUseCase,
      second: secondTool.bestUseCase,
      third: thirdTool.bestUseCase
    },
    {
      label: locale === "tr" ? "Fiyat" : "Pricing",
      first: firstTool.pricing,
      second: secondTool.pricing,
      third: thirdTool.pricing
    },
    {
      label: locale === "tr" ? "Ne yapar" : "What it does",
      first: firstTool.whatItActuallyDoes,
      second: secondTool.whatItActuallyDoes,
      third: thirdTool.whatItActuallyDoes
    },
    {
      label: locale === "tr" ? "Kim kullanmalı" : "Who should use it",
      first: firstTool.whoShouldUseSummary,
      second: secondTool.whoShouldUseSummary,
      third: thirdTool.whoShouldUseSummary
    },
    {
      label: locale === "tr" ? "Güçlü yanlar" : "Strengths",
      first: firstTool.pros.slice(0, 3).join(", "),
      second: secondTool.pros.slice(0, 3).join(", "),
      third: thirdTool.pros.slice(0, 3).join(", ")
    },
    {
      label: locale === "tr" ? "Sınırlamalar" : "Limitations",
      first: firstTool.cons.slice(0, 3).join(", "),
      second: secondTool.cons.slice(0, 3).join(", "),
      third: thirdTool.cons.slice(0, 3).join(", ")
    },
    {
      label: locale === "tr" ? "Gerçek kullanım" : "Real use case",
      first: firstTool.realUseCaseExample.title,
      second: secondTool.realUseCaseExample.title,
      third: thirdTool.realUseCaseExample.title
    }
  ];
}

function buildTripleComparisonFaq(locale: Locale, firstTool: LocalizedTool, secondTool: LocalizedTool, thirdTool: LocalizedTool): ComparisonFaqItem[] {
  if (locale === "tr") {
    return [
      {
        question: "Hız için hangisi daha mantıklı?",
        answer: `${firstTool.name}, ${secondTool.name} ve ${thirdTool.name} arasında hız odaklı seçim çoğu zaman kısa taslak ve çok amaçlı kullanım ihtiyacına göre değişir.`
      },
      {
        question: "Uzun form yazı için hangisi daha güçlü?",
        answer: `${secondTool.name} genelde daha uzun ve düzenli açıklama isteyen akışlarda öne çıkabilir; yine de son karar senin çıktı tipine bağlıdır.`
      },
      {
        question: "Google ekosistemi için hangisi daha uygun?",
        answer: `${thirdTool.name} çoğu kullanıcı için Google tabanlı iş akışlarında daha doğal hissedebilir ve bu yüzden ekosistem tarafında avantaj sunabilir.`
      },
      {
        question: "Fiyat farkı gerçekten kritik mi?",
        answer: "Fiyat kadar önemli olan, hangi aracın daha az revizyonla yayınlanabilir çıktı verdiğidir. Bu yüzden ücretten çok iş akışı uyumu daha belirleyicidir."
      }
    ];
  }

  return [
    {
      question: "Which tool is the fastest fit?",
      answer: `${firstTool.name}, ${secondTool.name}, and ${thirdTool.name} split the workflow differently, so the fastest fit depends on whether you want quick drafting or multi-purpose utility.`
    },
    {
      question: "Which one is strongest for long-form writing?",
      answer: `${secondTool.name} may feel strongest when structure and longer explanations matter more, but the final choice should still follow your output type.`
    },
    {
      question: "Which one fits the Google ecosystem best?",
      answer: `${thirdTool.name} may feel more natural inside Google-centered workflows and can be a stronger fit there.`
    },
    {
      question: "Is pricing the main deciding factor?",
      answer: "Pricing matters, but workflow fit usually matters more because it affects revision time and final output quality."
    }
  ];
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const content = localizeTree(safeLocale, tripleComparisonContent[getContentBaseLocale(safeLocale)]);
  const canonicalPath = `/${safeLocale}/compare/${FEATURED_TRIPLE_COMPARISON_SLUG}`;

  return {
    title: content.title,
    description: content.summary,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(`/compare/${FEATURED_TRIPLE_COMPARISON_SLUG}`)
    },
    openGraph: {
      type: "website",
      url: buildCanonicalUrl(canonicalPath),
      title: content.title,
      description: content.summary
    }
  };
}

export default async function TripleComparisonRoutePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const content = localizeTree(safeLocale, tripleComparisonContent[getContentBaseLocale(safeLocale)]);
  const firstTool = getLocalizedToolBySlug(safeLocale, FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS[0]);
  const secondTool = getLocalizedToolBySlug(safeLocale, FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS[1]);
  const thirdTool = getLocalizedToolBySlug(safeLocale, FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS[2]);

  if (!firstTool || !secondTool || !thirdTool) {
    notFound();
  }

  const tools: [LocalizedTool, LocalizedTool, LocalizedTool] = [firstTool, secondTool, thirdTool];
  const comparisonRows = buildTripleComparisonRows(safeLocale, firstTool, secondTool, thirdTool);
  const faqItems = buildTripleComparisonFaq(safeLocale, firstTool, secondTool, thirdTool);
  const alternatives = getComparisonAlternativeToolsForSlugs(safeLocale, [...FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS], 4);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: safeLocale === "tr" ? "Ana sayfa" : "Home",
        item: buildCanonicalUrl(`/${safeLocale}`)
      },
      {
        "@type": "ListItem",
        position: 2,
        name: safeLocale === "tr" ? "Araçlar" : "Tools",
        item: buildCanonicalUrl(`/${safeLocale}/tools`)
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.title,
        item: buildCanonicalUrl(`/${safeLocale}/compare/${FEATURED_TRIPLE_COMPARISON_SLUG}`)
      }
    ]
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    description: content.summary,
    url: buildCanonicalUrl(`/${safeLocale}/compare/${FEATURED_TRIPLE_COMPARISON_SLUG}`),
    inLanguage: safeLocale
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
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
      <ComparisonTriplePageView
        locale={safeLocale}
        tools={tools}
        canonicalSlug={FEATURED_TRIPLE_COMPARISON_SLUG}
        comparisonRows={comparisonRows}
        faqItems={faqItems}
        alternatives={alternatives}
        title={content.title}
        description={content.summary}
      />
    </>
  );
}


