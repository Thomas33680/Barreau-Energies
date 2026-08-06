import { useState } from 'react'
import type { ClientInfo } from '../../types'
import type { KnownClient } from '../../lib/clients'
import { searchKnownClients } from '../../lib/clients'

interface Props {
  client: ClientInfo
  knownClients: KnownClient[]
  onChange: (client: ClientInfo) => void
}

export function StepClientInfo({ client, knownClients, onChange }: Props) {
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)

  function set<K extends keyof ClientInfo>(key: K, value: ClientInfo[K]) {
    onChange({ ...client, [key]: value })
  }

  function pickClient(known: KnownClient) {
    onChange({ ...known.client, dateVisite: client.dateVisite })
    setSearch('')
    setShowResults(false)
  }

  const results = showResults ? searchKnownClients(knownClients, search) : []

  return (
    <div className="step-panel">
      <h2>Informations client & visite</h2>

      {knownClients.length > 0 && (
        <div className="field client-search">
          <label className="field-label" htmlFor="client-search">
            Client déjà connu ?
          </label>
          <input
            id="client-search"
            type="text"
            placeholder="Rechercher par nom, téléphone ou adresse…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setShowResults(true)
            }}
            onFocus={() => setShowResults(true)}
          />
          {results.length > 0 && (
            <ul className="client-search-results">
              {results.map((known) => (
                <li key={known.key}>
                  <button type="button" onClick={() => pickClient(known)}>
                    <span className="client-search-nom">{known.client.nom}</span>
                    <span className="client-search-meta">
                      {known.client.telephone || known.client.adresse || `${known.visitsCount} visite(s)`}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="field">
        <label className="field-label" htmlFor="client-nom">
          Nom du client<span className="field-required">*</span>
        </label>
        <input id="client-nom" type="text" value={client.nom} onChange={(e) => set('nom', e.target.value)} />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="client-adresse">
          Adresse du chantier
        </label>
        <textarea
          id="client-adresse"
          rows={2}
          value={client.adresse}
          onChange={(e) => set('adresse', e.target.value)}
        />
      </div>
      <div className="field-row">
        <div className="field">
          <label className="field-label" htmlFor="client-tel">
            Téléphone
          </label>
          <input id="client-tel" type="tel" value={client.telephone} onChange={(e) => set('telephone', e.target.value)} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="client-email">
            Email
          </label>
          <input id="client-email" type="email" value={client.email} onChange={(e) => set('email', e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="client-date">
          Date de la visite
        </label>
        <input
          id="client-date"
          type="date"
          value={client.dateVisite}
          onChange={(e) => set('dateVisite', e.target.value)}
        />
      </div>
    </div>
  )
}
