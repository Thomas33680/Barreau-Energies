import type { Metadata } from "next";
import Image from "next/image";
import { Check, ArrowRight, Lightbulb } from "lucide-react";
import { Flame, Snowflake, Droplets, Filter, Wrench, LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { EnergySavingsVisual } from "@/components/EnergySavingsVisual";
import { services, Service } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Climatisation réversible, pompe à chaleur air/eau, eau chaude sanitaire, traitement de l'eau et entretien par Barreau Énergies.",
};

const icons: Record<Service["slug"], LucideIcon> = {
  "climatisation-reversible": Snowflake,
  "pompe-a-chaleur-air-eau": Flame,
  "eau-chaude-sanitaire": Droplets,
  "traitement-eau": Filter,
  "entretien-depannage": Wrench,
};

const colorClasses: Record<Service["color"], { bg: string; text: string }> = {
  blue: { bg: "bg-brand-blue/10", text: "text-brand-blue" },
  green: { bg: "bg-brand-green/10", text: "text-brand-green" },
  orange: { bg: "bg-brand-orange/10", text: "text-brand-orange" },
  teal: { bg: "bg-brand-teal/10", text: "text-brand-teal" },
  amber: { bg: "bg-brand-amber/10", text: "text-brand-amber" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <Container>
          <SectionHeading
            eyebrow="Nos services"
            title="Des solutions complètes pour votre confort thermique"
            description="Chauffage, climatisation, eau chaude sanitaire, traitement de l'eau et entretien : nous vous accompagnons de l'étude au suivi dans la durée."
            light
          />
        </Container>
      </section>

      {services.map((service, index) => {
        const Icon = icons[service.slug];
        const colors = colorClasses[service.color];

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-20 py-20 ${index % 2 === 1 ? "bg-ink/[0.02]" : "bg-white"}`}
          >
            <Container>
              <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
                <FadeIn>
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
                  >
                    <Icon size={28} aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {service.name}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink/70">
                    {service.description}
                  </p>
                  <Button href="/contact" variant="primary" className="mt-6">
                    Demander un devis
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </FadeIn>

                <FadeIn delay={0.15} className="flex flex-col gap-6">
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white p-5"
                      >
                        <Check
                          size={18}
                          className={`mt-0.5 shrink-0 ${colors.text}`}
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-ink/75">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-2xl border border-ink/10 bg-white p-6">
                    <div className="flex items-center gap-2">
                      <Lightbulb size={18} className={colors.text} aria-hidden="true" />
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                        Comment ça marche ?
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {service.howItWorks}
                    </p>
                  </div>

                  {service.useCases && (
                    <div className="rounded-2xl border border-ink/10 bg-white p-6">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                        {service.useCases.title}
                      </h3>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {service.useCases.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              size={16}
                              className={`mt-0.5 shrink-0 ${colors.text}`}
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-relaxed text-ink/75">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </FadeIn>
              </div>

              {service.images && (
                <FadeIn
                  delay={0.2}
                  className={`mt-10 grid gap-4 ${service.images.length > 1 ? "sm:grid-cols-2" : ""}`}
                >
                  {service.images.map((image) => (
                    <figure
                      key={image.src}
                      className="overflow-hidden rounded-2xl border border-ink/10 bg-white"
                    >
                      <div
                        className={`relative w-full ${service.images!.length > 1 ? "aspect-[3/2]" : "aspect-[16/9]"}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes={service.images!.length > 1 ? "(min-width: 640px) 50vw, 100vw" : "100vw"}
                        />
                      </div>
                      <figcaption className="px-5 py-3 text-sm font-medium text-ink/60">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </FadeIn>
              )}

              {service.annualSavingsExample && service.savings && (
                <FadeIn delay={0.2} className="mt-10">
                  <EnergySavingsVisual
                    reference={service.annualSavingsExample.reference}
                    classicCost={service.annualSavingsExample.classicCost}
                    solutionCost={service.annualSavingsExample.solutionCost}
                    label={service.shortName}
                    color={service.color}
                    description={service.savings}
                    tenYearSavings={service.tenYearSavings}
                  />
                </FadeIn>
              )}
            </Container>
          </section>
        );
      })}
    </>
  );
}
