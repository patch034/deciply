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
    <div className="mx-auto mt-6 w-full max-w-[1200px] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="space-y-6 sm:space-y-8">
        <SectionShell
          className="section-tint-cyan"
          eyebrow={copy.latestComparisonsEyebrow}
          title={copy.latestComparisonsTitle}
          description={copy.latestComparisonsDescription}
          actions={<PremiumButton href={`/${locale}/categories/comparisons`}>{copy.latestComparisonsAction}</PremiumButton>}
        >
          <div className="grid grid-flow-col auto-cols-[84%] gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:auto-cols-[52%] md:grid-flow-row md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:pb-0">
            {comparisonCards.map((item) => (
              <div key={item.href} className="snap-start">
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
          <div className="grid grid-flow-col auto-cols-[86%] gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:auto-cols-[52%] md:grid-flow-row md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:pb-0">
            {popularTools.map((tool) => (
              <div key={tool.href} className="snap-start">
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
          <div className="grid grid-flow-col auto-cols-[84%] gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:auto-cols-[52%] md:grid-flow-row md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:pb-0">
            {latestGuides.map((article) => (
              <div key={article.slug} className="snap-start">
                <BlogCard locale={locale} article={article} ctaLabel={locale === "tr" ? "Devamını oku" : "Read more"} />
              </div>
            ))}
          </div>
        </SectionShell>

        <details className="group ui-card-strong overflow-hidden rounded-[28px] border border-white/10 px-4 py-4 shadow-[0_24px_70px_-44px_rgba(34,211,238,0.22)] sm:px-6 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{copy.showMoreLabel}</p>
              <p className="mt-2 text-base font-semibold text-slate-50">{copy.showMoreAction}</p>
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-200 transition duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-4 border-t border-white/10 pt-4 sm:mt-5 sm:pt-5">
            <p className="max-w-2xl text-sm leading-7 text-slate-300">{copy.showMoreDescription}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {secondaryGuides.map((item) => (
                <GuideCard key={item.href} locale={locale} item={item} linkLabel={locale === "tr" ? "Rehberi aç" : "Open guide"} />
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
