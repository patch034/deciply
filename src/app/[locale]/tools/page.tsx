import type { Metadata } from "next";

import { CategoryHero } from "@/components/catalog/category-hero";
import { ToolsExplorer } from "@/components/catalog/tools-explorer";
import { toolCategoryOptions, useCaseOptions } from "@/data/tool-taxonomy";
import {
  formatPricing,
  getCatalogContent,
  getCategoryNamesMap,
  getLocalizedTools,
  getToolCount,
  parseToolsQueryFilters
} from "@/lib/catalog";
import { buildComparisonPath, getComparisonTargetSlugs } from "@/lib/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";
import { buildToolsIndexMetaDescription, buildToolsPageTitle } from "@/lib/seo";

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    category?: string | string[];
    pricing?: string | string[];
    useCase?: string | string[];
  }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;
  const { page } = parseToolsQueryFilters(resolvedSearchParams);
  const canonicalPath = `/${locale}/tools?page=${page}`;

  return {
    title: buildToolsPageTitle(safeLocale, page),
    description: buildToolsIndexMetaDescription(safeLocale, getToolCount(), page),
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(canonicalPath)
    }
  };
}

export default async function ToolsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    category?: string | string[];
    pricing?: string | string[];
    useCase?: string | string[];
  }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const content = getCatalogContent(safeLocale);
  const toolItems = getLocalizedTools(safeLocale);
  const categoryNames = getCategoryNamesMap(safeLocale);
  const toolCategoryLabelMap = new Map<string, string>(
    toolCategoryOptions[safeLocale].map((item): [string, string] => [item.slug, item.label])
  );
  const useCaseLabelMap = new Map<string, string>(
    useCaseOptions[safeLocale].map((item): [string, string] => [item.slug, item.label])
  );

  const explorerTools = toolItems.map((tool) => {
    const siteCategoryNames = tool.categorySlugs.map((item) => categoryNames.get(item) ?? item);
    const toolCategoryLabels = tool.toolCategorySlugs.map(
      (item) => toolCategoryLabelMap.get(item) ?? item
    );
    const useCaseLabels = tool.useCaseSlugs.map((item) => useCaseLabelMap.get(item) ?? item);
    const primaryComparisonTarget = getComparisonTargetSlugs(tool.slug, 1)[0];

    return {
      ...tool,
      pricingLabel: formatPricing(tool.pricing, safeLocale),
      toolCategoryLabels,
      useCaseLabels,
      compareHref: primaryComparisonTarget
        ? buildComparisonPath(safeLocale, tool.slug, primaryComparisonTarget)
        : undefined,
      searchKeywords: [
        tool.name,
        tool.shortDescription,
        tool.whatItActuallyDoes,
        tool.whoShouldUseSummary,
        tool.realUseCaseExample.title,
        tool.realUseCaseExample.description,
        ...siteCategoryNames,
        ...toolCategoryLabels,
        ...useCaseLabels,
        formatPricing(tool.pricing, safeLocale)
      ]
    };
  });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <CategoryHero
        eyebrow={content.toolsIndex.eyebrow}
        title={content.toolsIndex.title}
        description={content.toolsIndex.description}
        supportText={content.toolsIndex.filterDescription}
        ctaLabel={content.common.categoriesLabel}
        ctaHref={`/${safeLocale}/categories`}
      />

      <ToolsExplorer
        locale={safeLocale}
        tools={explorerTools}
        initialFilters={parseToolsQueryFilters(resolvedSearchParams)}
        toolCategoryOptions={[...toolCategoryOptions[safeLocale]]}
        useCaseOptions={[...useCaseOptions[safeLocale]]}
        detailLabel={content.common.viewDetailsLabel}
        copy={{
          filterTitle: content.toolsIndex.filterTitle,
          filterDescription: content.toolsIndex.filterDescription,
          searchLabel: content.toolsIndex.searchLabel,
          searchPlaceholder: content.toolsIndex.searchPlaceholder,
          searchHelp: content.toolsIndex.searchHelp,
          toolCategoryLabel: content.toolsIndex.toolCategoryLabel,
          useCaseLabel: content.toolsIndex.useCaseLabel,
          pricingFilterLabel: content.toolsIndex.pricingFilterLabel,
          allToolCategoriesLabel: content.toolsIndex.allToolCategoriesLabel,
          allUseCasesLabel: content.toolsIndex.allUseCasesLabel,
          allPricingLabel: content.toolsIndex.allPricingLabel,
          resetFiltersLabel: content.toolsIndex.resetFiltersLabel,
          resultsLabel: content.toolsIndex.resultsLabel,
          emptyTitle: content.toolsIndex.emptyTitle,
          emptyDescription: content.toolsIndex.emptyDescription,
          bestForLabel: content.toolsIndex.bestForLabel,
          pageLabel: content.toolsIndex.pageLabel,
          previousPage: content.toolsIndex.previousPage,
          nextPage: content.toolsIndex.nextPage
        }}
      />
    </div>
  );
}
