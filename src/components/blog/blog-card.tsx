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

export function BlogCard({ locale, article, ctaLabel, tone = "light" }: BlogCardProps) {
  const relatedToolsLabel = locale === "tr" ? "bağlantılı araç" : "related tools";
  const publishSource = resolveBlogPublishDate(article);
  const publishDate = publishSource ? formatBlogDate(locale, publishSource) : null;
  const light = tone === "light";

  return (
    <div
      className={[
        "group flex h-full min-h-[328px] flex-col overflow-hidden rounded-[22px] border p-5 transition duration-300 hover:-translate-y-1.5 sm:min-h-[344px] sm:p-6",
        light
          ? "border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.98))] shadow-[0_26px_80px_-46px_rgba(15,23,42,0.18)] hover:border-sky-200 hover:shadow-[0_30px_88px_-44px_rgba(37,99,235,0.18)]"
          : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(5,9,17,0.99))] shadow-[0_28px_88px_-44px_rgba(14,165,233,0.14)] hover:border-cyan-400/20"
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200/80 pb-4 sm:pb-5">
        <Badge variant={light ? "ghost" : "ghost"} className="max-w-full justify-start">
          {article.categoryLabel}
        </Badge>
        {publishDate ? (
          <span className={["text-xs font-medium", light ? "text-slate-500" : "text-slate-400/90"].join(" ")}>
            {publishDate}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col sm:mt-5">
        <h2
          className={[
            "text-[1.08rem] font-bold tracking-[-0.03em] leading-[1.12] transition group-hover:text-sky-700 sm:text-[1.22rem] md:text-[1.34rem]",
            light ? "text-slate-900" : "text-slate-50 group-hover:text-cyan-200"
          ].join(" ")}
        >
          <Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link>
        </h2>
        <p
          className={[
            "mobile-clamp-2 mt-3 text-[14px] leading-6 sm:mt-4 sm:text-sm sm:leading-7 md:text-[15px]",
            light ? "text-slate-600" : "text-slate-300/84"
          ].join(" ")}
        >
          {article.excerpt}
        </p>

        <div className={["mt-auto flex items-end justify-between gap-3 border-t pt-4 text-sm sm:mt-6 sm:gap-4 sm:pt-5", light ? "border-slate-200" : "border-sky-400/10"].join(" ")}>
          <span className={["truncate text-xs font-semibold uppercase tracking-[0.18em]", light ? "text-slate-500" : "text-slate-400"].join(" ")}>
            {article.relatedToolSlugs.length} {relatedToolsLabel}
          </span>
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className={[
              "inline-flex min-h-[42px] items-center rounded-full px-4 py-2.5 font-semibold transition duration-200 sm:min-h-[44px] sm:px-[18px]",
              light
                ? "border border-slate-200 bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_58%,#3B82F6_100%)] text-white shadow-[0_18px_40px_-22px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-24px_rgba(37,99,235,0.65)]"
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
