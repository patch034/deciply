import type { Metadata } from "next";

import { CategoryCard } from "@/components/catalog/category-card";
import { CategoryHero } from "@/components/catalog/category-hero";
import { getCatalogContent, getLocalizedCategories } from "@/lib/catalog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const content = getCatalogContent(locale as Locale);

  return {
    title: content.categoriesIndex.title,
    description: content.categoriesIndex.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${locale}/categories`),
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

  const safeLocale = locale as Locale;
  const content = getCatalogContent(safeLocale);
  const categoryItems = getLocalizedCategories(safeLocale);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <CategoryHero
        eyebrow={content.categoriesIndex.eyebrow}
        title={content.categoriesIndex.title}
        description={content.categoriesIndex.description}
        supportText={content.categoryDetail.internalLinksDescription}
        ctaLabel={content.toolsIndex.title}
        ctaHref={`/${safeLocale}/tools`}
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categoryItems.map((category) => (
          <CategoryCard
            key={category.slug}
            locale={safeLocale}
            category={category}
            linkLabel={content.categoriesIndex.cardLinkLabel}
          />
        ))}
      </section>
    </div>
  );
}


