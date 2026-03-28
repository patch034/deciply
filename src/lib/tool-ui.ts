import { toolCategoryOptions } from "@/data/tool-taxonomy";
import type { Locale } from "@/i18n/config";
import { formatPricing, getToolOutboundUrl } from "@/lib/catalog";
import type { LocalizedTool, PricingTier } from "@/types/catalog";
import type { ToolCard as HomeToolCard } from "@/types/home";

const iconMap: Record<string, string> = {
  chatgpt: "CG",
  claude: "CL",
  gemini: "GM",
  midjourney: "MJ",
  runway: "RW",
  "notion-ai": "NA",
  perplexity: "PX",
  jasper: "JP",
  "copy-ai": "CA",
  "canva-ai": "CV",
  "leonardo-ai": "LA",
  elevenlabs: "EL",
  writesonic: "WS",
  pictory: "PT"
};

const trustIndicators: Record<Locale, string[]> = {
  tr: ["Tarafsız değerlendirme", "Düzenli güncellenir", "Affiliate bağlantılar içerebilir"],
  en: ["Neutral evaluation", "Updated regularly", "May include affiliate links"]
};

const useCaseLabelMap: Record<Locale, Record<string, string>> = {
  tr: {
    writing: "İçerik yazımı",
    image: "Görsel üretim",
    video: "Video",
    productivity: "Otomasyon",
    content: "İçerik yazımı",
    creators: "Sosyal medya",
    business: "Otomasyon",
    research: "Araştırma",
    freelancers: "Freelance"
  },
  en: {
    writing: "Content writing",
    image: "Image generation",
    video: "Video",
    productivity: "Automation",
    content: "Content writing",
    creators: "Social media",
    business: "Automation",
    research: "Research",
    freelancers: "Freelance"
  }
};

export function getToolTrustIndicators(locale: Locale) {
  return trustIndicators[locale];
}

export function getToolCtaLabel(locale: Locale, pricing: PricingTier) {
  const labels: Record<Locale, Record<PricingTier, string>> = {
    tr: {
      FREE: "Ücretsiz Başla",
      FREEMIUM: "Ücretsiz Başla",
      PAID: "Detayları gör"
    },
    en: {
      FREE: "Start Free",
      FREEMIUM: "Start Free",
      PAID: "View details"
    }
  };

  return labels[locale][pricing];
}

export function getToolUseCaseTags(locale: Locale, tool: Pick<LocalizedTool, "toolCategorySlugs" | "useCaseSlugs" | "bestUseCase">) {
  const labels = useCaseLabelMap[locale];
  const ordered = [...tool.toolCategorySlugs, ...tool.useCaseSlugs]
    .map((slug) => labels[slug])
    .filter(Boolean);

  const unique = Array.from(new Set(ordered));

  if (!unique.length) {
    return [tool.bestUseCase];
  }

  return unique.slice(0, 3);
}

export function getWhoShouldAvoidList(locale: Locale, tool: Pick<LocalizedTool, "pricing" | "toolCategorySlugs" | "useCaseSlugs">) {
  const items: string[] = [];

  if (tool.pricing === "PAID") {
    items.push(locale === "tr" ? "Tamamen ücretsiz başlamak isteyenler" : "Users who need a fully free start");
  }

  if (tool.toolCategorySlugs.includes("image")) {
    items.push(locale === "tr" ? "Sadece yazı odaklı çalışanlar" : "Users focused only on text tasks");
  }

  if (tool.toolCategorySlugs.includes("video")) {
    items.push(locale === "tr" ? "Sadece hızlı metin üretimi isteyenler" : "Users only looking for quick text output");
  }

  if (tool.toolCategorySlugs.includes("writing")) {
    items.push(locale === "tr" ? "Önceliği görsel veya video olanlar" : "Users mainly focused on image or video work");
  }

  if (tool.toolCategorySlugs.includes("productivity")) {
    items.push(locale === "tr" ? "Daha yaratıcı görsel çıktı arayanlar" : "Users seeking more creative visual output");
  }

  if (tool.useCaseSlugs.includes("students")) {
    items.push(locale === "tr" ? "Sadece profesyonel ekip iş akışına odaklananlar" : "Users only focused on enterprise team workflows");
  }

  if (!items.length) {
    items.push(locale === "tr" ? "Çok niş iş akışı arayan ileri ekipler" : "Advanced teams looking for a very niche workflow");
  }

  return Array.from(new Set(items)).slice(0, 3);
}

export function getToolCardCategory(locale: Locale, tool: Pick<LocalizedTool, "toolCategorySlugs" | "bestUseCase">) {
  const categoryMap = new Map(toolCategoryOptions[locale].map((item) => [item.slug, item.label]));
  const primarySlug = tool.toolCategorySlugs[0] as (typeof toolCategoryOptions)[typeof locale][number]["slug"] | undefined;
  return (primarySlug ? categoryMap.get(primarySlug) : undefined) ?? tool.bestUseCase;
}

export function toHomeToolCard(locale: Locale, tool: LocalizedTool): HomeToolCard {
  const useCaseTags = getToolUseCaseTags(locale, tool);
  const notIdealFor = getWhoShouldAvoidList(locale, tool)[0];
  const categoryLabel = getToolCardCategory(locale, tool);

  return {
    icon: iconMap[tool.slug] ?? tool.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase(),
    name: tool.name,
    description: tool.shortDescription,
    category: categoryLabel,
    pricing: formatPricing(tool.pricing, locale),
    href: `/tools/${tool.slug}`,
    websiteUrl: tool.websiteUrl,
    affiliateUrl: getToolOutboundUrl(tool),
    rating: `${tool.rating.toFixed(1)}/5`,
    note: categoryLabel,
    bestFor: tool.bestUseCase,
    benefit: tool.moneyUseCases[0]?.description ?? tool.longDescription,
    comparisonOutcome: tool.moneyUseCases[0]?.title ?? tool.bestUseCase,
    editorNote:
      locale === "tr"
        ? `Güçlü olduğu alan: ${tool.bestUseCase}`
        : `Strong fit: ${tool.bestUseCase}`,
    useCaseTags,
    ctaLabel: getToolCtaLabel(locale, tool.pricing),
    notIdealFor
  };
}




