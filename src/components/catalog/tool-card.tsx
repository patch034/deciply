import Link from "next/link";

import type { LocalizedTool } from "@/types/catalog";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RatingBadge } from "@/components/ui/rating-badge";

function getPricingSignal(pricing: string) {
  const normalized = pricing.toLowerCase();

  if (normalized.includes("free") || normalized.includes("ücretsiz")) {
    if (normalized.includes("freemium") || normalized.includes("kısmen")) {
      return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.36)]";
    }

    return "bg-[#0055FF] shadow-[0_0_10px_rgba(0,85,255,0.28)]";
  }

  if (normalized.includes("freemium") || normalized.includes("kısmen")) {
    return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.36)]";
  }

  return "bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.28)]";
}

type ToolCardProps = {
  locale: string;
  tool: Pick<LocalizedTool, "slug" | "name" | "shortDescription" | "rating">;
  categoryNames: string[];
  pricingLabel: string;
  detailLabel: string;
  bestForLabel?: string;
  useCaseLabel?: string;
  compareHref?: string;
  logoUrl?: string;
  variant?: "card" | "row" | "compact";
};

export function ToolCard({
  locale,
  tool,
  categoryNames,
  pricingLabel,
  detailLabel,
  bestForLabel,
  useCaseLabel,
  compareHref,
  logoUrl,
  variant = "card"
}: ToolCardProps) {
  const pricingSignal = getPricingSignal(pricingLabel);
  const compareLabel = locale === "tr" ? "Karşılaştır" : "Compare";

  if (variant === "row") {
    return (
      <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(247,250,253,0.985))] p-3.5 shadow-[0_20px_54px_-36px_rgba(15,23,42,0.12)] sm:p-4">
        <div className="h-1.5 w-full rounded-full bg-[linear-gradient(90deg,#071226_0%,#0E2450_16%,#007FFF_54%,#0055FF_80%,#3B82F6_100%)]" />
        <div className="grid gap-4 p-3.5 sm:p-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(240px,0.7fr)] lg:items-center">
          <div className="flex min-w-0 items-start gap-3.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_14px_32px_-22px_rgba(15,23,42,0.16)]">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={tool.name}
                  className="h-full w-full object-contain p-2"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">
                  {tool.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {categoryNames.slice(0, 1).map((category) => (
                  <Badge key={category} variant="ghost" className="max-w-[120px] justify-center text-[11px]">
                    {category}
                  </Badge>
                ))}
                <Badge variant="muted" className="max-w-[120px] justify-center gap-2 text-[11px]">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${pricingSignal}`} />
                  <span className="truncate">{pricingLabel}</span>
                </Badge>
                <span className="ui-soft-chip px-2.5 py-1 text-[11px]">
                  {locale === "tr" ? "Ayrıntı" : "Detail"}
                </span>
              </div>

              <h2 className="clamp-2 mt-2 text-[1rem] font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[1.08rem]">
                {tool.name}
              </h2>

              <p className="mt-1.5 clamp-2 text-[13px] leading-6 text-slate-600 sm:text-[14px]">{tool.shortDescription}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {categoryNames.slice(1, 3).map((category) => (
                  <span key={category} className="ui-soft-chip min-h-[26px] bg-white px-2.5 text-[10px] text-slate-600">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end lg:flex-col lg:items-end">
            <RatingBadge rating={tool.rating} className="w-fit" />
            <div className="grid w-full gap-2 sm:grid-cols-2 lg:w-[220px]">
              <Link
                href={`/${locale}/tools/${tool.slug}`}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-150 hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
              >
                {detailLabel}
              </Link>
              {compareHref ? (
                <Link
                  href={compareHref}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-[#0055FF] transition duration-150 hover:border-sky-300 hover:bg-sky-100 hover:text-[#0E2450]"
                >
                  {compareLabel}
                </Link>
              ) : (
                <span className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-400">
                  {compareLabel}
                </span>
              )}
            </div>
            {bestForLabel && useCaseLabel ? (
              <div className="max-w-full rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] leading-5 text-slate-600">
                <span className="font-semibold text-slate-900">{bestForLabel}:</span> {useCaseLabel}
              </div>
            ) : null}
          </div>
        </div>
      </GlassPanel>
    );
  }

  if (variant === "compact") {
    return (
      <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden p-4">
        <div className="h-1.5 w-full rounded-full bg-[linear-gradient(90deg,#071226_0%,#0E2450_16%,#007FFF_54%,#0055FF_80%,#3B82F6_100%)]" />
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_32px_-22px_rgba(15,23,42,0.18)]">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={tool.name}
                  className="h-full w-full object-contain p-2"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">
                  {tool.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {categoryNames.slice(0, 1).map((category) => (
                  <Badge key={category} variant="ghost" className="max-w-[120px] justify-center">
                    {category}
                  </Badge>
                ))}
                <Badge variant="muted" className="max-w-[110px] justify-center gap-2">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${pricingSignal}`} />
                  <span className="truncate">{pricingLabel}</span>
                </Badge>
              </div>

              <h2 className="clamp-2 mt-2 text-[1rem] font-bold leading-tight tracking-[-0.03em] text-slate-950">
                {tool.name}
              </h2>
            </div>
          </div>

          <RatingBadge rating={tool.rating} className="shrink-0" />
        </div>

        <p className="clamp-2 mt-3 text-[13px] leading-6 text-slate-600">{tool.shortDescription}</p>

        {bestForLabel && useCaseLabel ? (
          <div className="mt-3 rounded-[16px] border border-slate-200 bg-slate-50/90 px-3 py-2 text-[12px] leading-5 text-slate-600">
            <span className="font-semibold text-slate-900">{bestForLabel}:</span> {useCaseLabel}
          </div>
        ) : null}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Link
            href={`/${locale}/tools/${tool.slug}`}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition duration-150 hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
          >
            {detailLabel}
          </Link>
          {compareHref ? (
            <Link
              href={compareHref}
                className="inline-flex min-h-[40px] items-center justify-center rounded-[14px] border border-sky-200 bg-sky-50 px-3 text-sm font-semibold text-[#0055FF] transition duration-150 hover:border-sky-300 hover:bg-sky-100 hover:text-[#0E2450]"
            >
              {compareLabel}
            </Link>
          ) : (
            <span className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-400">
              {compareLabel}
            </span>
          )}
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden p-4 sm:p-6">
      <div className="h-1.5 w-full rounded-full bg-[linear-gradient(90deg,#071226_0%,#0E2450_16%,#007FFF_54%,#0055FF_80%,#3B82F6_100%)]" />
      <div className="flex min-h-[38px] flex-wrap items-start justify-between gap-3 overflow-hidden">
        <div className="flex min-w-0 flex-wrap gap-2 overflow-hidden">
          {categoryNames.slice(0, 1).map((category) => (
            <Badge key={category} variant="ghost" className="max-w-[110px] justify-center">
              {category}
            </Badge>
          ))}
        </div>
        <Badge variant="muted" className="max-w-[120px] shrink-0 justify-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${pricingSignal}`} />
          <span className="truncate">{pricingLabel}</span>
        </Badge>
      </div>

      <h2 className="clamp-2 mt-4 min-h-[2.65rem] text-[1.2rem] font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:mt-5 sm:min-h-[3.15rem] sm:text-[1.45rem]">
        {tool.name}
      </h2>
      <p className="mobile-clamp-2 mt-3 text-[15px] leading-relaxed text-slate-600">{tool.shortDescription}</p>

      {bestForLabel && useCaseLabel ? (
        <div className="ui-inner-panel mt-3 min-w-0 px-4 py-3 text-[15px] leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-900">{bestForLabel}:</span> {useCaseLabel}
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-2.5 border-t border-slate-200/90 pt-4 sm:pt-6">
        <RatingBadge rating={tool.rating} className="w-fit" />
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href={`/${locale}/tools/${tool.slug}`} className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-150 hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950">
            {detailLabel}
          </Link>
          {compareHref ? (
          <Link href={compareHref} className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-[#0055FF] transition duration-150 hover:border-sky-300 hover:bg-sky-100 hover:text-[#0E2450]">
              {compareLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </GlassPanel>
  );
}
