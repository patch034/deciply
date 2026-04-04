import type { ComparisonFaqItem } from "@/data/comparisons";

type ComparisonFaqProps = {
  title: string;
  description: string;
  items: ComparisonFaqItem[];
};

export function ComparisonFaq({ title, description, items }: ComparisonFaqProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">FAQ</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
      </div>

      <div className="mt-8 grid gap-3">
        {items.map((item) => (
          <details key={item.question} className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-4 transition open:bg-white/[0.05] sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold tracking-tight text-slate-100">
              <span>{item.question}</span>
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/10 text-slate-300 transition group-open:rotate-45 group-open:text-cyan-200">+</span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
