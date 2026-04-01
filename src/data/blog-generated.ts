import { tools } from "@/data/tools";
import { useCaseOptions } from "@/data/tool-taxonomy";
import { buildComparisonPairSlug } from "@/lib/comparisons";
import type { Locale } from "@/i18n/config";
import type { BlogEntry, BlogLocalizedContent, BlogSection, BlogSubSection } from "@/types/blog";

const section = (title: string, paragraphs: string[], options?: { bullets?: string[]; subSections?: BlogSubSection[]; comparison?: { title: string; items: { label: string; value: string }[] } }): BlogSection => ({ title, paragraphs, bullets: options?.bullets, subSections: options?.subSections, comparison: options?.comparison });
const sub = (title: string, paragraphs: string[], bullets?: string[], ctaLabel?: string, ctaHref?: string): BlogSubSection => ({ title, paragraphs, bullets, ctaLabel, ctaHref });

const categoryLabels = { tr: { "ai-tools": "AI ara�lar1", comparisons: "Kar�x1la�xt1rmalar", guides: "Rehberler" }, en: { "ai-tools": "AI Tools", comparisons: "Comparisons", guides: "Guides" } } as const;
const pricingLabels = { tr: { FREE: "�Scretsiz", FREEMIUM: "Freemium", PAID: "�Scretli" }, en: { FREE: "Free", FREEMIUM: "Freemium", PAID: "Paid" } } as const;

type Seed =
  | { kind: "BEST_TOOLS"; slug: string; publishDate: string; categorySlug: "ai-tools"; useCaseSlug: string; useCasePageSlug: string; toolSlugs: string[]; relatedArticleSlugs?: string[] }
  | { kind: "TOOL_COMPARISON"; slug: string; publishDate: string; categorySlug: "comparisons"; leftSlug: string; rightSlug: string; alternativeToolSlugs: string[]; useCasePageSlugs?: string[]; relatedArticleSlugs?: string[] }
  | { kind: "ALTERNATIVES"; slug: string; publishDate: string; categorySlug: "guides"; primaryToolSlug: string; alternativeToolSlugs: string[]; useCasePageSlugs?: string[]; relatedArticleSlugs?: string[] }
  | { kind: "USE_CASE_GUIDE"; slug: string; publishDate: string; categorySlug: "guides"; useCaseSlug: string; useCasePageSlug: string; toolSlugs: string[]; comparePairs: { leftSlug: string; rightSlug: string }[]; relatedArticleSlugs?: string[] };

function tool(locale: Locale, slug: string) {
  const item = tools.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Unknown tool: ${slug}`);
  const localized = item.locales[locale];
  return { slug, name: localized.name, shortDescription: localized.shortDescription, bestUseCase: localized.bestUseCase, pros: localized.pros, cons: localized.cons, pricingLabel: pricingLabels[locale][item.pricing] };
}

const link = (label: string, href: string) => `[${label}](${href})`;
const toolLink = (locale: Locale, slug: string) => link(tool(locale, slug).name, `/${locale}/tools/${slug}`);
const compareLink = (locale: Locale, leftSlug: string, rightSlug: string) => link(`${tool(locale, leftSlug).name} vs ${tool(locale, rightSlug).name}`, `/${locale}/compare/${buildComparisonPairSlug(leftSlug, rightSlug)}`);
const alternativeLink = (locale: Locale, slug: string) => link(locale === "tr" ? `${tool(locale, slug).name} alternatifleri` : `${tool(locale, slug).name} alternatives`, `/${locale}/alternatives/${slug}`);
const blogLink = (locale: Locale, slug: string) => link(locale === "tr" ? "ilgili rehber" : "related guide", `/${locale}/blog/${slug}`);
const buildUseCaseLink = (locale: Locale, slug: string) => {
  const labels: Record<string, Record<Locale, string>> = {
    students: { tr: "��xrenci use-case sayfas1", en: "student use-case page" },
    freelancers: { tr: "freelancer use-case sayfas1", en: "freelancer use-case page" },
    "content-creators": { tr: "i�erik �reticisi use-case sayfas1", en: "content creator use-case page" }
  };
  return link(labels[slug]?.[locale] ?? slug, `/${locale}/use-cases/${slug}`);
};
const getUseCaseLabel = (locale: Locale, slug: string) => useCaseOptions[locale].find((item) => item.slug === slug)?.label ?? slug;

function bestToolsContent(locale: Locale, seed: Extract<Seed, { kind: "BEST_TOOLS" }>): BlogLocalizedContent {
  const items = seed.toolSlugs.map((slug) => tool(locale, slug));
  const firstPair = items.length > 1 ? compareLink(locale, items[0].slug, items[1].slug) : toolLink(locale, items[0].slug);
  if (locale === "tr") {
    return {
      title: `2026'da ${getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()} i�in en iyi AI ara�lar1`,
      excerpt: `${getUseCaseLabel(locale, seed.useCaseSlug)} i�in en mant1kl1 ara�lar1, g�rev farklar1n1 ve sonraki t1klama ak1�x1n1 toplar.`,
      intro: `${getUseCaseLabel(locale, seed.useCaseSlug)} i�in en hizli se�im, ${items.map((item) => item.name).join(", ")} arasindaki g�rev farklarini okumaktir.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `2026'da ${getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()} i�in en iyi AI ara�lar1 | Deciply`,
      seoDescription: `${getUseCaseLabel(locale, seed.useCaseSlug)} i�in en iyi AI ara�lar1n1, fiyat sinyallerini ve ilgili comparison linklerini inceleyin.`,
      sections: [
        section("K1sa liste", [`${items.map((item) => toolLink(locale, item.slug)).join(", ")} farkl1 i�xlerde �ne �1kar.`, `Karar iki aday aras1nda kal1rsa ${firstPair} sayfas1na ge�.`], { comparison: { title: "H1zl1 karar haritas1", items: items.slice(0, 3).map((item) => ({ label: item.name, value: `${item.bestUseCase} " ${item.pricingLabel}` })) } }),
        section("Ara�lar1 nas1l ay1rmal1s1n?", ["�nce g�revi se�mek, sonra arac1 se�mek daha do�xru sonu� verir."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfas1nda fiyat, art1lar ve alternatifler bir aradad1r.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool sayfas1", `/${locale}/tools/${item.slug}`)) }),
        section("Bir sonraki ad1m", [`${buildUseCaseLink(locale, seed.useCasePageSlug)} workflow taraf1n1 geni�xletir.`, `${seed.relatedArticleSlugs?.[0] ? `${blogLink(locale, seed.relatedArticleSlugs[0])} ile daha geni�x ba�xlama ge�.` : `${alternativeLink(locale, items[0].slug)} ile daha fazla se�enek a�.`}`], { bullets: [`${firstPair} ile iki aday1 yan yana g�r`, `${alternativeLink(locale, items[0].slug)} ile alternatifleri a�`] })
      ]
    };
  }
  return {
    title: `Best AI tools for ${getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()} in 2026`,
    excerpt: `A shortlist of the best AI tools for ${getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()}, plus the next pages worth opening.`,
    intro: `A faster path is to compare the job split between ${items.map((item) => item.name).join(", ")} before opening the deeper pages.`,
    categoryLabel: categoryLabels[locale][seed.categorySlug],
    seoTitle: `Best AI tools for ${getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()} in 2026 | Deciply`,
    seoDescription: `Review the best AI tools for ${getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()}, including pricing signals and the comparison pages worth opening next.`,
    sections: [
      section("Quick shortlist", [`${items.map((item) => toolLink(locale, item.slug)).join(", ")} each fit a different job.`, `If two strong options stay close, open ${firstPair} next.`], { comparison: { title: "Fast decision map", items: items.slice(0, 3).map((item) => ({ label: item.name, value: `${item.bestUseCase} " ${item.pricingLabel}` })) } }),
      section("How should you split the tools?", ["Choosing the task first and the tool second usually leads to a cleaner decision."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} groups pricing, strengths, and alternatives in one place.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Open tool page", `/${locale}/tools/${item.slug}`)) }),
      section("What to open next", [`${buildUseCaseLink(locale, seed.useCasePageSlug)} expands the workflow layer.`, `${seed.relatedArticleSlugs?.[0] ? `Continue into ${blogLink(locale, seed.relatedArticleSlugs[0])} for broader context.` : `Open ${alternativeLink(locale, items[0].slug)} for broader options.`}`], { bullets: [`Open ${firstPair} to compare two frontrunners`, `Browse ${alternativeLink(locale, items[0].slug)} for more options`] })
    ]
  };
}

function comparisonContent(locale: Locale, seed: Extract<Seed, { kind: "TOOL_COMPARISON" }>): BlogLocalizedContent {
  const left = tool(locale, seed.leftSlug); const right = tool(locale, seed.rightSlug); const alternatives = seed.alternativeToolSlugs.map((slug) => tool(locale, slug)); const direct = compareLink(locale, seed.leftSlug, seed.rightSlug);
  if (locale === "tr") {
    return {
      title: `${left.name} vs ${right.name}: hangi kullan1mda hangisi daha mant1kl1?`,
      excerpt: `${left.name} ve ${right.name} aras1ndaki ger�ek workflow fark1n1, pricing sinyalini ve a�1lmas1 gereken sonraki sayfalar1 toplar.`,
      intro: `${left.name} ve ${right.name} arasinda karar verirken �nce g�rev farkini, sonra fiyat ve sinirlamalari okumak en temiz akistir.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `${left.name} vs ${right.name}: ger�ek farklar ve daha do�xru se�im | Deciply`,
      seoDescription: `${left.name} ve ${right.name} ara�lar1n1 fiyat, workflow uyumu ve ilgili alternatives sayfalar1yla kar�x1la�xt1r1n.`,
      sections: [
        section("H1zl1 karar �zeti", [`${left.name} genelde ${left.bestUseCase.toLowerCase()} taraf1nda, ${right.name} ise ${right.bestUseCase.toLowerCase()} taraf1nda �ne �1kar.`, `${direct} sayfas1 yan yana karar i�in en k1sa yoldur.`], { comparison: { title: "Yan yana bak1�x", items: [{ label: left.name, value: `${left.bestUseCase} " ${left.pricingLabel}` }, { label: right.name, value: `${right.bestUseCase} " ${right.pricingLabel}` }] } }),
        section("G��l� taraflar ve s1n1rlamalar", ["Ger�ek fark model tart1�xmas1ndan �ok, daha temiz �1kt1y1 hangi arac1n verdi�xidir."], { subSections: [sub(left.name, [`${left.shortDescription}`, `${toolLink(locale, left.slug)} ile art1 ve eksileri a�.`], [left.pros[0] ?? left.bestUseCase, left.cons[0] ?? left.pricingLabel], "Tool detay1", `/${locale}/tools/${left.slug}`), sub(right.name, [`${right.shortDescription}`, `${toolLink(locale, right.slug)} ile art1 ve eksileri a�.`], [right.pros[0] ?? right.bestUseCase, right.cons[0] ?? right.pricingLabel], "Tool detay1", `/${locale}/tools/${right.slug}`)] }),
        section("Daha geni�x karar ak1�x1", [`${alternatives.map((item) => alternativeLink(locale, item.slug)).join(", ")} sayfalar1 ba�xlam1 b�y�t�r.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} da workflow uyumunu g�sterir.` : "Sonraki en do�xru ad1m alternatives sayfas1d1r."}`])
      ]
    };
  }
  return {
    title: `${left.name} vs ${right.name}: which one fits better?`,
    excerpt: `A direct breakdown of the real workflow difference, pricing signal, and the next pages worth opening between ${left.name} and ${right.name}.`,
    intro: `The cleanest decision path is understanding how ${left.name} and ${right.name} split the workflow before opening the deeper pages.`,
    categoryLabel: categoryLabels[locale][seed.categorySlug],
    seoTitle: `${left.name} vs ${right.name}: real differences and better fit | Deciply`,
    seoDescription: `Compare ${left.name} and ${right.name} across pricing, workflow fit, and the alternatives pages worth checking next.`,
    sections: [
      section("Fast decision summary", [`${left.name} often fits ${left.bestUseCase.toLowerCase()}, while ${right.name} often feels stronger for ${right.bestUseCase.toLowerCase()}.`, `${direct} is the shortest path for a side-by-side decision.`], { comparison: { title: "Side-by-side snapshot", items: [{ label: left.name, value: `${left.bestUseCase} " ${left.pricingLabel}` }, { label: right.name, value: `${right.bestUseCase} " ${right.pricingLabel}` }] } }),
      section("Strengths and tradeoffs", ["The real difference is usually about which tool gives cleaner output with less friction for your job."], { subSections: [sub(left.name, [`${left.shortDescription}`, `Use ${toolLink(locale, left.slug)} to review strengths and limits.`], [left.pros[0] ?? left.bestUseCase, left.cons[0] ?? left.pricingLabel], "Open tool page", `/${locale}/tools/${left.slug}`), sub(right.name, [`${right.shortDescription}`, `Use ${toolLink(locale, right.slug)} to review strengths and limits.`], [right.pros[0] ?? right.bestUseCase, right.cons[0] ?? right.pricingLabel], "Open tool page", `/${locale}/tools/${right.slug}`)] }),
      section("Broader next steps", [`${alternatives.map((item) => alternativeLink(locale, item.slug)).join(", ")} add more context.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} also helps map workflow fit.` : "The next best step is opening the alternatives page."}`])
    ]
  };
}

function alternativesContent(locale: Locale, seed: Extract<Seed, { kind: "ALTERNATIVES" }>): BlogLocalizedContent {
  const primary = tool(locale, seed.primaryToolSlug); const alternatives = seed.alternativeToolSlugs.map((slug) => tool(locale, slug)); const firstCompare = compareLink(locale, seed.primaryToolSlug, alternatives[0].slug);
  if (locale === "tr") {
    return {
      title: `${primary.name} yerine bak1labilecek en mant1kl1 alternatifler`,
      excerpt: `${primary.name} yerine hangi araca bakman1n daha mant1kl1 olabilece�xini, g��l� farklar1 ve compare ak1�x1n1 g�sterir.`,
      intro: `${primary.name} yerine baska bir araca bakarken en �nemli konu, hangi adayin mevcut workflow s�rt�nmesini azalttigidir.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `${primary.name} alternatifleri: daha uygun se�enekler | Deciply`,
      seoDescription: `${primary.name} yerine bak1labilecek alternatifleri, fiyat sinyallerini ve ilgili comparison sayfalar1n1 inceleyin.`,
      sections: [
        section("Neden alternatif bak1l1r?", [`${primary.name} k�t� oldu�xu i�in de�xil, workflow uyumu de�xi�xti�xi i�in alternatif aran1r.`, `${alternatives.map((item) => toolLink(locale, item.slug)).join(", ")} en s1k a�1lan adaylard1r.`], { comparison: { title: "0lk adaylar", items: alternatives.map((item) => ({ label: item.name, value: `${item.bestUseCase} " ${item.pricingLabel}` })) } }),
        section("Hangi alternatif hangi bo�xlu�xu kapat1r?", ["En iyi alternatif en pop�ler olan de�xil, mevcut s�rt�nmeyi azaltand1r."], { subSections: alternatives.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfas1 pricing ve zay1f y�nleri birlikte g�sterir.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool detay1", `/${locale}/tools/${item.slug}`)) }),
        section("Bir sonraki sayfa", [`${firstCompare} �o�xu zaman en k1sa karar yoludur.`, `${seed.useCasePageSlugs?.[0] ? `${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} ile workflow uyumunu da kontrol et.` : `${alternativeLink(locale, seed.primaryToolSlug)} ile daha geni�x alternatif listesini a�.`}`])
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
      section("Why do users look for alternatives?", [`Users usually switch because workflow fit changes, not because ${primary.name} is universally bad.`, `${alternatives.map((item) => toolLink(locale, item.slug)).join(", ")} are common next candidates.`], { comparison: { title: "First candidates", items: alternatives.map((item) => ({ label: item.name, value: `${item.bestUseCase} " ${item.pricingLabel}` })) } }),
      section("Which alternative solves which gap?", ["The best alternative is the one that removes the friction in your current workflow."], { subSections: alternatives.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} shows pricing and tradeoffs in one place.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Open tool page", `/${locale}/tools/${item.slug}`)) }),
      section("What should you open next?", [`${firstCompare} is usually the fastest comparison path.`, `${seed.useCasePageSlugs?.[0] ? `Check ${buildUseCaseLink(locale, seed.useCasePageSlugs[0])} for workflow fit too.` : `Open ${alternativeLink(locale, seed.primaryToolSlug)} for the broader list.`}`])
    ]
  };
}

function buildUseCaseGuideContent(locale: Locale, seed: Extract<Seed, { kind: "USE_CASE_GUIDE" }>): BlogLocalizedContent {
  const items = seed.toolSlugs.map((slug) => tool(locale, slug)); const compareItems = seed.comparePairs.map((pair) => compareLink(locale, pair.leftSlug, pair.rightSlug));
  if (locale === "tr") {
    return {
      title: `${seed.useCasePageSlug === "content-creators" ? "0�erik �reticileri" : getUseCaseLabel(locale, seed.useCaseSlug)} i�in AI workflow rehberi`,
      excerpt: `Bu use-case i�in hangi arac1n hangi ad1mda yer almas1 gerekti�xini ve hangi compare sayfalar1n1n karar ak1�x1n1 h1zland1rd1�x1n1 g�sterir.`,
      intro: `${items.map((item) => item.name).join(", ")} gibi ara�lari g�rev bazli siralamak, tek ara�la her isi ��zmeye �alismaktan daha verimli olur.`,
      categoryLabel: categoryLabels[locale][seed.categorySlug],
      seoTitle: `${seed.useCasePageSlug === "content-creators" ? "0�erik �reticileri" : getUseCaseLabel(locale, seed.useCaseSlug)} i�in AI workflow rehberi | Deciply`,
      seoDescription: `Bu use-case i�in AI workflow'u, ara� s1ralamas1, compare linkleri ve ilgili tool sayfalar1yla birlikte inceleyin.`,
      sections: [
        section("Workflow �zeti", [`0yi bir ak1�x tek ara�tan de�xil, do�xru s1radan gelir.`, `${compareItems.join(", ")} kritik karar noktalar1n1 k1salt1r.`], { bullets: ["Ara�xt1rma veya fikir a�xamas1n1 netle�xtir", "�Sretim arac1n1 se�", "Paketleme ve yay1n ak1�x1n1 tamamla"] }),
        section("Bu ak1�xta hangi ara� ne yapar?", ["Her ara� daha dar bir g�revde daha net de�xer �retir."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} sayfas1 art1lar, eksiler ve alternatifleri g�sterir.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Tool sayfas1", `/${locale}/tools/${item.slug}`)) }),
        section("Sonraki t1klamalar", [`${compareItems.join(", ")} ile iki g��l� aday1 ay1r.`, `${seed.relatedArticleSlugs?.[0] ? `${blogLink(locale, seed.relatedArticleSlugs[0])} ile ba�xlam1 geni�xlet.` : `${alternativeLink(locale, items[0].slug)} ile alternatifleri a�.`}`])
      ]
    };
  }
  return {
    title: `AI workflow guide for ${seed.useCasePageSlug === "content-creators" ? "content creators" : getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()}`,
    excerpt: `A workflow-first guide showing which tool belongs in which step and which comparison pages shorten the decision.`,
    intro: `A better stack comes from assigning clearer jobs to tools like ${items.map((item) => item.name).join(", ")} instead of forcing one tool across every step.`,
    categoryLabel: categoryLabels[locale][seed.categorySlug],
    seoTitle: `AI workflow guide for ${seed.useCasePageSlug === "content-creators" ? "content creators" : getUseCaseLabel(locale, seed.useCaseSlug).toLowerCase()} | Deciply`,
    seoDescription: `Review a workflow-first AI stack for this use case, including tool order, comparison links, and the next pages worth opening.`,
    sections: [
      section("Workflow snapshot", [`A better stack comes from sequence, not from one tool doing everything.`, `${compareItems.join(", ")} shorten the biggest decision points.`], { bullets: ["Clarify research or ideation", "Choose the production tool", "Finish packaging and publishing"] }),
      section("What does each tool do here?", ["Each tool creates more value when its role is narrower and clearer."], { subSections: items.map((item) => sub(item.name, [`${item.shortDescription}`, `${toolLink(locale, item.slug)} shows strengths, weaknesses, and alternatives.`], [item.pros[0] ?? item.bestUseCase, item.cons[0] ?? item.pricingLabel], "Open tool page", `/${locale}/tools/${item.slug}`)) }),
      section("Next clicks", [`${compareItems.join(", ")} help separate close options.`, `${seed.relatedArticleSlugs?.[0] ? `Continue into ${blogLink(locale, seed.relatedArticleSlugs[0])} for more context.` : `Open ${alternativeLink(locale, items[0].slug)} for broader options.`}`])
    ]
  };
}

function buildEntry(seed: Seed): BlogEntry {
  if (seed.kind === "BEST_TOOLS") {
    return { slug: seed.slug, categorySlug: seed.categorySlug, publishDate: seed.publishDate, relatedToolSlugs: seed.toolSlugs, contentGraph: { kind: seed.kind, useCaseSlug: seed.useCaseSlug, comparePairs: seed.toolSlugs.length > 1 ? [{ leftSlug: seed.toolSlugs[0], rightSlug: seed.toolSlugs[1] }] : [], alternativeToolSlugs: seed.toolSlugs.slice(0, 2), useCasePageSlugs: [seed.useCasePageSlug], relatedArticleSlugs: seed.relatedArticleSlugs, keywords: [seed.useCaseSlug] }, locales: { tr: bestToolsContent("tr", seed), en: bestToolsContent("en", seed) } };
  }
  if (seed.kind === "TOOL_COMPARISON") {
    return { slug: seed.slug, categorySlug: seed.categorySlug, publishDate: seed.publishDate, relatedToolSlugs: [seed.leftSlug, seed.rightSlug, ...seed.alternativeToolSlugs], contentGraph: { kind: seed.kind, primaryToolSlug: seed.leftSlug, secondaryToolSlug: seed.rightSlug, comparePairs: [{ leftSlug: seed.leftSlug, rightSlug: seed.rightSlug }], alternativeToolSlugs: seed.alternativeToolSlugs, useCasePageSlugs: seed.useCasePageSlugs, relatedArticleSlugs: seed.relatedArticleSlugs, keywords: [seed.leftSlug, seed.rightSlug] }, locales: { tr: comparisonContent("tr", seed), en: comparisonContent("en", seed) } };
  }
  if (seed.kind === "ALTERNATIVES") {
    return { slug: seed.slug, categorySlug: seed.categorySlug, publishDate: seed.publishDate, relatedToolSlugs: [seed.primaryToolSlug, ...seed.alternativeToolSlugs], contentGraph: { kind: seed.kind, primaryToolSlug: seed.primaryToolSlug, alternativeToolSlugs: seed.alternativeToolSlugs, useCasePageSlugs: seed.useCasePageSlugs, relatedArticleSlugs: seed.relatedArticleSlugs, keywords: [seed.primaryToolSlug] }, locales: { tr: alternativesContent("tr", seed), en: alternativesContent("en", seed) } };
  }
  return { slug: seed.slug, categorySlug: seed.categorySlug, publishDate: seed.publishDate, relatedToolSlugs: seed.toolSlugs, contentGraph: { kind: seed.kind, useCaseSlug: seed.useCaseSlug, comparePairs: seed.comparePairs, alternativeToolSlugs: seed.toolSlugs.slice(0, 2), useCasePageSlugs: [seed.useCasePageSlug], relatedArticleSlugs: seed.relatedArticleSlugs, keywords: [seed.useCaseSlug] }, locales: { tr: buildUseCaseGuideContent("tr", seed), en: buildUseCaseGuideContent("en", seed) } };
}

const seeds: Seed[] = [
  { kind: "BEST_TOOLS", slug: "best-ai-tools-for-students-2026", publishDate: "2026-04-01", categorySlug: "ai-tools", useCaseSlug: "students", useCasePageSlug: "students", toolSlugs: ["chatgpt", "perplexity", "gemini", "notion-ai"], relatedArticleSlugs: ["best-ai-tools-for-beginners-2026"] },
  { kind: "TOOL_COMPARISON", slug: "chatgpt-vs-claude-for-writing", publishDate: "2026-04-01", categorySlug: "comparisons", leftSlug: "chatgpt", rightSlug: "claude", alternativeToolSlugs: ["gemini", "jasper"], useCasePageSlugs: ["freelancers"], relatedArticleSlugs: ["chatgpt-vs-claude-vs-gemini"] },
  { kind: "ALTERNATIVES", slug: "chatgpt-alternatives-2026", publishDate: "2026-04-01", categorySlug: "guides", primaryToolSlug: "chatgpt", alternativeToolSlugs: ["claude", "gemini", "perplexity"], useCasePageSlugs: ["freelancers"], relatedArticleSlugs: ["chatgpt-vs-claude-vs-gemini"] },
  { kind: "USE_CASE_GUIDE", slug: "ai-workflow-for-content-creators", publishDate: "2026-04-01", categorySlug: "guides", useCaseSlug: "content", useCasePageSlug: "content-creators", toolSlugs: ["chatgpt", "canva-ai", "runway", "notion-ai"], comparePairs: [{ leftSlug: "chatgpt", rightSlug: "claude" }, { leftSlug: "canva-ai", rightSlug: "midjourney" }], relatedArticleSlugs: ["best-ai-tools-for-beginners-2026"] }
];

export const generatedBlogArticles: BlogEntry[] = seeds.map(buildEntry);
