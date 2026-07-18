import type { Metadata } from "next";
import { MessageSquareHeart } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCard } from "@/components/TestimonialCard";
import { siteConfig, testimonials } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Avis clients",
  description: "Découvrez les avis des clients de Barreau Énergies.",
};

export default function AvisPage() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="Avis clients"
          title="Ce que pensent nos clients"
          center
        />

        {testimonials.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] p-10 text-center">
            <MessageSquareHeart size={32} className="text-brand-green" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-ink/70">
              Les premiers avis clients seront bientôt affichés ici. Vous êtes
              client de Barreau Énergies ? Votre retour nous aide à progresser.
            </p>
            <Button href={`mailto:${siteConfig.email}`} variant="primary">
              Laisser un avis
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
