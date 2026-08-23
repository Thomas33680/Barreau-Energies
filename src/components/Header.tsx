import Link from "next/link";
import { Logo } from "./Logo";
import { Container, Button } from "./ui";
import { company } from "@/content/company";
import { divisions } from "@/content/divisions";
import { MobileNav } from "./MobileNav";

const navLinks = [
  ...divisions.map((d) => ({ href: `/${d.slug}`, label: d.name })),
  { href: "/a-propos", label: "À propos" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={company.phoneHref}
            className="text-sm font-semibold text-ink-muted hover:text-ink"
          >
            {company.phoneDisplay}
          </a>
          <Button href="/contact" variant="secondary">
            Demander un devis
          </Button>
        </div>
        <MobileNav links={navLinks} />
      </Container>
    </header>
  );
}
