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
        "inline-flex shrink-0 items-center leading-none",
        compact ? "h-9" : "h-12 sm:h-14",
        className
      )}
    >
      <Image
        src="/deciply-logo.svg"
        alt="Deciply"
        width={compact ? 168 : 232}
        height={compact ? 42 : 56}
        priority
        sizes={compact ? "(max-width: 640px) 128px, 168px" : "(min-width: 640px) 232px, 188px"}
        className={clsx(
          "h-auto max-w-none object-contain",
          compact ? "w-[128px] sm:w-[162px]" : "w-[188px] sm:w-[224px]"
        )}
      />
    </span>
  );
}


