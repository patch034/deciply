"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { GlobalSmartSearch } from "@/components/home/global-smart-search";
import { Badge } from "@/components/ui/badge";
import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import type { HomeSearchItem } from "@/lib/home-search";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
  searchItems: HomeSearchItem[];
};

const quickLinkBase: Record<Locale, { label: string; href: string }[]> = {
  tr: [
    { label: "Kategoriler", href: "/categories" },
    { label: "Araçlar", href: "/tools" },
    { label: "Karşılaştırmalar", href: "/compare" },
    { label: "Canlı karşılaştırma", href: "/compare-auto" },
    { label: "Blog", href: "/blog" },
    { label: "AI Haberleri", href: "/news" }
  ],
  en: [
    { label: "Categories", href: "/categories" },
    { label: "Tools", href: "/tools" },
    { label: "Comparisons", href: "/compare" },
    { label: "Live compare", href: "/compare-auto" },
    { label: "Blog", href: "/blog" },
    { label: "AI News", href: "/news" }
  ],
  ar: [
    { label: "الفئات", href: "/categories" },
    { label: "الأدوات", href: "/tools" },
    { label: "المقارنات", href: "/compare" },
    { label: "مقارنة مباشرة", href: "/compare-auto" },
    { label: "المدونة", href: "/blog" },
    { label: "أخبار AI", href: "/news" }
  ],
  ru: [
    { label: "Категории", href: "/categories" },
    { label: "Инструменты", href: "/tools" },
    { label: "Сравнения", href: "/compare" },
    { label: "Онлайн-сравнение", href: "/compare-auto" },
    { label: "Блог", href: "/blog" },
    { label: "Новости AI", href: "/news" }
  ],
  zh: [
    { label: "分类", href: "/categories" },
    { label: "工具", href: "/tools" },
    { label: "对比", href: "/compare" },
    { label: "实时对比", href: "/compare-auto" },
    { label: "博客", href: "/blog" },
    { label: "AI 新闻", href: "/news" }
  ],
  ja: [
    { label: "カテゴリ", href: "/categories" },
    { label: "ツール", href: "/tools" },
    { label: "比較", href: "/compare" },
    { label: "ライブ比較", href: "/compare-auto" },
    { label: "ブログ", href: "/blog" },
    { label: "AIニュース", href: "/news" }
  ],
  ko: [
    { label: "카테고리", href: "/categories" },
    { label: "도구", href: "/tools" },
    { label: "비교", href: "/compare" },
    { label: "실시간 비교", href: "/compare-auto" },
    { label: "블로그", href: "/blog" },
    { label: "AI 뉴스", href: "/news" }
  ],
  el: [
    { label: "Κατηγορίες", href: "/categories" },
    { label: "Εργαλεία", href: "/tools" },
    { label: "Συγκρίσεις", href: "/compare" },
    { label: "Ζωντανή σύγκριση", href: "/compare-auto" },
    { label: "Blog", href: "/blog" },
    { label: "AI News", href: "/news" }
  ],
  da: [
    { label: "Kategorier", href: "/categories" },
    { label: "Værktøjer", href: "/tools" },
    { label: "Sammenligninger", href: "/compare" },
    { label: "Live-sammenligning", href: "/compare-auto" },
    { label: "Blog", href: "/blog" },
    { label: "AI-nyheder", href: "/news" }
  ],
  fa: [
    { label: "دسته‌ها", href: "/categories" },
    { label: "ابزارها", href: "/tools" },
    { label: "مقایسه‌ها", href: "/compare" },
    { label: "مقایسه زنده", href: "/compare-auto" },
    { label: "وبلاگ", href: "/blog" },
    { label: "اخبار AI", href: "/news" }
  ]
};

const statCopy: Record<Locale, string> = {
  tr: "Güncel",
  en: "Live",
  ar: "مباشر",
  ru: "Актуально",
  zh: "实时",
  ja: "更新中",
  ko: "실시간",
  el: "Live",
  da: "Live",
  fa: "زنده"
};

export function HeroSection({ locale, content, searchItems }: HeroSectionProps) {
  const quickLinks = quickLinkBase[locale];

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

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlobalSmartSearch locale={locale} items={searchItems} />
          </motion.div>

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
                  {statCopy[locale]}
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
