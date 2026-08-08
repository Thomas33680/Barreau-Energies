import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { RealisationsGallery } from "@/components/RealisationsGallery";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez les installations réalisées par Barreau Énergies : climatisation, pompes à chaleur, chauffe-eaux et traitement de l'eau.",
  alternates: {
    canonical: "/realisations",
  },
};

export default function RealisationsPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Réalisations"
            title="Nos derniers chantiers"
            description="Logement, besoin du client, solution retenue, équipements installés et résultat obtenu : le détail de nos chantiers, pas seulement les photos. Filtrez pour trouver un chantier proche du vôtre."
            as="h1"
          />
        </FadeIn>

        <RealisationsGallery />
      </Container>
    </section>
  );
}
