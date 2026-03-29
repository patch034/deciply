import type { Locale } from "@/i18n/config";

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

export type BlogEntry = {
  slug: string;
  categorySlug: string;
  publishDate?: string;
  createdAt?: string;
  updatedAt?: string;
  relatedToolSlugs: string[];
  locales: Record<
    Locale,
    {
      title: string;
      excerpt: string;
      intro: string;
      categoryLabel: string;
      seoTitle: string;
      seoDescription: string;
      sections: BlogSection[];
    }
  >;
};

export type LocalizedBlogArticle = {
  slug: string;
  categorySlug: string;
  publishDate: string;
  createdAt?: string;
  updatedAt?: string;
  relatedToolSlugs: string[];
  title: string;
  excerpt: string;
  intro: string;
  categoryLabel: string;
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
};
