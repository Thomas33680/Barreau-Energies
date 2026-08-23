import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="26" height="8" rx="4" fill="var(--color-climate)" />
      <rect x="4" y="16" width="32" height="8" rx="4" fill="var(--color-air)" />
      <rect x="4" y="28" width="22" height="8" rx="4" fill="var(--color-energy)" />
    </svg>
  );
}

export function Logo({
  className = "",
  tagline = false,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Barreau Énergies — accueil"
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform group-hover:scale-105" />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          BARREAU <span className="font-medium text-ink-muted">ÉNERGIES</span>
        </span>
        {tagline && (
          <span className="text-xs text-ink-soft">
            Le confort thermique en toute confiance
          </span>
        )}
      </span>
    </Link>
  );
}
