import clsx from "clsx";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export type ComparisonBattleTool = {
  name: string;
  openHref: string;
  reviewHref: string;
  scoreLabel: string;
  categoryLabel: string;
  logoUrl?: string;
};

type ComparisonWinnerCard = {
  label: string;
  winner: string;
  note: string;
};

type ComparisonInsightSlide = {
  eyebrow: string;
  title: string;
  description: string;
  badges: string[];
};

type ComparisonInsightPanelProps = {
  locale: "tr" | "en" | "ar" | "ru" | "zh" | "ja" | "ko" | "el" | "da" | "fa";
  tools: ComparisonBattleTool[];
  summary?: string;
  highlights?: ComparisonWinnerCard[];
  slides?: ComparisonInsightSlide[];
  neutralHref?: string;
  className?: string;
};

function getBattleTitle(locale: "tr" | "en" | "ar" | "ru" | "zh" | "ja" | "ko" | "el" | "da" | "fa", tools: ComparisonBattleTool[]) {
  return tools.map((tool) => tool.name).join(locale === "tr" ? " VS " : " VS ");
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderLogo(name: string, logoUrl?: string) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-[0.18em] text-[#0055FF] shadow-[0_14px_30px_-20px_rgba(15,23,42,0.22)]">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </span>
  );
}

export function ComparisonInsightPanel({
  locale,
  tools,
  summary = "",
  highlights = [],
  slides,
  neutralHref,
  className
}: ComparisonInsightPanelProps) {
  const primaryTools = tools.slice(0, 2);
  const supportingTools = tools.slice(2);

  return (
    <section
      className={clsx(
        "ui-card ui-card-hover rounded-[36px] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.996),rgba(247,250,255,0.988))] p-4 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.16)] sm:p-5 md:p-6",
        className
      )}
    >
      <div className="rounded-[30px] border border-slate-200 bg-[radial-gradient(circle_at_top,rgba(191,210,246,0.22),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.995),rgba(247,250,255,0.99))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0055FF]">
              {locale === "tr" ? "Karar savaşı" : "Decision battle"}
            </p>
            <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.035em] text-slate-950 sm:text-[2.35rem] md:text-[3rem] md:leading-[1.02]">
              {getBattleTitle(locale, primaryTools)}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-7">{summary}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[300px] lg:grid-cols-1">
            {tools.map((tool) => (
              <Badge
                key={tool.name}
                variant="ghost"
                className="flex min-h-[46px] w-full items-center justify-start gap-3 border-slate-200 bg-white/95 px-3.5 py-2 text-left text-slate-950 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.2)]"
              >
                {renderLogo(tool.name, tool.logoUrl)}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-950">{tool.name}</span>
                  <span className="block truncate text-[11px] font-normal uppercase tracking-[0.14em] text-slate-500">
                    {tool.categoryLabel}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-[#0055FF]">{tool.scoreLabel}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {tools.map((tool, index) => (
            <article
              key={tool.name}
              className={clsx(
                "rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_44px_-28px_rgba(15,23,42,0.16)]",
                index === 0 && "ring-1 ring-[#0055FF]/10",
                index === 1 && "ring-1 ring-sky-400/10"
              )}
            >
              <div className="flex items-center gap-3">
                {renderLogo(tool.name, tool.logoUrl)}
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{locale === "tr" ? "Araç" : "Tool"}</p>
                  <h3 className="mt-1 truncate text-lg font-semibold text-slate-950">{tool.name}</h3>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="accent" className="max-w-full">
                  {tool.categoryLabel}
                </Badge>
                <Badge variant="muted">{tool.scoreLabel}</Badge>
              </div>
            </article>
          ))}
        </div>

        {supportingTools.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {supportingTools.map((tool) => (
              <Badge key={tool.name} variant="muted" className="border-slate-200 bg-white text-slate-700">
                {tool.name} · {tool.scoreLabel}
              </Badge>
            ))}
          </div>
        ) : null}

        {slides?.length ? (
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {slides.map((slide) => (
              <article
                key={slide.title}
                className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.14)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0055FF]">{slide.eyebrow}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{slide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{slide.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {slide.badges.map((badge) => (
                    <Badge key={badge} variant="muted" className="border-slate-200 bg-white text-slate-700">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {highlights.map((card) => (
            <article key={card.label} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_14px_38px_-26px_rgba(15,23,42,0.14)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">{card.label}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-950">🏆 {card.winner}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 sticky bottom-3 z-20 rounded-[28px] border border-slate-200 bg-white/96 p-3 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.12)] sm:p-4">
          <div className="grid gap-2 sm:grid-cols-3">
            <Link
              href={tools[0]?.openHref ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(37,99,235,0.44)] transition hover:brightness-105"
            >
              {locale === "tr" ? `${primaryTools[0]?.name ?? "Araç A"}'i incele` : `Review ${primaryTools[0]?.name ?? "Tool A"}`}
            </Link>
            <Link
              href={tools[1]?.openHref ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#0E2450_0%,#007FFF_42%,#0055FF_72%,#3B82F6_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(37,99,235,0.44)] transition hover:brightness-105"
            >
              {locale === "tr" ? `${primaryTools[1]?.name ?? "Araç B"}'i incele` : `Review ${primaryTools[1]?.name ?? "Tool B"}`}
            </Link>
            <Link
              href={neutralHref ?? "#"}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-[#0E2450]"
            >
              {locale === "tr" ? "Editoryal inceleme" : "Read editorial review"}
            </Link>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>{locale === "tr" ? "Mobilde alt panel sabit kalır." : "The bottom panel stays sticky on mobile."}</span>
            <span>{primaryTools.map((tool) => tool.name).join(" VS ")}</span>
          </div>
          {neutralHref ? (
            <div className="mt-2 flex justify-end">
              <Link href={neutralHref} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0055FF] transition hover:text-[#0E2450]">
                {locale === "tr" ? "Daha fazla karşılaştırma" : "More comparisons"}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
