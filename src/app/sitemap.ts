import type { MetadataRoute } from "next";

import { blogArticles } from "@/data/blog";
import { categories } from "@/data/categories";
import { locales } from "@/i18n/config";
import { tools } from "@/data/tools";

const siteUrl = "https://deciply.com";
const staticLastModified = new Date("2026-03-29T00:00:00.000Z");

function withLocale(locale: string, path = "") {
  return `${siteUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: staticLastModified
    }
  ];

  for (const locale of locales) {
    entries.push(
      {
        url: withLocale(locale),
        lastModified: staticLastModified
      },
      {
        url: withLocale(locale, "/blog"),
        lastModified: staticLastModified
      },
      {
        url: withLocale(locale, "/categories"),
        lastModified: staticLastModified
      },
      {
        url: withLocale(locale, "/tools"),
        lastModified: staticLastModified
      }
    );

    for (const category of categories) {
      entries.push({
        url: withLocale(locale, `/categories/${category.slug}`),
        lastModified: staticLastModified
      });
    }

    for (const tool of tools) {
      entries.push({
        url: withLocale(locale, `/tools/${tool.slug}`),
        lastModified: staticLastModified
      });
    }

    for (const article of blogArticles) {
      entries.push({
        url: withLocale(locale, `/blog/${article.slug}`),
        lastModified: new Date(article.updatedAt ?? article.publishDate ?? article.createdAt ?? staticLastModified.toISOString())
      });
    }
  }

  return entries;
}


