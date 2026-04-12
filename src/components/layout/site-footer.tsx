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

function alphaLabel(letter: string) {
  return letter === "#" ? "Other" : letter.toUpperCase();
}

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  function renderFooterLink(item: { href: string; label: string }) {
    const sharedClassName = "inline-flex min-h-[34px] items-center text-sm text-slate-600 transition hover:text-slate-950";

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
  const browseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const browseLinks = [
    ...browseLetters.map((letter) => ({ href: `/tools?q=${letter}`, label: alphaLabel(letter) })),
    { href: "/tools", label: locale === "tr" ? "Diğer" : "Other" }
  ];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-[linear-gradient(180deg,rgba(250,252,255,0.98),rgba(241,245,249,0.99))] px-4 pb-10 pt-10 text-slate-900 sm:px-6 sm:pb-12 sm:pt-12">
      <div className="mx-auto max-w-[1440px] space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] lg:items-start lg:gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <BrandLogo compact className="h-8" />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold tracking-[-0.03em] text-slate-950 sm:text-base">Deciply</p>
                <p className="text-[11px] font-medium text-slate-600 sm:text-[12px]">
                  {locale === "tr" ? "AI araç dizini" : "AI tools directory"}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-[380px] text-sm leading-6 text-slate-600">{dictionary.footer.description}</p>
            <p className="mt-3 max-w-[380px] text-sm font-medium leading-6 text-slate-900">
              {locale === "tr"
                ? "Doğru AI aracını daha hızlı, daha net ve daha güvenli seç."
                : "Choose the right AI faster, more clearly, and with confidence."}
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

        <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_24px_70px_-46px_rgba(15,23,42,0.16)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                {locale === "tr" ? "Harf sırasına göre keşfet" : "Browse alphabetically"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {locale === "tr"
                  ? "Araçları harf bazında açarak hızlıca geniş katalog içinde gez."
                  : "Open tools by letter and move through the directory quickly."}
              </p>
            </div>
            <Link
              href={`/${locale}/tools`}
              className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-slate-950"
            >
              {locale === "tr" ? "Tüm araçlar" : "All tools"}
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {browseLinks.map((item) => (
              <Link
                key={item.label}
                href={`/${locale}${item.href}`}
                className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/${locale}/categories/mega`}
              className="inline-flex min-h-[34px] items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 text-xs font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
            >
              {locale === "tr" ? "Mega dizin" : "Mega directory"}
            </Link>
            <Link
              href={`/${locale}/news`}
              className="inline-flex min-h-[34px] items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-slate-950"
            >
              {locale === "tr" ? "AI Haberleri" : "AI News"}
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-5">
          <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500 sm:shrink-0">
              <p>{dictionary.footer.copyright}</p>
              <p>Impact-Site-Verification: cc3ef693-e846-43e9-8663-c0af7be7810c</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
