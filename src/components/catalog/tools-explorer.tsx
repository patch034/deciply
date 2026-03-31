"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useDeferredValue, useEffect, useState } from "react";

import { ToolCard } from "@/components/catalog/tool-card";
import { TOOLS_PAGE_SIZE, type ToolsQueryFilters } from "@/lib/catalog";
import type { Locale } from "@/i18n/config";
import type { PricingTier } from "@/types/catalog";

type FilterOption = {
  slug: string;
  label: string;
};

type ExplorerTool = {
  slug: string;
  name: string;
  shortDescription: string;
  pricing: PricingTier;
  pricingLabel: string;
  rating: number;
  featured: boolean;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  toolCategoryLabels: string[];
  useCaseSlugs: string[];
  useCaseLabels: string[];
  compareHref?: string;
  searchKeywords: string[];
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
  emptyTitle: string;
  emptyDescription: string;
  bestForLabel: string;
  pageLabel: string;
  previousPage: string;
  nextPage: string;
};

type ToolsExplorerProps = {
  locale: Locale;
  tools: ExplorerTool[];
  initialFilters: ToolsQueryFilters;
  toolCategoryOptions: FilterOption[];
  useCaseOptions: FilterOption[];
  detailLabel: string;
  copy: ToolsExplorerCopy;
};

function FilterChip({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition duration-200",
        active
          ? "border-cyan-400/40 bg-cyan-400/12 text-cyan-200 shadow-[0_14px_34px_-22px_rgba(34,211,238,0.5)]"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/20 hover:text-cyan-200"
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export function ToolsExplorer({
  locale,
  tools,
  initialFilters,
  toolCategoryOptions,
  useCaseOptions,
  detailLabel,
  copy
}: ToolsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialFilters.query);
  const [activeToolCategory, setActiveToolCategory] = useState(initialFilters.toolCategory);
  const [activePricing, setActivePricing] = useState<PricingTier | "all">(initialFilters.pricing);
  const [activeUseCase, setActiveUseCase] = useState(initialFilters.useCase);
  const [page, setPage] = useState(initialFilters.page);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    setQuery(initialFilters.query);
    setActiveToolCategory(initialFilters.toolCategory);
    setActivePricing(initialFilters.pricing);
    setActiveUseCase(initialFilters.useCase);
    setPage(initialFilters.page);
  }, [initialFilters]);

  const normalizedQuery = deferredQuery.trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");

  const filteredTools = tools.filter((tool) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      tool.searchKeywords
        .join(" ")
        .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US")
        .includes(normalizedQuery);

    const matchesToolCategory =
      activeToolCategory === "all" || tool.toolCategorySlugs.includes(activeToolCategory);

    const matchesPricing = activePricing === "all" || tool.pricing === activePricing;

    const matchesUseCase = activeUseCase === "all" || tool.useCaseSlugs.includes(activeUseCase);

    return matchesQuery && matchesToolCategory && matchesPricing && matchesUseCase;
  });

  const hasActiveFilters =
    query.length > 0 || activeToolCategory !== "all" || activePricing !== "all" || activeUseCase !== "all";
  const totalPages = Math.max(1, Math.ceil(filteredTools.length / TOOLS_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const visibleTools = filteredTools.slice((currentPage - 1) * TOOLS_PAGE_SIZE, currentPage * TOOLS_PAGE_SIZE);

  const replaceQueryState = useCallback(
    (nextState: {
      query?: string;
      toolCategory?: string;
      pricing?: PricingTier | "all";
      useCase?: string;
      page?: number;
    }) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextQuery = (nextState.query ?? query).trim();
      const nextToolCategory = nextState.toolCategory ?? activeToolCategory;
      const nextPricing = nextState.pricing ?? activePricing;
      const nextUseCase = nextState.useCase ?? activeUseCase;
      const nextPage = nextState.page ?? page;

      if (nextQuery) {
        params.set("q", nextQuery);
      } else {
        params.delete("q");
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

      params.set("page", String(nextPage));

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [activePricing, activeToolCategory, activeUseCase, page, pathname, query, router, searchParams]
  );

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
      replaceQueryState({ page: currentPage });
    }
  }, [currentPage, page, replaceQueryState]);

  function setFilters(nextState: {
    query?: string;
    toolCategory?: string;
    pricing?: PricingTier | "all";
    useCase?: string;
    page?: number;
  }) {
    if (nextState.query !== undefined) {
      setQuery(nextState.query);
    }

    if (nextState.toolCategory !== undefined) {
      setActiveToolCategory(nextState.toolCategory);
    }

    if (nextState.pricing !== undefined) {
      setActivePricing(nextState.pricing);
    }

    if (nextState.useCase !== undefined) {
      setActiveUseCase(nextState.useCase);
    }

    if (nextState.page !== undefined) {
      setPage(nextState.page);
    }

    replaceQueryState(nextState);
  }

  function buildPageHref(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());
    const safeQuery = query.trim();

    if (safeQuery) {
      params.set("q", safeQuery);
    } else {
      params.delete("q");
    }

    if (activeToolCategory !== "all") {
      params.set("category", activeToolCategory);
    } else {
      params.delete("category");
    }

    if (activePricing !== "all") {
      params.set("pricing", activePricing);
    } else {
      params.delete("pricing");
    }

    if (activeUseCase !== "all") {
      params.set("useCase", activeUseCase);
    } else {
      params.delete("useCase");
    }

    params.set("page", String(pageNumber));

    return `${pathname}?${params.toString()}`;
  }

  return (
    <>
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.94),rgba(15,23,42,0.92))] p-4 shadow-card sm:p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">{copy.filterTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{copy.filterDescription}</p>

            <label className="mt-6 block text-sm font-semibold text-slate-200" htmlFor="tool-search">
              {copy.searchLabel}
            </label>
            <div className="mt-3 rounded-[22px] border border-white/10 bg-white/[0.04] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <input
                id="tool-search"
                type="search"
                value={query}
                onChange={(event) => setFilters({ query: event.target.value, page: 1 })}
                placeholder={copy.searchPlaceholder}
                className="h-12 w-full rounded-[18px] border border-transparent bg-transparent px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/30 focus:bg-white/[0.03]"
              />
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-400">{copy.searchHelp}</p>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <p className="text-sm font-semibold text-slate-100">
                {filteredTools.length} {copy.resultsLabel}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      query: "",
                      toolCategory: "all",
                      pricing: "all",
                      useCase: "all",
                      page: 1
                    })
                  }
                  className="inline-flex min-h-[40px] items-center rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  {copy.resetFiltersLabel}
                </button>
              ) : null}
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.toolCategoryLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FilterChip
                    label={copy.allToolCategoriesLabel}
                    active={activeToolCategory === "all"}
                    onClick={() => setFilters({ toolCategory: "all", page: 1 })}
                  />
                  {toolCategoryOptions.map((option) => (
                    <FilterChip
                      key={option.slug}
                      label={option.label}
                      active={activeToolCategory === option.slug}
                      onClick={() => setFilters({ toolCategory: option.slug, page: 1 })}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.pricingFilterLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FilterChip
                    label={copy.allPricingLabel}
                    active={activePricing === "all"}
                    onClick={() => setFilters({ pricing: "all", page: 1 })}
                  />
                  <FilterChip label={locale === "tr" ? "Ücretsiz" : "Free"} active={activePricing === "FREE"} onClick={() => setFilters({ pricing: "FREE", page: 1 })} />
                  <FilterChip
                    label={locale === "tr" ? "Kısmen ücretsiz" : "Freemium"}
                    active={activePricing === "FREEMIUM"}
                    onClick={() => setFilters({ pricing: "FREEMIUM", page: 1 })}
                  />
                  <FilterChip label={locale === "tr" ? "Ücretli" : "Paid"} active={activePricing === "PAID"} onClick={() => setFilters({ pricing: "PAID", page: 1 })} />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.useCaseLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FilterChip
                    label={copy.allUseCasesLabel}
                    active={activeUseCase === "all"}
                    onClick={() => setFilters({ useCase: "all", page: 1 })}
                  />
                  {useCaseOptions.map((option) => (
                    <FilterChip
                      key={option.slug}
                      label={option.label}
                      active={activeUseCase === option.slug}
                      onClick={() => setFilters({ useCase: option.slug, page: 1 })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {visibleTools.length > 0 ? (
        <>
          <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
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
              />
            ))}
          </section>

          {totalPages > 1 ? (
            <nav
              aria-label={`${copy.pageLabel} navigation`}
              className="flex w-full max-w-full flex-wrap items-center justify-center gap-2 overflow-x-hidden sm:gap-3"
            >
              {currentPage > 1 ? (
                <Link
                  href={buildPageHref(currentPage - 1)}
                  scroll={false}
                  onClick={() => setPage(currentPage - 1)}
                  className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/12 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  {`← ${copy.previousPage}`}
                </Link>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/8 bg-white/[0.03] px-4 text-sm font-medium text-slate-500/70">
                  {`← ${copy.previousPage}`}
                </span>
              )}

              <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
                {pageNumbers.map((pageNumber) => {
                  const isActive = pageNumber === currentPage;

                  return isActive ? (
                    <span
                      key={pageNumber}
                      aria-current="page"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-cyan-400/40 bg-cyan-400/12 px-4 text-sm font-semibold text-cyan-200 shadow-[0_10px_30px_-18px_rgba(34,211,238,0.45)]"
                    >
                      {pageNumber}
                    </span>
                  ) : (
                    <Link
                      key={pageNumber}
                      href={buildPageHref(pageNumber)}
                      scroll={false}
                      onClick={() => setPage(pageNumber)}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-white/12 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                    >
                      {pageNumber}
                    </Link>
                  );
                })}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={buildPageHref(currentPage + 1)}
                  scroll={false}
                  onClick={() => setPage(currentPage + 1)}
                  className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/12 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  {`${copy.nextPage} →`}
                </Link>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/8 bg-white/[0.03] px-4 text-sm font-medium text-slate-500/70">
                  {`${copy.nextPage} →`}
                </span>
              )}
            </nav>
          ) : null}
        </>
      ) : (
        <section className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center shadow-card sm:px-6 sm:py-10">
          <h3 className="text-xl font-bold tracking-tight text-slate-100">{copy.emptyTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">{copy.emptyDescription}</p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                query: "",
                toolCategory: "all",
                pricing: "all",
                useCase: "all",
                page: 1
              })
            }
            className="mt-6 inline-flex min-h-[44px] items-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            {copy.resetFiltersLabel}
          </button>
        </section>
      )}
    </>
  );
}