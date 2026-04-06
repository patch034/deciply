"use client";

import { motion } from "framer-motion";

import type { ConversionListItem } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";

type ConversionListCardProps = {
  locale: string;
  item: ConversionListItem;
};

export function ConversionListCard({ locale, item }: ConversionListCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full">
      <GlassPanel className="ui-card ui-card-hover home-card-glow flex h-full flex-col justify-between overflow-hidden p-5 sm:p-6">
        <div className="flex min-h-[38px] items-center justify-between gap-3 overflow-hidden sm:min-h-[40px]">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white">
            {item.icon}
          </div>
          <Badge variant="muted" className="max-w-[96px] shrink-0 justify-center text-[11px]">{item.badge}</Badge>
        </div>

        <div className="mt-6 flex flex-1 flex-col min-w-0">
          <h3 className="clamp-2 text-[1.2rem] font-bold leading-tight tracking-[-0.03em] text-slate-50 sm:text-[1.42rem]">{item.title}</h3>
          <p className="mobile-clamp-2 mt-3 text-[15px] leading-relaxed text-slate-300/84 sm:mt-4">{item.description}</p>
        </div>

        <div className="ui-inner-panel mt-4 min-w-0 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Kısa not</p>
          <p className="mobile-clamp-2 mt-2 text-[15px] leading-relaxed text-slate-200/86">{item.benefit}</p>
        </div>

        <div className="mt-5 pt-4 sm:mt-6 sm:pt-5">
          <PremiumButton href={`/${locale}${item.href}`} className="w-full text-sm">
            {item.ctaLabel}
          </PremiumButton>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

