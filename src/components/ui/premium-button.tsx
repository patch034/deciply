"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type PremiumButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  target?: string;
  rel?: string;
};

const styles = {
  primary:
    "bg-[linear-gradient(90deg,#5B4DE6_0%,#406BFF_58%,#0FB9C4_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_56px_-26px_rgba(59,130,246,0.9),0_34px_96px_-38px_rgba(15,185,196,0.62)] hover:brightness-[1.14] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_68px_-26px_rgba(59,130,246,0.94),0_40px_110px_-38px_rgba(15,185,196,0.72)]",
  secondary:
    "border border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/22 hover:bg-white/[0.05] hover:text-white",
  ghost:
    "border border-cyan-400/14 bg-cyan-400/8 text-cyan-100 hover:border-cyan-300/24 hover:bg-cyan-400/12"
} as const;

export function PremiumButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  target,
  rel
}: PremiumButtonProps) {
  const classes = clsx(
    "inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-[12px] px-4 py-2 text-sm font-semibold leading-none transition duration-150",
    variant !== "primary" && "shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
    styles[variant],
    className
  );

  const content = <span className="inline-flex items-center justify-center gap-2">{children}</span>;

  if (href) {
    const isExternal = href.startsWith("http");

    return (
      <motion.div whileHover={{ y: -2, scale: variant === "primary" ? 1.03 : 1 }} whileTap={{ scale: 0.985 }} transition={{ duration: 0.16 }} className="inline-flex max-w-full">
        {isExternal ? (
          <a href={href} target={target} rel={rel} className={classes}>
            {content}
          </a>
        ) : (
          <Link href={href} className={classes}>
            {content}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button type={type} className={classes} whileHover={{ y: -2, scale: variant === "primary" ? 1.03 : 1 }} whileTap={{ scale: 0.985 }} transition={{ duration: 0.16 }}>
      {content}
    </motion.button>
  );
}
