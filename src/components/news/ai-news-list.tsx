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
    <div className={sidebar ? "space-y-2.5" : "space-y-3"}>
      {items.map((item) => {
        const publishedAt = formatDate(locale, item.publishedAt);
        const detailHref = `/${locale}/news/${item.slug}`;
        const sourceMark = buildSourceMark(item.source);

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
              <span
                className={[
                  "flex shrink-0 items-center justify-center rounded-full border text-[10px] font-bold uppercase tracking-[0.16em]",
                  sidebar
                    ? "h-7 w-7 border-slate-200 bg-slate-50 text-slate-500"
                    : "h-8 w-8 border-cyan-200 bg-cyan-50 text-cyan-700"
                ].join(" ")}
              >
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

                <Link
                  href={detailHref}
                  className="mt-1.5 block text-sm font-semibold leading-6 text-slate-950 transition group-hover:text-sky-700"
                >
                  {item.title}
                </Link>

                <p className={["mt-1 text-[13px] leading-6 text-slate-600", sidebar ? "clamp-2" : "mobile-clamp-2"].join(" ")}>
                  {item.summary}
                </p>

                {!sidebar ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link
                      href={detailHref}
                      className="inline-flex min-h-[28px] items-center rounded-full border border-sky-200 bg-sky-50 px-3 text-[11px] font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100"
                    >
                      {locale === "tr" ? "Haberi oku" : "Read story"}
                    </Link>
                    {item.relatedLinks.slice(0, 2).map((link) => (
                      <Link
                        key={`${item.slug}-${link.href}`}
                        href={link.href}
                        className="inline-flex min-h-[28px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
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
                    className="inline-flex min-h-[30px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              <Link
                href={detailHref}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 transition hover:text-sky-800"
              >
                {locale === "tr" ? "Detayı gör" : "View details"}
              </Link>

              {!sidebar ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition hover:text-slate-700"
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
