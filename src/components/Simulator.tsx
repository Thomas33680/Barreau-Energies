"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Flame, Snowflake, Droplets } from "lucide-react";
import { Button } from "@/components/Button";
import { simulatorPricing } from "@/lib/site-config";

type Mode = "air-eau" | "air-air" | "cet";

const modes = [
  { id: "air-air" as Mode, label: "Pompe à chaleur air/air", shortLabel: "Air/air", icon: Snowflake, color: "#0066b3" },
  { id: "air-eau" as Mode, label: "Pompe à chaleur air/eau", shortLabel: "Air/eau", icon: Flame, color: "#67b814" },
  { id: "cet" as Mode, label: "Chauffe-eau thermodynamique", shortLabel: "Chauffe-eau", icon: Droplets, color: "#ff7a00" },
] as const;

const insulationLevels = [
  { id: "bonne", label: "Bonne (récente, RT2012/BBC)", coef: 65 },
  { id: "moyenne", label: "Moyenne (années 2000)", coef: 90 },
  { id: "faible", label: "Ancienne / à rénover", coef: 130 },
] as const;

const occupantsLevels = [
  { id: "1-2", label: "1 à 2 personnes", volume: 150 as const },
  { id: "3-4", label: "3 à 4 personnes", volume: 200 as const },
  { id: "5-6", label: "5 à 6 personnes", volume: 250 as const },
  { id: "7+", label: "7 personnes et +", volume: 300 as const },
] as const;

function formatEuro(n: number) {
  return `${Math.round(n / 100) * 100} €`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function AnimatedNumber({ value, className }: { value: number | string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function GaugeRing({ percent, color }: { percent: number; color: string }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference;

  return (
    <svg width={168} height={168} viewBox="0 0 168 168" className="-rotate-90">
      <circle
        cx={84}
        cy={84}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={12}
        className="text-ink/10"
      />
      <motion.circle
        cx={84}
        cy={84}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function Simulator() {
  const [mode, setMode] = useState<Mode>("air-air");
  const [surface, setSurface] = useState(90);
  const [insulation, setInsulation] = useState<(typeof insulationLevels)[number]["id"]>(
    "moyenne",
  );
  const [occupants, setOccupants] = useState<(typeof occupantsLevels)[number]["id"]>("3-4");

  const activeMode = modes.find((m) => m.id === mode)!;
  const insulationLevel = insulationLevels.find((l) => l.id === insulation)!;
  const occupantsLevel = occupantsLevels.find((l) => l.id === occupants)!;

  const power = useMemo(() => {
    const raw = (surface * insulationLevel.coef) / 1000;
    return Math.round(raw * 2) / 2;
  }, [surface, insulationLevel]);

  const isPac = mode === "air-eau" || mode === "air-air";
  const gaugePercent = isPac ? (power / 18) * 100 : (occupantsLevel.volume / 300) * 100;
  const gaugeValue = isPac ? power : occupantsLevel.volume;
  const gaugeUnit = isPac ? "kW" : "L";
  const gaugeCaption = isPac ? "puissance estimée" : "volume conseillé";

  const priceRange = useMemo(() => {
    if (mode === "air-eau") {
      const { minPerKw, maxPerKw } = simulatorPricing.airEau;
      return { min: power * minPerKw, max: power * maxPerKw };
    }
    if (mode === "air-air") {
      const { minPerKw, maxPerKw } = simulatorPricing.airAir;
      return { min: power * minPerKw, max: power * maxPerKw };
    }
    return simulatorPricing.cet[occupantsLevel.volume];
  }, [mode, power, occupantsLevel]);

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex rounded-full border border-ink/10 bg-ink/[0.03] p-1">
        {modes.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            className="relative flex-1 cursor-pointer whitespace-nowrap rounded-full px-1.5 py-2 text-[11px] font-semibold transition-colors duration-200 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            {mode === tab.id && (
              <motion.span
                layoutId="simulator-tab"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 ${
                mode === tab.id ? "text-white" : "text-ink/60"
              }`}
            >
              <tab.icon size={15} aria-hidden="true" />
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <AnimatePresence mode="wait">
          {isPac ? (
            <motion.div
              key="pac"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="surface" className="text-sm font-semibold text-ink">
                    Surface à chauffer
                  </label>
                  <span className="text-sm font-bold text-brand-green">{surface} m²</span>
                </div>
                <input
                  id="surface"
                  type="range"
                  min={20}
                  max={250}
                  step={5}
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="mt-3 w-full cursor-pointer accent-brand-green"
                />
                <div className="mt-1 flex justify-between text-xs text-ink/40">
                  <span>20 m²</span>
                  <span>250 m²</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">Niveau d&apos;isolation</p>
                <div className="mt-3 flex flex-col gap-2">
                  {insulationLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setInsulation(level.id)}
                      className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                        insulation === level.id
                          ? "border-brand-green bg-brand-green/10 text-ink"
                          : "border-ink/10 text-ink/60 hover:border-ink/20"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cet"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div>
                <p className="text-sm font-semibold text-ink">Composition du foyer</p>
                <div className="mt-3 flex flex-col gap-2">
                  {occupantsLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setOccupants(level.id)}
                      className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                        occupants === level.id
                          ? "border-brand-orange bg-brand-orange/10 text-ink"
                          : "border-ink/10 text-ink/60 hover:border-ink/20"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-ink/[0.03] p-8 text-center">
          <div className="relative flex items-center justify-center">
            <GaugeRing percent={gaugePercent} color={activeMode.color} />
            <div className="absolute flex flex-col items-center">
              <span className="flex items-baseline gap-1 text-4xl font-extrabold text-ink">
                <AnimatedNumber value={gaugeValue} />
                <span className="text-lg font-bold text-ink/50">{gaugeUnit}</span>
              </span>
              <span className="mt-1 text-xs text-ink/50">{gaugeCaption}</span>
            </div>
          </div>

          <div className="w-full rounded-xl border border-ink/10 bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Budget estimé (haut de gamme, pose incluse)
            </p>
            <p className="mt-1 text-xl font-extrabold text-ink">
              <AnimatedNumber value={`${formatEuro(priceRange.min)} – ${formatEuro(priceRange.max)}`} />
            </p>
          </div>

          <p className="max-w-xs text-xs leading-relaxed text-ink/50">
            Estimation indicative basée sur des ratios et prix moyens
            constatés pour du matériel haut de gamme. Le tarif exact dépend
            d&apos;une étude réalisée à votre domicile.
          </p>

          <Button href="/contact" variant="primary">
            Demander un devis personnalisé
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
