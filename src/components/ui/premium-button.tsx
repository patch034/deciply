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
    "bg-[linear-gradient(90deg,#8B5CF6_0%,#6366F1_38%,#EC4899_72%,#22D3EE_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_56px_-26px_rgba(139,92,246,0.92),0_36px_96px_-38px_rgba(236,72,153,0.64)] hover:brightness-[1.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_28px_68px_-26px_rgba(139,92,246,0.96),0_42px_110px_-38px_rgba(34,211,238,0.82)]",
  secondary:
    "border border-violet-400/16 bg-[linear-gradient(180deg,rgba(10,16,30,0.98),rgba(6,9,16,0.98))] text-slate-100 hover:border-fuchsia-400/20 hover:bg-slate-900/78 hover:text-white",
  ghost:
    "border border-fuchsia-400/18 bg-fuchsia-400/10 text-fuchsia-100 hover:border-sky-300/20 hover:bg-fuchsia-400/16"
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
    "inline-flex min-h-[44px] items-center justify-center overflow-hidden rounded-[14px] px-4 py-2 text-sm font-semibold leading-none transition duration-150",
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

