import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MapPinned, AlertCircle, Lightbulb, PackageCheck, TrendingUp, ImageIcon } from "lucide-react";
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

type Project = {
  key: string;
  title: string;
  location: string;
  context: string;
  problem: string;
  solution: string;
  material: string;
  result: string;
  phases: {
    avant: string[];
    pendant: string[];
    apres: string[];
  };
};

const projects: Project[] = [
  {
    key: "parigne-leveque-climatisation",
    title: "Climatisation réversible mono-split",
    location: "Parigné-l'Évêque (72250)",
    context:
      "Maison individuelle avec un séjour traversant, peu isolé, difficile à rafraîchir l'été et coûteux à chauffer l'hiver avec des convecteurs électriques.",
    problem:
      "Le client cherchait une solution unique pour assurer confort d'été et confort d'hiver, sans multiplier les équipements ni engager de travaux lourds sur le circuit de chauffage existant.",
    solution:
      "Installation d'une climatisation réversible mono-split Mitsubishi Electric, dimensionnée pour la surface et l'exposition du séjour, avec une unité murale discrète et un groupe extérieur positionné pour limiter les nuisances sonores.",
    material:
      "Groupe extérieur et unité murale Mitsubishi Electric, liaison frigorifique et raccordement électrique aux normes, mise en service et réglages personnalisés.",
    result:
      "Un séjour rafraîchi efficacement l'été, chauffé économiquement l'hiver grâce à un COP de 3 à 4, pour une installation discrète qui s'intègre à la décoration intérieure.",
    phases: {
      avant: [],
      pendant: [],
      apres: [
        "/realisations/parigne-leveque-climatisation-1.jpg",
        "/realisations/parigne-leveque-climatisation-2.jpg",
        "/realisations/parigne-leveque-climatisation-3.jpg",
        "/realisations/parigne-leveque-climatisation-4.jpg",
      ],
    },
  },
];

const infoBlocks: {
  key: keyof Pick<Project, "context" | "problem" | "solution" | "material" | "result">;
  label: string;
  icon: typeof MapPinned;
}[] = [
  { key: "context", label: "Contexte", icon: MapPinned },
  { key: "problem", label: "Problème", icon: AlertCircle },
  { key: "solution", label: "Solution", icon: Lightbulb },
  { key: "material", label: "Matériel installé", icon: PackageCheck },
  { key: "result", label: "Résultat", icon: TrendingUp },
];

const phaseLabels: { key: keyof Project["phases"]; label: string }[] = [
  { key: "avant", label: "Avant" },
  { key: "pendant", label: "Pendant" },
  { key: "apres", label: "Après" },
];

export default function RealisationsPage() {
  return (
    <section className="bg-white py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Réalisations"
            title="Nos derniers chantiers"
            description="Contexte, problème, solution, matériel installé et résultat : le détail de nos chantiers, pas seulement les photos. D'autres réalisations viendront enrichir cette page prochainement."
          />
        </FadeIn>

        <div className="mt-14 flex flex-col gap-16">
          {projects.map((project) => (
            <FadeIn
              key={project.key}
              className="overflow-hidden rounded-3xl border border-ink/10 shadow-sm"
            >
              <div className="p-8 sm:p-10">
                <h3 className="text-xl font-bold text-ink">{project.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-ink/60">
                  <MapPin size={14} className="text-brand-green" aria-hidden="true" />
                  {project.location}
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {infoBlocks.map(({ key, label, icon: Icon }) => (
                    <div
                      key={key}
                      className={`rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 ${
                        key === "result" ? "sm:col-span-2" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-brand-green" aria-hidden="true" />
                        <p className="text-xs font-bold uppercase tracking-wide text-ink">
                          {label}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">
                        {project[key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-ink/10 bg-ink/[0.02] p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                  Avant / Pendant / Après
                </p>
                <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-3">
                  {phaseLabels.map(({ key, label }) => {
                    const images = project.phases[key];
                    return (
                      <StaggerItem key={key}>
                        <p className="text-sm font-semibold text-ink">{label}</p>
                        {images.length > 0 ? (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {images.map((src) => (
                              <HoverScale
                                key={src}
                                className="relative aspect-square overflow-hidden rounded-xl bg-ink/5"
                              >
                                <Image
                                  src={src}
                                  alt={`${project.title} — ${label} — ${project.location}`}
                                  fill
                                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 45vw"
                                  className="object-cover"
                                />
                              </HoverScale>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink/15 text-ink/35">
                            <ImageIcon size={22} aria-hidden="true" />
                            <p className="text-xs">Photo à venir</p>
                          </div>
                        )}
                      </StaggerItem>
                    );
                  })}
                </StaggerGroup>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
