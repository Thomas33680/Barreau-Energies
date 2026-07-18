import type { Metadata } from "next";
import { Landmark, PiggyBank, Percent, FileCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Aides & Financements",
  description:
    "MaPrimeRénov', CEE, TVA réduite, éco-PTZ : les aides financières mobilisables pour votre projet de pompe à chaleur, climatisation ou chauffe-eau thermodynamique.",
};

const aides = [
  {
    icon: Landmark,
    name: "MaPrimeRénov'",
    description:
      "Aide de l'État versée par l'Anah pour les travaux de rénovation énergétique, dont l'installation de pompes à chaleur, sous conditions de ressources et de performance du matériel.",
  },
  {
    icon: PiggyBank,
    name: "Certificats d'Économies d'Énergie (CEE)",
    description:
      "Prime versée par les fournisseurs d'énergie pour financer une partie de vos travaux d'amélioration énergétique.",
  },
  {
    icon: Percent,
    name: "TVA à taux réduit",
    description:
      "Un taux de TVA à 5,5 % peut s'appliquer sur la fourniture et la pose de certains équipements de rénovation énergétique, sous conditions.",
  },
  {
    icon: FileCheck,
    name: "Éco-prêt à taux zéro (Éco-PTZ)",
    description:
      "Un prêt sans intérêt pour financer le reste à charge de vos travaux de rénovation énergétique.",
  },
];

export default function AidesFinancementsPage() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <Container>
          <SectionHeading
            eyebrow="Aides & Financements"
            title="Des dispositifs pour réduire le coût de vos travaux"
            description="Plusieurs aides publiques peuvent s'appliquer à votre projet, selon vos ressources, votre logement et le matériel choisi. Nous vous aidons à y voir clair."
            light
          />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {aides.map((aide) => (
              <div
                key={aide.name}
                className="flex flex-col rounded-2xl border border-ink/10 bg-white p-8 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <aide.icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{aide.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {aide.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-6 text-sm leading-relaxed text-ink/75">
            <p>
              <strong className="text-ink">À noter :</strong> les montants,
              plafonds et conditions d&apos;éligibilité de ces dispositifs
              évoluent régulièrement et dépendent de votre situation
              personnelle. Les informations ci-dessus sont données à titre
              indicatif et ne constituent pas un engagement contractuel.
              Contactez-nous pour une simulation personnalisée adaptée à
              votre projet.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Button href="/contact" variant="primary">
              Demander une simulation personnalisée
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
