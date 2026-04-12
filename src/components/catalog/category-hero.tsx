import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type CategoryHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  supportText: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CategoryHero({
  eyebrow,
  title,
  description,
  supportText,
  ctaLabel,
  ctaHref
}: CategoryHeroProps) {
  return (
    <section className="rounded-[32px] border border-slate-200/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(246,249,253,0.98))] p-8 shadow-[0_24px_80px_-44px_rgba(37,99,235,0.14)] md:p-10">
      <Badge variant="accent">{eyebrow}</Badge>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
        <div className="rounded-[28px] border border-slate-200/90 bg-white/95 p-6 shadow-[0_18px_54px_-38px_rgba(37,99,235,0.18)]">
          <p className="text-sm leading-7 text-slate-600">{supportText}</p>
          {ctaLabel && ctaHref ? (
            <Link
              href={ctaHref}
              className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

