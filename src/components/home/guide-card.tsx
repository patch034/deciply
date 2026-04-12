"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { GuideCard as GuideCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";

type GuideCardProps = {
  locale: string;
  item: GuideCardType;
  linkLabel: string;
  tone?: "dark" | "light";
};

export function GuideCard({ locale, item, linkLabel, tone = "light" }: GuideCardProps) {
  const light = tone === "light";

  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${item.href}`} className="group block h-full">
        <div
          className={[
            "flex h-full min-h-[260px] flex-col overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:border-cyan-400/22 hover:shadow-[0_34px_98px_-40px_rgba(14,165,233,0.14)] sm:min-h-[280px] sm:p-6 md:p-7",
            light
              ? "border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))] shadow-[0_24px_72px_-42px_rgba(15,23,42,0.16)]"
              : "home-card-glow border-sky-400/10 bg-[linear-gradient(160deg,rgba(9,14,27,0.96),rgba(5,9,17,0.99))] shadow-[0_28px_90px_-42px_rgba(6,10,18,0.72)]"
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_-18px_rgba(37,99,235,0.3)]">
                {item.icon}
              </div>
              <Badge variant="ghost" className="min-w-[96px] justify-center text-[11px]">
                {item.tag}
              </Badge>
            </div>
            <span
              className={[
                "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                light ? "border-slate-200 bg-slate-50 text-slate-500" : "border-sky-400/10 bg-slate-950/50 text-slate-400/90"
              ].join(" ")}
            >
              {item.readTime}
            </span>
          </div>

          <h3 className={["mt-4 text-[1.1rem] font-bold tracking-[-0.03em] sm:mt-5 sm:text-[1.38rem]", light ? "text-slate-900" : "text-slate-50"].join(" ")}>
            {item.title}
          </h3>
          <p className={["mt-2.5 flex-1 text-[14px] leading-6 sm:text-[15px] sm:leading-7", light ? "text-slate-600" : "text-slate-300/88"].join(" ")}>
            {item.description}
          </p>

          <div className={["mt-auto border-t pt-4", light ? "border-slate-200" : "border-sky-400/10"].join(" ")}>
            <span className={["inline-flex items-center gap-2 text-sm font-semibold transition duration-300", light ? "text-slate-700 group-hover:text-slate-950" : "text-slate-100 group-hover:text-cyan-300"].join(" ")}>
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
