import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";

type NewsletterFormProps = {
  inputLabel: string;
  placeholder: string;
  buttonLabel: string;
  disclaimer: string;
};

export function NewsletterForm({
  inputLabel,
  placeholder,
  buttonLabel,
  disclaimer
}: NewsletterFormProps) {
  return (
    <GlassPanel className="home-card-glow p-4 md:p-5">
      <form action="#">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            {inputLabel}
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={placeholder}
            className="min-h-14 flex-1 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-base text-brand-ink outline-none transition placeholder:text-slate-400 focus:border-brand-accent focus:bg-white"
          />
          <PremiumButton type="submit" className="min-h-14 px-6">
            {buttonLabel}
          </PremiumButton>
        </div>
      </form>
      <p className="mt-4 text-sm leading-6 text-slate-500">{disclaimer}</p>
    </GlassPanel>
  );
}

