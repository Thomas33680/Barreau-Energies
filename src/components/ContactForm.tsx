"use client";

import { FormEvent, useState } from "react";
import { siteConfig, services } from "@/lib/site-config";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0]?.shortName ?? "");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Service concerné : ${service}`,
      "",
      message,
    ].join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Demande de devis, ${name || "site web"}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  const inputClasses =
    "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink/40 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
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
          <option value="Autre">Autre / je ne sais pas</option>
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Votre projet
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClasses}
          placeholder="Décrivez votre projet, votre logement, vos disponibilités..."
        />
      </label>

      <button
        type="submit"
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-green/90"
      >
        Envoyer ma demande
      </button>
      <p className="text-xs text-ink/50">
        L&apos;envoi ouvre votre logiciel de messagerie avec les informations
        pré-remplies, à destination de {siteConfig.email}.
      </p>
    </form>
  );
}
