import { Badge } from "@/components/ui/badge";

type FloatingAffiliateBarProps = {
  toolName: string;
  pricingValue: string;
  ctaLabel: string;
  websiteUrl: string;
  supportText: string;
  eyebrowLabel?: string;
};

export function FloatingAffiliateBar({
  toolName,
  pricingValue,
  ctaLabel,
  websiteUrl,
  supportText,
  eyebrowLabel = "Affiliate CTA"
}: FloatingAffiliateBarProps) {
  return (
    <>
      <aside className="hidden lg:block lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-[28px] border border-cyan-400/18 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(11,15,25,0.98))] p-5 shadow-[0_26px_80px_-42px_rgba(34,211,238,0.24)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{eyebrowLabel}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-50">{toolName}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{pricingValue}</Badge>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{supportText}</p>
          <a
            href={websiteUrl}
            target="_blank"
            rel="nofollow sponsored noreferrer"
            className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_72px_-22px_rgba(14,165,233,0.52)]"
          >
            {ctaLabel}
          </a>
        </div>
      </aside>

      <div className="mt-4 lg:hidden">
        <div className="sticky bottom-3 rounded-[22px] border border-cyan-400/18 bg-[#0b0f19]/94 p-3 shadow-[0_18px_60px_-24px_rgba(34,211,238,0.42)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-100">{toolName}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="accent" className="max-w-[120px] justify-center">{pricingValue}</Badge>
              </div>
              <p className="mt-1 truncate text-xs text-slate-400">{supportText}</p>
            </div>
            <a
              href={websiteUrl}
              target="_blank"
              rel="nofollow sponsored noreferrer"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_-22px_rgba(34,211,238,0.58)] transition duration-300 hover:scale-[1.02]"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

