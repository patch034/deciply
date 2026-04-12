"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import type { ToolCard as ToolCardType } from "@/types/home";
import type { Locale } from "@/i18n/config";

import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/ui/rating-badge";

type DiscoveryToolCardProps = {
  locale: Locale;
  tool: ToolCardType;
  ctaLabel: string;
  compact?: boolean;
  variant?: "card" | "row";
};

function getPricingSignal(pricing: string) {
  const normalized = pricing.toLowerCase();

  if (normalized.includes("free") || normalized.includes("ücretsiz")) {
    return normalized.includes("freemium") || normalized.includes("kısmen")
      ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.32)]"
      : "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.32)]";
  }

  if (normalized.includes("freemium") || normalized.includes("kısmen")) {
    return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.32)]";
  }

  return "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.24)]";
}

function renderFallbackIcon(icon: string) {
  return icon.slice(0, 2).toUpperCase();
}

function ToolLogo({
  tool,
  size = "md"
}: {
  tool: ToolCardType;
  size?: "sm" | "md";
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const boxClass = size === "sm" ? "h-10 w-10 rounded-[14px]" : "h-12 w-12 rounded-[18px]";

  return (
    <span
      className={[
        "relative flex shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-[0_14px_36px_-22px_rgba(15,23,42,0.24)]",
        boxClass
      ].join(" ")}
    >
      {tool.logoUrl && !imageFailed ? (
        <img
          src={tool.logoUrl}
          alt={tool.name}
          className="h-full w-full object-cover p-2"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">{renderFallbackIcon(tool.icon)}</span>
      )}
    </span>
  );
}

export function DiscoveryToolCard({ locale, tool, ctaLabel, compact = false, variant = "card" }: DiscoveryToolCardProps) {
  const pricingSignal = getPricingSignal(tool.pricing);
  const detailHref = `/${locale}${tool.href}`;
  const rowVariant = variant === "row";

  if (rowVariant) {
    return (
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18 }} className="h-full">
        <Link
          href={detailHref}
          aria-label={`${ctaLabel}: ${tool.name}`}
          className="group flex h-full items-stretch gap-3 rounded-[22px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.99))] p-3 shadow-[0_20px_54px_-34px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_28px_72px_-38px_rgba(37,99,235,0.14)]"
        >
          <ToolLogo tool={tool} size="sm" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{tool.category}</p>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                {tool.pricing}
              </span>
            </div>
            <div className="mt-1 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-[0.98rem] font-bold tracking-[-0.03em] text-slate-950 transition group-hover:text-sky-700">
                  {tool.name}
                </h3>
                <p className="mobile-clamp-2 mt-1 text-[13px] leading-5 text-slate-600">{tool.description}</p>
              </div>
              <span className={`mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${pricingSignal}`} aria-hidden="true" />
            </div>
            {!compact ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tool.useCaseTags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="muted" className="px-2 py-0.5 text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-end justify-between gap-3">
            <RatingBadge rating={tool.rating} className="w-fit" />
            <span className="inline-flex min-h-[38px] items-center rounded-full border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-700 transition group-hover:border-sky-200 group-hover:text-slate-950">
              {ctaLabel}
            </span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_34px_88px_-44px_rgba(37,99,235,0.16)] sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <ToolLogo tool={tool} />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{tool.category}</p>
              <p className="mt-1 truncate text-sm font-medium text-slate-700">{tool.note}</p>
            </div>
          </div>

          <Badge variant="ghost" className="shrink-0 gap-2 text-[11px]">
            <span className={`h-2 w-2 shrink-0 rounded-full ${pricingSignal}`} />
            <span className="truncate">{tool.pricing}</span>
          </Badge>
        </div>

        <Link href={detailHref} aria-label={`${ctaLabel}: ${tool.name}`} className="mt-4 block min-w-0">
          <h3 className="clamp-2 text-[1.08rem] font-bold tracking-[-0.03em] text-slate-950 transition duration-200 group-hover:text-sky-700 sm:text-[1.28rem]">
            {tool.name}
          </h3>
        </Link>

        <p className={["mt-2 text-[14px] leading-6 text-slate-600", compact ? "mobile-clamp-2 sm:text-sm" : "mobile-clamp-2 sm:text-[15px]"].join(" ")}>
          {tool.description}
        </p>

        {!compact ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.useCaseTags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="muted" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50/90 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Best fit</p>
          <p className="mt-2 text-sm font-semibold tracking-[-0.02em] text-slate-900">{tool.bestFor}</p>
          {!compact ? <p className="mt-2 text-sm leading-6 text-slate-600">{tool.benefit}</p> : null}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <RatingBadge rating={tool.rating} className="w-fit" />
          <a
            href={tool.affiliateUrl ?? tool.websiteUrl}
            target="_blank"
            rel="nofollow sponsored noreferrer"
            className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#2563EB_0%,#3B82F6_52%,#06B6D4_100%)] px-4 text-sm font-semibold text-white shadow-[0_20px_48px_-28px_rgba(37,99,235,0.42)] transition hover:-translate-y-0.5 hover:brightness-[1.03]"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
