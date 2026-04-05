"use client";

import type { FormEvent } from "react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { PremiumButton } from "@/components/ui/premium-button";
import type { Locale } from "@/i18n/config";

type NewsletterFormProps = {
  locale: Locale;
  inputLabel: string;
  placeholder: string;
  buttonLabel: string;
  disclaimer: string;
  destinationEmail?: string;
};

export function NewsletterForm({
  locale,
  inputLabel,
  placeholder,
  buttonLabel,
  disclaimer,
  destinationEmail = "hello@deciply.com"
}: NewsletterFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      return;
    }

    const subject =
      locale === "tr" ? "Deciply bülten kaydı" : "Deciply newsletter signup";
    const body =
      locale === "tr"
        ? `Merhaba,\n\nDeciply güncellemeleri için bu adresi listeye eklemek istiyorum:\n${email}\n`
        : `Hello,\n\nI'd like to join Deciply updates with this email address:\n${email}\n`;

    window.location.href = `mailto:${destinationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    event.currentTarget.reset();
  }

  return (
    <GlassPanel className="home-card-glow p-4 md:p-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            {inputLabel}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder={placeholder}
            className="min-h-14 w-full min-w-0 flex-1 rounded-2xl border border-white/12 bg-white/[0.06] px-4 text-base text-slate-50 outline-none transition placeholder:text-slate-400 focus:border-cyan-400/45 focus:bg-white/[0.08]"
          />
          <PremiumButton type="submit" className="min-h-14 px-6">
            {buttonLabel}
          </PremiumButton>
        </div>
      </form>
      <p className="mt-4 text-sm leading-6 text-slate-400/84">{disclaimer}</p>
    </GlassPanel>
  );
}

