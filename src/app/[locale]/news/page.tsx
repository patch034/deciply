import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import {
  formatBlogDate,
  getBlogCopy,
  getBlogFeaturedArticles,
  getBlogLatestArticles,
  getBlogTrendingArticles
} from "@/lib/blog";
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

  const safeLocale = locale as Locale;

  return {
    title: safeLocale === "tr" ? "AI Haberleri" : "AI News",
    description:
      safeLocale === "tr"
        ? "Deciply AI haberleri: güncel rehberler, trend sinyalleri ve karar destek içerikleri."
        : "Deciply AI news: fresh guides, trend signals, and decision-support content.",
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/news`),
      languages: buildAlternates("/news")
    }
  };
}

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const copy = getBlogCopy(safeLocale);
  const featured = getBlogFeaturedArticles(safeLocale, 4);
  const trending = getBlogTrendingArticles(safeLocale, 6, featured.map((article) => article.slug));
  const latest = getBlogLatestArticles(safeLocale, 6, [...featured, ...trending].map((article) => article.slug));

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <Badge variant="accent">{safeLocale === "tr" ? "AI Haberleri" : "AI News"}</Badge>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {safeLocale === "tr" ? "Güncel rehberler ve trend sinyalleri" : "Fresh guides and trend signals"}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {safeLocale === "tr"
                ? "Blog ve editorial içerikleri daha kısa, daha taranabilir bir haber akışı gibi keşfet."
                : "Browse blog and editorial content in a more compact, news-style discovery flow."}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.14)]">
            <div className="flex flex-wrap gap-2">
              <Badge variant="ghost">{copy.blogLabel}</Badge>
              <Badge variant="ghost">{safeLocale === "tr" ? "Trend" : "Trending"}</Badge>
              <Badge variant="ghost">{safeLocale === "tr" ? "Son içerikler" : "Latest content"}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <PremiumButton href={`/${safeLocale}/blog`}>{copy.blogLabel}</PremiumButton>
              <PremiumButton href={`/${safeLocale}/compare`} variant="secondary">
                {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow={safeLocale === "tr" ? "Öne çıkanlar" : "Featured"}
        title={safeLocale === "tr" ? "Öne çıkan rehberler" : "Featured guides"}
        description={safeLocale === "tr" ? "Editörün öne çıkardığı, karar destek odaklı içerikler." : "Editorial picks that support discovery and decisions."}
        className="px-0 sm:px-0"
        contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {featured.map((article) => (
          <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={copy.readMoreLabel} tone="light" />
        ))}
      </SectionShell>

      <SectionShell
        eyebrow={safeLocale === "tr" ? "Trend" : "Trending"}
        title={safeLocale === "tr" ? "En çok dikkat çeken haber akışı" : "Most attention-grabbing signals"}
        description={safeLocale === "tr" ? "Kısa ve taranabilir ranked link listesi." : "Short, scannable ranked link list."}
        className="px-0 sm:px-0"
        contentClassName="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]"
      >
        <div className="space-y-3">
          {trending.map((article, index) => (
            <Link
              key={article.slug}
              href={`/${safeLocale}/blog/${article.slug}`}
              className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.12)] transition hover:border-sky-200 hover:bg-slate-50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                {index + 1}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="muted" className="text-[10px]">
                    {article.categoryLabel}
                  </Badge>
                  <span className="text-xs text-slate-500">{formatBlogDate(safeLocale, article.publishDate)}</span>
                </div>
                <h3 className="mt-1.5 text-sm font-semibold leading-6 text-slate-950">{article.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.12)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
            {safeLocale === "tr" ? "Son içerikler" : "Latest"}
          </p>
          <div className="mt-3 space-y-2">
            {latest.map((article) => (
              <Link
                key={article.slug}
                href={`/${safeLocale}/blog/${article.slug}`}
                className="block rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-sky-200 hover:bg-white"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{article.categoryLabel}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-slate-950">{article.title}</p>
                <p className="mt-1 text-xs text-slate-500">{formatBlogDate(safeLocale, article.publishDate)}</p>
              </Link>
            ))}
          </div>
          <PremiumButton href={`/${safeLocale}/blog`} variant="secondary" className="mt-4 w-full">
            {copy.blogLabel}
          </PremiumButton>
        </div>
      </SectionShell>
    </div>
  );
}
