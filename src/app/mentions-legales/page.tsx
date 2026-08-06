import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Informations légales" title="Mentions légales" as="h1" />

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/75">
          <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5">
            <strong className="text-ink">À compléter avant mise en ligne :</strong>{" "}
            le numéro de contrat d&apos;assurance, marqué « à compléter »
            ci-dessous, est obligatoire pour un site professionnel en France.
            Merci de me le transmettre pour finaliser cette page.
          </div>

          <div>
            <h2 className="text-base font-bold text-ink">Éditeur du site</h2>
            <p className="mt-2">
              {siteConfig.name}
              <br />
              Micro-entreprise (entrepreneur individuel)
              <br />
              SIRET : 984 587 501 00029
              <br />
              Adresse : {siteConfig.address.postalCode}{" "}
              {siteConfig.address.line}
              <br />
              Directeur de la publication : {siteConfig.gerant}
              <br />
              Téléphone : {siteConfig.phone}
              <br />
              Email : {siteConfig.email}
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink">Assurance professionnelle</h2>
            <p className="mt-2">
              Garantie décennale et assurance responsabilité civile
              professionnelle souscrites auprès de :
              <br />
              ERGO France
              <br />
              6 rue Ménars, 75002 Paris
              <br />
              Numéro de contrat : à compléter
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink">Hébergement</h2>
            <p className="mt-2">
              Vercel Inc.
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-ink">Données personnelles</h2>
            <p className="mt-2">
              Les informations transmises via le formulaire de contact sont
              utilisées exclusivement pour répondre à votre demande et ne
              sont partagées avec aucun tiers. Conformément au RGPD, vous
              disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données en nous contactant à{" "}
              {siteConfig.email}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
