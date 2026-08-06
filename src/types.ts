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

export type TvaRate = 5.5 | 10 | 20

export interface OptionLine {
  id: string
  label: string
  price: number
  selected: boolean
  quantity?: number
}

export interface DevisSettings {
  tauxHoraire: number
  tva: TvaRate
}

export interface DevisLine {
  id: string
  label: string
  quantite: number
  prixUnitaire: number
  total: number
}

export interface Devis {
  materiel: DevisLine[]
  mainOeuvre: DevisLine[]
  options: DevisLine[]
  sousTotalHT: number
  tva: TvaRate
  montantTva: number
  totalTTC: number
}

export type VisitStatus = 'brouillon' | 'termine'

export interface VisitPhoto {
  id: string
  caption: string
  createdAt: string
}

export interface AideLine {
  label: string
  amount: number
}

export interface AideEstimate {
  eligible: boolean
  categorie: string | null
  lignes: AideLine[]
  total: number
  note: string
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
  materielPrice: number | null
  selectedOptionIds: string[]
  optionQuantities: Record<string, number>
  customOptions: OptionLine[]
  laborHours: number | null
  photos: VisitPhoto[]
  signatureDataUrl: string | null
  signedAt: string | null
  step: number
  status: VisitStatus
}

export interface CompanyInfo {
  nom: string
  siret: string
  adresse: string
  telephone: string
  email: string
  assurance: string
  logoDataUrl: string | null
}
