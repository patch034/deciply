"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { buildComparisonPath } from "@/lib/comparisons";
import { buildAlternativesPath, buildUseCasePath } from "@/lib/intent-pages";

import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";
import { StatBadge } from "@/components/ui/stat-badge";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
};

function getQuickLinks(locale: Locale) {
  return [
    {
      label: locale === "tr" ? "Karşılaştırmalar" : "Comparisons",
      href: `/${locale}/categories/comparisons`
    },
    {
      label: locale === "tr" ? "Araçlar" : "Tools",
      href: `/${locale}/tools`
    },
    {
      label: locale === "tr" ? "Blog" : "Blog",
      href: `/${locale}/blog`
    },
    {
      label: locale === "tr" ? "Canlı karşılaştırma" : "Live compare",
      href: `/${locale}/compare-auto`
    },
    {
      label: locale === "tr" ? "Para kazanma" : "Make money",
      href: buildUseCasePath(locale, "freelancers")
    }
  ];
}

function getPopularShortcuts(locale: Locale) {
  return [
    {
      label: "ChatGPT vs Claude",
      href: buildComparisonPath(locale, "chatgpt", "claude")
    },
    {
      label: "ChatGPT alternatives",
      href: buildAlternativesPath(locale, "chatgpt")
    },
    {
      label: locale === "tr" ? "Öğrenciler" : "Students",
      href: buildUseCasePath(locale, "students")
    }
  ];
}

export function HeroSection({ locale, content }: HeroSectionProps) {
  const quickLinks = getQuickLinks(locale);
  const shortcuts = getPopularShortcuts(locale);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] overflow-hidden">
        <div className="absolute left-[8%] top-10 h-56 w-56 rounded-full bg-sky-200/55 blur-3xl" />
        <div className="absolute right-[6%] top-4 h-72 w-72 rounded-full bg-cyan-200/55 blur-3xl" />
        <div className="absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/80 blur-3xl" />
      </div>

      <div className="rounded-[38px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.98))] shadow-[0_28px_90px_-52px_rgba(15,23,42,0.18)]">
        <div className="grid gap-8 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-8">
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
              className="balance-text mt-4 max-w-4xl text-[clamp(2.4rem,5vw,4.9rem)] font-black leading-[0.98] tracking-[-0.07em] text-slate-950 sm:mt-6"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.56, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-[1.03rem]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.description}
            </motion.p>

            <motion.form
              action={`/${locale}/tools`}
              method="get"
              className="mt-6 flex w-full max-w-2xl flex-col gap-3 sm:mt-7 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <label className="sr-only" htmlFor="homepage-search">
                {locale === "tr" ? "Araç ara" : "Search tools"}
              </label>
              <div className="flex flex-1 items-center gap-3 rounded-[18px] border border-slate-200 bg-white px-4 py-3 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.18)]">
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
                className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#2563EB_0%,#3B82F6_52%,#06B6D4_100%)] px-4 text-sm font-semibold text-white shadow-[0_22px_52px_-28px_rgba(37,99,235,0.5)] transition hover:-translate-y-0.5 hover:brightness-[1.03] sm:w-auto"
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
              <PremiumButton href={`/${locale}/categories/comparisons`} variant="secondary" className="w-full sm:w-auto">
                {content.secondaryCta}
              </PremiumButton>
              <span className="text-sm font-medium leading-6 text-slate-500">{content.trustLine}</span>
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
                  className="inline-flex min-h-[38px] items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 text-[13px] font-semibold text-slate-600 transition hover:border-sky-200 hover:text-slate-950"
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
              className="mt-4 text-sm font-medium leading-6 text-slate-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.starterHint || content.panelFootnote}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full flex-col rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_26px_80px_-44px_rgba(15,23,42,0.16)] sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{content.panelEyebrow}</p>
                  <h2 className="balance-text mt-3 text-[1.25rem] font-bold tracking-[-0.04em] text-slate-950 sm:text-[1.65rem]">
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
                {content.panelItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="rounded-[22px] border border-slate-200 bg-slate-50/90 p-4"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, delay: 0.22 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-950">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{item.meta}</p>
                      </div>
                      <Badge variant="ghost" className="shrink-0 text-[11px] text-sky-700">
                        {item.value}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 rounded-[22px] border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-cyan-50 p-4">
                <p className="text-sm leading-7 text-slate-600">{content.panelFootnote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
