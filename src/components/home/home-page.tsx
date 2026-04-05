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

  return (
    <div className="relative overflow-x-clip pb-12 sm:pb-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.24),transparent_32%),radial-gradient(circle_at_85%_12%,rgba(6,182,212,0.14),transparent_28%),linear-gradient(180deg,rgba(2,4,9,0.96),rgba(3,6,13,0.9))]" />
      <HeroSection locale={locale} content={content.hero} />
      <HomeBoostSections locale={locale} comparisonCards={comparisonCards} popularTools={popularTools} />
    </div>
  );
}

