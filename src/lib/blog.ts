import { blogArticles } from "@/data/blog";
import type { Locale } from "@/i18n/config";
import type { LocalizedBlogArticle } from "@/types/blog";

const blogCopy = {
  tr: {
    breadcrumbsHome: "Ana sayfa",
    blogLabel: "Blog",
    listEyebrow: "SEO içerikleri",
    listTitle: "Trafik ve dönüşüm odaklı AI rehberleri",
    listDescription:
      "Deciply blog bölümünde öne çıkan AI araçları, karşılaştırmalar, ücretsiz araç listeleri ve para kazandıran kullanım senaryoları yer alır.",
    readMoreLabel: "Devamını oku",
    heroPrimaryCta: "🚀 Bu aracı incele",
    heroSecondaryCta: "🔥 Öne çıkan AI araçlarını gör",
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
    backToBlog: "Tüm yazılara dön"
  },
  en: {
    breadcrumbsHome: "Home",
    blogLabel: "Blog",
    listEyebrow: "SEO content",
    listTitle: "AI guides built for traffic and conversions",
    listDescription:
      "The Deciply blog covers the best AI tools, comparisons, free tool roundups, and monetization-focused use cases.",
    readMoreLabel: "Read more",
    heroPrimaryCta: "🚀 Try this tool now",
    heroSecondaryCta: "🔥 View top AI tools",
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
    backToBlog: "Back to all articles"
  }
} as const;

export function getBlogCopy(locale: Locale) {
  return blogCopy[locale];
}

export function getBlogPublishSource(article: Pick<LocalizedBlogArticle, "publishedAt" | "createdAt">) {
  return article.publishedAt ?? article.createdAt;
}

export function formatBlogDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: locale === "tr" ? "long" : "short",
    year: "numeric"
  }).format(new Date(value));
}

export function getLocalizedBlogArticles(locale: Locale): LocalizedBlogArticle[] {
  return blogArticles.map((article) => ({
    slug: article.slug,
    categorySlug: article.categorySlug,
    publishedAt: article.publishedAt,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    relatedToolSlugs: article.relatedToolSlugs,
    ...article.locales[locale]
  }));
}

export function getLocalizedBlogArticleBySlug(locale: Locale, slug: string) {
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    return null;
  }

  return {
    slug: article.slug,
    categorySlug: article.categorySlug,
    publishedAt: article.publishedAt,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    relatedToolSlugs: article.relatedToolSlugs,
    ...article.locales[locale]
  } satisfies LocalizedBlogArticle;
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
