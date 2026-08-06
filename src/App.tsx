import { useMemo, useState } from 'react'
import { Home } from './components/Home'
import { Wizard } from './components/wizard/Wizard'
import { CompanySettings } from './components/CompanySettings'
import { loadVisits, loadSettings, saveSettings, loadCompanyInfo, saveCompanyInfo } from './lib/storage'
import { createEmptyVisit } from './lib/visit'
import { deriveKnownClients } from './lib/clients'
import type { CompanyInfo, DevisSettings, Visit } from './types'
import './App.css'

function App() {
  const [visits, setVisits] = useState<Visit[]>(() => loadVisits())
  const [settings, setSettings] = useState<DevisSettings>(() => loadSettings())
  const [company, setCompany] = useState<CompanyInfo>(() => loadCompanyInfo())
  const [activeVisitId, setActiveVisitId] = useState<string | null>(null)
  const [showCompanySettings, setShowCompanySettings] = useState(false)

  const knownClients = useMemo(() => deriveKnownClients(visits), [visits])

  function updateSettings(patch: Partial<DevisSettings>) {
    setSettings((s) => {
      const next = { ...s, ...patch }
      saveSettings(next)
      return next
    })
  }

  function updateCompany(patch: Partial<CompanyInfo>) {
    setCompany((c) => {
      const next = { ...c, ...patch }
      saveCompanyInfo(next)
      return next
    })
  }

  function handleNewVisit() {
    const visit = createEmptyVisit()
    setVisits((v) => [visit, ...v])
    setActiveVisitId(visit.id)
  }

  function handleExitWizard() {
    setVisits(loadVisits())
    setActiveVisitId(null)
  }

  const activeVisit = visits.find((v) => v.id === activeVisitId) ?? null

  return (
    <div className="app">
      {activeVisit ? (
        <Wizard
          initialVisit={activeVisit}
          settings={settings}
          company={company}
          knownClients={knownClients}
          onUpdateSettings={updateSettings}
          onExit={handleExitWizard}
        />
      ) : (
        <Home
          visits={visits}
          settings={settings}
          onOpenVisit={setActiveVisitId}
          onNewVisit={handleNewVisit}
          onVisitsChange={setVisits}
          onOpenCompanySettings={() => setShowCompanySettings(true)}
        />
      )}

      {showCompanySettings && (
        <CompanySettings company={company} onChange={updateCompany} onClose={() => setShowCompanySettings(false)} />
      )}
    </div>
  )
}

export default App
