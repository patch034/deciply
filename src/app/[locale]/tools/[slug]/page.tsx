import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { FloatingAffiliateBar } from "@/components/catalog/floating-affiliate-bar";
import { InfoSection } from "@/components/catalog/info-section";
import { ProsConsCard } from "@/components/catalog/pros-cons-card";
import { ToolCard } from "@/components/catalog/tool-card";
import { ComparisonFaq } from "@/components/comparison/comparison-faq";
import { ConversionCtaStrip } from "@/components/ui/conversion-cta-strip";
import { PremiumButton } from "@/components/ui/premium-button";
import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/ui/rating-badge";
import type { ComparisonFaqItem } from "@/data/comparisons";
import { tools } from "@/data/tools";
import { toolCategoryOptions } from "@/data/tool-taxonomy";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import { getBlogCopy, getRelatedArticlesByTool } from "@/lib/blog";
import { FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS, buildComparisonPath, getComparisonTargetTools } from "@/lib/comparisons";
import { buildAlternativesPath, buildUseCasePath, getSafeComparisonPath, getUseCasePagesForTool } from "@/lib/intent-pages";
import { buildToolMetaDescription, buildToolPageTitle } from "@/lib/seo";
import { getToolTrustIndicators, getToolUseCaseTags } from "@/lib/tool-ui";
import {
  formatPricing,
  getCatalogContent,
  getCategoryNamesMap,
  getLocalizedToolBySlug,
  getRelatedTools,
  getToolOutboundUrl
} from "@/lib/catalog";
import type { LocalizedTool } from "@/types/catalog";

type DetailCopy = {
  breadcrumbsHome: string;
  toolsLabel: string;
  quickInfoTitle: string;
  bestForLabel: string;
  pricingLabel: string;
  categoryLabel: string;
  heroTrustLine: string;
  heroPrimaryCta: string;
  overviewTitle: string;
  overviewDescription: string;
  useCasesTitle: string;
  useCasesDescription: string;
  moneyUseCaseLabel: string;
  contentUseCaseLabel: string;
  productivityUseCaseLabel: string;
  moneyTitle: string;
  moneyDescription: string;
  howToUseTitle: string;
  howToUseDescription: string;
  prosTitle: string;
  consTitle: string;
  whoShouldUseTitle: string;
  whoShouldUseDescription: string;
  beginnersLabel: string;
  prosLabel: string;
  whoShouldAvoidTitle: string;
  whoShouldAvoidDescription: string;
  alternativesTitle: string;
  alternativesDescription: string;
  compareTitle: string;
  compareDescription: string;
  finalCtaEyebrow: string;
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaUrgency: string;
  finalPrimaryCta: string;
  secondaryCta: string;
};

type UseCaseCard = {
  title: string;
  description: string;
};

type HowToStep = {
  title: string;
  description: string;
};

type PricingSummaryCard = {
  title: string;
  description: string;
};

const copy: Record<Locale, DetailCopy> = {
  tr: {
    breadcrumbsHome: "Ana sayfa",
    toolsLabel: "Araçlar",
    quickInfoTitle: "Hızlı bakış",
    bestForLabel: "Uygun kullanım",
    pricingLabel: "Fiyat",
    categoryLabel: "Kategori",
    heroTrustLine: "Dünya genelinde en çok kullanılan AI araçlarından biri",
    heroPrimaryCta: "Ücretsiz Başla",
    overviewTitle: "Bu araç nedir?",
    overviewDescription: "Ne yaptığını ve neden önemli olduğunu kısa ve net biçimde görün.",
    useCasesTitle: "Öne çıkan kullanım alanları",
    useCasesDescription: "Bu aracın para kazanma, içerik üretimi ve verimlilik tarafında nasıl kullanılabileceğini hızlıca görün.",
    moneyUseCaseLabel: "Para kazanma",
    contentUseCaseLabel: "İçerik üretimi",
    productivityUseCaseLabel: "Verimlilik",
    moneyTitle: "Bu araçla nasıl para kazanılır?",
    moneyDescription: "Gerçekçi kullanım senaryolarıyla bu aracı gelir odaklı nasıl kullanabileceğinizi görün.",
    howToUseTitle: "Nasıl kullanılır?",
    howToUseDescription: "İlk sonuç almak için basit akışı izleyin.",
    prosTitle: "Artılar",
    consTitle: "Eksiler",
    whoShouldUseTitle: "Kimler kullanmalı?",
    whoShouldUseDescription: "Bu araçtan en hızlı fayda görebilecek kullanıcı tipleri.",
    beginnersLabel: "Yeni başlayanlar için",
    prosLabel: "Profesyoneller için",
    whoShouldAvoidTitle: "Kimler için uygun değil?",
    whoShouldAvoidDescription: "Aşağıdaki kullanıcılar için ilk seçenek olmayabilir.",
    alternativesTitle: "Alternatif araçlar",
    alternativesDescription: "Karar vermeden önce benzer araçları da açıp farkları görün.",
    compareTitle: "Karşılaştırma sayfaları",
    compareDescription: "Bu aracı benzer seçeneklerle yan yana görüp farkları daha hızlı değerlendirin.",
    finalCtaEyebrow: "Son adım",
    finalCtaTitle: "Bu aracı hemen dene",
    finalCtaDescription: "Sana uygunsa en doğru sonraki adım aracı açıp kendi iş akışında test etmektir.",
    finalCtaUrgency: "Bugün sık incelenen araçlardan biri",
    finalPrimaryCta: "Şimdi Dene",
    secondaryCta: "Tüm araçlara dön"
  },
  en: {
    breadcrumbsHome: "Home",
    toolsLabel: "Tools",
    quickInfoTitle: "Quick info",
    bestForLabel: "Best for",
    pricingLabel: "Pricing",
    categoryLabel: "Category",
    heroTrustLine: "One of the most used AI tools worldwide",
    heroPrimaryCta: "Start Free",
    overviewTitle: "What is this tool?",
    overviewDescription: "See what it does and why it matters in a short, clear format.",
    useCasesTitle: "Core use cases",
    useCasesDescription: "Quickly understand how this tool can support monetization, content creation, and productivity.",
    moneyUseCaseLabel: "Make money",
    contentUseCaseLabel: "Content creation",
    productivityUseCaseLabel: "Productivity",
    moneyTitle: "How can you make money with this tool?",
    moneyDescription: "See practical ways this tool can support revenue-focused work.",
    howToUseTitle: "How to use it",
    howToUseDescription: "Follow this simple flow to get your first useful result faster.",
    prosTitle: "Pros",
    consTitle: "Cons",
    whoShouldUseTitle: "Who should use it?",
    whoShouldUseDescription: "The user profiles most likely to get fast value from it.",
    beginnersLabel: "For beginners",
    prosLabel: "For pros",
    whoShouldAvoidTitle: "Who is it not ideal for?",
    whoShouldAvoidDescription: "It may not be the first choice for these users.",
    alternativesTitle: "Alternatives",
    alternativesDescription: "Open similar tools and compare the differences before you decide.",
    compareTitle: "Comparison pages",
    compareDescription: "Review this tool side by side with nearby options before choosing a workflow.",
    finalCtaEyebrow: "Final step",
    finalCtaTitle: "Try this tool now",
    finalCtaDescription: "If it looks like a fit, the best next step is opening it and testing it in your own workflow.",
    finalCtaUrgency: "One of the tools frequently reviewed right now",
    finalPrimaryCta: "Try Now",
    secondaryCta: "Back to all tools"
  }
};

function getToolCategoryLabel(locale: Locale, tool: LocalizedTool) {
  const map = new Map(toolCategoryOptions[locale].map((item) => [item.slug, item.label]));
  return map.get(tool.toolCategorySlugs[0] as (typeof toolCategoryOptions)[typeof locale][number]["slug"]) ?? tool.bestUseCase;
}

function getWhoShouldAvoid(locale: Locale, tool: LocalizedTool) {
  const items: string[] = [];

  if (tool.pricing === "PAID") {
    items.push(locale === "tr" ? "Ücretsiz başlamak isteyen kullanıcılar" : "Users who want a free starting point");
  }

  if (tool.toolCategorySlugs.includes("image")) {
    items.push(locale === "tr" ? "Sadece metin odaklı çalışan kullanıcılar" : "Users focused only on text workflows");
  }

  if (tool.toolCategorySlugs.includes("video")) {
    items.push(locale === "tr" ? "Sadece hızlı yazı üretimi arayan kullanıcılar" : "Users only looking for fast text generation");
  }

  if (tool.toolCategorySlugs.includes("writing")) {
    items.push(locale === "tr" ? "Daha çok görsel veya video üretimi isteyen kullanıcılar" : "Users mostly looking for image or video output");
  }

  if (tool.toolCategorySlugs.includes("productivity")) {
    items.push(locale === "tr" ? "Daha yaratıcı görsel üretim arayan kullanıcılar" : "Users looking for more creative visual output");
  }

  if (items.length === 0) {
    items.push(locale === "tr" ? "Çok niş kullanım arayan ileri seviye ekipler" : "Advanced teams looking for a highly niche workflow");
  }

  return items.slice(0, 3);
}

function getUseCaseCards(locale: Locale, tool: LocalizedTool, dictionary: DetailCopy): UseCaseCard[] {
  const firstMoneyUseCase = tool.moneyUseCases[0]?.description ?? tool.longDescription;

  const contentDescription =
    locale === "tr"
      ? tool.toolCategorySlugs.includes("video")
        ? `${tool.name}, video akışında senaryo, anlatım ve içerik paketlerini daha hızlı üretmeye yardımcı olabilir.`
        : tool.toolCategorySlugs.includes("image")
          ? `${tool.name}, sosyal medya, sunum ve yaratıcı teslimler için daha hızlı içerik üretimi sağlayabilir.`
          : `${tool.name}, blog, e-posta, sosyal medya ve müşteri teslimleri için içerik üretim hızını artırabilir.`
      : tool.toolCategorySlugs.includes("video")
        ? `${tool.name} can speed up scripts, narration, and repeatable video content workflows.`
        : tool.toolCategorySlugs.includes("image")
          ? `${tool.name} can help produce faster creative assets for social, presentation, and visual delivery work.`
          : `${tool.name} can improve output speed for blogs, email copy, social content, and client deliverables.`;

  const productivityDescription =
    locale === "tr"
      ? `${tool.bestUseCase} odağında tekrar eden işleri daha hızlı tamamlayıp araştırma, taslak ve teslim süresini kısaltabilir.`
      : `For ${tool.bestUseCase.toLowerCase()}, it can reduce repeated work and shorten research, drafting, and delivery time.`;

  return [
    { title: dictionary.moneyUseCaseLabel, description: firstMoneyUseCase },
    { title: dictionary.contentUseCaseLabel, description: contentDescription },
    { title: dictionary.productivityUseCaseLabel, description: productivityDescription }
  ];
}

function getHowToUseSteps(locale: Locale, tool: LocalizedTool): HowToStep[] {
  if (locale === "tr") {
    return [
      {
        title: "Hedef çıktıyı netleştir",
        description: `${tool.bestUseCase} için ne üretmek istediğini kısa ve net biçimde belirle.`
      },
      {
        title: "İlk taslağı hızlıca üret",
        description: `${tool.name} ile ilk taslağı çıkar, sonra tonu ve sonucu ihtiyacına göre daralt.`
      },
      {
        title: "Düzenle ve yayına al",
        description: "Çıktıyı kontrol et, gerekli düzeltmeleri yap ve iş akışında hemen kullanmaya başla."
      }
    ];
  }

  return [
    {
      title: "Define the output first",
      description: `Decide what you want to create for ${tool.bestUseCase.toLowerCase()} before generating anything.`
    },
    {
      title: "Generate a fast first draft",
      description: `Use ${tool.name} to create the first version quickly, then narrow the tone and direction.`
    },
    {
      title: "Refine and use it",
      description: "Review the output, make light edits, and move it into your real workflow right away."
    }
  ];
}

function getAudienceCards(locale: Locale, tool: LocalizedTool, dictionary: DetailCopy) {
  const beginnerText =
    locale === "tr"
      ? tool.pricing === "PAID"
        ? `${tool.name}, ödeme bariyeri nedeniyle ilk denemede herkes için en kolay seçenek olmayabilir; ama net bir hedefle başlandığında hızlı sonuç verebilir.`
        : `${tool.name}, düşük sürtünmeyle başlamak ve ilk sonucu hızlı görmek isteyen kullanıcılar için uygun olabilir.`
      : tool.pricing === "PAID"
        ? `${tool.name} may not be the easiest first stop for everyone because of the paywall, but it can still work well with a clear goal.`
        : `${tool.name} can be a practical fit for users who want a low-friction start and a fast first result.`;

  const proText =
    locale === "tr"
      ? `${tool.name}, tekrar eden işleri hızlandırmak, teslim kalitesini artırmak veya uzman iş akışlarını ölçeklemek isteyen profesyoneller için değerlidir.`
      : `${tool.name} can be valuable for professionals who want to speed up repeatable work, improve deliverables, or scale a specialized workflow.`;

  return [
    { title: dictionary.beginnersLabel, description: beginnerText },
    { title: dictionary.prosLabel, description: proText }
  ];
}

function getPricingSummaryCards(locale: Locale, tool: LocalizedTool, pricingValue: string): PricingSummaryCard[] {
  if (locale === "tr") {
    const pricingFit =
      tool.pricing === "FREE"
        ? "Maliyet bariyeri olmadan denemek isteyen bireysel kullanıcılar ve küçük ekipler için mantıklı bir başlangıç olabilir."
        : tool.pricing === "FREEMIUM"
          ? "Önce temel akışı test edip sonra ihtiyaç oldukça ücretli plana geçmek isteyen kullanıcılar için dengeli bir modeldir."
          : "Net teslim hedefi olan ve zaman kazancını yazılım maliyetinden daha önemli gören profesyoneller için daha anlamlıdır.";

    const commercialAngle =
      tool.pricing === "PAID"
        ? `${tool.name}, müşteri işi, ekip teslimi veya düzenli içerik üretimi yapan ekiplerde maliyetini daha kolay haklı çıkarabilir.`
        : `${tool.name}, düşük giriş bariyeri sayesinde önce workflow uyumunu test edip sonra ticari senaryolarda genişletilebilecek bir araçtır.`;

    return [
      { title: "Fiyat modeli", description: `${pricingValue}.` },
      { title: "Kimler için mantıklı?", description: pricingFit },
      { title: "Ticari bakış", description: commercialAngle }
    ];
  }

  const pricingFit =
    tool.pricing === "FREE"
      ? "A practical starting point for solo users and small teams that want to test the workflow without upfront cost."
      : tool.pricing === "FREEMIUM"
        ? "A balanced model for teams that want to validate the workflow first, then upgrade when output or volume justifies it."
        : "Usually makes more sense for professionals and teams that already know the time saved is worth paying for.";

  const commercialAngle =
    tool.pricing === "PAID"
      ? `${tool.name} is easier to justify when it supports client work, repeatable delivery, or a high-volume content workflow.`
      : `${tool.name} is easier to test before committing, which lowers the risk for commercial workflows that still need validation.`;

  return [
    { title: "Pricing model", description: `${pricingValue}.` },
    { title: "Best pricing fit", description: pricingFit },
    { title: "Commercial angle", description: commercialAngle }
  ];
}

function buildToolFaq(locale: Locale, tool: LocalizedTool, pricingValue: string): ComparisonFaqItem[] {
  if (locale === "tr") {
    return [
      {
        question: `${tool.name} ne için en mantıklı seçimdir?`,
        answer: `${tool.name}, en çok ${tool.bestUseCase.toLocaleLowerCase("tr-TR")} tarafında hızlı çıktı almak isteyen kullanıcılar için mantıklıdır.`
      },
      {
        question: `${tool.name} kimler için uygun?`,
        answer: `${tool.whoShouldUseSummary} Bu nedenle aracın değeri, en çok gerçek bir teslim veya düzenli workflow içinde ortaya çıkar.`
      },
      {
        question: `${tool.name} fiyat açısından mantıklı mı?`,
        answer: `${pricingValue} modelinde çalışan bu araç, özellikle zaman tasarrufu ürettiği tekrar eden işlerde daha mantıklı hale gelir.`
      },
      {
        question: `${tool.name} yerine ne zaman alternatif bakılmalı?`,
        answer: `Eğer ana ihtiyacınız ${tool.cons[0]?.toLocaleLowerCase("tr-TR") ?? "bu aracın zayıf kaldığı bir workflow"} ise, alternatifler ve karşılaştırma sayfaları daha net karar vermenize yardımcı olur.`
      }
    ];
  }

  return [
    {
      question: `When is ${tool.name} the right choice?`,
      answer: `${tool.name} makes the most sense when you need ${tool.bestUseCase.toLowerCase()} and want a faster path to a usable first output.`
    },
    {
      question: `Who should use ${tool.name}?`,
      answer: `${tool.whoShouldUseSummary} Its value is usually clearest when the tool becomes part of a real delivery workflow.`
    },
    {
      question: `Is ${tool.name} worth the pricing?`,
      answer: `With a ${pricingValue.toLowerCase()} model, the tool becomes easier to justify when it saves time on repeatable work or client-facing output.`
    },
    {
      question: `When should you look at alternatives instead?`,
      answer: `If your workflow is centered on ${tool.cons[0]?.toLowerCase() ?? "an area where this tool is weaker"}, the alternatives and comparison pages can help narrow the decision faster.`
    }
  ];
}
export function generateStaticParams() {
  return locales.flatMap((locale) => tools.map((tool) => ({ locale, slug: tool.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;
  const tool = getLocalizedToolBySlug(safeLocale, slug);

  if (!tool) {
    return {};
  }

  const canonicalUrl = buildCanonicalUrl(`/${locale}/tools/${slug}`);
  const description = buildToolMetaDescription(safeLocale, tool);
  const title = buildToolPageTitle(safeLocale, tool);

  return {
    title,
    description: description,
    keywords: [tool.name, tool.bestUseCase, ...tool.toolCategorySlugs, ...tool.useCaseSlugs, "AI tool", "AI software"],
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(`/tools/${slug}`)
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description: description
    }
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const dictionary = copy[safeLocale];
  const content = getCatalogContent(safeLocale);
  const tool = getLocalizedToolBySlug(safeLocale, slug);

  if (!tool) {
    notFound();
  }

  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const relatedTools = getRelatedTools(safeLocale, tool.slug, 4);
  const relatedArticles = getRelatedArticlesByTool(safeLocale, tool.slug, 4);
  const featuredBlogHref = relatedArticles[0] ? `/${safeLocale}/blog/${relatedArticles[0].slug}` : `/${safeLocale}/blog`;
  const blogCopy = getBlogCopy(safeLocale);
  const pricingValue = formatPricing(tool.pricing, safeLocale);
  const supportText = safeLocale === "tr" ? "Hızlı başlangıç | Net fiyat bilgisi" : "Fast start | Clear pricing signal";
  const quickCategory = getToolCategoryLabel(safeLocale, tool);
  const whoShouldAvoid = getWhoShouldAvoid(safeLocale, tool);
  const outboundUrl = getToolOutboundUrl(tool);
  const trustIndicators = getToolTrustIndicators(safeLocale);
  const decisionTags = getToolUseCaseTags(safeLocale, tool);
  const useCaseCards = getUseCaseCards(safeLocale, tool, dictionary);
  const howToUseSteps = getHowToUseSteps(safeLocale, tool);
  const pricingSummaryCards = getPricingSummaryCards(safeLocale, tool, pricingValue);
  const audienceCards = getAudienceCards(safeLocale, tool, dictionary);
  const comparisonTargets = getComparisonTargetTools(safeLocale, tool.slug, 6);
    const featuredTripleComparisonHref = FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS.includes(tool.slug as (typeof FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS)[number])
      ? buildComparisonPath(safeLocale, FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS[0], FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS[1], FEATURED_TRIPLE_COMPARISON_TOOL_SLUGS[2])
      : null;
    const useCasePages = getUseCasePagesForTool(safeLocale, tool.useCaseSlugs, 2);
  const faqItems = buildToolFaq(safeLocale, tool, pricingValue);
  const comparisonCards = comparisonTargets.map((item) => ({
    icon: "VS",
    eyebrow: tool.name,
    title: `${tool.name} vs ${item.name}`,
    description:
      safeLocale === "tr"
        ? `${tool.name} ile ${item.name} arasındaki fiyat, kullanım alanı ve workflow farklarını tek sayfada görün.`
        : `Review the pricing, workflow fit, and trade-offs between ${tool.name} and ${item.name} on one page.`,
    href: buildComparisonPath(safeLocale, tool.slug, item.slug),
    highlight: item.bestUseCase
  }));
  const alternativesHubHref = buildAlternativesPath(safeLocale, tool.slug);
  const alternativesTitle = safeLocale === "tr" ? `${tool.name} alternatifleri` : `Alternatives to ${tool.name}`;
  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/tools/${tool.slug}`);
  const description = buildToolMetaDescription(safeLocale, tool);
  const decisionSummaryTitle = safeLocale === "tr" ? "Karar özeti" : "Decision snapshot";
  const decisionSummaryDescription =
    safeLocale === "tr"
      ? "Bu aracın kimler için daha mantıklı olduğunu, ne yaptığını ve hangi senaryoda zayıf kalabileceğini hızlıca görün."
      : "See who this tool fits best, what it does, and where it may fall short before you click out.";
  const decisionSummaryCards = [
    {
      title: dictionary.bestForLabel,
      value: tool.bestUseCase
    },
    {
      title: safeLocale === "tr" ? "Bu araç ne yapar?" : "What it does",
      value: tool.whatItActuallyDoes
    },
    {
      title: dictionary.whoShouldUseTitle,
      value: tool.whoShouldUseSummary
    },
    {
      title: safeLocale === "tr" ? "Gerçek kullanım örneği" : "Real use case example",
      value: tool.realUseCaseExample.title
    }
  ];
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: description,
    applicationCategory: quickCategory,
    operatingSystem: "Web",
    url: canonicalUrl,
    inLanguage: safeLocale,
    isAccessibleForFree: tool.pricing !== "PAID",
    author: {
      "@type": "Organization",
      name: "Deciply Editorial Team"
    },
    publisher: {
      "@type": "Organization",
      name: "Deciply"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating.toFixed(1),
      bestRating: "5"
    }
  };

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
        name: dictionary.toolsLabel,
        item: `https://deciply.com/${safeLocale}/tools`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: canonicalUrl
      }
    ]
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 pb-40 sm:px-6 sm:py-10 sm:pb-32 lg:gap-10 lg:px-8 lg:py-14 lg:pb-14">
      <Breadcrumb
        items={[
          { label: dictionary.breadcrumbsHome, href: `/${safeLocale}` },
          { label: dictionary.toolsLabel, href: `/${safeLocale}/tools` },
          { label: tool.name }
        ]}
      />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.86),rgba(17,24,39,0.9),rgba(11,15,25,0.96))] p-5 shadow-[0_24px_80px_-40px_rgba(34,211,238,0.18)] sm:p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{pricingValue}</Badge>
            <Badge>{quickCategory}</Badge>
          </div>

          <h1 className="mt-5 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-[28px] font-bold tracking-tight text-transparent sm:mt-6 sm:text-4xl md:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
            {tool.name}
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-300 sm:text-lg sm:leading-8">{tool.shortDescription}</p>
          <p className="mt-4 text-sm font-medium text-cyan-200/90">{dictionary.heroTrustLine}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {trustIndicators.map((item) => (
              <Badge key={item} variant="ghost" className="text-cyan-100/92">
                {item}
              </Badge>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {decisionTags.map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <RatingBadge rating={tool.rating} className="w-fit" />
            <p className="text-sm font-medium text-slate-400">
              {dictionary.bestForLabel}: {tool.bestUseCase}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <a
              href={outboundUrl}
              target="_blank"
              rel="nofollow sponsored noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-7 py-4 text-base font-semibold text-white shadow-[0_22px_60px_-24px_rgba(34,211,238,0.45)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_70px_-24px_rgba(56,189,248,0.52)] sm:w-auto"
            >
              {dictionary.heroPrimaryCta}
            </a>
            <Link
              href={`/${safeLocale}/tools`}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-white/12 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-300 sm:w-auto"
            >
              {dictionary.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          <aside className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-[0_20px_70px_-40px_rgba(34,211,238,0.15)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{dictionary.quickInfoTitle}</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{dictionary.pricingLabel}</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{pricingValue}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{dictionary.categoryLabel}</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{quickCategory}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{dictionary.bestForLabel}</p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{tool.bestUseCase}</p>
              </div>
            </div>
          </aside>

          <FloatingAffiliateBar
            toolName={tool.name}
            pricingValue={pricingValue}
            ctaLabel={dictionary.heroPrimaryCta}
            websiteUrl={outboundUrl}
            supportText={supportText}
            eyebrowLabel={safeLocale === "tr" ? "Hızlı erişim" : "Quick access"}
          />
        </div>
      </section>

      <InfoSection title={decisionSummaryTitle} description={decisionSummaryDescription}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {decisionSummaryCards.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{item.value}</p>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection title={dictionary.overviewTitle} description={dictionary.overviewDescription}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-[15px] leading-7 text-slate-300 sm:p-5 sm:text-base">
            <p className="text-base font-semibold text-slate-100">{tool.whatItActuallyDoes}</p>
            <p className="mt-4">{tool.longDescription}</p>
          </div>
          <div className="rounded-[24px] border border-cyan-400/15 bg-cyan-400/[0.06] p-4 text-sm leading-7 text-slate-300 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.18)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{dictionary.bestForLabel}</p>
            <p className="mt-3 text-base font-semibold text-slate-100">{tool.bestUseCase}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{tool.whoShouldUseSummary}</p>
          </div>
        </div>
      </InfoSection>

      <InfoSection title={dictionary.useCasesTitle} description={dictionary.useCasesDescription}>
        <div className="grid gap-4 md:grid-cols-3">
          {useCaseCards.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
              <p className="text-base font-semibold text-slate-100">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection
        title={safeLocale === "tr" ? "Fiyat özeti" : "Pricing summary"}
        description={
          safeLocale === "tr"
            ? "Fiyat modelini, kimler için mantıklı olduğunu ve ticari kullanım açısından nasıl düşünülmesi gerektiğini hızlıca değerlendirin."
            : "Review the pricing model, who it makes sense for, and how to think about it from a commercial workflow angle."
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          {pricingSummaryCards.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
              <p className="text-base font-semibold text-slate-100">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </InfoSection>
      <InfoSection title={dictionary.moneyTitle} description={dictionary.moneyDescription}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tool.moneyUseCases.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
              <p className="text-base font-semibold text-slate-100">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection
        title={safeLocale === "tr" ? "Gerçek workflow örneği" : "Real workflow example"}
        description={
          safeLocale === "tr"
            ? "Aracın gerçek bir iş akışında nasıl kullanılabileceğini ve ilk sonuca daha hızlı nasıl gidilebileceğini görün."
            : "See how this tool can fit into a real process and help you reach the first useful output faster."
        }
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
              {safeLocale === "tr" ? "Gerçek senaryo" : "Real scenario"}
            </p>
            <p className="mt-3 text-xl font-semibold tracking-tight text-slate-100">{tool.realUseCaseExample.title}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{tool.realUseCaseExample.description}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
              {safeLocale === "tr" ? "Workflow akışı" : "Workflow steps"}
            </p>
            <div className="mt-4 grid gap-4">
              {howToUseSteps.map((step, index) => (
                <div key={step.title} className="rounded-[20px] border border-white/10 bg-black/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">0{index + 1}</p>
                  <p className="mt-2 text-base font-semibold text-slate-100">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InfoSection>
      <InfoSection title={dictionary.howToUseTitle} description={dictionary.howToUseDescription}>
        <div className="grid gap-4 md:grid-cols-3">
          {howToUseSteps.map((step, index) => (
            <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">0{index + 1}</p>
              <p className="mt-3 text-base font-semibold text-slate-100">{step.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </InfoSection>

      <section className="grid gap-6 lg:grid-cols-2">
        <ProsConsCard title={dictionary.prosTitle} items={tool.pros} tone="positive" />
        <ProsConsCard title={dictionary.consTitle} items={tool.cons} tone="negative" />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <InfoSection title={dictionary.whoShouldUseTitle} description={dictionary.whoShouldUseDescription}>
          <div className="grid gap-4 md:grid-cols-2">
            {audienceCards.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
                <p className="text-base font-semibold text-slate-100">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {tool.whoShouldUse.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
                <p className="text-sm font-semibold text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title={dictionary.whoShouldAvoidTitle} description={dictionary.whoShouldAvoidDescription}>
          <div className="grid gap-4 md:grid-cols-1">
            {whoShouldAvoid.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)] sm:p-5">
                <p className="text-sm font-semibold text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </InfoSection>
      </section>

      {comparisonCards.length ? (
        <InfoSection title={dictionary.compareTitle} description={dictionary.compareDescription}>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {comparisonCards.map((item) => (
              <ComparisonCard key={item.href} locale={safeLocale} item={item} linkLabel={safeLocale === "tr" ? "Karşılaştırmayı aç" : "Open comparison"} />
            ))}
          </div>
          {featuredTripleComparisonHref ? (
            <div className="mt-6">
              <PremiumButton href={featuredTripleComparisonHref} variant="secondary" className="w-full sm:w-auto">
                {safeLocale === "tr" ? "Üçlü karşılaştırmayı aç" : "Open three-way comparison"}
              </PremiumButton>
            </div>
          ) : null}
        </InfoSection>
      ) : null}

      <InfoSection
        title={safeLocale === "tr" ? "Dahili karar yolları" : "Internal decision paths"}
        description={
          safeLocale === "tr"
            ? "Alternatif ve use-case sayfalarına geçerek bu aracı farklı karar açılarından değerlendirebilirsiniz."
            : "Use the alternatives and use-case pages to evaluate this tool from a few different decision angles."
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href={alternativesHubHref}
            className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold leading-7 text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300"
          >
            {safeLocale === "tr" ? `${tool.name} alternatifleri` : `${tool.name} alternatives`}
          </Link>
          {useCasePages.map((page) => (
            <Link
              key={page.slug}
              href={buildUseCasePath(safeLocale, page.slug)}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm font-semibold leading-7 text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </InfoSection>

      <InfoSection title={alternativesTitle} description={dictionary.alternativesDescription}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedTools.map((item) => (
            <ToolCard
              key={item.slug}
              locale={safeLocale}
              tool={item}
              categoryNames={item.categorySlugs.map((slugItem) => categoryNamesMap.get(slugItem) ?? slugItem)}
              pricingLabel={formatPricing(item.pricing, safeLocale)}
              detailLabel={content.common.viewDetailsLabel}
              bestForLabel={dictionary.bestForLabel}
              useCaseLabel={item.bestUseCase}
              compareHref={getSafeComparisonPath(safeLocale, tool.slug, item.slug)}
            />
          ))}
        </div>
      </InfoSection>

      <ConversionCtaStrip
        eyebrow={safeLocale === "tr" ? "Dönüşüm odaklı sonraki adım" : "Conversion-ready next step"}
        title={safeLocale === "tr" ? "İlgili aracı açın, alternatifleri karşılaştırın" : "Open the tool, compare the alternatives"}
        description={
          safeLocale === "tr"
            ? "Resmî aracı hemen açın, benzer seçenekleri inceleyin ve gerekirse ilgili incelemeyi okuyun."
            : "Open the official tool, review nearby alternatives, and read the related review if you need more context."
        }
        buttons={[
          { label: safeLocale === "tr" ? "Resmî aracı aç" : "Visit official tool", href: outboundUrl },
          { label: safeLocale === "tr" ? "Alternatifleri karşılaştır" : "Compare alternatives", href: alternativesHubHref, variant: "secondary" },
          { label: safeLocale === "tr" ? "Tam incelemeyi oku" : "Read full review", href: featuredBlogHref, variant: "ghost" }
        ]}
      />

      {relatedArticles.length ? (
        <InfoSection title={blogCopy.toolPageRelatedTitle} description={blogCopy.toolPageRelatedDescription}>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((article) => (
              <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={blogCopy.readMoreLabel} />
            ))}
          </div>
        </InfoSection>
      ) : null}

      <ComparisonFaq
        title={safeLocale === "tr" ? "Sık sorulan sorular" : "FAQ"}
        description={
          safeLocale === "tr"
            ? "Bu aracı seçmeden önce en sık sorulan karar sorularına kısa cevaplar."
            : "Short answers to the most common decision questions before you choose this tool."
        }
        items={faqItems}
      />
      <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-5 py-8 text-white shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/85">{dictionary.finalCtaEyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{dictionary.finalCtaTitle}</h2>
            <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{dictionary.finalCtaDescription}</p>
            <p className="mt-4 text-sm font-medium text-cyan-200/90">{dictionary.finalCtaUrgency}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={outboundUrl}
              target="_blank"
              rel="nofollow sponsored noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-7 py-4 text-base font-semibold text-white shadow-[0_22px_60px_-24px_rgba(34,211,238,0.45)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_70px_-24px_rgba(56,189,248,0.52)] sm:w-auto"
            >
              {dictionary.finalPrimaryCta}
            </a>
            <Link
              href={`/${safeLocale}/tools`}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:text-cyan-300 sm:w-auto"
            >
              {dictionary.secondaryCta}
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}








