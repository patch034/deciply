"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ToolCard as ToolCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RatingBadge } from "@/components/ui/rating-badge";

function getPricingSignal(pricing: string) {
  const normalized = pricing.toLowerCase();

  if (normalized.includes("free") || normalized.includes("ücretsiz")) {
    if (normalized.includes("freemium") || normalized.includes("kısmen")) {
      return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.36)]";
    }

    return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.36)]";
  }

  if (normalized.includes("freemium") || normalized.includes("kısmen")) {
    return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.36)]";
  }

  return "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.32)]";
}

type ToolCardProps = {
  locale: string;
  tool: ToolCardType;
  detailLabel: string;
  tryLabel: string;
  bestForLabel: string;
  ratingLabel: string;
};

export function ToolCard({ locale, tool, detailLabel, tryLabel, bestForLabel, ratingLabel }: ToolCardProps) {
  const pricingSignal = getPricingSignal(tool.pricing);
  const notIdealLabel = locale === "tr" ? "Çok uygun olmayabilir" : "May be less ideal for";

  return (
    <motion.div whileHover={{ y: -4, scale: 1.012 }} transition={{ duration: 0.22 }} className="h-full">
      <GlassPanel className="group ui-card ui-card-hover home-card-glow relative flex h-full flex-col justify-between overflow-hidden p-4 sm:p-6">
        <div className="flex min-h-[48px] flex-wrap items-center justify-between gap-3 overflow-hidden sm:min-h-[52px]">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_-16px_rgba(37,99,235,0.34)]">
              {tool.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-400">{tool.category}</p>
              <p className="mt-1 truncate text-sm font-medium text-slate-200">{tool.note}</p>
            </div>
          </div>
          <Badge variant="muted" className="max-w-[120px] shrink-0 justify-center gap-2 text-[11px]">
            <span className={`h-2 w-2 shrink-0 rounded-full ${pricingSignal}`} />
            <span className="truncate">{tool.pricing}</span>
          </Badge>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mt-5 min-w-0 sm:mt-6">
            <Link
              href={`/${locale}${tool.href}`}
              aria-label={`${detailLabel}: ${tool.name}`}
              className="clamp-2 block text-[1.2rem] font-bold leading-tight tracking-[-0.03em] text-slate-50 transition duration-200 hover:text-white sm:text-[1.48rem]"
            >
              {tool.name}
            </Link>
            <p className="mobile-clamp-2 mt-3 text-[15px] leading-relaxed text-slate-300/88 sm:mt-4">{tool.description}</p>

            {tool.useCaseTags.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.useCaseTags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="ghost" className="text-[11px] text-cyan-100/92">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>

          <div className="ui-inner-panel mt-3 min-w-0 p-4 sm:mt-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{bestForLabel}</p>
            <p className="mt-2 truncate text-base font-semibold text-slate-100">{tool.bestFor}</p>
            <p className="mobile-clamp-2 mt-2 text-[15px] leading-relaxed text-slate-300/84">{tool.benefit}</p>
          </div>

          <div className="ui-inner-panel mt-3 hidden min-w-0 p-4 sm:mt-5 sm:block">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Deciply notu</p>
            <p className="mobile-clamp-2 mt-2 text-[15px] leading-relaxed text-slate-200/88">{tool.editorNote}</p>
          </div>

          {tool.notIdealFor ? (
            <div className="mt-4 hidden rounded-[20px] border border-sky-400/10 bg-slate-950/50 px-4 py-3 sm:block">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{notIdealLabel}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300/88">{tool.notIdealFor}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-4 border-t border-sky-400/10 pt-4 sm:mt-6 sm:pt-6">
          <div className="min-h-[1.5rem] overflow-hidden pb-2">
            <p className="translate-y-2 text-sm font-medium text-cyan-100/92 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {tool.benefit}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 shrink-0 pb-0.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{ratingLabel}</p>
              <RatingBadge rating={tool.rating} className="mt-1 w-fit" />
            </div>
            <div className="min-w-0 sm:ml-4 sm:flex sm:justify-end">
              <a
                href={tool.affiliateUrl ?? tool.websiteUrl}
                target="_blank"
                rel="nofollow sponsored noreferrer"
                className="inline-flex min-h-[44px] w-full min-w-[152px] items-center justify-center whitespace-nowrap rounded-[10px] bg-[linear-gradient(90deg,#2563EB_0%,#3B82F6_52%,#06B6D4_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_22px_52px_-28px_rgba(37,99,235,0.6),0_30px_82px_-42px_rgba(14,165,233,0.42)] transition duration-150 hover:-translate-y-1 hover:scale-[1.03] hover:brightness-[1.08] hover:shadow-[0_28px_62px_-28px_rgba(37,99,235,0.7),0_38px_96px_-42px_rgba(14,165,233,0.52)] sm:w-auto"
              >
                {tool.ctaLabel ?? tryLabel}
              </a>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}


