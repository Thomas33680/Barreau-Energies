import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { HoverScale } from "@/components/motion/HoverScale";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez les installations réalisées par Barreau Énergies : climatisation, pompes à chaleur, chauffe-eaux et traitement de l'eau.",
};

const projects = [
  {
    key: "parigne-leveque-climatisation",
    title: "Climatisation réversible mono-split",
    location: "Parigné-l'Évêque (72250)",
    description:
      "Installation d'un groupe extérieur et d'une unité murale Mitsubishi Electric pour le chauffage et le rafraîchissement d'un séjour.",
    images: [
      "/realisations/parigne-leveque-climatisation-1.jpg",
      "/realisations/parigne-leveque-climatisation-2.jpg",
      "/realisations/parigne-leveque-climatisation-3.jpg",
      "/realisations/parigne-leveque-climatisation-4.jpg",
    ],
  },
];

export default function RealisationsPage() {
  return (
    <section className="bg-white py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Réalisations"
            title="Nos derniers chantiers"
            description="Un aperçu de nos installations récentes. D'autres chantiers viendront enrichir cette galerie prochainement."
          />
        </FadeIn>

        <div className="mt-14 flex flex-col gap-16">
          {projects.map((project) => (
            <div key={project.key}>
              <FadeIn>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-ink">{project.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-ink/60">
                      <MapPin size={14} className="text-brand-green" aria-hidden="true" />
                      {project.location}
                    </p>
                  </div>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/65">
                  {project.description}
                </p>
              </FadeIn>

              <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {project.images.map((src) => (
                  <StaggerItem key={src}>
                    <HoverScale className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink/5">
                      <Image
                        src={src}
                        alt={`${project.title} — ${project.location}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
