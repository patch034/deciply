import type { Locale } from "@/i18n/config";
import type { LocalizedBlogArticle } from "@/types/blog";
import type { LocalizedTool } from "@/types/catalog";

function normalizeMetaText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function ensureSentence(value: string) {
  const text = normalizeMetaText(value);

  if (!text) {
    return text;
  }

  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function clipMetaDescription(value: string, maxLength = 160) {
  const text = normalizeMetaText(value);

  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");

  return `${(lastSpace > 80 ? clipped.slice(0, lastSpace) : clipped).trim()}...`;
}

function getFirstSentence(value: string) {
  const text = normalizeMetaText(value);
  const match = text.match(/.+?[.!?](\s|$)/);

  return ensureSentence(match?.[0] ?? text);
}

function lowerFirst(value: string) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function cleanTitleTopic(value: string) {
  return normalizeMetaText(value)
    .replace(/\s*\|\s*Deciply$/i, "")
    .replace(/\s*-\s*Deciply$/i, "")
    .replace(/[!?]$/, "");
}

export function stripBrandSuffix(value: string) {
  return cleanTitleTopic(value);
}

function buildBlogTopic(locale: Locale, article: LocalizedBlogArticle) {
  const cleanTitle = cleanTitleTopic(article.title);
  return lowerFirst(cleanTitle);
}

function buildBlogLeadByKind(locale: Locale, article: LocalizedBlogArticle) {
  const topic = buildBlogTopic(locale, article);
  const title = cleanTitleTopic(article.title);
  const kind = article.contentGraph?.kind ?? "MANUAL";

  if (locale === "tr") {
    switch (kind) {
      case "BEST_TOOLS":
        return `${title} için araç seçimini workflow, fiyat ve kullanım alanına göre daraltan editoryal bir rehber.`;
      case "TOOL_COMPARISON":
        return `${title} için fiyat, hız, kalite ve kullanım bağlamını yan yana inceleyen net bir karşılaştırma.`;
      case "ALTERNATIVES":
        return `${title} alternatifi arayanlar için, hangi açığın kapatıldığını ve ne zaman geçiş yapılacağını gösteren rehber.`;
      case "USE_CASE_GUIDE":
        return `${title} için ilk kurulumdan teslim aşamasına kadar izlenecek pratik workflow rehberi.`;
      default:
        return `${title} için gerçek kullanım senaryolarını, karar noktalarını ve bir sonraki adımı özetleyen rehber.`;
    }
  }

  switch (kind) {
    case "BEST_TOOLS":
      return `This guide narrows ${topic} by workflow, pricing, and fit.`;
    case "TOOL_COMPARISON":
      return `This comparison looks at ${topic} through pricing, speed, quality, and use-case fit.`;
    case "ALTERNATIVES":
      return `This alternatives guide shows which gap ${topic} fills and when a switch makes sense.`;
    case "USE_CASE_GUIDE":
      return `This workflow guide maps ${topic} from setup to delivery.`;
    default:
      return `This guide explains ${topic} with real scenarios, decision points, and the next step.`;
  }
}

export function buildBlogSeoLead(locale: Locale, article: LocalizedBlogArticle) {
  return buildBlogLeadByKind(locale, article);
}

export function buildBlogIntroParagraph(locale: Locale, article: LocalizedBlogArticle) {
  const lead = buildBlogSeoLead(locale, article);
  const intro = normalizeMetaText(article.intro);
  const leadWithoutEnding = lead.replace(/[.!?]$/, "");

  if (!intro) {
    return lead;
  }

  if (intro.toLowerCase().startsWith(leadWithoutEnding.toLowerCase())) {
    return ensureSentence(intro);
  }

  return ensureSentence(`${lead} ${intro}`);
}

export function buildHomeTitle(locale: Locale) {
  return locale === "tr"
    ? "Gerçek kullanım alanlarına göre AI araçlarını karşılaştırın"
    : "Compare AI Tools by Real Use Case";
}

export function buildBlogPageTitle(article: LocalizedBlogArticle) {
  if (normalizeMetaText(article.seoTitle)) {
    return article.seoTitle;
  }

  const base = cleanTitleTopic(article.title);

  return /\b2026\b/.test(base)
    ? `${base} - Real Use Cases & Tools`
    : `${base} (2026 Guide) - Real Use Cases & Tools`;
}

export function buildToolsPageTitle(locale: Locale, currentPage: number) {
  const base = locale === "tr" ? "AI araçları dizini" : "AI Tools Directory";
  return currentPage > 1 ? `${base} - Page ${currentPage}` : base;
}

export function buildToolPageTitle(locale: Locale, tool: LocalizedTool) {
  return locale === "tr"
    ? `${tool.name} incelemesi (2026): fiyat, artılar, eksiler ve ${tool.bestUseCase}`
    : `${tool.name} Review (2026): Pricing, Pros & Cons for ${tool.bestUseCase}`;
}

export function buildHomeMetaDescription(locale: Locale) {
  return locale === "tr"
    ? "AI araçlarını karşılaştırın, gerçek kullanım senaryolarını keşfedin ve Deciply ile doğru aracı daha hızlı seçin."
    : "Compare AI tools, explore real use cases, and choose the right tool faster with Deciply.";
}

export function buildToolsIndexMetaDescription(locale: Locale, toolCount: number, currentPage = 1) {
  const base =
    locale === "tr"
      ? `${toolCount} seçilmiş AI aracını kullanım alanı, fiyat modeli ve güçlü yönlerine göre inceleyin. Deciply ile size en uygun aracı daha hızlı bulun.`
      : `Browse ${toolCount} curated AI tools by use case, pricing, and strengths. Compare options and find the right fit faster with Deciply.`;

  if (currentPage <= 1) {
    return base;
  }

  return locale === "tr" ? `${base} Sayfa ${currentPage}.` : `${base} Page ${currentPage}.`;
}

export function buildBlogIndexMetaDescription(locale: Locale, currentPage = 1) {
  const base =
    locale === "tr"
      ? "Deciply blogunda gerçek kullanım senaryoları, karşılaştırmalar ve net araç seçim rehberleri yer alır."
      : "Explore Deciply blog guides built around real use cases, honest comparisons, and clearer AI tool decisions.";

  if (currentPage <= 1) {
    return base;
  }

  return locale === "tr" ? `${base} Sayfa ${currentPage}.` : `${base} Page ${currentPage}.`;
}

export function buildToolMetaDescription(locale: Locale, tool: LocalizedTool) {
  const base = ensureSentence(tool.whatItActuallyDoes || tool.shortDescription);
  const example = ensureSentence(tool.realUseCaseExample.description);
  const tail =
    locale === "tr"
      ? `${tool.name} için fiyat özeti, güçlü yönler, zayıf yönler, alternatifler ve en mantıklı kullanım alanlarını görün.`
      : `See ${tool.name}'s pricing, strengths, weaknesses, alternatives, and the workflows where it makes the most sense.`;

  return clipMetaDescription(`${base} ${example} ${tail}`);
}

export function buildBlogMetaDescription(locale: Locale, article: LocalizedBlogArticle) {
  if (normalizeMetaText(article.seoDescription)) {
    return clipMetaDescription(article.seoDescription);
  }

  const lead = buildBlogSeoLead(locale, article);
  const excerptLead = getFirstSentence(article.excerpt);
  return clipMetaDescription(`${lead} ${excerptLead}`);
}
