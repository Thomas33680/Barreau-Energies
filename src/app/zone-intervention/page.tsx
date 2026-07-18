import type { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Zone d'intervention",
  description:
    "Barreau Énergies intervient à Parigné-l'Évêque, Le Mans et dans les communes alentours.",
};

const communes = [
  "Le Mans",
  "Parigné-l'Évêque",
  "Yvré-l'Évêque",
  "Coulaines",
  "Allonnes",
  "Arnage",
  "Changé",
  "Sargé-lès-Le Mans",
  "Ruaudin",
  "Mulsanne",
];

export default function ZoneInterventionPage() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="Zone d'intervention"
          title="Une entreprise locale, proche de chez vous"
          description={`Basés à ${siteConfig.address.line} (${siteConfig.address.postalCode}), nous intervenons à ${siteConfig.address.zone} pour tous vos projets de pompe à chaleur, climatisation et chauffe-eau thermodynamique.`}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-ink/[0.03]">
            <div className="absolute h-[85%] w-[85%] rounded-full border border-brand-blue/20" />
            <div className="absolute h-[60%] w-[60%] rounded-full border border-brand-green/30" />
            <div className="absolute h-[35%] w-[35%] rounded-full border border-brand-orange/40" />
            <div className="relative flex flex-col items-center gap-2 rounded-full bg-ink px-6 py-4 text-white shadow-lg">
              <MapPin size={20} className="text-brand-green" aria-hidden="true" />
              <span className="text-sm font-semibold">
                {siteConfig.address.line}
              </span>
              <span className="text-xs text-white/60">
                {siteConfig.address.postalCode}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink">
              Quelques secteurs où nous intervenons
            </h3>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {communes.map((commune) => (
                <li
                  key={commune}
                  className="flex items-center gap-2 rounded-lg border border-ink/10 px-4 py-3 text-sm text-ink/75"
                >
                  <MapPin size={14} className="shrink-0 text-brand-green" aria-hidden="true" />
                  {commune}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink/60">
              Cette liste n&apos;est pas exhaustive. Votre commune n&apos;y
              figure pas ? Contactez-nous : nous étudions chaque demande selon
              votre localisation.
            </p>
            <Button href="/contact" variant="primary" className="mt-6">
              Vérifier si nous intervenons chez vous
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
