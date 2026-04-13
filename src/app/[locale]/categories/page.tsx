import type { Metadata } from "next";
import Link from "next/link";

import { CategoryCard } from "@/components/catalog/category-card";
import { CategoryHero } from "@/components/catalog/category-hero";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { categories as categoryEntries } from "@/data/categories";
import { getCatalogContent, getLocalizedCategories, getToolsByCategory } from "@/lib/catalog";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const content = getCatalogContent(normalizeLocale(locale));

  return {
    title: content.categoriesIndex.title,
    description: content.categoriesIndex.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${locale}/categories`),
      languages: buildAlternates("/categories")
    }
  };
}

export default async function CategoriesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const content = getCatalogContent(safeLocale);
  const categoryItems = getLocalizedCategories(safeLocale);
  const sidebarIcons: Record<string, string> = {
    "ai-tools": "AI",
    "writing-editing": "W",
    "image-generation-editing": "G",
    "image-analysis": "A",
    "music-audio": "M",
    "audio-generation-conversion": "S",
    "art-creative-design": "T",
    "social-media": "SM",
    "ai-detection-and-undetection": "D",
    "coding-development": "K",
    "video-animation": "V",
    "daily-life": "G",
    "law-finance": "H",
    "business-management": "İ",
    "marketing-advertising": "P",
    "health-wellness": "S",
    "business-research": "R",
    "education-translation": "E",
    "chatbots-virtual-companions": "C",
    "interior-architecture-design": "I",
    "office-productivity": "O",
    "research-data-analysis": "V",
    other: "#"
  };

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-transparent px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <CategoryHero
        eyebrow={content.categoriesIndex.eyebrow}
        title={content.categoriesIndex.title}
        description={content.categoriesIndex.description}
        supportText={content.categoryDetail.internalLinksDescription}
        ctaLabel={content.toolsIndex.title}
        ctaHref={`/${safeLocale}/tools`}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="ui-card ui-card-hover sticky top-28 rounded-[24px] p-4 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.14)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              {safeLocale === "tr" ? "Kategori dizini" : "Category directory"}
            </p>
            <div className="mt-4 space-y-2">
              {categoryEntries.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${safeLocale}/categories/${category.slug}`}
                  aria-current={category.slug === "ai-tools" ? "page" : undefined}
                  className={[
                    "flex items-start justify-between gap-3 rounded-[18px] border px-3 py-3 transition",
                    category.slug === "ai-tools"
                      ? "border-sky-200 bg-sky-50/80 shadow-[0_12px_36px_-26px_rgba(37,99,235,0.22)]"
                      : "border-slate-200 bg-slate-50 hover:border-sky-200 hover:bg-white"
                  ].join(" ")}
                >
                  <span className="flex min-w-0 items-start gap-3">
                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold uppercase tracking-[0.14em]",
                        category.slug === "ai-tools"
                          ? "border-sky-200 bg-white text-sky-700"
                          : "border-slate-200 bg-white text-slate-500"
                      ].join(" ")}
                    >
                      {sidebarIcons[category.slug] ?? category.locales[safeLocale].name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-950">{category.locales[safeLocale].name}</span>
                      <span className="block truncate text-[11px] text-slate-500">{category.locales[safeLocale].description}</span>
                    </span>
                  </span>
                  <Badge variant="muted" className="shrink-0">
                    {getToolsByCategory(safeLocale, category.slug).length}
                  </Badge>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <PremiumButton href={`/${safeLocale}/tools`} className="w-full">
                {content.common.allToolsLabel}
              </PremiumButton>
            </div>
          </div>
        </aside>

        <section className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryItems.map((category) => (
              <CategoryCard
                key={category.slug}
                locale={safeLocale}
                category={category}
                linkLabel={content.categoriesIndex.cardLinkLabel}
              />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Link
                href={`/${safeLocale}/compare`}
                className="ui-card ui-card-hover rounded-[24px] p-5 transition hover:border-sky-200 hover:bg-slate-50"
              >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
              </p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-950">
                {safeLocale === "tr"
                  ? "Karar vermeden önce doğru compare sayfasını aç"
                  : "Open the right comparison page before deciding"}
              </h3>
            </Link>
              <Link
                href={`/${safeLocale}/news`}
                className="ui-card ui-card-hover rounded-[24px] p-5 transition hover:border-sky-200 hover:bg-slate-50"
              >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {safeLocale === "tr" ? "AI Haberleri" : "AI News"}
              </p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-950">
                {safeLocale === "tr"
                  ? "Yeni rehberleri ve trend sinyallerini izle"
                  : "Track new guides and trend signals"}
              </h3>
            </Link>
              <Link
                href={`/${safeLocale}/categories/mega`}
                className="ui-card ui-card-hover rounded-[24px] p-5 transition hover:border-sky-200 hover:bg-slate-50"
              >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {safeLocale === "tr" ? "Mega dizin" : "Mega directory"}
              </p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-950">
                {safeLocale === "tr"
                  ? "Alt konulara ve harf bazlı keşfe geç"
                  : "Move into subtopics and alphabetical browse"}
              </h3>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
