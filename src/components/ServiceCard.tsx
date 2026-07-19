"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Snowflake, Droplets, ArrowRight, LucideIcon } from "lucide-react";
import { Service } from "@/lib/site-config";

const icons: Record<Service["slug"], LucideIcon> = {
  "pompes-a-chaleur": Flame,
  climatisation: Snowflake,
  "chauffe-eau-thermodynamique": Droplets,
};

const colorClasses: Record<Service["color"], { bg: string; text: string }> = {
  blue: { bg: "bg-brand-blue/10", text: "text-brand-blue" },
  green: { bg: "bg-brand-green/10", text: "text-brand-green" },
  orange: { bg: "bg-brand-orange/10", text: "text-brand-orange" },
};

const MotionLink = motion.create(Link);

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.slug];
  const colors = colorClasses[service.color];

  return (
    <MotionLink
      href={`/services#${service.slug}`}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex cursor-pointer flex-col rounded-2xl border border-ink/10 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
    >
      <motion.span
        whileHover={{ rotate: 8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
      >
        <Icon size={28} strokeWidth={2} aria-hidden="true" />
      </motion.span>
      <h3 className="mt-6 text-xl font-bold text-ink">{service.shortName}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
        {service.summary}
      </p>
      <span
        className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${colors.text}`}
      >
        En savoir plus
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </MotionLink>
  );
}
