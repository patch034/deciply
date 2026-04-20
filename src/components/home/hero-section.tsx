"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { getContentBaseLocale, localizeTree } from "@/lib/locale-copy";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
};

const quickLinkBase = {
  tr: [
    { label: "Kategoriler", href: "/categories" },
    { label: "Araçlar", href: "/tools" },
    { label: "Karşılaştırmalar", href: "/compare" },
    { label: "Canlı karşılaştırma", href: "/compare-auto" },
    { label: "Bloglar", href: "/blog" },
    { label: "AI Haberleri", href: "/news" }
  ],
  en: [
    { label: "Categories", href: "/categories" },
    { label: "Tools", href: "/tools" },
    { label: "Comparisons", href: "/compare" },
    { label: "Live compare", href: "/compare-auto" },
    { label: "Blogs", href: "/blog" },
    { label: "AI News", href: "/news" }
  ]
} as const;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15 15 4.5 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

export function HeroSection({ locale, content }: HeroSectionProps) {
  const quickLinks = localizeTree(locale, quickLinkBase[getContentBaseLocale(locale)]);
  const searchPlaceholder =
    locale === "tr"
      ? "Araç, kategori veya karşılaştırma ara..."
      : "Search tools, categories, or comparisons...";

  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] overflow-hidden">
        <div className="absolute left-[8%] top-10 h-64 w-64 rounded-full bg-[#bfd2f6]/45 blur-3xl" />
        <div className="absolute right-[8%] top-8 h-72 w-72 rounded-full bg-[#dbeafe]/70 blur-3xl" />
        <div className="absolute left-1/2 top-20 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
      </div>

      <div className="ui-card rounded-[36px] px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="ghost">{content.badge}</Badge>
          </motion.div>

          <motion.h1
            className="mt-5 max-w-5xl text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.98] tracking-[-0.07em] text-slate-950"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-headline-stack">
              <span className="hero-headline-base">{content.title}</span>
              <span aria-hidden="true" className="hero-headline-overlay">
                {content.title}
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.description}
          </motion.p>

          <motion.form
            action={`/${locale}/tools`}
            method="get"
            className="mt-7 w-full max-w-4xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className="sr-only" htmlFor="homepage-search">
              {locale === "tr" ? "Araç ara" : "Search tools"}
            </label>
            <div className="flex min-h-[72px] items-center gap-3 rounded-[28px] border border-slate-200 bg-white p-2.5 text-left shadow-[0_18px_44px_rgba(15,23,42,0.1)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border border-slate-200 bg-slate-50 text-slate-400">
                <SearchIcon />
              </div>
              <input
                id="homepage-search"
                name="q"
                type="search"
                placeholder={searchPlaceholder}
                className="h-14 flex-1 border-0 bg-transparent px-0 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-[20px] bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_52%,#3B82F6_100%)] px-5 text-sm font-semibold text-white shadow-[0_20px_48px_-28px_rgba(37,99,235,0.42)] transition hover:-translate-y-0.5 hover:brightness-[1.03]"
              >
                {locale === "tr" ? "Ara" : "Search"}
              </button>
            </div>
          </motion.form>

          <motion.div
            className="mt-4 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            {quickLinks.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`} className="ui-nav-pill ui-nav-pill-muted">
                {item.label}
              </Link>
            ))}
          </motion.div>

          <motion.p
            className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[0.98rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.trustLine}
          </motion.p>

          <motion.div
            className="mt-6 grid w-full gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.stats.map((stat) => (
              <div key={stat.label} className="ui-inner-panel px-5 py-4 text-left">
                <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0E2450]">
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
