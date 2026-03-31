import { categories } from "@/data/categories";
import { catalogContent } from "@/data/catalog-content";
import { tools } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import { assertEncodingHealth, normalizeLocalizedContent } from "@/lib/encoding";
import type { LocalizedCategory, LocalizedTool, PricingTier } from "@/types/catalog";

assertEncodingHealth("catalog");

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
  return normalizeLocalizedContent(
    `tools:${locale}`,
    tools.map((tool) => ({
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
    }))
  );
}

export function getToolCount() {
  return tools.length;
}

export function getLocalizedToolBySlug(locale: Locale, slug: string) {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return null;
  }

  return normalizeLocalizedContent(
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
    } satisfies LocalizedTool
  );
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

export function formatPricing(pricing: PricingTier, locale: Locale) {
  const labels: Record<Locale, Record<PricingTier, string>> = {
    tr: {
      FREE: "Ücretsiz",
      FREEMIUM: "Kısmen ücretsiz",
      PAID: "Ücretli"
    },
    en: {
      FREE: "Ücretsiz",
      FREEMIUM: "Kısmen ücretsiz",
      PAID: "Ücretli"
    }
  };

  return labels[locale][pricing];
}

export function getToolOutboundUrl(tool: { affiliateUrl?: string; websiteUrl: string }) {
  return tool.affiliateUrl?.trim() || tool.websiteUrl;
}

