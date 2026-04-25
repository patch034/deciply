import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import type { SupportedLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  locale: SupportedLocale;
  dictionary: Dictionary;
};

type FooterLink = {
  href: string;
  label: string;
};

function isExternalHref(href: string) {
  return /^(mailto:|https?:\/\/|tel:)/i.test(href);
}

function renderLink(locale: SupportedLocale, item: FooterLink) {
  const className = "text-sm font-medium text-slate-600 transition hover:text-slate-950";

  if (isExternalHref(item.href)) {
    return (
      <a key={item.href + item.label} href={item.href} className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link key={item.href + item.label} href={`/${locale}${item.href}`} className={className}>
      {item.label}
    </Link>
  );
}

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="mt-16 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        <section className="ui-card rounded-[28px] p-5 sm:p-6 lg:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_2fr] lg:items-start">
            <div className="space-y-5 rounded-[24px] border border-slate-200 bg-white/78 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.045)]">
              <div className="flex items-center gap-3">
                <BrandLogo compact className="h-10 w-10" />
                <div>
                  <p className="text-xl font-black tracking-[-0.045em] text-slate-950">Deciply</p>
                  <p className="text-sm font-semibold text-slate-500">{dictionary.brandSubtitle}</p>
                </div>
              </div>
              <p className="max-w-[36rem] text-sm leading-7 text-slate-600">{dictionary.footer.description}</p>
              <div className="space-y-2 text-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {dictionary.footer.contactBlock.title}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {dictionary.footer.contactBlock.links.map((item) => renderLink(locale, item))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dictionary.footer.groups.map((group) => (
                <div key={group.title} className="space-y-3">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">{group.title}</h2>
                  <div className="flex flex-col gap-2">{group.links.map((item) => renderLink(locale, item))}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 border-t border-slate-200/90 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <p className="font-semibold">{dictionary.footer.copyright}</p>
          </div>
        </section>
      </div>
    </footer>
  );
}
