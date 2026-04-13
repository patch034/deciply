"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { formatBlogDate, resolveBlogPublishDate } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import type { AiNewsItem } from "@/lib/news";
import type { LocalizedBlogArticle } from "@/types/blog";
import type { ToolCard as HomeToolCard } from "@/types/home";

type HomepageCategoryCard = {
  slug: string;
  name: string;
  description: string;
  supportText: string;
  href: string;
  count: number;
  icon: string;
};

type HomeDiscoveryHubProps = {
  locale: Locale;
  blogArticles: LocalizedBlogArticle[];
  newsItems: AiNewsItem[];
  popularTools: HomeToolCard[];
  allTools: HomeToolCard[];
  categories: HomepageCategoryCard[];
};

type FeedTabKey = "today" | "new" | "saved" | "used" | "apps";

const feedTabs: Array<{ key: FeedTabKey; label: { tr: string; en: string } }> = [
  { key: "today", label: { tr: "Bugün", en: "Today" } },
  { key: "new", label: { tr: "Yeni", en: "New" } },
  { key: "saved", label: { tr: "En çok kaydedilenler", en: "Most saved" } },
  { key: "used", label: { tr: "En çok kullanılanlar", en: "Most used" } },
  { key: "apps", label: { tr: "Uygulamalar", en: "Apps" } }
];

function getToolSlug(tool: HomeToolCard) {
  return tool.href.split("/").pop() ?? tool.name.toLowerCase().replace(/\s+/g, "-");
}

function getDisplayDate(locale: Locale, value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

function getCategoryInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getBlogThumbnail(article: LocalizedBlogArticle, toolLookup: Map<string, HomeToolCard>) {
  for (const slug of article.relatedToolSlugs) {
    const tool = toolLookup.get(slug);
    if (tool?.logoUrl) {
      return { kind: "logo" as const, value: tool.logoUrl };
    }
  }

  return {
    kind: "text" as const,
    value: getCategoryInitials(article.categoryLabel)
  };
}

function buildToolFeed(toolList: HomeToolCard[], key: FeedTabKey) {
  const byRating = [...toolList].sort((left, right) => {
    const ratingLeft = Number.parseFloat(left.rating);
    const ratingRight = Number.parseFloat(right.rating);

    if (ratingLeft !== ratingRight) {
      return ratingRight - ratingLeft;
    }

    return left.name.localeCompare(right.name);
  });

  switch (key) {
    case "new":
      return [...toolList].slice(-15).reverse().slice(0, 15);
    case "saved":
      return byRating.filter((tool) => Number.parseFloat(tool.rating) >= 4.7).slice(0, 15);
    case "used":
      return byRating
        .filter((tool) => tool.useCaseTags.length >= 2)
        .sort((left, right) => {
          if (right.useCaseTags.length !== left.useCaseTags.length) {
            return right.useCaseTags.length - left.useCaseTags.length;
          }

          const ratingLeft = Number.parseFloat(left.rating);
          const ratingRight = Number.parseFloat(right.rating);

          if (ratingLeft !== ratingRight) {
            return ratingRight - ratingLeft;
          }

          return left.name.localeCompare(right.name);
        })
        .slice(0, 15);
    case "apps":
      return toolList.slice(0, 15);
    case "today":
    default:
      return byRating.slice(0, 15);
  }
}

function ToolLogo({ tool }: { tool: HomeToolCard }) {
  const fallback = tool.icon.slice(0, 2).toUpperCase();

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-slate-200 bg-white text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.24)]">
      {tool.logoUrl ? (
        <img
          src={tool.logoUrl}
          alt={tool.name}
          className="h-full w-full object-contain p-2"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        fallback
      )}
    </span>
  );
}

function BlogFeedCard({
  locale,
  article,
  toolLookup
}: {
  locale: Locale;
  article: LocalizedBlogArticle;
  toolLookup: Map<string, HomeToolCard>;
}) {
  const publishDate = resolveBlogPublishDate(article);
  const formattedDate = publishDate ? formatBlogDate(locale, publishDate) : null;
  const thumbnail = getBlogThumbnail(article, toolLookup);

  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group flex items-start gap-3 rounded-[18px] border border-slate-200 bg-white p-3.5 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.16)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50 hover:shadow-[0_22px_48px_-28px_rgba(37,99,235,0.18)]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] text-[11px] font-bold uppercase tracking-[0.16em] text-[#0055FF]">
        {thumbnail.kind === "logo" ? (
          <img
            src={thumbnail.value}
            alt={article.title}
            className="h-full w-full object-contain p-2"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          thumbnail.value
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="muted" className="text-[10px]">
            {article.categoryLabel}
          </Badge>
          {formattedDate ? <span className="shrink-0 text-[11px] font-medium text-slate-400">{formattedDate}</span> : null}
        </div>
        <h3 className="mt-2 text-[14px] font-semibold leading-5 tracking-[-0.03em] text-slate-950 transition group-hover:text-[#0E2450]">
          {article.title}
        </h3>
        <p
          className="mt-1 text-[12.5px] leading-5 text-slate-600"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden"
          }}
        >
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

function DirectoryRow({
  locale,
  tool
}: {
  locale: Locale;
  tool: HomeToolCard;
}) {
  const detailHref = `/${locale}${tool.href}`;

  return (
    <Link
      href={detailHref}
      aria-label={`${locale === "tr" ? "İncele" : "Open"}: ${tool.name}`}
      className="group flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white p-3 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50 hover:shadow-[0_24px_56px_-28px_rgba(37,99,235,0.18)]"
    >
      <ToolLogo tool={tool} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[14px] font-semibold tracking-[-0.03em] text-slate-950 transition group-hover:text-[#0E2450]">
            {tool.name}
          </h3>
          <Badge variant="muted" className="text-[10px]">
            {tool.pricing}
          </Badge>
        </div>
        <p className="mt-1 text-[12.5px] leading-5 text-slate-600 clamp-2">{tool.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tool.useCaseTags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="muted" className="px-2 py-0.5 text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <span className="inline-flex min-h-[36px] shrink-0 items-center rounded-full border border-slate-200 bg-white px-3 text-[11px] font-semibold text-[#0055FF] transition group-hover:border-sky-200 group-hover:text-[#0E2450]">
        {locale === "tr" ? "İncele" : "Open"}
      </span>
    </Link>
  );
}

function NewsItemRow({
  locale,
  item,
  index
}: {
  locale: Locale;
  item: AiNewsItem;
  index: number;
}) {
  const detailHref = `/${locale}/news/${item.slug}`;
  const publishedAt = getDisplayDate(locale, item.publishedAt);
  const title = item.displayTitle ?? item.title;
  const summary = item.displaySummary ?? item.summary;

  return (
    <Link
      href={detailHref}
      className="group flex items-start gap-3 rounded-[18px] border border-slate-200 bg-white p-3.5 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50 hover:shadow-[0_22px_48px_-28px_rgba(37,99,235,0.18)]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-[11px] font-bold text-[#0055FF]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="muted" className="text-[10px]">
            {item.categoryLabel}
          </Badge>
          {publishedAt ? <span className="shrink-0 text-[11px] text-slate-400">{publishedAt}</span> : null}
        </div>
        <h3 className="mt-2 text-[13.5px] font-semibold leading-5 tracking-[-0.03em] text-slate-950 transition group-hover:text-[#0E2450]">
          {title}
        </h3>
        <p className="mt-1 text-[12px] leading-5 text-slate-600 clamp-2">{summary}</p>
        <span className="mt-2 inline-flex text-[11px] font-semibold text-[#0055FF] transition group-hover:translate-x-0.5 group-hover:text-[#0E2450]">
          {locale === "tr" ? "Detayı gör" : "View details"}
        </span>
      </div>
    </Link>
  );
}

function CategoryMiniCard({
  locale,
  category
}: {
  locale: Locale;
  category: HomepageCategoryCard;
}) {
  return (
    <Link
      href={`/${locale}${category.href}`}
      className="group flex h-full flex-col rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50 hover:shadow-[0_24px_56px_-28px_rgba(37,99,235,0.18)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-sky-200 bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_58%,#3B82F6_100%)] text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_16px_34px_-22px_rgba(37,99,235,0.28)]">
          {category.icon}
        </span>
        <Badge variant="ghost" className="text-[11px]">
          {category.count}
        </Badge>
      </div>
      <h3 className="mt-3 text-[14px] font-semibold tracking-[-0.03em] text-slate-950 transition group-hover:text-[#0E2450]">
        {category.name}
      </h3>
      <p className="mt-1.5 text-[12px] leading-5 text-slate-600 clamp-2">{category.description}</p>
    </Link>
  );
}

function FeaturedToolCard({
  locale,
  tool
}: {
  locale: Locale;
  tool: HomeToolCard;
}) {
  const detailHref = `/${locale}${tool.href}`;

  return (
    <Link
      href={detailHref}
      className="group flex h-full flex-col rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50 hover:shadow-[0_24px_56px_-28px_rgba(37,99,235,0.18)]"
    >
      <div className="flex items-start justify-between gap-3">
        <ToolLogo tool={tool} />
        <Badge variant="ghost" className="text-[10px]">
          {tool.pricing}
        </Badge>
      </div>
      <h3 className="mt-3 text-[14px] font-semibold tracking-[-0.03em] text-slate-950 transition group-hover:text-[#0E2450]">
        {tool.name}
      </h3>
      <p className="mt-1.5 text-[12.5px] leading-5 text-slate-600 clamp-2">{tool.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge variant="muted" className="px-2 py-0.5 text-[10px]">
          {tool.category}
        </Badge>
      </div>
    </Link>
  );
}

export function HomeDiscoveryHub({ locale, blogArticles, newsItems, popularTools, allTools, categories }: HomeDiscoveryHubProps) {
  const [activeTab, setActiveTab] = useState<FeedTabKey>("today");

  const toolLookup = useMemo(() => new Map(allTools.map((tool) => [getToolSlug(tool), tool])), [allTools]);

  const activeTools = useMemo(() => buildToolFeed(popularTools, activeTab), [activeTab, popularTools]);
  const featuredTools = useMemo(() => popularTools.slice(0, 18), [popularTools]);
  const tabCounts = useMemo(
    () => ({
      today: buildToolFeed(popularTools, "today").length,
      new: buildToolFeed(popularTools, "new").length,
      saved: buildToolFeed(popularTools, "saved").length,
      used: buildToolFeed(popularTools, "used").length,
      apps: buildToolFeed(popularTools, "apps").length
    }),
    [popularTools]
  );

  return (
    <div className="mx-auto mt-7 w-full max-w-[1440px] px-4 pb-12 sm:px-6 sm:pb-14 lg:mt-8 lg:px-8 lg:pb-16">
      <div className="rounded-[34px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(14,36,80,0.05),transparent_22%),radial-gradient(circle_at_top_right,rgba(0,85,255,0.045),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.985),rgba(247,250,253,0.99))] p-4 shadow-[0_28px_90px_-56px_rgba(15,23,42,0.24)] sm:p-5 lg:p-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {feedTabs.map((tab) => {
            const active = activeTab === tab.key;
            const count = tabCounts[tab.key];

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "inline-flex min-h-[38px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition duration-200",
                  active
                    ? "border-sky-200 bg-sky-50 text-[#0055FF] shadow-[0_16px_34px_-26px_rgba(37,99,235,0.28)]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
                ].join(" ")}
              >
                {locale === "tr" ? tab.label.tr : tab.label.en}
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,2.15fr)_minmax(0,1.05fr)]">
          <aside className="ui-card-strong flex h-full flex-col rounded-[28px] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{locale === "tr" ? "Güncel Bloglar" : "Latest blogs"}</p>
                <h3 className="mt-2 text-[1.02rem] font-bold tracking-[-0.03em] text-slate-950">
                  {locale === "tr" ? "Son rehberler ve karar yazıları" : "Fresh guides and decision posts"}
                </h3>
              </div>
              <Badge variant="ghost" className="shrink-0 text-[11px]">
                {blogArticles.length}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {locale === "tr"
                ? "Kısa başlıklar ve bir satırlık özetlerle en güncel blog içeriğini tara."
                : "Scan the newest blog content through compact titles and one-line excerpts."}
            </p>
            <div className="mt-4 space-y-2.5">
              {blogArticles.map((article) => (
                <BlogFeedCard key={article.slug} locale={locale} article={article} toolLookup={toolLookup} />
              ))}
            </div>
            <div className="mt-4">
              <PremiumButton href={`/${locale}/blog`} variant="secondary" className="w-full">
                {locale === "tr" ? "Tüm blogları gör" : "View all blogs"}
              </PremiumButton>
            </div>
          </aside>

          <section className="ui-card-strong flex h-full flex-col rounded-[28px] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{locale === "tr" ? "Canlı araç akışı" : "Live tool stream"}</p>
                <h3 className="mt-2 text-[1.05rem] font-bold tracking-[-0.03em] text-slate-950">
                  {locale === "tr" ? "En iyi araçları küçük, hızlı satırlarda tara" : "Scan the best tools in compact, fast rows"}
                </h3>
              </div>
              <Badge variant="ghost" className="shrink-0 text-[11px]">
                {activeTools.length}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {locale === "tr"
                ? "Logo, fiyat sinyali, kısa açıklama ve etiketlerle daha yoğun bir keşif akışı."
                : "Logos, pricing, short descriptions, and tags keep the feed dense and easy to scan."}
            </p>

            <div className="mt-4 grid gap-2.5">
              {activeTools.map((tool) => (
                <DirectoryRow key={tool.href} locale={locale} tool={tool} />
              ))}
            </div>

            <div className="mt-4">
              <PremiumButton href={`/${locale}/tools`} className="w-full">
                {locale === "tr" ? "Daha fazla görüntüle" : "Show more tools"}
              </PremiumButton>
            </div>
          </section>

          <aside className="ui-card-strong flex h-full flex-col rounded-[28px] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{locale === "tr" ? "AI Haberleri" : "AI news"}</p>
                <h3 className="mt-2 text-[1.05rem] font-bold tracking-[-0.03em] text-slate-950">
                  {locale === "tr" ? "İç haber akışı ve hızlı sinyaller" : "Internal news feed and quick signals"}
                </h3>
              </div>
              <Badge variant="ghost" className="shrink-0 text-[11px]">
                {newsItems.length}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {locale === "tr"
                ? "Dışa yönlendirmeden önce Deciply içinde açılan kısa haber detayları."
                : "Open concise news detail pages inside Deciply before any external source action."}
            </p>

            <div className="mt-4 space-y-2.5">
              {newsItems.map((item, index) => (
                <NewsItemRow key={item.slug} locale={locale} item={item} index={index} />
              ))}
            </div>

            <div className="mt-4">
              <PremiumButton href={`/${locale}/news`} variant="secondary" className="w-full">
                {locale === "tr" ? "Tüm haberleri gör" : "View all news"}
              </PremiumButton>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-8">
        <SectionShell
          tone="light"
          className="section-tint-slate px-0 sm:px-0"
          eyebrow={locale === "tr" ? "Kategoriler" : "Categories"}
          title={locale === "tr" ? "Kategoriye göre ücretsiz AI araçları" : "Free AI tools by category"}
          description={
            locale === "tr"
              ? "Popüler kullanım alanlarını kompakt kartlarla tara ve doğru kategoriye hızlıca geç."
              : "Scan popular use-case categories through compact cards and move into the right directory faster."
          }
          actions={<PremiumButton href={`/${locale}/categories`}>{locale === "tr" ? "Daha fazla görüntüle" : "Show more"}</PremiumButton>}
          contentClassName="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {categories.map((category) => (
            <CategoryMiniCard key={category.slug} locale={locale} category={category} />
          ))}
        </SectionShell>
      </div>

      <div className="mt-8">
        <SectionShell
          tone="light"
          className="section-tint-slate px-0 sm:px-0"
          eyebrow={locale === "tr" ? "Öne çıkan araçlar" : "Featured tools"}
          title={locale === "tr" ? "Öne çıkan yapay zekalar" : "Featured AI tools"}
          description={
            locale === "tr"
              ? "Kartları küçülttük, yoğunluğu artırdık ve kullanıcının daha çok aracı bir bakışta görmesini sağladık."
              : "We tightened the cards and raised density so more tools stay visible at a glance."
          }
          actions={<PremiumButton href={`/${locale}/tools`}>{locale === "tr" ? "Daha fazla görüntüle" : "Show more"}</PremiumButton>}
          contentClassName="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
        >
          {featuredTools.map((tool) => (
            <FeaturedToolCard key={tool.href} locale={locale} tool={tool} />
          ))}
        </SectionShell>
      </div>
    </div>
  );
}
