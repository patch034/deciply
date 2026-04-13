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
    <section className="ui-card ui-card-hover rounded-[30px] border border-slate-200/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.99),rgba(246,249,253,0.98))] p-6 shadow-[0_18px_54px_-34px_rgba(15,23,42,0.12)] md:p-8">
      <Badge variant="accent">{eyebrow}</Badge>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <h1 className="text-[2.35rem] font-bold tracking-[-0.04em] text-slate-950 md:text-[3rem]">{title}</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 md:text-[1.02rem] md:leading-8">{description}</p>
        </div>
        <div className="ui-inner-panel rounded-[24px] bg-white/96 p-5 shadow-[0_14px_42px_-28px_rgba(15,23,42,0.12)]">
          <p className="text-sm leading-6 text-slate-600">{supportText}</p>
          {ctaLabel && ctaHref ? (
            <Link
              href={ctaHref}
              className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] px-5 text-sm font-semibold text-white shadow-[0_18px_42px_-24px_rgba(37,99,235,0.52)] transition duration-300 hover:-translate-y-0.5"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

