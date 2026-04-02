import { tools } from "@/data/tools";
import { useCaseOptions } from "@/data/tool-taxonomy";
import { buildComparisonPairSlug } from "@/lib/comparisons";
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
    "ai-tools": "AI AraÃ§larÄ±",
    comparisons: "KarÅŸÄ±laÅŸtÄ±rmalar",
    guides: "Rehberler"
  },
  en: {
    "ai-tools": "AI Tools",
    comparisons: "Comparisons",
    guides: "Guides"
  }
} as const;

const pricingLabels = {
  tr: {
    FREE: "Ãœcretsiz",
    FREEMIUM: "Freemium",
    PAID: "Ãœcretli"
  },
  en: {
    FREE: "Free",
    FREEMIUM: "Freemium",
    PAID: "Paid"
  }
} as const;

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

  const localized = item.locales[locale];

  return {
    slug,
    name: localized.name,
    shortDescription: localized.shortDescription,
    bestUseCase: localized.bestUseCase,
    pros: localized.pros,
    cons: localized.cons,
    pricingLabel: pricingLabels[locale][item.pricing]
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
  const labels: Record<string, Record<Locale, string>> = {
    students: { tr: "Ã¶ÄŸrenci use-case sayfasÄ±", en: "student use-case page" },
    freelancers: { tr: "freelancer use-case sayfasÄ±", en: "freelancer use-case page" },
    "content-creators": { tr: "iÃ§erik Ã¼reticisi use-case sayfasÄ±", en: "content creator use-case page" }
  };

  return link(labels[slug]?.[locale] ?? slug, `/${locale}/use-cases/${slug}`);
};

const getUseCaseLabel = (locale: Locale, slug: string) =>
  useCaseOptions[locale].find((item) => item.slug === slug)?.label ?? slug;

function bestToolsContent(locale: Locale, seed: Extract<Seed, { kind: "BEST_TOOLS" }>): BlogLocalizedContent {
  const items = seed.toolSlugs.map((slug) => tool(locale, slug));
  const firstPair = items.length > 1 ? compareLink(locale, items[0].slug, items[1].slug) : toolLink(locale, items[0].slug);
  const useCaseLabel = getUseCaseLabel(locale, seed.useCaseSlug);

  if (locale === "tr") {
    return {
      title: `2026'da ${useCaseLabel.toLowerCase()} iÃ§in en iyi AI araÃ§larÄ±`,
      excerpt: `${useCaseLabel} iÃ§in Ã¶ne Ã§Ä±kan araÃ§larÄ±, gÃ¶rev farklarÄ±nÄ± ve hangi sayfanÄ±n sonraki adÄ±m olduÄŸunu hÄ±zlÄ±ca gÃ¶steren rehber.`,
      intro: `${items.map((item) => item.name).join(", ")} gibi araÃ§lar aynÄ± iÅŸi yapmÄ±yor. ${useCaseLabel} iÃ§in doÄŸru seÃ§im, Ã¶nce gÃ¶revi sonra aracÄ± ayÄ±rmaktan geÃ§er.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `2026'da ${useCaseLabel.toLowerCase()} iÃ§in en iyi AI araÃ§larÄ± | Deciply`,
      seoDescription: `${useCaseLabel} iÃ§in en mantÄ±klÄ± AI araÃ§larÄ±nÄ±, fiyat sinyallerini ve aÃ§Ä±lmasÄ± gereken comparison sayfalarÄ±nÄ± inceleyin.`,
      sections: [
        section("KÄ±sa liste", [`${items.map((item) => toolLink(locale, item.slug)).join(", ")} farklÄ± gÃ¶revlerde Ã¶ne Ã§Ä±kar.`, `Ä°ki aday arasÄ±nda kalÄ±rsan ${firstPair} sayfasÄ± en hÄ±zlÄ± karar yoludur.`], { comparison: { title: "HÄ±zlÄ± karar haritasÄ±", items: items.slice(0, 3).map((item) => ({ label: item.name, value: `${item.bestUseCase} Â· ${item.pricingLabel}` })) } }),
        section("AraÃ§larÄ± nasÄ±l ayÄ±rmalÄ±sÄ±n?", ["En iyi karar, Ã¶nce Ã¼retmek istediÄŸin Ã§Ä±ktÄ±yÄ± netleÅŸtirip sonra aracÄ± seÃ§tiÄŸinde Ã§Ä±kar."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfasÄ±nda fiyat, artÄ±lar ve alternatifler birlikte bulunur.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool sayfasÄ±", `/${locale}/tools/${item.slug}`)) }),
        section("Bir sonraki adÄ±m", [`${buildUseCaseLink(locale, seed.useCasePageSlug)} workflow tarafÄ±nÄ± geniÅŸletir.`, `${seed.relatedArticleSlugs?.[0] ? `${blogLink(locale, seed.relatedArticleSlugs[0])} ile daha geniÅŸ baÄŸlamÄ± aÃ§.` : `${alternativeLink(locale, items[0].slug)} ile alternatifleri gÃ¶r.`}`])
      ]
    };
  }

  return {
    title: `Best AI tools for ${useCaseLabel.toLowerCase()} in 2026`,
    excerpt: `A quick shortlist of the best AI tools for ${useCaseLabel.toLowerCase()}, plus the next pages worth opening.`,
    intro: `${items.map((item) => item.name).join(", ")} do not solve the same job. The cleaner path is separating the workflow before opening deeper pages.`,
    categoryLabel: categoryLabels[locale][seed.categorySlug],
    seoTitle: `Best AI tools for ${useCaseLabel.toLowerCase()} in 2026 | Deciply`,
    seoDescription: `Review the best AI tools for ${useCaseLabel.toLowerCase()}, including pricing signals and the next comparison pages worth opening.`,
    sections: [
      section("Quick shortlist", [`${items.map((item) => toolLink(locale, item.slug)).join(", ")} each fit a different job.`, `If two strong options stay close, open ${firstPair} next.`], { comparison: { title: "Fast decision map", items: items.slice(0, 3).map((item) => ({ label: item.name, value: `${item.bestUseCase} Â· ${item.pricingLabel}` })) } }),
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
      title: `${left.name} vs ${right.name}: hangi kullanÄ±mda hangisi daha mantÄ±klÄ±?`,
      excerpt: `${left.name} ve ${right.name} arasÄ±ndaki gerÃ§ek workflow farkÄ±nÄ±, fiyat sinyalini ve sonraki comparison akÄ±ÅŸÄ±nÄ± gÃ¶steren rehber.`,
      intro: `${left.name} ve ${right.name} arasÄ±nda karar verirken Ã¶nce gÃ¶rev uyumuna, sonra fiyat ve sÄ±nÄ±rlarÄ±na bakmak en temiz yÃ¶ntemdir.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `${left.name} vs ${right.name}: gerÃ§ek farklar ve doÄŸru seÃ§im | Deciply`,
      seoDescription: `${left.name} ve ${right.name} araÃ§larÄ±nÄ± fiyat, workflow uyumu ve ilgili alternatif sayfalarÄ±yla birlikte karÅŸÄ±laÅŸtÄ±rÄ±n.`,
      sections: [
        section("HÄ±zlÄ± karar Ã¶zeti", [`${left.name} genelde ${left.bestUseCase.toLowerCase()} tarafÄ±nda, ${right.name} ise ${right.bestUseCase.toLowerCase()} tarafÄ±nda daha gÃ¼Ã§lÃ¼ gÃ¶rÃ¼nÃ¼r.`, `${direct} sayfasÄ± yan yana karar iÃ§in en kÄ±sa yoldur.`], { comparison: { title: "Yan yana bakÄ±ÅŸ", items: [{ label: left.name, value: `${left.bestUseCase} Â· ${left.pricingLabel}` }, { label: right.name, value: `${right.bestUseCase} Â· ${right.pricingLabel}` }] } }),
        section("GÃ¼Ã§lÃ¼ taraflar ve sÄ±nÄ±rlamalar", ["AsÄ±l fark genelde model tartÄ±ÅŸmasÄ± deÄŸil, senin iÅŸinde daha temiz Ã§Ä±ktÄ±yÄ± hangisinin verdiÄŸidir."], { subSections: [sub(left.name, [`${left.shortDescription}`, `${toolLink(locale, left.slug)} ile artÄ± ve eksileri aÃ§.`], [left.pros[0] ?? left.bestUseCase, left.cons[0] ?? left.pricingLabel], "Tool detayÄ±", `/${locale}/tools/${left.slug}`), sub(right.name, [`${right.shortDescription}`, `${toolLink(locale, right.slug)} ile artÄ± ve eksileri aÃ§.`], [right.pros[0] ?? right.bestUseCase, right.cons[0] ?? right.pricingLabel], "Tool detayÄ±", `/${locale}/tools/${right.slug}`)] }),
        section("Daha geniÅŸ karar akÄ±ÅŸÄ±", [`${alternatives.map((item) => alternativeLink(locale, item.slug)).join(", ")} daha geniÅŸ baÄŸlam saÄŸlar.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} workflow uyumunu da gÃ¶sterir.` : "Sonraki mantÄ±klÄ± adÄ±m alternatives sayfasÄ±dÄ±r."}`])
      ]
    };
  }

  return {
    title: `${left.name} vs ${right.name}: which one fits better?`,
    excerpt: `A direct breakdown of the real workflow difference, pricing signal, and the next pages worth opening between ${left.name} and ${right.name}.`,
    intro: `The cleanest decision path is understanding how ${left.name} and ${right.name} split the workflow before opening deeper pages.`,
    categoryLabel: categoryLabels[locale][seed.categorySlug],
    seoTitle: `${left.name} vs ${right.name}: real differences and better fit | Deciply`,
    seoDescription: `Compare ${left.name} and ${right.name} across pricing, workflow fit, and the alternatives pages worth checking next.`,
    sections: [
      section("Fast decision summary", [`${left.name} often fits ${left.bestUseCase.toLowerCase()}, while ${right.name} often feels stronger for ${right.bestUseCase.toLowerCase()}.`, `${direct} is the shortest path for a side-by-side decision.`], { comparison: { title: "Side-by-side snapshot", items: [{ label: left.name, value: `${left.bestUseCase} Â· ${left.pricingLabel}` }, { label: right.name, value: `${right.bestUseCase} Â· ${right.pricingLabel}` }] } }),
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
      title: `${primary.name} yerine bakÄ±labilecek en mantÄ±klÄ± alternatifler`,
      excerpt: `${primary.name} yerine hangi aracÄ±n daha uygun olabileceÄŸini, gÃ¼Ã§lÃ¼ farklarÄ± ve comparison akÄ±ÅŸÄ±nÄ± toplayan rehber.`,
      intro: `${primary.name} yerine baÅŸka bir araca bakarken asÄ±l konu, hangi adayÄ±n mevcut workflow sÃ¼rtÃ¼nmesini azalttÄ±ÄŸÄ±dÄ±r.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `${primary.name} alternatifleri: daha uygun seÃ§enekler | Deciply`,
      seoDescription: `${primary.name} yerine bakÄ±labilecek alternatifleri, fiyat sinyallerini ve ilgili comparison sayfalarÄ±nÄ± inceleyin.`,
      sections: [
        section("Neden alternatif bakÄ±lÄ±r?", [`${primary.name} kÃ¶tÃ¼ olduÄŸu iÃ§in deÄŸil, workflow uyumu deÄŸiÅŸtiÄŸi iÃ§in alternatif aranÄ±r.`, `${alternatives.map((item) => toolLink(locale, item.slug)).join(", ")} en sÄ±k aÃ§Ä±lan adaylardÄ±r.`], { comparison: { title: "Ä°lk adaylar", items: alternatives.map((item) => ({ label: item.name, value: `${item.bestUseCase} Â· ${item.pricingLabel}` })) } }),
        section("Hangi alternatif hangi boÅŸluÄŸu kapatÄ±r?", ["En iyi alternatif, en popÃ¼ler olan deÄŸil mevcut sÃ¼rtÃ¼nmeyi azaltandÄ±r."], { subSections: alternatives.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfasÄ± pricing ve zayÄ±f yÃ¶nleri birlikte gÃ¶sterir.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool detayÄ±", `/${locale}/tools/${item.slug}`)) }),
        section("Bir sonraki sayfa", [`${firstCompare} Ã§oÄŸu zaman en kÄ±sa karar yoludur.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} ile workflow uyumunu da kontrol et.` : `${alternativeLink(locale, seed.primaryToolSlug)} ile daha geniÅŸ alternatif listesini aÃ§.`}`])
      ]
    };
  }

  return {
    title: `Best ${primary.name} alternatives worth checking`,
    excerpt: `A practical look at the better-fit options instead of ${primary.name}, plus the direct comparison path to open next.`,
    intro: `The most useful question is not whether ${primary.name} is bad, but which alternative removes the most friction from the current workflow.`,
    categoryLabel: categoryLabels[locale][seed.categorySlug],
    seoTitle: `${primary.name} alternatives: better-fit options | Deciply`,
    seoDescription: `Review the best alternatives to ${primary.name}, including pricing signals and the comparison pages worth opening next.`,
    sections: [
      section("Why do users look for alternatives?", [`Users usually switch because workflow fit changes, not because ${primary.name} is universally bad.`, `${alternatives.map((item) => toolLink(locale, item.slug)).join(", ")} are common next candidates.`], { comparison: { title: "First candidates", items: alternatives.map((item) => ({ label: item.name, value: `${item.bestUseCase} Â· ${item.pricingLabel}` })) } }),
      section("Which alternative solves which gap?", ["The best alternative is the one that removes the friction in your current workflow."], { subSections: alternatives.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} shows pricing and tradeoffs in one place.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Open tool page", `/${locale}/tools/${item.slug}`)) }),
      section("What should you open next?", [`${firstCompare} is usually the fastest comparison path.`, `${seed.useCasePageSlugs?.[0] ? `Check ${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} for workflow fit too.` : `Open ${alternativeLink(locale, seed.primaryToolSlug)} for the broader list.`}`])
    ]
  };
}

function buildUseCaseGuideContent(locale: Locale, seed: Extract<Seed, { kind: "USE_CASE_GUIDE" }>): BlogLocalizedContent {
  const items = seed.toolSlugs.map((slug) => tool(locale, slug));
  const compareItems = seed.comparePairs.map((pair) => compareLink(locale, pair.leftSlug, pair.rightSlug));
  const useCaseLabel = seed.useCasePageSlug === "content-creators" ? (locale === "tr" ? "iÃ§erik Ã¼reticileri" : "content creators") : getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase();

  if (locale === "tr") {
    return {
      title: `${useCaseLabel} iÃ§in AI workflow rehberi`,
      excerpt: `Bu use-case iÃ§in hangi aracÄ±n hangi adÄ±mda yer almasÄ± gerektiÄŸini ve hangi compare sayfalarÄ±nÄ±n kararÄ± hÄ±zlandÄ±rdÄ±ÄŸÄ±nÄ± gÃ¶steren rehber.`,
      intro: `${items.map((item) => item.name).join(", ")} gibi araÃ§larÄ± gÃ¶rev bazlÄ± sÄ±ralamak, tek araÃ§la her iÅŸi Ã§Ã¶zmeye Ã§alÄ±ÅŸmaktan daha verimli olur.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `${useCaseLabel} iÃ§in AI workflow rehberi | Deciply`,
      seoDescription: `Bu use-case iÃ§in AI workflow'unu, araÃ§ sÄ±ralamasÄ±nÄ±, compare linklerini ve ilgili tool sayfalarÄ±nÄ± inceleyin.`,
      sections: [
        section("Workflow Ã¶zeti", ["Ä°yi bir akÄ±ÅŸ tek araÃ§tan deÄŸil, doÄŸru sÄ±radan gelir.", `${compareItems.join(", ")} kritik karar noktalarÄ±nÄ± kÄ±saltÄ±r.`], { bullets: ["AraÅŸtÄ±rma veya fikir aÅŸamasÄ±nÄ± netleÅŸtir", "Ãœretim aracÄ±nÄ± seÃ§", "Paketleme ve yayÄ±n akÄ±ÅŸÄ±nÄ± tamamla"] }),
        section("Bu akÄ±ÅŸta hangi araÃ§ ne yapar?", ["Her araÃ§ daha dar bir gÃ¶revde daha net deÄŸer Ã¼retir."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfasÄ± artÄ±lar, eksiler ve alternatifleri gÃ¶sterir.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool sayfasÄ±", `/${locale}/tools/${item.slug}`)) }),
        section("Sonraki tÄ±klamalar", [`${compareItems.join(", ")} ile iki gÃ¼Ã§lÃ¼ adayÄ± ayÄ±r.`, `${seed.relatedArticleSlugs?.[0] ? `${blogLink(locale, seed.relatedArticleSlugs[0])} ile baÄŸlamÄ± geniÅŸlet.` : `${alternativeLink(locale, items[0].slug)} ile alternatifleri aÃ§.`}`])
      ]
    };
  }

  return {
    title: `AI workflow guide for ${useCaseLabel}`,
    excerpt: `A workflow-first guide showing which tool belongs in which step and which comparison pages shorten the decision.`,
    intro: `A better stack comes from assigning clearer jobs to tools like ${items.map((item) => item.name).join(", ")} instead of forcing one tool across every step.`,
    categoryLabel: categoryLabels[locale][seed.categorySlug],
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
    publishDate: "2026-04-02",
    categorySlug: "ai-tools",
    useCaseSlug: "students",
    useCasePageSlug: "students",
    toolSlugs: ["chatgpt", "perplexity", "gemini", "notion-ai"],
    relatedArticleSlugs: ["best-ai-tools-for-beginners-2026"]
  },
  {
    kind: "TOOL_COMPARISON",
    slug: "chatgpt-vs-claude-for-writing",
    publishDate: "2026-04-02",
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
    publishDate: "2026-04-02",
    categorySlug: "guides",
    primaryToolSlug: "chatgpt",
    alternativeToolSlugs: ["claude", "gemini", "perplexity"],
    useCasePageSlugs: ["freelancers"],
    relatedArticleSlugs: ["chatgpt-vs-claude-vs-gemini"]
  },
  {
    kind: "USE_CASE_GUIDE",
    slug: "ai-workflow-for-content-creators",
    publishDate: "2026-04-02",
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
