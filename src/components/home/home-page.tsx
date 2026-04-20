import { HeroSection } from "@/components/home/hero-section";
import { HomeDirectoryShell } from "@/components/home/home-directory-shell";
import { blogArticles } from "@/data/blog";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { getLocalizedCategories, getLocalizedTools } from "@/lib/catalog";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { getContentBaseLocale } from "@/lib/locale-copy";
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
  const blogLocale = getContentBaseLocale(locale);
  const blogs = [...blogArticles]
    .sort((left, right) => String(right.publishDate ?? "").localeCompare(String(left.publishDate ?? "")))
    .slice(0, 10)
    .map((article) => ({
      slug: article.slug,
      title: article.locales[blogLocale].title,
      excerpt: article.locales[blogLocale].excerpt
    }));
  const news = await getAiNewsItems(locale, 10);
  const comparisons = getComparisonDirectoryCards(locale);

  return (
    <div className="ui-page-shell relative min-h-screen overflow-x-clip pb-12 text-slate-900 sm:pb-16 lg:pb-20">
      <HeroSection locale={locale} content={content.hero} />
      <HomeDirectoryShell
        locale={locale}
        categories={categories}
        tools={tools}
        blogs={blogs}
        news={news}
        comparisons={comparisons}
      />
    </div>
  );
}
