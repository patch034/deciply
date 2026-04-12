"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";

type LanguageEntry = {
  code: string;
  label: string;
  nativeLabel: string;
  live?: boolean;
};

const languageEntries: LanguageEntry[] = [
  { code: "en", label: "English", nativeLabel: "English", live: true },
  { code: "tr", label: "Turkish", nativeLabel: "Türkçe", live: true },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "ru", label: "Russian", nativeLabel: "Русский" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
  { code: "ko", label: "Korean", nativeLabel: "한국어" },
  { code: "el", label: "Greek", nativeLabel: "Ελληνικά" },
  { code: "da", label: "Danish", nativeLabel: "Dansk" },
  { code: "fa", label: "Persian", nativeLabel: "فارسی" }
];

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.8 12h16.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3.6c2.8 2.5 2.8 14.3 0 16.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3.6c-2.8 2.5-2.8 14.3 0 16.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  const activeLanguage = useMemo(
    () => languageEntries.find((entry) => entry.code === locale) ?? languageEntries[0],
    [locale]
  );

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3.5 text-sm font-semibold text-slate-900 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.22)] transition hover:border-sky-200 hover:bg-white sm:min-h-[44px]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <GlobeIcon />
        </span>
        <span className="hidden sm:inline-flex">{activeLanguage.nativeLabel}</span>
        <span className="sm:hidden">{activeLanguage.code.toUpperCase()}</span>
        <span aria-hidden="true" className="text-xs text-slate-400">
          ▾
        </span>
      </button>

      {open ? (
        <div className="language-menu absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(92vw,18rem)] overflow-hidden rounded-[24px] border border-slate-200/90 bg-[rgba(255,255,255,0.98)] p-2 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.28)]">
          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {locale === "tr" ? "Dil seç" : "Language"}
          </p>
          <div className="grid gap-1">
            {languageEntries.map((entry) => {
              if (entry.live) {
                return (
                  <Link
                    key={entry.code}
                    href={`/${entry.code}`}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-[18px] px-3 py-3 text-left transition",
                      entry.code === locale ? "bg-sky-50 text-slate-950 ring-1 ring-sky-200" : "text-slate-700 hover:bg-slate-50"
                    ].join(" ")}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{entry.nativeLabel}</span>
                      <span className="block text-[11px] text-slate-400">{entry.label}</span>
                    </span>
                    <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {entry.code.toUpperCase()}
                    </span>
                  </Link>
                );
              }

              return (
                <div
                  key={entry.code}
                  aria-disabled="true"
                  className="pointer-events-none flex cursor-not-allowed items-center justify-between rounded-[18px] px-3 py-3 text-left text-slate-400 opacity-70"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{entry.nativeLabel}</span>
                    <span className="block text-[11px] text-slate-400">{entry.label}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Soon
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
