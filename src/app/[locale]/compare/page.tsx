import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonCard } from "@/components/home/comparison-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, normalizeLocale, type Locale } from "@/i18n/config";

const compareIntroLocalized: Record<
  Locale,
  {
    title: string;
    description: string;
    heroBadge: string;
    allComparisons: string;
    autoCompare: string;
    featuredTitle: string;
    featuredDescription: string;
    recentTitle: string;
    recentDescription: string;
    compareOpen: string;
    compareLabel: string;
  }
> = {
  tr: {
    title: "AI karşılaştırmalarını tek yerde keşfet",
    description: "Karar vermeden önce popüler karşılaştırmaları, canlı akışı ve hızlı seçim sayfalarını tek merkezde incele.",
    heroBadge: "Karşılaştırma merkezi",
    allComparisons: "Tüm karşılaştırmalar",
    autoCompare: "Canlı karşılaştırma",
    featuredTitle: "Öne çıkan karşılaştırmalar",
    featuredDescription: "Karar sürecinde en çok ihtiyaç duyulan karşılaştırmaları hızlıca gözden geçir.",
    recentTitle: "Yeni karşılaştırmalar",
    recentDescription: "Yakın araç eşleşmeleri ve yüksek niyetli karar sayfaları.",
    compareOpen: "Karşılaştırmayı aç",
    compareLabel: "Karşılaştır"
  },
  en: {
    title: "Explore AI comparisons in one place",
    description: "Review popular comparisons, live compare flows, and quick decision pages inside one compact hub.",
    heroBadge: "Compare hub",
    allComparisons: "All comparisons",
    autoCompare: "Live compare",
    featuredTitle: "Featured comparisons",
    featuredDescription: "Quickly review the comparisons people rely on most when making decisions.",
    recentTitle: "New comparisons",
    recentDescription: "Nearby tool matchups and high-intent decision pages.",
    compareOpen: "Open comparison",
    compareLabel: "Compare"
  },
  ar: {
    title: "استكشف مقارنات AI في مكان واحد",
    description: "راجع المقارنات الشائعة وتدفقات المقارنة المباشرة وصفحات القرار السريعة داخل مركز واحد منظم.",
    heroBadge: "مركز المقارنات",
    allComparisons: "كل المقارنات",
    autoCompare: "مقارنة مباشرة",
    featuredTitle: "مقارنات مميزة",
    featuredDescription: "راجع بسرعة المقارنات الأكثر فائدة عند اتخاذ القرار.",
    recentTitle: "مقارنات جديدة",
    recentDescription: "مطابقات أدوات قريبة وصفحات قرار عالية النية.",
    compareOpen: "افتح المقارنة",
    compareLabel: "قارن"
  },
  ru: {
    title: "Изучайте сравнения AI в одном месте",
    description: "Просматривайте популярные сравнения, живые сценарии сравнения и быстрые страницы принятия решения в одном центре.",
    heroBadge: "Центр сравнений",
    allComparisons: "Все сравнения",
    autoCompare: "Живое сравнение",
    featuredTitle: "Избранные сравнения",
    featuredDescription: "Быстро просматривайте сравнения, которые чаще всего помогают принять решение.",
    recentTitle: "Новые сравнения",
    recentDescription: "Близкие пары инструментов и страницы выбора с высоким намерением.",
    compareOpen: "Открыть сравнение",
    compareLabel: "Сравнить"
  },
  zh: {
    title: "在一个页面中探索 AI 对比",
    description: "在一个紧凑中心中查看热门对比、实时对比流程和快速决策页面。",
    heroBadge: "对比中心",
    allComparisons: "全部对比",
    autoCompare: "实时对比",
    featuredTitle: "精选对比",
    featuredDescription: "快速浏览最常用于决策的对比页面。",
    recentTitle: "最新对比",
    recentDescription: "相近工具组合与高意图决策页面。",
    compareOpen: "打开对比",
    compareLabel: "对比"
  },
  ja: {
    title: "AI比較をひとつの場所で探す",
    description: "人気の比較、ライブ比較フロー、素早い意思決定ページをひとつのハブで確認できます。",
    heroBadge: "比較ハブ",
    allComparisons: "すべての比較",
    autoCompare: "ライブ比較",
    featuredTitle: "注目の比較",
    featuredDescription: "意思決定に役立つ比較ページをすばやく確認できます。",
    recentTitle: "新しい比較",
    recentDescription: "近いツールの組み合わせと高意図の判断ページ。",
    compareOpen: "比較を開く",
    compareLabel: "比較"
  },
  ko: {
    title: "한곳에서 AI 비교 탐색",
    description: "인기 비교, 실시간 비교 흐름, 빠른 의사결정 페이지를 하나의 허브에서 살펴보세요.",
    heroBadge: "비교 허브",
    allComparisons: "모든 비교",
    autoCompare: "실시간 비교",
    featuredTitle: "주요 비교",
    featuredDescription: "결정에 가장 많이 쓰이는 비교를 빠르게 확인해 보세요.",
    recentTitle: "새 비교",
    recentDescription: "가까운 도구 조합과 높은 의도의 비교 페이지.",
    compareOpen: "비교 열기",
    compareLabel: "비교"
  },
  el: {
    title: "Εξερεύνησε συγκρίσεις AI σε ένα μέρος",
    description: "Δες δημοφιλείς συγκρίσεις, live compare ροές και γρήγορες σελίδες απόφασης μέσα σε ένα ενιαίο hub.",
    heroBadge: "Κέντρο συγκρίσεων",
    allComparisons: "Όλες οι συγκρίσεις",
    autoCompare: "Ζωντανή σύγκριση",
    featuredTitle: "Προτεινόμενες συγκρίσεις",
    featuredDescription: "Δες γρήγορα τις συγκρίσεις που βοηθούν περισσότερο στην απόφαση.",
    recentTitle: "Νέες συγκρίσεις",
    recentDescription: "Κοντινά ζευγάρια εργαλείων και σελίδες υψηλής πρόθεσης.",
    compareOpen: "Άνοιγμα σύγκρισης",
    compareLabel: "Σύγκρινε"
  },
  da: {
    title: "Udforsk AI-sammenligninger ét sted",
    description: "Gennemse populære sammenligninger, live compare-flow og hurtige beslutningssider i ét samlet hub.",
    heroBadge: "Sammenligningshub",
    allComparisons: "Alle sammenligninger",
    autoCompare: "Live sammenligning",
    featuredTitle: "Udvalgte sammenligninger",
    featuredDescription: "Se hurtigt de sammenligninger, der oftest hjælper brugere med at vælge.",
    recentTitle: "Nye sammenligninger",
    recentDescription: "Nært beslægtede værktøjspar og højintente beslutningssider.",
    compareOpen: "Åbn sammenligning",
    compareLabel: "Sammenlign"
  },
  fa: {
    title: "مقایسه‌های AI را در یک جا ببینید",
    description: "مقایسه‌های محبوب، جریان مقایسه زنده و صفحه‌های تصمیم‌گیری سریع را در یک هاب واحد مرور کنید.",
    heroBadge: "مرکز مقایسه",
    allComparisons: "همه مقایسه‌ها",
    autoCompare: "مقایسه زنده",
    featuredTitle: "مقایسه‌های شاخص",
    featuredDescription: "مقایسه‌هایی را که بیشتر به تصمیم‌گیری کمک می‌کنند سریع مرور کنید.",
    recentTitle: "مقایسه‌های جدید",
    recentDescription: "جفت ابزارهای نزدیک و صفحه‌های تصمیم‌گیری با نیت بالا.",
    compareOpen: "باز کردن مقایسه",
    compareLabel: "مقایسه"
  }
};

function buildFeaturedPairs(locale: Locale) {
  return getComparisonDirectoryCards(locale).slice(0, 8);
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
  const copy = compareIntroLocalized[safeLocale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/compare`),
      languages: buildAlternates("/compare")
    }
  };
}

export default async function CompareHubPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const copy = compareIntroLocalized[safeLocale];
  const featured = buildFeaturedPairs(safeLocale);
  const recent = getComparisonDirectoryCards(safeLocale).slice(8, 16);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-x-clip px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="ui-card rounded-[30px] p-6 sm:p-8">
        <Badge variant="accent">{copy.heroBadge}</Badge>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.05em] text-slate-950 md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{copy.description}</p>
          </div>

          <div className="ui-inner-panel p-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="ghost">{copy.allComparisons}</Badge>
              <Badge variant="ghost">{copy.autoCompare}</Badge>
              <Badge variant="ghost">{copy.compareLabel}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <PremiumButton href={`/${safeLocale}/compare-auto`}>{copy.autoCompare}</PremiumButton>
              <PremiumButton href={`/${safeLocale}/categories/comparisons`} variant="secondary">
                {copy.allComparisons}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow={copy.featuredTitle}
        title={copy.featuredTitle}
        description={copy.featuredDescription}
        actions={<PremiumButton href={`/${safeLocale}/compare-auto`}>{copy.autoCompare}</PremiumButton>}
        className="px-0 sm:px-0"
        contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {featured.map((item) => (
          <ComparisonCard key={item.href} locale={safeLocale} item={item} linkLabel={copy.compareOpen} tone="light" />
        ))}
      </SectionShell>

      <SectionShell
        eyebrow={copy.recentTitle}
        title={copy.recentTitle}
        description={copy.recentDescription}
        className="px-0 sm:px-0"
        contentClassName="grid gap-3 md:grid-cols-2"
      >
        {recent.map((item) => (
          <Link
            key={item.href}
            href={`/${safeLocale}${item.href}`}
            className="flex items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.05)] transition hover:border-sky-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)]"
          >
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {copy.compareLabel}
              </span>
              <span className="block truncate text-sm font-semibold text-slate-950">{item.title}</span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-sky-700 transition hover:translate-x-0.5">
              {copy.compareOpen}
            </span>
          </Link>
        ))}
      </SectionShell>
    </div>
  );
}
