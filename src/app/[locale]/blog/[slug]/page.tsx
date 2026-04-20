import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale, type Locale } from "@/i18n/config";
import { formatBlogDate, getLocalizedBlogArticleBySlug, resolveBlogPublishDate } from "@/lib/blog";
import { buildBlogMetaDescription, buildBlogPageTitle } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

function buildPreviewDescription(locale: Locale, excerpt: string, intro: string) {
  return locale === "tr"
    ? `${excerpt} Bu detay sayfası yeni Deciply tema sisteminde daha temiz editoryal hiyerarşi ve daha güçlü içerik bloklarıyla yeniden kuruluyor. ${intro}`
    : `${excerpt} This detail page is being rebuilt in the new Deciply theme system with a cleaner editorial hierarchy and stronger content blocks. ${intro}`;
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
  const article = getLocalizedBlogArticleBySlug(safeLocale, slug);

  if (!article) {
    return {};
  }

  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/blog/${slug}`);
  const publishedTime = resolveBlogPublishDate(article);
  const description = buildBlogMetaDescription(safeLocale, article);

  return {
    title: buildBlogPageTitle(article),
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(`/blog/${slug}`)
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: buildBlogPageTitle(article),
      description,
      publishedTime,
      modifiedTime: article.updatedAt ?? publishedTime
    }
  };
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const article = getLocalizedBlogArticleBySlug(safeLocale, slug);

  if (!article) {
    notFound();
  }

  const publishedSource = resolveBlogPublishDate(article);
  const publishedDate = publishedSource ? formatBlogDate(safeLocale, publishedSource) : null;

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={safeLocale === "tr" ? "Blog detay preview" : "Blog detail preview"}
      title={article.title}
      description={buildPreviewDescription(safeLocale, article.excerpt, article.intro)}
      breadcrumbs={[
        { label: safeLocale === "tr" ? "Ana sayfa" : "Home", href: `/${safeLocale}` },
        { label: safeLocale === "tr" ? "Blog" : "Blog", href: `/${safeLocale}/blog` },
        { label: article.title }
      ]}
      badges={[
        article.categoryLabel,
        safeLocale === "tr" ? "Editoryal içerik" : "Editorial content",
        ...(publishedDate ? [publishedDate] : [])
      ]}
      stats={[
        {
          label: safeLocale === "tr" ? "Bölüm sayısı" : "Sections",
          value: String(article.sections.length)
        },
        {
          label: safeLocale === "tr" ? "İlgili araç" : "Related tools",
          value: String(article.relatedToolSlugs.length)
        },
        {
          label: safeLocale === "tr" ? "Yayın tarihi" : "Publish date",
          value: publishedDate ?? "-"
        }
      ]}
      primaryAction={{
        label: safeLocale === "tr" ? "Tüm blog yazıları" : "All blog articles",
        href: `/${safeLocale}/blog`
      }}
      secondaryAction={{
        label: safeLocale === "tr" ? "Araçlara dön" : "Browse tools",
        href: `/${safeLocale}/tools`
      }}
      sections={[
        {
          title: safeLocale === "tr" ? "Yeni editoryal hero" : "New editorial hero",
          description:
            safeLocale === "tr"
              ? "Makale hero alanı yeni sistemde daha güçlü başlık, özet, yayın tarihi ve güven sinyalleriyle tekrar kurulacak."
              : "The article hero will be rebuilt with a stronger title, summary, publish date, and trust cues."
        },
        {
          title: safeLocale === "tr" ? "Modüler içerik blokları" : "Modular content blocks",
          description:
            safeLocale === "tr"
              ? "Alt başlıklar, iç linkler, ilgili araçlar ve karşılaştırma yönlendirmeleri yeni tema kartlarıyla yeniden yerleşecek."
              : "Subsections, internal links, related tools, and comparison prompts will be reintroduced with the new theme cards."
        }
      ]}
    />
  );
}
