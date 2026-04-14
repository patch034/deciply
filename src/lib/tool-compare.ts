import type { Locale } from "@/i18n/config";
import { toolCategoryOptions } from "@/data/tool-taxonomy";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import type { LocalizedTool, ToolCompareProfile } from "@/types/catalog";

function clampScore(value: number) {
  return Math.max(1, Math.min(10, Math.round(value)));
}

function normalizeText(value: string, locale: Locale) {
  return value.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function getPricingModel(locale: Locale, pricing: LocalizedTool["pricing"]) {
  const labels = {
    tr: {
      FREE: "Ücretsiz",
      FREEMIUM: "Kısmen ücretsiz",
      PAID: "Ücretli"
    },
    en: {
      FREE: "Free",
      FREEMIUM: "Freemium",
      PAID: "Paid"
    }
  } as const;

  return localizeTree(locale, labels[getContentBaseLocale(locale)])[pricing];
}
function getCategoryLabel(locale: Locale, tool: Pick<LocalizedTool, "toolCategorySlugs" | "bestUseCase">) {
  const categoryMap = new Map(toolCategoryOptions[locale].map((item) => [item.slug, item.label]));
  const primarySlug = tool.toolCategorySlugs[0] as (typeof toolCategoryOptions)[typeof locale][number]["slug"] | undefined;

  return (primarySlug ? categoryMap.get(primarySlug) : undefined) ?? tool.bestUseCase;
}

function uniqueList(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

export function buildToolCompareProfile(
  locale: Locale,
  tool: Pick<LocalizedTool, "slug" | "name" | "pricing" | "toolCategorySlugs" | "useCaseSlugs" | "bestUseCase" | "whoShouldUse" | "pros" | "cons" | "rating" | "featured">
): ToolCompareProfile {
  const localeText = normalizeText(
    [tool.bestUseCase, ...tool.whoShouldUse, ...tool.pros, ...tool.cons, ...tool.toolCategorySlugs, ...tool.useCaseSlugs].join(" "),
    locale
  );

  const isWriting = includesAny(localeText, ["writing", "content", "copy", "blog", "email", "yaz", "içerik", "metin"]);
  const isResearch = includesAny(localeText, ["research", "analysis", "araştırma", "brief", "summary", "özet"]);
  const isImage = includesAny(localeText, ["image", "visual", "design", "görsel", "tasarım", "creative"]);
  const isVideo = includesAny(localeText, ["video", "clip", "kurgu", "senaryo", "shorts", "motion"]);
  const isProductivity = includesAny(localeText, ["workflow", "automation", "productivity", "docs", "tasks", "not", "görev", "doküman", "otomasyon"]);
  const isBusiness = includesAny(localeText, ["business", "client", "agency", "sales", "marketing", "work", "iş", "müşteri", "ajans", "pazarlama"]);
  const isCreator = includesAny(localeText, ["creator", "creators", "content", "social", "üretici", "sosyal"]);
  const isStudent = includesAny(localeText, ["student", "students", "öğrenci", "research", "study", "school", "okul"]);

  const freeTier = tool.pricing !== "PAID";

  return {
    slug: tool.slug,
    name: tool.name,
    category: getCategoryLabel(locale, tool),
    pricingModel: getPricingModel(locale, tool.pricing),
    freeTier,
    bestFor: uniqueList([tool.bestUseCase, ...tool.whoShouldUse.slice(0, 2)]).slice(0, 3),
    strengths: uniqueList(tool.pros).slice(0, 4),
    weaknesses: uniqueList(tool.cons).slice(0, 4),
    speedScore: clampScore(5.6 + (tool.featured ? 0.6 : 0) + (freeTier ? 0.5 : 0) + (isWriting || isProductivity ? 1.2 : 0.4) - (isVideo ? 0.4 : 0)),
    easeOfUseScore: clampScore(5.3 + (freeTier ? 1 : 0) + (isWriting || isProductivity ? 1 : 0.2) - (isVideo ? 0.3 : 0)),
    outputQualityScore: clampScore(tool.rating * 1.5 + (isImage || isWriting ? 0.7 : 0.3)),
    studentScore: clampScore(4.6 + (isStudent ? 2.5 : 0.4) + (freeTier ? 1 : 0) + (isResearch || isWriting ? 1.1 : 0)),
    businessScore: clampScore(4.8 + (isBusiness ? 2.3 : 0.5) + (isProductivity ? 0.8 : 0.2) + (tool.featured ? 0.5 : 0)),
    creatorScore: clampScore(4.5 + (isCreator ? 2.3 : 0.4) + (isImage || isVideo ? 1.2 : 0.3) + (tool.featured ? 0.4 : 0)),
    valueScore: clampScore(4.6 + (freeTier ? 1.8 : 0.3) + (tool.pricing === "FREEMIUM" ? 1.2 : 0.1) + (tool.rating / 2))
  };
}
