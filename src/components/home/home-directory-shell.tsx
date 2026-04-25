import Image from "next/image";
import Link from "next/link";

import { CategoryIcon } from "@/components/catalog/category-icon";
import { HorizontalSlider } from "@/components/home/horizontal-slider";
import { PremiumButton } from "@/components/ui/premium-button";
import type { HomePreviewItem } from "@/data/home-previews";
import { formatPricing } from "@/lib/catalog";
import { getToolLogoUrl } from "@/lib/logo";
import type { Locale } from "@/i18n/config";
import type { LocalizedCategory, LocalizedTool } from "@/types/catalog";
import type { ComparisonCard as HomeComparisonCard } from "@/types/home";

export type HomeBlogPanelItem = {
  slug: string;
  title: string;
  excerpt: string;
};

type HomeDirectoryShellProps = {
  locale: Locale;
  categories: LocalizedCategory[];
  categoryToolCounts: Record<string, number>;
  tools: LocalizedTool[];
  blogs: HomeBlogPanelItem[];
  news: HomePreviewItem[];
  comparisons: HomeComparisonCard[];
};

const sectionCopy: Record<
  Locale,
  {
    tabs: string[];
    blogsTitle: string;
    blogCta: string;
    newsTitle: string;
    newsCta: string;
    toolsFeedTitle: string;
    toolsFeedDescription: string;
    toolsFeedCta: string;
    categoryTitle: string;
    categoryCta: string;
    compareTitle: string;
    compareCta: string;
    compareOpen: string;
    featuredTitle: string;
    featuredDescription: string;
    inspectTool: string;
    updatedLabel: string;
    featuredBadge: string;
    featuredToolsCta: string;
  }
> = {
  tr: {
    tabs: ["Bugün", "Yeni", "En çok kaydedilenler", "En çok kullanılanlar", "Uygulamalar"],
    blogsTitle: "Güncel bloglar",
    blogCta: "Tüm bloglar",
    newsTitle: "AI haberleri",
    newsCta: "Tüm haberler",
    toolsFeedTitle: "Canlı araç akışı",
    toolsFeedDescription: "Araçları kompakt satırlarda tara, fiyatı ve etiketleri gör, doğru ürüne hızlı geç.",
    toolsFeedCta: "Daha fazla görüntüle",
    categoryTitle: "AI araçlarını kategorilere göre keşfet",
    categoryCta: "Daha fazla görüntüle",
    compareTitle: "Popüler karşılaştırmalar",
    compareCta: "Daha fazla karşılaştırma",
    compareOpen: "Karşılaştırmayı aç",
    featuredTitle: "Öne çıkan yapay zekalar",
    featuredDescription: "Kompakt kartlarla daha fazla aracı aynı ekranda tara.",
    inspectTool: "İncele",
    updatedLabel: "Güncel",
    featuredBadge: "Öne çıkan",
    featuredToolsCta: "Araçlara git"
  },
  en: {
    tabs: ["Today", "New", "Most saved", "Most used", "Apps"],
    blogsTitle: "Latest blog guides",
    blogCta: "All blogs",
    newsTitle: "AI News",
    newsCta: "All news",
    toolsFeedTitle: "Live tool feed",
    toolsFeedDescription: "Scan compact rows, check pricing and tags, then jump into the right product.",
    toolsFeedCta: "View more",
    categoryTitle: "Explore AI tools by category",
    categoryCta: "View more",
    compareTitle: "Popular comparisons",
    compareCta: "More comparisons",
    compareOpen: "Open comparison",
    featuredTitle: "Featured AI tools",
    featuredDescription: "Review more tools in a denser, easier-to-scan grid.",
    inspectTool: "Inspect",
    updatedLabel: "Live",
    featuredBadge: "Featured",
    featuredToolsCta: "Browse tools"
  },
  ar: {
    tabs: ["اليوم", "جديد", "الأكثر حفظًا", "الأكثر استخدامًا", "التطبيقات"],
    blogsTitle: "أحدث أدلة المدونة",
    blogCta: "كل المقالات",
    newsTitle: "أخبار AI",
    newsCta: "كل الأخبار",
    toolsFeedTitle: "تدفق الأدوات المباشر",
    toolsFeedDescription: "تصفّح الأدوات في صفوف مدمجة، وراجع السعر والعلامات ثم انتقل بسرعة إلى الخيار المناسب.",
    toolsFeedCta: "عرض المزيد",
    categoryTitle: "استكشف أدوات AI حسب الفئة",
    categoryCta: "عرض المزيد",
    compareTitle: "مقارنات شائعة",
    compareCta: "مزيد من المقارنات",
    compareOpen: "افتح المقارنة",
    featuredTitle: "أدوات AI مميزة",
    featuredDescription: "راجع المزيد من الأدوات في شبكة أكثر كثافة وأسهل في المسح.",
    inspectTool: "استعراض",
    updatedLabel: "مباشر",
    featuredBadge: "مميز",
    featuredToolsCta: "اذهب إلى الأدوات"
  },
  ru: {
    tabs: ["Сегодня", "Новые", "Часто сохраняют", "Часто используют", "Приложения"],
    blogsTitle: "Свежие гайды блога",
    blogCta: "Все статьи",
    newsTitle: "Новости AI",
    newsCta: "Все новости",
    toolsFeedTitle: "Живая лента инструментов",
    toolsFeedDescription: "Просматривайте компактные строки, цену и теги, затем быстро переходите к нужному продукту.",
    toolsFeedCta: "Показать больше",
    categoryTitle: "Изучайте AI-инструменты по категориям",
    categoryCta: "Показать больше",
    compareTitle: "Популярные сравнения",
    compareCta: "Больше сравнений",
    compareOpen: "Открыть сравнение",
    featuredTitle: "Избранные AI-инструменты",
    featuredDescription: "Смотрите больше инструментов в более плотной и удобной сетке.",
    inspectTool: "Открыть",
    updatedLabel: "Актуально",
    featuredBadge: "Избранное",
    featuredToolsCta: "К инструментам"
  },
  zh: {
    tabs: ["今天", "最新", "收藏最多", "使用最多", "应用"],
    blogsTitle: "最新博客指南",
    blogCta: "全部博客",
    newsTitle: "AI 新闻",
    newsCta: "全部新闻",
    toolsFeedTitle: "实时工具流",
    toolsFeedDescription: "以紧凑列表浏览工具，快速查看价格与标签，再进入最合适的产品。",
    toolsFeedCta: "查看更多",
    categoryTitle: "按分类探索 AI 工具",
    categoryCta: "查看更多",
    compareTitle: "热门对比",
    compareCta: "更多对比",
    compareOpen: "打开对比",
    featuredTitle: "精选 AI 工具",
    featuredDescription: "在更紧凑、更易扫描的网格中查看更多工具。",
    inspectTool: "查看",
    updatedLabel: "实时",
    featuredBadge: "精选",
    featuredToolsCta: "前往工具页"
  },
  ja: {
    tabs: ["今日", "新着", "保存数が多い", "利用数が多い", "アプリ"],
    blogsTitle: "最新ブログガイド",
    blogCta: "すべてのブログ",
    newsTitle: "AIニュース",
    newsCta: "すべてのニュース",
    toolsFeedTitle: "ライブツールフィード",
    toolsFeedDescription: "コンパクトな行で価格やタグを見ながら、最適なプロダクトへすばやく移動できます。",
    toolsFeedCta: "もっと見る",
    categoryTitle: "カテゴリ別に AI ツールを探す",
    categoryCta: "もっと見る",
    compareTitle: "人気の比較",
    compareCta: "比較をもっと見る",
    compareOpen: "比較を開く",
    featuredTitle: "注目の AI ツール",
    featuredDescription: "より密度の高い見やすいグリッドで多くのツールを確認できます。",
    inspectTool: "見る",
    updatedLabel: "更新中",
    featuredBadge: "注目",
    featuredToolsCta: "ツールを見る"
  },
  ko: {
    tabs: ["오늘", "신규", "저장 많은 순", "사용 많은 순", "앱"],
    blogsTitle: "최신 블로그 가이드",
    blogCta: "모든 블로그",
    newsTitle: "AI 뉴스",
    newsCta: "모든 뉴스",
    toolsFeedTitle: "실시간 도구 피드",
    toolsFeedDescription: "가격과 태그를 보며 압축된 행으로 도구를 훑고, 적합한 제품으로 빠르게 이동하세요.",
    toolsFeedCta: "더 보기",
    categoryTitle: "카테고리별로 AI 도구 탐색",
    categoryCta: "더 보기",
    compareTitle: "인기 비교",
    compareCta: "비교 더 보기",
    compareOpen: "비교 열기",
    featuredTitle: "주요 AI 도구",
    featuredDescription: "더 촘촘하고 읽기 쉬운 그리드에서 더 많은 도구를 확인하세요.",
    inspectTool: "보기",
    updatedLabel: "실시간",
    featuredBadge: "주요",
    featuredToolsCta: "도구로 이동"
  },
  el: {
    tabs: ["Σήμερα", "Νέα", "Πιο αποθηκευμένα", "Πιο χρησιμοποιημένα", "Apps"],
    blogsTitle: "Νέοι οδηγοί blog",
    blogCta: "Όλα τα άρθρα",
    newsTitle: "AI News",
    newsCta: "Όλα τα νέα",
    toolsFeedTitle: "Ζωντανή ροή εργαλείων",
    toolsFeedDescription: "Σάρωσε συμπαγείς γραμμές, δες τιμές και ετικέτες και πήγαινε γρήγορα στο σωστό προϊόν.",
    toolsFeedCta: "Προβολή περισσότερων",
    categoryTitle: "Εξερεύνησε εργαλεία AI ανά κατηγορία",
    categoryCta: "Προβολή περισσότερων",
    compareTitle: "Δημοφιλείς συγκρίσεις",
    compareCta: "Περισσότερες συγκρίσεις",
    compareOpen: "Άνοιγμα σύγκρισης",
    featuredTitle: "Προτεινόμενα εργαλεία AI",
    featuredDescription: "Δες περισσότερα εργαλεία σε πιο πυκνό και ευανάγνωστο grid.",
    inspectTool: "Άνοιγμα",
    updatedLabel: "Live",
    featuredBadge: "Προτεινόμενο",
    featuredToolsCta: "Μετάβαση στα εργαλεία"
  },
  da: {
    tabs: ["I dag", "Nye", "Mest gemt", "Mest brugt", "Apps"],
    blogsTitle: "Seneste blogguides",
    blogCta: "Alle blogs",
    newsTitle: "AI-nyheder",
    newsCta: "Alle nyheder",
    toolsFeedTitle: "Live værktøjsfeed",
    toolsFeedDescription: "Scan kompakte rækker, se pris og tags, og gå hurtigt videre til det rigtige produkt.",
    toolsFeedCta: "Se mere",
    categoryTitle: "Udforsk AI-værktøjer efter kategori",
    categoryCta: "Se mere",
    compareTitle: "Populære sammenligninger",
    compareCta: "Flere sammenligninger",
    compareOpen: "Åbn sammenligning",
    featuredTitle: "Udvalgte AI-værktøjer",
    featuredDescription: "Se flere værktøjer i et tættere og lettere scannbart grid.",
    inspectTool: "Åbn",
    updatedLabel: "Live",
    featuredBadge: "Udvalgt",
    featuredToolsCta: "Gå til værktøjer"
  },
  fa: {
    tabs: ["امروز", "جدید", "بیشترین ذخیره", "بیشترین استفاده", "اپ‌ها"],
    blogsTitle: "راهنماهای تازه وبلاگ",
    blogCta: "همه وبلاگ‌ها",
    newsTitle: "اخبار AI",
    newsCta: "همه خبرها",
    toolsFeedTitle: "جریان زنده ابزارها",
    toolsFeedDescription: "ابزارها را در ردیف‌های فشرده ببینید، قیمت و برچسب‌ها را بررسی کنید و سریع‌تر به گزینه مناسب برسید.",
    toolsFeedCta: "مشاهده بیشتر",
    categoryTitle: "ابزارهای AI را بر اساس دسته کشف کنید",
    categoryCta: "مشاهده بیشتر",
    compareTitle: "مقایسه‌های محبوب",
    compareCta: "مقایسه‌های بیشتر",
    compareOpen: "باز کردن مقایسه",
    featuredTitle: "ابزارهای شاخص AI",
    featuredDescription: "ابزارهای بیشتری را در یک شبکه فشرده‌تر و خواناتر مرور کنید.",
    inspectTool: "مشاهده",
    updatedLabel: "زنده",
    featuredBadge: "شاخص",
    featuredToolsCta: "رفتن به ابزارها"
  }
};

function buildFeaturedCategories(categories: LocalizedCategory[]) {
  const preferredSlugs = [
    "chatbots-virtual-companions",
    "office-productivity",
    "image-generation-editing",
    "education-translation",
    "coding-development",
    "video-animation",
    "writing-editing",
    "audio-generation-conversion",
    "marketing-advertising",
    "research-data-analysis",
    "seo",
    "business"
  ];

  const preferred = preferredSlugs
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((item): item is LocalizedCategory => Boolean(item));
  const fallback = categories.filter((category) => !preferred.some((item) => item.slug === category.slug));

  return [...preferred, ...fallback].slice(0, 14);
}

function initials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toLocaleUpperCase("tr-TR");
}

function buildToolTags(tool: LocalizedTool) {
  const tags = [...tool.toolCategorySlugs, ...tool.useCaseSlugs]
    .map((tag) => tag.replaceAll("-", " "))
    .filter(Boolean);

  return [...new Set(tags)].slice(0, 3);
}

function PanelHeader({
  title,
  href,
  label
}: {
  title: string;
  href: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-base font-bold tracking-[-0.03em] text-slate-950">{title}</h2>
      <Link href={href} className="text-xs font-bold text-sky-700 transition hover:text-slate-950">
        {label}
      </Link>
    </div>
  );
}

function BlogPanel({ locale, blogs, copy }: { locale: Locale; blogs: HomeBlogPanelItem[]; copy: (typeof sectionCopy)[Locale] }) {
  return (
    <aside className="ui-card h-[22rem] rounded-[24px] p-4 lg:h-[34rem]">
      <PanelHeader title={copy.blogsTitle} href={`/${locale}/blog`} label={copy.blogCta} />
      <div className="homepage-panel-scroll mt-4 h-[calc(100%-2.5rem)] space-y-2 overflow-y-auto pr-1">
        {blogs.slice(0, 10).map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="block rounded-[18px] px-3 py-3 transition hover:bg-slate-50"
          >
            <p className="clamp-2 text-sm font-bold leading-5 text-slate-950">{post.title}</p>
            <p className="clamp-1 mt-1 text-xs leading-5 text-slate-500">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function AiNewsPanel({ locale, news, copy }: { locale: Locale; news: HomePreviewItem[]; copy: (typeof sectionCopy)[Locale] }) {
  return (
    <aside className="ui-card h-[22rem] rounded-[24px] p-4 lg:h-[34rem]">
      <PanelHeader title={copy.newsTitle} href={`/${locale}/news`} label={copy.newsCta} />
      <div className="homepage-panel-scroll mt-4 h-[calc(100%-2.5rem)] space-y-2 overflow-y-auto pr-1">
        {news.slice(0, 10).map((item) => (
          <Link
            key={item.slug}
            href={`/${locale}/news/${item.slug}`}
            className="block rounded-[18px] px-3 py-3 transition hover:bg-slate-50"
          >
            <p className="clamp-2 text-sm font-bold leading-5 text-slate-950">{item.title}</p>
            <p className="clamp-2 mt-1 text-xs leading-5 text-slate-500">{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function ToolFeedRow({ locale, tool }: { locale: Locale; tool: LocalizedTool }) {
  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="grid grid-cols-[46px_minmax(0,1fr)_auto] gap-3 rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_18px_34px_rgba(15,23,42,0.08)]"
    >
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-white">
        <Image src={getToolLogoUrl(tool.websiteUrl)} alt={tool.name} width={44} height={44} unoptimized className="h-full w-full object-contain p-2" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="clamp-1 text-sm font-bold text-slate-950">{tool.name}</span>
        </span>
        <span className="clamp-1 mt-0.5 block text-xs leading-5 text-slate-600">{tool.shortDescription}</span>
        <span className="mt-1.5 flex flex-wrap gap-1.5">
          {buildToolTags(tool).map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
              {tag}
            </span>
          ))}
        </span>
      </span>
      <span className="self-start rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-700">
        {formatPricing(tool.pricing, locale)}
      </span>
    </Link>
  );
}

function ToolsPanel({ locale, tools, copy }: { locale: Locale; tools: LocalizedTool[]; copy: (typeof sectionCopy)[Locale] }) {
  return (
    <div className="ui-card rounded-[24px] p-4 lg:h-[38rem]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.updatedLabel}</p>
          <h2 className="mt-1 text-[1.45rem] font-bold tracking-[-0.04em] text-slate-950">{copy.toolsFeedTitle}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{copy.toolsFeedDescription}</p>
        </div>
        <PremiumButton href={`/${locale}/tools`} className="min-h-[38px] rounded-full px-4 text-xs">
          {copy.toolsFeedCta}
        </PremiumButton>
      </div>
      <div className="homepage-panel-scroll mt-4 grid max-h-[26rem] gap-2.5 overflow-y-auto pr-1 lg:max-h-[30.5rem]">
        {tools.slice(0, 15).map((tool) => (
          <ToolFeedRow key={tool.slug} locale={locale} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export function HomeDirectoryShell({ locale, categories, categoryToolCounts, tools, blogs, news, comparisons }: HomeDirectoryShellProps) {
  const copy = sectionCopy[locale];
  const featuredCategories = buildFeaturedCategories(categories);
  const feedTools = tools.slice(0, 15);
  const featuredTools = tools.slice(0, 18);
  const comparisonCards = comparisons.slice(0, 12);

  return (
    <div className="mx-auto mt-7 flex w-full max-w-[1440px] flex-col gap-7 px-4 sm:px-6 lg:px-8">
      <section className="flex gap-2 overflow-x-auto pb-1">
        {copy.tabs.map((tab, index) => (
          <span
            key={tab}
            className={[
              "inline-flex min-h-[36px] shrink-0 items-center rounded-full border px-4 text-sm font-bold",
              index === 0 ? "border-sky-200 bg-sky-50 text-sky-700" : "border-slate-200 bg-white/88 text-slate-600"
            ].join(" ")}
          >
            {tab}
          </span>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[20fr_55fr_25fr]">
        <BlogPanel locale={locale} blogs={blogs} copy={copy} />
        <ToolsPanel locale={locale} tools={feedTools} copy={copy} />
        <AiNewsPanel locale={locale} news={news} copy={copy} />
      </section>

      <section className="ui-card rounded-[24px] p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[1.45rem] font-bold tracking-[-0.04em] text-slate-950">{copy.categoryTitle}</h2>
          <PremiumButton href={`/${locale}/categories`}>{copy.categoryCta}</PremiumButton>
        </div>

        <HorizontalSlider
          ariaLabel={copy.categoryTitle}
          contentClassName="grid auto-cols-[12.5rem] grid-flow-col grid-rows-2 gap-3 sm:auto-cols-[13.5rem] sm:gap-4"
        >
          {featuredCategories.map((category) => (
            <div
              key={category.slug}
              className="ui-inner-panel ui-card-hover block min-h-[118px] cursor-default snap-start rounded-[18px] px-3.5 py-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <CategoryIcon slug={category.slug} label={category.name} className="h-9 w-9 shrink-0" />
                <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  {categoryToolCounts[category.slug] ?? 0}
                </span>
              </div>
              <h3 className="clamp-2 mt-3 text-sm font-black leading-5 text-slate-950">{category.name}</h3>
            </div>
          ))}
        </HorizontalSlider>
      </section>

      <section className="ui-card rounded-[24px] p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[1.45rem] font-bold tracking-[-0.04em] text-slate-950">{copy.compareTitle}</h2>
          <PremiumButton href={`/${locale}/compare`} variant="secondary">
            {copy.compareCta}
          </PremiumButton>
        </div>

        <HorizontalSlider ariaLabel={copy.compareTitle}>
          {comparisonCards.map((comparison) => (
            <Link
              key={comparison.href}
              href={`/${locale}${comparison.href}`}
              className="ui-inner-panel ui-card-hover flex min-h-[190px] w-[19rem] shrink-0 snap-start flex-col rounded-[20px] px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex -space-x-2">
                  {comparison.logos?.slice(0, 3).map((logo) => (
                    <span key={logo.name} className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-sm">
                      {logo.logoUrl ? (
                        <Image src={logo.logoUrl} alt={logo.name} width={40} height={40} unoptimized className="h-full w-full object-contain p-1.5" />
                      ) : (
                        <span className="text-xs font-bold text-slate-600">{initials(logo.name)}</span>
                      )}
                    </span>
                  ))}
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-500">
                  {comparison.highlight}
                </span>
              </div>
              <h3 className="clamp-2 mt-4 text-base font-bold leading-6 text-slate-950">{comparison.title}</h3>
              <p className="clamp-2 mt-2 text-xs leading-5 text-slate-500">{comparison.description}</p>
              <span className="mt-auto pt-4 text-sm font-bold text-sky-700">{copy.compareOpen} →</span>
            </Link>
          ))}
        </HorizontalSlider>
      </section>

      <section className="ui-card rounded-[24px] p-5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.featuredBadge}</p>
            <h2 className="mt-1 text-[1.45rem] font-bold tracking-[-0.04em] text-slate-950">{copy.featuredTitle}</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{copy.featuredDescription}</p>
          </div>
          <PremiumButton href={`/${locale}/tools`}>{copy.featuredToolsCta}</PremiumButton>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {featuredTools.map((tool) => (
            <article key={tool.slug} className="ui-inner-panel ui-card-hover flex h-full flex-col rounded-[20px] px-3.5 py-3.5">
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[14px] border border-slate-200 bg-white">
                  <Image src={getToolLogoUrl(tool.websiteUrl)} alt={tool.name} width={40} height={40} unoptimized className="h-full w-full object-contain p-2" />
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  {formatPricing(tool.pricing, locale)}
                </span>
              </div>
              <h3 className="clamp-1 mt-3 text-sm font-bold tracking-[-0.02em] text-slate-950">{tool.name}</h3>
              <p className="clamp-2 mt-1.5 text-xs leading-5 text-slate-600">{tool.shortDescription}</p>
              <div className="mt-auto pt-3">
                <Link
                  href={`/${locale}/tools/${tool.slug}`}
                  className="inline-flex min-h-[34px] items-center rounded-full border border-sky-200 bg-sky-50 px-3 text-xs font-bold text-sky-700 transition hover:border-sky-300 hover:bg-white"
                >
                  {copy.inspectTool}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
