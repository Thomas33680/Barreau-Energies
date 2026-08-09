"use client";

import { FormEvent, useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { siteConfig, services } from "@/lib/site-config";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzeppkyg";

const inputClasses =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/40 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState(services[0]?.shortName ?? "");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    if (honeypot) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nom: name,
          ville: location,
          service,
          note: `${rating}/5`,
          avis: quote,
          _subject: "Nouvel avis client, Barreau Énergies",
        }),
      });

      let payload: { errors?: { message: string }[] } | null = null;
      try {
        payload = await response.json();
      } catch {
        // réponse non JSON, on ignore
      }

      if (response.ok) {
        setStatus("sent");
      } else {
        const detail =
          payload?.errors && payload.errors.length
            ? payload.errors.map((err) => err.message).join(", ")
            : `Code ${response.status}`;
        setError(detail);
        setStatus("error");
      }
    } catch {
      setError("Connexion impossible (réseau ou blocage navigateur).");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 p-8 text-center">
        <CheckCircle2 size={28} className="text-brand-green" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-ink/75">
          Merci {name.split(" ")[0] || ""} ! Votre avis a bien été transmis, il
          sera ajouté sur cette page prochainement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 text-left">
      {/* Piège à bots : invisible pour un humain, rempli par les bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
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
          Ville
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClasses}
            placeholder="Le Mans"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Service concerné
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={inputClasses}
        >
          {services.map((s) => (
            <option key={s.slug} value={s.shortName}>
              {s.shortName}
            </option>
          ))}
          <option value="Autre">Autre</option>
        </select>
      </label>

      <div className="flex flex-col gap-2 text-sm font-medium text-ink">
        Note
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`${value} sur 5 étoiles`}
                className="cursor-pointer p-1 text-brand-orange"
              >
                <Star size={22} fill={value <= rating ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Votre avis
        <textarea
          required
          rows={4}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className={inputClasses}
          placeholder="Décrivez votre expérience avec Barreau Énergies..."
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green/90 disabled:cursor-default disabled:opacity-60"
      >
        {status === "sending" ? "Envoi..." : "Envoyer mon avis"}
      </button>

      {status === "error" && (
        <p className="text-xs leading-relaxed text-red-600">
          L&apos;envoi a échoué{error ? ` : ${error}` : ""}. Vous pouvez aussi
          nous écrire directement à{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
