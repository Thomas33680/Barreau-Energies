import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Simulator } from "@/components/Simulator";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Simulateur",
  description:
    "Estimez en quelques secondes la puissance de pompe à chaleur ou le volume de chauffe-eau thermodynamique adapté à votre logement.",
};

export default function SimulateurPage() {
  return (
    <>
      <section className="bg-ink py-20 text-white">
        <Container>
          <SectionHeading
            eyebrow="Simulateur"
            title="Estimez votre projet en 30 secondes"
            description="Renseignez quelques informations sur votre logement pour obtenir une première estimation, puis affinez-la avec un devis personnalisé."
            light
          />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-4xl">
          <FadeIn>
            <Simulator />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
