# ToolNova Full Code Export

Bu dosya `C:\TOOLNOVA` içindeki kaynak kodların tek dosyada birleştirilmiş halidir.

---

## FILE: package.json

`$ext
{
  "name": "toolnova",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^6.6.0",
    "clsx": "^2.1.1",
    "framer-motion": "^12.38.0",
    "next": "^15.2.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^22.13.14",
    "@types/react": "^19.0.11",
    "@types/react-dom": "^19.0.4",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.22.0",
    "eslint-config-next": "^15.2.4",
    "postcss": "^8.5.3",
    "prisma": "^6.6.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.2"
  }
}
```

---

## FILE: tsconfig.json

`$ext
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## FILE: next.config.ts

`$ext
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
```

---

## FILE: tailwind.config.ts

`$ext
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#090d16",
          sky: "#60a5fa",
          line: "#233047",
          accent: "#7c3aed",
          accentSoft: "#22d3ee",
          mist: "#dbe7f5",
          panel: "#111827",
          canvas: "#0b0f19"
        }
      },
      boxShadow: {
        card: "0 24px 70px -34px rgba(5, 10, 20, 0.72)",
        "card-soft": "0 18px 48px -30px rgba(5, 10, 20, 0.58)",
        premium: "0 38px 120px -52px rgba(56, 189, 248, 0.28)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(124,58,237,0.2), transparent 28%), radial-gradient(circle at 80% 10%, rgba(34,211,238,0.18), transparent 24%), linear-gradient(135deg, rgba(11,15,25,0.96), rgba(15,23,42,0.94))"
      }
    }
  },
  plugins: []
};

export default config;
```

---

## FILE: postcss.config.js

`$ext
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

---

## FILE: middleware.ts

`$ext
import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, localeCookieName, locales } from "@/i18n/config";

function getPreferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;

  if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase())
    .find((language) => {
      if (!language) {
        return false;
      }

      return locales.some((locale) => language === locale || language.startsWith(`${locale}-`));
    });

  return preferred?.slice(0, 2) ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
```

---

## FILE: prisma\schema.prisma

`$ext
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum Locale {
  tr
  en
}

enum ToolPricing {
  FREE
  FREEMIUM
  PAID
  CUSTOM
}

enum PublishStatus {
  DRAFT
  PUBLISHED
}

model Category {
  id           String           @id @default(cuid())
  slug         String           @unique
  icon         String?
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
  translations CategoryLocale[]
  tools        Tool[]
}

model CategoryLocale {
  id          String   @id @default(cuid())
  locale      Locale
  name        String
  description String?
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@unique([categoryId, locale])
}

model Tool {
  id            String        @id @default(cuid())
  slug          String        @unique
  websiteUrl    String
  pricing       ToolPricing
  affiliateUrl  String?
  featuredScore Int           @default(0)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  categoryId    String
  category      Category      @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  translations  ToolLocale[]
}

model ToolLocale {
  id               String   @id @default(cuid())
  locale           Locale
  name             String
  tagline          String
  intro            String
  bestFor          String
  standoutFeatures String
  pros             String
  cons             String
  whoShouldUse     String
  seoTitle         String?
  seoDescription   String?
  toolId           String
  tool             Tool     @relation(fields: [toolId], references: [id], onDelete: Cascade)

  @@unique([toolId, locale])
}

model Article {
  id           String         @id @default(cuid())
  slug         String         @unique
  type         String
  status       PublishStatus  @default(DRAFT)
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  translations ArticleLocale[]
}

model ArticleLocale {
  id             String   @id @default(cuid())
  locale         Locale
  title          String
  excerpt        String
  content        String
  seoTitle       String?
  seoDescription String?
  articleId      String
  article        Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)

  @@unique([articleId, locale])
}
```

---

## FILE: src\app\[locale]\about\page.tsx

`$ext
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticPageShell } from "@/components/content/static-page-shell";
import { isValidLocale, type Locale } from "@/i18n/config";
import { buildStaticPageMetadata, getStaticPage } from "@/lib/static-pages";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return buildStaticPageMetadata(locale as Locale, "/about", "about");
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <StaticPageShell content={getStaticPage(locale as Locale, "about")} />;
}
```

---

## FILE: src\app\[locale]\affiliate-disclosure\page.tsx

`$ext
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticPageShell } from "@/components/content/static-page-shell";
import { isValidLocale, type Locale } from "@/i18n/config";
import { buildStaticPageMetadata, getStaticPage } from "@/lib/static-pages";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return buildStaticPageMetadata(locale as Locale, "/affiliate-disclosure", "affiliateDisclosure");
}

export default async function AffiliateDisclosurePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <StaticPageShell content={getStaticPage(locale as Locale, "affiliateDisclosure")} />;
}
```

---

## FILE: src\app\[locale]\blog\[slug]\page.tsx

`$ext
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/blog/article-content";
import { ArticleCtaBlock } from "@/components/blog/article-cta-block";
import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { ToolCard } from "@/components/catalog/tool-card";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/ui/section-shell";
import { blogArticles } from "@/data/blog";
import { buildAlternates, isValidLocale, locales, type Locale } from "@/i18n/config";
import { getBlogCopy, getLocalizedBlogArticleBySlug, getRelatedArticles } from "@/lib/blog";
import {
  formatPricing,
  getCategoryNamesMap,
  getCatalogContent,
  getLocalizedToolBySlug
} from "@/lib/catalog";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogArticles.map((article) => ({
      locale,
      slug: article.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const article = getLocalizedBlogArticleBySlug(locale as Locale, slug);

  if (!article) {
    return {};
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: buildAlternates(`/blog/${slug}`)
    }
  };
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const copy = getBlogCopy(safeLocale);
  const article = getLocalizedBlogArticleBySlug(safeLocale, slug);

  if (!article) {
    notFound();
  }

  const content = getCatalogContent(safeLocale);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const relatedTools = article.relatedToolSlugs
    .map((toolSlug) => getLocalizedToolBySlug(safeLocale, toolSlug))
    .filter((tool) => tool !== null);
  const primaryTool = relatedTools[0];
  const relatedArticles = getRelatedArticles(safeLocale, article.slug, 3);
  const heroPrimaryHref = primaryTool ? `/${safeLocale}/tools/${primaryTool.slug}` : `/${safeLocale}/tools`;
  const comparisonHref = `/${safeLocale}/categories/comparisons`;
  const leadSections = article.sections.slice(0, 2);
  const tailSections = article.sections.slice(2);
  const canonicalUrl = `https://toolnova.com/${safeLocale}/blog/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription,
    articleSection: article.categoryLabel,
    inLanguage: safeLocale,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "ToolNova"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: copy.breadcrumbsHome,
        item: `https://toolnova.com/${safeLocale}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.blogLabel,
        item: `https://toolnova.com/${safeLocale}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbsHome, href: `/${safeLocale}` },
            { label: copy.blogLabel, href: `/${safeLocale}/blog` },
            { label: article.title }
          ]}
        />

        <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                {copy.articleLeadLabel}
              </Badge>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="accent">{article.categoryLabel}</Badge>
                <Badge>{safeLocale === "tr" ? "SEO odaklı içerik" : "SEO-focused article"}</Badge>
              </div>
              <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.5rem] lg:leading-[1.03]">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{article.excerpt}</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">{article.intro}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="grid gap-3 sm:grid-cols-1">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "İç link" : "Internal links"}: {relatedTools.length + 1}
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "Bölüm sayısı" : "Sections"}: {article.sections.length}
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">
                  {safeLocale === "tr" ? "Karşılaştırma linki hazır" : "Comparison path ready"}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={heroPrimaryHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]"
                >
                  {copy.heroPrimaryCta}
                </a>
                <a
                  href={comparisonHref}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:text-cyan-300"
                >
                  {copy.comparisonCtaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        <ArticleContent sections={leadSections} />

        <ArticleCtaBlock
          eyebrow={safeLocale === "tr" ? "Ara CTA" : "Mid CTA"}
          title={safeLocale === "tr" ? "Bu içerikte geçen aracı şimdi deneyin" : "Try the tool mentioned in this guide"}
          description={
            safeLocale === "tr"
              ? "Makalede geçen aracı detay sayfasında inceleyip fiyat, kullanım alanı ve alternatiflerini birkaç saniyede görebilirsiniz."
              : "Open the related tool page to review pricing, best-fit use cases, and alternatives in seconds."
          }
          primaryLabel={copy.heroPrimaryCta}
          primaryHref={heroPrimaryHref}
          secondaryLabel={copy.heroSecondaryCta}
          secondaryHref={`/${safeLocale}/tools`}
        />

        {tailSections.length ? <ArticleContent sections={tailSections} /> : null}

        <SectionShell
          eyebrow={copy.relatedToolsTitle}
          title={copy.relatedToolsTitle}
          description={copy.relatedToolsDescription}
          className="px-0 sm:px-0 lg:px-0"
          contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {relatedTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              locale={safeLocale}
              tool={tool}
              categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
              pricingLabel={formatPricing(tool.pricing, safeLocale)}
              detailLabel={content.common.viewDetailsLabel}
            />
          ))}
        </SectionShell>

        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50">{copy.comparisonBlockTitle}</h2>
          <p className="mt-3 text-base leading-7 text-slate-300">{copy.comparisonBlockDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={comparisonHref}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]"
            >
              {copy.comparisonCtaLabel}
            </a>
          </div>
        </section>

        {relatedArticles.length ? (
          <SectionShell
            eyebrow={copy.relatedArticlesTitle}
            title={copy.relatedArticlesTitle}
            description={copy.relatedArticlesDescription}
            className="px-0 sm:px-0 lg:px-0"
            contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {relatedArticles.map((relatedArticle) => (
              <BlogCard
                key={relatedArticle.slug}
                locale={safeLocale}
                article={relatedArticle}
                ctaLabel={copy.readMoreLabel}
              />
            ))}
          </SectionShell>
        ) : null}

        <ArticleCtaBlock
          eyebrow={safeLocale === "tr" ? "Son CTA" : "Final CTA"}
          title={safeLocale === "tr" ? "Doğru aracı seçmeye hazırsanız şimdi devam edin" : "Ready to choose the right tool?"}
          description={
            safeLocale === "tr"
              ? "Blog içeriğini okuduktan sonra en doğru sonraki adım, aracı açıp detay sayfasında artılarını, eksilerini ve fiyat bilgisini görmek olacaktır."
              : "After reading the guide, the best next step is opening the tool page to review pricing, strengths, and alternatives before clicking out."
          }
          primaryLabel={copy.heroPrimaryCta}
          primaryHref={heroPrimaryHref}
          secondaryLabel={copy.backToBlog}
          secondaryHref={`/${safeLocale}/blog`}
        />
      </div>
    </>
  );
}
```

---

## FILE: src\app\[locale]\blog\page.tsx

`$ext
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
    title: `${copy.blogLabel} | ToolNova`,
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
```

---

## FILE: src\app\[locale]\categories\[slug]\page.tsx

`$ext
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { CategoryHero } from "@/components/catalog/category-hero";
import { InfoSection } from "@/components/catalog/info-section";
import { ToolCard } from "@/components/catalog/tool-card";
import { ComparisonBreakdownTable } from "@/components/comparison/comparison-breakdown-table";
import { ComparisonFaq } from "@/components/comparison/comparison-faq";
import { RelatedComparisonCard } from "@/components/comparison/related-comparison-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { categories } from "@/data/categories";
import { getComparisonContent } from "@/data/comparisons";
import {
  formatPricing,
  getCatalogContent,
  getCategoryNamesMap,
  getLocalizedCategoryBySlug,
  getLocalizedToolBySlug,
  getToolsByCategory
} from "@/lib/catalog";
import { buildAlternates, isValidLocale, locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      slug: category.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  if (slug === "comparisons") {
    const comparison = getComparisonContent(locale as Locale);

    return {
      title: `${comparison.title} | ToolNova`,
      description: comparison.summary,
      alternates: {
        canonical: `/${locale}/categories/${slug}`,
        languages: buildAlternates(`/categories/${slug}`)
      }
    };
  }

  const category = getLocalizedCategoryBySlug(locale as Locale, slug);

  if (!category) {
    return {};
  }

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: `/${locale}/categories/${slug}`,
      languages: buildAlternates(`/categories/${slug}`)
    }
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const content = getCatalogContent(safeLocale);
  const category = getLocalizedCategoryBySlug(safeLocale, slug);

  if (!category) {
    notFound();
  }

  const categoryNamesMap = getCategoryNamesMap(safeLocale);

  if (slug === "comparisons") {
    const comparison = getComparisonContent(safeLocale);
    const primaryTool = getLocalizedToolBySlug(safeLocale, comparison.primaryToolSlug);
    const secondaryTool = getLocalizedToolBySlug(safeLocale, comparison.secondaryToolSlug);

    if (!primaryTool || !secondaryTool) {
      notFound();
    }

    const canonicalUrl = `https://toolnova.com/${safeLocale}/categories/comparisons`;
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: comparison.title,
      description: comparison.summary,
      url: canonicalUrl,
      inLanguage: safeLocale
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: comparison.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: content.common.breadcrumbsHome,
          item: `https://toolnova.com/${safeLocale}`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: content.common.categoriesLabel,
          item: `https://toolnova.com/${safeLocale}/categories`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: comparison.title,
          item: canonicalUrl
        }
      ]
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumb
            items={[
              { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
              { label: content.common.categoriesLabel, href: `/${safeLocale}/categories` },
              { label: comparison.title }
            ]}
          />

          <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                  {comparison.hero.eyebrow}
                </Badge>
                <h1 className="mt-5 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.8rem] lg:leading-[1.02]">
                  {comparison.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{comparison.summary}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="accent">{formatPricing(primaryTool.pricing, safeLocale)}</Badge>
                  <Badge>{primaryTool.name}</Badge>
                  <Badge>{secondaryTool.name}</Badge>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <PremiumButton href={`/${safeLocale}/tools/${primaryTool.slug}`} className="w-full">
                    {comparison.hero.leftButton}
                  </PremiumButton>
                  <PremiumButton href={`/${safeLocale}/tools/${secondaryTool.slug}`} className="w-full">
                    {comparison.hero.rightButton}
                  </PremiumButton>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {comparison.selectionCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{item.title}</p>
                <h2 className="mt-4 text-lg font-semibold text-slate-100">{item.toolLabel}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            ))}
          </section>

          <InfoSection title={comparison.guidance.title} description={comparison.guidance.description}>
            <div className="grid gap-4 md:grid-cols-3">
              {comparison.guidance.items.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-sm font-semibold text-slate-100 md:text-base">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </InfoSection>

          <ComparisonBreakdownTable
            locale={safeLocale}
            title={comparison.table.title}
            description={comparison.table.description}
            columns={comparison.table.columns}
            rows={comparison.table.rows}
          />

          <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {safeLocale === "tr" ? "Ara CTA" : "Mid CTA"}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{comparison.midCta.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{comparison.midCta.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <PremiumButton href={`/${safeLocale}/tools/${primaryTool.slug}`} className="w-full">
                  {comparison.midCta.leftButton}
                </PremiumButton>
                <PremiumButton href={`/${safeLocale}/tools/${secondaryTool.slug}`} className="w-full">
                  {comparison.midCta.rightButton}
                </PremiumButton>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <InfoSection title={comparison.finalVerdict.title} description={comparison.finalVerdict.description}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm font-semibold text-slate-100">{comparison.finalVerdict.leftTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{comparison.finalVerdict.leftDescription}</p>
                  <div className="mt-5">
                    <PremiumButton href={`/${safeLocale}/tools/${primaryTool.slug}`} className="w-full">
                      {comparison.finalVerdict.leftButton}
                    </PremiumButton>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm font-semibold text-slate-100">{comparison.finalVerdict.rightTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{comparison.finalVerdict.rightDescription}</p>
                  <div className="mt-5">
                    <PremiumButton href={`/${safeLocale}/tools/${secondaryTool.slug}`} className="w-full">
                      {comparison.finalVerdict.rightButton}
                    </PremiumButton>
                  </div>
                </div>
              </div>
            </InfoSection>

            <InfoSection title={content.common.relatedToolsLabel} description={content.toolDetail.relatedToolsDescription}>
              <div className="grid gap-5 md:grid-cols-2">
                {[primaryTool, secondaryTool].map((tool) => (
                  <ToolCard
                    key={tool.slug}
                    locale={safeLocale}
                    tool={tool}
                    categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
                    pricingLabel={formatPricing(tool.pricing, safeLocale)}
                    detailLabel={content.common.viewDetailsLabel}
                  />
                ))}
              </div>
            </InfoSection>
          </section>

          <ComparisonFaq
            title={comparison.faq.title}
            description={comparison.faq.description}
            items={comparison.faq.items}
          />

          <SectionShell
            eyebrow={content.common.relatedContentLabel}
            title={comparison.related.title}
            description={comparison.related.description}
          >
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {comparison.related.cards.map((card) => (
                <RelatedComparisonCard
                  key={card.title}
                  locale={safeLocale}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  ctaLabel={card.ctaLabel}
                  highlight={card.highlight}
                />
              ))}
            </div>
          </SectionShell>
        </div>
      </>
    );
  }

  const tools = getToolsByCategory(safeLocale, slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumb
        items={[
          { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
          { label: content.common.categoriesLabel, href: `/${safeLocale}/categories` },
          { label: category.name }
        ]}
      />

      <CategoryHero
        eyebrow={content.common.categoriesLabel}
        title={category.name}
        description={category.description}
        supportText={category.supportText}
        ctaLabel={content.categoryDetail.allToolsLink}
        ctaHref={`/${safeLocale}/tools`}
      />

      <SectionShell
        eyebrow={content.common.allToolsLabel}
        title={content.categoryDetail.toolsTitle}
        description={content.categoryDetail.toolsDescription}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              locale={safeLocale}
              tool={tool}
              categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
              pricingLabel={formatPricing(tool.pricing, safeLocale)}
              detailLabel={content.common.viewDetailsLabel}
            />
          ))}
        </div>
      </SectionShell>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoSection title={content.categoryDetail.relatedTitle} description={content.categoryDetail.relatedDescription}>
          <div className="rounded-[24px] border border-dashed border-white/15 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">
            {content.common.placeholderLabel}: rehber içerikler, alternatif yazıları ve kategoriye özel karşılaştırmalar burada listelenecek.
          </div>
        </InfoSection>

        <InfoSection title={content.categoryDetail.internalLinksTitle} description={content.categoryDetail.internalLinksDescription}>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link href={`/${safeLocale}/tools`} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300">
              {content.categoryDetail.allToolsLink}
            </Link>
            <Link href={`/${safeLocale}/categories`} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300">
              {content.categoryDetail.allCategoriesLink}
            </Link>
            <Link href={`/${safeLocale}/categories/guides`} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-300">
              {content.categoryDetail.guidesLink}
            </Link>
          </div>
        </InfoSection>
      </div>
    </div>
  );
}
```

---

## FILE: src\app\[locale]\categories\page.tsx

`$ext
import type { Metadata } from "next";

import { CategoryCard } from "@/components/catalog/category-card";
import { CategoryHero } from "@/components/catalog/category-hero";
import { getCatalogContent, getLocalizedCategories } from "@/lib/catalog";
import { buildAlternates, isValidLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const content = getCatalogContent(locale as Locale);

  return {
    title: content.categoriesIndex.title,
    description: content.categoriesIndex.description,
    alternates: {
      canonical: `/${locale}/categories`,
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

  const safeLocale = locale as Locale;
  const content = getCatalogContent(safeLocale);
  const categoryItems = getLocalizedCategories(safeLocale);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <CategoryHero
        eyebrow={content.categoriesIndex.eyebrow}
        title={content.categoriesIndex.title}
        description={content.categoriesIndex.description}
        supportText={content.categoryDetail.internalLinksDescription}
        ctaLabel={content.toolsIndex.title}
        ctaHref={`/${safeLocale}/tools`}
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categoryItems.map((category) => (
          <CategoryCard
            key={category.slug}
            locale={safeLocale}
            category={category}
            linkLabel={content.categoriesIndex.cardLinkLabel}
          />
        ))}
      </section>
    </div>
  );
}
```

---

## FILE: src\app\[locale]\contact\page.tsx

`$ext
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticPageShell } from "@/components/content/static-page-shell";
import { isValidLocale, type Locale } from "@/i18n/config";
import { buildStaticPageMetadata, getStaticPage } from "@/lib/static-pages";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return buildStaticPageMetadata(locale as Locale, "/contact", "contact");
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <StaticPageShell content={getStaticPage(locale as Locale, "contact")} />;
}
```

---

## FILE: src\app\[locale]\layout.tsx

`$ext
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, isValidLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.homeTitle,
    description: dictionary.meta.homeDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: buildAlternates("/")
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale as Locale);

  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale as Locale} dictionary={dictionary} />
      <main>{children}</main>
      <SiteFooter locale={locale as Locale} dictionary={dictionary} />
    </div>
  );
}
```

---

## FILE: src\app\[locale]\page.tsx

`$ext
import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { getHomeContent } from "@/data/home";
import { buildAlternates, isValidLocale, type Locale } from "@/i18n/config";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;
  const content = getHomeContent(safeLocale);

  return {
    title:
      safeLocale === "tr"
        ? "ToolNova | AI araçlarını karşılaştır, keşfet ve doğru seçimi yap"
        : "ToolNova | Compare AI tools and choose with confidence",
    description: content.hero.description,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: buildAlternates("")
    }
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const content = getHomeContent(safeLocale);

  return <HomePage locale={safeLocale} content={content} />;
}
```

---

## FILE: src\app\[locale]\privacy-policy\page.tsx

`$ext
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticPageShell } from "@/components/content/static-page-shell";
import { isValidLocale, type Locale } from "@/i18n/config";
import { buildStaticPageMetadata, getStaticPage } from "@/lib/static-pages";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return buildStaticPageMetadata(locale as Locale, "/privacy-policy", "privacyPolicy");
}

export default async function PrivacyPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <StaticPageShell content={getStaticPage(locale as Locale, "privacyPolicy")} />;
}
```

---

## FILE: src\app\[locale]\terms\page.tsx

`$ext
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticPageShell } from "@/components/content/static-page-shell";
import { isValidLocale, type Locale } from "@/i18n/config";
import { buildStaticPageMetadata, getStaticPage } from "@/lib/static-pages";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return buildStaticPageMetadata(locale as Locale, "/terms", "terms");
}

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <StaticPageShell content={getStaticPage(locale as Locale, "terms")} />;
}
```

---

## FILE: src\app\[locale]\tools\[slug]\page.tsx

`$ext
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { FloatingAffiliateBar } from "@/components/catalog/floating-affiliate-bar";
import { InfoSection } from "@/components/catalog/info-section";
import { ProsConsCard } from "@/components/catalog/pros-cons-card";
import { ToolCard } from "@/components/catalog/tool-card";
import { Badge } from "@/components/ui/badge";
import {
  formatPricing,
  getCatalogContent,
  getCategoryNamesMap,
  getLocalizedToolBySlug,
  getRelatedTools
} from "@/lib/catalog";
import { buildAlternates, isValidLocale, locales, type Locale } from "@/i18n/config";
import { getBlogCopy, getRelatedArticlesByTool } from "@/lib/blog";
import { tools } from "@/data/tools";
import type { LocalizedTool, PricingTier } from "@/types/catalog";

type LocalizedLabelMap = Record<Locale, Record<string, string>>;

type DetailCopy = {
  breadcrumbsHome: string;
  toolsLabel: string;
  quickInfoTitle: string;
  bestForLabel: string;
  pricingLabel: string;
  categoryLabel: string;
  overviewTitle: string;
  overviewDescription: string;
  featuresTitle: string;
  featuresDescription: string;
  whyChooseTitle: string;
  whyChooseDescription: string;
  prosTitle: string;
  consTitle: string;
  pricingTitle: string;
  pricingDescription: string;
  pricingNotes: Record<PricingTier, string>;
  whoShouldUseTitle: string;
  whoShouldUseDescription: string;
  whoShouldAvoidTitle: string;
  whoShouldAvoidDescription: string;
  alternativesTitle: string;
  alternativesDescription: string;
  trustUsersLabel: string;
  trustUpdatedLabel: string;
  middleCtaTitle: string;
  middleCtaDescription: string;
  bottomCtaEyebrow: string;
  bottomCtaTitle: string;
  bottomCtaDescription: string;
  primaryCta: Record<PricingTier, string>;
  secondaryCta: string;
  bestForBySlug: Record<string, string>;
};

const copy: Record<Locale, DetailCopy> = {
  tr: {
    breadcrumbsHome: "Ana sayfa",
    toolsLabel: "Araçlar",
    quickInfoTitle: "Hızlı bakış",
    bestForLabel: "En uygun kullanım",
    pricingLabel: "Fiyat",
    categoryLabel: "Kategori",
    overviewTitle: "Bu araç nedir?",
    overviewDescription: "Aracın temel kullanım mantığını ve hangi işlerde öne çıktığını kısa bir özetle görün.",
    featuresTitle: "Öne çıkan özellikler",
    featuresDescription: "Karar vermeden önce aracın sunduğu temel özellikleri hızlıca tarayın.",
    whyChooseTitle: "Neden değerlendirmeye değer?",
    whyChooseDescription: "Bu aracın hangi senaryolarda anlamlı olabileceğini tarafsız biçimde görün.",
    prosTitle: "Artıları",
    consTitle: "Eksileri",
    pricingTitle: "Fiyatlandırma",
    pricingDescription: "Ücretsiz başlayıp başlayamayacağınızı ve ücretli plana ne zaman ihtiyaç duyabileceğinizi sade biçimde görün.",
    pricingNotes: {
      FREE: "Doğrudan ücretsiz başlanabilir. İlk test için düşük sürtünmeli bir seçenektir.",
      FREEMIUM: "Ücretsiz planla başlayıp ihtiyaçlarınıza göre ücretli özelliklere geçebilirsiniz.",
      PAID: "Esas değeri ücretli planda ortaya çıkabilir; düzenli kullanım için daha mantıklı olabilir."
    },
    whoShouldUseTitle: "Kimler kullanmalı?",
    whoShouldUseDescription: "Aşağıdaki profiller için bu araç daha uygun olabilir.",
    whoShouldAvoidTitle: "Kimler kullanmamalı?",
    whoShouldAvoidDescription: "Aşağıdaki ihtiyaçlar sizde ağır basıyorsa alternatiflere bakmak daha mantıklı olabilir.",
    alternativesTitle: "Alternatif araçlar",
    alternativesDescription: "Benzer kategorilerdeki araçları açarak daha dengeli karar verebilirsiniz.",
    trustUsersLabel: "10.000+ kullanıcı",
    trustUpdatedLabel: "Her hafta güncellenir",
    middleCtaTitle: "Karar vermeden önce aracı kendin test et",
    middleCtaDescription: "Kısa bir deneme, bu aracın iş akışınıza uyup uymadığını birkaç dakikada gösterebilir.",
    bottomCtaEyebrow: "Son adım",
    bottomCtaTitle: "Hazırsan aracı şimdi aç",
    bottomCtaDescription: "Artıları, eksileri ve uygun kullanım sinyallerini gördüyseniz, en doğru sonraki adım aracı doğrudan test etmektir.",
    primaryCta: { FREE: "Ücretsiz başla", FREEMIUM: "Ücretsiz başla", PAID: "Şimdi dene" },
    secondaryCta: "Tüm araçlara dön",
    bestForBySlug: {
      chatgpt: "İçerik, araştırma ve günlük işler",
      claude: "Uzun içerik ve detaylı anlatım",
      midjourney: "Görsel üretim ve konsept tasarımı",
      gemini: "Google merkezli verimlilik işleri",
      "notion-ai": "Belge, not ve ekip bilgisi",
      runway: "AI video üretimi ve kreatif işler"
    }
  },
  en: {
    breadcrumbsHome: "Home",
    toolsLabel: "Tools",
    quickInfoTitle: "Quick info",
    bestForLabel: "Best fit",
    pricingLabel: "Pricing",
    categoryLabel: "Category",
    overviewTitle: "What is this tool?",
    overviewDescription: "Get a short overview of what the tool does and where it fits best.",
    featuresTitle: "Key features",
    featuresDescription: "Scan the main capabilities before deciding whether to test the tool.",
    whyChooseTitle: "Why consider it?",
    whyChooseDescription: "See where this tool may make the most sense for your workflow.",
    prosTitle: "Pros",
    consTitle: "Cons",
    pricingTitle: "Pricing",
    pricingDescription: "Understand whether you can start free and when a paid plan may become necessary.",
    pricingNotes: {
      FREE: "You can start for free, which makes first testing easier.",
      FREEMIUM: "You can start free and upgrade only when you need more.",
      PAID: "The main value may appear on a paid plan, especially for recurring use."
    },
    whoShouldUseTitle: "Who should use it?",
    whoShouldUseDescription: "These user profiles are more likely to get value from this tool.",
    whoShouldAvoidTitle: "Who should avoid it?",
    whoShouldAvoidDescription: "If the points below match your needs, alternatives may be a better next step.",
    alternativesTitle: "Alternatives",
    alternativesDescription: "Open similar tools and compare before making a final decision.",
    trustUsersLabel: "10,000+ users",
    trustUpdatedLabel: "Updated weekly",
    middleCtaTitle: "Test the tool before you decide",
    middleCtaDescription: "A short hands-on test is often the fastest way to see whether the tool fits your workflow.",
    bottomCtaEyebrow: "Final step",
    bottomCtaTitle: "Open the tool when you are ready",
    bottomCtaDescription: "If the strengths, weaknesses, and audience fit make sense for you, testing the tool directly is the best next step.",
    primaryCta: { FREE: "Start free", FREEMIUM: "Start free", PAID: "Try now" },
    secondaryCta: "Back to all tools",
    bestForBySlug: {
      chatgpt: "Content, research, and daily tasks",
      claude: "Long-form content and detailed explanation",
      midjourney: "Image generation and concept design",
      gemini: "Google-centered productivity",
      "notion-ai": "Docs, notes, and team knowledge",
      runway: "AI video creation and creative workflows"
    }
  }
};

const useCaseLabels: LocalizedLabelMap = {
  tr: {
    content: "İçerik üreticileri",
    business: "İşletmeler",
    students: "Öğrenciler",
    research: "Araştırma odaklı kullanıcılar",
    creators: "Kreatif kullanıcılar",
    freelancers: "Freelancer'lar"
  },
  en: {
    content: "Content creators",
    business: "Businesses",
    students: "Students",
    research: "Research-focused users",
    creators: "Creative users",
    freelancers: "Freelancers"
  }
};

const useCaseDescriptions: LocalizedLabelMap = {
  tr: {
    content: "Daha hızlı taslak, içerik planı ve üretim akışı kurmak isteyen kullanıcılar.",
    business: "Daha düzenli ekip içi üretkenlik ve bilgi işleri yürütmek isteyen ekipler.",
    students: "Araştırma, özetleme ve öğrenme süreçlerinde destek arayan kullanıcılar.",
    research: "Detaylı açıklama ve bilgi toplama süreçlerini hızlandırmak isteyen kullanıcılar.",
    creators: "Görsel, video veya yaratıcı çıktı üreten kullanıcılar.",
    freelancers: "Müşteri işi, teklif, teslim ve üretim sürecini hızlandırmak isteyen profesyoneller."
  },
  en: {
    content: "Users who want faster drafting, planning, and content production.",
    business: "Teams looking for more organized internal productivity and knowledge work.",
    students: "Users who want help with research, summarization, and learning workflows.",
    research: "Users who want to speed up detailed explanation and information gathering.",
    creators: "Users producing images, video, or creative output.",
    freelancers: "Professionals who want to speed up client work, proposals, and delivery."
  }
};

function getPrimaryCtaLabel(locale: Locale, pricing: PricingTier) {
  return copy[locale].primaryCta[pricing];
}

function getBestFor(locale: Locale, slug: string) {
  return copy[locale].bestForBySlug[slug] ?? copy[locale].bestForBySlug.chatgpt;
}

function getWhyChoose(tool: LocalizedTool): string[] {
  return [tool.shortDescription, ...tool.features.slice(0, 2)];
}

function getWhoShouldUse(locale: Locale, tool: LocalizedTool) {
  return tool.useCaseSlugs.slice(0, 3).map((slug) => ({
    title: useCaseLabels[locale][slug] ?? slug,
    description: useCaseDescriptions[locale][slug] ?? tool.shortDescription
  }));
}

function getWhoShouldAvoid(locale: Locale, tool: LocalizedTool) {
  const avoid: string[] = [];

  if (tool.pricing === "PAID") {
    avoid.push(locale === "tr" ? "Ücretsiz veya çok düşük bütçeyle başlamak isteyen kullanıcılar." : "Users who need a free or very low-cost starting point.");
  }

  if (tool.toolCategorySlugs.includes("image") || tool.toolCategorySlugs.includes("video")) {
    avoid.push(locale === "tr" ? "Metin ve araştırma odaklı çalışan kullanıcılar." : "Users focused mostly on text and research work.");
  }

  if (tool.toolCategorySlugs.includes("writing")) {
    avoid.push(locale === "tr" ? "Görsel veya video üretimini ana öncelik yapan kullanıcılar." : "Users whose main priority is image or video creation.");
  }

  if (tool.toolCategorySlugs.includes("productivity")) {
    avoid.push(locale === "tr" ? "Bağımsız, genel amaçlı bir AI yerine sadece çalışma alanı içi çözüm istemeyen kullanıcılar." : "Users who want a broader AI assistant rather than a workflow-embedded tool.");
  }

  return avoid.slice(0, 3);
}

export function generateStaticParams() {
  return locales.flatMap((locale) => tools.map((tool) => ({ locale, slug: tool.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const tool = getLocalizedToolBySlug(locale as Locale, slug);

  if (!tool) {
    return {};
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `/${locale}/tools/${slug}`,
      languages: buildAlternates(`/tools/${slug}`)
    }
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const dictionary = copy[safeLocale];
  const content = getCatalogContent(safeLocale);
  const tool = getLocalizedToolBySlug(safeLocale, slug);

  if (!tool) {
    notFound();
  }

  const primaryCtaLabel = getPrimaryCtaLabel(safeLocale, tool.pricing);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const categoryNames = tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item);
  const relatedTools = getRelatedTools(safeLocale, tool.slug, 3);
  const relatedArticles = getRelatedArticlesByTool(safeLocale, tool.slug, 3);
  const blogCopy = getBlogCopy(safeLocale);
  const bestFor = getBestFor(safeLocale, tool.slug);
  const whyChoose = getWhyChoose(tool);
  const whoShouldUse = getWhoShouldUse(safeLocale, tool);
  const whoShouldAvoid = getWhoShouldAvoid(safeLocale, tool);
  const pricingValue = formatPricing(tool.pricing, safeLocale);
  const supportText = safeLocale === "tr" ? "Hızlı başlangıç • Net fiyat bilgisi" : "Fast start • Clear pricing signal";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 pb-28 sm:px-6 lg:px-8 lg:py-14 lg:pb-14">
      <Breadcrumb items={[{ label: dictionary.breadcrumbsHome, href: `/${safeLocale}` }, { label: dictionary.toolsLabel, href: `/${safeLocale}/tools` }, { label: tool.name }]} />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.86),rgba(17,24,39,0.9),rgba(11,15,25,0.96))] p-8 shadow-[0_24px_80px_-40px_rgba(34,211,238,0.18)] md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{pricingValue}</Badge>
            {categoryNames.slice(0, 2).map((category) => <Badge key={category}>{category}</Badge>)}
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">{tool.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{tool.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200">
              <span aria-hidden="true">★</span>
              <span>{tool.rating.toFixed(1)}/5</span>
            </div>
            <p className="text-sm font-medium text-slate-400">{dictionary.bestForLabel}: {bestFor}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">★ {tool.rating.toFixed(1)}/5</div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">{dictionary.trustUsersLabel}</div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100">{dictionary.trustUpdatedLabel}</div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-7 py-4 text-base font-semibold text-white shadow-[0_22px_60px_-24px_rgba(34,211,238,0.45)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_70px_-24px_rgba(56,189,248,0.52)]">{primaryCtaLabel}</a>
            <Link href={`/${safeLocale}/tools`} className="inline-flex items-center justify-center rounded-2xl border border-white/12 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-300">{dictionary.secondaryCta}</Link>
          </div>
        </div>

        <div className="grid gap-6">
          <aside className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-[0_20px_70px_-40px_rgba(34,211,238,0.15)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{dictionary.quickInfoTitle}</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{dictionary.bestForLabel}</p><p className="mt-2 text-sm font-semibold text-slate-100">{bestFor}</p></div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{dictionary.pricingLabel}</p><p className="mt-2 text-sm font-semibold text-slate-100">{pricingValue}</p></div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{dictionary.categoryLabel}</p><p className="mt-2 text-sm font-semibold text-slate-100">{categoryNames.join(" • ")}</p></div>
            </div>
          </aside>

          <FloatingAffiliateBar toolName={tool.name} pricingValue={pricingValue} ctaLabel={primaryCtaLabel} websiteUrl={tool.websiteUrl} supportText={supportText} eyebrowLabel={safeLocale === "tr" ? "Hızlı erişim" : "Quick access"} />
        </div>
      </section>

      <InfoSection title={dictionary.overviewTitle} description={dictionary.overviewDescription}>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">{tool.longDescription}</div>
      </InfoSection>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <InfoSection title={dictionary.whyChooseTitle} description={dictionary.whyChooseDescription}>
          <ul className="space-y-3">{whyChoose.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300" /><span>{item}</span></li>)}</ul>
        </InfoSection>
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] p-6 text-white shadow-[0_24px_80px_-44px_rgba(34,211,238,0.2)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300/90">CTA</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">{dictionary.middleCtaTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{dictionary.middleCtaDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400"><span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">★ {tool.rating.toFixed(1)}/5</span><span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{dictionary.trustUsersLabel}</span><span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{dictionary.trustUpdatedLabel}</span></div>
          <div className="mt-6 flex flex-wrap gap-3"><a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]">{primaryCtaLabel}</a><Link href={`/${safeLocale}/tools`} className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:text-cyan-300">{dictionary.secondaryCta}</Link></div>
        </div>
      </div>

      <InfoSection title={dictionary.featuresTitle} description={dictionary.featuresDescription}>
        <ul className="grid gap-4 md:grid-cols-2">{tool.features.map((feature) => <li key={feature} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300"><div className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300" /><span>{feature}</span></div></li>)}</ul>
      </InfoSection>

      <section className="grid gap-6 lg:grid-cols-2"><ProsConsCard title={dictionary.prosTitle} items={tool.pros} tone="positive" /><ProsConsCard title={dictionary.consTitle} items={tool.cons} tone="negative" /></section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <InfoSection title={dictionary.pricingTitle} description={dictionary.pricingDescription}>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"><div className="flex flex-wrap items-center gap-3"><Badge variant="accent">{pricingValue}</Badge><p className="text-sm font-semibold text-slate-100">{tool.name}</p></div><p className="mt-4 text-sm leading-7 text-slate-300">{dictionary.pricingNotes[tool.pricing]}</p><a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]">{primaryCtaLabel}</a></div>
        </InfoSection>
        <InfoSection title={dictionary.whoShouldUseTitle} description={dictionary.whoShouldUseDescription}>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{whoShouldUse.map((item) => <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]"><p className="text-sm font-semibold text-slate-100">{item.title}</p><p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p></div>)}</div>
        </InfoSection>
      </div>

      <InfoSection title={dictionary.whoShouldAvoidTitle} description={dictionary.whoShouldAvoidDescription}>
        <ul className="grid gap-4 md:grid-cols-2">{whoShouldAvoid.map((item) => <li key={item} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300"><div className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-rose-400" /><span>{item}</span></div></li>)}</ul>
      </InfoSection>

      <InfoSection title={dictionary.alternativesTitle} description={dictionary.alternativesDescription}><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{relatedTools.map((item) => <ToolCard key={item.slug} locale={safeLocale} tool={item} categoryNames={item.categorySlugs.map((slugItem) => categoryNamesMap.get(slugItem) ?? slugItem)} pricingLabel={formatPricing(item.pricing, safeLocale)} detailLabel={content.common.viewDetailsLabel} />)}</div></InfoSection>

      {relatedArticles.length ? <InfoSection title={blogCopy.toolPageRelatedTitle} description={blogCopy.toolPageRelatedDescription}><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{relatedArticles.map((article) => <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={blogCopy.readMoreLabel} />)}</div></InfoSection> : null}

      <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 text-white shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/85">{dictionary.bottomCtaEyebrow}</p><h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{dictionary.bottomCtaTitle}</h2><p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{dictionary.bottomCtaDescription}</p></div><div className="flex flex-wrap gap-3"><a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-7 py-4 text-base font-semibold text-white shadow-[0_22px_60px_-24px_rgba(34,211,238,0.45)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_28px_70px_-24px_rgba(56,189,248,0.52)]">{primaryCtaLabel}</a><Link href={`/${safeLocale}/tools`} className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:border-cyan-400/30 hover:text-cyan-300">{dictionary.secondaryCta}</Link></div></div></section>
    </div>
  );
}
```

---

## FILE: src\app\[locale]\tools\page.tsx

`$ext
import type { Metadata } from "next";

import { CategoryHero } from "@/components/catalog/category-hero";
import { ToolsExplorer } from "@/components/catalog/tools-explorer";
import { toolCategoryOptions, useCaseOptions } from "@/data/tool-taxonomy";
import {
  formatPricing,
  getCatalogContent,
  getCategoryNamesMap,
  getLocalizedTools
} from "@/lib/catalog";
import { buildAlternates, isValidLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const content = getCatalogContent(locale as Locale);

  return {
    title: content.toolsIndex.title,
    description: content.toolsIndex.description,
    alternates: {
      canonical: `/${locale}/tools`,
      languages: buildAlternates("/tools")
    }
  };
}

export default async function ToolsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = locale as Locale;
  const content = getCatalogContent(safeLocale);
  const toolItems = getLocalizedTools(safeLocale);
  const categoryNames = getCategoryNamesMap(safeLocale);
  const toolCategoryLabelMap = new Map<string, string>(
    toolCategoryOptions[safeLocale].map((item): [string, string] => [item.slug, item.label])
  );
  const useCaseLabelMap = new Map<string, string>(
    useCaseOptions[safeLocale].map((item): [string, string] => [item.slug, item.label])
  );

  const explorerTools = toolItems.map((tool) => {
    const siteCategoryNames = tool.categorySlugs.map((item) => categoryNames.get(item) ?? item);
    const toolCategoryLabels = tool.toolCategorySlugs.map(
      (item) => toolCategoryLabelMap.get(item) ?? item
    );
    const useCaseLabels = tool.useCaseSlugs.map((item) => useCaseLabelMap.get(item) ?? item);

    return {
      ...tool,
      pricingLabel: formatPricing(tool.pricing, safeLocale),
      toolCategoryLabels,
      useCaseLabels,
      searchKeywords: [
        tool.name,
        tool.shortDescription,
        ...siteCategoryNames,
        ...toolCategoryLabels,
        ...useCaseLabels,
        formatPricing(tool.pricing, safeLocale)
      ]
    };
  });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <CategoryHero
        eyebrow={content.toolsIndex.eyebrow}
        title={content.toolsIndex.title}
        description={content.toolsIndex.description}
        supportText={content.toolsIndex.filterDescription}
        ctaLabel={content.common.categoriesLabel}
        ctaHref={`/${safeLocale}/categories`}
      />

      <ToolsExplorer
        locale={safeLocale}
        tools={explorerTools}
        toolCategoryOptions={[...toolCategoryOptions[safeLocale]]}
        useCaseOptions={[...useCaseOptions[safeLocale]]}
        detailLabel={content.common.viewDetailsLabel}
        copy={{
          filterTitle: content.toolsIndex.filterTitle,
          filterDescription: content.toolsIndex.filterDescription,
          searchLabel: content.toolsIndex.searchLabel,
          searchPlaceholder: content.toolsIndex.searchPlaceholder,
          searchHelp: content.toolsIndex.searchHelp,
          toolCategoryLabel: content.toolsIndex.toolCategoryLabel,
          useCaseLabel: content.toolsIndex.useCaseLabel,
          pricingFilterLabel: content.toolsIndex.pricingFilterLabel,
          allToolCategoriesLabel: content.toolsIndex.allToolCategoriesLabel,
          allUseCasesLabel: content.toolsIndex.allUseCasesLabel,
          allPricingLabel: content.toolsIndex.allPricingLabel,
          resetFiltersLabel: content.toolsIndex.resetFiltersLabel,
          resultsLabel: content.toolsIndex.resultsLabel,
          emptyTitle: content.toolsIndex.emptyTitle,
          emptyDescription: content.toolsIndex.emptyDescription,
          bestForLabel: content.toolsIndex.bestForLabel
        }}
      />
    </div>
  );
}
```

---

## FILE: src\app\globals.css

`$ext
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  --tn-gradient-primary: linear-gradient(90deg, #a855f7 0%, #6366f1 34%, #3b82f6 68%, #22d3ee 100%);
  --tn-surface:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.018)),
    linear-gradient(145deg, rgba(16, 22, 38, 0.96), rgba(9, 13, 24, 0.99));
  --tn-surface-strong:
    linear-gradient(180deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.025)),
    linear-gradient(145deg, rgba(24, 34, 60, 0.97), rgba(11, 17, 31, 0.995));
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 0%, rgba(124, 58, 237, 0.24), transparent 24%),
    radial-gradient(circle at 86% 8%, rgba(59, 130, 246, 0.18), transparent 28%),
    radial-gradient(circle at 55% 18%, rgba(34, 211, 238, 0.1), transparent 18%),
    linear-gradient(180deg, #0b0f19 0%, #0f1728 46%, #0a0f17 100%);
  color: #e5eefc;
  font-feature-settings: "ss01" 1, "cv11" 1;
}

body::before,
body::after {
  content: "";
  position: fixed;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(88px);
}

body::before {
  top: 3rem;
  left: -5rem;
  height: 20rem;
  width: 20rem;
  background: rgba(168, 85, 247, 0.12);
}

body::after {
  top: 22rem;
  right: -4rem;
  height: 22rem;
  width: 22rem;
  background: rgba(34, 211, 238, 0.09);
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

::selection {
  background: rgba(124, 58, 237, 0.3);
}

.home-card-glow {
  position: relative;
}

.home-card-glow::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)),
    radial-gradient(circle at top, rgba(56, 189, 248, 0.09), transparent 52%),
    radial-gradient(circle at left top, rgba(168, 85, 247, 0.08), transparent 36%);
  pointer-events: none;
  opacity: 1;
}

.premium-surface {
  background: var(--tn-surface);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 26px 80px -42px rgba(14, 165, 233, 0.26);
}

.premium-outline {
  position: relative;
}

.premium-outline::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.24), rgba(56, 189, 248, 0.14), rgba(34, 211, 238, 0.08));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.9;
}

.ui-card {
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: var(--tn-surface);
  border-radius: 28px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.055),
    0 28px 78px -44px rgba(14, 165, 233, 0.16);
  backdrop-filter: blur(20px);
}

.ui-card-strong {
  border: 1px solid rgba(255, 255, 255, 0.11);
  background: var(--tn-surface-strong);
  border-radius: 28px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 36px 98px -44px rgba(59, 130, 246, 0.28);
  backdrop-filter: blur(22px);
}

.ui-card-hover {
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.ui-card-hover:hover {
  border-color: rgba(96, 165, 250, 0.24);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 36px 96px -42px rgba(59, 130, 246, 0.22),
    0 0 0 1px rgba(34, 211, 238, 0.05);
}

.ui-inner-panel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02)),
    rgba(255, 255, 255, 0.03);
  border-radius: 22px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.ui-gradient-text {
  background-image: var(--tn-gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.ui-nav-shell {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.025)),
    rgba(255, 255, 255, 0.035);
  border-radius: 9999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.section-tint-violet,
.section-tint-cyan {
  position: relative;
  isolation: isolate;
}

.section-tint-violet::before,
.section-tint-cyan::before {
  content: "";
  position: absolute;
  inset: -0.75rem -0.25rem;
  z-index: -1;
  border-radius: 36px;
  pointer-events: none;
}

.section-tint-violet::before {
  background: radial-gradient(circle at top left, rgba(124, 58, 237, 0.12), transparent 60%);
}

.section-tint-cyan::before {
  background: radial-gradient(circle at top right, rgba(34, 211, 238, 0.1), transparent 58%);
}

.balance-text {
  text-wrap: balance;
}

.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## FILE: src\app\layout.tsx

`$ext
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "ToolNova",
    template: "%s | ToolNova"
  },
  description: "AI araçları ve SaaS rehber sitesi altyapısı.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

---

## FILE: src\app\not-found.tsx

`$ext
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-10 text-center shadow-card">
        <h1 className="text-3xl font-bold text-slate-100">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">
          The page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
```

---

## FILE: src\app\page.tsx

`$ext
import { redirect } from "next/navigation";

import { defaultLocale } from "@/i18n/config";

export default function IndexPage() {
  redirect(`/${defaultLocale}`);
}
```

---

## FILE: src\components\blog\article-content.tsx

`$ext
import type { BlogSection } from "@/types/blog";

type ArticleContentProps = {
  sections: BlogSection[];
};

export function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-50 md:text-[2rem]">{section.title}</h2>

          <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {section.bullets?.length ? (
            <ul className="mt-6 grid gap-3">
              {section.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-slate-200"
                >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.comparison ? (
            <div className="mt-6 rounded-[24px] border border-cyan-400/16 bg-cyan-400/[0.05] p-5">
              <h3 className="text-lg font-semibold text-slate-50">{section.comparison.title}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {section.comparison.items.map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                    <p className="mt-3 text-sm font-semibold text-slate-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {section.subSections?.length ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {section.subSections.map((subSection) => (
                <div key={subSection.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-lg font-semibold text-slate-50">{subSection.title}</h3>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                    {subSection.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {subSection.bullets?.length ? (
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-200">
                      {subSection.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
```

---

## FILE: src\components\blog\article-cta-block.tsx

`$ext
import { PremiumButton } from "@/components/ui/premium-button";

type ArticleCtaBlockProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function ArticleCtaBlock({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: ArticleCtaBlockProps) {
  return (
    <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PremiumButton href={primaryHref}>{primaryLabel}</PremiumButton>
          <PremiumButton href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
```

---

## FILE: src\components\blog\blog-card.tsx

`$ext
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { Locale } from "@/i18n/config";
import type { LocalizedBlogArticle } from "@/types/blog";

type BlogCardProps = {
  locale: Locale;
  article: LocalizedBlogArticle;
  ctaLabel: string;
};

export function BlogCard({ locale, article, ctaLabel }: BlogCardProps) {
  const relatedToolsLabel = locale === "tr" ? "bağlantılı araç" : "related tools";

  return (
    <GlassPanel className="group flex h-full flex-col overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(11,15,25,0.98))] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_24px_80px_-42px_rgba(34,211,238,0.22)]">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="ghost" className="max-w-[70%] justify-start text-cyan-200">
          {article.categoryLabel}
        </Badge>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">SEO</span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50 transition group-hover:text-cyan-200">
          <Link href={`/${locale}/blog/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">{article.excerpt}</p>

        <div className="mt-6 flex items-center justify-between gap-4 pt-4 text-sm">
          <span className="truncate text-slate-500">
            {article.relatedToolSlugs.length} {relatedToolsLabel}
          </span>
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 font-semibold text-cyan-200 transition hover:border-cyan-300/30 hover:bg-cyan-400/15"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </GlassPanel>
  );
}
```

---

## FILE: src\components\catalog\breadcrumb.tsx

`$ext
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-cyan-300">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-slate-100" : undefined}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

---

## FILE: src\components\catalog\category-card.tsx

`$ext
import Link from "next/link";

import type { LocalizedCategory } from "@/types/catalog";

import { Badge } from "@/components/ui/badge";

type CategoryCardProps = {
  locale: string;
  category: LocalizedCategory;
  linkLabel: string;
};

export function CategoryCard({ locale, category, linkLabel }: CategoryCardProps) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.88))] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_24px_70px_-34px_rgba(34,211,238,0.18)]">
      <Badge>{category.slug}</Badge>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-100">{category.name}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{category.description}</p>
      <p className="mt-4 text-sm leading-7 text-slate-400">{category.supportText}</p>
      <Link
        href={`/${locale}/categories/${category.slug}`}
        className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
      >
        {linkLabel}
      </Link>
    </article>
  );
}
```

---

## FILE: src\components\catalog\category-hero.tsx

`$ext
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type CategoryHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  supportText: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CategoryHero({
  eyebrow,
  title,
  description,
  supportText,
  ctaLabel,
  ctaHref
}: CategoryHeroProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.84),rgba(11,15,25,0.94))] p-8 shadow-card md:p-10">
      <Badge variant="accent">{eyebrow}</Badge>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm leading-7 text-slate-300">{supportText}</p>
          {ctaLabel && ctaHref ? (
            <Link
              href={ctaHref}
              className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
```

---

## FILE: src\components\catalog\floating-affiliate-bar.tsx

`$ext
import { Badge } from "@/components/ui/badge";

type FloatingAffiliateBarProps = {
  toolName: string;
  pricingValue: string;
  ctaLabel: string;
  websiteUrl: string;
  supportText: string;
  eyebrowLabel?: string;
};

export function FloatingAffiliateBar({
  toolName,
  pricingValue,
  ctaLabel,
  websiteUrl,
  supportText,
  eyebrowLabel = "Affiliate CTA"
}: FloatingAffiliateBarProps) {
  return (
    <>
      <aside className="hidden lg:block lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-[28px] border border-cyan-400/18 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(11,15,25,0.98))] p-5 shadow-[0_26px_80px_-42px_rgba(34,211,238,0.24)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{eyebrowLabel}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-50">{toolName}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{pricingValue}</Badge>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{supportText}</p>
          <a
            href={websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_72px_-22px_rgba(56,189,248,0.68)]"
          >
            {ctaLabel}
          </a>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 lg:hidden">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[24px] border border-cyan-400/18 bg-[#0b0f19]/92 p-3 shadow-[0_18px_60px_-24px_rgba(34,211,238,0.42)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-100">{toolName}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="accent" className="max-w-[120px]">{pricingValue}</Badge>
              </div>
              <p className="mt-1 truncate text-xs text-slate-400">{supportText}</p>
            </div>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:scale-[1.02]"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
```

---

## FILE: src\components\catalog\info-section.tsx

`$ext
import type { ReactNode } from "react";

type InfoSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function InfoSection({ title, description, children }: InfoSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-50">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-slate-300">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
```

---

## FILE: src\components\catalog\pros-cons-card.tsx

`$ext
type ProsConsCardProps = {
  title: string;
  items: string[];
  tone: "positive" | "negative";
};

export function ProsConsCard({ title, items, tone }: ProsConsCardProps) {
  const toneStyles = {
    positive: {
      dot: "bg-emerald-400",
      card: "border-emerald-400/15 bg-emerald-400/8"
    },
    negative: {
      dot: "bg-rose-400",
      card: "border-rose-400/15 bg-rose-400/8"
    }
  } as const;

  return (
    <div className={`rounded-[28px] border p-6 ${toneStyles[tone].card}`}>
      <h3 className="text-xl font-bold tracking-tight text-slate-50">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
            <span className={`mt-2 h-2.5 w-2.5 rounded-full ${toneStyles[tone].dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## FILE: src\components\catalog\tool-card.tsx

`$ext
import Link from "next/link";

import type { LocalizedTool } from "@/types/catalog";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type ToolCardProps = {
  locale: string;
  tool: Pick<LocalizedTool, "slug" | "name" | "shortDescription" | "rating">;
  categoryNames: string[];
  pricingLabel: string;
  detailLabel: string;
  bestForLabel?: string;
  useCaseLabel?: string;
};

export function ToolCard({
  locale,
  tool,
  categoryNames,
  pricingLabel,
  detailLabel,
  bestForLabel,
  useCaseLabel
}: ToolCardProps) {
  return (
    <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden p-6">
      <div className="flex min-h-[38px] items-start justify-between gap-3 overflow-hidden">
        <div className="flex min-w-0 flex-wrap gap-2 overflow-hidden">
          {categoryNames.slice(0, 1).map((category) => (
            <Badge key={category} variant="ghost" className="max-w-[110px] justify-center">{category}</Badge>
          ))}
        </div>
        <Badge variant="muted" className="max-w-[110px] shrink-0 justify-center">{pricingLabel}</Badge>
      </div>

      <h2 className="clamp-2 mt-5 min-h-[3.25rem] text-[1.45rem] font-bold leading-tight tracking-[-0.03em] text-slate-100">{tool.name}</h2>
      <p className="clamp-3 mt-3 text-sm leading-7 text-slate-300/88">{tool.shortDescription}</p>

      {bestForLabel && useCaseLabel ? (
        <div className="ui-inner-panel mt-4 min-w-0 px-4 py-3 text-sm text-slate-300/88">
          <span className="font-semibold text-slate-100">{bestForLabel}:</span> {useCaseLabel}
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-100">{tool.rating.toFixed(1)}/5</p>
        <Link href={`/${locale}/tools/${tool.slug}`} className="inline-flex min-h-[38px] w-full items-center justify-center rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-200 transition duration-200 hover:bg-white/[0.05] hover:text-white sm:w-auto">
          {detailLabel}
        </Link>
      </div>
    </GlassPanel>
  );
}
```

---

## FILE: src\components\catalog\tool-meta-panel.tsx

`$ext
import { Badge } from "@/components/ui/badge";

type ToolMetaPanelProps = {
  pricingLabel: string;
  pricingValue: string;
  ratingLabel: string;
  ratingValue: string;
  categoryTagsLabel: string;
  categories: string[];
};

export function ToolMetaPanel({
  pricingLabel,
  pricingValue,
  ratingLabel,
  ratingValue,
  categoryTagsLabel,
  categories
}: ToolMetaPanelProps) {
  return (
    <aside className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{pricingLabel}</p>
          <div className="mt-3">
            <Badge variant="accent">{pricingValue}</Badge>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{ratingLabel}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-100">{ratingValue}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{categoryTagsLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
```

---

## FILE: src\components\catalog\tools-explorer.tsx

`$ext
"use client";

import { useDeferredValue, useState } from "react";

import { ToolCard } from "@/components/catalog/tool-card";
import type { Locale } from "@/i18n/config";
import type { PricingTier } from "@/types/catalog";

type FilterOption = {
  slug: string;
  label: string;
};

type ExplorerTool = {
  slug: string;
  name: string;
  shortDescription: string;
  pricing: PricingTier;
  pricingLabel: string;
  rating: number;
  featured: boolean;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  toolCategoryLabels: string[];
  useCaseSlugs: string[];
  useCaseLabels: string[];
  searchKeywords: string[];
};

type ToolsExplorerCopy = {
  filterTitle: string;
  filterDescription: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchHelp: string;
  toolCategoryLabel: string;
  useCaseLabel: string;
  pricingFilterLabel: string;
  allToolCategoriesLabel: string;
  allUseCasesLabel: string;
  allPricingLabel: string;
  resetFiltersLabel: string;
  resultsLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  bestForLabel: string;
};

type ToolsExplorerProps = {
  locale: Locale;
  tools: ExplorerTool[];
  toolCategoryOptions: FilterOption[];
  useCaseOptions: FilterOption[];
  detailLabel: string;
  copy: ToolsExplorerCopy;
};

function FilterChip({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2 text-sm font-semibold transition duration-200",
        active
          ? "border-cyan-400/40 bg-cyan-400/12 text-cyan-200 shadow-[0_14px_34px_-22px_rgba(34,211,238,0.5)]"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/20 hover:text-cyan-200"
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export function ToolsExplorer({
  locale,
  tools,
  toolCategoryOptions,
  useCaseOptions,
  detailLabel,
  copy
}: ToolsExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeToolCategory, setActiveToolCategory] = useState("all");
  const [activePricing, setActivePricing] = useState<"all" | PricingTier>("all");
  const [activeUseCase, setActiveUseCase] = useState("all");
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");

  const filteredTools = tools.filter((tool) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      tool.searchKeywords
        .join(" ")
        .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US")
        .includes(normalizedQuery);

    const matchesToolCategory =
      activeToolCategory === "all" || tool.toolCategorySlugs.includes(activeToolCategory);

    const matchesPricing = activePricing === "all" || tool.pricing === activePricing;

    const matchesUseCase = activeUseCase === "all" || tool.useCaseSlugs.includes(activeUseCase);

    return matchesQuery && matchesToolCategory && matchesPricing && matchesUseCase;
  });

  const hasActiveFilters =
    query.length > 0 || activeToolCategory !== "all" || activePricing !== "all" || activeUseCase !== "all";

  return (
    <>
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.94),rgba(15,23,42,0.92))] p-6 shadow-card md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">{copy.filterTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{copy.filterDescription}</p>

            <label className="mt-6 block text-sm font-semibold text-slate-200" htmlFor="tool-search">
              {copy.searchLabel}
            </label>
            <div className="mt-3 rounded-[22px] border border-white/10 bg-white/[0.04] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <input
                id="tool-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className="h-12 w-full rounded-[18px] border border-transparent bg-transparent px-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/30 focus:bg-white/[0.03]"
              />
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-400">{copy.searchHelp}</p>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <p className="text-sm font-semibold text-slate-100">
                {filteredTools.length} {copy.resultsLabel}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveToolCategory("all");
                    setActivePricing("all");
                    setActiveUseCase("all");
                  }}
                  className="inline-flex items-center rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  {copy.resetFiltersLabel}
                </button>
              ) : null}
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.toolCategoryLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FilterChip
                    label={copy.allToolCategoriesLabel}
                    active={activeToolCategory === "all"}
                    onClick={() => setActiveToolCategory("all")}
                  />
                  {toolCategoryOptions.map((option) => (
                    <FilterChip
                      key={option.slug}
                      label={option.label}
                      active={activeToolCategory === option.slug}
                      onClick={() => setActiveToolCategory(option.slug)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.pricingFilterLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FilterChip
                    label={copy.allPricingLabel}
                    active={activePricing === "all"}
                    onClick={() => setActivePricing("all")}
                  />
                  <FilterChip label={locale === "tr" ? "Ücretsiz" : "Free"} active={activePricing === "FREE"} onClick={() => setActivePricing("FREE")} />
                  <FilterChip
                    label={locale === "tr" ? "Kısmen ücretsiz" : "Freemium"}
                    active={activePricing === "FREEMIUM"}
                    onClick={() => setActivePricing("FREEMIUM")}
                  />
                  <FilterChip label={locale === "tr" ? "Ücretli" : "Paid"} active={activePricing === "PAID"} onClick={() => setActivePricing("PAID")} />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.useCaseLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FilterChip
                    label={copy.allUseCasesLabel}
                    active={activeUseCase === "all"}
                    onClick={() => setActiveUseCase("all")}
                  />
                  {useCaseOptions.map((option) => (
                    <FilterChip
                      key={option.slug}
                      label={option.label}
                      active={activeUseCase === option.slug}
                      onClick={() => setActiveUseCase(option.slug)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {filteredTools.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              locale={locale}
              tool={tool}
              categoryNames={tool.toolCategoryLabels}
              pricingLabel={tool.pricingLabel}
              detailLabel={detailLabel}
              bestForLabel={copy.bestForLabel}
              useCaseLabel={tool.useCaseLabels[0]}
            />
          ))}
        </section>
      ) : (
        <section className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-10 text-center shadow-card">
          <h3 className="text-xl font-bold tracking-tight text-slate-100">{copy.emptyTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">{copy.emptyDescription}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveToolCategory("all");
              setActivePricing("all");
              setActiveUseCase("all");
            }}
            className="mt-6 inline-flex items-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            {copy.resetFiltersLabel}
          </button>
        </section>
      )}
    </>
  );
}
```

---

## FILE: src\components\comparison\comparison-breakdown-table.tsx

`$ext
import { Badge } from "@/components/ui/badge";

import type { ComparisonRow } from "@/data/comparisons";

type ComparisonBreakdownTableProps = {
  locale: "tr" | "en";
  title: string;
  description: string;
  columns: {
    label: string;
    left: string;
    right: string;
  };
  rows: ComparisonRow[];
};

function getWinnerStyle(winner?: ComparisonRow["winner"], side?: "left" | "right") {
  if (!winner || !side || winner === "tie") {
    return "text-slate-200";
  }

  return winner === side ? "text-cyan-200" : "text-slate-300";
}

export function ComparisonBreakdownTable({
  locale,
  title,
  description,
  columns,
  rows
}: ComparisonBreakdownTableProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{locale === "tr" ? "Karşılaştırma tablosu" : "Comparison table"}</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>

      <div className="mt-8 hidden overflow-hidden rounded-[24px] border border-white/10 lg:block">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/[0.04]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{columns.label}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.left}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.right}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.label} className="transition duration-300 hover:bg-white/[0.03]">
                <td className="px-6 py-5 text-sm font-semibold text-slate-100">{row.label}</td>
                <td className={`px-6 py-5 text-sm leading-7 ${getWinnerStyle(row.winner, "left")}`}>
                  {row.left}
                </td>
                <td className={`px-6 py-5 text-sm leading-7 ${getWinnerStyle(row.winner, "right")}`}>
                  {row.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 lg:hidden">
        {rows.map((row) => (
          <div key={row.label} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-100">{row.label}</p>
              {row.winner === "tie" ? <Badge>{locale === "tr" ? "Berabere" : "Tie"}</Badge> : null}
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.left}</p>
                <p className={`mt-2 text-sm leading-7 ${getWinnerStyle(row.winner, "left")}`}>{row.left}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.right}</p>
                <p className={`mt-2 text-sm leading-7 ${getWinnerStyle(row.winner, "right")}`}>{row.right}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## FILE: src\components\comparison\comparison-faq.tsx

`$ext
import type { ComparisonFaqItem } from "@/data/comparisons";

type ComparisonFaqProps = {
  title: string;
  description: string;
  items: ComparisonFaqItem[];
};

export function ComparisonFaq({ title, description, items }: ComparisonFaqProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">FAQ</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>

      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <article key={item.question} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-semibold tracking-tight text-slate-100">{item.question}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

---

## FILE: src\components\comparison\related-comparison-card.tsx

`$ext
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type RelatedComparisonCardProps = {
  locale: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  highlight: string;
};

export function RelatedComparisonCard({ locale, title, description, href, ctaLabel, highlight }: RelatedComparisonCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.88))] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_24px_70px_-34px_rgba(34,211,238,0.18)]">
      <Badge variant="ghost" className="w-fit border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
        {highlight}
      </Badge>
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-100">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{description}</p>
      <Link
        href={`/${locale}${href}`}
        className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
```

---

## FILE: src\components\content\static-page-shell.tsx

`$ext
import type { StaticPageContent } from "@/data/static-pages";

type StaticPageShellProps = {
  content: StaticPageContent;
};

export function StaticPageShell({ content }: StaticPageShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">ToolNova</p>
        <h1 className="mt-4 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          {content.description}
        </p>
        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 text-sm leading-8 text-slate-300 md:text-base">
          {content.intro}
        </div>
      </section>

      <div className="space-y-6">
        {content.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-50">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-8 text-slate-300 md:text-base">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="mt-5 space-y-3">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300 md:text-base">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
```

---

## FILE: src\components\home\category-card.tsx

`$ext
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { CategoryCard as CategoryCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type CategoryCardProps = {
  locale: string;
  category: CategoryCardType;
  linkLabel: string;
};

export function CategoryCard({ locale, category, linkLabel }: CategoryCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${category.href}`} className="group block h-full">
        <GlassPanel className="ui-card ui-card-hover home-card-glow flex h-full flex-col overflow-hidden p-6 md:p-7">
          <div className="flex min-h-[44px] items-start justify-between gap-3 overflow-hidden">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white">
              {category.icon}
            </div>
            <Badge variant="muted" className="max-w-[88px] shrink-0 justify-center text-[11px]">{category.metric}</Badge>
          </div>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{category.eyebrow}</p>
          <h3 className="clamp-2 mt-3 min-h-[3.15rem] text-[1.42rem] font-bold leading-tight tracking-[-0.03em] text-slate-50">{category.title}</h3>
          <p className="clamp-3 mt-4 flex-1 text-base leading-relaxed text-slate-300/84">{category.description}</p>
          <div className="mt-7 border-t border-white/10 pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition duration-200 group-hover:text-white">
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
```

---

## FILE: src\components\home\comparison-card.tsx

`$ext
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ComparisonCard as ComparisonCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type ComparisonCardProps = {
  locale: string;
  item: ComparisonCardType;
  linkLabel: string;
  featured?: boolean;
};

export function ComparisonCard({ locale, item, linkLabel, featured = false }: ComparisonCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.012 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${item.href}`} className="group block h-full">
        <GlassPanel className={`home-card-glow flex h-full flex-col overflow-hidden p-6 ${featured ? "ui-card-strong ui-card-hover" : "ui-card ui-card-hover"}`}>
          <div className="flex min-h-[40px] items-center justify-between gap-3 overflow-hidden">
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_-16px_rgba(59,130,246,0.42)]">
                {item.icon}
              </div>
              <p className="truncate text-sm font-medium text-slate-200">{item.eyebrow}</p>
            </div>
            {item.highlight ? <Badge variant={featured ? "accent" : "muted"} className="max-w-[90px] shrink-0 justify-center text-[11px]">{item.highlight}</Badge> : null}
          </div>

          <h3 className="clamp-2 mt-6 min-h-[3.1rem] text-[1.38rem] font-bold leading-tight tracking-[-0.03em] text-slate-50">{item.title}</h3>
          <p className="clamp-3 mt-4 flex-1 text-base leading-relaxed text-slate-300/84">{item.description}</p>

          <div className="mt-7 border-t border-white/10 pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition duration-200 group-hover:text-white">
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
```

---

## FILE: src\components\home\comparison-table.tsx

`$ext
import type { ToolCard } from "@/types/home";

type ComparisonTableProps = {
  tools: ToolCard[];
  title: string;
  description: string;
  eyebrow: string;
  columns: {
    tool: string;
    bestFor: string;
    price: string;
    outcome: string;
    rating: string;
    action: string;
  };
  actionLabel: string;
};

export function ComparisonTable({ tools, title, description, eyebrow, columns, actionLabel }: ComparisonTableProps) {
  return (
    <div className="ui-card-strong overflow-hidden p-5 md:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
        <h2 className="balance-text mt-4 text-[2rem] font-bold tracking-[-0.03em] text-slate-50 md:text-[2.4rem] md:leading-[1.08]">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300/88 md:text-[1.05rem] md:leading-8">{description}</p>
      </div>

      <div className="mt-10 hidden overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] md:block">
        <table className="min-w-full table-fixed divide-y divide-white/10">
          <thead className="bg-white/[0.04]">
            <tr>
              <th className="w-[24%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.tool}</th>
              <th className="w-[18%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.bestFor}</th>
              <th className="w-[14%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.price}</th>
              <th className="w-[22%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.outcome}</th>
              <th className="w-[10%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.rating}</th>
              <th className="w-[12%] px-5 py-4 text-right text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.action}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-transparent">
            {tools.map((tool) => (
              <tr key={tool.name} className="align-top transition duration-200 hover:bg-white/[0.04]">
                <td className="px-5 py-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-xs font-bold uppercase tracking-[0.14em] text-white">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-100">{tool.name}</p>
                      <p className="mt-1 truncate text-sm text-slate-500">{tool.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 text-sm leading-6 text-slate-300"><div className="min-w-0 break-words">{tool.bestFor}</div></td>
                <td className="px-5 py-5 text-sm font-semibold text-slate-100"><div className="min-w-0 break-words">{tool.pricing}</div></td>
                <td className="px-5 py-5 text-sm leading-6 text-slate-300"><div className="min-w-0 break-words">{tool.comparisonOutcome}</div></td>
                <td className="px-5 py-5 text-sm font-semibold text-slate-100 whitespace-nowrap">{tool.rating}</td>
                <td className="px-5 py-5 text-right">
                  <a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[38px] min-w-[92px] items-center justify-center rounded-xl bg-[var(--tn-gradient-primary)] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-105">
                    {actionLabel}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 md:hidden">
        {tools.map((tool) => (
          <div key={tool.name} className="ui-inner-panel min-w-0 p-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-xs font-bold uppercase tracking-[0.14em] text-white">
                {tool.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-100">{tool.name}</p>
                <p className="mt-1 truncate text-sm text-slate-500">{tool.category}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2.5 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">{columns.bestFor}:</span> {tool.bestFor}</p>
              <p><span className="font-semibold text-slate-100">{columns.price}:</span> {tool.pricing}</p>
              <p><span className="font-semibold text-slate-100">{columns.outcome}:</span> {tool.comparisonOutcome}</p>
              <p><span className="font-semibold text-slate-100">{columns.rating}:</span> {tool.rating}</p>
            </div>
            <div className="mt-5">
              <a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] w-full items-center justify-center rounded-xl bg-[var(--tn-gradient-primary)] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:brightness-105">
                {actionLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## FILE: src\components\home\conversion-list-card.tsx

`$ext
"use client";

import { motion } from "framer-motion";

import type { ConversionListItem } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";

type ConversionListCardProps = {
  locale: string;
  item: ConversionListItem;
};

export function ConversionListCard({ locale, item }: ConversionListCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full">
      <GlassPanel className="ui-card ui-card-hover home-card-glow flex h-full flex-col overflow-hidden p-6 md:p-7">
        <div className="flex min-h-[40px] items-center justify-between gap-3 overflow-hidden">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white">
            {item.icon}
          </div>
          <Badge variant="muted" className="max-w-[96px] shrink-0 justify-center text-[11px]">{item.badge}</Badge>
        </div>

        <div className="mt-6 min-h-[118px] min-w-0">
          <h3 className="clamp-2 min-h-[3.15rem] text-[1.42rem] font-bold leading-tight tracking-[-0.03em] text-slate-50">{item.title}</h3>
          <p className="clamp-3 mt-4 text-base leading-relaxed text-slate-300/84">{item.description}</p>
        </div>

        <div className="ui-inner-panel mt-5 min-w-0 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Kısa not</p>
          <p className="clamp-3 mt-2 text-[15px] leading-relaxed text-slate-200/86">{item.benefit}</p>
        </div>

        <div className="mt-auto pt-7">
          <PremiumButton href={`/${locale}${item.href}`} className="w-full text-sm">
            {item.ctaLabel}
          </PremiumButton>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
```

---

## FILE: src\components\home\guide-card.tsx

`$ext
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { GuideCard as GuideCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type GuideCardProps = {
  locale: string;
  item: GuideCardType;
  linkLabel: string;
};

export function GuideCard({ locale, item, linkLabel }: GuideCardProps) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.015 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${item.href}`} className="group block h-full">
        <GlassPanel className="home-card-glow flex h-full flex-col overflow-hidden rounded-[30px] border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.94),rgba(10,14,24,0.98))] p-6 shadow-[0_28px_90px_-42px_rgba(34,211,238,0.16)] transition duration-300 hover:border-cyan-400/24 hover:shadow-[0_34px_98px_-40px_rgba(56,189,248,0.24)] md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_-18px_rgba(59,130,246,0.48)]">
                {item.icon}
              </div>
              <Badge variant="ghost" className="min-w-[92px] justify-center text-[11px]">{item.tag}</Badge>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400/90">
              {item.readTime}
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-slate-50">{item.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-slate-300/88">{item.description}</p>

          <div className="mt-6 border-t border-white/10 pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition duration-300 group-hover:text-cyan-300">
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
```

---

## FILE: src\components\home\hero-section.tsx

`$ext
"use client";

import { motion } from "framer-motion";

import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { StatBadge } from "@/components/ui/stat-badge";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
};

export function HeroSection({ locale, content }: HeroSectionProps) {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] overflow-hidden">
        <motion.div
          className="absolute left-[2%] top-10 h-72 w-72 rounded-full bg-violet-500/28 blur-3xl"
          animate={{ opacity: [0.42, 0.82, 0.42], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[5%] top-0 h-80 w-80 rounded-full bg-sky-500/24 blur-3xl"
          animate={{ opacity: [0.34, 0.72, 0.34], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/14 blur-3xl" />
      </div>

      <GlassPanel className="relative overflow-hidden rounded-[36px] px-6 py-8 lg:px-10 lg:py-10">
        <div className="absolute inset-x-12 top-0 h-40 rounded-full bg-violet-500/16 blur-3xl" />
        <div className="absolute -right-24 top-10 h-56 w-56 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="absolute left-20 bottom-0 h-28 w-28 rounded-full bg-blue-500/12 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="ghost">{content.badge}</Badge>
            </motion.div>

            <motion.h1
              className="balance-text mt-6 max-w-4xl bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-extrabold tracking-[-0.05em] text-transparent sm:text-5xl lg:text-[4rem] lg:leading-[0.98]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-2xl text-base leading-8 text-slate-300/82 lg:text-[1.04rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <PremiumButton
                href={`/${locale}/tools`}
                className="px-6 py-3 text-sm shadow-[0_22px_52px_-20px_rgba(99,102,241,0.58),0_30px_84px_-30px_rgba(34,211,238,0.52)]"
              >
                {content.primaryCta}
              </PremiumButton>
              <PremiumButton href={`/${locale}/categories/comparisons`} variant="secondary" className="px-5 py-2.5 text-sm">
                {content.secondaryCta}
              </PremiumButton>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.trustBadges.slice(0, 2).map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </motion.div>

            <motion.dl
              className="mt-8 grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.stats.map((stat) => (
                <StatBadge key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ui-card-strong p-6 text-white lg:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {content.panelEyebrow}
                  </p>
                  <h2 className="balance-text mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-100">{content.panelTitle}</h2>
                </div>
                <div className="flex gap-2 opacity-70">
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="h-3 w-3 rounded-full bg-sky-400/70" />
                  <span className="h-3 w-3 rounded-full bg-cyan-400" />
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300/78">{content.panelDescription}</p>

              <div className="mt-7 space-y-3">
                {content.panelItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="ui-inner-panel p-4"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, delay: 0.24 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-100">{item.title}</p>
                        <p className="clamp-2 mt-1 text-sm leading-6 text-slate-300/74">{item.meta}</p>
                      </div>
                      <Badge variant="accent" className="max-w-[72px] shrink-0 justify-center text-[11px]">
                        {item.value}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="ui-inner-panel mt-6 p-4">
                <p className="text-sm leading-7 text-slate-300/76">{content.panelFootnote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </GlassPanel>
    </section>
  );
}
```

---

## FILE: src\components\home\home-page.tsx

`$ext
import { CategoryCard } from "@/components/home/category-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { ComparisonTable } from "@/components/home/comparison-table";
import { ConversionListCard } from "@/components/home/conversion-list-card";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { TopPickSection } from "@/components/home/top-pick-section";
import { ToolCard } from "@/components/home/tool-card";
import { WhyToolNovaSection } from "@/components/home/why-toolnova-section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { StatBadge } from "@/components/ui/stat-badge";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

export function HomePage({ locale, content }: HomePageProps) {
  return (
    <div className="relative pb-28">
      <HeroSection locale={locale} content={content.hero} />

      <div className="mt-14 space-y-24 md:mt-18 md:space-y-28">
        <AnimatedSection delay={0.02}>
          <TopPickSection locale={locale} content={content.topPick} />
        </AnimatedSection>

        {content.highIntentCards.length > 0 ? (
          <AnimatedSection delay={0.04}>
            <SectionShell
              className="section-tint-violet"
              eyebrow={content.sections.highIntent.eyebrow}
              title={content.sections.highIntent.title}
              description={content.sections.highIntent.description}
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {content.highIntentCards.map((item) => (
                  <ComparisonCard
                    key={item.title}
                    locale={locale}
                    item={item}
                    linkLabel={content.sections.highIntent.linkLabel}
                    featured
                  />
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        ) : null}

        <AnimatedSection delay={0.06}>
          <SectionShell className="section-tint-cyan">
            <GlassPanel className="ui-card-strong overflow-hidden px-6 py-9 lg:px-8 lg:py-10">
              <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
                <div className="max-w-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {content.sections.socialProof.eyebrow}
                  </p>
                  <h2 className="balance-text mt-4 text-[2rem] font-bold tracking-[-0.03em] text-slate-50 md:text-[2.25rem] md:leading-[1.08]">
                    {content.sections.socialProof.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300/86 md:text-[1.05rem] md:leading-8">
                    {content.sections.socialProof.description}
                  </p>
                </div>
                <dl className="grid gap-3 sm:grid-cols-3">
                  {content.socialProofStats.map((item) => (
                    <StatBadge key={item.label} value={item.value} label={item.label} />
                  ))}
                </dl>
              </div>
            </GlassPanel>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <WhyToolNovaSection locale={locale} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <HowItWorksSection locale={locale} />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <SectionShell
            className="section-tint-violet"
            eyebrow={content.sections.tools.eyebrow}
            title={content.sections.tools.title}
            description={content.sections.tools.description}
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.tools.map((tool) => (
                <ToolCard
                  key={tool.name}
                  locale={locale}
                  tool={tool}
                  detailLabel={content.sections.tools.detailLabel}
                  tryLabel={content.sections.tools.tryLabel}
                  bestForLabel={content.sections.tools.bestForLabel}
                  ratingLabel={content.sections.tools.ratingLabel}
                />
              ))}
            </div>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.14}>
          <SectionShell
            className="section-tint-cyan"
            eyebrow={content.sections.hotTools.eyebrow}
            title={content.sections.hotTools.title}
            description={content.sections.hotTools.description}
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {content.hotTools.map((item) => (
                <ConversionListCard key={item.title} locale={locale} item={item} />
              ))}
            </div>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.16}>
          <SectionShell
            className="section-tint-violet"
            eyebrow={content.sections.makeMoney.eyebrow}
            title={content.sections.makeMoney.title}
            description={content.sections.makeMoney.description}
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {content.moneyTools.map((item) => (
                <ConversionListCard key={item.title} locale={locale} item={item} />
              ))}
            </div>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <SectionShell className="section-tint-cyan">
            <ComparisonTable
              tools={content.tools}
              eyebrow={content.sections.comparisons.eyebrow}
              title={content.sections.comparisons.title}
              description={content.sections.comparisons.description}
              columns={content.sections.comparisons.columns}
              actionLabel={content.sections.comparisons.actionLabel}
            />
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <SectionShell
            className="section-tint-violet"
            eyebrow={content.sections.categories.eyebrow}
            title={content.sections.categories.title}
            description={content.sections.categories.description}
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {content.categories.map((category) => (
                <CategoryCard
                  key={category.title}
                  locale={locale}
                  category={category}
                  linkLabel={content.sections.categories.linkLabel}
                />
              ))}
            </div>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.22}>
          <SectionShell className="section-tint-cyan">
            <div className="ui-card-strong overflow-hidden px-8 py-10 text-white shadow-premium lg:px-10 lg:py-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/85">
                    {content.sections.finalCta.eyebrow}
                  </p>
                  <h2 className="balance-text mt-4 text-[2rem] font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.08]">
                    {content.sections.finalCta.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300/88 md:text-[1.05rem] md:leading-8">
                    {content.sections.finalCta.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <PremiumButton href={`/${locale}/categories`} variant="secondary">
                    {content.sections.finalCta.primaryCta}
                  </PremiumButton>
                  <PremiumButton href={`/${locale}/tools`}>
                    {content.sections.finalCta.secondaryCta}
                  </PremiumButton>
                </div>
              </div>
            </div>
          </SectionShell>
        </AnimatedSection>
      </div>
    </div>
  );
}
```

---

## FILE: src\components\home\how-it-works-section.tsx

`$ext
"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import type { Locale } from "@/i18n/config";

const content = {
  tr: {
    eyebrow: "Nasıl çalışır?",
    title: "Doğru AI aracına üç kısa adımda ulaş",
    description:
      "Kullanıcının önce ihtiyacını netleştirip sonra karşılaştırma ve detay akışına girmesi için sade bir yol sunuyoruz.",
    steps: [
      {
        step: "1",
        title: "İhtiyacını belirle",
        description: "Yazı, görsel, video, verimlilik veya gelir odaklı kullanım alanından başla."
      },
      {
        step: "2",
        title: "Araçları karşılaştır",
        description: "Fiyat, kullanım alanı, güçlü yönler ve alternatifler üzerinden seçenekleri daralt."
      },
      {
        step: "3",
        title: "Uygun olanı test et",
        description: "Detay sayfasına geç, artı ve eksileri gör, sonra doğru aracı doğrudan dene."
      }
    ]
  },
  en: {
    eyebrow: "How it works",
    title: "Reach the right AI tool in three simple steps",
    description:
      "We keep the user journey simple: define the need, compare options, then test the best fit with confidence.",
    steps: [
      {
        step: "1",
        title: "Choose the need",
        description: "Start from writing, image, video, productivity, or revenue-focused use cases."
      },
      {
        step: "2",
        title: "Compare the options",
        description: "Narrow tools down by pricing, strengths, best use cases, and alternatives."
      },
      {
        step: "3",
        title: "Test the right fit",
        description: "Open the detail page, review pros and cons, then try the tool directly."
      }
    ]
  }
} as const;

type HowItWorksSectionProps = {
  locale: Locale;
};

export function HowItWorksSection({ locale }: HowItWorksSectionProps) {
  const section = content[locale];

  return (
    <SectionShell eyebrow={section.eyebrow} title={section.title} description={section.description}>
      <div className="grid gap-5 md:grid-cols-3">
        {section.steps.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden p-6 md:p-7">
              <div className="inline-flex min-h-[34px] w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-sm font-semibold text-slate-100">
                {item.step}
              </div>
              <h3 className="balance-text mt-5 text-xl font-bold tracking-[-0.03em] text-slate-50">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300/82">{item.description}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
```

---

## FILE: src\components\home\newsletter-form.tsx

`$ext
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";

type NewsletterFormProps = {
  inputLabel: string;
  placeholder: string;
  buttonLabel: string;
  disclaimer: string;
};

export function NewsletterForm({
  inputLabel,
  placeholder,
  buttonLabel,
  disclaimer
}: NewsletterFormProps) {
  return (
    <GlassPanel className="home-card-glow p-4 md:p-5">
      <form action="#">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            {inputLabel}
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={placeholder}
            className="min-h-14 flex-1 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-base text-brand-ink outline-none transition placeholder:text-slate-400 focus:border-brand-accent focus:bg-white"
          />
          <PremiumButton type="submit" className="min-h-14 px-6">
            {buttonLabel}
          </PremiumButton>
        </div>
      </form>
      <p className="mt-4 text-sm leading-6 text-slate-500">{disclaimer}</p>
    </GlassPanel>
  );
}
```

---

## FILE: src\components\home\tool-card.tsx

`$ext
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ToolCard as ToolCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type ToolCardProps = {
  locale: string;
  tool: ToolCardType;
  detailLabel: string;
  tryLabel: string;
  bestForLabel: string;
  ratingLabel: string;
};

export function ToolCard({ locale, tool, detailLabel, tryLabel, bestForLabel, ratingLabel }: ToolCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.012 }} transition={{ duration: 0.22 }} className="h-full">
      <GlassPanel className="ui-card ui-card-hover home-card-glow flex h-full flex-col overflow-hidden p-6 md:p-7">
        <div className="flex min-h-[52px] items-center justify-between gap-3 overflow-hidden">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_-16px_rgba(59,130,246,0.42)]">
              {tool.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-400">{tool.category}</p>
              <p className="mt-1 truncate text-sm font-medium text-slate-200">{tool.note}</p>
            </div>
          </div>
          <Badge variant="muted" className="max-w-[110px] shrink-0 justify-center text-[11px]">
            {tool.pricing}
          </Badge>
        </div>

        <div className="mt-6 min-h-[126px] min-w-0">
          <Link
            href={`/${locale}${tool.href}`}
            aria-label={`${detailLabel}: ${tool.name}`}
            className="clamp-2 block min-h-[3.25rem] text-[1.48rem] font-bold leading-tight tracking-[-0.03em] text-slate-50 transition duration-200 hover:text-white"
          >
            {tool.name}
          </Link>
          <p className="clamp-3 mt-4 text-base leading-relaxed text-slate-300/88">{tool.description}</p>
        </div>

        <div className="ui-inner-panel mt-5 min-w-0 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{bestForLabel}</p>
          <p className="mt-2 truncate text-base font-semibold text-slate-100">{tool.bestFor}</p>
          <p className="clamp-3 mt-3 text-[15px] leading-relaxed text-slate-300/84">{tool.benefit}</p>
        </div>

        <div className="ui-inner-panel mt-5 min-w-0 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">ToolNova notu</p>
          <p className="clamp-3 mt-2 text-[15px] leading-relaxed text-slate-200/88">{tool.editorNote}</p>
        </div>

        <div className="mt-auto border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 shrink-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{ratingLabel}</p>
              <p className="mt-1 whitespace-nowrap text-base font-semibold text-slate-100">{tool.rating}</p>
            </div>
            <div className="min-w-0 sm:ml-4 sm:flex sm:justify-end">
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[46px] w-full min-w-[152px] items-center justify-center whitespace-nowrap rounded-xl bg-[var(--tn-gradient-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_24px_54px_-20px_rgba(99,102,241,0.62),0_32px_92px_-34px_rgba(34,211,238,0.56)] transition duration-200 hover:-translate-y-0.5 hover:brightness-[1.1] hover:shadow-[0_28px_60px_-20px_rgba(99,102,241,0.7),0_38px_104px_-34px_rgba(34,211,238,0.62)] sm:w-auto"
              >
                {tool.ctaLabel ?? tryLabel}
              </a>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
```

---

## FILE: src\components\home\top-pick-section.tsx

`$ext
"use client";

import { motion } from "framer-motion";

import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";

type TopPickSectionProps = {
  locale: Locale;
  content: HomeContent["topPick"];
};

export function TopPickSection({ locale, content }: TopPickSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <GlassPanel className="relative overflow-hidden rounded-[28px] border-white/10 bg-[linear-gradient(160deg,rgba(17,24,39,0.96),rgba(9,13,23,0.99))] px-6 py-7 shadow-[0_30px_88px_-44px_rgba(14,165,233,0.22)] lg:px-8 lg:py-8">
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-6 top-4 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge variant="accent">{content.badge}</Badge>
            <h2 className="balance-text mt-4 text-[2rem] font-bold tracking-[-0.03em] text-slate-50 md:text-[2.35rem] md:leading-[1.08]">
              {content.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300/88 md:text-[1.05rem] md:leading-8">
              {content.description}
            </p>
          </div>

          <div className="ui-inner-panel p-5">
            <div className="grid gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{content.reasonLabel}</p>
                <p className="mt-2 text-sm leading-7 text-slate-200/88">{content.reason}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{content.useCaseLabel}</p>
                <p className="mt-2 text-sm leading-7 text-slate-200/88">{content.useCase}</p>
              </div>
              <div className="pt-2">
                <PremiumButton href={`/${locale}${content.ctaHref}`} className="w-full">
                  {content.ctaLabel}
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.section>
  );
}
```

---

## FILE: src\components\home\why-toolnova-section.tsx

`$ext
"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";
import type { Locale } from "@/i18n/config";

const content = {
  tr: {
    eyebrow: "Neden ToolNova?",
    title: "Karar vermeyi hızlandıran sade ve güvenilir bir AI araç deneyimi",
    description:
      "ToolNova, kullanıcıyı gereksiz gürültüye boğmadan fiyat, kullanım alanı ve karşılaştırma sinyallerini tek akışta sunar.",
    items: [
      {
        title: "Tarafsız karşılaştırma mantığı",
        description: "Araçları tek bir kazanan üzerinden değil, kullanım senaryosuna göre değerlendirmenizi kolaylaştırır."
      },
      {
        title: "Net fiyat ve kullanım sinyali",
        description: "Ücretsiz, kısmen ücretsiz ve ücretli seçenekleri ilk bakışta ayırarak yanlış tıklamayı azaltır."
      },
      {
        title: "Hızlı keşif ve temiz akış",
        description: "Kategori, araç ve karşılaştırma sayfaları arasında doğal bir geçiş kurarak kararı daha kısa sürede netleştirir."
      }
    ]
  },
  en: {
    eyebrow: "Why ToolNova?",
    title: "A cleaner, more trustworthy AI tool experience built to speed up decisions",
    description:
      "ToolNova helps users compare pricing, use cases, and decision signals without clutter or unnecessary friction.",
    items: [
      {
        title: "Fair comparison logic",
        description: "Tools are presented by use case fit instead of forcing a single winner for every user."
      },
      {
        title: "Clear pricing signals",
        description: "Free, freemium, and paid options are visible at a glance so users reach better-fit tools faster."
      },
      {
        title: "Fast exploration flow",
        description: "Categories, tools, and comparison pages work together to shorten the path from discovery to action."
      }
    ]
  }
} as const;

type WhyToolNovaSectionProps = {
  locale: Locale;
};

export function WhyToolNovaSection({ locale }: WhyToolNovaSectionProps) {
  const section = content[locale];

  return (
    <SectionShell eyebrow={section.eyebrow} title={section.title} description={section.description}>
      <div className="grid gap-5 md:grid-cols-3">
        {section.items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden p-6 md:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_-18px_rgba(56,189,248,0.35)]">
                0{index + 1}
              </div>
              <h3 className="balance-text mt-5 text-xl font-bold tracking-[-0.03em] text-slate-50">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300/82">{item.description}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
```

---

## FILE: src\components\layout\locale-switcher.tsx

`$ext
import Link from "next/link";

import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  return (
    <div className="ui-nav-shell inline-flex items-center p-1 text-xs font-semibold uppercase tracking-[0.16em]">
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}`}
          className={`inline-flex min-h-[34px] min-w-[42px] items-center justify-center rounded-full px-3 transition duration-200 ${
            item === locale
              ? "bg-[var(--tn-gradient-primary)] text-white shadow-[0_10px_24px_-14px_rgba(59,130,246,0.5)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
```

---

## FILE: src\components\layout\site-footer.tsx

`$ext
import Link from "next/link";

import { GlassPanel } from "@/components/ui/glass-panel";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="mt-24 px-4 pb-8 sm:px-6 lg:px-8">
      <GlassPanel className="mx-auto max-w-7xl rounded-[28px] border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(11,15,25,0.96))] px-6 py-10 shadow-[0_28px_80px_-44px_rgba(14,165,233,0.2)] lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="min-w-0 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{dictionary.footer.badge}</p>
            <p className="ui-gradient-text mt-4 text-3xl font-bold tracking-[-0.03em]">ToolNova</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300/88 md:text-base md:leading-8">
              {dictionary.footer.description}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {dictionary.footer.groups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{group.title}</h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">
                  {group.links.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={`/${locale}${item.href}`}
                      className="truncate transition duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <p className="shrink-0">{dictionary.footer.copyright}</p>
          </div>
        </div>
      </GlassPanel>
    </footer>
  );
}
```

---

## FILE: src\components\layout\site-header.tsx

`$ext
import Link from "next/link";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/74 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="ui-gradient-text text-xl font-black tracking-[-0.04em] drop-shadow-[0_10px_28px_rgba(99,102,241,0.18)]"
        >
          ToolNova
        </Link>
        <div className="flex justify-center">
          <nav className="ui-nav-shell hidden items-center gap-1 px-2 py-2 md:flex">
            {dictionary.navigation.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="inline-flex min-h-[36px] items-center rounded-full px-4 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex justify-end">
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
```

---

## FILE: src\components\ui\animated-section.tsx

`$ext
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## FILE: src\components\ui\badge.tsx

`$ext
import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "accent" | "muted" | "dark" | "ghost";
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  const variants = {
    accent: "border border-cyan-400/20 bg-cyan-400/12 text-cyan-100",
    muted: "border border-white/10 bg-white/[0.05] text-slate-300",
    dark: "border border-white/10 bg-slate-950/72 text-white",
    ghost: "border border-violet-400/14 bg-violet-400/10 text-violet-100"
  } as const;

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        "max-w-full overflow-hidden truncate",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

---

## FILE: src\components\ui\glass-panel.tsx

`$ext
import clsx from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={clsx("premium-surface premium-outline rounded-[28px] border border-white/10 backdrop-blur-2xl", className)}>{children}</div>;
}
```

---

## FILE: src\components\ui\premium-button.tsx

`$ext
"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type PremiumButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles = {
  primary:
    "bg-[var(--tn-gradient-primary)] text-white shadow-[0_24px_54px_-20px_rgba(99,102,241,0.62),0_32px_92px_-34px_rgba(34,211,238,0.56)] hover:brightness-[1.1] hover:shadow-[0_28px_60px_-20px_rgba(99,102,241,0.7),0_38px_104px_-34px_rgba(34,211,238,0.62)]",
  secondary:
    "border border-white/10 bg-white/[0.025] text-slate-300/88 hover:bg-white/[0.04] hover:border-white/14",
  ghost:
    "border border-cyan-400/16 bg-cyan-400/8 text-cyan-200 hover:bg-cyan-400/12"
} as const;

export function PremiumButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className
}: PremiumButtonProps) {
  const classes = clsx(
    "inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold leading-none transition duration-200",
    variant === "primary" && "px-6 py-3.5",
    variant !== "primary" && "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
    styles[variant],
    className
  );

  const content = <span className="inline-flex items-center justify-center gap-2">{children}</span>;

  if (href) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }} className="inline-flex">
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type={type} className={classes} whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
      {content}
    </motion.button>
  );
}
```

---

## FILE: src\components\ui\section-heading.tsx

`$ext
import clsx from "clsx";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:items-center",
        className
      )}
    >
      <div className={clsx("max-w-3xl min-w-0", align === "center" && "mx-auto")}>
        {eyebrow ? <Badge variant="ghost" className="text-cyan-200">{eyebrow}</Badge> : null}
        <h2 className="balance-text mt-4 max-w-3xl text-[1.9rem] font-bold tracking-[-0.035em] text-slate-50 sm:text-[2.15rem] md:text-[2.4rem] md:leading-[1.08]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-300/82 md:text-base md:leading-8">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
```

---

## FILE: src\components\ui\section-shell.tsx

`$ext
import clsx from "clsx";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/section-heading";

type SectionShellProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  align?: "left" | "center";
};

export function SectionShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
  align = "left"
}: SectionShellProps) {
  return (
    <section className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {title ? (
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
          align={align}
          className="mb-10 md:mb-14"
        />
      ) : null}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
```

---

## FILE: src\components\ui\stat-badge.tsx

`$ext
import { GlassPanel } from "@/components/ui/glass-panel";

type StatBadgeProps = {
  value: string;
  label: string;
};

export function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <GlassPanel className="flex min-h-[110px] h-full flex-col justify-between rounded-[24px] border-white/10 bg-white/[0.05] px-4 py-4 shadow-card-soft md:min-h-[118px] md:px-5 md:py-5">
      <p className="balance-text bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
    </GlassPanel>
  );
}
```

---

## FILE: src\data\blog.ts

`$ext
import type { BlogEntry } from "@/types/blog";

export const blogArticles: BlogEntry[] = [
  {
    slug: "en-iyi-ai-araclari-2026",
    categorySlug: "ai-tools",
    relatedToolSlugs: ["chatgpt", "claude", "midjourney"],
    locales: {
      tr: {
        title: "2026'da öne çıkan AI araçları",
        excerpt: "2026'da öne çıkan AI araçlarını hız, fiyat, kalite ve kullanım senaryolarına göre hızlıca karşılaştırın.",
        intro:
          "AI aracı seçmek artık sadece marka bilinirliğiyle ilgili değil. İçerik üretimi, araştırma, görsel üretim ve iş akışı otomasyonu için doğru aracı seçmek; zamandan, bütçeden ve çıktı kalitesinden doğrudan etkilenmenizi sağlar.",
        categoryLabel: "AI Araçları",
        seoTitle: "2026'da öne çıkan AI araçları | ToolNova",
        seoDescription:
          "2026'da öne çıkan AI araçlarını kullanım alanı, fiyat ve kaliteye göre karşılaştırın. ChatGPT, Claude, Midjourney ve daha fazlası ToolNova'da.",
        sections: [
          {
            title: "2026'da AI aracı seçerken neye bakılmalı?",
            paragraphs: [
              "İyi bir AI aracı sadece güçlü görünmemeli; iş akışınıza gerçekten hız katmalı. Bu yüzden seçim yaparken çıktı kalitesi, kullanım kolaylığı, fiyat esnekliği ve günlük kullanım potansiyeli birlikte değerlendirilmelidir.",
              "Özellikle içerik, freelance ve küçük işletme kullanımında yanlış araç seçimi hızlıca maliyet yaratır. ToolNova'da bu yüzden karar vermeyi kolaylaştıran net filtreler, kısa özetler ve kullanım senaryoları öne çıkarılır."
            ],
            bullets: [
              "İlk bakmanız gereken şey: araç hangi işi en iyi yapıyor?",
              "Ücretsiz plan veya deneme sürümü var mı?",
              "Yeni başlayanlar için öğrenme eğrisi düşük mü?"
            ]
          },
          {
            title: "Öne çıkan araçlar neden bu kadar popüler?",
            paragraphs: [
              "ChatGPT, Claude ve Midjourney gibi araçlar farklı ihtiyaçlarda öne çıkıyor. ChatGPT geniş kullanım alanıyla, Claude açıklama kalitesiyle, Midjourney ise görsel üretim gücüyle dikkat çekiyor.",
              "Bu araçların ortak noktası, hızlı sonuç verip kullanıcıyı kısa sürede aksiyona geçirebilmeleri. Organik trafikten gelir üretmek isteyen kullanıcılar için bu fark ciddi avantaj sağlar."
            ],
            comparison: {
              title: "Hızlı karar özeti",
              items: [
                { label: "En geniş kullanım", value: "ChatGPT" },
                { label: "Uzun yazı kalitesi", value: "Claude" },
                { label: "Görsel kalite", value: "Midjourney" }
              ]
            }
          },
          {
            title: "Hangi kullanıcı hangi aracı seçmeli?",
            paragraphs: [
              "Tek bir araç herkese uygun değildir. Eğer önceliğiniz hızlı içerik üretmekse farklı, yüksek kaliteli görsel almaksa farklı, araştırma odaklı yazılar yazmaksa farklı bir tercih yapmanız gerekir."
            ],
            subSections: [
              {
                title: "Yeni başlayanlar",
                paragraphs: ["ChatGPT ve Gemini gibi araçlar daha düşük sürtünmeyle başlayabileceğiniz seçeneklerdir."],
                bullets: ["Kolay arayüz", "Hızlı sonuç", "Ücretsiz başlama imkanı"]
              },
              {
                title: "Freelancer'lar",
                paragraphs: ["Claude, ChatGPT ve Midjourney; yazı, araştırma ve görsel üretim tarafında gelir odaklı kullanım için güçlü adaylardır."],
                bullets: ["Müşteri işi üretimi", "Teklif ve içerik hazırlama", "Görsel teslimleri hızlandırma"]
              }
            ]
          }
        ]
      },
      en: {
        title: "Best AI tools (2026)",
        excerpt: "Compare the leading AI tools of 2026 by speed, pricing, quality, and real-world use case.",
        intro:
          "Choosing the best AI tool is no longer about brand awareness alone. The right product can improve speed, output quality, and cost efficiency across writing, research, image creation, and automation workflows.",
        categoryLabel: "AI Tools",
        seoTitle: "Best AI tools (2026) | ToolNova",
        seoDescription:
          "Compare the best AI tools of 2026 by use case, pricing, and quality. Explore ChatGPT, Claude, Midjourney, and more on ToolNova.",
        sections: [
          {
            title: "What matters most when choosing an AI tool in 2026?",
            paragraphs: [
              "A strong AI product should not just look impressive on paper. It should save time, reduce friction, and deliver consistently useful output inside your real workflow.",
              "That is why ToolNova highlights practical decision points such as output quality, onboarding difficulty, pricing flexibility, and daily usefulness."
            ],
            bullets: [
              "What job does the tool do best?",
              "Can you start for free or with low risk?",
              "Is it friendly for first-time AI users?"
            ]
          },
          {
            title: "Why are these tools leading right now?",
            paragraphs: [
              "ChatGPT, Claude, and Midjourney lead for different reasons. ChatGPT wins on flexibility, Claude stands out for long-form clarity, and Midjourney dominates visual impact.",
              "Their shared strength is fast time-to-value. That matters for creators, freelancers, and businesses that want results quickly."
            ],
            comparison: {
              title: "Quick decision summary",
              items: [
                { label: "Most versatile", value: "ChatGPT" },
                { label: "Best long-form output", value: "Claude" },
                { label: "Best visual quality", value: "Midjourney" }
              ]
            }
          },
          {
            title: "Which tool fits which kind of user?",
            paragraphs: [
              "No single tool is right for everyone. The best choice depends on whether your priority is content speed, research depth, or premium visual output."
            ],
            subSections: [
              {
                title: "Beginners",
                paragraphs: ["ChatGPT and Gemini are easier starting points for new AI users."],
                bullets: ["Simple interface", "Fast results", "Lower-risk entry"]
              },
              {
                title: "Freelancers",
                paragraphs: ["Claude, ChatGPT, and Midjourney are strong picks for client work, content, and visual delivery."],
                bullets: ["Client output", "Proposal and content support", "Faster asset creation"]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "chatgpt-ile-para-kazanma-yollari",
    categorySlug: "make-money-with-ai",
    relatedToolSlugs: ["chatgpt", "notion-ai", "runway"],
    locales: {
      tr: {
        title: "ChatGPT ile para kazanma yolları",
        excerpt: "ChatGPT ile içerik, araştırma, teklif hazırlama ve dijital hizmet üretimi üzerinden nasıl gelir elde edebileceğinizi öğrenin.",
        intro:
          "ChatGPT tek başına para basan bir araç değildir; ama doğru iş modeline bağlandığında içerik üretimi, müşteri işi ve bilgi ürünleri tarafında ciddi hız kazandırır. Buradaki kritik nokta, aracı değil sonucu satmaktır.",
        categoryLabel: "AI ile Para Kazanma",
        seoTitle: "ChatGPT ile para kazanma yolları | ToolNova",
        seoDescription:
          "ChatGPT ile para kazanmak için içerik üretimi, freelance hizmet, blog yazma ve dijital ürün fikirlerini adım adım inceleyin.",
        sections: [
          {
            title: "ChatGPT ile gelir üretmenin mantığı",
            paragraphs: [
              "Kullanıcılar ChatGPT'yi satın almaz; daha hızlı içerik, daha iyi araştırma veya daha kısa teslim süresi satın alır. Bu yüzden gelir üretmek için odak noktanız hizmet veya çıktı olmalıdır.",
              "Özellikle blog yazma, sosyal medya içerikleri, e-posta taslakları ve müşteri teklifleri gibi alanlarda ChatGPT ciddi zaman kazandırır."
            ],
            bullets: [
              "Aracı değil sonucu paketleyin",
              "Tekrarlayan işleri otomatikleştirin",
              "Müşteriye hız ve kalite avantajı sunun"
            ]
          },
          {
            title: "En iyi gelir modelleri",
            paragraphs: [
              "En güçlü modeller genellikle hizmet tabanlı başlar. Blog yazısı hazırlama, LinkedIn içerik paketi, ürün açıklaması yazma veya araştırma özeti çıkarma gibi işler kısa sürede satılabilir.",
              "Daha sonra aynı sistemi dijital ürüne çevirmek mümkündür. Prompt paketleri, mini rehberler veya niş içerik setleri buna örnek verilebilir."
            ],
            comparison: {
              title: "En iyi kullanım sonucu",
              items: [
                { label: "Blog yazıp para kazanma", value: "Yüksek potansiyel" },
                { label: "Freelance müşteri işi", value: "En hızlı başlangıç" },
                { label: "Dijital ürün üretimi", value: "Ölçeklenebilir model" }
              ]
            }
          },
          {
            title: "Başlangıç için pratik plan",
            paragraphs: [
              "İlk hedefiniz, tek bir nişte küçük ama net bir teklif üretmek olmalı. Örneğin 'haftalık 10 LinkedIn gönderisi paketi' gibi açık bir hizmet daha hızlı satış getirir."
            ],
            subSections: [
              {
                title: "İlk 7 gün",
                paragraphs: ["Bir niş seçin, 3 örnek çıktı üretin ve basit bir teklif sayfası hazırlayın."],
                bullets: ["Niş seç", "Örnek hazırla", "Teklifini yayınla"]
              },
              {
                title: "İlk müşteri sonrası",
                paragraphs: ["Teslim sürecini Notion AI veya benzer araçlarla sistemleştirerek daha karlı hale getirin."],
                bullets: ["Şablon oluştur", "Prompt kütüphanesi kur", "Teslim süresini kısalt"]
              }
            ]
          }
        ]
      },
      en: {
        title: "Ways to make money with ChatGPT",
        excerpt: "Learn how ChatGPT can support income through content, research, client delivery, and digital products.",
        intro:
          "ChatGPT is not a business model by itself. But when connected to the right offer, it can accelerate content, client work, and product creation in a meaningful way.",
        categoryLabel: "Make Money with AI",
        seoTitle: "Ways to make money with ChatGPT | ToolNova",
        seoDescription:
          "Explore practical ways to make money with ChatGPT through content writing, freelance services, blogging, and digital products.",
        sections: [
          {
            title: "The real logic behind making money with ChatGPT",
            paragraphs: [
              "People do not pay for ChatGPT itself. They pay for faster output, better research, or shorter delivery times. That is why your offer should focus on the outcome, not the tool.",
              "This works especially well in blog writing, email drafting, social content, and proposal support."
            ],
            bullets: [
              "Package outcomes, not software",
              "Automate repetitive work",
              "Sell speed and clarity"
            ]
          },
          {
            title: "Best income models to start with",
            paragraphs: [
              "Service-based offers are usually the fastest to validate. Blog posts, LinkedIn content packages, product descriptions, and research summaries can all become sellable outputs quickly.",
              "Later, the same workflow can be converted into scalable digital products such as prompt packs or niche templates."
            ],
            comparison: {
              title: "Best outcome by use case",
              items: [
                { label: "Monetized blogging", value: "High potential" },
                { label: "Freelance delivery", value: "Fastest start" },
                { label: "Digital products", value: "Most scalable" }
              ]
            }
          },
          {
            title: "A practical beginner plan",
            paragraphs: [
              "Start with one narrow offer and make it extremely clear. A focused package converts faster than a vague promise."
            ],
            subSections: [
              {
                title: "First 7 days",
                paragraphs: ["Pick a niche, create 3 sample outputs, and build a simple service offer."],
                bullets: ["Choose a niche", "Create samples", "Publish your offer"]
              },
              {
                title: "After the first client",
                paragraphs: ["Systematize your delivery with tools like Notion AI to make the business more profitable."],
                bullets: ["Create templates", "Build a prompt library", "Reduce delivery time"]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "en-iyi-ucretsiz-ai-araclari",
    categorySlug: "free-tools",
    relatedToolSlugs: ["chatgpt", "gemini", "runway"],
    locales: {
      tr: {
        title: "Öne çıkan ücretsiz AI araçları",
        excerpt: "Ücretsiz başlayabileceğiniz öne çıkan AI araçlarını fiyat riski olmadan keşfedin.",
        intro:
          "Ücretsiz AI araçları yeni başlayanlar için en iyi giriş noktasıdır. Ancak gerçekten işe yarayan ücretsiz planlarla sadece dikkat çekmek için sunulan sınırlı sürümleri ayırt etmek gerekir.",
        categoryLabel: "Ücretsiz Araçlar",
        seoTitle: "Öne çıkan ücretsiz AI araçları | ToolNova",
        seoDescription:
          "Ücretsiz veya freemium başlayan öne çıkan AI araçlarını keşfedin. ChatGPT, Gemini, Runway ve daha fazlasını karşılaştırın.",
        sections: [
          {
            title: "Ücretsiz araçlarda neye dikkat edilmeli?",
            paragraphs: [
              "Gerçekten faydalı bir ücretsiz plan, aracı test etmenize ve değerini anlamanıza yetecek kadar alan sunmalıdır. Sadece kayıt toplamak için açılan çok sınırlı planlar uzun vadede vakit kaybettirir.",
              "Bu yüzden limitler, çıktı kalitesi ve yükseltme baskısı birlikte değerlendirilmelidir."
            ],
            bullets: ["Günlük kullanım limiti", "Filigran veya çıktı kısıtları", "Ücretli plana geçiş baskısı"]
          },
          {
            title: "En mantıklı ücretsiz başlangıç seçenekleri",
            paragraphs: [
              "ChatGPT ve Gemini metin odaklı kullanımda düşük riskli başlangıç sağlar. Runway ise video tarafına geçmek isteyenler için daha deneme odaklı bir kapı açar."
            ],
            comparison: {
              title: "Hızlı seçim tablosu",
              items: [
                { label: "Yazı ve araştırma", value: "ChatGPT / Gemini" },
                { label: "Video denemeleri", value: "Runway" },
                { label: "En düşük giriş riski", value: "ChatGPT" }
              ]
            }
          },
          {
            title: "Ücretsiz planla maksimum verim alma",
            paragraphs: [
              "Ücretsiz planlar en iyi şekilde test, öğrenme ve ilk içerik üretimi için kullanılır. Düzenli iş akışınız oturduğunda ücretli plana geçmek daha mantıklı hale gelir."
            ],
            subSections: [
              {
                title: "Yeni başlayanlar için",
                paragraphs: ["Tek bir araca odaklanıp net bir kullanım akışı kurmak daha hızlı sonuç verir."]
              },
              {
                title: "Freelancer'lar için",
                paragraphs: ["İlk müşteri örnekleri ve deneme içerikleri ücretsiz planlarla rahatça üretilebilir."]
              }
            ]
          }
        ]
      },
      en: {
        title: "Best free AI tools",
        excerpt: "Discover the best AI tools you can start using for free without immediate pricing risk.",
        intro:
          "Free AI tools are one of the best ways to start exploring the market. The key is separating genuinely useful freemium plans from products that only use free access as a teaser.",
        categoryLabel: "Free Tools",
        seoTitle: "Best free AI tools | ToolNova",
        seoDescription:
          "Explore the best free and freemium AI tools. Compare ChatGPT, Gemini, Runway, and more before you choose.",
        sections: [
          {
            title: "What matters in a free AI tool?",
            paragraphs: [
              "A useful free tier should let you test real value before asking for payment. Extremely limited plans often create friction instead of clarity.",
              "That is why you should compare usage limits, output quality, and upgrade pressure together."
            ],
            bullets: ["Daily limits", "Watermarks or output restrictions", "Upgrade pressure"]
          },
          {
            title: "Best low-risk starting options",
            paragraphs: [
              "ChatGPT and Gemini are strong low-risk options for writing and research. Runway can be a smart entry point for video experimentation."
            ],
            comparison: {
              title: "Quick picks",
              items: [
                { label: "Writing and research", value: "ChatGPT / Gemini" },
                { label: "Video testing", value: "Runway" },
                { label: "Lowest entry risk", value: "ChatGPT" }
              ]
            }
          },
          {
            title: "How to get maximum value from free plans",
            paragraphs: [
              "Free plans work best for learning, testing, and initial output. Once a workflow proves itself, upgrading becomes a much clearer decision."
            ],
            subSections: [
              {
                title: "For beginners",
                paragraphs: ["Focus on one tool and build one repeatable workflow first."]
              },
              {
                title: "For freelancers",
                paragraphs: ["Free plans are often enough for sample work and first client-facing experiments."]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "claude-vs-chatgpt-karsilastirma",
    categorySlug: "comparisons",
    relatedToolSlugs: ["chatgpt", "claude", "gemini"],
    locales: {
      tr: {
        title: "Claude vs ChatGPT karşılaştırma",
        excerpt: "Claude ve ChatGPT arasındaki farkları yazı kalitesi, hız, kullanım kolaylığı ve fiyat açısından görün.",
        intro:
          "Claude ve ChatGPT aynı kullanıcı kitlesine hitap ediyor gibi görünse de pratikte farklı avantajlar sunar. Biri daha sakin ve uzun anlatım gücüyle, diğeri daha esnek ve çok yönlü yapısıyla öne çıkar.",
        categoryLabel: "Karşılaştırmalar",
        seoTitle: "Claude vs ChatGPT karşılaştırma | ToolNova",
        seoDescription:
          "Claude ve ChatGPT'yi yazı kalitesi, kullanım kolaylığı, fiyat ve en iyi kullanım alanı açısından karşılaştırın.",
        sections: [
          {
            title: "Temel fark nerede başlıyor?",
            paragraphs: [
              "ChatGPT daha geniş kullanım alanı ve hızlı adaptasyon gücüyle öne çıkarken, Claude daha sakin ve yapılandırılmış cevaplarıyla dikkat çeker.",
              "Bu yüzden seçim, 'hangisi daha iyi?' sorusundan çok 'hangi iş için daha uygun?' sorusuna bağlıdır."
            ],
            comparison: {
              title: "Hızlı fark özeti",
              items: [
                { label: "Genel kullanım esnekliği", value: "ChatGPT" },
                { label: "Uzun yazı akışı", value: "Claude" },
                { label: "Yeni başlayanlar için hız", value: "ChatGPT" }
              ]
            }
          },
          {
            title: "Yazı kalitesi ve araştırma performansı",
            paragraphs: [
              "Uzun açıklama, derinlik ve editorial netlik arayan kullanıcılar Claude'u daha düzenli bulabilir. Hızlı içerik üretimi ve daha geniş iş akışları için ise ChatGPT daha esnek bir tercih olur."
            ],
            bullets: [
              "Claude: daha sakin ton ve uzun bağlam",
              "ChatGPT: daha çok yönlü kullanım",
              "İki araç da freemium seviyede denenebilir"
            ]
          },
          {
            title: "Kim hangisini seçmeli?",
            paragraphs: [
              "Tek bir doğru cevap yok. İçerik, araştırma veya ekip içi dokümantasyon önceliklerinize göre karar daha netleşir."
            ],
            subSections: [
              {
                title: "Claude'u seçmesi mantıklı olanlar",
                paragraphs: ["Uzun yazılar, açıklayıcı rehberler ve editorial netlik arayan kullanıcılar."]
              },
              {
                title: "ChatGPT'yi seçmesi mantıklı olanlar",
                paragraphs: ["Daha çok yönlü üretkenlik, hızlı taslak ve geniş kullanım alanı isteyen kullanıcılar."]
              }
            ]
          }
        ]
      },
      en: {
        title: "Claude vs ChatGPT comparison",
        excerpt: "See how Claude and ChatGPT differ in writing quality, speed, usability, and pricing.",
        intro:
          "Claude and ChatGPT seem to target similar users, but they create different advantages in practice. One leans into structured long-form clarity, while the other wins on versatility and speed of use.",
        categoryLabel: "Comparisons",
        seoTitle: "Claude vs ChatGPT comparison | ToolNova",
        seoDescription:
          "Compare Claude and ChatGPT by writing quality, usability, pricing, and best-fit use cases.",
        sections: [
          {
            title: "Where does the real difference start?",
            paragraphs: [
              "ChatGPT stands out through flexibility and broad task coverage, while Claude often feels calmer and more structured in long-form output.",
              "That makes the better question not 'which is best?' but 'which one fits the job better?'"
            ],
            comparison: {
              title: "Quick difference summary",
              items: [
                { label: "Versatility", value: "ChatGPT" },
                { label: "Long-form flow", value: "Claude" },
                { label: "Fast beginner value", value: "ChatGPT" }
              ]
            }
          },
          {
            title: "Writing quality and research performance",
            paragraphs: [
              "Users who want long explanations and editorial calm may prefer Claude. Users who want faster drafting across many workflows may lean toward ChatGPT."
            ],
            bullets: [
              "Claude: calmer tone and longer context",
              "ChatGPT: broader workflow range",
              "Both can be tested through freemium access"
            ]
          },
          {
            title: "Who should choose which one?",
            paragraphs: [
              "The answer depends on whether your priority is long-form structure or flexible everyday output."
            ],
            subSections: [
              {
                title: "Better fit for Claude",
                paragraphs: ["Long-form writing, guide creation, and editorial clarity."]
              },
              {
                title: "Better fit for ChatGPT",
                paragraphs: ["General productivity, fast drafts, and broader day-to-day use cases."]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "midjourney-nasil-kullanilir",
    categorySlug: "guides",
    relatedToolSlugs: ["midjourney", "runway"],
    locales: {
      tr: {
        title: "Midjourney nasıl kullanılır",
        excerpt: "Midjourney ile daha iyi görseller üretmek için temel akışları, prompt mantığını ve hızlı ipuçlarını öğrenin.",
        intro:
          "Midjourney güçlü ama ilk bakışta karmaşık görünebilir. Doğru prompt mantığını kurduğunuzda ise yaratıcı görsel üretim çok daha hızlı ve keyifli hale gelir.",
        categoryLabel: "Rehberler",
        seoTitle: "Midjourney nasıl kullanılır? | ToolNova",
        seoDescription:
          "Midjourney kullanmaya başlamak için temel adımları, prompt mantığını ve daha iyi görsel üretim ipuçlarını öğrenin.",
        sections: [
          {
            title: "Midjourney'e başlarken temel mantık",
            paragraphs: [
              "Midjourney'de sonuç kalitesini en çok etkileyen şey prompt netliğidir. Ne üretmek istediğinizi, hangi stilde görmek istediğinizi ve görselin hissini ne kadar iyi tarif ederseniz sonuç o kadar güçlü olur.",
              "Başlangıçta kısa ve net komutlarla ilerlemek daha iyi sonuç verir."
            ],
            bullets: ["Konu", "Stil", "Işık / kompozisyon", "Kullanım amacı"]
          },
          {
            title: "Daha iyi prompt yazmanın püf noktaları",
            paragraphs: [
              "Prompt içinde gereksiz kalabalık yerine seçici detaylar kullanın. Stil adı, kamera açısı, renk tonu ve kullanım amacı gibi bilgiler kaliteyi daha çok artırır."
            ],
            comparison: {
              title: "Daha iyi sonuç için odak noktaları",
              items: [
                { label: "Net konu", value: "Zorunlu" },
                { label: "Stil referansı", value: "Çok faydalı" },
                { label: "Çıktı amacı", value: "Kararı hızlandırır" }
              ]
            }
          },
          {
            title: "Hangi kullanım alanlarında öne çıkar?",
            paragraphs: [
              "Midjourney özellikle konsept, kapak görseli, reklam kreatifi ve sosyal medya görsel üretimi için güçlüdür."
            ],
            subSections: [
              {
                title: "Freelance tasarım işleri",
                paragraphs: ["Moodboard, konsept sunumu ve hızlı yaratıcı örnekler için kullanılabilir."]
              },
              {
                title: "İçerik üretimi",
                paragraphs: ["Blog kapakları, thumbnail fikirleri ve kampanya görsellerinde hız kazandırır."]
              }
            ]
          }
        ]
      },
      en: {
        title: "How to use Midjourney",
        excerpt: "Learn the basics of Midjourney, prompt structure, and practical tips for stronger visual output.",
        intro:
          "Midjourney can feel complex at first, but the workflow becomes much easier once you understand how clear prompting shapes the final result.",
        categoryLabel: "Guides",
        seoTitle: "How to use Midjourney | ToolNova",
        seoDescription:
          "Learn how to get started with Midjourney, write better prompts, and improve your image generation results.",
        sections: [
          {
            title: "The core idea behind using Midjourney",
            paragraphs: [
              "Prompt clarity has the biggest influence on quality. The better you describe the subject, style, and mood, the stronger the output becomes.",
              "Beginners usually get better results by starting with shorter, clearer prompts."
            ],
            bullets: ["Subject", "Style", "Lighting / composition", "Output purpose"]
          },
          {
            title: "How to write better prompts",
            paragraphs: [
              "Instead of packing the prompt with too many details, focus on the details that matter most: style references, camera angle, color mood, and use case."
            ],
            comparison: {
              title: "Best prompt focus areas",
              items: [
                { label: "Clear subject", value: "Essential" },
                { label: "Style reference", value: "Very useful" },
                { label: "Output purpose", value: "Improves direction" }
              ]
            }
          },
          {
            title: "Where does Midjourney stand out most?",
            paragraphs: [
              "Midjourney is especially strong for concept art, cover visuals, creative mockups, and social media assets."
            ],
            subSections: [
              {
                title: "Freelance design work",
                paragraphs: ["Useful for moodboards, concept presentations, and fast creative drafts."]
              },
              {
                title: "Content production",
                paragraphs: ["Helpful for blog covers, thumbnail concepts, and campaign visuals."]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "freelance-icin-en-iyi-ai-araclari",
    categorySlug: "make-money-with-ai",
    relatedToolSlugs: ["chatgpt", "claude", "midjourney"],
    locales: {
      tr: {
        title: "Freelance için öne çıkan AI araçları",
        excerpt: "Freelance çalışanlar için içerik, araştırma, görsel ve teslim süreçlerini hızlandıran öne çıkan AI araçları.",
        intro:
          "Freelance dünyasında hız ve kalite aynı anda önemlidir. Doğru AI aracı; teklif hazırlama, müşteri işi üretme ve teslim süresini kısaltma konusunda ciddi avantaj yaratır.",
        categoryLabel: "AI ile Para Kazanma",
        seoTitle: "Freelance için öne çıkan AI araçları | ToolNova",
        seoDescription:
          "Freelance çalışanlar için öne çıkan AI araçlarını keşfedin. İçerik, tasarım, araştırma ve verimlilik için doğru aracı seçin.",
        sections: [
          {
            title: "Freelancer için doğru AI aracı ne yapmalı?",
            paragraphs: [
              "Doğru araç sadece yaratıcı olmamalı; müşteri işini daha hızlı ve daha güvenli teslim etmenizi sağlamalı. Bu yüzden hız, düzen, çıktı kalitesi ve tekrar kullanılabilir şablonlar önemlidir."
            ],
            bullets: ["Teklif hazırlama", "Müşteri teslimi", "Düzenli üretim", "Daha az revizyon"]
          },
          {
            title: "Yazı, araştırma ve görsel üretimde en iyi seçenekler",
            paragraphs: [
              "ChatGPT hızlı üretim için, Claude daha detaylı ve editorial çıktılar için, Midjourney ise görsel ve sunum tarafı için güçlü sonuç verir."
            ],
            comparison: {
              title: "Freelance sonuç odaklı seçim",
              items: [
                { label: "Hızlı içerik teslimi", value: "ChatGPT" },
                { label: "Derinlikli yazı işleri", value: "Claude" },
                { label: "Görsel müşteri işleri", value: "Midjourney" }
              ]
            }
          },
          {
            title: "Daha karlı çalışmak için sistem kurma",
            paragraphs: [
              "AI aracını tek seferlik hız artışı yerine sistemin bir parçası gibi kullanmak daha fazla kâr getirir. Hazır şablonlar, prompt kütüphaneleri ve teslim checklist'leri bunun temelidir."
            ],
            subSections: [
              {
                title: "Teklif aşaması",
                paragraphs: ["AI ile örnek çıktı ve proje taslağı hazırlamak dönüşüm oranını artırabilir."]
              },
              {
                title: "Teslim aşaması",
                paragraphs: ["İlk taslağı AI ile üretip son kalite kontrolü manuel yapmak en dengeli akıştır."]
              }
            ]
          }
        ]
      },
      en: {
        title: "Best AI tools for freelancers",
        excerpt: "The best AI tools for freelancers who want faster content, research, visual output, and smoother delivery.",
        intro:
          "Freelancers need both speed and quality. The right AI tool can improve proposal creation, client delivery, and repeatable production without increasing stress.",
        categoryLabel: "Make Money with AI",
        seoTitle: "Best AI tools for freelancers | ToolNova",
        seoDescription:
          "Discover the best AI tools for freelancers across writing, research, image creation, and productivity workflows.",
        sections: [
          {
            title: "What should the right AI tool do for a freelancer?",
            paragraphs: [
              "The best tool should help you deliver client work faster and more confidently. That is why speed, structure, output quality, and reusable systems matter more than hype."
            ],
            bullets: ["Proposal support", "Client delivery", "Repeatable production", "Fewer revisions"]
          },
          {
            title: "Best options for writing, research, and visuals",
            paragraphs: [
              "ChatGPT is strong for fast output, Claude is useful for deeper editorial work, and Midjourney stands out for client-facing visuals."
            ],
            comparison: {
              title: "Freelancer-focused picks",
              items: [
                { label: "Fast content delivery", value: "ChatGPT" },
                { label: "Depth and clarity", value: "Claude" },
                { label: "Visual client work", value: "Midjourney" }
              ]
            }
          },
          {
            title: "Build a more profitable system",
            paragraphs: [
              "Using AI as part of a repeatable delivery system is far more valuable than using it only for occasional speed boosts."
            ],
            subSections: [
              {
                title: "Proposal stage",
                paragraphs: ["Sample outputs and outline drafts can improve conversion with clients."]
              },
              {
                title: "Delivery stage",
                paragraphs: ["Generating the first draft with AI and doing final human quality control is often the most balanced workflow."]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "ai-ile-blog-yazip-para-kazanma",
    categorySlug: "make-money-with-ai",
    relatedToolSlugs: ["chatgpt", "claude", "notion-ai"],
    locales: {
      tr: {
        title: "AI ile blog yazıp para kazanma",
        excerpt: "AI destekli içerik akışı kurarak blogdan trafik ve gelir üretmenin temel adımlarını öğrenin.",
        intro:
          "AI ile blog yazmak tek başına gelir üretmez; ama araştırma, taslak, başlık ve optimizasyon süreçlerini hızlandırarak daha fazla içerik yayınlamanızı sağlar. Kazanç burada düzenli üretim ve doğru nişten gelir.",
        categoryLabel: "AI ile Para Kazanma",
        seoTitle: "AI ile blog yazıp para kazanma | ToolNova",
        seoDescription:
          "AI ile blog yazıp trafik ve gelir üretmek için niş seçimi, içerik sistemi ve en uygun araçları öğrenin.",
        sections: [
          {
            title: "Blog gelirinin temel mantığı",
            paragraphs: [
              "Blog geliri genellikle organik trafik, reklam ve affiliate bağlantılar üzerinden oluşur. AI burada içerik üretimini ve araştırmayı hızlandırarak yayın hızını artırır.",
              "Doğru niş seçimi olmadan ise hız tek başına yeterli olmaz."
            ],
            bullets: ["Arama niyeti yüksek konular", "Affiliate uyumlu içerikler", "Düzenli yayın akışı"]
          },
          {
            title: "AI ile içerik süreci nasıl kurulur?",
            paragraphs: [
              "En verimli model; konu araştırmasını, taslak planını ve ilk metni AI ile üretip son kalite kontrolü manuel yapmaktır. Bu yöntem hem hız hem de güven sağlar."
            ],
            comparison: {
              title: "En iyi kullanım sonucu",
              items: [
                { label: "Uzun rehber içerik", value: "Claude" },
                { label: "Hızlı taslak üretimi", value: "ChatGPT" },
                { label: "İçerik düzeni", value: "Notion AI" }
              ]
            }
          },
          {
            title: "Kazanç odaklı içerik fikirleri",
            paragraphs: [
              "En iyi trafik ve gelir potansiyeli genellikle 'best', 'alternatives', 'vs' ve 'how to' formatlarından gelir. Bu içerikler aynı zamanda affiliate tıklamasına daha yakın kullanıcı çeker."
            ],
            subSections: [
              {
                title: "Affiliate odaklı içerikler",
                paragraphs: ["'ChatGPT alternatives' veya 'best AI tools for students' gibi başlıklar yüksek niyet taşır."]
              },
              {
                title: "Uzun vadeli rehber içerikler",
                paragraphs: ["'AI ile blog yazma rehberi' gibi evergreen içerikler düzenli trafik çekebilir."]
              }
            ]
          }
        ]
      },
      en: {
        title: "How to make money blogging with AI",
        excerpt: "Learn how to use AI to build a faster blog content workflow that supports traffic and revenue.",
        intro:
          "AI does not create blog income by itself, but it can speed up research, outlines, drafting, and optimization. The real leverage comes from consistent publishing and choosing the right niche.",
        categoryLabel: "Make Money with AI",
        seoTitle: "How to make money blogging with AI | ToolNova",
        seoDescription:
          "Learn how to use AI for niche selection, content production, and monetized blogging workflows.",
        sections: [
          {
            title: "The core logic behind blog revenue",
            paragraphs: [
              "Blog income usually comes from organic traffic, ads, and affiliate clicks. AI helps by accelerating content production and research so you can publish more consistently.",
              "Without the right niche, speed alone will not be enough."
            ],
            bullets: ["High-intent topics", "Affiliate-friendly formats", "Consistent publishing"]
          },
          {
            title: "How to build an AI-assisted content workflow",
            paragraphs: [
              "The most reliable model is to use AI for topic research, outlines, and first drafts, then apply human editing for quality and accuracy."
            ],
            comparison: {
              title: "Best tool by content job",
              items: [
                { label: "Long-form guides", value: "Claude" },
                { label: "Fast first drafts", value: "ChatGPT" },
                { label: "Content organization", value: "Notion AI" }
              ]
            }
          },
          {
            title: "Content ideas that monetize better",
            paragraphs: [
              "Formats such as 'best', 'alternatives', 'vs', and 'how to' usually attract stronger buying intent and are better aligned with affiliate revenue."
            ],
            subSections: [
              {
                title: "Affiliate-led content",
                paragraphs: ["Topics like 'ChatGPT alternatives' and 'best AI tools for students' often carry strong commercial intent."]
              },
              {
                title: "Evergreen guides",
                paragraphs: ["Long-form educational guides can keep driving traffic over time."]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "en-iyi-gorsel-ai-araclari",
    categorySlug: "ai-tools",
    relatedToolSlugs: ["midjourney", "runway", "chatgpt"],
    locales: {
      tr: {
        title: "Öne çıkan görsel AI araçları",
        excerpt: "Görsel üretim, konsept tasarım ve yaratıcı iş akışları için öne çıkan AI araçlarını keşfedin.",
        intro:
          "Görsel AI araçları yalnızca sosyal medya görseli üretmek için değil; sunum, kampanya, konsept ve ürün görselleştirme tarafında da ciddi hız kazandırır.",
        categoryLabel: "AI Araçları",
        seoTitle: "Öne çıkan görsel AI araçları | ToolNova",
        seoDescription:
          "Midjourney, Runway ve diğer görsel AI araçlarını kalite, hız ve kullanım senaryosuna göre keşfedin.",
        sections: [
          {
            title: "Görsel AI aracında hangi kriterler önemli?",
            paragraphs: [
              "İyi bir görsel araç; sadece güzel sonuç üretmekle kalmamalı, aynı zamanda tekrar üretilebilir kalite ve kullanım hızı da sunmalıdır."
            ],
            bullets: ["Stil kalitesi", "Tekrar üretilebilirlik", "Kullanım kolaylığı", "Teslim hızına etkisi"]
          },
          {
            title: "Midjourney ve Runway neden öne çıkıyor?",
            paragraphs: [
              "Midjourney daha çok güçlü statik görsel üretimiyle, Runway ise video ve hareketli yaratıcı iş akışlarıyla öne çıkıyor."
            ],
            comparison: {
              title: "Görsel üretim sonucu",
              items: [
                { label: "Kapak ve konsept görsel", value: "Midjourney" },
                { label: "Video ve hareketli içerik", value: "Runway" },
                { label: "İçerik fikri ve brief desteği", value: "ChatGPT" }
              ]
            }
          },
          {
            title: "Kimler için daha anlamlı?",
            paragraphs: [
              "Kreatif ekipler, içerik üreticileri ve freelance tasarımcılar bu araçlardan en hızlı değeri alan gruplardır."
            ],
            subSections: [
              {
                title: "İçerik üreticileri",
                paragraphs: ["Thumbnail, kapak ve kampanya görselleri için ciddi hız avantajı sağlar."]
              },
              {
                title: "Ajans ve ekipler",
                paragraphs: ["Konsept sunumları ve yaratıcı denemeler için daha hızlı fikir üretimi sağlar."]
              }
            ]
          }
        ]
      },
      en: {
        title: "Best AI image tools",
        excerpt: "Discover top AI tools for image generation, concept design, and creative production workflows.",
        intro:
          "AI image tools are not only useful for social visuals. They can also accelerate campaign concepts, product imagery, presentations, and creative direction work.",
        categoryLabel: "AI Tools",
        seoTitle: "Best AI image tools | ToolNova",
        seoDescription:
          "Explore Midjourney, Runway, and other AI image tools by quality, speed, and real use case.",
        sections: [
          {
            title: "What matters most in an AI image tool?",
            paragraphs: [
              "The strongest tool should combine visual quality with repeatability and workflow speed."
            ],
            bullets: ["Style quality", "Repeatability", "Ease of use", "Delivery speed"]
          },
          {
            title: "Why do Midjourney and Runway stand out?",
            paragraphs: [
              "Midjourney is stronger for polished static image output, while Runway stands out more in motion and video-heavy creative workflows."
            ],
            comparison: {
              title: "Best outcome by visual job",
              items: [
                { label: "Concept and cover visuals", value: "Midjourney" },
                { label: "Video and motion content", value: "Runway" },
                { label: "Creative ideation and briefs", value: "ChatGPT" }
              ]
            }
          },
          {
            title: "Who gets the most value?",
            paragraphs: [
              "Creators, freelance designers, and marketing teams often get the fastest return from these tools."
            ],
            subSections: [
              {
                title: "Creators",
                paragraphs: ["Useful for thumbnails, blog covers, and campaign visuals."]
              },
              {
                title: "Agencies and teams",
                paragraphs: ["Strong for concept pitches and rapid creative exploration."]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "yeni-baslayanlar-icin-ai-rehberi",
    categorySlug: "guides",
    relatedToolSlugs: ["chatgpt", "gemini", "claude"],
    locales: {
      tr: {
        title: "Yeni başlayanlar için AI rehberi",
        excerpt: "AI dünyasına yeni girenler için araç seçimi, kullanım mantığı ve ilk adımlar.",
        intro:
          "AI araçları ilk bakışta karmaşık görünebilir ama doğru başlangıç yapıldığında çok hızlı değer üretir. En önemli nokta, aynı anda her şeyi öğrenmeye çalışmak yerine tek bir net kullanım alanıyla başlamaktır.",
        categoryLabel: "Rehberler",
        seoTitle: "Yeni başlayanlar için AI rehberi | ToolNova",
        seoDescription:
          "AI araçlarına yeni başlayanlar için temel rehber: hangi aracı seçmeli, nasıl başlamalı ve ilk kullanım senaryosu ne olmalı?",
        sections: [
          {
            title: "İlk olarak neyi öğrenmelisiniz?",
            paragraphs: [
              "AI araçlarının tamamını öğrenmeniz gerekmez. Sizin için önemli olan, kendi işinizde en çok zaman alan görevi hızlandıracak ilk aracı bulmaktır."
            ],
            bullets: ["Yazı mı?", "Araştırma mı?", "Görsel mi?", "Günlük verimlilik mi?"]
          },
          {
            title: "Başlangıç için en risksiz araçlar",
            paragraphs: [
              "ChatGPT ve Gemini gibi freemium araçlar yeni başlayanlar için en düşük sürtünmeli giriş noktasıdır. Claude ise biraz daha yazı ve açıklama odaklı kullanıcılar için iyi bir ikinci adımdır."
            ],
            comparison: {
              title: "Başlangıç seçimi",
              items: [
                { label: "En kolay başlangıç", value: "ChatGPT" },
                { label: "Google odaklı kullanım", value: "Gemini" },
                { label: "Daha uzun içerik", value: "Claude" }
              ]
            }
          },
          {
            title: "İlk 14 gün planı",
            paragraphs: [
              "İlk iki haftada amaç araç bağımlısı olmak değil, tekrar eden bir kullanım alışkanlığı kurmaktır."
            ],
            subSections: [
              {
                title: "1. hafta",
                paragraphs: ["Tek bir araç seçip her gün aynı küçük görevi onunla yapın."]
              },
              {
                title: "2. hafta",
                paragraphs: ["Araçla ürettiğiniz çıktıları kalite açısından karşılaştırın ve hangi görevlerde gerçekten işe yaradığını not edin."]
              }
            ]
          }
        ]
      },
      en: {
        title: "AI guide for beginners",
        excerpt: "A practical beginner guide to choosing the right AI tool and getting useful results quickly.",
        intro:
          "AI tools can feel overwhelming at first, but they create value quickly when you start with one clear use case instead of trying to learn everything at once.",
        categoryLabel: "Guides",
        seoTitle: "AI guide for beginners | ToolNova",
        seoDescription:
          "A beginner-friendly AI guide covering tool choice, first workflows, and the best way to start using AI effectively.",
        sections: [
          {
            title: "What should you learn first?",
            paragraphs: [
              "You do not need to master every AI product. You only need to find the first tool that can speed up a task you already repeat often."
            ],
            bullets: ["Writing", "Research", "Images", "Daily productivity"]
          },
          {
            title: "Lowest-risk tools to start with",
            paragraphs: [
              "Freemium tools like ChatGPT and Gemini are easier entry points. Claude is often a good second step for users who care more about explanation quality and long-form writing."
            ],
            comparison: {
              title: "Starter picks",
              items: [
                { label: "Easiest start", value: "ChatGPT" },
                { label: "Google-centered use", value: "Gemini" },
                { label: "Longer writing", value: "Claude" }
              ]
            }
          },
          {
            title: "A simple 14-day plan",
            paragraphs: [
              "The goal is not to become dependent on a tool. The goal is to build one repeatable workflow."
            ],
            subSections: [
              {
                title: "Week 1",
                paragraphs: ["Choose one tool and use it for the same small task every day."]
              },
              {
                title: "Week 2",
                paragraphs: ["Review the outputs and note where the tool genuinely saves time or improves quality."]
              }
            ]
          }
        ]
      }
    }
  },
  {
    slug: "en-hizli-buyuyen-ai-araclari",
    categorySlug: "ai-tools",
    relatedToolSlugs: ["chatgpt", "runway", "gemini"],
    locales: {
      tr: {
        title: "En hızlı büyüyen AI araçları",
        excerpt: "Dikkat çeken kullanıcı artışı ve kullanım ivmesiyle öne çıkan AI araçlarını keşfedin.",
        intro:
          "Hızlı büyüyen AI araçları genellikle iki sinyal verir: pazarda gerçek bir ihtiyaç çözüyorlardır ve kullanıcı ilk temasta değer görüyordur. Bu yüzden büyüme, yalnızca hype değil aynı zamanda ürün-pazar uyumu göstergesi olabilir.",
        categoryLabel: "AI Araçları",
        seoTitle: "En hızlı büyüyen AI araçları | ToolNova",
        seoDescription:
          "En hızlı büyüyen AI araçlarını, kullanım ivmesini ve hangi alanlarda öne çıktıklarını keşfedin.",
        sections: [
          {
            title: "Bir AI aracının hızlı büyüdüğünü ne gösterir?",
            paragraphs: [
              "Kullanıcı sayısı, içerik üreticileri arasındaki görünürlük ve günlük iş akışlarına girme hızı önemli sinyallerdir. Özellikle ürün ilk kullanımda değer yaratıyorsa büyüme daha kalıcı olur."
            ],
            bullets: ["Düşük giriş sürtünmesi", "Net kullanım sonucu", "Paylaşılabilir çıktı kalitesi"]
          },
          {
            title: "Bugün en çok dikkat çeken adaylar",
            paragraphs: [
              "ChatGPT hâlâ geniş kullanım alanıyla lider konumda. Runway video üretimindeki ivmesiyle dikkat çekerken Gemini ise geniş kitlelere erişim avantajına sahip."
            ],
            comparison: {
              title: "Büyüme odaklı hızlı bakış",
              items: [
                { label: "En geniş yayılım", value: "ChatGPT" },
                { label: "Video tarafında ivme", value: "Runway" },
                { label: "Kitle erişimi", value: "Gemini" }
              ]
            }
          },
          {
            title: "Bu sinyal kullanıcı için neden önemli?",
            paragraphs: [
              "Hızlı büyüyen araçlar her zaman doğru araç olmayabilir; ama erken aşamada fırsat yakalamak isteyen kullanıcılar için ciddi avantaj yaratabilir."
            ],
            subSections: [
              {
                title: "Erken benimseyenler",
                paragraphs: ["Pazarda yeni avantaj arayan kullanıcılar bu araçlarda daha erken fark yaratabilir."]
              },
              {
                title: "Gelir odaklı kullanıcılar",
                paragraphs: ["Büyüyen platformlarda hizmet ve içerik üretimi için yeni fırsatlar daha hızlı oluşabilir."]
              }
            ]
          }
        ]
      },
      en: {
        title: "Fastest-growing AI tools",
        excerpt: "Explore the AI tools gaining the most attention, users, and momentum right now.",
        intro:
          "Fast-growing AI tools usually signal two things: they solve a real market need and they deliver value quickly. That makes growth a useful signal, not just hype.",
        categoryLabel: "AI Tools",
        seoTitle: "Fastest-growing AI tools | ToolNova",
        seoDescription:
          "Discover the fastest-growing AI tools, why they are gaining momentum, and where they stand out most.",
        sections: [
          {
            title: "What makes an AI tool grow fast?",
            paragraphs: [
              "User adoption, visibility among creators, and quick integration into daily workflows are strong signals. When a product creates value on first use, momentum tends to hold longer."
            ],
            bullets: ["Low friction", "Clear outcome", "Shareable output quality"]
          },
          {
            title: "Which tools stand out most right now?",
            paragraphs: [
              "ChatGPT still leads through broad utility. Runway is gaining attention through video workflows, while Gemini benefits from broad reach and ecosystem familiarity."
            ],
            comparison: {
              title: "Growth snapshot",
              items: [
                { label: "Broadest adoption", value: "ChatGPT" },
                { label: "Video momentum", value: "Runway" },
                { label: "Mass reach", value: "Gemini" }
              ]
            }
          },
          {
            title: "Why does this matter to users?",
            paragraphs: [
              "Fast-growing tools are not always automatically the best, but they can create early advantages for users who want to move before the market gets crowded."
            ],
            subSections: [
              {
                title: "Early adopters",
                paragraphs: ["New tools can create faster differentiation for people who move early."]
              },
              {
                title: "Revenue-focused users",
                paragraphs: ["Growing platforms often open new service and content opportunities sooner."]
              }
            ]
          }
        ]
      }
    }
  }
];
```

---

## FILE: src\data\catalog-content.ts

`$ext
import type { Locale } from "@/i18n/config";

export const catalogContent = {
  tr: {
    common: {
      categoriesLabel: "Kategoriler",
      toolsLabel: "Araçlar",
      allToolsLabel: "Tüm araçlar",
      relatedToolsLabel: "Benzer araçlar",
      officialSiteLabel: "Resmi siteyi ziyaret et",
      placeholderLabel: "Hazırlanıyor",
      breadcrumbsHome: "Ana sayfa",
      ratingLabel: "Puan",
      pricingLabel: "Fiyat",
      featuresLabel: "Öne çıkan özellikler",
      internalLinksLabel: "İç bağlantılar",
      relatedContentLabel: "İlgili içerikler",
      categoryTagsLabel: "Kategoriler",
      viewDetailsLabel: "İncele"
    },
    categoriesIndex: {
      eyebrow: "Kategori merkezi",
      title: "ToolNova kategori yapısı",
      description:
        "Her kategori, ilgili araçlara ve editoryal içeriklere açılan SEO dostu bir merkez olarak tasarlandı.",
      cardLinkLabel: "Kategoriyi aç"
    },
    categoryDetail: {
      toolsTitle: "Bu kategorideki araçlar",
      toolsDescription:
        "Kategoriye bağlı araçlar listeleme mantığıyla detay sayfalarına bağlanıyor.",
      relatedTitle: "İlgili rehber ve karşılaştırma alanı",
      relatedDescription:
        "Bu blok ileride kategoriye özel rehberleri, liste yazılarını ve karşılaştırma içeriklerini gösterecek.",
      internalLinksTitle: "Bu kategori için iç bağlantılar",
      internalLinksDescription:
        "Kategori sayfaları, araç detayları ve genel araç dizini arasında güçlü bir iç link akışı kurmak için tasarlandı.",
      allToolsLink: "Tüm araçları gör",
      allCategoriesLink: "Tüm kategorilere dön",
      guidesLink: "Rehber merkezine git"
    },
    toolsIndex: {
      eyebrow: "Araç dizini",
      title: "İhtiyacına uygun AI aracını bul",
      description:
        "Araç adını, tool kategorisini, fiyat modelini ve kullanım amacını kullanarak doğru AI aracını birkaç saniyede bulun.",
      filterTitle: "Arama ve filtreler",
      filterDescription:
        "İsim, kategori, fiyat modeli ve kullanım amacına göre sonuçları sayfa yenilemeden daraltın.",
      searchLabel: "Araç ara",
      searchPlaceholder: "Örn. ChatGPT, video, içerik, öğrenciler",
      searchHelp: "Araç adı, açıklama, kategori veya kullanım amacı yazarak sonuçları filtreleyin.",
      toolCategoryLabel: "Araç kategorisi",
      useCaseLabel: "Kullanım amacı",
      pricingFilterLabel: "Fiyat modeli",
      allToolCategoriesLabel: "Tüm araç kategorileri",
      allUseCasesLabel: "Tüm kullanım amaçları",
      allPricingLabel: "Tüm fiyatlar",
      resetFiltersLabel: "Filtreleri temizle",
      resultsLabel: "uygun araç bulundu",
      emptyTitle: "Sonuç bulunamadı",
      emptyDescription:
        "Aramayı sadeleştirin veya filtreleri temizleyip yeniden deneyin.",
      bestForLabel: "En uygun kullanım"
    },
    toolDetail: {
      overviewTitle: "Genel bakış",
      whyItStandsOutTitle: "Neden öne çıkıyor?",
      prosTitle: "Artıları",
      consTitle: "Eksileri",
      relatedToolsDescription:
        "Aynı veya benzer kategorilerde yer alan diğer araçlar karar verme sürecini hızlandırır.",
      backToTools: "Tüm araçlara dön"
    }
  },
  en: {
    common: {
      categoriesLabel: "Categories",
      toolsLabel: "Tools",
      allToolsLabel: "All tools",
      relatedToolsLabel: "Related tools",
      officialSiteLabel: "Visit official site",
      placeholderLabel: "In progress",
      breadcrumbsHome: "Home",
      ratingLabel: "Rating",
      pricingLabel: "Pricing",
      featuresLabel: "Key features",
      internalLinksLabel: "Internal links",
      relatedContentLabel: "Related content",
      categoryTagsLabel: "Categories",
      viewDetailsLabel: "Review"
    },
    categoriesIndex: {
      eyebrow: "Category hub",
      title: "ToolNova category structure",
      description:
        "Each category is designed as an SEO-friendly hub that connects relevant tools and future editorial content.",
      cardLinkLabel: "Open category"
    },
    categoryDetail: {
      toolsTitle: "Tools in this category",
      toolsDescription:
        "Tools connected to this category are listed in a structure that links directly into detail pages.",
      relatedTitle: "Related guides and comparisons",
      relatedDescription:
        "This placeholder block will later surface category-specific guides, list articles, and comparison content.",
      internalLinksTitle: "Internal linking opportunities",
      internalLinksDescription:
        "Category detail pages are structured to connect tool details, the global tools index, and editorial pages.",
      allToolsLink: "View all tools",
      allCategoriesLink: "Back to all categories",
      guidesLink: "Go to guides"
    },
    toolsIndex: {
      eyebrow: "Tool directory",
      title: "Find the right AI tool faster",
      description:
        "Use search, category, pricing, and use-case filters to narrow the directory and reach the best-fit tool quickly.",
      filterTitle: "Search and filters",
      filterDescription:
        "Refine results instantly by tool name, category, pricing model, and use case.",
      searchLabel: "Search tools",
      searchPlaceholder: "e.g. ChatGPT, video, content, students",
      searchHelp: "Search by tool name, description, category, or use case.",
      toolCategoryLabel: "Tool category",
      useCaseLabel: "Use case",
      pricingFilterLabel: "Pricing",
      allToolCategoriesLabel: "All tool categories",
      allUseCasesLabel: "All use cases",
      allPricingLabel: "All pricing",
      resetFiltersLabel: "Clear filters",
      resultsLabel: "matching tools",
      emptyTitle: "No tools found",
      emptyDescription:
        "Try a broader search or reset the filters to discover more options.",
      bestForLabel: "Best fit"
    },
    toolDetail: {
      overviewTitle: "Overview",
      whyItStandsOutTitle: "Why it stands out",
      prosTitle: "Pros",
      consTitle: "Cons",
      relatedToolsDescription:
        "Other tools in similar categories help users compare options and make decisions faster.",
      backToTools: "Back to all tools"
    }
  }
} as const satisfies Record<
  Locale,
  {
    common: Record<string, string>;
    categoriesIndex: Record<string, string>;
    categoryDetail: Record<string, string>;
    toolsIndex: Record<string, string>;
    toolDetail: Record<string, string>;
  }
>;
```

---

## FILE: src\data\categories.ts

`$ext
import type { CategoryEntry } from "@/types/catalog";

export const categories: CategoryEntry[] = [
  {
    slug: "ai-tools",
    locales: {
      tr: {
        name: "AI araçları",
        description: "Yazı, görsel, video ve verimlilik odaklı yapay zeka araçlarını tek yerde keşfedin.",
        supportText:
          "Bu kategori, farklı kullanım amaçları için öne çıkan araçları, fiyat tiplerini ve kısa değerlendirmeleri bir araya getirir.",
        seoTitle: "AI araçları kategorisi",
        seoDescription:
          "AI araçları kategorisinde popüler yapay zeka araçlarını, fiyat modellerini ve kullanım alanlarını inceleyin."
      },
      en: {
        name: "AI Tools",
        description: "Explore AI products for writing, image generation, video, productivity, and more.",
        supportText:
          "This category groups relevant tools, pricing models, and use cases into one decision-friendly hub.",
        seoTitle: "AI Tools Category",
        seoDescription:
          "Browse leading AI tools, pricing models, and practical use cases inside the AI tools category."
      }
    }
  },
  {
    slug: "make-money-with-ai",
    locales: {
      tr: {
        name: "AI ile para kazanma",
        description: "Freelancer'lar, içerik üreticileri ve dijital iş kuranlar için gelir odaklı AI araçları ve iş akışları.",
        supportText:
          "Bu kategori, hizmet üretimi, otomasyon ve içerik üzerinden gelir elde etmeye odaklanan araçları öne çıkarır.",
        seoTitle: "AI ile para kazanma",
        seoDescription:
          "AI ile para kazanma odaklı araçları, otomasyon fikirlerini ve gelir senaryolarını inceleyin."
      },
      en: {
        name: "Make Money with AI",
        description: "AI tools and workflows tailored for freelancers, creators, and digital businesses.",
        supportText:
          "This category highlights tools that support monetization, service delivery, and scalable content creation.",
        seoTitle: "Make Money with AI",
        seoDescription:
          "Discover AI tools and practical workflows for monetization, freelance services, and digital business growth."
      }
    }
  },
  {
    slug: "comparisons",
    locales: {
      tr: {
        name: "Karşılaştırmalar",
        description: "ChatGPT vs Claude gibi karar vermeyi kolaylaştıran araç karşılaştırmalarını tek yerde görün.",
        supportText:
          "Bu kategori, iki veya daha fazla aracı hız, fiyat, kullanım amacı ve çıktı kalitesi gibi başlıklarda değerlendirir.",
        seoTitle: "AI araç karşılaştırmaları",
        seoDescription:
          "Popüler AI araçlarını karşılaştırın ve hangi aracın hangi kullanım için daha uygun olduğunu bulun."
      },
      en: {
        name: "Comparisons",
        description: "Decision-focused comparisons such as ChatGPT vs Claude and other side-by-side breakdowns.",
        supportText:
          "This category is built for fast tool evaluation across pricing, features, speed, and ideal use cases.",
        seoTitle: "AI Tool Comparisons",
        seoDescription:
          "Compare popular AI tools side by side and decide which platform fits your workflow best."
      }
    }
  },
  {
    slug: "free-tools",
    locales: {
      tr: {
        name: "Ücretsiz araçlar",
        description: "Ücretsiz ve freemium AI araçlarını bütçe dostu seçimler için ayrı bir merkezde keşfedin.",
        supportText:
          "Bu kategori, düşük riskle başlamak isteyen kullanıcılar için ücretsiz başlangıç seçeneklerini netleştirir.",
        seoTitle: "Ücretsiz AI araçları",
        seoDescription:
          "Ücretsiz ve freemium AI araçlarını kategori bazlı inceleyin ve düşük riskli bir başlangıç yapın."
      },
      en: {
        name: "Free Tools",
        description: "Find free and freemium AI tools collected into one budget-friendly discovery layer.",
        supportText:
          "This category helps price-sensitive users start fast with lower-friction tools and practical recommendations.",
        seoTitle: "Free AI Tools",
        seoDescription:
          "Browse free and freemium AI tools by use case and start with budget-friendly options."
      }
    }
  },
  {
    slug: "guides",
    locales: {
      tr: {
        name: "Rehberler",
        description: "Karşılaştırma, nasıl yapılır ve kullanım senaryosu odaklı içerik merkezi.",
        supportText:
          "Bu kategori, bilgi amaçlı içerikleri ve araç seçimini destekleyen uzun form rehberleri kapsar.",
        seoTitle: "AI rehberleri",
        seoDescription:
          "AI rehberleri, karşılaştırmalar ve kullanım senaryolarıyla desteklenen içerikleri inceleyin."
      },
      en: {
        name: "Guides",
        description: "An editorial content hub for comparisons, how-to posts, and real use cases.",
        supportText:
          "This category covers informational content and long-form guides that support tool discovery and evaluation.",
        seoTitle: "AI Guides",
        seoDescription:
          "Explore AI guides, comparisons, and practical use-case content in one place."
      }
    }
  }
];
```

---

## FILE: src\data\comparisons.ts

`$ext
import type { Locale } from "@/i18n/config";

export type ComparisonRow = {
  label: string;
  left: string;
  right: string;
  winner?: "left" | "right" | "tie";
};

export type RelatedComparisonCard = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  highlight: string;
};

export type ComparisonFaqItem = {
  question: string;
  answer: string;
};

export type ComparisonPageContent = {
  title: string;
  summary: string;
  primaryToolSlug: string;
  secondaryToolSlug: string;
  hero: {
    eyebrow: string;
    leftButton: string;
    rightButton: string;
  };
  selectionCards: {
    title: string;
    toolLabel: string;
    description: string;
  }[];
  guidance: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  table: {
    title: string;
    description: string;
    columns: {
      label: string;
      left: string;
      right: string;
    };
    rows: ComparisonRow[];
  };
  midCta: {
    title: string;
    description: string;
    leftButton: string;
    rightButton: string;
  };
  finalVerdict: {
    title: string;
    description: string;
    leftTitle: string;
    leftDescription: string;
    rightTitle: string;
    rightDescription: string;
    leftButton: string;
    rightButton: string;
  };
  faq: {
    title: string;
    description: string;
    items: ComparisonFaqItem[];
  };
  related: {
    title: string;
    description: string;
    cards: RelatedComparisonCard[];
  };
};

export const comparisonContent: Record<Locale, ComparisonPageContent> = {
  tr: {
    title: "ChatGPT vs Claude",
    summary:
      "ChatGPT ve Claude'u yazı kalitesi, hız, kullanım kolaylığı ve günlük iş akışına uyum açısından yan yana değerlendirin.",
    primaryToolSlug: "chatgpt",
    secondaryToolSlug: "claude",
    hero: {
      eyebrow: "Tarafsız karşılaştırma",
      leftButton: "ChatGPT'yi incele",
      rightButton: "Claude'u incele"
    },
    selectionCards: [
      {
        title: "Yeni başlayanlar için",
        toolLabel: "ChatGPT",
        description: "Daha hızlı alışılan arayüzü ve geniş kullanım alanı nedeniyle ilk adımda daha düşük sürtünme sunar."
      },
      {
        title: "Profesyoneller için",
        toolLabel: "Claude",
        description: "Uzun metin, daha kontrollü ton ve detaylı açıklama isteyen kullanıcılar için daha uygun olabilir."
      },
      {
        title: "Hız için",
        toolLabel: "ChatGPT",
        description: "Kısa taslaklar, araştırma ve günlük üretkenlik görevlerinde daha pratik bir akış sağlayabilir."
      },
      {
        title: "Kalite ve yapı için",
        toolLabel: "Claude",
        description: "Uzun form içeriklerde ve daha düzenli anlatım gerektiren işlerde daha dengeli hissettirebilir."
      }
    ],
    guidance: {
      title: "Karar rehberi",
      description: "Tek bir kazanan yerine hangi kullanımda hangi aracın öne çıktığını görün.",
      items: [
        {
          title: "Kim için daha uygun?",
          description: "Geniş kullanım alanı ve hızlı başlangıç isteyenler genelde ChatGPT'ye, uzun yazı ve daha sakin ton isteyenler ise Claude'a daha yakın durur."
        },
        {
          title: "Hangi durumda hangisi daha iyi?",
          description: "Hızlı taslak, araştırma ve çok yönlülükte ChatGPT; uzun açıklama, editorial netlik ve yapılandırılmış cevaplarda Claude öne çıkabilir."
        },
        {
          title: "Kısa özet: hangisini seçmelisin?",
          description: "Önceliğiniz hız ve esneklikse ChatGPT ile başlayın. Önceliğiniz uzun yazı kalitesi ve kontrollü ton ise Claude'u test edin."
        }
      ]
    },
    table: {
      title: "Yan yana karşılaştırma",
      description: "En önemli karar kriterlerini tek tabloda tarayın ve kendi kullanım senaryonuza daha uygun aracı seçin.",
      columns: {
        label: "Kriter",
        left: "ChatGPT",
        right: "Claude"
      },
      rows: [
        {
          label: "En uygun kullanım",
          left: "Genel kullanım, içerik ve araştırma",
          right: "Uzun form içerik ve detaylı açıklama",
          winner: "tie"
        },
        {
          label: "Fiyat",
          left: "Kısmen ücretsiz",
          right: "Kısmen ücretsiz",
          winner: "tie"
        },
        {
          label: "Kullanım kolaylığı",
          left: "Daha hızlı alışılır ve geniş kitleye uygundur",
          right: "Sade ama daha niş bir kullanım hissi verebilir",
          winner: "left"
        },
        {
          label: "Çıktı kalitesi",
          left: "Güçlü ve çok yönlü",
          right: "Daha düzenli ve kontrollü anlatım",
          winner: "right"
        },
        {
          label: "Hız",
          left: "Günlük görevlerde daha pratik akış",
          right: "Daha dikkatli ama bazen daha yavaş",
          winner: "left"
        },
        {
          label: "En iyi kullanım sonucu",
          left: "Hızlı blog taslağı, araştırma özeti, fikir geliştirme",
          right: "Uzun rehber metni, açıklayıcı analiz, editorial düzen",
          winner: "tie"
        }
      ]
    },
    midCta: {
      title: "İkisini de detaylı görmek istersen şimdi aç",
      description: "Araç detay sayfalarına geçerek artıları, eksileri ve kimin için daha uygun olduklarını tarafsız biçimde inceleyebilirsiniz.",
      leftButton: "ChatGPT detay sayfası",
      rightButton: "Claude detay sayfası"
    },
    finalVerdict: {
      title: "Sonuç",
      description: "Bu karşılaştırmada tek bir mutlak kazanan yok. Seçim, önceliğinizin hız mı yoksa daha yapılandırılmış çıktı mı olduğuna göre değişir.",
      leftTitle: "ChatGPT kimler için daha uygun?",
      leftDescription: "Günlük kullanım, hızlı taslak, araştırma ve daha esnek iş akışları arayan kullanıcılar için güçlü bir başlangıç noktasıdır.",
      rightTitle: "Claude kimler için daha uygun?",
      rightDescription: "Uzun yazı, açıklayıcı metinler ve daha sakin ton arayan kullanıcılar ile ekipler için daha iyi bir aday olabilir.",
      leftButton: "ChatGPT'yi karşılaştırmaya göre incele",
      rightButton: "Claude'u karşılaştırmaya göre incele"
    },
    faq: {
      title: "Sık sorulan sorular",
      description: "Karar vermeyi kolaylaştıran kısa ve net cevapları inceleyin.",
      items: [
        {
          question: "ChatGPT mi Claude mu daha iyi?",
          answer: "Tek bir doğru cevap yok. Genel kullanım ve hız için ChatGPT daha uygun olabilir; uzun ve düzenli anlatım için Claude daha iyi hissedilebilir."
        },
        {
          question: "Hangisi yeni başlayanlar için daha uygun?",
          answer: "Çoğu yeni başlayan kullanıcı için ChatGPT daha düşük sürtünmeyle öğrenilebilir bir başlangıç sunar."
        },
        {
          question: "Hangisi daha iyi yazı yazar?",
          answer: "Uzun ve daha kontrollü yazılarda Claude, çok amaçlı ve hızlı yazı akışlarında ise ChatGPT daha uygun olabilir."
        },
        {
          question: "Fiyat açısından fark var mı?",
          answer: "İki araç da freemium mantığıyla denenebildiği için ilk test aşamasında fiyat farkı genelde belirleyici olmaz."
        },
        {
          question: "Hangisi günlük kullanım için daha iyi?",
          answer: "Günlük üretkenlik, hızlı içerik ve araştırma işlerinde ChatGPT daha pratik hissettirebilir."
        }
      ]
    },
    related: {
      title: "İlgili karşılaştırmalar",
      description: "Bir sonraki değerlendirme adımına geçerek karar alanını daraltın.",
      cards: [
        {
          title: "Gemini vs ChatGPT",
          description: "Google ekosistemi ile genel AI asistan deneyimini yan yana görün.",
          href: "/tools/gemini",
          ctaLabel: "Gemini'yi incele",
          highlight: "Verimlilik"
        },
        {
          title: "Midjourney vs DALL·E",
          description: "Görsel kalite ve yaratıcı kontrol açısından iki popüler görsel aracı değerlendirin.",
          href: "/tools/midjourney",
          ctaLabel: "Midjourney'yi incele",
          highlight: "Görsel AI"
        },
        {
          title: "2026'da öne çıkan AI araçları",
          description: "Daha geniş bir liste görmek isterseniz farklı kullanım alanlarında öne çıkan araçlardan başlayın.",
          href: "/categories/ai-tools",
          ctaLabel: "Araç listesini aç",
          highlight: "Genel görünüm"
        }
      ]
    }
  },
  en: {
    title: "ChatGPT vs Claude",
    summary:
      "Compare ChatGPT and Claude side by side across writing quality, speed, usability, and fit for everyday workflows.",
    primaryToolSlug: "chatgpt",
    secondaryToolSlug: "claude",
    hero: {
      eyebrow: "Neutral comparison",
      leftButton: "Review ChatGPT",
      rightButton: "Review Claude"
    },
    selectionCards: [
      {
        title: "For beginners",
        toolLabel: "ChatGPT",
        description: "Its broader familiarity and faster onboarding make it easier for many first-time AI users."
      },
      {
        title: "For professionals",
        toolLabel: "Claude",
        description: "It can feel more suitable for users who want longer-form writing and a steadier communication style."
      },
      {
        title: "For speed",
        toolLabel: "ChatGPT",
        description: "It often feels more practical for fast drafts, research, and general day-to-day execution."
      },
      {
        title: "For quality and structure",
        toolLabel: "Claude",
        description: "It can be a better fit for longer explanations and more structured output."
      }
    ],
    guidance: {
      title: "Decision guide",
      description: "Instead of a single winner, use the scenarios below to choose the better fit for your workflow.",
      items: [
        {
          title: "Who is each tool better for?",
          description: "Users who want broader flexibility often lean toward ChatGPT, while users who care more about long-form clarity may prefer Claude."
        },
        {
          title: "In which situations is each tool stronger?",
          description: "ChatGPT tends to feel stronger in quick drafting and versatility, while Claude often stands out in structured long-form writing."
        },
        {
          title: "Short summary: which one should you pick?",
          description: "Choose ChatGPT if speed and flexibility matter most. Choose Claude if long-form quality and a steadier tone matter more."
        }
      ]
    },
    table: {
      title: "Side-by-side comparison",
      description: "Scan the main decision criteria in one table and choose the better fit for your own use case.",
      columns: {
        label: "Criteria",
        left: "ChatGPT",
        right: "Claude"
      },
      rows: [
        {
          label: "Best-fit use case",
          left: "General use, content, and research",
          right: "Long-form content and detailed explanation",
          winner: "tie"
        },
        {
          label: "Pricing",
          left: "Freemium",
          right: "Freemium",
          winner: "tie"
        },
        {
          label: "Ease of use",
          left: "Broader familiarity and faster onboarding",
          right: "Clean but slightly more niche feeling",
          winner: "left"
        },
        {
          label: "Output quality",
          left: "Strong and versatile",
          right: "More structured and measured",
          winner: "right"
        },
        {
          label: "Speed",
          left: "More practical in daily execution",
          right: "More careful but sometimes slower",
          winner: "left"
        },
        {
          label: "Best outcome",
          left: "Fast blog drafts, summaries, ideation",
          right: "Long guides, detailed analysis, editorial clarity",
          winner: "tie"
        }
      ]
    },
    midCta: {
      title: "Open both detail pages before you decide",
      description: "Review pros, cons, and audience fit on each tool page before clicking out.",
      leftButton: "ChatGPT detail page",
      rightButton: "Claude detail page"
    },
    finalVerdict: {
      title: "Final verdict",
      description: "There is no single universal winner here. The better choice depends on whether your priority is speed or more structured long-form output.",
      leftTitle: "Who is ChatGPT better for?",
      leftDescription: "Users who want faster drafting, broader day-to-day flexibility, and lower friction across many workflows.",
      rightTitle: "Who is Claude better for?",
      rightDescription: "Users and teams that care more about long-form clarity, explanation quality, and steadier structure.",
      leftButton: "Review ChatGPT based on this comparison",
      rightButton: "Review Claude based on this comparison"
    },
    faq: {
      title: "Frequently asked questions",
      description: "Short and practical answers to the most common decision questions.",
      items: [
        {
          question: "Is ChatGPT or Claude better?",
          answer: "There is no single correct answer. ChatGPT may be a better fit for speed and versatility, while Claude may be stronger for long-form clarity."
        },
        {
          question: "Which one is better for beginners?",
          answer: "For many beginners, ChatGPT feels easier to learn because the workflow is more familiar."
        },
        {
          question: "Which one writes better?",
          answer: "Claude often feels stronger for longer and more structured writing, while ChatGPT is more flexible across formats."
        },
        {
          question: "Is there a pricing difference?",
          answer: "Both tools can be tested through freemium access, so pricing is usually not the main difference at the start."
        },
        {
          question: "Which one is better for daily use?",
          answer: "ChatGPT usually feels more practical for daily productivity, quick research, and fast drafting."
        }
      ]
    },
    related: {
      title: "Related comparisons",
      description: "Move into the next evaluation step and narrow the decision faster.",
      cards: [
        {
          title: "Gemini vs ChatGPT",
          description: "Compare Google-native productivity with the broader AI assistant experience.",
          href: "/tools/gemini",
          ctaLabel: "Review Gemini",
          highlight: "Productivity"
        },
        {
          title: "Midjourney vs DALL·E",
          description: "Explore image quality and creative control across two popular visual AI options.",
          href: "/tools/midjourney",
          ctaLabel: "Review Midjourney",
          highlight: "Image AI"
        },
        {
          title: "AI tools gaining momentum in 2026",
          description: "Start from a broader shortlist if you want to compare more than two options.",
          href: "/categories/ai-tools",
          ctaLabel: "Open tool list",
          highlight: "Overview"
        }
      ]
    }
  }
};

export function getComparisonContent(locale: Locale) {
  return comparisonContent[locale];
}
```

---

## FILE: src\data\home.ts

`$ext
import type { Locale } from "@/i18n/config";
import type {
  CategoryCard,
  ComparisonCard,
  ConversionListItem,
  GuideCard,
  ToolCard
} from "@/types/home";

type HeroStat = {
  value: string;
  label: string;
};

type HeroPanelItem = {
  title: string;
  meta: string;
  value: string;
};

export type HomeContent = {
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    panelEyebrow: string;
    trustBadges: string[];
    stats: HeroStat[];
    panelTitle: string;
    panelDescription: string;
    panelItems: HeroPanelItem[];
    panelFootnote: string;
  };
  topPick: {
    badge: string;
    title: string;
    description: string;
    reasonLabel: string;
    reason: string;
    useCaseLabel: string;
    useCase: string;
    ctaLabel: string;
    ctaHref: string;
  };
  sections: {
    highIntent: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
    };
    socialProof: {
      eyebrow: string;
      title: string;
      description: string;
    };
    categories: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
    };
    tools: {
      eyebrow: string;
      title: string;
      description: string;
      detailLabel: string;
      tryLabel: string;
      bestForLabel: string;
      ratingLabel: string;
    };
    hotTools: {
      eyebrow: string;
      title: string;
      description: string;
    };
    makeMoney: {
      eyebrow: string;
      title: string;
      description: string;
    };
    comparisons: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
      actionLabel: string;
      columns: {
        tool: string;
        bestFor: string;
        price: string;
        outcome: string;
        rating: string;
        action: string;
      };
    };
    guides: {
      eyebrow: string;
      title: string;
      description: string;
      linkLabel: string;
    };
    newsletter: {
      eyebrow: string;
      title: string;
      description: string;
      inputLabel: string;
      placeholder: string;
      buttonLabel: string;
      disclaimer: string;
    };
    finalCta: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  socialProofStats: HeroStat[];
  highIntentCards: ComparisonCard[];
  categories: CategoryCard[];
  tools: ToolCard[];
  hotTools: ConversionListItem[];
  moneyTools: ConversionListItem[];
  comparisons: ComparisonCard[];
  guides: GuideCard[];
};

const homeContent: Record<Locale, HomeContent> = {
  tr: {
    hero: {
      badge: "AI araç rehberi",
      title: "Doğru AI aracını saniyeler içinde bul, karşılaştır ve güvenle seç",
      description:
        "Farklı kullanım senaryolarına göre sıralanmış, ücretsiz ve ücretli AI araçlarını karşılaştır ve sana uygun olanı seç.",
      primaryCta: "🔥 AI araçlarını keşfet",
      secondaryCta: "⚡ Karşılaştırmaları incele",
      panelEyebrow: "Karar paneli",
      trustBadges: ["🔥 Trend", "💰 Para kazandıran AI", "⚡ En çok kullanılanlar"],
      stats: [
        { value: "120+", label: "AI araç" },
        { value: "10.000+", label: "aktif kullanıcı sinyali" },
        { value: "Haftalık", label: "güncellenen veriler" }
      ],
      panelTitle: "Daha hızlı karar verin",
      panelDescription:
        "Araçları fiyat, kullanım alanı ve sonuç gücüne göre karşılaştırın; en doğru araca birkaç saniyede gidin.",
      panelItems: [
        { title: "Fiyat sinyali", meta: "ücretsiz, kısmen ücretsiz ve ücretli seçenekleri ayırın", value: "Net" },
        { title: "Kazanç odağı", meta: "para kazandıran kullanım senaryolarını öne alın", value: "Gelir" },
        { title: "Karşılaştırma hızı", meta: "öne çıkan araçlara tek tıkla ulaşın", value: "Hız" }
      ],
      panelFootnote: "ToolNova, daha çok tıklama ve daha hızlı karar için tasarlanmış modern bir AI araç platformudur."
    },
    topPick: {
      badge: "Öne çıkan",
      title: "Çoğu kullanıcı için güvenli başlangıç: ChatGPT",
      description:
        "Hız, çok yönlülük ve düşük öğrenme eşiği sayesinde çoğu kullanıcı için en güvenli başlangıç noktası olmaya devam ediyor.",
      reasonLabel: "Neden öne çıkıyor?",
      reason: "Yazma, araştırma, özetleme ve günlük üretkenlik işlerini tek araçta birleştirerek en hızlı değer üreten seçeneklerden biri olduğu için.",
      useCaseLabel: "En iyi kullanım",
      useCase: "İçerik üreticileri, freelancer'lar, öğrenciler ve küçük ekipler.",
      ctaLabel: "Ücretsiz başla",
      ctaHref: "/tools/chatgpt"
    },
    sections: {
      highIntent: {
        eyebrow: "En çok tıklananlar",
        title: "Karar aşamasındaki kullanıcıların ilk baktığı sayfalar",
        description: "Karşılaştırma ve liste sayfalarıyla kullanıcıyı daha az sürtünmeyle doğru araca yönlendirin.",
        linkLabel: "İncele"
      },
      socialProof: {
        eyebrow: "Güven sinyali",
        title: "Binlerce kullanıcı doğru AI aracını ToolNova ile buluyor",
        description:
          "Gerçek kullanım senaryolarına göre sıralanan araçlar, haftalık güncellemeler ve net kategori yapısı ile kullanıcıyı daha hızlı doğru seçime götürün."
      },
      categories: {
        eyebrow: "Kategoriler",
        title: "En çok kullanılan AI kategorilerine tek ekrandan girin",
        description: "Yazı, görsel, video ve gelir odaklı kullanım alanlarında en doğru başlangıç noktasını bulun.",
        linkLabel: "Bu kategoriyi keşfet"
      },
      tools: {
        eyebrow: "Öne çıkan araçlar",
        title: "Araçları karşılaştır, güçlü yönlerini gör ve doğru seçeneği seç",
        description:
          "Kartlar; fiyat modeli, kullanım alanı, sonuç potansiyeli ve dikkat çeken CTA'larla tıklamayı hızlandıracak şekilde tasarlandı.",
        detailLabel: "İncele",
        tryLabel: "Ücretsiz başla",
        bestForLabel: "En iyi kullanım",
        ratingLabel: "Puan"
      },
      hotTools: {
        eyebrow: "2026",
        title: "🔥 En çok kullanılan AI araçları (2026)",
        description: "En çok ilgi gören, sık tercih edilen ve son dönemde hızlı büyüyen AI araçları."
      },
      makeMoney: {
        eyebrow: "Gelir odaklı seçimler",
        title: "💰 Para kazandıran AI araçları",
        description: "İçerik üretimi, otomasyon ve freelance iş akışlarında gelir üretmeye yardımcı olabilecek araçları görün."
      },
      comparisons: {
        eyebrow: "Karşılaştırma tablosu",
        title: "Kararı hızlandıran kısa tablo",
        description: "Araçların hangi kullanım sonucunda öne çıktığını tek bakışta görün ve daha bilinçli seçim yapın.",
        linkLabel: "Karşılaştırmayı aç",
        actionLabel: "İncele",
        columns: {
          tool: "Araç",
          bestFor: "En iyi kullanım",
          price: "Fiyat",
          outcome: "En iyi kullanım sonucu",
          rating: "Puan",
          action: "İşlem"
        }
      },
      guides: {
        eyebrow: "Rehberler",
        title: "Rehberler",
        description: "İleride yayınlanacak rehber içerikler için ayrılan alan.",
        linkLabel: "Aç"
      },
      newsletter: {
        eyebrow: "Bülten",
        title: "Yeni araçları takip edin",
        description: "Yeni araçları ve güncellemeleri kaçırmamak için e-posta listesine katılın.",
        inputLabel: "E-posta",
        placeholder: "ornek@mail.com",
        buttonLabel: "Kaydol",
        disclaimer: "İstediğiniz zaman çıkabilirsiniz."
      },
      finalCta: {
        eyebrow: "Hemen başla",
        title: "Öne çıkan AI araçlarını şimdi keşfet ve sana uygun olana ilerle",
        description: "Kategori sayfalarından ilerleyin ya da tüm araç dizinine geçip uygun seçeneği daha hızlı bulun.",
        primaryCta: "Kategorileri keşfet",
        secondaryCta: "Araçları incele"
      }
    },
    socialProofStats: [
      { value: "10.000+", label: "kullanıcı" },
      { value: "Her hafta", label: "güncellenen araçlar" },
      { value: "Gerçek", label: "kullanım senaryolarına göre sıralama" }
    ],
    highIntentCards: [
      {
        icon: "VS",
        eyebrow: "Popüler",
        title: "ChatGPT vs Claude",
        description: "Hız, kalite ve kullanım kolaylığı açısından en çok tıklanan karşılaştırma.",
        href: "/categories/comparisons",
        highlight: "Popüler"
      },
      {
        icon: "MJ",
        eyebrow: "Görsel",
        title: "Midjourney vs DALL·E",
        description: "Görsel üretim ve satış odaklı kullanıcıların sık açtığı karşılaştırma.",
        href: "/categories/comparisons",
        highlight: "Hızlı"
      },
      {
        icon: "AI",
        eyebrow: "2026",
        title: "2026'da öne çıkan AI araçları",
        description: "Farklı kullanım alanlarında öne çıkan seçenekleri tek listede görmek isteyen kullanıcılar için başlangıç noktası.",
        href: "/categories/ai-tools",
        highlight: "CTR"
      },
      {
        icon: "FR",
        eyebrow: "Ücretsiz",
        title: "Ücretsiz AI araçları",
        description: "Ücret ödemeden başlamak isteyen kullanıcılar için en çok açılan kategori.",
        href: "/categories/free-tools",
        highlight: "Kolay"
      }
    ],
    categories: [
      {
        icon: "WR",
        eyebrow: "Yazı",
        title: "Yazı araçları",
        description: "Metin üretimi, yeniden yazım, özetleme ve araştırma odaklı araçları inceleyin.",
        href: "/categories/ai-tools",
        metric: "Popüler",
        bestFor: "Blog, metin ve e-posta yazımı"
      },
      {
        icon: "IM",
        eyebrow: "Görsel",
        title: "Görsel araçlar",
        description: "Görsel üretim, konsept tasarım ve yaratıcı denemeler için güçlü araçları bulun.",
        href: "/categories/ai-tools",
        metric: "Görsel",
        bestFor: "Görsel üretim ve tasarım"
      },
      {
        icon: "VD",
        eyebrow: "Video",
        title: "Video araçları",
        description: "Kısa video, reklam kreatifi ve kurgu odaklı AI araçlarını keşfedin.",
        href: "/categories/ai-tools",
        metric: "Video",
        bestFor: "Video üretimi ve kurgu"
      },
      {
        icon: "BS",
        eyebrow: "Gelir",
        title: "İş araçları",
        description: "Operasyon, verimlilik ve büyüme odaklı AI çözümlerini görün.",
        href: "/categories/make-money-with-ai",
        metric: "İş",
        bestFor: "İş akışları ve büyüme"
      }
    ],
    tools: [
      {
        icon: "CG",
        name: "ChatGPT",
        description: "Yazma, araştırma ve günlük üretkenlik için çok yönlü AI asistanı.",
        category: "AI asistanı",
        pricing: "Freemium",
        href: "/tools/chatgpt",
        websiteUrl: "https://example.com/chatgpt",
        rating: "4.9/5",
        note: "Popüler seçim",
        bestFor: "İçerik, araştırma ve günlük görevler",
        benefit: "Tek araçla hızlı başlamak ve çoğu kullanım senaryosunu kapsamak isteyenler için ideal.",
        comparisonOutcome: "Blog yazıp para kazanma",
        editorNote: "Yeni başlayanlar için en kolay AI araçlarından biri ve en geniş kullanım alanını sunuyor.",
        useCaseTags: ["Blog yazma", "Freelance çalışma", "Otomasyon"],
        ctaLabel: "Ücretsiz Başla",
        socialProofBadges: ["Popüler"]
      },
      {
        icon: "CL",
        name: "Claude",
        description: "Uzun içerikler ve dikkatli anlatım isteyen ekipler için güçlü seçenek.",
        category: "AI yazı",
        pricing: "Freemium",
        href: "/tools/claude",
        websiteUrl: "https://example.com/claude",
        rating: "4.8/5",
        note: "Uzun içerik",
        bestFor: "Uzun içerik ve detaylı açıklamalar",
        benefit: "Daha sakin ton, daha net yapı ve uzun metin performansı isteyen kullanıcılar için güçlü.",
        comparisonOutcome: "Freelance müşteri işleri kazanma",
        editorNote: "Detaylı içerik ve açıklama kalitesi arayan kullanıcılar için güven veren seçeneklerden biri.",
        useCaseTags: ["Blog yazma", "Freelance çalışma"],
        ctaLabel: "Ücretsiz başla",
        socialProofBadges: ["Büyüyor"]
      },
      {
        icon: "MJ",
        name: "Midjourney",
        description: "Konsept görseller ve yaratıcı üretim için öne çıkan görsel AI platformu.",
        category: "AI görsel",
        pricing: "Ücretli",
        href: "/tools/midjourney",
        websiteUrl: "https://example.com/midjourney",
        rating: "4.8/5",
        note: "Görsel kalite",
        bestFor: "Görsel üretim ve konsept tasarım",
        benefit: "Görsel kaliteyi öne alan üreticiler ve tasarım ekipleri için güçlü bir seçenektir.",
        comparisonOutcome: "Görsel üretip satma",
        editorNote: "Görsel kaliteye önem veren kullanıcılar için en dikkat çekici seçeneklerden biri.",
        useCaseTags: ["Görsel üretim", "Freelance çalışma"],
        ctaLabel: "İncele",
        socialProofBadges: ["Gelir"]
      },
      {
        icon: "GM",
        name: "Gemini",
        description: "Google ekosistemiyle uyumlu, arama ve verimlilik odaklı AI deneyimi.",
        category: "AI verimlilik",
        pricing: "Freemium",
        href: "/tools/gemini",
        websiteUrl: "https://example.com/gemini",
        rating: "4.6/5",
        note: "Google uyumu",
        bestFor: "Google merkezli iş akışları",
        benefit: "Google araçlarıyla çalışan kullanıcılar için düşük sürtünmeli ve pratik bir deneyim sağlar.",
        comparisonOutcome: "Araştırma ve hızlı çıktı üretme",
        editorNote: "Google ürünleri kullanan ekipler için adaptasyonu en kolay araçlardan biri.",
        useCaseTags: ["Otomasyon", "Blog yazma"],
        ctaLabel: "Ücretsiz başla",
        socialProofBadges: ["Büyüyor"]
      }
    ],
    hotTools: [
      {
        icon: "CG",
        badge: "Trend",
        title: "ChatGPT",
        description: "En çok kullanılan genel amaçlı AI aracı olarak hâlâ ilk sırada.",
        benefit: "İçerik üretiminden araştırmaya kadar tek araçta hızlı sonuç isteyen kullanıcılar için güçlü başlangıç.",
        href: "/tools/chatgpt",
        ctaLabel: "Ücretsiz Başla"
      },
      {
        icon: "CL",
        badge: "Büyüyor",
        title: "Claude",
        description: "Uzun ve daha dengeli içeriklerde hızla büyüyen güçlü bir alternatif.",
        benefit: "Freelance yazı işleri, raporlar ve detaylı açıklama isteyen kullanıcılar için güçlü tercih.",
        href: "/tools/claude",
        ctaLabel: "Ücretsiz başla"
      },
      {
        icon: "MJ",
        badge: "Gelir",
        title: "Midjourney",
        description: "Görsel kalite ve yaratıcı sonuçlarda en çok konuşulan araçlardan biri.",
        benefit: "Konsept tasarım, sosyal medya kreatifi ve satılabilir görsel üretimi için güçlü bir gelir kapısı sunar.",
        href: "/tools/midjourney",
        ctaLabel: "İncele"
      }
    ],
    moneyTools: [
      {
        icon: "WR",
        badge: "İçerik",
        title: "ChatGPT ile içerik üretimi",
        description: "Blog, e-posta ve satış odaklı metin üretiminde hızlı çıktı verir.",
        benefit: "Blog yazıp para kazanma, müşteri içerikleri üretme ve hızlı teslim süreçleri için güçlü bir seçenektir.",
        href: "/tools/chatgpt",
        ctaLabel: "Ücretsiz Başla"
      },
      {
        icon: "NT",
        badge: "Otomasyon",
        title: "Notion AI ile iş akışı hızlandırma",
        description: "Doküman, planlama ve ekip süreçlerini daha az eforla yürütmeye yardımcı olur.",
        benefit: "İç süreçleri otomatikleştirip daha fazla müşteri işi yönetmek isteyen kullanıcılar için yüksek verim sağlar.",
        href: "/tools/notion-ai",
        ctaLabel: "Ücretsiz başla"
      },
      {
        icon: "RW",
        badge: "Freelance",
        title: "Runway ile video üretip satış yapma",
        description: "Kısa video, reklam kreatifi ve freelance video üretimi için güçlü araç seti sunar.",
        benefit: "Ajans işleri, sosyal medya videoları ve hızlı kreatif teslim süreçlerinde gelir potansiyeli üretir.",
        href: "/tools/runway",
        ctaLabel: "İncele"
      }
    ],
    comparisons: [
      {
        icon: "VS",
        eyebrow: "Popüler",
        title: "ChatGPT vs Claude",
        description: "Yazma kalitesi ve kullanım kolaylığı açısından en çok karşılaştırılan iki araç.",
        href: "/categories/comparisons",
        highlight: "Popüler"
      },
      {
        icon: "MJ",
        eyebrow: "Görsel",
        title: "Midjourney vs DALL·E",
        description: "Görsel kalite ve yaratıcı kontrol tarafında sık aranan karşılaştırma içeriği.",
        href: "/categories/comparisons",
        highlight: "Gelir"
      }
    ],
    guides: []
  },
  en: {
    hero: {
      badge: "AI tool directory",
      title: "Find the right AI tool in seconds and compare it with confidence",
      description:
        "Compare the best free and paid AI tools ranked by real user demand and start using the right one right away.",
      primaryCta: "🔥 Explore AI tools",
      secondaryCta: "⚡ Review comparisons",
      panelEyebrow: "Decision panel",
      trustBadges: ["🔥 Trending", "💰 Money-making AI", "⚡ Most used"],
      stats: [
        { value: "120+", label: "AI tools" },
        { value: "10,000+", label: "user signals" },
        { value: "Weekly", label: "fresh updates" }
      ],
      panelTitle: "Decide faster",
      panelDescription:
        "Compare tools by price, use case, and output strength so users can reach the right click in seconds.",
      panelItems: [
        { title: "Pricing signal", meta: "separate free, freemium, and paid options instantly", value: "Clear" },
        { title: "Revenue focus", meta: "highlight workflows that can generate income", value: "Money" },
        { title: "Comparison speed", meta: "jump into the strongest tools with less friction", value: "Fast" }
      ],
      panelFootnote: "ToolNova is built to drive stronger clicks and faster AI tool decisions."
    },
    topPick: {
      badge: "Featured pick",
      title: "A common starting point for many users: ChatGPT",
      description:
        "Still the safest starting point for most users thanks to speed, versatility, and low learning friction.",
      reasonLabel: "Why it stands out",
      reason: "It combines writing, research, summaries, and daily execution in one tool, making it one of the fastest value generators.",
      useCaseLabel: "Best for",
      useCase: "Creators, freelancers, students, and small teams.",
      ctaLabel: "Start free",
      ctaHref: "/tools/chatgpt"
    },
    sections: {
      highIntent: {
        eyebrow: "Top click intent",
        title: "The pages ready-to-decide users open the most",
        description: "Send high-intent visitors into comparison and list pages that produce faster action.",
        linkLabel: "Review"
      },
      socialProof: {
        eyebrow: "Trust signal",
        title: "A cleaner AI discovery flow backed by 10,000+ user signals",
        description:
          "Weekly updates, clear pricing labels, and fast comparison flows move users toward action with less friction."
      },
      categories: {
        eyebrow: "Categories",
        title: "Jump into the most-used AI categories from one screen",
        description: "Move into writing, image, video, and money-focused workflows faster.",
        linkLabel: "Explore this category"
      },
      tools: {
        eyebrow: "Featured tools",
        title: "Compare leading tools and choose the right fit faster",
        description:
          "Cards are built to surface pricing, use case fit, and output potential so users know what to click next.",
        detailLabel: "Review",
        tryLabel: "Start free",
        bestForLabel: "Best for",
        ratingLabel: "Rating"
      },
      hotTools: {
        eyebrow: "2026 shortlist",
        title: "🔥 Most used AI tools (2026)",
        description: "The tools users choose most and the products growing the fastest"
      },
      makeMoney: {
        eyebrow: "Revenue-focused picks",
        title: "💰 AI tools that can help make money",
        description: "Highlight tools that support content production, automation, and freelance delivery."
      },
      comparisons: {
        eyebrow: "Comparison table",
        title: "The faster comparison layer",
        description: "Show which tool produces what kind of result so users can move to the best option faster.",
        linkLabel: "Open comparison",
        actionLabel: "Review",
        columns: {
          tool: "Tool",
          bestFor: "Best for",
          price: "Price",
          outcome: "Best outcome",
          rating: "Rating",
          action: "Action"
        }
      },
      guides: {
        eyebrow: "Guides",
        title: "Guides",
        description: "Reserved space for future editorial content.",
        linkLabel: "Open"
      },
      newsletter: {
        eyebrow: "Newsletter",
        title: "Stay updated",
        description: "Join the list to follow new tools and major updates.",
        inputLabel: "Email",
        placeholder: "name@example.com",
        buttonLabel: "Subscribe",
        disclaimer: "Unsubscribe anytime."
      },
      finalCta: {
        eyebrow: "Start now",
        title: "Discover AI tools and move toward the right fit faster",
        description: "Start from categories or jump straight into the tool directory to find the best option faster.",
        primaryCta: "Explore categories",
        secondaryCta: "Review tools"
      }
    },
    socialProofStats: [
      { value: "120+", label: "comparable tools" },
      { value: "10,000+", label: "user signals" },
      { value: "24/7", label: "decision support" },
      { value: "Weekly", label: "fresh updates" }
    ],
    highIntentCards: [
      {
        icon: "VS",
        eyebrow: "Popular",
        title: "ChatGPT vs Claude",
        description: "The most-opened comparison for users choosing between speed and writing quality.",
        href: "/categories/comparisons",
        highlight: "Popular"
      },
      {
        icon: "MJ",
        eyebrow: "Image",
        title: "Midjourney vs DALL·E",
        description: "A visual AI comparison often opened by creators and buyers ready to test.",
        href: "/categories/comparisons",
        highlight: "Fast"
      },
      {
        icon: "AI",
        eyebrow: "2026",
        title: "Best AI tools 2026",
        description: "A strong starting point for users who want a broader shortlist first.",
        href: "/categories/ai-tools",
        highlight: "CTR"
      },
      {
        icon: "FR",
        eyebrow: "Free",
        title: "Free AI tools",
        description: "The most-opened category for users who want to start without paying first.",
        href: "/categories/free-tools",
        highlight: "Easy"
      }
    ],
    categories: [
      {
        icon: "WR",
        eyebrow: "Writing",
        title: "Writing tools",
        description: "Explore tools for faster copy, summaries, research, and content production.",
        href: "/categories/ai-tools",
        metric: "Popular",
        bestFor: "Blog, email, and copywriting"
      },
      {
        icon: "IM",
        eyebrow: "Image",
        title: "Image tools",
        description: "Find stronger options for visual generation, concept work, and design exploration.",
        href: "/categories/ai-tools",
        metric: "Visual",
        bestFor: "Image generation and design"
      },
      {
        icon: "VD",
        eyebrow: "Video",
        title: "Video tools",
        description: "Discover tools for short-form production, ad creatives, and editing speed.",
        href: "/categories/ai-tools",
        metric: "Video",
        bestFor: "Video generation and editing"
      },
      {
        icon: "BS",
        eyebrow: "Revenue",
        title: "Business tools",
        description: "See AI products built for operations, productivity, and growth.",
        href: "/categories/make-money-with-ai",
        metric: "Business",
        bestFor: "Business workflows and growth"
      }
    ],
    tools: [
      {
        icon: "CG",
        name: "ChatGPT",
        description: "A versatile AI assistant for writing, research, and daily productivity.",
        category: "AI assistant",
        pricing: "Freemium",
        href: "/tools/chatgpt",
        websiteUrl: "https://example.com/chatgpt",
        rating: "4.9/5",
        note: "Popular pick",
        bestFor: "Content, research, and daily tasks",
        benefit: "A strong default option for users who want one tool to cover the most common workflows.",
        comparisonOutcome: "Publish blog content faster",
        editorNote: "One of the easiest entry points for first-time AI users with the broadest everyday value.",
        useCaseTags: ["Blog writing", "Freelance work", "Automation"],
        ctaLabel: "Start Free",
        socialProofBadges: ["Popular"]
      },
      {
        icon: "CL",
        name: "Claude",
        description: "A strong option for long-form writing and more careful explanations.",
        category: "AI writing",
        pricing: "Freemium",
        href: "/tools/claude",
        websiteUrl: "https://example.com/claude",
        rating: "4.8/5",
        note: "Long-form",
        bestFor: "Long-form content and detailed reasoning",
        benefit: "Great for users who care about calmer tone, stronger structure, and thoughtful output.",
        comparisonOutcome: "Win freelance writing work",
        editorNote: "A trustworthy option for users who prioritize detail, structure, and long-form quality.",
        useCaseTags: ["Blog writing", "Freelance work"],
        ctaLabel: "Start free",
        socialProofBadges: ["Fast"]
      },
      {
        icon: "MJ",
        name: "Midjourney",
        description: "A premium visual AI platform for concept images and creative output.",
        category: "AI image",
        pricing: "Paid",
        href: "/tools/midjourney",
        websiteUrl: "https://example.com/midjourney",
        rating: "4.8/5",
        note: "Visual quality",
        bestFor: "Image generation and concept design",
        benefit: "A strong fit for creators and design teams that care about aesthetics and creative control.",
        comparisonOutcome: "Sell generated visuals",
        editorNote: "One of the strongest choices for users who care most about visual quality.",
        useCaseTags: ["Visual creation", "Freelance work"],
        ctaLabel: "Review",
        socialProofBadges: ["Revenue"]
      },
      {
        icon: "GM",
        name: "Gemini",
        description: "A Google-friendly AI experience for search and productivity tasks.",
        category: "AI productivity",
        pricing: "Freemium",
        href: "/tools/gemini",
        websiteUrl: "https://example.com/gemini",
        rating: "4.6/5",
        note: "Google ecosystem fit",
        bestFor: "Google-centered workflows",
        benefit: "Useful for users who want lower friction inside existing Google-based work.",
        comparisonOutcome: "Speed up research and drafts",
        editorNote: "One of the easiest options for teams already working inside Google products.",
        useCaseTags: ["Automation", "Blog writing"],
        ctaLabel: "Start free",
        socialProofBadges: ["Fast"]
      }
    ],
    hotTools: [
      {
        icon: "CG",
        badge: "Trending",
        title: "ChatGPT",
        description: "Still the most-used general AI tool across writing, research, and daily productivity.",
        benefit: "Strong starting point for users who want faster output across the broadest range of tasks.",
        href: "/tools/chatgpt",
        ctaLabel: "Start Free"
      },
      {
        icon: "CL",
        badge: "Fast",
        title: "Claude",
        description: "A fast-rising alternative for long-form clarity and more structured output.",
        benefit: "Useful for freelance writing, reports, and detail-heavy editorial work.",
        href: "/tools/claude",
        ctaLabel: "Start free"
      },
      {
        icon: "MJ",
        badge: "Revenue",
        title: "Midjourney",
        description: "One of the most talked-about tools for strong visual quality and creative control.",
        benefit: "Great for creators selling visuals, concept work, and premium-looking creative assets.",
        href: "/tools/midjourney",
        ctaLabel: "Review"
      }
    ],
    moneyTools: [
      {
        icon: "WR",
        badge: "Content",
        title: "ChatGPT for content production",
        description: "Moves blog, email, and sales copy creation much faster.",
        benefit: "Useful for monetized content, client writing, and recurring editorial delivery.",
        href: "/tools/chatgpt",
        ctaLabel: "Start Free"
      },
      {
        icon: "NT",
        badge: "Automation",
        title: "Notion AI for workflow leverage",
        description: "Helps teams speed up documentation, planning, and internal execution.",
        benefit: "A practical way to reduce time spent on process work and support more client volume.",
        href: "/tools/notion-ai",
        ctaLabel: "Start free"
      },
      {
        icon: "RW",
        badge: "Freelance",
        title: "Runway for video delivery",
        description: "Useful for short videos, ad creatives, and faster freelance production work.",
        benefit: "Strong fit for creators and agencies monetizing fast-turnaround visual content.",
        href: "/tools/runway",
        ctaLabel: "Review"
      }
    ],
    comparisons: [
      {
        icon: "VS",
        eyebrow: "Popular",
        title: "ChatGPT vs Claude",
        description: "A high-intent comparison for users choosing between speed and long-form quality.",
        href: "/categories/comparisons",
        highlight: "Popular"
      },
      {
        icon: "MJ",
        eyebrow: "Image",
        title: "Midjourney vs DALL·E",
        description: "A popular comparison for users evaluating visual output and creative control.",
        href: "/categories/comparisons",
        highlight: "Revenue"
      }
    ],
    guides: []
  }
};

export function getHomeContent(locale: Locale) {
  return homeContent[locale];
}
```

---

## FILE: src\data\static-pages.ts

`$ext
import type { Locale } from "@/i18n/config";

export type StaticPageSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type StaticPageContent = {
  title: string;
  description: string;
  intro: string;
  sections: StaticPageSection[];
};

export const staticPages = {
  tr: {
    about: {
      title: "ToolNova HakkÄ±nda",
      description: "ToolNova'nÄ±n ne olduÄŸunu, neden kurulduÄŸunu ve kullanÄ±cÄ±lar iÃ§in neyi kolaylaÅŸtÄ±rdÄ±ÄŸÄ±nÄ± keÅŸfedin.",
      intro:
        "ToolNova, AI araÃ§larÄ±nÄ± ve SaaS Ã¼rÃ¼nlerini daha hÄ±zlÄ± karÅŸÄ±laÅŸtÄ±rmak, daha gÃ¼venli deÄŸerlendirmek ve doÄŸru aracÄ± daha kÄ±sa sÃ¼rede bulmak iÃ§in oluÅŸturulmuÅŸ iki dilli bir keÅŸif platformudur.",
      sections: [
        {
          title: "ToolNova nedir?",
          paragraphs: [
            "ToolNova; AI araÃ§larÄ±nÄ±, karÅŸÄ±laÅŸtÄ±rmalarÄ±, kullanÄ±m senaryolarÄ±nÄ± ve rehber iÃ§eriklerini tek Ã§atÄ± altÄ±nda toplayan modern bir dizindir.",
            "AmacÄ±mÄ±z, kullanÄ±cÄ±larÄ±n uzun araÅŸtÄ±rma sÃ¼reÃ§lerini kÄ±saltÄ±p karar verme aÅŸamasÄ±nÄ± daha net, daha hÄ±zlÄ± ve daha gÃ¼venilir hale getirmektir."
          ]
        },
        {
          title: "Misyonumuz",
          paragraphs: [
            "Yapay zeka araÃ§larÄ± hÄ±zla Ã§oÄŸalÄ±rken doÄŸru aracÄ± seÃ§mek zorlaÅŸÄ±yor. ToolNova'nÄ±n misyonu, bu karmaÅŸayÄ± sadeleÅŸtirmek ve her kullanÄ±cÄ±ya ihtiyacÄ±na uygun aracÄ± bulmasÄ± iÃ§in net sinyaller sunmaktÄ±r."
          ],
          bullets: [
            "AraÃ§larÄ± daha kolay karÅŸÄ±laÅŸtÄ±rÄ±labilir hale getirmek",
            "GerÃ§ek kullanÄ±m odaklÄ± deÄŸerlendirmeler sunmak",
            "BaÅŸlayanlar ve profesyoneller iÃ§in daha hÄ±zlÄ± karar deneyimi oluÅŸturmak"
          ]
        }
      ]
    },
    contact: {
      title: "Ä°letiÅŸim",
      description: "ToolNova ile iletiÅŸime geÃ§mek, iÅŸ birliÄŸi Ã¶nermek veya geri bildirim paylaÅŸmak iÃ§in bu sayfayÄ± kullanÄ±n.",
      intro:
        "Soru, geri bildirim, iÅŸ birliÄŸi veya dÃ¼zeltme talepleriniz iÃ§in bizimle iletiÅŸime geÃ§ebilirsiniz. ToolNova bÃ¼yÃ¼dÃ¼kÃ§e kullanÄ±cÄ± geri bildirimlerini aktif olarak dikkate alÄ±yoruz.",
      sections: [
        {
          title: "Ä°letiÅŸim bilgileri",
          bullets: [
            "E-posta: hello@toolnova.com",
            "Ä°ÅŸ birlikleri: partners@toolnova.com",
            "Genel geri bildirim: feedback@toolnova.com"
          ]
        },
        {
          title: "Ne iÃ§in yazabilirsiniz?",
          bullets: [
            "AraÃ§ bilgisi gÃ¼ncelleme talepleri",
            "Affiliate ve iÅŸ birliÄŸi teklifleri",
            "Ä°Ã§erik dÃ¼zeltmeleri ve geri bildirimler",
            "Reklam ve sponsorluk gÃ¶rÃ¼ÅŸmeleri"
          ]
        }
      ]
    },
    privacyPolicy: {
      title: "Gizlilik PolitikasÄ±",
      description: "ToolNova'nÄ±n hangi verileri neden topladÄ±ÄŸÄ±nÄ± ve bunlarÄ± nasÄ±l koruduÄŸunu Ã¶ÄŸrenin.",
      intro:
        "ToolNova, kullanÄ±cÄ± gizliliÄŸine Ã¶nem verir. Bu politika, hangi temel bilgilerin toplanabileceÄŸini, bunlarÄ±n nasÄ±l kullanÄ±ldÄ±ÄŸÄ±nÄ± ve kullanÄ±cÄ± haklarÄ±nÄ± genel hatlarÄ±yla aÃ§Ä±klar.",
      sections: [
        {
          title: "Toplanabilecek bilgiler",
          bullets: [
            "Temel analitik veriler",
            "Cihaz ve tarayÄ±cÄ± bilgileri",
            "Form veya e-posta yoluyla paylaÅŸÄ±lan iletiÅŸim bilgileri"
          ]
        },
        {
          title: "Bu bilgiler neden kullanÄ±lÄ±r?",
          bullets: [
            "Site performansÄ±nÄ± iyileÅŸtirmek",
            "Ä°Ã§erik ve kullanÄ±cÄ± deneyimini geliÅŸtirmek",
            "Geri bildirim veya iletiÅŸim taleplerine yanÄ±t vermek"
          ]
        },
        {
          title: "ÃœÃ§Ã¼ncÃ¼ taraf hizmetler",
          paragraphs: [
            "Ä°leride analitik, reklam veya affiliate sistemleri kullanÄ±labilir. Bu hizmetler kendi gizlilik politikalarÄ±na gÃ¶re Ã§alÄ±ÅŸabilir ve gerektiÄŸinde ayrÄ± bildirimlerle desteklenir."
          ]
        }
      ]
    },
    terms: {
      title: "KullanÄ±m ÅartlarÄ±",
      description: "ToolNova'yÄ± kullanÄ±rken geÃ§erli temel ÅŸartlarÄ± ve sorumluluk sÄ±nÄ±rlarÄ±nÄ± inceleyin.",
      intro:
        "ToolNova Ã¼zerindeki iÃ§erikler bilgilendirme amaÃ§lÄ±dÄ±r. Siteyi kullanarak aÅŸaÄŸÄ±daki temel ÅŸartlarÄ± kabul etmiÅŸ sayÄ±lÄ±rsÄ±nÄ±z.",
      sections: [
        {
          title: "Ä°Ã§erik kullanÄ±mÄ±",
          bullets: [
            "Sitedeki iÃ§erikler genel bilgi ve araÅŸtÄ±rma amaÃ§lÄ±dÄ±r",
            "AraÃ§ seÃ§iminden doÄŸan nihai karar kullanÄ±cÄ±ya aittir",
            "Ä°Ã§eriklerde zaman iÃ§inde gÃ¼ncelleme veya dÃ¼zeltme yapÄ±labilir"
          ]
        },
        {
          title: "Sorumluluk sÄ±nÄ±rÄ±",
          paragraphs: [
            "ToolNova, Ã¼Ã§Ã¼ncÃ¼ taraf araÃ§larÄ±n sunduÄŸu hizmetlerden, fiyat deÄŸiÅŸikliklerinden veya Ã¼rÃ¼n politikalarÄ±ndan doÄŸrudan sorumlu deÄŸildir. KullanÄ±cÄ±larÄ±n resmi Ã¼rÃ¼n sayfalarÄ±nÄ± ayrÄ±ca incelemesi Ã¶nerilir."
          ]
        }
      ]
    },
    affiliateDisclosure: {
      title: "Affiliate aÃ§Ä±klamasÄ±",
      description: "ToolNova Ã¼zerindeki bazÄ± baÄŸlantÄ±larÄ±n affiliate baÄŸlantÄ± olabileceÄŸini ve bunun iÃ§eriÄŸi nasÄ±l etkilediÄŸini Ã¶ÄŸrenin.",
      intro:
        "ToolNova Ã¼zerindeki bazÄ± baÄŸlantÄ±lar affiliate baÄŸlantÄ± olabilir. Bu baÄŸlantÄ±lar Ã¼zerinden iÅŸlem yapÄ±ldÄ±ÄŸÄ±nda komisyon kazanÄ±labilir; ancak bu durum editoryal deÄŸerlendirmeyi belirlemez.",
      sections: [
        {
          title: "Affiliate baÄŸlantÄ±lar nasÄ±l Ã§alÄ±ÅŸÄ±r?",
          paragraphs: [
            "Bir kullanÄ±cÄ± ToolNova Ã¼zerinden Ã¼Ã§Ã¼ncÃ¼ taraf bir araca gider ve uygun bir iÅŸlem yaparsa, ToolNova gelir elde edebilir.",
            "Bu gelir, sitenin geliÅŸtirilmesi, iÃ§erik Ã¼retimi ve kullanÄ±cÄ± deneyiminin iyileÅŸtirilmesi iÃ§in kullanÄ±labilir."
          ]
        },
        {
          title: "Editoryal baÄŸÄ±msÄ±zlÄ±k",
          bullets: [
            "Affiliate iliÅŸkileri iÃ§erik sÄ±ralamasÄ±nÄ± otomatik belirlemez",
            "AraÃ§ deÄŸerlendirmelerinde kullanÄ±m senaryosu ve pratik deÄŸer Ã¶nceliklidir",
            "KullanÄ±cÄ±ya daha net karar verebilmesi iÃ§in gÃ¼Ã§lÃ¼ ve zayÄ±f yÃ¶nler birlikte sunulur"
          ]
        }
      ]
    }
  },
  en: {
    about: {
      title: "About ToolNova",
      description: "Learn what ToolNova is, why it exists, and how it helps users make better tool decisions.",
      intro:
        "ToolNova is a bilingual discovery platform built to help users compare AI tools and SaaS products faster, evaluate them with more confidence, and reach better-fit tools with less friction.",
      sections: [
        {
          title: "What is ToolNova?",
          paragraphs: [
            "ToolNova is a modern directory that brings together AI tools, comparisons, use cases, and guide content in one place.",
            "The platform is designed to reduce research time and make the decision process clearer, faster, and more trustworthy."
          ]
        },
        {
          title: "Our mission",
          paragraphs: [
            "As the AI tools market grows, choosing the right product becomes harder. ToolNova exists to simplify that decision and present clearer signals for every type of user."
          ],
          bullets: [
            "Make tools easier to compare",
            "Highlight decision-focused information over fluff",
            "Help beginners and professionals move faster with more confidence"
          ]
        }
      ]
    },
    contact: {
      title: "Contact",
      description: "Reach ToolNova for feedback, partnerships, updates, or general inquiries.",
      intro:
        "If you have feedback, partnership ideas, corrections, or general questions, you can contact ToolNova through the channels below.",
      sections: [
        {
          title: "Contact details",
          bullets: [
            "Email: hello@toolnova.com",
            "Partnerships: partners@toolnova.com",
            "General feedback: feedback@toolnova.com"
          ]
        },
        {
          title: "Reasons to reach out",
          bullets: [
            "Tool data update requests",
            "Affiliate or partnership inquiries",
            "Content corrections and feedback",
            "Advertising and sponsorship discussions"
          ]
        }
      ]
    },
    privacyPolicy: {
      title: "Privacy Policy",
      description: "Understand what information ToolNova may collect, why it may be used, and how privacy is handled.",
      intro:
        "ToolNova respects user privacy. This policy explains, at a high level, what basic information may be collected, how it may be used, and what users should expect.",
      sections: [
        {
          title: "Information that may be collected",
          bullets: [
            "Basic analytics data",
            "Device and browser information",
            "Contact details shared through forms or email"
          ]
        },
        {
          title: "Why this information may be used",
          bullets: [
            "Improve site performance",
            "Enhance content and user experience",
            "Respond to feedback and contact requests"
          ]
        },
        {
          title: "Third-party services",
          paragraphs: [
            "Analytics, advertising, or affiliate systems may be used in the future. These services may operate under their own privacy policies and can be supported with separate disclosures when needed."
          ]
        }
      ]
    },
    terms: {
      title: "Terms of Use",
      description: "Review the basic terms, conditions, and responsibility boundaries for using ToolNova.",
      intro:
        "Content on ToolNova is provided for informational purposes. By using the site, you acknowledge the general terms below.",
      sections: [
        {
          title: "Content usage",
          bullets: [
            "Site content is intended for research and informational use",
            "Final tool selection decisions remain the responsibility of the user",
            "Content may be updated, corrected, or revised over time"
          ]
        },
        {
          title: "Limitation of responsibility",
          paragraphs: [
            "ToolNova is not directly responsible for third-party product changes, pricing updates, or platform policies. Users should review official product pages before making decisions."
          ]
        }
      ]
    },
    affiliateDisclosure: {
      title: "Affiliate Disclosure",
      description: "Understand how affiliate links may appear on ToolNova and how that relates to editorial content.",
      intro:
        "Some links on ToolNova may be affiliate links. If a user visits a third-party tool and completes a qualifying action, ToolNova may earn a commission. That does not automatically determine the editorial outcome.",
      sections: [
        {
          title: "How affiliate links work",
          paragraphs: [
            "If a user clicks through from ToolNova to a third-party product and completes a qualifying action, ToolNova may receive compensation.",
            "That revenue can help support site improvements, content production, and user experience enhancements."
          ]
        },
        {
          title: "Editorial independence",
          bullets: [
            "Affiliate relationships do not automatically decide rankings",
            "Tool evaluation focuses on use-case fit and practical value",
            "Strengths and limitations are presented together to support better decisions"
          ]
        }
      ]
    }
  }
} as const satisfies Record<
  Locale,
  {
    about: StaticPageContent;
    contact: StaticPageContent;
    privacyPolicy: StaticPageContent;
    terms: StaticPageContent;
    affiliateDisclosure: StaticPageContent;
  }
>;
```

---

## FILE: src\data\tools.ts

`$ext
import type { ToolEntry } from "@/types/catalog";

export const tools: ToolEntry[] = [
  {
    slug: "chatgpt",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/chatgpt",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["content", "business", "students"],
    rating: 4.9,
    featured: true,
    locales: {
      tr: {
        name: "ChatGPT",
        shortDescription: "Yazma, araştırma, fikir geliştirme ve günlük iş akışları için çok yönlü bir AI asistanı.",
        longDescription:
          "ChatGPT; yazı yazma, içerik fikirleri üretme, metin özetleme ve genel bilgi tabanlı işlerde geniş kullanım alanına sahip bir AI asistanıdır. Hem bireysel kullanıcılar hem de ekipler için hızlı prototipleme ve verimlilik desteği sunar.",
        features: [
          "Kısa ve uzun formatlı metin üretimi",
          "Soru-cevap ve araştırma desteği",
          "Özetleme ve yeniden yazım akışları",
          "Esnek prompt tabanlı kullanım"
        ],
        pros: [
          "Çok geniş kullanım alanı sunar",
          "Yeni başlayanlar için öğrenmesi görece kolaydır",
          "İçerik ve araştırma işlerinde hızlı sonuç verir"
        ],
        cons: [
          "Sonuç kalitesi prompt kalitesine bağlı değişebilir",
          "Bazı profesyonel senaryolarda manuel doğrulama gerekir"
        ],
        seoTitle: "ChatGPT incelemesi ve özellikleri",
        seoDescription:
          "ChatGPT hakkında fiyat modeli, özellikler, artılar, eksiler ve benzer araçlarla karşılaştırma bilgilerini inceleyin."
      },
      en: {
        name: "ChatGPT",
        shortDescription: "A versatile AI assistant for writing, research, ideation, and everyday workflows.",
        longDescription:
          "ChatGPT is a flexible AI assistant used for writing, summarization, ideation, and general-purpose productivity tasks. It works well for both solo users and teams that need quick drafting, exploration, and research support.",
        features: [
          "Short- and long-form text generation",
          "Question answering and research support",
          "Summarization and rewriting workflows",
          "Flexible prompt-based usage"
        ],
        pros: [
          "Broad use-case coverage",
          "Easy to start using",
          "Fast output for content and research tasks"
        ],
        cons: [
          "Output quality depends on prompt quality",
          "Some professional workflows still need manual verification"
        ],
        seoTitle: "ChatGPT review and features",
        seoDescription:
          "Explore ChatGPT pricing, features, pros and cons, and how it compares with similar AI tools."
      }
    }
  },
  {
    slug: "claude",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/claude",
    categorySlugs: ["ai-tools", "comparisons", "guides"],
    toolCategorySlugs: ["writing"],
    useCaseSlugs: ["content", "business", "research"],
    rating: 4.8,
    featured: true,
    locales: {
      tr: {
        name: "Claude",
        shortDescription: "Uzun metinler, dikkatli açıklamalar ve düşünme odaklı çıktılar için güçlü bir AI aracı.",
        longDescription:
          "Claude, uzun bağlamlı yazılar, detaylı açıklamalar ve daha temkinli yanıt yapısı gerektiren görevlerde öne çıkan bir AI asistanıdır. Özellikle editorial ekipler, araştırma yapan kullanıcılar ve stratejik içerik üretimi için dikkat çekici bir seçenektir.",
        features: [
          "Uzun metin anlama ve üretme",
          "Daha düzenli ve açık cevap yapısı",
          "Yazı ve araştırma odaklı kullanım senaryoları",
          "Derinlik isteyen sorular için uygun yanıt akışı"
        ],
        pros: [
          "Uzun formatlı cevaplarda güçlüdür",
          "Açıklayıcı ve sakin bir yanıt stili sunar",
          "Yazı odaklı ekipler için iyi bir adaydır"
        ],
        cons: [
          "Bazı hız odaklı senaryolarda daha yavaş hissedilebilir",
          "Her kullanım amacında aynı derecede esnek olmayabilir"
        ],
        seoTitle: "Claude incelemesi ve karşılaştırmaları",
        seoDescription:
          "Claude aracının özellikleri, fiyat modeli, artıları, eksileri ve diğer AI yazma araçlarıyla farklarını inceleyin."
      },
      en: {
        name: "Claude",
        shortDescription: "A strong AI option for long-form writing, careful explanations, and reasoning-heavy tasks.",
        longDescription:
          "Claude stands out in long-context writing, structured answers, and tasks that benefit from a more careful communication style. It is often considered by editorial teams, researchers, and users who value clarity in output.",
        features: [
          "Long-context understanding and output",
          "Clear and structured response style",
          "Strong writing and research workflows",
          "Useful for deeper question handling"
        ],
        pros: [
          "Strong in long-form responses",
          "Clear and measured tone",
          "Well suited for writing-heavy teams"
        ],
        cons: [
          "Can feel different in speed-focused workflows",
          "May not be equally flexible for every use case"
        ],
        seoTitle: "Claude review and comparisons",
        seoDescription:
          "Review Claude features, pricing, pros and cons, and how it compares with other AI writing tools."
      }
    }
  },
  {
    slug: "midjourney",
    pricing: "PAID",
    websiteUrl: "https://example.com/midjourney",
    categorySlugs: ["ai-tools", "comparisons"],
    toolCategorySlugs: ["image"],
    useCaseSlugs: ["content", "creators", "business"],
    rating: 4.8,
    featured: true,
    locales: {
      tr: {
        name: "Midjourney",
        shortDescription: "Yaratıcı görsel üretimi, konsept tasarımları ve stil odaklı çıktılar için öne çıkan bir araç.",
        longDescription:
          "Midjourney, görsel kalite ve stil çeşitliliği ile bilinen görsel üretim araçlarından biridir. Tasarımcılar, içerik üreticileri ve yaratıcı projelerde ilham veya konsept oluşturmak isteyen kullanıcılar tarafından sıkça tercih edilir.",
        features: [
          "Yüksek etkili görsel üretim",
          "Stil çeşitliliği ve artistik sonuç potansiyeli",
          "Konsept oluşturma ve moodboard desteği",
          "Yaratıcı ekipler için ilham kaynağı"
        ],
        pros: [
          "Görsel kalite algısı yüksektir",
          "Yaratıcı projelerde güçlü sonuçlar verebilir",
          "Stil odaklı kullanımlar için uygundur"
        ],
        cons: [
          "Ücretsiz başlangıç seçeneği sınırlı olabilir",
          "Her kullanıcı için öğrenmesi en kolay arayüz olmayabilir"
        ],
        seoTitle: "Midjourney incelemesi",
        seoDescription:
          "Midjourney hakkında fiyat modeli, görsel üretim özellikleri, artılar, eksiler ve alternatifleri inceleyin."
      },
      en: {
        name: "Midjourney",
        shortDescription: "A strong image-generation choice for creative visuals, concepts, and style-first output.",
        longDescription:
          "Midjourney is known for high-impact image generation and stylistic variety. It is often used by designers, creators, and teams exploring visual concepts, moodboards, and creative directions.",
        features: [
          "High-impact image generation",
          "Strong stylistic variety",
          "Concept and moodboard support",
          "Useful for creative exploration"
        ],
        pros: [
          "Often perceived as high quality visually",
          "Strong fit for creative work",
          "Great for style-oriented use cases"
        ],
        cons: [
          "Free entry points may be limited",
          "Not always the easiest workflow for every user"
        ],
        seoTitle: "Midjourney review",
        seoDescription:
          "Learn about Midjourney pricing, image-generation strengths, pros and cons, and alternative tools."
      }
    }
  },
  {
    slug: "gemini",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/gemini",
    categorySlugs: ["ai-tools", "comparisons", "free-tools"],
    toolCategorySlugs: ["writing", "productivity"],
    useCaseSlugs: ["students", "business", "research"],
    rating: 4.6,
    featured: false,
    locales: {
      tr: {
        name: "Gemini",
        shortDescription: "Google ekosistemiyle uyumlu, araştırma ve üretkenlik odaklı bir AI deneyimi sunar.",
        longDescription:
          "Gemini, Google odaklı iş akışları içinde konumlanan bir AI aracıdır. Dokümanlar, arama destekli cevaplar ve genel verimlilik senaryolarında kullanıcılara ekosistem entegrasyonu avantajı sağlayabilir.",
        features: [
          "Google odaklı kullanım senaryoları",
          "Araştırma ve genel verimlilik desteği",
          "Servisler arası entegrasyon potansiyeli",
          "Günlük AI asistanı olarak kullanılabilir"
        ],
        pros: [
          "Google ürünleri kullananlar için tanıdık bir deneyim",
          "Genel kullanım senaryolarında yeterli esneklik",
          "Freemium giriş bariyeri düşüktür"
        ],
        cons: [
          "Her uzman görevde en iyi seçenek olmayabilir",
          "Algılanan değeri ekosistem tercihine bağlı değişebilir"
        ],
        seoTitle: "Gemini incelemesi",
        seoDescription:
          "Gemini aracının fiyat yapısı, temel özellikleri, artıları, eksileri ve benzer AI araçlarıyla farklarını inceleyin."
      },
      en: {
        name: "Gemini",
        shortDescription: "A Google-aligned AI experience built for research, productivity, and everyday assistance.",
        longDescription:
          "Gemini is positioned around Google-centric workflows and can be useful for users who want AI support inside familiar productivity patterns. It can fit research, document work, and general assistance use cases.",
        features: [
          "Google-oriented workflows",
          "Research and productivity support",
          "Potential ecosystem integration benefits",
          "Usable as a day-to-day AI assistant"
        ],
        pros: [
          "Comfortable for users in the Google ecosystem",
          "Flexible for general use cases",
          "Lower entry barrier through freemium access"
        ],
        cons: [
          "Not always the strongest choice for specialist tasks",
          "Perceived value can depend on ecosystem preference"
        ],
        seoTitle: "Gemini review",
        seoDescription:
          "Review Gemini pricing, key features, pros and cons, and how it compares with similar AI tools."
      }
    }
  },
  {
    slug: "notion-ai",
    pricing: "PAID",
    websiteUrl: "https://example.com/notion-ai",
    categorySlugs: ["ai-tools", "make-money-with-ai", "guides"],
    toolCategorySlugs: ["productivity"],
    useCaseSlugs: ["business", "content", "freelancers"],
    rating: 4.5,
    featured: false,
    locales: {
      tr: {
        name: "Notion AI",
        shortDescription: "Doküman, planlama, bilgi yönetimi ve ekip çalışmaları için pratik bir AI yardımcısı.",
        longDescription:
          "Notion AI, çalışma alanı odaklı bir yardımcı olarak notlar, dokümanlar, bilgi düzenleme ve ekip içi planlama akışları içinde kullanılır. Özellikle operasyon ve bilgi düzenleme süreçlerini hızlandırmak isteyen ekipler için uygundur.",
        features: [
          "Not ve doküman odaklı yardım",
          "Bilgi tabanı ve ekip içi iş akışı desteği",
          "Planlama ve metin düzenleme kolaylığı",
          "Tek platform içinde üretkenlik odağı"
        ],
        pros: [
          "Çalışma alanı içinde doğal kullanım sunar",
          "Ekip düzeni ve not sistemleri için uygundur",
          "İçerik düzenleme sürecini hızlandırır"
        ],
        cons: [
          "Genel amaçlı AI araçları kadar geniş kapsama sahip olmayabilir",
          "Değer algısı mevcut Notion kullanımına bağlı değişebilir"
        ],
        seoTitle: "Notion AI incelemesi",
        seoDescription:
          "Notion AI özellikleri, fiyat modeli, artıları, eksileri ve ekip içi kullanım avantajlarını inceleyin."
      },
      en: {
        name: "Notion AI",
        shortDescription: "A practical AI helper for documents, planning, knowledge management, and team workflows.",
        longDescription:
          "Notion AI is built around workspace productivity, helping with notes, docs, planning, and internal knowledge organization. It is often useful for teams that want lightweight AI assistance inside existing documentation flows.",
        features: [
          "Notes and document assistance",
          "Knowledge base and team workflow support",
          "Planning and editing help",
          "Productivity inside one workspace"
        ],
        pros: [
          "Feels natural inside a workspace setup",
          "Useful for team knowledge systems",
          "Speeds up drafting and organization"
        ],
        cons: [
          "May not be as broad as general-purpose AI assistants",
          "Value often depends on existing Notion usage"
        ],
        seoTitle: "Notion AI review",
        seoDescription:
          "Explore Notion AI features, pricing, pros and cons, and where it fits inside team workflows."
      }
    }
  },
  {
    slug: "runway",
    pricing: "FREEMIUM",
    websiteUrl: "https://example.com/runway",
    categorySlugs: ["ai-tools", "make-money-with-ai", "guides", "free-tools"],
    toolCategorySlugs: ["video"],
    useCaseSlugs: ["creators", "content", "business"],
    rating: 4.7,
    featured: true,
    locales: {
      tr: {
        name: "Runway",
        shortDescription: "Video üretimi, kurgu ve AI tabanlı yaratıcı işler için öne çıkan platformlardan biri.",
        longDescription:
          "Runway, video odaklı AI iş akışları için popüler bir seçenektir. Kreatif ekipler, sosyal medya üreticileri ve reklam için hızlı denemeler yapmak isteyen kullanıcılar tarafından tercih edilir.",
        features: [
          "AI destekli video üretim araçları",
          "Kurgu ve yaratıcı deney akışları",
          "Kreatif prototipleme için uygun arayüz",
          "Video odaklı ekipler için güçlü kullanım potansiyeli"
        ],
        pros: [
          "Video odaklı kullanımlarda dikkat çekicidir",
          "Kreatif ekipler için uygundur",
          "Freemium başlangıç sunabilir"
        ],
        cons: [
          "Bütçe ihtiyacı kullanım derinliğine göre artabilir",
          "Her tür video ihtiyacı için tek başına yeterli olmayabilir"
        ],
        seoTitle: "Runway incelemesi",
        seoDescription:
          "Runway aracının video odaklı AI özelliklerini, fiyat yapısını ve benzer araçlarla farklarını inceleyin."
      },
      en: {
        name: "Runway",
        shortDescription: "A standout platform for AI-assisted video generation, editing, and creative workflows.",
        longDescription:
          "Runway is a popular choice for video-focused AI workflows. It is often used by creative teams, social media producers, and users who need fast experimentation for video-based content.",
        features: [
          "AI-assisted video creation tools",
          "Editing and creative workflow support",
          "Useful interface for rapid prototyping",
          "Strong potential for video-focused teams"
        ],
        pros: [
          "Compelling for video-heavy use cases",
          "Good fit for creative teams",
          "Can offer a freemium starting point"
        ],
        cons: [
          "Costs can grow with heavier usage",
          "May not cover every video need on its own"
        ],
        seoTitle: "Runway review",
        seoDescription:
          "Review Runway video-focused AI features, pricing, pros and cons, and how it compares with alternatives."
      }
    }
  }
];
```

---

## FILE: src\data\tool-taxonomy.ts

`$ext
import type { Locale } from "@/i18n/config";

export type TaxonomyOption = {
  slug: string;
  label: string;
};

export const toolCategoryOptions = {
  tr: [
    { slug: "writing", label: "Yazı" },
    { slug: "image", label: "Görsel" },
    { slug: "video", label: "Video" },
    { slug: "productivity", label: "Verimlilik" }
  ],
  en: [
    { slug: "writing", label: "Writing AI" },
    { slug: "image", label: "Image AI" },
    { slug: "video", label: "Video" },
    { slug: "productivity", label: "Productivity AI" }
  ]
} as const satisfies Record<Locale, readonly TaxonomyOption[]>;

export const useCaseOptions = {
  tr: [
    { slug: "business", label: "İşletmeler" },
    { slug: "students", label: "Öğrenciler" },
    { slug: "content", label: "İçerik" },
    { slug: "creators", label: "Üreticiler" },
    { slug: "freelancers", label: "Freelancer" },
    { slug: "research", label: "Araştırma" }
  ],
  en: [
    { slug: "business", label: "Business" },
    { slug: "students", label: "Students" },
    { slug: "content", label: "Content" },
    { slug: "creators", label: "Creators" },
    { slug: "freelancers", label: "Freelancers" },
    { slug: "research", label: "Research" }
  ]
} as const satisfies Record<Locale, readonly TaxonomyOption[]>;
```

---

## FILE: src\i18n\config.ts

`$ext
export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";
export const localeCookieName = "toolnova-locale";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function buildAlternates(path: string) {
  const safePath = path.startsWith("/") ? path : `/${path}`;

  return {
    tr: `/tr${safePath === "/" ? "" : safePath}`,
    en: `/en${safePath === "/" ? "" : safePath}`,
    "x-default": `/tr${safePath === "/" ? "" : safePath}`
  };
}
```

---

## FILE: src\i18n\dictionaries.ts

`$ext
import type { Locale } from "@/i18n/config";

const dictionaries = {
  tr: {
    meta: {
      homeTitle: "AI araçları ve SaaS rehberi",
      homeDescription: "Kategori, araç, karşılaştırma ve blog odaklı iki dilli ToolNova platformu."
    },
    navigation: [
      { label: "Kategoriler", href: "/categories" },
      { label: "Araçlar", href: "/tools" },
      { label: "Karşılaştırmalar", href: "/categories/comparisons" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "ToolNova, AI araçlarını daha hızlı karşılaştırmak, doğru aracı seçmek ve gelir odaklı kullanım senaryolarını keşfetmek için tasarlanmış modern bir platformdur.",
      badge: "ToolNova",
      groups: [
        {
          title: "Araçlar",
          links: [
            { label: "Tüm araçlar", href: "/tools" },
            { label: "Öne çıkan AI araçları", href: "/categories/ai-tools" },
            { label: "Karşılaştırmalar", href: "/categories/comparisons" }
          ]
        },
        {
          title: "İçerik",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "AI ile para kazanma", href: "/categories/make-money-with-ai" },
            { label: "Ücretsiz araçlar", href: "/categories/free-tools" }
          ]
        },
        {
          title: "Güven",
          links: [
            { label: "Hakkımızda", href: "/about" },
            { label: "İletişim", href: "/contact" },
            { label: "Affiliate açıklaması", href: "/affiliate-disclosure" },
            { label: "Gizlilik politikası", href: "/privacy-policy" },
            { label: "Kullanım şartları", href: "/terms" }
          ]
        }
      ],
      bottomNote: "AI tools, blog rehberleri ve karşılaştırmalar için hızlı ve güven odaklı ToolNova deneyimi.",
      copyright: "2026 ToolNova. Tüm hakları saklıdır."
    }
  },
  en: {
    meta: {
      homeTitle: "AI Tools and SaaS Directory",
      homeDescription: "A bilingual ToolNova platform focused on categories, tools, comparisons, and blog content."
    },
    navigation: [
      { label: "Categories", href: "/categories" },
      { label: "Tools", href: "/tools" },
      { label: "Comparisons", href: "/categories/comparisons" },
      { label: "Blog", href: "/blog" }
    ],
    footer: {
      description:
        "ToolNova is a modern AI discovery platform built to help users compare tools faster, choose with confidence, and explore revenue-focused AI workflows.",
      badge: "ToolNova",
      groups: [
        {
          title: "Tools",
          links: [
            { label: "All tools", href: "/tools" },
            { label: "Featured AI tools", href: "/categories/ai-tools" },
            { label: "Comparisons", href: "/categories/comparisons" }
          ]
        },
        {
          title: "Content",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "Make money with AI", href: "/categories/make-money-with-ai" },
            { label: "Free tools", href: "/categories/free-tools" }
          ]
        },
        {
          title: "Trust",
          links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
            { label: "Privacy policy", href: "/privacy-policy" },
            { label: "Terms", href: "/terms" }
          ]
        }
      ],
      bottomNote: "A cleaner ToolNova experience for tools, comparisons, and SEO-driven guides.",
      copyright: "2026 ToolNova. All rights reserved."
    }
  }
};

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
```

---

## FILE: src\lib\blog.ts

`$ext
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
      "ToolNova blog bölümünde öne çıkan AI araçları, karşılaştırmalar, ücretsiz araç listeleri ve para kazandıran kullanım senaryoları yer alır.",
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
      "Araçları yan yana görmek istiyorsanız ToolNova comparison sayfasına geçin.",
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
      "The ToolNova blog covers the best AI tools, comparisons, free tool roundups, and monetization-focused use cases.",
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
      "If you want to evaluate tools side by side, jump into the ToolNova comparison page.",
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

export function getLocalizedBlogArticles(locale: Locale): LocalizedBlogArticle[] {
  return blogArticles.map((article) => ({
    slug: article.slug,
    categorySlug: article.categorySlug,
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
```

---

## FILE: src\lib\catalog.ts

`$ext
import { categories } from "@/data/categories";
import { catalogContent } from "@/data/catalog-content";
import { tools } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import type { LocalizedCategory, LocalizedTool, PricingTier } from "@/types/catalog";

export function getCatalogContent(locale: Locale) {
  return catalogContent[locale];
}

export function getLocalizedCategories(locale: Locale): LocalizedCategory[] {
  return categories.map((category) => ({
    slug: category.slug,
    ...category.locales[locale]
  }));
}

export function getLocalizedCategoryBySlug(locale: Locale, slug: string) {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return null;
  }

  return {
    slug: category.slug,
    ...category.locales[locale]
  } satisfies LocalizedCategory;
}

export function getLocalizedTools(locale: Locale): LocalizedTool[] {
  return tools.map((tool) => ({
    slug: tool.slug,
    pricing: tool.pricing,
    websiteUrl: tool.websiteUrl,
    categorySlugs: tool.categorySlugs,
    toolCategorySlugs: tool.toolCategorySlugs,
    useCaseSlugs: tool.useCaseSlugs,
    rating: tool.rating,
    featured: tool.featured,
    ...tool.locales[locale]
  }));
}

export function getLocalizedToolBySlug(locale: Locale, slug: string) {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return null;
  }

  return {
    slug: tool.slug,
    pricing: tool.pricing,
    websiteUrl: tool.websiteUrl,
    categorySlugs: tool.categorySlugs,
    toolCategorySlugs: tool.toolCategorySlugs,
    useCaseSlugs: tool.useCaseSlugs,
    rating: tool.rating,
    featured: tool.featured,
    ...tool.locales[locale]
  } satisfies LocalizedTool;
}

export function getToolsByCategory(locale: Locale, categorySlug: string) {
  return getLocalizedTools(locale).filter((tool) => tool.categorySlugs.includes(categorySlug));
}

export function getCategoryNamesMap(locale: Locale) {
  return new Map(getLocalizedCategories(locale).map((category) => [category.slug, category.name]));
}

export function getRelatedTools(locale: Locale, toolSlug: string, limit = 3) {
  const currentTool = tools.find((item) => item.slug === toolSlug);

  if (!currentTool) {
    return [];
  }

  return getLocalizedTools(locale)
    .filter(
      (tool) =>
        tool.slug !== toolSlug &&
        tool.categorySlugs.some((slug) => currentTool.categorySlugs.includes(slug))
    )
    .slice(0, limit);
}

export function formatPricing(pricing: PricingTier, locale: Locale) {
  const labels: Record<Locale, Record<PricingTier, string>> = {
    tr: {
      FREE: "Ücretsiz",
      FREEMIUM: "Kısmen ücretsiz",
      PAID: "Ücretli"
    },
    en: {
      FREE: "Free",
      FREEMIUM: "Freemium",
      PAID: "Paid"
    }
  };

  return labels[locale][pricing];
}
```

---

## FILE: src\lib\site.ts

`$ext
export const siteConfig = {
  name: "ToolNova",
  description: "AI Tools & SaaS rehber sitesi",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
};
```

---

## FILE: src\lib\static-pages.ts

`$ext
import type { Metadata } from "next";

import { staticPages } from "@/data/static-pages";
import { buildAlternates, type Locale } from "@/i18n/config";

export type StaticPageKey = keyof (typeof staticPages)[Locale];

export function getStaticPage(locale: Locale, key: StaticPageKey) {
  return staticPages[locale][key];
}

export function buildStaticPageMetadata(locale: Locale, path: string, key: StaticPageKey): Metadata {
  const page = getStaticPage(locale, key);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: buildAlternates(path)
    }
  };
}
```

---

## FILE: src\types\blog.ts

`$ext
import type { Locale } from "@/i18n/config";

export type BlogComparisonItem = {
  label: string;
  value: string;
};

export type BlogSubSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
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
  relatedToolSlugs: string[];
  title: string;
  excerpt: string;
  intro: string;
  categoryLabel: string;
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
};
```

---

## FILE: src\types\catalog.ts

`$ext
import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;
export type LocalizedStringList = Record<Locale, string[]>;

export type PricingTier = "FREE" | "FREEMIUM" | "PAID";

export type CategoryEntry = {
  slug: string;
  locales: Record<
    Locale,
    {
      name: string;
      description: string;
      supportText: string;
      seoTitle: string;
      seoDescription: string;
    }
  >;
};

export type ToolEntry = {
  slug: string;
  pricing: PricingTier;
  websiteUrl: string;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  useCaseSlugs: string[];
  rating: number;
  featured: boolean;
  locales: Record<
    Locale,
    {
      name: string;
      shortDescription: string;
      longDescription: string;
      features: string[];
      pros: string[];
      cons: string[];
      seoTitle: string;
      seoDescription: string;
    }
  >;
};

export type LocalizedCategory = {
  slug: string;
  name: string;
  description: string;
  supportText: string;
  seoTitle: string;
  seoDescription: string;
};

export type LocalizedTool = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  pricing: PricingTier;
  websiteUrl: string;
  categorySlugs: string[];
  toolCategorySlugs: string[];
  useCaseSlugs: string[];
  rating: number;
  featured: boolean;
  features: string[];
  pros: string[];
  cons: string[];
  seoTitle: string;
  seoDescription: string;
};
```

---

## FILE: src\types\home.ts

`$ext
export type CategoryCard = {
  icon: string;
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  metric: string;
  bestFor: string;
};

export type ToolCard = {
  icon: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  href: string;
  websiteUrl: string;
  rating: string;
  note: string;
  bestFor: string;
  benefit: string;
  comparisonOutcome: string;
  editorNote: string;
  useCaseTags: string[];
  ctaLabel?: string;
  socialProofBadges?: string[];
};

export type ComparisonCard = {
  icon: string;
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  highlight?: string;
};

export type ConversionListItem = {
  icon: string;
  badge: string;
  title: string;
  description: string;
  benefit: string;
  href: string;
  ctaLabel: string;
};

export type GuideCard = {
  icon: string;
  title: string;
  description: string;
  href: string;
  tag: string;
  readTime: string;
};
```

