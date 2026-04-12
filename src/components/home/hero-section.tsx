"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ComparisonCard as HomeComparisonCard, ToolCard as HomeToolCard } from "@/types/home";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { buildAlternativesPath, buildUseCasePath } from "@/lib/intent-pages";
import { buildComparisonPath } from "@/lib/comparisons";

import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { StatBadge } from "@/components/ui/stat-badge";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
  spotlightTools: HomeToolCard[];
  spotlightComparisons: HomeComparisonCard[];
};

function getQuickLinks(locale: Locale) {
  return [
    { label: locale === "tr" ? "Kategoriler" : "Categories", href: `/${locale}/categories` },
    { label: locale === "tr" ? "Araçlar" : "Tools", href: `/${locale}/tools` },
    { label: locale === "tr" ? "Karşılaştırmalar" : "Comparisons", href: `/${locale}/categories/comparisons` },
    { label: locale === "tr" ? "Blog" : "Blog", href: `/${locale}/blog` },
    { label: locale === "tr" ? "Canlı karşılaştırma" : "Live compare", href: `/${locale}/compare-auto` },
    { label: locale === "tr" ? "Öğrenciler" : "Students", href: buildUseCasePath(locale, "students") },
    { label: locale === "tr" ? "Freelancer'lar" : "Freelancers", href: buildUseCasePath(locale, "freelancers") }
  ];
}

function getPopularShortcuts(locale: Locale) {
  return [
    { label: "ChatGPT vs Claude", href: buildComparisonPath(locale, "chatgpt", "claude") },
    { label: "Claude vs Gemini", href: buildComparisonPath(locale, "claude", "gemini") },
    { label: "Perplexity vs ChatGPT", href: buildComparisonPath(locale, "perplexity", "chatgpt") },
    { label: locale === "tr" ? "ChatGPT alternatifleri" : "ChatGPT alternatives", href: buildAlternativesPath(locale, "chatgpt") }
  ];
}

function ToolSignalRow({ tool }: { tool: HomeToolCard }) {
  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white px-3 py-3 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.16)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.28)]">
        {tool.logoUrl ? (
          <img
            src={tool.logoUrl}
            alt={tool.name}
            className="h-full w-full object-cover p-1.5"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          tool.icon
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-slate-950">{tool.name}</p>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            {tool.pricing}
          </span>
        </div>
        <p className="mt-1 truncate text-[12px] leading-5 text-slate-600">{tool.category}</p>
      </div>
    </div>
  );
}

function ComparisonSignalRow({ locale, item }: { locale: Locale; item: HomeComparisonCard }) {
  return (
    <Link href={`/${locale}${item.href}`} className="group flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white px-3 py-3 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.16)] transition hover:border-sky-200 hover:bg-slate-50">
      <span className="flex shrink-0 items-center gap-1.5">
        {(item.logos ?? []).slice(0, 2).map((logo, index) => (
          <span
            key={`${logo.name}-${index}`}
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-[0_12px_24px_-20px_rgba(15,23,42,0.24)]"
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
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-950 transition group-hover:text-sky-700">{item.title}</p>
        <p className="mt-1 truncate text-[12px] leading-5 text-slate-600">{item.description}</p>
      </div>
      <span className="text-xs font-semibold text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-sky-600" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export function HeroSection({ locale, content, spotlightTools, spotlightComparisons }: HeroSectionProps) {
  const quickLinks = getQuickLinks(locale);
  const shortcuts = getPopularShortcuts(locale);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden">
        <div className="absolute left-[8%] top-8 h-64 w-64 rounded-full bg-sky-200/55 blur-3xl" />
        <div className="absolute right-[6%] top-6 h-80 w-80 rounded-full bg-cyan-200/55 blur-3xl" />
        <div className="absolute left-1/2 top-24 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-blue-100/82 blur-3xl" />
      </div>

      <div className="rounded-[40px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,249,253,0.98))] shadow-[0_32px_104px_-56px_rgba(15,23,42,0.2)]">
        <div className="grid gap-6 px-5 py-6 sm:px-6 sm:py-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:py-8">
          <div className="flex min-w-0 flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="ghost" className="border-sky-200 bg-sky-50 text-sky-700">
                {content.badge}
              </Badge>
            </motion.div>

            <motion.h1
              className="balance-text mt-4 max-w-4xl text-[clamp(2.55rem,5vw,5rem)] font-black leading-[0.96] tracking-[-0.075em] text-slate-950 sm:mt-6"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.56, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-[1.04rem]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.description}
            </motion.p>

            <motion.form
              action={`/${locale}/tools`}
              method="get"
              className="mt-6 flex w-full max-w-[46rem] flex-col gap-3 sm:mt-7 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <label className="sr-only" htmlFor="homepage-search">
                {locale === "tr" ? "Araç ara" : "Search tools"}
              </label>
              <div className="flex flex-1 items-center gap-3 rounded-[24px] border border-slate-200/90 bg-white px-4 py-3.5 shadow-[0_24px_56px_-32px_rgba(15,23,42,0.16)]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400">
                  <path d="M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m15 15 4.5 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                </svg>
                <input
                  id="homepage-search"
                  name="q"
                  type="search"
                  placeholder={locale === "tr" ? "Araç, kategori veya karşılaştırma ara..." : "Search tools, categories, or comparisons..."}
                  className="h-6 w-full border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[18px] bg-[linear-gradient(90deg,#2563EB_0%,#3B82F6_52%,#06B6D4_100%)] px-5 text-sm font-semibold text-white shadow-[0_24px_58px_-28px_rgba(37,99,235,0.46)] transition hover:-translate-y-0.5 hover:brightness-[1.03] sm:w-auto"
              >
                {content.primaryCta}
              </button>
            </motion.form>

            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition duration-200 hover:border-sky-200 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            <motion.div
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <PremiumButton href={`/${locale}/categories/comparisons`} variant="ghost" className="w-full sm:w-auto">
                {content.secondaryCta}
              </PremiumButton>
              <span className="text-sm font-medium leading-6 text-slate-600">{content.trustLine}</span>
            </motion.div>

            <motion.div
              className="mt-5 hidden flex-wrap gap-2 sm:flex"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {shortcuts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[38px] items-center rounded-full border border-slate-200/90 bg-slate-50 px-3.5 text-[13px] font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            <motion.dl
              className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.stats.map((stat) => (
                <StatBadge key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </motion.dl>

            <motion.p
              className="mt-4 text-sm font-medium leading-6 text-slate-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.panelFootnote}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full min-h-[540px] flex-col rounded-[34px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.98))] p-5 shadow-[0_30px_90px_-44px_rgba(15,23,42,0.18)] sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{content.panelEyebrow}</p>
                  <h2 className="balance-text mt-3 text-[1.3rem] font-bold tracking-[-0.04em] text-slate-950 sm:text-[1.7rem]">
                    {content.panelTitle}
                  </h2>
                </div>
                <div className="flex shrink-0 gap-2">
                  <span className="h-3 w-3 rounded-full bg-sky-300/60" />
                  <span className="h-3 w-3 rounded-full bg-cyan-400/80" />
                  <span className="h-3 w-3 rounded-full bg-blue-400/80" />
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{content.panelDescription}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {spotlightTools.slice(0, 4).map((tool) => (
                  <ToolSignalRow key={tool.href} tool={tool} />
                ))}
              </div>

              <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_48px_-30px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                      {locale === "tr" ? "Popüler karşılaştırmalar" : "Popular comparisons"}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {locale === "tr" ? "Toolify-benzeri karar akışı" : "Toolify-style decision flow"}
                    </p>
                  </div>
                  <Badge variant="ghost" className="text-[11px]">
                    VS
                  </Badge>
                </div>

                <div className="mt-4 space-y-2.5">
                  {spotlightComparisons.slice(0, 3).map((item) => (
                    <ComparisonSignalRow key={item.href} locale={locale} item={item} />
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {locale === "tr" ? "Araçlar" : "Tools"}
                  </p>
                  <p className="mt-2 text-[1.35rem] font-bold tracking-[-0.04em] text-slate-950">{content.stats[0]?.value}</p>
                </div>
                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {locale === "tr" ? "Rehberler" : "Guides"}
                  </p>
                  <p className="mt-2 text-[1.35rem] font-bold tracking-[-0.04em] text-slate-950">{content.stats[1]?.value}</p>
                </div>
                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {locale === "tr" ? "Keşif" : "Discovery"}
                  </p>
                  <p className="mt-2 text-[1.35rem] font-bold tracking-[-0.04em] text-slate-950">{content.stats[2]?.value}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
