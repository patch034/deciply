import Link from "next/link";

import type { LocalizedTool } from "@/types/catalog";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RatingBadge } from "@/components/ui/rating-badge";

function getPricingSignal(pricing: string) {
  const normalized = pricing.toLowerCase();

  if (normalized.includes("free") || normalized.includes("ücretsiz")) {
    if (normalized.includes("freemium") || normalized.includes("kısmen")) {
      return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.45)]";
    }

    return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]";
  }

  if (normalized.includes("freemium") || normalized.includes("kısmen")) {
    return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.45)]";
  }

  return "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.42)]";
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
};

export function ToolCard({
  locale,
  tool,
  categoryNames,
  pricingLabel,
  detailLabel,
  bestForLabel,
  useCaseLabel,
  compareHref
}: ToolCardProps) {
  const pricingSignal = getPricingSignal(pricingLabel);
  const compareLabel = locale === "tr" ? "Karşılaştır" : "Compare";

  return (
    <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden p-4 sm:p-6">
      <div className="flex min-h-[38px] flex-wrap items-start justify-between gap-3 overflow-hidden">
        <div className="flex min-w-0 flex-wrap gap-2 overflow-hidden">
          {categoryNames.slice(0, 1).map((category) => (
            <Badge key={category} variant="ghost" className="max-w-[110px] justify-center">{category}</Badge>
          ))}
        </div>
        <Badge variant="muted" className="max-w-[120px] shrink-0 justify-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${pricingSignal}`} />
          <span className="truncate">{pricingLabel}</span>
        </Badge>
      </div>

      <h2 className="clamp-2 mt-4 min-h-[2.65rem] text-[1.2rem] font-bold leading-tight tracking-[-0.03em] text-slate-100 sm:mt-5 sm:min-h-[3.15rem] sm:text-[1.45rem]">{tool.name}</h2>
      <p className="mobile-clamp-2 mt-3 text-[15px] leading-relaxed text-slate-300/88">{tool.shortDescription}</p>

      {bestForLabel && useCaseLabel ? (
        <div className="ui-inner-panel mt-3 min-w-0 px-4 py-3 text-[15px] leading-relaxed text-slate-300/88">
          <span className="font-semibold text-slate-100">{bestForLabel}:</span> {useCaseLabel}
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-2.5 border-t border-violet-400/12 pt-4 sm:pt-6">
        <RatingBadge rating={tool.rating} className="w-fit" />
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href={`/${locale}/tools/${tool.slug}`} className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-violet-400/14 bg-slate-950/55 px-4 py-2.5 text-sm font-semibold text-slate-200 transition duration-150 hover:bg-slate-900/80 hover:text-white">
            {detailLabel}
          </Link>
          {compareHref ? (
            <Link href={compareHref} className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-fuchsia-400/18 bg-fuchsia-400/[0.08] px-4 py-2.5 text-sm font-semibold text-fuchsia-100 transition duration-150 hover:border-fuchsia-400/26 hover:bg-fuchsia-400/[0.12] hover:text-fuchsia-50">
              {compareLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </GlassPanel>
  );
}



