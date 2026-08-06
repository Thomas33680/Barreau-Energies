import { useEffect, useRef, useState } from 'react'
import { getPhotoBlob } from '../../lib/photoStore'
import type { VisitPhoto } from '../../types'

interface Props {
  photos: VisitPhoto[]
  onAddPhoto: (file: File) => Promise<void>
  onUpdateCaption: (id: string, caption: string) => void
  onDeletePhoto: (id: string) => void
  onClose: () => void
}

export function PhotoManager({ photos, onAddPhoto, onUpdateCaption, onDeletePhoto, onClose }: Props) {
  const [urls, setUrls] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    const created: string[] = []

    async function loadUrls() {
      const next: Record<string, string> = {}
      for (const photo of photos) {
        const blob = await getPhotoBlob(photo.id)
        if (blob && !cancelled) {
          const url = URL.createObjectURL(blob)
          next[photo.id] = url
          created.push(url)
        }
      }
      if (!cancelled) setUrls(next)
    }

    loadUrls()

    return () => {
      cancelled = true
      created.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [photos])

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setBusy(true)
    try {
      for (const file of Array.from(files)) {
        await onAddPhoto(file)
      }
    } finally {
      setBusy(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Photos du chantier">
      <div className="modal-panel">
        <div className="modal-header">
          <h2>Photos du chantier</h2>
          <button type="button" className="btn-icon" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <button type="button" className="btn btn-primary photo-add-btn" onClick={() => fileInputRef.current?.click()} disabled={busy}>
            {busy ? 'Traitement…' : '📷 Prendre / ajouter une photo'}
          </button>

          {photos.length === 0 ? (
            <p className="step-intro" style={{ marginTop: '1rem' }}>
              Aucune photo pour cette visite pour le moment.
            </p>
          ) : (
            <ul className="photo-grid">
              {photos.map((photo) => (
                <li key={photo.id} className="photo-item">
                  {urls[photo.id] ? (
                    <img src={urls[photo.id]} alt={photo.caption || 'Photo chantier'} />
                  ) : (
                    <div className="photo-placeholder" />
                  )}
                  <input
                    type="text"
                    className="photo-caption"
                    placeholder="Légende (optionnel)"
                    value={photo.caption}
                    onChange={(e) => onUpdateCaption(photo.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-icon photo-delete"
                    aria-label="Supprimer la photo"
                    onClick={() => onDeletePhoto(photo.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
