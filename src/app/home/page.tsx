import type { Metadata } from "next";
import { DivisionPage } from "@/components/DivisionPage";
import { getDivision } from "@/content/divisions";

import hero from "@/assets/photos/climate/gainable-salle-a-manger.png";
import g1 from "@/assets/photos/climate/gainable-cuisine-ouverte.png";
import g2 from "@/assets/photos/climate/split-salon-bibliotheque.png";

export const metadata: Metadata = {
  title: "HOME — Ventilation et qualité de l'air",
  description:
    "Ventilation résidentielle, contrôle VMC, qualité de l'air et capteurs pour maison absente : la maîtrise technique du logement au-delà du chauffage et de l'eau.",
};

export default function HomePage() {
  const division = getDivision("home")!;
  return (
    <DivisionPage
      division={division}
      hero={hero}
      gallery={[
        { src: g1, alt: "Diffuseurs de ventilation au plafond d'une cuisine ouverte" },
        { src: g2, alt: "Salon équipé, exemple de logement suivi par Barreau Énergies" },
      ]}
    />
  );
}
