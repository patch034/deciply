import { blogArticles } from "@/data/blog";
import type { Locale } from "@/i18n/config";
import { assertEncodingHealth, normalizeEncodingTree } from "@/lib/encoding";
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

export function resolveBlogPublishDate(article: Pick<BlogEntry, "publishDate" | "createdAt">) {
  return article.publishDate ?? article.createdAt;
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
  const publishDate = resolveBlogPublishDate(article);

  if (!publishDate) {
    throw new Error(`Blog article is missing publishDate and createdAt: ${article.slug}`);
  }

  const localizedArticle = {
    slug: article.slug,
    categorySlug: article.categorySlug,
    publishDate,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    relatedToolSlugs: article.relatedToolSlugs,
    ...article.locales[locale]
  };

  const normalizedArticle = normalizeEncodingTree(localizedArticle);

  if (normalizedArticle.changed && process.env.NODE_ENV !== "production") {
    console.warn(`[encoding] Repaired suspicious localized blog content for "${article.slug}" (${locale}).`);
  }

  return normalizedArticle.value;
}

function sortArticlesByPublishDate(articles: LocalizedBlogArticle[]) {
  return [...articles].sort((left, right) => {
    const leftTimestamp = new Date(resolveBlogPublishDate(left) ?? 0).getTime();
    const rightTimestamp = new Date(resolveBlogPublishDate(right) ?? 0).getTime();

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

export function getRelatedArticles(locale: Locale, slug: string, limit = 3) {
  const currentArticle = blogArticles.find((item) => item.slug === slug);

  if (!currentArticle) {
    return [];
  }

  return getLocalizedBlogArticles(locale)
    .filter(
      (article) =>
        article.slug !== slug &&
        (article.categorySlug === currentArticle.categorySlug ||
          article.relatedToolSlugs.some((toolSlug) => currentArticle.relatedToolSlugs.includes(toolSlug)))
    )
    .slice(0, limit);
}

export function getRelatedArticlesByTool(locale: Locale, toolSlug: string, limit = 3) {
  return getLocalizedBlogArticles(locale)
    .filter((article) => article.relatedToolSlugs.includes(toolSlug))
    .slice(0, limit);
}
