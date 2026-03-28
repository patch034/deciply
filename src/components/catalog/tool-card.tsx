import Link from "next/link";

import type { LocalizedTool } from "@/types/catalog";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";

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
};

export function ToolCard({
  locale,
  tool,
  categoryNames,
  pricingLabel,
  detailLabel,
  bestForLabel,
  useCaseLabel
}: ToolCardProps) {
  const pricingSignal = getPricingSignal(pricingLabel);

  return (
    <GlassPanel className="ui-card ui-card-hover flex h-full flex-col overflow-hidden p-6">
      <div className="flex min-h-[38px] items-start justify-between gap-3 overflow-hidden">
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

      <h2 className="clamp-2 mt-5 min-h-[3.25rem] text-[1.45rem] font-bold leading-tight tracking-[-0.03em] text-slate-100">{tool.name}</h2>
      <p className="clamp-3 mt-3 text-sm leading-7 text-slate-300/88">{tool.shortDescription}</p>

      {bestForLabel && useCaseLabel ? (
        <div className="ui-inner-panel mt-4 min-w-0 px-4 py-3 text-sm text-slate-300/88">
          <span className="font-semibold text-slate-100">{bestForLabel}:</span> {useCaseLabel}
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-amber-100 drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">{tool.rating.toFixed(1)}/5</p>
        <Link href={`/${locale}/tools/${tool.slug}`} className="inline-flex min-h-[38px] w-full items-center justify-center rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-200 transition duration-150 hover:bg-white/[0.05] hover:text-white sm:w-auto">
          {detailLabel}
        </Link>
      </div>
    </GlassPanel>
  );
}
