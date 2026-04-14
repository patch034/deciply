import { tools } from "@/data/tools";
import { useCaseOptions } from "@/data/tool-taxonomy";
import { buildComparisonPairSlug } from "@/lib/comparisons";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import type { Locale } from "@/i18n/config";
import type { BlogEntry, BlogLocalizedContent, BlogSection, BlogSubSection } from "@/types/blog";

const section = (
  title: string,
  paragraphs: string[],
  options?: {
    bullets?: string[];
    subSections?: BlogSubSection[];
    comparison?: { title: string; items: { label: string; value: string }[] };
  }
): BlogSection => ({
  title,
  paragraphs,
  bullets: options?.bullets,
  subSections: options?.subSections,
  comparison: options?.comparison
});

const sub = (
  title: string,
  paragraphs: string[],
  bullets?: string[],
  ctaLabel?: string,
  ctaHref?: string
): BlogSubSection => ({ title, paragraphs, bullets, ctaLabel, ctaHref });

const categoryLabels = {
  tr: {
    "ai-tools": "AI Araçları",
    comparisons: "Karşılaştırmalar",
    guides: "Rehberler"
  },
  en: {
    "ai-tools": "AI Tools",
    comparisons: "Comparisons",
    guides: "Guides"
  }
} as const;

const categoryLabelsByLocale = Object.fromEntries(
  (["tr", "en", "ar", "ru", "zh", "ja", "ko", "el", "da", "fa"] as const).map((itemLocale) => [
    itemLocale,
    localizeTree(itemLocale, categoryLabels[getContentBaseLocale(itemLocale)])
  ])
) as Record<Locale, (typeof categoryLabels)["tr"]>;


const pricingLabels = {
  tr: {
    FREE: "Ücretsiz",
    FREEMIUM: "Freemium",
    PAID: "Ücretli"
  },
  en: {
    FREE: "Free",
    FREEMIUM: "Freemium",
    PAID: "Paid"
  }
} as const;

const pricingLabelsByLocale = Object.fromEntries(
  (["tr", "en", "ar", "ru", "zh", "ja", "ko", "el", "da", "fa"] as const).map((itemLocale) => [
    itemLocale,
    localizeTree(itemLocale, pricingLabels[getContentBaseLocale(itemLocale)])
  ])
) as Record<Locale, (typeof pricingLabels)["tr"]>;


type Seed =
  | {
      kind: "BEST_TOOLS";
      slug: string;
      publishDate: string;
      categorySlug: "ai-tools";
      useCaseSlug: string;
      useCasePageSlug: string;
      toolSlugs: string[];
      relatedArticleSlugs?: string[];
    }
  | {
      kind: "TOOL_COMPARISON";
      slug: string;
      publishDate: string;
      categorySlug: "comparisons";
      leftSlug: string;
      rightSlug: string;
      alternativeToolSlugs: string[];
      useCasePageSlugs?: string[];
      relatedArticleSlugs?: string[];
    }
  | {
      kind: "ALTERNATIVES";
      slug: string;
      publishDate: string;
      categorySlug: "guides";
      primaryToolSlug: string;
      alternativeToolSlugs: string[];
      useCasePageSlugs?: string[];
      relatedArticleSlugs?: string[];
    }
  | {
      kind: "USE_CASE_GUIDE";
      slug: string;
      publishDate: string;
      categorySlug: "guides";
      useCaseSlug: string;
      useCasePageSlug: string;
      toolSlugs: string[];
      comparePairs: { leftSlug: string; rightSlug: string }[];
      relatedArticleSlugs?: string[];
    };

function tool(locale: Locale, slug: string) {
  const item = tools.find((entry) => entry.slug === slug);

  if (!item) {
    throw new Error(`Unknown tool: ${slug}`);
  }

  const localized = localizeTree(locale, item.locales[getContentBaseLocale(locale)]);

  return {
    slug,
    name: localized.name,
    shortDescription: localized.shortDescription,
    bestUseCase: localized.bestUseCase,
    pros: localized.pros,
    cons: localized.cons,
    pricingLabel: pricingLabelsByLocale[locale][item.pricing]
  };
}

const link = (label: string, href: string) => `[${label}](${href})`;
const toolLink = (locale: Locale, slug: string) => link(tool(locale, slug).name, `/${locale}/tools/${slug}`);
const compareLink = (locale: Locale, leftSlug: string, rightSlug: string) =>
  link(`${tool(locale, leftSlug).name} vs ${tool(locale, rightSlug).name}`, `/${locale}/compare/${buildComparisonPairSlug(leftSlug, rightSlug)}`);
const alternativeLink = (locale: Locale, slug: string) =>
  link(locale === "tr" ? `${tool(locale, slug).name} alternatifleri` : `${tool(locale, slug).name} alternatives`, `/${locale}/alternatives/${slug}`);
const blogLink = (locale: Locale, slug: string) => link(locale === "tr" ? "ilgili rehber" : "related guide", `/${locale}/blog/${slug}`);
const buildUseCaseLink = (locale: Locale, slug: string) => {
  const labels = {
    students: { tr: "öğrenci use-case sayfası", en: "student use-case page" },
    freelancers: { tr: "freelancer use-case sayfası", en: "freelancer use-case page" },
    "content-creators": { tr: "içerik üreticisi use-case sayfası", en: "content creator use-case page" }
  } as const;

  const labelBase = labels[slug as keyof typeof labels]?.[getContentBaseLocale(locale)] ?? slug;
  return link(localizeTree(locale, labelBase), `/${locale}/use-cases/${slug}`);
};

const getUseCaseLabel = (locale: Locale, slug: string) =>
  useCaseOptions[locale].find((item) => item.slug === slug)?.label ?? slug;

function bestToolsContent(locale: Locale, seed: Extract<Seed, { kind: "BEST_TOOLS" }>): BlogLocalizedContent {
  const items = seed.toolSlugs.map((slug) => tool(locale, slug));
  const firstPair = items.length > 1 ? compareLink(locale, items[0].slug, items[1].slug) : toolLink(locale, items[0].slug);
  const useCaseLabel = getUseCaseLabel(locale, seed.useCaseSlug);

  if (locale === "tr") {
    return {
      title: `2026'da ${useCaseLabel.toLowerCase()} için en iyi AI araçları`,
      excerpt: `${useCaseLabel} için öne çıkan araçları, görev farklarını ve hangi sayfanın sonraki adım olduğunu hızlıca gösteren rehber.`,
      intro: `${items.map((item) => item.name).join(", ")} gibi araçlar aynı işi yapmıyor. ${useCaseLabel} için doğru seçim, önce görevi sonra aracı ayırmaktan geçer.`,
      categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
      seoTitle: `2026'da ${useCaseLabel.toLowerCase()} için en iyi AI araçları | Deciply`,
      seoDescription: `${useCaseLabel} için en mantıklı AI araçlarını, fiyat sinyallerini ve açılması gereken comparison sayfalarını inceleyin.`,
      sections: [
        section("Kısa liste", [`${items.map((item) => toolLink(locale, item.slug)).join(", ")} farklı görevlerde öne çıkar.`, `İki aday arasında kalırsan ${firstPair} sayfası en hızlı karar yoludur.`], { comparison: { title: "Hızlı karar haritası", items: items.slice(0, 3).map((item) => ({ label: item.name, value: `${item.bestUseCase} ? ${item.pricingLabel}` })) } }),
        section("Araçları nasıl ayırmalısın?", ["En iyi karar, önce üretmek istediğin çıktıyı netleştirip sonra aracı seçtiğinde çıkar."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfasında fiyat, artılar ve alternatifler birlikte bulunur.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool sayfası", `/${locale}/tools/${item.slug}`)) }),
        section("Bir sonraki adım", [`${buildUseCaseLink(locale, seed.useCasePageSlug)} workflow tarafını genişletir.`, `${seed.relatedArticleSlugs?.[0] ? `${blogLink(locale, seed.relatedArticleSlugs[0])} ile daha geniş bağlamı aç.` : `${alternativeLink(locale, items[0].slug)} ile alternatifleri gör.`}`])
      ]
    };
  }

  return {
    title: `Best AI tools for ${useCaseLabel.toLowerCase()} in 2026`,
    excerpt: `A quick shortlist of the best AI tools for ${useCaseLabel.toLowerCase()}, plus the next pages worth opening.`,
    intro: `${items.map((item) => item.name).join(", ")} do not solve the same job. The cleaner path is separating the workflow before opening deeper pages.`,
    categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
    seoTitle: `Best AI tools for ${useCaseLabel.toLowerCase()} in 2026 | Deciply`,
    seoDescription: `Review the best AI tools for ${useCaseLabel.toLowerCase()}, including pricing signals and the next comparison pages worth opening.`,
    sections: [
      section("Quick shortlist", [`${items.map((item) => toolLink(locale, item.slug)).join(", ")} each fit a different job.`, `If two strong options stay close, open ${firstPair} next.`], { comparison: { title: "Fast decision map", items: items.slice(0, 3).map((item) => ({ label: item.name, value: `${item.bestUseCase} ? ${item.pricingLabel}` })) } }),
      section("How should you split the tools?", ["Choosing the task first and the tool second usually leads to a cleaner decision."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} groups pricing, strengths, and alternatives in one place.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Open tool page", `/${locale}/tools/${item.slug}`)) }),
      section("What to open next", [`${buildUseCaseLink(locale, seed.useCasePageSlug)} expands the workflow layer.`, `${seed.relatedArticleSlugs?.[0] ? `Continue into ${blogLink(locale, seed.relatedArticleSlugs[0])} for broader context.` : `Open ${alternativeLink(locale, items[0].slug)} for broader options.`}`])
    ]
  };
}

function comparisonContent(locale: Locale, seed: Extract<Seed, { kind: "TOOL_COMPARISON" }>): BlogLocalizedContent {
  const left = tool(locale, seed.leftSlug);
  const right = tool(locale, seed.rightSlug);
  const alternatives = seed.alternativeToolSlugs.map((slug) => tool(locale, slug));
  const direct = compareLink(locale, seed.leftSlug, seed.rightSlug);

  if (locale === "tr") {
    return {
      title: `${left.name} vs ${right.name}: hangi kullanımda hangisi daha mantıklı?`,
      excerpt: `${left.name} ve ${right.name} arasındaki gerçek workflow farkını, fiyat sinyalini ve sonraki comparison akışını gösteren rehber.`,
      intro: `${left.name} ve ${right.name} arasında karar verirken önce görev uyumuna, sonra fiyat ve sınırlarına bakmak en temiz yöntemdir.`,
      categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
      seoTitle: `${left.name} vs ${right.name}: gerçek farklar ve doğru seçim | Deciply`,
      seoDescription: `${left.name} ve ${right.name} araçlarını fiyat, workflow uyumu ve ilgili alternatif sayfalarıyla birlikte karşılaştırın.`,
      sections: [
        section("Hızlı karar özeti", [`${left.name} genelde ${left.bestUseCase.toLowerCase()} tarafında, ${right.name} ise ${right.bestUseCase.toLowerCase()} tarafında daha güçlü görünür.`, `${direct} sayfası yan yana karar için en kısa yoldur.`], { comparison: { title: "Yan yana bakış", items: [{ label: left.name, value: `${left.bestUseCase} ? ${left.pricingLabel}` }, { label: right.name, value: `${right.bestUseCase} ? ${right.pricingLabel}` }] } }),
        section("Güçlü taraflar ve sınırlamalar", ["Asıl fark genelde model tartışması değil, senin işinde daha temiz çıktıyı hangisinin verdiğidir."], { subSections: [sub(left.name, [`${left.shortDescription}`, `${toolLink(locale, left.slug)} ile artı ve eksileri aç.`], [left.pros[0] ?? left.bestUseCase, left.cons[0] ?? left.pricingLabel], "Tool detayı", `/${locale}/tools/${left.slug}`), sub(right.name, [`${right.shortDescription}`, `${toolLink(locale, right.slug)} ile artı ve eksileri aç.`], [right.pros[0] ?? right.bestUseCase, right.cons[0] ?? right.pricingLabel], "Tool detayı", `/${locale}/tools/${right.slug}`)] }),
        section("Daha geniş karar akışı", [`${alternatives.map((item) => alternativeLink(locale, item.slug)).join(", ")} daha geniş bağlam sağlar.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} workflow uyumunu da gösterir.` : "Sonraki mantıklı adım alternatives sayfasıdır."}`])
      ]
    };
  }

  return {
    title: `${left.name} vs ${right.name}: which one fits better?`,
    excerpt: `A direct breakdown of the real workflow difference, pricing signal, and the next pages worth opening between ${left.name} and ${right.name}.`,
    intro: `The cleanest decision path is understanding how ${left.name} and ${right.name} split the workflow before opening deeper pages.`,
    categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
    seoTitle: `${left.name} vs ${right.name}: real differences and better fit | Deciply`,
    seoDescription: `Compare ${left.name} and ${right.name} across pricing, workflow fit, and the alternatives pages worth checking next.`,
    sections: [
      section("Fast decision summary", [`${left.name} often fits ${left.bestUseCase.toLowerCase()}, while ${right.name} often feels stronger for ${right.bestUseCase.toLowerCase()}.`, `${direct} is the shortest path for a side-by-side decision.`], { comparison: { title: "Side-by-side snapshot", items: [{ label: left.name, value: `${left.bestUseCase} ? ${left.pricingLabel}` }, { label: right.name, value: `${right.bestUseCase} ? ${right.pricingLabel}` }] } }),
      section("Strengths and tradeoffs", ["The real difference is usually about which tool gives cleaner output with less friction for your job."], { subSections: [sub(left.name, [`${left.shortDescription}`, `Use ${toolLink(locale, left.slug)} to review strengths and limits.`], [left.pros[0] ?? left.bestUseCase, left.cons[0] ?? left.pricingLabel], "Open tool page", `/${locale}/tools/${left.slug}`), sub(right.name, [`${right.shortDescription}`, `Use ${toolLink(locale, right.slug)} to review strengths and limits.`], [right.pros[0] ?? right.bestUseCase, right.cons[0] ?? right.pricingLabel], "Open tool page", `/${locale}/tools/${right.slug}`)] }),
      section("Broader next steps", [`${alternatives.map((item) => alternativeLink(locale, item.slug)).join(", ")} add more context.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} also helps map workflow fit.` : "The next best step is opening the alternatives page."}`])
    ]
  };
}

function alternativesContent(locale: Locale, seed: Extract<Seed, { kind: "ALTERNATIVES" }>): BlogLocalizedContent {
  const primary = tool(locale, seed.primaryToolSlug);
  const alternatives = seed.alternativeToolSlugs.map((slug) => tool(locale, slug));
  const firstCompare = compareLink(locale, seed.primaryToolSlug, alternatives[0].slug);

  if (locale === "tr") {
    return {
      title: `${primary.name} yerine bakılabilecek en mantıklı alternatifler`,
      excerpt: `${primary.name} yerine hangi aracın daha uygun olabileceğini, güçlü farkları ve comparison akışını toplayan rehber.`,
      intro: `${primary.name} yerine başka bir araca bakarken asıl konu, hangi adayın mevcut workflow sürtünmesini azalttığıdır.`,
      categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
      seoTitle: `${primary.name} alternatifleri: daha uygun seçenekler | Deciply`,
      seoDescription: `${primary.name} yerine bakılabilecek alternatifleri, fiyat sinyallerini ve ilgili comparison sayfalarını inceleyin.`,
      sections: [
        section("Neden alternatif bakılır?", [`${primary.name} kötü olduğu için değil, workflow uyumu değiştiği için alternatif aranır.`, `${alternatives.map((item) => toolLink(locale, item.slug)).join(", ")} en sık açılan adaylardır.`], { comparison: { title: "İlk adaylar", items: alternatives.map((item) => ({ label: item.name, value: `${item.bestUseCase} ? ${item.pricingLabel}` })) } }),
        section("Hangi alternatif hangi boşluğu kapatır?", ["En iyi alternatif, en popüler olan değil mevcut sürtünmeyi azaltandır."], { subSections: alternatives.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfası pricing ve zayıf yönleri birlikte gösterir.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool detayı", `/${locale}/tools/${item.slug}`)) }),
        section("Bir sonraki sayfa", [`${firstCompare} çoğu zaman en kısa karar yoludur.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} ile workflow uyumunu da kontrol et.` : `${alternativeLink(locale, seed.primaryToolSlug)} ile daha geniş alternatif listesini aç.`}`])
      ]
    };
  }

  return {
    title: `Best ${primary.name} alternatives worth checking`,
    excerpt: `A practical look at the better-fit options instead of ${primary.name}, plus the direct comparison path to open next.`,
    intro: `The most useful question is not whether ${primary.name} is bad, but which alternative removes the most friction from the current workflow.`,
    categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
    seoTitle: `${primary.name} alternatives: better-fit options | Deciply`,
    seoDescription: `Review the best alternatives to ${primary.name}, including pricing signals and the comparison pages worth opening next.`,
    sections: [
      section("Why do users look for alternatives?", [`Users usually switch because workflow fit changes, not because ${primary.name} is universally bad.`, `${alternatives.map((item) => toolLink(locale, item.slug)).join(", ")} are common next candidates.`], { comparison: { title: "First candidates", items: alternatives.map((item) => ({ label: item.name, value: `${item.bestUseCase} ? ${item.pricingLabel}` })) } }),
      section("Which alternative solves which gap?", ["The best alternative is the one that removes the friction in your current workflow."], { subSections: alternatives.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} shows pricing and tradeoffs in one place.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Open tool page", `/${locale}/tools/${item.slug}`)) }),
      section("What should you open next?", [`${firstCompare} is usually the fastest comparison path.`, `${seed.useCasePageSlugs?.[0] ? `Check ${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} for workflow fit too.` : `Open ${alternativeLink(locale, seed.primaryToolSlug)} for the broader list.`}`])
    ]
  };
}

function buildUseCaseGuideContent(locale: Locale, seed: Extract<Seed, { kind: "USE_CASE_GUIDE" }>): BlogLocalizedContent {
  const items = seed.toolSlugs.map((slug) => tool(locale, slug));
  const compareItems = seed.comparePairs.map((pair) => compareLink(locale, pair.leftSlug, pair.rightSlug));
  const useCaseLabel = seed.useCasePageSlug === "content-creators" ? (locale === "tr" ? "içerik üreticileri" : "content creators") : getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase();

  if (locale === "tr") {
    return {
      title: `${useCaseLabel} için AI workflow rehberi`,
      excerpt: `Bu use-case için hangi aracın hangi adımda yer alması gerektiğini ve hangi compare sayfalarının kararı hızlandırdığını gösteren rehber.`,
      intro: `${items.map((item) => item.name).join(", ")} gibi araçları görev bazlı sıralamak, tek araçla her işi çözmeye çalışmaktan daha verimli olur.`,
      categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
      seoTitle: `${useCaseLabel} için AI workflow rehberi | Deciply`,
      seoDescription: `Bu use-case için AI workflow'unu, araç sıralamasını, compare linklerini ve ilgili tool sayfalarını inceleyin.`,
      sections: [
        section("Workflow özeti", ["İyi bir akış tek araçtan değil, doğru sıradan gelir.", `${compareItems.join(", ")} kritik karar noktalarını kısaltır.`], { bullets: ["Araştırma veya fikir aşamasını netleştir", "Üretim aracını seç", "Paketleme ve yayın akışını tamamla"] }),
        section("Bu akışta hangi araç ne yapar?", ["Her araç daha dar bir görevde daha net değer üretir."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfası artılar, eksiler ve alternatifleri gösterir.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool sayfası", `/${locale}/tools/${item.slug}`)) }),
        section("Sonraki tıklamalar", [`${compareItems.join(", ")} ile iki güçlü adayı ayır.`, `${seed.relatedArticleSlugs?.[0] ? `${blogLink(locale, seed.relatedArticleSlugs[0])} ile bağlamı genişlet.` : `${alternativeLink(locale, items[0].slug)} ile alternatifleri aç.`}`])
      ]
    };
  }

  return {
    title: `AI workflow guide for ${useCaseLabel}`,
    excerpt: `A workflow-first guide showing which tool belongs in which step and which comparison pages shorten the decision.`,
    intro: `A better stack comes from assigning clearer jobs to tools like ${items.map((item) => item.name).join(", ")} instead of forcing one tool across every step.`,
    categoryLabel: categoryLabelsByLocale[locale][seed.categorySlug],
    seoTitle: `AI workflow guide for ${useCaseLabel} | Deciply`,
    seoDescription: `Review a workflow-first AI stack for this use case, including tool order, comparison links, and the next pages worth opening.`,
    sections: [
      section("Workflow snapshot", ["A better stack comes from sequence, not from one tool doing everything.", `${compareItems.join(", ")} shorten the biggest decision points.`], { bullets: ["Clarify research or ideation", "Choose the production tool", "Finish packaging and publishing"] }),
      section("What does each tool do here?", ["Each tool creates more value when its role is narrower and clearer."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} shows strengths, weaknesses, and alternatives.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Open tool page", `/${locale}/tools/${item.slug}`)) }),
      section("Next clicks", [`${compareItems.join(", ")} help separate close options.`, `${seed.relatedArticleSlugs?.[0] ? `Continue into ${blogLink(locale, seed.relatedArticleSlugs[0])} for more context.` : `Open ${alternativeLink(locale, items[0].slug)} for broader options.`}`])
    ]
  };
}

function buildEntry(seed: Seed): BlogEntry {
  if (seed.kind === "BEST_TOOLS") {
    return {
      slug: seed.slug,
      categorySlug: seed.categorySlug,
      publishDate: seed.publishDate,
      relatedToolSlugs: seed.toolSlugs,
      contentGraph: {
        kind: seed.kind,
        useCaseSlug: seed.useCaseSlug,
        comparePairs: seed.toolSlugs.length > 1 ? [{ leftSlug: seed.toolSlugs[0], rightSlug: seed.toolSlugs[1] }] : [],
        alternativeToolSlugs: seed.toolSlugs.slice(0, 2),
        useCasePageSlugs: [seed.useCasePageSlug],
        relatedArticleSlugs: seed.relatedArticleSlugs,
        keywords: [seed.useCaseSlug]
      },
      locales: {
        tr: bestToolsContent("tr", seed),
        en: bestToolsContent("en", seed)
      }
    };
  }

  if (seed.kind === "TOOL_COMPARISON") {
    return {
      slug: seed.slug,
      categorySlug: seed.categorySlug,
      publishDate: seed.publishDate,
      relatedToolSlugs: [seed.leftSlug, seed.rightSlug, ...seed.alternativeToolSlugs],
      contentGraph: {
        kind: seed.kind,
        primaryToolSlug: seed.leftSlug,
        secondaryToolSlug: seed.rightSlug,
        comparePairs: [{ leftSlug: seed.leftSlug, rightSlug: seed.rightSlug }],
        alternativeToolSlugs: seed.alternativeToolSlugs,
        useCasePageSlugs: seed.useCasePageSlugs,
        relatedArticleSlugs: seed.relatedArticleSlugs,
        keywords: [seed.leftSlug, seed.rightSlug]
      },
      locales: {
        tr: comparisonContent("tr", seed),
        en: comparisonContent("en", seed)
      }
    };
  }

  if (seed.kind === "ALTERNATIVES") {
    return {
      slug: seed.slug,
      categorySlug: seed.categorySlug,
      publishDate: seed.publishDate,
      relatedToolSlugs: [seed.primaryToolSlug, ...seed.alternativeToolSlugs],
      contentGraph: {
        kind: seed.kind,
        primaryToolSlug: seed.primaryToolSlug,
        alternativeToolSlugs: seed.alternativeToolSlugs,
        useCasePageSlugs: seed.useCasePageSlugs,
        relatedArticleSlugs: seed.relatedArticleSlugs,
        keywords: [seed.primaryToolSlug]
      },
      locales: {
        tr: alternativesContent("tr", seed),
        en: alternativesContent("en", seed)
      }
    };
  }

  return {
    slug: seed.slug,
    categorySlug: seed.categorySlug,
    publishDate: seed.publishDate,
    relatedToolSlugs: seed.toolSlugs,
    contentGraph: {
      kind: seed.kind,
      useCaseSlug: seed.useCaseSlug,
      comparePairs: seed.comparePairs,
      alternativeToolSlugs: seed.toolSlugs.slice(0, 2),
      useCasePageSlugs: [seed.useCasePageSlug],
      relatedArticleSlugs: seed.relatedArticleSlugs,
      keywords: [seed.useCaseSlug]
    },
    locales: {
      tr: buildUseCaseGuideContent("tr", seed),
      en: buildUseCaseGuideContent("en", seed)
    }
  };
}

const seeds: Seed[] = [
  {
    kind: "BEST_TOOLS",
    slug: "best-ai-tools-for-students-2026",
    publishDate: "2026-04-01",
    categorySlug: "ai-tools",
    useCaseSlug: "students",
    useCasePageSlug: "students",
    toolSlugs: ["chatgpt", "perplexity", "gemini", "notion-ai"],
    relatedArticleSlugs: ["best-ai-tools-for-beginners-2026"]
  },
  {
    kind: "TOOL_COMPARISON",
    slug: "chatgpt-vs-claude-for-writing",
    publishDate: "2026-04-01",
    categorySlug: "comparisons",
    leftSlug: "chatgpt",
    rightSlug: "claude",
    alternativeToolSlugs: ["gemini", "jasper"],
    useCasePageSlugs: ["freelancers"],
    relatedArticleSlugs: ["chatgpt-vs-claude-vs-gemini"]
  },
  {
    kind: "ALTERNATIVES",
    slug: "chatgpt-alternatives-2026",
    publishDate: "2026-04-01",
    categorySlug: "guides",
    primaryToolSlug: "chatgpt",
    alternativeToolSlugs: ["claude", "gemini", "perplexity"],
    useCasePageSlugs: ["freelancers"],
    relatedArticleSlugs: ["chatgpt-vs-claude-vs-gemini"]
  },
  {
    kind: "USE_CASE_GUIDE",
    slug: "ai-workflow-for-content-creators",
    publishDate: "2026-04-01",
    categorySlug: "guides",
    useCaseSlug: "content",
    useCasePageSlug: "content-creators",
    toolSlugs: ["chatgpt", "canva-ai", "runway", "notion-ai"],
    comparePairs: [
      { leftSlug: "chatgpt", rightSlug: "claude" },
      { leftSlug: "canva-ai", rightSlug: "midjourney" }
    ],
    relatedArticleSlugs: ["best-ai-tools-for-beginners-2026"]
  }
];

export const generatedBlogArticles: BlogEntry[] = seeds.map(buildEntry);
