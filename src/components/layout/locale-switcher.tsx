"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { SupportedLocale } from "@/i18n/config";

type LanguageEntry = {
  code: SupportedLocale;
  label: string;
  nativeLabel: string;
};

const languageEntries: LanguageEntry[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "tr", label: "Turkish", nativeLabel: "Türkçe" },
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

function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "";
  }

  const [first, ...rest] = segments;
  const isLocale = languageEntries.some((entry) => entry.code === first);
  return isLocale ? (rest.length ? `/${rest.join("/")}` : "") : `/${segments.join("/")}`;
}

export function LocaleSwitcher({ locale }: { locale: SupportedLocale }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pathWithQuery, setPathWithQuery] = useState("/");

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextPath = `${stripLocaleFromPathname(window.location.pathname)}${window.location.search ?? ""}`;
    setPathWithQuery(nextPath || "/");
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
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200/90 bg-white/72 px-3.5 text-sm font-semibold text-slate-900 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl transition hover:border-sky-200 hover:bg-white/84"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <GlobeIcon />
        </span>
        <span className="hidden sm:inline">{activeLanguage.nativeLabel}</span>
        <span className="sm:hidden">{activeLanguage.code.toUpperCase()}</span>
        <span aria-hidden="true" className="text-xs text-slate-400">
          ▾
        </span>
      </button>

      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+0.7rem)] z-[120] w-[min(18rem,calc(100vw-1rem))] rounded-[24px] border border-slate-200/90 bg-white/94 p-2 shadow-[0_24px_72px_-34px_rgba(15,23,42,0.24)] backdrop-blur-2xl"
          role="menu"
        >
          <div className="grid gap-1">
            {languageEntries.map((entry) => (
              <Link
                key={entry.code}
                href={`/${entry.code}${pathWithQuery}`}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center justify-between rounded-[18px] px-3 py-3 transition",
                  entry.code === locale
                    ? "bg-sky-50 text-slate-950 ring-1 ring-sky-200"
                    : "text-slate-700 hover:bg-slate-50"
                ].join(" ")}
                role="menuitem"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{entry.nativeLabel}</span>
                  <span className="block text-[11px] text-slate-400">{entry.label}</span>
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {entry.code.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
