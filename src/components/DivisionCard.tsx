import Link from "next/link";
import type { Division } from "@/content/divisions";
import { divisionText, divisionBg, PhaseBadge } from "./ui";

export function DivisionCard({ division }: { division: Division }) {
  return (
    <Link
      href={`/${division.slug}`}
      className="group flex flex-col rounded-3xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold ${divisionBg(
            division.color
          )} ${divisionText(division.color)}`}
        >
          {division.name.slice(0, 1)}
        </span>
        <PhaseBadge phase={division.phase} />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-ink">
        {division.name}
      </h3>
      <p className={`text-sm font-semibold ${divisionText(division.color)}`}>
        {division.title}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {division.summary}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-transform group-hover:translate-x-1">
        Découvrir {division.name}
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
