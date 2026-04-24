import type { Locale, SupportedLocale } from "@/i18n/config";
import { getLocalizedCategories, getLocalizedTools } from "@/lib/catalog";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { getCategoryHub } from "@/lib/category-taxonomy";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { getAiNewsItems } from "@/lib/news";

export type HomeSearchGroup = "tools" | "categories" | "comparisons" | "blog" | "news";

export type HomeSearchItem = {
  id: string;
  group: HomeSearchGroup;
  title: string;
  subtitle?: string;
  href: string;
  searchText: string;
};

function normalizeSearchText(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function makeSearchText(parts: Array<string | undefined>) {
  return normalizeSearchText(parts.filter(Boolean).join(" "));
}

function dedupeItems(items: HomeSearchItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.group}:${item.href}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function buildHomeSearchIndex(locale: SupportedLocale): Promise<HomeSearchItem[]> {
  const tools = getLocalizedTools(locale).map((tool) => ({
    id: `tool:${tool.slug}`,
    group: "tools" as const,
    title: tool.name,
    subtitle: tool.shortDescription,
    href: `/${locale}/tools/${tool.slug}`,
    searchText: makeSearchText([
      tool.name,
      tool.shortDescription,
      tool.longDescription,
      tool.bestUseCase,
      tool.primaryCategorySlug,
      tool.categorySlug,
      tool.subcategorySlug,
      tool.categorySlugs.join(" "),
      tool.toolCategorySlugs.join(" "),
      tool.useCaseSlugs.join(" "),
      tool.features.join(" ")
    ])
  }));

  const categoryHub = getCategoryHub(locale);
  const localizedCategories = getLocalizedCategories(locale);
  const categoryDescriptions = new Map(localizedCategories.map((category) => [category.slug, category.description]));

  const categories = categoryHub.flatMap((category) => [
    {
      id: `category:${category.slug}`,
      group: "categories" as const,
      title: category.name,
      subtitle: categoryDescriptions.get(category.slug) ?? category.description,
      href: `/${locale}/categories#category-${category.slug}`,
      searchText: makeSearchText([category.name, category.description, category.supportText, category.slug])
    },
    ...category.subcategories.map((subcategory) => ({
      id: `subcategory:${category.slug}:${subcategory.slug}`,
      group: "categories" as const,
      title: subcategory.name,
      subtitle: category.name,
      href: `/${locale}/category/${subcategory.routeSlug}`,
      searchText: makeSearchText([
        subcategory.name,
        subcategory.description,
        category.name,
        category.description,
        category.slug,
        subcategory.slug
      ])
    }))
  ]);

  const comparisons = getComparisonDirectoryCards(locale).map((comparison) => ({
    id: `comparison:${comparison.href}`,
    group: "comparisons" as const,
    title: comparison.title,
    subtitle: comparison.description,
    href: `/${locale}${comparison.href}`,
    searchText: makeSearchText([comparison.title, comparison.description, comparison.highlight, comparison.eyebrow])
  }));

  const blogs = getLocalizedBlogArticles(locale).map((article) => ({
    id: `blog:${article.slug}`,
    group: "blog" as const,
    title: article.title,
    subtitle: article.excerpt,
    href: `/${locale}/blog/${article.slug}`,
    searchText: makeSearchText([
      article.title,
      article.excerpt,
      article.intro,
      article.categoryLabel,
      article.relatedToolSlugs.join(" ")
    ])
  }));

  const newsItems = (await getAiNewsItems(locale, 24)).map((item) => ({
    id: `news:${item.slug}`,
    group: "news" as const,
    title: item.displayTitle ?? item.title,
    subtitle: item.displaySummary ?? item.summary,
    href: `/${locale}/news/${item.slug}`,
    searchText: makeSearchText([
      item.displayTitle ?? item.title,
      item.displaySummary ?? item.summary,
      item.categoryLabel,
      item.source,
      item.dek,
      item.whyItMatters
    ])
  }));

  return dedupeItems([...tools, ...categories, ...comparisons, ...blogs, ...newsItems]);
}

export function getPopularHomeSearchItems(locale: Locale, items: HomeSearchItem[]) {
  const preferredToolTitles = ["ChatGPT", "Claude", "Midjourney", "ElevenLabs", "Perplexity"];
  const picked: HomeSearchItem[] = [];

  for (const title of preferredToolTitles) {
    const match = items.find((item) => item.group === "tools" && item.title.toLowerCase() === title.toLowerCase());

    if (match) {
      picked.push(match);
    }
  }

  return picked.slice(0, 5);
}
