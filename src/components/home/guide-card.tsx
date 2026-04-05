"use client";

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
    <motion.div whileHover={{ y: -8, scale: 1.015 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${item.href}`} className="group block h-full">
        <GlassPanel className="home-card-glow flex h-full flex-col overflow-hidden rounded-[30px] border-slate-700/60 bg-[linear-gradient(160deg,rgba(9,14,27,0.96),rgba(5,9,17,0.99))] p-6 shadow-[0_28px_90px_-42px_rgba(6,10,18,0.72)] transition duration-300 hover:border-cyan-400/22 hover:shadow-[0_34px_98px_-40px_rgba(34,211,238,0.2)] md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_-18px_rgba(59,130,246,0.36)]">
                {item.icon}
              </div>
              <Badge variant="ghost" className="min-w-[92px] justify-center text-[11px]">{item.tag}</Badge>
            </div>
            <span className="rounded-full border border-slate-700/60 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400/90">
              {item.readTime}
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-slate-50">{item.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-slate-300/88">{item.description}</p>

          <div className="mt-6 border-t border-slate-700/60 pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition duration-300 group-hover:text-cyan-300">
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
