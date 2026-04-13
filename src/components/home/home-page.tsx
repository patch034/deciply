import { HomeBoostSections } from "@/components/home/home-boost-sections";
import { HeroSection } from "@/components/home/hero-section";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { getLocalizedTools } from "@/lib/catalog";
import { toHomeToolCard } from "@/lib/tool-ui";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

function buildPopularTools(locale: Locale) {
  return [...getLocalizedTools(locale)]
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      if (left.rating !== right.rating) {
        return right.rating - left.rating;
      }

      return left.slug.localeCompare(right.slug);
    })
    .slice(0, 24)
    .map((tool) => toHomeToolCard(locale, tool));
}

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

export async function HomePage({ locale, content }: HomePageProps) {
  const comparisonCards = getComparisonDirectoryCards(locale).slice(0, 8);
  const allTools = getLocalizedTools(locale).map((tool) => toHomeToolCard(locale, tool));
  const popularTools = buildPopularTools(locale).slice(0, 24);

  return (
    <div className="ui-page-shell relative min-h-screen overflow-x-clip bg-transparent pb-12 text-slate-900 sm:pb-16 lg:pb-20">
      <HeroSection locale={locale} content={content.hero} />
      <HomeBoostSections
        locale={locale}
        comparisonCards={comparisonCards}
        popularTools={popularTools}
        allTools={allTools}
        categories={content.categories}
      />
    </div>
  );
}
