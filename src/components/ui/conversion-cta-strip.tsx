import type { ReactNode } from "react";

import { PremiumButton } from "@/components/ui/premium-button";

type CtaItem = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ConversionCtaStripProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttons: CtaItem[];
  className?: string;
};

export function ConversionCtaStrip({ eyebrow, title, description, buttons, className }: ConversionCtaStripProps) {
  return (
    <section
      className={[
        "rounded-[30px] border border-slate-700/55 bg-[linear-gradient(135deg,rgba(5,10,18,0.96),rgba(9,14,27,0.98))] px-5 py-7 shadow-[0_24px_70px_-40px_rgba(34,211,238,0.16)] sm:px-6 sm:py-8 lg:px-10 lg:py-12",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
          <p className="mt-3 text-[15px] leading-7 text-slate-300/88 sm:mt-4 md:text-lg">{description}</p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {buttons.map((button) => (
            <PremiumButton key={`${button.label}-${button.href}`} href={button.href} variant={button.variant ?? "primary"} className="w-full">
              {button.label}
            </PremiumButton>
          ))}
        </div>
      </div>
    </section>
  );
}

