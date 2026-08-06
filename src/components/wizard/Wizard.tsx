import { useEffect, useState } from 'react'
import type { ChecklistAnswers, ClientInfo, CompanyInfo, DevisSettings, InstallationType, ProductTier, Visit, VisitPhoto } from '../../types'
import { upsertVisit, createVisitId } from '../../lib/storage'
import { compressImage, deletePhotoBlob, storePhotoBlob } from '../../lib/photoStore'
import type { KnownClient } from '../../lib/clients'
import { StepInstallationType } from './StepInstallationType'
import { StepClientInfo } from './StepClientInfo'
import { StepChecklist } from './StepChecklist'
import { StepRecommendation } from './StepRecommendation'
import { StepDevis } from './StepDevis'
import { StepIndicator } from '../ui/StepIndicator'
import { PhotoManager } from './PhotoManager'

const STEP_LABELS = ['Type', 'Client', 'Check-list', 'Matériel', 'Devis']

interface Props {
  initialVisit: Visit
  settings: DevisSettings
  company: CompanyInfo
  knownClients: KnownClient[]
  onUpdateSettings: (patch: Partial<DevisSettings>) => void
  onExit: () => void
}

export function Wizard({ initialVisit, settings, company, knownClients, onUpdateSettings, onExit }: Props) {
  const [visit, setVisit] = useState<Visit>(initialVisit)
  const [showPhotos, setShowPhotos] = useState(false)

  useEffect(() => {
    upsertVisit(visit)
  }, [visit])

  function updateVisit(patch: Partial<Visit>) {
    setVisit((v) => ({ ...v, ...patch, updatedAt: new Date().toISOString() }))
  }

  function setAnswer(id: string, value: ChecklistAnswers[string]) {
    updateVisit({ answers: { ...visit.answers, [id]: value } })
  }

  function setClient(client: ClientInfo) {
    updateVisit({ client })
  }

  function goToStep(step: number) {
    updateVisit({ step })
  }

  function selectInstallationType(type: InstallationType) {
    if (type !== visit.installationType) {
      updateVisit({ installationType: type, answers: {}, selectedTier: null, selectedBrandId: null, materielPrice: null, laborHours: null, selectedOptionIds: [], optionQuantities: {}, customOptions: [], step: 1 })
    } else {
      goToStep(1)
    }
  }

  function selectTier(tier: ProductTier) {
    updateVisit({ selectedTier: tier, materielPrice: null })
  }

  function selectBrand(brandId: string | null) {
    updateVisit({ selectedBrandId: brandId })
  }

  async function addPhoto(file: File) {
    const blob = await compressImage(file)
    const id = createVisitId()
    await storePhotoBlob(id, blob)
    const photo: VisitPhoto = { id, caption: '', createdAt: new Date().toISOString() }
    updateVisit({ photos: [...visit.photos, photo] })
  }

  function updatePhotoCaption(id: string, caption: string) {
    updateVisit({ photos: visit.photos.map((p) => (p.id === id ? { ...p, caption } : p)) })
  }

  async function deletePhoto(id: string) {
    await deletePhotoBlob(id)
    updateVisit({ photos: visit.photos.filter((p) => p.id !== id) })
  }

  function persist(patch?: Partial<Visit>) {
    const next = { ...visit, ...patch, updatedAt: new Date().toISOString() }
    upsertVisit(next)
    return next
  }

  function handleExit() {
    persist()
    onExit()
  }

  function saveAndExit() {
    persist({ status: 'termine' })
    onExit()
  }

  return (
    <div className="wizard">
      <div className="wizard-header">
        <div className="wizard-header-row">
          <button type="button" className="btn-back" onClick={handleExit} aria-label="Retour à l'accueil">
            ← Visites
          </button>
          <button type="button" className="btn-photos" onClick={() => setShowPhotos(true)}>
            📷 Photos{visit.photos.length > 0 ? ` (${visit.photos.length})` : ''}
          </button>
        </div>
        <StepIndicator steps={STEP_LABELS} currentStep={visit.step} />
      </div>

      <div className="wizard-body">
        {visit.step === 0 && <StepInstallationType value={visit.installationType} onSelect={selectInstallationType} />}

        {visit.step === 1 && (
          <div className="step-panel">
            <StepClientInfo client={visit.client} knownClients={knownClients} onChange={setClient} />
            <div className="wizard-nav">
              <button type="button" className="btn btn-secondary" onClick={() => goToStep(0)}>
                ← Précédent
              </button>
              <button type="button" className="btn btn-primary" onClick={() => goToStep(2)} disabled={!visit.client.nom}>
                Suivant →
              </button>
            </div>
          </div>
        )}

        {visit.step === 2 && visit.installationType && (
          <StepChecklist
            installationType={visit.installationType}
            answers={visit.answers}
            onChange={setAnswer}
            onDone={() => goToStep(3)}
            onBackToStart={() => goToStep(1)}
          />
        )}

        {visit.step === 3 && visit.installationType && (
          <StepRecommendation
            installationType={visit.installationType}
            answers={visit.answers}
            selectedTier={visit.selectedTier}
            selectedBrandId={visit.selectedBrandId}
            onSelectTier={selectTier}
            onSelectBrand={selectBrand}
            onBack={() => goToStep(2)}
            onContinue={() => goToStep(4)}
          />
        )}

        {visit.step === 4 && visit.installationType && (
          <StepDevis
            visit={visit}
            settings={settings}
            company={company}
            onUpdateVisit={updateVisit}
            onUpdateSettings={onUpdateSettings}
            onBack={() => goToStep(3)}
            onSave={saveAndExit}
          />
        )}
      </div>

      {showPhotos && (
        <PhotoManager
          photos={visit.photos}
          onAddPhoto={addPhoto}
          onUpdateCaption={updatePhotoCaption}
          onDeletePhoto={deletePhoto}
          onClose={() => setShowPhotos(false)}
        />
      )}
    </div>
  )
}
