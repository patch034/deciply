import clsx from "clsx";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <span className={clsx("inline-flex items-baseline font-black tracking-[-0.04em]", compact ? "text-xl" : "text-3xl", className)}>
      <span className="text-white">Deci</span>
      <span className="bg-[linear-gradient(90deg,#6C5CE7_0%,#00C2FF_100%)] bg-clip-text pl-0.5 text-transparent">
        ply
      </span>
    </span>
  );
}
