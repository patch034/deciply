import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/config";
import { formatBlogDate, resolveBlogPublishDate } from "@/lib/blog";
import type { LocalizedBlogArticle } from "@/types/blog";

type BlogCardProps = {
  locale: Locale;
  article: LocalizedBlogArticle;
  ctaLabel: string;
  tone?: "dark" | "light";
};

export function BlogCard({ locale, article, ctaLabel, tone = "dark" }: BlogCardProps) {
  const relatedToolsLabel = locale === "tr" ? "bağlantılı araç" : "related tools";
  const publishSource = resolveBlogPublishDate(article);
  const publishDate = publishSource ? formatBlogDate(locale, publishSource) : null;

  return (
    <div
      className={[
        "group flex h-full min-h-[300px] flex-col overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 sm:min-h-[320px] sm:p-6",
        tone === "light"
          ? "border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.98))] shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] hover:border-sky-200"
          : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(5,9,17,0.99))] shadow-[0_28px_88px_-44px_rgba(14,165,233,0.14)] hover:border-cyan-400/20"
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={tone === "light" ? "ghost" : "ghost"} className="max-w-full justify-start">
          {article.categoryLabel}
        </Badge>
        {publishDate ? <span className={["text-xs font-medium", tone === "light" ? "text-slate-500" : "text-slate-400/90"].join(" ")}>{publishDate}</span> : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col sm:mt-5">
        <h2 className={["text-[1.08rem] font-bold tracking-[-0.03em] transition group-hover:text-cyan-700 sm:text-[1.28rem] md:text-[1.38rem]", tone === "light" ? "text-slate-900" : "text-slate-50 group-hover:text-cyan-200"].join(" ")}>
          <Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className={["mobile-clamp-2 mt-3 text-[14px] leading-6 sm:mt-4 sm:text-sm sm:leading-7 md:text-[15px] md:leading-8", tone === "light" ? "text-slate-600" : "text-slate-300/84"].join(" ")}>
          {article.excerpt}
        </p>

        <div className={["mt-auto flex items-center justify-between gap-3 border-t pt-4 text-sm sm:mt-6 sm:gap-4 sm:pt-5", tone === "light" ? "border-slate-200" : "border-sky-400/10"].join(" ")}>
          <span className={["truncate", tone === "light" ? "text-slate-500" : "text-slate-400"].join(" ")}>
            {article.relatedToolSlugs.length} {relatedToolsLabel}
          </span>
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className={[
              "inline-flex min-h-[40px] items-center rounded-full px-3.5 py-2 font-semibold transition sm:min-h-[42px] sm:px-4",
              tone === "light"
                ? "border border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-slate-950"
                : "border border-cyan-400/16 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300/24 hover:bg-cyan-400/14"
            ].join(" ")}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
