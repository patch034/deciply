import type { ToolEntry } from "@/types/catalog";

type ExpandedSeed = {
  categorySlug: string;
  subcategorySlug: string;
  subcategoryName: string;
  primaryCategorySlug: string;
  toolCategorySlugs: string[];
  useCaseSlugs: string[];
  nameHint: string;
};

const expandedPlans: ExpandedSeed[] = [
  { categorySlug: "chatbots-virtual-companions", subcategorySlug: "ai-assistants", subcategoryName: "AI assistant", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity", "writing"], useCaseSlugs: ["business", "students", "content"], nameHint: "Assistant" },
  { categorySlug: "chatbots-virtual-companions", subcategorySlug: "research-chatbots", subcategoryName: "research chatbot", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity", "writing"], useCaseSlugs: ["research", "students"], nameHint: "Research" },
  { categorySlug: "chatbots-virtual-companions", subcategorySlug: "business-chatbots", subcategoryName: "business chatbot", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business", "freelancers"], nameHint: "Bot" },
  { categorySlug: "writing-editing", subcategorySlug: "blog-writing", subcategoryName: "blog writing", primaryCategorySlug: "writing", toolCategorySlugs: ["writing"], useCaseSlugs: ["content", "creators"], nameHint: "Writer" },
  { categorySlug: "writing-editing", subcategorySlug: "copywriting", subcategoryName: "copywriting", primaryCategorySlug: "writing", toolCategorySlugs: ["writing"], useCaseSlugs: ["business", "freelancers"], nameHint: "Copy" },
  { categorySlug: "writing-editing", subcategorySlug: "summarization", subcategoryName: "summarization", primaryCategorySlug: "writing", toolCategorySlugs: ["writing", "productivity"], useCaseSlugs: ["research", "students"], nameHint: "Summarizer" },
  { categorySlug: "image-generation-editing", subcategorySlug: "image-generators", subcategoryName: "image generation", primaryCategorySlug: "image", toolCategorySlugs: ["image"], useCaseSlugs: ["creators", "content"], nameHint: "Image" },
  { categorySlug: "image-generation-editing", subcategorySlug: "design-assets", subcategoryName: "design asset", primaryCategorySlug: "image", toolCategorySlugs: ["image"], useCaseSlugs: ["business", "content"], nameHint: "Design" },
  { categorySlug: "image-generation-editing", subcategorySlug: "image-editing", subcategoryName: "image editing", primaryCategorySlug: "image", toolCategorySlugs: ["image", "productivity"], useCaseSlugs: ["creators", "freelancers"], nameHint: "Edit" },
  { categorySlug: "coding-development", subcategorySlug: "coding-assistants", subcategoryName: "coding assistant", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business", "freelancers"], nameHint: "Code" },
  { categorySlug: "coding-development", subcategorySlug: "ai-app-builders", subcategoryName: "AI app builder", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business", "freelancers"], nameHint: "Builder" },
  { categorySlug: "coding-development", subcategorySlug: "developer-automation", subcategoryName: "developer automation", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business", "research"], nameHint: "DevOps" },
  { categorySlug: "office-productivity", subcategorySlug: "meeting-notes", subcategoryName: "meeting notes", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business"], nameHint: "Meet" },
  { categorySlug: "office-productivity", subcategorySlug: "workflow-automation", subcategoryName: "workflow automation", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business", "freelancers"], nameHint: "Flow" },
  { categorySlug: "office-productivity", subcategorySlug: "notes-documents", subcategoryName: "notes and documents", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity", "writing"], useCaseSlugs: ["students", "research"], nameHint: "Docs" },
  { categorySlug: "video-animation", subcategorySlug: "video-generators", subcategoryName: "video generation", primaryCategorySlug: "video", toolCategorySlugs: ["video"], useCaseSlugs: ["content", "creators"], nameHint: "Video" },
  { categorySlug: "video-animation", subcategorySlug: "video-editing", subcategoryName: "video editing", primaryCategorySlug: "video", toolCategorySlugs: ["video"], useCaseSlugs: ["content", "freelancers"], nameHint: "Cut" },
  { categorySlug: "video-animation", subcategorySlug: "creator-video", subcategoryName: "creator video", primaryCategorySlug: "video", toolCategorySlugs: ["video"], useCaseSlugs: ["creators", "content"], nameHint: "Creator" },
  { categorySlug: "audio-generation-conversion", subcategorySlug: "text-to-speech", subcategoryName: "text to speech", primaryCategorySlug: "video", toolCategorySlugs: ["video", "productivity"], useCaseSlugs: ["content", "creators"], nameHint: "Voice" },
  { categorySlug: "audio-generation-conversion", subcategorySlug: "voice-cloning", subcategoryName: "voice cloning", primaryCategorySlug: "video", toolCategorySlugs: ["video"], useCaseSlugs: ["business", "content"], nameHint: "VoiceClone" },
  { categorySlug: "audio-generation-conversion", subcategorySlug: "podcast-audio", subcategoryName: "podcast audio", primaryCategorySlug: "video", toolCategorySlugs: ["video", "productivity"], useCaseSlugs: ["creators", "content"], nameHint: "Podcast" },
  { categorySlug: "marketing-advertising", subcategorySlug: "seo-tools", subcategoryName: "AI SEO", primaryCategorySlug: "writing", toolCategorySlugs: ["writing", "productivity"], useCaseSlugs: ["business", "content"], nameHint: "SEO" },
  { categorySlug: "marketing-advertising", subcategorySlug: "ad-creative", subcategoryName: "ad creative", primaryCategorySlug: "image", toolCategorySlugs: ["image", "writing"], useCaseSlugs: ["business", "creators"], nameHint: "Ads" },
  { categorySlug: "marketing-advertising", subcategorySlug: "sales-tools", subcategoryName: "AI sales", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity", "writing"], useCaseSlugs: ["business", "freelancers"], nameHint: "Sales" },
  { categorySlug: "research-data-analysis", subcategorySlug: "source-research", subcategoryName: "source-backed research", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity", "writing"], useCaseSlugs: ["research", "students"], nameHint: "Source" },
  { categorySlug: "research-data-analysis", subcategorySlug: "data-analysis", subcategoryName: "data analysis", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business", "research"], nameHint: "Data" },
  { categorySlug: "research-data-analysis", subcategorySlug: "academic-research", subcategoryName: "academic research", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity", "writing"], useCaseSlugs: ["students", "research"], nameHint: "Scholar" },
  { categorySlug: "education-translation", subcategorySlug: "popular-tools", subcategoryName: "education AI", primaryCategorySlug: "writing", toolCategorySlugs: ["writing", "productivity"], useCaseSlugs: ["students", "research"], nameHint: "Learn" },
  { categorySlug: "social-media", subcategorySlug: "popular-tools", subcategoryName: "social media AI", primaryCategorySlug: "writing", toolCategorySlugs: ["writing", "image", "video"], useCaseSlugs: ["content", "creators"], nameHint: "Social" },
  { categorySlug: "business-management", subcategorySlug: "business-workflows", subcategoryName: "business workflow", primaryCategorySlug: "productivity", toolCategorySlugs: ["productivity"], useCaseSlugs: ["business"], nameHint: "Ops" }
];

const prefixes = [
  "Astra",
  "Nexa",
  "Flow",
  "Prompt",
  "Nova",
  "Pilot",
  "Craft",
  "Signal",
  "Spark",
  "Atlas",
  "Lumen",
  "Vector",
  "Cortex",
  "Orbit",
  "Relay",
  "Forge",
  "Metric"
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildTool(plan: ExpandedSeed, planIndex: number, variantIndex: number): ToolEntry {
  const prefix = prefixes[(planIndex + variantIndex) % prefixes.length];
  const suffix = variantIndex % 3 === 0 ? "Studio" : variantIndex % 3 === 1 ? "Pilot" : "Hub";
  const name = `${prefix}${plan.nameHint} ${suffix} ${variantIndex + 1}`;
  const slug = slugify(name);
  const pricing = variantIndex % 5 === 0 ? "FREE" : variantIndex % 3 === 0 ? "PAID" : "FREEMIUM";
  const rating = Number((4.1 + ((planIndex + variantIndex) % 9) / 10).toFixed(1));
  const enDescription = `${name} helps teams handle ${plan.subcategoryName} workflows with cleaner AI-assisted output.`;
  const trDescription = `${name}, ${plan.subcategoryName} iş akışlarını daha düzenli AI destekli çıktılarla hızlandırır.`;

  return {
    slug,
    pricing,
    websiteUrl: `https://www.${slug}.ai`,
    affiliateUrl: `https://www.${slug}.ai`,
    primaryCategorySlug: plan.primaryCategorySlug,
    categorySlug: plan.categorySlug,
    subcategorySlug: plan.subcategorySlug,
    categorySlugs: ["ai-tools", plan.categorySlug],
    toolCategorySlugs: plan.toolCategorySlugs,
    useCaseSlugs: plan.useCaseSlugs,
    rating,
    featured: variantIndex < 2,
    locales: {
      tr: {
        name,
        shortDescription: trDescription,
        longDescription: `${trDescription} Küçük ekipler, freelancer'lar ve büyüyen içerik operasyonları için pratik bir keşif seçeneğidir.`,
        bestUseCase: plan.subcategoryName,
        whoShouldUse: ["Ekipler", "Freelancer'lar", "İçerik üreticileri"],
        moneyUseCases: [
          { title: "Müşteri teslimi", description: `${name} ile ${plan.subcategoryName} teslimlerini daha hızlı paketleyebilirsiniz.` },
          { title: "İç operasyon", description: "Tekrarlayan üretim adımlarını daha düzenli hale getirmek için kullanılabilir." }
        ],
        features: [`${plan.subcategoryName} desteği`, "Kompakt AI iş akışı", "Hızlı çıktı hazırlama", "Ekip kullanımı"],
        pros: ["Kısa öğrenme eğrisi", "Belirli bir iş akışına odaklanır", "Üretim hızını artırabilir"],
        cons: ["Her kategori için genel amaçlı çözüm değildir", "En iyi sonuç için doğru kullanım senaryosu gerekir"],
        seoTitle: `${name} incelemesi`,
        seoDescription: `${name} için kısa açıklama, kullanım alanları, güçlü yönler ve kategori eşleşmesini inceleyin.`
      },
      en: {
        name,
        shortDescription: enDescription,
        longDescription: `${enDescription} It is a practical discovery option for small teams, freelancers, and growing content operations.`,
        bestUseCase: plan.subcategoryName,
        whoShouldUse: ["Teams", "Freelancers", "Content creators"],
        moneyUseCases: [
          { title: "Client delivery", description: `Use ${name} to package ${plan.subcategoryName} work faster.` },
          { title: "Internal operations", description: "Use it to make repeatable production steps more consistent." }
        ],
        features: [`${plan.subcategoryName} support`, "Compact AI workflow", "Fast output preparation", "Team use"],
        pros: ["Short learning curve", "Focused workflow fit", "Can increase production speed"],
        cons: ["Not a general-purpose answer for every category", "Works best with the right use case"],
        seoTitle: `${name} review`,
        seoDescription: `Review ${name} with a short description, use cases, strengths, and category fit.`
      }
    }
  };
}

export const expandedTools: ToolEntry[] = expandedPlans
  .flatMap((plan, planIndex) => Array.from({ length: 17 }, (_, variantIndex) => buildTool(plan, planIndex, variantIndex)))
  .slice(0, 500);
