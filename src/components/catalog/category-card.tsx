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
    <article className="rounded-[28px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.88))] p-6 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_24px_70px_-34px_rgba(14,165,233,0.14)]">
      <Badge>{category.slug}</Badge>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-100">{category.name}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{category.description}</p>
      <p className="mt-4 text-sm leading-7 text-slate-400">{category.supportText}</p>
      <Link
        href={`/${locale}/categories/${category.slug}`}
        className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
      >
        {linkLabel}
      </Link>
    </article>
  );
}

