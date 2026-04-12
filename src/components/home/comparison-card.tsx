"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { ComparisonCard as ComparisonCardType } from "@/types/home";

import { Badge } from "@/components/ui/badge";

type ComparisonCardProps = {
  locale: string;
  item: ComparisonCardType;
  linkLabel: string;
  featured?: boolean;
  tone?: "dark" | "light";
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

export function ComparisonCard({ locale, item, linkLabel, featured = false, tone = "dark" }: ComparisonCardProps) {
  const href = normalizeComparisonHref(locale, item.href);
  const light = tone === "light";

  return (
    <motion.div whileHover={{ y: -4, scale: 1.012 }} transition={{ duration: 0.22 }} className="h-full">
      <Link href={href} className="group block h-full">
        <div
          className={[
            "flex h-full flex-col justify-between overflow-hidden rounded-[30px] border p-5 transition duration-300 hover:-translate-y-1",
            light
              ? "border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.98))] shadow-[0_24px_72px_-42px_rgba(15,23,42,0.18)] hover:border-sky-200"
              : featured
                ? "ui-card-strong ui-card-hover border-sky-400/10 bg-[linear-gradient(180deg,rgba(8,12,22,0.95),rgba(10,16,30,0.9))]"
                : "ui-card ui-card-hover border-sky-400/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(5,9,17,0.99))]"
          ].join(" ")}
        >
          <div className="flex min-h-[34px] items-center justify-between gap-3 overflow-hidden sm:min-h-[40px]">
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_-16px_rgba(37,99,235,0.34)]">
                {item.icon}
              </div>
              <p className={["truncate text-sm font-medium", light ? "text-slate-700" : "text-slate-200"].join(" ")}>{item.eyebrow}</p>
            </div>
            {item.highlight ? (
              <Badge variant={light ? "ghost" : featured ? "accent" : "muted"} className="max-w-[96px] shrink-0 justify-center text-[11px]">
                {item.highlight}
              </Badge>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col">
            <h3 className={["clamp-2 mt-3 min-h-[2.4rem] text-[1.08rem] font-bold leading-tight tracking-[-0.03em] sm:mt-5 sm:min-h-[3rem] sm:text-[1.34rem]", light ? "text-slate-900" : "text-slate-50"].join(" ")}>
              {item.title}
            </h3>
            <p className={["mobile-clamp-2 mt-2.5 flex-1 text-[14px] leading-relaxed sm:mt-3.5 sm:text-[15px]", light ? "text-slate-600" : "text-slate-300/84"].join(" ")}>
              {item.description}
            </p>
          </div>

          <div className={["mt-auto border-t pt-3.5 sm:mt-6 sm:pt-5", light ? "border-slate-200" : "border-sky-400/10"].join(" ")}>
            <span className={["inline-flex items-center gap-2 text-sm font-semibold transition duration-200 group-hover:translate-x-0.5", light ? "text-slate-700 group-hover:text-slate-950" : "text-slate-100 group-hover:text-white"].join(" ")}>
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
