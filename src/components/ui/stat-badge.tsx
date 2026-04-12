type StatBadgeProps = {
  value: string;
  label: string;
};

export function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,253,0.99))] px-4 py-4 shadow-[0_20px_60px_-40px_rgba(37,99,235,0.14)] sm:px-5 sm:py-5 md:px-6 md:py-6">
      <p className="balance-text bg-gradient-to-r from-sky-700 via-blue-700 to-cyan-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{label}</p>
    </div>
  );
}
