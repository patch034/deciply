import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import { getLocalizedCategoryBySlug, getToolsByCategory } from "@/lib/catalog";
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

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(safeLocale, slug);

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={safeLocale === "tr" ? "Kategori detay preview" : "Category detail preview"}
      title={category.name}
      description={category.description}
      breadcrumbs={[
        { label: safeLocale === "tr" ? "Ana sayfa" : "Home", href: `/${safeLocale}` },
        { label: safeLocale === "tr" ? "Kategoriler" : "Categories", href: `/${safeLocale}/categories` },
        { label: category.name }
      ]}
      badges={[
        category.supportText,
        `${tools.length} ${safeLocale === "tr" ? "araç" : "tools"}`
      ]}
      stats={[
        {
          label: safeLocale === "tr" ? "Araç sayısı" : "Tools",
          value: String(tools.length)
        },
        {
          label: safeLocale === "tr" ? "Kategori slug" : "Category slug",
          value: category.slug
        },
        {
          label: safeLocale === "tr" ? "Durum" : "Status",
          value: safeLocale === "tr" ? "Yeni tema preview" : "New theme preview"
        }
      ]}
      primaryAction={{
        label: safeLocale === "tr" ? "Araçları görüntüle" : "Browse tools",
        href: `/${safeLocale}/tools`
      }}
      secondaryAction={{
        label: safeLocale === "tr" ? "Kategorilere dön" : "Back to categories",
        href: `/${safeLocale}/categories`
      }}
      sections={[
        {
          title: safeLocale === "tr" ? "Yeni kategori hero" : "New category hero",
          description:
            safeLocale === "tr"
              ? "Kategori üst alanı yeni sistemde daha net açıklama, daha güçlü CTA ve daha görünür araç yoğunluğu ile tekrar kurulacak."
              : "The category hero will be rebuilt with a clearer description, stronger CTA, and more visible tool density."
        },
        {
          title: safeLocale === "tr" ? "Arşiv ve yan yüzeyler" : "Archive and side surfaces",
          description:
            safeLocale === "tr"
              ? "Araç arşivi, ilgili rehberler, karşılaştırmalar ve yan bilgi kutuları bu yeni kart sistemine taşınacak."
              : "Tool archives, related guides, comparisons, and supporting side panels will be moved into this new card system."
        }
      ]}
    />
  );
}
