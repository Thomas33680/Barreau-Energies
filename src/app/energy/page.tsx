import type { Metadata } from "next";
import { DivisionPage } from "@/components/DivisionPage";
import { getDivision } from "@/content/divisions";

import hero from "@/assets/photos/exterior/pac-buanderie-atlantic.png";
import g1 from "@/assets/photos/climate/split-salon-baie-vitree.png";
import g2 from "@/assets/photos/water/ballon-thermodynamique-buanderie-2.png";

export const metadata: Metadata = {
  title: "ENERGY — Mesure et pilotage de vos usages électriques",
  description:
    "Sous-comptage, pilotage de l'ECS et de la PAC, optimisation des heures tarifaires : la brique de pilotage énergétique de Barreau Énergies, en préparation.",
};

export default function EnergyPage() {
  const division = getDivision("energy")!;
  return (
    <DivisionPage
      division={division}
      hero={hero}
      gallery={[
        { src: g1, alt: "Pompe à chaleur air/air, équipement pilotable via Energy Control" },
        { src: g2, alt: "Chauffe-eau thermodynamique, équipement pilotable via Energy Control" },
      ]}
    />
  );
}
