import { useEffect, useState } from 'react'
import { OPTIONS } from '../../data/options'
import { estimateAides } from '../../data/aides'
import {
  buildDevis,
  estimateSizing,
  formatEUR,
  getSuggestedOptionIds,
  suggestTier,
  tierPriceMidpoint,
} from '../../lib/calculations'
import { getBrand } from '../../data/brands'
import { buildDevisPdf, devisFileName } from '../../lib/pdf'
import { buildMailtoLink, downloadBlob, sharePdf } from '../../lib/share'
import type { CompanyInfo, DevisSettings, OptionLine, TvaRate, Visit } from '../../types'
import { SignaturePad } from './SignaturePad'

interface Props {
  visit: Visit
  settings: DevisSettings
  company: CompanyInfo
  onUpdateVisit: (patch: Partial<Visit>) => void
  onUpdateSettings: (patch: Partial<DevisSettings>) => void
  onBack: () => void
  onSave: () => void
}

const TVA_RATES: TvaRate[] = [5.5, 10, 20]

export function StepDevis({ visit, settings, company, onUpdateVisit, onUpdateSettings, onBack, onSave }: Props) {
  const [sending, setSending] = useState(false)
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

  const aides = estimateAides(type, visit.answers)
  const resteACharge = Math.max(0, devis.totalTTC - aides.total)

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

  function buildPdf() {
    return buildDevisPdf({ visit, company, devis, aides, sizingLabel: sizing.category.label })
  }

  function handleDownloadPdf() {
    buildPdf().save(devisFileName(visit))
  }

  async function handleShare() {
    setSending(true)
    try {
      const blob = buildPdf().output('blob')
      const fileName = devisFileName(visit)
      const shared = await sharePdf(
        blob,
        fileName,
        `Devis ${company.nom}`,
        `Devis pour ${visit.client.nom} — ${formatEUR(devis.totalTTC)} TTC`,
      )
      if (!shared) {
        downloadBlob(blob, fileName)
        if (visit.client.email) {
          window.open(
            buildMailtoLink(
              visit.client.email,
              `Votre devis ${company.nom}`,
              `Bonjour ${visit.client.nom},\n\nVeuillez trouver ci-joint votre devis d'un montant de ${formatEUR(devis.totalTTC)} TTC (le PDF vient d'être téléchargé sur cet appareil, à joindre au message).\n\nCordialement,\n${company.nom}`,
            ),
            '_blank',
          )
        }
      }
    } finally {
      setSending(false)
    }
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

      <section className="devis-block aides-block">
        <h3>Aides financières estimées</h3>
        {aides.lignes.length > 0 && (
          <>
            {aides.lignes.map((l) => (
              <div key={l.label} className="devis-total-row">
                <span>
                  {l.label}
                  {aides.categorie ? ` (${aides.categorie})` : ''}
                </span>
                <strong>- {formatEUR(l.amount)}</strong>
              </div>
            ))}
            <div className="devis-total-row devis-total-ttc">
              <span>Reste à charge estimé TTC</span>
              <strong>{formatEUR(resteACharge)}</strong>
            </div>
          </>
        )}
        <p className="aides-note">{aides.note}</p>
      </section>

      <section className="devis-block">
        <h3>Signature client</h3>
        <p className="step-intro">Fais signer le client sur l'écran pour valider le devis sur place.</p>
        <SignaturePad
          value={visit.signatureDataUrl}
          onSign={(dataUrl) => onUpdateVisit({ signatureDataUrl: dataUrl, signedAt: new Date().toISOString() })}
          onClear={() => onUpdateVisit({ signatureDataUrl: null, signedAt: null })}
        />
      </section>

      <section className="devis-block">
        <h3>Finaliser</h3>
        <div className="finalize-actions">
          <button type="button" className="btn btn-secondary" onClick={handleDownloadPdf}>
            ⬇️ Télécharger le PDF
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleShare} disabled={sending}>
            {sending ? 'Préparation…' : '📤 Partager (email / SMS / WhatsApp)'}
          </button>
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
