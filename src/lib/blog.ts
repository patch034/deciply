import { blogArticles } from "@/data/blog";
import { getBlogPlaybookSections } from "@/data/blog-playbooks";
import { useCaseOptions } from "@/data/tool-taxonomy";
import type { Locale } from "@/i18n/config";
import { getLocalizedToolBySlug, getLocalizedTools } from "@/lib/catalog";
import { buildComparisonPath } from "@/lib/comparisons";
import { assertEncodingHealth, normalizeEncodingTree } from "@/lib/encoding";

import { buildBlogIntroParagraph } from "@/lib/seo";
import type { BlogEntry, LocalizedBlogArticle } from "@/types/blog";

export const BLOG_PAGE_SIZE = 12;

const rawBlogCopy = {
  tr: {
    breadcrumbsHome: "Ana sayfa",
    blogLabel: "Blog",
    listEyebrow: "SEO içerikleri",
    listTitle: "Trafik ve dönüşüm odaklı AI rehberleri",
    listDescription:
      "Deciply blog bölümünde öne çıkan AI araçları, karşılaştırmalar, ücretsiz araç listeleri ve para kazandıran kullanım senaryoları yer alır.",
    readMoreLabel: "Devamını oku",
    heroPrimaryCta: "Bu aracı incele",
    heroSecondaryCta: "Öne çıkan AI araçlarını gör",
    comparisonCtaLabel: "Karşılaştırmaya git",
    relatedToolsTitle: "Bu içerikte geçen araçlar",
    relatedToolsDescription:
      "Makaledeki önerileri doğrudan araç detay sayfalarında inceleyin ve kullanım alanlarını daha net görün.",
    relatedArticlesTitle: "Benzer rehberler",
    relatedArticlesDescription:
      "Aynı konu etrafındaki diğer içeriklere geçerek hem daha fazla fikir toplayabilir hem de doğru aracı daha hızlı seçebilirsiniz.",
    comparisonBlockTitle: "Karşılaştırma kısayolu",
    comparisonBlockDescription:
      "Araçları yan yana görmek istiyorsanız Deciply comparison sayfasına geçin.",
    articleLeadLabel: "Güncel rehber",
    toolPageRelatedTitle: "İlgili rehberler",
    toolPageRelatedDescription:
      "Bu araçla ilgili rehber ve SEO odaklı içeriklere geçerek kullanım senaryolarını daha hızlı değerlendirebilirsiniz.",
    backToBlog: "Tüm yazılara dön",
    previousPage: "Önceki",
    nextPage: "Sonraki",
    pageLabel: "Sayfa"
  },
  en: {
    breadcrumbsHome: "Home",
    blogLabel: "Blog",
    listEyebrow: "SEO content",
    listTitle: "AI guides built for traffic and conversions",
    listDescription:
      "The Deciply blog covers the best AI tools, comparisons, free tool roundups, and monetization-focused use cases.",
    readMoreLabel: "Read more",
    heroPrimaryCta: "Try this tool now",
    heroSecondaryCta: "View top AI tools",
    comparisonCtaLabel: "Go to comparison",
    relatedToolsTitle: "Tools mentioned in this article",
    relatedToolsDescription:
      "Open the related tool pages to review pricing, strengths, and better-fit use cases before you choose.",
    relatedArticlesTitle: "Related guides",
    relatedArticlesDescription:
      "Keep exploring adjacent topics to collect more ideas and make the final tool choice faster.",
    comparisonBlockTitle: "Comparison shortcut",
    comparisonBlockDescription:
      "If you want to evaluate tools side by side, jump into the Deciply comparison page.",
    articleLeadLabel: "Fresh guide",
    toolPageRelatedTitle: "Related guides",
    toolPageRelatedDescription:
      "Use these related guides to understand where this tool fits best and what to compare next.",
    backToBlog: "Back to all articles",
    previousPage: "Previous",
    nextPage: "Next",
    pageLabel: "Page"
  }
} as const;

assertEncodingHealth("blog-copy");

const blogCopy = normalizeEncodingTree(rawBlogCopy).value as typeof rawBlogCopy;

export function getBlogCopy(locale: Locale) {
  return blogCopy[locale];
}

export function resolveBlogPublishDate(article: Pick<BlogEntry, "publishDate">) {
  return article.publishDate;
}

export function formatBlogDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: locale === "tr" ? "long" : "short",
    year: "numeric",
    timeZone: "Europe/Istanbul"
  }).format(new Date(`${value}T12:00:00+03:00`));
}

function localizeArticle(article: BlogEntry, locale: Locale): LocalizedBlogArticle {
  const publishDate = article.publishDate;

  if (!publishDate) {
    throw new Error(`Blog article is missing an explicit publishDate: ${article.slug}`);
  }

  const playbookSections = getBlogPlaybookSections(article.slug, locale);

  const baseArticle = {
    slug: article.slug,
    categorySlug: article.categorySlug,
    publishDate,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    relatedToolSlugs: article.relatedToolSlugs,
    contentGraph: article.contentGraph,
    ...article.locales[locale],
    sections: playbookSections ?? article.locales[locale].sections
  };

  const localizedArticle = {
    ...baseArticle,
    intro: buildBlogIntroParagraph(locale, baseArticle)
  };

  const normalizedArticle = normalizeEncodingTree(localizedArticle);

  if (normalizedArticle.changed && process.env.NODE_ENV !== "production") {
    console.warn(`[encoding] Repaired suspicious localized blog content for "${article.slug}" (${locale}).`);
  }

  return normalizedArticle.value;
}

function sortArticlesByPublishDate(articles: LocalizedBlogArticle[]) {
  return [...articles].sort((left, right) => {
    const leftTimestamp = new Date(left.publishDate).getTime();
    const rightTimestamp = new Date(right.publishDate).getTime();

    return rightTimestamp - leftTimestamp;
  });
}

export function getLocalizedBlogArticles(locale: Locale): LocalizedBlogArticle[] {
  return sortArticlesByPublishDate(blogArticles.map((article) => localizeArticle(article, locale)));
}

export function parseBlogPage(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(rawValue ?? "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function getBlogTotalPages() {
  return Math.max(1, Math.ceil(blogArticles.length / BLOG_PAGE_SIZE));
}

export function getPaginatedLocalizedBlogArticles(locale: Locale, page: number) {
  const articles = getLocalizedBlogArticles(locale);
  const totalPages = Math.max(1, Math.ceil(articles.length / BLOG_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * BLOG_PAGE_SIZE;

  return {
    articles: articles.slice(startIndex, startIndex + BLOG_PAGE_SIZE),
    totalArticles: articles.length,
    totalPages,
    currentPage
  };
}

export function getLocalizedBlogArticleBySlug(locale: Locale, slug: string) {
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    return null;
  }

  return localizeArticle(article, locale);
}

function sharedCount(left: string[], right: string[]) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item)).length;
}

function normalizeRelationTokens(values?: Array<string | undefined>) {
  return (values?.filter((value): value is string => Boolean(value)) ?? []);
}

function getArticleRelationScore(currentArticle: LocalizedBlogArticle, candidate: LocalizedBlogArticle) {
  let score = 0;

  if (candidate.categorySlug === currentArticle.categorySlug) {
    score += 4;
  }

  score += sharedCount(candidate.relatedToolSlugs, currentArticle.relatedToolSlugs) * 6;

  if (candidate.contentGraph?.kind && currentArticle.contentGraph?.kind === candidate.contentGraph.kind) {
    score += 3;
  }

  if (currentArticle.contentGraph?.relatedArticleSlugs?.includes(candidate.slug)) {
    score += 8;
  }

  if (candidate.contentGraph?.relatedArticleSlugs?.includes(currentArticle.slug)) {
    score += 6;
  }

  if (
    currentArticle.contentGraph?.useCaseSlug &&
    normalizeRelationTokens([candidate.contentGraph?.useCaseSlug, ...(candidate.contentGraph?.keywords ?? [])]).includes(currentArticle.contentGraph.useCaseSlug)
  ) {
    score += 4;
  }

  score += sharedCount(
    normalizeRelationTokens(currentArticle.contentGraph?.alternativeToolSlugs),
    candidate.relatedToolSlugs
  ) * 3;

  score += sharedCount(
    normalizeRelationTokens(currentArticle.contentGraph?.useCasePageSlugs),
    normalizeRelationTokens(candidate.contentGraph?.useCasePageSlugs)
  ) * 4;

  score += sharedCount(
    normalizeRelationTokens(currentArticle.contentGraph?.keywords),
    normalizeRelationTokens(candidate.contentGraph?.keywords)
  ) * 2;

  return score;
}

function buildArticlePageLinks(locale: Locale, article: LocalizedBlogArticle) {
  const comparePages = (article.contentGraph?.comparePairs ?? [])
    .map((pair) => {
      const leftTool = getLocalizedToolBySlug(locale, pair.leftSlug);
      const rightTool = getLocalizedToolBySlug(locale, pair.rightSlug);

      if (!leftTool || !rightTool) {
        return null;
      }

      return {
        label: `${leftTool.name} vs ${rightTool.name}`,
        href: buildComparisonPath(locale, leftTool.slug, rightTool.slug)
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const alternativePages = normalizeRelationTokens(article.contentGraph?.alternativeToolSlugs)
    .map((toolSlug) => getLocalizedToolBySlug(locale, toolSlug))
    .filter((tool): tool is NonNullable<typeof tool> => tool !== null)
    .map((tool) => ({
      label: locale === "tr" ? `${tool.name} alternatifleri` : `${tool.name} alternatives`,
      href: `/${locale}/alternatives/${tool.slug}`
    }));

  const useCasePages = normalizeRelationTokens(article.contentGraph?.useCasePageSlugs).map((slug) => ({
    label: useCaseOptions[locale].find((item) => item.slug === slug)?.label ?? slug,
    href: `/${locale}/use-cases/${slug}`
  }));

  return { comparePages, alternativePages, useCasePages };
}

export function getRelatedArticles(locale: Locale, slug: string, limit = 3) {
  const currentArticle = getLocalizedBlogArticleBySlug(locale, slug);

  if (!currentArticle) {
    return [];
  }

  return getLocalizedBlogArticles(locale)
    .filter((article) => article.slug !== slug)
    .map((article) => ({ article, score: getArticleRelationScore(currentArticle, article) }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return new Date(right.article.publishDate).getTime() - new Date(left.article.publishDate).getTime();
    })
    .slice(0, limit)
    .map((item) => item.article);
}

export function getRelatedArticlesByTool(locale: Locale, toolSlug: string, limit = 3) {
  return getLocalizedBlogArticles(locale)
    .map((article) => {
      let score = article.relatedToolSlugs.includes(toolSlug) ? 10 : 0;

      if (article.contentGraph?.primaryToolSlug === toolSlug) {
        score += 6;
      }

      if (article.contentGraph?.secondaryToolSlug === toolSlug) {
        score += 5;
      }

      if (article.contentGraph?.alternativeToolSlugs?.includes(toolSlug)) {
        score += 4;
      }

      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return new Date(right.article.publishDate).getTime() - new Date(left.article.publishDate).getTime();
    })
    .slice(0, limit)
    .map((item) => item.article);
}

export function getBlogSupportingLinks(locale: Locale, slug: string, toolLimit = 2, articleLimit = 2) {
  const currentArticle = getLocalizedBlogArticleBySlug(locale, slug);

  if (!currentArticle) {
    return { tools: [], articles: [], comparePages: [], alternativePages: [], useCasePages: [] };
  }

  const pickedToolSlugs = new Set<string>();
  const tools = currentArticle.relatedToolSlugs
    .map((toolSlug) => getLocalizedToolBySlug(locale, toolSlug))
    .filter((tool): tool is NonNullable<typeof tool> => tool !== null)
    .filter((tool) => {
      if (pickedToolSlugs.has(tool.slug)) {
        return false;
      }

      pickedToolSlugs.add(tool.slug);
      return true;
    });

  if (tools.length < toolLimit) {
    for (const tool of getLocalizedTools(locale)) {
      if (pickedToolSlugs.has(tool.slug)) {
        continue;
      }

      pickedToolSlugs.add(tool.slug);
      tools.push(tool);

      if (tools.length >= toolLimit) {
        break;
      }
    }
  }

  const articleCandidates = getRelatedArticles(locale, slug, Math.max(articleLimit, 4));
  const pickedArticleSlugs = new Set(articleCandidates.map((article) => article.slug));

  if (articleCandidates.length < articleLimit) {
    for (const article of getLocalizedBlogArticles(locale)) {
      if (article.slug === slug || pickedArticleSlugs.has(article.slug)) {
        continue;
      }

      pickedArticleSlugs.add(article.slug);
      articleCandidates.push(article);

      if (articleCandidates.length >= articleLimit) {
        break;
      }
    }
  }

  const pageLinks = buildArticlePageLinks(locale, currentArticle);

  return {
    tools: tools.slice(0, toolLimit).map((tool) => ({
      label: tool.name,
      href: `/${locale}/tools/${tool.slug}`
    })),
    articles: articleCandidates.slice(0, articleLimit).map((article) => ({
      label: article.title,
      href: `/${locale}/blog/${article.slug}`
    })),
    comparePages: pageLinks.comparePages.slice(0, 2),
    alternativePages: pageLinks.alternativePages.slice(0, 2),
    useCasePages: pageLinks.useCasePages.slice(0, 2)
  };
}





