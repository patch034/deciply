import { useCaseOptions } from "@/data/tool-taxonomy";
import { tools } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { getLocalizedToolBySlug } from "@/lib/catalog";
import { areComparableTools, buildComparisonPath, getComparisonRawTool } from "@/lib/comparisons";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import type { LocalizedTool } from "@/types/catalog";

type UseCasePageLocale = {
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  whyTitle: string;
  whyDescription: string;
  workflowTitle: string;
  workflowDescription: string;
  workflowSteps: [string, string, string];
};

type UseCasePageDefinition = {
  slug: string;
  matchUseCaseSlugs: string[];
  locales: Record<"tr" | "en", UseCasePageLocale>;
};

const useCasePageDefinitions: UseCasePageDefinition[] = [
  {
    slug: "students",
    matchUseCaseSlugs: ["students"],
    locales: {
      tr: {
        eyebrow: "Öğrenci iş akışları",
        title: "Öğrenciler için en uygun AI araçları",
        intro: "Araştırma, not düzeni, sunum hazırlığı ve özetleme gibi öğrenci akışlarında hangi AI araçlarının daha mantıklı olduğunu hızlıca görün.",
        description: "Bu sayfa öğrenci odaklı kararlar için düşük sürtünmeli, hızlı sonuç veren ve gerçek kullanım senaryosuna oturan araçları bir araya getirir.",
        whyTitle: "Bu use-case için neden uygunlar?",
        whyDescription: "Her araç aynı öğrenci ihtiyacına cevap vermez. Aşağıda hangi aracın hangi ihtiyaca daha iyi uyduğunu görebilirsiniz.",
        workflowTitle: "Önerilen öğrenci workflow'u",
        workflowDescription: "En iyi sonuç genelde tek araca değil, araştırma, taslak ve düzen akışını doğru sıralamaya bağlıdır.",
        workflowSteps: ["Araştır", "Taslak çıkar", "Düzenle ve teslim et"]
      },
      en: {
        eyebrow: "Student workflows",
        title: "Best AI tools for students",
        intro: "See which AI tools make more sense for student workflows like research, summarization, note organization, and presentation prep.",
        description: "This page focuses on low-friction tools that fit study-heavy work better than broad but messy feature lists.",
        whyTitle: "Why do these tools fit this use case?",
        whyDescription: "Each tool solves a different part of the student workflow, from research to organization to first drafts.",
        workflowTitle: "Suggested student workflow",
        workflowDescription: "The stronger setup usually comes from sequencing research, drafting, and organization instead of expecting one tool to do everything.",
        workflowSteps: ["Research", "Draft", "Organize and submit"]
      }
    }
  },
  {
    slug: "freelancers",
    matchUseCaseSlugs: ["freelancers"],
    locales: {
      tr: {
        eyebrow: "Freelance teslimler",
        title: "Freelancer'lar için en uygun AI araçları",
        intro: "Müşteri teslimi, daha hızlı üretim ve daha güçlü paket çıktısı isteyen freelancer'lar için mantıklı AI araçlarını karşılaştırın.",
        description: "Bu sayfa yazı, görsel, araştırma ve tekrar eden teslim akışlarında daha hızlı marj korumak isteyen freelancer'lara odaklanır.",
        whyTitle: "Hangi araç neden uyuyor?",
        whyDescription: "Bazıları araştırma ve metinde, bazıları görsel veya teslim hızı tarafında daha mantıklı olabilir.",
        workflowTitle: "Önerilen freelance workflow'u",
        workflowDescription: "Freelance işlerde hız kazanmak için önce brief, sonra üretim, sonra paketleme akışını netleştirmek daha etkilidir.",
        workflowSteps: ["Brief'i netleştir", "Üretimi hızlandır", "Paketi parlat ve teslim et"]
      },
      en: {
        eyebrow: "Freelance delivery",
        title: "Best AI tools for freelancers",
        intro: "Compare AI tools that can help freelancers produce faster, deliver cleaner work, and protect margin across repeatable services.",
        description: "This page is built around client delivery, packaging, and speed-to-output instead of generic feature claims.",
        whyTitle: "Why does each tool fit?",
        whyDescription: "Some tools make more sense for research and writing, while others fit visual delivery or client packaging better.",
        workflowTitle: "Suggested freelance workflow",
        workflowDescription: "Freelance output usually improves when you separate briefing, production, and polishing into clearer stages.",
        workflowSteps: ["Clarify the brief", "Speed up production", "Polish and deliver"]
      }
    }
  },
  {
    slug: "content-creators",
    matchUseCaseSlugs: ["content", "creators"],
    locales: {
      tr: {
        eyebrow: "İçerik üretimi",
        title: "İçerik üreticileri için en uygun AI araçları",
        intro: "Blog, sosyal medya, görsel ve yaratıcı teslim akışlarında hangi araçların daha güçlü olduğunu tek sayfada karşılaştırın.",
        description: "Bu sayfa fikir bulma, yazı, kreatif üretim ve paketleme tarafında birbiriyle iyi çalışan AI araçlarını listeler.",
        whyTitle: "Neden bu araçlar öne çıkıyor?",
        whyDescription: "İçerik ekipleri ve solo üreticiler genelde tek araca değil, göreve göre değişen güçlü kombinasyonlara ihtiyaç duyar.",
        workflowTitle: "Önerilen content workflow'u",
        workflowDescription: "En verimli akışta önce fikir ve açı bulunur, sonra üretim yapılır, sonunda dağıtım veya paketleme netleştirilir.",
        workflowSteps: ["Fikir ve açıyı bul", "İçeriği üret", "Dağıtıma veya teslimata hazırla"]
      },
      en: {
        eyebrow: "Content workflows",
        title: "Best AI tools for content creators",
        intro: "Review the AI tools that make the most sense for blogging, social content, visuals, and creative production workflows.",
        description: "This page highlights the tools that fit ideation, drafting, creative delivery, and packaging better for content-heavy work.",
        whyTitle: "Why do these tools stand out?",
        whyDescription: "Creators usually need a stack of tools with complementary strengths rather than one tool that tries to do everything.",
        workflowTitle: "Suggested content workflow",
        workflowDescription: "The strongest flow usually starts with ideation, moves into production, and ends with packaging for distribution or clients.",
        workflowSteps: ["Find the angle", "Produce the asset", "Package for publishing or delivery"]
      }
    }
  },
  {
    slug: "business-teams",
    matchUseCaseSlugs: ["business"],
    locales: {
      tr: {
        eyebrow: "İş ekipleri",
        title: "İş ekipleri için en uygun AI araçları",
        intro: "Araştırma, dokümantasyon, toplantı özetleri ve ekip içi içerik akışları için daha düzenli AI araçlarını inceleyin.",
        description: "Bu sayfa ekip benimsenmesi, sürekli kullanım ve mevcut iş akışına düşük sürtünmeyle oturan araçlara odaklanır.",
        whyTitle: "Ekipler için neden mantıklılar?",
        whyDescription: "İş ortamında model gücünden çok benimsenme, tutarlılık ve sürekli kullanım belirleyici olur.",
        workflowTitle: "Önerilen ekip workflow'u",
        workflowDescription: "Daha düzenli bir AI akışı için önce bilgi toplanır, sonra dokümante edilir, en son paylaşım veya uygulama adımına geçilir.",
        workflowSteps: ["Bilgiyi topla", "Özetle ve dokümante et", "Takıma dağıt veya uygula"]
      },
      en: {
        eyebrow: "Business workflows",
        title: "Best AI tools for business teams",
        intro: "Compare AI tools that fit research, documentation, summarization, and repeatable team workflows more cleanly.",
        description: "This page focuses on team adoption, process fit, and repeatable output rather than headline model benchmarks.",
        whyTitle: "Why do these tools fit teams?",
        whyDescription: "For business teams, steady adoption and easier workflow fit usually matter more than raw model hype.",
        workflowTitle: "Suggested team workflow",
        workflowDescription: "A cleaner AI workflow often starts with gathering information, then documenting it, then sharing or applying it across the team.",
        workflowSteps: ["Gather context", "Summarize and document", "Share or execute"]
      }
    }
  },
  {
    slug: "researchers",
    matchUseCaseSlugs: ["research"],
    locales: {
      tr: {
        eyebrow: "Araştırma akışları",
        title: "Araştırma odaklı işler için en uygun AI araçları",
        intro: "Kaynak bulma, açıklama, uzun özetler ve daha düzenli bilgi akışı için mantıklı AI araçlarını bir arada görün.",
        description: "Bu sayfa araştırma hızını artıran ama karar kalitesini düşürmeyen araçlara odaklanır.",
        whyTitle: "Neden bu araçlar uygun?",
        whyDescription: "Araştırma işlerinde hız kadar kaynak bulma, açıklama kalitesi ve düzenli düşünce akışı da önemlidir.",
        workflowTitle: "Önerilen research workflow'u",
        workflowDescription: "Daha iyi araştırma akışı önce kaynak bulmayı, sonra analiz etmeyi, en son özetleyip paylaşmayı gerektirir.",
        workflowSteps: ["Kaynakları bul", "Analiz et", "Özetle ve aktar"]
      },
      en: {
        eyebrow: "Research workflows",
        title: "Best AI tools for research-heavy work",
        intro: "See which AI tools fit source discovery, analysis, long-form explanation, and structured synthesis better.",
        description: "This page is built for users who care about research speed without sacrificing clarity or decision quality.",
        whyTitle: "Why do these tools fit research?",
        whyDescription: "Research-heavy work needs better source discovery, clearer explanation, and stronger organization than casual prompting.",
        workflowTitle: "Suggested research workflow",
        workflowDescription: "Stronger research usually means separating source discovery, analysis, and synthesis into cleaner steps.",
        workflowSteps: ["Find sources", "Analyze the material", "Synthesize and share"]
      }
    }
  }
];

function sharedCount(left: string[], right: string[]) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item)).length;
}

function getAlternativeScore(primaryTool: (typeof tools)[number], candidate: (typeof tools)[number]) {
  const sharedToolCategories = sharedCount(primaryTool.toolCategorySlugs, candidate.toolCategorySlugs);
  const sharedUseCases = sharedCount(primaryTool.useCaseSlugs, candidate.useCaseSlugs);
  const samePrimaryCategory = primaryTool.primaryCategorySlug === candidate.primaryCategorySlug ? 1 : 0;

  return sharedToolCategories * 10 + sharedUseCases * 4 + samePrimaryCategory * 5 + (candidate.featured ? 2 : 0) + candidate.rating;
}

function sortByPriority(left: (typeof tools)[number], right: (typeof tools)[number]) {
  const leftFeatured = left.featured ? 1 : 0;
  const rightFeatured = right.featured ? 1 : 0;

  if (leftFeatured !== rightFeatured) {
    return rightFeatured - leftFeatured;
  }

  if (left.rating !== right.rating) {
    return right.rating - left.rating;
  }

  return left.slug.localeCompare(right.slug);
}

export function buildAlternativesPath(locale: Locale, toolSlug: string) {
  return `/${locale}/alternatives/${toolSlug}`;
}

export function buildUseCasePath(locale: Locale, slug: string) {
  return `/${locale}/use-cases/${slug}`;
}

export function getStaticAlternativeSlugs() {
  return tools.map((tool) => tool.slug);
}

export function getAlternativeTargetSlugs(toolSlug: string, limit = 4) {
  const primaryTool = tools.find((tool) => tool.slug === toolSlug);

  if (!primaryTool) {
    return [];
  }

  const ranked = tools
    .filter((tool) => tool.slug !== toolSlug)
    .sort((left, right) => {
      const scoreDifference = getAlternativeScore(primaryTool, right) - getAlternativeScore(primaryTool, left);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return sortByPriority(left, right);
    });

  return ranked.slice(0, limit).map((tool) => tool.slug);
}

export function getAlternativeTargetTools(locale: Locale, toolSlug: string, limit = 4) {
  return getAlternativeTargetSlugs(toolSlug, limit)
    .map((slug) => getLocalizedToolBySlug(locale, slug))
    .filter((tool): tool is LocalizedTool => tool !== null);
}

export function getUseCasePage(locale: Locale, slug: string) {
  const page = useCasePageDefinitions.find((item) => item.slug === slug);

  if (!page) {
    return null;
  }

  return {
    slug: page.slug,
    matchUseCaseSlugs: page.matchUseCaseSlugs,
    ...localizeTree(locale, page.locales[getContentBaseLocale(locale)])
  };
}

export function getStaticUseCaseSlugs() {
  return useCasePageDefinitions.map((page) => page.slug);
}

export function getUseCaseTools(locale: Locale, slug: string, limit = 6) {
  const page = useCasePageDefinitions.find((item) => item.slug === slug);

  if (!page) {
    return [];
  }

  return tools
    .filter((tool) => tool.useCaseSlugs.some((useCaseSlug) => page.matchUseCaseSlugs.includes(useCaseSlug)))
    .sort((left, right) => {
      const leftMatches = sharedCount(left.useCaseSlugs, page.matchUseCaseSlugs);
      const rightMatches = sharedCount(right.useCaseSlugs, page.matchUseCaseSlugs);

      if (leftMatches !== rightMatches) {
        return rightMatches - leftMatches;
      }

      return sortByPriority(left, right);
    })
    .slice(0, limit)
    .map((tool) => getLocalizedToolBySlug(locale, tool.slug))
    .filter((tool): tool is LocalizedTool => tool !== null);
}

export function getUseCasePagesForTool(locale: Locale, useCaseSlugs: string[], limit = 2) {
  const matched = useCasePageDefinitions.filter((page) =>
    page.matchUseCaseSlugs.some((slug) => useCaseSlugs.includes(slug))
  );

  return matched.slice(0, limit).map((page) => ({
    slug: page.slug,
    title: localizeTree(locale, page.locales[getContentBaseLocale(locale)]).title
  }));
}

export function getUseCaseBlogGuides(locale: Locale, slug: string, limit = 3) {
  const selectedTools = getUseCaseTools(locale, slug, 5);
  const selectedToolSlugs = new Set(selectedTools.map((tool) => tool.slug));
  const picked = new Set<string>();

  const guides = getLocalizedBlogArticles(locale)
    .map((article) => ({
      article,
      score: article.relatedToolSlugs.filter((toolSlug) => selectedToolSlugs.has(toolSlug)).length
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .filter((item) => {
      if (picked.has(item.article.slug)) {
        return false;
      }

      picked.add(item.article.slug);
      return true;
    })
    .slice(0, limit)
    .map((item) => item.article);

  if (guides.length >= limit) {
    return guides;
  }

  const fallback = getLocalizedBlogArticles(locale).filter((article) => !picked.has(article.slug));
  return [...guides, ...fallback].slice(0, limit);
}

export function getUseCaseLabel(locale: Locale, slug: string) {
  return useCaseOptions[locale].find((item) => item.slug === slug)?.label ?? slug;
}

export function getSafeComparisonPath(locale: Locale, leftSlug: string, rightSlug: string) {
  const leftTool = getComparisonRawTool(leftSlug);
  const rightTool = getComparisonRawTool(rightSlug);

  if (!leftTool || !rightTool || !areComparableTools(leftTool, rightTool)) {
    return undefined;
  }

  return buildComparisonPath(locale, leftSlug, rightSlug);
}
