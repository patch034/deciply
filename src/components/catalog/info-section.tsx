import type { ReactNode } from "react";

type InfoSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function InfoSection({ title, description, children }: InfoSectionProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(15,23,42,0.9))] p-6 shadow-card md:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-50">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-slate-300">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
