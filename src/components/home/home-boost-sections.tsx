import { BlogCard } from "@/components/blog/blog-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { GuideCard } from "@/components/home/guide-card";
import { ToolCard } from "@/components/home/tool-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import type { LocalizedBlogArticle } from "@/types/blog";
import type { ComparisonCard as HomeComparisonCard, GuideCard as HomeGuideCard, ToolCard as HomeToolCard } from "@/types/home";
import type { Locale } from "@/i18n/config";

type HomeBoostSectionsProps = {
  locale: Locale;
  comparisonCards: HomeComparisonCard[];
  trendingGuides: HomeGuideCard[];
  latestGuides: LocalizedBlogArticle[];
  popularTools: HomeToolCard[];
};

const sectionCopy = {
  tr: {
    latestComparisonsEyebrow: "Güncel karşılaştırmalar",
    latestComparisonsTitle: "En yeni compare sayfaları",
    latestComparisonsDescription: "Karar niyeti yüksek karşılaştırmaları doğrudan açın ve ilgili tool sayfalarına geçin.",
    latestComparisonsAction: "Tüm karşılaştırmalar",
    trendingEyebrow: "Bu hafta yükselenler",
    trendingTitle: "İçerik ve use-case odaklı popüler rehberler",
    trendingDescription: "Kullanıcıların en çok keşfettiği rehberleri ve discovery sayfalarını tek blokta görün.",
    trendingAction: "Tüm rehberler",
    latestGuidesEyebrow: "Son rehberler",
    latestGuidesTitle: "Yeni yayınlanan blog yazıları",
    latestGuidesDescription: "Yeni çıkan içerikleri ve karar akışlarını güncel olarak takip edin.",
    latestGuidesAction: "Blog sayfası",
    popularToolsEyebrow: "Popüler araçlar",
    popularToolsTitle: "En çok incelenen AI araçları",
    popularToolsDescription: "Karar aşamasında en sık açılan araçları doğrudan detay ve karşılaştırma sayfalarıyla görün.",
    popularToolsAction: "Tüm araçlar",
    comparisonLinkLabel: "Karşılaştırmayı aç",
    guideLinkLabel: "Rehberi aç",
    toolDetailLabel: "Detaylar",
    toolTryLabel: "Dene",
    toolBestForLabel: "Uygun kullanım",
    toolRatingLabel: "Puan"
  },
  en: {
    latestComparisonsEyebrow: "Recent comparisons",
    latestComparisonsTitle: "Newest comparison pages",
    latestComparisonsDescription: "Open high-intent comparisons directly and move into the related tool pages.",
    latestComparisonsAction: "All comparisons",
    trendingEyebrow: "Trending this week",
    trendingTitle: "Popular guides and discovery pages",
    trendingDescription: "See the guides and discovery pages users are opening most often in one block.",
    trendingAction: "All guides",
    latestGuidesEyebrow: "Latest guides",
    latestGuidesTitle: "Freshly published blog posts",
    latestGuidesDescription: "Keep up with new content and decision flows as they go live.",
    latestGuidesAction: "Blog page",
    popularToolsEyebrow: "Popular tools",
    popularToolsTitle: "Most explored AI tools",
    popularToolsDescription: "Review the tools users open most often, with direct access to detail and comparison pages.",
    popularToolsAction: "All tools",
    comparisonLinkLabel: "Open comparison",
    guideLinkLabel: "Open guide",
    toolDetailLabel: "Details",
    toolTryLabel: "Try",
    toolBestForLabel: "Best for",
    toolRatingLabel: "Rating"
  }
} as const;

export function HomeBoostSections({ locale, comparisonCards, trendingGuides, latestGuides, popularTools }: HomeBoostSectionsProps) {
  const copy = sectionCopy[locale];

  return (
    <div className="mt-12 space-y-12 md:mt-20 md:space-y-20">
      <SectionShell
        className="section-tint-cyan"
        eyebrow={copy.latestComparisonsEyebrow}
        title={copy.latestComparisonsTitle}
        description={copy.latestComparisonsDescription}
        actions={<PremiumButton href={`/${locale}/categories/comparisons`}>{copy.latestComparisonsAction}</PremiumButton>}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {comparisonCards.map((item) => (
            <ComparisonCard key={item.href} locale={locale} item={item} linkLabel={copy.comparisonLinkLabel} featured />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        className="section-tint-violet"
        eyebrow={copy.trendingEyebrow}
        title={copy.trendingTitle}
        description={copy.trendingDescription}
        actions={<PremiumButton href={`/${locale}/blog`}>{copy.trendingAction}</PremiumButton>}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trendingGuides.map((item) => (
            <GuideCard key={item.href} locale={locale} item={item} linkLabel={copy.guideLinkLabel} />
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestGuides.map((article) => (
            <BlogCard key={article.slug} locale={locale} article={article} ctaLabel={locale === "tr" ? "Devamını oku" : "Read more"} />
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard
              key={tool.href}
              locale={locale}
              tool={tool}
              detailLabel={copy.toolDetailLabel}
              tryLabel={copy.toolTryLabel}
              bestForLabel={copy.toolBestForLabel}
              ratingLabel={copy.toolRatingLabel}
            />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}