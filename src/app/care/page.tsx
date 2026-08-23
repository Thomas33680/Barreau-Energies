import type { Metadata } from "next";
import { DivisionPage } from "@/components/DivisionPage";
import { getDivision } from "@/content/divisions";

import hero from "@/assets/photos/team/technicien-unite-exterieure-1.png";
import g1 from "@/assets/photos/team/technicien-unite-exterieure-2.png";
import g2 from "@/assets/photos/climate/split-salon-provencal.png";

export const metadata: Metadata = {
  title: "CARE — Entretien, maintenance et abonnement",
  description:
    "Entretiens périodiques, dépannage prioritaire, suivi des garanties et Passeport Maison. Barreau Énergies entretient ce qu'elle installe.",
};

export default function CarePage() {
  const division = getDivision("care")!;
  return (
    <DivisionPage
      division={division}
      hero={hero}
      gallery={[
        { src: g1, alt: "Technicien Barreau Énergies en intervention d'entretien" },
        { src: g2, alt: "Équipement installé et suivi dans le temps" },
      ]}
    />
  );
}
