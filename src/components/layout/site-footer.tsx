import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
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
    const sharedClassName =
      "inline-flex min-h-[34px] items-center text-sm text-slate-600 transition hover:text-slate-950";

    if (isExternalHref(item.href)) {
      return (
        <a key={item.href + item.label} href={item.href} className={sharedClassName}>
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.href + item.label} href={`/${locale}${item.href}`} className={sharedClassName}>
        {item.label}
      </Link>
    );
  }

  const [toolsGroup, compareGroup, guidesGroup, trustGroup] = dictionary.footer.groups;

  return (
    <footer className="mt-16 border-t border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(244,247,251,0.99))] px-4 pb-8 pt-10 text-slate-900 sm:px-6 sm:pb-10 sm:pt-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] lg:items-start lg:gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <BrandLogo compact className="h-7 sm:h-8" />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold tracking-[-0.03em] text-slate-950 sm:text-base">Deciply</p>
                <p className="text-[10px] font-medium text-slate-500 sm:text-[11px]">
                  {locale === "tr" ? "AI araç dizini" : "AI tools directory"}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-[360px] text-sm leading-6 text-slate-600">{dictionary.footer.description}</p>
            <p className="mt-3 max-w-[360px] text-sm font-medium leading-6 text-slate-900">
              {locale === "tr" ? "Doğru AI aracını daha hızlı ve güvenle seç." : "Choose the right AI faster and with confidence."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-700">
              {dictionary.footer.contactBlock.links.map((item) => renderFooterLink(item))}
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{toolsGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-2">{toolsGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{compareGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-2">{compareGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{guidesGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-2">{guidesGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{trustGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-2">{trustGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-5">
          <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:shrink-0">
              <p>{dictionary.footer.copyright}</p>
              <p className="opacity-60">Impact-Site-Verification: cc3ef693-e846-43e9-8663-c0af7be7810c</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
