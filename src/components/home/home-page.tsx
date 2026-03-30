import { BlogCard } from "@/components/blog/blog-card";
import { CategoryCard } from "@/components/home/category-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { ComparisonTable } from "@/components/home/comparison-table";
import { ConversionListCard } from "@/components/home/conversion-list-card";
import { GuideCard } from "@/components/home/guide-card";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
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
import { getLocalizedTools } from "@/lib/catalog";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { toHomeToolCard } from "@/lib/tool-ui";

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

const sectionCopy = {
  tr: {
    selectorTitle: "Ne yapmak istiyorsun?",
    selectorOptions: [
      { label: "\u0130\u00e7erik yazmak", href: "#featured-tools" },
      { label: "G\u00f6rsel \u00fcretmek", href: "#category-tools" },
      { label: "Para kazanmak", href: "#money-tools" },
      { label: "Ara\u015ft\u0131rma yapmak", href: "#popular-tools" }
    ],
    topToolsEyebrow: "En \u00e7ok incelenenler",
    topToolsTitle: "Karar verirken en \u00e7ok a\u00e7\u0131lan AI ara\u00e7lar\u0131",
    topToolsDescription: "Kullan\u0131c\u0131lar\u0131n karar a\u015famas\u0131nda s\u0131k a\u00e7t\u0131\u011f\u0131 ara\u00e7lar\u0131 senaryo bazl\u0131 ve n\u00f6tr \u015fekilde g\u00f6r\u00fcn.",
    beginnersEyebrow: "Ba\u015flang\u0131\u00e7 odakl\u0131",
    beginnersTitle: "Yeni ba\u015flayanlar i\u00e7in AI ara\u00e7lar\u0131",
    beginnersDescription: "D\u00fc\u015f\u00fck s\u00fcrt\u00fcnme, daha anla\u015f\u0131l\u0131r kullan\u0131m ve h\u0131zl\u0131 ilk sonu\u00e7 arayanlar i\u00e7in uygun se\u00e7enekler.",
    freelancersEyebrow: "Servis odakl\u0131",
    freelancersTitle: "Freelancer'lar i\u00e7in AI ara\u00e7lar\u0131",
    freelancersDescription: "\u0130\u00e7erik, ara\u015ft\u0131rma, sunum ve g\u00f6rsel teslim s\u00fcre\u00e7lerinde zaman kazand\u0131rabilecek ara\u00e7lar\u0131 yan yana g\u00f6r\u00fcn.",
    moneyEyebrow: "Gelir odakl\u0131",
    moneyTitle: "Para kazanmak i\u00e7in AI ara\u00e7lar\u0131",
    moneyDescription: "\u0130\u00e7erik \u00fcretimi, g\u00f6rsel teslim, ara\u015ft\u0131rma ve paket hizmet senaryolar\u0131nda gelir \u00fcretmeye yard\u0131mc\u0131 olabilecek ara\u00e7lar.",
    latestPostsEyebrow: "Son i\u00e7erikler",
    latestPostsTitle: "En yeni blog yaz\u0131lar\u0131",
    latestPostsDescription: "Yeni yay\u0131nlanan rehberleri, kar\u015f\u0131la\u015ft\u0131rmalar\u0131 ve para odakl\u0131 i\u00e7erikleri ana sayfadan h\u0131zl\u0131ca a\u00e7\u0131n.",
    latestPostsViewAll: "T\u00fcm yaz\u0131lar\u0131 g\u00f6r",
    latestPostsReadMore: "Devam\u0131n\u0131 oku"
  },
  en: {
    selectorTitle: "What do you want to do?",
    selectorOptions: [
      { label: "Write content", href: "#featured-tools" },
      { label: "Generate images", href: "#category-tools" },
      { label: "Make money", href: "#money-tools" },
      { label: "Do research", href: "#popular-tools" }
    ],
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

function getToolsBySlugs(locale: Locale, slugs: string[]) {
  const map = new Map(getLocalizedTools(locale).map((tool) => [tool.slug, tool]));
  return slugs
    .map((slug) => map.get(slug))
    .filter((tool): tool is NonNullable<ReturnType<typeof map.get>> => Boolean(tool))
    .map((tool) => toHomeToolCard(locale, tool));
}

export function HomePage({ locale, content }: HomePageProps) {
  const ui = sectionCopy[locale];
  const featuredTools = getToolsBySlugs(locale, ["chatgpt", "claude", "midjourney", "gemini"]);
  const topTools = getToolsBySlugs(locale, ["chatgpt", "claude", "perplexity"]);
  const moneyTools = getToolsBySlugs(locale, ["jasper", "copy-ai", "canva-ai"]);
  const beginnerTools = getToolsBySlugs(locale, ["chatgpt", "gemini", "canva-ai"]);
  const freelancerTools = getToolsBySlugs(locale, ["chatgpt", "claude", "midjourney"]);
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

        <AnimatedSection delay={0.06}>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.hotTools.map((item) => (
                <div key={item.title} className="h-full">
                  <ConversionListCard locale={locale} item={item} />
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





