import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryHero } from "@/components/catalog/category-hero";
import { CategoryIcon } from "@/components/catalog/category-icon";
import { PremiumButton } from "@/components/ui/premium-button";
import { formatPricing, getLocalizedCategoryBySlug, getToolsByCategory } from "@/lib/catalog";
import { getCategoryHubItem } from "@/lib/category-taxonomy";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import { getToolLogoUrl } from "@/lib/logo";

export const revalidate = 3600;
export const dynamicParams = true;

const copyBase = {
  tr: {
    eyebrow: "Kategori merkezi",
    subcategories: "Alt kategoriler",
    previewTools: "Öne çıkan araçlar",
    openSubcategory: "Alt kategoriyi aç",
    inspect: "İncele",
    allCategories: "Kategorilere dön",
    toolsLabel: "araç"
  },
  en: {
    eyebrow: "Category hub",
    subcategories: "Subcategories",
    previewTools: "Featured tools",
    openSubcategory: "Open subcategory",
    inspect: "Inspect",
    allCategories: "Back to categories",
    toolsLabel: "tools"
  }
} as const;

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
  const category = getLocalizedCategoryBySlug(safeLocale, slug);

  if (!category) {
    return {};
  }

  return {
    title: category.seoTitle,
    description: category.seoDescription,
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

  const copy = localizeTree(safeLocale, copyBase[getContentBaseLocale(safeLocale)]);
  const tools = getToolsByCategory(safeLocale, slug)
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      return right.rating - left.rating;
    })
    .slice(0, 12);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-[1440px] flex-col gap-7 overflow-x-clip px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <CategoryHero
        eyebrow={copy.eyebrow}
        title={category.name}
        description={category.description}
        supportText={category.supportText}
        ctaLabel={copy.allCategories}
        ctaHref={`/${safeLocale}/categories`}
      />

      <section className="ui-card rounded-[24px] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">{copy.subcategories}</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">{category.name}</h2>
          </div>
          <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
            {hubItem.toolCount} {copy.toolsLabel}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hubItem.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/${safeLocale}/categories/${slug}/${subcategory.slug}`}
              className="ui-inner-panel ui-card-hover rounded-[20px] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <CategoryIcon slug={slug} label={subcategory.name} className="h-10 w-10 shrink-0" />
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500">
                  {subcategory.toolCount}
                </span>
              </div>
              <h3 className="clamp-2 mt-3 text-base font-black leading-6 text-slate-950">{subcategory.name}</h3>
              <p className="clamp-2 mt-2 text-xs leading-5 text-slate-500">{subcategory.description}</p>
              <span className="mt-4 inline-flex text-sm font-bold text-sky-700">{copy.openSubcategory} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ui-card rounded-[24px] p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">{copy.previewTools}</h2>
          <PremiumButton href={`/${safeLocale}/tools`} variant="secondary">
            {copy.inspect}
          </PremiumButton>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </section>
    </div>
  );
}
