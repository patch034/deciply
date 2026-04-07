"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ComparisonCard as ComparisonCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type ComparisonCardProps = {
  locale: string;
  item: ComparisonCardType;
  linkLabel: string;
  featured?: boolean;
};

function normalizeComparisonHref(locale: string, href: string) {
  if (/^https?:\/\//.test(href)) {
    return href;
  }

  if (href.startsWith(`/${locale}/`)) {
    return href;
  }

  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }

  return `/${locale}/${href}`;
}

export function ComparisonCard({ locale, item, linkLabel, featured = false }: ComparisonCardProps) {
  const href = normalizeComparisonHref(locale, item.href);

  return (
    <motion.div whileHover={{ y: -4, scale: 1.012 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={href} className="group block h-full">
        <GlassPanel className={`home-card-glow flex h-full flex-col justify-between overflow-hidden p-6 ${featured ? "ui-card-strong ui-card-hover" : "ui-card ui-card-hover"}`}>
          <div className="flex min-h-[38px] items-center justify-between gap-3 overflow-hidden sm:min-h-[40px]">
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_-16px_rgba(37,99,235,0.34)]">
                {item.icon}
              </div>
              <p className="truncate text-sm font-medium text-slate-200">{item.eyebrow}</p>
            </div>
            {item.highlight ? <Badge variant={featured ? "accent" : "muted"} className="max-w-[90px] shrink-0 justify-center text-[11px]">{item.highlight}</Badge> : null}
          </div>

          <div className="flex flex-1 flex-col">
            <h3 className="clamp-2 mt-4 min-h-[2.7rem] text-[1.24rem] font-bold leading-tight tracking-[-0.03em] text-slate-50 sm:mt-6 sm:min-h-[3.1rem] sm:text-[1.38rem]">{item.title}</h3>
            <p className="mobile-clamp-2 mt-3 flex-1 text-[15px] leading-relaxed text-slate-300/84 sm:mt-4">{item.description}</p>
          </div>

          <div className="mt-auto border-t border-sky-400/10 pt-4 sm:mt-7 sm:pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition duration-200 group-hover:text-white">
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}

