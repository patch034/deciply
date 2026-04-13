import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";
import {
  getBlogBoostSections,
  getBlogCopy,
  getBlogTotalPages,
  getPaginatedLocalizedBlogArticles,
  parseBlogPage
} from "@/lib/blog";
import { buildBlogIndexMetaDescription } from "@/lib/seo";

function buildBlogPageHref(locale: Locale, page: number) {
  return page <= 1 ? `/${locale}/blog` : `/${locale}/blog?page=${page}`;
}

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await searchParams;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;
  const copy = getBlogCopy(safeLocale);
  const currentPage = parseBlogPage(page);
  const canonicalPath = currentPage <= 1 ? `/${locale}/blog` : `/${locale}/blog?page=${currentPage}`;
  const alternatesPath = currentPage <= 1 ? "/blog" : `/blog?page=${currentPage}`;

  return {
    title: currentPage > 1 ? `${copy.blogLabel} - ${copy.pageLabel} ${currentPage}` : copy.blogLabel,
    description: buildBlogIndexMetaDescription(safeLocale, currentPage),
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(alternatesPath)
    }
  };
}

export default async function BlogPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const copy = getBlogCopy(safeLocale);
  const requestedPage = parseBlogPage(page);
  const totalPages = getBlogTotalPages();
  const boostSections = getBlogBoostSections(safeLocale);

  if (requestedPage > totalPages) {
    notFound();
  }

  const { articles, currentPage } = getPaginatedLocalizedBlogArticles(safeLocale, requestedPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-transparent pb-10 pt-10 lg:pt-14">
      <SectionShell
        eyebrow={safeLocale === "tr" ? "Öne çıkan blog blokları" : "Featured blog blocks"}
        title={safeLocale === "tr" ? "Bu hafta öne çıkan rehberler" : "This week's featured guides"}
        description={
          safeLocale === "tr"
            ? "Editör seçimleri, en çok okunanlar ve yeni yayınlanan rehberler tek blokta."
            : "Editor picks, most-read articles, and the newest guides in one premium block."
        }
        actions={<PremiumButton href={`/${safeLocale}/blog`}>{copy.backToBlog}</PremiumButton>}
        tone="light"
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {([
            { label: safeLocale === "tr" ? "Editör seçimleri" : "Editor's Picks", article: boostSections.editorPicks[0] },
            { label: safeLocale === "tr" ? "Bu hafta en çok okunan" : "Most Read This Week", article: boostSections.mostRead[0] },
            { label: safeLocale === "tr" ? "Bu hafta yeni" : "New This Week", article: boostSections.newThisWeek[0] }
          ] as const).map((block) =>
            block.article ? (
              <div key={block.label} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{block.label}</p>
                  <span className="text-xs font-medium text-slate-500">{copy.articleLeadLabel}</span>
                </div>
                <BlogCard locale={safeLocale} article={block.article} ctaLabel={copy.readMoreLabel} tone="light" />
              </div>
            ) : null
          )}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={copy.listEyebrow}
        title={copy.listTitle}
        description={copy.listDescription}
        actions={<PremiumButton href={`/${safeLocale}/tools?page=1`}>{safeLocale === "tr" ? "Araçlara git" : "Browse tools"}</PremiumButton>}
        tone="light"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={copy.readMoreLabel} tone="light" />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav
            aria-label={`${copy.blogLabel} pagination`}
            className="mt-6 flex w-full max-w-full flex-wrap items-center justify-center gap-2 overflow-x-hidden sm:mt-8 sm:gap-3"
          >
            {currentPage > 1 ? (
              <Link
                href={buildBlogPageHref(safeLocale, currentPage - 1)}
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
              >
                {`← ${copy.previousPage}`}
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-400/70">
                {`← ${copy.previousPage}`}
              </span>
            )}

            <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
              {pageNumbers.map((pageNumber) => {
                const isActive = pageNumber === currentPage;

                return isActive ? (
                  <span
                    key={pageNumber}
                    aria-current="page"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-sky-200 bg-sky-50 px-4 text-sm font-semibold text-[#0055FF] shadow-[0_10px_30px_-18px_rgba(37,99,235,0.16)]"
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    key={pageNumber}
                    href={buildBlogPageHref(safeLocale, pageNumber)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>

            {currentPage < totalPages ? (
              <Link
                href={buildBlogPageHref(safeLocale, currentPage + 1)}
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
              >
                {`${copy.nextPage} →`}
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-400/70">
                {`${copy.nextPage} →`}
              </span>
            )}
          </nav>
        ) : null}
      </SectionShell>
    </div>
  );
}
