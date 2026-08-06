import { estimateSizing, formatEUR, getCompatibleBrands, suggestTier } from '../../lib/calculations'
import { BrandLogo } from '../ui/BrandLogo'
import { TIER_LABELS } from '../../types'
import type { ChecklistAnswers, InstallationType, ProductTier } from '../../types'

const TIERS: ProductTier[] = ['entree', 'milieu', 'haut']

interface Props {
  installationType: InstallationType
  answers: ChecklistAnswers
  selectedTier: ProductTier | null
  selectedBrandId: string | null
  onSelectTier: (tier: ProductTier) => void
  onSelectBrand: (brandId: string | null) => void
  onBack: () => void
  onContinue: () => void
}

export function StepRecommendation({
  installationType,
  answers,
  selectedTier,
  selectedBrandId,
  onSelectTier,
  onSelectBrand,
  onBack,
  onContinue,
}: Props) {
  const sizing = estimateSizing(installationType, answers)
  const suggested = suggestTier(answers)
  const tier = selectedTier ?? suggested
  const brands = getCompatibleBrands(installationType)
  const unit = sizing.category.valueUnit

  return (
    <div className="step-panel">
      <h2>Recommandation de matériel</h2>

      <div className="reco-summary">
        <div className="reco-summary-value">
          {sizing.estimatedValue} {unit}
        </div>
        <div className="reco-summary-text">
          {sizing.explanation.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <h3 className="reco-subtitle">Gamme conseillée</h3>
      <div className="tier-grid">
        {TIERS.map((t) => {
          const range = sizing.category.pricing[t]
          return (
            <button
              key={t}
              type="button"
              className={`tier-card ${tier === t ? 'selected' : ''} ${suggested === t ? 'suggested' : ''}`}
              onClick={() => onSelectTier(t)}
            >
              {suggested === t && <span className="tier-badge">Conseillé</span>}
              <span className="tier-name">{TIER_LABELS[t]}</span>
              <span className="tier-price">
                {formatEUR(range.min)} – {formatEUR(range.max)}
              </span>
              <span className="tier-hint">matériel HT indicatif</span>
            </button>
          )
        })}
      </div>

      <h3 className="reco-subtitle">Marques compatibles</h3>
      <p className="step-intro">Sélectionne une marque à indiquer sur le devis (facultatif).</p>
      <div className="brand-grid">
        {brands.map((b) => (
          <BrandLogo
            key={b.id}
            brand={b}
            selected={selectedBrandId === b.id}
            onClick={() => onSelectBrand(selectedBrandId === b.id ? null : b.id)}
          />
        ))}
      </div>

      <div className="wizard-nav">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          ← Précédent
        </button>
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          Générer le devis →
        </button>
      </div>
    </div>
  )
}
