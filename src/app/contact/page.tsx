import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Barreau Énergies pour votre projet de climatisation, pompe à chaleur, chauffe-eau, traitement de l'eau ou entretien.",
  alternates: {
    canonical: "/contact",
  },
};

const contactItems = [
  {
    icon: Phone,
    label: "Téléphone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: `${siteConfig.address.postalCode} ${siteConfig.address.line}, ${siteConfig.address.zone}`,
    href: "/zone-intervention",
  },
];

export default function ContactPage() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Parlons de votre projet"
          description="Décrivez-nous votre besoin, nous revenons vers vous rapidement pour convenir d'un rendez-vous ou vous transmettre un devis."
          as="h1"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-6">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex cursor-pointer items-start gap-4 rounded-2xl border border-ink/10 p-5 transition-colors duration-200 hover:border-brand-green/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <item.icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink/50">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-ink">
                    {item.value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-ink/10 bg-ink/[0.02] p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
