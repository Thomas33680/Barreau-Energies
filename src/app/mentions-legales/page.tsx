import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Informations légales" title="Mentions légales" />

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/75">
          <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5">
            <strong className="text-ink">À compléter avant mise en ligne :</strong>{" "}
            les champs marqués « à compléter » ci-dessous sont obligatoires
            pour un site professionnel en France (forme juridique, RCS/RM,
            capital social, numéro de contrat d&apos;assurance, hébergeur).
            Merci de me transmettre ces informations pour finaliser cette
            page.
          </div>

          <div>
            <h2 className="text-base font-bold text-ink">Éditeur du site</h2>
            <p className="mt-2">
              {siteConfig.name}
              <br />
              Forme juridique : à compléter
              <br />
              SIRET : 984 587 501 00029
              <br />
              RCS / RM : à compléter
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
            <p className="mt-2">Hébergeur du site : à compléter.</p>
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
