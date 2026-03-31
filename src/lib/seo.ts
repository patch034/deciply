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

const blogDescriptionTemplates: Record<Locale, ((topic: string) => string)[]> = {
  en: [
    (topic) => `This guide explains ${topic} with real examples, use cases, and practical steps.`,
    (topic) => `Learn ${topic} through real examples, practical workflows, and realistic expectations.`,
    (topic) => `Explore ${topic} with practical steps, real use cases, and clearer decision points.`,
    (topic) => `See ${topic} in real scenarios, where it helps, and what to watch for.`
  ],
  tr: [
    (topic) => `Bu rehber, ${topic} ger\u00e7ek \u00f6rnekler, kullan\u0131m senaryolar\u0131 ve uygulanabilir ad\u0131mlarla a\u00e7\u0131klar.`,
    (topic) => `Bu i\u00e7erik, ${topic} ger\u00e7ek \u00f6rnekler, pratik i\u015f ak\u0131\u015flar\u0131 ve ger\u00e7ek\u00e7i beklentilerle anlat\u0131r.`,
    (topic) => `Bu rehberde ${topic} uygulanabilir ad\u0131mlar, ger\u00e7ek kullan\u0131m \u00f6rnekleri ve net karar \u00e7er\u00e7eveleriyle ele al\u0131n\u0131r.`,
    (topic) => `Bu i\u00e7erik, ${topic} ger\u00e7ek senaryolar, dikkat edilmesi gereken noktalar ve somut ad\u0131mlarla g\u00f6sterir.`
  ]
};

function slugHash(value: string) {
  return [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function buildBlogTopic(locale: Locale, article: LocalizedBlogArticle) {
  const cleanTitle = cleanTitleTopic(article.title);
  return locale === "tr" ? lowerFirst(cleanTitle) : lowerFirst(cleanTitle);
}

export function buildBlogSeoLead(locale: Locale, article: LocalizedBlogArticle) {
  const templates = blogDescriptionTemplates[locale];
  const template = templates[slugHash(article.slug) % templates.length];
  return template(buildBlogTopic(locale, article));
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
    ? "Ger\u00e7ek kullan\u0131m alanlar\u0131na g\u00f6re AI ara\u00e7lar\u0131n\u0131 kar\u015f\u0131la\u015ft\u0131r\u0131n"
    : "Compare AI Tools by Real Use Case";
}

export function buildBlogPageTitle(article: LocalizedBlogArticle) {
  const base = cleanTitleTopic(article.title);

  return /\b2026\b/.test(base)
    ? `${base} - Real Use Cases & Tools`
    : `${base} (2026 Guide) - Real Use Cases & Tools`;
}

export function buildToolsPageTitle(locale: Locale, currentPage: number) {
  const base = locale === "tr" ? "AI ara\u00e7lar\u0131 dizini" : "AI Tools Directory";
  return currentPage > 1 ? `${base} - Page ${currentPage}` : base;
}

export function buildToolPageTitle(locale: Locale, tool: LocalizedTool) {
  return locale === "tr"
    ? `${tool.name} incelemesi (2026): fiyat, artÄ±lar, eksiler ve ${tool.bestUseCase}`
    : `${tool.name} Review (2026): Pricing, Pros & Cons for ${tool.bestUseCase}`;
}

export function buildHomeMetaDescription(locale: Locale) {
  return locale === "tr"
    ? "AI ara\u00e7lar\u0131n\u0131 kar\u015f\u0131la\u015ft\u0131r\u0131n, ger\u00e7ek kullan\u0131m senaryolar\u0131n\u0131 ke\u015ffedin ve Deciply ile do\u011fru arac\u0131 daha h\u0131zl\u0131 se\u00e7in."
    : "Compare AI tools, explore real use cases, and choose the right tool faster with Deciply.";
}

export function buildToolsIndexMetaDescription(locale: Locale, toolCount: number, currentPage = 1) {
  const base =
    locale === "tr"
      ? `${toolCount} se\u00e7ilmi\u015f AI arac\u0131n\u0131 kullan\u0131m alan\u0131, fiyat modeli ve g\u00fc\u00e7l\u00fc y\u00f6nlerine g\u00f6re inceleyin. Deciply ile size en uygun arac\u0131 daha h\u0131zl\u0131 bulun.`
      : `Browse ${toolCount} curated AI tools by use case, pricing, and strengths. Compare options and find the right fit faster with Deciply.`;

  if (currentPage <= 1) {
    return base;
  }

  return locale === "tr" ? `${base} Sayfa ${currentPage}.` : `${base} Page ${currentPage}.`;
}

export function buildBlogIndexMetaDescription(locale: Locale, currentPage = 1) {
  const base =
    locale === "tr"
      ? "Deciply blogunda ger\u00e7ek kullan\u0131m senaryolar\u0131, kar\u015f\u0131la\u015ft\u0131rmalar ve net ara\u00e7 se\u00e7im rehberleri yer al\u0131r."
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
      ? `${tool.name} iÃ§in fiyat Ã¶zeti, gÃ¼Ã§lÃ¼ yÃ¶nler, zayÄ±f yÃ¶nler, alternatifler ve en mantÄ±klÄ± kullanÄ±m alanlarÄ±nÄ± gÃ¶rÃ¼n.`
      : `See ${tool.name}'s pricing, strengths, weaknesses, alternatives, and the workflows where it makes the most sense.`;

  return clipMetaDescription(`${base} ${example} ${tail}`);
}

export function buildBlogMetaDescription(locale: Locale, article: LocalizedBlogArticle) {
  const lead = buildBlogSeoLead(locale, article);
  const excerptLead = getFirstSentence(article.excerpt);
  return clipMetaDescription(`${lead} ${excerptLead}`);
}
