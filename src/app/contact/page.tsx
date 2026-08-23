import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Demandez un devis gratuit à Barreau Énergies pour votre projet de pompe à chaleur, climatisation, chauffe-eau ou traitement de l'eau.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink">
            Parlons de votre projet
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-muted">
            Décrivez votre besoin : nous revenons vers vous avec un diagnostic clair et des options adaptées,
            sans engagement.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Téléphone
              </dt>
              <dd className="mt-1">
                <a href={company.phoneHref} className="text-lg font-semibold text-ink hover:text-brand">
                  {company.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Email
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${company.email}`} className="text-lg font-semibold text-ink hover:text-brand">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Horaires
              </dt>
              <dd className="mt-1 text-lg font-semibold text-ink">{company.hours}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Zone d&rsquo;intervention
              </dt>
              <dd className="mt-1 text-lg font-semibold text-ink">{company.serviceArea}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface p-8 sm:p-10">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
