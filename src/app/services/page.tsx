import type { Metadata } from "next";
import Image from "next/image";
import { Check, ArrowRight, Lightbulb, Search } from "lucide-react";
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

const dotClasses: Record<Service["color"], string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  orange: "bg-brand-orange",
  teal: "bg-brand-teal",
  amber: "bg-brand-amber",
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

      <nav
        aria-label="Navigation des services"
        className="sticky top-20 z-40 border-b border-ink/10 bg-white/95 backdrop-blur"
      >
        <Container>
          <div className="flex flex-wrap justify-center gap-2 py-3">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.03] px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/[0.06] hover:text-ink"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${dotClasses[service.color]}`}
                  aria-hidden="true"
                />
                {service.shortName}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {services.map((service, index) => {
        const Icon = icons[service.slug];
        const colors = colorClasses[service.color];

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-36 py-20 ${index % 2 === 1 ? "bg-ink/[0.02]" : "bg-white"}`}
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

                  {service.images && service.images.length === 1 && (
                    <div className="relative mt-6 aspect-[3/2] w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.03]">
                      <Image
                        src={service.images[0].src}
                        alt={service.images[0].alt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </div>
                  )}
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

                  {service.checklistCards?.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-ink/10 bg-white p-6"
                    >
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                        {card.title}
                      </h3>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {card.items.map((item) => (
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
                  ))}
                </FadeIn>
              </div>

              {service.benefits && (
                <FadeIn delay={0.2} className="mt-10">
                  <h3 className="text-center text-lg font-bold text-ink sm:text-xl">
                    {service.benefits.title}
                  </h3>
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {service.benefits.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white p-5 text-center"
                      >
                        <span className="text-3xl" aria-hidden="true">
                          {item.emoji}
                        </span>
                        <span className="text-sm font-medium text-ink/75">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}

              {service.images && service.images.length > 1 && (
                <FadeIn delay={0.2} className="mt-10 grid gap-4 sm:grid-cols-2">
                  {service.images.map((image) => (
                    <div
                      key={image.src}
                      className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.03]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  ))}
                </FadeIn>
              )}

              {service.annualSavingsExample && service.savings && (
                <FadeIn delay={0.2} className="mt-10">
                  <EnergySavingsVisual
                    reference={service.annualSavingsExample.reference}
                    classicCost={service.annualSavingsExample.classicCost}
                    solutionCost={service.annualSavingsExample.solutionCost}
                    label={service.savingsLabel ?? service.shortName}
                    color={service.color}
                    description={service.savings}
                    tenYearSavings={service.tenYearSavings}
                  />
                </FadeIn>
              )}

              {service.calloutCard && (
                <FadeIn delay={0.2} className="mt-10">
                  <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center gap-2">
                      <Search size={20} className={colors.text} aria-hidden="true" />
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                        {service.calloutCard.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {service.calloutCard.description}
                    </p>
                  </div>
                </FadeIn>
              )}
            </Container>
          </section>
        );
      })}
    </>
  );
}
