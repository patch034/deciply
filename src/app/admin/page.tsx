import { redirect } from "next/navigation";
import { AdminContentType, ContentStatus } from "@prisma/client";

import {
  bulkImportAdminContentAction,
  createAdminContentAction,
  deleteAdminContentAction,
  logoutAdminAction,
  updateAdminContentAction
} from "@/app/admin/actions";
import { adminContentStatuses, adminContentTypes, adminTypeLabels, formatAdminDate } from "@/lib/admin-content";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

function statusClass(status: ContentStatus) {
  if (status === "PUBLISHED") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "HIDDEN") {
    return "border-slate-200 bg-slate-100 text-slate-600";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function TypeSelect({ name = "type", defaultValue }: { name?: string; defaultValue?: AdminContentType }) {
  return (
    <select name={name} defaultValue={defaultValue} className="min-h-10 rounded-md border border-slate-200 bg-white px-3 text-sm">
      {adminContentTypes.map((type) => (
        <option key={type} value={type}>
          {adminTypeLabels[type]}
        </option>
      ))}
    </select>
  );
}

function StatusSelect({ name = "status", defaultValue }: { name?: string; defaultValue?: ContentStatus }) {
  return (
    <select name={name} defaultValue={defaultValue} className="min-h-10 rounded-md border border-slate-200 bg-white px-3 text-sm">
      {adminContentStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const items = await prisma.adminContent.findMany({
    orderBy: [{ updatedAt: "desc" }],
    take: 200
  });

  const counts = adminContentTypes.map((type) => ({
    type,
    total: items.filter((item) => item.type === type).length,
    published: items.filter((item) => item.type === type && item.status === "PUBLISHED").length
  }));

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#edf4fb_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_54px_-38px_rgba(15,23,42,0.2)] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0055FF]">Deciply Admin</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">İçerik yönetimi</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Tools, blog, AI news, kategori ve karşılaştırma içeriklerini tek panelden hazırla. Public site şu an dosya tabanlı içerikleri korur; bu panel yeni yönetilebilir içerik katmanıdır.
            </p>
          </div>
          <form action={logoutAdminAction}>
            <button className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-[#0055FF]">
              Çıkış yap
            </button>
          </form>
        </header>

        <section className="grid gap-3 md:grid-cols-5">
          {counts.map((item) => (
            <div key={item.type} className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_14px_38px_-30px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{adminTypeLabels[item.type]}</p>
              <p className="mt-2 text-2xl font-bold">{item.total}</p>
              <p className="mt-1 text-xs text-slate-500">{item.published} published</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <form action={createAdminContentAction} className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_54px_-38px_rgba(15,23,42,0.18)]">
            <h2 className="text-xl font-bold tracking-tight">Yeni içerik</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <TypeSelect />
              <StatusSelect defaultValue="DRAFT" />
              <input name="slug" required placeholder="slug" className="min-h-10 rounded-md border border-slate-200 px-3 text-sm" />
              <input name="locale" defaultValue="tr" className="min-h-10 rounded-md border border-slate-200 px-3 text-sm" />
              <input name="title" required placeholder="Başlık" className="min-h-10 rounded-md border border-slate-200 px-3 text-sm sm:col-span-2" />
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 sm:col-span-2">
                <input name="featured" type="checkbox" className="h-4 w-4" />
                Featured
              </label>
              <textarea name="payload" defaultValue={'{\n  "summary": ""\n}'} rows={8} className="rounded-md border border-slate-200 p-3 font-mono text-xs sm:col-span-2" />
              <textarea name="relations" defaultValue={'{\n  "tools": [],\n  "comparisons": []\n}'} rows={5} className="rounded-md border border-slate-200 p-3 font-mono text-xs sm:col-span-2" />
            </div>
            <button className="mt-4 min-h-10 rounded-md bg-[#0055FF] px-4 text-sm font-semibold text-white transition hover:bg-[#004be0]">
              Kaydet
            </button>
          </form>

          <form action={bulkImportAdminContentAction} className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_54px_-38px_rgba(15,23,42,0.18)]">
            <h2 className="text-xl font-bold tracking-tight">Bulk JSON import</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              JSON array gönder. Aynı `type + slug + locale` varsa günceller, yoksa oluşturur.
            </p>
            <textarea
              name="bulk"
              rows={15}
              className="mt-4 w-full rounded-md border border-slate-200 p-3 font-mono text-xs"
              defaultValue={'[\n  {\n    "type": "TOOL",\n    "slug": "example-tool",\n    "locale": "tr",\n    "title": "Example Tool",\n    "status": "DRAFT",\n    "featured": false,\n    "payload": { "summary": "" },\n    "relations": { "categories": [] }\n  }\n]'}
            />
            <button className="mt-4 min-h-10 rounded-md border border-sky-200 bg-sky-50 px-4 text-sm font-semibold text-[#0055FF] transition hover:bg-sky-100">
              Bulk import çalıştır
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-[0_18px_54px_-38px_rgba(15,23,42,0.18)]">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold tracking-tight">Kayıtlar</h2>
            <p className="mt-1 text-sm text-slate-500">Son 200 admin içerik kaydı.</p>
          </div>
          <div className="grid gap-4 p-4">
            {items.map((item) => (
              <form key={item.id} action={updateAdminContentAction} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50/70 p-4 xl:grid-cols-[140px_120px_1fr_120px_120px_auto] xl:items-start">
                <input type="hidden" name="id" value={item.id} />
                <TypeSelect defaultValue={item.type} />
                <input name="locale" defaultValue={item.locale} className="min-h-10 rounded-md border border-slate-200 bg-white px-3 text-sm" />
                <div className="grid gap-2">
                  <input name="title" defaultValue={item.title} className="min-h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold" />
                  <input name="slug" defaultValue={item.slug} className="min-h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600" />
                  <p className="text-xs text-slate-500">Updated: {formatAdminDate(item.updatedAt)}</p>
                </div>
                <StatusSelect defaultValue={item.status} />
                <label className="flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600">
                  <input name="featured" type="checkbox" defaultChecked={item.featured} />
                  Featured
                </label>
                <div className="flex gap-2">
                  <button className="min-h-10 rounded-md bg-[#0055FF] px-4 text-sm font-semibold text-white">Güncelle</button>
                  <button formAction={deleteAdminContentAction} className="min-h-10 rounded-md border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700">
                    Sil
                  </button>
                </div>
                <div className="xl:col-span-6 grid gap-3 md:grid-cols-2">
                  <textarea name="payload" defaultValue={item.payload} rows={7} className="rounded-md border border-slate-200 bg-white p-3 font-mono text-xs" />
                  <textarea name="relations" defaultValue={item.relations} rows={7} className="rounded-md border border-slate-200 bg-white p-3 font-mono text-xs" />
                </div>
                <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(item.status)}`}>
                  {item.status}
                </span>
              </form>
            ))}
            {!items.length ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                Henüz admin içerik kaydı yok.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
