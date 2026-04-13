"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ToolCard as ToolCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/ui/rating-badge";

type ToolCardProps = {
  locale: string;
  tool: ToolCardType;
  detailLabel: string;
  tryLabel: string;
  bestForLabel: string;
  ratingLabel: string;
  tone?: "dark" | "light";
};

function getPricingSignal(pricing: string) {
  const normalized = pricing.toLowerCase();

  if (normalized.includes("free") || normalized.includes("ücretsiz")) {
    if (normalized.includes("freemium") || normalized.includes("kısmen")) {
      return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.36)]";
    }

    return "bg-[#0055FF] shadow-[0_0_10px_rgba(0,85,255,0.28)]";
  }

  if (normalized.includes("freemium") || normalized.includes("kısmen")) {
    return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.36)]";
  }

  return "bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.28)]";
}

function toneClasses(tone: "dark" | "light") {
  return tone === "light"
    ? {
        shell:
          "border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))] shadow-[0_24px_72px_-40px_rgba(15,23,42,0.16)]",
        inner: "border-slate-200 bg-slate-50/80",
        text: "text-slate-900",
        subText: "text-slate-600",
        muted: "text-slate-500",
        cta:
          "bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] text-white shadow-[0_20px_48px_-28px_rgba(37,99,235,0.42)]",
        link: "text-slate-700",
        linkHover: "group-hover:text-[#0E2450]"
      }
    : {
        shell: "ui-card ui-card-hover home-card-glow border-sky-400/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(5,9,17,0.99))]",
        inner: "ui-inner-panel",
        text: "text-slate-50",
        subText: "text-slate-300/88",
        muted: "text-slate-400",
        cta:
          "bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] text-white shadow-[0_22px_52px_-28px_rgba(37,99,235,0.6),0_30px_82px_-42px_rgba(14,36,80,0.42)]",
        link: "text-slate-100",
        linkHover: "group-hover:text-white"
      };
}

export function ToolCard({ locale, tool, detailLabel, tryLabel, bestForLabel, ratingLabel, tone = "light" }: ToolCardProps) {
  const pricingSignal = getPricingSignal(tool.pricing);
  const notIdealLabel = locale === "tr" ? "Çok uygun olmayabilir" : "May be less ideal for";
  const styles = toneClasses(tone);

  return (
    <motion.div whileHover={{ y: -4, scale: 1.012 }} transition={{ duration: 0.22 }} className="h-full">
      <div className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_84px_-40px_rgba(15,23,42,0.18)] sm:p-6 ${styles.shell}`}>
        <div className="flex min-h-[48px] flex-wrap items-center justify-between gap-3 overflow-hidden sm:min-h-[52px]">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_-16px_rgba(37,99,235,0.34)]">
              {tool.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-xs font-medium ${styles.muted}`}>{tool.category}</p>
              <p className={`mt-1 truncate text-sm font-medium ${styles.subText}`}>{tool.note}</p>
            </div>
          </div>
          <Badge variant={tone === "light" ? "ghost" : "muted"} className="max-w-[120px] shrink-0 justify-center gap-2 text-[11px]">
            <span className={`h-2 w-2 shrink-0 rounded-full ${pricingSignal}`} />
            <span className="truncate">{tool.pricing}</span>
          </Badge>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mt-5 min-w-0 sm:mt-6">
            <Link
              href={`/${locale}${tool.href}`}
              aria-label={`${detailLabel}: ${tool.name}`}
              className={`clamp-2 block text-[1.2rem] font-bold leading-tight tracking-[-0.03em] transition duration-200 hover:opacity-90 sm:text-[1.48rem] ${styles.text}`}
            >
              {tool.name}
            </Link>
            <p className={`mobile-clamp-2 mt-3 text-[15px] leading-relaxed sm:mt-4 ${styles.subText}`}>{tool.description}</p>

            {tool.useCaseTags.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.useCaseTags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant={tone === "light" ? "muted" : "ghost"} className="text-[11px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>

          <div className={`mt-3 min-w-0 rounded-[24px] border p-4 sm:mt-5 ${styles.inner}`}>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{bestForLabel}</p>
            <p className={`mt-2 truncate text-base font-semibold ${styles.text}`}>{tool.bestFor}</p>
            <p className={`mobile-clamp-2 mt-2 text-[15px] leading-relaxed ${styles.subText}`}>{tool.benefit}</p>
          </div>

          <div className={`mt-3 hidden min-w-0 rounded-[24px] border p-4 sm:mt-5 sm:block ${styles.inner}`}>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Deciply note</p>
            <p className={`mobile-clamp-2 mt-2 text-[15px] leading-relaxed ${tone === "light" ? "text-slate-700" : "text-slate-200/88"}`}>
              {tool.editorNote}
            </p>
          </div>

          {tool.notIdealFor ? (
            <div className={`mt-4 hidden rounded-[20px] border px-4 py-3 sm:block ${tone === "light" ? "border-slate-200 bg-slate-50" : "border-sky-400/10 bg-slate-950/50"}`}>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{notIdealLabel}</p>
              <p className={`mt-2 text-sm leading-6 ${styles.subText}`}>{tool.notIdealFor}</p>
            </div>
          ) : null}
        </div>

        <div className={`mt-4 border-t pt-4 sm:mt-6 sm:pt-6 ${tone === "light" ? "border-slate-200" : "border-sky-400/10"}`}>
          <div className="min-h-[1.5rem] overflow-hidden pb-2">
            <p className="translate-y-2 text-sm font-medium text-slate-100/92 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {tool.benefit}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 shrink-0 pb-0.5">
              <p className={`text-[11px] font-medium uppercase tracking-[0.16em] ${tone === "light" ? "text-slate-500" : "text-slate-400"}`}>{ratingLabel}</p>
              <RatingBadge rating={tool.rating} className="mt-1 w-fit" />
            </div>
            <div className="min-w-0 sm:ml-4 sm:flex sm:justify-end">
              <a
                href={tool.affiliateUrl ?? tool.websiteUrl}
                target="_blank"
                rel="nofollow sponsored noreferrer"
                className={`inline-flex min-h-[44px] w-full min-w-[152px] items-center justify-center whitespace-nowrap rounded-[12px] px-4 py-2 text-sm font-semibold transition duration-150 hover:-translate-y-1 hover:scale-[1.03] hover:brightness-[1.04] sm:w-auto ${styles.cta}`}
              >
                {tool.ctaLabel ?? tryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
