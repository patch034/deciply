type ProsConsCardProps = {
  title: string;
  items: string[];
  tone: "positive" | "negative";
  surfaceTone?: "light" | "dark";
};

export function ProsConsCard({ title, items, tone, surfaceTone = "dark" }: ProsConsCardProps) {
  const isLight = surfaceTone === "light";
  const toneStyles = {
    positive: {
      dot: "bg-emerald-500",
      card: isLight ? "border-emerald-200 bg-emerald-50/85" : "border-emerald-400/15 bg-emerald-400/8"
    },
    negative: {
      dot: "bg-rose-500",
      card: isLight ? "border-rose-200 bg-rose-50/85" : "border-rose-400/15 bg-rose-400/8"
    }
  } as const;

  return (
    <div className={`rounded-[28px] border p-6 ${toneStyles[tone].card}`}>
      <h3 className={isLight ? "text-xl font-bold tracking-tight text-slate-950" : "text-xl font-bold tracking-tight text-slate-50"}>{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className={isLight ? "flex items-start gap-3 text-sm leading-7 text-slate-700" : "flex items-start gap-3 text-sm leading-7 text-slate-300"}>
            <span className={`mt-2 h-2.5 w-2.5 rounded-full ${toneStyles[tone].dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
