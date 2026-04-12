import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { InfoSection } from "@/components/catalog/info-section";
import { ProsConsCard } from "@/components/catalog/pros-cons-card";
import { ToolCard } from "@/components/catalog/tool-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import { getBlogCopy, getRelatedArticlesByTool } from "@/lib/blog";
import { getCatalogContent, formatPricing, getCategoryNamesMap, getLocalizedToolBySlug } from "@/lib/catalog";
import { buildComparisonPath, getComparisonTargetTools } from "@/lib/comparisons";
import {
  buildAlternativesPath,
  getAlternativeTargetTools,
  getSafeComparisonPath,
  getStaticAlternativeSlugs
} from "@/lib/intent-pages";

const copy = {
  tr: {
    breadcrumbsHome: "Ana sayfa",
    breadcrumbsTools: "Araçlar",
    breadcrumbsAlternatives: "Alternatifler",
    eyebrow: "Alternatif sayfası",
    shortIntro: "Bu sayfa, aynı işi farklı şekilde çözebilen alternatif araçları daha hızlı değerlendirmeniz için hazırlandı.",
    topAlternativesTitle: "Öne çıkan alternatif araçlar",
    topAlternativesDescription: "Benzer kategori, kullanım alanı ve karar bağlamına göre en mantıklı alternatifleri burada görebilirsiniz.",
    bestForTitle: "Hangi alternatif hangi iş için daha iyi?",
    bestForDescription: "Araçların en mantıklı olduğu kullanım senaryosunu ve kullanıcı profilini hızlıca karşılaştırın.",
    pricingTitle: "Fiyat karşılaştırması",
    pricingDescription: "ccretsiz başlama noktası, ticari kullanım ve kısa değer önerisini aynı bölümde görün.",
    strengthsTitle: "Güçlü yönler",
    strengthsDescription: "Mevcut araç ile en güçlü alternatif arasında hangi tarafların öne çıktığını görün.",
    weaknessesTitle: "Zayıf yönler",
    weaknessesDescription: "Karar vermeden önce sürtünme yaratabilecek noktaları netleştirin.",
    compareTitle: "Karşılaştırmaya geç",
    compareDescription: "Kararı daha da netleştirmek için aşağıdaki comparison sayfalarına gidin.",
    finalTitle: "Son öneri",
    finalDescription: "Hedefiniz hız, fiyat veya teslim kalitesi olabilir. Doğru karar bunu en hızlı destekleyen araca göre verilmelidir.",
    stayWith: "Ne zaman mevcut araçta kalmalı?",
    switchTo: "Ne zaman alternatife geçmeli?",
    compareButton: "Karşılaştırmayı aç",
    bestForLabel: "En uygun",
    relatedGuidesTitle: "İlgili rehberler",
    relatedGuidesDescription: "Bu aracı seçmeden önce benzer rehberler üzerinden karar çerçevesini güçlendirin."
  },
  en: {
    breadcrumbsHome: "Home",
    breadcrumbsTools: "Tools",
    breadcrumbsAlternatives: "Alternatives",
    eyebrow: "Alternatives page",
    shortIntro: "This page is built to help you review tools that solve a similar problem in a different way.",
    topAlternativesTitle: "Top alternative tools",
    topAlternativesDescription: "These alternatives are ranked by similar category fit, use cases, and likely decision context.",
    bestForTitle: "Which alternative fits which job best?",
    bestForDescription: "Quickly compare the workflow where each tool makes the most sense and the users it fits best.",
    pricingTitle: "Pricing comparison",
    pricingDescription: "Review free-entry potential, commercial fit, and short value positioning in one section.",
    strengthsTitle: "Strengths",
    strengthsDescription: "See what stands out most between the current tool and the strongest nearby alternative.",
    weaknessesTitle: "Weaknesses",
    weaknessesDescription: "Clarify the trade-offs before switching tools or staying with the current one.",
    compareTitle: "Open comparison pages",
    compareDescription: "Use these compare pages when you want the decision to become even more concrete.",
    finalTitle: "Final recommendation",
    finalDescription: "The better choice depends on whether you value speed, pricing flexibility, or output quality most.",
    stayWith: "When should you stay with the current tool?",
    switchTo: "When should you switch to the alternative?",
    compareButton: "Open comparison",
    bestForLabel: "Best fit",
    relatedGuidesTitle: "Related guides",
    relatedGuidesDescription: "Use these guides to tighten the decision before you click through to a tool."
  }
} as const;

function buildAlternativesTitle(locale: Locale, toolName: string) {
  return locale === "tr"
    ? `${toolName} alternatifleri (2026)`
    : `${toolName} Alternatives (2026)`;
}

function buildAlternativesDescription(locale: Locale, toolName: string, alternatives: string[]) {
  const alternativeText = alternatives.slice(0, 3).join(locale === "tr" ? ", " : ", ");

  return locale === "tr"
    ? `${toolName} için fiyat, güçlü yönler, karşılaştırma linkleri ve en mantıklı alternatifleri inceleyin: ${alternativeText}.`
    : `Review ${toolName} alternatives across pricing, strengths, compare links, and best-fit workflows: ${alternativeText}.`;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getStaticAlternativeSlugs().map((tool) => ({
      locale,
      tool
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; tool: string }>;
}): Promise<Metadata> {
  const { locale, tool } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;
  const currentTool = getLocalizedToolBySlug(safeLocale, tool);

  if (!currentTool) {
    return {};
  }

  const alternatives = getAlternativeTargetTools(safeLocale, tool, 3);
  const title = buildAlternativesTitle(safeLocale, currentTool.name);
  const description = buildAlternativesDescription(
    safeLocale,
    currentTool.name,
    alternatives.map((item) => item.name)
  );
  const canonicalPath = buildAlternativesPath(safeLocale, tool);

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(canonicalPath)
    },
    openGraph: {
      type: "website",
      url: buildCanonicalUrl(canonicalPath),
      title,
      description
    }
  };
}

export default async function AlternativesPage({
  params
}: {
  params: Promise<{ locale: string; tool: string }>;
}) {
  const { locale, tool } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const dictionary = copy[safeLocale];
  const content = getCatalogContent(safeLocale);
  const blogCopy = getBlogCopy(safeLocale);
  const currentTool = getLocalizedToolBySlug(safeLocale, tool);

  if (!currentTool) {
    notFound();
  }

  const alternatives = getAlternativeTargetTools(safeLocale, tool, 4);
  const comparisonTargets = getComparisonTargetTools(safeLocale, tool, 4);
  const relatedGuides = getRelatedArticlesByTool(safeLocale, tool, 3);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const bestAlternative = alternatives[0];
  const pricingTools = [currentTool, ...alternatives.slice(0, 3)];
  const title = buildAlternativesTitle(safeLocale, currentTool.name);
  const description = buildAlternativesDescription(safeLocale, currentTool.name, alternatives.map((item) => item.name));
  const canonicalUrl = buildCanonicalUrl(buildAlternativesPath(safeLocale, tool));
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dictionary.breadcrumbsHome,
        item: `https://deciply.com/${safeLocale}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dictionary.breadcrumbsTools,
        item: `https://deciply.com/${safeLocale}/tools`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl
      }
    ]
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: alternatives.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonicalUrl(`/${safeLocale}/tools/${item.slug}`),
      name: item.name
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: dictionary.breadcrumbsHome, href: `/${safeLocale}` },
            { label: dictionary.breadcrumbsTools, href: `/${safeLocale}/tools` },
            { label: dictionary.breadcrumbsAlternatives }
          ]}
        />

        <section className="rounded-[36px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                {dictionary.eyebrow}
              </Badge>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="accent">{formatPricing(currentTool.pricing, safeLocale)}</Badge>
                <Badge>{currentTool.name}</Badge>
                {currentTool.useCaseSlugs.slice(0, 2).map((item) => (
                  <Badge key={item} variant="ghost">
                    {item}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.5rem] lg:leading-[1.03]">
                {safeLocale === "tr" ? `${currentTool.name} alternatifleri` : `${currentTool.name} alternatives`}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{currentTool.shortDescription}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">{dictionary.shortIntro}</p>
            </div>

            <div className="rounded-[28px] border border-sky-400/10 bg-slate-950/50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{dictionary.finalTitle}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PremiumButton href={`/${safeLocale}/tools/${currentTool.slug}`}>{content.common.viewDetailsLabel}</PremiumButton>
                {bestAlternative ? (
                  <PremiumButton href={`/${safeLocale}/tools/${bestAlternative.slug}`} variant="secondary">
                    {bestAlternative.name}
                  </PremiumButton>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <SectionShell
          eyebrow={dictionary.eyebrow}
          title={dictionary.topAlternativesTitle}
          description={dictionary.topAlternativesDescription}
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {alternatives.map((item) => (
              <ToolCard
                key={item.slug}
                locale={safeLocale}
                tool={item}
                categoryNames={item.categorySlugs.map((slugItem) => categoryNamesMap.get(slugItem) ?? slugItem)}
                pricingLabel={formatPricing(item.pricing, safeLocale)}
                detailLabel={content.common.viewDetailsLabel}
                bestForLabel={dictionary.bestForLabel}
                useCaseLabel={item.bestUseCase}
                compareHref={getSafeComparisonPath(safeLocale, currentTool.slug, item.slug)}
              />
            ))}
          </div>
        </SectionShell>

        <InfoSection title={dictionary.bestForTitle} description={dictionary.bestForDescription}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {alternatives.map((item) => (
              <div key={item.slug} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
                <p className="text-sm font-semibold text-cyan-300">{item.name}</p>
                <p className="mt-3 text-base font-semibold text-slate-100">{item.bestUseCase}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.whoShouldUseSummary}</p>
                <Link
                  href={`/${safeLocale}/tools/${item.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  {content.common.viewDetailsLabel}
                </Link>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title={dictionary.pricingTitle} description={dictionary.pricingDescription}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricingTools.map((item) => (
              <div key={item.slug} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
                <p className="text-sm font-semibold text-cyan-300">{item.name}</p>
                <p className="mt-3 text-lg font-semibold text-slate-100">{formatPricing(item.pricing, safeLocale)}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.whatItActuallyDoes}</p>
              </div>
            ))}
          </div>
        </InfoSection>

        {bestAlternative ? (
          <>
            <SectionShell title={dictionary.strengthsTitle} description={dictionary.strengthsDescription} className="px-0 sm:px-0 lg:px-0">
              <div className="grid gap-6 lg:grid-cols-2">
                <ProsConsCard title={`${currentTool.name} ${dictionary.strengthsTitle.toLowerCase()}`} items={currentTool.pros} tone="positive" />
                <ProsConsCard title={`${bestAlternative.name} ${dictionary.strengthsTitle.toLowerCase()}`} items={bestAlternative.pros} tone="positive" />
              </div>
            </SectionShell>

            <SectionShell title={dictionary.weaknessesTitle} description={dictionary.weaknessesDescription} className="px-0 sm:px-0 lg:px-0">
              <div className="grid gap-6 lg:grid-cols-2">
                <ProsConsCard title={`${currentTool.name} ${dictionary.weaknessesTitle.toLowerCase()}`} items={currentTool.cons} tone="negative" />
                <ProsConsCard title={`${bestAlternative.name} ${dictionary.weaknessesTitle.toLowerCase()}`} items={bestAlternative.cons} tone="negative" />
              </div>
            </SectionShell>
          </>
        ) : null}

        {comparisonTargets.length ? (
          <InfoSection title={dictionary.compareTitle} description={dictionary.compareDescription}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparisonTargets.map((item) => (
                <Link
                  key={item.slug}
                  href={buildComparisonPath(safeLocale, currentTool.slug, item.slug)}
                  className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 text-sm font-semibold leading-7 text-slate-100 transition hover:border-cyan-400/18 hover:text-cyan-300"
                >
                  {currentTool.name} vs {item.name}
                </Link>
              ))}
            </div>
          </InfoSection>
        ) : null}

        {bestAlternative ? (
          <section className="rounded-[34px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
                <p className="text-sm font-semibold text-slate-100">{dictionary.stayWith}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{currentTool.whoShouldUseSummary}</p>
                <div className="mt-5">
                  <PremiumButton href={`/${safeLocale}/tools/${currentTool.slug}`} className="w-full">
                    {currentTool.name}
                  </PremiumButton>
                </div>
              </div>
              <div className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
                <p className="text-sm font-semibold text-slate-100">{dictionary.switchTo}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{bestAlternative.whoShouldUseSummary}</p>
                <div className="mt-5 flex flex-col gap-3">
                  <PremiumButton href={`/${safeLocale}/tools/${bestAlternative.slug}`} className="w-full">
                    {bestAlternative.name}
                  </PremiumButton>
                  {getSafeComparisonPath(safeLocale, currentTool.slug, bestAlternative.slug) ? (
                    <PremiumButton
                      href={getSafeComparisonPath(safeLocale, currentTool.slug, bestAlternative.slug) ?? `/${safeLocale}/tools/${bestAlternative.slug}`}
                      variant="secondary"
                      className="w-full"
                    >
                      {dictionary.compareButton}
                    </PremiumButton>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {relatedGuides.length ? (
          <SectionShell
            eyebrow={blogCopy.blogLabel}
            title={dictionary.relatedGuidesTitle}
            description={dictionary.relatedGuidesDescription}
            className="px-0 sm:px-0 lg:px-0"
            contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {relatedGuides.map((article) => (
              <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={blogCopy.readMoreLabel} />
            ))}
          </SectionShell>
        ) : null}
      </div>
    </>
  );
}


