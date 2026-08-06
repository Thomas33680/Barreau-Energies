import { getInstallationTypeInfo } from '../data/installationTypes'
import { estimateSizing, buildDevis, suggestTier, tierPriceMidpoint, formatEUR } from '../lib/calculations'
import type { DevisSettings, Visit } from '../types'
import { deleteVisit } from '../lib/storage'

interface Props {
  visits: Visit[]
  settings: DevisSettings
  onOpenVisit: (id: string) => void
  onNewVisit: () => void
  onVisitsChange: (visits: Visit[]) => void
}

function computeTotal(visit: Visit, settings: DevisSettings): number | null {
  if (!visit.installationType) return null
  const sizing = estimateSizing(visit.installationType, visit.answers)
  const tier = visit.selectedTier ?? suggestTier(visit.answers)
  const materielPrice = visit.materielPrice ?? tierPriceMidpoint(sizing.category, tier)
  const laborHours = visit.laborHours ?? sizing.category.laborHours
  const devis = buildDevis({
    type: visit.installationType,
    category: sizing.category,
    tier,
    materielPrice,
    laborHours,
    settings,
    selectedOptionIds: visit.selectedOptionIds,
    optionQuantities: visit.optionQuantities,
    customOptions: visit.customOptions,
  })
  return devis.totalTTC
}

export function Home({ visits, settings, onOpenVisit, onNewVisit, onVisitsChange }: Props) {
  function handleDelete(id: string, nom: string) {
    const label = nom || 'cette visite'
    if (confirm(`Supprimer ${label} ? Cette action est irréversible.`)) {
      onVisitsChange(deleteVisit(id))
    }
  }

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <h1>Assistant Devis Chantier</h1>
          <p className="home-subtitle">Barreau Énergies — PAC, climatisation, chauffe-eau thermodynamique</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={onNewVisit}>
          + Nouvelle visite
        </button>
      </header>

      {visits.length === 0 ? (
        <div className="empty-state">
          <p>Aucune visite enregistrée pour le moment.</p>
          <button type="button" className="btn btn-primary" onClick={onNewVisit}>
            Démarrer une visite chantier
          </button>
        </div>
      ) : (
        <ul className="visit-list">
          {visits.map((v) => {
            const typeInfo = getInstallationTypeInfo(v.installationType)
            const total = computeTotal(v, settings)
            return (
              <li key={v.id} className="visit-card" onClick={() => onOpenVisit(v.id)}>
                <div className="visit-card-main">
                  <span className="visit-icon" aria-hidden>
                    {typeInfo?.icon ?? '📋'}
                  </span>
                  <div className="visit-card-info">
                    <span className="visit-nom">{v.client.nom || 'Client sans nom'}</span>
                    <span className="visit-meta">
                      {typeInfo?.shortLabel ?? 'Type non défini'} · {v.client.dateVisite}
                    </span>
                    {v.client.adresse && <span className="visit-adresse">{v.client.adresse}</span>}
                  </div>
                </div>
                <div className="visit-card-side">
                  <span className={`visit-status status-${v.status}`}>
                    {v.status === 'termine' ? 'Terminé' : 'Brouillon'}
                  </span>
                  {total !== null && <span className="visit-total">{formatEUR(total)}</span>}
                  <button
                    type="button"
                    className="btn-icon"
                    aria-label="Supprimer la visite"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(v.id, v.client.nom)
                    }}
                  >
                    ✕
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
