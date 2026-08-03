"use client";

import { motion } from "framer-motion";
import { TrendingDown, Zap, ArrowRight } from "lucide-react";
import { Service } from "@/lib/site-config";

const colorMap: Record<Service["color"], { text: string; bg: string; ring: string }> = {
  blue: { text: "text-brand-blue", bg: "bg-brand-blue/10", ring: "ring-brand-blue/30" },
  green: { text: "text-brand-green", bg: "bg-brand-green/10", ring: "ring-brand-green/30" },
  orange: { text: "text-brand-orange", bg: "bg-brand-orange/10", ring: "ring-brand-orange/30" },
  teal: { text: "text-brand-teal", bg: "bg-brand-teal/10", ring: "ring-brand-teal/30" },
  amber: { text: "text-brand-amber", bg: "bg-brand-amber/10", ring: "ring-brand-amber/30" },
};

export function EnergySavingsVisual({
  reference,
  classicCost,
  solutionCost,
  label,
  color,
  description,
  tenYearSavings,
}: {
  reference: string;
  classicCost: number;
  solutionCost: number;
  label: string;
  color: Service["color"];
  description: string;
  tenYearSavings?: { headline: string; note: string };
}) {
  const colors = colorMap[color];
  const savedAmount = classicCost - solutionCost;
  const savedPercent = Math.round((savedAmount / classicCost) * 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10 sm:p-8"
    >
      <div className="flex items-center gap-2">
        <TrendingDown size={20} className={colors.text} aria-hidden="true" />
        <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
          Économies d&apos;énergie estimées
        </h3>
      </div>
      <p className="mt-1.5 text-xs text-ink/50">{reference}</p>

      {tenYearSavings && (
        <div className={`mt-5 rounded-2xl px-5 py-4 text-center ${colors.bg}`}>
          <p className={`text-2xl font-extrabold sm:text-3xl ${colors.text}`}>
            {tenYearSavings.headline}
          </p>
          <p className="mt-1 text-xs text-ink/45">{tenYearSavings.note}</p>
        </div>
      )}

      <div className="mt-6 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 text-center">
          <span className="flex items-center justify-center gap-1.5 text-xs font-medium text-ink/50">
            <Zap size={12} aria-hidden="true" />
            Chauffage électrique classique
          </span>
          <p className="mt-2 text-2xl font-extrabold text-ink/70">
            {classicCost} €<span className="text-sm font-medium text-ink/40"> /an</span>
          </p>
        </div>

        <ArrowRight
          size={20}
          className="mx-auto hidden shrink-0 rotate-90 text-ink/20 sm:block sm:rotate-0"
          aria-hidden="true"
        />

        <div className={`rounded-2xl border border-transparent bg-white p-5 text-center ring-2 ${colors.ring}`}>
          <span className="text-xs font-medium text-ink/50">{label}</span>
          <p className={`mt-2 text-2xl font-extrabold ${colors.text}`}>
            {solutionCost} €<span className="text-sm font-medium text-ink/40"> /an</span>
          </p>
        </div>
      </div>

      <div className={`mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl px-4 py-3 text-center ${colors.bg}`}>
        <span className={`text-lg font-extrabold ${colors.text}`}>-{savedAmount} €/an</span>
        <span className="text-sm text-ink/60">d&apos;économies estimées (-{savedPercent} %)</span>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink/70">{description}</p>
      <p className="mt-3 text-xs text-ink/40">
        Estimation indicative basée sur un prix moyen de l&apos;électricité de
        0,25 €/kWh. Votre facture réelle dépend de votre logement, votre
        tarif et vos habitudes de consommation.
      </p>
    </motion.div>
  );
}
