import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAdminAction } from "@/app/admin/actions";
import { hasProductionAdminSecret, isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#edf4fb_100%)] px-4 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <section className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.22)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0055FF]">Deciply Admin</p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">Giriş yap</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            İçerik yönetimi sadece yetkili kullanıcılar için açık.
          </p>

          {process.env.NODE_ENV !== "production" && !hasProductionAdminSecret() ? (
            <p className="mt-4 rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-xs leading-5 text-slate-700">
              Lokal varsayılan parola: <span className="font-semibold">deciply-admin-local</span>
            </p>
          ) : null}

          {params.error ? (
            <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
              Parola hatalı.
            </p>
          ) : null}

          <form action={loginAdminAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Admin parolası
              <input
                name="password"
                type="password"
                required
                className="min-h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950"
              />
            </label>
            <button className="min-h-11 rounded-md bg-[#0055FF] px-4 text-sm font-semibold text-white transition hover:bg-[#004be0]">
              Giriş yap
            </button>
          </form>

          <Link href="/tr" className="mt-5 inline-flex text-sm font-semibold text-slate-500 transition hover:text-slate-950">
            Siteye dön
          </Link>
        </section>
      </div>
    </main>
  );
}
