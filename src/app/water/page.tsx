import type { Metadata } from "next";
import { DivisionPage } from "@/components/DivisionPage";
import { getDivision } from "@/content/divisions";

import hero from "@/assets/photos/water/ballon-thermodynamique-buanderie-1.png";
import g1 from "@/assets/photos/water/comparatif-electrique-thermodynamique.png";
import g2 from "@/assets/photos/water/adoucisseur-filtration.png";
import g3 from "@/assets/photos/water/chauffe-eau-buanderie-1.png";

export const metadata: Metadata = {
  title: "WATER — Adoucisseur, chauffe-eau et protection contre les fuites",
  description:
    "Adoucisseurs, chauffe-eau thermodynamiques et électriques, filtration et protection contre les fuites d'eau. Barreau Énergies produit et protège l'eau de votre logement.",
};

export default function WaterPage() {
  const division = getDivision("water")!;
  return (
    <DivisionPage
      division={division}
      hero={hero}
      gallery={[
        { src: g1, alt: "Comparatif chauffe-eau électrique et thermodynamique en buanderie" },
        { src: g2, alt: "Adoucisseur et filtration d'eau installés" },
        { src: g3, alt: "Chauffe-eau installé en buanderie" },
      ]}
    />
  );
}
