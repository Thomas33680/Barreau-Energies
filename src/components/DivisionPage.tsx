import Image, { type StaticImageData } from "next/image";
import type { Division } from "@/content/divisions";
import { Container, SectionHeading, Button, Eyebrow, PhaseBadge, divisionText, divisionBg, divisionSolid } from "@/components/ui";
import { divisions } from "@/content/divisions";

export function DivisionPage({
  division,
  hero,
  gallery,
}: {
  division: Division;
  hero: StaticImageData;
  gallery: { src: StaticImageData; alt: string }[];
}) {
  const isLive = division.phase === "now";
  const related = divisions.filter((d) => d.slug !== division.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section>
        <Container className="grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold ${divisionBg(
                  division.color
                )} ${divisionText(division.color)}`}
              >
                {division.name.slice(0, 1)}
              </span>
              <Eyebrow>
                {division.name} — {division.title}
              </Eyebrow>
              <PhaseBadge phase={division.phase} />
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {division.mission}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              {division.summary}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              {isLive ? (
                <Button href="/contact" variant="secondary">
                  Demander un devis
                </Button>
              ) : (
                <Button href="/contact" variant="secondary">
                  Être informé du lancement
                </Button>
              )}
              <Button href="/a-propos" variant="ghost">
                Notre méthode
              </Button>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-sunken shadow-2xl shadow-ink/10">
            <Image
              src={hero}
              alt={`Installation ${division.name} par Barreau Énergies`}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      {!isLive && (
        <section className="border-y border-border bg-energy-light/60">
          <Container className="py-5">
            <p className="text-sm font-medium text-ink">
              <span className="font-semibold text-energy">
                {division.phase === "next" ? "Bientôt disponible." : "Sur la feuille de route."}
              </span>{" "}
              Cette offre fait partie de notre roadmap 2026-2030 et sera lancée après un pilote encadré
              (protocole, prix, fournisseurs qualifiés). Contactez-nous pour être informé de son ouverture.
            </p>
          </Container>
        </section>
      )}

      {/* Features */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Périmètre" title={`Ce que couvre ${division.name}`} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {division.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5"
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${divisionSolid(division.color)}`}
                />
                <span className={`text-sm font-medium text-ink`}>{feature}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Offer tiers */}
      {division.offer && (
        <section className="bg-surface py-20">
          <Container>
            <SectionHeading
              eyebrow={`Offre ${isLive ? "phare" : "à venir"}`}
              title={division.offer.name}
              description={division.offer.pitch}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {division.offer.tiers.map((tier) => (
                <div
                  key={tier.level}
                  className="flex flex-col rounded-2xl border border-border bg-paper p-6"
                >
                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${divisionBg(
                      division.color
                    )} ${divisionText(division.color)}`}
                  >
                    {tier.level}
                  </span>
                  <p className="mt-4 font-display text-base font-bold text-ink">
                    {tier.promise}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{tier.content}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Catalog */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Catalogue" title="Services et statut" />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <table className="w-full border-collapse bg-surface text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-sunken text-xs uppercase tracking-wide text-ink-soft">
                  <th className="px-5 py-3 font-semibold">Code</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {division.catalog.map((service) => (
                  <tr key={service.code} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-mono text-xs text-ink-soft">
                      {service.code}
                    </td>
                    <td className="px-5 py-3 font-medium text-ink">{service.name}</td>
                    <td className="px-5 py-3 text-ink-muted">{service.type}</td>
                    <td className="px-5 py-3">
                      <PhaseBadge phase={service.phase} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="bg-surface py-20">
          <Container>
            <SectionHeading eyebrow="En situation" title="Chantiers récents" />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((item, i) => (
                <div key={i} className="aspect-[4/5] overflow-hidden rounded-2xl bg-surface-sunken">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related divisions */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Aller plus loin" title="Les autres divisions Barreau" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {related.map((d) => (
              <a
                key={d.slug}
                href={`/${d.slug}`}
                className="group rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className={`text-xs font-bold uppercase tracking-wide ${divisionText(d.color)}`}>
                  {d.name}
                </span>
                <p className="mt-1 font-display text-lg font-bold text-ink">{d.title}</p>
                <p className="mt-2 text-sm text-ink-muted">{d.mission}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-ink px-8 py-16 text-center text-paper sm:px-16">
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {isLive
                ? `Un projet ${division.title.toLowerCase()} ?`
                : "Envie d'être parmi les premiers ?"}
            </h2>
            <p className="max-w-xl text-lg text-paper/70">
              {isLive
                ? "Décrivez votre logement et vos besoins : nous revenons vers vous avec un diagnostic clair."
                : "Laissez-nous vos coordonnées pour être recontacté dès l'ouverture du pilote."}
            </p>
            <Button href="/contact" variant="secondary">
              {isLive ? "Demander un devis" : "Être informé du lancement"}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
