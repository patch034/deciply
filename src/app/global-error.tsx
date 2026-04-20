"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef4fb_100%)] px-4 py-10 text-slate-950">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
          <div className="ui-card w-full rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_24px_72px_-40px_rgba(15,23,42,0.18)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0055FF]">Deciply</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Beklenmeyen bir sorun oluştu</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Uygulama kendini toparlayamadı. Yeniden dene veya ana sayfaya dön.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center justify-center rounded-2xl bg-[#0055FF] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(0,85,255,0.55)] transition hover:-translate-y-0.5 hover:bg-[#004be0]"
              >
                Yeniden dene
              </button>
              <Link
                href="/tr"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-[#0055FF]"
              >
                Ana sayfa
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
