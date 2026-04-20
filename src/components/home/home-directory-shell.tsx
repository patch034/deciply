import Link from "next/link";
import Image from "next/image";

import { PremiumButton } from "@/components/ui/premium-button";
import type { Locale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import type { LocalizedCategory, LocalizedTool } from "@/types/catalog";
import { formatPricing } from "@/lib/catalog";
import { getToolLogoUrl } from "@/lib/logo";

type HomeDirectoryShellProps = {
  locale: Locale;
  categories: LocalizedCategory[];
  tools: LocalizedTool[];
};

const sectionCopyBase = {
  tr: {
    tabs: ["Bugün", "Yeni", "En çok kaydedilenler", "En çok kullanılanlar", "Uygulamalar"],
    blogsTitle: "Popüler kategoriler",
    blogCta: "Kategoriler",
    newsTitle: "Hızlı karar",
    newsCta: "Karşılaştır",
    toolsFeedTitle: "Canlı araç akışı",
    toolsFeedDescription: "Araçları kompakt satırlarda tara, etiketleri gör ve doğru ürüne daha hızlı geç.",
    toolsFeedCta: "Daha fazla görüntüle",
    categoryTitle: "Kategoriye göre ücretsiz AI araçları",
    categoryCta: "Daha fazla görüntüle",
    featuredTitle: "Öne çıkan yapay zekalar",
    featuredDescription: "Öne çıkan araçları fiyat modeli ve kısa değer önerisiyle hızlıca tarayın.",
    inspectTool: "İncele",
    updatedLabel: "Güncel",
    featuredBadge: "Öne çıkan",
    featuredToolsCta: "Araçlara git"
  },
  en: {
    tabs: ["Today", "New", "Most saved", "Most used", "Apps"],
    blogsTitle: "Latest blog guides",
    blogCta: "Go to blog",
    newsTitle: "AI News",
    newsCta: "View all news",
    toolsFeedTitle: "Live tool feed",
    toolsFeedDescription: "Scan tools in compact rows, review tags, and move straight into the right product.",
    toolsFeedCta: "View more",
    categoryTitle: "Free AI tools by category",
    categoryCta: "View more",
    featuredTitle: "Featured AI tools",
    featuredDescription: "Review featured products with pricing model and a short value cue in one dense grid.",
    inspectTool: "Inspect",
    updatedLabel: "Live",
    featuredBadge: "Featured",
    featuredToolsCta: "Browse tools"
  }
} as const;

function buildFeaturedCategories(categories: LocalizedCategory[]) {
  const preferredSlugs = [
    "chatbots-virtual-companions",
    "office-productivity",
    "image-generation-editing",
    "education-translation",
    "coding-development",
    "video-animation",
    "writing-editing",
    "audio-generation-conversion",
    "marketing-advertising",
    "research-data-analysis"
  ];

  return preferredSlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((item): item is LocalizedCategory => Boolean(item));
}

export function HomeDirectoryShell({ locale, categories, tools }: HomeDirectoryShellProps) {
  const copy = localizeTree(locale, sectionCopyBase[getContentBaseLocale(locale)]);
  const featuredCategories = buildFeaturedCategories(categories).slice(0, 10);
  const feedTools = tools.slice(0, 12);
  const featuredTools = tools.slice(0, 20);

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[1440px] flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <section className="ui-card rounded-[26px] p-4">
        <div className="flex flex-wrap gap-2">
          {copy.tabs.map((tab, index) => (
            <span
              key={tab}
              className={[
                "inline-flex min-h-[38px] items-center rounded-full border px-4 text-sm font-semibold",
                index === 0
                  ? "border-sky-200 bg-sky-50 text-sky-700"
                  : "border-slate-200 bg-white text-slate-600"
              ].join(" ")}
            >
              {tab}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.92fr_1.7fr_1.02fr]">
        <aside className="ui-card rounded-[26px] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold tracking-[-0.03em] text-slate-950">{copy.blogsTitle}</h2>
            <Link href={`/${locale}/categories`} className="text-sm font-semibold text-sky-700 transition hover:text-slate-950">
              {copy.blogCta}
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {featuredCategories.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={`/${locale}/categories/${category.slug}`}
                className="block rounded-[20px] border border-slate-200 bg-white px-4 py-3 transition hover:border-sky-200 hover:bg-slate-50"
              >
                <p className="clamp-2 text-sm font-semibold leading-6 text-slate-900">{category.name}</p>
                <p className="clamp-2 mt-1 text-xs leading-5 text-slate-500">{category.description}</p>
              </Link>
            ))}
          </div>
        </aside>

        <div className="ui-card rounded-[26px] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.updatedLabel}</p>
              <h2 className="mt-2 text-[1.65rem] font-bold tracking-[-0.04em] text-slate-950">{copy.toolsFeedTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{copy.toolsFeedDescription}</p>
            </div>
            <PremiumButton href={`/${locale}/tools`} className="self-start sm:self-auto">
              {copy.toolsFeedCta}
            </PremiumButton>
          </div>

          <div className="mt-5 space-y-3">
            {feedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${locale}/tools/${tool.slug}`}
                className="grid gap-4 rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.05)] transition hover:border-sky-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] sm:grid-cols-[52px_minmax(0,1fr)]"
              >
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                  <Image src={getToolLogoUrl(tool.websiteUrl)} alt={tool.name} width={48} height={48} unoptimized className="h-full w-full object-contain p-2" />
                </span>

                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-slate-950">{tool.name}</span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
                      {formatPricing(tool.pricing, locale)}
                    </span>
                  </span>
                  <span className="clamp-2 mt-1 block text-sm leading-6 text-slate-600">{tool.shortDescription}</span>
                  <span className="mt-2 flex flex-wrap gap-2">
                    {tool.toolCategorySlugs.slice(0, 3).map((tag) => (
                      <span key={tag} className="ui-soft-chip">
                        {tag.replaceAll("-", " ")}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="ui-card rounded-[26px] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold tracking-[-0.03em] text-slate-950">{copy.newsTitle}</h2>
            <Link href={`/${locale}/compare`} className="text-sm font-semibold text-sky-700 transition hover:text-slate-950">
              {copy.newsCta}
            </Link>
          </div>
          <ol className="mt-4 space-y-3">
            {feedTools.slice(0, 8).map((tool, index) => (
              <li key={tool.slug}>
                <Link
                  href={`/${locale}/tools/${tool.slug}`}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-[20px] border border-slate-200 bg-white px-4 py-3 transition hover:border-sky-200 hover:bg-slate-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="clamp-2 block text-sm font-semibold leading-6 text-slate-900">
                      {tool.name}
                    </span>
                    <span className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{formatPricing(tool.pricing, locale)}</span>
                      <span>•</span>
                      <span>{tool.rating.toFixed(1)}/5</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="ui-card rounded-[26px] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[1.6rem] font-bold tracking-[-0.04em] text-slate-950">{copy.categoryTitle}</h2>
          <PremiumButton href={`/${locale}/categories`} variant="secondary">
            {copy.categoryCta}
          </PremiumButton>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {featuredCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/${locale}/categories/${category.slug}`}
              className="ui-inner-panel block rounded-[22px] px-4 py-4 transition hover:-translate-y-0.5 hover:border-sky-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-slate-100 text-sm font-bold text-slate-700">
                {category.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-6 text-slate-900">{category.name}</h3>
              <p className="clamp-2 mt-1 text-xs leading-5 text-slate-500">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="ui-card rounded-[26px] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.featuredBadge}</p>
            <h2 className="mt-2 text-[1.6rem] font-bold tracking-[-0.04em] text-slate-950">{copy.featuredTitle}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{copy.featuredDescription}</p>
          </div>
          <PremiumButton href={`/${locale}/tools`} variant="secondary">
            {copy.featuredToolsCta}
          </PremiumButton>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {featuredTools.map((tool) => (
            <article key={tool.slug} className="ui-inner-panel flex h-full flex-col rounded-[22px] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                  <Image src={getToolLogoUrl(tool.websiteUrl)} alt={tool.name} width={44} height={44} unoptimized className="h-full w-full object-contain p-2" />
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  {formatPricing(tool.pricing, locale)}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-[-0.03em] text-slate-950">{tool.name}</h3>
              <p className="clamp-2 mt-2 text-sm leading-6 text-slate-600">{tool.shortDescription}</p>
              <div className="mt-auto pt-4">
                <Link
                  href={`/${locale}/tools/${tool.slug}`}
                  className="inline-flex min-h-[40px] items-center rounded-[14px] border border-sky-200 bg-sky-50 px-4 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100"
                >
                  {copy.inspectTool}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
