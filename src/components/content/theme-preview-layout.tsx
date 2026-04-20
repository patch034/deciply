import type { ReactNode } from "react";

import { Breadcrumb } from "@/components/catalog/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { PremiumButton } from "@/components/ui/premium-button";

type PreviewLink = {
  label: string;
  href: string;
};

type ThemePreviewLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  locale: string;
  breadcrumbs: { label: string; href?: string }[];
  badges?: string[];
  stats?: { label: string; value: string }[];
  primaryAction?: PreviewLink;
  secondaryAction?: PreviewLink;
  sections?: { title: string; description: string; content?: ReactNode }[];
};

export function ThemePreviewLayout({
  eyebrow,
  title,
  description,
  locale,
  breadcrumbs,
  badges = [],
  stats = [],
  primaryAction,
  secondaryAction,
  sections = []
}: ThemePreviewLayoutProps) {
  return (
    <div data-locale={locale} className="ui-page-shell mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Breadcrumb items={breadcrumbs} />

      <section className="ui-card rounded-[34px] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
          <div>
            <Badge variant="ghost" className="border-sky-200 bg-sky-50 text-sky-700">
              {eyebrow}
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{description}</p>

            {badges.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {badges.map((item) => (
                  <Badge key={item} variant="muted">
                    {item}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>

          <div className="ui-inner-panel p-5">
            {stats.length ? (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-[18px] border border-slate-200 bg-white px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {primaryAction || secondaryAction ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {primaryAction ? <PremiumButton href={primaryAction.href}>{primaryAction.label}</PremiumButton> : null}
                {secondaryAction ? (
                  <PremiumButton href={secondaryAction.href} variant="secondary">
                    {secondaryAction.label}
                  </PremiumButton>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="ui-card rounded-[28px] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{section.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
            {section.content ? <div className="mt-5">{section.content}</div> : null}
          </article>
        ))}
      </section>
    </div>
  );
}
