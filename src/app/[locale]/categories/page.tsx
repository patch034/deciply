import type { Metadata } from "next";

import { CategoryHero } from "@/components/catalog/category-hero";
import { CategoryNavigationHub } from "@/components/catalog/category-navigation-hub";
import { PremiumButton } from "@/components/ui/premium-button";
import { getCatalogContent } from "@/lib/catalog";
import { getCategoryHub } from "@/lib/category-taxonomy";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";

const categoryCopy = {
  tr: {
    supportText: "Ana kategoriden alt kategoriye, oradan da ilgili araçlara ilerleyen daha düzenli bir keşif akışı.",
    sidebarTitle: "Kategori navigasyonu",
    subcategoryLabel: "alt kategori",
    toolCountLabel: "araç",
    openLabel: "Alt kategoriyi aç"
  },
  en: {
    supportText: "A cleaner discovery path from main category to subcategory and then into the right tools.",
    sidebarTitle: "Category navigation",
    subcategoryLabel: "subcategories",
    toolCountLabel: "tools",
    openLabel: "Open subcategory"
  }
} as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const content = getCatalogContent(normalizeLocale(locale));

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

  const safeLocale = normalizeLocale(locale);
  const content = getCatalogContent(safeLocale);
  const hub = getCategoryHub(safeLocale);
  const copy = localizeTree(safeLocale, categoryCopy[getContentBaseLocale(safeLocale)]);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-[1440px] flex-col gap-7 overflow-x-clip bg-transparent px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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
