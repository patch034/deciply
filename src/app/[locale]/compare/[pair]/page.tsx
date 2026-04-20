import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";
import {
  buildComparisonPath,
  getComparisonToolsFromPair
} from "@/lib/comparisons";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

function buildComparisonTitle(locale: Locale, left: string, right: string) {
  return locale === "tr" ? `${left} vs ${right} karşılaştırması` : `${left} vs ${right} comparison`;
}

function buildComparisonDescription(locale: Locale, left: string, right: string) {
  return locale === "tr"
    ? `${left} ve ${right} için yeni tema preview yüzeyi. Bu aşamada amaç içerik derinliği değil, temiz karşılaştırma deneyiminin iskeletini görmek.`
    : `A new theme preview surface for ${left} and ${right}. At this stage the goal is a clean comparison shell, not full content depth.`;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; pair: string }>;
}): Promise<Metadata> {
  const { locale, pair } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const comparison = getComparisonToolsFromPair(safeLocale, pair);

  if (!comparison) {
    return {};
  }

  const title = buildComparisonTitle(safeLocale, comparison.leftTool.name, comparison.rightTool.name);
  const description = buildComparisonDescription(safeLocale, comparison.leftTool.name, comparison.rightTool.name);

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/compare/${comparison.canonicalPairSlug}`),
      languages: buildAlternates(`/compare/${comparison.canonicalPairSlug}`)
    }
  };
}

export default async function ComparisonPage({
  params
}: {
  params: Promise<{ locale: string; pair: string }>;
}) {
  const { locale, pair } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const comparison = getComparisonToolsFromPair(safeLocale, pair);

  if (!comparison) {
    notFound();
  }

  if (!comparison.isCanonical) {
    redirect(buildComparisonPath(safeLocale, comparison.leftTool.slug, comparison.rightTool.slug));
  }

  const title = buildComparisonTitle(safeLocale, comparison.leftTool.name, comparison.rightTool.name);
  const description = buildComparisonDescription(safeLocale, comparison.leftTool.name, comparison.rightTool.name);

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={safeLocale === "tr" ? "Karşılaştırma preview" : "Comparison preview"}
      title={title}
      description={description}
      breadcrumbs={[
        { label: safeLocale === "tr" ? "Ana sayfa" : "Home", href: `/${safeLocale}` },
        { label: safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons", href: `/${safeLocale}/compare` },
        { label: title }
      ]}
      badges={[
        comparison.leftTool.bestUseCase,
        comparison.rightTool.bestUseCase,
        safeLocale === "tr" ? "Yeni tema yüzeyi" : "New theme surface"
      ]}
      stats={[
        { label: safeLocale === "tr" ? "Sol araç" : "Left tool", value: comparison.leftTool.name },
        { label: safeLocale === "tr" ? "Sağ araç" : "Right tool", value: comparison.rightTool.name },
        { label: safeLocale === "tr" ? "Durum" : "Status", value: safeLocale === "tr" ? "Preview" : "Preview" }
      ]}
      primaryAction={{
        label: safeLocale === "tr" ? `${comparison.leftTool.name} sayfası` : `${comparison.leftTool.name} page`,
        href: `/${safeLocale}/tools/${comparison.leftTool.slug}`
      }}
      secondaryAction={{
        label: safeLocale === "tr" ? `${comparison.rightTool.name} sayfası` : `${comparison.rightTool.name} page`,
        href: `/${safeLocale}/tools/${comparison.rightTool.slug}`
      }}
      sections={[
        {
          title: safeLocale === "tr" ? "Panel iskeleti" : "Panel shell",
          description:
            safeLocale === "tr"
              ? "Eski karanlık ve kalabalık yapı yerine daha temiz, daha açık ve kart odaklı bir karşılaştırma yüzeyi burada oturacak."
              : "The old dense surface will be replaced here by a cleaner, lighter, card-driven comparison layout."
        },
        {
          title: safeLocale === "tr" ? "İçerik katmanı" : "Content layer",
          description:
            safeLocale === "tr"
              ? "Bu sayfa şimdilik tema preview modunda. Sonraki adımda karar blokları, tablo, verdict ve ilgili linkler yeni sisteme taşınacak."
              : "This page is intentionally in preview mode for now. The next step is moving verdict blocks, table logic, and related links into the new shell."
        }
      ]}
    />
  );
}
