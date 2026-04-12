import { Badge } from "@/components/ui/badge";
import type { ComparisonRow } from "@/data/comparisons";

type ComparisonBreakdownTableProps = {
  locale: "tr" | "en";
  title: string;
  description: string;
  columns: {
    label: string;
    left: string;
    right: string;
  };
  rows: ComparisonRow[];
};

function getComparisonCellStyle() {
  return "text-slate-200";
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getChipTone(index: number) {
  return index === 0
    ? "border-cyan-400/16 bg-cyan-400/12 text-cyan-100"
    : "border-sky-400/16 bg-sky-400/12 text-sky-100";
}

function renderMobileValue(value: string, compact: boolean) {
  const parts = value.split(" · ").map((item) => item.trim()).filter(Boolean);
  if (parts.length > 1) {
    return (
      <ul className="compare-list">
        {parts.slice(0, 3).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className={compact ? "text-[12px] leading-5 text-slate-200" : "text-[13px] leading-6 text-slate-200"}>{value}</p>;
}

export function ComparisonBreakdownTable({
  locale,
  title,
  description,
  columns,
  rows
}: ComparisonBreakdownTableProps) {
  return (
    <section className="rounded-[32px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-4 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)] sm:p-6 md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{locale === "tr" ? "Karşılaştırma tablosu" : "Comparison table"}</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>

      <div className="sticky top-3 z-20 mt-5 rounded-[20px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(10,16,30,0.97),rgba(15,23,42,0.96))] px-3 py-2.5 shadow-[0_16px_44px_-34px_rgba(14,165,233,0.14)] [@media(min-width:769px)]:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">{locale === "tr" ? "Mobil karşılaştırma" : "Mobile compare"}</p>
            <p className="mt-1 truncate text-[13px] font-semibold text-slate-50">{columns.label}</p>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <Badge variant="ghost" className={`shrink-0 ${getChipTone(0)} px-2.5 py-1 text-[11px]`}>
              <span className="mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-950/55 text-[10px] font-bold text-cyan-100">
                {getInitials(columns.left)}
              </span>
              <span className="max-w-[7rem] truncate">{columns.left}</span>
            </Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">VS</span>
            <Badge variant="ghost" className={`shrink-0 ${getChipTone(1)} px-2.5 py-1 text-[11px]`}>
              <span className="mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-950/55 text-[10px] font-bold text-sky-100">
                {getInitials(columns.right)}
              </span>
              <span className="max-w-[7rem] truncate">{columns.right}</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-5 hidden overflow-hidden rounded-[22px] border border-sky-400/10 [@media(min-width:769px)]:block">
        <table className="min-w-full divide-y divide-sky-400/10">
          <thead className="bg-slate-950/50">
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:px-6">{columns.label}</th>
              <th className="compare-col-left px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:px-6">{columns.left}</th>
              <th className="compare-col-right px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200 sm:px-6">{columns.right}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-400/10">
            {rows.map((row) => (
              <tr key={row.label} className="transition duration-300 hover:bg-slate-950/50">
                <td className="px-4 py-3 text-sm font-semibold text-slate-100 sm:px-6 sm:py-4">{row.label}</td>
                <td className={`compare-col-left px-4 py-3 text-sm leading-6 sm:px-6 sm:py-4 ${getComparisonCellStyle()}`}>{row.left}</td>
                <td className={`compare-col-right px-4 py-3 text-sm leading-6 sm:px-6 sm:py-4 ${getComparisonCellStyle()}`}>{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-3 [@media(min-width:769px)]:hidden">
        {rows.map((row) => {
          const isCompact = ["Hız", "Kullanım kolaylığı", "Çıktı kalitesi", "Öğrenci", "Creator", "İş", "Değer", "Speed", "Ease of use", "Output quality", "Students", "Creators", "Business", "Value"].includes(row.label);
          return (
          <article key={row.label} className="overflow-hidden rounded-[22px] border border-sky-400/10 bg-slate-950/46 p-4 shadow-[0_16px_44px_-34px_rgba(14,165,233,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">{locale === "tr" ? "Özellik" : "Feature"}</p>
                <h3 className="mt-1 text-sm font-semibold text-slate-50">{row.label}</h3>
              </div>
              <Badge variant="ghost" className="shrink-0 border-sky-400/10 bg-slate-950/50 px-2.5 py-1 text-[11px] text-slate-300">
                {columns.left} · {columns.right}
              </Badge>
            </div>

            <div className="mt-4 space-y-3">
              <div className={isCompact ? "compare-slot-left flex items-start justify-between gap-3 border-t border-sky-400/10 pt-2" : "compare-slot-left flex items-start justify-between gap-3 border-t border-sky-400/10 pt-3"}>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">{columns.left}</p>
                  {renderMobileValue(row.left, isCompact)}
                </div>
                <span className="hidden shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:inline-flex">→</span>
              </div>
              <div className={isCompact ? "compare-slot-right flex items-start justify-between gap-3 border-t border-sky-400/10 pt-2" : "compare-slot-right flex items-start justify-between gap-3 border-t border-sky-400/10 pt-3"}>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">{columns.right}</p>
                  {renderMobileValue(row.right, isCompact)}
                </div>
                <span className="hidden shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:inline-flex">→</span>
              </div>
            </div>
          </article>
        )})}
      </div>
    </section>
  );
}
