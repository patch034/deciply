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
        ? "Deciply AI haberleri: kısa haber akışları, ürün sinyalleri ve karar destek linkleri."
        : "Deciply AI news: short news flows, product signals, and decision-support links.",
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
  const featuredTools = getLocalizedTools(safeLocale).filter((tool) => tool.featured).slice(0, 4);
  const toolCategoryLabelMap = new Map(toolCategoryOptions[safeLocale].map((item) => [item.slug, item.label]));

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <Badge variant="accent">{safeLocale === "tr" ? "AI Haberleri" : "AI News"}</Badge>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {safeLocale === "tr" ? "Kısa AI haberleri, ürün sinyalleri ve karar linkleri" : "Short AI news, product signals, and decision links"}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {safeLocale === "tr"
                ? "Public kaynaklardan gelen başlıkları, ilgili araç sayfalarını ve karşılaştırma yollarını tek bir akışta aç."
                : "Browse public headlines, linked tool pages, and comparison routes in one compact flow."}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.14)]">
            <div className="flex flex-wrap gap-2">
              <Badge variant="ghost">{safeLocale === "tr" ? "Trend" : "Trending"}</Badge>
              <Badge variant="ghost">{safeLocale === "tr" ? "Kaynaklı başlıklar" : "Source-backed"}</Badge>
              <Badge variant="ghost">{safeLocale === "tr" ? "Karar linkleri" : "Decision links"}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <PremiumButton href={`/${safeLocale}/blog`}>
                {safeLocale === "tr" ? "Bloga geç" : "Go to blog"}
              </PremiumButton>
              <PremiumButton href={`/${safeLocale}/compare`} variant="secondary">
                {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <SectionShell
          eyebrow={safeLocale === "tr" ? "Akış" : "Feed"}
          title={safeLocale === "tr" ? "Son AI haberleri" : "Latest AI news"}
          description={
            safeLocale === "tr"
              ? "Kısa, taranabilir ve ilgili araç sayfalarına bağlanan bir haber akışı."
              : "A short, scannable news flow linked to the most relevant tool pages."
          }
          className="px-0 sm:px-0"
          contentClassName="space-y-3"
        >
          <AiNewsList locale={safeLocale} items={items} />
        </SectionShell>

        <aside className="space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "Öne çıkan araçlar" : "Featured tools"}
            </p>
            <div className="mt-4 space-y-2">
              {featuredTools.map((tool, index) => (
                <Link
                  key={tool.slug}
                href={`/${safeLocale}/tools/${tool.slug}`}
                className="flex items-center justify-between gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-sky-200 hover:bg-white"
              >
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {index + 1}
                    </span>
                    <span className="block truncate text-sm font-semibold text-slate-950">{tool.name}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {toolCategoryLabelMap.get((tool.toolCategorySlugs[0] ?? "writing") as "writing" | "image" | "video" | "productivity") ?? tool.bestUseCase}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "Hızlı geçişler" : "Quick jumps"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/${safeLocale}/tools`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Araçlar" : "Tools"}
              </Link>
              <Link href={`/${safeLocale}/compare`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
              </Link>
              <Link href={`/${safeLocale}/categories`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Kategoriler" : "Categories"}
              </Link>
              <Link href={`/${safeLocale}/blog`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Blog" : "Blog"}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
