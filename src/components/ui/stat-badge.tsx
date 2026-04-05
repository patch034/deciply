import { GlassPanel } from "@/components/ui/glass-panel";

type StatBadgeProps = {
  value: string;
  label: string;
};

export function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <GlassPanel className="flex h-full flex-col justify-between rounded-2xl border-fuchsia-400/16 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(4,7,13,0.98))] px-4 py-4 shadow-[0_18px_48px_-34px_rgba(6,10,18,0.72)] sm:px-5 sm:py-5 md:px-6 md:py-6">
      <p className="balance-text bg-gradient-to-r from-fuchsia-100 via-sky-200 to-violet-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-300/88">{label}</p>
    </GlassPanel>
  );
}


