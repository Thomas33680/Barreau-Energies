"use client";

import { motion } from "framer-motion";
import { TrendingDown, Zap } from "lucide-react";
import { Service } from "@/lib/site-config";

const colorMap: Record<Service["color"], { bar: string; text: string; ring: string }> = {
  blue: { bar: "bg-brand-blue", text: "text-brand-blue", ring: "ring-brand-blue/20" },
  green: { bar: "bg-brand-green", text: "text-brand-green", ring: "ring-brand-green/20" },
  orange: { bar: "bg-brand-orange", text: "text-brand-orange", ring: "ring-brand-orange/20" },
  teal: { bar: "bg-brand-teal", text: "text-brand-teal", ring: "ring-brand-teal/20" },
  amber: { bar: "bg-brand-amber", text: "text-brand-amber", ring: "ring-brand-amber/20" },
};

export function EnergySavingsVisual({
  factor,
  label,
  color,
  description,
}: {
  factor: number;
  label: string;
  color: Service["color"];
  description: string;
}) {
  const colors = colorMap[color];
  const savedPercent = Math.round((1 - 1 / factor) * 100);
  const pacWidth = Math.round((1 / factor) * 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10 sm:p-8`}
    >
      <div className="flex items-center gap-2">
        <TrendingDown size={20} className={colors.text} aria-hidden="true" />
        <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
          Économies d&apos;énergie
        </h3>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <div className={`flex shrink-0 flex-col items-center justify-center rounded-2xl ring-4 ${colors.ring} p-6`}>
          <span className={`text-4xl font-extrabold ${colors.text}`}>-{savedPercent}%</span>
          <span className="mt-1 text-center text-xs text-ink/50">
            de consommation
            <br />
            vs. chauffage électrique classique
          </span>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-ink/60">
              <span className="flex items-center gap-1.5">
                <Zap size={12} aria-hidden="true" /> Chauffage électrique classique
              </span>
              <span>100 %</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-ink/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-ink/30"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-ink/60">
              <span>{label}</span>
              <span className={`font-bold ${colors.text}`}>{pacWidth} %</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-ink/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pacWidth}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${colors.bar}`}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink/70">{description}</p>
    </motion.div>
  );
}
