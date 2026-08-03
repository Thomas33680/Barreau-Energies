import type { Metadata } from "next";
import Image from "next/image";
import {
  MapPin,
  MapPinned,
  AlertCircle,
  Lightbulb,
  HelpCircle,
  PackageCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
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
  specs: {
    housingType: string;
    surface: string;
    solution: string;
    brand: string;
    power: string;
  };
  context: string;
  problem: string;
  solution: string;
  whySolution: string;
  material: string;
  result: string;
  photos: string[];
};

const projects: Project[] = [
  {
    key: "parigne-leveque-climatisation",
    title: "Climatisation réversible mono-split",
    location: "Parigné-l'Évêque (72250)",
    specs: {
      housingType: "Maison individuelle",
      surface: "55 m²",
      solution: "PAC air/air mono-split Hyper Heating Wi-Fi",
      brand: "Mitsubishi Electric",
      power: "5 kW",
    },
    context:
      "Maison individuelle avec un séjour traversant, peu isolé, difficile à rafraîchir l'été et coûteux à chauffer l'hiver avec des convecteurs électriques.",
    problem:
      "Le client cherchait une solution unique pour assurer confort d'été et confort d'hiver, sans multiplier les équipements ni engager de travaux lourds sur le circuit de chauffage existant.",
    solution:
      "Pour répondre au besoin du client, nous avons installé une climatisation réversible Mitsubishi Electric dimensionnée pour assurer un confort optimal été comme hiver, tout en limitant la consommation d'énergie. L'installation est également équipée d'une connexion Wi-Fi, permettant un pilotage à distance depuis un smartphone, pour un confort et une maîtrise de la consommation au quotidien.",
    whySolution:
      "Nous avons retenu une climatisation réversible plutôt qu'une PAC air/eau car le logement était chauffé par des convecteurs électriques en plus d'une cheminée à insert et le client souhaitait limiter les travaux.",
    material:
      "Groupe extérieur et unité murale Mitsubishi Electric (gamme Hyper Heating, pilotage Wi-Fi), liaison frigorifique et raccordement électrique aux normes, mise en service et réglages personnalisés.",
    result:
      "Le client bénéficie désormais d'un séjour confortable toute l'année avec une consommation de chauffage réduite par rapport à ses anciens convecteurs électriques.",
    photos: [
      "/realisations/parigne-leveque-climatisation-1.jpg",
      "/realisations/parigne-leveque-climatisation-2.jpg",
      "/realisations/parigne-leveque-climatisation-3.jpg",
      "/realisations/parigne-leveque-climatisation-4.jpg",
    ],
  },
];

const infoBlocks: {
  key: keyof Pick<Project, "context" | "problem" | "solution" | "whySolution" | "material" | "result">;
  label: string;
  icon: typeof MapPinned;
}[] = [
  { key: "context", label: "Logement", icon: MapPinned },
  { key: "problem", label: "Le besoin du client", icon: AlertCircle },
  { key: "solution", label: "Notre solution", icon: Lightbulb },
  { key: "whySolution", label: "Pourquoi cette solution ?", icon: HelpCircle },
  { key: "material", label: "Les équipements installés", icon: PackageCheck },
  { key: "result", label: "Le résultat obtenu", icon: TrendingUp },
];

const specLabels: { key: keyof Project["specs"]; label: string }[] = [
  { key: "housingType", label: "Type de logement" },
  { key: "surface", label: "Surface traitée" },
  { key: "solution", label: "Solution" },
  { key: "brand", label: "Marque" },
  { key: "power", label: "Puissance" },
];

export default function RealisationsPage() {
  return (
    <section className="bg-white py-20">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Réalisations"
            title="Nos derniers chantiers"
            description="Logement, besoin du client, solution retenue, équipements installés et résultat obtenu : le détail de nos chantiers, pas seulement les photos. D'autres réalisations viendront enrichir cette page prochainement."
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

                <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 sm:grid-cols-5">
                  {specLabels.map(({ key, label }) => (
                    <div key={key}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-ink">{project.specs[key]}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {infoBlocks.map(({ key, label, icon: Icon }) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5"
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
                <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {project.photos.map((src) => (
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

              <div className="border-t border-ink/10 bg-gradient-to-br from-brand-blue via-brand-green to-brand-orange p-8 text-center sm:p-10">
                <h4 className="text-lg font-bold text-white sm:text-xl">
                  Vous avez un projet similaire ?
                </h4>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/90">
                  Parlons de votre logement et de vos besoins : nous vous
                  proposons la solution la plus adaptée, avec un devis
                  gratuit et sans engagement.
                </p>
                <Button href="/contact" variant="secondary" className="mt-5">
                  Demander un devis
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
