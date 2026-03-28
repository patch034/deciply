"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import { StatBadge } from "@/components/ui/stat-badge";

type HeroSectionProps = {
  locale: Locale;
  content: HomeContent["hero"];
};

export function HeroSection({ locale, content }: HeroSectionProps) {
  const hasStarterHint = Boolean(content.starterHint && content.starterHintLabel && content.starterHintHref);

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 pt-8 lg:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] overflow-hidden">
        <motion.div
          className="absolute left-[2%] top-10 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl"
          animate={{ opacity: [0.42, 0.82, 0.42], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[5%] top-0 h-80 w-80 rounded-full bg-sky-500/26 blur-3xl"
          animate={{ opacity: [0.34, 0.72, 0.34], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/16 blur-3xl" />
      </div>

      <GlassPanel className="relative rounded-2xl px-6 py-8">
        <div className="absolute inset-x-12 top-0 h-40 rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute -right-24 top-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute left-20 bottom-0 h-28 w-28 rounded-full bg-blue-500/14 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="dark">{content.badge}</Badge>
            </motion.div>

            <motion.h1
              className="balance-text mt-6 max-w-4xl bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text pb-2 text-4xl font-extrabold tracking-[-0.05em] leading-[1.2] text-transparent sm:text-5xl lg:text-[4rem] lg:leading-[1.2]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-2xl text-base leading-8 text-slate-300/82 lg:text-[1.04rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <PremiumButton
                href={`/${locale}/tools`}
                className="h-10 px-4 text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_64px_-24px_rgba(108,92,231,0.84),0_38px_108px_-36px_rgba(0,194,255,0.68)]"
              >
                {content.primaryCta}
              </PremiumButton>
              <PremiumButton href={`/${locale}/categories/comparisons`} variant="secondary" className="h-10 px-4 text-sm opacity-90">
                {content.secondaryCta}
              </PremiumButton>
            </motion.div>

            <motion.p
              className="mt-3 text-sm font-medium text-cyan-200/88"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.trustLine}
            </motion.p>

            {hasStarterHint ? (
              <motion.div
                className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-300/84"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.46, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{content.starterHint}</span>
                <Link
                  href={`/${locale}${content.starterHintHref}`}
                  className="inline-flex items-center gap-2 font-semibold text-cyan-200 transition duration-200 hover:text-cyan-100"
                >
                  <span aria-hidden="true">→</span>
                  <span>{content.starterHintLabel}</span>
                </Link>
              </motion.div>
            ) : null}

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.trustBadges.map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </motion.div>

            <motion.dl
              className="mt-8 grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
            <div className="ui-card-strong rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200/78">
                    {content.panelEyebrow}
                  </p>
                  <h2 className="balance-text mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-100">{content.panelTitle}</h2>
                </div>
                <div className="flex shrink-0 gap-2 opacity-70">
                  <span className="h-3 w-3 rounded-full bg-white/20" />
                  <span className="h-3 w-3 rounded-full bg-sky-400/70" />
                  <span className="h-3 w-3 rounded-full bg-cyan-400" />
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300/78">{content.panelDescription}</p>

              <div className="mt-7 space-y-3">
                {content.panelItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="ui-inner-panel min-w-0 rounded-2xl p-4"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, delay: 0.24 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-100">{item.title}</p>
                        <p className="clamp-2 mt-1 text-sm leading-6 text-slate-300/74">{item.meta}</p>
                      </div>
                      <Badge variant="accent" className="max-w-[72px] shrink-0 justify-center text-[11px]">
                        {item.value}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="ui-inner-panel mt-6 rounded-2xl p-4">
                <p className="text-sm leading-7 text-slate-300/76">{content.panelFootnote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </GlassPanel>
    </section>
  );
}


