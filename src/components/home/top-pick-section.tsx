"use client";

import { motion } from "framer-motion";

import type { HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";

type TopPickSectionProps = {
  locale: Locale;
  content: HomeContent["topPick"];
};

export function TopPickSection({ locale, content }: TopPickSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <GlassPanel className="relative overflow-hidden rounded-[28px] border border-slate-700/60 bg-[linear-gradient(160deg,rgba(9,14,27,0.96),rgba(4,7,13,0.99))] px-6 py-7 shadow-[0_30px_88px_-44px_rgba(6,10,18,0.72)] lg:px-8 lg:py-8">
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-fuchsia-500/8 blur-3xl" />
        <div className="absolute right-6 top-4 h-28 w-28 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge variant="accent">{content.badge}</Badge>
            <h2 className="balance-text mt-4 text-[2rem] font-bold tracking-[-0.03em] text-slate-50 md:text-[2.35rem] md:leading-[1.08]">
              {content.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300/88 md:text-[1.05rem] md:leading-8">
              {content.description}
            </p>
          </div>

          <div className="ui-inner-panel border border-cyan-400/12 p-5 shadow-[0_20px_56px_-36px_rgba(34,211,238,0.22)]">
            <div className="grid gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{content.reasonLabel}</p>
                <p className="mt-2 text-sm leading-7 text-slate-200/88">{content.reason}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{content.useCaseLabel}</p>
                <p className="mt-2 text-sm leading-7 text-slate-200/88">{content.useCase}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/60 bg-slate-950/55 px-4 py-3 text-sm font-medium text-cyan-100/92 shadow-[0_16px_36px_-28px_rgba(34,211,238,0.22)]">
                {content.benefitLine}
              </div>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <PremiumButton href={`/${locale}${content.ctaHref}`} className="sm:flex-1">
                  {content.ctaLabel}
                </PremiumButton>
                <PremiumButton href={`/${locale}${content.secondaryCtaHref}`} variant="secondary" className="sm:flex-1">
                  {content.secondaryCtaLabel}
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.section>
  );
}
