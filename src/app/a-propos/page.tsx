import type { Metadata } from "next";
import Image from "next/image";
import { Container, SectionHeading, Eyebrow, Button } from "@/components/ui";
import { company } from "@/content/company";
import photo from "@/assets/photos/team/technicien-unite-exterieure-1.png";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Barreau Énergies, l'intégrateur local des systèmes techniques de la maison : positionnement, méthode et parcours client.",
};

const identity = [
  {
    label: "Nous sommes",
    value: "Un intégrateur de systèmes techniques résidentiels.",
  },
  {
    label: "Nous ne sommes pas",
    value: "Un artisan généraliste qui « fait un peu de tout ».",
  },
  {
    label: "Client cœur",
    value: "Propriétaire occupant recherchant fiabilité, confort, économie et simplicité.",
  },
  {
    label: "Avantage recherché",
    value: "Marque, rapidité, standardisation, suivi, multi-équipement.",
  },
];

const valueProps = [
  "Un seul interlocuteur pour les équipements techniques essentiels du logement.",
  "Des solutions conçues autour d'un résultat client, pas autour d'une référence produit.",
  "Des installations documentées, expliquées et suivies dans le temps.",
  "Des équipements rendus mesurables et pilotables quand cela crée de la valeur.",
  "Une expérience homogène : devis clair, chantier propre, dossier numérique, suivi après intervention.",
];

const journey = [
  { step: "1", title: "Prise de contact", detail: "Vous décrivez votre besoin, on qualifie l'urgence et le type de logement." },
  { step: "2", title: "Rendez-vous", detail: "Un créneau confirmé, préparé à l'avance." },
  { step: "3", title: "Diagnostic", detail: "Constats structurés sur place, pas d'improvisation." },
  { step: "4", title: "Options", detail: "Présentées en niveaux Essentiel / Plus / Premium, prix inclus." },
  { step: "5", title: "Installation", detail: "Chantier documenté, méthode standard, zone protégée." },
  { step: "6", title: "Mise en service", detail: "Mesures, tests, paramétrage et explication complète." },
  { step: "7", title: "Suivi", detail: "Message ou appel après intervention, dossier conservé, prochaine action identifiée." },
];

export default function AProposPage() {
  return (
    <>
      <section>
        <Container className="grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <Eyebrow>À propos</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {company.positioning}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              Barreau Énergies devient l&rsquo;intégrateur local des systèmes techniques de la maison. Le premier
              chantier n&rsquo;est plus une transaction isolée : il est le point d&rsquo;entrée d&rsquo;une relation
              multi-équipements, multi-années et récurrente.
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-sunken shadow-2xl shadow-ink/10">
            <Image
              src={photo}
              alt="Technicien Barreau Énergies en intervention"
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="Positionnement" title="Ce que nous sommes — et ce que nous ne sommes pas" />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {identity.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-paper p-6">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {item.label}
                </dt>
                <dd className="mt-2 font-display text-lg font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Proposition de valeur" title="Ce que ça change pour vous" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {valueProps.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border bg-ink py-20 text-paper sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Notre méthode"
            title="Le même parcours à chaque intervention"
            description="Il devient une partie du produit Barreau : reconnaissable, quel que soit le technicien ou le conseiller."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <li key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="font-display text-2xl font-bold text-white/40">{item.step}</span>
                <p className="mt-3 font-display text-base font-bold">{item.title}</p>
                <p className="mt-2 text-sm text-paper/70">{item.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-ink">
            Une question avant de vous lancer ?
          </h2>
          <Button href="/contact" variant="secondary">
            Nous contacter
          </Button>
        </Container>
      </section>
    </>
  );
}
