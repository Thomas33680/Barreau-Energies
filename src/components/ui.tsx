import Link from "next/link";
import type { ReactNode } from "react";
import type { Phase } from "@/content/divisions";
import { phaseLabel } from "@/content/divisions";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-ink-muted">{description}</p>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
  const variants: Record<string, string> = {
    primary: "bg-ink text-paper hover:bg-brand",
    secondary: "bg-brand text-white hover:bg-brand-dark",
    ghost: "border border-border bg-transparent text-ink hover:border-ink",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

const phaseStyles: Record<Phase, string> = {
  now: "bg-air-light text-air",
  next: "bg-energy-light text-energy",
  later: "bg-surface-sunken text-ink-soft",
};

export function PhaseBadge({ phase }: { phase: Phase }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${phaseStyles[phase]}`}
    >
      {phaseLabel[phase]}
    </span>
  );
}

const divisionColorText: Record<string, string> = {
  climate: "text-climate",
  water: "text-water",
  energy: "text-energy",
  air: "text-air",
  care: "text-care",
};

const divisionColorBg: Record<string, string> = {
  climate: "bg-climate-light",
  water: "bg-water-light",
  energy: "bg-energy-light",
  air: "bg-air-light",
  care: "bg-care-light",
};

const divisionColorSolid: Record<string, string> = {
  climate: "bg-climate",
  water: "bg-water",
  energy: "bg-energy",
  air: "bg-air",
  care: "bg-care",
};

export function divisionText(color: string) {
  return divisionColorText[color] ?? "text-brand";
}
export function divisionBg(color: string) {
  return divisionColorBg[color] ?? "bg-brand-light";
}
export function divisionSolid(color: string) {
  return divisionColorSolid[color] ?? "bg-brand";
}
