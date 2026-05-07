import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import {
  buildAlternates,
  buildCanonicalUrl,
  isValidLocale,
  normalizeLocale,
  type Locale
} from "@/i18n/config";
import {
  formatPricing,
  getCategoryNamesMap,
  getLocalizedToolBySlug,
  getToolOutboundUrl
} from "@/lib/catalog";
import { buildToolMetaDescription, buildToolPageTitle } from "@/lib/seo";

const toolDetailCopy: Record<
  Locale,
  {
    eyebrow: string;
    home: string;
    tools: string;
    pricing: string;
    rating: string;
    bestFor: string;
    officialTool: string;
    openComparisons: string;
    heroSurface: string;
    heroDescription: string;
    modularArea: string;
    modularDescription: string;
    previewDescription: (name: string, bestUseCase: string) => string;
  }
> = {
  tr: {
    eyebrow: "Araç detay görünümü",
    home: "Ana sayfa",
    tools: "Araçlar",
    pricing: "Fiyat",
    rating: "Puan",
    bestFor: "En uygun",
    officialTool: "Resmi aracı aç",
    openComparisons: "Karşılaştırmalara git",
    heroSurface: "Yeni araç hero alanı",
    heroDescription: "Burada logo, kısa değer önerisi, güven sinyalleri ve karar CTA’ları daha sade bir blokta birleşecek.",
    modularArea: "Modüler içerik alanı",
    modularDescription: "Artılar, eksiler, kullanım senaryoları, fiyat, alternatifler ve ilgili rehberler yeni sistemin aynı kart diliyle eklenecek.",
    previewDescription: (name, bestUseCase) => `${name} için yeni tema yüzeyi. Bu aşamada daha temiz tasarım dili, daha net bilgi hiyerarşisi ve daha güçlü karar yüzeyi test ediliyor. Ana kullanım odağı: ${bestUseCase}.`
  },
  en: {
    eyebrow: "Tool detail preview",
    home: "Home",
    tools: "Tools",
    pricing: "Pricing",
    rating: "Rating",
    bestFor: "Best for",
    officialTool: "Open official tool",
    openComparisons: "Open comparisons",
    heroSurface: "New tool hero surface",
    heroDescription: "This area will hold the logo, short value proposition, trust cues, and main decision CTAs in a cleaner block.",
    modularArea: "Modular content area",
    modularDescription: "Pros, cons, use cases, pricing, alternatives, and related guides will be rebuilt here with the same card language.",
    previewDescription: (name, bestUseCase) => `A new theme surface for ${name}. At this stage we are testing a cleaner design language, clearer information hierarchy, and a stronger decision surface. Main fit: ${bestUseCase}.`
  },
  ar: { eyebrow: "معاينة تفاصيل الأداة", home: "الرئيسية", tools: "الأدوات", pricing: "السعر", rating: "التقييم", bestFor: "الأفضل لـ", officialTool: "افتح الأداة الرسمية", openComparisons: "افتح المقارنات", heroSurface: "منطقة hero الجديدة للأداة", heroDescription: "سيضم هذا القسم الشعار، والقيمة المختصرة، وإشارات الثقة، وأزرار القرار الرئيسية بشكل أنظف.", modularArea: "منطقة المحتوى المعيارية", modularDescription: "سيُعاد بناء المزايا والعيوب وحالات الاستخدام والسعر والبدائل والأدلة المرتبطة بنفس لغة البطاقات.", previewDescription: (name, bestUseCase) => `واجهة جديدة لـ ${name}. في هذه المرحلة نختبر لغة تصميم أنظف وتسلسلاً أوضح للمعلومات وسطح قرار أقوى. أفضل استخدام: ${bestUseCase}.` },
  ru: { eyebrow: "Предпросмотр страницы инструмента", home: "Главная", tools: "Инструменты", pricing: "Цена", rating: "Оценка", bestFor: "Лучше всего для", officialTool: "Открыть официальный сайт", openComparisons: "Открыть сравнения", heroSurface: "Новый hero-блок инструмента", heroDescription: "Здесь будут логотип, краткое ценностное предложение, сигналы доверия и основные CTA в более чистом блоке.", modularArea: "Модульная зона контента", modularDescription: "Плюсы, минусы, сценарии использования, цены, альтернативы и связанные гайды будут пересобраны в едином карточном стиле.", previewDescription: (name, bestUseCase) => `Новая поверхность страницы для ${name}. На этом этапе мы тестируем более чистый дизайн, понятную иерархию информации и более сильный слой принятия решения. Основной сценарий: ${bestUseCase}.` },
  zh: { eyebrow: "工具详情预览", home: "首页", tools: "工具", pricing: "价格", rating: "评分", bestFor: "最适合", officialTool: "打开官方网站", openComparisons: "查看对比", heroSurface: "新的工具首屏区域", heroDescription: "这里将以更简洁的方式呈现 logo、核心价值、信任信号和主要 CTA。", modularArea: "模块化内容区域", modularDescription: "优点、缺点、使用场景、价格、替代方案和相关指南都会用统一卡片语言重建。", previewDescription: (name, bestUseCase) => `${name} 的新主题页面正在预览中。当前阶段重点测试更清晰的设计语言、更明确的信息层级和更强的决策界面。主要适用场景：${bestUseCase}。` },
  ja: { eyebrow: "ツール詳細プレビュー", home: "ホーム", tools: "ツール", pricing: "価格", rating: "評価", bestFor: "最適な用途", officialTool: "公式ツールを開く", openComparisons: "比較を開く", heroSurface: "新しいツール hero エリア", heroDescription: "ここにはロゴ、短い価値提案、信頼シグナル、主要CTAがより整理された形で配置されます。", modularArea: "モジュール型コンテンツ領域", modularDescription: "長所・短所・ユースケース・価格・代替案・関連ガイドを同じカード言語で再構築します。", previewDescription: (name, bestUseCase) => `${name} の新しいテーマプレビューです。この段階では、よりクリーンなデザインと言語、明確な情報階層、強い意思決定面をテストしています。主な適合用途: ${bestUseCase}。` },
  ko: { eyebrow: "도구 상세 미리보기", home: "홈", tools: "도구", pricing: "가격", rating: "평점", bestFor: "적합한 용도", officialTool: "공식 도구 열기", openComparisons: "비교 열기", heroSurface: "새 도구 히어로 영역", heroDescription: "여기에는 로고, 짧은 가치 제안, 신뢰 신호, 주요 CTA가 더 깔끔하게 배치됩니다.", modularArea: "모듈형 콘텐츠 영역", modularDescription: "장점, 단점, 활용 사례, 가격, 대안, 관련 가이드를 동일한 카드 언어로 다시 구성합니다.", previewDescription: (name, bestUseCase) => `${name}용 새 테마 화면입니다. 이 단계에서는 더 깔끔한 디자인 언어와 명확한 정보 계층, 더 강한 의사결정 화면을 테스트합니다. 주요 활용: ${bestUseCase}.` },
  el: { eyebrow: "Προεπισκόπηση λεπτομέρειας εργαλείου", home: "Αρχική", tools: "Εργαλεία", pricing: "Τιμή", rating: "Βαθμολογία", bestFor: "Ταιριάζει καλύτερα σε", officialTool: "Άνοιγμα επίσημου εργαλείου", openComparisons: "Άνοιγμα συγκρίσεων", heroSurface: "Νέο hero section εργαλείου", heroDescription: "Εδώ θα μπουν το λογότυπο, η σύντομη πρόταση αξίας, τα σήματα εμπιστοσύνης και τα κύρια CTA σε πιο καθαρό μπλοκ.", modularArea: "Περιοχή αρθρωτού περιεχομένου", modularDescription: "Πλεονεκτήματα, μειονεκτήματα, χρήσεις, τιμολόγηση, εναλλακτικές και σχετικοί οδηγοί θα ξαναχτιστούν με την ίδια γλώσσα καρτών.", previewDescription: (name, bestUseCase) => `Νέα θεματική επιφάνεια για το ${name}. Σε αυτό το στάδιο δοκιμάζουμε καθαρότερη σχεδιαστική γλώσσα, σαφέστερη ιεραρχία πληροφορίας και ισχυρότερη επιφάνεια απόφασης. Κύρια χρήση: ${bestUseCase}.` },
  da: { eyebrow: "Forhåndsvisning af værktøjsdetalje", home: "Forside", tools: "Værktøjer", pricing: "Pris", rating: "Bedømmelse", bestFor: "Bedst til", officialTool: "Åbn officielt værktøj", openComparisons: "Åbn sammenligninger", heroSurface: "Nyt hero-område til værktøjet", heroDescription: "Her samles logo, kort værdiforslag, tillidssignaler og centrale CTA’er i en renere blok.", modularArea: "Modulært indholdsområde", modularDescription: "Fordele, ulemper, brugsscenarier, pris, alternativer og relaterede guides genopbygges her med samme kortsprog.", previewDescription: (name, bestUseCase) => `En ny temaside for ${name}. På dette trin tester vi et renere designsprog, tydeligere informationshierarki og en stærkere beslutningsflade. Primært fit: ${bestUseCase}.` },
  fa: { eyebrow: "پیش‌نمایش جزئیات ابزار", home: "خانه", tools: "ابزارها", pricing: "قیمت", rating: "امتیاز", bestFor: "مناسب برای", officialTool: "باز کردن ابزار رسمی", openComparisons: "باز کردن مقایسه‌ها", heroSurface: "بخش هیروی جدید ابزار", heroDescription: "در اینجا لوگو، ارزش پیشنهادی کوتاه، سیگنال‌های اعتماد و CTAهای اصلی در یک بلوک تمیزتر قرار می‌گیرند.", modularArea: "بخش محتوای ماژولار", modularDescription: "مزایا، معایب، سناریوهای استفاده، قیمت، گزینه‌های جایگزین و راهنماهای مرتبط با همان زبان کارت‌ها بازسازی می‌شوند.", previewDescription: (name, bestUseCase) => `این یک نمای جدید برای ${name} است. در این مرحله زبان طراحی تمیزتر، سلسله‌مراتب روشن‌تر اطلاعات و سطح تصمیم‌گیری قوی‌تر را آزمایش می‌کنیم. کاربرد اصلی: ${bestUseCase}.` }
};

export const revalidate = 3600;
export const dynamicParams = true;

// Do not generate all combinations. This project must not exceed safe static route limits.
export function generateStaticParams() {
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
  const tool = getLocalizedToolBySlug(safeLocale, slug);

  if (!tool) {
    return {};
  }

  return {
    title: buildToolPageTitle(safeLocale, tool),
    description: buildToolMetaDescription(safeLocale, tool),
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/tools/${slug}`),
      languages: buildAlternates(`/tools/${slug}`)
    }
  };
}

export default async function ToolDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const copy = toolDetailCopy[safeLocale];
  const tool = getLocalizedToolBySlug(safeLocale, slug);

  if (!tool) {
    notFound();
  }

  const categoryNames = tool.categorySlugs
    .map((item) => getCategoryNamesMap(safeLocale).get(item) ?? item)
    .slice(0, 3);

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={copy.eyebrow}
      title={tool.name}
      description={copy.previewDescription(tool.name, tool.bestUseCase)}
      breadcrumbs={[
        { label: copy.home, href: `/${safeLocale}` },
        { label: copy.tools, href: `/${safeLocale}/tools` },
        { label: tool.name }
      ]}
      badges={[...categoryNames, formatPricing(tool.pricing, safeLocale)]}
      stats={[
        { label: copy.pricing, value: formatPricing(tool.pricing, safeLocale) },
        { label: copy.rating, value: `${tool.rating.toFixed(1)}/5` },
        { label: copy.bestFor, value: tool.bestUseCase }
      ]}
      primaryAction={{
        label: copy.officialTool,
        href: getToolOutboundUrl(tool)
      }}
      secondaryAction={{
        label: copy.openComparisons,
        href: `/${safeLocale}/compare`
      }}
      sections={[
        {
          title: copy.heroSurface,
          description: copy.heroDescription
        },
        {
          title: copy.modularArea,
          description: copy.modularDescription
        }
      ]}
    />
  );
}
