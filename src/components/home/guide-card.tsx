'use client';

import Link from "next/link";
import { motion } from "framer-motion";

import type { GuideCard as GuideCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

type GuideCardProps = {
  locale: string;
  item: GuideCardType;
  linkLabel: string;
};

export function GuideCard({ locale, item, linkLabel }: GuideCardProps) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.012 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${item.href}`} className="group block h-full">
        <GlassPanel className="home-card-glow flex h-full min-h-[260px] flex-col overflow-hidden rounded-[28px] border-sky-400/10 bg-[linear-gradient(160deg,rgba(9,14,27,0.96),rgba(5,9,17,0.99))] p-5 shadow-[0_28px_90px_-42px_rgba(6,10,18,0.72)] transition duration-300 hover:border-cyan-400/22 hover:shadow-[0_34px_98px_-40px_rgba(14,165,233,0.14)] sm:min-h-[280px] sm:p-6 md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_-18px_rgba(37,99,235,0.3)]">
                {item.icon}
              </div>
              <Badge variant="ghost" className="min-w-[96px] justify-center text-[11px]">{item.tag}</Badge>
            </div>
            <span className="rounded-full border border-sky-400/10 bg-slate-950/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400/90">
              {item.readTime}
            </span>
          </div>

          <h3 className="mt-4 text-[1.1rem] font-bold tracking-[-0.03em] text-slate-50 sm:mt-5 sm:text-[1.38rem]">{item.title}</h3>
          <p className="mt-2.5 flex-1 text-[14px] leading-6 text-slate-300/88 sm:text-[15px] sm:leading-7">{item.description}</p>

          <div className="mt-auto border-t border-sky-400/10 pt-4">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition duration-300 group-hover:text-cyan-300">
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
