import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";
import {
  getBlogBoostSections,
  getBlogCopy,
  getBlogTotalPages,
  getPaginatedLocalizedBlogArticles,
  parseBlogPage
} from "@/lib/blog";
import { buildBlogIndexMetaDescription } from "@/lib/seo";

const featuredBlogCopy: Record<
  Locale,
  { eyebrow: string; title: string; description: string; blocks: [string, string, string] }
> = {
  tr: {
    eyebrow: "Bu hafta öne çıkan rehberler",
    title: "Bu hafta öne çıkan rehberler",
    description: "Editör seçimleri, en çok okunanlar ve yeni yayınlanan rehberler tek blokta.",
    blocks: ["Editör seçimleri", "Bu hafta en çok okunan", "Bu hafta yeni"]
  },
  en: {
    eyebrow: "Featured guides this week",
    title: "Featured guides this week",
    description: "Editor picks, most-read articles, and newly published guides in one place.",
    blocks: ["Editor's picks", "Most read this week", "New this week"]
  },
  ar: {
    eyebrow: "أدلة هذا الأسبوع المميزة",
    title: "أدلة هذا الأسبوع المميزة",
    description: "اختيارات التحرير، الأكثر قراءة، والأدلة المنشورة حديثًا في مكان واحد.",
    blocks: ["اختيارات التحرير", "الأكثر قراءة هذا الأسبوع", "الجديد هذا الأسبوع"]
  },
  ru: {
    eyebrow: "Рекомендуемые гайды недели",
    title: "Рекомендуемые гайды недели",
    description: "Выбор редакции, самые читаемые материалы и свежие гайды в одном блоке.",
    blocks: ["Выбор редакции", "Самое читаемое за неделю", "Новое за неделю"]
  },
  zh: {
    eyebrow: "本周精选指南",
    title: "本周精选指南",
    description: "编辑推荐、本周热门与新发布指南集中展示。",
    blocks: ["编辑推荐", "本周热门", "本周新发布"]
  },
  ja: {
    eyebrow: "今週の注目ガイド",
    title: "今週の注目ガイド",
    description: "編集部のおすすめ、よく読まれている記事、新着ガイドをまとめて確認できます。",
    blocks: ["編集部おすすめ", "今週よく読まれた記事", "今週の新着"]
  },
  ko: {
    eyebrow: "이번 주 추천 가이드",
    title: "이번 주 추천 가이드",
    description: "에디터 추천, 많이 읽힌 글, 새로 올라온 가이드를 한곳에서 볼 수 있습니다.",
    blocks: ["에디터 추천", "이번 주 많이 읽힌 글", "이번 주 신규"]
  },
  el: {
    eyebrow: "Προτεινόμενοι οδηγοί της εβδομάδας",
    title: "Προτεινόμενοι οδηγοί της εβδομάδας",
    description: "Επιλογές σύνταξης, πιο διαβασμένα άρθρα και νέοι οδηγοί σε ένα σημείο.",
    blocks: ["Επιλογές σύνταξης", "Πιο διαβασμένα της εβδομάδας", "Νέο αυτή την εβδομάδα"]
  },
  da: {
    eyebrow: "Udvalgte guides i denne uge",
    title: "Udvalgte guides i denne uge",
    description: "Redaktionens valg, mest læste artikler og nye guides samlet ét sted.",
    blocks: ["Redaktionens valg", "Mest læst i denne uge", "Nyt i denne uge"]
  },
  fa: {
    eyebrow: "راهنماهای شاخص این هفته",
    title: "راهنماهای شاخص این هفته",
    description: "انتخاب‌های تحریریه، مطالب پربازدید و راهنماهای تازه منتشرشده را یکجا ببینید.",
    blocks: ["انتخاب تحریریه", "پربازدید این هفته", "جدید این هفته"]
  }
};

const browseToolsLabel: Record<Locale, string> = {
  tr: "Araçlara git",
  en: "Browse tools",
  ar: "اذهب إلى الأدوات",
  ru: "К инструментам",
  zh: "前往工具页",
  ja: "ツールを見る",
  ko: "도구로 이동",
  el: "Μετάβαση στα εργαλεία",
  da: "Gå til værktøjer",
  fa: "رفتن به ابزارها"
};

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

  const safeLocale = normalizeLocale(locale);
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

  const safeLocale = normalizeLocale(locale);
  const copy = getBlogCopy(safeLocale);
  const featuredCopy = featuredBlogCopy[safeLocale];
  const requestedPage = parseBlogPage(page);
  const totalPages = getBlogTotalPages();
  const boostSections = getBlogBoostSections(safeLocale);

  if (requestedPage > totalPages) {
    notFound();
  }

  const { articles, currentPage } = getPaginatedLocalizedBlogArticles(safeLocale, requestedPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="ui-page-shell w-full max-w-full overflow-x-hidden bg-transparent pb-10 pt-10 lg:pt-14">
      <SectionShell
        eyebrow={featuredCopy.eyebrow}
        title={featuredCopy.title}
        description={featuredCopy.description}
        tone="light"
      >
        <div className="grid gap-3 xl:grid-cols-3">
          {([
            { label: featuredCopy.blocks[0], article: boostSections.editorPicks[0] },
            { label: featuredCopy.blocks[1], article: boostSections.mostRead[0] },
            { label: featuredCopy.blocks[2], article: boostSections.newThisWeek[0] }
          ] as const).map((block) =>
            block.article ? (
              <div key={block.label} className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{block.label}</p>
                  <span className="text-xs font-medium text-slate-500">{copy.articleLeadLabel}</span>
                </div>
                <BlogCard locale={safeLocale} article={block.article} ctaLabel={copy.readMoreLabel} tone="light" featured />
              </div>
            ) : null
          )}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow={copy.listEyebrow}
        title={copy.listTitle}
        description={copy.listDescription}
        actions={<PremiumButton href={`/${safeLocale}/tools?page=1`}>{browseToolsLabel[safeLocale]}</PremiumButton>}
        tone="light"
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
