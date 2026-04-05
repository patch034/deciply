import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { InfoSection } from "@/components/catalog/info-section";
import { ProsConsCard } from "@/components/catalog/pros-cons-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { ToolCard } from "@/components/catalog/tool-card";
import { ComparisonFaq } from "@/components/comparison/comparison-faq";
import { ComparisonThreeWayTable } from "@/components/comparison/comparison-three-way-table";
import { ComparisonActionGrid } from "@/components/comparison/comparison-action-grid";
import { ComparisonInsightPanel } from "@/components/comparison/comparison-insight-panel";
import { SectionShell } from "@/components/ui/section-shell";
import { RatingBadge } from "@/components/ui/rating-badge";
import { SectionJumpNav } from "@/components/ui/section-jump-nav";
import { tripleComparisonContent, type ComparisonFaqItem } from "@/data/comparisons";
import { buildComparisonPath, getComparisonRelatedBlogSlugsForSlugs } from "@/lib/comparisons";
import { getLocalizedBlogArticleBySlug } from "@/lib/blog";
import { formatPricing, getCatalogContent, getCategoryNamesMap } from "@/lib/catalog";
import type { Locale } from "@/i18n/config";
import type { LocalizedTool } from "@/types/catalog";

type ComparisonThreeWayRow = {
  label: string;
  first: string;
  second: string;
  third: string;
};

type ComparisonTriplePageProps = {
  locale: Locale;
  tools: [LocalizedTool, LocalizedTool, LocalizedTool];
  canonicalSlug: string;
  comparisonRows: ComparisonThreeWayRow[];
  faqItems: ComparisonFaqItem[];
  alternatives: LocalizedTool[];
  title: string;
  description: string;
};

function getBestReferenceTool(alternative: LocalizedTool, tools: [LocalizedTool, LocalizedTool, LocalizedTool]) {
  return tools.reduce((best, candidate) => {
    const bestScore =
      best.toolCategorySlugs.filter((slug) => alternative.toolCategorySlugs.includes(slug)).length +
      best.useCaseSlugs.filter((slug) => alternative.useCaseSlugs.includes(slug)).length;
    const candidateScore =
      candidate.toolCategorySlugs.filter((slug) => alternative.toolCategorySlugs.includes(slug)).length +
      candidate.useCaseSlugs.filter((slug) => alternative.useCaseSlugs.includes(slug)).length;

    return candidateScore > bestScore ? candidate : best;
  }, tools[0]);
}

export function ComparisonTriplePage({
  locale,
  tools,
  canonicalSlug,
  comparisonRows,
  faqItems,
  alternatives,
  title,
  description
}: ComparisonTriplePageProps) {
  const dictionary = tripleComparisonContent[locale];
  const content = getCatalogContent(locale);
  const categoryNamesMap = getCategoryNamesMap(locale);
  const [firstTool, secondTool, thirdTool] = tools;
  const relatedBlogArticles = getComparisonRelatedBlogSlugsForSlugs([firstTool.slug, secondTool.slug, thirdTool.slug], 3)
    .map((slug) => getLocalizedBlogArticleBySlug(locale, slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));

  const relatedAlternativePages = tools.map((tool) => ({
    label: locale === "tr" ? `${tool.name} alternatifleri` : `${tool.name} alternatives`,
    href: `/${locale}/alternatives/${tool.slug}`
  }));
  const sectionNavItems = [
    { label: locale === "tr" ? "Genel Bakış" : "Overview", href: "#genel-bakis" },
    { label: locale === "tr" ? "Özellikler" : "Features", href: "#ozellikler" },
    { label: locale === "tr" ? "Fiyat" : "Pricing", href: "#fiyat" },
    { label: locale === "tr" ? "Son Karar" : "Final verdict", href: "#son-karar" },
    { label: locale === "tr" ? "Alternatifler" : "Alternatives", href: "#alternatifler" },
    { label: locale === "tr" ? "FAQ" : "FAQ", href: "#faq" }
  ];
  const insightSlides = [
    {
      eyebrow: locale === "tr" ? "Hızlı karar" : "Quick decision",
      title: locale === "tr" ? "Hangi araç daha rahat başlatıyor?" : "Which tool starts faster?",
      description:
        locale === "tr"
          ? `${firstTool.name}, ${secondTool.name} ve ${thirdTool.name} arasında kısa taslak ve uzun form akışları farklı sonuçlar üretir.`
          : `Among ${firstTool.name}, ${secondTool.name}, and ${thirdTool.name}, short drafts and long-form workflows can lead to very different results.`,
      badges: [`${firstTool.name} ${firstTool.rating.toFixed(1)}/5`, `${secondTool.name} ${secondTool.rating.toFixed(1)}/5`, `${thirdTool.name} ${thirdTool.rating.toFixed(1)}/5`]
    },
    {
      eyebrow: locale === "tr" ? "Fiyat sinyali" : "Pricing signal",
      title: locale === "tr" ? "Ücretsiz başlangıç mı, ücretli derinlik mi?" : "Free start or paid depth?",
      description:
        locale === "tr"
          ? `${firstTool.name}, ${secondTool.name} ve ${thirdTool.name} için fiyat modeli; deneme, freemium ve ücretli plan dengesini gösterir.`
          : `For ${firstTool.name}, ${secondTool.name}, and ${thirdTool.name}, pricing often signals how far the free start goes and where paid depth matters.`,
      badges: [formatPricing(firstTool.pricing, locale), formatPricing(secondTool.pricing, locale), formatPricing(thirdTool.pricing, locale)]
    },
    {
      eyebrow: locale === "tr" ? "Workflow uyumu" : "Workflow fit",
      title: locale === "tr" ? "Hangi iş akışı hangi araca daha yakın?" : "Which workflow fits which tool?",
      description:
        locale === "tr"
          ? `${firstTool.bestUseCase}, ${secondTool.bestUseCase} ve ${thirdTool.bestUseCase} arasındaki farkı önce çıktı tipiyle sonra revizyon yüküyle okuyun.`
          : `Compare ${firstTool.bestUseCase}, ${secondTool.bestUseCase}, and ${thirdTool.bestUseCase} by output type first, then by revision load.`,
      badges: [firstTool.bestUseCase, secondTool.bestUseCase, thirdTool.bestUseCase]
    }
  ];
  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Breadcrumb
          items={[
            { label: locale === "tr" ? "Ana sayfa" : "Home", href: `/${locale}` },
            { label: locale === "tr" ? "Araçlar" : "Tools", href: `/${locale}/tools` },
            { label: locale === "tr" ? "Karşılaştırmalar" : "Comparisons", href: `/${locale}/compare/${canonicalSlug}` }
          ]}
        />

        <section className="rounded-[36px] border border-slate-700/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(17,24,39,0.92),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(34,211,238,0.2)] lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                {dictionary.eyebrow}
              </Badge>
              <div className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge key={tool.slug} variant="accent">
                    {tool.name}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.5rem] lg:leading-[1.03]">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">{dictionary.summary}</p>
            </div>

            <div className="rounded-[32px] border border-slate-700/60 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <RatingBadge key={tool.slug} rating={tool.rating} className="shrink-0" />
                ))}
              </div>
              <ComparisonActionGrid
                locale={locale}
                tools={tools.map((tool) => ({
                  name: tool.name,
                  openHref: tool.websiteUrl,
                  reviewHref: `/${locale}/tools/${tool.slug}`
                }))}
                neutralHref={`/${locale}/categories/comparisons`}
                className="mt-5"
              />
            </div>
          </div>
        </section>

        <ComparisonThreeWayTable
          locale={locale}
          title={dictionary.tableTitle}
          description={dictionary.tableDescription}
          columns={{
            label: locale === "tr" ? "Kriter" : "Criteria",
            first: firstTool.name,
            second: secondTool.name,
            third: thirdTool.name
          }}
          rows={comparisonRows}
        />

        <InfoSection id="son-karar" title={dictionary.selectionTitle} description={dictionary.selectionDescription}>
          <div className="grid gap-4 md:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-100">{tool.bestUseCase}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{tool.whoShouldUseSummary}</p>
                <div className="mt-5">
                  <PremiumButton href={`/${locale}/tools/${tool.slug}`} variant="secondary" className="w-full">
                    {locale === "tr" ? tool.name + " incele" : "Review " + tool.name}
                  </PremiumButton>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection id="fiyat" title={dictionary.pricingTitle} description={dictionary.pricingDescription}>
          <div className="grid gap-4 md:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5 shadow-[0_16px_48px_-30px_rgba(34,211,238,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                <p className="mt-3 text-lg font-semibold text-slate-100">{formatPricing(tool.pricing, locale)}</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-[20px] border border-slate-700/60 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === "tr" ? "Ücretsiz başlangıç" : "Free start"}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{tool.pricing === "PAID" ? (locale === "tr" ? "Doğrudan ücretli giriş gerektirir." : "Starts as a paid product.") : (locale === "tr" ? "Ücretsiz veya freemium giriş sunar." : "Offers a free or freemium starting point.")}</p>
                  </div>
                  <div className="rounded-[20px] border border-slate-700/60 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{locale === "tr" ? "Ticari kullanım" : "Commercial fit"}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{tool.moneyUseCases[0]?.description ?? tool.realUseCaseExample.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection id="ozellikler" title={dictionary.strengthsTitle} description={dictionary.strengthsDescription}>
          <div className="grid gap-6 lg:grid-cols-3">
            {tools.map((tool) => (
              <ProsConsCard key={tool.slug} title={`${tool.name} ${dictionary.strengthsTitle.toLowerCase()}`} items={tool.pros} tone="positive" />
            ))}
          </div>
        </InfoSection>

        <InfoSection id="sinirlamalar" title={dictionary.limitationsTitle} description={dictionary.limitationsDescription}>
          <div className="grid gap-6 lg:grid-cols-3">
            {tools.map((tool) => (
              <ProsConsCard key={tool.slug} title={`${tool.name} ${dictionary.limitationsTitle.toLowerCase()}`} items={tool.cons} tone="negative" />
            ))}
          </div>
        </InfoSection>

        <section id="son-karar" className="scroll-mt-24 rounded-[34px] border border-slate-700/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{dictionary.verdictTitle}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{dictionary.verdictTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{dictionary.verdictDescription}</p>
            </div>
            <ComparisonActionGrid
              locale={locale}
              tools={tools.map((tool) => ({
                name: tool.name,
                openHref: tool.websiteUrl,
                reviewHref: `/${locale}/tools/${tool.slug}`
              }))}
              neutralHref={`/${locale}/categories/comparisons`}
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5">
                <p className="text-sm font-semibold text-slate-100">{tool.name}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-50">{tool.bestUseCase}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{tool.realUseCaseExample.description}</p>
              </div>
            ))}
          </div>
        </section>

        {alternatives.length ? (
          <InfoSection id="alternatifler" title={dictionary.relatedTitle} description={dictionary.relatedDescription}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {alternatives.map((tool) => {
                const referenceTool = getBestReferenceTool(tool, tools);

                return (
                  <ToolCard
                    key={tool.slug}
                    locale={locale}
                    tool={tool}
                    categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
                    pricingLabel={formatPricing(tool.pricing, locale)}
                    detailLabel={content.common.viewDetailsLabel}
                    bestForLabel={locale === "tr" ? "En uygun" : "Best fit"}
                    useCaseLabel={tool.bestUseCase}
                    compareHref={buildComparisonPath(locale, tool.slug, referenceTool.slug)}
                  />
                );
              })}
            </div>
          </InfoSection>
        ) : null}

        {relatedBlogArticles.length ? (
          <SectionShell
            eyebrow={locale === "tr" ? "İlgili bloglar" : "Related blog posts"}
            title={locale === "tr" ? "İlgili bloglar" : "Related blog posts"}
            description={locale === "tr" ? "Bu üçlü karşılaştırmayı daha geniş bir içerik kümesiyle destekleyin." : "Use these guides to widen the decision context around this three-way comparison."}
            className="px-0 sm:px-0 lg:px-0"
            contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {relatedBlogArticles.map((article) => (
              <BlogCard
                key={article.slug}
                locale={locale}
                article={article}
                ctaLabel={locale === "tr" ? "Rehberi oku" : "Read guide"}
              />
            ))}
          </SectionShell>
        ) : null}

        <SectionShell
          eyebrow={locale === "tr" ? "İlgili alternatifler" : "Related alternatives"}
          title={locale === "tr" ? "İlgili alternatifler" : "Related alternatives"}
          description={locale === "tr" ? "Bu üçlü karşılaştırmadan sonra ilgili alternatif sayfalarını da açın." : "Review the related alternatives pages after this three-way comparison."}
          className="px-0 sm:px-0 lg:px-0"
          contentClassName="grid gap-4 md:grid-cols-3"
        >
          {relatedAlternativePages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              <p className="text-sm font-semibold text-cyan-300">{item.label}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {locale === "tr" ? "Alternatifleri ve kullanım alanlarını ayrı sayfada görün." : "Review alternatives and workflow fit on a dedicated page."}
              </p>
            </Link>
          ))}
        </SectionShell>

        <ComparisonFaq title={locale === "tr" ? "Sık sorulan sorular" : "FAQ"} description={locale === "tr" ? "Bu üç aracı seçmeden önce en sık sorulan karar sorularına kısa cevaplar." : "Short answers to the most common decision questions before you choose one of the tools."} items={faqItems} />

        <section className="rounded-[36px] border border-slate-700/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-5 py-8 text-white shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/85">{locale === "tr" ? "Son adım" : "Final step"}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{locale === "tr" ? "Bir aracı aç ve kendi akışında test et" : "Open one tool and test it in your own workflow"}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{locale === "tr" ? "En doğru sonraki adım, netleştirdiğin aracı açıp gerçek iş akışında denemektir." : "The best next step is to open the tool that fits best and test it in a real workflow."}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {tools.map((tool) => (
                <PremiumButton key={tool.slug} href={`/${locale}/tools/${tool.slug}`} className="w-full" variant="secondary">
                  {tool.name}
                </PremiumButton>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}





















