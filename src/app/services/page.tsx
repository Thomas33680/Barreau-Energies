import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceDetailSection } from "@/components/ServiceDetailSection";
import { ServicesMobileExplorer } from "@/components/ServicesMobileExplorer";
import { services, Service } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Climatisation réversible, pompe à chaleur air/eau, eau chaude sanitaire, traitement de l'eau et entretien par Barreau Énergies.",
  alternates: {
    canonical: "/services",
  },
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
      <section className="bg-ink py-14 sm:py-20 text-white">
        <Container>
          <SectionHeading
            eyebrow="Nos services"
            title="Des solutions complètes pour votre confort thermique"
            description="Chauffage, climatisation, eau chaude sanitaire, traitement de l'eau et entretien : nous vous accompagnons de l'étude au suivi dans la durée."
            light
            as="h1"
            hideDescriptionOnMobile
          />
        </Container>
      </section>

      {/* Desktop : barre de navigation par ancres + tous les services à la suite, inchangé */}
      <div className="hidden sm:block">
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

        {services.map((service, index) => (
          <ServiceDetailSection
            key={service.slug}
            service={service}
            id={service.slug}
            bgClassName={index % 2 === 1 ? "bg-ink/[0.02]" : "bg-white"}
          />
        ))}
      </div>

      {/* Mobile : écran d'accueil avec logos cliquables, un seul service ouvert à la fois */}
      <div className="sm:hidden">
        <ServicesMobileExplorer services={services} />
      </div>
    </>
  );
}
