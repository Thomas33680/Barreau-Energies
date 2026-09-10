export type ItemType = 'produit' | 'service'

export interface Spec {
  label: string
  value: string
}

export interface PricebookItem {
  id: string
  reference: string
  name: string
  type: ItemType
  category: string
  brand: string
  model: string
  unit: string
  costPrice: number
  sellPrice: number
  vatRate: number
  supplier: string
  description: string
  specs: Spec[]
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface PricebookItemInput {
  reference: string
  name: string
  type: ItemType
  category: string
  brand: string
  model: string
  unit: string
  costPrice: number
  sellPrice: number
  vatRate: number
  supplier: string
  description: string
  specs: Spec[]
  active: boolean
}

export const DEFAULT_CATEGORIES = [
  'Pompe à chaleur air/eau',
  'Pompe à chaleur air/air',
  'Climatisation',
  "Chauffe-eau thermodynamique",
  "Adoucisseur d'eau",
  'Chaudière',
  'Accessoires & pièces',
  "Main d'œuvre",
] as const

export const DEFAULT_BRANDS = [
  'Daikin',
  'Ariston',
  'Atlantic',
  'Thermor',
  'Panasonic',
  'Mitsubishi Electric',
  'BWT',
  'Altech',
] as const

export const DEFAULT_UNITS = ['pièce', 'forfait', 'heure', 'ml', 'm²', 'lot'] as const

export const VAT_RATES = [20, 10, 5.5, 0] as const

export function computeMargin(costPrice: number, sellPrice: number) {
  const amount = sellPrice - costPrice
  const percent = costPrice > 0 ? (amount / costPrice) * 100 : null
  return { amount, percent }
}
