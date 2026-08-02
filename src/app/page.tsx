import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Ruler,
  PackageCheck,
  HeartHandshake,
  ImageIcon,
  Phone,
  ClipboardList,
  FileText,
  Wrench,
  Settings2,
  MessageSquareHeart,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ValueCard } from "@/components/ValueCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Hero } from "@/components/Hero";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { HoverImageLink } from "@/components/motion/HoverImageLink";
import { HoverLogo } from "@/components/motion/HoverLogo";
import { Simulator } from "@/components/Simulator";
import { siteConfig, services, values, partnerBrands, testimonials } from "@/lib/site-config";

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

const projectSteps = [
  {
    icon: Phone,
    title: "Premier contact",
    description: "Vous nous contactez par téléphone, email ou formulaire : nous échangeons sur votre projet et vos besoins.",
  },
  {
    icon: ClipboardList,
    title: "Visite technique",
    description: "Nous nous déplaçons chez vous pour étudier votre logement et dimensionner la solution la plus adaptée.",
  },
  {
    icon: FileText,
    title: "Devis gratuit",
    description: "Vous recevez un devis détaillé et sans engagement, avec un tarif clair.",
  },
  {
    icon: Wrench,
    title: "Installation",
    description: "Nos techniciens réalisent l'installation avec soin, dans le respect de votre logement.",
  },
  {
    icon: Settings2,
    title: "Mise en service",
    description: "Nous testons et réglons votre équipement pour des performances optimales dès le premier jour.",
  },
  {
    icon: HeartHandshake,
    title: "Suivi",
    description: "Nous restons disponibles après les travaux : conseils, entretien et dépannage si besoin.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Nos services"
              title="Confort, performance, économies"
              description="De l'installation à l'entretien, une même exigence : des équipements fiables, économes et durables, pour votre confort comme pour votre budget."
            />
          </FadeIn>
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-white py-12">
        <Container>
          <FadeIn>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
              Marques que nous installons
            </p>
          </FadeIn>
          <StaggerGroup className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:gap-x-10">
            {partnerBrands.map((brand) => (
              <StaggerItem key={brand.name}>
                <HoverLogo src={brand.logo} alt={brand.name} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-ink/[0.02] py-24">
        <Container className="max-w-4xl">
          <FadeIn>
            <SectionHeading
              eyebrow="Simulateur"
              title="Estimez votre projet en 30 secondes"
              description="Surface de votre logement, isolation, taille du foyer : obtenez une première estimation en temps réel."
              center
            />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-12">
            <Simulator />
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Notre méthode"
              title="Comment se déroule votre projet ?"
              description="De la prise de contact au suivi après travaux, un accompagnement clair à chaque étape."
              center
            />
          </FadeIn>
          <StaggerGroup className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <div
              className="absolute top-6 right-0 left-0 hidden h-px bg-ink/10 lg:block"
              aria-hidden="true"
            />
            {projectSteps.map((step, index) => (
              <StaggerItem key={step.title} className="relative flex flex-col items-start gap-4 lg:items-center lg:text-center">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                  <step.icon size={20} aria-hidden="true" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn>
              <HoverImageLink
                href="/realisations"
                className="group relative block aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl bg-ink shadow-lg shadow-ink/5 sm:aspect-[16/11]"
              >
                <Image
                  src="/realisations/parigne-leveque-climatisation-4.jpg"
                  alt="Climatisation réversible haut de gamme Mitsubishi Electric installée par Barreau Énergies à Parigné-l'Évêque"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                    Climatisation haut de gamme
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    Installation Mitsubishi Electric à {siteConfig.address.line}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                    Voir nos réalisations
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </HoverImageLink>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-ink/15 bg-ink/[0.03] text-ink/40 sm:aspect-[16/11]">
                <ImageIcon size={32} aria-hidden="true" />
                <p className="text-sm font-medium text-ink/60">
                  Eau chaude sanitaire
                </p>
                <p className="text-xs">Photo de chantier à venir</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Avis clients"
              title="Ce que pensent nos clients"
              center
            />
          </FadeIn>

          {testimonials.length > 0 ? (
            <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((testimonial) => (
                <StaggerItem key={testimonial.name}>
                  <TestimonialCard testimonial={testimonial} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <FadeIn delay={0.1} className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] p-10 text-center">
              <MessageSquareHeart size={32} className="text-brand-green" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-ink/70">
                Les premiers avis clients seront bientôt affichés ici. Vous êtes
                client de Barreau Énergies ? Votre retour nous aide à progresser.
              </p>
              <Button href={`mailto:${siteConfig.email}`} variant="primary">
                Laisser un avis
              </Button>
            </FadeIn>
          )}

          {testimonials.length > 0 && (
            <FadeIn delay={0.15} className="mt-8 text-center">
              <Link
                href="/avis"
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-green"
              >
                Voir tous les avis
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </FadeIn>
          )}
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-ink/[0.02] py-20">
        <StaggerGroup>
          <Container className="grid gap-10 sm:grid-cols-3">
            {promises.map((item) => (
              <StaggerItem key={item.title} className="flex flex-col items-start">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <item.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </Container>
        </StaggerGroup>
      </section>

      <section className="bg-ink py-24">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Pourquoi nous choisir"
              title="Pourquoi choisir Barreau Énergies ?"
              description="Des engagements concrets, tenus sur chaque chantier."
              light
              center
            />
          </FadeIn>
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.name}>
                <ValueCard {...value} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <FadeIn className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-brand-blue via-brand-green to-brand-orange p-12 text-center sm:p-16">
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {siteConfig.address.zone} : parlons de votre projet.
            </h2>
            <p className="max-w-lg text-white/90">
              Basés à {siteConfig.address.line} ({siteConfig.address.postalCode}),
              nous intervenons sur {siteConfig.address.zoneDetailed}. Devis
              gratuit et sans engagement.
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
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
