import { useMemo, useState } from 'react'
import { Home } from './components/Home'
import { Wizard } from './components/wizard/Wizard'
import { loadVisits } from './lib/storage'
import { createEmptyVisit } from './lib/visit'
import { deriveKnownClients } from './lib/clients'
import type { Visit } from './types'
import './App.css'

function App() {
  const [visits, setVisits] = useState<Visit[]>(() => loadVisits())
  const [activeVisitId, setActiveVisitId] = useState<string | null>(null)

  const knownClients = useMemo(() => deriveKnownClients(visits), [visits])

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
        <Wizard initialVisit={activeVisit} knownClients={knownClients} onExit={handleExitWizard} />
      ) : (
        <Home visits={visits} onOpenVisit={setActiveVisitId} onNewVisit={handleNewVisit} onVisitsChange={setVisits} />
      )}
    </div>
  )
}

export default App
