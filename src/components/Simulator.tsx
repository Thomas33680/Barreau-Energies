"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Flame, Snowflake, Droplets, Filter, Zap, CheckCircle2 } from "lucide-react";
import { siteConfig, simulatorPricing } from "@/lib/site-config";

type Mode = "air-eau" | "air-air" | "cet" | "chauffe-eau-electrique" | "adoucisseur";

const modes = [
  { id: "air-air" as Mode, label: "Pompe à chaleur air/air", shortLabel: "Air/air", icon: Snowflake, color: "#0066b3" },
  { id: "air-eau" as Mode, label: "Pompe à chaleur air/eau", shortLabel: "Air/eau", icon: Flame, color: "#67b814" },
  { id: "cet" as Mode, label: "Chauffe-eau thermodynamique", shortLabel: "Chauffe-eau", icon: Droplets, color: "#ff7a00" },
  { id: "chauffe-eau-electrique" as Mode, label: "Chauffe-eau électrique", shortLabel: "Élec.", icon: Zap, color: "#f59e0b" },
  { id: "adoucisseur" as Mode, label: "Traitement de l'eau", shortLabel: "Adoucisseur", icon: Filter, color: "#0d9488" },
] as const;

const housingTypes = [
  { id: "maison", label: "Maison" },
  { id: "appartement", label: "Appartement" },
] as const;

const heatingTypes = [
  { id: "electrique", label: "Électrique" },
  { id: "gaz", label: "Gaz" },
  { id: "fioul", label: "Fioul" },
  { id: "autre", label: "Autre / aucun" },
] as const;

const constructionPeriods = [
  { id: "apres-2012", label: "Après 2012 (RT2012/RE2020)", coef: 65 },
  { id: "1980-2012", label: "Entre 1980 et 2012", coef: 90 },
  { id: "avant-1980", label: "Avant 1980", coef: 130 },
] as const;

const occupantsLevels = [
  { id: "1-2", label: "1 à 2 personnes", volume: 150 as const, resinLiters: 10 as const },
  { id: "3-4", label: "3 à 4 personnes", volume: 200 as const, resinLiters: 20 as const },
  { id: "5-6", label: "5 à 6 personnes", volume: 250 as const, resinLiters: 25 as const },
  { id: "7+", label: "7 personnes et +", volume: 300 as const, resinLiters: 30 as const },
] as const;

const bathroomsLevels = [
  { id: "1", label: "1 salle de bain" },
  { id: "2", label: "2 salles de bain" },
  { id: "3+", label: "3 salles de bain ou plus" },
] as const;

const modeDurations: Record<Mode, string> = {
  "air-air": "Une demi-journée à une journée",
  "air-eau": "1 à 2 jours",
  cet: "Une demi-journée",
  "chauffe-eau-electrique": "Quelques heures à une demi-journée",
  adoucisseur: "Une demi-journée",
};

const primaryButtonClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green/90";

const inputClasses =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/40 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30";

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
  const [step, setStep] = useState<"form" | "result">("form");
  const [mode, setMode] = useState<Mode>("air-air");
  const [housing, setHousing] = useState<(typeof housingTypes)[number]["id"]>("maison");
  const [postalCode, setPostalCode] = useState("");
  const [surface, setSurface] = useState(90);
  const [construction, setConstruction] = useState<(typeof constructionPeriods)[number]["id"]>(
    "1980-2012",
  );
  const [heating, setHeating] = useState<(typeof heatingTypes)[number]["id"]>("electrique");
  const [occupants, setOccupants] = useState<(typeof occupantsLevels)[number]["id"]>("3-4");
  const [bathrooms, setBathrooms] = useState<(typeof bathroomsLevels)[number]["id"]>("1");

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const activeMode = modes.find((m) => m.id === mode)!;
  const constructionPeriod = constructionPeriods.find((c) => c.id === construction)!;
  const occupantsLevel = occupantsLevels.find((l) => l.id === occupants)!;

  const power = useMemo(() => {
    const raw = (surface * constructionPeriod.coef) / 1000;
    return Math.round(raw * 2) / 2;
  }, [surface, constructionPeriod]);

  const isPac = mode === "air-eau" || mode === "air-air";
  const isAdoucisseur = mode === "adoucisseur";
  const isCet = mode === "cet";
  const isChauffeEauElectrique = mode === "chauffe-eau-electrique";
  const isHotWater = isCet || isChauffeEauElectrique;

  const gaugePercent = isPac
    ? (power / 18) * 100
    : isAdoucisseur
      ? (occupantsLevel.resinLiters / 30) * 100
      : (occupantsLevel.volume / 300) * 100;
  const gaugeValue = isPac ? power : isAdoucisseur ? occupantsLevel.resinLiters : occupantsLevel.volume;
  const gaugeUnit = isPac ? "kW" : "L";
  const gaugeCaption = isPac
    ? "puissance estimée"
    : isAdoucisseur
      ? "capacité résine conseillée"
      : "volume conseillé";

  const priceRange = useMemo(() => {
    if (mode === "air-eau") {
      const { minPerKw, maxPerKw } = simulatorPricing.airEau;
      return { min: power * minPerKw, max: power * maxPerKw };
    }
    if (mode === "air-air") {
      const { minPerKw, maxPerKw } = simulatorPricing.airAir;
      return { min: power * minPerKw, max: power * maxPerKw };
    }
    if (mode === "adoucisseur") {
      return simulatorPricing.adoucisseur[occupantsLevel.resinLiters];
    }
    if (mode === "chauffe-eau-electrique") {
      return simulatorPricing.chauffeEauElectrique[occupantsLevel.volume];
    }
    return simulatorPricing.cet[occupantsLevel.volume];
  }, [mode, power, occupantsLevel]);

  function handleModeChange(next: Mode) {
    setMode(next);
    setStep("form");
    setShowLeadForm(false);
    setSubmitted(false);
  }

  function handleSubmitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lines = [
      `Solution recommandée : ${activeMode.label}`,
      `Type de logement : ${housingTypes.find((h) => h.id === housing)?.label}`,
      postalCode ? `Code postal : ${postalCode}` : null,
      isPac ? `Surface à chauffer : ${surface} m²` : null,
      isPac ? `Année de construction : ${constructionPeriod.label}` : null,
      isPac ? `Chauffage actuel : ${heatingTypes.find((h) => h.id === heating)?.label}` : null,
      isHotWater || isAdoucisseur ? `Composition du foyer : ${occupantsLevel.label}` : null,
      isHotWater ? `Salles de bain : ${bathroomsLevels.find((b) => b.id === bathrooms)?.label}` : null,
      "",
      `${gaugeCaption} : ${gaugeValue} ${gaugeUnit}`,
      `Budget estimatif : à partir de ${formatEuro(priceRange.min)}`,
      `Durée du chantier estimée : ${modeDurations[mode]}`,
      "",
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Email : ${email}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Simulateur, ${activeMode.label}, ${name || "site web"}`,
    )}&body=${encodeURIComponent(lines)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-ink/10 bg-ink/[0.03] p-1.5">
        {modes.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleModeChange(tab.id)}
            className="relative shrink-0 grow-0 basis-[calc((100%-0.75rem)/3)] cursor-pointer whitespace-nowrap rounded-xl px-1.5 py-2.5 text-center text-[11px] font-semibold transition-colors duration-200 sm:px-3 sm:text-sm"
          >
            {mode === tab.id && (
              <motion.span
                layoutId="simulator-tab"
                className="absolute inset-0 rounded-xl bg-ink"
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

      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-ink">Type de logement</p>
                <div className="mt-3 flex gap-2">
                  {housingTypes.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setHousing(option.id)}
                      className={`flex-1 cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        housing === option.id
                          ? "border-brand-green bg-brand-green/10 text-ink"
                          : "border-ink/10 text-ink/60 hover:border-ink/20"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="postal-code" className="text-sm font-semibold text-ink">
                  Code postal
                </label>
                <input
                  id="postal-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="72250"
                  className={`mt-3 ${inputClasses}`}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isPac ? (
                <motion.div
                  key="pac"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 flex flex-col gap-8"
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
                    <p className="text-sm font-semibold text-ink">Année de construction</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {constructionPeriods.map((level) => (
                        <button
                          key={level.id}
                          type="button"
                          onClick={() => setConstruction(level.id)}
                          className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                            construction === level.id
                              ? "border-brand-green bg-brand-green/10 text-ink"
                              : "border-ink/10 text-ink/60 hover:border-ink/20"
                          }`}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-ink">Chauffage actuel</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {heatingTypes.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setHeating(option.id)}
                          className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                            heating === option.id
                              ? "border-brand-green bg-brand-green/10 text-ink"
                              : "border-ink/10 text-ink/60 hover:border-ink/20"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : isHotWater ? (
                <motion.div
                  key="hot-water"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 flex flex-col gap-8"
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
                              ? isCet
                                ? "border-brand-orange bg-brand-orange/10 text-ink"
                                : "border-brand-amber bg-brand-amber/10 text-ink"
                              : "border-ink/10 text-ink/60 hover:border-ink/20"
                          }`}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-ink">Nombre de salles de bains</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {bathroomsLevels.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setBathrooms(option.id)}
                          className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-xs font-medium transition-colors duration-200 sm:text-sm ${
                            bathrooms === option.id
                              ? isCet
                                ? "border-brand-orange bg-brand-orange/10 text-ink"
                                : "border-brand-amber bg-brand-amber/10 text-ink"
                              : "border-ink/10 text-ink/60 hover:border-ink/20"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="adoucisseur"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 flex flex-col gap-8"
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
                              ? "border-brand-teal bg-brand-teal/10 text-ink"
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

            <button
              type="button"
              onClick={() => setStep("result")}
              className={`${primaryButtonClasses} mt-10 w-full sm:w-auto`}
            >
              Voir mon estimation
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Votre projet
                </p>
                <h3 className="mt-2 text-xl font-bold text-ink">Solution recommandée</h3>
                <p className="mt-1 text-lg font-semibold text-brand-green">{activeMode.label}</p>

                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-ink/50">Type de logement</dt>
                    <dd className="font-medium text-ink">
                      {housingTypes.find((h) => h.id === housing)?.label}
                    </dd>
                  </div>
                  {isPac && (
                    <>
                      <div>
                        <dt className="text-ink/50">Surface</dt>
                        <dd className="font-medium text-ink">{surface} m²</dd>
                      </div>
                      <div>
                        <dt className="text-ink/50">Construction</dt>
                        <dd className="font-medium text-ink">{constructionPeriod.label}</dd>
                      </div>
                      <div>
                        <dt className="text-ink/50">Chauffage actuel</dt>
                        <dd className="font-medium text-ink">
                          {heatingTypes.find((h) => h.id === heating)?.label}
                        </dd>
                      </div>
                    </>
                  )}
                  {(isHotWater || isAdoucisseur) && (
                    <div>
                      <dt className="text-ink/50">Foyer</dt>
                      <dd className="font-medium text-ink">{occupantsLevel.label}</dd>
                    </div>
                  )}
                  {isHotWater && (
                    <div>
                      <dt className="text-ink/50">Salles de bain</dt>
                      <dd className="font-medium text-ink">
                        {bathroomsLevels.find((b) => b.id === bathrooms)?.label}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-ink/50">Durée du chantier</dt>
                    <dd className="font-medium text-ink">{modeDurations[mode]}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="mt-6 cursor-pointer text-sm font-semibold text-ink/50 underline underline-offset-4 hover:text-ink"
                >
                  Modifier mes réponses
                </button>
              </div>

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
                    Estimation pour une installation complète avec matériel de
                    qualité et pose professionnelle
                  </p>
                  <p className="mt-2 text-xs text-ink/50">À partir de</p>
                  <p className="text-xl font-extrabold text-ink">
                    <AnimatedNumber value={formatEuro(priceRange.min)} />
                  </p>
                </div>

                <p className="max-w-xs text-xs leading-relaxed text-ink/50">
                  Cette estimation comprend le matériel, la pose standard, les
                  raccordements courants et la mise en service. Elle doit être
                  confirmée après une visite technique.
                </p>

                {!showLeadForm && !submitted && (
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(true)}
                    className={primaryButtonClasses}
                  >
                    Recevoir mon étude gratuite
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {showLeadForm && !submitted && (
              <motion.form
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmitLead}
                className="mt-8 grid gap-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 sm:grid-cols-3"
              >
                <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                  Nom
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                    placeholder="Votre nom"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                  Téléphone
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClasses}
                    placeholder="06 12 34 56 78"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-ink">
                  Email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                    placeholder="vous@email.fr"
                  />
                </label>
                <button type="submit" className={`${primaryButtonClasses} sm:col-span-3`}>
                  Recevoir mon étude personnalisée sous 24h
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className="text-xs text-ink/50 sm:col-span-3">
                  L&apos;envoi ouvre votre logiciel de messagerie avec les informations
                  pré-remplies, à destination de {siteConfig.email}.
                </p>
              </motion.form>
            )}

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 flex items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 p-6 text-sm text-ink"
              >
                <CheckCircle2 size={20} className="shrink-0 text-brand-green" aria-hidden="true" />
                <p>
                  Merci ! Votre projet a été pré-dimensionné. Finalisez l&apos;envoi
                  depuis votre messagerie pour que nous puissions vous recontacter
                  rapidement.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
