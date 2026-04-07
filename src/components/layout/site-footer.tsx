import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function isExternalHref(href: string) {
  return /^(mailto:|https?:\/\/|tel:)/i.test(href);
}

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  function renderFooterLink(item: { href: string; label: string }) {
    if (isExternalHref(item.href)) {
      return (
        <a key={item.href + item.label} href={item.href} className="truncate transition duration-200 hover:text-cyan-100">
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.href + item.label} href={`/${locale}${item.href}`} className="truncate transition duration-200 hover:text-cyan-100">
        {item.label}
      </Link>
    );
  }

  return (
    <footer className="mt-24 px-4 pb-10 sm:px-6 sm:pb-12">
      <GlassPanel className="mx-auto max-w-[1240px] rounded-[34px] border-sky-400/12 bg-[linear-gradient(180deg,rgba(7,12,20,0.92),rgba(5,8,15,0.98))] px-5 py-10 shadow-[0_30px_92px_-48px_rgba(14,165,233,0.16)] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-sky-400/16 to-transparent" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
          <div className="min-w-0 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">{dictionary.footer.badge}</p>
            <div className="mt-4">
              <BrandLogo className="text-3xl" />
            </div>
            <p className="mt-3 text-sm font-medium text-cyan-100/90">{locale === "tr" ? "Doğru AI aracını daha hızlı ve güvenle seç." : "Choose the right AI. Faster, smarter, confidently."}</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300/88 md:text-base md:leading-8">{dictionary.footer.description}</p>

            <div className="mt-8 rounded-[24px] border border-sky-400/10 bg-slate-950/40 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">{dictionary.footer.contactBlock.title}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
                {dictionary.footer.contactBlock.links.map((item) => renderFooterLink(item))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {dictionary.footer.groups.map((group) => (
              <div key={group.title} className="min-w-0 rounded-[24px] border border-sky-400/8 bg-slate-950/26 p-4 sm:p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{group.title}</h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">
                  {group.links.map((item) => renderFooterLink(item))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-sky-400/10 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <p className="shrink-0">{dictionary.footer.copyright}</p>
          </div>
          <p className="mt-3 text-[10px] opacity-50">Impact-Site-Verification: cc3ef693-e846-43e9-8663-c0af7be7810c</p>
        </div>
      </GlassPanel>
    </footer>
  );
}

