import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { footerLinks, navLinks, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-brand-green">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-brand-green">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              {siteConfig.address.postalCode} {siteConfig.address.line}
            </li>
            <li className="text-brand-green">{siteConfig.address.zone}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-brand-green">
            Suivez-nous
          </h3>
          <p className="mt-4 text-sm text-white/50">
            Liens réseaux sociaux à venir.
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-center text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
        </Container>
      </div>
    </footer>
  );
}
