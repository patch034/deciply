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

export function buildHomeMetaDescription(locale: Locale) {
  return locale === "tr"
    ? "AI ara\u00e7lar\u0131n\u0131 kar\u015f\u0131la\u015ft\u0131r\u0131n, ger\u00e7ek kullan\u0131m senaryolar\u0131n\u0131 ke\u015ffedin ve Deciply ile do\u011fru arac\u0131 daha h\u0131zl\u0131 se\u00e7in."
    : "Compare AI tools, explore real use cases, and choose the right tool faster with Deciply.";
}

export function buildToolsIndexMetaDescription(locale: Locale, toolCount: number) {
  return locale === "tr"
    ? `${toolCount} se\u00e7ilmi\u015f AI arac\u0131n\u0131 kullan\u0131m alan\u0131, fiyat modeli ve g\u00fc\u00e7l\u00fc y\u00f6nlerine g\u00f6re inceleyin. Deciply ile size en uygun arac\u0131 daha h\u0131zl\u0131 bulun.`
    : `Browse ${toolCount} curated AI tools by use case, pricing, and strengths. Compare options and find the right fit faster with Deciply.`;
}

export function buildBlogIndexMetaDescription(locale: Locale, currentPage = 1) {
  const base =
    locale === "tr"
      ? "Deciply blogunda ger\u00e7ek kullan\u0131m senaryolar\u0131, kar\u015f\u0131la\u015ft\u0131rmalar ve net ara\u00e7 se\u00e7im rehberleri yer al\u0131r."
      : "Explore Deciply blog guides built around real use cases, honest comparisons, and clearer AI tool decisions.";

  if (currentPage <= 1) {
    return base;
  }

  return locale === "tr"
    ? `${base} Sayfa ${currentPage}.`
    : `${base} Page ${currentPage}.`;
}

export function buildToolMetaDescription(locale: Locale, tool: LocalizedTool) {
  const base = ensureSentence(tool.shortDescription);
  const tail =
    locale === "tr"
      ? `${tool.name} i\u00e7in g\u00fc\u00e7l\u00fc y\u00f6nleri, s\u0131n\u0131rlamalar\u0131 ve en mant\u0131kl\u0131 kullan\u0131m alanlar\u0131n\u0131 g\u00f6r\u00fcn.`
      : `See ${tool.name}'s strengths, trade-offs, and the workflows where it makes the most sense.`;

  return clipMetaDescription(`${base} ${tail}`);
}

export function buildBlogMetaDescription(article: LocalizedBlogArticle) {
  const excerpt = ensureSentence(article.excerpt);
  const introLead = getFirstSentence(article.intro);
  const combined = normalizeMetaText(excerpt).length >= 120 ? excerpt : `${excerpt} ${introLead}`;

  return clipMetaDescription(combined);
}
