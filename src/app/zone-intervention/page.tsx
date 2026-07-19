import type { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { RadiusMap } from "@/components/RadiusMap";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { HoverScale } from "@/components/motion/HoverScale";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Zone d'intervention",
  description:
    "Barreau Énergies intervient au Mans et dans un rayon de 50 km, depuis son siège à Parigné-l'Évêque.",
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
        <FadeIn>
          <SectionHeading
            eyebrow="Zone d'intervention"
            title="Une entreprise locale, proche de chez vous"
            description={`Basés à ${siteConfig.address.line} (${siteConfig.address.postalCode}), nous intervenons au Mans et dans un rayon de ${siteConfig.address.radiusKm} km pour tous vos projets de pompe à chaleur, climatisation et chauffe-eau thermodynamique.`}
          />
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <RadiusMap />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="text-lg font-bold text-ink">
              Quelques secteurs où nous intervenons
            </h3>
            <StaggerGroup className="mt-6 grid grid-cols-2 gap-3">
              {communes.map((commune) => (
                <StaggerItem key={commune}>
                  <HoverScale className="flex items-center gap-2 rounded-lg border border-ink/10 px-4 py-3 text-sm text-ink/75">
                    <MapPin size={14} className="shrink-0 text-brand-green" aria-hidden="true" />
                    {commune}
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <p className="mt-6 text-sm leading-relaxed text-ink/60">
              Cette liste n&apos;est pas exhaustive : nous intervenons dans un
              rayon de {siteConfig.address.radiusKm} km autour du Mans. Votre
              commune n&apos;y figure pas ? Contactez-nous, nous étudions
              chaque demande selon votre localisation.
            </p>
            <Button href="/contact" variant="primary" className="mt-6">
              Vérifier si nous intervenons chez vous
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
