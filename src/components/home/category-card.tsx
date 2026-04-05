"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { CategoryCard as CategoryCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type CategoryCardProps = {
  locale: string;
  category: CategoryCardType;
  linkLabel: string;
};

export function CategoryCard({ locale, category, linkLabel }: CategoryCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${category.href}`} className="group block h-full">
        <GlassPanel className="ui-card ui-card-hover home-card-glow flex h-full flex-col overflow-hidden p-5 sm:p-6 md:p-7">
          <div className="flex min-h-[40px] items-start justify-between gap-3 overflow-hidden sm:min-h-[44px]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white">
              {category.icon}
            </div>
            <Badge variant="muted" className="max-w-[88px] shrink-0 justify-center text-[11px]">{category.metric}</Badge>
          </div>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{category.eyebrow}</p>
          <h3 className="clamp-2 mt-2 min-h-[2.65rem] text-[1.22rem] font-bold leading-tight tracking-[-0.03em] text-slate-50 sm:mt-3 sm:min-h-[3.15rem] sm:text-[1.42rem]">{category.title}</h3>
          <p className="mobile-clamp-2 mt-3 flex-1 text-[15px] leading-relaxed text-slate-300/84 sm:mt-4 sm:text-base">{category.description}</p>
          <div className="mt-5 border-t border-slate-700/60 pt-4 sm:mt-7 sm:pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition duration-200 group-hover:text-white">
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
