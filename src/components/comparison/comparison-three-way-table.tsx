type ComparisonThreeWayRow = {
  label: string;
  first: string;
  second: string;
  third: string;
};

type ComparisonThreeWayTableProps = {
  locale: "tr" | "en";
  title: string;
  description: string;
  columns: {
    label: string;
    first: string;
    second: string;
    third: string;
  };
  rows: ComparisonThreeWayRow[];
};

function getTextStyle() {
  return "text-slate-200";
}

export function ComparisonThreeWayTable({ locale, title, description, columns, rows }: ComparisonThreeWayTableProps) {
  return (
    <section className="rounded-[32px] border border-slate-700/60 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {locale === "tr" ? "Karşılaştırma tablosu" : "Comparison table"}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>

      <div className="mt-8 hidden overflow-hidden rounded-[24px] border border-slate-700/60 lg:block">
        <table className="min-w-full divide-y divide-sky-400/10">
          <thead className="bg-slate-950/60">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{columns.label}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.first}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.second}</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.third}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-400/10">
            {rows.map((row) => (
              <tr key={row.label} className="transition duration-300 hover:bg-slate-950/52">
                <td className="px-6 py-5 text-sm font-semibold text-slate-100">{row.label}</td>
                <td className={`px-6 py-5 text-sm leading-7 ${getTextStyle()}`}>{row.first}</td>
                <td className={`px-6 py-5 text-sm leading-7 ${getTextStyle()}`}>{row.second}</td>
                <td className={`px-6 py-5 text-sm leading-7 ${getTextStyle()}`}>{row.third}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 lg:hidden">
        {rows.map((row) => (
          <div key={row.label} className="rounded-[24px] border border-slate-700/60 bg-slate-950/60 p-5">
            <p className="text-sm font-semibold text-slate-100">{row.label}</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[20px] border border-slate-700/60 bg-slate-950/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.first}</p>
                <p className={`mt-2 text-sm leading-7 ${getTextStyle()}`}>{row.first}</p>
              </div>
              <div className="rounded-[20px] border border-slate-700/60 bg-slate-950/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.second}</p>
                <p className={`mt-2 text-sm leading-7 ${getTextStyle()}`}>{row.second}</p>
              </div>
              <div className="rounded-[20px] border border-slate-700/60 bg-slate-950/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{columns.third}</p>
                <p className={`mt-2 text-sm leading-7 ${getTextStyle()}`}>{row.third}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

