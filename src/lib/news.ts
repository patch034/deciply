import { unstable_cache } from "next/cache";

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

type FeedSource = {
  source: string;
  feedUrl: string;
  categoryLabel: string;
};

const feedSources: FeedSource[] = [
  { source: "OpenAI News", feedUrl: "https://news.google.com/rss/search?q=OpenAI+AI+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Models" },
  { source: "Anthropic News", feedUrl: "https://news.google.com/rss/search?q=Anthropic+AI+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Writing" },
  { source: "Gemini News", feedUrl: "https://news.google.com/rss/search?q=Google+Gemini+AI+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Search" },
  { source: "Copilot News", feedUrl: "https://news.google.com/rss/search?q=Microsoft+Copilot+AI+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Productivity" },
  { source: "Perplexity News", feedUrl: "https://news.google.com/rss/search?q=Perplexity+AI+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Research" },
  { source: "Midjourney News", feedUrl: "https://news.google.com/rss/search?q=Midjourney+AI+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Image" },
  { source: "AI Regulation", feedUrl: "https://news.google.com/rss/search?q=AI+regulation+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Policy" },
  { source: "AI Tools", feedUrl: "https://news.google.com/rss/search?q=AI+tools+product+launch+when:7d&hl=en-US&gl=US&ceid=US:en", categoryLabel: "Tools" },
  { source: "OpenAI", feedUrl: "https://openai.com/news/rss.xml", categoryLabel: "Models" },
  { source: "Anthropic", feedUrl: "https://www.anthropic.com/news/rss.xml", categoryLabel: "Writing" },
  { source: "Google AI", feedUrl: "https://blog.google/technology/ai/rss/", categoryLabel: "Search" },
  { source: "Microsoft", feedUrl: "https://blogs.microsoft.com/blog/category/artificial-intelligence/feed/", categoryLabel: "Productivity" },
  { source: "Hugging Face", feedUrl: "https://huggingface.co/blog/feed.xml", categoryLabel: "Open source" },
  { source: "NVIDIA", feedUrl: "https://www.nvidia.com/en-us/ai-data-science/blog/feed/", categoryLabel: "Research" }
];

function stripHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(value: string) {
  return stripHtml(value)
    .replace(/\bhttps?:\/\/\S+/gi, " ")
    .replace(/\bwww\.\S+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? cleanText(match[1] ?? "") : "";
}

function extractSourceMeta(block: string) {
  const match = block.match(/<source(?:\s+url="([^"]+)")?>([\s\S]*?)<\/source>/i);

  if (!match) {
    return null;
  }

  return {
    name: cleanText(match[2] ?? ""),
    url: (match[1] ?? "").trim()
  };
}

function isTurkish(locale: Locale) {
  return locale === "tr";
}

function inferTopic(title: string, source: string, categoryLabel: string) {
  const lower = `${title} ${source} ${categoryLabel}`.toLowerCase();

  if (lower.includes("openai") || lower.includes("chatgpt")) return "OpenAI / ChatGPT";
  if (lower.includes("anthropic") || lower.includes("claude")) return "Claude / Anthropic";
  if (lower.includes("gemini") || lower.includes("google")) return "Google Gemini";
  if (lower.includes("copilot") || lower.includes("microsoft")) return "Microsoft Copilot";
  if (lower.includes("perplexity")) return "Perplexity";
  if (lower.includes("midjourney")) return "Midjourney";
  if (lower.includes("firefly") || lower.includes("image")) return "görsel üretim";
  if (lower.includes("video") || lower.includes("runway") || lower.includes("capcut")) return "video üretimi";
  if (lower.includes("regulation") || lower.includes("safety") || lower.includes("policy")) return "regülasyon ve güvenlik";
  if (lower.includes("code") || lower.includes("developer") || lower.includes("cursor")) return "kodlama araçları";

  return categoryLabel;
}

function detectAction(title: string) {
  const lower = title.toLowerCase();

  if (/(launch|launches|rolls out|releases|introduces|introduce|unveils|announces|announced|ships|ships out)/i.test(lower)) {
    return "yeni bir duyuru yaptı";
  }

  if (/(adds|added|expands|expand|updates|updated|upgrade|upgrades|improves|improved)/i.test(lower)) {
    return "ürün güncellemesi yayımladı";
  }

  if (/(partners|partnering|partnership|acquires|acquired|buy|buys)/i.test(lower)) {
    return "iş birliği ya da satın alma gündemiyle öne çıktı";
  }

  if (/(regulation|regulatory|policy|safety|law|lawsuit)/i.test(lower)) {
    return "regülasyon ve güvenlik tarafında gündeme geldi";
  }

  return "önemli bir gelişme paylaştı";
}

function buildTurkishDisplayTitle(title: string, source: string, categoryLabel: string) {
  const topic = inferTopic(title, source, categoryLabel);
  const action = detectAction(title);
  return `${topic} cephesinde ${action}`;
}

function buildTurkishDisplaySummary(title: string, summary: string, source: string, categoryLabel: string) {
  const topic = inferTopic(title, source, categoryLabel);
  const cleanSummary = cleanText(summary).replace(/[“”"]/g, "");
  const sentence = cleanSummary.length > 120 ? `${cleanSummary.slice(0, 117).trim()}...` : cleanSummary;

  if (sentence) {
    return `Deciply, ${topic} ile ilgili bu güncellemeyi karar odaklı şekilde özetliyor: ${sentence}`;
  }

  return `Deciply, ${topic} ile ilgili bu gelişmeyi araç, karşılaştırma ve kategori yollarına bağlanan kısa bir editorial özet olarak sunuyor.`;
}

function buildWhyItMatters(locale: Locale, title: string, summary: string) {
  const lower = `${title} ${summary}`.toLowerCase();

  if (lower.includes("openai") || lower.includes("chatgpt")) {
    return locale === "tr"
      ? "OpenAI gelişmeleri, chatbot ve karar destek akışlarında en fazla trafik üreten konulardan biri olmaya devam ediyor."
      : "OpenAI headlines usually matter because they affect chatbot workflows, model choices, and high-intent comparison traffic.";
  }

  if (lower.includes("claude")) {
    return locale === "tr"
      ? "Claude güncellemeleri yazma, araştırma ve uzun metin kararlarında doğrudan kıyas akışı üretir."
      : "Claude updates often influence writing, research, and long-form workflow comparisons.";
  }

  if (lower.includes("gemini") || lower.includes("google")) {
    return locale === "tr"
      ? "Google AI gündemi arama, üretkenlik ve model karşılaştırmalarında güçlü kullanıcı niyeti oluşturur."
      : "Google AI stories often shape search, productivity, and model-comparison intent.";
  }

  if (lower.includes("copilot") || lower.includes("microsoft")) {
    return locale === "tr"
      ? "Copilot gelişmeleri ofis, kodlama ve iş akışları için doğrudan araç değerlendirmesine bağlanır."
      : "Microsoft Copilot news often connects directly to office, coding, and workflow tool decisions.";
  }

  if (lower.includes("midjourney") || lower.includes("firefly") || lower.includes("image")) {
    return locale === "tr"
      ? "Görsel üretim haberleri, yaratıcı araç seçimi ve karşılaştırma sayfaları için net iç link fırsatı yaratır."
      : "Image-generation stories usually create strong links into creative tools and comparison pages.";
  }

  return locale === "tr"
    ? "Bu haber, AI araç seçimi ve karar sayfaları için yeni bir sinyal katmanı oluşturuyor."
    : "This headline adds another useful signal layer for tool selection and comparison pages.";
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
    add(locale === "tr" ? "ChatGPT" : "ChatGPT", `/${locale}/tools/chatgpt`);
    add(locale === "tr" ? "ChatGPT vs Claude" : "ChatGPT vs Claude", `/${locale}/compare/chatgpt-vs-claude`);
    add(locale === "tr" ? "Chatbotlar" : "Chatbots", `/${locale}/categories/chatbots-virtual-companions`);
  }

  if (lower.includes("claude")) {
    add("Claude", `/${locale}/tools/claude`);
    add("Claude vs Gemini", `/${locale}/compare/claude-vs-gemini`);
    add(locale === "tr" ? "Yazma" : "Writing", `/${locale}/categories/writing-editing`);
  }

  if (lower.includes("image") || lower.includes("midjourney") || lower.includes("firefly")) {
    add("Midjourney", `/${locale}/tools/midjourney`);
    add("Adobe Firefly", `/${locale}/tools/adobe-firefly`);
    add("Midjourney vs Adobe Firefly", `/${locale}/compare/midjourney-vs-adobe-firefly`);
  }

  if (lower.includes("video") || lower.includes("runway") || lower.includes("capcut")) {
    add("Runway", `/${locale}/tools/runway`);
    add("CapCut", `/${locale}/tools/capcut`);
    add(locale === "tr" ? "Video ve Animasyon" : "Video & Animation", `/${locale}/categories/video-animation`);
  }

  if (lower.includes("productivity") || lower.includes("workflow") || lower.includes("copilot") || lower.includes("notion")) {
    add("Notion AI", `/${locale}/tools/notion-ai`);
    add("Microsoft Copilot", `/${locale}/tools/microsoft-copilot`);
    add("Notion AI vs Zapier", `/${locale}/compare/notion-ai-vs-zapier`);
  }

  if (lower.includes("code") || lower.includes("developer") || lower.includes("cursor")) {
    add("Cursor", `/${locale}/tools/cursor`);
    add("GitHub Copilot", `/${locale}/tools/github-copilot`);
    add("Sourcegraph Cody", `/${locale}/tools/sourcegraph-cody`);
  }

  if (!links.length) {
    add(locale === "tr" ? "Araçları keşfet" : "Explore tools", `/${locale}/tools`);
    add(locale === "tr" ? "Karşılaştırmalar" : "Comparisons", `/${locale}/compare`);
  }

  return links.slice(0, 3);
}

function buildFeedItem(locale: Locale, source: FeedSource, title: string, summary: string, publishedAt?: string, sourceUrl = "", sourceName?: string): AiNewsItem {
  const item: AiNewsItem = {
    slug: slugify(`${source.source}-${title}`),
    title,
    summary,
    source: sourceName || source.source,
    sourceUrl,
    publishedAt,
    categoryLabel: source.categoryLabel,
    relatedLinks: buildRelatedLinks(title, locale)
  };

  if (isTurkish(locale)) {
    item.displayTitle = buildTurkishDisplayTitle(title, item.source, source.categoryLabel);
    item.displaySummary = buildTurkishDisplaySummary(title, summary, item.source, source.categoryLabel);
    item.dek = item.displaySummary;
    item.whyItMatters = buildWhyItMatters(locale, title, summary);
  } else {
    item.displayTitle = title;
    item.displaySummary = summary;
    item.dek = summary;
    item.whyItMatters = buildWhyItMatters(locale, title, summary);
  }

  return item;
}

function parseRssFeed(locale: Locale, source: FeedSource, xml: string): AiNewsItem[] {
  const items = Array.from(xml.matchAll(/<item[\s\S]*?<\/item>/gi)).map((match) => match[0] ?? "");

  return items
    .map((block) => {
      const title = extractTag(block, "title");
      const link = extractTag(block, "link");
      const description = extractTag(block, "description");
      const pubDate = extractTag(block, "pubDate");
      const sourceMeta = extractSourceMeta(block);

      if (!title) {
        return null;
      }

      const summary = description || (locale === "tr" ? "Yeni AI gelişmelerini ve ürün sinyallerini takip et." : "Track the latest AI product and research signals.");
      const formattedDate = pubDate ? new Date(pubDate).toISOString() : undefined;
      const sourceUrl = sourceMeta?.url || link || source.feedUrl;
      const sourceName = sourceMeta?.name || source.source;

      return buildFeedItem(locale, source, title, summary.slice(0, 220), formattedDate, sourceUrl, sourceName);
    })
    .filter((item): item is AiNewsItem => Boolean(item));
}

function fallbackNews(locale: Locale): AiNewsItem[] {
  const titleMap: Record<Locale, Array<{ title: string; summary: string; source: string; categoryLabel: string }>> = {
    tr: [
      { title: "AI araçları hız, kalite ve kullanım kolaylığı ekseninde yeniden ayrışıyor", summary: "Editoryal bakışla öne çıkan ürün sinyalleri ve karar akışlarını tarayın.", source: "Deciply Editorial", categoryLabel: "Trend" },
      { title: "Yazı araçlarında uzun form ve kısa form kullanım senaryoları ayrışıyor", summary: "Uzun metin ve hızlı taslak ihtiyaçları için farklı araçları inceleyin.", source: "Deciply Editorial", categoryLabel: "Writing" },
      { title: "Görsel üretimde kalite ve düzenleme akışı birlikte önem kazanıyor", summary: "Konsept, düzenleme ve hızlı çıktı isteyen ekipler için kısa haber özeti.", source: "Deciply Editorial", categoryLabel: "Image" },
      { title: "Kodlama araçlarında hız kadar entegrasyon da kritik hale geliyor", summary: "Geliştirici iş akışlarına daha iyi uyan çözümleri karşılaştırın.", source: "Deciply Editorial", categoryLabel: "Coding" },
      { title: "Üretkenlik araçlarında toplantı, not ve otomasyon tek akışta birleşiyor", summary: "İşletme ve ekip verimliliği için öne çıkan kullanım çerçeveleri.", source: "Deciply Editorial", categoryLabel: "Productivity" },
      { title: "Video araçları kısa form içerik üretiminde daha da merkezi hale geliyor", summary: "Reels, shorts ve reklam üretimi için karar sinyallerini gözden geçirin.", source: "Deciply Editorial", categoryLabel: "Video" },
      { title: "Araştırma araçları kaynaklı cevap ve özetleme tarafında ayrışıyor", summary: "Karar öncesi veri toplama ve kaynak tarama akışlarını keşfedin.", source: "Deciply Editorial", categoryLabel: "Research" },
      { title: "Karşılaştırma sayfaları, seçim sürecinde daha fazla trafik çekiyor", summary: "Popüler karşılaştırmaları ve yan yana karar bloklarını açın.", source: "Deciply Editorial", categoryLabel: "Comparisons" }
    ],
    en: [
      { title: "AI tools are separating again on speed, quality, and ease of use", summary: "Browse editorial signals and decision paths for the tools that matter most.", source: "Deciply Editorial", categoryLabel: "Trend" },
      { title: "Writing tools are splitting into long-form and short-form workflows", summary: "Review tools for longer drafts and quick first-pass writing.", source: "Deciply Editorial", categoryLabel: "Writing" },
      { title: "Image generation now depends on both quality and editing flow", summary: "A compact look at tools built for concept work and faster visual delivery.", source: "Deciply Editorial", categoryLabel: "Image" },
      { title: "Coding tools compete on speed, context, and integrations", summary: "Compare the options that fit developer workflows more cleanly.", source: "Deciply Editorial", categoryLabel: "Coding" },
      { title: "Productivity tools are converging around notes, meetings, and automation", summary: "See the workflows that help teams move faster with less friction.", source: "Deciply Editorial", categoryLabel: "Productivity" },
      { title: "Video tools keep moving closer to short-form content production", summary: "Review the decision signals for reels, shorts, and ad creatives.", source: "Deciply Editorial", categoryLabel: "Video" },
      { title: "Research tools are converging around sourced answers and summaries", summary: "Review the strongest options for source-based discovery and review.", source: "Deciply Editorial", categoryLabel: "Research" },
      { title: "Comparison pages continue to drive high-intent traffic", summary: "Open the highest-intent comparisons and side-by-side decision blocks.", source: "Deciply Editorial", categoryLabel: "Comparisons" }
    ]
  };

  return titleMap[locale].map((item, index) =>
    buildFeedItem(locale, { source: item.source, feedUrl: "", categoryLabel: item.categoryLabel }, item.title, item.summary, undefined, `/news#fallback-${index + 1}`)
  );
}

async function collectAiNewsItems(locale: Locale): Promise<AiNewsItem[]> {
  const feedItems: AiNewsItem[] = [];
  const seenTitles = new Set<string>();

  const parsedFeeds = await Promise.all(
    feedSources.map(async (source) => {
      try {
        const response = await fetch(source.feedUrl, {
          cache: "no-store",
          headers: {
            accept: "application/rss+xml,application/xml,text/xml"
          }
        });

        if (!response.ok) {
          return [];
        }

        const xml = await response.text();
        return parseRssFeed(locale, source, xml);
      } catch {
        return [];
      }
    })
  );

  for (const parsed of parsedFeeds) {
    for (const item of parsed) {
      const signature = item.title.toLowerCase();

      if (seenTitles.has(signature)) {
        continue;
      }

      seenTitles.add(signature);
      feedItems.push(item);
    }
  }

  if (!feedItems.length) {
    return fallbackNews(locale);
  }

  return feedItems;
}

const getCachedAiNewsItems = unstable_cache(
  async (locale: Locale) => collectAiNewsItems(locale),
  ["deciply-ai-news"],
  { revalidate: 60 * 60 }
);

export async function getAiNewsItems(locale: Locale, limit = 8): Promise<AiNewsItem[]> {
  const items = await getCachedAiNewsItems(locale);
  return items.slice(0, limit);
}

export async function getAiNewsItemBySlug(locale: Locale, slug: string): Promise<AiNewsItem | null> {
  const items = await getCachedAiNewsItems(locale);
  return items.find((item) => item.slug === slug) ?? null;
}
