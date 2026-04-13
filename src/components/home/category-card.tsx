"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { CategoryCard as CategoryCardType } from "@/types/home";

type CategoryCardProps = {
  locale: string;
  category: CategoryCardType;
  linkLabel: string;
  tone?: "dark" | "light";
};

export function CategoryCard({ locale, category, linkLabel, tone = "light" }: CategoryCardProps) {
  const light = tone === "light";

  return (
    <Link href={`/${locale}${category.href}`} className="group block h-full">
      <article
        className={[
          "ui-card ui-card-hover home-card-glow flex h-full flex-col overflow-hidden rounded-[24px] p-5 transition duration-300 hover:-translate-y-1.5 sm:p-6 md:p-7",
          light
            ? "border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.98))]"
            : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.88))]"
        ].join(" ")}
      >
        <div className="flex min-h-[40px] items-start justify-between gap-3 overflow-hidden sm:min-h-[44px]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_58%,#3B82F6_100%)] text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_-16px_rgba(37,99,235,0.34)]">
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
        <div className={["mt-auto border-t border-slate-200 pt-4 sm:mt-7 sm:pt-5", light ? "border-slate-200" : "border-sky-400/10"].join(" ")}>
          <span className={["inline-flex items-center gap-2 text-sm font-semibold transition duration-200", light ? "text-slate-700 group-hover:text-[#0E2450]" : "text-slate-100 group-hover:text-white"].join(" ")}>
            {linkLabel}
            <span aria-hidden="true" className="text-[#007FFF] transition duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}
