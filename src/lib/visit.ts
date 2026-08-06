import type { Visit } from '../types'
import { createVisitId } from './storage'

export function createEmptyVisit(): Visit {
  const now = new Date().toISOString()
  return {
    id: createVisitId(),
    createdAt: now,
    updatedAt: now,
    installationType: null,
    client: {
      nom: '',
      adresse: '',
      telephone: '',
      email: '',
      dateVisite: now.slice(0, 10),
    },
    answers: {},
    selectedTier: null,
    selectedBrandId: null,
    materielPrice: null,
    selectedOptionIds: [],
    optionQuantities: {},
    customOptions: [],
    laborHours: null,
    photos: [],
    signatureDataUrl: null,
    signedAt: null,
    step: 0,
    status: 'brouillon',
  }
}
