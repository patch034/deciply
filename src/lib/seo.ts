import type { Locale } from "@/i18n/config";
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

const blogTopicCopy: Record<Locale, Partial<Record<string, string>>> = {
  en: {
    "en-iyi-ai-araclari-2026": "which AI tools fit writing, research, design, video, and monetization workflows in 2026",
    "chatgpt-ile-para-kazanma-yollari": "how to use ChatGPT for client work, content offers, and realistic monetization paths",
    "en-iyi-ucretsiz-ai-araclari": "which free AI tools are worth testing for real work and early validation",
    "claude-vs-chatgpt-karsilastirma": "when Claude fits better than ChatGPT and where ChatGPT still makes more sense",
    "midjourney-nasil-kullanilir": "how to use Midjourney for prompts, image workflows, and better visual output",
    "freelance-icin-en-iyi-ai-araclari": "which AI tools help freelancers deliver faster, research better, and protect margins",
    "ai-ile-blog-yazip-para-kazanma": "how AI tools support a blog monetization workflow with realistic publishing steps",
    "en-iyi-gorsel-ai-araclari": "which AI image tools fit brand work, concept creation, and client-ready visuals",
    "yeni-baslayanlar-icin-ai-rehberi": "how beginners can choose their first AI tools without wasting time or money",
    "en-hizli-buyuyen-ai-araclari": "which fast-growing AI tools are gaining attention and where they fit in real workflows",
    "ai-ile-para-kazanmak-icin-en-iyi-araclar": "which AI tools fit service offers, content delivery, and practical monetization systems",
    "chatgpt-vs-claude-vs-gemini": "how ChatGPT, Claude, and Gemini compare across writing, research, and daily work",
    "ucretsiz-ai-araclari-2026": "which free AI tools still make sense in 2026 for real work and testing",
    "best-ai-tools-for-making-money-2026": "which AI tools fit realistic monetization workflows in 2026",
    "chatgpt-alternatives-compared-2026": "which alternatives to ChatGPT make more sense for research, writing, and specialized workflows",
    "free-ai-tools-you-can-start-using-today": "which free AI tools you can start using today for practical work",
    "best-ai-tools-for-freelancers-2026": "which AI tools freelancers can use to save time, improve delivery, and support repeatable income",
    "best-ai-tools-for-students-2026": "which AI tools help students study, research, and organize work more efficiently",
    "ai-tools-for-passive-income-2026": "how AI tools fit passive-income style workflows with realistic expectations",
    "ai-side-hustles-you-can-start-today": "which AI side hustles are realistic to test today and how the workflows actually work",
    "free-ai-tools-that-actually-make-money": "which free AI tools can support small monetization experiments that actually lead to revenue",
    "best-ai-tools-for-beginners-2026": "which beginner-friendly AI tools are easiest to start with in 2026",
    "how-to-make-1000-a-month-with-ai-tools": "how to build a realistic path toward making $1000 a month with AI tools",
    "ai-tools-for-freelancers": "how freelancers can use AI tools to save time, improve delivery, and earn more realistically",
    "best-free-ai-tools-2026": "which free AI tools are strongest in 2026 for writing, research, design, and validation",
    "ai-tools-to-make-money-2026": "which AI tools fit real online income workflows in 2026"
  },
  tr: {
    "en-iyi-ai-araclari-2026": "2026'da yazı, araştırma, tasarım, video ve gelir odaklı işler için hangi AI araçlarının daha uygun olduğunu",
    "chatgpt-ile-para-kazanma-yollari": "ChatGPT'nin müşteri işleri, içerik teklifleri ve gerçekçi gelir modellerinde nasıl kullanılabileceğini",
    "en-iyi-ucretsiz-ai-araclari": "gerçek işlerde denemeye değer ücretsiz AI araçlarının hangileri olduğunu",
    "claude-vs-chatgpt-karsilastirma": "Claude'un hangi durumlarda ChatGPT'den daha mantıklı olduğunu ve ChatGPT'nin nerede öne çıktığını",
    "midjourney-nasil-kullanilir": "Midjourney'in prompt, görsel üretim ve daha iyi çıktı alma akışlarında nasıl kullanıldığını",
    "freelance-icin-en-iyi-ai-araclari": "freelancer'ların daha hızlı teslim, daha iyi araştırma ve daha güçlü marj için hangi AI araçlarını kullanabileceğini",
    "ai-ile-blog-yazip-para-kazanma": "AI araçlarıyla blog üretim sürecinin gerçekçi şekilde nasıl gelir modeline dönüştürülebileceğini",
    "en-iyi-gorsel-ai-araclari": "marka işi, konsept üretimi ve teslim odaklı görseller için hangi AI araçlarının daha uygun olduğunu",
    "yeni-baslayanlar-icin-ai-rehberi": "yeni başlayanların zaman ve para kaybetmeden ilk AI araçlarını nasıl seçebileceğini",
    "en-hizli-buyuyen-ai-araclari": "hızlı büyüyen AI araçlarının hangi işlerde anlamlı hale geldiğini",
    "ai-ile-para-kazanmak-icin-en-iyi-araclar": "AI araçlarının hizmet satışı, içerik üretimi ve pratik gelir sistemlerinde nasıl konumlandığını",
    "chatgpt-vs-claude-vs-gemini": "ChatGPT, Claude ve Gemini'nin yazı, araştırma ve günlük iş akışlarında nasıl ayrıştığını",
    "ucretsiz-ai-araclari-2026": "2026'da ücretsiz AI araçlarının gerçek işlerde hangi senaryolarda hâlâ mantıklı olduğunu",
    "best-ai-tools-for-making-money-2026": "2026'da gerçekçi gelir sistemleri için hangi AI araçlarının daha uygun olduğunu",
    "chatgpt-alternatives-compared-2026": "ChatGPT alternatiflerinin araştırma, yazı ve uzmanlaşmış iş akışlarında nerede daha mantıklı olduğunu",
    "free-ai-tools-you-can-start-using-today": "bugün hemen denenebilecek ücretsiz AI araçlarının hangi işlerde pratik değer verdiğini",
    "best-ai-tools-for-freelancers-2026": "freelancer'ların zaman kazanmak, teslim kalitesini artırmak ve geliri desteklemek için hangi AI araçlarını kullanabileceğini",
    "best-ai-tools-for-students-2026": "öğrenciler için araştırma, not alma ve çalışma düzeni açısından hangi AI araçlarının daha uygun olduğunu",
    "ai-tools-for-passive-income-2026": "AI araçlarının pasif gelir benzeri sistemlerde gerçekçi olarak nasıl kullanılabileceğini",
    "ai-side-hustles-you-can-start-today": "bugün başlanabilecek AI yan gelir fikirlerinin gerçekte nasıl çalıştığını",
    "free-ai-tools-that-actually-make-money": "küçük ama gerçek gelir deneylerinde işe yarayabilen ücretsiz AI araçlarını",
    "best-ai-tools-for-beginners-2026": "2026'da yeni başlayanlar için en kolay başlanabilecek AI araçlarını",
    "how-to-make-1000-a-month-with-ai-tools": "AI araçlarıyla ayda 1000 dolar seviyesine giden gerçekçi bir yolun nasıl kurulacağını",
    "ai-tools-for-freelancers": "freelancer'ların AI araçlarıyla zamanı nasıl kısaltıp teslim kalitesini nasıl yükseltebileceğini",
    "best-free-ai-tools-2026": "2026'da yazı, araştırma, tasarım ve doğrulama için en mantıklı ücretsiz AI araçlarını",
    "ai-tools-to-make-money-2026": "2026'da internetten gelir üretmek için hangi AI araçlarının gerçek iş akışlarına uyduğunu"
  }
};

const blogDescriptionTemplates: Record<Locale, ((topic: string) => string)[]> = {
  en: [
    (topic) => `This guide explains ${topic} with real examples, use cases, and practical steps.`,
    (topic) => `Learn ${topic} through real examples, practical workflows, and realistic expectations.`,
    (topic) => `Explore ${topic} with practical steps, real use cases, and clearer decision points.`,
    (topic) => `See ${topic} in real scenarios, where it helps, and what to watch for.`
  ],
  tr: [
    (topic) => `Bu rehber, ${topic} gerçek örnekler, kullanım senaryoları ve uygulanabilir adımlarla açıklar.`,
    (topic) => `Bu içerik, ${topic} gerçek örnekler, pratik iş akışları ve gerçekçi beklentilerle anlatır.`,
    (topic) => `Bu rehberde ${topic} uygulanabilir adımlar, gerçek kullanım örnekleri ve net karar çerçeveleriyle ele alınır.`,
    (topic) => `Bu içerik, ${topic} gerçek senaryolar, dikkat edilmesi gereken noktalar ve somut adımlarla gösterir.`
  ]
};

function slugHash(value: string) {
  return [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function lowerFirst(value: string) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function buildFallbackBlogTopic(locale: Locale, article: LocalizedBlogArticle) {
  const cleanTitle = normalizeMetaText(article.title).replace(/\s*\|.*$/, "").replace(/[!?]$/g, "");
  return locale === "tr" ? lowerFirst(cleanTitle) : lowerFirst(cleanTitle);
}

function buildBlogTopic(locale: Locale, article: LocalizedBlogArticle) {
  return blogTopicCopy[locale][article.slug] ?? buildFallbackBlogTopic(locale, article);
}

export function buildBlogSeoLead(locale: Locale, article: LocalizedBlogArticle) {
  const templates = blogDescriptionTemplates[locale];
  const template = templates[slugHash(article.slug) % templates.length];
  return template(buildBlogTopic(locale, article));
}

export function buildBlogIntroParagraph(locale: Locale, article: LocalizedBlogArticle) {
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

function cleanTitleTopic(value: string) {
  return normalizeMetaText(value)
    .replace(/\s*\|\s*Deciply$/i, "")
    .replace(/\s*[–-]\s*Deciply$/i, "")
    .replace(/[!?]$/, "");
}

export function buildHomeTitle() {
  return "Deciply – Compare AI Tools Based on Real Use Cases";
}

export function buildBlogPageTitle(article: LocalizedBlogArticle) {
  const base = cleanTitleTopic(article.title);

  return /\b2026\b/.test(base)
    ? `${base} – Real Use Cases & Tools`
    : `${base} (2026 Guide) – Real Use Cases & Tools`;
}

export function buildToolPageTitle(tool: LocalizedTool) {
  return `${tool.name} Review (2026) – Use Cases, Pros & Cons`;
}
export function buildHomeMetaDescription(locale: Locale) {
  return locale === "tr"
    ? "AI araçlarını karşılaştırın, gerçek kullanım senaryolarını keşfedin ve Deciply ile doğru aracı daha hızlı seçin."
    : "Compare AI tools, explore real use cases, and choose the right tool faster with Deciply.";
}

export function buildToolsIndexMetaDescription(locale: Locale, toolCount: number) {
  return locale === "tr"
    ? `${toolCount} seçilmiş AI aracını kullanım alanı, fiyat modeli ve güçlü yönlerine göre inceleyin. Deciply ile size en uygun aracı daha hızlı bulun.`
    : `Browse ${toolCount} curated AI tools by use case, pricing, and strengths. Compare options and find the right fit faster with Deciply.`;
}

export function buildBlogIndexMetaDescription(locale: Locale, currentPage = 1) {
  const base =
    locale === "tr"
      ? "Deciply blogunda gerçek kullanım senaryoları, karşılaştırmalar ve net araç seçim rehberleri yer alır."
      : "Explore Deciply blog guides built around real use cases, honest comparisons, and clearer AI tool decisions.";

  if (currentPage <= 1) {
    return base;
  }

  return locale === "tr" ? `${base} Sayfa ${currentPage}.` : `${base} Page ${currentPage}.`;
}

export function buildToolMetaDescription(locale: Locale, tool: LocalizedTool) {
  const base = ensureSentence(tool.shortDescription);
  const tail =
    locale === "tr"
      ? `${tool.name} için güçlü yönleri, sınırlamaları ve en mantıklı kullanım alanlarını görün.`
      : `See ${tool.name}'s strengths, trade-offs, and the workflows where it makes the most sense.`;

  return clipMetaDescription(`${base} ${tail}`);
}

export function buildBlogMetaDescription(locale: Locale, article: LocalizedBlogArticle) {
  const lead = buildBlogSeoLead(locale, article);
  const excerptLead = getFirstSentence(article.excerpt);
  return clipMetaDescription(`${lead} ${excerptLead}`);
}
