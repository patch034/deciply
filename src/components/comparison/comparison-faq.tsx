import type { ComparisonFaqItem } from "@/data/comparisons";

type ComparisonFaqProps = {
  title: string;
  description: string;
  items: ComparisonFaqItem[];
};

export function ComparisonFaq({ title, description, items }: ComparisonFaqProps) {
  return (
    <section className="rounded-[28px] border border-violet-400/14 bg-[linear-gradient(180deg,rgba(9,13,23,0.92),rgba(10,16,30,0.96))] p-5 shadow-card md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">FAQ</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>

      <div className="mt-6 grid gap-3 sm:mt-8">
        {items.map((item) => (
          <details key={item.question} className="group rounded-[22px] border border-violet-400/14 bg-slate-950/55 p-4 transition open:bg-slate-950/70 sm:rounded-[24px] sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-[15px] font-semibold tracking-tight text-slate-100 sm:gap-4 sm:text-base">
              <span>{item.question}</span>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-400/12 bg-slate-950/55 text-slate-300 transition group-open:rotate-45 group-open:text-fuchsia-100">+</span>
            </summary>
            <p className="mt-2.5 text-sm leading-7 text-slate-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

