import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = true }: { dark?: boolean }) {
  const textColor = dark ? "text-white" : "text-ink";

  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="Barreau Énergies — retour à l'accueil"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={340}
        height={406}
        priority
        className="h-10 w-auto sm:h-11"
      />
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
