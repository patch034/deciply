import { BlogCard } from "@/components/blog/blog-card";
import { CategoryCard } from "@/components/home/category-card";
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
  categories: { icon: string; title: string; description: string; href: string; eyebrow: string; metric: string; bestFor: string }[];
};

const sectionCopy = {
  tr: {
    featuredToolsEyebrow: "Keşif akışı",
    featuredToolsTitle: "İnsanların en çok baktığı AI araçları",
    featuredToolsDescription: "Daha fazla araç keşfetmek isteyen kullanıcılar için en görünür başlangıç noktası.",
    featuredToolsAction: "Tüm araçlar",
    categoriesEyebrow: "Kategoriler",
    categoriesTitle: "Kategoriye göre keşfet",
    categoriesDescription: "Hangi problem için hangi araç grubuna bakmanız gerektiğini hızlıca görün.",
    categoriesAction: "Tüm kategoriler",
    comparisonsEyebrow: "Karşılaştırma",
    comparisonsTitle: "Karar vermeden önce karşılaştır",
    comparisonsDescription: "Karar yüzeyleri ikinci adımda burada görünür şekilde sunulur.",
    comparisonsAction: "Tüm karşılaştırmalar",
    guidesEyebrow: "Rehberler",
    guidesTitle: "Güncel rehberler ve kullanım yolları",
    guidesDescription: "Daha derin okumak isteyen kullanıcılar için kısa, güncel ve yönlendirici içerikler.",
    guidesAction: "Blog sayfası",
    guideLinkLabel: "Rehberi aç",
    showMoreLabel: "Daha fazla keşfet",
    showMoreTitle: "İkincil yolları aç",
    showMoreDescription: "Alternatifler, use-case sayfaları ve daha geniş içerik kümeleri burada yer alır.",
    showMoreAction: "Daha fazla yolu göster"
  },
  en: {
    featuredToolsEyebrow: "Discovery flow",
    featuredToolsTitle: "The AI tools people check most often",
    featuredToolsDescription: "A clear starting point for users who want to explore more tools quickly.",
    featuredToolsAction: "All tools",
    categoriesEyebrow: "Categories",
    categoriesTitle: "Browse by category",
    categoriesDescription: "See which tool groups fit each problem area faster.",
    categoriesAction: "All categories",
    comparisonsEyebrow: "Comparisons",
    comparisonsTitle: "Compare before you decide",
    comparisonsDescription: "Comparison surfaces stay visible here as the next step after discovery.",
    comparisonsAction: "All comparisons",
    guidesEyebrow: "Guides",
    guidesTitle: "Current guides and practical paths",
    guidesDescription: "Short, current, and useful content for visitors who want a deeper read.",
    guidesAction: "Blog page",
    guideLinkLabel: "Open guide",
    showMoreLabel: "More to explore",
    showMoreTitle: "Open secondary paths",
    showMoreDescription: "Alternatives, use-case pages, and broader content clusters live here.",
    showMoreAction: "Show more paths"
  }
} as const;

export function HomeBoostSections({ locale, comparisonCards, popularTools, categories }: HomeBoostSectionsProps) {
  const copy = sectionCopy[locale];
  const latestBlogArticles = getLocalizedBlogArticles(locale).slice(0, 4);
  const compareCards = comparisonCards.slice(0, 3);
  const toolCards = popularTools.slice(0, 6);
  const categoryCards = categories.slice(0, 4);

  return (
    <div className="mx-auto mt-8 w-full max-w-[1440px] px-4 pb-10 sm:px-6 sm:pb-14 lg:mt-10 lg:px-8 lg:pb-16">
      <div className="space-y-6 sm:space-y-8">
        <SectionShell
          tone="light"
          className="section-tint-violet px-0 sm:px-0"
          eyebrow={copy.featuredToolsEyebrow}
          title={copy.featuredToolsTitle}
          description={copy.featuredToolsDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{copy.featuredToolsAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {toolCards.map((tool) => (
            <ToolCard
              key={tool.href}
              locale={locale}
              tool={tool}
              detailLabel={locale === "tr" ? "Detayları gör" : "View details"}
              tryLabel={locale === "tr" ? "Dene" : "Try"}
              bestForLabel={locale === "tr" ? "Uygun kullanım" : "Best for"}
              ratingLabel={locale === "tr" ? "Puan" : "Rating"}
              tone="light"
            />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-cyan px-0 sm:px-0"
          eyebrow={copy.categoriesEyebrow}
          title={copy.categoriesTitle}
          description={copy.categoriesDescription}
          actions={<PremiumButton href={`/${locale}/categories`}>{copy.categoriesAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {categoryCards.map((category) => (
            <CategoryCard key={category.href} locale={locale} category={category} linkLabel={locale === "tr" ? "Kategoriyi aç" : "Open category"} tone="light" />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-cyan px-0 sm:px-0"
          eyebrow={copy.comparisonsEyebrow}
          title={copy.comparisonsTitle}
          description={copy.comparisonsDescription}
          actions={<PremiumButton href={`/${locale}/categories/comparisons`}>{copy.comparisonsAction}</PremiumButton>}
          contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {compareCards.map((item) => (
            <ComparisonCard key={item.href} locale={locale} item={item} linkLabel={locale === "tr" ? "Karşılaştırmayı aç" : "Open comparison"} featured tone="light" />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-rose px-0 sm:px-0"
          eyebrow={copy.guidesEyebrow}
          title={copy.guidesTitle}
          description={copy.guidesDescription}
          actions={<PremiumButton href={`/${locale}/blog`}>{copy.guidesAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {latestBlogArticles.map((article) => (
            <BlogCard key={article.slug} locale={locale} article={article} ctaLabel={locale === "tr" ? "Devamını oku" : "Read more"} tone="light" />
          ))}
        </SectionShell>

        <details className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 px-4 py-4 shadow-[0_24px_72px_-46px_rgba(15,23,42,0.14)] sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">{copy.showMoreLabel}</p>
              <p className="mt-2 text-[1.05rem] font-semibold tracking-[-0.02em] text-slate-950 sm:text-[1.35rem]">{copy.showMoreAction}</p>
              <p className="mt-2.5 max-w-2xl text-[13px] leading-6 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7">{copy.showMoreDescription}</p>
            </div>
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[1.35rem] leading-none text-slate-700 transition duration-200 group-open:rotate-45 sm:h-14 sm:w-14">
              +
            </span>
          </summary>
          <div className="mt-4 border-t border-slate-200 pt-4 sm:mt-6 sm:pt-6">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-[0_18px_52px_-40px_rgba(15,23,42,0.1)] sm:p-5 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.showMoreTitle}</p>
                <p className="mt-2.5 text-[13px] leading-6 text-slate-600 sm:mt-3 sm:text-[15px] sm:leading-7">{copy.showMoreDescription}</p>
                <p className="mt-4 text-sm font-semibold text-sky-700">{copy.showMoreAction}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {getHomepageDiscoveryGuides(locale)
                  .slice(0, 4)
                  .map((item) => (
                    <GuideCard key={item.href} locale={locale} item={item} linkLabel={copy.guideLinkLabel} tone="light" />
                  ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
