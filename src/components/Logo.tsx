import Link from "next/link";

const bars = [
  { color: "bg-brand-blue" },
  { color: "bg-brand-green" },
  { color: "bg-brand-orange" },
];

export function Logo({ dark = true }: { dark?: boolean }) {
  const textColor = dark ? "text-white" : "text-ink";

  return (
    <Link
      href="/"
      className="flex items-center gap-3 shrink-0"
      aria-label={`${"Barreau Énergies"} — retour à l'accueil`}
    >
      <span className="flex flex-col gap-1" aria-hidden="true">
        {bars.map((bar, i) => (
          <span
            key={i}
            className={`h-1.5 w-7 rounded-full ${bar.color}`}
          />
        ))}
      </span>
      <span className="leading-none">
        <span className={`block text-lg font-extrabold tracking-wide ${textColor}`}>
          BARREAU
        </span>
        <span className="block text-xs font-bold tracking-[0.25em] text-brand-green">
          ÉNERGIES
        </span>
      </span>
    </Link>
  );
}
