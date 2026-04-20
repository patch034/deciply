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
        "group flex h-full min-h-[290px] flex-col rounded-[22px] border p-4 transition",
        light
          ? "border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_44px_rgba(15,23,42,0.11)]"
          : "border-slate-800 bg-slate-950 text-slate-50"
      ].join(" ")}
    >
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <Badge variant="ghost">{article.categoryLabel}</Badge>
        {publishDate ? (
          <span className={["text-xs font-medium", light ? "text-slate-500" : "text-slate-300"].join(" ")}>
            {publishDate}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className={["mt-4 clamp-2 text-[1.22rem] font-bold tracking-[-0.04em] leading-[1.08]", light ? "text-slate-950" : "text-slate-50"].join(" ")}>
          <Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link>
        </h2>

        <p className={["mt-3 clamp-3 text-[15px] leading-7", light ? "text-slate-600" : "text-slate-300/84"].join(" ")}>
          {article.excerpt}
        </p>

        <div className={["mt-auto flex items-end justify-between gap-3 border-t pt-4", light ? "border-slate-200" : "border-slate-800"].join(" ")}>
          <span className={["text-[11px] font-semibold uppercase tracking-[0.18em]", light ? "text-slate-500" : "text-slate-300"].join(" ")}>
            {article.relatedToolSlugs.length} {relatedToolsLabel}
          </span>
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] px-4 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(37,99,235,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-22px_rgba(37,99,235,0.5)]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
