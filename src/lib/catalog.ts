import { categories } from "@/data/categories";
import { catalogContent } from "@/data/catalog-content";
import { tools } from "@/data/tools";
import type { SupportedLocale } from "@/i18n/config";
import { assertEncodingHealth, normalizeLocalizedContent } from "@/lib/encoding";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import { enrichToolCopy } from "@/lib/tool-content";
import type { LocalizedCategory, LocalizedTool, PricingTier } from "@/types/catalog";
type BaseLocalizedTool = Omit<LocalizedTool, "whatItActuallyDoes" | "whoShouldUseSummary" | "realUseCaseExample" | "compareProfile">;

export const TOOLS_PAGE_SIZE = 20;

export type ToolsSortOption = "popular" | "highest-rated" | "newest" | "alphabetical" | "free-first" | "freemium-first" | "paid-first";

export type ToolsQueryFilters = {
  page: number;
  query: string;
  browse: string;
  toolCategory: string;
  pricing: PricingTier | "all";
  useCase: string;
  sort: ToolsSortOption;
};

assertEncodingHealth("catalog");

const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));
const localizedToolsCache = new Map<SupportedLocale, LocalizedTool[]>();
const localizedToolCache = new Map<string, LocalizedTool | null>();

function buildLocalizedTool(locale: SupportedLocale, slug: string) {
  const cacheKey = `${locale}:${slug}`;

  if (localizedToolCache.has(cacheKey)) {
    return localizedToolCache.get(cacheKey) ?? null;
  }

  const tool = toolBySlug.get(slug);

  if (!tool) {
    localizedToolCache.set(cacheKey, null);
    return null;
  }

  const baseLocale = getContentBaseLocale(locale);
  const localizedTool = normalizeLocalizedContent(
    `tool:${slug}:${locale}`,
    {
      slug: tool.slug,
      pricing: tool.pricing,
      websiteUrl: tool.websiteUrl,
      affiliateUrl: tool.affiliateUrl ?? tool.websiteUrl,
      primaryCategorySlug: tool.primaryCategorySlug,
      categorySlug: tool.categorySlug,
      subcategorySlug: tool.subcategorySlug,
      categorySlugs: tool.categorySlugs,
      toolCategorySlugs: tool.toolCategorySlugs,
      useCaseSlugs: tool.useCaseSlugs,
      rating: tool.rating,
      featured: tool.featured,
      ...localizeTree(locale, tool.locales[baseLocale])
    } satisfies BaseLocalizedTool
  );

  const enrichedTool = normalizeLocalizedContent(`tool-copy:${slug}:${locale}`, enrichToolCopy(locale, localizedTool));
  localizedToolCache.set(cacheKey, enrichedTool);

  return enrichedTool;
}

export function getCatalogContent(locale: SupportedLocale) {
  return normalizeLocalizedContent(`catalog-content:${locale}`, localizeTree(locale, catalogContent[getContentBaseLocale(locale)]));
}

export function getLocalizedCategories(locale: SupportedLocale): LocalizedCategory[] {
  return normalizeLocalizedContent(
    `categories:${locale}`,
    categories.map((category) => localizeTree(locale, {
      slug: category.slug,
      ...category.locales[getContentBaseLocale(locale)]
    }))
  );
}

export function getLocalizedCategoryBySlug(locale: SupportedLocale, slug: string) {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return null;
  }

  return normalizeLocalizedContent(
    `category:${slug}:${locale}`,
    localizeTree(locale, {
      slug: category.slug,
      ...category.locales[getContentBaseLocale(locale)]
    } satisfies LocalizedCategory)
  );
}

export function getLocalizedTools(locale: SupportedLocale): LocalizedTool[] {
  const cachedTools = localizedToolsCache.get(locale);

  if (cachedTools) {
    return cachedTools;
  }

  const localizedTools = tools
    .map((tool) => buildLocalizedTool(locale, tool.slug))
    .filter((tool): tool is LocalizedTool => tool !== null);

  localizedToolsCache.set(locale, localizedTools);

  return localizedTools;
}

export const categoryAliasMap: Record<string, string[]> = {
  "writing-editing": ["writing"],
  "image-generation-editing": ["image"],
  "image-analysis": ["image"],
  "music-audio": ["video"],
  "audio-generation-conversion": ["video"],
  "art-creative-design": ["image"],
  "social-media": ["writing", "image", "video", "productivity"],
  "ai-detection-and-undetection": ["writing", "productivity"],
  "coding-development": ["productivity"],
  "video-animation": ["video"],
  "daily-life": ["productivity"],
  "law-finance": ["productivity"],
  "business-management": ["productivity"],
  "marketing-advertising": ["writing", "image", "video", "productivity"],
  "health-wellness": ["productivity"],
  "business-research": ["productivity"],
  "education-translation": ["writing", "productivity"],
  "chatbots-virtual-companions": ["writing"],
  "interior-architecture-design": ["image"],
  "office-productivity": ["productivity"],
  "research-data-analysis": ["productivity"]
};

export function getToolCount() {
  return tools.length;
}

export function getLocalizedToolBySlug(locale: SupportedLocale, slug: string) {
  return buildLocalizedTool(locale, slug);
}

export function getToolsByCategory(locale: SupportedLocale, categorySlug: string) {
  const aliases = categoryAliasMap[categorySlug];

  return getLocalizedTools(locale).filter((tool) => {
    if (tool.categorySlugs.includes(categorySlug)) {
      return true;
    }

    if (tool.toolCategorySlugs.includes(categorySlug)) {
      return true;
    }

    if (tool.primaryCategorySlug === categorySlug) {
      return true;
    }

    if (tool.categorySlug === categorySlug) {
      return true;
    }

    if (categorySlug === "other") {
      return true;
    }

    if (!aliases) {
      return false;
    }

    return tool.toolCategorySlugs.some((slug) => aliases.includes(slug));
  });
}

export function getCategoryNamesMap(locale: SupportedLocale) {
  return new Map(getLocalizedCategories(locale).map((category) => [category.slug, category.name]));
}

export function getRelatedTools(locale: SupportedLocale, toolSlug: string, limit = 3) {
  const currentTool = tools.find((item) => item.slug === toolSlug);

  if (!currentTool) {
    return [];
  }

  return getLocalizedTools(locale)
    .filter(
      (tool) =>
        tool.slug !== toolSlug &&
        tool.categorySlugs.some((slug) => currentTool.categorySlugs.includes(slug))
    )
    .slice(0, limit);
}

export function parseToolsPage(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(rawValue ?? "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function parseToolsQueryFilters(searchParams: {
  page?: string | string[];
  q?: string | string[];
  browse?: string | string[];
  category?: string | string[];
  pricing?: string | string[];
  useCase?: string | string[];
  sort?: string | string[];
}): ToolsQueryFilters {
  const readValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] ?? "" : value ?? "";
  const pricingValue = readValue(searchParams.pricing);
  const sortValue = readValue(searchParams.sort);
  const sort =
    sortValue === "highest-rated" ||
    sortValue === "newest" ||
    sortValue === "alphabetical" ||
    sortValue === "free-first" ||
    sortValue === "freemium-first" ||
    sortValue === "paid-first"
      ? sortValue
      : "popular";

  return {
    page: parseToolsPage(searchParams.page),
    query: readValue(searchParams.q).trim(),
    browse: readValue(searchParams.browse).trim() || "all",
    toolCategory: readValue(searchParams.category).trim() || "all",
    pricing: pricingValue === "FREE" || pricingValue === "FREEMIUM" || pricingValue === "PAID" ? pricingValue : "all",
    useCase: readValue(searchParams.useCase).trim() || "all",
    sort
  };
}

export function formatPricing(pricing: PricingTier, locale: SupportedLocale) {
  const labels: Partial<Record<SupportedLocale, Record<PricingTier, string>>> = {
    tr: {
      FREE: "Ücretsiz",
      FREEMIUM: "Kısmen ücretsiz",
      PAID: "Ücretli"
    },
    en: {
      FREE: "Free",
      FREEMIUM: "Freemium",
      PAID: "Paid"
    },
    ar: {
      FREE: "مجانًا",
      FREEMIUM: "مجاني جزئيًا",
      PAID: "مدفوع"
    },
    ru: {
      FREE: "Бесплатно",
      FREEMIUM: "Freemium",
      PAID: "Платно"
    },
    zh: {
      FREE: "免费",
      FREEMIUM: "部分免费",
      PAID: "付费"
    },
    ja: {
      FREE: "無料",
      FREEMIUM: "フリーミアム",
      PAID: "有料"
    },
    ko: {
      FREE: "무료",
      FREEMIUM: "부분 무료",
      PAID: "유료"
    },
    el: {
      FREE: "Δωρεάν",
      FREEMIUM: "Freemium",
      PAID: "Επί πληρωμή"
    },
    da: {
      FREE: "Gratis",
      FREEMIUM: "Freemium",
      PAID: "Betalt"
    },
    fa: {
      FREE: "رایگان",
      FREEMIUM: "فریمیوم",
      PAID: "پولی"
    }
  };

  return labels[locale]?.[pricing] ?? labels.en?.[pricing] ?? pricing;
}

export function getToolOutboundUrl(tool: { affiliateUrl?: string; websiteUrl: string }) {
  return tool.affiliateUrl?.trim() || tool.websiteUrl;
}




