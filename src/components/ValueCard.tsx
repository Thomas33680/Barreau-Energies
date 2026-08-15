"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  MapPin,
  FileText,
  Wrench,
  Zap,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "Devis clair et transparent": FileText,
  "Installation soignée": Wrench,
  "Réactivité": Zap,
  "Entreprise locale": MapPin,
  "Accompagnement personnalisé": HeartHandshake,
  "Matériel reconnu": Award,
};

export function ValueCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const Icon = icons[name] ?? ShieldCheck;

  return (
    <motion.div
      whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <motion.span
        whileHover={{ scale: 1.12 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green"
      >
        <Icon size={22} aria-hidden="true" />
      </motion.span>
      <h3 className="mt-4 text-base font-bold text-white">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
    </motion.div>
  );
}
