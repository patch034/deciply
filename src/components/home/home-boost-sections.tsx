import { HomeDiscoveryHub } from "@/components/home/home-discovery-hub";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { getLocalizedCategories, getToolsByCategory } from "@/lib/catalog";
import { getAiNewsItems } from "@/lib/news";
import type { Locale } from "@/i18n/config";
import type { ToolCard as HomeToolCard } from "@/types/home";

type HomepageCategoryCard = {
  slug: string;
  name: string;
  description: string;
  supportText: string;
  href: string;
  count: number;
  icon: string;
};

type HomeBoostSectionsProps = {
  locale: Locale;
  popularTools: HomeToolCard[];
  allTools: HomeToolCard[];
};

const homepageCategoryOrder = [
  "chatbots-virtual-companions",
  "office-productivity",
  "image-generation-editing",
  "education-translation",
  "coding-development",
  "video-animation",
  "writing-editing",
  "audio-generation-conversion",
  "social-media",
  "research-data-analysis"
] as const;

function buildCategoryIcon(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildHomepageCategories(locale: Locale): HomepageCategoryCard[] {
  const localizedCategories = getLocalizedCategories(locale);
  const categoryLookup = new Map(localizedCategories.map((category) => [category.slug, category]));
  const result: HomepageCategoryCard[] = [];

  for (const slug of homepageCategoryOrder) {
    const category = categoryLookup.get(slug);

    if (!category) {
      continue;
    }

    result.push({
      slug,
      name: category.name,
      description: category.description,
      supportText: category.supportText,
      href: `/categories/${slug}`,
      count: getToolsByCategory(locale, slug).length,
      icon: buildCategoryIcon(category.name)
    });
  }

  return result;
}

export async function HomeBoostSections({ locale, popularTools, allTools }: HomeBoostSectionsProps) {
  const blogArticles = getLocalizedBlogArticles(locale).slice(0, 6);
  const newsItems = await getAiNewsItems(locale, 10);
  const categories = buildHomepageCategories(locale);

  return <HomeDiscoveryHub locale={locale} blogArticles={blogArticles} newsItems={newsItems} popularTools={popularTools} allTools={allTools} categories={categories} />;
}
