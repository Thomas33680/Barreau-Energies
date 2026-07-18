import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green/90 focus-visible:outline-brand-green",
  secondary:
    "bg-white text-ink hover:bg-white/90 focus-visible:outline-white",
  ghost:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 focus-visible:outline-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
