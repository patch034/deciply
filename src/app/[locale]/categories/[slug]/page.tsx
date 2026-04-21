import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryHero } from "@/components/catalog/category-hero";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { PremiumButton } from "@/components/ui/premium-button";
import { getLocalizedCategoryBySlug } from "@/lib/catalog";
import { categoryUiCopy, getCategoryHubItem } from "@/lib/category-taxonomy";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";

export const revalidate = 3600;
export const dynamicParams = true;

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

      <section className="ui-card rounded-[24px] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">{copy.subcategories}</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">{hubItem.name}</h2>
          </div>
          <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
            {hubItem.toolCount} {copy.toolCountLabel}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {hubItem.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/${safeLocale}/category/${slug}/${subcategory.slug}`}
              className="group rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)]"
            >
              <div className="flex items-start justify-between gap-3">
                <CategoryIcon slug={slug} label={subcategory.name} className="h-10 w-10 shrink-0" />
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                  {subcategory.toolCount} {copy.toolCountLabel}
                </span>
              </div>
              <h3 className="clamp-2 mt-3 text-base font-black leading-6 text-slate-950">{subcategory.name}</h3>
              <p className="clamp-2 mt-2 text-xs leading-5 text-slate-500">{subcategory.description}</p>
              <span className="mt-4 inline-flex text-sm font-bold text-sky-700 group-hover:text-[#0055FF]">
                {copy.openLabel} →
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
