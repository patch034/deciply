import { PremiumButton } from "@/components/ui/premium-button";

type ArticleCtaButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ArticleCtaBlockProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttons: ArticleCtaButton[];
  tone?: "light" | "dark";
};

export function ArticleCtaBlock({ eyebrow, title, description, buttons, tone = "light" }: ArticleCtaBlockProps) {
  const isLight = tone === "light";

  return (
    <section
      className={[
        "rounded-[30px] border px-5 py-7 shadow-[0_24px_70px_-40px_rgba(14,165,233,0.12)] sm:px-6 sm:py-8 lg:px-10 lg:py-12",
        isLight
          ? "border-slate-200/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))]"
          : "border-sky-400/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(11,15,25,0.98))]"
      ].join(" ")}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className={["text-sm font-semibold uppercase tracking-[0.2em]", isLight ? "text-[#0055FF]" : "text-[#BFD2F6]"].join(" ")}>{eyebrow}</p>
          <h2 className={["mt-4 text-3xl font-bold tracking-tight md:text-4xl", isLight ? "text-slate-950" : "text-slate-50"].join(" ")}>{title}</h2>
          <p className={["mt-3 text-[15px] leading-7 sm:mt-4 md:text-lg", isLight ? "text-slate-600" : "text-slate-300"].join(" ")}>{description}</p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {buttons.map((button) => (
            <PremiumButton key={`${button.label}-${button.href}`} href={button.href} variant={button.variant ?? "primary"} className="w-full">
              {button.label}
            </PremiumButton>
          ))}
        </div>
      </div>
    </section>
  );
}
