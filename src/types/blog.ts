import type { ContentLocale } from "@/i18n/config";

export type BlogComparisonItem = {
  label: string;
  value: string;
};

export type BlogSubSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type BlogSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subSections?: BlogSubSection[];
  comparison?: {
    title: string;
    items: BlogComparisonItem[];
  };
};

export type BlogTemplateKind =
  | "MANUAL"
  | "BEST_TOOLS"
  | "TOOL_COMPARISON"
  | "ALTERNATIVES"
  | "USE_CASE_GUIDE";

export type BlogComparisonPair = {
  leftSlug: string;
  rightSlug: string;
};

export type BlogContentGraph = {
  kind: BlogTemplateKind;
  primaryToolSlug?: string;
  secondaryToolSlug?: string;
  useCaseSlug?: string;
  comparePairs?: BlogComparisonPair[];
  alternativeToolSlugs?: string[];
  useCasePageSlugs?: string[];
  relatedArticleSlugs?: string[];
  keywords?: string[];
};

export type BlogLocalizedContent = {
  title: string;
  excerpt: string;
  intro: string;
  categoryLabel: string;
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
};

export type BlogEntry = {
  slug: string;
  categorySlug: string;
  publishDate?: string;
  createdAt?: string;
  updatedAt?: string;
  relatedToolSlugs: string[];
  contentGraph?: BlogContentGraph;
  locales: Record<ContentLocale, BlogLocalizedContent>;
};

export type LocalizedBlogArticle = {
  slug: string;
  categorySlug: string;
  publishDate: string;
  createdAt?: string;
  updatedAt?: string;
  relatedToolSlugs: string[];
  contentGraph?: BlogContentGraph;
  title: string;
  excerpt: string;
  intro: string;
  categoryLabel: string;
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
};
