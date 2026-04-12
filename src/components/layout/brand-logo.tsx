import Image from "next/image";
import clsx from "clsx";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center justify-center leading-none",
        compact ? "h-8 w-8" : "h-11 w-11 sm:h-12 sm:w-12",
        className
      )}
    >
      <Image
        src="/deciply-logo.svg"
        alt="Deciply"
        width={compact ? 44 : 56}
        height={compact ? 44 : 56}
        priority
        sizes={compact ? "44px" : "56px"}
        className={clsx("h-full w-full object-contain", compact ? "p-0.5" : "p-0.5")}
      />
    </span>
  );
}


