import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { company } from "@/content/company";
import { divisions } from "@/content/divisions";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              {company.pitch}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Divisions
            </h3>
            <ul className="mt-4 space-y-2.5">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${d.slug}`}
                    className="text-sm text-ink-muted hover:text-ink"
                  >
                    {d.name} — {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <a href={company.phoneHref} className="hover:text-ink">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-ink">
                  {company.email}
                </a>
              </li>
              <li>{company.hours}</li>
              <li>
                <Link href="/contact" className="hover:text-ink">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-ink">
              Mentions légales
            </Link>
            <Link href="/a-propos" className="hover:text-ink">
              À propos
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
