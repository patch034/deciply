import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ToolCard } from "@/components/catalog/tool-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { formatPricing, getCategoryNamesMap } from "@/lib/catalog";
import {
  categoryUiCopy,
  getCategoryHubItem,
  getSubcategoryByRouteSlug,
  getSubcategoryRouteAlternates,
  getToolsBySubcategory
} from "@/lib/category-taxonomy";
import { buildComparisonPath, getComparisonTargetSlugs } from "@/lib/comparisons";
import { buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";
import { getToolLogoUrl } from "@/lib/logo";

export const revalidate = 3600;
export const dynamicParams = true;

// Do not generate all combinations. This project must not exceed safe static route limits.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const resolved = getSubcategoryByRouteSlug(safeLocale, slug);

  if (!resolved) {
    return {};
  }

  const alternatePaths = getSubcategoryRouteAlternates(resolved.category.slug, resolved.subcategory.slug);
  const languages = Object.fromEntries(
    Object.entries(alternatePaths).map(([alternateLocale, path]) => [alternateLocale, buildCanonicalUrl(path)])
  ) as Record<string, string>;

  return {
    title: `${resolved.subcategory.name} | ${resolved.category.name} | Deciply`,
    description: resolved.subcategory.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/category/${resolved.subcategory.routeSlug}`),
      languages: {
        ...languages,
        "x-default": languages.en
      }
    }
  };
}

export default async function LocalizedSubcategoryPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const resolved = getSubcategoryByRouteSlug(safeLocale, slug);

  if (!resolved) {
    const category = getCategoryHubItem(safeLocale, slug);

    if (category) {
      redirect(`/${safeLocale}/categories/${category.slug}`);
    }

    notFound();
  }

  const { category, subcategory } = resolved;
  const copy = categoryUiCopy[safeLocale];
  const tools = getToolsBySubcategory(safeLocale, category.slug, subcategory.slug);
  const categoryNames = getCategoryNamesMap(safeLocale);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 overflow-x-clip px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">{copy.subcategories}</p>
            <h1 className="mt-2 text-[2rem] font-black tracking-[-0.05em] text-slate-950 sm:text-[2.6rem]">
              {subcategory.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{subcategory.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                {category.name}
              </span>
              <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                {tools.length} {copy.toolCountLabel}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PremiumButton href={`/${safeLocale}/categories/${category.slug}`} variant="secondary">
              {copy.backToCategory}
            </PremiumButton>
            <PremiumButton href={`/${safeLocale}/categories`} variant="secondary">
              {copy.allCategories}
            </PremiumButton>
          </div>
        </div>
      </section>

      <section className="rounded-[18px] border border-slate-200 bg-white p-4 sm:p-5">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">{copy.tools}</h2>
        {tools.length ? (
          <div className="mt-4 grid gap-3">
            {tools.map((tool) => {
              const primaryComparisonTarget = getComparisonTargetSlugs(tool.slug, 1)[0];
              const categoryLabels = tool.toolCategorySlugs
                .map((categorySlug) => categoryNames.get(categorySlug) ?? categorySlug)
                .slice(0, 3);

              return (
                <ToolCard
                  key={tool.slug}
                  locale={safeLocale}
                  tool={tool}
                  categoryNames={categoryLabels}
                  pricingLabel={formatPricing(tool.pricing, safeLocale)}
                  detailLabel={copy.inspect}
                  compareHref={
                    primaryComparisonTarget
                      ? buildComparisonPath(safeLocale, tool.slug, primaryComparisonTarget)
                      : undefined
                  }
                  logoUrl={getToolLogoUrl(tool.websiteUrl)}
                  variant="row"
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-[14px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-500">
            {copy.empty}
          </div>
        )}
      </section>
    </div>
  );
}
