"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green/90 hover:shadow-[0_0_28px_rgba(103,184,20,0.45)] focus-visible:outline-brand-green",
  secondary:
    "bg-white text-ink hover:bg-white/90 hover:shadow-[0_0_28px_rgba(255,255,255,0.35)] focus-visible:outline-white",
  ghost:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 focus-visible:outline-white",
};

const MotionLink = motion.create(Link);

export function Button({
  href,
  children,
  variant = "primary",
  pulse = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <MotionLink
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[background-color,box-shadow,border-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        pulse ? "motion-safe:animate-[cta-pulse_2.8s_ease-in-out_infinite]" : ""
      } ${variants[variant]} ${className}`}
    >
      {children}
    </MotionLink>
  );
}
