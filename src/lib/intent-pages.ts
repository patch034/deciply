import { useCaseOptions } from "@/data/tool-taxonomy";
import { tools } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { getLocalizedToolBySlug } from "@/lib/catalog";
import { areComparableTools, buildComparisonPath, getComparisonRawTool } from "@/lib/comparisons";
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
  locales: Record<Locale, UseCasePageLocale>;
};

const useCasePageDefinitions: UseCasePageDefinition[] = [
  {
    slug: "students",
    matchUseCaseSlugs: ["students"],
    locales: {
      tr: {
        eyebrow: "Ogrenci is akislari",
        title: "Ogrenciler icin en uygun AI araclari",
        intro: "Arastirma, not duzeni, sunum hazirligi ve ozetleme gibi ogrenci akislarinda hangi AI araclarinin daha mantikli oldugunu hizlica gorun.",
        description: "Bu sayfa ogrenci odakli kararlar icin dusuk surtunmeli, hizli sonuc veren ve gercek kullanim senaryosuna oturan araclari bir araya getirir.",
        whyTitle: "Bu use-case icin neden uygunlar?",
        whyDescription: "Her arac ayni ogrenci ihtiyacina cevap vermez. Asagida hangi arac hangi ihtiyaca daha iyi uyuyor gorebilirsiniz.",
        workflowTitle: "Onerilen ogrenci workflow'u",
        workflowDescription: "En iyi sonuc genelde tek araca degil, arastirma, taslak ve duzen akisini dogru siralamaya baglidir.",
        workflowSteps: ["Arastir", "Taslak cikar", "Duzenle ve teslim et"]
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
        title: "Freelancer'lar icin en uygun AI araclari",
        intro: "Musteri teslimi, daha hizli uretim ve daha guclu paket ciktisi isteyen freelancer'lar icin mantikli AI araclarini karsilastirin.",
        description: "Bu sayfa yazi, gorsel, arastirma ve tekrar eden teslim akislarinda daha hizli marj korumak isteyen freelancer'lara odaklanir.",
        whyTitle: "Hangi arac neden uyuyor?",
        whyDescription: "Bazilari arastirma ve metinde, bazilari gorsel veya teslim hizi tarafinda daha mantikli olabilir.",
        workflowTitle: "Onerilen freelance workflow'u",
        workflowDescription: "Freelance islerde hiz kazanmak icin once brief, sonra uretim, sonra paketleme akisini netlestirmek daha etkilidir.",
        workflowSteps: ["Brief'i netlestir", "Uretimi hizlandir", "Paketi parlat ve teslim et"]
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
        eyebrow: "Icerik uretimi",
        title: "Icerik ureticileri icin en uygun AI araclari",
        intro: "Blog, sosyal medya, gorsel ve yaratici teslim akislarinda hangi araclarin daha guclu oldugunu tek sayfada karsilastirin.",
        description: "Bu sayfa fikir bulma, yazi, kreatif uretim ve paketleme tarafinda birbiriyle iyi calisan AI araclarini listeler.",
        whyTitle: "Neden bu araclar one cikiyor?",
        whyDescription: "Icerik ekipleri ve solo ureticiler genelde tek araca degil, goreve gore degisen guclu kombinasyonlara ihtiyac duyar.",
        workflowTitle: "Onerilen content workflow'u",
        workflowDescription: "En verimli akista once fikir ve aci bulunur, sonra uretim yapilir, sonunda dagitim veya paketleme netlestirilir.",
        workflowSteps: ["Fikir ve aciyi bul", "Icerigi uret", "Dagitima veya teslimata hazirla"]
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
        eyebrow: "Is ekipleri",
        title: "Is ekipleri icin en uygun AI araclari",
        intro: "Arastirma, dokumantasyon, toplanti ozetleri ve ekip ici icerik akislari icin daha duzenli AI araclarini inceleyin.",
        description: "Bu sayfa ekip benimsenmesi, surekli kullanim ve mevcut is akisina dusuk surtunmeyle oturan araclara odaklanir.",
        whyTitle: "Ekipler icin neden mantiklilar?",
        whyDescription: "Is ortaminda model gucunden cok benimsenme, tutarlilik ve surekli kullanim belirleyici olur.",
        workflowTitle: "Onerilen ekip workflow'u",
        workflowDescription: "Daha duzenli bir AI akisi icin once bilgi toplanir, sonra dokumante edilir, en son paylasim veya uygulama adimina gecilir.",
        workflowSteps: ["Bilgiyi topla", "Ozetle ve dokumante et", "Takima dagit veya uygula"]
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
        eyebrow: "Arastirma akislari",
        title: "Arastirma odakli isler icin en uygun AI araclari",
        intro: "Kaynak bulma, aciklama, uzun ozetler ve daha duzenli bilgi akisi icin mantikli AI araclarini bir arada gorun.",
        description: "Bu sayfa arastirma hizini artiran ama karar kalitesini dusurmeyen araclara odaklanir.",
        whyTitle: "Neden bu araclar uygun?",
        whyDescription: "Arastirma islerinde hiz kadar kaynak bulma, aciklama kalitesi ve duzenli dusunce akisi da onemlidir.",
        workflowTitle: "Onerilen research workflow'u",
        workflowDescription: "Daha iyi arastirma akisi once kaynak bulmayi, sonra analiz etmeyi, en son ozetleyip paylasmayi gerektirir.",
        workflowSteps: ["Kaynaklari bul", "Analiz et", "Ozetle ve aktar"]
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
    ...page.locales[locale]
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
    title: page.locales[locale].title
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
