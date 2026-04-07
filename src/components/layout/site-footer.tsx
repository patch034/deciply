import Link from "next/link";

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
    const sharedClassName = "truncate transition duration-200 hover:text-cyan-100";

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
    <footer className="mt-24 px-4 pb-10 sm:px-6 sm:pb-12">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[36px] border border-sky-400/12 bg-[linear-gradient(180deg,rgba(7,12,20,0.94),rgba(4,8,14,0.99))] px-5 py-10 shadow-[0_30px_92px_-48px_rgba(14,165,233,0.16)] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-sky-400/16 to-transparent" />

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.25fr_repeat(4,minmax(0,1fr))] xl:gap-8">
          <div className="min-w-0 md:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[var(--tn-gradient-primary)] text-sm font-bold text-white shadow-[0_18px_42px_-20px_rgba(37,99,235,0.36)]">
                D
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">{dictionary.footer.badge}</p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-50">{locale === "tr" ? "AI araçlarını keşfetmek için" : "For discovering AI tools"}</p>
              </div>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300/88 md:text-base md:leading-8">{dictionary.footer.description}</p>
            <p className="mt-3 text-sm font-medium text-cyan-100/90">{locale === "tr" ? "Doğru AI aracını daha hızlı ve güvenle seç." : "Choose the right AI. Faster, smarter, confidently."}</p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">{dictionary.footer.contactBlock.title}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-200">
                {dictionary.footer.contactBlock.links.map((item) => renderFooterLink(item))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{toolsGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">{toolsGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{compareGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">{compareGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{guidesGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300/88">{guidesGroup.links.map((item) => renderFooterLink(item))}</div>
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{trustGroup.title}</h2>
            <div className="mt-4 flex flex-col gap-4 text-sm text-slate-300/88">
              {trustGroup.links.map((item) => renderFooterLink(item))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-sky-400/10 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl">{dictionary.footer.bottomNote}</p>
            <p className="shrink-0">{dictionary.footer.copyright}</p>
          </div>
          <p className="mt-3 text-[10px] opacity-50">Impact-Site-Verification: cc3ef693-e846-43e9-8663-c0af7be7810c</p>
        </div>
      </div>
    </footer>
  );
}
