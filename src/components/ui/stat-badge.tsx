import { GlassPanel } from "@/components/ui/glass-panel";

type StatBadgeProps = {
  value: string;
  label: string;
};

export function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <GlassPanel className="flex h-full flex-col justify-between rounded-2xl border-sky-400/12 bg-[linear-gradient(180deg,rgba(14,165,233,0.04),rgba(59,130,246,0.015))] px-4 py-4 shadow-card-soft sm:px-5 sm:py-5 md:px-6 md:py-6">
      <p className="balance-text bg-gradient-to-r from-sky-100 via-cyan-100 to-blue-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-300/84">{label}</p>
    </GlassPanel>
  );
}

