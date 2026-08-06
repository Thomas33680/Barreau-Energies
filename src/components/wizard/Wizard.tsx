import { useEffect, useState } from 'react'
import type { ChecklistAnswers, ClientInfo, DevisSettings, InstallationType, ProductTier, Visit } from '../../types'
import { upsertVisit } from '../../lib/storage'
import { StepInstallationType } from './StepInstallationType'
import { StepClientInfo } from './StepClientInfo'
import { StepChecklist } from './StepChecklist'
import { StepRecommendation } from './StepRecommendation'
import { StepDevis } from './StepDevis'
import { StepIndicator } from '../ui/StepIndicator'

const STEP_LABELS = ['Type', 'Client', 'Check-list', 'Matériel', 'Devis']

interface Props {
  initialVisit: Visit
  settings: DevisSettings
  onUpdateSettings: (patch: Partial<DevisSettings>) => void
  onExit: () => void
}

export function Wizard({ initialVisit, settings, onUpdateSettings, onExit }: Props) {
  const [visit, setVisit] = useState<Visit>(initialVisit)

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

  function persist(patch?: Partial<Visit>) {
    const next = { ...visit, ...(patch ?? {}), updatedAt: new Date().toISOString() }
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
        <button type="button" className="btn-back" onClick={handleExit} aria-label="Retour à l'accueil">
          ← Visites
        </button>
        <StepIndicator steps={STEP_LABELS} currentStep={visit.step} />
      </div>

      <div className="wizard-body">
        {visit.step === 0 && <StepInstallationType value={visit.installationType} onSelect={selectInstallationType} />}

        {visit.step === 1 && (
          <div className="step-panel">
            <StepClientInfo client={visit.client} onChange={setClient} />
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
            onUpdateVisit={updateVisit}
            onUpdateSettings={onUpdateSettings}
            onBack={() => goToStep(3)}
            onSave={saveAndExit}
          />
        )}
      </div>
    </div>
  )
}
