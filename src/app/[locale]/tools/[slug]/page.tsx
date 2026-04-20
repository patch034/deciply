import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import {
  buildAlternates,
  buildCanonicalUrl,
  isValidLocale,
  normalizeLocale,
  type Locale
} from "@/i18n/config";
import {
  formatPricing,
  getCategoryNamesMap,
  getLocalizedToolBySlug,
  getToolOutboundUrl
} from "@/lib/catalog";
import { buildToolMetaDescription, buildToolPageTitle } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

function buildPreviewDescription(locale: Locale, name: string, bestUseCase: string) {
  return locale === "tr"
    ? `${name} için yeni tema preview yüzeyi. Bu aşamada tam içerik yerine yeni tasarım dili, daha net bilgi hiyerarşisi ve daha temiz karar yüzeyi test ediliyor. Ana kullanım odağı: ${bestUseCase}.`
    : `A new theme preview surface for ${name}. At this stage we are testing a cleaner design language, clearer information hierarchy, and a stronger decision surface. Main fit: ${bestUseCase}.`;
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
  const tool = getLocalizedToolBySlug(safeLocale, slug);

  if (!tool) {
    return {};
  }

  return {
    title: buildToolPageTitle(safeLocale, tool),
    description: buildToolMetaDescription(safeLocale, tool),
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/tools/${slug}`),
      languages: buildAlternates(`/tools/${slug}`)
    }
  };
}

export default async function ToolDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const tool = getLocalizedToolBySlug(safeLocale, slug);

  if (!tool) {
    notFound();
  }

  const categoryNames = tool.categorySlugs
    .map((item) => getCategoryNamesMap(safeLocale).get(item) ?? item)
    .slice(0, 3);

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={safeLocale === "tr" ? "Araç detay preview" : "Tool detail preview"}
      title={tool.name}
      description={buildPreviewDescription(safeLocale, tool.name, tool.bestUseCase)}
      breadcrumbs={[
        { label: safeLocale === "tr" ? "Ana sayfa" : "Home", href: `/${safeLocale}` },
        { label: safeLocale === "tr" ? "Araçlar" : "Tools", href: `/${safeLocale}/tools` },
        { label: tool.name }
      ]}
      badges={[...categoryNames, formatPricing(tool.pricing, safeLocale)]}
      stats={[
        { label: safeLocale === "tr" ? "Fiyat" : "Pricing", value: formatPricing(tool.pricing, safeLocale) },
        { label: safeLocale === "tr" ? "Puan" : "Rating", value: `${tool.rating.toFixed(1)}/5` },
        { label: safeLocale === "tr" ? "En uygun" : "Best for", value: tool.bestUseCase }
      ]}
      primaryAction={{
        label: safeLocale === "tr" ? "Resmi aracı aç" : "Open official tool",
        href: getToolOutboundUrl(tool)
      }}
      secondaryAction={{
        label: safeLocale === "tr" ? "Karşılaştırmalara git" : "Open comparisons",
        href: `/${safeLocale}/compare`
      }}
      sections={[
        {
          title: safeLocale === "tr" ? "Yeni araç hero alanı" : "New tool hero surface",
          description:
            safeLocale === "tr"
              ? "Burada logo, kısa değer önerisi, güven sinyalleri ve karar CTA'ları daha sade bir blokta birleşecek."
              : "This area will hold the logo, short value proposition, trust cues, and main decision CTAs in a cleaner block."
        },
        {
          title: safeLocale === "tr" ? "Modüler içerik alanı" : "Modular content area",
          description:
            safeLocale === "tr"
              ? "Artılar, eksiler, kullanım senaryoları, fiyat, alternatifler ve ilgili rehberler yeni sistemin aynı kart diliyle eklenecek."
              : "Pros, cons, use cases, pricing, alternatives, and related guides will be rebuilt here with the same card language."
        }
      ]}
    />
  );
}
