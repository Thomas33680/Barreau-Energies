import type { Metadata } from "next";
import { Check, ArrowRight, Lightbulb, TrendingDown } from "lucide-react";
import { Flame, Snowflake, Droplets, LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { services, Service } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Installation de pompes à chaleur, climatisation et chauffe-eaux thermodynamiques par Barreau Énergies.",
};

const icons: Record<Service["slug"], LucideIcon> = {
  "pompes-a-chaleur": Flame,
  climatisation: Snowflake,
  "chauffe-eau-thermodynamique": Droplets,
};

const colorClasses: Record<Service["color"], { bg: string; text: string }> = {
  blue: { bg: "bg-brand-blue/10", text: "text-brand-blue" },
  green: { bg: "bg-brand-green/10", text: "text-brand-green" },
  orange: { bg: "bg-brand-orange/10", text: "text-brand-orange" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <Container>
          <SectionHeading
            eyebrow="Nos services"
            title="Des solutions complètes pour votre confort thermique"
            description="Chauffage, climatisation, eau chaude sanitaire : nous vous accompagnons de l'étude à la mise en service."
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
            <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
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

                <div className="rounded-2xl border border-ink/10 bg-white p-6">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={18} className={colors.text} aria-hidden="true" />
                    <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                      Économies d&apos;énergie
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {service.savings}
                  </p>
                </div>
              </FadeIn>
            </Container>
          </section>
        );
      })}
    </>
  );
}
