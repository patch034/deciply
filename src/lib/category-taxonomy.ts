import { categories as categoryEntries } from "@/data/categories";
import { getLocalizedCategories, getToolsByCategory } from "@/lib/catalog";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import type { SupportedLocale } from "@/i18n/config";
import type { LocalizedTool, PricingTier } from "@/types/catalog";

type LocaleText = {
  tr: string;
  en: string;
};

type SubcategoryMatch = {
  categories?: string[];
  toolCategories?: string[];
  useCases?: string[];
  pricing?: PricingTier[];
  featured?: boolean;
};

export type CategoryHubSubcategory = {
  slug: string;
  name: string;
  description: string;
  toolCount: number;
};

export type CategoryHubItem = {
  slug: string;
  name: string;
  description: string;
  supportText: string;
  toolCount: number;
  subcategories: CategoryHubSubcategory[];
};

type SubcategoryDefinition = {
  slug: string;
  label: LocaleText;
  description: LocaleText;
  match: SubcategoryMatch;
};

const CATEGORY_ORDER = [
  "chatbots-virtual-companions",
  "writing-editing",
  "image-generation-editing",
  "coding-development",
  "office-productivity",
  "video-animation",
  "audio-generation-conversion",
  "marketing-advertising",
  "research-data-analysis",
  "education-translation",
  "social-media",
  "business-management",
  "business-research",
  "law-finance",
  "health-wellness",
  "daily-life",
  "interior-architecture-design",
  "art-creative-design",
  "image-analysis",
  "ai-detection-and-undetection",
  "music-audio",
  "make-money-with-ai",
  "free-tools",
  "comparisons",
  "guides",
  "ai-tools",
  "other"
];

const DEFAULT_SUBCATEGORIES: SubcategoryDefinition[] = [
  {
    slug: "popular-tools",
    label: { tr: "Popüler araçlar", en: "Popular tools" },
    description: { tr: "Bu kategoride sık incelenen öne çıkan araçlar.", en: "Frequently reviewed tools in this category." },
    match: { featured: true }
  },
  {
    slug: "free-and-freemium",
    label: { tr: "Ücretsiz ve freemium", en: "Free and freemium" },
    description: { tr: "Düşük maliyetle başlayabileceğin seçenekler.", en: "Lower-friction options for getting started." },
    match: { pricing: ["FREE", "FREEMIUM"] }
  },
  {
    slug: "business-workflows",
    label: { tr: "İş akışları", en: "Business workflows" },
    description: { tr: "Ekip, operasyon ve üretkenlik odaklı kullanımlar.", en: "Team, operations, and productivity workflows." },
    match: { useCases: ["business", "freelancers", "research"] }
  }
];

const SUBCATEGORY_MAP: Record<string, SubcategoryDefinition[]> = {
  "chatbots-virtual-companions": [
    {
      slug: "ai-assistants",
      label: { tr: "AI asistanlar", en: "AI assistants" },
      description: { tr: "Yazı, araştırma ve günlük yardım için sohbet tabanlı araçlar.", en: "Chat-based tools for writing, research, and daily help." },
      match: { toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "research-chatbots",
      label: { tr: "Araştırma chatbotları", en: "Research chatbots" },
      description: { tr: "Kaynaklı yanıt ve hızlı bilgi toplama odaklı seçenekler.", en: "Source-backed answers and fast information gathering." },
      match: { useCases: ["research", "students"] }
    },
    {
      slug: "business-chatbots",
      label: { tr: "İş için chatbotlar", en: "Chatbots for business" },
      description: { tr: "Ekip üretkenliği ve müşteri işleri için asistanlar.", en: "Assistants for team productivity and client work." },
      match: { useCases: ["business", "freelancers"] }
    }
  ],
  "writing-editing": [
    {
      slug: "blog-writing",
      label: { tr: "Blog ve içerik yazımı", en: "Blog and content writing" },
      description: { tr: "Blog, makale, sosyal içerik ve uzun form metin üretimi.", en: "Blog, article, social, and long-form writing workflows." },
      match: { toolCategories: ["writing"], useCases: ["content", "creators"] }
    },
    {
      slug: "copywriting",
      label: { tr: "Reklam ve satış metni", en: "Copywriting" },
      description: { tr: "Pazarlama, ürün açıklaması ve satış odaklı metinler.", en: "Marketing, product description, and sales-focused copy." },
      match: { categories: ["marketing-advertising"], useCases: ["business", "freelancers"] }
    },
    {
      slug: "summarization",
      label: { tr: "Özetleme ve düzenleme", en: "Summarization and editing" },
      description: { tr: "Not, araştırma, metin temizleme ve hızlı düzenleme.", en: "Notes, research, cleanup, and fast editing." },
      match: { useCases: ["research", "students"], toolCategories: ["writing"] }
    }
  ],
  "image-generation-editing": [
    {
      slug: "image-generators",
      label: { tr: "Görsel üreticiler", en: "Image generators" },
      description: { tr: "Prompt ile konsept, kampanya ve yaratıcı görsel üretimi.", en: "Prompt-based concept, campaign, and creative image generation." },
      match: { toolCategories: ["image"], useCases: ["creators", "content"] }
    },
    {
      slug: "design-assets",
      label: { tr: "Tasarım varlıkları", en: "Design assets" },
      description: { tr: "Sosyal medya, ürün ve marka varlıkları için araçlar.", en: "Tools for social, product, and brand assets." },
      match: { categories: ["art-creative-design", "social-media"], toolCategories: ["image"] }
    },
    {
      slug: "image-editing",
      label: { tr: "Görsel düzenleme", en: "Image editing" },
      description: { tr: "Arka plan, varyasyon, düzenleme ve hızlı tasarım işleri.", en: "Background work, variations, cleanup, and fast design edits." },
      match: { toolCategories: ["image", "productivity"] }
    }
  ],
  "coding-development": [
    {
      slug: "coding-assistants",
      label: { tr: "Kod asistanları", en: "Coding assistants" },
      description: { tr: "Kod yazma, refactor ve hata çözümü için araçlar.", en: "Tools for coding, refactoring, and debugging." },
      match: { toolCategories: ["productivity"], useCases: ["business", "research"] }
    },
    {
      slug: "ai-app-builders",
      label: { tr: "AI uygulama geliştiriciler", en: "AI app builders" },
      description: { tr: "Uygulama, prototip ve ürün ekranı üretimi.", en: "App, prototype, and product screen generation." },
      match: { useCases: ["business", "freelancers"], toolCategories: ["productivity"] }
    },
    {
      slug: "developer-automation",
      label: { tr: "Geliştirici otomasyonu", en: "Developer automation" },
      description: { tr: "Tekrarlı geliştirme ve teknik iş akışlarını hızlandırma.", en: "Speed up repeated development and technical workflows." },
      match: { categories: ["office-productivity"], useCases: ["business"] }
    }
  ],
  "office-productivity": [
    {
      slug: "meeting-notes",
      label: { tr: "Toplantı notları", en: "Meeting notes" },
      description: { tr: "Toplantı kaydı, özet, görev ve takip maddeleri.", en: "Meeting recording, summaries, tasks, and follow-ups." },
      match: { toolCategories: ["productivity"], useCases: ["business"] }
    },
    {
      slug: "workflow-automation",
      label: { tr: "İş akışı otomasyonu", en: "Workflow automation" },
      description: { tr: "Rutin işleri azaltan ve süreçleri bağlayan araçlar.", en: "Tools that reduce repetitive work and connect processes." },
      match: { categories: ["business-management"], useCases: ["business", "freelancers"] }
    },
    {
      slug: "notes-documents",
      label: { tr: "Not ve doküman", en: "Notes and documents" },
      description: { tr: "Doküman, bilgi tabanı ve günlük üretkenlik araçları.", en: "Documents, knowledge bases, and daily productivity tools." },
      match: { toolCategories: ["productivity", "writing"], useCases: ["students", "research"] }
    }
  ],
  "video-animation": [
    {
      slug: "video-generators",
      label: { tr: "Video üreticiler", en: "Video generators" },
      description: { tr: "Metinden video, kısa form ve kampanya kreatifi üretimi.", en: "Text-to-video, short-form, and campaign creative generation." },
      match: { toolCategories: ["video"], useCases: ["content", "creators"] }
    },
    {
      slug: "video-editing",
      label: { tr: "Video düzenleme", en: "Video editing" },
      description: { tr: "Kurgu, altyazı, kesit ve hızlı içerik üretimi.", en: "Editing, captions, clips, and fast content production." },
      match: { toolCategories: ["video", "productivity"] }
    },
    {
      slug: "creator-video",
      label: { tr: "Creator video araçları", en: "Creator video tools" },
      description: { tr: "Sosyal medya ve yaratıcı içerik üreticileri için.", en: "For social media and creative content creators." },
      match: { useCases: ["creators", "content", "freelancers"], toolCategories: ["video"] }
    }
  ],
  "audio-generation-conversion": [
    {
      slug: "text-to-speech",
      label: { tr: "Metinden sese", en: "Text to speech" },
      description: { tr: "Anlatım, reklam sesi ve voiceover üretimi.", en: "Narration, ad voice, and voiceover generation." },
      match: { toolCategories: ["video"], useCases: ["content", "creators"] }
    },
    {
      slug: "voice-cloning",
      label: { tr: "Ses klonlama", en: "Voice cloning" },
      description: { tr: "Marka sesi, dublaj ve çok dilli anlatım akışları.", en: "Brand voice, dubbing, and multilingual narration workflows." },
      match: { categories: ["music-audio"], useCases: ["business", "content"] }
    },
    {
      slug: "podcast-audio",
      label: { tr: "Podcast ve ses prodüksiyonu", en: "Podcast and audio production" },
      description: { tr: "Podcast, eğitim ve yayın seslerini hızlandıran araçlar.", en: "Tools for podcast, education, and publishing audio." },
      match: { useCases: ["creators", "content"], toolCategories: ["video", "productivity"] }
    }
  ]
};

const EXTRA_SUBCATEGORY_MAP: Record<string, SubcategoryDefinition[]> = {
  "marketing-advertising": [
    {
      slug: "seo-tools",
      label: { tr: "AI SEO araçları", en: "AI SEO tools" },
      description: { tr: "Arama trafiği ve içerik optimizasyonu için araçlar.", en: "Tools for search traffic and content optimization." },
      match: { useCases: ["business", "content", "research"], toolCategories: ["writing"] }
    },
    {
      slug: "ad-creative",
      label: { tr: "Reklam kreatifi", en: "Ad creative" },
      description: { tr: "Reklam metni, görsel ve kampanya fikirleri.", en: "Ad copy, visuals, and campaign ideas." },
      match: { toolCategories: ["writing", "image", "video"], useCases: ["business", "creators"] }
    },
    {
      slug: "sales-tools",
      label: { tr: "AI satış araçları", en: "AI sales tools" },
      description: { tr: "Lead, teklif ve satış destek akışları.", en: "Lead, proposal, and sales-support workflows." },
      match: { useCases: ["business", "freelancers"], toolCategories: ["productivity", "writing"] }
    }
  ],
  "research-data-analysis": [
    {
      slug: "source-research",
      label: { tr: "Kaynaklı araştırma", en: "Source-backed research" },
      description: { tr: "Kaynak tarama, özet ve bilgi doğrulama.", en: "Source scanning, summaries, and verification." },
      match: { useCases: ["research", "students"], toolCategories: ["writing", "productivity"] }
    },
    {
      slug: "data-analysis",
      label: { tr: "Veri analizi", en: "Data analysis" },
      description: { tr: "Tablo, rapor ve karar destek analizleri.", en: "Tables, reports, and decision-support analysis." },
      match: { useCases: ["business", "research"], toolCategories: ["productivity"] }
    },
    {
      slug: "academic-research",
      label: { tr: "Akademik araştırma", en: "Academic research" },
      description: { tr: "Öğrenci ve araştırmacı akışları.", en: "Student and researcher workflows." },
      match: { useCases: ["students", "research"] }
    }
  ]
};

function label(locale: SupportedLocale, value: LocaleText) {
  return localizeTree(locale, value[getContentBaseLocale(locale)]);
}

function sortCategories<T extends { slug: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftIndex = CATEGORY_ORDER.indexOf(left.slug);
    const rightIndex = CATEGORY_ORDER.indexOf(right.slug);
    const safeLeft = leftIndex === -1 ? 999 : leftIndex;
    const safeRight = rightIndex === -1 ? 999 : rightIndex;

    if (safeLeft !== safeRight) {
      return safeLeft - safeRight;
    }

    return left.slug.localeCompare(right.slug);
  });
}

function getDefinitionsForCategory(slug: string) {
  return [...(SUBCATEGORY_MAP[slug] ?? []), ...(EXTRA_SUBCATEGORY_MAP[slug] ?? []), ...DEFAULT_SUBCATEGORIES].slice(0, 6);
}

function matchesSubcategory(tool: LocalizedTool, match: SubcategoryMatch) {
  if (match.featured && tool.featured) {
    return true;
  }

  if (match.pricing?.includes(tool.pricing)) {
    return true;
  }

  if (match.categories?.some((slug) => tool.categorySlugs.includes(slug))) {
    return true;
  }

  if (match.toolCategories?.some((slug) => tool.toolCategorySlugs.includes(slug) || tool.primaryCategorySlug === slug)) {
    return true;
  }

  if (match.useCases?.some((slug) => tool.useCaseSlugs.includes(slug))) {
    return true;
  }

  return false;
}

export function getCategoryHub(locale: SupportedLocale): CategoryHubItem[] {
  const localizedCategories = sortCategories(getLocalizedCategories(locale));

  return localizedCategories.map((category) => {
    const categoryTools = getToolsByCategory(locale, category.slug);

    return {
      ...category,
      toolCount: categoryTools.length,
      subcategories: getDefinitionsForCategory(category.slug).map((subcategory) => ({
        slug: subcategory.slug,
        name: label(locale, subcategory.label),
        description: label(locale, subcategory.description),
        toolCount: categoryTools.filter((tool) => matchesSubcategory(tool, subcategory.match)).length
      }))
    };
  });
}

export function getCategoryHubItem(locale: SupportedLocale, categorySlug: string) {
  return getCategoryHub(locale).find((category) => category.slug === categorySlug) ?? null;
}

export function getSubcategory(locale: SupportedLocale, categorySlug: string, subcategorySlug: string) {
  const category = getCategoryHubItem(locale, categorySlug);

  if (!category) {
    return null;
  }

  return category.subcategories.find((subcategory) => subcategory.slug === subcategorySlug) ?? null;
}

export function getToolsBySubcategory(locale: SupportedLocale, categorySlug: string, subcategorySlug: string) {
  const definition = getDefinitionsForCategory(categorySlug).find((subcategory) => subcategory.slug === subcategorySlug);

  if (!definition) {
    return [];
  }

  return getToolsByCategory(locale, categorySlug)
    .filter((tool) => matchesSubcategory(tool, definition.match))
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      if (left.rating !== right.rating) {
        return right.rating - left.rating;
      }

      return left.name.localeCompare(right.name);
    });
}

export function getCategoryRouteSlugs() {
  return sortCategories(categoryEntries).map((category) => category.slug);
}
