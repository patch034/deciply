import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/article-content";
import { ArticleCtaBlock } from "@/components/blog/article-cta-block";
import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { ToolCard } from "@/components/catalog/tool-card";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/ui/section-shell";
import { blogArticles } from "@/data/blog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import { formatBlogDate, getBlogCopy, resolveBlogPublishDate, getLocalizedBlogArticleBySlug, getRelatedArticles } from "@/lib/blog";
import {
  formatPricing,
  getCategoryNamesMap,
  getCatalogContent,
  getLocalizedToolBySlug,
  getToolOutboundUrl
} from "@/lib/catalog";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogArticles.map((article) => ({
      locale,
      slug: article.slug
    }))
  );
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

  const article = getLocalizedBlogArticleBySlug(locale as Locale, slug);

  if (!article) {
    return {};
  }

  const canonicalUrl = buildCanonicalUrl(`/${locale}/blog/${slug}`);
  const publishedTime = resolveBlogPublishDate(article);

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(`/blog/${slug}`)
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.seoTitle,
      description: article.seoDescription,
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

  const safeLocale = locale as Locale;
  const copy = getBlogCopy(safeLocale);
  const article = getLocalizedBlogArticleBySlug(safeLocale, slug);

  if (!article) {
    notFound();
  }

  const content = getCatalogContent(safeLocale);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const relatedTools = article.relatedToolSlugs
    .map((toolSlug) => getLocalizedToolBySlug(safeLocale, toolSlug))
    .filter((tool) => tool !== null);
  const primaryTool = relatedTools[0];
  const relatedArticles = getRelatedArticles(safeLocale, article.slug, 3);
  const heroPrimaryHref = primaryTool ? getToolOutboundUrl(primaryTool) : `/${safeLocale}/tools`;
  const comparisonHref = `/${safeLocale}/categories/comparisons`;
  const leadSections = article.sections.slice(0, 2);
  const tailSections = article.sections.slice(2);
  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/blog/${article.slug}`);
  const publishedLabel = safeLocale === "tr" ? "Yayınlandı" : "Published";
  const updatedLabel = safeLocale === "tr" ? "Güncellendi" : "Updated";
  const publishedSource = resolveBlogPublishDate(article);
  const publishedDate = publishedSource ? formatBlogDate(safeLocale, publishedSource) : null;
  const updatedDate = article.updatedAt ? formatBlogDate(safeLocale, article.updatedAt) : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription,
    articleSection: article.categoryLabel,
    inLanguage: safeLocale,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "Deciply"
    },
    datePublished: publishedSource,
    dateModified: article.updatedAt ?? publishedSource
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: copy.breadcrumbsHome,
        item: `https://deciply.com/${safeLocale}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.blogLabel,
        item: `https://deciply.com/${safeLocale}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbsHome, href: `/${safeLocale}` },
            { label: copy.blogLabel, href: `/${safeLocale}/blog` },
            { label: article.title }
          ]}
        />

        <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                {copy.articleLeadLabel}
              </Badge>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="accent">{article.categoryLabel}</Badge>
                <Badge>{safeLocale === "tr" ? "SEO odaklı içerik" : "SEO-focused article"}</Badge>
              </div>
              <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.5rem] lg:leading-[1.03]">
                {article.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                <span>{publishedLabel}: {publishedDate}</span>
                {updatedDate ? <span>{updatedLabel}: {updatedDate}</span> : null}
              </div>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{article.excerpt}</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">{article.intro}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="grid gap-3 sm:grid-cols-1">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "İç link" : "Internal links"}: {relatedTools.length + 1}
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "Bölüm sayısı" : "Sections"}: {article.sections.length}
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "Karşılaştırma linki hazır" : "Comparison path ready"}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={heroPrimaryHref}
                  target={heroPrimaryHref.startsWith("http") ? "_blank" : undefined}
                  rel={heroPrimaryHref.startsWith("http") ? "nofollow sponsored noreferrer" : undefined}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]"
                >
                  {copy.heroPrimaryCta}
                </a>
                <a
                  href={comparisonHref}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:text-cyan-300"
                >
                  {copy.comparisonCtaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        <ArticleContent locale={safeLocale} sections={leadSections} />

        <ArticleCtaBlock
          eyebrow={safeLocale === "tr" ? "Ara CTA" : "Mid CTA"}
          title={safeLocale === "tr" ? "Bu içerikte geçen aracı şimdi deneyin" : "Try the tool mentioned in this guide"}
          description={
            safeLocale === "tr"
              ? "Makalede geçen aracı detay sayfasında inceleyip fiyat, kullanım alanı ve alternatiflerini birkaç saniyede görebilirsiniz."
              : "Open the related tool page to review pricing, best-fit use cases, and alternatives in seconds."
          }
          primaryLabel={copy.heroPrimaryCta}
          primaryHref={heroPrimaryHref}
          secondaryLabel={copy.heroSecondaryCta}
          secondaryHref={`/${safeLocale}/tools`}
        />

        {tailSections.length ? <ArticleContent locale={safeLocale} sections={tailSections} /> : null}

        <SectionShell
          eyebrow={copy.relatedToolsTitle}
          title={copy.relatedToolsTitle}
          description={copy.relatedToolsDescription}
          className="px-0 sm:px-0 lg:px-0"
          contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {relatedTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              locale={safeLocale}
              tool={tool}
              categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
              pricingLabel={formatPricing(tool.pricing, safeLocale)}
              detailLabel={content.common.viewDetailsLabel}
            />
          ))}
        </SectionShell>

        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50">{copy.comparisonBlockTitle}</h2>
          <p className="mt-3 text-base leading-7 text-slate-300">{copy.comparisonBlockDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={comparisonHref}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]"
            >
              {copy.comparisonCtaLabel}
            </a>
          </div>
        </section>

        {relatedArticles.length ? (
          <SectionShell
            eyebrow={copy.relatedArticlesTitle}
            title={copy.relatedArticlesTitle}
            description={copy.relatedArticlesDescription}
            className="px-0 sm:px-0 lg:px-0"
            contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {relatedArticles.map((relatedArticle) => (
              <BlogCard
                key={relatedArticle.slug}
                locale={safeLocale}
                article={relatedArticle}
                ctaLabel={copy.readMoreLabel}
              />
            ))}
          </SectionShell>
        ) : null}

        <ArticleCtaBlock
          eyebrow={safeLocale === "tr" ? "Son CTA" : "Final CTA"}
          title={safeLocale === "tr" ? "Doğru aracı seçmeye hazırsanız şimdi devam edin" : "Ready to choose the right tool?"}
          description={
            safeLocale === "tr"
              ? "Blog içeriğini okuduktan sonra en doğru sonraki adım, aracı açıp detay sayfasında artılarını, eksilerini ve fiyat bilgisini görmek olacaktır."
              : "After reading the guide, the best next step is opening the tool page to review pricing, strengths, and alternatives before clicking out."
          }
          primaryLabel={copy.heroPrimaryCta}
          primaryHref={heroPrimaryHref}
          secondaryLabel={copy.backToBlog}
          secondaryHref={`/${safeLocale}/blog`}
        />
      </div>
    </>
  );
}










