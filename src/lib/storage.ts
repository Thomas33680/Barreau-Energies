import type { Visit } from '../types'

const VISITS_KEY = 'adc:visits'
const MAX_STEP = 3

function normalizeVisit(visit: Partial<Visit> & Pick<Visit, 'id'>): Visit {
  return {
    photos: [],
    ...visit,
    step: Math.min(visit.step ?? 0, MAX_STEP),
  } as Visit
}

export function loadVisits(): Visit[] {
  try {
    const raw = localStorage.getItem(VISITS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(normalizeVisit) : []
  } catch {
    return []
  }
}

export function saveVisits(visits: Visit[]): void {
  localStorage.setItem(VISITS_KEY, JSON.stringify(visits))
}

export function upsertVisit(visit: Visit): Visit[] {
  const visits = loadVisits()
  const idx = visits.findIndex((v) => v.id === visit.id)
  if (idx >= 0) {
    visits[idx] = visit
  } else {
    visits.unshift(visit)
  }
  saveVisits(visits)
  return visits
}

export function deleteVisit(id: string): Visit[] {
  const visits = loadVisits().filter((v) => v.id !== id)
  saveVisits(visits)
  return visits
}

export function createVisitId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `visit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
