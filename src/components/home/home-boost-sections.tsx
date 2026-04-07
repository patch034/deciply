import { BlogCard } from "@/components/blog/blog-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { GuideCard } from "@/components/home/guide-card";
import { ToolCard } from "@/components/home/tool-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { getHomepageDiscoveryGuides } from "@/data/discovery-pages";
import type { ComparisonCard as HomeComparisonCard, ToolCard as HomeToolCard } from "@/types/home";
import type { Locale } from "@/i18n/config";

type HomeBoostSectionsProps = {
  locale: Locale;
  comparisonCards: HomeComparisonCard[];
  popularTools: HomeToolCard[];
};

const sectionCopy = {
  tr: {
    latestComparisonsEyebrow: "Güncel karşılaştırmalar",
    latestComparisonsTitle: "En yeni compare sayfaları",
    latestComparisonsDescription: "Karar niyeti yüksek karşılaştırmaları hızlıca açın.",
    latestComparisonsAction: "Tüm karşılaştırmalar",
    latestGuidesEyebrow: "Yeni yazılar",
    latestGuidesTitle: "En yeni blog yazıları",
    latestGuidesDescription: "Yeni yayınlanan rehberleri kısa ve net biçimde görün.",
    latestGuidesAction: "Blog sayfası",
    popularToolsEyebrow: "Popüler araçlar",
    popularToolsTitle: "En çok incelenen AI araçları",
    popularToolsDescription: "Karar aşamasında en sık açılan araçları doğrudan detay sayfalarıyla görün.",
    popularToolsAction: "Tüm araçlar",
    comparisonLinkLabel: "Karşılaştırmayı aç",
    toolDetailLabel: "Detaylar",
    toolTryLabel: "Dene",
    toolBestForLabel: "Uygun kullanım",
    toolRatingLabel: "Puan",
    showMoreLabel: "Daha fazla keşfet",
    showMoreTitle: "İkincil keşif yollarını aç",
    showMoreDescription: "Kategoriler, rehberler ve daha geniş keşif yolları burada kapalı tutulur.",
    showMoreAction: "Daha fazla yolu göster"
  },
  en: {
    latestComparisonsEyebrow: "Recent comparisons",
    latestComparisonsTitle: "Newest comparison pages",
    latestComparisonsDescription: "Open high-intent comparisons directly.",
    latestComparisonsAction: "All comparisons",
    latestGuidesEyebrow: "New posts",
    latestGuidesTitle: "Latest blog posts",
    latestGuidesDescription: "Review the newest guides in a tighter view.",
    latestGuidesAction: "Blog page",
    popularToolsEyebrow: "Popular tools",
    popularToolsTitle: "Most explored AI tools",
    popularToolsDescription: "Review the tools users open most often with direct access to the detail pages.",
    popularToolsAction: "All tools",
    comparisonLinkLabel: "Open comparison",
    toolDetailLabel: "Details",
    toolTryLabel: "Try",
    toolBestForLabel: "Best for",
    toolRatingLabel: "Rating",
    showMoreLabel: "More paths",
    showMoreTitle: "Open secondary discovery paths",
    showMoreDescription: "Categories, guides, and broader discovery routes stay collapsed here.",
    showMoreAction: "Show more paths"
  }
} as const;

export function HomeBoostSections({ locale, comparisonCards, popularTools }: HomeBoostSectionsProps) {
  const copy = sectionCopy[locale];
  const latestGuides = getLocalizedBlogArticles(locale).slice(0, 3);
  const secondaryGuides = getHomepageDiscoveryGuides(locale).slice(0, 4);

  return (
    <div className="mx-auto mt-10 w-full max-w-[1240px] px-4 pb-8 sm:px-6 sm:pb-12 lg:mt-12 lg:pb-16">
      <div className="space-y-8 sm:space-y-10">
        <SectionShell
          className="section-tint-cyan"
          eyebrow={copy.latestComparisonsEyebrow}
          title={copy.latestComparisonsTitle}
          description={copy.latestComparisonsDescription}
          actions={<PremiumButton href={`/${locale}/categories/comparisons`}>{copy.latestComparisonsAction}</PremiumButton>}
        >
          <div className="grid grid-flow-col auto-cols-[92%] gap-5 overflow-x-auto pb-2 snap-x snap-mandatory sm:auto-cols-[60%] md:grid-flow-row md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:pb-0">
            {comparisonCards.map((item) => (
              <div key={item.href} className="snap-start h-full">
                <ComparisonCard locale={locale} item={item} linkLabel={copy.comparisonLinkLabel} featured />
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          className="section-tint-violet"
          eyebrow={copy.popularToolsEyebrow}
          title={copy.popularToolsTitle}
          description={copy.popularToolsDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{copy.popularToolsAction}</PremiumButton>}
        >
          <div className="grid grid-flow-col auto-cols-[92%] gap-5 overflow-x-auto pb-2 snap-x snap-mandatory sm:auto-cols-[60%] md:grid-flow-row md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:pb-0">
            {popularTools.map((tool) => (
              <div key={tool.href} className="snap-start h-full">
                <ToolCard
                  locale={locale}
                  tool={tool}
                  detailLabel={copy.toolDetailLabel}
                  tryLabel={copy.toolTryLabel}
                  bestForLabel={copy.toolBestForLabel}
                  ratingLabel={copy.toolRatingLabel}
                />
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          className="section-tint-cyan"
          eyebrow={copy.latestGuidesEyebrow}
          title={copy.latestGuidesTitle}
          description={copy.latestGuidesDescription}
          actions={<PremiumButton href={`/${locale}/blog`}>{copy.latestGuidesAction}</PremiumButton>}
        >
          <div className="grid grid-flow-col auto-cols-[92%] gap-5 overflow-x-auto pb-2 snap-x snap-mandatory sm:auto-cols-[60%] md:grid-flow-row md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:pb-0">
            {latestGuides.map((article) => (
              <div key={article.slug} className="snap-start h-full">
                <BlogCard locale={locale} article={article} ctaLabel={locale === "tr" ? "Devamını oku" : "Read more"} />
              </div>
            ))}
          </div>
        </SectionShell>

        <details className="group ui-card-strong overflow-hidden rounded-[34px] border border-sky-400/14 px-5 py-5 shadow-[0_28px_84px_-48px_rgba(14,165,233,0.18)] sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">{copy.showMoreLabel}</p>
              <p className="mt-2 text-[1.15rem] font-semibold tracking-[-0.02em] text-slate-50 sm:text-[1.45rem]">{copy.showMoreAction}</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{copy.showMoreDescription}</p>
            </div>
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-400/12 bg-slate-950/45 text-[1.45rem] leading-none text-cyan-100 transition duration-200 group-open:rotate-45 sm:h-14 sm:w-14">
              +
            </span>
          </summary>
          <div className="mt-5 border-t border-sky-400/10 pt-5 sm:mt-6 sm:pt-6">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="rounded-[28px] border border-sky-400/10 bg-slate-950/38 p-5 shadow-[0_20px_64px_-40px_rgba(14,165,233,0.12)] sm:p-6 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{copy.showMoreTitle}</p>
                <p className="mt-3 text-base leading-7 text-slate-300 sm:text-[15px] sm:leading-8">{copy.showMoreDescription}</p>
                <p className="mt-5 text-sm font-semibold text-cyan-100">{copy.showMoreAction}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {secondaryGuides.map((item) => (
                  <GuideCard key={item.href} locale={locale} item={item} linkLabel={locale === "tr" ? "Rehberi aç" : "Open guide"} />
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
