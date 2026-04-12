import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/config";
import type { AiNewsItem } from "@/lib/news";

type AiNewsListProps = {
  locale: Locale;
  items: AiNewsItem[];
  variant?: "page" | "sidebar";
};

function formatDate(locale: Locale, value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function AiNewsList({ locale, items, variant = "page" }: AiNewsListProps) {
  const sidebar = variant === "sidebar";

  return (
    <div className={sidebar ? "space-y-2" : "space-y-3"}>
      {items.map((item, index) => {
        const publishedAt = formatDate(locale, item.publishedAt);

        return (
          <article
            key={item.slug}
            className={[
              "group rounded-[22px] border transition",
              sidebar
                ? "border-slate-200 bg-white p-3 shadow-[0_16px_48px_-36px_rgba(15,23,42,0.12)] hover:border-sky-200 hover:bg-slate-50"
                : "border-slate-200 bg-white p-4 shadow-[0_18px_54px_-34px_rgba(15,23,42,0.12)] hover:border-sky-200 hover:bg-slate-50"
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="muted" className="text-[10px]">
                    {item.categoryLabel}
                  </Badge>
                  <span className="text-[11px] text-slate-500">{item.source}</span>
                  {publishedAt ? <span className="text-[11px] text-slate-400">{publishedAt}</span> : null}
                </div>

                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block text-sm font-semibold leading-6 text-slate-950 transition group-hover:text-sky-700"
                >
                  {item.title}
                </a>

                <p className={["mt-1 text-[13px] leading-6 text-slate-600", sidebar ? "clamp-2" : "mobile-clamp-2"].join(" ")}>
                  {item.summary}
                </p>
              </div>
            </div>

            {item.relatedLinks.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.relatedLinks.map((link) => (
                  <Link
                    key={`${item.slug}-${link.href}`}
                    href={link.href}
                    className="inline-flex min-h-[30px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
