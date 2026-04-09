import { categories } from "@/data/categories";
import { catalogContent } from "@/data/catalog-content";
import { tools } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import { assertEncodingHealth, normalizeLocalizedContent } from "@/lib/encoding";
import { enrichToolCopy } from "@/lib/tool-content";
import type { LocalizedCategory, LocalizedTool, PricingTier } from "@/types/catalog";
type BaseLocalizedTool = Omit<LocalizedTool, "whatItActuallyDoes" | "whoShouldUseSummary" | "realUseCaseExample" | "compareProfile">;

export const TOOLS_PAGE_SIZE = 20;

export type ToolsSortOption = "popular" | "highest-rated" | "newest" | "free-first" | "paid-first";

export type ToolsQueryFilters = {
  page: number;
  query: string;
  toolCategory: string;
  pricing: PricingTier | "all";
  useCase: string;
  sort: ToolsSortOption;
};

assertEncodingHealth("catalog");

function buildLocalizedTool(locale: Locale, slug: string) {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return null;
  }

  const localizedTool = normalizeLocalizedContent(
    `tool:${slug}:${locale}`,
    {
      slug: tool.slug,
      pricing: tool.pricing,
      websiteUrl: tool.websiteUrl,
      affiliateUrl: tool.affiliateUrl ?? tool.websiteUrl,
      primaryCategorySlug: tool.primaryCategorySlug,
      categorySlugs: tool.categorySlugs,
      toolCategorySlugs: tool.toolCategorySlugs,
      useCaseSlugs: tool.useCaseSlugs,
      rating: tool.rating,
      featured: tool.featured,
      ...tool.locales[locale]
    } satisfies BaseLocalizedTool
  );

  return normalizeLocalizedContent(`tool-copy:${slug}:${locale}`, enrichToolCopy(locale, localizedTool));
}

export function getCatalogContent(locale: Locale) {
  return normalizeLocalizedContent(`catalog-content:${locale}`, catalogContent[locale]);
}

export function getLocalizedCategories(locale: Locale): LocalizedCategory[] {
  return normalizeLocalizedContent(
    `categories:${locale}`,
    categories.map((category) => ({
      slug: category.slug,
      ...category.locales[locale]
    }))
  );
}

export function getLocalizedCategoryBySlug(locale: Locale, slug: string) {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return null;
  }

  return normalizeLocalizedContent(
    `category:${slug}:${locale}`,
    {
      slug: category.slug,
      ...category.locales[locale]
    } satisfies LocalizedCategory
  );
}

export function getLocalizedTools(locale: Locale): LocalizedTool[] {
  return tools
    .map((tool) => buildLocalizedTool(locale, tool.slug))
    .filter((tool): tool is LocalizedTool => tool !== null);
}

export function getToolCount() {
  return tools.length;
}

export function getLocalizedToolBySlug(locale: Locale, slug: string) {
  return buildLocalizedTool(locale, slug);
}

export function getToolsByCategory(locale: Locale, categorySlug: string) {
  return getLocalizedTools(locale).filter((tool) => tool.categorySlugs.includes(categorySlug));
}

export function getCategoryNamesMap(locale: Locale) {
  return new Map(getLocalizedCategories(locale).map((category) => [category.slug, category.name]));
}

export function getRelatedTools(locale: Locale, toolSlug: string, limit = 3) {
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
    sortValue === "free-first" ||
    sortValue === "paid-first"
      ? sortValue
      : "popular";

  return {
    page: parseToolsPage(searchParams.page),
    query: readValue(searchParams.q).trim(),
    toolCategory: readValue(searchParams.category).trim() || "all",
    pricing: pricingValue === "FREE" || pricingValue === "FREEMIUM" || pricingValue === "PAID" ? pricingValue : "all",
    useCase: readValue(searchParams.useCase).trim() || "all",
    sort
  };
}

export function formatPricing(pricing: PricingTier, locale: Locale) {
  const labels: Record<Locale, Record<PricingTier, string>> = {
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
  };

  return labels[locale][pricing];
}

export function getToolOutboundUrl(tool: { affiliateUrl?: string; websiteUrl: string }) {
  return tool.affiliateUrl?.trim() || tool.websiteUrl;
}




