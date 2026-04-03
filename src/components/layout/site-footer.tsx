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
        <a key={item.href + item.label} href={item.href} className="truncate transition duration-200 hover:text-white">
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.href + item.label} href={`/${locale}${item.href}`} className="truncate transition duration-200 hover:text-white">
        {item.label}
      </Link>
    );
  }

  return (
    <footer className="mt-20 px-6 pb-8">
      <GlassPanel className="mx-auto max-w-[1200px] rounded-2xl border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(11,15,25,0.96))] px-6 py-10 shadow-[0_28px_80px_-44px_rgba(14,165,233,0.2)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="min-w-0 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{dictionary.footer.badge}</p>
            <div className="mt-4">
              <BrandLogo className="text-3xl" />
            </div>
            <p className="mt-3 text-sm font-medium text-cyan-200/88">
              {locale === "tr" ? "Doğru AI aracını daha hızlı ve güvenle seç." : "Choose the right AI. Faster, smarter, confidently."}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300/88 md:text-base md:leading-8">
              {dictionary.footer.description}
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {dictionary.footer.contactBlock.title}
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2 lg:grid-cols-1">
                {dictionary.footer.contactBlock.links.map((item) => renderFooterLink(item))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {dictionary.footer.groups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{group.title}</h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">
                  {group.links.map((item) => renderFooterLink(item))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <p className="shrink-0">{dictionary.footer.copyright}</p>
          </div>
          <p className="mt-3 text-[10px] opacity-50">Impact-Site-Verification: cc3ef693-e846-43e9-8663-c0af7be7810c</p>
        </div>
      </GlassPanel>
    </footer>
  );
}
