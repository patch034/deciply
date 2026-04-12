"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { CategoryCard as CategoryCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";

type CategoryCardProps = {
  locale: string;
  category: CategoryCardType;
  linkLabel: string;
  tone?: "dark" | "light";
};

export function CategoryCard({ locale, category, linkLabel, tone = "light" }: CategoryCardProps) {
  const light = tone === "light";

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={`/${locale}${category.href}`} className="group block h-full">
        <div
          className={[
            "flex h-full flex-col overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 sm:p-6 md:p-7",
            light
              ? "border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))] shadow-[0_24px_70px_-40px_rgba(15,23,42,0.16)] hover:border-sky-200"
              : "ui-card ui-card-hover home-card-glow border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.88))]"
          ].join(" ")}
        >
          <div className="flex min-h-[40px] items-start justify-between gap-3 overflow-hidden sm:min-h-[44px]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-[var(--tn-gradient-primary)] text-sm font-bold uppercase tracking-[0.14em] text-white">
              {category.icon}
            </div>
            <Badge variant={light ? "ghost" : "muted"} className="max-w-[88px] shrink-0 justify-center text-[11px]">
              {category.metric}
            </Badge>
          </div>
          <p className={["mt-6 text-xs font-medium uppercase tracking-[0.18em]", light ? "text-slate-500" : "text-slate-400"].join(" ")}>
            {category.eyebrow}
          </p>
          <h3
            className={[
              "clamp-2 mt-2 min-h-[2.65rem] text-[1.22rem] font-bold leading-tight tracking-[-0.03em] sm:mt-3 sm:min-h-[3.15rem] sm:text-[1.42rem]",
              light ? "text-slate-900" : "text-slate-50"
            ].join(" ")}
          >
            {category.title}
          </h3>
          <p className={["mobile-clamp-2 mt-3 flex-1 text-[15px] leading-relaxed sm:mt-4 sm:text-base", light ? "text-slate-600" : "text-slate-300/84"].join(" ")}>
            {category.description}
          </p>
          <div className={["mt-auto border-t pt-4 sm:mt-7 sm:pt-5", light ? "border-slate-200" : "border-sky-400/10"].join(" ")}>
            <span className={["inline-flex items-center gap-2 text-sm font-semibold transition duration-200", light ? "text-slate-700 group-hover:text-slate-950" : "text-slate-100 group-hover:text-white"].join(" ")}>
              {linkLabel}
              <span aria-hidden="true" className="text-cyan-300 transition duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
