import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        Mentions légales
      </h1>
      <p className="mt-4 rounded-xl bg-energy-light px-4 py-3 text-sm text-ink">
        Page à compléter avec les informations légales réelles avant mise en ligne du site
        (obligatoire pour un site commercial en France).
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
        <section>
          <h2 className="font-display text-lg font-bold text-ink">Éditeur du site</h2>
          <p className="mt-2">
            {company.name} — [forme juridique à compléter]
            <br />
            Siège social : [adresse à compléter]
            <br />
            SIRET : [à compléter]
            <br />
            Directeur de la publication : [nom à compléter]
            <br />
            Contact : {company.email} — {company.phoneDisplay}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">Hébergement</h2>
          <p className="mt-2">[Nom de l&rsquo;hébergeur, adresse et contact à compléter]</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">Propriété intellectuelle</h2>
          <p className="mt-2">
            L&rsquo;ensemble des contenus de ce site (textes, photos, logo) est la propriété de{" "}
            {company.name}, sauf mention contraire, et ne peut être reproduit sans autorisation.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-ink">Données personnelles</h2>
          <p className="mt-2">
            Les informations transmises via le formulaire de contact sont utilisées uniquement pour
            répondre à votre demande. Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès,
            de rectification et de suppression de vos données en écrivant à {company.email}.
          </p>
        </section>
      </div>
    </Container>
  );
}
