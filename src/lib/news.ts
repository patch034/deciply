import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
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
      title: "OpenAI, ChatGPT'yi daha görev odaklı ve daha hızlı bir karar ekranına dönüştürüyor",
      summary:
        "ChatGPT tarafındaki güncellemeler, ilk taslak yazmaktan araştırma özetlemeye kadar olan adımları tek bir daha kısa üretim akışında birleştirmeyi hedefliyor. Bu da sohbet deneyiminden çok, işi hızlı tamamlamaya odaklı bir kullanım biçimi yaratıyor.",
      dek: "OpenAI ekosistemindeki son sinyaller, genel sohbetten çok üretim, karar ve teslim odaklı bir ChatGPT deneyimine işaret ediyor.",
      whyItMatters:
        "Bu değişim, ChatGPT sayfalarında hem yüksek trafik hem de yüksek niyetli karşılaştırma akışı üretir. Kullanıcılar artık yalnızca sohbet aracı değil, iş bitirme aracı arıyor."
    },
    en: {
      title: "OpenAI pushes ChatGPT toward a more task-focused decision flow",
      summary:
        "The latest ChatGPT signals point toward a shorter, more production-oriented flow that blends drafting, research, and final decision support in one place.",
      dek: "OpenAI appears to be shifting ChatGPT from open-ended chat into more outcome-driven workflows.",
      whyItMatters:
        "This shift keeps ChatGPT at the center of high-intent traffic across chatbot and comparison pages."
    }
  },
  {
    slug: "anthropic-claude-uzun-form-yazim-2026-04-13",
    source: "Anthropic News",
    sourceUrl: "https://www.anthropic.com/news",
    categoryLabel: "Writing",
    publishedAt: TODAY,
    tr: {
      title: "Claude tarafında uzun form yazı ve kaynaklı araştırma daha da güçleniyor",
      summary:
        "Anthropic cephesindeki son sinyaller, daha düzenli uzun metin, kaynaklı özet ve okunabilir yazı akışını öne çıkarıyor. Özellikle rapor, içerik ve araştırma işlerinde Claude'un konumunu güçlendiren bir çizgi görülüyor.",
      dek: "Claude haberleri, yazma kararlarında yalnızca merak değil, doğrudan kullanım niyeti de oluşturuyor.",
      whyItMatters:
        "Bu tip haberler Claude için yazı ve araştırma tarafında doğal karşılaştırma ihtiyacını artırır. Kullanıcı, uzun metin için hangi aracın daha güvenli olduğunu sorgulamaya başlar."
    },
    en: {
      title: "Claude keeps strengthening long-form writing and source-backed research",
      summary:
        "Latest Anthropic signals point to a stronger structured writing experience with a clearer source-backed research layer. That makes Claude even more relevant in editorial and analysis workflows.",
      dek: "Claude stories continue to create clear writing and research comparison intent.",
      whyItMatters:
        "Claude updates often raise the need for deeper comparison pages around writing and research use cases."
    }
  },
  {
    slug: "google-gemini-arama-verimlilik-2026-04-13",
    source: "Google AI Blog",
    sourceUrl: "https://blog.google/technology/ai/",
    categoryLabel: "Search",
    publishedAt: TODAY,
    tr: {
      title: "Google Gemini, arama ve verimlilik arasındaki sınırı daha da bulanıklaştırıyor",
      summary:
        "Gemini tarafındaki gelişmeler, araştırma, özetleme ve üretkenlik adımlarını tek deneyimde birleştirmeyi hızlandırıyor. Bu da Google ekosistemini sadece arama değil, çalışma alanı olarak da daha güçlü hale getiriyor.",
      dek: "Google AI güncellemeleri, arama tabanlı karar verme ve günlük üretkenlik için güçlü ürün sinyali üretir.",
      whyItMatters:
        "Gemini haberleri, hem arama hem de verimlilik araçları için yüksek niyetli karar katmanı oluşturuyor. Bu nedenle kategori ve karşılaştırma sayfalarında güçlü bir trafik sinyali yaratır."
    },
    en: {
      title: "Google Gemini keeps blending search and productivity into one flow",
      summary:
        "Gemini signals continue to merge research, summarization, and productivity into a single smoother workflow. That keeps Google AI relevant not only for search, but also for daily work.",
      dek: "Google AI updates continue to produce strong intent around search-driven decisions.",
      whyItMatters:
        "Gemini stories usually create strong decision signals for both search and productivity tooling."
    }
  },
  {
    slug: "microsoft-copilot-ofis-otomasyon-2026-04-13",
    source: "Microsoft AI Blog",
    sourceUrl: "https://blogs.microsoft.com/ai/",
    categoryLabel: "Productivity",
    publishedAt: TODAY,
    tr: {
      title: "Microsoft Copilot, ofis ekipleri için otomasyon katmanını derinleştiriyor",
      summary:
        "Copilot tarafındaki yeni yönelimler, toplantı notu, doküman özetleme ve görev akışlarını daha tek bir çalışma alanında topluyor. Bu da kurumsal üretkenlik araçlarını daha sıkı bir ekosistem kararı haline getiriyor.",
      dek: "Copilot gelişmeleri, iş akışı ve ofis yazılımı seçimi üzerinde doğrudan etki yaratıyor.",
      whyItMatters:
        "Copilot güncellemeleri, verimlilik araçları için yüksek niyetli bir değerlendirme zemini oluşturur. Ofis ekipleri için 'hangi araç daha kolay benimsenir?' sorusunu gündeme taşır."
    },
    en: {
      title: "Microsoft Copilot deepens automation for office teams",
      summary:
        "New Copilot signals keep meetings, documents, and task flows inside a tighter working surface. That pushes office productivity closer to a single-system decision.",
      dek: "Copilot stories directly affect workflow and office software choice.",
      whyItMatters:
        "Copilot updates often trigger high-intent comparisons around productivity and office software."
    }
  },
  {
    slug: "perplexity-kaynakli-arama-karar-ekrani-2026-04-13",
    source: "Perplexity Blog",
    sourceUrl: "https://www.perplexity.ai/blog",
    categoryLabel: "Research",
    publishedAt: TODAY,
    tr: {
      title: "Perplexity, kaynaklı aramayı daha hızlı ve daha karar odaklı bir yüzeye taşıyor",
      summary:
        "Perplexity tarafındaki sinyaller, bilgi toplama ile karar verme arasındaki mesafeyi kısaltıyor. Kullanıcı artık yalnızca cevap değil, hızlı doğrulanmış özet ve kullanıma dönük bağlam bekliyor.",
      dek: "Perplexity güncellemeleri, araştırma araçları için doğal ve yüksek niyetli bir karşılaştırma alanı yaratıyor.",
      whyItMatters:
        "Perplexity haberleri, kaynaklı araştırma ve hızlı değerlendirme sayfalarına doğrudan trafik sinyali üretir. Bu da onu en değerli haber başlıklarından biri yapar."
    },
    en: {
      title: "Perplexity moves source-backed search closer to a decision-ready surface",
      summary:
        "Perplexity signals continue to narrow the gap between research and final decision-making. Users are increasingly looking for verified answers and action-ready context, not just raw search output.",
      dek: "Perplexity updates keep generating a natural, high-intent comparison surface for research tools.",
      whyItMatters:
        "Perplexity stories often produce direct traffic signals for source-backed research and review pages."
    }
  }
];

function buildLocalizedItem(locale: Locale, item: BaseNewsItem): AiNewsItem {
  const content = localizeTree(locale, item[getContentBaseLocale(locale)]);
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

const AI_NEWS_BY_LOCALE = Object.fromEntries(
  (["tr", "en", "ar", "ru", "zh", "ja", "ko", "el", "da", "fa"] as const).map((itemLocale) => [
    itemLocale,
    BASE_AI_NEWS_ITEMS.map((item) => buildLocalizedItem(itemLocale, item))
  ])
) as Record<Locale, AiNewsItem[]>;

export async function getAiNewsItems(locale: Locale, limit = 8): Promise<AiNewsItem[]> {
  return AI_NEWS_BY_LOCALE[locale].slice(0, limit);
}

export async function getAiNewsItemBySlug(locale: Locale, slug: string): Promise<AiNewsItem | null> {
  return AI_NEWS_BY_LOCALE[locale].find((item) => item.slug === slug) ?? null;
}
