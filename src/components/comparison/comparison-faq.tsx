import type { ComparisonFaqItem } from "@/data/comparisons";

type ComparisonFaqProps = {
  title: string;
  description: string;
  items: ComparisonFaqItem[];
  tone?: "light" | "dark";
};

export function ComparisonFaq({ title, description, items, tone = "dark" }: ComparisonFaqProps) {
  const isLight = tone === "light";

  return (
    <section
      className={[
        "rounded-[28px] border p-5 shadow-[0_24px_80px_-44px_rgba(14,165,233,0.12)] md:p-8",
        isLight
          ? "border-slate-200/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,253,0.99))]"
          : "border-sky-400/10 bg-[linear-gradient(180deg,rgba(9,13,23,0.92),rgba(10,16,30,0.96))]"
      ].join(" ")}
    >
      <div className="max-w-3xl">
        <p className={["text-sm font-semibold uppercase tracking-[0.2em]", isLight ? "text-sky-600" : "text-cyan-200"].join(" ")}>FAQ</p>
        <h2 className={["mt-4 text-3xl font-bold tracking-tight md:text-4xl", isLight ? "text-slate-950" : "text-slate-50"].join(" ")}>{title}</h2>
        <p className={["mt-4 text-base leading-7 md:text-lg", isLight ? "text-slate-600" : "text-slate-300"].join(" ")}>{description}</p>
      </div>

      <div className="mt-6 grid gap-3 sm:mt-8">
        {items.map((item) => (
          <details
            key={item.question}
            className={[
              "group rounded-[22px] border p-4 transition sm:rounded-[24px] sm:p-5",
              isLight ? "border-slate-200 bg-white/92 open:bg-slate-50" : "border-sky-400/10 bg-slate-950/50 open:bg-slate-950/70"
            ].join(" ")}
          >
            <summary className={["flex cursor-pointer list-none items-center justify-between gap-3 text-left text-[15px] font-semibold tracking-tight sm:gap-4 sm:text-base", isLight ? "text-slate-950" : "text-slate-100"].join(" ")}>
              <span>{item.question}</span>
              <span className={["inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition group-open:rotate-45", isLight ? "border-slate-200 bg-white text-slate-500 group-open:text-sky-600" : "border-sky-400/10 bg-slate-950/50 text-slate-300 group-open:text-cyan-100"].join(" ")}>+</span>
            </summary>
            <p className={["mt-2.5 text-sm leading-7", isLight ? "text-slate-600" : "text-slate-300"].join(" ")}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
