import { AutoCompareWorkspace } from "@/components/comparison/auto-compare-workspace";
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
    .slice(0, 3)
    .map((tool) => toHomeToolCard(locale, tool));
}

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

export function HomePage({ locale, content }: HomePageProps) {
  const comparisonCards = getComparisonDirectoryCards(locale).slice(0, 3);
  const popularTools = buildPopularTools(locale);
  const compareTools = getLocalizedTools(locale);

  return (
    <div className="relative overflow-x-clip pb-10 sm:pb-14 lg:pb-16">
      <HeroSection locale={locale} content={content.hero} />
      <div className="mx-auto mt-8 w-full max-w-[1240px] px-4 sm:px-6 lg:mt-10">
        <AutoCompareWorkspace locale={locale} tools={compareTools} initialLeftSlug="chatgpt" initialRightSlug="claude" compact />
      </div>
      <HomeBoostSections locale={locale} comparisonCards={comparisonCards} popularTools={popularTools} />
    </div>
  );
}
