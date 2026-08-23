import type { Metadata } from "next";
import { DivisionPage } from "@/components/DivisionPage";
import { getDivision } from "@/content/divisions";

import hero from "@/assets/photos/climate/split-salon-tv.png";
import g1 from "@/assets/photos/climate/split-salon-bibliotheque.png";
import g2 from "@/assets/photos/climate/split-salon-provencal.png";
import g3 from "@/assets/photos/climate/gainable-cuisine-ouverte.png";

export const metadata: Metadata = {
  title: "CLIMATE — Pompes à chaleur, climatisation et gainable",
  description:
    "Installation et optimisation de PAC air/air, air/eau et gainable. Mise en service, régulation, entretien et diagnostic de performance par Barreau Énergies.",
};

export default function ClimatePage() {
  const division = getDivision("climate")!;
  return (
    <DivisionPage
      division={division}
      hero={hero}
      gallery={[
        { src: g1, alt: "Unité intérieure de climatisation dans un salon" },
        { src: g2, alt: "Pompe à chaleur air/air Mitsubishi installée en salon" },
        { src: g3, alt: "Diffuseurs de climatisation gainable au plafond d'une cuisine ouverte" },
      ]}
    />
  );
}
