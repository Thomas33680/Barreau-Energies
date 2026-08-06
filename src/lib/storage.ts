import type { DevisSettings, Visit } from '../types'

const VISITS_KEY = 'adc:visits'
const SETTINGS_KEY = 'adc:settings'

export const DEFAULT_SETTINGS: DevisSettings = {
  tauxHoraire: 55,
  tva: 5.5,
}

export function loadVisits(): Visit[] {
  try {
    const raw = localStorage.getItem(VISITS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
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

export function loadSettings(): DevisSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: DevisSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function createVisitId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `visit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
