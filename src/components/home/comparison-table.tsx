import type { ToolCard } from "@/types/home";
import { RatingBadge } from "@/components/ui/rating-badge";

type ComparisonTableProps = {
  locale: "tr" | "en";
  tools: ToolCard[];
  title: string;
  description: string;
  eyebrow: string;
  columns: {
    tool: string;
    bestFor: string;
    price: string;
    outcome: string;
    rating: string;
    action: string;
  };
  actionLabel: string;
};

export function ComparisonTable({ locale, tools, title, description, eyebrow, columns, actionLabel }: ComparisonTableProps) {
  const mostPopularLabel = locale === "tr" ? "En popüler" : "Most Popular";
  const editorChoiceLabel = locale === "tr" ? "Editörün seçimi" : "Editor's Choice";

  return (
    <div className="ui-card-strong overflow-hidden p-4 sm:p-5 md:p-7">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
        <h2 className="balance-text mt-4 text-[1.7rem] font-bold tracking-[-0.03em] text-slate-50 md:text-[2.4rem] md:leading-[1.08]">{title}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300/88 md:text-[1.05rem] md:leading-8">{description}</p>
      </div>

      <div className="mt-10 hidden overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] md:block">
        <table className="min-w-full table-fixed divide-y divide-white/10">
          <thead className="bg-white/[0.04]">
            <tr>
              <th className="w-[24%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.tool}</th>
              <th className="w-[18%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.bestFor}</th>
              <th className="w-[14%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.price}</th>
              <th className="w-[22%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.outcome}</th>
              <th className="w-[10%] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.rating}</th>
              <th className="w-[12%] px-5 py-4 text-right text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{columns.action}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-transparent">
            {tools.map((tool, index) => (
              <tr key={tool.name} className={`align-top transition duration-200 hover:bg-white/[0.04] ${index === 0 ? "bg-cyan-400/[0.05]" : ""}`}>
                <td className="px-5 py-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-xs font-bold uppercase tracking-[0.14em] text-white">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold text-slate-100">{tool.name}</p>
                        {index === 0 ? (
                          <>
                            <span className="inline-flex items-center rounded-full bg-cyan-400/12 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                              {mostPopularLabel}
                            </span>
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-slate-100">
                              {editorChoiceLabel}
                            </span>
                          </>
                        ) : null}
                      </div>
                      <p className="mt-1 truncate text-sm text-slate-500">{tool.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 text-sm leading-6 text-slate-300"><div className="min-w-0 break-words">{tool.bestFor}</div></td>
                <td className="px-5 py-5 text-sm font-semibold text-slate-100"><div className="min-w-0 break-words">{tool.pricing}</div></td>
                <td className="px-5 py-5 text-sm leading-6 text-slate-300"><div className="min-w-0 break-words">{tool.comparisonOutcome}</div></td>
                <td className="px-5 py-5 text-sm font-semibold text-slate-100 whitespace-nowrap"><RatingBadge rating={tool.rating} className="w-fit" /></td>
                <td className="px-5 py-5 text-right">
                  <a href={tool.affiliateUrl ?? tool.websiteUrl} target="_blank" rel="nofollow sponsored noreferrer" className="inline-flex min-h-[44px] min-w-[92px] items-center justify-center rounded-xl bg-[var(--tn-gradient-primary)] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-105">
                    {tool.ctaLabel ?? actionLabel}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 md:hidden">
        {tools.map((tool, index) => (
          <div key={tool.name} className={`ui-inner-panel min-w-0 p-5 ${index === 0 ? "ring-1 ring-cyan-400/20" : ""}`}>
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--tn-gradient-primary)] text-xs font-bold uppercase tracking-[0.14em] text-white">
                {tool.icon}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold text-slate-100">{tool.name}</p>
                  {index === 0 ? (
                    <span className="inline-flex items-center rounded-full bg-cyan-400/12 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                      {mostPopularLabel}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">{tool.category}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2.5 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">{columns.bestFor}:</span> {tool.bestFor}</p>
              <p><span className="font-semibold text-slate-100">{columns.price}:</span> {tool.pricing}</p>
              <p><span className="font-semibold text-slate-100">{columns.outcome}:</span> {tool.comparisonOutcome}</p>
              <p><span className="font-semibold text-slate-100">{columns.rating}:</span> <RatingBadge rating={tool.rating} className="mt-2 w-fit" /></p>
            </div>
            <div className="mt-5">
              <a href={tool.affiliateUrl ?? tool.websiteUrl} target="_blank" rel="nofollow sponsored noreferrer" className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[var(--tn-gradient-primary)] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:brightness-105">
                {tool.ctaLabel ?? actionLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



