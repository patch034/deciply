import type { Locale } from "@/i18n/config";

export type AiNewsLink = {
  label: string;
  href: string;
};

export type AiNewsItem = {
  slug: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt?: string;
  categoryLabel: string;
  relatedLinks: AiNewsLink[];
  displayTitle?: string;
  displaySummary?: string;
  dek?: string;
  whyItMatters?: string;
};

type LocaleContent = {
  title: string;
  summary: string;
  dek: string;
  whyItMatters: string;
};

type BaseNewsItem = {
  slug: string;
  source: string;
  sourceUrl: string;
  categoryLabel: string;
  publishedAt: string;
  tr: LocaleContent;
  en: LocaleContent;
};

function isTurkish(locale: Locale) {
  return locale === "tr";
}

function buildWhyItMatters(locale: Locale, title: string, summary: string) {
  const lower = `${title} ${summary}`.toLowerCase();

  if (lower.includes("openai") || lower.includes("chatgpt")) {
    return locale === "tr"
      ? "OpenAI ve ChatGPT güncellemeleri, yüksek trafik çeken chatbot ve karar destek sayfaları için doğrudan ilgi üretir."
      : "OpenAI and ChatGPT updates often drive the highest-intent chatbot and decision-support traffic.";
  }

  if (lower.includes("claude")) {
    return locale === "tr"
      ? "Claude tarafındaki haberler yazı, araştırma ve uzun form kararlarında güçlü karşılaştırma sinyali üretir."
      : "Claude stories usually influence writing, research, and long-form comparison intent.";
  }

  if (lower.includes("gemini") || lower.includes("google")) {
    return locale === "tr"
      ? "Gemini ve Google AI güncellemeleri, arama ve üretkenlik akışlarında güçlü ürün seçimi sinyali yaratır."
      : "Gemini and Google AI headlines often shape search and productivity tool choice.";
  }

  if (lower.includes("copilot") || lower.includes("microsoft")) {
    return locale === "tr"
      ? "Copilot haberleri ofis, kodlama ve günlük iş akışı araçlarında doğrudan değerlendirme ihtiyacı doğurur."
      : "Microsoft Copilot stories often map directly to office, coding, and workflow decisions.";
  }

  if (lower.includes("perplexity")) {
    return locale === "tr"
      ? "Perplexity güncellemeleri kaynaklı arama ve araştırma akışlarında net iç link fırsatı üretir."
      : "Perplexity updates often create strong links into source-backed research workflows.";
  }

  if (lower.includes("runway") || lower.includes("video") || lower.includes("kling")) {
    return locale === "tr"
      ? "Video AI haberleri yaratıcı üretim, kısa form içerik ve karşılaştırma sayfalarında hızlı ilgi oluşturur."
      : "Video AI stories often create strong interest in creative production and comparison pages.";
  }

  if (lower.includes("voice") || lower.includes("elevenlabs") || lower.includes("playht")) {
    return locale === "tr"
      ? "Ses AI gelişmeleri voiceover, anlatım ve içerik üretim araçlarında doğrudan kullanım niyeti doğurur."
      : "Voice AI updates often create immediate use-case intent for narration and voiceover tools.";
  }

  return locale === "tr"
    ? "Bu haber, AI araç seçimi ve karşılaştırma akışları için yeni bir karar sinyali sağlar."
    : "This story adds another useful decision signal for AI tool choice and comparison pages.";
}

function buildRelatedLinks(title: string, locale: Locale): AiNewsLink[] {
  const lower = title.toLowerCase();
  const links: AiNewsLink[] = [];

  const add = (label: string, href: string) => {
    if (links.some((item) => item.href === href)) {
      return;
    }

    links.push({ label, href });
  };

  if (lower.includes("openai") || lower.includes("chatgpt")) {
    add("ChatGPT", `/${locale}/tools/chatgpt`);
    add("ChatGPT vs Claude", `/${locale}/compare/chatgpt-vs-claude`);
    add(locale === "tr" ? "Chatbotlar" : "Chatbots", `/${locale}/categories/chatbots-virtual-companions`);
  }

  if (lower.includes("claude")) {
    add("Claude", `/${locale}/tools/claude`);
    add("Claude vs Gemini", `/${locale}/compare/claude-vs-gemini`);
    add(locale === "tr" ? "Yazma" : "Writing", `/${locale}/categories/writing-editing`);
  }

  if (lower.includes("gemini") || lower.includes("google")) {
    add("Gemini", `/${locale}/tools/gemini`);
    add("ChatGPT vs Gemini", `/${locale}/compare/chatgpt-vs-gemini`);
    add(locale === "tr" ? "Araştırma" : "Research", `/${locale}/categories/research-analysis`);
  }

  if (lower.includes("copilot") || lower.includes("microsoft")) {
    add("Microsoft Copilot", `/${locale}/tools/microsoft-copilot`);
    add("Zapier", `/${locale}/tools/zapier`);
    add("Notion AI vs Zapier", `/${locale}/compare/notion-ai-vs-zapier`);
  }

  if (lower.includes("perplexity")) {
    add("Perplexity", `/${locale}/tools/perplexity`);
    add("Claude vs Perplexity", `/${locale}/compare/claude-vs-perplexity`);
    add("ChatGPT vs Perplexity", `/${locale}/compare/chatgpt-vs-perplexity`);
  }

  if (lower.includes("runway") || lower.includes("video") || lower.includes("kling")) {
    add("Runway", `/${locale}/tools/runway`);
    add("Pika", `/${locale}/tools/pika`);
    add("Runway vs Pika", `/${locale}/compare/runway-vs-pika`);
  }

  if (lower.includes("voice") || lower.includes("elevenlabs") || lower.includes("playht")) {
    add("ElevenLabs", `/${locale}/tools/elevenlabs`);
    add(locale === "tr" ? "Konuşma Araçları" : "Speech tools", `/${locale}/categories/speech-and-voice`);
    add("CapCut AI", `/${locale}/tools/capcut-ai`);
  }

  if (!links.length) {
    add(locale === "tr" ? "Araçları keşfet" : "Explore tools", `/${locale}/tools`);
    add(locale === "tr" ? "Karşılaştırmalar" : "Comparisons", `/${locale}/compare`);
  }

  return links.slice(0, 3);
}

const TODAY = "2026-04-13";

const BASE_AI_NEWS_ITEMS: BaseNewsItem[] = [
  {
    slug: "openai-chatgpt-gorev-akislari-2026-04-13",
    source: "OpenAI Newsroom",
    sourceUrl: "https://openai.com/news/",
    categoryLabel: "Models",
    publishedAt: TODAY,
    tr: {
      title: "OpenAI, ChatGPT tarafında görev odaklı akışları öne çıkarıyor",
      summary: "ChatGPT güncellemeleri, yazı ve araştırma adımlarını tek bir daha kısa karar ekranına bağlamayı hedefliyor.",
      dek: "OpenAI ekosistemindeki sinyaller, sohbetten çok karar odaklı üretim akışlarına yöneliyor.",
      whyItMatters:
        "ChatGPT güncellemeleri, chatbot ve karşılaştırma sayfalarında yüksek trafik ve net kullanıcı niyeti üretmeye devam ediyor."
    },
    en: {
      title: "OpenAI pushes ChatGPT toward more task-focused workflows",
      summary: "The latest ChatGPT signals point toward a shorter, more decision-oriented writing and research flow.",
      dek: "OpenAI is leaning from open-ended chat into clearer production workflows.",
      whyItMatters:
        "ChatGPT updates still drive strong traffic and clear intent across chatbot and comparison pages."
    }
  },
  {
    slug: "anthropic-claude-uzun-form-yazim-2026-04-13",
    source: "Anthropic News",
    sourceUrl: "https://www.anthropic.com/news",
    categoryLabel: "Writing",
    publishedAt: TODAY,
    tr: {
      title: "Claude tarafında uzun form yazım ve araştırma akışı güçleniyor",
      summary: "Anthropic cephesindeki son sinyaller, daha düzenli uzun metin ve kaynaklı çalışma beklentisini artırıyor.",
      dek: "Claude haberleri, yazma ve araştırma kararlarında yüksek niyetli bir trafik alanı yaratıyor.",
      whyItMatters:
        "Claude odaklı haberler, yazı ve araştırma kullanımında doğal olarak karşılaştırma ihtiyacını artırıyor."
    },
    en: {
      title: "Claude keeps strengthening long-form writing and research workflows",
      summary: "Latest Anthropic signals point to a stronger structured writing and source-backed research experience.",
      dek: "Claude stories continue to drive strong writing and research comparison intent.",
      whyItMatters:
        "Claude updates often increase the need for comparison pages around writing and research use cases."
    }
  },
  {
    slug: "google-gemini-arama-verimlilik-2026-04-13",
    source: "Google AI Blog",
    sourceUrl: "https://blog.google/technology/ai/",
    categoryLabel: "Search",
    publishedAt: TODAY,
    tr: {
      title: "Google Gemini, arama ve verimlilik arasında daha sıkı bir köprü kuruyor",
      summary: "Gemini tarafındaki gelişmeler, araştırma ve üretkenlik akışlarının tek deneyimde birleşmesini hızlandırıyor.",
      dek: "Google AI güncellemeleri, arama tabanlı karar verme için güçlü ürün sinyali üretir.",
      whyItMatters:
        "Gemini haberleri, arama ve üretkenlik araçları için güçlü bir karar katmanı oluşturuyor."
    },
    en: {
      title: "Google Gemini keeps narrowing the gap between search and productivity",
      summary: "Gemini signals continue to push research and productivity into a single, smoother experience.",
      dek: "Google AI updates keep producing strong intent around search-driven decisions.",
      whyItMatters:
        "Gemini stories often create strong decision signals for search and productivity tooling."
    }
  },
  {
    slug: "microsoft-copilot-ofis-otomasyon-2026-04-13",
    source: "Microsoft AI Blog",
    sourceUrl: "https://blogs.microsoft.com/ai/",
    categoryLabel: "Productivity",
    publishedAt: TODAY,
    tr: {
      title: "Microsoft Copilot, ofis ekipleri için otomasyon tarafını derinleştiriyor",
      summary: "Copilot cephesindeki yeni yönelimler, toplantı, doküman ve görev akışlarını daha tek yerde topluyor.",
      dek: "Copilot gelişmeleri, iş akışı ve ofis yazılımı kararlarında doğrudan etki yaratıyor.",
      whyItMatters:
        "Copilot güncellemeleri, iş verimliliği ve ofis araçları için yüksek niyetli değerlendirme üretir."
    },
    en: {
      title: "Microsoft Copilot deepens office-team automation workflows",
      summary: "New Copilot signals bring meetings, documents, and task flows into a tighter workspace.",
      dek: "Copilot stories directly affect workflow and office software decisions.",
      whyItMatters:
        "Copilot updates often create high-intent comparisons around productivity and office tools."
    }
  },
  {
    slug: "perplexity-kaynakli-arama-karar-ekrani-2026-04-13",
    source: "Perplexity Blog",
    sourceUrl: "https://www.perplexity.ai/blog",
    categoryLabel: "Research",
    publishedAt: TODAY,
    tr: {
      title: "Perplexity, kaynaklı aramayı daha hızlı karar ekranına taşıyor",
      summary: "Perplexity tarafındaki sinyaller, bilgi toplama ile karar verme arasındaki mesafeyi kısaltıyor.",
      dek: "Perplexity güncellemeleri, araştırma araçları için doğal bir karşılaştırma alanı yaratıyor.",
      whyItMatters:
        "Perplexity haberleri, kaynaklı araştırma ve hızlı değerlendirme sayfaları için doğrudan trafik sinyali üretir."
    },
    en: {
      title: "Perplexity moves source-backed search closer to a decision screen",
      summary: "Perplexity signals continue to shrink the distance between research and final decision-making.",
      dek: "Perplexity updates keep generating a natural comparison surface for research tools.",
      whyItMatters:
        "Perplexity stories often create direct traffic signals for source-backed research and review pages."
    }
  }
];

function buildLocalizedItem(locale: Locale, item: BaseNewsItem): AiNewsItem {
  const content = isTurkish(locale) ? item.tr : item.en;
  const summary = content.summary.trim();
  const title = content.title.trim();

  return {
    slug: item.slug,
    title,
    summary,
    source: item.source,
    sourceUrl: item.sourceUrl,
    publishedAt: item.publishedAt,
    categoryLabel: item.categoryLabel,
    relatedLinks: buildRelatedLinks(title, locale),
    displayTitle: title,
    displaySummary: summary,
    dek: content.dek,
    whyItMatters: content.whyItMatters || buildWhyItMatters(locale, title, summary)
  };
}

const AI_NEWS_BY_LOCALE: Record<Locale, AiNewsItem[]> = {
  tr: BASE_AI_NEWS_ITEMS.map((item) => buildLocalizedItem("tr", item)),
  en: BASE_AI_NEWS_ITEMS.map((item) => buildLocalizedItem("en", item))
};

export async function getAiNewsItems(locale: Locale, limit = 8): Promise<AiNewsItem[]> {
  return AI_NEWS_BY_LOCALE[locale].slice(0, limit);
}

export async function getAiNewsItemBySlug(locale: Locale, slug: string): Promise<AiNewsItem | null> {
  return AI_NEWS_BY_LOCALE[locale].find((item) => item.slug === slug) ?? null;
}
