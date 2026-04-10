import clsx from "clsx";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export type ComparisonBattleTool = {
  name: string;
  openHref: string;
  reviewHref: string;
  scoreLabel: string;
  categoryLabel: string;
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
  locale: "tr" | "en";
  tools: ComparisonBattleTool[];
  summary?: string;
  highlights?: ComparisonWinnerCard[];
  slides?: ComparisonInsightSlide[];
  neutralHref?: string;
  className?: string;
};

function getBattleTitle(locale: "tr" | "en", tools: ComparisonBattleTool[]) {
  return tools.map((tool) => tool.name).join(locale === "tr" ? " VS " : " VS ");
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
        "rounded-[34px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(7,11,20,0.98),rgba(10,16,30,0.96),rgba(15,23,42,0.94))] p-4 shadow-[0_26px_88px_-48px_rgba(14,165,233,0.18)] sm:p-5 md:p-6",
        className
      )}
    >
      <div className="rounded-[28px] border border-sky-400/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_46%),linear-gradient(180deg,rgba(9,13,23,0.96),rgba(11,16,28,0.98))] p-4 sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              {locale === "tr" ? "Karar savaşı" : "Decision battle"}
            </p>
            <h2 className="mt-3 text-[1.8rem] font-semibold tracking-tight text-slate-50 sm:text-[2.2rem] md:text-[2.8rem] md:leading-[1.02]">
              {getBattleTitle(locale, primaryTools)}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{summary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tools.map((tool) => (
              <Badge key={tool.name} variant="ghost" className="border-cyan-400/18 bg-cyan-400/10 px-3 py-1.5 text-slate-50">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/55 text-[10px] font-bold text-cyan-100">
                  {tool.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="truncate">{tool.name}</span>
                <span className="ml-2 text-cyan-200">{tool.scoreLabel}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className={clsx("mt-5 grid gap-3", tools.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2") }>
          {tools.map((tool, index) => (
            <article
              key={tool.name}
              className={clsx(
                "rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-4 shadow-[0_18px_60px_-40px_rgba(14,165,233,0.18)]",
                index === 0 && "ring-1 ring-cyan-400/8",
                index === 1 && "ring-1 ring-sky-400/8"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{locale === "tr" ? "Aracı" : "Tool"}</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-50">{tool.name}</h3>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-400/16 bg-slate-950/55 text-sm font-bold text-slate-100">
                  {tool.name.slice(0, 2).toUpperCase()}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="accent">{tool.categoryLabel}</Badge>
                <Badge variant="muted">{tool.scoreLabel}</Badge>
              </div>
            </article>
          ))}
        </div>

        {supportingTools.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {supportingTools.map((tool) => (
              <Badge key={tool.name} variant="dark" className="border-cyan-400/12 bg-slate-950/78 text-slate-100">
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
                className="rounded-[24px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(8,12,22,0.92),rgba(10,16,30,0.88))] p-4 shadow-[0_18px_58px_-40px_rgba(14,165,233,0.15)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">{slide.eyebrow}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-50">{slide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{slide.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {slide.badges.map((badge) => (
                    <Badge key={badge} variant="dark" className="border-cyan-400/12 bg-slate-950/72 text-slate-100">
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
            <article key={card.label} className="rounded-[22px] border border-sky-400/10 bg-slate-950/48 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{card.label}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-50">🏆 {card.winner}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 sticky bottom-3 z-20 rounded-[28px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(10,16,30,0.98),rgba(15,23,42,0.96))] p-3 shadow-[0_18px_60px_-34px_rgba(14,165,233,0.18)] sm:p-4">
          <div className="grid gap-2 sm:grid-cols-3">
            <Link
              href={tools[0]?.openHref ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#0ea5e9,#22c55e)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(14,165,233,0.55)] transition hover:brightness-110"
            >
              {locale === "tr" ? `Use ${primaryTools[0]?.name ?? "Tool A"}` : `Use ${primaryTools[0]?.name ?? "Tool A"}`}
            </Link>
            <Link
              href={tools[1]?.openHref ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#0ea5e9,#22c55e)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(14,165,233,0.55)] transition hover:brightness-110"
            >
              {locale === "tr" ? `Use ${primaryTools[1]?.name ?? "Tool B"}` : `Use ${primaryTools[1]?.name ?? "Tool B"}`}
            </Link>
            <Link
              href={neutralHref ?? "#"}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-sky-400/12 bg-slate-950/50 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/20 hover:text-cyan-100"
            >
              {locale === "tr" ? "Editoryal inceleme" : "Read editorial review"}
            </Link>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>{locale === "tr" ? "Mobilde alt panel sabit kalır." : "The bottom panel stays sticky on mobile."}</span>
            <span>{primaryTools.map((tool) => tool.name).join(" VS ")}</span>
          </div>
          {neutralHref ? (
            <div className="mt-2 flex justify-end">
              <Link href={neutralHref} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:text-cyan-200">
                {locale === "tr" ? "Daha fazla karşılaştırma" : "More comparisons"}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
