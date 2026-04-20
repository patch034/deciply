import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale, type Locale } from "@/i18n/config";
import { getAiNewsItemBySlug } from "@/lib/news";

export const revalidate = 3600;
export const dynamicParams = true;

function formatDate(locale: Locale, value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function buildWhyItMatters(locale: Locale, title: string, summary: string) {
  const lower = `${title} ${summary}`.toLowerCase();

  if (lower.includes("openai") || lower.includes("chatgpt")) {
    return locale === "tr"
      ? "OpenAI ve ChatGPT güncellemeleri, chatbot kararları ve yüksek niyetli karşılaştırma sayfaları için güçlü trafik sinyali üretir."
      : "OpenAI and ChatGPT updates usually create strong traffic signals across chatbot decisions and high-intent comparison pages.";
  }

  if (lower.includes("claude")) {
    return locale === "tr"
      ? "Claude başlıkları yazma, araştırma ve uzun form karar akışlarında doğrudan kıyas ihtiyacı doğurur."
      : "Claude headlines often trigger direct comparison intent around writing, research, and long-form workflows.";
  }

  if (lower.includes("gemini") || lower.includes("google")) {
    return locale === "tr"
      ? "Gemini haberleri arama, üretkenlik ve günlük iş akışları için güçlü ürün seçimi sinyali yaratır."
      : "Gemini stories often influence product-choice intent across search, productivity, and day-to-day workflows.";
  }

  if (lower.includes("copilot") || lower.includes("microsoft")) {
    return locale === "tr"
      ? "Copilot gelişmeleri ofis ve iş akışı araçlarında değerlendirme ihtiyacını hızlandırır."
      : "Copilot developments typically accelerate evaluation across office and workflow tools.";
  }

  if (lower.includes("perplexity")) {
    return locale === "tr"
      ? "Perplexity güncellemeleri kaynaklı araştırma akışları için net iç link ve karar fırsatı üretir."
      : "Perplexity updates create clear internal-link and decision opportunities for source-backed research workflows.";
  }

  return locale === "tr"
    ? "Bu haber, araç seçimi ve karşılaştırma akışları için yeni bir karar sinyali sağlıyor."
    : "This story adds another useful decision signal for tool selection and comparison flows.";
}

export async function generateStaticParams() {
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
  const item = await getAiNewsItemBySlug(safeLocale, slug);

  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | ${safeLocale === "tr" ? "AI Haberleri" : "AI News"}`,
    description: item.summary,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/news/${slug}`),
      languages: buildAlternates(`/news/${slug}`)
    }
  };
}

export default async function AiNewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const item = await getAiNewsItemBySlug(safeLocale, slug);

  if (!item) {
    notFound();
  }

  const publishedAt = formatDate(safeLocale, item.publishedAt);
  const title = item.displayTitle ?? item.title;
  const summary = item.displaySummary ?? item.summary;
  const dek = item.dek ?? summary;
  const whyItMatters = item.whyItMatters ?? buildWhyItMatters(safeLocale, item.title, item.summary);

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={safeLocale === "tr" ? "AI haber detay preview" : "AI news detail preview"}
      title={title}
      description={dek}
      breadcrumbs={[
        { label: safeLocale === "tr" ? "Ana sayfa" : "Home", href: `/${safeLocale}` },
        { label: safeLocale === "tr" ? "AI Haberleri" : "AI News", href: `/${safeLocale}/news` },
        { label: title }
      ]}
      badges={[item.source, item.categoryLabel, ...(publishedAt ? [publishedAt] : [])]}
      stats={[
        {
          label: safeLocale === "tr" ? "Kaynak" : "Source",
          value: item.source
        },
        {
          label: safeLocale === "tr" ? "Yayın tarihi" : "Published",
          value: publishedAt ?? "-"
        },
        {
          label: safeLocale === "tr" ? "İç link" : "Internal links",
          value: String(item.relatedLinks.length)
        }
      ]}
      primaryAction={{
        label: safeLocale === "tr" ? "Tüm haberler" : "All news",
        href: `/${safeLocale}/news`
      }}
      secondaryAction={{
        label: safeLocale === "tr" ? "Orijinal kaynak" : "Original source",
        href: item.sourceUrl
      }}
      sections={[
        {
          title: safeLocale === "tr" ? "Editoryal özet" : "Editorial digest",
          description: summary
        },
        {
          title: safeLocale === "tr" ? "Neden önemli" : "Why it matters",
          description: whyItMatters
        }
      ]}
    />
  );
}
