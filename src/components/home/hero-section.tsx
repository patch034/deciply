"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { getComparisonDirectoryCards } from "@/lib/comparisons";
import { blogArticles } from "@/data/blog";
import { getLocalizedTools } from "@/lib/catalog";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
};

type HeroStat = {
  value: string;
  label: string;
};

function getQuickLinks(locale: Locale) {
  return [
    { label: locale === "tr" ? "Kategoriler" : "Categories", href: `/${locale}/categories` },
    { label: locale === "tr" ? "Araçlar" : "Tools", href: `/${locale}/tools` },
    { label: locale === "tr" ? "Karşılaştırmalar" : "Comparisons", href: `/${locale}/categories/comparisons` },
    { label: locale === "tr" ? "Canlı karşılaştırma" : "Live compare", href: `/${locale}/compare-auto` },
    { label: locale === "tr" ? "Bloglar" : "Blogs", href: `/${locale}/blog` },
    { label: locale === "tr" ? "AI Haberleri" : "AI News", href: `/${locale}/news` }
  ];
}

function getHeroStats(locale: Locale): HeroStat[] {
  return [
    { value: String(getLocalizedTools(locale).length), label: locale === "tr" ? "Güncel AI araç" : "Live AI tools" },
    { value: String(blogArticles.length), label: locale === "tr" ? "Blog içeriği" : "Blog content" },
    { value: String(getComparisonDirectoryCards(locale).length), label: locale === "tr" ? "Karşılaştırma" : "Comparisons" }
  ];
}

function renderHeroTitle(locale: Locale) {
  if (locale === "tr") {
    return (
      <span className="hero-headline-stack">
        <span className="hero-headline-base">En iyi AI araçlarını, sitelerini ve karşılaştırmaları keşfet</span>
        <span aria-hidden="true" className="hero-headline-overlay">
          En iyi AI araçlarını, sitelerini ve karşılaştırmaları keşfet
        </span>
      </span>
    );
  }

  return (
    <span className="hero-headline-stack">
      <span className="hero-headline-base">Discover the best AI tools, websites, and comparisons explore</span>
      <span aria-hidden="true" className="hero-headline-overlay">
        Discover the best AI tools, websites, and comparisons explore
      </span>
    </span>
  );
}

export function HeroSection({ locale, content }: HeroSectionProps) {
  const quickLinks = getQuickLinks(locale);
  const stats = getHeroStats(locale);

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden">
        <div className="absolute left-[10%] top-8 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute right-[10%] top-6 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />
      </div>

      <div className="rounded-[40px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.97))] shadow-[0_32px_104px_-56px_rgba(15,23,42,0.18)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-9 text-center sm:px-8 sm:py-11 lg:px-10 lg:py-14">
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
            className="balance-text mt-4 max-w-5xl text-[clamp(2.55rem,5vw,5rem)] font-black leading-[0.98] tracking-[-0.075em] text-slate-950 sm:mt-6"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.54, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderHeroTitle(locale)}
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
            className="mt-6 w-full max-w-4xl sm:mt-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className="sr-only" htmlFor="homepage-search">
              {locale === "tr" ? "Araç ara" : "Search tools"}
            </label>
            <div className="flex min-h-[72px] items-center gap-3 rounded-[28px] border border-slate-200/90 bg-white/96 p-2.5 text-left shadow-[0_26px_72px_-38px_rgba(15,23,42,0.18)] ring-1 ring-white/70 backdrop-blur">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 text-slate-400 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.22)]">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path d="M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m15 15 4.5 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                </svg>
              </div>
              <input
                id="homepage-search"
                name="q"
                type="search"
                placeholder={
                  locale === "tr"
                    ? "Araç, kategori veya karşılaştırma ara..."
                    : "Search tools, categories, or comparisons..."
                }
                className="h-14 flex-1 border-0 bg-transparent px-0 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-[20px] bg-[linear-gradient(90deg,#2563EB_0%,#3B82F6_52%,#06B6D4_100%)] px-5 text-sm font-semibold text-white shadow-[0_24px_58px_-28px_rgba(37,99,235,0.46)] transition hover:-translate-y-0.5 hover:brightness-[1.03]"
              >
                {locale === "tr" ? "Ara" : "Search"}
              </button>
            </div>
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
                className="inline-flex min-h-[38px] items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition duration-200 hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>

          <motion.p
            className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[0.98rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.trustLine}
          </motion.p>

          <motion.div
            className="mt-6 grid w-full gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="home-card-glow rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,253,0.96))] px-5 py-4 text-left shadow-[0_18px_54px_-34px_rgba(15,23,42,0.14)]"
              >
                <div className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                  {locale === "tr" ? "Güncel" : "Live"}
                </div>
                <div className="mt-3 text-3xl font-black tracking-[-0.06em] text-slate-950">{stat.value}</div>
                <div className="mt-1 text-sm font-semibold text-slate-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
