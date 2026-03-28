"use client";

import { useDeferredValue, useState } from "react";

import { ToolCard } from "@/components/catalog/tool-card";
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
};

type ToolsExplorerProps = {
  locale: Locale;
  tools: ExplorerTool[];
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
        "rounded-full border px-4 py-2 text-sm font-semibold transition duration-200",
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
  toolCategoryOptions,
  useCaseOptions,
  detailLabel,
  copy
}: ToolsExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeToolCategory, setActiveToolCategory] = useState("all");
  const [activePricing, setActivePricing] = useState<"all" | PricingTier>("all");
  const [activeUseCase, setActiveUseCase] = useState("all");
  const deferredQuery = useDeferredValue(query);

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

  return (
    <>
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.94),rgba(15,23,42,0.92))] p-6 shadow-card md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
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
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="h-12 w-full rounded-[18px] border border-transparent bg-transparent px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/30 focus:bg-white/[0.03]"
              />
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-400">{copy.searchHelp}</p>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <p className="text-sm font-semibold text-slate-100">
                {filteredTools.length} {copy.resultsLabel}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveToolCategory("all");
                    setActivePricing("all");
                    setActiveUseCase("all");
                  }}
                  className="inline-flex items-center rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
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
                    onClick={() => setActiveToolCategory("all")}
                  />
                  {toolCategoryOptions.map((option) => (
                    <FilterChip
                      key={option.slug}
                      label={option.label}
                      active={activeToolCategory === option.slug}
                      onClick={() => setActiveToolCategory(option.slug)}
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
                    onClick={() => setActivePricing("all")}
                  />
                  <FilterChip label={locale === "tr" ? "Ücretsiz" : "Free"} active={activePricing === "FREE"} onClick={() => setActivePricing("FREE")} />
                  <FilterChip
                    label={locale === "tr" ? "Kısmen ücretsiz" : "Freemium"}
                    active={activePricing === "FREEMIUM"}
                    onClick={() => setActivePricing("FREEMIUM")}
                  />
                  <FilterChip label={locale === "tr" ? "Ücretli" : "Paid"} active={activePricing === "PAID"} onClick={() => setActivePricing("PAID")} />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.useCaseLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FilterChip
                    label={copy.allUseCasesLabel}
                    active={activeUseCase === "all"}
                    onClick={() => setActiveUseCase("all")}
                  />
                  {useCaseOptions.map((option) => (
                    <FilterChip
                      key={option.slug}
                      label={option.label}
                      active={activeUseCase === option.slug}
                      onClick={() => setActiveUseCase(option.slug)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {filteredTools.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              locale={locale}
              tool={tool}
              categoryNames={tool.toolCategoryLabels}
              pricingLabel={tool.pricingLabel}
              detailLabel={detailLabel}
              bestForLabel={copy.bestForLabel}
              useCaseLabel={tool.useCaseLabels[0]}
            />
          ))}
        </section>
      ) : (
        <section className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-10 text-center shadow-card">
          <h3 className="text-xl font-bold tracking-tight text-slate-100">{copy.emptyTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">{copy.emptyDescription}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveToolCategory("all");
              setActivePricing("all");
              setActiveUseCase("all");
            }}
            className="mt-6 inline-flex items-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            {copy.resetFiltersLabel}
          </button>
        </section>
      )}
    </>
  );
}
