import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { Locale } from "@/i18n/config";
import { formatBlogDate, resolveBlogPublishDate } from "@/lib/blog";
import type { LocalizedBlogArticle } from "@/types/blog";

type BlogCardProps = {
  locale: Locale;
  article: LocalizedBlogArticle;
  ctaLabel: string;
};

export function BlogCard({ locale, article, ctaLabel }: BlogCardProps) {
  const relatedToolsLabel = locale === "tr" ? "bağlantılı araç" : "related tools";
  const publishSource = resolveBlogPublishDate(article);
  const publishDate = publishSource ? formatBlogDate(locale, publishSource) : null;

  return (
    <GlassPanel className="group flex h-full flex-col overflow-hidden border-slate-700/60 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(5,9,17,0.99))] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_24px_80px_-42px_rgba(34,211,238,0.2)] sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="ghost" className="max-w-full justify-start text-cyan-200">
          {article.categoryLabel}
        </Badge>
        {publishDate ? <span className="text-xs font-medium text-slate-500/90">{publishDate}</span> : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col sm:mt-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-50 transition group-hover:text-cyan-200 sm:text-2xl">
          <Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="mobile-clamp-2 mt-3 text-sm leading-7 text-slate-300/84 sm:mt-4">{article.excerpt}</p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-700/60 pt-4 text-sm sm:mt-6 sm:gap-4">
          <span className="truncate text-slate-500">
            {article.relatedToolSlugs.length} {relatedToolsLabel}
          </span>
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className="inline-flex items-center rounded-full border border-cyan-400/16 bg-cyan-400/10 px-3.5 py-2 font-semibold text-cyan-100 transition hover:border-cyan-300/24 hover:bg-cyan-400/14 sm:px-4"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </GlassPanel>
  );
}
