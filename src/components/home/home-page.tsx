import { BlogCard } from "@/components/blog/blog-card";
import { CategoryCard } from "@/components/home/category-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { ComparisonTable } from "@/components/home/comparison-table";
import { GuideCard } from "@/components/home/guide-card";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { TopPickSection } from "@/components/home/top-pick-section";
import { ToolCard } from "@/components/home/tool-card";
import { WhyToolNovaSection } from "@/components/home/why-toolnova-section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { StatBadge } from "@/components/ui/stat-badge";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { formatPricing, getLocalizedTools } from "@/lib/catalog";
import { buildComparisonPath } from "@/lib/comparisons";
import { buildAlternativesPath, buildUseCasePath, getUseCasePage } from "@/lib/intent-pages";
import { toHomeToolCard } from "@/lib/tool-ui";
import type { CategoryCard as HomeCategoryCard, ComparisonCard as HomeComparisonCard } from "@/types/home";
import type { LocalizedTool } from "@/types/catalog";

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

const sectionCopy = {
  tr: {
    selectorTitle: "Öne çıkan yollar",
    selectorOptions: [
      { label: "Compare", href: "#featured-comparisons" },
      { label: "Alternatifler", href: "#top-alternatives" },
      { label: "Use-case", href: "#use-case-paths" },
      { label: "Editör seçimleri", href: "#editor-picks" },
      { label: "Top tool'lar", href: "#featured-tools" }
    ],
    featuredComparisonsEyebrow: "Conversion odaklı compare sayfaları",
    featuredComparisonsTitle: "Karar niyeti yüksek compare sayfalarına hızlı geçiş",
    featuredComparisonsDescription: "Kullanıcıları doğrudan en güçlü karşılaştırma sayfalarına yönlendirerek homepage'i daha iyi bir dağıtım katmanına dönüştürün.",
    featuredComparisonsAction: "Tüm karşılaştırmaları gör",
    featuredComparisonsLinkLabel: "Karşılaştırmayı aç",
    alternativesEyebrow: "Alternatif sayfaları",
    alternativesTitle: "Yüksek niyetli alternatif aramalarını doğru sayfalara yönlendirin",
    alternativesDescription: "Araç bazlı alternatives sayfaları kullanıcıyı hem benzer seçeneklere hem compare ve tool detaylarına taşır.",
    alternativesAction: "Araç dizinine git",
    alternativesLinkLabel: "Alternatifleri gör",
    useCasesEyebrow: "Use-case SEO yolları",
    useCasesTitle: "En iyi araçları kullanım senaryosuna göre açın",
    useCasesDescription: "Öğrenci, freelancer, içerik üreticisi ve ekip odaklı use-case sayfaları homepage'den güçlü iç link akışı almalı.",
    useCasesAction: "Use-case sayfalarını aç",
    useCasesLinkLabel: "Use-case sayfasını aç",
    editorPicksEyebrow: "Editör seçimleri",
    editorPicksTitle: "Top rated ve karar aşamasında en çok açılan araçlar",
    editorPicksDescription: "Affiliate dönüşüm için güçlü görünen, yüksek puanlı ve discovery aşamasında sık açılan araçları burada öne çıkarın.",
    editorPicksAction: "Tüm araçları gör",
    topToolsEyebrow: "En çok incelenenler",
    topToolsTitle: "Karar verirken en çok açılan AI araçları",
    topToolsDescription: "Kullanıcıların karar aşamasında sık açtığı araçları senaryo bazlı ve nötr şekilde görün.",
    beginnersEyebrow: "Başlangıç odaklı",
    beginnersTitle: "Yeni başlayanlar için AI araçları",
    beginnersDescription: "Düşük sürtünme, daha anlaşılır kullanım ve hızlı ilk sonuç arayanlar için uygun seçenekler.",
    freelancersEyebrow: "Servis odaklı",
    freelancersTitle: "Freelancer'lar için AI araçları",
    freelancersDescription: "İçerik, araştırma, sunum ve görsel teslim süreçlerinde zaman kazandırabilecek araçları yan yana görün.",
    moneyEyebrow: "Gelir odaklı",
    moneyTitle: "Para kazanmak için AI araçları",
    moneyDescription: "İçerik üretimi, görsel teslim, araştırma ve paket hizmet senaryolarında gelir üretmeye yardımcı olabilecek araçlar.",
    latestPostsEyebrow: "Son içerikler",
    latestPostsTitle: "En yeni blog yazıları",
    latestPostsDescription: "Yeni yayınlanan rehberleri, karşılaştırmaları ve para odaklı içerikleri ana sayfadan hızlıca açın.",
    latestPostsViewAll: "Tüm yazıları gör",
    latestPostsReadMore: "Devamını oku"
  },
  en: {
    selectorTitle: "Fast paths",
    selectorOptions: [
      { label: "Compare", href: "#featured-comparisons" },
      { label: "Alternatives", href: "#top-alternatives" },
      { label: "Use cases", href: "#use-case-paths" },
      { label: "Editor picks", href: "#editor-picks" },
      { label: "Top tools", href: "#featured-tools" }
    ],
    featuredComparisonsEyebrow: "High-intent compare pages",
    featuredComparisonsTitle: "Send users into the comparison pages closest to the decision",
    featuredComparisonsDescription: "These pages are built to capture direct comparison intent and move users deeper into tool and affiliate paths.",
    featuredComparisonsAction: "View all comparisons",
    featuredComparisonsLinkLabel: "Open comparison",
    alternativesEyebrow: "Alternatives pages",
    alternativesTitle: "Distribute alternative-intent traffic into stronger decision paths",
    alternativesDescription: "Tool-specific alternatives pages give users a cleaner next step into tools, comparisons, and affiliate-driven decisions.",
    alternativesAction: "Browse all tools",
    alternativesLinkLabel: "See alternatives",
    useCasesEyebrow: "Use-case SEO paths",
    useCasesTitle: "Open the best tools by real user scenario",
    useCasesDescription: "Student, freelancer, creator, and team-focused use-case pages should receive strong homepage internal links.",
    useCasesAction: "Open use-case pages",
    useCasesLinkLabel: "Open use case",
    editorPicksEyebrow: "Editor picks",
    editorPicksTitle: "Top-rated tools people open most while deciding",
    editorPicksDescription: "Highlight the strongest conversion candidates by mixing rating, feature depth, and real discovery demand.",
    editorPicksAction: "View all tools",
    topToolsEyebrow: "Most explored",
    topToolsTitle: "AI tools people open most while deciding",
    topToolsDescription: "Review the tools users open most often during discovery in a neutral, scenario-based layout.",
    beginnersEyebrow: "Easy start",
    beginnersTitle: "AI tools for beginners",
    beginnersDescription: "Useful options for people who want low-friction onboarding and fast first wins.",
    freelancersEyebrow: "Freelance workflows",
    freelancersTitle: "AI tools for freelancers",
    freelancersDescription: "See tools that can reduce time spent on content, research, presentation, and visual delivery work.",
    moneyEyebrow: "Revenue focused",
    moneyTitle: "AI tools for making money",
    moneyDescription: "Tools that can support monetization through content, design delivery, research, and service packaging workflows.",
    latestPostsEyebrow: "Latest posts",
    latestPostsTitle: "Latest blog posts",
    latestPostsDescription: "Open the newest guides, comparisons, and monetization-focused articles directly from the homepage.",
    latestPostsViewAll: "View all articles",
    latestPostsReadMore: "Read more"
  }
} as const;

function buildToolMap(locale: Locale) {
  return new Map(getLocalizedTools(locale).map((tool) => [tool.slug, tool]));
}

function getToolsBySlugs(toolMap: Map<string, LocalizedTool>, locale: Locale, slugs: string[]) {
  return slugs
    .map((slug) => toolMap.get(slug))
    .filter((tool): tool is LocalizedTool => Boolean(tool))
    .map((tool) => toHomeToolCard(locale, tool));
}

function buildFeaturedComparisonCards(locale: Locale, toolMap: Map<string, LocalizedTool>): HomeComparisonCard[] {
  const pairs: Array<[string, string, string]> = [
    ["chatgpt", "claude", locale === "tr" ? "Yazi" : "Writing"],
    ["chatgpt", "gemini", locale === "tr" ? "Genel kullanim" : "General"],
    ["midjourney", "adobe-firefly", locale === "tr" ? "G?rsel" : "Visual"]
  ];

  return pairs.reduce<HomeComparisonCard[]>((items, [leftSlug, rightSlug, highlight]) => {
    const left = toolMap.get(leftSlug);
    const right = toolMap.get(rightSlug);

    if (!left || !right) {
      return items;
    }

    items.push({
      icon: "VS",
      eyebrow: locale === "tr" ? "?ne ?ikan compare" : "Featured compare",
      title: `${left.name} vs ${right.name}`,
      description:
        locale === "tr"
          ? `${left.name} ve ${right.name} i?in fiyat, g??l? y?nler ve hangi workflow'da daha mantikli olduklarini hizlica g?r?n.`
          : `Compare ${left.name} and ${right.name} across pricing, strengths, and which workflow each tool fits better.`,
      href: buildComparisonPath(locale, left.slug, right.slug),
      highlight
    });

    return items;
  }, []);
}

function buildAlternativeCards(locale: Locale, toolMap: Map<string, LocalizedTool>): HomeComparisonCard[] {
  const toolSlugs = ["chatgpt", "midjourney", "notion-ai"];

  return toolSlugs
    .map((slug) => toolMap.get(slug))
    .filter((tool): tool is LocalizedTool => Boolean(tool))
    .map((tool) => ({
      icon: "ALT",
      eyebrow: locale === "tr" ? "Alternatifler" : "Alternatives",
      title: locale === "tr" ? `${tool.name} alternatifleri` : `Alternatives to ${tool.name}`,
      description:
        locale === "tr"
          ? `${tool.name} yerine bakılabilecek araçları, compare sayfalarını ve en mantıklı kullanım alanlarını tek hub içinde görün.`
          : `Review the strongest alternatives to ${tool.name}, then move into comparison pages and tool details from one hub.`,
      href: buildAlternativesPath(locale, tool.slug),
      highlight: tool.name
    } satisfies HomeComparisonCard));
}

function buildUseCaseCards(locale: Locale): HomeCategoryCard[] {
  const items = [
    { slug: "students", icon: "ST", metric: locale === "tr" ? "Öğrenci" : "Student" },
    { slug: "freelancers", icon: "FR", metric: locale === "tr" ? "Freelance" : "Freelance" },
    { slug: "content-creators", icon: "CR", metric: locale === "tr" ? "İçerik" : "Content" },
    { slug: "business-teams", icon: "TM", metric: locale === "tr" ? "Ekip" : "Teams" }
  ];

  return items
    .map((item) => {
      const page = getUseCasePage(locale, item.slug);

      if (!page) {
        return null;
      }

      return {
        icon: item.icon,
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        href: buildUseCasePath(locale, item.slug),
        metric: item.metric,
        bestFor: page.intro
      } satisfies HomeCategoryCard;
    })
    .filter((item): item is HomeCategoryCard => item !== null);
}

function getEditorPickTools(toolMap: Map<string, LocalizedTool>, locale: Locale) {
  return [...toolMap.values()]
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }

      if (left.rating !== right.rating) {
        return right.rating - left.rating;
      }

      return left.slug.localeCompare(right.slug);
    })
    .slice(0, 4)
    .map((tool) => toHomeToolCard(locale, tool));
}

export function HomePage({ locale, content }: HomePageProps) {
  const ui = sectionCopy[locale];
  const toolMap = buildToolMap(locale);
  const featuredTools = getToolsBySlugs(toolMap, locale, ["chatgpt", "claude", "midjourney", "gemini"]);
  const topTools = getToolsBySlugs(toolMap, locale, ["chatgpt", "claude", "perplexity"]);
  const trendingTools = getToolsBySlugs(toolMap, locale, ["chatgpt", "claude", "perplexity", "midjourney"]);
  const moneyTools = getToolsBySlugs(toolMap, locale, ["jasper", "copy-ai", "canva-ai"]);
  const beginnerTools = getToolsBySlugs(toolMap, locale, ["chatgpt", "gemini", "canva-ai"]);
  const freelancerTools = getToolsBySlugs(toolMap, locale, ["chatgpt", "claude", "midjourney"]);
  const editorPicks = getEditorPickTools(toolMap, locale);
  const featuredComparisons = buildFeaturedComparisonCards(locale, toolMap);
  const alternativeCards = buildAlternativeCards(locale, toolMap);
  const useCaseCards = buildUseCaseCards(locale);
  const latestArticles = getLocalizedBlogArticles(locale).slice(0, 4);

  return (
    <div className="relative overflow-x-clip pb-16 sm:pb-20">
      <HeroSection locale={locale} content={content.hero} />

      <div className="mt-6 px-4 sm:mt-8 sm:px-6 md:mt-10">
        <GlassPanel className="mx-auto flex max-w-[1200px] flex-col gap-4 rounded-2xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">{ui.selectorTitle}</p>
          <div className="flex flex-wrap gap-2">
            {ui.selectorOptions.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-slate-200 transition duration-150 hover:border-cyan-400/25 hover:text-cyan-200 sm:w-auto"
              >
                {item.label}
              </a>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="mt-12 space-y-12 md:mt-20 md:space-y-20">
        <AnimatedSection delay={0.02}>
          <TopPickSection locale={locale} content={content.topPick} />
        </AnimatedSection>

        {content.highIntentCards.length > 0 ? (
          <AnimatedSection delay={0.04}>
            <SectionShell
              className="section-tint-violet"
              eyebrow={content.sections.highIntent.eyebrow}
              title={content.sections.highIntent.title}
              description={content.sections.highIntent.description}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {content.highIntentCards.slice(0, 3).map((item) => (
                  <div key={item.title} className="h-full">
                    <ComparisonCard locale={locale} item={item} linkLabel={content.sections.highIntent.linkLabel} featured />
                  </div>
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        ) : null}

        <div id="featured-comparisons" className="scroll-mt-28">
          <AnimatedSection delay={0.05}>
            <SectionShell
              className="section-tint-cyan"
              eyebrow={ui.featuredComparisonsEyebrow}
              title={ui.featuredComparisonsTitle}
              description={ui.featuredComparisonsDescription}
              actions={
                <PremiumButton href={`/${locale}/categories/comparisons`} variant="secondary">
                  {ui.featuredComparisonsAction}
                </PremiumButton>
              }
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredComparisons.map((item) => (
                  <div key={item.href} className="h-full">
                    <ComparisonCard locale={locale} item={item} linkLabel={ui.featuredComparisonsLinkLabel} featured />
                  </div>
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        <div id="top-alternatives" className="scroll-mt-28">
          <AnimatedSection delay={0.055}>
            <SectionShell
              className="section-tint-violet"
              eyebrow={ui.alternativesEyebrow}
              title={ui.alternativesTitle}
              description={ui.alternativesDescription}
              actions={
                <PremiumButton href={`/${locale}/tools`} variant="secondary">
                  {ui.alternativesAction}
                </PremiumButton>
              }
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {alternativeCards.map((item) => (
                  <div key={item.href} className="h-full">
                    <ComparisonCard locale={locale} item={item} linkLabel={ui.alternativesLinkLabel} />
                  </div>
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        <div id="use-case-paths" className="scroll-mt-28">
          <AnimatedSection delay={0.06}>
            <SectionShell
              className="section-tint-cyan"
              eyebrow={ui.useCasesEyebrow}
              title={ui.useCasesTitle}
              description={ui.useCasesDescription}
              actions={
                <PremiumButton href={`/${locale}/use-cases/students`} variant="secondary">
                  {ui.useCasesAction}
                </PremiumButton>
              }
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {useCaseCards.map((item) => (
                  <CategoryCard key={item.href} locale={locale} category={item} linkLabel={ui.useCasesLinkLabel} />
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.07}>
          <SectionShell className="section-tint-cyan">
            <GlassPanel className="ui-card-strong overflow-hidden rounded-2xl px-4 py-6 sm:px-6 sm:py-8">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div className="max-w-2xl min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {content.sections.socialProof.eyebrow}
                  </p>
                  <h2 className="balance-text mt-4 text-[1.75rem] font-bold tracking-[-0.03em] text-slate-50 md:text-[2.25rem] md:leading-[1.08]">
                    {content.sections.socialProof.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-300/86 md:text-[1.05rem] md:leading-8">
                    {content.sections.socialProof.description}
                  </p>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {content.socialProofStats.map((item) => (
                    <StatBadge key={item.label} value={item.value} label={item.label} />
                  ))}
                </dl>
              </div>
            </GlassPanel>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <WhyToolNovaSection locale={locale} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <HowItWorksSection locale={locale} />
        </AnimatedSection>

        <div id="editor-picks" className="scroll-mt-28">
          <AnimatedSection delay={0.11}>
            <SectionShell
              className="section-tint-violet"
              eyebrow={ui.editorPicksEyebrow}
              title={ui.editorPicksTitle}
              description={ui.editorPicksDescription}
              actions={
                <PremiumButton href={`/${locale}/tools`} variant="secondary">
                  {ui.editorPicksAction}
                </PremiumButton>
              }
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {editorPicks.map((tool) => (
                  <div key={tool.name} className="h-full">
                    <ToolCard
                      locale={locale}
                      tool={tool}
                      detailLabel={content.sections.tools.detailLabel}
                      tryLabel={content.sections.tools.tryLabel}
                      bestForLabel={content.sections.tools.bestForLabel}
                      ratingLabel={content.sections.tools.ratingLabel}
                    />
                  </div>
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        <div id="featured-tools" className="scroll-mt-28">
          <AnimatedSection delay={0.12}>
            <SectionShell
              className="section-tint-violet"
              eyebrow={content.sections.tools.eyebrow}
              title={content.sections.tools.title}
              description={content.sections.tools.description}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredTools.map((tool) => (
                  <div key={tool.name} className="h-full">
                    <ToolCard
                      locale={locale}
                      tool={tool}
                      detailLabel={content.sections.tools.detailLabel}
                      tryLabel={content.sections.tools.tryLabel}
                      bestForLabel={content.sections.tools.bestForLabel}
                      ratingLabel={content.sections.tools.ratingLabel}
                    />
                  </div>
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.13}>
          <SectionShell
            className="section-tint-cyan"
            eyebrow={content.sections.hotTools.eyebrow}
            title={content.sections.hotTools.title}
            description={content.sections.hotTools.description}
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {trendingTools.map((tool) => (
                <div key={tool.name} className="h-full">
                  <ToolCard
                    locale={locale}
                    tool={tool}
                    detailLabel={content.sections.tools.detailLabel}
                    tryLabel={content.sections.tools.tryLabel}
                    bestForLabel={content.sections.tools.bestForLabel}
                    ratingLabel={content.sections.tools.ratingLabel}
                  />
                </div>
              ))}
            </div>
          </SectionShell>
        </AnimatedSection>

        <div id="popular-tools" className="scroll-mt-28">
          <AnimatedSection delay={0.14}>
            <SectionShell
              className="section-tint-cyan"
              eyebrow={ui.topToolsEyebrow}
              title={ui.topToolsTitle}
              description={ui.topToolsDescription}
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {topTools.map((tool) => (
                  <div key={tool.name} className="h-full">
                    <ToolCard
                      locale={locale}
                      tool={tool}
                      detailLabel={content.sections.tools.detailLabel}
                      tryLabel={content.sections.tools.tryLabel}
                      bestForLabel={content.sections.tools.bestForLabel}
                      ratingLabel={content.sections.tools.ratingLabel}
                    />
                  </div>
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        <div id="money-tools" className="scroll-mt-28">
          <AnimatedSection delay={0.16}>
            <SectionShell className="section-tint-violet" eyebrow={ui.moneyEyebrow} title={ui.moneyTitle} description={ui.moneyDescription}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {moneyTools.map((tool) => (
                  <div key={tool.name} className="h-full">
                    <ToolCard
                      locale={locale}
                      tool={tool}
                      detailLabel={content.sections.tools.detailLabel}
                      tryLabel={content.sections.tools.tryLabel}
                      bestForLabel={content.sections.tools.bestForLabel}
                      ratingLabel={content.sections.tools.ratingLabel}
                    />
                  </div>
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.18}>
          <SectionShell className="section-tint-cyan" eyebrow={ui.beginnersEyebrow} title={ui.beginnersTitle} description={ui.beginnersDescription}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {beginnerTools.map((tool) => (
                <div key={tool.name} className="h-full">
                  <ToolCard
                    locale={locale}
                    tool={tool}
                    detailLabel={content.sections.tools.detailLabel}
                    tryLabel={content.sections.tools.tryLabel}
                    bestForLabel={content.sections.tools.bestForLabel}
                    ratingLabel={content.sections.tools.ratingLabel}
                  />
                </div>
              ))}
            </div>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <SectionShell className="section-tint-violet" eyebrow={ui.freelancersEyebrow} title={ui.freelancersTitle} description={ui.freelancersDescription}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {freelancerTools.map((tool) => (
                <div key={tool.name} className="h-full">
                  <ToolCard
                    locale={locale}
                    tool={tool}
                    detailLabel={content.sections.tools.detailLabel}
                    tryLabel={content.sections.tools.tryLabel}
                    bestForLabel={content.sections.tools.bestForLabel}
                    ratingLabel={content.sections.tools.ratingLabel}
                  />
                </div>
              ))}
            </div>
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.22}>
          <SectionShell className="section-tint-cyan">
            <ComparisonTable
              locale={locale}
              tools={featuredTools}
              eyebrow={content.sections.comparisons.eyebrow}
              title={content.sections.comparisons.title}
              description={content.sections.comparisons.description}
              columns={content.sections.comparisons.columns}
              actionLabel={content.sections.comparisons.actionLabel}
            />
          </SectionShell>
        </AnimatedSection>

        <div id="category-tools" className="scroll-mt-28">
          <AnimatedSection delay={0.24}>
            <SectionShell
              className="section-tint-violet"
              eyebrow={content.sections.categories.eyebrow}
              title={content.sections.categories.title}
              description={content.sections.categories.description}
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {content.categories.map((category) => (
                  <CategoryCard
                    key={category.title}
                    locale={locale}
                    category={category}
                    linkLabel={content.sections.categories.linkLabel}
                  />
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        </div>

        {content.guides.length ? (
          <AnimatedSection delay={0.25}>
            <SectionShell
              className="section-tint-cyan"
              eyebrow={content.sections.guides.eyebrow}
              title={content.sections.guides.title}
              description={content.sections.guides.description}
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {content.guides.map((item) => (
                  <GuideCard key={item.href} locale={locale} item={item} linkLabel={content.sections.guides.linkLabel} />
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        ) : null}

        {latestArticles.length ? (
          <AnimatedSection delay={0.255}>
            <SectionShell
              className="section-tint-violet"
              eyebrow={ui.latestPostsEyebrow}
              title={ui.latestPostsTitle}
              description={ui.latestPostsDescription}
              actions={
                <PremiumButton href={`/${locale}/blog`} variant="secondary">
                  {ui.latestPostsViewAll}
                </PremiumButton>
              }
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {latestArticles.map((article) => (
                  <BlogCard key={article.slug} locale={locale} article={article} ctaLabel={ui.latestPostsReadMore} />
                ))}
              </div>
            </SectionShell>
          </AnimatedSection>
        ) : null}

        <AnimatedSection delay={0.257}>
          <SectionShell
            className="section-tint-cyan"
            eyebrow={content.sections.newsletter.eyebrow}
            title={content.sections.newsletter.title}
            description={content.sections.newsletter.description}
          >
            <NewsletterForm
              locale={locale}
              inputLabel={content.sections.newsletter.inputLabel}
              placeholder={content.sections.newsletter.placeholder}
              buttonLabel={content.sections.newsletter.buttonLabel}
              disclaimer={content.sections.newsletter.disclaimer}
            />
          </SectionShell>
        </AnimatedSection>

        <AnimatedSection delay={0.26}>
          <SectionShell className="section-tint-cyan">
            <div className="ui-card-strong overflow-hidden rounded-2xl px-4 py-6 text-white sm:px-6 sm:py-8">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/85">
                    {content.sections.finalCta.eyebrow}
                  </p>
                  <h2 className="balance-text mt-4 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.08]">
                    {content.sections.finalCta.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-300/88 md:text-[1.05rem] md:leading-8">
                    {content.sections.finalCta.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-cyan-200/92">{content.sections.finalCta.urgencyNote}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <PremiumButton href={`/${locale}/categories`} variant="secondary">
                    {content.sections.finalCta.primaryCta}
                  </PremiumButton>
                  <PremiumButton href={`/${locale}/tools`}>
                    {content.sections.finalCta.secondaryCta}
                  </PremiumButton>
                </div>
              </div>
            </div>
          </SectionShell>
        </AnimatedSection>
      </div>
    </div>
  );
}