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
    <article className="rounded-[28px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,253,0.98))] p-6 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_70px_-34px_rgba(37,99,235,0.16)]">
      <Badge variant="ghost">{category.slug}</Badge>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">{category.name}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
      <p className="mt-4 text-sm leading-7 text-slate-500">{category.supportText}</p>
      <Link
        href={`/${locale}/categories/${category.slug}`}
        className="mt-6 inline-flex text-sm font-semibold text-sky-700 transition hover:text-sky-800"
      >
        {linkLabel}
      </Link>
    </article>
  );
}

