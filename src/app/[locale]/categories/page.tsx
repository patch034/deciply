import type { Metadata } from "next";

import { CategoryHero } from "@/components/catalog/category-hero";
import { CategoryNavigationHub } from "@/components/catalog/category-navigation-hub";
import { PremiumButton } from "@/components/ui/premium-button";
import { getCatalogContent } from "@/lib/catalog";
import { categoryUiCopy, getCategoryHub } from "@/lib/category-taxonomy";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";

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
  const content = getCatalogContent(safeLocale);

  return {
    title: content.categoriesIndex.title,
    description: content.categoriesIndex.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/categories`),
      languages: buildAlternates("/categories")
    }
  };
}

export default async function CategoriesPage({
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
  const hub = getCategoryHub(safeLocale);
  const copy = categoryUiCopy[safeLocale];

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-[1440px] flex-col gap-7 bg-transparent px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <CategoryHero
        eyebrow={content.categoriesIndex.eyebrow}
        title={content.categoriesIndex.title}
        description={content.categoriesIndex.description}
        supportText={copy.supportText}
        ctaLabel={content.common.allToolsLabel}
        ctaHref={`/${safeLocale}/tools`}
      />

      <CategoryNavigationHub locale={safeLocale} categories={hub} copy={copy} />

      <div className="flex justify-center">
        <PremiumButton href={`/${safeLocale}/tools`}>{content.common.allToolsLabel}</PremiumButton>
      </div>
    </div>
  );
}
