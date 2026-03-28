import type { Metadata } from "next";

import { BlogCard } from "@/components/blog/blog-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { buildAlternates, isValidLocale, type Locale } from "@/i18n/config";
import { getBlogCopy, getLocalizedBlogArticles } from "@/lib/blog";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const copy = getBlogCopy(locale as Locale);

  return {
    title: `${copy.blogLabel} | Deciply`,
    description: copy.listDescription,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: buildAlternates("/blog")
    }
  };
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const copy = getBlogCopy(safeLocale);
  const articles = getLocalizedBlogArticles(safeLocale);

  return (
    <div className="pb-10 pt-10 lg:pt-14">
      <SectionShell
        eyebrow={copy.listEyebrow}
        title={copy.listTitle}
        description={copy.listDescription}
        actions={<PremiumButton href={`/${safeLocale}/tools`}>{safeLocale === "tr" ? "Araçlara git" : "Browse tools"}</PremiumButton>}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={copy.readMoreLabel} />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
