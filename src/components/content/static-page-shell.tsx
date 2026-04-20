import type { StaticPageContent } from "@/data/static-pages";

type StaticPageShellProps = {
  content: StaticPageContent;
};

export function StaticPageShell({ content }: StaticPageShellProps) {
  return (
    <div className="ui-page-shell mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8 lg:py-11">
      <section className="rounded-[28px] border border-slate-200 bg-white/95 px-5 py-7 shadow-[0_18px_44px_rgba(15,23,42,0.08)] sm:px-7 lg:px-9">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0055FF]">Deciply</p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.055em] text-slate-950 md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
          {content.description}
        </p>
        <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50/85 p-5 text-sm leading-7 text-slate-700 md:text-base">
          {content.intro}
        </div>
      </section>

      <div className="grid gap-4">
        {content.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-6"
          >
            <h2 className="text-xl font-black tracking-[-0.035em] text-slate-950 md:text-2xl">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="mt-4 grid gap-2.5">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-700 md:text-base">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0055FF]" />
                    <span className="min-w-0">{item}</span>
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

