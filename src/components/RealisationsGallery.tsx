"use client";

import { useMemo, useState } from "react";
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
  SlidersHorizontal,
  SearchX,
} from "lucide-react";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { HoverScale } from "@/components/motion/HoverScale";
import {
  projectTypes,
  surfaceRanges,
  housingCategories,
  projects,
  type Project,
} from "@/lib/realisations-data";

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

const selectClasses =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-base sm:text-sm text-ink focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30";

export function RealisationsGallery() {
  const [projectType, setProjectType] = useState("all");
  const [surfaceRange, setSurfaceRange] = useState("all");
  const [commune, setCommune] = useState("all");
  const [housingCategory, setHousingCategory] = useState("all");

  const communes = useMemo(
    () => Array.from(new Set(projects.map((p) => p.commune))).sort(),
    [],
  );

  const filtered = projects.filter((project) => {
    if (projectType !== "all" && project.projectType !== projectType) return false;
    if (commune !== "all" && project.commune !== commune) return false;
    if (housingCategory !== "all" && project.housingCategory !== housingCategory) return false;
    if (surfaceRange !== "all") {
      const range = surfaceRanges.find((r) => r.id === surfaceRange);
      if (range && !range.test(project.surfaceM2)) return false;
    }
    return true;
  });

  const hasActiveFilters =
    projectType !== "all" || surfaceRange !== "all" || commune !== "all" || housingCategory !== "all";

  function resetFilters() {
    setProjectType("all");
    setSurfaceRange("all");
    setCommune("all");
    setHousingCategory("all");
  }

  return (
    <div className="mt-14">
      <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-brand-green" aria-hidden="true" />
          <p className="text-sm font-bold text-ink">
            Trouvez un chantier proche de votre projet
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink/60">
            Type de projet
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={selectClasses}
            >
              <option value="all">Tous les projets</option>
              {projectTypes.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink/60">
            Surface du logement
            <select
              value={surfaceRange}
              onChange={(e) => setSurfaceRange(e.target.value)}
              className={selectClasses}
            >
              <option value="all">Toutes surfaces</option>
              {surfaceRanges.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink/60">
            Commune
            <select
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              className={selectClasses}
            >
              <option value="all">Toutes communes</option>
              {communes.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink/60">
            Type de logement
            <select
              value={housingCategory}
              onChange={(e) => setHousingCategory(e.target.value)}
              className={selectClasses}
            >
              <option value="all">Tous logements</option>
              {housingCategories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-ink/50">
            {filtered.length} réalisation{filtered.length > 1 ? "s" : ""} trouvée
            {filtered.length > 1 ? "s" : ""}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="cursor-pointer text-xs font-semibold text-brand-green underline underline-offset-4"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <FadeIn className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] p-10 text-center">
          <SearchX size={32} className="text-brand-green" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink/70">
            Aucune réalisation ne correspond à ces critères pour le moment.
            Contactez-nous : nous avons sûrement déjà traité un cas similaire
            au vôtre.
          </p>
          <Button href="/contact" variant="primary">
            Nous contacter
          </Button>
        </FadeIn>
      ) : (
        <div className="mt-10 flex flex-col gap-16">
          {filtered.map((project) => (
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

                <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 sm:grid-cols-5">
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
                    <div key={key} className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-brand-green" aria-hidden="true" />
                        <p className="text-xs font-bold uppercase tracking-wide text-ink">
                          {label}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">{project[key]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-ink/10 bg-ink/[0.02] p-8 sm:p-10">
                <StaggerGroup className="flex flex-wrap justify-center gap-6">
                  {project.photos.map((photo) => (
                    <StaggerItem key={photo.src}>
                      <HoverScale className="overflow-hidden rounded-2xl bg-ink/5 shadow-sm">
                        <Image
                          src={photo.src}
                          alt={`${project.title}, ${project.location}`}
                          width={photo.width}
                          height={photo.height}
                          sizes="(min-width: 1024px) 60vw, 90vw"
                          className="h-auto max-h-[36rem] w-auto max-w-full"
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
      )}
    </div>
  );
}
