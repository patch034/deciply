import { BlogCard } from "@/components/blog/blog-card";
import { CategoryCard } from "@/components/home/category-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { DiscoveryToolCard } from "@/components/home/discovery-tool-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getLocalizedBlogArticles } from "@/lib/blog";
import { getLocalizedTools } from "@/lib/catalog";
import type { ComparisonCard as HomeComparisonCard, ToolCard as HomeToolCard } from "@/types/home";
import type { Locale } from "@/i18n/config";
import type { CategoryCard as HomeCategoryCard } from "@/types/home";

type HomeBoostSectionsProps = {
  locale: Locale;
  comparisonCards: HomeComparisonCard[];
  popularTools: HomeToolCard[];
  categories: { icon: string; title: string; description: string; href: string; eyebrow: string; metric: string; bestFor: string }[];
};

type SectionCopy = {
  featuredToolsEyebrow: string;
  featuredToolsTitle: string;
  featuredToolsDescription: string;
  featuredToolsAction: string;
  categoriesEyebrow: string;
  categoriesTitle: string;
  categoriesDescription: string;
  categoriesAction: string;
  comparisonsEyebrow: string;
  comparisonsTitle: string;
  comparisonsDescription: string;
  comparisonsAction: string;
  guidesEyebrow: string;
  guidesTitle: string;
  guidesDescription: string;
  guidesAction: string;
  discoverMoreEyebrow: string;
  discoverMoreTitle: string;
  discoverMoreDescription: string;
  discoverMoreAction: string;
  discoverMoreLinkLabel: string;
  topicLinkLabel: string;
  comparisonLinkLabel: string;
  blogLinkLabel: string;
};

const sectionCopy: Record<Locale, SectionCopy> = {
  tr: {
    featuredToolsEyebrow: "Keşif akışı",
    featuredToolsTitle: "İnsanların en çok açtığı AI araçları",
    featuredToolsDescription: "Öne çıkan araçları logo, fiyat modeli, kısa özet ve kullanım ipuçlarıyla hızlıca tarayın.",
    featuredToolsAction: "Tüm araçlar",
    categoriesEyebrow: "Kategoriler",
    categoriesTitle: "Kategoriye göre keşfet",
    categoriesDescription: "Yazı, görsel, video, verimlilik ve daha fazlası için hızlı başlangıç noktalarını görün.",
    categoriesAction: "Tüm kategoriler",
    comparisonsEyebrow: "Karşılaştırmalar",
    comparisonsTitle: "Karar vermeden önce yan yana bak",
    comparisonsDescription: "Açık karar yüzeyleri, seçmeden önce en çok ziyaret edilen ikinci adımdır.",
    comparisonsAction: "Tüm karşılaştırmalar",
    guidesEyebrow: "Rehberler",
    guidesTitle: "Yeni ve faydalı rehberler",
    guidesDescription: "Son yayınlanan editoryal rehberleri hızlıca inceleyin ve ilgili araçlara geçin.",
    guidesAction: "Blog sayfası",
    discoverMoreEyebrow: "Daha fazlası",
    discoverMoreTitle: "Dizin içinde daha fazla araç keşfet",
    discoverMoreDescription: "Daha küçük kartlarla daha geniş bir araç alanını tarayın ve ilgilendiğiniz araçları açın.",
    discoverMoreAction: "Daha fazla araç göster",
    discoverMoreLinkLabel: "Aracı aç",
    topicLinkLabel: "Kategoriyi aç",
    comparisonLinkLabel: "Karşılaştırmayı aç",
    blogLinkLabel: "Rehberi aç"
  },
  en: {
    featuredToolsEyebrow: "Discovery flow",
    featuredToolsTitle: "The tools people open most often",
    featuredToolsDescription: "Scan featured tools with logos, pricing signals, short summaries, and fit hints.",
    featuredToolsAction: "All tools",
    categoriesEyebrow: "Categories",
    categoriesTitle: "Browse by category",
    categoriesDescription: "See the fastest starting points for writing, image, video, productivity, and more.",
    categoriesAction: "All categories",
    comparisonsEyebrow: "Comparisons",
    comparisonsTitle: "Look side by side before you decide",
    comparisonsDescription: "Clear comparison surfaces are often the next step after discovery.",
    comparisonsAction: "All comparisons",
    guidesEyebrow: "Guides",
    guidesTitle: "Fresh and useful guides",
    guidesDescription: "Review the latest editorial guides and move into the related tools faster.",
    guidesAction: "Blog page",
    discoverMoreEyebrow: "More to explore",
    discoverMoreTitle: "Keep browsing inside the directory",
    discoverMoreDescription: "Use smaller cards to scan a wider set of tools and open the ones that matter.",
    discoverMoreAction: "Show more tools",
    discoverMoreLinkLabel: "Open tool",
    topicLinkLabel: "Open category",
    comparisonLinkLabel: "Open comparison",
    blogLinkLabel: "Open guide"
  }
};

function countBySlugSet(tools: ReturnType<typeof getLocalizedTools>, slugs: string[]) {
  const slugSet = new Set(slugs);

  return tools.filter((tool) => slugSet.has(tool.slug)).length;
}

function countByPredicate(tools: ReturnType<typeof getLocalizedTools>, predicate: (tool: ReturnType<typeof getLocalizedTools>[number]) => boolean) {
  return tools.filter(predicate).length;
}

function buildTopicCards(locale: Locale) {
  const tools = getLocalizedTools(locale);
  const slugSet = new Set(tools.map((tool) => tool.slug));
  const metric = (count: number) => (locale === "tr" ? `${count} araç` : `${count} tools`);

  const countFromToolCategory = (toolCategorySlug: string) =>
    countByPredicate(tools, (tool) => tool.toolCategorySlugs.includes(toolCategorySlug));

  const countFromUseCase = (useCaseSlug: string) =>
    countByPredicate(tools, (tool) => tool.useCaseSlugs.includes(useCaseSlug));

  const countFromSlugs = (slugs: string[]) => countBySlugSet(tools, slugs.filter((slug) => slugSet.has(slug)));

  return [
    {
      icon: "WR",
      eyebrow: locale === "tr" ? "Yazı" : "Writing",
      title: locale === "tr" ? "Yazı araçları" : "Writing tools",
      description:
        locale === "tr"
          ? "Blog, e-posta ve yeniden yazım için uygun araçları hızlıca aç."
          : "Open tools that fit blogging, email, and rewriting workflows quickly.",
      href: "/tools?category=writing",
      metric: metric(countFromToolCategory("writing")),
      bestFor: locale === "tr" ? "Blog ve metin işleri" : "Blogging and copy work"
    },
    {
      icon: "RS",
      eyebrow: locale === "tr" ? "Araştırma" : "Research",
      title: locale === "tr" ? "Araştırma araçları" : "Research tools",
      description:
        locale === "tr"
          ? "Kaynak bulma, özetleme ve hızlı pazar taraması için güçlü seçenekler."
          : "Strong options for sourcing, summarizing, and quick market scans.",
      href: "/use-cases/research",
      metric: metric(countFromUseCase("research")),
      bestFor: locale === "tr" ? "Kaynaklı çalışma" : "Source-backed work"
    },
    {
      icon: "IM",
      eyebrow: locale === "tr" ? "Görsel" : "Image",
      title: locale === "tr" ? "Görsel araçlar" : "Image tools",
      description:
        locale === "tr"
          ? "Konsept, kreatif ve teslim odaklı görsel üretim araçlarını incele."
          : "Review tools for concept work, creative visuals, and polished delivery.",
      href: "/tools?category=image",
      metric: metric(countFromToolCategory("image")),
      bestFor: locale === "tr" ? "Tasarım ve kreatif üretim" : "Design and creative output"
    },
    {
      icon: "VD",
      eyebrow: locale === "tr" ? "Video" : "Video",
      title: locale === "tr" ? "Video araçları" : "Video tools",
      description:
        locale === "tr"
          ? "Kısa video, kurgu ve hızlı hareketli içerik akışları için araçlar."
          : "Tools for short videos, editing, and faster motion-first content workflows.",
      href: "/tools?category=video",
      metric: metric(countFromToolCategory("video")),
      bestFor: locale === "tr" ? "Kısa video üretimi" : "Short-form video"
    },
    {
      icon: "PR",
      eyebrow: locale === "tr" ? "Verimlilik" : "Productivity",
      title: locale === "tr" ? "Verimlilik araçları" : "Productivity tools",
      description:
        locale === "tr"
          ? "Toplantı, otomasyon ve iş akışı hızlandırma tarafında öne çıkan araçlar."
          : "Useful options for meetings, automation, and workflow acceleration.",
      href: "/tools?category=productivity",
      metric: metric(countFromToolCategory("productivity")),
      bestFor: locale === "tr" ? "İş akışı ve otomasyon" : "Workflow and automation"
    },
    {
      icon: "CD",
      eyebrow: locale === "tr" ? "Kod" : "Coding",
      title: locale === "tr" ? "Kod araçları" : "Coding tools",
      description:
        locale === "tr"
          ? "Kod yazma, refactor ve geliştirici destek araçlarını tarayın."
          : "Scan tools for coding, refactoring, and developer support.",
      href: "/tools?q=cursor",
      metric: metric(countFromSlugs(["cursor", "codeium", "github-copilot", "sourcegraph-cody", "replit", "phind"])),
      bestFor: locale === "tr" ? "Geliştirici akışları" : "Developer workflows"
    },
    {
      icon: "MK",
      eyebrow: locale === "tr" ? "Pazarlama" : "Marketing",
      title: locale === "tr" ? "Pazarlama araçları" : "Marketing tools",
      description:
        locale === "tr"
          ? "Kampanya metni, kreatif ve büyüme işlerinde kullanılan araçlar."
          : "Tools used for campaign copy, creative production, and growth workflows.",
      href: "/use-cases/creators",
      metric: metric(countFromSlugs(["jasper", "copy-ai", "writesonic", "canva-ai", "notion-ai"])),
      bestFor: locale === "tr" ? "Kampanya ve içerik" : "Campaigns and content"
    },
    {
      icon: "SE",
      eyebrow: locale === "tr" ? "SEO" : "SEO",
      title: locale === "tr" ? "SEO araçları" : "SEO tools",
      description:
        locale === "tr"
          ? "Arama, özetleme ve içerik optimizasyonu odaklı seçenekleri keşfet."
          : "Explore tools that help with search, summarization, and content optimization.",
      href: "/blog/best-ai-tools-for-seo-teams-2026",
      metric: metric(countFromSlugs(["perplexity", "writesonic", "chatgpt", "claude", "gemini"])),
      bestFor: locale === "tr" ? "Arama ve optimizasyon" : "Search and optimization"
    },
    {
      icon: "ED",
      eyebrow: locale === "tr" ? "Eğitim" : "Education",
      title: locale === "tr" ? "Eğitim araçları" : "Education tools",
      description:
        locale === "tr"
          ? "Öğrenme, not alma ve proje hazırlığı için uygun başlangıç noktaları."
          : "Starting points for studying, note-taking, and project prep.",
      href: "/use-cases/students",
      metric: metric(countFromUseCase("students")),
      bestFor: locale === "tr" ? "Öğrenme ve notlar" : "Learning and notes"
    },
    {
      icon: "AV",
      eyebrow: locale === "tr" ? "Ses" : "Audio / Voice",
      title: locale === "tr" ? "Ses ve konuşma araçları" : "Audio / voice tools",
      description:
        locale === "tr"
          ? "Seslendirme, toplantı notu ve konuşma akışı için araçlar."
          : "Tools for voice-over, meeting notes, and spoken workflows.",
      href: "/tools?q=elevenlabs",
      metric: metric(countFromSlugs(["elevenlabs", "otter-ai", "fireflies-ai", "notta", "loom-ai"])),
      bestFor: locale === "tr" ? "Ses ve toplantılar" : "Voice and meetings"
    }
  ] satisfies HomeCategoryCard[];
}

export function HomeBoostSections({ locale, comparisonCards, popularTools, categories }: HomeBoostSectionsProps) {
  const copy = sectionCopy[locale];
  const latestBlogArticles = getLocalizedBlogArticles(locale).slice(0, 6);
  const featuredTools = popularTools.slice(0, 12);
  const moreTools = popularTools.slice(12, 20);
  const compareCards = comparisonCards.slice(0, 5);
  const categoryCards = [...categories.slice(0, 4), ...buildTopicCards(locale).slice(4)];

  return (
    <div className="mx-auto mt-8 w-full max-w-[1440px] px-4 pb-12 sm:px-6 sm:pb-14 lg:mt-10 lg:px-8 lg:pb-16">
      <div className="space-y-6 sm:space-y-8">
        <SectionShell
          tone="light"
          className="section-tint-violet px-0 sm:px-0"
          eyebrow={copy.featuredToolsEyebrow}
          title={copy.featuredToolsTitle}
          description={copy.featuredToolsDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{copy.featuredToolsAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {featuredTools.map((tool) => (
            <DiscoveryToolCard key={tool.href} locale={locale} tool={tool} ctaLabel={locale === "tr" ? "İncele" : "Review"} />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-cyan px-0 sm:px-0"
          eyebrow={copy.categoriesEyebrow}
          title={copy.categoriesTitle}
          description={copy.categoriesDescription}
          actions={<PremiumButton href={`/${locale}/categories`}>{copy.categoriesAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
        >
          {categoryCards.map((category) => (
            <CategoryCard key={`${category.href}-${category.title}`} locale={locale} category={category} linkLabel={copy.topicLinkLabel} tone="light" />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-cyan px-0 sm:px-0"
          eyebrow={copy.comparisonsEyebrow}
          title={copy.comparisonsTitle}
          description={copy.comparisonsDescription}
          actions={<PremiumButton href={`/${locale}/categories/comparisons`}>{copy.comparisonsAction}</PremiumButton>}
          contentClassName="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="ui-card-strong flex h-full flex-col justify-between p-5 sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {locale === "tr" ? "En popüler karar yolu" : "Most used decision path"}
              </p>
              <h3 className="balance-text mt-3 text-[1.35rem] font-bold tracking-[-0.04em] text-slate-950 sm:text-[1.7rem]">
                {locale === "tr"
                  ? "Karşılaştırma kararını hızlıca netleştir"
                  : "Turn comparisons into a faster decision"}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                {locale === "tr"
                  ? "Öne çıkan eşleşmeleri, kullanıcı niyetine göre bir araya getir ve doğru aracı daha hızlı aç."
                  : "Use the strongest pairs to review pricing, fit, and workflow match before clicking through."}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {compareCards.slice(0, 3).map((item) => (
                <span key={item.href} className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600">
                  {item.title}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <PremiumButton href={`/${locale}/compare-auto`} className="sm:flex-1">
                {locale === "tr" ? "Canlı karşılaştır" : "Live compare"}
              </PremiumButton>
              <PremiumButton href={`/${locale}/categories/comparisons`} variant="secondary" className="sm:flex-1">
                {copy.comparisonsAction}
              </PremiumButton>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {compareCards.map((item, index) => (
              <ComparisonCard
                key={item.href}
                locale={locale}
                item={item}
                linkLabel={copy.comparisonLinkLabel}
                featured={index === 0}
                tone="light"
              />
            ))}
          </div>
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-rose px-0 sm:px-0"
          eyebrow={copy.guidesEyebrow}
          title={copy.guidesTitle}
          description={copy.guidesDescription}
          actions={<PremiumButton href={`/${locale}/blog`}>{copy.guidesAction}</PremiumButton>}
          contentClassName="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {latestBlogArticles.map((article) => (
            <BlogCard key={article.slug} locale={locale} article={article} ctaLabel={copy.blogLinkLabel} tone="light" />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-violet px-0 sm:px-0"
          eyebrow={copy.discoverMoreEyebrow}
          title={copy.discoverMoreTitle}
          description={copy.discoverMoreDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{copy.discoverMoreAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {moreTools.map((tool) => (
            <DiscoveryToolCard
              key={tool.href}
              locale={locale}
              tool={tool}
              ctaLabel={copy.discoverMoreLinkLabel}
              compact
            />
          ))}
        </SectionShell>
      </div>
    </div>
  );
}
