import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ThemePreviewLayout } from "@/components/content/theme-preview-layout";
import { buildAlternates, buildCanonicalUrl, isValidLocale, type Locale, normalizeLocale } from "@/i18n/config";
import { buildComparisonPath, getComparisonToolsFromPair } from "@/lib/comparisons";

const comparisonCopy: Record<
  Locale,
  {
    eyebrow: string;
    home: string;
    comparisons: string;
    newSurface: string;
    leftTool: string;
    rightTool: string;
    status: string;
    preview: string;
    panelShell: string;
    panelDescription: string;
    contentLayer: string;
    contentDescription: string;
    buildTitle: (left: string, right: string) => string;
    buildDescription: (left: string, right: string) => string;
    toolPage: (name: string) => string;
  }
> = {
  tr: {
    eyebrow: "Karşılaştırma görünümü",
    home: "Ana sayfa",
    comparisons: "Karşılaştırmalar",
    newSurface: "Yeni tema yüzeyi",
    leftTool: "Sol araç",
    rightTool: "Sağ araç",
    status: "Durum",
    preview: "Önizleme",
    panelShell: "Panel iskeleti",
    panelDescription: "Eski yoğun yüzey yerine daha temiz, daha açık ve kart odaklı bir karşılaştırma deneyimi burada oturacak.",
    contentLayer: "İçerik katmanı",
    contentDescription: "Bu sayfa şu an görünüm önizlemesinde. Sonraki adımda karar blokları, tablo mantığı ve ilgili linkler yeni yüzeye taşınacak.",
    buildTitle: (left, right) => `${left} vs ${right} karşılaştırması`,
    buildDescription: (left, right) => `${left} ve ${right} için yeni karşılaştırma yüzeyi. Bu aşamada amaç, temiz karşılaştırma deneyiminin iskeletini görmek.`,
    toolPage: (name) => `${name} sayfası`
  },
  en: {
    eyebrow: "Comparison preview",
    home: "Home",
    comparisons: "Comparisons",
    newSurface: "New theme surface",
    leftTool: "Left tool",
    rightTool: "Right tool",
    status: "Status",
    preview: "Preview",
    panelShell: "Panel shell",
    panelDescription: "The old dense surface will be replaced here by a cleaner, lighter, card-driven comparison layout.",
    contentLayer: "Content layer",
    contentDescription: "This page is intentionally in preview mode for now. The next step is moving verdict blocks, table logic, and related links into the new shell.",
    buildTitle: (left, right) => `${left} vs ${right} comparison`,
    buildDescription: (left, right) => `A new comparison surface for ${left} and ${right}. At this stage the goal is a clean comparison shell, not full content depth.`,
    toolPage: (name) => `${name} page`
  },
  ar: { eyebrow: "معاينة المقارنة", home: "الرئيسية", comparisons: "المقارنات", newSurface: "واجهة جديدة", leftTool: "الأداة اليسرى", rightTool: "الأداة اليمنى", status: "الحالة", preview: "معاينة", panelShell: "هيكل اللوحة", panelDescription: "سيحل هنا تخطيط مقارنة أنظف وأكثر خفة ويركز على البطاقات بدل السطح القديم المكتظ.", contentLayer: "طبقة المحتوى", contentDescription: "هذه الصفحة في وضع المعاينة الآن. في الخطوة التالية ستُنقل كتل القرار ومنطق الجداول والروابط المرتبطة إلى الواجهة الجديدة.", buildTitle: (left, right) => `مقارنة ${left} مقابل ${right}`, buildDescription: (left, right) => `واجهة مقارنة جديدة بين ${left} و${right}. في هذه المرحلة نركز على بنية مقارنة نظيفة لا على عمق المحتوى الكامل.`, toolPage: (name) => `صفحة ${name}` },
  ru: { eyebrow: "Предпросмотр сравнения", home: "Главная", comparisons: "Сравнения", newSurface: "Новая поверхность", leftTool: "Левый инструмент", rightTool: "Правый инструмент", status: "Статус", preview: "Превью", panelShell: "Каркас панели", panelDescription: "Здесь старый плотный интерфейс будет заменён более чистой и лёгкой карточной раскладкой сравнения.", contentLayer: "Слой контента", contentDescription: "Сейчас страница находится в режиме превью. Далее сюда будут перенесены блоки решения, логика таблицы и связанные ссылки.", buildTitle: (left, right) => `Сравнение ${left} и ${right}`, buildDescription: (left, right) => `Новая страница сравнения для ${left} и ${right}. На этом этапе цель — показать чистый каркас сравнения, а не полную глубину контента.`, toolPage: (name) => `Страница ${name}` },
  zh: { eyebrow: "对比预览", home: "首页", comparisons: "对比", newSurface: "新主题界面", leftTool: "左侧工具", rightTool: "右侧工具", status: "状态", preview: "预览", panelShell: "面板骨架", panelDescription: "这里将以更干净、更轻量、以卡片为核心的方式取代旧的密集对比界面。", contentLayer: "内容层", contentDescription: "此页面目前处于预览模式。下一步会把结论模块、表格逻辑和相关链接迁移到新界面。", buildTitle: (left, right) => `${left} vs ${right} 对比`, buildDescription: (left, right) => `${left} 与 ${right} 的新对比界面。当前阶段重点是清晰的对比骨架，而不是完整内容深度。`, toolPage: (name) => `${name} 页面` },
  ja: { eyebrow: "比較プレビュー", home: "ホーム", comparisons: "比較", newSurface: "新しいテーマ面", leftTool: "左側ツール", rightTool: "右側ツール", status: "状態", preview: "プレビュー", panelShell: "パネル構成", panelDescription: "ここでは、従来の密度の高い画面を、より軽くカード中心の比較レイアウトへ置き換えます。", contentLayer: "コンテンツ層", contentDescription: "このページは現在プレビューモードです。次の段階で verdict ブロック、表ロジック、関連リンクが新しい外観へ移されます。", buildTitle: (left, right) => `${left} vs ${right} 比較`, buildDescription: (left, right) => `${left} と ${right} の新しい比較画面です。現段階では、完全な内容ではなく、比較体験の骨格を確認することが目的です。`, toolPage: (name) => `${name} のページ` },
  ko: { eyebrow: "비교 미리보기", home: "홈", comparisons: "비교", newSurface: "새 테마 화면", leftTool: "왼쪽 도구", rightTool: "오른쪽 도구", status: "상태", preview: "미리보기", panelShell: "패널 구조", panelDescription: "기존의 빽빽한 화면 대신 더 깔끔하고 가벼운 카드 중심 비교 레이아웃이 여기에 자리잡게 됩니다.", contentLayer: "콘텐츠 레이어", contentDescription: "이 페이지는 현재 미리보기 모드입니다. 다음 단계에서 verdict 블록, 표 로직, 관련 링크를 새 화면으로 옮깁니다.", buildTitle: (left, right) => `${left} vs ${right} 비교`, buildDescription: (left, right) => `${left}와 ${right}를 위한 새로운 비교 화면입니다. 이 단계의 목표는 완전한 내용이 아니라 깔끔한 비교 골격을 확인하는 것입니다.`, toolPage: (name) => `${name} 페이지` },
  el: { eyebrow: "Προεπισκόπηση σύγκρισης", home: "Αρχική", comparisons: "Συγκρίσεις", newSurface: "Νέα επιφάνεια", leftTool: "Αριστερό εργαλείο", rightTool: "Δεξί εργαλείο", status: "Κατάσταση", preview: "Προεπισκόπηση", panelShell: "Σκελετός πάνελ", panelDescription: "Η παλιά πυκνή επιφάνεια θα αντικατασταθεί εδώ από πιο καθαρή, ελαφριά και card-driven διάταξη σύγκρισης.", contentLayer: "Επίπεδο περιεχομένου", contentDescription: "Η σελίδα είναι προσωρινά σε λειτουργία προεπισκόπησης. Στο επόμενο βήμα θα μεταφερθούν verdict blocks, λογική πίνακα και σχετικά links.", buildTitle: (left, right) => `Σύγκριση ${left} vs ${right}`, buildDescription: (left, right) => `Μια νέα επιφάνεια σύγκρισης για τα ${left} και ${right}. Σε αυτό το στάδιο ο στόχος είναι ένας καθαρός σκελετός σύγκρισης και όχι πλήρες βάθος περιεχομένου.`, toolPage: (name) => `Σελίδα ${name}` },
  da: { eyebrow: "Sammenligningsvisning", home: "Forside", comparisons: "Sammenligninger", newSurface: "Ny temaflade", leftTool: "Venstre værktøj", rightTool: "Højre værktøj", status: "Status", preview: "Preview", panelShell: "Panelskal", panelDescription: "Den gamle tætte flade bliver her erstattet af et renere, lettere og mere kortdrevet sammenligningslayout.", contentLayer: "Indholdslag", contentDescription: "Denne side er bevidst i preview-mode nu. Næste trin er at flytte verdict-blokke, tabellogik og relaterede links over i den nye skal.", buildTitle: (left, right) => `${left} vs ${right} sammenligning`, buildDescription: (left, right) => `En ny sammenligningsflade for ${left} og ${right}. På dette trin er målet en ren sammenligningsskal, ikke fuld indholdsdybde.`, toolPage: (name) => `${name}-side` },
  fa: { eyebrow: "پیش‌نمایش مقایسه", home: "خانه", comparisons: "مقایسه‌ها", newSurface: "سطح تم جدید", leftTool: "ابزار سمت چپ", rightTool: "ابزار سمت راست", status: "وضعیت", preview: "پیش‌نمایش", panelShell: "اسکلت پنل", panelDescription: "در اینجا سطح قدیمی و شلوغ با یک چیدمان مقایسه‌ای تمیزتر، سبک‌تر و کارت‌محور جایگزین می‌شود.", contentLayer: "لایه محتوا", contentDescription: "این صفحه فعلاً در حالت پیش‌نمایش است. در مرحله بعد، بلوک‌های تصمیم، منطق جدول و لینک‌های مرتبط به پوسته جدید منتقل می‌شوند.", buildTitle: (left, right) => `مقایسه ${left} و ${right}`, buildDescription: (left, right) => `یک سطح مقایسه جدید برای ${left} و ${right}. در این مرحله هدف، دیدن یک اسکلت مقایسه تمیز است نه عمق کامل محتوا.`, toolPage: (name) => `صفحه ${name}` }
};

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; pair: string }>;
}): Promise<Metadata> {
  const { locale, pair } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const comparison = getComparisonToolsFromPair(safeLocale, pair);

  if (!comparison) {
    return {};
  }

  const copy = comparisonCopy[safeLocale];
  const title = copy.buildTitle(comparison.leftTool.name, comparison.rightTool.name);
  const description = copy.buildDescription(comparison.leftTool.name, comparison.rightTool.name);

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/compare/${comparison.canonicalPairSlug}`),
      languages: buildAlternates(`/compare/${comparison.canonicalPairSlug}`)
    }
  };
}

export default async function ComparisonPage({
  params
}: {
  params: Promise<{ locale: string; pair: string }>;
}) {
  const { locale, pair } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const copy = comparisonCopy[safeLocale];
  const comparison = getComparisonToolsFromPair(safeLocale, pair);

  if (!comparison) {
    notFound();
  }

  if (!comparison.isCanonical) {
    redirect(buildComparisonPath(safeLocale, comparison.leftTool.slug, comparison.rightTool.slug));
  }

  const title = copy.buildTitle(comparison.leftTool.name, comparison.rightTool.name);
  const description = copy.buildDescription(comparison.leftTool.name, comparison.rightTool.name);

  return (
    <ThemePreviewLayout
      locale={safeLocale}
      eyebrow={copy.eyebrow}
      title={title}
      description={description}
      breadcrumbs={[
        { label: copy.home, href: `/${safeLocale}` },
        { label: copy.comparisons, href: `/${safeLocale}/compare` },
        { label: title }
      ]}
      badges={[comparison.leftTool.bestUseCase, comparison.rightTool.bestUseCase, copy.newSurface]}
      stats={[
        { label: copy.leftTool, value: comparison.leftTool.name },
        { label: copy.rightTool, value: comparison.rightTool.name },
        { label: copy.status, value: copy.preview }
      ]}
      primaryAction={{
        label: copy.toolPage(comparison.leftTool.name),
        href: `/${safeLocale}/tools/${comparison.leftTool.slug}`
      }}
      secondaryAction={{
        label: copy.toolPage(comparison.rightTool.name),
        href: `/${safeLocale}/tools/${comparison.rightTool.slug}`
      }}
      sections={[
        {
          title: copy.panelShell,
          description: copy.panelDescription
        },
        {
          title: copy.contentLayer,
          description: copy.contentDescription
        }
      ]}
    />
  );
}
