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
  tone?: "dark" | "light";
  className?: string;
};

export function ConversionCtaStrip({ eyebrow, title, description, buttons, tone = "dark", className }: ConversionCtaStripProps) {
  const isLight = tone === "light";

  return (
    <section
      className={[
        isLight
          ? "rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(246,250,253,0.98))] px-5 py-7 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.16)] sm:px-6 sm:py-8 lg:px-10 lg:py-12"
          : "rounded-[30px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(5,10,18,0.96),rgba(9,14,27,0.98))] px-5 py-7 shadow-[0_24px_70px_-40px_rgba(34,211,238,0.16)] sm:px-6 sm:py-8 lg:px-10 lg:py-12",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className={isLight ? "text-sm font-semibold uppercase tracking-[0.2em] text-sky-600" : "text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300"}>{eyebrow}</p>
          <h2 className={isLight ? "mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl" : "mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl"}>{title}</h2>
          <p className={isLight ? "mt-3 text-[15px] leading-7 text-slate-600 sm:mt-4 md:text-lg" : "mt-3 text-[15px] leading-7 text-slate-300/88 sm:mt-4 md:text-lg"}>{description}</p>
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

