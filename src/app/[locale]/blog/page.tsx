import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";
import {
  getBlogCopy,
  getBlogTotalPages,
  getPaginatedLocalizedBlogArticles,
  parseBlogPage
} from "@/lib/blog";

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
    title: currentPage > 1 ? `${copy.blogLabel} - ${copy.pageLabel} ${currentPage} | Deciply` : `${copy.blogLabel} | Deciply`,
    description: copy.listDescription,
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

  if (requestedPage > totalPages) {
    notFound();
  }

  const { articles, currentPage } = getPaginatedLocalizedBlogArticles(safeLocale, requestedPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="w-full max-w-full overflow-x-hidden pb-10 pt-10 lg:pt-14">
      <SectionShell
        eyebrow={copy.listEyebrow}
        title={copy.listTitle}
        description={copy.listDescription}
        actions={<PremiumButton href={`/${safeLocale}/tools`}>{safeLocale === "tr" ? "Araçlara git" : "Browse tools"}</PremiumButton>}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={copy.readMoreLabel} />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav
            aria-label={`${copy.blogLabel} pagination`}
            className="mt-8 flex w-full max-w-full flex-wrap items-center justify-center gap-2 overflow-x-hidden sm:gap-3"
          >
            {currentPage > 1 ? (
              <Link
                href={buildBlogPageHref(safeLocale, currentPage - 1)}
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/12 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                {`‹ ${copy.previousPage}`}
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/8 bg-white/[0.03] px-4 text-sm font-medium text-slate-500/70">
                {`‹ ${copy.previousPage}`}
              </span>
            )}

            <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
              {pageNumbers.map((pageNumber) => {
                const isActive = pageNumber === currentPage;

                return isActive ? (
                  <span
                    key={pageNumber}
                    aria-current="page"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-cyan-400/40 bg-cyan-400/12 px-4 text-sm font-semibold text-cyan-200 shadow-[0_10px_30px_-18px_rgba(34,211,238,0.45)]"
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    key={pageNumber}
                    href={buildBlogPageHref(safeLocale, pageNumber)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-white/12 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>

            {currentPage < totalPages ? (
              <Link
                href={buildBlogPageHref(safeLocale, currentPage + 1)}
                className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/12 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                {`${copy.nextPage} ›`}
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/8 bg-white/[0.03] px-4 text-sm font-medium text-slate-500/70">
                {`${copy.nextPage} ›`}
              </span>
            )}
          </nav>
        ) : null}
      </SectionShell>
    </div>
  );
}
