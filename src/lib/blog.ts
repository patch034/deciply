import { blogArticles } from "@/data/blog";
import { getBlogPlaybookSections } from "@/data/blog-playbooks";
import { useCaseOptions } from "@/data/tool-taxonomy";
import { getContentBaseLocale, localizeString, localizeTree } from "@/lib/locale-copy";
import type { Locale } from "@/i18n/config";
import { getLocalizedToolBySlug, getLocalizedTools } from "@/lib/catalog";
import { buildComparisonPath } from "@/lib/comparisons";
import { assertEncodingHealth, normalizeEncodingTree } from "@/lib/encoding";

import { buildBlogIntroParagraph } from "@/lib/seo";
import type { BlogEntry, LocalizedBlogArticle } from "@/types/blog";

export const BLOG_PAGE_SIZE = 12;

type BlogCopy = {
  breadcrumbsHome: string;
  blogLabel: string;
  listEyebrow: string;
  listTitle: string;
  listDescription: string;
  readMoreLabel: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  comparisonCtaLabel: string;
  relatedToolsTitle: string;
  relatedToolsDescription: string;
  relatedArticlesTitle: string;
  relatedArticlesDescription: string;
  comparisonBlockTitle: string;
  comparisonBlockDescription: string;
  articleLeadLabel: string;
  toolPageRelatedTitle: string;
  toolPageRelatedDescription: string;
  backToBlog: string;
  previousPage: string;
  nextPage: string;
  pageLabel: string;
};

const blogCopyBase: Record<"tr" | "en", BlogCopy> = {
  tr: {
    breadcrumbsHome: "Ana sayfa",
    blogLabel: "Blog",
    listEyebrow: "AI rehberleri",
    listTitle: "AI rehberleri ve karşılaştırmaları",
    listDescription:
      "Doğru aracı seçmene yardımcı olacak pratik rehberler, karşılaştırmalar ve kullanım senaryoları.",
    readMoreLabel: "Devamını oku",
    heroPrimaryCta: "İlgili aracı aç",
    heroSecondaryCta: "İlgili karşılaştırmaları aç",
    comparisonCtaLabel: "Karşılaştırmayı aç",
    relatedToolsTitle: "Bu yazıda geçen araçlar",
    relatedToolsDescription:
      "Makaledeki araçları detay sayfalarında inceleyin, kullanım alanlarını ve alternatiflerini daha net görün.",
    relatedArticlesTitle: "Benzer rehberler",
    relatedArticlesDescription:
      "Aynı konu etrafındaki diğer içeriklere geçerek daha fazla bağlam toplayın ve seçimi netleştirin.",
    comparisonBlockTitle: "Kararı netleştirmek için kısa karşılaştırma",
    comparisonBlockDescription:
      "Araçları yan yana görmek istiyorsanız workflow, fiyat ve kullanım alanına göre kısa bir karşılaştırma açın.",
    articleLeadLabel: "Editoryal rehber",
    toolPageRelatedTitle: "Bu araçla ilgili rehberler",
    toolPageRelatedDescription:
      "Bu araçla ilgili rehberlere ve karşılaştırmalara geçerek kullanım senaryolarını daha hızlı değerlendirebilirsiniz.",
    backToBlog: "Tüm yazılara dön",
    previousPage: "Önceki",
    nextPage: "Sonraki",
    pageLabel: "Sayfa"
  },
  en: {
    breadcrumbsHome: "Home",
    blogLabel: "Blog",
    listEyebrow: "AI guides",
    listTitle: "AI guides and comparisons",
    listDescription:
      "Practical guides, comparisons, and use cases to help you choose the right AI tool.",
    readMoreLabel: "Read more",
    heroPrimaryCta: "Open the related tool",
    heroSecondaryCta: "Open related comparisons",
    comparisonCtaLabel: "Open comparison",
    relatedToolsTitle: "Tools mentioned in this guide",
    relatedToolsDescription:
      "Open the related tool pages to review pricing, strengths, and better-fit use cases before you choose.",
    relatedArticlesTitle: "Related guides",
    relatedArticlesDescription:
      "Keep exploring adjacent topics to collect more context and make the final choice faster.",
    comparisonBlockTitle: "Short comparison to clarify the decision",
    comparisonBlockDescription:
      "If you want to compare tools side by side, open a workflow, pricing, and use-case comparison.",
    articleLeadLabel: "Editorial guide",
    toolPageRelatedTitle: "Guides related to this tool",
    toolPageRelatedDescription:
      "Use these related guides and comparisons to understand where this tool fits best and what to compare next.",
    backToBlog: "Back to all articles",
    previousPage: "Previous",
    nextPage: "Next",
    pageLabel: "Page"
  }
};

assertEncodingHealth("blog-copy");

const blogCopyOverrides: Partial<Record<Locale, Partial<BlogCopy>>> = {
  ar: {
    listEyebrow: "أدلة AI",
    listTitle: "أدلة ومقارنات AI",
    listDescription: "أدلة عملية ومقارنات وحالات استخدام تساعدك على اختيار أداة AI المناسبة."
  },
  ru: {
    listEyebrow: "Гайды по AI",
    listTitle: "Гайды и сравнения AI",
    listDescription: "Практичные гайды, сравнения и сценарии использования, которые помогают выбрать подходящий AI-инструмент."
  },
  zh: {
    listEyebrow: "AI 指南",
    listTitle: "AI 指南与对比",
    listDescription: "用更实用的指南、对比和使用场景帮助你选出合适的 AI 工具。"
  },
  ja: {
    listEyebrow: "AIガイド",
    listTitle: "AIガイドと比較",
    listDescription: "適切な AI ツール選びに役立つ実践的なガイド、比較、ユースケースをまとめています。"
  },
  ko: {
    listEyebrow: "AI 가이드",
    listTitle: "AI 가이드와 비교",
    listDescription: "적합한 AI 도구를 고를 수 있도록 실용적인 가이드, 비교, 활용 사례를 제공합니다."
  },
  el: {
    listEyebrow: "Οδηγοί AI",
    listTitle: "Οδηγοί και συγκρίσεις AI",
    listDescription: "Πρακτικοί οδηγοί, συγκρίσεις και περιπτώσεις χρήσης για να επιλέξεις το σωστό εργαλείο AI."
  },
  da: {
    listEyebrow: "AI-guides",
    listTitle: "AI-guides og sammenligninger",
    listDescription: "Praktiske guides, sammenligninger og brugsscenarier, der hjælper dig med at vælge det rigtige AI-værktøj."
  },
  fa: {
    listEyebrow: "راهنماهای AI",
    listTitle: "راهنماها و مقایسه‌های AI",
    listDescription: "راهنماهای کاربردی، مقایسه‌ها و سناریوهای استفاده که به انتخاب ابزار مناسب AI کمک می‌کنند."
  }
};

const localeCodes: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en-US",
  ar: "ar",
  ru: "ru-RU",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  el: "el-GR",
  da: "da-DK",
  fa: "fa-IR"
};

const alternativesLabelByLocale: Record<Locale, string> = {
  tr: "alternatifleri",
  en: "alternatives",
  ar: "البدائل",
  ru: "альтернативы",
  zh: "替代方案",
  ja: "代替案",
  ko: "대안",
  el: "εναλλακτικές",
  da: "alternativer",
  fa: "جایگزین‌ها"
};

function localizeBlogCopy(locale: Locale, source: BlogCopy): BlogCopy {
  if (locale === "tr" || locale === "en") {
    return source;
  }

  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, localizeString(locale, value)])
  ) as BlogCopy;
}

const blogCopy = Object.fromEntries(
  (["tr", "en", "ar", "ru", "zh", "ja", "ko", "el", "da", "fa"] as const).map((itemLocale) => {
    const localized = localizeBlogCopy(itemLocale, blogCopyBase[itemLocale === "tr" ? "tr" : "en"]);

    return [itemLocale, { ...localized, ...(blogCopyOverrides[itemLocale] ?? {}) }];
  })
) as Record<Locale, BlogCopy>;

export function getBlogCopy(locale: Locale) {
  return blogCopy[locale];
}

export function resolveBlogPublishDate(article: Pick<BlogEntry, "publishDate">) {
  return article.publishDate;
}

export function formatBlogDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(localeCodes[locale], {
    day: "numeric",
    month: locale === "tr" || locale === "ar" || locale === "ru" || locale === "fa" ? "long" : "short",
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
    ...localizeTree(locale, article.locales[getContentBaseLocale(locale)]),
    sections: playbookSections ?? localizeTree(locale, article.locales[getContentBaseLocale(locale)].sections)
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

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getBlogDiscoveryScore(article: LocalizedBlogArticle) {
  const graph = article.contentGraph;
  const kindScore =
    graph?.kind === 'TOOL_COMPARISON' ? 6 :
    graph?.kind === 'BEST_TOOLS' ? 5 :
    graph?.kind === 'ALTERNATIVES' ? 4 :
    graph?.kind === 'USE_CASE_GUIDE' ? 4 :
    3;
  const compareScore = graph?.comparePairs?.length ?? 0;
  const alternativeScore = graph?.alternativeToolSlugs?.length ?? 0;
  const useCasePageScore = graph?.useCasePageSlugs?.length ?? 0;
  const keywordScore = graph?.keywords?.length ?? 0;
  const relatedToolScore = article.relatedToolSlugs.length;

  return kindScore * 10 + compareScore * 7 + alternativeScore * 4 + useCasePageScore * 3 + keywordScore + relatedToolScore * 2;
}

function getBlogRecencyScore(article: LocalizedBlogArticle) {
  const publishTime = new Date(article.publishDate + 'T12:00:00+03:00').getTime();
  const ageInDays = Math.max(0, Math.floor((Date.now() - publishTime) / MS_PER_DAY));

  return Math.max(0, 30 - ageInDays);
}

function rankBlogArticlesByDiscovery(articles: LocalizedBlogArticle[]) {
  return [...articles].sort((left, right) => {
    const leftScore = getBlogDiscoveryScore(left);
    const rightScore = getBlogDiscoveryScore(right);

    if (leftScore !== rightScore) {
      return rightScore - leftScore;
    }

    const leftDate = new Date(left.publishDate + 'T12:00:00+03:00').getTime();
    const rightDate = new Date(right.publishDate + 'T12:00:00+03:00').getTime();

    return rightDate - leftDate;
  });
}

function rankBlogArticlesByTrend(articles: LocalizedBlogArticle[]) {
  return [...articles].sort((left, right) => {
    const leftScore = getBlogDiscoveryScore(left) + getBlogRecencyScore(left);
    const rightScore = getBlogDiscoveryScore(right) + getBlogRecencyScore(right);

    if (leftScore !== rightScore) {
      return rightScore - leftScore;
    }

    const leftDate = new Date(left.publishDate + 'T12:00:00+03:00').getTime();
    const rightDate = new Date(right.publishDate + 'T12:00:00+03:00').getTime();

    return rightDate - leftDate;
  });
}

export function getBlogFeaturedArticles(locale: Locale, limit = 3) {
  return rankBlogArticlesByDiscovery(getLocalizedBlogArticles(locale)).slice(0, limit);
}

export function getBlogTrendingArticles(locale: Locale, limit = 3, excludeSlugs: string[] = []) {
  const excluded = new Set(excludeSlugs);

  return rankBlogArticlesByTrend(getLocalizedBlogArticles(locale).filter((article) => !excluded.has(article.slug))).slice(0, limit);
}

export function getBlogLatestArticles(locale: Locale, limit = 3, excludeSlugs: string[] = []) {
  const excluded = new Set(excludeSlugs);

  return getLocalizedBlogArticles(locale).filter((article) => !excluded.has(article.slug)).slice(0, limit);
}

export function getBlogBoostSections(locale: Locale) {
  const editorPicks = getBlogFeaturedArticles(locale, 3);
  const mostRead = getBlogTrendingArticles(locale, 3, editorPicks.map((article) => article.slug));
  const newThisWeek = getBlogLatestArticles(locale, 3, [...editorPicks, ...mostRead].map((article) => article.slug));

  return {
    editorPicks,
    mostRead,
    newThisWeek,
    latestGuides: getBlogLatestArticles(locale, 4)
  };
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
      label: `${tool.name} ${alternativesLabelByLocale[locale]}`,
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





