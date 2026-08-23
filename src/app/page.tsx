import Image from "next/image";
import { Container, SectionHeading, Button, Eyebrow } from "@/components/ui";
import { DivisionCard } from "@/components/DivisionCard";
import { BrandLogos } from "@/components/BrandLogos";
import { company, pillars, servicePromises } from "@/content/company";
import { divisions } from "@/content/divisions";

import heroImage from "@/assets/photos/climate/split-salon-baie-vitree.png";
import technicianImage from "@/assets/photos/team/technicien-unite-exterieure-2.png";
import galleryClimate from "@/assets/photos/climate/split-salon-provencal.png";
import galleryWater from "@/assets/photos/water/ballon-thermodynamique-buanderie-1.png";
import galleryExterior from "@/assets/photos/exterior/pac-buanderie-adoucisseur.png";
import galleryGainable from "@/assets/photos/climate/gainable-salle-a-manger.png";
import gallerySoftener from "@/assets/photos/water/adoucisseur-filtration.png";
import galleryBathroom from "@/assets/photos/water/chauffe-eau-placard-sdb-3.png";

const pillarBg: Record<string, string> = {
  climate: "bg-climate-light text-climate",
  water: "bg-water-light text-water",
  energy: "bg-energy-light text-energy",
  care: "bg-care-light text-care",
};

const gallery = [
  { src: galleryClimate, alt: "Unité intérieure de climatisation installée dans un salon" },
  { src: galleryWater, alt: "Chauffe-eau thermodynamique installé en buanderie" },
  { src: galleryExterior, alt: "Pompe à chaleur extérieure et buanderie équipée" },
  { src: galleryGainable, alt: "Diffuseurs de climatisation gainable au plafond" },
  { src: gallerySoftener, alt: "Adoucisseur et filtration d'eau installés" },
  { src: galleryBathroom, alt: "Chauffe-eau installé dans un placard de salle de bain" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Eyebrow>Barreau Énergies</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {company.positioning}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {company.pitch}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact" variant="secondary">
                Demander un devis
              </Button>
              <Button href="/climate" variant="ghost">
                Découvrir nos divisions
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Interlocuteur
                </dt>
                <dd className="mt-1 text-sm text-ink-muted">
                  Un seul contact pour équiper, protéger, piloter et entretenir
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Méthode
                </dt>
                <dd className="mt-1 text-sm text-ink-muted">
                  Diagnostic, options claires, chantier documenté, suivi
                </dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-sunken shadow-2xl shadow-ink/10">
              <Image
                src={heroImage}
                alt="Unité intérieure de climatisation installée dans un salon lumineux"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 4 pillars */}
      <section className="border-y border-border bg-surface">
        <Container className="py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div key={pillar.key} className="flex items-start gap-4">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-sm font-bold ${pillarBg[pillar.color]}`}
                >
                  {pillar.label.slice(0, 1)}
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink">
                    {pillar.label}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-muted">{pillar.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Divisions */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Architecture de marque"
            title="Cinq divisions, une seule marque"
            description="Le client doit comprendre l'univers Barreau en moins de 10 secondes. Chaque division répond à un besoin précis du logement."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <DivisionCard key={division.slug} division={division} />
            ))}
          </div>
        </Container>
      </section>

      {/* Trust / promises */}
      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>Promesse de service</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Des garanties simples, vérifiables et opérables
              </h2>
              <p className="mt-4 text-lg text-paper/70">
                Ces standards s&rsquo;appliquent sur chaque intervention, avant de devenir des slogans marketing.
              </p>
              <div className="mt-9 aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={technicianImage}
                  alt="Technicien Barreau Énergies intervenant sur une pompe à chaleur"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <dl className="grid gap-5 sm:grid-cols-2">
              {servicePromises.map((promise) => (
                <div
                  key={promise.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <dt className="font-display text-base font-bold">
                    {promise.name}
                  </dt>
                  <dd className="mt-2 text-sm text-paper/70">{promise.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Réalisations"
            title="Des installations documentées et soignées"
            description="Un aperçu de chantiers récents : pompes à chaleur, chauffe-eau, adoucisseurs et gainables."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((item, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-2xl bg-surface-sunken"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Brands */}
      <section className="border-y border-border bg-surface py-16">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Marques installées
          </p>
          <div className="mt-10">
            <BrandLogos />
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-brand px-8 py-16 text-center text-white sm:px-16">
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Un projet de chauffage, climatisation ou eau chaude ?
            </h2>
            <p className="max-w-xl text-lg text-white/85">
              Décrivez votre besoin, nous revenons vers vous avec un diagnostic clair et des options adaptées.
            </p>
            <Button href="/contact" variant="primary" className="mt-2 !bg-white !text-brand hover:!bg-white/90">
              Demander un devis gratuit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
