"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/content/company";
import { divisions } from "@/content/divisions";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const phone = String(form.get("phone") ?? "");
    const email = String(form.get("email") ?? "");
    const division = String(form.get("division") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = `Demande de devis${division ? ` — ${division}` : ""} — ${name}`;
    const body = [
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Email : ${email}`,
      division && `Division concernée : ${division}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="name" required />
        <Field label="Téléphone" name="phone" type="tel" required />
      </div>
      <Field label="Email" name="email" type="email" required />
      <div>
        <label htmlFor="division" className="mb-1.5 block text-sm font-semibold text-ink">
          Division concernée
        </label>
        <select
          id="division"
          name="division"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
        >
          <option value="">Je ne sais pas encore</option>
          {divisions.map((d) => (
            <option key={d.slug} value={`${d.name} — ${d.title}`}>
              {d.name} — {d.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
          Votre besoin
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
          placeholder="Type de logement, équipement actuel, urgence, disponibilités..."
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:w-auto"
      >
        Envoyer ma demande
      </button>
      <p className="text-xs text-ink-soft">
        En validant, votre messagerie s&rsquo;ouvre avec votre demande pré-remplie à destination de{" "}
        {company.email}.
      </p>
      {sent && (
        <p className="rounded-xl bg-air-light px-4 py-3 text-sm font-medium text-air">
          Votre messagerie devrait s&rsquo;être ouverte. Si ce n&rsquo;est pas le cas, écrivez-nous directement à{" "}
          {company.email}.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none"
      />
    </div>
  );
}
