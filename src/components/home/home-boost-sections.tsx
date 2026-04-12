import Link from "next/link";

import { CategoryCard } from "@/components/home/category-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { DiscoveryToolCard } from "@/components/home/discovery-tool-card";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { getBlogTrendingArticles, getLocalizedBlogArticles, formatBlogDate, resolveBlogPublishDate } from "@/lib/blog";
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

type Copy = {
  feedEyebrow: string;
  feedTitle: string;
  feedDescription: string;
  feedAction: string;
  newsEyebrow: string;
  newsTitle: string;
  newsDescription: string;
  newsAction: string;
  categoriesEyebrow: string;
  categoriesTitle: string;
  categoriesDescription: string;
  categoriesAction: string;
  compareEyebrow: string;
  compareTitle: string;
  compareDescription: string;
  compareAction: string;
  guidesEyebrow: string;
  guidesTitle: string;
  guidesDescription: string;
  guidesAction: string;
  moreEyebrow: string;
  moreTitle: string;
  moreDescription: string;
  moreAction: string;
  alphaEyebrow: string;
  alphaTitle: string;
  alphaDescription: string;
  alphaAction: string;
  openLabel: string;
  compareLabel: string;
  newsLabel: string;
};

const copy: Record<Locale, Copy> = {
  tr: {
    feedEyebrow: "Canlı dizin akışı",
    feedTitle: "Öne çıkan araçları logo ve kısa özetle hızlıca tara",
    feedDescription:
      "Toolify benzeri, daha yoğun bir akış içinde en çok açılan araçları, fiyat sinyallerini ve uygun kullanım ipuçlarını aynı ekranda gör.",
    feedAction: "Tüm araçları aç",
    newsEyebrow: "AI haberleri",
    newsTitle: "Son yayınlanan rehberler ve güncel sinyaller",
    newsDescription:
      "Blog ve rehber akışından güncel başlıkları çekerek sayfayı yaşayan bir keşif yüzeyine dönüştür.",
    newsAction: "Bloga git",
    categoriesEyebrow: "Kategoriler",
    categoriesTitle: "Daha fazla AI kategorisi keşfet",
    categoriesDescription:
      "Yazı, görsel, video, verimlilik, kod ve pazarlama gibi ana keşif yollarını kompakt kartlarla aç.",
    categoriesAction: "Tüm kategoriler",
    compareEyebrow: "Karşılaştırmalar",
    compareTitle: "Karar vermeden önce en iyi eşleşmeleri görün",
    compareDescription:
      "Karşılaştırma yüzeyleri, trafik çeken ikinci adım olduğu için homepage’de güçlü ama dengeli bir blok olarak yer alır.",
    compareAction: "Tüm karşılaştırmalar",
    guidesEyebrow: "Rehberler",
    guidesTitle: "Son ve faydalı içerikler",
    guidesDescription:
      "Karar anında iş gören rehberleri kısa özet, tarih ve tıklanabilir yapı ile öne çıkar.",
    guidesAction: "Tüm rehberler",
    moreEyebrow: "Daha fazla araç",
    moreTitle: "Dizin içinde daha geniş araç alanını keşfet",
    moreDescription:
      "Daha küçük ve sıkı kartlarla katalog hissini güçlendir, kullanıcıyı araç sayfalarına hızla yönlendir.",
    moreAction: "Daha fazla araç göster",
    alphaEyebrow: "Harf sırasına göre",
    alphaTitle: "A’dan Z’ye araçları tara",
    alphaDescription:
      "Katalogda gezinmeyi kolaylaştırmak için araçları harf bazlı hızlı bağlantılarla aç.",
    alphaAction: "Tüm araçlar",
    openLabel: "Aç",
    compareLabel: "Karşılaştır",
    newsLabel: "Aç"
  },
  en: {
    feedEyebrow: "Live directory feed",
    feedTitle: "Scan featured tools quickly with logos and short summaries",
    feedDescription:
      "Use a denser, Toolify-style feed to review the most opened tools, pricing signals, and fit hints in one view.",
    feedAction: "Open all tools",
    newsEyebrow: "AI news",
    newsTitle: "Fresh guides and active editorial signals",
    newsDescription:
      "Pull in recent blog and guide headlines so the homepage feels like a living discovery surface.",
    newsAction: "Go to blog",
    categoriesEyebrow: "Categories",
    categoriesTitle: "Explore more AI categories",
    categoriesDescription:
      "Open the main discovery paths for writing, image, video, productivity, coding, and marketing.",
    categoriesAction: "All categories",
    compareEyebrow: "Comparisons",
    compareTitle: "See the best matches before you decide",
    compareDescription:
      "Comparison surfaces stay prominent because they are a strong second-step traffic driver after discovery.",
    compareAction: "All comparisons",
    guidesEyebrow: "Guides",
    guidesTitle: "Fresh and useful editorial content",
    guidesDescription:
      "Surface decision-friendly guides with short summaries, dates, and clear click paths.",
    guidesAction: "All guides",
    moreEyebrow: "More tools",
    moreTitle: "Browse a wider directory of AI tools",
    moreDescription:
      "Use smaller, denser cards to reinforce the directory feel and move users faster into tool pages.",
    moreAction: "Show more tools",
    alphaEyebrow: "Browse alphabetically",
    alphaTitle: "Scan tools from A to Z",
    alphaDescription:
      "Use quick letter links to make directory navigation and crawl depth easier.",
    alphaAction: "All tools",
    openLabel: "Open",
    compareLabel: "Compare",
    newsLabel: "Open"
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
          ? "Blog, e-posta ve yeniden yazım işlerinde öne çıkan araçları hızla aç."
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
          ? "Konsept, yaratıcı ve teslim odaklı görsel üretim araçlarını incele."
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
          ? "Kısa video, kurgu ve hareketli içerik akışları için araçlar."
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

function formatNewsDate(locale: Locale, value: string) {
  return formatBlogDate(locale, value);
}

function NewsRow({ locale, article }: { locale: Locale; article: ReturnType<typeof getLocalizedBlogArticles>[number] }) {
  const publishDate = resolveBlogPublishDate(article);
  const formattedDate = publishDate ? formatNewsDate(locale, publishDate) : null;

  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group flex items-start gap-3 rounded-[20px] border border-slate-200 bg-white p-3.5 transition hover:border-sky-200 hover:bg-slate-50"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--tn-gradient-primary)] text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_-22px_rgba(37,99,235,0.38)]">
        AI
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {article.categoryLabel}
          </span>
          {formattedDate ? <span className="text-[11px] font-medium text-slate-500">{formattedDate}</span> : null}
        </div>
        <p className="mt-1.5 clamp-2 text-sm font-semibold leading-5 text-slate-950 transition group-hover:text-sky-700">
          {article.title}
        </p>
      </div>
    </Link>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[36px] items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
    >
      {label}
    </Link>
  );
}

function AlphaLetterGrid({ locale }: { locale: Locale }) {
  const letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];

  return (
    <div className="flex flex-wrap gap-2">
      {letters.map((letter) => (
        <Link
          key={letter}
          href={letter === "#" ? `/${locale}/tools` : `/${locale}/tools?q=${letter}`}
          className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
        >
          {letter === "#" ? (locale === "tr" ? "Diğer" : "Other") : letter}
        </Link>
      ))}
    </div>
  );
}

export function HomeBoostSections({ locale, comparisonCards, popularTools, categories }: HomeBoostSectionsProps) {
  const pageCopy = copy[locale];
  const blogArticles = getLocalizedBlogArticles(locale);
  const newsItems = getBlogTrendingArticles(locale, 8);
  const featuredTools = popularTools.slice(0, 12);
  const moreTools = popularTools.slice(12, 24);
  const compareCards = comparisonCards.slice(0, 6);
  const categoryCards = [...categories.slice(0, 4), ...buildTopicCards(locale).slice(4)];
  const guideItems = blogArticles.filter((article) => !newsItems.some((news) => news.slug === article.slug)).slice(0, 4);

  return (
    <div className="mx-auto mt-8 w-full max-w-[1440px] px-4 pb-12 sm:px-6 sm:pb-14 lg:mt-10 lg:px-8 lg:pb-16">
      <div className="space-y-6 sm:space-y-8">
        <SectionShell
          tone="light"
          className="section-tint-violet px-0 sm:px-0"
          eyebrow={pageCopy.feedEyebrow}
          title={pageCopy.feedTitle}
          description={pageCopy.feedDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{pageCopy.feedAction}</PremiumButton>}
          contentClassName="grid gap-6 xl:grid-cols-[minmax(0,1.58fr)_minmax(330px,0.82fr)]"
        >
          <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))] p-3.5 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-4">
            <div className="flex items-center justify-between gap-3 px-1 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                  {locale === "tr" ? "Canlı araç akışı" : "Live tool feed"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {locale === "tr"
                    ? "Daha yoğun bir listede logosu, fiyat sinyali ve kısa açıklamasıyla araçları tara."
                    : "Scan tools in a denser list with logos, pricing signals, and short summaries."}
                </p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700">
                  {featuredTools.length}
                </span>
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold text-cyan-700">
                  {locale === "tr" ? "öne çıkan araç" : "featured tools"}
                </span>
              </div>
            </div>

            <div className="grid gap-3">
              {featuredTools.map((tool, index) => (
                <DiscoveryToolCard
                  key={tool.href}
                  locale={locale}
                  tool={tool}
                  ctaLabel={locale === "tr" ? "Aç" : "Open"}
                  compact={index >= 6}
                  variant="row"
                />
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <QuickLink href={`/${locale}/tools`} label={locale === "tr" ? "Tüm araçlar" : "All tools"} />
              <QuickLink href={`/${locale}/compare-auto`} label={locale === "tr" ? "Canlı karşılaştırma" : "Live compare"} />
              <QuickLink href={`/${locale}/categories`} label={locale === "tr" ? "Kategoriler" : "Categories"} />
              <QuickLink href={`/${locale}/blog`} label={locale === "tr" ? "Blog" : "Blog"} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{pageCopy.newsEyebrow}</p>
                  <h3 className="mt-2 text-[1.15rem] font-bold tracking-[-0.03em] text-slate-950">{pageCopy.newsTitle}</h3>
                </div>
                <Badge variant="ghost" className="shrink-0 text-[11px]">
                  {newsItems.length}
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pageCopy.newsDescription}</p>
              <div className="mt-4 space-y-2.5">
                {newsItems.map((article) => (
                  <NewsRow key={article.slug} locale={locale} article={article} />
                ))}
              </div>
              <div className="mt-4">
                <PremiumButton href={`/${locale}/blog`} variant="secondary" className="w-full">
                  {pageCopy.newsAction}
                </PremiumButton>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))] p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    {locale === "tr" ? "Hızlı giriş" : "Quick entry"}
                  </p>
                  <h3 className="mt-2 text-[1.05rem] font-bold tracking-[-0.03em] text-slate-950">
                    {locale === "tr" ? "Sık gidilen yüzeyler" : "Most opened surfaces"}
                  </h3>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-500">
                  {locale === "tr" ? "Hızlı" : "Fast"}
                </span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <QuickLink href={`/${locale}/categories/comparisons`} label={locale === "tr" ? "Karşılaştırmalar" : "Comparisons"} />
                <QuickLink href={`/${locale}/use-cases/students`} label={locale === "tr" ? "Öğrenciler" : "Students"} />
                <QuickLink href={`/${locale}/use-cases/freelancers`} label={locale === "tr" ? "Freelancer'lar" : "Freelancers"} />
                <QuickLink href={`/${locale}/alternatives/chatgpt`} label={locale === "tr" ? "Alternatifler" : "Alternatives"} />
              </div>
              <div className="mt-4 grid gap-2">
                {compareCards.slice(0, 3).map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className="group flex items-center justify-between gap-3 rounded-[18px] border border-slate-200 bg-white px-3 py-3 transition hover:border-sky-200 hover:bg-slate-50"
                  >
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {locale === "tr" ? "Karşılaştır" : "Compare"}
                      </span>
                      <span className="block truncate text-sm font-semibold text-slate-950">{item.title}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {(item.logos ?? []).slice(0, 2).map((logo, index) => (
                        <span
                          key={`${logo.name}-${index}`}
                          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-[0_12px_24px_-20px_rgba(15,23,42,0.28)]"
                        >
                          {logo.logoUrl ? (
                            <img
                              src={logo.logoUrl}
                              alt={logo.name}
                              className="h-full w-full object-cover p-1.5"
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="text-[10px] font-bold text-slate-700">{logo.name.slice(0, 2).toUpperCase()}</span>
                          )}
                        </span>
                      ))}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-cyan px-0 sm:px-0"
          eyebrow={pageCopy.categoriesEyebrow}
          title={pageCopy.categoriesTitle}
          description={pageCopy.categoriesDescription}
          actions={<PremiumButton href={`/${locale}/categories`}>{pageCopy.categoriesAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
        >
          {categoryCards.map((category) => (
            <CategoryCard key={`${category.href}-${category.title}`} locale={locale} category={category} linkLabel={locale === "tr" ? "Kategoriyi aç" : "Open category"} tone="light" />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-slate px-0 sm:px-0"
          eyebrow={pageCopy.compareEyebrow}
          title={pageCopy.compareTitle}
          description={pageCopy.compareDescription}
          actions={<PremiumButton href={`/${locale}/categories/comparisons`}>{pageCopy.compareAction}</PremiumButton>}
          contentClassName="grid gap-6 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]"
        >
          <div className="ui-card-strong flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {locale === "tr" ? "Karar paneli" : "Decision panel"}
              </p>
              <h3 className="balance-text mt-3 text-[1.35rem] font-bold tracking-[-0.04em] text-slate-950 sm:text-[1.65rem]">
                {locale === "tr"
                  ? "Karşılaştırma ile seçim yapmadan önce iki aracı yan yana aç"
                  : "Open two tools side by side before you decide"}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                {locale === "tr"
                  ? "Fiyat, kullanım amacı ve güçlü yönler karşılaştırıldığı için kullanıcılar doğru araç sayfasına daha hızlı geçer."
                  : "Pricing, fit, and strengths are easier to scan when the best matches sit side by side."}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {compareCards.slice(0, 4).map((item) => (
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
                {pageCopy.compareAction}
              </PremiumButton>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {compareCards.map((item, index) => (
              <ComparisonCard
                key={item.href}
                locale={locale}
                item={item}
                linkLabel={locale === "tr" ? "Karşılaştırmayı aç" : "Open comparison"}
                featured={index === 0}
                tone="light"
              />
            ))}
          </div>
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-violet px-0 sm:px-0"
          eyebrow={pageCopy.guidesEyebrow}
          title={pageCopy.guidesTitle}
          description={pageCopy.guidesDescription}
          actions={<PremiumButton href={`/${locale}/blog`}>{pageCopy.guidesAction}</PremiumButton>}
          contentClassName="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
        >
          {guideItems.map((article) => {
            const publishDate = resolveBlogPublishDate(article);

            return (
              <Link
                key={article.slug}
                href={`/${locale}/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_56px_-38px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {article.categoryLabel}
                  </span>
                  {publishDate ? <span className="text-xs font-medium text-slate-500">{formatBlogDate(locale, publishDate)}</span> : null}
                </div>
                <h3 className="mt-3 text-[1.02rem] font-bold tracking-[-0.03em] text-slate-950 transition group-hover:text-sky-700">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-6 text-slate-600">{article.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-950">
                  {pageCopy.guidesAction}
                  <span aria-hidden="true" className="text-cyan-300">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-cyan px-0 sm:px-0"
          eyebrow={pageCopy.moreEyebrow}
          title={pageCopy.moreTitle}
          description={pageCopy.moreDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{pageCopy.moreAction}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {moreTools.map((tool, index) => (
            <DiscoveryToolCard
              key={tool.href}
              locale={locale}
              tool={tool}
              ctaLabel={pageCopy.openLabel}
              compact
              variant="card"
            />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-slate px-0 sm:px-0"
          eyebrow={pageCopy.alphaEyebrow}
          title={pageCopy.alphaTitle}
          description={pageCopy.alphaDescription}
          actions={<PremiumButton href={`/${locale}/tools`}>{pageCopy.alphaAction}</PremiumButton>}
          contentClassName="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_24px_70px_-46px_rgba(15,23,42,0.16)] sm:p-6"
        >
          <AlphaLetterGrid locale={locale} />
        </SectionShell>
      </div>
    </div>
  );
}
