import type { SupportedLocale } from "@/i18n/config";
import type { LocalizedBlogArticle } from "@/types/blog";
import type { LocalizedTool } from "@/types/catalog";

function normalizeMetaText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function ensureSentence(value: string) {
  const text = normalizeMetaText(value);

  if (!text) {
    return text;
  }

  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function clipMetaDescription(value: string, maxLength = 160) {
  const text = normalizeMetaText(value);

  if (text.length <= maxLength) {
    return text;
  }

  const clipped = text.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");

  return `${(lastSpace > 80 ? clipped.slice(0, lastSpace) : clipped).trim()}...`;
}

function getFirstSentence(value: string) {
  const text = normalizeMetaText(value);
  const match = text.match(/.+?[.!?](\s|$)/);

  return ensureSentence(match?.[0] ?? text);
}

function lowerFirst(value: string) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function cleanTitleTopic(value: string) {
  return normalizeMetaText(value)
    .replace(/\s*\|\s*Deciply$/i, "")
    .replace(/\s*-\s*Deciply$/i, "")
    .replace(/[!?]$/, "");
}

export function stripBrandSuffix(value: string) {
  return cleanTitleTopic(value);
}

function buildBlogTopic(locale: SupportedLocale, article: LocalizedBlogArticle) {
  const cleanTitle = cleanTitleTopic(article.title);
  return lowerFirst(cleanTitle);
}

function buildBlogLeadByKind(locale: SupportedLocale, article: LocalizedBlogArticle) {
  const topic = buildBlogTopic(locale, article);
  const title = cleanTitleTopic(article.title);
  const kind = article.contentGraph?.kind ?? "MANUAL";

  if (locale === "tr") {
    switch (kind) {
      case "BEST_TOOLS":
        return `${title} için araç seçimini workflow, fiyat ve kullanım alanına göre daraltan editoryal bir rehber.`;
      case "TOOL_COMPARISON":
        return `${title} için fiyat, hız, kalite ve kullanım bağlamını yan yana inceleyen net bir karşılaştırma.`;
      case "ALTERNATIVES":
        return `${title} alternatifi arayanlar için, hangi açığın kapatıldığını ve ne zaman geçiş yapılacağını gösteren rehber.`;
      case "USE_CASE_GUIDE":
        return `${title} için ilk kurulumdan teslim aşamasına kadar izlenecek pratik workflow rehberi.`;
      default:
        return `${title} için gerçek kullanım senaryolarını, karar noktalarını ve bir sonraki adımı özetleyen rehber.`;
    }
  }

  switch (kind) {
    case "BEST_TOOLS":
      return `This guide narrows ${topic} by workflow, pricing, and fit.`;
    case "TOOL_COMPARISON":
      return `This comparison looks at ${topic} through pricing, speed, quality, and use-case fit.`;
    case "ALTERNATIVES":
      return `This alternatives guide shows which gap ${topic} fills and when a switch makes sense.`;
    case "USE_CASE_GUIDE":
      return `This workflow guide maps ${topic} from setup to delivery.`;
    default:
      return `This guide explains ${topic} with real scenarios, decision points, and the next step.`;
  }
}

export function buildBlogSeoLead(locale: SupportedLocale, article: LocalizedBlogArticle) {
  return buildBlogLeadByKind(locale, article);
}

export function buildBlogIntroParagraph(locale: SupportedLocale, article: LocalizedBlogArticle) {
  const lead = buildBlogSeoLead(locale, article);
  const intro = normalizeMetaText(article.intro);
  const leadWithoutEnding = lead.replace(/[.!?]$/, "");

  if (!intro) {
    return lead;
  }

  if (intro.toLowerCase().startsWith(leadWithoutEnding.toLowerCase())) {
    return ensureSentence(intro);
  }

  return ensureSentence(`${lead} ${intro}`);
}

export function buildHomeTitle(locale: SupportedLocale) {
  switch (locale) {
    case "tr":
      return "Gerçek kullanım alanlarına göre AI araçlarını karşılaştırın";
    case "ar":
      return "قارن أدوات الذكاء الاصطناعي حسب الاستخدام الفعلي";
    case "ru":
      return "Сравнивайте AI‑инструменты по реальным сценариям";
    case "zh":
      return "按真实使用场景比较 AI 工具";
    case "ja":
      return "実際の用途でAIツールを比較する";
    case "ko":
      return "실제 사용 사례로 AI 도구를 비교하세요";
    case "el":
      return "Συγκρίνετε εργαλεία AI με βάση την πραγματική χρήση";
    case "da":
      return "Sammenlign AI-værktøjer efter faktisk brug";
    case "fa":
      return "ابزارهای هوش مصنوعی را بر اساس کاربرد واقعی مقایسه کنید";
    case "en":
    default:
      return "Compare AI Tools by Real Use Case";
  }
}

export function buildBlogPageTitle(article: LocalizedBlogArticle) {
  if (normalizeMetaText(article.seoTitle)) {
    return article.seoTitle;
  }

  const base = cleanTitleTopic(article.title);

  return /\b2026\b/.test(base)
    ? `${base} - Real Use Cases & Tools`
    : `${base} (2026 Guide) - Real Use Cases & Tools`;
}

export function buildToolsPageTitle(locale: SupportedLocale, currentPage: number) {
  const base =
    locale === "tr"
      ? "AI araçları dizini"
      : locale === "ar"
        ? "دليل أدوات الذكاء الاصطناعي"
        : locale === "ru"
          ? "Каталог AI‑инструментов"
          : locale === "zh"
            ? "AI 工具目录"
            : locale === "ja"
              ? "AIツールのディレクトリ"
              : locale === "ko"
                ? "AI 도구 디렉터리"
                : locale === "el"
                  ? "Κατάλογος εργαλείων AI"
                  : locale === "da"
                    ? "AI-værktøjs-katalog"
                    : locale === "fa"
                      ? "دایرکتوری ابزارهای هوش مصنوعی"
                      : "AI Tools Directory";
  return currentPage > 1 ? `${base} - Page ${currentPage}` : base;
}

export function buildToolPageTitle(locale: SupportedLocale, tool: LocalizedTool) {
  return locale === "tr"
    ? `${tool.name} incelemesi (2026): fiyat, artılar, eksiler ve ${tool.bestUseCase}`
    : `${tool.name} Review (2026): Pricing, Pros & Cons for ${tool.bestUseCase}`;
}

export function buildHomeMetaDescription(locale: SupportedLocale) {
  switch (locale) {
    case "tr":
      return "AI araçlarını karşılaştırın, gerçek kullanım senaryolarını keşfedin ve Deciply ile doğru aracı daha hızlı seçin.";
    case "ar":
      return "قارن أدوات الذكاء الاصطناعي، واستكشف حالات الاستخدام الحقيقية، واختر الأداة المناسبة بسرعة أكبر مع Deciply.";
    case "ru":
      return "Сравнивайте AI‑инструменты, изучайте реальные сценарии и быстрее выбирайте подходящий вариант с Deciply.";
    case "zh":
      return "比较 AI 工具，探索真实使用场景，并借助 Deciply 更快找到合适的工具。";
    case "ja":
      return "AIツールを比較し、実際の用途を確認して、Deciply で最適なツールをより速く選びましょう。";
    case "ko":
      return "AI 도구를 비교하고 실제 사용 사례를 살펴보며 Deciply로 더 빠르게 적합한 도구를 선택하세요.";
    case "el":
      return "Συγκρίνετε εργαλεία AI, εξερευνήστε πραγματικές χρήσεις και επιλέξτε γρηγορότερα το σωστό εργαλείο με το Deciply.";
    case "da":
      return "Sammenlign AI-værktøjer, udforsk reelle anvendelser, og vælg hurtigere det rigtige værktøj med Deciply.";
    case "fa":
      return "ابزارهای هوش مصنوعی را مقایسه کنید، کاربردهای واقعی را بررسی کنید و با Deciply سریع‌تر ابزار مناسب را انتخاب کنید.";
    case "en":
    default:
      return "Compare AI tools, explore real use cases, and choose the right tool faster with Deciply.";
  }
}

export function buildToolsIndexMetaDescription(locale: SupportedLocale, toolCount: number, currentPage = 1) {
  const base =
    locale === "tr"
      ? `${toolCount} seçilmiş AI aracını kullanım alanı, fiyat modeli ve güçlü yönlerine göre inceleyin. Deciply ile size en uygun aracı daha hızlı bulun.`
      : locale === "ar"
        ? `تصفّح ${toolCount} أداة ذكاء اصطناعي مختارة حسب الاستخدام والسعر ونقاط القوة، واعثر على الأنسب أسرع مع Deciply.`
        : locale === "ru"
          ? `Просматривайте ${toolCount} отобранных AI‑инструментов по сценарию, цене и сильным сторонам. Находите подходящий вариант быстрее с Deciply.`
          : locale === "zh"
            ? `按使用场景、价格和优势浏览 ${toolCount} 个精选 AI 工具，并借助 Deciply 更快找到合适选项。`
            : locale === "ja"
              ? `用途、価格、強み別に ${toolCount} 件の厳選AIツールを見て、Deciply でより速く最適な選択を見つけましょう。`
              : locale === "ko"
                ? `용도, 가격, 강점을 기준으로 ${toolCount}개의 선별된 AI 도구를 살펴보고 Deciply로 더 빠르게 맞는 도구를 찾으세요.`
                : locale === "el"
                  ? `Περιηγηθείτε σε ${toolCount} επιλεγμένα εργαλεία AI ανά χρήση, τιμή και δυνατά σημεία και βρείτε το κατάλληλο πιο γρήγορα με το Deciply.`
                  : locale === "da"
                    ? `Gennemse ${toolCount} udvalgte AI-værktøjer efter anvendelse, pris og styrker, og find det rigtige hurtigere med Deciply.`
                    : locale === "fa"
                      ? `‏${toolCount} ابزار منتخب هوش مصنوعی را بر اساس کاربرد، قیمت و نقاط قوت بررسی کنید و با Deciply سریع‌تر گزینه مناسب را پیدا کنید.`
                      : `Browse ${toolCount} curated AI tools by use case, pricing, and strengths. Compare options and find the right fit faster with Deciply.`;

  if (currentPage <= 1) {
    return base;
  }

  return locale === "tr" ? `${base} Sayfa ${currentPage}.` : `${base} Page ${currentPage}.`;
}

export function buildBlogIndexMetaDescription(locale: SupportedLocale, currentPage = 1) {
  const base =
    locale === "tr"
      ? "Deciply blogunda gerçek kullanım senaryoları, karşılaştırmalar ve net araç seçim rehberleri yer alır."
      : locale === "ar"
        ? "يحتوي مدونة Deciply على سيناريوهات استخدام حقيقية، ومقارنات صادقة، وأدلة أوضح لاختيار أدوات الذكاء الاصطناعي."
        : locale === "ru"
          ? "В блоге Deciply собраны реальные сценарии, честные сравнения и понятные руководства по выбору AI‑инструментов."
          : locale === "zh"
            ? "Deciply 博客提供真实使用场景、客观对比以及更清晰的 AI 工具选择指南。"
            : locale === "ja"
              ? "Deciply のブログでは、実際の活用例、率直な比較、より分かりやすいAIツール選びのガイドを紹介します。"
              : locale === "ko"
                ? "Deciply 블로그에는 실제 활용 사례, 솔직한 비교, 더 명확한 AI 도구 선택 가이드가 담겨 있습니다."
                : locale === "el"
                  ? "Το blog του Deciply περιλαμβάνει πραγματικά σενάρια χρήσης, ειλικρινείς συγκρίσεις και πιο καθαρούς οδηγούς επιλογής εργαλείων AI."
                  : locale === "da"
                    ? "Deciply-bloggen indeholder reelle brugsscenarier, ærlige sammenligninger og klarere guider til valg af AI-værktøjer."
                    : locale === "fa"
                      ? "وبلاگ Deciply شامل سناریوهای واقعی استفاده، مقایسه‌های صادقانه و راهنماهای واضح‌تر برای انتخاب ابزارهای هوش مصنوعی است."
                      : "Explore Deciply blog guides built around real use cases, honest comparisons, and clearer AI tool decisions.";

  if (currentPage <= 1) {
    return base;
  }

  return locale === "tr" ? `${base} Sayfa ${currentPage}.` : `${base} Page ${currentPage}.`;
}

export function buildToolMetaDescription(locale: SupportedLocale, tool: LocalizedTool) {
  const base = ensureSentence(tool.whatItActuallyDoes || tool.shortDescription);
  const example = ensureSentence(tool.realUseCaseExample.description);
  const tail =
    locale === "tr"
      ? `${tool.name} için fiyat özeti, güçlü yönler, zayıf yönler, alternatifler ve en mantıklı kullanım alanlarını görün.`
      : `See ${tool.name}'s pricing, strengths, weaknesses, alternatives, and the workflows where it makes the most sense.`;

  return clipMetaDescription(`${base} ${example} ${tail}`);
}

export function buildBlogMetaDescription(locale: SupportedLocale, article: LocalizedBlogArticle) {
  if (normalizeMetaText(article.seoDescription)) {
    return clipMetaDescription(article.seoDescription);
  }

  const lead = buildBlogSeoLead(locale, article);
  const excerptLead = getFirstSentence(article.excerpt);
  return clipMetaDescription(`${lead} ${excerptLead}`);
}
