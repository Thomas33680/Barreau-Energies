import { useState } from 'react'
import { Home } from './components/Home'
import { Wizard } from './components/wizard/Wizard'
import { loadVisits, loadSettings, saveSettings } from './lib/storage'
import { createEmptyVisit } from './lib/visit'
import type { DevisSettings, Visit } from './types'
import './App.css'

function App() {
  const [visits, setVisits] = useState<Visit[]>(() => loadVisits())
  const [settings, setSettings] = useState<DevisSettings>(() => loadSettings())
  const [activeVisitId, setActiveVisitId] = useState<string | null>(null)

  function updateSettings(patch: Partial<DevisSettings>) {
    setSettings((s) => {
      const next = { ...s, ...patch }
      saveSettings(next)
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
        <Wizard initialVisit={activeVisit} settings={settings} onUpdateSettings={updateSettings} onExit={handleExitWizard} />
      ) : (
        <Home
          visits={visits}
          settings={settings}
          onOpenVisit={setActiveVisitId}
          onNewVisit={handleNewVisit}
          onVisitsChange={setVisits}
        />
      )}
    </div>
  )
}

export default App
