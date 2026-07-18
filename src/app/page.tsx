import Link from "next/link";
import { ArrowRight, Ruler, PackageCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ValueCard } from "@/components/ValueCard";
import { siteConfig, services, values } from "@/lib/site-config";

const promises = [
  {
    icon: Ruler,
    title: "Installation sur mesure",
    description: "Étude de votre logement pour une solution dimensionnée à vos besoins réels.",
  },
  {
    icon: PackageCheck,
    title: "Matériel de qualité",
    description: "Des équipements performants et durables, choisis auprès de marques reconnues.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement personnalisé",
    description: "Du devis à la mise en service, un interlocuteur unique et disponible.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative flex flex-col items-start gap-8 py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green">
            Chauffage · Climatisation · Eau chaude
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Votre expert en confort thermique.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">
            Des solutions de chauffage, climatisation et ventilation adaptées
            à vos besoins, installées par une entreprise locale et réactive.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Demander un devis
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={siteConfig.phoneHref} variant="ghost">
              {siteConfig.phone}
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <SectionHeading
            eyebrow="Nos services"
            title="Confort, performance, économies"
            description="Trois métiers, une même exigence : des installations fiables qui font durablement baisser vos factures d'énergie."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-ink/[0.02] py-20">
        <Container className="grid gap-10 sm:grid-cols-3">
          {promises.map((item) => (
            <div key={item.title} className="flex flex-col items-start">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                <item.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {item.description}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-ink py-24">
        <Container>
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Votre confort, notre priorité"
            light
            center
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <ValueCard key={value.name} {...value} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-brand-blue via-brand-green to-brand-orange p-12 text-center sm:p-16">
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {siteConfig.address.zone} : parlons de votre projet.
          </h2>
          <p className="max-w-lg text-white/90">
            Basés à {siteConfig.address.line} ({siteConfig.address.postalCode}),
            nous intervenons sur {siteConfig.address.zone}. Devis gratuit et
            sans engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="secondary">
              Demander un devis
            </Button>
            <Link
              href="/zone-intervention"
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
            >
              Voir la zone d&apos;intervention
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
