import type { Metadata } from "next";
import Link from "next/link";

import { AiNewsList } from "@/components/news/ai-news-list";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getLocalizedTools } from "@/lib/catalog";
import { toolCategoryOptions } from "@/data/tool-taxonomy";
import { getAiNewsItems } from "@/lib/news";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

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

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;

  return {
    title: safeLocale === "tr" ? "AI Haberleri" : "AI News",
    description:
      safeLocale === "tr"
        ? "Deciply AI haberleri: public kaynaklardan derlenen kısa özetler, ürün sinyalleri ve iç bağlantılar."
        : "Deciply AI news: sourced summaries, product signals, and internal Deciply paths.",
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/news`),
      languages: buildAlternates("/news")
    }
  };
}

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const items = await getAiNewsItems(safeLocale, 10);
  const featuredItems = items.slice(0, 3);
  const latestItems = items.slice(3);
  const featuredTools = getLocalizedTools(safeLocale).filter((tool) => tool.featured).slice(0, 4);
  const toolCategoryLabelMap = new Map<string, string>(toolCategoryOptions[safeLocale].map((item) => [item.slug, item.label]));
  const uniqueSources = Array.from(new Set(items.map((item) => item.source))).slice(0, 6);
  const topicLabels = Array.from(new Set(items.map((item) => item.categoryLabel))).slice(0, 8);

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-transparent px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="ui-card ui-card-hover rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{safeLocale === "tr" ? "AI Haberleri" : "AI News"}</Badge>
          <Badge variant="ghost">{safeLocale === "tr" ? "İç sayfa" : "Internal page"}</Badge>
          <Badge variant="ghost">{safeLocale === "tr" ? "Kaynaklı özet" : "Sourced digest"}</Badge>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {safeLocale === "tr"
                ? "AI haberlerini Deciply içinde oku, bağlamla ve iç sayfalara geç"
                : "Read AI news inside Deciply, keep context, and branch into internal pages"}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {safeLocale === "tr"
                ? "Public RSS ve güvenli kaynaklardan gelen haberler, Deciply’nin araç, karşılaştırma ve kategori yollarına bağlanan iç haber kartlarına dönüşür."
                : "Public RSS and safe source feeds become internal Deciply story pages linked to tools, comparisons, and category paths."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {topicLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex min-h-[32px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.16)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="ui-card rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.14)]">
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {safeLocale === "tr" ? "Haber" : "Stories"}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-950">{items.length}</p>
              </div>
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {safeLocale === "tr" ? "Kaynak" : "Sources"}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-950">{uniqueSources.length}</p>
              </div>
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {safeLocale === "tr" ? "İç yollar" : "Internal paths"}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-950">Deciply</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <PremiumButton href={`/${safeLocale}/news`}>{safeLocale === "tr" ? "Haberleri yenile" : "Refresh news"}</PremiumButton>
              <PremiumButton href={`/${safeLocale}/compare`} variant="secondary">
                {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <SectionShell
            eyebrow={safeLocale === "tr" ? "Öne çıkan haberler" : "Featured stories"}
            title={safeLocale === "tr" ? "Önce içeride oku, sonra kaynağa geç" : "Open the story inside Deciply first"}
            description={
              safeLocale === "tr"
                ? "Öne çıkan haberler başlık, özet ve bağlamla birlikte iç sayfaya yönlendirir."
                : "Featured items open on internal story pages with source, context, and related Deciply paths."
            }
            className="px-0 sm:px-0"
            contentClassName="grid gap-4 md:grid-cols-3"
          >
            {featuredItems.map((item) => {
              const publishedAt = formatDate(safeLocale, item.publishedAt);
              const title = item.displayTitle ?? item.title;
              const summary = item.displaySummary ?? item.summary;
              return (
                <article
                  key={item.slug}
                  className="ui-card ui-card-hover group rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="muted" className="text-[10px]">
                      {item.categoryLabel}
                    </Badge>
                    {publishedAt ? <span className="text-[11px] text-slate-400">{publishedAt}</span> : null}
                  </div>
                  <h2 className="mt-3 text-lg font-bold tracking-[-0.03em] text-slate-950 transition group-hover:text-sky-700">
                    <Link href={`/${safeLocale}/news/${item.slug}`}>{title}</Link>
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/${safeLocale}/news/${item.slug}`}
                      className="inline-flex min-h-[30px] items-center rounded-full border border-sky-200 bg-sky-50 px-3 text-[11px] font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100"
                    >
                      {safeLocale === "tr" ? "Haberi oku" : "Read story"}
                    </Link>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[30px] items-center rounded-full border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                    >
                      {safeLocale === "tr" ? "Kaynağa git" : "Original source"}
                    </a>
                  </div>
                </article>
              );
            })}
          </SectionShell>

          <SectionShell
            eyebrow={safeLocale === "tr" ? "Son haberler" : "Latest stories"}
            title={safeLocale === "tr" ? "Güncel AI gündemini takip et" : "Follow the latest AI agenda"}
            description={
              safeLocale === "tr"
                ? "Daha fazla haberi Deciply içinde aç, ardından ilgili araç ve karşılaştırmalara geç."
                : "Open more headlines inside Deciply, then branch into tools and comparisons."
            }
            className="px-0 sm:px-0"
            contentClassName="space-y-3"
          >
            <AiNewsList locale={safeLocale} items={latestItems} />
          </SectionShell>
        </div>

        <aside className="space-y-6">
            <div className="ui-card rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "Kaynaklar" : "Sources"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {uniqueSources.map((source) => (
                <span
                  key={source}
                  className="inline-flex min-h-[32px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

            <div className="ui-card rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "İlgili araçlar" : "Related tools"}
            </p>
            <div className="mt-4 space-y-2">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${safeLocale}/tools/${tool.slug}`}
                  className="flex items-center justify-between gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-sky-200 hover:bg-white"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-950">{tool.name}</span>
                    <span className="block text-[11px] text-slate-500">{tool.bestUseCase}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {toolCategoryLabelMap.get(tool.toolCategorySlugs[0] ?? "writing") ?? tool.bestUseCase}
                  </span>
                </Link>
              ))}
            </div>
          </div>

            <div className="ui-card rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "Hızlı geçişler" : "Quick jumps"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/${safeLocale}/tools`}
                className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
              >
                {safeLocale === "tr" ? "Araçlar" : "Tools"}
              </Link>
              <Link
                href={`/${safeLocale}/compare`}
                className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
              >
                {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
              </Link>
              <Link
                href={`/${safeLocale}/categories`}
                className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
              >
                {safeLocale === "tr" ? "Kategoriler" : "Categories"}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
