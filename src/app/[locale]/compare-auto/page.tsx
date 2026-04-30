import type { Metadata } from "next";

import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { AutoCompareWorkspace } from "@/components/comparison/auto-compare-workspace";
import { ComparisonCard } from "@/components/home/comparison-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getCatalogContent, getLocalizedTools } from "@/lib/catalog";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale, normalizeLocale } from "@/i18n/config";

const compareAutoCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    breadcrumb: string;
    eyebrow: string;
    heroTitle: string;
    heroDescription: string;
    openTools: string;
    editorialComparisons: string;
    sectionEyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    openComparison: string;
  }
> = {
  tr: {
    title: "Canlı AI karşılaştırma | Deciply",
    description: "İstediğiniz iki AI aracını seçin, anında karşılaştırın ve editoryal compare sayfalarına geçin.",
    breadcrumb: "Canlı karşılaştırma",
    eyebrow: "Anında karar paneli",
    heroTitle: "İki aracı anında karşılaştırın",
    heroDescription: "Aynı katalog verisini kullanarak fiyat, hız, kullanım kolaylığı ve kullanım alanı farklarını tek panelde görün.",
    openTools: "Araçları aç",
    editorialComparisons: "Editoryal karşılaştırmalar",
    sectionEyebrow: "SEO karşılaştırmaları",
    sectionTitle: "Manuel compare sayfaları",
    sectionDescription: "Klasik editoryal karşılaştırmaları daha derin karar akışı için burada tutuyoruz.",
    openComparison: "Karşılaştırmayı aç"
  },
  en: {
    title: "Live AI compare | Deciply",
    description: "Choose any two AI tools, compare them instantly, and jump into editorial comparison pages when you need more depth.",
    breadcrumb: "Live compare",
    eyebrow: "Instant decision panel",
    heroTitle: "Compare any two tools instantly",
    heroDescription: "Use the same catalog data to review pricing, speed, ease of use, and workflow fit in one premium panel.",
    openTools: "Browse tools",
    editorialComparisons: "Editorial comparisons",
    sectionEyebrow: "SEO comparisons",
    sectionTitle: "Manual compare pages",
    sectionDescription: "Classic editorial comparison pages stay here for deeper SEO-driven decisions.",
    openComparison: "Open comparison"
  },
  ar: { title: "مقارنة AI المباشرة | Deciply", description: "اختر أي أداتين من أدوات AI وقارنهما فورًا ثم انتقل إلى صفحات المقارنة التحريرية عند الحاجة.", breadcrumb: "المقارنة المباشرة", eyebrow: "لوحة قرار فورية", heroTitle: "قارن أي أداتين فورًا", heroDescription: "استخدم بيانات الكتالوج نفسها لمراجعة السعر والسرعة وسهولة الاستخدام وملاءمة سير العمل في لوحة واحدة.", openTools: "افتح الأدوات", editorialComparisons: "المقارنات التحريرية", sectionEyebrow: "مقارنات SEO", sectionTitle: "صفحات المقارنة اليدوية", sectionDescription: "تظل صفحات المقارنة التحريرية الكلاسيكية هنا لقرارات أعمق.", openComparison: "افتح المقارنة" },
  ru: { title: "Мгновенное сравнение AI | Deciply", description: "Выберите любые два AI-инструмента, сравните их мгновенно и переходите к редакционным страницам сравнения.", breadcrumb: "Быстрое сравнение", eyebrow: "Панель мгновенного решения", heroTitle: "Мгновенно сравните любые два инструмента", heroDescription: "Используйте те же данные каталога, чтобы увидеть цену, скорость, удобство и сценарий использования в одной панели.", openTools: "Открыть инструменты", editorialComparisons: "Редакционные сравнения", sectionEyebrow: "SEO-сравнения", sectionTitle: "Ручные страницы сравнения", sectionDescription: "Классические редакционные сравнения остаются здесь для более глубоких решений.", openComparison: "Открыть сравнение" },
  zh: { title: "实时 AI 对比 | Deciply", description: "选择任意两个 AI 工具立即对比，并在需要时跳转到编辑式对比页面。", breadcrumb: "实时对比", eyebrow: "即时决策面板", heroTitle: "立即对比任意两个工具", heroDescription: "使用同一套目录数据，在一个面板中查看价格、速度、易用性与工作流匹配度。", openTools: "查看工具", editorialComparisons: "编辑对比", sectionEyebrow: "SEO 对比", sectionTitle: "手动对比页面", sectionDescription: "经典的编辑式对比页面保留在这里，用于更深入的决策。", openComparison: "打开对比" },
  ja: { title: "ライブ AI 比較 | Deciply", description: "任意の 2 つの AI ツールをすぐに比較し、必要に応じて編集型の比較ページへ進めます。", breadcrumb: "ライブ比較", eyebrow: "即時決定パネル", heroTitle: "2つのツールをすぐに比較", heroDescription: "同じカタログデータを使い、価格・速度・使いやすさ・ワークフロー適合を 1 つのパネルで確認できます。", openTools: "ツールを見る", editorialComparisons: "編集比較", sectionEyebrow: "SEO 比較", sectionTitle: "手動比較ページ", sectionDescription: "より深い判断のためのクラシックな編集比較ページをここに残しています。", openComparison: "比較を開く" },
  ko: { title: "실시간 AI 비교 | Deciply", description: "원하는 두 AI 도구를 즉시 비교하고 필요하면 편집형 비교 페이지로 이동하세요.", breadcrumb: "실시간 비교", eyebrow: "즉시 결정 패널", heroTitle: "두 도구를 바로 비교하세요", heroDescription: "같은 카탈로그 데이터를 사용해 가격, 속도, 사용 편의성, 워크플로 적합도를 한 패널에서 볼 수 있습니다.", openTools: "도구 열기", editorialComparisons: "편집 비교", sectionEyebrow: "SEO 비교", sectionTitle: "수동 비교 페이지", sectionDescription: "더 깊은 결정을 위해 클래식한 편집 비교 페이지를 여기에 유지합니다.", openComparison: "비교 열기" },
  el: { title: "Ζωντανή σύγκριση AI | Deciply", description: "Επίλεξε δύο εργαλεία AI, σύγκρινέ τα άμεσα και πέρασε σε συντακτικές σελίδες σύγκρισης όταν χρειάζεσαι μεγαλύτερο βάθος.", breadcrumb: "Ζωντανή σύγκριση", eyebrow: "Πίνακας άμεσης απόφασης", heroTitle: "Σύγκρινε άμεσα οποιαδήποτε δύο εργαλεία", heroDescription: "Χρησιμοποίησε τα ίδια δεδομένα καταλόγου για να δεις τιμή, ταχύτητα, ευκολία χρήσης και καταλληλότητα ροής εργασίας σε ένα πάνελ.", openTools: "Άνοιγμα εργαλείων", editorialComparisons: "Συντακτικές συγκρίσεις", sectionEyebrow: "SEO συγκρίσεις", sectionTitle: "Χειροκίνητες σελίδες σύγκρισης", sectionDescription: "Οι κλασικές συντακτικές συγκρίσεις μένουν εδώ για πιο βαθιά απόφαση.", openComparison: "Άνοιγμα σύγκρισης" },
  da: { title: "Live AI-sammenligning | Deciply", description: "Vælg to AI-værktøjer, sammenlign dem med det samme, og hop videre til redaktionelle sammenligningssider ved behov.", breadcrumb: "Live sammenligning", eyebrow: "Øjeblikkelig beslutningspanel", heroTitle: "Sammenlign to værktøjer med det samme", heroDescription: "Brug de samme katalogdata til at gennemgå pris, hastighed, brugervenlighed og workflow-fit i ét panel.", openTools: "Åbn værktøjer", editorialComparisons: "Redaktionelle sammenligninger", sectionEyebrow: "SEO-sammenligninger", sectionTitle: "Manuelle sammenligningssider", sectionDescription: "Klassiske redaktionelle sammenligningssider bliver her til dybere beslutninger.", openComparison: "Åbn sammenligning" },
  fa: { title: "مقایسه زنده AI | Deciply", description: "هر دو ابزار AI را انتخاب کنید، فوراً مقایسه کنید و در صورت نیاز به صفحه‌های مقایسه تحریریه بروید.", breadcrumb: "مقایسه زنده", eyebrow: "پنل تصمیم فوری", heroTitle: "هر دو ابزار را فوری مقایسه کنید", heroDescription: "با همان داده‌های کاتالوگ، قیمت، سرعت، سهولت استفاده و تناسب با جریان کاری را در یک پنل ببینید.", openTools: "باز کردن ابزارها", editorialComparisons: "مقایسه‌های تحریریه", sectionEyebrow: "مقایسه‌های SEO", sectionTitle: "صفحه‌های مقایسه دستی", sectionDescription: "صفحه‌های مقایسه تحریریه کلاسیک برای تصمیم‌های عمیق‌تر اینجا باقی می‌مانند.", openComparison: "باز کردن مقایسه" }
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const copy = compareAutoCopy[safeLocale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: buildCanonicalUrl(`/${safeLocale}/compare-auto`),
      languages: buildAlternates("/compare-auto")
    }
  };
}

export default async function CompareAutoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const safeLocale = normalizeLocale(locale);
  const copy = compareAutoCopy[safeLocale];
  const content = getCatalogContent(safeLocale);
  const tools = getLocalizedTools(safeLocale);
  const comparisonCards = getComparisonDirectoryCards(safeLocale).slice(0, 6);

  return (
    <div className="ui-page-shell relative mx-auto flex w-full max-w-7xl flex-col gap-10 overflow-x-clip bg-transparent px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumb
        items={[
          { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
          { label: content.common.categoriesLabel, href: `/${safeLocale}/categories` },
          { label: copy.breadcrumb }
        ]}
      />

      <section className="ui-card ui-card-hover rounded-[36px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(247,250,253,0.988))] px-6 py-8 shadow-[0_24px_72px_-44px_rgba(15,23,42,0.16)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0055FF]">{copy.eyebrow}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl lg:text-[3.7rem] lg:leading-[1.04]">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{copy.heroDescription}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PremiumButton href={`/${safeLocale}/tools`} className="w-full sm:w-auto">
              {copy.openTools}
            </PremiumButton>
            <PremiumButton href={`/${safeLocale}/categories/comparisons`} variant="secondary" className="w-full sm:w-auto">
              {copy.editorialComparisons}
            </PremiumButton>
          </div>
        </div>
      </section>

      <AutoCompareWorkspace locale={safeLocale} tools={tools} initialLeftSlug="chatgpt" initialRightSlug="claude" />

      <SectionShell eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} description={copy.sectionDescription}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {comparisonCards.map((item) => (
            <ComparisonCard key={item.href} locale={safeLocale} item={item} linkLabel={copy.openComparison} />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
