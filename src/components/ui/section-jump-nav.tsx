import clsx from "clsx";
import Link from "next/link";

type SectionJumpNavItem = {
  label: string;
  href: string;
};

type SectionJumpNavProps = {
  items: SectionJumpNavItem[];
  className?: string;
};

export function SectionJumpNav({ items, className }: SectionJumpNavProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav
      className={clsx(
        "sticky top-16 z-30 -mx-1 overflow-x-auto rounded-[24px] border border-slate-700/55 bg-[linear-gradient(180deg,rgba(8,14,24,0.96),rgba(3,6,10,0.92))] px-2 py-2 shadow-[0_18px_60px_-32px_rgba(34,211,238,0.18)] backdrop-blur-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      aria-label="Section navigation"
    >
      <div className="flex min-w-max gap-2 px-1">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="inline-flex min-h-11 items-center rounded-full border border-slate-700/55 bg-slate-950/52 px-3.5 text-[11px] font-semibold text-slate-100 transition hover:border-cyan-400/24 hover:bg-cyan-400/[0.1] hover:text-cyan-100 sm:min-h-10 sm:px-4 sm:text-sm"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

