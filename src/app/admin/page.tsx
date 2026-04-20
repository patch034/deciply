import { redirect } from "next/navigation";
import { AdminContentType, ContentStatus } from "@prisma/client";

import {
  bulkImportAdminContentAction,
  createAdminContentAction,
  deleteAdminContentGroupAction,
  logoutAdminAction,
  updateAdminContentGroupAction
} from "@/app/admin/actions";
import {
  adminContentStatuses,
  adminContentTypes,
  adminPublishLocales,
  adminStatusLabels,
  adminTypeHelp,
  adminTypeLabels,
  formatAdminDate,
  parseAdminJson
} from "@/lib/admin-content";
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
    <select
      name={name}
      defaultValue={defaultValue}
      className="min-h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
    >
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
    <select
      name={name}
      defaultValue={defaultValue}
      className="min-h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
    >
      {adminContentStatuses.map((status) => (
        <option key={status} value={status}>
          {adminStatusLabels[status]}
        </option>
      ))}
    </select>
  );
}

function Field({
  label,
  name,
  placeholder,
  defaultValue,
  required = false
}: {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  defaultValue,
  rows = 4,
  required = false
}: {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <textarea
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className="rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const items = await prisma.adminContent.findMany({
    orderBy: [{ updatedAt: "desc" }],
    take: 500
  });

  const groupMap = new Map<
    string,
    {
      type: AdminContentType;
      slug: string;
      title: string;
      status: ContentStatus;
      featured: boolean;
      payload: string;
      relations: string;
      updatedAt: Date;
      locales: Set<string>;
    }
  >();

  for (const item of items) {
    const key = `${item.type}:${item.slug}`;
    const existing = groupMap.get(key);

    if (!existing) {
      groupMap.set(key, {
        type: item.type,
        slug: item.slug,
        title: item.title,
        status: item.status,
        featured: item.featured,
        payload: item.payload,
        relations: item.relations,
        updatedAt: item.updatedAt,
        locales: new Set([item.locale])
      });
      continue;
    }

    existing.locales.add(item.locale);
    if (item.updatedAt > existing.updatedAt) {
      existing.title = item.title;
      existing.status = item.status;
      existing.featured = item.featured;
      existing.payload = item.payload;
      existing.relations = item.relations;
      existing.updatedAt = item.updatedAt;
    }
  }

  const groups = Array.from(groupMap.values()).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  const counts = adminContentTypes.map((type) => {
    const scoped = groups.filter((item) => item.type === type);

    return {
      type,
      total: scoped.length,
      published: scoped.filter((item) => item.status === "PUBLISHED").length
    };
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,127,255,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#edf4fb_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-lg border border-white/70 bg-white/85 p-5 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.34)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0055FF]">Deciply Admin</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">İçerik yönetimi</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Kod yazmadan içerik gir. Başlığı ve kısa açıklamayı ekle; sistem aynı kaydı otomatik olarak 10 aktif dil için hazırlar.
            </p>
          </div>
          <form action={logoutAdminAction}>
            <button className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-[#0055FF]">
              Çıkış yap
            </button>
          </form>
        </header>

        <section className="grid gap-3 md:grid-cols-5">
          {counts.map((item) => (
            <div key={item.type} className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_14px_38px_-30px_rgba(15,23,42,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{adminTypeLabels[item.type]}</p>
              <p className="mt-2 text-2xl font-bold">{item.total}</p>
              <p className="mt-1 text-xs text-slate-500">{item.published} yayında</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form action={createAdminContentAction} className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_54px_-38px_rgba(15,23,42,0.22)]">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Yeni içerik ekle</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">Sadece başlık zorunlu. Diğer alanlar içeriği zenginleştirmek için opsiyonel.</p>
              </div>
              <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0055FF]">
                {adminPublishLocales.length} dil otomatik
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  İçerik tipi
                  <TypeSelect />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Yayın durumu
                  <StatusSelect defaultValue="PUBLISHED" />
                </label>
              </div>

              <Field label="Başlık" name="title" placeholder="Örn: 2026'da en iyi AI yazma araçları" required />
              <TextArea label="Kısa açıklama" name="summary" placeholder="Liste ve detay sayfalarında görünecek 1-2 cümlelik açıklama." rows={3} />
              <TextArea label="İçerik notu / gövde" name="body" placeholder="İstersen kısa içerik gövdesi, haber özeti veya editoryal not ekle." rows={5} />

              <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                <Field label="Website / kaynak URL" name="websiteUrl" placeholder="https://..." />
                <Field label="Kategori slug" name="categorySlug" placeholder="productivity, writing, chatbot..." />
                <Field label="Kaynak adı" name="sourceName" placeholder="AI haberleri için opsiyonel" />
                <Field label="Kaynak linki" name="sourceUrl" placeholder="Haberin orijinal kaynağı" />
                <Field label="Araç A slug" name="toolA" placeholder="Karşılaştırma için" />
                <Field label="Araç B slug" name="toolB" placeholder="Karşılaştırma için" />
                <Field label="Fiyat etiketi" name="price" placeholder="Ücretsiz, Freemium, Ücretli..." />
                <Field label="Özel slug (opsiyonel)" name="slug" placeholder="Boş bırakırsan başlıktan üretilir" />
              </div>

              <details className="rounded-lg border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-bold text-slate-800">İlişkiler: araçlar, karşılaştırmalar ve kategoriler</summary>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Field label="İlgili araçlar" name="relatedTools" placeholder="chatgpt, claude" />
                  <Field label="İlgili karşılaştırmalar" name="relatedComparisons" placeholder="chatgpt-vs-claude" />
                  <Field label="Kategoriler" name="categories" placeholder="chatbot, productivity" />
                </div>
              </details>

              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700">
                <input name="featured" type="checkbox" className="h-4 w-4" />
                Öne çıkar
              </label>

              <button className="min-h-12 rounded-md bg-[linear-gradient(135deg,#0E2450,#0055FF)] px-5 text-sm font-bold text-white shadow-[0_16px_34px_-24px_rgba(0,85,255,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-28px_rgba(0,85,255,0.85)]">
                10 dilde oluştur / güncelle
              </button>
            </div>
          </form>

          <aside className="grid gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_54px_-38px_rgba(15,23,42,0.18)]">
              <h2 className="text-lg font-bold">Nasıl çalışır?</h2>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                <p>
                  <strong className="text-slate-900">1.</strong> İçerik tipini seç, başlığı gir ve kaydet.
                </p>
                <p>
                  <strong className="text-slate-900">2.</strong> Slug boşsa otomatik üretilir. Blog ve haber tarihi otomatik bugün atanır.
                </p>
                <p>
                  <strong className="text-slate-900">3.</strong> Aynı kayıt tr, en, ar, ru, zh, ja, ko, el, da ve fa için oluşturulur.
                </p>
              </div>
              <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
                Not: Bu panel şu an 10 dil kaydını otomatik açar. Harici çeviri servisi bağlanana kadar metin kaynak girişten kopyalanır.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_54px_-38px_rgba(15,23,42,0.18)]">
              <h2 className="text-lg font-bold">İçerik tipleri</h2>
              <div className="mt-4 grid gap-3">
                {adminContentTypes.map((type) => (
                  <div key={type} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                    <p className="text-sm font-bold text-slate-900">{adminTypeLabels[type]}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{adminTypeHelp[type]}</p>
                  </div>
                ))}
              </div>
            </div>

            <details className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_54px_-38px_rgba(15,23,42,0.18)]">
              <summary className="cursor-pointer text-lg font-bold">Gelişmiş toplu import</summary>
              <form action={bulkImportAdminContentAction} className="mt-4 grid gap-3">
                <p className="text-sm leading-6 text-slate-600">Sadece toplu JSON aktarmak istediğinde kullan. Normal içerik girişi için sol form yeterli.</p>
                <textarea
                  name="bulk"
                  rows={10}
                  className="rounded-md border border-slate-200 p-3 font-mono text-xs"
                  defaultValue={'[\n  {\n    "type": "TOOL",\n    "slug": "ornek-arac",\n    "title": "Örnek Araç",\n    "status": "DRAFT",\n    "featured": false,\n    "payload": { "summary": "Kısa açıklama" }\n  }\n]'}
                />
                <button className="min-h-10 rounded-md border border-sky-200 bg-sky-50 px-4 text-sm font-bold text-[#0055FF] transition hover:bg-sky-100">
                  Toplu import çalıştır
                </button>
              </form>
            </details>
          </aside>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-[0_18px_54px_-38px_rgba(15,23,42,0.18)]">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold tracking-tight">İçerikler</h2>
            <p className="mt-1 text-sm text-slate-500">Aynı sluga sahip dil kayıtları tek satırda gruplanır.</p>
          </div>
          <div className="grid gap-4 p-4">
            {groups.map((item) => {
              const payload = parseAdminJson<Record<string, string | undefined>>(item.payload, {});

              return (
                <form
                  key={`${item.type}-${item.slug}`}
                  action={updateAdminContentGroupAction}
                  className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 shadow-sm"
                >
                  <input type="hidden" name="type" value={item.type} />
                  <input type="hidden" name="slug" value={item.slug} />

                  <div className="grid gap-4 xl:grid-cols-[1fr_140px_140px_auto] xl:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-[#0055FF]">
                          {adminTypeLabels[item.type]}
                        </span>
                        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass(item.status)}`}>
                          {adminStatusLabels[item.status]}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600">
                          {item.locales.size}/{adminPublishLocales.length} dil
                        </span>
                        {item.featured ? (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Öne çıkan</span>
                        ) : null}
                      </div>

                      <input
                        name="title"
                        defaultValue={item.title}
                        className="mt-3 min-h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-base font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        Slug: <span className="font-semibold text-slate-700">{item.slug}</span> · Son güncelleme: {formatAdminDate(item.updatedAt)}
                      </p>
                    </div>

                    <StatusSelect defaultValue={item.status} />

                    <label className="flex min-h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600">
                      <input name="featured" type="checkbox" defaultChecked={item.featured} />
                      Öne çıkar
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <button className="min-h-11 rounded-md bg-[#0055FF] px-4 text-sm font-bold text-white transition hover:bg-[#004be0]">
                        Güncelle
                      </button>
                      <button
                        formAction={deleteAdminContentGroupAction}
                        className="min-h-11 rounded-md border border-rose-200 bg-rose-50 px-4 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                      >
                        Sil
                      </button>
                    </div>
                  </div>

                  <details className="mt-4 rounded-md border border-slate-200 bg-white p-4">
                    <summary className="cursor-pointer text-sm font-bold text-slate-800">Düzenleme alanlarını aç</summary>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <TextArea label="Kısa açıklama" name="summary" defaultValue={String(payload.summary ?? "")} rows={3} />
                      <TextArea label="İçerik notu / gövde" name="body" defaultValue={String(payload.body ?? "")} rows={3} />
                      <Field label="Website / kaynak URL" name="websiteUrl" defaultValue={String(payload.websiteUrl ?? "")} />
                      <Field label="Kategori slug" name="categorySlug" defaultValue={String(payload.categorySlug ?? "")} />
                      <Field label="Kaynak adı" name="sourceName" defaultValue={String(payload.sourceName ?? "")} />
                      <Field label="Kaynak linki" name="sourceUrl" defaultValue={String(payload.sourceUrl ?? "")} />
                      <Field label="Araç A slug" name="toolA" defaultValue={String(payload.toolA ?? "")} />
                      <Field label="Araç B slug" name="toolB" defaultValue={String(payload.toolB ?? "")} />
                      <Field label="Fiyat etiketi" name="price" defaultValue={String(payload.price ?? "")} />
                      <Field label="İlgili araçlar" name="relatedTools" placeholder="chatgpt, claude" />
                      <Field label="İlgili karşılaştırmalar" name="relatedComparisons" placeholder="chatgpt-vs-claude" />
                      <Field label="Kategoriler" name="categories" placeholder="chatbot, productivity" />
                    </div>
                  </details>
                </form>
              );
            })}
            {!groups.length ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                Henüz içerik yok. İlk kaydı yukarıdaki formdan ekleyebilirsin.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
