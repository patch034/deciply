import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { InfoSection } from "@/components/catalog/info-section";
import { ToolCard } from "@/components/catalog/tool-card";
import { ComparisonActionGrid } from "@/components/comparison/comparison-action-grid";
import { ComparisonBreakdownTable } from "@/components/comparison/comparison-breakdown-table";
import { ComparisonDecisionBoxes } from "@/components/comparison/comparison-decision-boxes";
import { ComparisonFaq } from "@/components/comparison/comparison-faq";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { SectionShell } from "@/components/ui/section-shell";
import { SectionJumpNav } from "@/components/ui/section-jump-nav";
import { buildAlternates, buildCanonicalUrl, isValidLocale, locales, type Locale } from "@/i18n/config";
import { getLocalizedBlogArticleBySlug } from "@/lib/blog";
import {
  buildComparisonPath,
  getComparisonAlternativeTools,
  getComparisonRelatedBlogSlugsForSlugs,
  getComparisonToolsFromPair,
  SPECIAL_PRODUCT_DESCRIPTION_COMPARISON_SLUG
} from "@/lib/comparisons";
import { formatPricing, getCatalogContent, getCategoryNamesMap, getToolOutboundUrl } from "@/lib/catalog";
import type { ComparisonFaqItem, ComparisonRow } from "@/data/comparisons";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const safeLocale = locale as Locale;
  const comparison = getComparisonToolsFromPair(safeLocale, SPECIAL_PRODUCT_DESCRIPTION_COMPARISON_SLUG);

  if (!comparison) {
    return {};
  }

  const canonicalPath = `/${safeLocale}/compare/${SPECIAL_PRODUCT_DESCRIPTION_COMPARISON_SLUG}`;
  const title =
    safeLocale === "tr"
      ? `${comparison.leftTool.name} vs ${comparison.rightTool.name} ürün açıklamaları için karşılaştırma (2026)`
      : `${comparison.leftTool.name} vs ${comparison.rightTool.name} for product descriptions (2026)`;
  const description =
    safeLocale === "tr"
      ? `${comparison.leftTool.name} ile ${comparison.rightTool.name} arasında ürün açıklaması, SEO, satış tonu ve Shopify kullanımı farklarını inceleyin.`
      : `Review ${comparison.leftTool.name} and ${comparison.rightTool.name} for product descriptions, SEO, sales tone, and Shopify use cases.`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages: buildAlternates(`/compare/${SPECIAL_PRODUCT_DESCRIPTION_COMPARISON_SLUG}`)
    },
    openGraph: {
      type: "website",
      url: buildCanonicalUrl(canonicalPath),
      title,
      description
    }
  };
}

function buildRows(locale: Locale): ComparisonRow[] {
  if (locale === "tr") {
    return [
      { label: "Fiyat modeli", left: "Freemium tarzı hızlı başlangıç", right: "Geniş kullanım ve daha esnek planlama" },
      { label: "Yazım hızı", left: "Kısa SKU ve ürün açıklamalarında hızlı taslak", right: "Daha esnek prompt ve yeniden yazım akışı" },
      { label: "E-ticaret kopyası", left: "Satış odaklı kısa açıklamalarda direkt his", right: "Daha uzun ürün sayfalarında bağlamı koruma" },
      { label: "SEO optimizasyonu", left: "Kısa fayda yapısında güçlü", right: "Başlık, alt başlık ve destek metnini daha rahat kurar" },
      { label: "Duygusal satış dili", left: "Kısa ve net ikna satırları", right: "Ton ve bağlamı daha geniş test etme" },
      { label: "Shopify kullanımı", left: "Hızlı ürün kartları için pratik", right: "Daha uzun landing page akışı için esnek" },
      { label: "Başlangıç kolaylığı", left: "İlk taslaklar için kolay", right: "Prompt yazmaya alışkın kullanıcılar için rahat" },
      { label: "Ajanslar için", left: "Hızlı teslim ve kısa varyasyonlar", right: "Daha uzun müşteri sesi uyarlaması" },
      { label: "Mağaza sahipleri için", left: "Kısa ürün kartı ve kampanya dili", right: "Ürün hikayesi ve uzun açıklama" },
      { label: "Paraya değer", left: "Kısa ve tekrar eden işlerde güçlü", right: "Geniş kullanım isteyen ekipler için dengeli" }
    ];
  }

  return [
    { label: "Pricing", left: "Freemium-style quick start", right: "Broader usage and more flexible planning" },
    { label: "Writing speed", left: "Fast drafts for short SKU copy", right: "More flexible prompts and rewriting" },
    { label: "Ecommerce copy quality", left: "Feels direct for short sales-led copy", right: "Keeps context better in longer product pages" },
    { label: "SEO optimization", left: "Strong in short benefit-led structure", right: "More comfortable with title, subhead, and support copy" },
    { label: "Emotional sales copy", left: "Short, clear persuasive lines", right: "Wider tone and context testing" },
    { label: "Shopify use case", left: "Practical for quick product cards", right: "Flexible for longer landing-page flow" },
    { label: "Beginner friendliness", left: "Easy for first drafts", right: "Comfortable for prompt-heavy users" },
    { label: "Best for agencies", left: "Fast delivery and short variations", right: "Longer client-voice adaptation" },
    { label: "Best for store owners", left: "Short product cards and campaign lines", right: "Product story and longer descriptions" },
    { label: "Value for money", left: "Strong for short repeatable work", right: "Balanced for broader use cases" }
  ];
}

function buildFaq(locale: Locale, leftName: string, rightName: string): ComparisonFaqItem[] {
  if (locale === "tr") {
    return [
      { question: "Kısa SKU açıklamalarında hangisi daha hızlı?", answer: `${leftName} kısa ürün kartlarında daha direkt başlangıç verebilir.` },
      { question: "Uzun ürün sayfalarında hangisi daha rahat?", answer: `${rightName} daha uzun revizyon ve yapı akışında daha esnek olabilir.` },
      { question: "Shopify mağazası için hangisi daha mantıklı?", answer: "Kısa kartlar için daha hızlı araç, uzun landing page için daha esnek araç daha uygun olabilir." },
      { question: "Ajanslar neye bakmalı?", answer: "Aynı brief'i kaç kez yeniden yazmadan teslim edebildiğiniz en iyi sinyaldir." }
    ];
  }

  return [
    { question: "Which tool is faster for short SKU descriptions?", answer: `${leftName} can feel more direct for short product cards.` },
    { question: "Which tool is better for longer product pages?", answer: `${rightName} can be more flexible for longer revision-heavy work.` },
    { question: "Which is the better Shopify fit?", answer: "The better fit depends on whether you need fast short-card copy or more flexible long-form work." },
    { question: "What should agencies look at first?", answer: "Agencies should focus on which tool can deliver the same brief with fewer rewrites." }
  ];
}

export default async function ProductDescriptionComparisonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const comparison = getComparisonToolsFromPair(safeLocale, SPECIAL_PRODUCT_DESCRIPTION_COMPARISON_SLUG);

  if (!comparison) {
    notFound();
  }

  const { leftTool, rightTool } = comparison;
  const content = getCatalogContent(safeLocale);
  const categoryNamesMap = getCategoryNamesMap(safeLocale);
  const rows = buildRows(safeLocale);
  const faqItems = buildFaq(safeLocale, leftTool.name, rightTool.name);
  const relatedBlogArticles = getComparisonRelatedBlogSlugsForSlugs([leftTool.slug, rightTool.slug], 3)
    .map((slug) => getLocalizedBlogArticleBySlug(safeLocale, slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
  const alternatives = getComparisonAlternativeTools(safeLocale, leftTool.slug, rightTool.slug, 4);
  const leftOfficialHref = getToolOutboundUrl(leftTool);
  const rightOfficialHref = getToolOutboundUrl(rightTool);

  const sectionNavItems = [
    { label: safeLocale === "tr" ? "Genel Bakış" : "Overview", href: "#genel-bakis" },
    { label: safeLocale === "tr" ? "Fiyat" : "Pricing", href: "#fiyat" },
    { label: safeLocale === "tr" ? "Yazım hızı" : "Writing speed", href: "#yazim-hizi" },
    { label: safeLocale === "tr" ? "Shopify" : "Shopify", href: "#shopify" },
    { label: safeLocale === "tr" ? "Son Karar" : "Final verdict", href: "#son-karar" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumb
        items={[
          { label: content.common.breadcrumbsHome, href: `/${safeLocale}` },
          { label: safeLocale === "tr" ? "Araçlar" : "Tools", href: `/${safeLocale}/tools` },
          { label: safeLocale === "tr" ? "Karşılaştırmalar" : "Comparisons", href: `/${safeLocale}/compare-auto` },
          { label: `${leftTool.name} vs ${rightTool.name}` }
        ]}
      />

      <section className="rounded-[36px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.94),rgba(10,16,30,0.98))] px-6 py-8 shadow-[0_30px_90px_-46px_rgba(14,165,233,0.14)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-3xl">
          <Badge variant="ghost" className="border-cyan-400/20 bg-cyan-400/10 text-cyan-100">
            {safeLocale === "tr" ? "Ürün açıklaması karşılaştırması" : "Product-description comparison"}
          </Badge>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="accent">Copy.ai</Badge>
            <Badge>ChatGPT</Badge>
            <Badge>{safeLocale === "tr" ? "Shopify odaklı" : "Shopify-focused"}</Badge>
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-[3.45rem] lg:leading-[1.03]">
            {safeLocale === "tr" ? "Copy.ai vs ChatGPT ürün açıklamaları için karşılaştırma (2026)" : "Copy.ai vs ChatGPT for product descriptions (2026)"}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {safeLocale === "tr"
              ? "Bu sayfa, ürün açıklaması, satış tonu, SEO düzeni ve Shopify kullanımı açısından iki aracı tarafsız biçimde yan yana koyar."
              : "This page compares both tools for product descriptions, sales tone, SEO structure, and Shopify workflow fit in a neutral way."}
          </p>
        </div>
      </section>

      <SectionJumpNav items={sectionNavItems} />

      <div id="genel-bakis" className="scroll-mt-24">
        <ComparisonBreakdownTable
          locale={safeLocale}
          title={safeLocale === "tr" ? "Ürün açıklaması için temel farklar" : "Core differences for product descriptions"}
          description={
            safeLocale === "tr"
              ? "Hız, e-ticaret kopyası, SEO, duygusal satış dili ve Shopify kullanımı üzerinden en pratik ayrımı görün."
              : "Review speed, ecommerce copy quality, SEO, emotional sales copy, and Shopify use case in one place."
          }
          columns={{
            label: safeLocale === "tr" ? "Kriter" : "Criteria",
            left: leftTool.name,
            right: rightTool.name
          }}
          rows={rows}
        />
      </div>

      <InfoSection
        title={safeLocale === "tr" ? "Shopify ve mağaza akışı" : "Shopify and store workflow"}
        description={
          safeLocale === "tr"
            ? "Kısa SKU açıklamaları ile daha uzun landing page metinleri aynı araçta aynı şekilde çalışmaz. Bu bölüm, o farkı netleştirir."
            : "Short SKU descriptions and longer landing-page copy do not always need the same tool in the same way. This section makes that split easier to see."
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{safeLocale === "tr" ? "Mağaza sahipleri" : "Store owners"}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">{safeLocale === "tr" ? "Kısa SKU akışı ve hızlı satış cümlesi" : "Short SKU flow and quick sales lines"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {safeLocale === "tr"
                ? `${leftTool.name} kısa ürün kartları ve hızlı kampanya varyasyonları için iyi bir başlangıç olabilir.`
                : `${leftTool.name} may be a strong start for short product cards and quick campaign variations.`}
            </p>
            <div className="mt-5">
              <PremiumButton href={`/${safeLocale}/tools/${leftTool.slug}`} variant="secondary" className="w-full">
                {safeLocale === "tr" ? "Copy.ai'yi incele" : "Review Copy.ai"}
              </PremiumButton>
            </div>
          </div>
          <div className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{safeLocale === "tr" ? "Ajanslar" : "Agencies"}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-100">{safeLocale === "tr" ? "Daha uzun, daha esnek yeniden yazım" : "Longer, more flexible rewriting"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {safeLocale === "tr"
                ? `${rightTool.name} daha uzun ürün sayfaları, farklı ton denemeleri ve müşteri revizyon akışları için daha rahat olabilir.`
                : `${rightTool.name} may be more comfortable for longer product pages, tone testing, and client revision flows.`}
            </p>
            <div className="mt-5">
              <PremiumButton href={`/${safeLocale}/tools/${rightTool.slug}`} variant="secondary" className="w-full">
                {safeLocale === "tr" ? "ChatGPT'yi incele" : "Review ChatGPT"}
              </PremiumButton>
            </div>
          </div>
        </div>
      </InfoSection>

      <div id="shopify" className="scroll-mt-24">
        <SectionShell
          eyebrow={safeLocale === "tr" ? "Hangi iş akışı hangi araca daha yakın?" : "Which workflow is closer to which tool?"}
          title={safeLocale === "tr" ? "Hangi iş akışı hangi araca daha yakın?" : "Which workflow is closer to which tool?"}
          description={
            safeLocale === "tr"
              ? `${leftTool.name} kısa ürün açıklamalarında, ${rightTool.name} ise daha esnek yeniden yazım ve uzun form düzeninde daha doğal hissedebilir.`
              : `${leftTool.name} may feel faster for short descriptions, while ${rightTool.name} can feel more flexible for longer rewriting and structure.`}
          className="px-0 sm:px-0 lg:px-0"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[leftTool, rightTool].map((tool) => (
              <div key={tool.slug} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5 shadow-[0_16px_48px_-30px_rgba(14,165,233,0.1)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{tool.name}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-100">{tool.bestUseCase}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{tool.whoShouldUseSummary}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>

      <div id="son-karar" className="scroll-mt-24">
        <section className="rounded-[34px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(10,16,30,0.98))] px-6 py-8 shadow-[0_28px_80px_-42px_rgba(14,165,233,0.14)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{safeLocale === "tr" ? "Pratik sonuç" : "Practical result"}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{safeLocale === "tr" ? "Bir kazanan zorlamadan karar ver" : "Decide without forcing a winner"}</h2>
              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
                {safeLocale === "tr"
                  ? "Kısa ürün kartları için daha hızlı taslak, uzun form açıklamalar için daha esnek yeniden yazım daha mantıklı olabilir."
                  : "Short product cards may need the faster draft path, while longer descriptions may need the more flexible rewriting path."}
              </p>
            </div>
            <ComparisonActionGrid
              locale={safeLocale}
              tools={[
                { name: leftTool.name, openHref: leftOfficialHref, reviewHref: `/${safeLocale}/tools/${leftTool.slug}` },
                { name: rightTool.name, openHref: rightOfficialHref, reviewHref: `/${safeLocale}/tools/${rightTool.slug}` }
              ]}
              neutralHref={`/${safeLocale}/compare-auto/${leftTool.slug}-vs-${rightTool.slug}`}
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
              <p className="text-sm font-semibold text-slate-100">{leftTool.name}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{safeLocale === "tr" ? "Kısa SKU ve hızlı satış cümlesi" : "Short SKU and fast sales lines"}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {safeLocale === "tr"
                  ? "Kısa ürün kartları ve hızlı kampanya varyasyonları için güçlü bir başlangıç olabilir."
                  : "It can be a strong starting point for short product cards and quick campaign variations."}
              </p>
            </div>
            <div className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
              <p className="text-sm font-semibold text-slate-100">{rightTool.name}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{safeLocale === "tr" ? "Uzun form ve esnek yeniden yazım" : "Long-form and flexible rewriting"}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {safeLocale === "tr"
                  ? "Daha uzun ürün sayfaları ve müşteri revizyon akışları için daha rahat hissedebilir."
                  : "It can feel more comfortable for longer product pages and client revision flows."}
              </p>
            </div>
          </div>
        </section>
      </div>

      {alternatives.length ? (
        <InfoSection
          title={safeLocale === "tr" ? "İlgili alternatifler" : "Related alternatives"}
          description={safeLocale === "tr" ? "Karar alanını daraltmak için benzer araçların alternatif sayfalarına da göz atın." : "Review nearby alternatives if you want to narrow the decision further."}
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {alternatives.map((tool) => (
              <ToolCard
                key={tool.slug}
                locale={safeLocale}
                tool={tool}
                categoryNames={tool.categorySlugs.map((item) => categoryNamesMap.get(item) ?? item)}
                pricingLabel={formatPricing(tool.pricing, safeLocale)}
                detailLabel={content.common.viewDetailsLabel}
                bestForLabel={safeLocale === "tr" ? "En uygun" : "Best fit"}
                useCaseLabel={tool.bestUseCase}
                compareHref={buildComparisonPath(safeLocale, leftTool.slug, tool.slug)}
              />
            ))}
          </div>
        </InfoSection>
      ) : null}

      {relatedBlogArticles.length ? (
        <SectionShell
          eyebrow={safeLocale === "tr" ? "İlgili bloglar" : "Related blog posts"}
          title={safeLocale === "tr" ? "İlgili bloglar" : "Related blog posts"}
          description={safeLocale === "tr" ? "Bu karşılaştırmayı destekleyen editoryal rehberleri de inceleyin." : "Use these editorial guides to add more context before deciding."}
          className="px-0 sm:px-0 lg:px-0"
          contentClassName="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {relatedBlogArticles.map((article) => (
            <BlogCard key={article.slug} locale={safeLocale} article={article} ctaLabel={safeLocale === "tr" ? "Rehberi oku" : "Read guide"} />
          ))}
        </SectionShell>
      ) : null}

      <InfoSection
        title={safeLocale === "tr" ? "İlgili compare sayfaları" : "Related comparisons"}
        description={safeLocale === "tr" ? "Kararı daha da netleştirmek için yakın karşılaştırmaları da açın." : "Open nearby comparisons to make the decision clearer."}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Shopify Magic vs Copy.ai",
              description: safeLocale === "tr" ? "Mağaza içi metin ile daha satış odaklı ürün kopyası arasındaki farkı görün." : "Compare store-native text with a sharper sales-led product copy workflow.",
              href: `/${safeLocale}/compare/shopify-magic-vs-copy-ai`
            },
            {
              title: "Jasper vs Copy.ai",
              description: safeLocale === "tr" ? "Daha uzun satış dili ile hızlı taslak üretimini yan yana inceleyin." : "Review longer sales language against faster draft-led workflows.",
              href: `/${safeLocale}/compare/jasper-vs-copy-ai`
            },
            {
              title: "ChatGPT vs Jasper",
              description: safeLocale === "tr" ? "Esnek yeniden yazım ile daha satış odaklı ton arasındaki farkı test edin." : "Test flexible rewriting against a more sales-oriented tone.",
              href: `/${safeLocale}/compare/chatgpt-vs-jasper-for-freelancers`
            }
          ].map((item) => (
            <div key={item.href} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">{safeLocale === "tr" ? "Karşılaştırma" : "Comparison"}</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-100">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              <div className="mt-5">
                <PremiumButton href={item.href} variant="secondary" className="w-full">{safeLocale === "tr" ? "Karşılaştır" : "Compare"}</PremiumButton>
              </div>
            </div>
          ))}
        </div>
      </InfoSection>

      <div id="faq" className="scroll-mt-24">
        <ComparisonFaq title={safeLocale === "tr" ? "Sık sorulan sorular" : "FAQ"} description={safeLocale === "tr" ? "Ürün açıklaması yazımında en sık sorulan sorulara kısa ve nötr cevaplar." : "Short neutral answers to the most common product-description questions."} items={faqItems} />
      </div>
    </div>
  );
}
