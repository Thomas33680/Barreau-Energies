import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Accordion } from "@/components/Accordion";
import { FadeIn } from "@/components/motion/FadeIn";
import { faqItems } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Toutes les réponses à vos questions sur nos installations de climatisation, pompes à chaleur, chauffe-eaux, traitement de l'eau et entretien.",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions fréquentes"
            description="Vous ne trouvez pas la réponse à votre question ? Contactez-nous directement, nous vous répondrons rapidement."
            light
          />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <Accordion items={faqItems} />

          <FadeIn className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-ink/[0.03] p-8 text-center">
            <p className="text-sm text-ink/70">
              D&apos;autres questions ? Nous sommes disponibles pour en
              discuter.
            </p>
            <Button href="/contact" variant="primary">
              Nous contacter
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
