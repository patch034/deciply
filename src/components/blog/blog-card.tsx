import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { Locale } from "@/i18n/config";
import type { LocalizedBlogArticle } from "@/types/blog";

type BlogCardProps = {
  locale: Locale;
  article: LocalizedBlogArticle;
  ctaLabel: string;
};

export function BlogCard({ locale, article, ctaLabel }: BlogCardProps) {
  const relatedToolsLabel = locale === "tr" ? "bağlantılı araç" : "related tools";

  return (
    <GlassPanel className="group flex h-full flex-col overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(11,15,25,0.98))] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_24px_80px_-42px_rgba(34,211,238,0.22)]">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="ghost" className="max-w-[70%] justify-start text-cyan-200">
          {article.categoryLabel}
        </Badge>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">SEO</span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50 transition group-hover:text-cyan-200">
          <Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">{article.excerpt}</p>

        <div className="mt-6 flex items-center justify-between gap-4 pt-4 text-sm">
          <span className="truncate text-slate-500">
            {article.relatedToolSlugs.length} {relatedToolsLabel}
          </span>
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 font-semibold text-cyan-200 transition hover:border-cyan-300/30 hover:bg-cyan-400/15"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </GlassPanel>
  );
}
