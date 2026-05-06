import type { Metadata } from "next";
import { Suspense } from "react";

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
import { buildToolsIndexMetaDescription, buildToolsPageTitle } from "@/lib/seo";

const toolsPageCopy = {
  tr: { title: "AI araçlarını keşfet", subtitle: "Araçları, kategorileri ve kullanım amaçlarını hızlıca tara.", placeholder: "Araç ara, kategori ara veya kullanım amacını yaz…" },
  en: { title: "Explore AI tools", subtitle: "Scan tools, categories, and use cases faster.", placeholder: "Search tools, categories, or use cases…" },
  ar: { title: "استكشف أدوات AI", subtitle: "تصفح الأدوات والفئات وحالات الاستخدام بسرعة.", placeholder: "ابحث عن أداة أو فئة أو اكتب هدف الاستخدام…" },
  ru: { title: "Изучайте AI-инструменты", subtitle: "Быстрее просматривайте инструменты, категории и сценарии.", placeholder: "Ищите инструмент, категорию или задачу…" },
  zh: { title: "探索 AI 工具", subtitle: "更快浏览工具、分类和使用场景。", placeholder: "搜索工具、分类或输入使用目的…" },
  ja: { title: "AIツールを探す", subtitle: "ツール、カテゴリ、用途をすばやく確認できます。", placeholder: "ツール名、カテゴリ、利用目的を検索…" },
  ko: { title: "AI 도구 탐색", subtitle: "도구, 카테고리, 사용 목적을 빠르게 훑어보세요.", placeholder: "도구, 카테고리 또는 사용 목적 검색…" },
  el: { title: "Ανακαλύψτε εργαλεία AI", subtitle: "Σαρώστε γρήγορα εργαλεία, κατηγορίες και χρήσεις.", placeholder: "Αναζήτηση εργαλείου, κατηγορίας ή σκοπού χρήσης…" },
  da: { title: "Udforsk AI-værktøjer", subtitle: "Scan værktøjer, kategorier og brugsscenarier hurtigere.", placeholder: "Søg efter værktøj, kategori eller brugsmål…" },
  fa: { title: "ابزارهای AI را کشف کنید", subtitle: "ابزارها، دسته‌ها و کاربردها را سریع‌تر مرور کنید.", placeholder: "ابزار، دسته یا هدف استفاده را جستجو کنید…" }
} as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const canonicalPath = `/${safeLocale}/tools`;
  const alternatesPath = "/tools";

  return {
    title: buildToolsPageTitle(safeLocale, 1),
    description: buildToolsIndexMetaDescription(safeLocale, getToolCount(), 1),
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(alternatesPath)
    }
  };
}

export default async function ToolsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
  const heroCopy = toolsPageCopy[safeLocale];
  const searchPlaceholder = heroCopy.placeholder;
  const initialFilters = parseToolsQueryFilters({});

  const explorerTools = toolItems.map((tool, index) => {
    const siteCategoryNames = tool.categorySlugs.map((item) => categoryNames.get(item) ?? item);
    const toolCategoryLabels = tool.toolCategorySlugs.map((item) => toolCategoryLabelMap.get(item) ?? item);
    const useCaseLabels = tool.useCaseSlugs.map((item) => useCaseLabelMap.get(item) ?? item);
    const primaryComparisonTarget = getComparisonTargetSlugs(tool.slug, 1)[0];

    return {
      slug: tool.slug,
      name: tool.name,
      shortDescription: tool.shortDescription,
      pricing: tool.pricing,
      rating: tool.rating,
      featured: tool.featured,
      categorySlugs: tool.categorySlugs,
      toolCategorySlugs: tool.toolCategorySlugs,
      useCaseSlugs: tool.useCaseSlugs,
      websiteUrl: tool.websiteUrl,
      sourceIndex: index,
      logoUrl: getToolLogoUrl(tool.websiteUrl),
      pricingLabel: formatPricing(tool.pricing, safeLocale),
      toolCategoryLabels,
      useCaseLabels,
      compareHref: primaryComparisonTarget
        ? buildComparisonPath(safeLocale, tool.slug, primaryComparisonTarget)
        : undefined,
      searchKeywords: [
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

      <Suspense fallback={null}>
        <ToolsExplorer
          locale={safeLocale}
          tools={explorerTools}
          initialFilters={initialFilters}
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
      </Suspense>
    </div>
  );
}
