export type InstallationType = 'pac-air-eau' | 'pac-air-air' | 'chauffe-eau-thermo' | 'adoucisseur'

export interface InstallationTypeInfo {
  id: InstallationType
  label: string
  shortLabel: string
  description: string
  icon: string
}

export interface ClientInfo {
  nom: string
  adresse: string
  telephone: string
  email: string
  dateVisite: string
}

export type ChecklistFieldType = 'text' | 'number' | 'select' | 'boolean' | 'textarea'

export interface ChecklistOption {
  value: string
  label: string
}

export interface ChecklistField {
  id: string
  label: string
  type: ChecklistFieldType
  unit?: string
  options?: ChecklistOption[]
  required?: boolean
  helpText?: string
  placeholder?: string
}

export interface ChecklistSection {
  id: string
  title: string
  fields: ChecklistField[]
}

export type ChecklistAnswers = Record<string, string | number | boolean | undefined>

export type ProductTier = 'entree' | 'milieu' | 'haut'

export const TIER_LABELS: Record<ProductTier, string> = {
  entree: 'Entrée de gamme',
  milieu: 'Milieu de gamme',
  haut: 'Haut de gamme',
}

export interface Brand {
  id: string
  name: string
  logo: string
}

export type VisitStatus = 'brouillon' | 'termine'

export interface VisitPhoto {
  id: string
  caption: string
  createdAt: string
}

export interface Visit {
  id: string
  createdAt: string
  updatedAt: string
  installationType: InstallationType | null
  client: ClientInfo
  answers: ChecklistAnswers
  selectedTier: ProductTier | null
  selectedBrandId: string | null
  photos: VisitPhoto[]
  step: number
  status: VisitStatus
}
