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
    <section className="rounded-[32px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)] md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{locale === "tr" ? "Karşılaştırma tablosu" : "Comparison table"}</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>

      <div className="mt-8 hidden overflow-hidden rounded-[24px] border border-sky-400/10 lg:block">
        <table className="min-w-full divide-y divide-sky-400/10">
          <thead className="bg-slate-950/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{columns.label}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.left}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.right}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-400/10">
            {rows.map((row) => (
              <tr key={row.label} className="transition duration-300 hover:bg-slate-950/50">
                <td className="px-6 py-5 text-sm font-semibold text-slate-100">{row.label}</td>
                <td className={`px-6 py-5 text-sm leading-7 ${getComparisonCellStyle()}`}>
                  {row.left}
                </td>
                <td className={`px-6 py-5 text-sm leading-7 ${getComparisonCellStyle()}`}>
                  {row.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 lg:hidden">
        {rows.map((row) => (
          <div key={row.label} className="rounded-[24px] border border-sky-400/10 bg-slate-950/50 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-100">{row.label}</p>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[20px] border border-sky-400/10 bg-slate-950/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.left}</p>
                <p className={`mt-2 text-sm leading-7 ${getComparisonCellStyle()}`}>{row.left}</p>
              </div>
              <div className="rounded-[20px] border border-sky-400/10 bg-slate-950/45 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.right}</p>
                <p className={`mt-2 text-sm leading-7 ${getComparisonCellStyle()}`}>{row.right}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


