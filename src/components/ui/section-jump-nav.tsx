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
        "sticky top-20 z-20 -mx-1 overflow-x-auto pb-1 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      aria-label="Section navigation"
    >
      <div className="flex min-w-max gap-2 px-1">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-cyan-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
