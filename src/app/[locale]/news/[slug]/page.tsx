import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale, type Locale } from "@/i18n/config";
import { getAiNewsItemBySlug } from "@/lib/news";

const newsDetailCopy: Record<
  Locale,
  {
    newsTitle: string;
    eyebrow: string;
    home: string;
    source: string;
    published: string;
    internalLinks: string;
    allNews: string;
    originalSource: string;
    digest: string;
    whyItMatters: string;
  }
> = {
  tr: { newsTitle: "AI Haberleri", eyebrow: "AI haber detay", home: "Ana sayfa", source: "Kaynak", published: "Yayın tarihi", internalLinks: "İç link", allNews: "Tüm haberler", originalSource: "Orijinal kaynak", digest: "Editoryal özet", whyItMatters: "Neden önemli" },
  en: { newsTitle: "AI News", eyebrow: "AI news detail", home: "Home", source: "Source", published: "Published", internalLinks: "Internal links", allNews: "All news", originalSource: "Original source", digest: "Editorial digest", whyItMatters: "Why it matters" },
  ar: { newsTitle: "أخبار AI", eyebrow: "تفاصيل خبر AI", home: "الرئيسية", source: "المصدر", published: "تاريخ النشر", internalLinks: "روابط داخلية", allNews: "كل الأخبار", originalSource: "المصدر الأصلي", digest: "الملخص التحريري", whyItMatters: "لماذا هذا مهم" },
  ru: { newsTitle: "Новости AI", eyebrow: "Детали новости AI", home: "Главная", source: "Источник", published: "Дата публикации", internalLinks: "Внутренние ссылки", allNews: "Все новости", originalSource: "Оригинальный источник", digest: "Редакционная сводка", whyItMatters: "Почему это важно" },
  zh: { newsTitle: "AI 新闻", eyebrow: "AI 新闻详情", home: "首页", source: "来源", published: "发布时间", internalLinks: "站内链接", allNews: "全部新闻", originalSource: "原始来源", digest: "编辑摘要", whyItMatters: "为什么重要" },
  ja: { newsTitle: "AIニュース", eyebrow: "AIニュース詳細", home: "ホーム", source: "ソース", published: "公開日", internalLinks: "内部リンク", allNews: "すべてのニュース", originalSource: "元のソース", digest: "編集要約", whyItMatters: "重要な理由" },
  ko: { newsTitle: "AI 뉴스", eyebrow: "AI 뉴스 상세", home: "홈", source: "출처", published: "게시일", internalLinks: "내부 링크", allNews: "모든 뉴스", originalSource: "원문 출처", digest: "편집 요약", whyItMatters: "왜 중요한가" },
  el: { newsTitle: "Νέα AI", eyebrow: "Λεπτομέρεια νέου AI", home: "Αρχική", source: "Πηγή", published: "Ημερομηνία", internalLinks: "Εσωτερικοί σύνδεσμοι", allNews: "Όλες οι ειδήσεις", originalSource: "Αρχική πηγή", digest: "Συντακτική σύνοψη", whyItMatters: "Γιατί έχει σημασία" },
  da: { newsTitle: "AI-nyheder", eyebrow: "AI-nyhedsdetalje", home: "Forside", source: "Kilde", published: "Udgivet", internalLinks: "Interne links", allNews: "Alle nyheder", originalSource: "Original kilde", digest: "Redaktionelt resumé", whyItMatters: "Hvorfor det betyder noget" },
  fa: { newsTitle: "اخبار AI", eyebrow: "جزئیات خبر AI", home: "خانه", source: "منبع", published: "تاریخ انتشار", internalLinks: "لینک‌های داخلی", allNews: "همه خبرها", originalSource: "منبع اصلی", digest: "خلاصه تحریریه", whyItMatters: "چرا مهم است" }
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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function buildWhyItMatters(locale: Locale, title: string, summary: string) {
  const lower = `${title} ${summary}`.toLowerCase();

  if (lower.includes("openai") || lower.includes("chatgpt")) {
    return {
      tr: "OpenAI ve ChatGPT güncellemeleri, chatbot kararları ve yüksek niyetli karşılaştırma sayfaları için güçlü trafik sinyali üretir.",
      en: "OpenAI and ChatGPT updates usually create strong traffic signals across chatbot decisions and high-intent comparison pages.",
      ar: "تحديثات OpenAI وChatGPT تولد عادة إشارات قوية لصفحات القرار والمقارنة ذات النية العالية.",
      ru: "Обновления OpenAI и ChatGPT обычно дают сильный сигнал для страниц решений и сравнений с высоким намерением.",
      zh: "OpenAI 和 ChatGPT 的更新通常会为高意图的对比与决策页面带来强信号。",
      ja: "OpenAI と ChatGPT の更新は、高意図の比較ページや意思決定ページに強いシグナルを生みます。",
      ko: "OpenAI와 ChatGPT 업데이트는 비교·결정 페이지에서 강한 수요 신호를 만듭니다.",
      el: "Οι ενημερώσεις OpenAI και ChatGPT δημιουργούν ισχυρό σήμα πρόθεσης για σελίδες απόφασης και σύγκρισης.",
      da: "OpenAI- og ChatGPT-opdateringer skaber ofte stærke signaler til beslutnings- og sammenligningssider.",
      fa: "به‌روزرسانی‌های OpenAI و ChatGPT معمولاً سیگنال قوی برای صفحه‌های تصمیم‌گیری و مقایسه ایجاد می‌کنند."
    }[locale];
  }

  return {
    tr: "Bu haber, araç seçimi ve karşılaştırma akışları için yeni bir karar sinyali sağlıyor.",
    en: "This story adds another useful decision signal for tool selection and comparison flows.",
    ar: "يضيف هذا الخبر إشارة مفيدة أخرى لاختيار الأدوات ومسارات المقارنة.",
    ru: "Этот материал добавляет ещё один полезный сигнал для выбора инструмента и сценариев сравнения.",
    zh: "这条新闻为工具选择和对比流程增加了一个新的参考信号。",
    ja: "このニュースは、ツール選定や比較導線に新たな判断材料を加えます。",
    ko: "이 뉴스는 도구 선택과 비교 흐름에 또 하나의 유용한 신호를 더합니다.",
    el: "Αυτή η είδηση προσθέτει ένα ακόμη χρήσιμο σήμα για επιλογή εργαλείων και ροές σύγκρισης.",
    da: "Denne historie tilføjer endnu et nyttigt signal til valg af værktøj og sammenligningsforløb.",
    fa: "این خبر یک سیگنال مفید دیگر برای انتخاب ابزار و جریان‌های مقایسه اضافه می‌کند."
  }[locale];
}

export async function generateStaticParams() {
  return [];
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

  const safeLocale = normalizeLocale(locale);
  const item = await getAiNewsItemBySlug(safeLocale, slug);

  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | ${newsDetailCopy[safeLocale].newsTitle}`,
    description: item.summary,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/news/${slug}`),
      languages: buildAlternates(`/news/${slug}`)
    }
  };
}

export default async function AiNewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const copy = newsDetailCopy[safeLocale];
  const item = await getAiNewsItemBySlug(safeLocale, slug);

  if (!item) {
    notFound();
  }

  const publishedAt = formatDate(safeLocale, item.publishedAt);
  const title = item.displayTitle ?? item.title;
  const summary = item.displaySummary ?? item.summary;
  const dek = item.dek ?? summary;
  const whyItMatters = item.whyItMatters ?? buildWhyItMatters(safeLocale, item.title, item.summary);

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={copy.eyebrow}
      title={title}
      description={dek}
      breadcrumbs={[
        { label: copy.home, href: `/${safeLocale}` },
        { label: copy.newsTitle, href: `/${safeLocale}/news` },
        { label: title }
      ]}
      badges={[item.source, item.categoryLabel, ...(publishedAt ? [publishedAt] : [])]}
      stats={[
        { label: copy.source, value: item.source },
        { label: copy.published, value: publishedAt ?? "-" },
        { label: copy.internalLinks, value: String(item.relatedLinks.length) }
      ]}
      primaryAction={{
        label: copy.allNews,
        href: `/${safeLocale}/news`
      }}
      secondaryAction={{
        label: copy.originalSource,
        href: item.sourceUrl
      }}
      sections={[
        {
          title: copy.digest,
          description: summary
        },
        {
          title: copy.whyItMatters,
          description: whyItMatters
        }
      ]}
    />
  );
}
