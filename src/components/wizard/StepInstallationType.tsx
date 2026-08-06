import { INSTALLATION_TYPES } from '../../data/installationTypes'
import type { InstallationType } from '../../types'

interface Props {
  value: InstallationType | null
  onSelect: (type: InstallationType) => void
}

export function StepInstallationType({ value, onSelect }: Props) {
  return (
    <div className="step-panel">
      <h2>Type d'installation</h2>
      <p className="step-intro">Sélectionne le type d'équipement concerné par cette visite.</p>
      <div className="type-grid">
        {INSTALLATION_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`type-card ${value === t.id ? 'selected' : ''}`}
            onClick={() => onSelect(t.id)}
          >
            <span className="type-icon" aria-hidden>
              {t.icon}
            </span>
            <span className="type-label">{t.shortLabel}</span>
            <span className="type-desc">{t.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
