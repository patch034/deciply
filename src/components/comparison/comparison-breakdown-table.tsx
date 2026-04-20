import { Badge } from "@/components/ui/badge";
import type { ComparisonRow } from "@/data/comparisons";

type ComparisonBreakdownTableProps = {
  locale: "tr" | "en" | "ar" | "ru" | "zh" | "ja" | "ko" | "el" | "da" | "fa";
  title: string;
  description: string;
  columns: {
    label: string;
    left: string;
    right: string;
  };
  rows: ComparisonRow[];
};

function normalizeCompareText(input: string) {
  return input
    .replace(/\u00c2/g, "")
    .replace(/\u00c3\u00bc/g, "ü")
    .replace(/\u00c3\u009c/g, "Ü")
    .replace(/\u00c3\u00b6/g, "ö")
    .replace(/\u00c3\u0096/g, "Ö")
    .replace(/\u00c3\u00a7/g, "ç")
    .replace(/\u00c3\u0087/g, "Ç")
    .replace(/\u00c4\u00b1/g, "ı")
    .replace(/\u00c4\u00b0/g, "İ")
    .replace(/\u00c4\u009f/g, "ğ")
    .replace(/\u00c4\u009e/g, "Ğ")
    .replace(/\u00c5\u009f/g, "ş")
    .replace(/\u00c5\u009e/g, "Ş")
    .replace(/\u00e2\u0080\u0099/g, "’")
    .replace(/\u00e2\u0080\u009c|\u00e2\u0080\u009d/g, "\"")
    .replace(/\u00e2\u0080\u0093/g, "–")
    .replace(/\u00e2\u0080\u0094/g, "—")
    .replace(/\uFFFD/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getInitials(name: string) {
  return normalizeCompareText(name)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function isPricingLabel(value: string) {
  const normalized = normalizeCompareText(value).toLowerCase();
  return ["free", "freemium", "paid", "ücretsiz", "kısmen ücretsiz", "ücretli", "free tier", "pricing model"].some((item) =>
    normalized.includes(item)
  );
}

function renderValue(value: string, locale: ComparisonBreakdownTableProps["locale"], compact = false) {
  const normalized = normalizeCompareText(value);
  const lowered = normalized.toLowerCase();

  if (lowered === "yes" || lowered === "evet") {
    return (
      <span
        aria-label={locale === "tr" ? "Evet" : "Yes"}
        className={compact ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700" : "inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700"}
      >
        ✓
      </span>
    );
  }

  if (lowered === "no" || lowered === "hayır" || lowered === "hayir") {
    return (
      <span
        aria-label={locale === "tr" ? "Hayır" : "No"}
        className={compact ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[11px] font-bold text-rose-700" : "inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700"}
      >
        ✕
      </span>
    );
  }

  if (normalized === "-" || normalized === "—" || lowered === "n/a" || lowered === "na") {
    return (
      <span
        aria-label={locale === "tr" ? "Uygun değil" : "Not available"}
        className={compact ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500" : "inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500"}
      >
        —
      </span>
    );
  }

  if (isPricingLabel(normalized)) {
    const tone =
      lowered.includes("free") || lowered.includes("ücretsiz")
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : lowered.includes("freemium") || lowered.includes("kısmen") || lowered.includes("kismen")
          ? "border-sky-200 bg-sky-50 text-[#0055FF]"
          : "border-slate-200 bg-slate-50 text-slate-700";

    return (
      <Badge variant="ghost" className={`max-w-full shrink-0 px-2.5 py-0.5 text-[10px] font-semibold ${tone}`}>
        {normalized}
      </Badge>
    );
  }

  return <p className={compact ? "mobile-clamp-2 text-[12px] leading-5 text-slate-600" : "text-sm leading-6 text-slate-600"}>{normalized}</p>;
}

function renderToolBadge(name: string, tone: "left" | "right") {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
        tone === "left" ? "border-sky-200 bg-sky-50 text-[#0055FF]" : "border-slate-200 bg-white text-slate-700"
      ].join(" ")}
    >
      <span className={tone === "left" ? "text-[#0055FF]" : "text-slate-700"}>{getInitials(name)}</span>
      <span className="max-w-[8rem] truncate normal-case tracking-normal">{normalizeCompareText(name)}</span>
    </span>
  );
}

export function ComparisonBreakdownTable({ locale, title, description, columns, rows }: ComparisonBreakdownTableProps) {
  return (
    <section className="ui-card rounded-[34px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(246,250,255,0.985))] p-4 shadow-[0_24px_72px_-42px_rgba(15,23,42,0.14)] sm:p-6 md:p-8">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0055FF]">
          {locale === "tr" ? "Karşılaştırma tablosu" : "Comparison table"}
        </p>
        <h2 className="mt-3 text-[1.75rem] font-bold tracking-[-0.03em] text-slate-950 sm:text-[2.1rem] md:text-[2.6rem]">
          {normalizeCompareText(title)}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px] md:text-base md:leading-7">
          {normalizeCompareText(description)}
        </p>
      </div>

      <div className="mt-6 grid gap-3 rounded-[28px] border border-slate-200 bg-slate-50/90 p-4 shadow-[0_18px_54px_-40px_rgba(15,23,42,0.12)] sm:gap-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0055FF]">
              {locale === "tr" ? "Sabit karşılaştırma barı" : "Sticky compare bar"}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
              {renderToolBadge(columns.left, "left")}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-white text-[11px] font-bold tracking-[0.24em] text-[#0055FF]">
                VS
              </span>
              {renderToolBadge(columns.right, "right")}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <span className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-500">
              {normalizeCompareText(columns.label)}
            </span>
            <span className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-3 text-[11px] font-semibold text-[#0055FF]">
              {normalizeCompareText(columns.left)}
            </span>
            <span className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-700">
              {normalizeCompareText(columns.right)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[26px] border border-slate-200 bg-white">
        <div className="hidden md:grid md:grid-cols-[minmax(200px,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-px md:bg-slate-200">
          <div className="bg-slate-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {normalizeCompareText(columns.label)}
          </div>
          <div className="bg-sky-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0055FF]">
            {normalizeCompareText(columns.left)}
          </div>
          <div className="bg-slate-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
            {normalizeCompareText(columns.right)}
          </div>
        </div>

        <div className="hidden md:block">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[minmax(200px,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] gap-px border-t border-slate-200 first:border-t-0">
              <div className="bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900">{normalizeCompareText(row.label)}</div>
              <div className="bg-sky-50/40 px-5 py-4">{renderValue(row.left, locale)}</div>
              <div className="bg-white px-5 py-4">{renderValue(row.right, locale)}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-px md:hidden">
          {rows.map((row) => {
            const compact = ["Hız", "Kullanım kolaylığı", "Çıktı kalitesi", "Öğrenci", "Creator", "İş", "Değer", "Speed", "Ease of use", "Output quality", "Students", "Creators", "Business", "Value"].includes(
              row.label
            );

            return (
              <article key={row.label} className="border-t border-slate-200 bg-white px-4 py-4 first:border-t-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{normalizeCompareText(row.label)}</h3>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                    {normalizeCompareText(columns.left)} · {normalizeCompareText(columns.right)}
                  </span>
                </div>

                <div className="mt-3 grid gap-2.5">
                  <div className="rounded-[16px] border border-sky-200 bg-sky-50/50">
                    <div className="flex items-start justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0055FF]">
                          {normalizeCompareText(columns.left)}
                        </p>
                        <div className={compact ? "mt-1" : "mt-1.5"}>{renderValue(row.left, locale, compact)}</div>
                      </div>
                      <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline-flex">→</span>
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-slate-200 bg-slate-50/60">
                    <div className="flex items-start justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                          {normalizeCompareText(columns.right)}
                        </p>
                        <div className={compact ? "mt-1" : "mt-1.5"}>{renderValue(row.right, locale, compact)}</div>
                      </div>
                      <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline-flex">→</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
