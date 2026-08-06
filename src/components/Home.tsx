import { getInstallationTypeInfo } from '../data/installationTypes'
import type { Visit } from '../types'
import { deleteVisit } from '../lib/storage'

interface Props {
  visits: Visit[]
  onOpenVisit: (id: string) => void
  onNewVisit: () => void
  onVisitsChange: (visits: Visit[]) => void
}

export function Home({ visits, onOpenVisit, onNewVisit, onVisitsChange }: Props) {
  function handleDelete(id: string, nom: string) {
    const label = nom || 'cette visite'
    if (confirm(`Supprimer ${label} ? Cette action est irréversible.`)) {
      onVisitsChange(deleteVisit(id))
    }
  }

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-brand">
          <img src="/logo-icon.svg" alt="" className="home-logo" />
          <div>
            <h1>Barreau Énergies</h1>
            <p className="home-subtitle">Assistant technique chantier — PAC, climatisation, chauffe-eau, adoucisseur</p>
          </div>
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
                  {v.photos.length > 0 && (
                    <span className="visit-badges" title={`${v.photos.length} photo(s)`}>
                      📷 {v.photos.length}
                    </span>
                  )}
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
