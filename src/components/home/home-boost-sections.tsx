import Link from "next/link";

import { CategoryCard } from "@/components/home/category-card";
import { ComparisonCard } from "@/components/home/comparison-card";
import { DiscoveryToolCard } from "@/components/home/discovery-tool-card";
import { LiveToolFeed } from "@/components/home/live-tool-feed";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { formatBlogDate, getBlogTrendingArticles, getLocalizedBlogArticles, resolveBlogPublishDate } from "@/lib/blog";
import type { ComparisonCard as HomeComparisonCard, ToolCard as HomeToolCard } from "@/types/home";
import type { Locale } from "@/i18n/config";

type HomeBoostSectionsProps = {
  locale: Locale;
  comparisonCards: HomeComparisonCard[];
  popularTools: HomeToolCard[];
  allTools: HomeToolCard[];
  categories: { icon: string; title: string; description: string; href: string; eyebrow: string; metric: string; bestFor: string }[];
};

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

function NewsRow({ locale, article }: { locale: Locale; article: ReturnType<typeof getLocalizedBlogArticles>[number] }) {
  const publishDate = resolveBlogPublishDate(article);
  const formattedDate = publishDate ? formatBlogDate(locale, publishDate) : null;

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

export function HomeBoostSections({ locale, comparisonCards, popularTools, allTools, categories }: HomeBoostSectionsProps) {
  const blogArticles = getLocalizedBlogArticles(locale);
  const newsItems = getBlogTrendingArticles(locale, 8);
  const guideItems = blogArticles.filter((article) => !newsItems.some((news) => news.slug === article.slug)).slice(0, 4);
  const moreTools = popularTools.slice(12, 24);

  return (
    <div className="mx-auto mt-8 w-full max-w-[1440px] px-4 pb-12 sm:px-6 sm:pb-14 lg:mt-10 lg:px-8 lg:pb-16">
      <div className="space-y-6 sm:space-y-8">
        <SectionShell
          tone="light"
          className="section-tint-violet px-0 sm:px-0"
          eyebrow={locale === "tr" ? "Canlı dizin akışı" : "Live directory feed"}
          title={locale === "tr" ? "Logo, fiyat sinyali ve kısa özetle araçları hızlıca tara" : "Scan tools quickly with logos, pricing signals, and short summaries"}
          description={
            locale === "tr"
              ? "Bugün, yeni, en çok kaydedilen ve diğer kullanım kümeleri arasında geçiş yaparak daha yoğun bir AI dizini deneyimi yaşa."
              : "Switch between Today, New, Most saved, and other use clusters to browse a denser AI directory."
          }
          actions={<PremiumButton href={`/${locale}/tools`}>{locale === "tr" ? "Tüm araçlar" : "All tools"}</PremiumButton>}
          contentClassName="grid gap-6 xl:grid-cols-[minmax(0,1.58fr)_minmax(330px,0.82fr)]"
        >
          <div className="space-y-4">
            <LiveToolFeed locale={locale} tools={allTools} openLabel={locale === "tr" ? "Aç" : "Open"} />

            <div className="flex flex-wrap gap-2">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                    {locale === "tr" ? "AI haberleri" : "AI news"}
                  </p>
                  <h3 className="mt-2 text-[1.15rem] font-bold tracking-[-0.03em] text-slate-950">
                    {locale === "tr" ? "Güncel rehberler ve editorial sinyaller" : "Fresh guides and editorial signals"}
                  </h3>
                </div>
                <Badge variant="ghost" className="shrink-0 text-[11px]">
                  {newsItems.length}
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {locale === "tr"
                  ? "Blog ve rehber akışından kısa başlıklar al; sayfayı yaşayan bir keşif alanı gibi hissettir."
                  : "Pull in short headlines from the blog and guide feed so the homepage feels active."}
              </p>
              <div className="mt-4 space-y-2.5">
                {newsItems.map((article) => (
                  <NewsRow key={article.slug} locale={locale} article={article} />
                ))}
              </div>
              <div className="mt-4">
                <PremiumButton href={`/${locale}/blog`} variant="secondary" className="w-full">
                  {locale === "tr" ? "Bloga git" : "Go to blog"}
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
                {comparisonCards.slice(0, 3).map((item) => (
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
                              className="h-full w-full object-contain p-1.5"
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
          eyebrow={locale === "tr" ? "Kategoriler" : "Categories"}
          title={locale === "tr" ? "Daha fazla AI kategorisi keşfet" : "Explore more AI categories"}
          description={
            locale === "tr"
              ? "Yazı, görsel, video, verimlilik, kod ve pazarlama gibi ana keşif yollarını kompakt kartlarla aç."
              : "Open the main discovery paths for writing, image, video, productivity, coding, and marketing."
          }
          actions={<PremiumButton href={`/${locale}/categories`}>{locale === "tr" ? "Tüm kategoriler" : "All categories"}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
        >
          {categories.map((category) => (
            <CategoryCard key={`${category.href}-${category.title}`} locale={locale} category={category} linkLabel={locale === "tr" ? "Kategoriyi aç" : "Open category"} tone="light" />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-slate px-0 sm:px-0"
          eyebrow={locale === "tr" ? "Karşılaştırmalar" : "Comparisons"}
          title={locale === "tr" ? "Karar vermeden önce en iyi eşleşmeleri görün" : "See the best matches before you decide"}
          description={
            locale === "tr"
              ? "Karşılaştırma yüzeyleri, kullanıcıyı doğru araç sayfasına taşıyan güçlü ikinci adım olmaya devam ediyor."
              : "Comparison surfaces stay prominent because they are a strong second-step traffic driver after discovery."
          }
          actions={<PremiumButton href={`/${locale}/categories/comparisons`}>{locale === "tr" ? "Tüm karşılaştırmalar" : "All comparisons"}</PremiumButton>}
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
                  ? "Fiyat, kullanım amacı ve güçlü yönler karşılaştırıldığında kullanıcılar doğru sayfaya daha hızlı geçer."
                  : "Pricing, fit, and strengths are easier to scan when the best matches sit side by side."}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {comparisonCards.slice(0, 4).map((item) => (
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
                {locale === "tr" ? "Tüm karşılaştırmalar" : "All comparisons"}
              </PremiumButton>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {comparisonCards.map((item, index) => (
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
          eyebrow={locale === "tr" ? "Rehberler" : "Guides"}
          title={locale === "tr" ? "Son ve faydalı içerikler" : "Fresh and useful editorial content"}
          description={
            locale === "tr" ? "Karar vermeden önce okunabilecek kısa ve pratik rehberler." : "Surface decision-friendly guides with short summaries and clear click paths."
          }
          actions={<PremiumButton href={`/${locale}/blog`}>{locale === "tr" ? "Tüm rehberler" : "All guides"}</PremiumButton>}
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
                  {locale === "tr" ? "Oku" : "Read"}
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
          eyebrow={locale === "tr" ? "Daha fazla araç" : "More tools"}
          title={locale === "tr" ? "Dizin içinde daha geniş araç alanını keşfet" : "Browse a wider directory of AI tools"}
          description={
            locale === "tr"
              ? "Daha küçük ve sıkı kartlarla katalog hissini güçlendir, kullanıcıyı araç sayfalarına hızla yönlendir."
              : "Use smaller, denser cards to reinforce the directory feel and move users faster into tool pages."
          }
          actions={<PremiumButton href={`/${locale}/tools`}>{locale === "tr" ? "Daha fazla araç göster" : "Show more tools"}</PremiumButton>}
          contentClassName="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {moreTools.map((tool) => (
            <DiscoveryToolCard key={tool.href} locale={locale} tool={tool} ctaLabel={locale === "tr" ? "Aç" : "Open"} compact variant="card" />
          ))}
        </SectionShell>

        <SectionShell
          tone="light"
          className="section-tint-slate px-0 sm:px-0"
          eyebrow={locale === "tr" ? "Harf sırasına göre" : "Browse alphabetically"}
          title={locale === "tr" ? "A’dan Z’ye araçları tara" : "Scan tools from A to Z"}
          description={
            locale === "tr"
              ? "Katalogda gezinmeyi kolaylaştırmak için araçları harf bazlı hızlı bağlantılarla aç."
              : "Use quick letter links to make directory navigation and crawl depth easier."
          }
          actions={<PremiumButton href={`/${locale}/tools`}>{locale === "tr" ? "Tüm araçlar" : "All tools"}</PremiumButton>}
          contentClassName="flex flex-col gap-4"
        >
          <AlphaLetterGrid locale={locale} />
        </SectionShell>
      </div>
    </div>
  );
}
