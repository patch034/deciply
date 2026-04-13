import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getLocalizedCategories, getLocalizedTools } from "@/lib/catalog";
import { getBlogTrendingArticles } from "@/lib/blog";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { getAiNewsItemBySlug, getAiNewsItems } from "@/lib/news";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale, normalizeLocale } from "@/i18n/config";

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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function buildWhyItMatters(locale: Locale, title: string, summary: string) {
  const lower = `${title} ${summary}`.toLowerCase();

  if (lower.includes("openai") || lower.includes("chatgpt")) {
    return locale === "tr"
      ? "OpenAI gelişmeleri, chatbot ve karar destek akışlarında en fazla trafik üreten konulardan biri olmaya devam ediyor."
      : "OpenAI headlines usually matter because they affect chatbot workflows, model choices, and high-intent comparison traffic.";
  }

  if (lower.includes("claude")) {
    return locale === "tr"
      ? "Claude güncellemeleri yazma, araştırma ve uzun metin kararlarında doğrudan kıyas akışı üretir."
      : "Claude updates often influence writing, research, and long-form workflow comparisons.";
  }

  if (lower.includes("gemini") || lower.includes("google")) {
    return locale === "tr"
      ? "Google AI gündemi arama, üretkenlik ve model karşılaştırmalarında güçlü kullanıcı niyeti oluşturur."
      : "Google AI stories often shape search, productivity, and model-comparison intent.";
  }

  if (lower.includes("copilot") || lower.includes("microsoft")) {
    return locale === "tr"
      ? "Copilot gelişmeleri ofis, kodlama ve iş akışları için doğrudan araç değerlendirmesine bağlanır."
      : "Microsoft Copilot news often connects directly to office, coding, and workflow tool decisions.";
  }

  if (lower.includes("midjourney") || lower.includes("firefly") || lower.includes("image")) {
    return locale === "tr"
      ? "Görsel üretim haberleri, yaratıcı araç seçimi ve karşılaştırma sayfaları için net iç link fırsatı yaratır."
      : "Image-generation stories usually create strong links into creative tools and comparison pages.";
  }

  return locale === "tr"
    ? "Bu haber, AI araç seçimi ve karar sayfaları için yeni bir sinyal katmanı oluşturuyor."
    : "This headline adds another useful signal layer for tool selection and comparison pages.";
}

export async function generateStaticParams() {
  return locales.flatMap((locale) => []);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const item = await getAiNewsItemBySlug(safeLocale, slug);

  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | ${safeLocale === "tr" ? "AI Haberleri" : "AI News"}`,
    description: item.summary,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/news/${slug}`),
      languages: buildAlternates(`/news/${slug}`)
    }
  };
}

export default async function AiNewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const item = await getAiNewsItemBySlug(safeLocale, slug);

  if (!item) {
    notFound();
  }

  const publishedAt = formatDate(safeLocale, item.publishedAt);
  const title = item.displayTitle ?? item.title;
  const summary = item.displaySummary ?? item.summary;
  const dek = item.dek ?? summary;
  const relatedTools = getLocalizedTools(safeLocale).filter((tool) =>
    item.relatedLinks.some((link) => link.href === `/${safeLocale}/tools/${tool.slug}`)
  );
  const relatedComparisons = getComparisonDirectoryCards(safeLocale).filter((card) =>
    item.relatedLinks.some((link) => link.href === `/${safeLocale}${card.href}`)
  );
  const relatedGuides = getBlogTrendingArticles(safeLocale, 4, []);
  const relatedCategories = getLocalizedCategories(safeLocale).filter((category) =>
    item.relatedLinks.some((link) => link.href === `/${safeLocale}/categories/${category.slug}`)
  );
  const whyItMatters = item.whyItMatters ?? buildWhyItMatters(safeLocale, item.title, item.summary);
  const digestParts = dek.split(".").map((part) => part.trim()).filter(Boolean);
  const digest = digestParts.length > 1 ? digestParts.slice(0, 2) : [summary];

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <Badge variant="accent">{safeLocale === "tr" ? "AI Haberi" : "AI Story"}</Badge>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{summary}</p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.14)]">
            <div className="flex flex-wrap gap-2">
              <Badge variant="ghost">{item.source}</Badge>
              <Badge variant="ghost">{item.categoryLabel}</Badge>
              {publishedAt ? <Badge variant="ghost">{publishedAt}</Badge> : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-slate-950"
              >
                {safeLocale === "tr" ? "Orijinal kaynağa git" : "Original source"}
              </a>
              <PremiumButton href={`/${safeLocale}/news`} variant="secondary">
                {safeLocale === "tr" ? "Tüm haberler" : "All news"}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <SectionShell
            eyebrow={safeLocale === "tr" ? "Özet" : "Digest"}
            title={safeLocale === "tr" ? "Deciply özeti" : "Deciply digest"}
            description={
              safeLocale === "tr"
                ? "Bu haberin kısa özeti, karar okuması için düzenlenmiş şekilde."
                : "A short decision-friendly summary of the news item."
            }
            className="px-0 sm:px-0"
            contentClassName="grid gap-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {digest.map((part) => (
                <div key={part} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)]">
                  <p className="text-sm leading-7 text-slate-600">{part}.</p>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell
            eyebrow={safeLocale === "tr" ? "Neden önemli" : "Why it matters"}
            title={safeLocale === "tr" ? "Karar ve trafik etkisi" : "Decision and traffic impact"}
            description={
              safeLocale === "tr"
                ? "Bu gelişmenin araç seçimi, karşılaştırma ve kullanım akışına etkisi."
                : "How this update affects tool choice, comparisons, and workflow decisions."
            }
            className="px-0 sm:px-0"
            contentClassName="grid gap-4"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)]">
              <p className="text-sm leading-7 text-slate-600">{whyItMatters}</p>
            </div>
          </SectionShell>

          <SectionShell
            eyebrow={safeLocale === "tr" ? "İç linkler" : "Internal links"}
            title={safeLocale === "tr" ? "İlgili Deciply yolları" : "Relevant Deciply paths"}
            description={
              safeLocale === "tr"
                ? "Bu haberle ilişkilendirilen araçlar, karşılaştırmalar, bloglar ve kategoriler."
                : "Tools, comparisons, guides, and categories connected to this story."
            }
            className="px-0 sm:px-0"
            contentClassName="grid gap-5"
          >
            {relatedTools.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                  {safeLocale === "tr" ? "Araçlar" : "Tools"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${safeLocale}/tools/${tool.slug}`}
                      className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {relatedComparisons.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                  {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {relatedComparisons.slice(0, 4).map((card) => (
                    <Link
                      key={card.href}
                      href={`/${safeLocale}${card.href}`}
                      className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
                    >
                      {card.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {relatedCategories.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                  {safeLocale === "tr" ? "Kategoriler" : "Categories"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {relatedCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/${safeLocale}/categories/${category.slug}`}
                      className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {safeLocale === "tr" ? "Rehberler" : "Guides"}
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {relatedGuides.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${safeLocale}/blog/${article.slug}`}
                    className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
          </SectionShell>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "Kaynak" : "Source"}
            </p>
            <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold uppercase text-slate-600">
                  {item.source
                    .split(/\s+/)
                    .map((part) => part[0])
                    .filter(Boolean)
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-950">{item.source}</span>
                  {publishedAt ? <span className="block text-xs text-slate-500">{publishedAt}</span> : null}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "Hızlı geçişler" : "Quick jumps"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/${safeLocale}/news`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Haberler" : "News"}
              </Link>
              <Link href={`/${safeLocale}/tools`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Araçlar" : "Tools"}
              </Link>
              <Link href={`/${safeLocale}/compare`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
              </Link>
              <Link href={`/${safeLocale}/blog`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Blog" : "Blog"}
              </Link>
              <Link href={`/${safeLocale}/categories`} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950">
                {safeLocale === "tr" ? "Kategoriler" : "Categories"}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
