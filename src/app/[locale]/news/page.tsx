import type { Metadata } from "next";
import Link from "next/link";

import { toolCategoryOptions } from "@/data/tool-taxonomy";
import { AiNewsList } from "@/components/news/ai-news-list";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getLocalizedTools } from "@/lib/catalog";
import { getAiNewsItems } from "@/lib/news";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";

const newsPageCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    badgeInternal: string;
    badgeDigest: string;
    heroTitle: string;
    heroDescription: string;
    stories: string;
    sources: string;
    internalPaths: string;
    refresh: string;
    comparisons: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    readStory: string;
    originalSource: string;
    latestEyebrow: string;
    latestTitle: string;
    latestDescription: string;
    sidebarSources: string;
    sidebarTools: string;
    sidebarQuickJumps: string;
    tools: string;
    categories: string;
  }
> = {
  tr: {
    title: "AI Haberleri",
    description: "Deciply AI haberleri: kaynak özetleri, ürün sinyalleri ve iç bağlantılar.",
    badgeInternal: "İç sayfa",
    badgeDigest: "Kaynaklı özet",
    heroTitle: "AI haberlerini Deciply içinde oku, bağlamla ve iç sayfalara geç",
    heroDescription: "Public RSS ve güvenli kaynaklardan gelen haberler, Deciply’nin araç, karşılaştırma ve kategori yollarına bağlanan iç haber kartlarına dönüşür.",
    stories: "Haber",
    sources: "Kaynak",
    internalPaths: "İç yollar",
    refresh: "Haberleri yenile",
    comparisons: "Karşılaştırmalar",
    featuredEyebrow: "Öne çıkan haberler",
    featuredTitle: "Önce içeride oku, sonra kaynağa geç",
    featuredDescription: "Öne çıkan haberler başlık, özet ve bağlamla birlikte iç sayfaya yönlendirir.",
    readStory: "Haberi oku",
    originalSource: "Kaynağa git",
    latestEyebrow: "Son haberler",
    latestTitle: "Güncel AI gündemini takip et",
    latestDescription: "Daha fazla haberi Deciply içinde aç, ardından ilgili araç ve karşılaştırmalara geç.",
    sidebarSources: "Kaynaklar",
    sidebarTools: "İlgili araçlar",
    sidebarQuickJumps: "Hızlı geçişler",
    tools: "Araçlar",
    categories: "Kategoriler"
  },
  en: {
    title: "AI News",
    description: "Deciply AI news: sourced summaries, product signals, and internal paths.",
    badgeInternal: "Internal page",
    badgeDigest: "Sourced digest",
    heroTitle: "Read AI news inside Deciply, keep context, and branch into internal pages",
    heroDescription: "Public RSS and safe source feeds become internal Deciply story pages linked to tools, comparisons, and category paths.",
    stories: "Stories",
    sources: "Sources",
    internalPaths: "Internal paths",
    refresh: "Refresh news",
    comparisons: "Comparisons",
    featuredEyebrow: "Featured stories",
    featuredTitle: "Open the story inside Deciply first",
    featuredDescription: "Featured items open on internal story pages with source, context, and related Deciply paths.",
    readStory: "Read story",
    originalSource: "Original source",
    latestEyebrow: "Latest stories",
    latestTitle: "Follow the latest AI agenda",
    latestDescription: "Open more headlines inside Deciply, then branch into tools and comparisons.",
    sidebarSources: "Sources",
    sidebarTools: "Related tools",
    sidebarQuickJumps: "Quick jumps",
    tools: "Tools",
    categories: "Categories"
  },
  ar: {
    title: "أخبار AI",
    description: "أخبار Deciply: ملخصات موثوقة وإشارات منتج ومسارات داخلية.",
    badgeInternal: "صفحة داخلية",
    badgeDigest: "ملخص موثّق",
    heroTitle: "اقرأ أخبار AI داخل Deciply واحتفظ بالسياق وانتقل إلى الصفحات الداخلية",
    heroDescription: "تتحول الأخبار القادمة من RSS العام والمصادر الموثوقة إلى صفحات قصص داخلية مرتبطة بالأدوات والمقارنات والفئات.",
    stories: "القصص",
    sources: "المصادر",
    internalPaths: "مسارات داخلية",
    refresh: "تحديث الأخبار",
    comparisons: "المقارنات",
    featuredEyebrow: "أخبار مميزة",
    featuredTitle: "اقرأ داخل Deciply أولًا",
    featuredDescription: "العناصر المميزة تفتح صفحات خبر داخلية مع المصدر والسياق والروابط ذات الصلة.",
    readStory: "اقرأ الخبر",
    originalSource: "المصدر الأصلي",
    latestEyebrow: "أحدث الأخبار",
    latestTitle: "تابع أحدث مستجدات AI",
    latestDescription: "افتح المزيد من العناوين داخل Deciply ثم انتقل إلى الأدوات والمقارنات.",
    sidebarSources: "المصادر",
    sidebarTools: "أدوات ذات صلة",
    sidebarQuickJumps: "روابط سريعة",
    tools: "الأدوات",
    categories: "الفئات"
  },
  ru: {
    title: "Новости AI",
    description: "Новости Deciply: краткие сводки, сигналы по продуктам и внутренние переходы.",
    badgeInternal: "Внутренняя страница",
    badgeDigest: "Сводка по источникам",
    heroTitle: "Читайте новости AI внутри Deciply и переходите к связанным страницам",
    heroDescription: "Новости из публичных RSS и надежных источников превращаются во внутренние страницы Deciply, связанные с инструментами, сравнениями и категориями.",
    stories: "Материалы",
    sources: "Источники",
    internalPaths: "Внутренние пути",
    refresh: "Обновить новости",
    comparisons: "Сравнения",
    featuredEyebrow: "Рекомендуемые новости",
    featuredTitle: "Сначала откройте материал внутри Deciply",
    featuredDescription: "Рекомендуемые материалы открываются на внутренних страницах с источником, контекстом и связанными путями.",
    readStory: "Читать материал",
    originalSource: "Оригинальный источник",
    latestEyebrow: "Последние новости",
    latestTitle: "Следите за актуальной AI-повесткой",
    latestDescription: "Открывайте больше новостей внутри Deciply, а затем переходите к инструментам и сравнениям.",
    sidebarSources: "Источники",
    sidebarTools: "Связанные инструменты",
    sidebarQuickJumps: "Быстрые переходы",
    tools: "Инструменты",
    categories: "Категории"
  },
  zh: {
    title: "AI 新闻",
    description: "Deciply AI 新闻：来源摘要、产品信号与站内路径。",
    badgeInternal: "站内页面",
    badgeDigest: "来源摘要",
    heroTitle: "在 Deciply 内阅读 AI 新闻并继续探索相关页面",
    heroDescription: "来自公开 RSS 和可靠来源的新闻会转化为 Deciply 站内故事页面，并连接到工具、对比和分类。",
    stories: "新闻",
    sources: "来源",
    internalPaths: "站内路径",
    refresh: "刷新新闻",
    comparisons: "对比",
    featuredEyebrow: "精选新闻",
    featuredTitle: "先在 Deciply 内阅读，再决定是否跳转来源",
    featuredDescription: "精选内容会打开站内新闻页，并附带来源、背景和相关路径。",
    readStory: "阅读新闻",
    originalSource: "原始来源",
    latestEyebrow: "最新新闻",
    latestTitle: "追踪最新 AI 动态",
    latestDescription: "在 Deciply 内打开更多新闻，然后继续浏览工具与对比。",
    sidebarSources: "来源",
    sidebarTools: "相关工具",
    sidebarQuickJumps: "快速跳转",
    tools: "工具",
    categories: "分类"
  },
  ja: {
    title: "AIニュース",
    description: "Deciply AIニュース：要約、製品シグナル、内部導線。",
    badgeInternal: "内部ページ",
    badgeDigest: "ソース要約",
    heroTitle: "Deciply内でAIニュースを読み、関連ページへ進む",
    heroDescription: "公開RSSと信頼できる情報源のニュースを、ツール・比較・カテゴリへつながるDeciply内の記事ページとして整理しています。",
    stories: "記事",
    sources: "ソース",
    internalPaths: "内部導線",
    refresh: "ニュースを更新",
    comparisons: "比較",
    featuredEyebrow: "注目ニュース",
    featuredTitle: "まずはDeciply内で読む",
    featuredDescription: "注目ニュースは、ソース・文脈・関連導線付きの内部ページで開きます。",
    readStory: "記事を読む",
    originalSource: "元のソース",
    latestEyebrow: "最新ニュース",
    latestTitle: "最新のAIトピックを追う",
    latestDescription: "Deciply内でさらに記事を開き、関連ツールや比較へ進めます。",
    sidebarSources: "ソース",
    sidebarTools: "関連ツール",
    sidebarQuickJumps: "クイックリンク",
    tools: "ツール",
    categories: "カテゴリ"
  },
  ko: {
    title: "AI 뉴스",
    description: "Deciply AI 뉴스: 출처 요약, 제품 신호, 내부 경로.",
    badgeInternal: "내부 페이지",
    badgeDigest: "출처 요약",
    heroTitle: "Deciply 안에서 AI 뉴스를 읽고 관련 페이지로 이어가세요",
    heroDescription: "공개 RSS와 신뢰할 수 있는 출처의 뉴스가 도구, 비교, 카테고리로 연결되는 Deciply 내부 스토리 페이지로 정리됩니다.",
    stories: "기사",
    sources: "출처",
    internalPaths: "내부 경로",
    refresh: "뉴스 새로고침",
    comparisons: "비교",
    featuredEyebrow: "추천 뉴스",
    featuredTitle: "먼저 Deciply 안에서 읽어보세요",
    featuredDescription: "추천 뉴스는 출처, 맥락, 관련 경로가 함께 있는 내부 페이지로 열립니다.",
    readStory: "기사 읽기",
    originalSource: "원문 출처",
    latestEyebrow: "최신 뉴스",
    latestTitle: "최신 AI 흐름 살펴보기",
    latestDescription: "Deciply 안에서 더 많은 뉴스를 열고 도구와 비교로 이어가세요.",
    sidebarSources: "출처",
    sidebarTools: "관련 도구",
    sidebarQuickJumps: "빠른 이동",
    tools: "도구",
    categories: "카테고리"
  },
  el: {
    title: "Νέα AI",
    description: "Νέα Deciply: σύνοψη πηγών, σήματα προϊόντων και εσωτερικές διαδρομές.",
    badgeInternal: "Εσωτερική σελίδα",
    badgeDigest: "Σύνοψη πηγής",
    heroTitle: "Διάβασε νέα AI μέσα στο Deciply και συνέχισε σε σχετικές σελίδες",
    heroDescription: "Τα νέα από δημόσια RSS και αξιόπιστες πηγές γίνονται εσωτερικές σελίδες Deciply που συνδέονται με εργαλεία, συγκρίσεις και κατηγορίες.",
    stories: "Ιστορίες",
    sources: "Πηγές",
    internalPaths: "Εσωτερικές διαδρομές",
    refresh: "Ανανέωση ειδήσεων",
    comparisons: "Συγκρίσεις",
    featuredEyebrow: "Προτεινόμενες ειδήσεις",
    featuredTitle: "Άνοιξε πρώτα την ιστορία μέσα στο Deciply",
    featuredDescription: "Τα προτεινόμενα άρθρα ανοίγουν σε εσωτερικές σελίδες με πηγή, πλαίσιο και σχετικές διαδρομές.",
    readStory: "Διάβασε το άρθρο",
    originalSource: "Αρχική πηγή",
    latestEyebrow: "Τελευταίες ειδήσεις",
    latestTitle: "Παρακολούθησε την τελευταία ατζέντα AI",
    latestDescription: "Άνοιξε περισσότερους τίτλους μέσα στο Deciply και μετά πήγαινε σε εργαλεία και συγκρίσεις.",
    sidebarSources: "Πηγές",
    sidebarTools: "Σχετικά εργαλεία",
    sidebarQuickJumps: "Γρήγορες μεταβάσεις",
    tools: "Εργαλεία",
    categories: "Κατηγορίες"
  },
  da: {
    title: "AI-nyheder",
    description: "Deciply AI-nyheder: kildebaserede resuméer, produktsignaler og interne stier.",
    badgeInternal: "Intern side",
    badgeDigest: "Kilderesumé",
    heroTitle: "Læs AI-nyheder i Deciply og gå videre til relevante sider",
    heroDescription: "Nyheder fra offentlige RSS-feeds og sikre kilder bliver til interne Deciply-sider med links til værktøjer, sammenligninger og kategorier.",
    stories: "Historier",
    sources: "Kilder",
    internalPaths: "Interne stier",
    refresh: "Opdater nyheder",
    comparisons: "Sammenligninger",
    featuredEyebrow: "Udvalgte historier",
    featuredTitle: "Læs historien i Deciply først",
    featuredDescription: "Udvalgte historier åbner på interne sider med kilde, kontekst og relaterede stier.",
    readStory: "Læs historien",
    originalSource: "Original kilde",
    latestEyebrow: "Seneste historier",
    latestTitle: "Følg den nyeste AI-dagsorden",
    latestDescription: "Åbn flere historier i Deciply og fortsæt derefter til værktøjer og sammenligninger.",
    sidebarSources: "Kilder",
    sidebarTools: "Relaterede værktøjer",
    sidebarQuickJumps: "Hurtige hop",
    tools: "Værktøjer",
    categories: "Kategorier"
  },
  fa: {
    title: "اخبار AI",
    description: "اخبار Deciply: خلاصه‌های منبع، سیگنال‌های محصول و مسیرهای داخلی.",
    badgeInternal: "صفحه داخلی",
    badgeDigest: "خلاصه منبع",
    heroTitle: "اخبار AI را داخل Deciply بخوانید و به صفحات مرتبط بروید",
    heroDescription: "خبرهای RSS عمومی و منابع مطمئن به صفحه‌های داخلی Deciply تبدیل می‌شوند و به ابزارها، مقایسه‌ها و دسته‌ها وصل می‌شوند.",
    stories: "خبرها",
    sources: "منابع",
    internalPaths: "مسیرهای داخلی",
    refresh: "به‌روزرسانی خبرها",
    comparisons: "مقایسه‌ها",
    featuredEyebrow: "خبرهای منتخب",
    featuredTitle: "اول خبر را داخل Deciply بخوانید",
    featuredDescription: "خبرهای منتخب در صفحه‌های داخلی با منبع، زمینه و مسیرهای مرتبط باز می‌شوند.",
    readStory: "خواندن خبر",
    originalSource: "منبع اصلی",
    latestEyebrow: "آخرین خبرها",
    latestTitle: "آخرین جریان AI را دنبال کنید",
    latestDescription: "خبرهای بیشتری را داخل Deciply باز کنید و سپس به ابزارها و مقایسه‌ها بروید.",
    sidebarSources: "منابع",
    sidebarTools: "ابزارهای مرتبط",
    sidebarQuickJumps: "میانبرها",
    tools: "ابزارها",
    categories: "دسته‌ها"
  }
};

function formatDate(locale: Locale, value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : locale, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const copy = newsPageCopy[safeLocale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/news`),
      languages: buildAlternates("/news")
    }
  };
}

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const copy = newsPageCopy[safeLocale];
  const items = await getAiNewsItems(safeLocale, 10);
  const featuredItems = items.slice(0, 3);
  const latestItems = items.slice(3);
  const featuredTools = getLocalizedTools(safeLocale).filter((tool) => tool.featured).slice(0, 4);
  const toolCategoryLabelMap = new Map<string, string>(toolCategoryOptions[safeLocale].map((item) => [item.slug, item.label]));
  const uniqueSources = Array.from(new Set(items.map((item) => item.source))).slice(0, 6);
  const topicLabels = Array.from(new Set(items.map((item) => item.categoryLabel))).slice(0, 8);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip bg-transparent px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="ui-card ui-card-hover rounded-[32px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{copy.title}</Badge>
          <Badge variant="ghost">{copy.badgeInternal}</Badge>
          <Badge variant="ghost">{copy.badgeDigest}</Badge>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{copy.heroDescription}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {topicLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex min-h-[32px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.16)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="ui-card rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_52px_-36px_rgba(37,99,235,0.14)]">
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{copy.stories}</p>
                <p className="mt-1 text-lg font-bold text-slate-950">{items.length}</p>
              </div>
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{copy.sources}</p>
                <p className="mt-1 text-lg font-bold text-slate-950">{uniqueSources.length}</p>
              </div>
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{copy.internalPaths}</p>
                <p className="mt-1 text-lg font-bold text-slate-950">Deciply</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <PremiumButton href={`/${safeLocale}/news`}>{copy.refresh}</PremiumButton>
              <PremiumButton href={`/${safeLocale}/compare`} variant="secondary">
                {copy.comparisons}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <SectionShell
            eyebrow={copy.featuredEyebrow}
            title={copy.featuredTitle}
            description={copy.featuredDescription}
            className="px-0 sm:px-0"
            contentClassName="grid gap-4 md:grid-cols-3"
          >
            {featuredItems.map((item) => {
              const publishedAt = formatDate(safeLocale, item.publishedAt);
              const title = item.displayTitle ?? item.title;
              const summary = item.displaySummary ?? item.summary;

              return (
                <article
                  key={item.slug}
                  className="ui-card ui-card-hover group rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_18px_52px_-36px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="muted" className="text-[10px]">
                      {item.categoryLabel}
                    </Badge>
                    {publishedAt ? <span className="text-[11px] text-slate-400">{publishedAt}</span> : null}
                  </div>
                  <h2 className="mt-3 text-lg font-bold tracking-[-0.03em] text-slate-950 transition group-hover:text-sky-700">
                    <Link href={`/${safeLocale}/news/${item.slug}`}>{title}</Link>
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/${safeLocale}/news/${item.slug}`}
                      className="inline-flex min-h-[30px] items-center rounded-full border border-sky-200 bg-sky-50 px-3 text-[11px] font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100"
                    >
                      {copy.readStory}
                    </Link>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[30px] items-center rounded-full border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                    >
                      {copy.originalSource}
                    </a>
                  </div>
                </article>
              );
            })}
          </SectionShell>

          <SectionShell
            eyebrow={copy.latestEyebrow}
            title={copy.latestTitle}
            description={copy.latestDescription}
            className="px-0 sm:px-0"
            contentClassName="space-y-3"
          >
            <AiNewsList locale={safeLocale} items={latestItems} />
          </SectionShell>
        </div>

        <aside className="space-y-6">
          <div className="ui-card rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.sidebarSources}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {uniqueSources.map((source) => (
                <span
                  key={source}
                  className="inline-flex min-h-[32px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

          <div className="ui-card rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.sidebarTools}</p>
            <div className="mt-4 space-y-2">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${safeLocale}/tools/${tool.slug}`}
                  className="flex items-center justify-between gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-sky-200 hover:bg-white"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-950">{tool.name}</span>
                    <span className="block text-[11px] text-slate-500">{tool.bestUseCase}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {toolCategoryLabelMap.get(tool.toolCategorySlugs[0] ?? "writing") ?? tool.bestUseCase}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="ui-card rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.sidebarQuickJumps}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/${safeLocale}/tools`}
                className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
              >
                {copy.tools}
              </Link>
              <Link
                href={`/${safeLocale}/compare`}
                className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
              >
                {copy.comparisons}
              </Link>
              <Link
                href={`/${safeLocale}/categories`}
                className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
              >
                {copy.categories}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
