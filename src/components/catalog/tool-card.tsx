import Link from "next/link";
import Image from "next/image";

import type { LocalizedTool } from "@/types/catalog";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { RatingBadge } from "@/components/ui/rating-badge";

function getPricingTone(pricing: string) {
  const normalized = pricing.toLowerCase();

  if (normalized.includes("free") || normalized.includes("ücretsiz")) {
    if (normalized.includes("freemium") || normalized.includes("kısmen")) {
      return "bg-sky-400";
    }

    return "bg-blue-500";
  }

  if (normalized.includes("freemium") || normalized.includes("kısmen")) {
    return "bg-sky-400";
  }

  return "bg-slate-400";
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

function ToolLogo({ name, logoUrl }: { name: string; logoUrl?: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-slate-200 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.07)]">
      {logoUrl ? (
        <Image src={logoUrl} alt={name} width={40} height={40} unoptimized className="h-full w-full object-contain p-2" />
      ) : (
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}

function ActionLink({
  href,
  label,
  tone = "neutral"
}: {
  href?: string;
  label: string;
  tone?: "neutral" | "accent";
}) {
  if (!href) {
    return (
      <span className="inline-flex min-h-[34px] items-center justify-center rounded-[12px] border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-400">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={[
        "inline-flex min-h-[34px] items-center justify-center rounded-[12px] px-3 text-xs font-bold transition",
        tone === "accent"
          ? "border border-sky-200 bg-sky-50 text-[#0055FF] hover:border-sky-300 hover:bg-sky-100 hover:text-[#0E2450]"
          : "border border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-slate-50 hover:text-slate-950"
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

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
  const compareLabel = locale === "tr" ? "Karşılaştır" : "Compare";
  const pricingTone = getPricingTone(pricingLabel);

  if (variant === "row") {
    return (
      <article className="ui-card-hover rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.045)] transition sm:px-4">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <ToolLogo name={tool.name} logoUrl={logoUrl} />

            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <h2 className="clamp-1 text-[0.98rem] font-black tracking-[-0.025em] text-slate-950">
                  {tool.name}
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  <span className={`h-2 w-2 rounded-full ${pricingTone}`} />
                  {pricingLabel}
                </span>
              </div>

              <p className="clamp-1 mt-1 text-sm leading-5 text-slate-600">{tool.shortDescription}</p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {categoryNames.slice(0, 3).map((category) => (
                  <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                    {category}
                  </span>
                ))}
                {bestForLabel && useCaseLabel ? (
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0E2450]">
                    {useCaseLabel}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <span className="inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 text-xs font-black text-[#0E2450]">
              <span aria-hidden="true">★</span>
              {Number(tool.rating).toFixed(1)}
            </span>
            <div className="grid min-w-[168px] grid-cols-2 gap-2">
              <ActionLink href={`/${locale}/tools/${tool.slug}`} label={detailLabel} />
              <ActionLink href={compareHref} label={compareLabel} tone="accent" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <GlassPanel className="ui-card-hover flex h-full flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <ToolLogo name={tool.name} logoUrl={logoUrl} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {categoryNames.slice(0, 1).map((category) => (
                  <Badge key={category} variant="ghost">
                    {category}
                  </Badge>
                ))}
                <Badge variant="muted" className="gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${pricingTone}`} />
                  <span>{pricingLabel}</span>
                </Badge>
              </div>
              <h2 className="mt-2 text-base font-bold tracking-[-0.03em] text-slate-950">{tool.name}</h2>
            </div>
          </div>
          <RatingBadge rating={tool.rating} className="shrink-0" />
        </div>

        <p className="mt-3 clamp-2 text-sm leading-6 text-slate-600">{tool.shortDescription}</p>

        {bestForLabel && useCaseLabel ? (
          <div className="ui-inner-panel mt-3 px-3 py-2 text-xs leading-5 text-slate-600">
            <span className="font-semibold text-slate-900">{bestForLabel}:</span> {useCaseLabel}
          </div>
        ) : null}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <ActionLink href={`/${locale}/tools/${tool.slug}`} label={detailLabel} />
          <ActionLink href={compareHref} label={compareLabel} tone="accent" />
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="ui-card-hover flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <ToolLogo name={tool.name} logoUrl={logoUrl} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {categoryNames.slice(0, 1).map((category) => (
                <Badge key={category} variant="ghost">
                  {category}
                </Badge>
              ))}
              <Badge variant="muted" className="gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${pricingTone}`} />
                <span>{pricingLabel}</span>
              </Badge>
            </div>
            <h2 className="mt-3 text-[1.2rem] font-bold tracking-[-0.04em] text-slate-950">{tool.name}</h2>
          </div>
        </div>
        <RatingBadge rating={tool.rating} className="shrink-0" />
      </div>

      <p className="mt-3 mobile-clamp-2 text-[15px] leading-7 text-slate-600">{tool.shortDescription}</p>

      {bestForLabel && useCaseLabel ? (
        <div className="ui-inner-panel mt-4 px-4 py-3 text-sm leading-6 text-slate-600">
          <span className="font-semibold text-slate-900">{bestForLabel}:</span> {useCaseLabel}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {categoryNames.slice(1, 4).map((category) => (
          <span key={category} className="ui-soft-chip">
            {category}
          </span>
        ))}
      </div>

      <div className="mt-auto grid gap-2 border-t border-slate-200 pt-5 sm:grid-cols-2">
        <ActionLink href={`/${locale}/tools/${tool.slug}`} label={detailLabel} />
        <ActionLink href={compareHref} label={compareLabel} tone="accent" />
      </div>
    </GlassPanel>
  );
}
