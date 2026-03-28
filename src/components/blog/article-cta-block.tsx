import { PremiumButton } from "@/components/ui/premium-button";

type ArticleCtaBlockProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function ArticleCtaBlock({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}: ArticleCtaBlockProps) {
  return (
    <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))] px-8 py-10 shadow-[0_28px_80px_-42px_rgba(34,211,238,0.22)] lg:px-10 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PremiumButton href={primaryHref} target={primaryHref.startsWith("http") ? "_blank" : undefined} rel={primaryHref.startsWith("http") ? "nofollow sponsored noreferrer" : undefined}>{primaryLabel}</PremiumButton>
          <PremiumButton href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
