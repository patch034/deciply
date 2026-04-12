"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

export function HeroSection({ locale, content }: HeroSectionProps) {
  const quickLinks = getQuickLinks(locale);
  const shortcuts = getPopularShortcuts(locale);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden">
        <div className="absolute left-[10%] top-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute right-[10%] top-6 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
      </div>

      <div className="rounded-[40px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.97))] shadow-[0_32px_104px_-56px_rgba(15,23,42,0.18)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="ghost" className="border-sky-200 bg-sky-50 text-sky-700">
              {content.badge}
            </Badge>
          </motion.div>

          <motion.h1
            className="balance-text mt-4 max-w-5xl text-[clamp(2.55rem,5vw,5rem)] font-black leading-[0.96] tracking-[-0.08em] text-slate-950 sm:mt-6"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.54, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.title}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-[1.04rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.description}
          </motion.p>

          <motion.form
            action={`/${locale}/tools`}
            method="get"
            className="mt-6 flex w-full max-w-4xl flex-col gap-3 sm:mt-7 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className="sr-only" htmlFor="homepage-search">
              {locale === "tr" ? "Araç ara" : "Search tools"}
            </label>
            <div className="flex flex-1 items-center gap-3 rounded-[24px] border border-slate-200/90 bg-white px-4 py-3.5 text-left shadow-[0_24px_56px_-32px_rgba(15,23,42,0.16)]">
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
            className="mt-4 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
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
            className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumButton href={`/${locale}/categories/comparisons`} variant="ghost" className="w-full sm:w-auto">
              {content.secondaryCta}
            </PremiumButton>
            <span className="text-sm font-medium leading-6 text-slate-600">{content.trustLine}</span>
          </motion.div>

          <motion.div
            className="mt-6 grid gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.stats.map((stat) => (
              <StatBadge key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </motion.div>

          <motion.div
            className="mt-6 flex w-full flex-col gap-3 rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 text-left shadow-[0_20px_56px_-38px_rgba(15,23,42,0.14)] sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {content.panelEyebrow}
              </p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                {content.panelFootnote}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {shortcuts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[38px] items-center rounded-full border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-600 transition hover:border-sky-200 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
