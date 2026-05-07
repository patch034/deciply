import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolCard } from "@/components/catalog/tool-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { formatPricing, getCategoryNamesMap, getLocalizedCategoryBySlug } from "@/lib/catalog";
import {
  categoryUiCopy,
  getCategoryHubItem,
  getSubcategory,
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
  params: Promise<{ locale: string; slug: string; subCategory: string }>;
}): Promise<Metadata> {
  const { locale, slug, subCategory } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const category = getLocalizedCategoryBySlug(safeLocale, slug);
  const hubItem = getCategoryHubItem(safeLocale, slug);
  const subcategory = getSubcategory(safeLocale, slug, subCategory);

  if (!category || !hubItem || !subcategory) {
    return {};
  }

  const alternatePaths = getSubcategoryRouteAlternates(slug, subCategory);
  const languages = Object.fromEntries(
    Object.entries(alternatePaths).map(([alternateLocale, path]) => [alternateLocale, buildCanonicalUrl(path)])
  ) as Record<string, string>;

  return {
    title: `${subcategory.name} | ${hubItem.name} | Deciply`,
    description: subcategory.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/category/${subcategory.routeSlug}`),
      languages: {
        ...languages,
        "x-default": languages.en
      }
    }
  };
}

export default async function SubcategoryPage({
  params
}: {
  params: Promise<{ locale: string; slug: string; subCategory: string }>;
}) {
  const { locale, slug, subCategory } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const category = getLocalizedCategoryBySlug(safeLocale, slug);
  const hubItem = getCategoryHubItem(safeLocale, slug);
  const subcategory = getSubcategory(safeLocale, slug, subCategory);

  if (!category || !hubItem || !subcategory) {
    notFound();
  }

  const copy = categoryUiCopy[safeLocale];
  const tools = getToolsBySubcategory(safeLocale, slug, subCategory);
  const categoryNames = getCategoryNamesMap(safeLocale);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-[1440px] flex-col gap-7 overflow-x-clip px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="ui-card rounded-[26px] p-6 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">{copy.subcategories}</p>
            <h1 className="mt-2 text-[2rem] font-black tracking-[-0.05em] text-slate-950 sm:text-[2.7rem]">
              {subcategory.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{subcategory.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                {hubItem.name}
              </span>
              <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                {tools.length} {copy.toolCountLabel}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PremiumButton href={`/${safeLocale}/categories/${slug}`} variant="secondary">
              {copy.backToCategory}
            </PremiumButton>
            <PremiumButton href={`/${safeLocale}/categories`} variant="secondary">
              {copy.allCategories}
            </PremiumButton>
          </div>
        </div>
      </section>

      <section className="ui-card rounded-[24px] p-5 sm:p-6">
        <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">{copy.tools}</h2>
        {tools.length ? (
          <div className="mt-5 grid gap-3">
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
          <div className="mt-5 rounded-[20px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-500">
            {copy.empty}
          </div>
        )}
      </section>
    </div>
  );
}
