import type { StaticPageContent } from "@/data/static-pages";

type StaticPageShellProps = {
  content: StaticPageContent;
};

export function StaticPageShell({ content }: StaticPageShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[36px] border border-sky-400/10 bg-[linear-gradient(135deg,rgba(6,10,19,0.96),rgba(10,16,30,0.97),rgba(4,7,12,0.99))] px-8 py-10 shadow-[0_30px_90px_-46px_rgba(14,165,233,0.14)] lg:px-10 lg:py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Deciply</p>
        <h1 className="mt-4 bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300/88 md:text-lg">
          {content.description}
        </p>
        <div className="mt-8 rounded-[24px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.94),rgba(7,11,19,0.98))] p-6 text-sm leading-8 text-slate-300 md:text-base">
          {content.intro}
        </div>
      </section>

      <div className="space-y-6">
        {content.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[28px] border border-sky-400/10 bg-[linear-gradient(180deg,rgba(12,18,33,0.94),rgba(8,13,24,0.96))] p-6 shadow-[0_22px_60px_-40px_rgba(14,165,233,0.12)] md:p-8"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-50">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-sm leading-8 text-slate-300 md:text-base">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="mt-5 space-y-3">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300 md:text-base">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}

