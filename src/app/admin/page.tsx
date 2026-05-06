import Link from "next/link";

export const dynamic = "force-static";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,127,255,0.08),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#edf4fb_100%)] px-4 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center">
        <section className="w-full rounded-lg border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.28)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0055FF]">Deciply Admin</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">Admin panel</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This static export build does not include the interactive admin backend. The public site is fully available, but content editing is disabled in this deployment mode.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/en"
              className="inline-flex min-h-11 items-center rounded-md bg-[linear-gradient(135deg,#0E2450,#0055FF)] px-4 text-sm font-bold text-white shadow-[0_16px_34px_-24px_rgba(0,85,255,0.7)] transition hover:-translate-y-0.5"
            >
              Open site
            </Link>
            <Link href="/admin/login" className="inline-flex min-h-11 items-center rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-[#0055FF]">
              Login
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
