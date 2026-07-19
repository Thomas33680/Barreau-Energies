"use client";

import { motion } from "framer-motion";
import { MapPin, Home } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const pulseRings = [0, 1, 2];

export function RadiusMap() {
  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-ink/[0.03]">
      {/* radar pulse rings emanating from Le Mans */}
      {pulseRings.map((i) => (
        <motion.span
          key={i}
          className="absolute h-[70%] w-[70%] rounded-full border-2 border-brand-green/50"
          initial={{ scale: 0.3, opacity: 0.6 }}
          animate={{ scale: 1.15, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.3,
          }}
        />
      ))}

      {/* static reference circles */}
      <div className="absolute h-[92%] w-[92%] rounded-full border border-ink/10" />
      <div className="absolute h-[70%] w-[70%] rounded-full border border-dashed border-brand-green/40" />
      <div className="absolute h-[38%] w-[38%] rounded-full border border-ink/10" />

      <span className="absolute right-[6%] top-1/2 -translate-y-1/2 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-green shadow-sm">
        50 km
      </span>

      {/* Parigné-l'Évêque marker (siège), offset from center */}
      <div className="absolute left-[30%] top-[64%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-md">
          <Home size={14} aria-hidden="true" />
        </span>
        <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-ink/70 shadow-sm">
          Siège — {siteConfig.address.line}
        </span>
      </div>

      {/* Le Mans marker, center */}
      <div className="relative flex flex-col items-center gap-2 rounded-full bg-ink px-6 py-4 text-white shadow-lg">
        <MapPin size={20} className="text-brand-green" aria-hidden="true" />
        <span className="text-sm font-semibold">Le Mans</span>
        <span className="text-xs text-white/60">rayon d&apos;intervention</span>
      </div>
    </div>
  );
}
