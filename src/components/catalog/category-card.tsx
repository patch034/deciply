import Link from "next/link";

import type { LocalizedCategory } from "@/types/catalog";

import { Badge } from "@/components/ui/badge";

type CategoryCardProps = {
  locale: string;
  category: LocalizedCategory;
  linkLabel: string;
};

export function CategoryCard({ locale, category, linkLabel }: CategoryCardProps) {
  return (
    <article className="ui-card ui-card-hover home-card-glow flex h-full flex-col rounded-[22px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(247,250,253,0.98))] p-5 shadow-[0_12px_34px_-18px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-1">
      <Badge variant="ghost">{category.slug}</Badge>
      <h2 className="mt-4 text-[1.25rem] font-bold tracking-[-0.03em] text-slate-950">{category.name}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
      <p className="mt-3.5 text-sm leading-6 text-slate-500">{category.supportText}</p>
      <Link
        href={`/${locale}/categories/${category.slug}`}
        className="mt-auto inline-flex min-h-[40px] items-center self-start rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0055FF] transition hover:border-sky-200 hover:bg-slate-50 hover:text-[#0E2450]"
      >
        {linkLabel}
      </Link>
    </article>
  );
}

