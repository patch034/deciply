"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { buildAutoComparisonPath } from "@/lib/comparisons";
import type { Locale } from "@/i18n/config";
import type { LocalizedTool } from "@/types/catalog";

type CompareToolOption = Pick<LocalizedTool, "slug" | "name" | "bestUseCase" | "pricing" | "compareProfile">;

type AutoCompareWorkspaceProps = {
  locale: Locale;
  tools: CompareToolOption[];
  initialLeftSlug?: string;
  initialRightSlug?: string;
  compact?: boolean;
};

type CompareCopy = {
  leftLabel: string;
  rightLabel: string;
  selectorHint: string;
  compareCta: string;
  openLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  compactTitle: string;
  compactDescription: string;
  fullTitle: string;
  fullDescription: string;
  pricingModel: string;
  freeTier: string;
  bestUseCase: string;
  strengths: string;
  weaknesses: string;
  speed: string;
  ease: string;
  quality: string;
  students: string;
  creators: string;
  business: string;
  value: string;
  category: string;
  yes: string;
  no: string;
  searchPlaceholder: string;
  noMatch: string;
  notAvailable: string;
};

const copyByLocale: Record<Locale, CompareCopy> = {
  tr: {
    leftLabel: "Araç A",
    rightLabel: "Araç B",
    selectorHint: "Herhangi iki aracı seçin ve anında karşılaştırın.",
    compareCta: "Şimdi karşılaştır",
    openLabel: "Karşılaştırmayı aç",
    emptyTitle: "Karşılaştırmak için iki araç seçin",
    emptyDescription: "Seçim yaptığınız anda fiyat, kullanım alanı ve kalite farkları aşağıda görünür.",
    compactTitle: "Hızlı karşılaştırma",
    compactDescription: "Seçtiğiniz iki araç için özet karşılaştırma görünümü.",
    fullTitle: "Tam otomatik karşılaştırma",
    fullDescription: "Aynı katalog verisiyle fiyat, kullanım alanı, hız ve kaliteyi tek panelde görün.",
    pricingModel: "Fiyat modeli",
    freeTier: "Ücretsiz başlangıç",
    bestUseCase: "En iyi kullanım",
    strengths: "Güçlü yönler",
    weaknesses: "Zayıf yönler",
    speed: "Hız",
    ease: "Kullanım kolaylığı",
    quality: "Çıktı kalitesi",
    students: "Öğrenci",
    creators: "Creator",
    business: "İş",
    value: "Değer",
    category: "Kategori",
    yes: "Evet",
    no: "Hayır",
    searchPlaceholder: "Araç ara...",
    noMatch: "Araç bulunamadı.",
    notAvailable: "Mevcut değil"
  },
  en: {
    leftLabel: "Tool A",
    rightLabel: "Tool B",
    selectorHint: "Pick any two tools and compare them instantly.",
    compareCta: "Compare now",
    openLabel: "Open comparison",
    emptyTitle: "Choose two tools to compare",
    emptyDescription: "As soon as you pick them, pricing, workflow fit, and quality differences show up below.",
    compactTitle: "Quick compare",
    compactDescription: "A compact overview for the pair you selected.",
    fullTitle: "Auto compare workspace",
    fullDescription: "Use the same catalog data to review pricing, fit, speed, and output in one panel.",
    pricingModel: "Pricing model",
    freeTier: "Free tier",
    bestUseCase: "Best use case",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    speed: "Speed",
    ease: "Ease of use",
    quality: "Output quality",
    students: "Students",
    creators: "Creators",
    business: "Business",
    value: "Value",
    category: "Category",
    yes: "Yes",
    no: "No",
    searchPlaceholder: "Search a tool...",
    noMatch: "No tools found.",
    notAvailable: "Not available"
  },
  ar: {
    leftLabel: "الأداة A",
    rightLabel: "الأداة B",
    selectorHint: "اختر أي أداتين وقارنهما فورًا.",
    compareCta: "قارن الآن",
    openLabel: "افتح المقارنة",
    emptyTitle: "اختر أداتين للمقارنة",
    emptyDescription: "بمجرد اختيار الأداتين ستظهر فروق السعر والملاءمة والجودة أدناه.",
    compactTitle: "مقارنة سريعة",
    compactDescription: "عرض مختصر للزوج الذي اخترته.",
    fullTitle: "مساحة المقارنة التلقائية",
    fullDescription: "استخدم بيانات الدليل نفسها لمراجعة السعر والملاءمة والسرعة وجودة المخرجات في لوحة واحدة.",
    pricingModel: "نموذج التسعير",
    freeTier: "خطة مجانية",
    bestUseCase: "أفضل استخدام",
    strengths: "نقاط القوة",
    weaknesses: "نقاط الضعف",
    speed: "السرعة",
    ease: "سهولة الاستخدام",
    quality: "جودة المخرجات",
    students: "الطلاب",
    creators: "المنشئون",
    business: "الأعمال",
    value: "القيمة",
    category: "الفئة",
    yes: "نعم",
    no: "لا",
    searchPlaceholder: "ابحث عن أداة...",
    noMatch: "لم يتم العثور على أدوات.",
    notAvailable: "غير متاح"
  },
  ru: {
    leftLabel: "Инструмент A",
    rightLabel: "Инструмент B",
    selectorHint: "Выберите любые два инструмента и сравните их сразу.",
    compareCta: "Сравнить",
    openLabel: "Открыть сравнение",
    emptyTitle: "Выберите два инструмента для сравнения",
    emptyDescription: "После выбора ниже сразу появятся различия по цене, сценарию использования и качеству.",
    compactTitle: "Быстрое сравнение",
    compactDescription: "Краткий обзор выбранной пары.",
    fullTitle: "Авто-сравнение",
    fullDescription: "Используйте те же данные каталога, чтобы в одной панели оценить цену, соответствие, скорость и качество.",
    pricingModel: "Модель цены",
    freeTier: "Бесплатный старт",
    bestUseCase: "Лучший сценарий",
    strengths: "Сильные стороны",
    weaknesses: "Слабые стороны",
    speed: "Скорость",
    ease: "Простота",
    quality: "Качество результата",
    students: "Студенты",
    creators: "Авторы",
    business: "Бизнес",
    value: "Ценность",
    category: "Категория",
    yes: "Да",
    no: "Нет",
    searchPlaceholder: "Найдите инструмент...",
    noMatch: "Инструменты не найдены.",
    notAvailable: "Недоступно"
  },
  zh: {
    leftLabel: "工具 A",
    rightLabel: "工具 B",
    selectorHint: "任选两个工具并立即对比。",
    compareCta: "立即对比",
    openLabel: "打开对比",
    emptyTitle: "请选择两个工具进行对比",
    emptyDescription: "选择后，下方会立即显示价格、适配度和质量差异。",
    compactTitle: "快速对比",
    compactDescription: "你所选工具组合的简要概览。",
    fullTitle: "自动对比工作区",
    fullDescription: "使用同一份目录数据，在一个面板中查看价格、适配度、速度和输出质量。",
    pricingModel: "定价模式",
    freeTier: "免费层级",
    bestUseCase: "最佳用途",
    strengths: "优势",
    weaknesses: "不足",
    speed: "速度",
    ease: "易用性",
    quality: "输出质量",
    students: "学生",
    creators: "创作者",
    business: "企业",
    value: "性价比",
    category: "分类",
    yes: "是",
    no: "否",
    searchPlaceholder: "搜索工具...",
    noMatch: "未找到工具。",
    notAvailable: "不可用"
  },
  ja: {
    leftLabel: "ツール A",
    rightLabel: "ツール B",
    selectorHint: "好きな2つのツールを選んですぐに比較できます。",
    compareCta: "今すぐ比較",
    openLabel: "比較を開く",
    emptyTitle: "比較する2つのツールを選択してください",
    emptyDescription: "選択すると、価格・適合性・品質の違いがすぐ下に表示されます。",
    compactTitle: "クイック比較",
    compactDescription: "選択したペアの要点をコンパクトに表示します。",
    fullTitle: "自動比較ワークスペース",
    fullDescription: "同じカタログデータを使って、価格・適合性・速度・出力品質を1つのパネルで確認できます。",
    pricingModel: "料金モデル",
    freeTier: "無料枠",
    bestUseCase: "最適な用途",
    strengths: "強み",
    weaknesses: "弱み",
    speed: "速度",
    ease: "使いやすさ",
    quality: "出力品質",
    students: "学生",
    creators: "クリエイター",
    business: "ビジネス",
    value: "価値",
    category: "カテゴリ",
    yes: "はい",
    no: "いいえ",
    searchPlaceholder: "ツールを検索...",
    noMatch: "一致するツールがありません。",
    notAvailable: "利用不可"
  },
  ko: {
    leftLabel: "도구 A",
    rightLabel: "도구 B",
    selectorHint: "원하는 두 도구를 선택해 즉시 비교하세요.",
    compareCta: "지금 비교",
    openLabel: "비교 열기",
    emptyTitle: "비교할 두 도구를 선택하세요",
    emptyDescription: "선택하는 즉시 아래에서 가격, 적합도, 품질 차이를 확인할 수 있습니다.",
    compactTitle: "빠른 비교",
    compactDescription: "선택한 두 도구의 핵심만 간단히 보여줍니다.",
    fullTitle: "자동 비교 워크스페이스",
    fullDescription: "같은 카탈로그 데이터를 사용해 가격, 적합성, 속도, 결과 품질을 한 패널에서 검토하세요.",
    pricingModel: "가격 모델",
    freeTier: "무료 시작",
    bestUseCase: "최적 활용",
    strengths: "강점",
    weaknesses: "약점",
    speed: "속도",
    ease: "사용 편의성",
    quality: "출력 품질",
    students: "학생",
    creators: "크리에이터",
    business: "비즈니스",
    value: "가치",
    category: "카테고리",
    yes: "예",
    no: "아니오",
    searchPlaceholder: "도구 검색...",
    noMatch: "도구를 찾지 못했습니다.",
    notAvailable: "사용 불가"
  },
  el: {
    leftLabel: "Εργαλείο A",
    rightLabel: "Εργαλείο B",
    selectorHint: "Διάλεξε δύο εργαλεία και σύγκρινέ τα αμέσως.",
    compareCta: "Σύγκρινε τώρα",
    openLabel: "Άνοιγμα σύγκρισης",
    emptyTitle: "Επίλεξε δύο εργαλεία για σύγκριση",
    emptyDescription: "Μόλις τα επιλέξεις, θα εμφανιστούν παρακάτω οι διαφορές σε τιμή, χρήση και ποιότητα.",
    compactTitle: "Γρήγορη σύγκριση",
    compactDescription: "Μια συνοπτική προβολή για το ζευγάρι που διάλεξες.",
    fullTitle: "Χώρος αυτόματης σύγκρισης",
    fullDescription: "Χρησιμοποίησε τα ίδια δεδομένα καταλόγου για να δεις τιμή, καταλληλότητα, ταχύτητα και ποιότητα σε ένα panel.",
    pricingModel: "Μοντέλο τιμολόγησης",
    freeTier: "Δωρεάν επίπεδο",
    bestUseCase: "Καλύτερη χρήση",
    strengths: "Δυνατά σημεία",
    weaknesses: "Αδυναμίες",
    speed: "Ταχύτητα",
    ease: "Ευκολία χρήσης",
    quality: "Ποιότητα αποτελέσματος",
    students: "Μαθητές",
    creators: "Δημιουργοί",
    business: "Επιχειρήσεις",
    value: "Αξία",
    category: "Κατηγορία",
    yes: "Ναι",
    no: "Όχι",
    searchPlaceholder: "Αναζήτησε εργαλείο...",
    noMatch: "Δεν βρέθηκαν εργαλεία.",
    notAvailable: "Μη διαθέσιμο"
  },
  da: {
    leftLabel: "Værktøj A",
    rightLabel: "Værktøj B",
    selectorHint: "Vælg to værktøjer og sammenlign dem med det samme.",
    compareCta: "Sammenlign nu",
    openLabel: "Åbn sammenligning",
    emptyTitle: "Vælg to værktøjer for at sammenligne",
    emptyDescription: "Så snart du vælger dem, vises forskelle i pris, workflow-fit og kvalitet nedenfor.",
    compactTitle: "Hurtig sammenligning",
    compactDescription: "Et kompakt overblik over det valgte værktøjspar.",
    fullTitle: "Automatisk sammenligningspanel",
    fullDescription: "Brug de samme katalogdata til at gennemgå pris, fit, hastighed og output i ét panel.",
    pricingModel: "Prisstruktur",
    freeTier: "Gratis niveau",
    bestUseCase: "Bedste brugsscenarie",
    strengths: "Styrker",
    weaknesses: "Svagheder",
    speed: "Hastighed",
    ease: "Brugervenlighed",
    quality: "Outputkvalitet",
    students: "Studerende",
    creators: "Skabere",
    business: "Forretning",
    value: "Værdi",
    category: "Kategori",
    yes: "Ja",
    no: "Nej",
    searchPlaceholder: "Søg efter værktøj...",
    noMatch: "Ingen værktøjer fundet.",
    notAvailable: "Ikke tilgængelig"
  },
  fa: {
    leftLabel: "ابزار A",
    rightLabel: "ابزار B",
    selectorHint: "هر دو ابزار را انتخاب کنید و فوراً مقایسه کنید.",
    compareCta: "همین حالا مقایسه کن",
    openLabel: "باز کردن مقایسه",
    emptyTitle: "برای مقایسه دو ابزار انتخاب کنید",
    emptyDescription: "به محض انتخاب، تفاوت قیمت، تناسب کاربرد و کیفیت در پایین نمایش داده می‌شود.",
    compactTitle: "مقایسه سریع",
    compactDescription: "نمایی خلاصه از دو ابزاری که انتخاب کرده‌اید.",
    fullTitle: "محیط مقایسه خودکار",
    fullDescription: "با استفاده از همان داده‌های دایرکتوری، قیمت، تناسب، سرعت و کیفیت خروجی را در یک پنل بررسی کنید.",
    pricingModel: "مدل قیمت‌گذاری",
    freeTier: "سطح رایگان",
    bestUseCase: "بهترین کاربرد",
    strengths: "نقاط قوت",
    weaknesses: "نقاط ضعف",
    speed: "سرعت",
    ease: "سهولت استفاده",
    quality: "کیفیت خروجی",
    students: "دانشجویان",
    creators: "سازندگان",
    business: "کسب‌وکار",
    value: "ارزش",
    category: "دسته",
    yes: "بله",
    no: "خیر",
    searchPlaceholder: "جست‌وجوی ابزار...",
    noMatch: "ابزاری پیدا نشد.",
    notAvailable: "در دسترس نیست"
  }
};

function compareLocaleSort(locale: Locale, left: CompareToolOption, right: CompareToolOption) {
  return left.name.localeCompare(right.name, locale === "tr" ? "tr-TR" : "en-US");
}

function normalizeCompareText(input: string) {
  return input
    .replace(/\u00c2/g, "")
    .replace(/\u00c3\u00bc/g, "ü")
    .replace(/\u00c3\u009c/g, "Ü")
    .replace(/\u00c3\u00b6/g, "ö")
    .replace(/\u00c3\u0096/g, "Ö")
    .replace(/\u00c3\u00a7/g, "ç")
    .replace(/\u00c3\u0087/g, "Ç")
    .replace(/\u00c4\u00b1/g, "ı")
    .replace(/\u00c4\u00b0/g, "İ")
    .replace(/\u00c4\u009f/g, "ğ")
    .replace(/\u00c4\u009e/g, "Ğ")
    .replace(/\u00c5\u009f/g, "ş")
    .replace(/\u00c5\u009e/g, "Ş")
    .replace(/\u00e2\u0080\u0099/g, "’")
    .replace(/\u00e2\u0080\u009c|\u00e2\u0080\u009d/g, "\"")
    .replace(/\u00e2\u0080\u0093/g, "–")
    .replace(/\u00e2\u0080\u0094/g, "—")
    .replace(/\uFFFD/g, "")
    .replace(/([A-Za-zÇĞİÖŞÜçğıöşü])\?([A-Za-zÇĞİÖŞÜçğıöşü])/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();
}

function isShortTag(value: string) {
  const cleaned = value.trim();
  return cleaned.length > 0 && cleaned.length <= 16 && !cleaned.includes(".");
}

function buildCompareSearchText(tool: CompareToolOption, locale: Locale) {
  return normalizeCompareText(
    [
      tool.name,
      tool.slug,
      tool.bestUseCase,
      tool.compareProfile.category,
      tool.compareProfile.pricingModel,
      ...tool.compareProfile.bestFor,
      ...tool.compareProfile.strengths,
      ...tool.compareProfile.weaknesses
    ].join(" ")
  ).toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
}

type SearchableToolSelectProps = {
  locale: Locale;
  label: string;
  value: string;
  onChange: (slug: string) => void;
  options: CompareToolOption[];
};

function SearchableToolSelect({ locale, label, value, onChange, options }: SearchableToolSelectProps) {
  const listboxId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedTool = useMemo(() => options.find((tool) => tool.slug === value) ?? null, [options, value]);

  useEffect(() => {
    setQuery(selectedTool ? selectedTool.name : "");
    setActiveIndex(0);
  }, [selectedTool]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalizeCompareText(query).toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((tool) => buildCompareSearchText(tool, locale).includes(normalizedQuery));
  }, [locale, options, query]);

  useEffect(() => {
    if (filteredOptions.length === 0) {
      setActiveIndex(-1);
      return;
    }

    if (activeIndex >= filteredOptions.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, filteredOptions.length]);

  function selectTool(tool: CompareToolOption) {
    onChange(tool.slug);
    setQuery(tool.name);
    setOpen(false);
    setActiveIndex(0);
    inputRef.current?.blur();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.min(current + 1, Math.max(filteredOptions.length - 1, 0)));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const candidate = filteredOptions[activeIndex] ?? filteredOptions[0];
      if (candidate) {
        selectTool(candidate);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setQuery(selectedTool?.name ?? "");
      setActiveIndex(0);
    }
  }

  return (
    <div ref={wrapperRef} className="relative min-w-0">
      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</span>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            value={query}
            placeholder={copyByLocale[locale].searchPlaceholder}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
              setActiveIndex(0);
            }}
            onBlur={() => {
              window.setTimeout(() => {
                setOpen(false);
                setQuery(selectedTool?.name ?? "");
              }, 120);
            }}
            onKeyDown={handleKeyDown}
            className="min-h-[48px] w-full rounded-2xl border border-slate-200 bg-white px-4 pr-11 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-200 focus:ring-1 focus:ring-sky-100 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.14)]"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            ⌕
          </span>
        </div>
        {selectedTool ? <p className="text-[11px] leading-5 text-slate-500">{selectedTool.name} · {selectedTool.compareProfile.pricingModel}</p> : null}
      </label>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 max-h-72 overflow-y-auto rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)]"
        >
          {filteredOptions.length ? (
            filteredOptions.map((tool, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tool.slug}
                  type="button"
                  role="option"
                  aria-selected={tool.slug === value}
                  className={[
                    "flex w-full items-start justify-between gap-3 rounded-[16px] px-3 py-3 text-left transition",
                    isActive
                    ? "bg-sky-50 text-slate-950 ring-1 ring-sky-100"
                      : "text-slate-700 hover:bg-slate-50"
                  ].join(" ")}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectTool(tool)}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{tool.name}</p>
                    <p className="mt-1 clamp-2 text-xs leading-5 text-slate-500">{normalizeCompareText(tool.bestUseCase)}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0055FF]">
                    {normalizeCompareText(tool.compareProfile.pricingModel)}
                  </span>
                </button>
              );
            })
          ) : (
            <p className="px-3 py-4 text-sm text-slate-500">{copyByLocale[locale].noMatch}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function renderValue(value: string | string[] | number | boolean, locale: Locale, compact = false) {
  const labels = copyByLocale[locale];

  if (Array.isArray(value)) {
    const normalizedItems = value.map((item) => normalizeCompareText(item));
    const shortItems = normalizedItems.filter((item) => isShortTag(item));
    const longItems = normalizedItems.filter((item) => !isShortTag(item));
    if (longItems.length > 0) {
      return (
        <ul className="m-0 flex list-none flex-col gap-1 p-0 text-xs leading-5 text-slate-600">
          {longItems.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <div className="flex flex-wrap gap-2">
        {shortItems.slice(0, 2).map((item) => (
          <Badge key={item} variant="muted" className="compare-chip px-2 py-0.5 text-[10px]">
            {item}
          </Badge>
        ))}
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <span
        className={
          compact
            ? "inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#0055FF]"
            : "inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-[#0055FF]"
        }
      >
        {value.toFixed(0)}/10
      </span>
    );
  }

  if (typeof value === "boolean") {
    return (
      <span
        role="img"
        aria-label={value ? labels.yes : labels.no}
        className={
          compact
            ? "inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-bold text-[#0055FF]"
            : "inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-[#0055FF]"
        }
      >
        {value ? "✓" : "✕"}
      </span>
    );
  }

  if (typeof value === "string") {
    const cleaned = normalizeCompareText(value);
    if (cleaned !== value) {
      return <p className={compact ? "text-[12px] leading-5 text-slate-700" : "text-sm leading-6 text-slate-700"}>{cleaned}</p>;
    }
    const normalized = value.trim().toLowerCase();
    if (normalized === labels.yes.toLowerCase()) {
      return (
        <span
          role="img"
          aria-label={labels.yes}
          className={
            compact
              ? "inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-bold text-[#0055FF]"
              : "inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-[#0055FF]"
          }
        >
          ✓
        </span>
      );
    }
    if (normalized === labels.no.toLowerCase()) {
      return (
        <span
          role="img"
          aria-label={labels.no}
          className={
            compact
              ? "inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-bold text-[#0055FF]"
              : "inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-[#0055FF]"
          }
        >
          ✕
        </span>
      );
    }
    if (normalized === "-" || normalized === "—" || normalized === "n/a" || normalized === "na") {
      return (
        <span
          role="img"
          aria-label={labels.notAvailable}
          className={
            compact
              ? "inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] font-bold text-[#0055FF]"
              : "inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-[#0055FF]"
          }
        >
          —
        </span>
      );
    }
  }

  return <p className={compact ? "text-[12px] leading-5 text-slate-700" : "text-sm leading-6 text-slate-700"}>{value}</p>;
}

export function AutoCompareWorkspace({ locale, tools, initialLeftSlug, initialRightSlug, compact = false }: AutoCompareWorkspaceProps) {
  const labels = copyByLocale[locale];
  const orderedTools = useMemo(() => [...tools].sort((left, right) => compareLocaleSort(locale, left, right)), [locale, tools]);

  const initialLeft = initialLeftSlug && orderedTools.some((tool) => tool.slug === initialLeftSlug) ? initialLeftSlug : orderedTools[0]?.slug ?? "";
  const initialRightCandidate =
    initialRightSlug && orderedTools.some((tool) => tool.slug === initialRightSlug) && initialRightSlug !== initialLeft
      ? initialRightSlug
      : orderedTools.find((tool) => tool.slug !== initialLeft)?.slug ?? initialLeft;

  const [leftSlug, setLeftSlug] = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState(initialRightCandidate);

  useEffect(() => {
    setLeftSlug(initialLeft);
    setRightSlug(initialRightCandidate);
  }, [initialLeft, initialRightCandidate]);

  const leftTool = orderedTools.find((tool) => tool.slug === leftSlug) ?? orderedTools[0] ?? null;
  const rightTool = orderedTools.find((tool) => tool.slug === rightSlug) ?? orderedTools[1] ?? orderedTools[0] ?? null;
  const canCompare = Boolean(leftTool && rightTool && leftTool.slug !== rightTool.slug);
  const comparisonHref = canCompare ? buildAutoComparisonPath(locale, leftTool!.slug, rightTool!.slug) : null;

  const rows = useMemo(
    () =>
      leftTool && rightTool
        ? [
            { label: labels.pricingModel, left: leftTool.compareProfile.pricingModel, right: rightTool.compareProfile.pricingModel },
            { label: labels.freeTier, left: leftTool.compareProfile.freeTier, right: rightTool.compareProfile.freeTier },
            { label: labels.bestUseCase, left: leftTool.bestUseCase, right: rightTool.bestUseCase },
            { label: labels.category, left: leftTool.compareProfile.category, right: rightTool.compareProfile.category },
            { label: labels.strengths, left: leftTool.compareProfile.strengths, right: rightTool.compareProfile.strengths },
            { label: labels.weaknesses, left: leftTool.compareProfile.weaknesses, right: rightTool.compareProfile.weaknesses },
            { label: labels.speed, left: leftTool.compareProfile.speedScore, right: rightTool.compareProfile.speedScore },
            { label: labels.ease, left: leftTool.compareProfile.easeOfUseScore, right: rightTool.compareProfile.easeOfUseScore },
            { label: labels.quality, left: leftTool.compareProfile.outputQualityScore, right: rightTool.compareProfile.outputQualityScore },
            { label: labels.students, left: leftTool.compareProfile.studentScore, right: rightTool.compareProfile.studentScore },
            { label: labels.creators, left: leftTool.compareProfile.creatorScore, right: rightTool.compareProfile.creatorScore },
            { label: labels.business, left: leftTool.compareProfile.businessScore, right: rightTool.compareProfile.businessScore },
            { label: labels.value, left: leftTool.compareProfile.valueScore, right: rightTool.compareProfile.valueScore }
          ]
        : [],
    [labels, leftTool, rightTool]
  );
  const compactRowLabels = new Set<string>([
    labels.speed,
    labels.ease,
    labels.quality,
    labels.students,
    labels.creators,
    labels.business,
    labels.value
  ]);

  const visibleRows = compact ? rows.slice(0, 4) : rows;
  const safeLeftSlug = leftTool?.slug ?? leftSlug;
  const safeRightSlug = rightTool?.slug ?? rightSlug;

  return (
    <GlassPanel className="overflow-visible rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.98))] p-4 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.14)] sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600">{compact ? labels.compactTitle : labels.fullTitle}</p>
          <h2 className="mt-3 text-[1.5rem] font-bold tracking-[-0.035em] text-slate-950 sm:text-[1.9rem]">
            {compact ? labels.compactTitle : labels.fullTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-7">
            {compact ? labels.compactDescription : labels.fullDescription}
          </p>
        </div>
        <Badge variant="accent" className="hidden w-fit text-[11px] uppercase tracking-[0.14em] sm:inline-flex">
          {labels.selectorHint}
        </Badge>
        <p className="text-xs text-slate-500 sm:hidden">{labels.selectorHint}</p>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-end">
        <SearchableToolSelect
          locale={locale}
          label={labels.leftLabel}
          value={safeLeftSlug}
          options={orderedTools}
          onChange={(nextSlug) => {
            setLeftSlug(nextSlug);
            if (nextSlug === rightSlug) {
              const fallback = orderedTools.find((tool) => tool.slug !== nextSlug)?.slug ?? nextSlug;
              setRightSlug(fallback);
            }
          }}
        />

        <div className="hidden lg:flex lg:h-[48px] lg:items-center lg:justify-center">
          <Badge variant="dark" className="px-3 py-1.5 text-[11px] tracking-[0.18em] text-cyan-100">
            VS
          </Badge>
        </div>

        <SearchableToolSelect
          locale={locale}
          label={labels.rightLabel}
          value={safeRightSlug}
          options={orderedTools}
          onChange={(nextSlug) => {
            setRightSlug(nextSlug);
            if (nextSlug === leftSlug) {
              const fallback = orderedTools.find((tool) => tool.slug !== nextSlug)?.slug ?? nextSlug;
              setLeftSlug(fallback);
            }
          }}
        />

        <div className="flex lg:justify-end">
          <PremiumButton href={comparisonHref ?? undefined} className="w-full lg:w-auto">
            {labels.compareCta}
          </PremiumButton>
        </div>
      </div>

      {leftTool && rightTool ? (
        <div className="mt-6 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {([leftTool, rightTool] as CompareToolOption[]).map((tool) => {
              const bestForTags = tool.compareProfile.bestFor
                .map((item) => normalizeCompareText(item))
                .filter((item) => isShortTag(item));
              return (
              <article key={tool.slug} className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_18px_54px_-36px_rgba(15,23,42,0.14)] sm:rounded-[26px] sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{normalizeCompareText(tool.compareProfile.category)}</p>
                    <h3 className="mt-2 text-lg font-bold tracking-[-0.03em] text-slate-950 sm:text-xl">{tool.name}</h3>
                  </div>
                  <Badge variant="accent" className="shrink-0 text-[11px]">
                    {tool.compareProfile.pricingModel}
                  </Badge>
                </div>

                <p className="mt-2 text-sm leading-5 text-slate-600 mobile-clamp-2 sm:mt-3 sm:leading-6">
                  {normalizeCompareText(tool.bestUseCase)}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  {bestForTags.slice(0, 2).map((item, index) => (
                    <Badge
                      key={item}
                      variant="muted"
                      className={`px-2 py-0.5 text-[10px] ${index === 1 ? "hidden sm:inline-flex" : ""}`}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </article>
            )})}
          </div>

          <div className="grid gap-2 sm:gap-3">
            {visibleRows.map((row) => (
              <div
                key={row.label}
                className={
                  compactRowLabels.has(row.label)
                    ? "rounded-[16px] border border-slate-200 bg-white px-3 py-2 sm:rounded-[20px] sm:px-4 sm:py-3 lg:grid lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-4"
                    : "rounded-[18px] border border-slate-200 bg-white px-3 py-2.5 sm:rounded-[22px] sm:px-5 sm:py-4 lg:grid lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-4"
                }
              >
                <div
                  className={
                    compactRowLabels.has(row.label)
                      ? "text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 lg:pt-0.5"
                      : "text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 lg:pt-1"
                  }
                >
                  {row.label}
                </div>
                <div className={compactRowLabels.has(row.label) ? "mt-2 space-y-1.5 lg:mt-0" : "mt-2.5 space-y-2.5 lg:mt-0"}>
                  <div className="flex items-start justify-between gap-3 rounded-[16px] border border-sky-200 bg-sky-50/50 px-3 py-3 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.12)] lg:border lg:pt-3">
                    <div className="min-w-0">
                      <p className={compactRowLabels.has(row.label) ? "text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#0055FF]" : "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]"}>
                        {leftTool?.name ?? labels.leftLabel}
                      </p>
                      {renderValue(row.left, locale, compactRowLabels.has(row.label))}
                    </div>
                    <span className="hidden shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline-flex">→</span>
                  </div>
                </div>
                <div className={compactRowLabels.has(row.label) ? "mt-2 space-y-1.5 lg:mt-0" : "mt-2.5 space-y-2.5 lg:mt-0"}>
                  <div className="flex items-start justify-between gap-3 rounded-[16px] border border-slate-200 bg-slate-50/70 px-3 py-3 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.12)] lg:border lg:pt-3">
                    <div className="min-w-0">
                      <p className={compactRowLabels.has(row.label) ? "text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#0E2450]" : "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E2450]"}>
                        {rightTool?.name ?? labels.rightLabel}
                      </p>
                      {renderValue(row.right, locale, compactRowLabels.has(row.label))}
                    </div>
                    <span className="hidden shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline-flex">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!compact ? (
            <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_54px_-36px_rgba(15,23,42,0.14)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <p className="text-sm leading-7 text-slate-600">{labels.selectorHint}</p>
              <PremiumButton href={comparisonHref ?? undefined} className="w-full sm:w-auto">
                {labels.openLabel}
              </PremiumButton>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-[0_18px_54px_-36px_rgba(15,23,42,0.14)] sm:p-6">
          <p className="text-base font-semibold text-slate-950">{labels.emptyTitle}</p>
          <p className="mt-2 text-slate-600">{labels.emptyDescription}</p>
        </div>
      )}
    </GlassPanel>
  );
}
