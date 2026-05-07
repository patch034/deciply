import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryHero } from "@/components/catalog/category-hero";
import { PremiumButton } from "@/components/ui/premium-button";
import { getLocalizedCategoryBySlug } from "@/lib/catalog";
import { categoryUiCopy, getCategoryHubItem } from "@/lib/category-taxonomy";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";

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
  const fallbackCategory = getLocalizedCategoryBySlug(safeLocale, slug);
  const hubItem = getCategoryHubItem(safeLocale, slug);

  if (!fallbackCategory && !hubItem) {
    return {};
  }

  return {
    title: hubItem?.seoTitle ?? fallbackCategory?.seoTitle,
    description: hubItem?.seoDescription ?? fallbackCategory?.seoDescription,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/categories/${slug}`),
      languages: buildAlternates(`/categories/${slug}`)
    }
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const category = getLocalizedCategoryBySlug(safeLocale, slug);
  const hubItem = getCategoryHubItem(safeLocale, slug);

  if (!category || !hubItem) {
    notFound();
  }

  const copy = categoryUiCopy[safeLocale];

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-[1440px] flex-col gap-7 overflow-x-clip px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <CategoryHero
        eyebrow={copy.eyebrow}
        title={hubItem.name}
        description={hubItem.description}
        supportText={hubItem.supportText}
        ctaLabel={copy.backToCategories}
        ctaHref={`/${safeLocale}/categories`}
      />

      <section className="rounded-[18px] border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">{copy.subcategories}</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">{hubItem.name}</h2>
          </div>
          <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
            {hubItem.toolCount} {copy.toolCountLabel}
          </span>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {hubItem.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/${safeLocale}/category/${subcategory.routeSlug}`}
              className="group flex h-10 items-center justify-between gap-3 rounded-[10px] border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/70 hover:text-slate-950"
              aria-label={`${copy.openLabel}: ${subcategory.name}`}
            >
              <span className="clamp-1 min-w-0">{subcategory.name}</span>
              <span className="shrink-0 text-xs font-bold text-slate-400 group-hover:text-sky-700">
                {subcategory.toolCount}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex justify-center">
        <PremiumButton href={`/${safeLocale}/categories`} variant="secondary">
          {copy.backToCategories}
        </PremiumButton>
      </div>
    </div>
  );
}
