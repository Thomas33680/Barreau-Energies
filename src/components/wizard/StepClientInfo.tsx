import type { ClientInfo } from '../../types'

interface Props {
  client: ClientInfo
  onChange: (client: ClientInfo) => void
}

export function StepClientInfo({ client, onChange }: Props) {
  function set<K extends keyof ClientInfo>(key: K, value: ClientInfo[K]) {
    onChange({ ...client, [key]: value })
  }

  return (
    <div className="step-panel">
      <h2>Informations client & visite</h2>
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
