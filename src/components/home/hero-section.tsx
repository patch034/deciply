"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { buildComparisonPath } from "@/lib/comparisons";
import { buildAlternativesPath, buildUseCasePath } from "@/lib/intent-pages";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { StatBadge } from "@/components/ui/stat-badge";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
};

function getQuickLinks(locale: Locale) {
  return [
    {
      label: locale === "tr" ? "ChatGPT vs Claude" : "ChatGPT vs Claude",
      href: buildComparisonPath(locale, "chatgpt", "claude")
    },
    {
      label: locale === "tr" ? "ChatGPT alternatifleri" : "ChatGPT alternatives",
      href: buildAlternativesPath(locale, "chatgpt")
    },
    {
      label: locale === "tr" ? "Öğrenciler için araçlar" : "Tools for students",
      href: buildUseCasePath(locale, "students")
    },
    {
      label: locale === "tr" ? "Editör seçimleri" : "Editor picks",
      href: `/${locale}#editor-picks`
    }
  ];
}

export function HeroSection({ locale, content }: HeroSectionProps) {
  const hasStarterHint = Boolean(content.starterHint && content.starterHintLabel && content.starterHintHref);
  const quickLinks = getQuickLinks(locale);

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-4 pt-3 sm:px-6 sm:pt-5 lg:pt-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden">
        <motion.div
          className="absolute left-[2%] top-10 h-72 w-72 rounded-full bg-sky-500/18 blur-3xl"
          animate={{ opacity: [0.42, 0.82, 0.42], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[5%] top-0 h-80 w-80 rounded-full bg-cyan-400/16 blur-3xl"
          animate={{ opacity: [0.34, 0.72, 0.34], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <GlassPanel className="relative overflow-hidden rounded-[32px] border-sky-400/10 bg-[linear-gradient(180deg,rgba(6,10,18,0.96),rgba(10,16,30,0.98))] px-4 py-4 shadow-[0_30px_90px_-58px_rgba(14,165,233,0.14)] sm:px-6 sm:py-5">
        <div className="absolute inset-x-12 top-0 h-36 rounded-full bg-sky-500/12 blur-3xl" />
        <div className="absolute -right-24 top-10 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute left-20 bottom-0 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="dark">{content.badge}</Badge>
            </motion.div>

            <motion.h1
              className="balance-text mt-4 max-w-4xl bg-gradient-to-r from-white via-sky-100 to-cyan-100 bg-clip-text pb-2 text-[28px] font-extrabold leading-[1.14] tracking-[-0.05em] text-transparent sm:mt-6 sm:text-5xl lg:text-[3.9rem] lg:leading-[1.08]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-300/82 sm:mt-5 sm:text-base sm:leading-8 lg:text-[1.04rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.description}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <PremiumButton href={`/${locale}/tools`} className="w-full text-sm sm:w-auto">
                {content.primaryCta}
              </PremiumButton>
              <PremiumButton href={`/${locale}/categories/comparisons`} variant="secondary" className="w-full text-sm opacity-90 sm:w-auto">
                {content.secondaryCta}
              </PremiumButton>
            </motion.div>

            <motion.div
              className="mt-4 hidden flex-wrap gap-2 sm:flex"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-sky-400/12 bg-slate-950/42 px-4 text-sm font-semibold text-slate-200 transition duration-200 hover:border-cyan-400/20 hover:text-cyan-100"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            <motion.p
              className="mt-3 text-sm font-medium leading-6 text-cyan-100/88"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.trustLine}
            </motion.p>

            {hasStarterHint ? (
              <motion.div
                className="mt-4 flex flex-wrap items-center gap-2 text-sm leading-6 text-slate-300/82"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.46, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{content.starterHint}</span>
                <Link href={`/${locale}${content.starterHintHref}`} className="inline-flex items-center gap-2 font-semibold text-cyan-100 transition duration-200 hover:text-cyan-50">
                  <span aria-hidden="true">→</span>
                  <span>{content.starterHintLabel}</span>
                </Link>
              </motion.div>
            ) : null}

            <motion.div
              className="mt-6 flex flex-wrap gap-2 sm:mt-7"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.trustBadges.map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </motion.div>

            <motion.dl
              className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.stats.map((stat) => (
                <StatBadge key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ui-card-strong rounded-[28px] p-3 text-white sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/78">{content.panelEyebrow}</p>
                  <h2 className="balance-text mt-3 text-[1.25rem] font-bold tracking-[-0.03em] text-slate-100 sm:text-2xl">
                    {content.panelTitle}
                  </h2>
                </div>
                <div className="flex shrink-0 gap-2 opacity-70">
                  <span className="h-3 w-3 rounded-full bg-sky-300/26" />
                  <span className="h-3 w-3 rounded-full bg-cyan-400/80" />
                  <span className="h-3 w-3 rounded-full bg-cyan-400" />
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300/78">{content.panelDescription}</p>

              <div className="mt-5 space-y-3 sm:mt-6">
                {content.panelItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="ui-inner-panel min-w-0 rounded-[20px] p-3 sm:p-4"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, delay: 0.24 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-100">{item.title}</p>
                        <p className="clamp-2 mt-1 text-sm leading-6 text-slate-300/80">{item.meta}</p>
                      </div>
                      <Badge variant="accent" className="max-w-[72px] shrink-0 justify-center text-[11px]">
                        {item.value}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="ui-inner-panel mt-4 rounded-[20px] p-3 sm:mt-5 sm:p-4">
                <p className="text-sm leading-7 text-slate-300/76">{content.panelFootnote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </GlassPanel>
    </section>
  );
}

