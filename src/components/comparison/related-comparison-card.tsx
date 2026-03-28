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

export function RelatedComparisonCard({ locale, title, description, href, ctaLabel, highlight }: RelatedComparisonCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.88))] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_24px_70px_-34px_rgba(34,211,238,0.18)]">
      <Badge variant="ghost" className="w-fit border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
        {highlight}
      </Badge>
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-100">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{description}</p>
      <Link
        href={`/${locale}${href}`}
        className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
