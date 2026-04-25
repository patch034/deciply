import { HeroSection } from "@/components/home/hero-section";
import { HomeDirectoryShell } from "@/components/home/home-directory-shell";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { getLocalizedCategories, getLocalizedTools, getToolsByCategory } from "@/lib/catalog";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { buildHomeSearchIndex } from "@/lib/home-search";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { getAiNewsItems } from "@/lib/news";

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

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
    });
}

export async function HomePage({ locale, content }: HomePageProps) {
  const categories = getLocalizedCategories(locale);
  const tools = buildPopularTools(locale);
  const categoryToolCounts = Object.fromEntries(
    categories.map((category) => [category.slug, getToolsByCategory(locale, category.slug).length])
  );
  const blogs = getLocalizedBlogArticles(locale)
    .slice(0, 10)
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt
    }));
  const news = await getAiNewsItems(locale, 10);
  const comparisons = getComparisonDirectoryCards(locale);
  const searchItems = await buildHomeSearchIndex(locale);

  return (
    <div className="ui-page-shell relative min-h-screen overflow-x-clip pb-12 text-slate-900 sm:pb-16 lg:pb-20">
      <HeroSection locale={locale} content={content.hero} searchItems={searchItems} />
      <HomeDirectoryShell
        locale={locale}
        categories={categories}
        categoryToolCounts={categoryToolCounts}
        tools={tools}
        blogs={blogs}
        news={news}
        comparisons={comparisons}
      />
    </div>
  );
}
