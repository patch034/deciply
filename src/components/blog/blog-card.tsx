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
    <article
      className={[
        "group flex h-full min-h-[404px] flex-col overflow-hidden rounded-[24px] border p-5 transition duration-300 hover:-translate-y-1.5 sm:min-h-[432px] sm:p-6",
        light
          ? "border-slate-200/95 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(247,250,255,0.98))] shadow-[0_28px_90px_-50px_rgba(15,23,42,0.2)] ring-1 ring-slate-900/[0.03] hover:border-sky-200 hover:shadow-[0_34px_96px_-46px_rgba(37,99,235,0.2)]"
          : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(5,9,17,0.99))] shadow-[0_28px_88px_-44px_rgba(14,165,233,0.14)] hover:border-cyan-400/20"
      ].join(" ")}
    >
      <div className="flex min-h-[82px] flex-wrap items-center gap-3 border-b border-slate-200/85 pb-4 sm:min-h-[86px] sm:pb-5">
        <Badge variant="ghost" className="max-w-full justify-start">
          {article.categoryLabel}
        </Badge>
        {publishDate ? <span className={["text-xs font-medium", light ? "text-slate-500" : "text-slate-400/90"].join(" ")}>{publishDate}</span> : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col sm:mt-5">
        <h2
          className={[
            "min-h-[4.5rem] text-[1.08rem] font-bold tracking-[-0.03em] leading-[1.1] transition group-hover:text-sky-700 sm:min-h-[5.1rem] sm:text-[1.22rem] md:min-h-[5.4rem] md:text-[1.34rem]",
            light ? "text-slate-900" : "text-slate-50 group-hover:text-cyan-200"
          ].join(" ")}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden"
          }}
        >
          <Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link>
        </h2>

        <p
          className={[
            "mt-3 min-h-[5.2rem] text-[14px] leading-6 sm:mt-4 sm:min-h-[5.6rem] sm:text-sm sm:leading-7 md:min-h-[5.95rem] md:text-[15px]",
            light ? "text-slate-600" : "text-slate-300/84"
          ].join(" ")}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden"
          }}
        >
          {article.excerpt}
        </p>

        <div
          className={[
            "mt-auto flex min-h-[84px] items-end justify-between gap-3 border-t pt-4 text-sm sm:min-h-[88px] sm:gap-4 sm:pt-5",
            light ? "border-slate-200" : "border-sky-400/10"
          ].join(" ")}
        >
          <span className={["truncate text-[11px] font-semibold uppercase tracking-[0.2em]", light ? "text-slate-500" : "text-slate-400"].join(" ")}>
            {article.relatedToolSlugs.length} {relatedToolsLabel}
          </span>
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className={[
              "inline-flex min-h-[44px] items-center justify-center rounded-full px-4 text-sm font-semibold transition duration-200 sm:min-w-[136px]",
              "bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] text-white shadow-[0_20px_48px_-26px_rgba(37,99,235,0.58)] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_-26px_rgba(37,99,235,0.62)]"
            ].join(" ")}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
