"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";

import { ToolCard } from "@/components/catalog/tool-card";
import type { Locale } from "@/i18n/config";
import { TOOLS_PAGE_SIZE, type ToolsQueryFilters, type ToolsSortOption } from "@/lib/catalog";
import type { PricingTier } from "@/types/catalog";

type ExplorerTool = {
  slug: string;
  name: string;
  shortDescription: string;
  pricing: PricingTier;
  pricingLabel: string;
  rating: number;
  featured: boolean;
  sourceIndex: number;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  toolCategoryLabels: string[];
  useCaseSlugs: string[];
  useCaseLabels: string[];
  compareHref?: string;
  searchKeywords: string[];
  logoUrl?: string;
  websiteUrl: string;
};

type ToolsExplorerCopy = {
  filterTitle: string;
  filterDescription: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchHelp: string;
  toolCategoryLabel: string;
  useCaseLabel: string;
  pricingFilterLabel: string;
  allToolCategoriesLabel: string;
  allUseCasesLabel: string;
  allPricingLabel: string;
  resetFiltersLabel: string;
  resultsLabel: string;
  resultsSummaryLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  bestForLabel: string;
  pageLabel: string;
  previousPage: string;
  nextPage: string;
  loadMoreLabel: string;
  sortLabel: string;
  mostPopularLabel: string;
  highestRatedLabel: string;
  newestLabel: string;
  freeFirstLabel: string;
  paidFirstLabel: string;
  quickIntentLabel: string;
  mobileFiltersLabel: string;
  mobileFiltersCloseLabel: string;
};

type ToolsExplorerProps = {
  locale: Locale;
  tools: ExplorerTool[];
  initialFilters: ToolsQueryFilters;
  detailLabel: string;
  copy: ToolsExplorerCopy;
};

type BrowseOption = {
  slug: string;
  label: string;
  matches: (tool: ExplorerTool, text: string) => boolean;
};

function normalize(text: string, locale: Locale) {
  return text.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function buildSortOptions(locale: Locale, copy: ToolsExplorerCopy) {
  return [
    { value: "popular", label: copy.mostPopularLabel },
    { value: "highest-rated", label: copy.highestRatedLabel },
    { value: "newest", label: copy.newestLabel },
    { value: "alphabetical", label: "A-Z" },
    { value: "free-first", label: locale === "tr" ? "Ücretsiz" : "Free" },
    { value: "freemium-first", label: "Freemium" },
    { value: "paid-first", label: copy.paidFirstLabel }
  ] as const satisfies readonly { value: ToolsSortOption; label: string }[];
}

function legacyCategoryToBrowse(category: string) {
  switch (category) {
    case "writing":
    case "image":
    case "video":
    case "productivity":
      return category;
    default:
      return "all";
  }
}

function buildBrowseOptions(locale: Locale): BrowseOption[] {
  const tr = locale === "tr";
  const primaryMatchers: Array<(tool: ExplorerTool, text: string) => boolean> = [];

  const create = (slug: string, label: string, matcher: (tool: ExplorerTool, text: string) => boolean): BrowseOption => {
    primaryMatchers.push(matcher);
    return { slug, label, matches: matcher };
  };

  const writing = create("writing", tr ? "Yazı" : "Writing", (tool, text) =>
    tool.toolCategorySlugs.includes("writing") ||
    includesAny(text, ["write", "writing", "copy", "content", "blog", "article", "grammar", "email", "script", "summar"])
  );

  const image = create("image", tr ? "Görsel" : "Image", (tool, text) =>
    tool.toolCategorySlugs.includes("image") ||
    includesAny(text, ["image", "photo", "picture", "design", "logo", "illustration", "graphic", "art", "portrait"])
  );

  const video = create("video", tr ? "Video" : "Video", (tool, text) =>
    tool.toolCategorySlugs.includes("video") ||
    includesAny(text, ["video", "clip", "reel", "film", "subtitle", "edit", "animation", "motion", "cut"])
  );

  const productivity = create("productivity", tr ? "Verimlilik" : "Productivity", (tool, text) =>
    tool.toolCategorySlugs.includes("productivity") ||
    includesAny(text, ["workflow", "productivity", "assistant", "meeting", "notes", "task", "calendar", "email", "planner"])
  );

  const coding = create("coding", tr ? "Kod" : "Coding", (tool, text) =>
    includesAny(text, ["code", "coding", "developer", "dev", "program", "api", "github", "cursor", "terminal", "cli", "ide", "replit", "v0"])
  );

  const marketing = create("marketing", tr ? "Pazarlama" : "Marketing", (tool, text) =>
    includesAny(text, ["marketing", "campaign", "brand", "growth", "ads", "sales", "crm", "lead", "conversion", "outreach"])
  );

  const seo = create("seo", "SEO", (tool, text) =>
    includesAny(text, ["seo", "search", "keyword", "backlink", "ranking", "serp", "marketmuse", "frase", "scalenut", "outranking", "contentshake"])
  );

  const education = create("education", tr ? "Eğitim" : "Education", (tool, text) =>
    includesAny(text, ["student", "students", "education", "learn", "study", "school", "teacher", "tutor", "classroom"])
  );

  const voice = create("voice", tr ? "Ses ve konuşma" : "Voice", (tool, text) =>
    includesAny(text, ["voice", "audio", "speech", "transcription", "podcast", "meeting", "caption", "elevenlabs", "otter", "fireflies", "notta", "fathom"])
  );

  const business = create("business", tr ? "İşletme" : "Business", (tool, text) =>
    includesAny(text, ["business", "enterprise", "startup", "operations", "support", "customer", "sales", "automation", "workflow", "hubspot", "intercom", "zendesk"])
  );

  const research = create("research", tr ? "Araştırma" : "Research", (tool, text) =>
    tool.useCaseSlugs.includes("research") ||
    includesAny(text, ["research", "answer", "paper", "citation", "query", "search", "perplexity", "phind", "analysis", "explore"])
  );

  const finance = create("finance", tr ? "Finans" : "Finance", (tool, text) =>
    includesAny(text, ["finance", "invoice", "accounting", "budget", "money", "tax", "legal", "expense"])
  );

  const social = create("social", tr ? "Sosyal medya" : "Social media", (tool, text) =>
    includesAny(text, ["social", "linkedin", "instagram", "twitter", "x ", "tiktok", "post", "scheduler", "hootsuite", "buffer", "sprout"])
  );

  const health = create("health", tr ? "Sağlık" : "Health", (tool, text) =>
    includesAny(text, ["health", "medical", "wellness", "fitness", "therapy", "doctor", "clinic"])
  );

  const other = create("other", tr ? "Diğer" : "Other", (tool, text) => !primaryMatchers.some((matcher) => matcher(tool, text)));

  return [
    { slug: "all", label: tr ? "Tümü" : "All", matches: () => true },
    writing,
    image,
    video,
    productivity,
    coding,
    marketing,
    seo,
    education,
    voice,
    business,
    research,
    finance,
    social,
    health,
    other
  ];
}

function getToolSearchText(tool: ExplorerTool, locale: Locale) {
  return normalize(
    [
      tool.name,
      tool.shortDescription,
      ...tool.searchKeywords,
      ...tool.toolCategoryLabels,
      ...tool.useCaseLabels
    ].join(" "),
    locale
  );
}

function sortTools(tools: ExplorerTool[], sort: ToolsSortOption, locale: Locale) {
  const collator = new Intl.Collator(locale === "tr" ? "tr-TR" : "en-US", { sensitivity: "base", numeric: true });
  const pricingRank = (pricing: PricingTier) => {
    switch (pricing) {
      case "FREE":
        return 0;
      case "FREEMIUM":
        return 1;
      default:
        return 2;
    }
  };

  return [...tools].sort((a, b) => {
    switch (sort) {
      case "highest-rated":
        return b.rating - a.rating || Number(b.featured) - Number(a.featured) || collator.compare(a.name, b.name);
      case "newest":
        return b.sourceIndex - a.sourceIndex || Number(b.featured) - Number(a.featured) || collator.compare(a.name, b.name);
      case "alphabetical":
        return collator.compare(a.name, b.name);
      case "free-first":
        return pricingRank(a.pricing) - pricingRank(b.pricing) || b.rating - a.rating || collator.compare(a.name, b.name);
      case "freemium-first":
        return (
          (a.pricing === "FREEMIUM" ? 0 : a.pricing === "FREE" ? 1 : 2) -
            (b.pricing === "FREEMIUM" ? 0 : b.pricing === "FREE" ? 1 : 2) ||
          b.rating - a.rating ||
          collator.compare(a.name, b.name)
        );
      case "paid-first":
        return pricingRank(b.pricing) - pricingRank(a.pricing) || b.rating - a.rating || collator.compare(a.name, b.name);
      default:
        return Number(b.featured) - Number(a.featured) || b.rating - a.rating || collator.compare(a.name, b.name);
    }
  });
}

function FilterChip({
  label,
  active,
  onClick,
  count
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition",
        active
          ? "border-sky-200 bg-sky-50 text-sky-700 shadow-[0_10px_24px_-18px_rgba(37,99,235,0.18)]"
          : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-slate-950"
      ].join(" ")}
    >
      <span>{label}</span>
      {typeof count === "number" ? <span className="text-[11px] font-semibold opacity-70">{count}</span> : null}
    </button>
  );
}

export function ToolsExplorer({ locale, tools, initialFilters, detailLabel, copy }: ToolsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialBrowse = initialFilters.browse !== "all" ? initialFilters.browse : legacyCategoryToBrowse(initialFilters.toolCategory);

  const [query, setQuery] = useState(initialFilters.query);
  const [activeBrowse, setActiveBrowse] = useState(initialBrowse);
  const [activeSort, setActiveSort] = useState<ToolsSortOption>(initialFilters.sort);
  const [page, setPage] = useState(initialFilters.page);
  const [legacyToolCategory, setLegacyToolCategory] = useState(initialBrowse === "all" ? initialFilters.toolCategory : "all");
  const [legacyPricing, setLegacyPricing] = useState<PricingTier | "all">(initialFilters.pricing);
  const [legacyUseCase, setLegacyUseCase] = useState(initialFilters.useCase);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const nextBrowse = initialFilters.browse !== "all" ? initialFilters.browse : legacyCategoryToBrowse(initialFilters.toolCategory);
    setQuery(initialFilters.query);
    setActiveBrowse(nextBrowse);
    setActiveSort(initialFilters.sort);
    setPage(initialFilters.page);
    setLegacyToolCategory(nextBrowse === "all" ? initialFilters.toolCategory : "all");
    setLegacyPricing(initialFilters.pricing);
    setLegacyUseCase(initialFilters.useCase);
  }, [initialFilters]);

  const normalizedQuery = normalize(deferredQuery.trim(), locale);
  const browseOptions = useMemo(() => buildBrowseOptions(locale), [locale]);
  const sortOptions = useMemo(() => buildSortOptions(locale, copy), [copy, locale]);

  const browseCounts = useMemo(() => {
    return new Map(
      browseOptions.map((option) => [
        option.slug,
        tools.filter((tool) => option.matches(tool, getToolSearchText(tool, locale))).length
      ])
    );
  }, [browseOptions, locale, tools]);

  const filteredTools = useMemo(() => {
    const browseOption = browseOptions.find((option) => option.slug === activeBrowse) ?? browseOptions[0];

    return tools.filter((tool) => {
      const searchText = getToolSearchText(tool, locale);
      const matchesQuery = normalizedQuery.length === 0 || searchText.includes(normalizedQuery);
      const matchesBrowse = browseOption.slug === "all" ? true : browseOption.matches(tool, searchText);
      const matchesToolCategory = legacyToolCategory === "all" || tool.toolCategorySlugs.includes(legacyToolCategory);
      const matchesPricing = legacyPricing === "all" || tool.pricing === legacyPricing;
      const matchesUseCase = legacyUseCase === "all" || tool.useCaseSlugs.includes(legacyUseCase);

      return matchesQuery && matchesBrowse && matchesToolCategory && matchesPricing && matchesUseCase;
    });
  }, [activeBrowse, browseOptions, legacyPricing, legacyToolCategory, legacyUseCase, locale, normalizedQuery, tools]);

  const sortedTools = useMemo(() => sortTools(filteredTools, activeSort, locale), [activeSort, filteredTools, locale]);
  const hasActiveFilters =
    query.length > 0 ||
    activeBrowse !== "all" ||
    activeSort !== "popular" ||
    legacyToolCategory !== "all" ||
    legacyPricing !== "all" ||
    legacyUseCase !== "all";
  const totalPages = Math.max(1, Math.ceil(sortedTools.length / TOOLS_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = sortedTools.length === 0 ? 0 : (currentPage - 1) * TOOLS_PAGE_SIZE + 1;
  const endIndex = Math.min(currentPage * TOOLS_PAGE_SIZE, sortedTools.length);
  const visibleTools = sortedTools.slice((currentPage - 1) * TOOLS_PAGE_SIZE, currentPage * TOOLS_PAGE_SIZE);

  const replaceQueryState = useCallback(
    (nextState: {
      query?: string;
      browse?: string;
      sort?: ToolsSortOption;
      page?: number;
      toolCategory?: string;
      pricing?: PricingTier | "all";
      useCase?: string;
    }) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextQuery = (nextState.query ?? query).trim();
      const nextBrowse = nextState.browse ?? activeBrowse;
      const nextSort = nextState.sort ?? activeSort;
      const nextPage = nextState.page ?? page;
      const nextToolCategory =
        nextState.browse !== undefined && nextState.toolCategory === undefined
          ? "all"
          : nextState.toolCategory ?? legacyToolCategory;
      const nextPricing = nextState.pricing ?? legacyPricing;
      const nextUseCase = nextState.useCase ?? legacyUseCase;

      if (nextQuery) {
        params.set("q", nextQuery);
      } else {
        params.delete("q");
      }

      if (nextBrowse !== "all") {
        params.set("browse", nextBrowse);
      } else {
        params.delete("browse");
      }

      if (nextToolCategory !== "all") {
        params.set("category", nextToolCategory);
      } else {
        params.delete("category");
      }

      if (nextPricing !== "all") {
        params.set("pricing", nextPricing);
      } else {
        params.delete("pricing");
      }

      if (nextUseCase !== "all") {
        params.set("useCase", nextUseCase);
      } else {
        params.delete("useCase");
      }

      if (nextSort !== "popular") {
        params.set("sort", nextSort);
      } else {
        params.delete("sort");
      }

      params.set("page", String(nextPage));

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [activeBrowse, activeSort, legacyPricing, legacyToolCategory, legacyUseCase, pathname, page, query, router, searchParams]
  );

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
      replaceQueryState({ page: currentPage });
    }
  }, [currentPage, page, replaceQueryState]);

  function setFilters(nextState: {
    query?: string;
    browse?: string;
    sort?: ToolsSortOption;
    page?: number;
    toolCategory?: string;
    pricing?: PricingTier | "all";
    useCase?: string;
  }) {
    if (nextState.query !== undefined) {
      setQuery(nextState.query);
    }

    if (nextState.browse !== undefined) {
      setActiveBrowse(nextState.browse);
      setLegacyToolCategory("all");
    }

    if (nextState.sort !== undefined) {
      setActiveSort(nextState.sort);
    }

    if (nextState.page !== undefined) {
      setPage(nextState.page);
    }

    if (nextState.toolCategory !== undefined) {
      setLegacyToolCategory(nextState.toolCategory);
    }

    if (nextState.pricing !== undefined) {
      setLegacyPricing(nextState.pricing);
    }

    if (nextState.useCase !== undefined) {
      setLegacyUseCase(nextState.useCase);
    }

    replaceQueryState(nextState);
  }

  function handleLoadMore() {
    if (currentPage < totalPages) {
      setFilters({ page: currentPage + 1 });
    }
  }

  const summaryText =
    sortedTools.length > 0 ? `${startIndex}-${endIndex} / ${sortedTools.length} ${copy.resultsLabel}` : `0 ${copy.resultsLabel}`;

  return (
    <section className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_210px] lg:items-center">
        <div className="rounded-[22px] border-2 border-sky-100 bg-white px-3 py-2 shadow-[0_18px_42px_rgba(15,23,42,0.08)] transition focus-within:border-[#007FFF] focus-within:shadow-[0_20px_50px_rgba(0,127,255,0.16)]">
          <label className="sr-only" htmlFor="tool-search">
            {copy.searchLabel}
          </label>
          <div className="flex min-h-[52px] items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#0055FF]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                <circle cx="11" cy="11" r="6.5" />
              </svg>
            </span>
            <input
              id="tool-search"
              type="search"
              value={query}
              onChange={(event) => setFilters({ query: event.target.value, page: 1 })}
              placeholder={copy.searchPlaceholder}
              className="h-11 w-full border-0 bg-transparent px-0 text-sm font-bold text-slate-950 outline-none placeholder:text-slate-400 focus:shadow-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 lg:justify-end">
          <div className="rounded-[18px] border border-slate-200 bg-white p-1.5 shadow-[0_12px_26px_rgba(15,23,42,0.045)] lg:w-[210px]">
            <label className="sr-only" htmlFor="tool-sort">
              {copy.sortLabel}
            </label>
            <select
              id="tool-sort"
              value={activeSort}
              onChange={(event) => setFilters({ sort: event.target.value as ToolsSortOption, page: 1 })}
              className="dark-select min-h-[42px] w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-sky-200"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={() =>
                setFilters({
                  query: "",
                  browse: "all",
                  sort: "popular",
                  page: 1,
                  toolCategory: "all",
                  pricing: "all",
                  useCase: "all"
                })
              }
              className="inline-flex min-h-[42px] items-center rounded-[14px] border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:text-slate-950"
            >
              {copy.resetFiltersLabel}
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {locale === "tr" ? "Kategoriye göre keşfet" : "Browse by category"}
          </p>
          <p className="text-xs font-semibold text-slate-500">{summaryText}</p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {browseOptions.map((option) => (
              <FilterChip
                key={option.slug}
                label={option.label}
                count={browseCounts.get(option.slug)}
                active={activeBrowse === option.slug}
                onClick={() => setFilters({ browse: option.slug, page: 1 })}
              />
            ))}
          </div>
        </div>
      </div>

      {sortedTools.length > 0 ? (
        <>
          <section className="grid grid-cols-1 gap-2.5">
            {visibleTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                locale={locale}
                tool={tool}
                categoryNames={tool.toolCategoryLabels}
                pricingLabel={tool.pricingLabel}
                detailLabel={detailLabel}
                bestForLabel={copy.bestForLabel}
                useCaseLabel={tool.useCaseLabels[0]}
                compareHref={tool.compareHref}
                logoUrl={tool.logoUrl}
                variant="row"
              />
            ))}
          </section>

          <div className="flex flex-col items-center gap-3 py-2 sm:py-3">
            {currentPage < totalPages ? (
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex min-h-10 items-center justify-center rounded-[14px] border border-sky-200 bg-sky-50 px-4 text-sm font-semibold text-[#0055FF] transition hover:border-sky-300 hover:bg-sky-100 hover:text-[#0E2450]"
              >
                {copy.loadMoreLabel}
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <section className="ui-card rounded-[28px] border-dashed px-4 py-8 text-center sm:px-6 sm:py-10">
          <h3 className="text-xl font-bold tracking-tight text-slate-950">{copy.emptyTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">{copy.emptyDescription}</p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                query: "",
                browse: "all",
                sort: "popular",
                page: 1,
                toolCategory: "all",
                pricing: "all",
                useCase: "all"
              })
            }
            className="mt-6 inline-flex min-h-[44px] items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-slate-950"
          >
            {copy.resetFiltersLabel}
          </button>
        </section>
      )}
    </section>
  );
}
