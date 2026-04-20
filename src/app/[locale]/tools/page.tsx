import type { Metadata } from "next";
import Link from "next/link";

import { ToolsExplorer } from "@/components/catalog/tools-explorer";
import { Badge } from "@/components/ui/badge";
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
import { getToolLogoUrl } from "@/lib/logo";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";
import { buildToolsIndexMetaDescription, buildToolsPageTitle } from "@/lib/seo";

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    browse?: string | string[];
    category?: string | string[];
    pricing?: string | string[];
    useCase?: string | string[];
    sort?: string | string[];
  }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const { page } = parseToolsQueryFilters(resolvedSearchParams);
  const canonicalPath = `/${safeLocale}/tools?page=${page}`;
  const alternatesPath = `/tools?page=${page}`;

  return {
    title: buildToolsPageTitle(safeLocale, page),
    description: buildToolsIndexMetaDescription(safeLocale, getToolCount(), page),
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(alternatesPath)
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
    browse?: string | string[];
    category?: string | string[];
    pricing?: string | string[];
    useCase?: string | string[];
    sort?: string | string[];
  }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const content = getCatalogContent(safeLocale);
  const toolItems = getLocalizedTools(safeLocale);
  const categoryNames = getCategoryNamesMap(safeLocale);
  const toolCategoryLabelMap = new Map<string, string>(
    toolCategoryOptions[safeLocale].map((item): [string, string] => [item.slug, item.label])
  );
  const useCaseLabelMap = new Map<string, string>(
    useCaseOptions[safeLocale].map((item): [string, string] => [item.slug, item.label])
  );
  const categoryCount = categoryNames.size;

  const explorerTools = toolItems.map((tool, index) => {
    const siteCategoryNames = tool.categorySlugs.map((item) => categoryNames.get(item) ?? item);
    const toolCategoryLabels = tool.toolCategorySlugs.map((item) => toolCategoryLabelMap.get(item) ?? item);
    const useCaseLabels = tool.useCaseSlugs.map((item) => useCaseLabelMap.get(item) ?? item);
    const primaryComparisonTarget = getComparisonTargetSlugs(tool.slug, 1)[0];

    return {
      ...tool,
      sourceIndex: index,
      logoUrl: getToolLogoUrl(tool.websiteUrl),
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
    <div className="ui-page-shell relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="ui-card rounded-[30px] p-6 sm:p-8">
        <Badge variant="accent">{content.toolsIndex.eyebrow}</Badge>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.05em] text-slate-950 md:text-5xl">
              {content.toolsIndex.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{content.toolsIndex.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="ui-inner-panel p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {locale === "tr" ? "Araçlar" : "Tools"}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{getToolCount()}</p>
            </div>
            <div className="ui-inner-panel p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {content.common.categoriesLabel}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{categoryCount}</p>
            </div>
            <div className="ui-inner-panel p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {locale === "tr" ? "Keşif" : "Discovery"}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                {locale === "tr"
                  ? "Arama, kategori ve sıralama ile daha hızlı tarama."
                  : "Search, categories, and sorting for faster browsing."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`/${safeLocale}/categories`} className="ui-pill-link">
            {content.common.categoriesLabel}
          </Link>
          <Link href={`/${safeLocale}/compare-auto`} className="ui-pill-link border-sky-200 bg-sky-50 text-[#0055FF]">
            {locale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
          </Link>
          <Link href={`/${safeLocale}/blog`} className="ui-pill-link">
            {locale === "tr" ? "Rehberler" : "Guides"}
          </Link>
        </div>
      </section>

      <ToolsExplorer
        locale={safeLocale}
        tools={explorerTools}
        initialFilters={parseToolsQueryFilters(resolvedSearchParams)}
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
          resultsSummaryLabel: content.toolsIndex.resultsSummaryLabel,
          emptyTitle: content.toolsIndex.emptyTitle,
          emptyDescription: content.toolsIndex.emptyDescription,
          bestForLabel: content.toolsIndex.bestForLabel,
          pageLabel: content.toolsIndex.pageLabel,
          previousPage: content.toolsIndex.previousPage,
          nextPage: content.toolsIndex.nextPage,
          loadMoreLabel: content.toolsIndex.loadMoreLabel,
          sortLabel: content.toolsIndex.sortLabel,
          mostPopularLabel: content.toolsIndex.mostPopularLabel,
          highestRatedLabel: content.toolsIndex.highestRatedLabel,
          newestLabel: content.toolsIndex.newestLabel,
          freeFirstLabel: content.toolsIndex.freeFirstLabel,
          paidFirstLabel: content.toolsIndex.paidFirstLabel,
          quickIntentLabel: content.toolsIndex.quickIntentLabel,
          mobileFiltersLabel: content.toolsIndex.mobileFiltersLabel,
          mobileFiltersCloseLabel: content.toolsIndex.mobileFiltersCloseLabel
        }}
      />
    </div>
  );
}
