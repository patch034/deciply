"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type RelatedComparisonCardProps = {
  locale: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  highlight: string;
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

export function RelatedComparisonCard({ locale, title, description, href, ctaLabel, highlight }: RelatedComparisonCardProps) {
  const normalizedHref = normalizeComparisonHref(locale, href);

  return (
    <article className="flex h-full flex-col rounded-[28px] border border-slate-700/60 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(6,10,18,0.96))] p-6 shadow-[0_20px_60px_-36px_rgba(6,10,18,0.78)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/22 hover:shadow-[0_24px_70px_-34px_rgba(34,211,238,0.16)]">
      <Badge variant="ghost" className="w-fit border-cyan-400/16 bg-cyan-400/10 text-cyan-200">
        {highlight}
      </Badge>
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-100">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300/88">{description}</p>
      <Link href={normalizedHref} className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
        {ctaLabel}
      </Link>
    </article>
  );
}
