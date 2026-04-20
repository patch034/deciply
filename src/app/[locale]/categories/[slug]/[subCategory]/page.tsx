import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PremiumButton } from "@/components/ui/premium-button";
import { formatPricing, getLocalizedCategoryBySlug } from "@/lib/catalog";
import { categoryUiCopy, getCategoryHubItem, getSubcategory, getToolsBySubcategory } from "@/lib/category-taxonomy";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";
import { getToolLogoUrl } from "@/lib/logo";

export const revalidate = 3600;
export const dynamicParams = true;

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

  return {
    title: `${subcategory.name} | ${hubItem.name} | Deciply`,
    description: subcategory.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/categories/${slug}/${subCategory}`),
      languages: buildAlternates(`/categories/${slug}/${subCategory}`)
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
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/${safeLocale}/tools/${tool.slug}`} className="ui-inner-panel ui-card-hover rounded-[20px] p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                    <Image src={getToolLogoUrl(tool.websiteUrl)} alt={tool.name} width={44} height={44} unoptimized className="h-full w-full object-contain p-2" />
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                    {formatPricing(tool.pricing, safeLocale)}
                  </span>
                </div>
                <h3 className="clamp-1 mt-3 text-base font-black text-slate-950">{tool.name}</h3>
                <p className="clamp-2 mt-2 text-xs leading-5 text-slate-500">{tool.shortDescription}</p>
                <span className="mt-4 inline-flex text-sm font-bold text-sky-700">{copy.inspect} →</span>
              </Link>
            ))}
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
