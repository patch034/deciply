import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleContent, buildArticleSectionId } from "@/components/blog/article-content";
import { ArticleCtaBlock } from "@/components/blog/article-cta-block";
import { ConversionCtaStrip } from "@/components/ui/conversion-cta-strip";
import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { ToolCard } from "@/components/catalog/tool-card";
import { Badge } from "@/components/ui/badge";
import { SectionJumpNav } from "@/components/ui/section-jump-nav";
import { SectionShell } from "@/components/ui/section-shell";
import { blogArticles } from "@/data/blog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import { buildComparisonPath, getComparisonTargetTools } from "@/lib/comparisons";
import {
  formatBlogDate,
  getBlogCopy,
  getBlogSupportingLinks,
  getLocalizedBlogArticleBySlug,
  getRelatedArticles,
  resolveBlogPublishDate
} from "@/lib/blog";
import {
  formatPricing,
  getCategoryNamesMap,
  getCatalogContent,
  getLocalizedToolBySlug,
  getToolOutboundUrl
} from "@/lib/catalog";
import { buildBlogMetaDescription, buildBlogPageTitle } from "@/lib/seo";

type BlogCtaButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

function buildToolLabel(locale: Locale, toolName: string, action: "open" | "review") {
  if (locale === "tr") {
    return action === "open" ? `${toolName}\u2019yi a\u00e7` : `${toolName}\u2019yi incele`;
  }

  return action === "open" ? `Open ${toolName}` : `Review ${toolName}`;
}

function buildBlogCtaButtons(
  locale: Locale,
  relatedTools: NonNullable<ReturnType<typeof getLocalizedToolBySlug>>[],
  comparisonHref: string,
  alternativesHref: string,
  toolPageHref: string
): BlogCtaButton[] {
  const buttons: BlogCtaButton[] = [];
  const primaryTool = relatedTools[0];
  const secondaryTool = relatedTools[1];

  if (primaryTool) {
    buttons.push({
      label: buildToolLabel(locale, primaryTool.name, "review"),
      href: `/${locale}/tools/${primaryTool.slug}`
    });
  }

  if (secondaryTool) {
    buttons.push({
      label: buildToolLabel(locale, secondaryTool.name, "review"),
      href: `/${locale}/tools/${secondaryTool.slug}`,
      variant: "secondary"
    });
  }

  if (comparisonHref) {
    buttons.push({
      label:
        primaryTool && secondaryTool
          ? locale === "tr"
            ? `${primaryTool.name} vs ${secondaryTool.name} kar\u015f\u0131la\u015ft\u0131r`
            : `Compare ${primaryTool.name} vs ${secondaryTool.name}`
          : locale === "tr"
            ? "Kar\u015f\u0131la\u015ft\u0131rmay\u0131 a\u00e7"
            : "Open comparison",
      href: comparisonHref,
      variant: "ghost"
    });
  }

  if (!buttons.length) {
    buttons.push({
      label: locale === "tr" ? "Ara\u00e7lar\u0131 a\u00e7" : "Open tools",
      href: toolPageHref
    });
  }

  if (buttons.length < 3) {
    buttons.push({
      label: locale === "tr" ? "Alternatifleri a\u00e7" : "Explore alternatives",
      href: alternativesHref,
      variant: "ghost"
    });
  }

  return buttons.slice(0, 3);
}

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

  const safeLocale = locale as Locale;
  const article = getLocalizedBlogArticleBySlug(safeLocale, slug);

  if (!article) {
    return {};
  }

  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/blog/${slug}`);
  const publishedTime = resolveBlogPublishDate(article);
  const description = buildBlogMetaDescription(safeLocale, article);

  return {
    title: buildBlogPageTitle(article),
    description: description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(`/blog/${slug}`)
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: buildBlogPageTitle(article),
      description: description,
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
  const leadSections = article.sections.slice(0, 2);
  const tailSections = article.sections.slice(2);
  const canonicalUrl = buildCanonicalUrl(`/${safeLocale}/blog/${article.slug}`);
  const inlineSupportingLinks = getBlogSupportingLinks(safeLocale, article.slug, 2, 2);
  const comparisonHref = inlineSupportingLinks.comparePages[0]?.href ?? `/${safeLocale}/categories/comparisons`;
  const alternativesHref = inlineSupportingLinks.alternativePages[0]?.href ?? (primaryTool ? `/${safeLocale}/alternatives/${primaryTool.slug}` : `/${safeLocale}/tools`);
  const publishedLabel = safeLocale === "tr" ? "Yayınlandı" : "Published";
  const updatedLabel = safeLocale === "tr" ? "Güncellendi" : "Updated";
  const publishedSource = resolveBlogPublishDate(article);
  const publishedDate = publishedSource ? formatBlogDate(safeLocale, publishedSource) : null;
  const updatedDate = article.updatedAt ? formatBlogDate(safeLocale, article.updatedAt) : null;
  const description = buildBlogMetaDescription(safeLocale, article);
  const sectionNavItems = [
    { label: safeLocale === "tr" ? "Genel Bakış" : "Overview", href: "#genel-bakis" },
    ...article.sections.slice(0, 4).map((section) => ({
      label: section.title,
      href: `#${buildArticleSectionId(section.title)}`
    }))
  ];
  const blogCtaButtons = buildBlogCtaButtons(safeLocale, relatedTools, comparisonHref, alternativesHref, `/${safeLocale}/tools`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: description,
    articleSection: article.categoryLabel,
    inLanguage: safeLocale,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Deciply",
      url: "https://deciply.com"
    },
    author: {
      "@type": "Organization",
      name: "Deciply Editorial Team"
    },
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

        <section id="genel-bakis" className="scroll-mt-24 rounded-[36px] border border-slate-700/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
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

            <div className="rounded-[28px] border border-slate-700/60 bg-slate-950/60 p-6">
              <div className="grid gap-3 sm:grid-cols-1">
                <div className="rounded-[22px] border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "İç link" : "Internal links"}: {relatedTools.length + 1}
                </div>
                <div className="rounded-[22px] border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "Bölüm sayısı" : "Sections"}: {article.sections.length}
                </div>
                <div className="rounded-[22px] border border-slate-700/60 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-100">
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
                  {primaryTool ? buildToolLabel(safeLocale, primaryTool.name, "open") : (safeLocale === "tr" ? "Aracı aç" : "Open tool")}
                </a>
                <a
                  href={comparisonHref}
                  className="inline-flex items-center justify-center rounded-2xl border border-sky-400/10 px-6 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/18 hover:text-cyan-100"
                >
                  {primaryTool && relatedTools[1] ? `${primaryTool.name} vs ${relatedTools[1].name} kar\u015f\u0131la\u015ft\u0131r` : (primaryTool ? `${primaryTool.name} kar\u015f\u0131la\u015ft\u0131rmalar\u0131` : copy.comparisonCtaLabel)}
                </a>
              </div>
            </div>
          </div>
        </section>


        <ArticleCtaBlock
          eyebrow={safeLocale === "tr" ? "Ara CTA" : "Mid CTA"}
          title={safeLocale === "tr" ? "Bu içerikte geçen aracı şimdi deneyin" : "Try the tool mentioned in this guide"}
          description={
            safeLocale === "tr"
              ? "Makalede geçen aracı detay sayfasında inceleyip fiyat, kullanım alanı ve alternatiflerini birkaç saniyede görebilirsiniz."
              : "Open the related tool page to review pricing, best-fit use cases, and alternatives in seconds."
          }
          buttons={blogCtaButtons}
        />
        <ConversionCtaStrip
          eyebrow={safeLocale === "tr" ? "Karar akışı" : "Decision flow"}
          title={safeLocale === "tr" ? "İlgili aracı ve alternatifleri açın" : "Open the related tool and alternatives"}
          description={
            safeLocale === "tr"
              ? "Resmî aracı açın, compare sayfasını inceleyin ve alternatifleri ayrı sekmede görüntüleyin."
              : "Open the official tool, review the comparison page, and view the alternatives in a dedicated step."
          }
          buttons={blogCtaButtons}
        />
        <SectionJumpNav items={sectionNavItems} />

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
              compareHref={
                (() => {
                  const target = getComparisonTargetTools(safeLocale, tool.slug, 1)[0];
                  return target ? buildComparisonPath(safeLocale, tool.slug, target.slug) : undefined;
                })()
              }
            />
          ))}
        </SectionShell>

        <section className="rounded-[30px] border border-slate-700/60 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50">{copy.comparisonBlockTitle}</h2>
          <p className="mt-3 text-base leading-7 text-slate-300">{copy.comparisonBlockDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={comparisonHref}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]"
            >
                  {primaryTool && relatedTools[1] ? `${primaryTool.name} vs ${relatedTools[1].name} kar\u015f\u0131la\u015ft\u0131r` : copy.comparisonCtaLabel}
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
          eyebrow={safeLocale === "tr" ? "Ara CTA" : "Mid CTA"}
          title={safeLocale === "tr" ? "Bu içerikte geçen aracı şimdi deneyin" : "Try the tool mentioned in this guide"}
          description={
            safeLocale === "tr"
              ? "Makalede geçen aracı detay sayfasında inceleyip fiyat, kullanım alanı ve alternatiflerini birkaç saniyede görebilirsiniz."
              : "Open the related tool page to review pricing, best-fit use cases, and alternatives in seconds."
          }
          buttons={blogCtaButtons}
        />
      </div>
    </>
  );
}



















