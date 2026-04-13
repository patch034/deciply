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

function buildSourceMark(source: string) {
  const letters = source
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .join("");

  return (letters.slice(0, 2) || "AI").toUpperCase();
}

export function AiNewsList({ locale, items, variant = "page" }: AiNewsListProps) {
  const sidebar = variant === "sidebar";

  return (
    <div className={sidebar ? "space-y-2.5" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
      {items.map((item) => {
        const publishedAt = formatDate(locale, item.publishedAt);
        const detailHref = `/${locale}/news/${item.slug}`;
        const sourceMark = buildSourceMark(item.source);
        const title = item.displayTitle ?? item.title;
        const summary = item.displaySummary ?? item.summary;

        return (
          <article
            key={item.slug}
            className={[
              "ui-card ui-card-hover group flex h-full min-h-0 flex-col overflow-hidden rounded-[22px] border transition duration-300 hover:-translate-y-1",
              sidebar
                ? "border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(247,250,253,0.98))] p-3.5 shadow-[0_12px_34px_-20px_rgba(15,23,42,0.12)] hover:border-sky-200 hover:shadow-[0_18px_42px_-24px_rgba(37,99,235,0.14)]"
                : "border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(247,250,253,0.98))] p-4 shadow-[0_14px_36px_-22px_rgba(15,23,42,0.12)] hover:border-sky-200 hover:shadow-[0_18px_42px_-22px_rgba(37,99,235,0.15)]"
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0055FF] shadow-[0_14px_30px_-20px_rgba(37,99,235,0.18)]">
                {sourceMark}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="muted" className="text-[10px]">
                    {item.categoryLabel}
                  </Badge>
                  <span className="text-[11px] text-slate-500">{item.source}</span>
                  {publishedAt ? <span className="text-[11px] text-slate-400">{publishedAt}</span> : null}
                </div>

                <Link href={detailHref} className="mt-1.5 block text-[15px] font-semibold leading-6 text-slate-950 transition group-hover:text-[#0055FF]">
                  {title}
                </Link>

                <p className={["mt-1 text-[13px] leading-6 text-slate-600", sidebar ? "clamp-2" : "mobile-clamp-2"].join(" ")}>
                  {summary}
                </p>

                {!sidebar ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.relatedLinks.slice(0, 2).map((link) => (
                      <Link
                        key={`${item.slug}-${link.href}`}
                        href={link.href}
                        className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-[#0E2450]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {!sidebar && item.relatedLinks.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.relatedLinks.map((link) => (
                  <Link
                    key={`${item.slug}-${link.href}`}
                    href={link.href}
                    className="inline-flex min-h-[30px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-[#0E2450]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-auto flex min-h-[58px] items-end justify-between gap-3 border-t border-slate-200 pt-3.5">
              <Link href={detailHref} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0055FF] transition hover:border-sky-200 hover:bg-slate-50 hover:text-[#0E2450]">
                {locale === "tr" ? "Detayı gör" : "View details"}
              </Link>

              {!sidebar ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition hover:border-slate-300 hover:bg-white hover:text-[#0E2450]"
                >
                  {locale === "tr" ? "Kaynağa git" : "Original source"}
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

