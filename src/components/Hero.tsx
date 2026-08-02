"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { ScrollHero } from "@/components/motion/ScrollHero";
import { StaggerText } from "@/components/motion/StaggerText";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <ScrollHero className="relative overflow-hidden bg-ink text-white">
      <HeroBackground />

      <Container className="relative grid gap-12 py-24 sm:py-32 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10">
        <div className="flex flex-col items-start gap-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-green"
          >
            Chauffage · Climatisation · Eau chaude · Traitement de l&apos;eau
          </motion.p>

          <StaggerText
            text="Votre expert en confort thermique."
            className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="max-w-xl text-lg leading-relaxed text-white/70"
          >
            Des solutions de chauffage, climatisation, eau chaude
            sanitaire et traitement de l&apos;eau adaptées à vos besoins,
            installées et entretenues par une entreprise locale et réactive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button href="/contact" variant="primary" pulse>
              Demander un devis
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={siteConfig.phoneHref} variant="ghost">
              {siteConfig.phone}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40"
        >
          <Image
            src="/hero-pompe-a-chaleur.jpg"
            alt="Pompe à chaleur installée sur une maison individuelle"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </Container>
    </ScrollHero>
  );
}
