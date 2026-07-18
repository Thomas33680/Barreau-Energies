import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez les installations réalisées par Barreau Énergies : pompes à chaleur, climatisation, chauffe-eaux thermodynamiques.",
};

const placeholders = services.flatMap((service) =>
  Array.from({ length: 2 }).map((_, i) => ({
    key: `${service.slug}-${i}`,
    label: service.shortName,
  })),
);

export default function RealisationsPage() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="Réalisations"
          title="Nos derniers chantiers"
          description="Cette galerie sera bientôt complétée avec des photos de nos installations. Revenez prochainement pour découvrir nos réalisations."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((item) => (
            <div
              key={item.key}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] text-ink/40"
            >
              <ImageIcon size={32} aria-hidden="true" />
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs">Photo à venir</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
