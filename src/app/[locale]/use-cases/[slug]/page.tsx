import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { InfoSection } from "@/components/catalog/info-section";
import { ToolCard } from "@/components/catalog/tool-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale, normalizeLocale } from "@/i18n/config";
import { getBlogCopy } from "@/lib/blog";
import { formatPricing, getCatalogContent, getCategoryNamesMap } from "@/lib/catalog";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";
import {
  buildUseCasePath,
  getSafeComparisonPath,
  getUseCaseBlogGuides,
  getUseCasePage,
  getUseCaseTools
} from "@/lib/intent-pages";

export const revalidate = 3600;
export const dynamicParams = true;

const copy = {
  tr: {
    breadcrumbsHome: "Ana sayfa",
    breadcrumbsUseCases: "Use-case sayfalari",
    bestToolsTitle: "Bu use-case icin en iyi araclar",
    bestToolsDescription: "Kartlardaki tool detay ve compare cikislariyla daha hizli karar verebilirsiniz.",
    compareTitle: "Karsilastirma linkleri",
    compareDescription: "Ayni use-case icindeki en kritik araclari yan yana acip farklari netlestirin.",
    guidesTitle: "Blog rehberleri",
    guidesDescription: "Use-case kararini guclendirmek icin ilgili rehber ve karsilastirma iceriklerine gecin.",
    bestForLabel: "En uygun"
  },
  en: {
    breadcrumbsHome: "Home",
    breadcrumbsUseCases: "Use-case pages",
    bestToolsTitle: "Best tools for this use case",
    bestToolsDescription: "Use the detail and compare links on each card to narrow the decision faster.",
    compareTitle: "Comparison links",
    compareDescription: "Open the most relevant tool comparisons inside this use case and make the decision more concrete.",
    guidesTitle: "Blog guides",
    guidesDescription: "Use these guides to build more confidence before choosing a tool or workflow.",
    bestForLabel: "Best fit"
  }
} as const;

const copyByLocale = Object.fromEntries(
  locales.map((itemLocale) => [itemLocale, localizeTree(itemLocale, copy[getContentBaseLocale(itemLocale)])])
) as Record<Locale, (typeof copy)["tr"]>;

function buildUseCaseTitle(locale: Locale, title: string) {
  return locale === "tr" ? `${title} (2026)` : `${title} (2026)`;
}

function buildUseCaseDescription(locale: Locale, title: string, tools: string[]) {
  const toolNames = tools.slice(0, 3).join(locale === "tr" ? ", " : ", ");

  return locale === "tr"
    ? `${title} icin en mantıklı AI araclarini, compare linklerini ve rehber iceriklerini inceleyin: ${toolNames}.`
    : `Review the best AI tools, comparison links, and supporting guides for ${title}: ${toolNames}.`;
}

function buildWorkflowDescriptions(locale: Locale, stepLabels: [string, string, string], toolNames: string[]) {
  const [first, second, third] = toolNames;

  if (locale === "tr") {
    return [
      `${stepLabels[0]} asamasinda ${first ?? "ilk araci"} ile baslayip hedef ciktinin cercevesini daha hizli kurabilirsiniz.`,
      `${stepLabels[1]} adiminda ${second ?? first ?? "ikinci araci"} ile ana uretimi hizlandirmak daha mantıklı olabilir.`,
      `${stepLabels[2]} bolumunde ${third ?? second ?? first ?? "son araci"} ile son kontrolu veya teslim akisina gecmek daha duzenli bir sonuc verir.`
    ];
  }

  return [
    `During ${stepLabels[0].toLowerCase()}, starting with ${first ?? "the first tool"} can help structure the outcome faster.`,
    `For ${stepLabels[1].toLowerCase()}, ${second ?? first ?? "the next tool"} may be the stronger option for main production work.`,
    `In ${stepLabels[2].toLowerCase()}, using ${third ?? second ?? first ?? "the final tool"} can make the output easier to review, polish, or deliver.`
  ];
}

function buildWhyItFits(locale: Locale, toolName: string, bestUseCase: string, summary: string) {
  return locale === "tr"
    ? `${toolName}, ${bestUseCase.toLowerCase()} tarafinda daha guclu oldugu icin bu use-case icinde mantıklı bir adaydir. ${summary}`
    : `${toolName} is a strong candidate here because it fits ${bestUseCase.toLowerCase()} particularly well. ${summary}`;
}

function getUseCaseCompareLinks(locale: Locale, selectedTools: ReturnType<typeof getUseCaseTools>) {
  const links: { href: string; label: string }[] = [];

  for (let index = 0; index < selectedTools.length; index += 1) {
    for (let candidateIndex = index + 1; candidateIndex < selectedTools.length; candidateIndex += 1) {
      const left = selectedTools[index];
      const right = selectedTools[candidateIndex];
      const href = getSafeComparisonPath(locale, left.slug, right.slug);

      if (!href) {
        continue;
      }

      links.push({
        href,
        label: `${left.name} vs ${right.name}`
      });

      if (links.length >= 4) {
        return links;
      }
    }
  }

  return links;
}

// Do not generate all combinations. This project must not exceed safe static route limits.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const page = getUseCasePage(safeLocale, slug);

  if (!page) {
    return {};
  }

  const tools = getUseCaseTools(safeLocale, slug, 4);
  const title = buildUseCaseTitle(safeLocale, page.title);
  const description = buildUseCaseDescription(safeLocale, page.title, tools.map((item) => item.name));
  const canonicalPath = buildUseCasePath(safeLocale, slug);
  const alternatesPath = `/use-cases/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(alternatesPath)
    },
    openGraph: {
      type: "website",
      url: buildCanonicalUrl(canonicalPath),
      title,
      description
    }
  };
}

export default async function UseCasePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = normalizeLocale(locale);
  const dictionary = copyByLocale[safeLocale];
  const content = getCatalogContent(safeLocale);
  const blogCopy = getBlogCopy(safeLocale);
  const page = getUseCasePage(safeLocale, slug);

  if (!page) {
    notFound();
  }

  const selectedTools = getUseCaseTools(safeLocale, slug, 6);
  const compareLinks = getUseCaseCompareLinks(safeLocale, selectedTools.slice(0, 4));
  const guides = getUseCaseBlogGuides(safeLocale, slug, 3);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const workflowDescriptions = buildWorkflowDescriptions(safeLocale, page.workflowSteps, selectedTools.map((item) => item.name));
  const title = buildUseCaseTitle(safeLocale, page.title);
  const description = buildUseCaseDescription(safeLocale, page.title, selectedTools.map((item) => item.name));
  const canonicalUrl = buildCanonicalUrl(buildUseCasePath(safeLocale, slug));
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
        name: dictionary.breadcrumbsUseCases,
        item: canonicalUrl
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: canonicalUrl
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 overflow-x-clip bg-[linear-gradient(180deg,#f8fbff_0%,#f4f7fb_46%,#eef3f8_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: dictionary.breadcrumbsHome, href: `/${safeLocale}` },
            { label: dictionary.breadcrumbsUseCases },
            { label: page.title }
          ]}
        />

        <section className="rounded-[36px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                {page.eyebrow}
              </Badge>
              <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.5rem] lg:leading-[1.03]">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{page.intro}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">{page.description}</p>
            </div>

            <div className="rounded-[28px] border border-sky-400/10 bg-slate-950/50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">{dictionary.bestToolsTitle}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedTools.slice(0, 3).map((item) => (
                  <Badge key={item.slug} variant="ghost">
                    {item.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionShell title={dictionary.bestToolsTitle} description={dictionary.bestToolsDescription}>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {selectedTools.map((toolItem) => {
              const compareHref = selectedTools
                .filter((candidate) => candidate.slug !== toolItem.slug)
                .map((candidate) => getSafeComparisonPath(safeLocale, toolItem.slug, candidate.slug))
                .find((item): item is string => Boolean(item));

              return (
                <ToolCard
                  key={toolItem.slug}
                  locale={safeLocale}
                  tool={toolItem}
                  categoryNames={toolItem.categorySlugs.map((slugItem) => categoryNamesMap.get(slugItem) ?? slugItem)}
                  pricingLabel={formatPricing(toolItem.pricing, safeLocale)}
                  detailLabel={content.common.viewDetailsLabel}
                  bestForLabel={dictionary.bestForLabel}
                  useCaseLabel={toolItem.bestUseCase}
                  compareHref={compareHref}
                />
              );
            })}
          </div>
        </SectionShell>

        <InfoSection title={page.whyTitle} description={page.whyDescription}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {selectedTools.slice(0, 6).map((toolItem) => (
              <div key={toolItem.slug} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
                <p className="text-sm font-semibold text-cyan-300">{toolItem.name}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {buildWhyItFits(safeLocale, toolItem.name, toolItem.bestUseCase, toolItem.whoShouldUseSummary)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="accent">{formatPricing(toolItem.pricing, safeLocale)}</Badge>
                  <Badge>{toolItem.bestUseCase}</Badge>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title={page.workflowTitle} description={page.workflowDescription}>
          <div className="grid gap-4 md:grid-cols-3">
            {page.workflowSteps.map((stepLabel, index) => (
              <div key={stepLabel} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">0{index + 1}</p>
                <p className="mt-3 text-base font-semibold text-slate-100">{stepLabel}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{workflowDescriptions[index]}</p>
              </div>
            ))}
          </div>
        </InfoSection>

        {compareLinks.length ? (
          <InfoSection title={dictionary.compareTitle} description={dictionary.compareDescription}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {compareLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 text-sm font-semibold leading-7 text-slate-100 transition hover:border-cyan-400/18 hover:text-cyan-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </InfoSection>
        ) : null}

        {guides.length ? (
          <SectionShell
            eyebrow={blogCopy.blogLabel}
            title={dictionary.guidesTitle}
            description={dictionary.guidesDescription}
            className="px-0 sm:px-0 lg:px-0"
            contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {guides.map((article) => (
              <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={blogCopy.readMoreLabel} />
            ))}
          </SectionShell>
        ) : null}

        <section className="rounded-[34px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{page.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{page.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{page.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PremiumButton href={`/${safeLocale}/tools`}>{content.common.viewDetailsLabel}</PremiumButton>
              {selectedTools[0] ? (
                <PremiumButton href={`/${safeLocale}/tools/${selectedTools[0].slug}`} variant="secondary">
                  {selectedTools[0].name}
                </PremiumButton>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
