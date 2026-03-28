import { CategoryCard } from "@/components/home/category-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { ComparisonTable } from "@/components/home/comparison-table";
import { ConversionListCard } from "@/components/home/conversion-list-card";
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
import { toHomeToolCard } from "@/lib/tool-ui";

type HomePageProps = {
  locale: Locale;
  content: HomeContent;
};

const sectionCopy = {
  tr: {
    selectorTitle: "Ne yapmak istiyorsun?",
    selectorOptions: [
      { label: "İçerik yazmak", href: "#featured-tools" },
      { label: "Görsel üretmek", href: "#category-tools" },
      { label: "Para kazanmak", href: "#money-tools" },
      { label: "Araştırma yapmak", href: "#popular-tools" }
    ],
    topToolsEyebrow: "Popüler kullanım senaryolarına göre",
    topToolsTitle: "En çok tercih edilen AI araçları",
    topToolsDescription: "Karar vermeyi kolaylaştırmak için sık incelenen araçları nötr ve senaryo bazlı şekilde görün.",
    beginnersEyebrow: "Başlangıç odaklı",
    beginnersTitle: "Yeni başlayanlar için AI araçları",
    beginnersDescription: "Düşük sürtünme, daha anlaşılır kullanım ve hızlı ilk sonuç arayan kullanıcılar için uygun seçenekler.",
    freelancersEyebrow: "Servis odaklı",
    freelancersTitle: "Freelancer'lar için AI araçları",
    freelancersDescription: "İçerik, araştırma, sunum ve görsel teslim süreçlerinde zaman kazandırabilecek araçları yan yana görün.",
    moneyEyebrow: "Gelir odaklı",
    moneyTitle: "AI tools for making money",
    moneyDescription: "İçerik üretimi, görsel teslim, araştırma ve paket hizmet senaryolarında gelir üretmeye yardımcı olabilecek araçlar."
  },
  en: {
    selectorTitle: "What do you want to do?",
    selectorOptions: [
      { label: "Write content", href: "#featured-tools" },
      { label: "Generate images", href: "#category-tools" },
      { label: "Make money", href: "#money-tools" },
      { label: "Do research", href: "#popular-tools" }
    ],
    topToolsEyebrow: "By popular use cases",
    topToolsTitle: "Most reviewed AI tools",
    topToolsDescription: "Review frequently opened tools in a neutral, scenario-based format that helps decisions happen faster.",
    beginnersEyebrow: "Easy start",
    beginnersTitle: "AI tools for beginners",
    beginnersDescription: "Useful options for people who want low-friction onboarding and fast first wins.",
    freelancersEyebrow: "Freelance workflows",
    freelancersTitle: "AI tools for freelancers",
    freelancersDescription: "See tools that can reduce time spent on content, research, presentation, and visual delivery work.",
    moneyEyebrow: "Revenue-focused",
    moneyTitle: "AI tools for making money",
    moneyDescription: "Tools that can support monetization through content, design delivery, research, and service packaging workflows."
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

  return (
    <div className="relative pb-20">
      <HeroSection locale={locale} content={content.hero} />

      <div className="mt-8 px-6 md:mt-10">
        <GlassPanel className="mx-auto flex max-w-[1200px] flex-col gap-4 rounded-2xl px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">{ui.selectorTitle}</p>
          <div className="flex flex-wrap gap-2">
            {ui.selectorOptions.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex h-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-slate-200 transition duration-150 hover:border-cyan-400/25 hover:text-cyan-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
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
            <GlassPanel className="ui-card-strong overflow-hidden rounded-2xl px-6 py-8">
              <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div className="max-w-2xl min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {content.sections.socialProof.eyebrow}
                  </p>
                  <h2 className="balance-text mt-4 text-[2rem] font-bold tracking-[-0.03em] text-slate-50 md:text-[2.25rem] md:leading-[1.08]">
                    {content.sections.socialProof.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300/86 md:text-[1.05rem] md:leading-8">
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

        <AnimatedSection delay={0.26}>
          <SectionShell className="section-tint-cyan">
            <div className="ui-card-strong overflow-hidden rounded-2xl px-6 py-8 text-white">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/85">
                    {content.sections.finalCta.eyebrow}
                  </p>
                  <h2 className="balance-text mt-4 text-[2rem] font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.08]">
                    {content.sections.finalCta.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300/88 md:text-[1.05rem] md:leading-8">
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




