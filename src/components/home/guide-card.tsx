"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { GuideCard as GuideCardType } from "@/types/home";

type GuideCardProps = {
  locale: string;
  item: GuideCardType;
  linkLabel: string;
  tone?: "dark" | "light";
};

export function GuideCard({ locale, item, linkLabel, tone = "light" }: GuideCardProps) {
  const light = tone === "light";

  return (
    <Link href={`/${locale}${item.href}`} className="group block h-full">
      <article
        className={[
          "ui-card ui-card-hover home-card-glow flex h-full min-h-[224px] flex-col overflow-hidden rounded-[24px] p-[18px] transition duration-300 hover:-translate-y-1 sm:min-h-[240px] sm:p-[18px] md:p-5",
          light
            ? "border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(247,250,253,0.98))]"
            : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(9,14,27,0.96),rgba(5,9,17,0.99))]"
        ].join(" ")}
      >
        <div className="mb-3.5 h-[5px] rounded-full bg-[linear-gradient(90deg,#071226_0%,#0E2450_16%,#007FFF_54%,#0055FF_80%,#3B82F6_100%)]" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_58%,#3B82F6_100%)] text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_-18px_rgba(37,99,235,0.3)]">
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

        <h3 className={["mt-3.5 text-[1rem] font-bold tracking-[-0.03em] sm:mt-4 sm:text-[1.12rem]", light ? "text-slate-900" : "text-slate-50"].join(" ")}>
          {item.title}
        </h3>
        <p className={["mt-2 flex-1 text-[13px] leading-6 sm:text-[14px] sm:leading-[1.625rem]", light ? "text-slate-600" : "text-slate-300/88"].join(" ")}>
          {item.description}
        </p>

        <div className={["mt-auto border-t pt-3.5", light ? "border-slate-200" : "border-sky-400/10"].join(" ")}>
          <span className={["inline-flex items-center gap-2 text-sm font-semibold transition duration-200", light ? "text-slate-700 group-hover:text-[#0E2450]" : "text-slate-100 group-hover:text-[#BFD2F6]"].join(" ")}>
            {linkLabel}
            <span aria-hidden="true" className="text-[#0055FF] transition duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}
