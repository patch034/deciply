"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import type { ComparisonCard as ComparisonCardType } from "@/types/home";

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

function ComparisonLogo({ name, logoUrl }: { name: string; logoUrl?: string }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      {logoUrl ? (
        <Image src={logoUrl} alt={name} width={40} height={40} unoptimized className="h-full w-full object-contain p-1.5" />
      ) : (
        <span>{name.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  );
}

export function ComparisonCard({ locale, item, linkLabel, featured = false, tone = "light" }: ComparisonCardProps) {
  const href = normalizeComparisonHref(locale, item.href);
  const light = tone === "light";
  const logos = item.logos?.length ? item.logos : [{ name: item.icon }];

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18 }} className="h-full">
      <Link href={href} className="group block h-full">
        <article
          className={[
            "flex h-full flex-col justify-between rounded-[22px] border p-4 transition",
            light
              ? "border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.07)] hover:border-sky-200 hover:shadow-[0_20px_42px_rgba(15,23,42,0.11)]"
              : featured
                ? "border-slate-700 bg-slate-950 text-slate-50"
                : "border-slate-800 bg-slate-950 text-slate-50"
          ].join(" ")}
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 items-center">
                  {logos.slice(0, 3).map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className={index > 0 ? "-ml-2" : ""}>
                      <ComparisonLogo name={logo.name} logoUrl={logo.logoUrl} />
                    </div>
                  ))}
                </div>
                <p className={["truncate text-xs font-semibold uppercase tracking-[0.16em]", light ? "text-slate-500" : "text-slate-300"].join(" ")}>
                  {item.eyebrow}
                </p>
              </div>
              {item.highlight ? (
                <Badge variant={light ? "ghost" : "accent"} className="max-w-[110px]">
                  {item.highlight}
                </Badge>
              ) : null}
            </div>

            <h3 className={["mt-4 clamp-2 text-[1.08rem] font-bold leading-tight tracking-[-0.03em]", light ? "text-slate-950" : "text-slate-50"].join(" ")}>
              {item.title}
            </h3>
            <p className={["mt-2 clamp-3 text-sm leading-6", light ? "text-slate-600" : "text-slate-300/84"].join(" ")}>
              {item.description}
            </p>
          </div>

          <div className={["mt-5 flex items-center justify-between border-t pt-4", light ? "border-slate-200" : "border-slate-800"].join(" ")}>
            <span className={["text-sm font-semibold transition", light ? "text-slate-700 group-hover:text-[#0E2450]" : "text-slate-100 group-hover:text-sky-200"].join(" ")}>
              {linkLabel}
            </span>
            <span aria-hidden="true" className="text-base font-semibold text-[#0055FF] transition group-hover:translate-x-1">
              →
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
