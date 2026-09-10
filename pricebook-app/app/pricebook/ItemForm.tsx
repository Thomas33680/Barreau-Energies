'use client'

import { useActionState, useId, useState } from 'react'
import {
  DEFAULT_BRANDS,
  DEFAULT_CATEGORIES,
  DEFAULT_UNITS,
  VAT_RATES,
  computeMargin,
  type PricebookItem,
  type Spec,
} from '@/lib/types'
import { formatCurrency, formatPercent } from '@/lib/format'
import type { FormState } from './actions'

interface Props {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  initial?: PricebookItem
  categories: string[]
  brands: string[]
  submitLabel: string
}

const inputClass =
  'mt-1.5 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30'
const labelClass = 'block text-sm font-medium'

export function ItemForm({ action, initial, categories, brands, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {})
  const [specs, setSpecs] = useState<Spec[]>(
    initial?.specs?.length ? initial.specs : [{ label: '', value: '' }]
  )
  const [costPrice, setCostPrice] = useState(initial?.costPrice ?? 0)
  const [sellPrice, setSellPrice] = useState(initial?.sellPrice ?? 0)

  const categoryListId = useId()
  const brandListId = useId()
  const unitListId = useId()

  const categoryOptions = Array.from(new Set([...DEFAULT_CATEGORIES, ...categories])).sort((a, b) =>
    a.localeCompare(b, 'fr')
  )
  const brandOptions = Array.from(new Set([...DEFAULT_BRANDS, ...brands])).sort((a, b) => a.localeCompare(b, 'fr'))

  const margin = computeMargin(costPrice, sellPrice)

  function updateSpec(index: number, field: keyof Spec, value: string) {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  function addSpec() {
    setSpecs((prev) => [...prev, { label: '', value: '' }])
  }

  function removeSpec(index: number) {
    setSpecs((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  return (
    <form action={formAction} className="space-y-8 pb-16">
      {state.error && (
        <p className="rounded-lg bg-critical-bg px-3 py-2 text-sm text-critical-text">{state.error}</p>
      )}

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold text-foreground-secondary">Informations générales</legend>

        <div>
          <label className={labelClass} htmlFor="name">
            Désignation *
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={initial?.name}
            placeholder="Ex : PAC air/eau Daikin Altherma 3 8kW"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="reference">
              Référence
            </label>
            <input id="reference" name="reference" defaultValue={initial?.reference} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="type">
              Type
            </label>
            <select id="type" name="type" defaultValue={initial?.type ?? 'produit'} className={inputClass}>
              <option value="produit">Produit</option>
              <option value="service">Service / Main d&apos;œuvre</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="category">
              Catégorie *
            </label>
            <input
              id="category"
              name="category"
              required
              list={categoryListId}
              defaultValue={initial?.category}
              className={inputClass}
            />
            <datalist id={categoryListId}>
              {categoryOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={labelClass} htmlFor="brand">
              Marque
            </label>
            <input
              id="brand"
              name="brand"
              list={brandListId}
              defaultValue={initial?.brand}
              className={inputClass}
            />
            <datalist id={brandListId}>
              {brandOptions.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="model">
              Modèle
            </label>
            <input id="model" name="model" defaultValue={initial?.model} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="unit">
              Unité
            </label>
            <input
              id="unit"
              name="unit"
              list={unitListId}
              defaultValue={initial?.unit ?? 'pièce'}
              className={inputClass}
            />
            <datalist id={unitListId}>
              {DEFAULT_UNITS.map((u) => (
                <option key={u} value={u} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={labelClass} htmlFor="supplier">
              Fournisseur
            </label>
            <input id="supplier" name="supplier" defaultValue={initial?.supplier} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="description">
            Notes / description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={initial?.description}
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="active"
            defaultChecked={initial ? initial.active : true}
            className="h-4 w-4 rounded border-border accent-[var(--accent)]"
          />
          Article actif (visible dans le pricebook)
        </label>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="mb-1 text-sm font-semibold text-foreground-secondary">Fiche technique</legend>
        <div className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input
                name="specLabel"
                value={spec.label}
                onChange={(e) => updateSpec(i, 'label', e.target.value)}
                placeholder="Caractéristique (ex : Puissance)"
                className={inputClass + ' mt-0 flex-1'}
              />
              <input
                name="specValue"
                value={spec.value}
                onChange={(e) => updateSpec(i, 'value', e.target.value)}
                placeholder="Valeur (ex : 8 kW)"
                className={inputClass + ' mt-0 flex-1'}
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                aria-label="Retirer cette caractéristique"
                className="mt-0 shrink-0 rounded-lg border border-border px-3 text-sm text-foreground-secondary hover:bg-surface-hover"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSpec}
          className="rounded-lg border border-dashed border-border px-3 py-1.5 text-sm text-foreground-secondary hover:bg-surface-hover"
        >
          + Ajouter une caractéristique
        </button>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold text-foreground-secondary">Tarification</legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="costPrice">
              Prix d&apos;achat HT (€)
            </label>
            <input
              id="costPrice"
              name="costPrice"
              type="number"
              step="0.01"
              inputMode="decimal"
              value={costPrice}
              onChange={(e) => setCostPrice(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="sellPrice">
              Prix de vente HT (€)
            </label>
            <input
              id="sellPrice"
              name="sellPrice"
              type="number"
              step="0.01"
              inputMode="decimal"
              value={sellPrice}
              onChange={(e) => setSellPrice(Number(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="vatRate">
              TVA
            </label>
            <select id="vatRate" name="vatRate" defaultValue={initial?.vatRate ?? 20} className={inputClass}>
              {VAT_RATES.map((rate) => (
                <option key={rate} value={rate}>
                  {rate} %
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-lg border border-hairline bg-background px-4 py-3 text-sm">
          <span className="text-foreground-secondary">Marge estimée : </span>
          <span className="font-semibold">{formatCurrency(margin.amount)}</span>
          {margin.percent !== null && (
            <span className="text-foreground-secondary"> ({formatPercent(margin.percent)})</span>
          )}
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
