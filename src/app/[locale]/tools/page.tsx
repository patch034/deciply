import type { Metadata } from "next";

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
import { getToolLogoUrl } from "@/lib/logo";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
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
  const heroCopy = localizeTree(
    safeLocale,
    safeLocale === "tr"
      ? {
          title: "AI araçlarını keşfet",
          subtitle: "Araçları, kategorileri ve kullanım amaçlarını hızlıca tara."
        }
      : {
          title: "Explore AI tools",
          subtitle: "Scan tools, categories, and use cases faster."
        }
  );
  const searchPlaceholder =
    safeLocale === "tr"
      ? "Araç ara, kategori ara veya kullanım amacını yaz…"
      : localizeTree(
          safeLocale,
          getContentBaseLocale(safeLocale) === "tr"
            ? "Araç ara, kategori ara veya kullanım amacını yaz…"
            : "Search tools, categories, or use cases…"
        );

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
    <div className="ui-page-shell relative mx-auto flex w-full max-w-7xl flex-col gap-5 overflow-x-clip px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <section className="rounded-[24px] border border-slate-200 bg-white/84 px-5 py-5 shadow-[0_14px_34px_rgba(15,23,42,0.055)] backdrop-blur">
        <h1 className="text-[2rem] font-black tracking-[-0.05em] text-slate-950 sm:text-[2.4rem]">{heroCopy.title}</h1>
        <p className="clamp-1 mt-1.5 max-w-3xl text-sm font-medium leading-6 text-slate-600">{heroCopy.subtitle}</p>
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
          searchPlaceholder,
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
