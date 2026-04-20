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
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.08)]">
      {logoUrl ? (
        <Image src={logoUrl} alt={name} width={48} height={48} unoptimized className="h-full w-full object-contain p-2" />
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
      <span className="inline-flex min-h-[42px] items-center justify-center rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-400">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={[
        "inline-flex min-h-[42px] items-center justify-center rounded-[14px] px-4 text-sm font-semibold transition",
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
      <GlassPanel className="ui-card-hover h-full p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_auto] lg:items-center">
          <div className="flex items-start gap-4">
            <ToolLogo name={tool.name} logoUrl={logoUrl} />

            <div className="min-w-0 flex-1">
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

              <h2 className="mt-2 text-[1.05rem] font-bold tracking-[-0.03em] text-slate-950">
                {tool.name}
              </h2>
              <p className="mt-1.5 clamp-2 text-sm leading-6 text-slate-600">{tool.shortDescription}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {categoryNames.slice(1, 4).map((category) => (
                  <span key={category} className="ui-soft-chip">
                    {category}
                  </span>
                ))}
                {bestForLabel && useCaseLabel ? (
                  <span className="ui-soft-chip border-blue-100 bg-blue-50 text-[#0E2450]">
                    {bestForLabel}: {useCaseLabel}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <RatingBadge rating={tool.rating} className="w-fit" />
            <div className="grid gap-2 sm:grid-cols-2 lg:w-[220px]">
              <ActionLink href={`/${locale}/tools/${tool.slug}`} label={detailLabel} />
              <ActionLink href={compareHref} label={compareLabel} tone="accent" />
            </div>
          </div>
        </div>
      </GlassPanel>
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
