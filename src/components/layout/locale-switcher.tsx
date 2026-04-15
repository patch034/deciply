"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import type { SupportedLocale } from "@/i18n/config";

type LanguageEntry = {
  code: string;
  label: string;
  nativeLabel: string;
  live?: boolean;
};

const languageEntries: LanguageEntry[] = [
  { code: "en", label: "English", nativeLabel: "English", live: true },
  { code: "tr", label: "Turkish", nativeLabel: "Türkçe", live: true },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", live: true },
  { code: "ru", label: "Russian", nativeLabel: "Русский", live: true },
  { code: "zh", label: "Chinese", nativeLabel: "中文", live: true },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", live: true },
  { code: "ko", label: "Korean", nativeLabel: "한국어", live: true },
  { code: "el", label: "Greek", nativeLabel: "Ελληνικά", live: true },
  { code: "da", label: "Danish", nativeLabel: "Dansk", live: true },
  { code: "fa", label: "Persian", nativeLabel: "فارسی", live: true }
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

  if (!segments.length) {
    return "";
  }

  const [first, ...rest] = segments;
  const isLocaleSegment = languageEntries.some((entry) => entry.code === first);

  if (!isLocaleSegment) {
    return `/${segments.join("/")}`;
  }

  return rest.length ? `/${rest.join("/")}` : "";
}

export function LocaleSwitcher({ locale }: { locale: SupportedLocale }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [pathWithQuery, setPathWithQuery] = useState("/");

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const normalizedPath = stripLocaleFromPathname(window.location.pathname);
    const search = window.location.search ?? "";
    setPathWithQuery(`${normalizedPath}${search}`);
  }, []);

  useEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }

    const updatePosition = () => {
      const button = buttonRef.current;

      if (!button) {
        return;
      }

      const rect = button.getBoundingClientRect();
      const width = Math.min(288, window.innerWidth - 16);
      const left = Math.min(Math.max(8, rect.right - width), window.innerWidth - width - 8);

      setMenuPosition({
        top: rect.bottom + 10,
        left,
        width
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const activeLanguage = useMemo(() => languageEntries.find((entry) => entry.code === locale) ?? languageEntries[0], [locale]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-slate-200/85 bg-white/80 px-3.5 text-sm font-semibold text-slate-900 shadow-[0_18px_42px_-28px_rgba(15,23,42,0.22)] ring-1 ring-white/70 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-sky-200 hover:bg-white hover:shadow-[0_22px_52px_-30px_rgba(14,37,64,0.3)] hover:-translate-y-[1px] sm:min-h-[44px]"
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

      {open && menuPosition
        ? createPortal(
            <div
              className="fixed z-[120] overflow-hidden rounded-[24px] border border-slate-200/90 bg-[rgba(255,255,255,0.98)] p-2 shadow-[0_32px_96px_-42px_rgba(15,23,42,0.3)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[rgba(255,255,255,0.96)]"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
                width: menuPosition.width
              }}
            >
              <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {locale === "tr" ? "Dil seç" : "Language"}
              </p>
              <div className="grid gap-1">
                {languageEntries.map((entry) => {
                  if (entry.live) {
                    return (
                      <Link
                        key={entry.code}
                        href={`/${entry.code}${pathWithQuery}`}
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
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
