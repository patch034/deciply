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

      <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-sky-400/10 lg:block">
        <table className="min-w-full divide-y divide-sky-400/10">
          <thead className="bg-slate-950/50">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:px-6">{columns.label}</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:px-6">{columns.left}</th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:px-6">{columns.right}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-400/10">
            {rows.map((row) => (
              <tr key={row.label} className="transition duration-300 hover:bg-slate-950/50">
                <td className="px-4 py-4 text-sm font-semibold text-slate-100 sm:px-6 sm:py-5">{row.label}</td>
                <td className={`px-4 py-4 text-sm leading-7 sm:px-6 sm:py-5 ${getComparisonCellStyle()}`}>
                  {row.left}
                </td>
                <td className={`px-4 py-4 text-sm leading-7 sm:px-6 sm:py-5 ${getComparisonCellStyle()}`}>
                  {row.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 lg:hidden">
        {rows.map((row) => (
          <details key={row.label} className="group overflow-hidden rounded-[22px] border border-sky-400/10 bg-slate-950/50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100">{row.label}</p>
                <p className="mt-1 text-xs text-slate-400">{columns.left} / {columns.right}</p>
              </div>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-400/10 bg-slate-950/45 text-cyan-100 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="border-t border-sky-400/10 p-4">
              <div className="grid gap-2.5">
                <div className="rounded-[18px] border border-sky-400/10 bg-slate-950/42 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.left}</p>
                  <p className={`mt-1.5 text-[13px] leading-6 ${getComparisonCellStyle()}`}>{row.left}</p>
                </div>
                <div className="rounded-[18px] border border-sky-400/10 bg-slate-950/42 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.right}</p>
                  <p className={`mt-1.5 text-[13px] leading-6 ${getComparisonCellStyle()}`}>{row.right}</p>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}


