import { useRef } from 'react'
import type { CompanyInfo } from '../types'

interface Props {
  company: CompanyInfo
  onChange: (patch: Partial<CompanyInfo>) => void
  onClose: () => void
}

const MAX_LOGO_DIMENSION = 300

export function CompanySettings({ company, onChange, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_LOGO_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    onChange({ logoDataUrl: canvas.toDataURL('image/png') })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Profil entreprise">
      <div className="modal-panel">
        <div className="modal-header">
          <h2>Profil entreprise</h2>
          <button type="button" className="btn-icon" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p className="step-intro">
            Ces informations apparaissent sur les devis PDF envoyés aux clients.
          </p>

          <div className="field">
            <label className="field-label" htmlFor="company-logo">
              Logo
            </label>
            <div className="logo-row">
              {company.logoDataUrl && <img src={company.logoDataUrl} alt="Logo entreprise" className="logo-preview" />}
              <input ref={fileInputRef} id="company-logo" type="file" accept="image/*" onChange={handleLogoChange} />
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="company-nom">
              Nom de l'entreprise
            </label>
            <input id="company-nom" type="text" value={company.nom} onChange={(e) => onChange({ nom: e.target.value })} />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="company-adresse">
              Adresse
            </label>
            <textarea
              id="company-adresse"
              rows={2}
              value={company.adresse}
              onChange={(e) => onChange({ adresse: e.target.value })}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label className="field-label" htmlFor="company-tel">
                Téléphone
              </label>
              <input id="company-tel" type="tel" value={company.telephone} onChange={(e) => onChange({ telephone: e.target.value })} />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="company-email">
                Email
              </label>
              <input id="company-email" type="email" value={company.email} onChange={(e) => onChange({ email: e.target.value })} />
            </div>
          </div>

          <div className="field">
            <label className="field-label" htmlFor="company-siret">
              SIRET
            </label>
            <input id="company-siret" type="text" value={company.siret} onChange={(e) => onChange({ siret: e.target.value })} />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="company-assurance">
              Mention assurance décennale
            </label>
            <input
              id="company-assurance"
              type="text"
              placeholder="ex : Assuré RC Pro et décennale auprès de..."
              value={company.assurance}
              onChange={(e) => onChange({ assurance: e.target.value })}
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={onClose} style={{ width: '100%', marginTop: '0.5rem' }}>
            Terminé
          </button>
        </div>
      </div>
    </div>
  )
}
