"use client";

import Link from "next/link";
import Image from "next/image";
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

const feedTabs: Array<{ key: FeedTabKey; label: Record<Locale, string> }> = [
  {
    key: "today",
    label: { tr: "Bugün", en: "Today", ar: "اليوم", ru: "Сегодня", zh: "今天", ja: "今日", ko: "오늘", el: "Σήμερα", da: "I dag", fa: "امروز" }
  },
  {
    key: "new",
    label: { tr: "Yeni", en: "New", ar: "الجديد", ru: "Новое", zh: "最新", ja: "新着", ko: "신규", el: "Νέα", da: "Nyt", fa: "جدید" }
  },
  {
    key: "saved",
    label: { tr: "En çok kaydedilenler", en: "Most saved", ar: "الأكثر حفظًا", ru: "Чаще сохраняют", zh: "最多收藏", ja: "保存数が多い", ko: "가장 많이 저장됨", el: "Πιο αποθηκευμένα", da: "Mest gemte", fa: "بیشترین ذخیره" }
  },
  {
    key: "used",
    label: { tr: "En çok kullanılanlar", en: "Most used", ar: "الأكثر استخدامًا", ru: "Чаще используют", zh: "使用最多", ja: "最も使われる", ko: "가장 많이 사용됨", el: "Πιο χρησιμοποιημένα", da: "Mest brugte", fa: "بیشترین استفاده" }
  },
  {
    key: "apps",
    label: { tr: "Uygulamalar", en: "Apps", ar: "التطبيقات", ru: "Приложения", zh: "应用", ja: "アプリ", ko: "앱", el: "Εφαρμογές", da: "Apps", fa: "اپ‌ها" }
  }
];

const homeDiscoveryCopy: Record<
  Locale,
  {
    open: string;
    viewDetails: string;
    blogEyebrow: string;
    blogTitle: string;
    blogDescription: string;
    blogCta: string;
    toolEyebrow: string;
    toolTitle: string;
    toolDescription: string;
    toolCta: string;
    newsEyebrow: string;
    newsTitle: string;
    newsDescription: string;
    newsCta: string;
    categoryEyebrow: string;
    categoryTitle: string;
    categoryDescription: string;
    categoryCta: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    featuredCta: string;
  }
> = {
  tr: {
    open: "İncele",
    viewDetails: "Detayı gör",
    blogEyebrow: "Güncel Bloglar",
    blogTitle: "Son rehberler ve karar yazıları",
    blogDescription: "Kısa başlıklar ve bir satırlık özetlerle en güncel blog içeriğini tara.",
    blogCta: "Tüm blogları gör",
    toolEyebrow: "Canlı araç akışı",
    toolTitle: "En iyi araçları küçük, hızlı satırlarda tara",
    toolDescription: "Logo, fiyat sinyali, kısa açıklama ve etiketlerle daha yoğun bir keşif akışı.",
    toolCta: "Daha fazla görüntüle",
    newsEyebrow: "AI Haberleri",
    newsTitle: "İç haber akışı ve hızlı sinyaller",
    newsDescription: "Dışa yönlendirmeden önce Deciply içinde açılan kısa haber detayları.",
    newsCta: "Tüm haberleri gör",
    categoryEyebrow: "Kategoriler",
    categoryTitle: "Kategoriye göre ücretsiz AI araçları",
    categoryDescription: "Popüler kullanım alanlarını kompakt kartlarla tara ve doğru kategoriye hızlıca geç.",
    categoryCta: "Daha fazla görüntüle",
    featuredEyebrow: "Öne çıkan araçlar",
    featuredTitle: "Öne çıkan yapay zekalar",
    featuredDescription: "Kartları küçülttük, yoğunluğu artırdık ve daha çok aracı tek bakışta görünür tuttuk.",
    featuredCta: "Daha fazla görüntüle"
  },
  en: {
    open: "Open",
    viewDetails: "View details",
    blogEyebrow: "Latest blogs",
    blogTitle: "Fresh guides and decision posts",
    blogDescription: "Scan the newest blog content through compact titles and one-line excerpts.",
    blogCta: "View all blogs",
    toolEyebrow: "Live tool stream",
    toolTitle: "Scan the best tools in compact, fast rows",
    toolDescription: "Logos, pricing, short descriptions, and tags keep the feed dense and easy to scan.",
    toolCta: "Show more tools",
    newsEyebrow: "AI News",
    newsTitle: "Internal news feed and quick signals",
    newsDescription: "Open concise news detail pages inside Deciply before any external source action.",
    newsCta: "View all news",
    categoryEyebrow: "Categories",
    categoryTitle: "Free AI tools by category",
    categoryDescription: "Scan popular use-case categories through compact cards and move into the right directory faster.",
    categoryCta: "Show more",
    featuredEyebrow: "Featured tools",
    featuredTitle: "Featured AI tools",
    featuredDescription: "We tightened the cards and raised density so more tools stay visible at a glance.",
    featuredCta: "Show more"
  },
  ar: {
    open: "افتح",
    viewDetails: "عرض التفاصيل",
    blogEyebrow: "أحدث الأدلة",
    blogTitle: "أحدث الأدلة ومقالات القرار",
    blogDescription: "تصفح أحدث محتوى المدونة عبر عناوين مختصرة وملخصات سريعة.",
    blogCta: "عرض كل المدونات",
    toolEyebrow: "تدفق الأدوات",
    toolTitle: "استعرض أفضل الأدوات في صفوف سريعة ومضغوطة",
    toolDescription: "الشعارات والسعر والوصف المختصر والوسوم تجعل الاستكشاف أسرع وأسهل.",
    toolCta: "عرض المزيد",
    newsEyebrow: "أخبار AI",
    newsTitle: "موجز الأخبار والإشارات السريعة",
    newsDescription: "افتح صفحات أخبار Deciply المختصرة قبل الانتقال إلى المصدر الخارجي.",
    newsCta: "عرض كل الأخبار",
    categoryEyebrow: "الفئات",
    categoryTitle: "أدوات AI المجانية حسب الفئة",
    categoryDescription: "تصفح حالات الاستخدام الشائعة عبر بطاقات مدمجة وانتقل سريعًا إلى الفئة المناسبة.",
    categoryCta: "عرض المزيد",
    featuredEyebrow: "أدوات مميزة",
    featuredTitle: "أدوات AI المميزة",
    featuredDescription: "صغّرنا البطاقات وزدنا الكثافة لتظهر أدوات أكثر في النظرة الأولى.",
    featuredCta: "عرض المزيد"
  },
  ru: {
    open: "Открыть",
    viewDetails: "Подробнее",
    blogEyebrow: "Свежие гайды",
    blogTitle: "Новые гайды и материалы для выбора",
    blogDescription: "Просматривайте свежие статьи по коротким заголовкам и лаконичным описаниям.",
    blogCta: "Все статьи блога",
    toolEyebrow: "Поток инструментов",
    toolTitle: "Просматривайте лучшие инструменты в компактных быстрых строках",
    toolDescription: "Логотипы, цена, короткие описания и теги делают поиск более плотным и удобным.",
    toolCta: "Показать больше",
    newsEyebrow: "Новости AI",
    newsTitle: "Внутренний новостной поток и быстрые сигналы",
    newsDescription: "Открывайте краткие новости внутри Deciply до перехода к внешнему источнику.",
    newsCta: "Все новости",
    categoryEyebrow: "Категории",
    categoryTitle: "Бесплатные AI-инструменты по категориям",
    categoryDescription: "Просматривайте популярные сценарии использования через компактные карточки и быстрее переходите в нужную категорию.",
    categoryCta: "Показать больше",
    featuredEyebrow: "Рекомендуемые инструменты",
    featuredTitle: "Рекомендуемые AI-инструменты",
    featuredDescription: "Мы сделали карточки компактнее и повысили плотность, чтобы больше инструментов было видно сразу.",
    featuredCta: "Показать больше"
  },
  zh: {
    open: "打开",
    viewDetails: "查看详情",
    blogEyebrow: "最新博客",
    blogTitle: "最新指南与决策内容",
    blogDescription: "通过简短标题和精炼摘要快速浏览最新博客内容。",
    blogCta: "查看全部博客",
    toolEyebrow: "工具动态流",
    toolTitle: "用紧凑快速的列表浏览优质工具",
    toolDescription: "Logo、价格、简短说明与标签让浏览更高效。",
    toolCta: "查看更多",
    newsEyebrow: "AI 新闻",
    newsTitle: "站内新闻流与快速信号",
    newsDescription: "先在 Deciply 内查看简短新闻详情，再决定是否跳转外部来源。",
    newsCta: "查看全部新闻",
    categoryEyebrow: "分类",
    categoryTitle: "按分类探索免费 AI 工具",
    categoryDescription: "通过紧凑卡片浏览热门使用场景，更快进入合适分类。",
    categoryCta: "查看更多",
    featuredEyebrow: "精选工具",
    featuredTitle: "精选 AI 工具",
    featuredDescription: "我们缩小了卡片并提高了信息密度，让更多工具能在首屏被看到。",
    featuredCta: "查看更多"
  },
  ja: {
    open: "開く",
    viewDetails: "詳細を見る",
    blogEyebrow: "最新ブログ",
    blogTitle: "最新ガイドと比較コンテンツ",
    blogDescription: "短い見出しと要約で最新のブログ記事をすばやく確認できます。",
    blogCta: "すべてのブログを見る",
    toolEyebrow: "ツールストリーム",
    toolTitle: "優れたツールをコンパクトな行で素早く確認",
    toolDescription: "ロゴ、価格、短い説明、タグで効率よくスキャンできます。",
    toolCta: "さらに表示",
    newsEyebrow: "AIニュース",
    newsTitle: "サイト内ニュースとクイックシグナル",
    newsDescription: "外部ソースへ移動する前に Deciply 内で短いニュース詳細を開けます。",
    newsCta: "すべてのニュースを見る",
    categoryEyebrow: "カテゴリ",
    categoryTitle: "カテゴリ別の無料AIツール",
    categoryDescription: "人気ユースケースをコンパクトなカードで確認し、最適なカテゴリへ素早く移動できます。",
    categoryCta: "さらに表示",
    featuredEyebrow: "注目ツール",
    featuredTitle: "注目のAIツール",
    featuredDescription: "カードを小さくして密度を高め、より多くのツールを一目で見られるようにしました。",
    featuredCta: "さらに表示"
  },
  ko: {
    open: "열기",
    viewDetails: "자세히 보기",
    blogEyebrow: "최신 블로그",
    blogTitle: "최신 가이드와 의사결정 콘텐츠",
    blogDescription: "짧은 제목과 간단한 요약으로 최신 블로그를 빠르게 살펴보세요.",
    blogCta: "모든 블로그 보기",
    toolEyebrow: "도구 스트림",
    toolTitle: "좋은 도구를 빠르고 촘촘한 행으로 살펴보세요",
    toolDescription: "로고, 가격, 짧은 설명, 태그로 더 빠르게 스캔할 수 있습니다.",
    toolCta: "더 보기",
    newsEyebrow: "AI 뉴스",
    newsTitle: "내부 뉴스 피드와 빠른 신호",
    newsDescription: "외부 출처로 이동하기 전에 Deciply 안에서 짧은 뉴스 상세를 확인하세요.",
    newsCta: "모든 뉴스 보기",
    categoryEyebrow: "카테고리",
    categoryTitle: "카테고리별 무료 AI 도구",
    categoryDescription: "인기 활용 분야를 컴팩트한 카드로 살펴보고 알맞은 카테고리로 빠르게 이동하세요.",
    categoryCta: "더 보기",
    featuredEyebrow: "추천 도구",
    featuredTitle: "추천 AI 도구",
    featuredDescription: "카드를 더 작게 만들고 밀도를 높여 한눈에 더 많은 도구가 보이도록 했습니다.",
    featuredCta: "더 보기"
  },
  el: {
    open: "Άνοιγμα",
    viewDetails: "Δες λεπτομέρειες",
    blogEyebrow: "Νέα άρθρα",
    blogTitle: "Νέοι οδηγοί και περιεχόμενο απόφασης",
    blogDescription: "Δες το πιο πρόσφατο περιεχόμενο του blog μέσα από σύντομους τίτλους και περιλήψεις.",
    blogCta: "Όλα τα άρθρα blog",
    toolEyebrow: "Ροή εργαλείων",
    toolTitle: "Σκάναρε τα καλύτερα εργαλεία σε γρήγορες συμπαγείς γραμμές",
    toolDescription: "Λογότυπα, τιμή, σύντομες περιγραφές και ετικέτες κάνουν την αναζήτηση πιο άμεση.",
    toolCta: "Δες περισσότερα",
    newsEyebrow: "Νέα AI",
    newsTitle: "Εσωτερική ροή ειδήσεων και γρήγορα σήματα",
    newsDescription: "Άνοιξε σύντομες ειδήσεις μέσα στο Deciply πριν πας στην εξωτερική πηγή.",
    newsCta: "Όλες οι ειδήσεις",
    categoryEyebrow: "Κατηγορίες",
    categoryTitle: "Δωρεάν εργαλεία AI ανά κατηγορία",
    categoryDescription: "Σκάναρε δημοφιλείς χρήσεις μέσα από compact κάρτες και πήγαινε πιο γρήγορα στη σωστή κατηγορία.",
    categoryCta: "Δες περισσότερα",
    featuredEyebrow: "Προτεινόμενα εργαλεία",
    featuredTitle: "Προτεινόμενα εργαλεία AI",
    featuredDescription: "Μικρύναμε τις κάρτες και αυξήσαμε την πυκνότητα ώστε να φαίνονται περισσότερα εργαλεία με μια ματιά.",
    featuredCta: "Δες περισσότερα"
  },
  da: {
    open: "Åbn",
    viewDetails: "Se detaljer",
    blogEyebrow: "Seneste blogindlæg",
    blogTitle: "Nye guides og beslutningsindhold",
    blogDescription: "Scan det nyeste blogindhold gennem korte titler og præcise uddrag.",
    blogCta: "Se alle blogindlæg",
    toolEyebrow: "Værktøjsfeed",
    toolTitle: "Scan de bedste værktøjer i kompakte, hurtige rækker",
    toolDescription: "Logoer, priser, korte beskrivelser og tags gør feedet tæt og nemt at overskue.",
    toolCta: "Se mere",
    newsEyebrow: "AI-nyheder",
    newsTitle: "Internt nyhedsfeed og hurtige signaler",
    newsDescription: "Åbn korte nyhedssider i Deciply, før du går videre til den eksterne kilde.",
    newsCta: "Se alle nyheder",
    categoryEyebrow: "Kategorier",
    categoryTitle: "Gratis AI-værktøjer efter kategori",
    categoryDescription: "Scan populære brugsscenarier i kompakte kort og gå hurtigere til den rigtige kategori.",
    categoryCta: "Se mere",
    featuredEyebrow: "Fremhævede værktøjer",
    featuredTitle: "Fremhævede AI-værktøjer",
    featuredDescription: "Vi gjorde kortene mindre og øgede tætheden, så flere værktøjer er synlige med det samme.",
    featuredCta: "Se mere"
  },
  fa: {
    open: "باز کردن",
    viewDetails: "دیدن جزئیات",
    blogEyebrow: "آخرین وبلاگ‌ها",
    blogTitle: "راهنماها و مطالب تصمیم‌گیری جدید",
    blogDescription: "جدیدترین مطالب وبلاگ را با عنوان‌های کوتاه و خلاصه‌های فشرده مرور کنید.",
    blogCta: "همه وبلاگ‌ها",
    toolEyebrow: "جریان ابزارها",
    toolTitle: "بهترین ابزارها را در ردیف‌های فشرده و سریع مرور کنید",
    toolDescription: "لوگو، قیمت، توضیح کوتاه و برچسب‌ها باعث می‌شوند مرور سریع‌تر شود.",
    toolCta: "مشاهده بیشتر",
    newsEyebrow: "اخبار AI",
    newsTitle: "جریان خبر داخلی و سیگنال‌های سریع",
    newsDescription: "پیش از رفتن به منبع بیرونی، خبرهای کوتاه را داخل Deciply باز کنید.",
    newsCta: "همه خبرها",
    categoryEyebrow: "دسته‌ها",
    categoryTitle: "ابزارهای رایگان AI بر اساس دسته",
    categoryDescription: "موارد استفاده محبوب را با کارت‌های فشرده مرور کنید و سریع‌تر به دسته مناسب بروید.",
    categoryCta: "مشاهده بیشتر",
    featuredEyebrow: "ابزارهای منتخب",
    featuredTitle: "ابزارهای منتخب AI",
    featuredDescription: "کارت‌ها را کوچک‌تر و فشرده‌تر کردیم تا ابزارهای بیشتری در یک نگاه دیده شوند.",
    featuredCta: "مشاهده بیشتر"
  }
};

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
        <Image src={tool.logoUrl} alt={tool.name} width={48} height={48} unoptimized className="h-full w-full object-contain p-2" />
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
          <Image src={thumbnail.value} alt={article.title} width={44} height={44} unoptimized className="h-full w-full object-contain p-2" />
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
  const copy = homeDiscoveryCopy[locale];
  const detailHref = `/${locale}${tool.href}`;

  return (
    <Link
      href={detailHref}
      aria-label={`${copy.open}: ${tool.name}`}
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
        {copy.open}
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
  const copy = homeDiscoveryCopy[locale];
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
          {copy.viewDetails}
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
  const copy = homeDiscoveryCopy[locale];

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
                {tab.label[locale]}
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,2.15fr)_minmax(0,1.05fr)]">
          <aside className="ui-card-strong flex h-full flex-col rounded-[28px] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.blogEyebrow}</p>
                <h3 className="mt-2 text-[1.02rem] font-bold tracking-[-0.03em] text-slate-950">
                  {copy.blogTitle}
                </h3>
              </div>
              <Badge variant="ghost" className="shrink-0 text-[11px]">
                {blogArticles.length}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {copy.blogDescription}
            </p>
            <div className="mt-4 space-y-2.5">
              {blogArticles.map((article) => (
                <BlogFeedCard key={article.slug} locale={locale} article={article} toolLookup={toolLookup} />
              ))}
            </div>
            <div className="mt-4">
              <PremiumButton href={`/${locale}/blog`} variant="secondary" className="w-full">
                {copy.blogCta}
              </PremiumButton>
            </div>
          </aside>

          <section className="ui-card-strong flex h-full flex-col rounded-[28px] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.toolEyebrow}</p>
                <h3 className="mt-2 text-[1.05rem] font-bold tracking-[-0.03em] text-slate-950">
                  {copy.toolTitle}
                </h3>
              </div>
              <Badge variant="ghost" className="shrink-0 text-[11px]">
                {activeTools.length}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {copy.toolDescription}
            </p>

            <div className="mt-4 grid gap-2.5">
              {activeTools.map((tool) => (
                <DirectoryRow key={tool.href} locale={locale} tool={tool} />
              ))}
            </div>

            <div className="mt-4">
              <PremiumButton href={`/${locale}/tools`} className="w-full">
                {copy.toolCta}
              </PremiumButton>
            </div>
          </section>

          <aside className="ui-card-strong flex h-full flex-col rounded-[28px] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{copy.newsEyebrow}</p>
                <h3 className="mt-2 text-[1.05rem] font-bold tracking-[-0.03em] text-slate-950">
                  {copy.newsTitle}
                </h3>
              </div>
              <Badge variant="ghost" className="shrink-0 text-[11px]">
                {newsItems.length}
              </Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {copy.newsDescription}
            </p>

            <div className="mt-4 space-y-2.5">
              {newsItems.map((item, index) => (
                <NewsItemRow key={item.slug} locale={locale} item={item} index={index} />
              ))}
            </div>

            <div className="mt-4">
              <PremiumButton href={`/${locale}/news`} variant="secondary" className="w-full">
                {copy.newsCta}
              </PremiumButton>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-8">
        <SectionShell
          tone="light"
          className="section-tint-slate px-0 sm:px-0"
          eyebrow={copy.categoryEyebrow}
          title={copy.categoryTitle}
          description={copy.categoryDescription}
          actions={<PremiumButton href={`/${locale}/categories`}>{copy.categoryCta}</PremiumButton>}
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
          eyebrow={copy.featuredEyebrow}
          title={copy.featuredTitle}
          description={copy.featuredDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{copy.featuredCta}</PremiumButton>}
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
