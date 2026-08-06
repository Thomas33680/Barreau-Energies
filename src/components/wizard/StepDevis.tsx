import { useEffect } from 'react'
import { OPTIONS } from '../../data/options'
import {
  buildDevis,
  estimateSizing,
  formatEUR,
  getSuggestedOptionIds,
  suggestTier,
  tierPriceMidpoint,
} from '../../lib/calculations'
import { getBrand } from '../../data/brands'
import type { DevisSettings, OptionLine, TvaRate, Visit } from '../../types'

interface Props {
  visit: Visit
  settings: DevisSettings
  onUpdateVisit: (patch: Partial<Visit>) => void
  onUpdateSettings: (patch: Partial<DevisSettings>) => void
  onBack: () => void
  onSave: () => void
}

const TVA_RATES: TvaRate[] = [5.5, 10, 20]

export function StepDevis({ visit, settings, onUpdateVisit, onUpdateSettings, onBack, onSave }: Props) {
  const type = visit.installationType!
  const sizing = estimateSizing(type, visit.answers)
  const tier = visit.selectedTier ?? suggestTier(visit.answers)
  const brand = visit.selectedBrandId ? getBrand(visit.selectedBrandId) : undefined
  const optionDefs = OPTIONS[type]

  const materielPrice = visit.materielPrice ?? tierPriceMidpoint(sizing.category, tier)
  const laborHours = visit.laborHours ?? sizing.category.laborHours

  useEffect(() => {
    if (visit.selectedOptionIds.length === 0 && visit.materielPrice === null) {
      const suggested = getSuggestedOptionIds(type, visit.answers)
      if (suggested.length > 0) {
        onUpdateVisit({ selectedOptionIds: suggested })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const devis = buildDevis({
    type,
    category: sizing.category,
    tier,
    materielPrice,
    laborHours,
    settings,
    selectedOptionIds: visit.selectedOptionIds,
    optionQuantities: visit.optionQuantities,
    customOptions: visit.customOptions,
  })

  function toggleOption(id: string) {
    const set = new Set(visit.selectedOptionIds)
    if (set.has(id)) set.delete(id)
    else set.add(id)
    onUpdateVisit({ selectedOptionIds: Array.from(set) })
  }

  function setOptionQty(id: string, qty: number) {
    onUpdateVisit({ optionQuantities: { ...visit.optionQuantities, [id]: qty } })
  }

  function addCustomOption() {
    const newOption: OptionLine = {
      id: `custom-${Date.now()}`,
      label: 'Ligne personnalisée',
      price: 0,
      selected: true,
      quantity: 1,
    }
    onUpdateVisit({ customOptions: [...visit.customOptions, newOption] })
  }

  function updateCustomOption(id: string, patch: Partial<OptionLine>) {
    onUpdateVisit({
      customOptions: visit.customOptions.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    })
  }

  function removeCustomOption(id: string) {
    onUpdateVisit({ customOptions: visit.customOptions.filter((o) => o.id !== id) })
  }

  return (
    <div className="step-panel">
      <h2>Devis estimatif</h2>
      <p className="step-intro">
        Base : {sizing.category.label}
        {brand ? ` — ${brand.name}` : ''}. Tous les montants sont modifiables.
      </p>

      <section className="devis-block">
        <h3>Matériel</h3>
        <div className="devis-line">
          <span className="devis-line-label">{devis.materiel[0].label}</span>
          <input
            className="devis-line-input"
            type="number"
            value={materielPrice}
            onChange={(e) => onUpdateVisit({ materielPrice: Number(e.target.value) })}
          />
          <span className="devis-line-unit">€ HT</span>
        </div>
      </section>

      <section className="devis-block">
        <h3>Main d'œuvre</h3>
        <div className="devis-line">
          <span className="devis-line-label">Heures estimées</span>
          <input
            className="devis-line-input"
            type="number"
            step="0.5"
            value={laborHours}
            onChange={(e) => onUpdateVisit({ laborHours: Number(e.target.value) })}
          />
          <span className="devis-line-unit">h</span>
        </div>
        <div className="devis-line">
          <span className="devis-line-label">Taux horaire</span>
          <input
            className="devis-line-input"
            type="number"
            value={settings.tauxHoraire}
            onChange={(e) => onUpdateSettings({ tauxHoraire: Number(e.target.value) })}
          />
          <span className="devis-line-unit">€/h</span>
        </div>
      </section>

      <section className="devis-block">
        <h3>Options</h3>
        {optionDefs.map((opt) => {
          const checked = visit.selectedOptionIds.includes(opt.id)
          return (
            <div key={opt.id} className="option-row">
              <label className="option-checkbox">
                <input type="checkbox" checked={checked} onChange={() => toggleOption(opt.id)} />
                {opt.label}
              </label>
              {checked && opt.perUnit && (
                <input
                  className="option-qty"
                  type="number"
                  min={1}
                  value={visit.optionQuantities[opt.id] ?? 1}
                  onChange={(e) => setOptionQty(opt.id, Number(e.target.value))}
                />
              )}
              <span className="option-price">{formatEUR(opt.defaultPrice)}{opt.perUnit ? ` / ${opt.unitLabel}` : ''}</span>
            </div>
          )
        })}

        {visit.customOptions.map((custom) => (
          <div key={custom.id} className="option-row option-row-custom">
            <label className="option-checkbox">
              <input
                type="checkbox"
                checked={custom.selected}
                onChange={(e) => updateCustomOption(custom.id, { selected: e.target.checked })}
              />
              <input
                className="option-custom-label"
                type="text"
                value={custom.label}
                onChange={(e) => updateCustomOption(custom.id, { label: e.target.value })}
              />
            </label>
            <input
              className="option-qty"
              type="number"
              value={custom.price}
              onChange={(e) => updateCustomOption(custom.id, { price: Number(e.target.value) })}
            />
            <button type="button" className="btn-icon" onClick={() => removeCustomOption(custom.id)} aria-label="Supprimer">
              ✕
            </button>
          </div>
        ))}

        <button type="button" className="btn btn-ghost" onClick={addCustomOption}>
          + Ajouter une ligne
        </button>
      </section>

      <section className="devis-block">
        <h3>TVA</h3>
        <div className="tva-group">
          {TVA_RATES.map((rate) => (
            <button
              key={rate}
              type="button"
              className={`toggle-btn ${settings.tva === rate ? 'active' : ''}`}
              onClick={() => onUpdateSettings({ tva: rate })}
            >
              {rate}%
            </button>
          ))}
        </div>
      </section>

      <section className="devis-total">
        <div className="devis-total-row">
          <span>Sous-total HT</span>
          <strong>{formatEUR(devis.sousTotalHT)}</strong>
        </div>
        <div className="devis-total-row">
          <span>TVA ({devis.tva}%)</span>
          <strong>{formatEUR(devis.montantTva)}</strong>
        </div>
        <div className="devis-total-row devis-total-ttc">
          <span>Total TTC</span>
          <strong>{formatEUR(devis.totalTTC)}</strong>
        </div>
      </section>

      <div className="wizard-nav">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          ← Précédent
        </button>
        <button type="button" className="btn btn-primary" onClick={onSave}>
          Enregistrer le devis
        </button>
      </div>
    </div>
  )
}
