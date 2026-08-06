import { BRAND_COVERAGE, SIZE_CATEGORIES, type SizeCategory } from '../data/sizeCategories'
import { BRANDS } from '../data/brands'
import { OPTIONS } from '../data/options'
import type {
  Brand,
  ChecklistAnswers,
  Devis,
  DevisLine,
  DevisSettings,
  InstallationType,
  OptionLine,
  ProductTier,
} from '../types'
import { TIER_LABELS } from '../types'

const ISOLATION_COEF_CHAUFFAGE: Record<string, number> = {
  faible: 100,
  moyenne: 75,
  bonne: 55,
  rt2012: 40,
}

const ISOLATION_COEF_CLIM: Record<string, number> = {
  faible: 110,
  moyenne: 85,
  bonne: 65,
  rt2012: 45,
}

const PRIORITE_TO_TIER: Record<string, ProductTier> = {
  prix: 'entree',
  equilibre: 'milieu',
  qualite: 'haut',
}

export interface SizingResult {
  category: SizeCategory
  estimatedValue: number
  explanation: string[]
}

export function estimateSizing(type: InstallationType, answers: ChecklistAnswers): SizingResult {
  const categories = SIZE_CATEGORIES[type]
  const explanation: string[] = []

  let estimatedValue: number

  if (type === 'pac-air-eau') {
    const surface = Number(answers.surface_chauffee) || 0
    const isolation = String(answers.niveau_isolation || 'moyenne')
    const coef = ISOLATION_COEF_CHAUFFAGE[isolation] ?? ISOLATION_COEF_CHAUFFAGE.moyenne
    estimatedValue = Math.round(((surface * coef) / 1000) * 10) / 10
    explanation.push(`Puissance estimée à partir de ${surface || '—'} m² et d'une isolation "${isolation}" (${coef} W/m²).`)
  } else if (type === 'pac-air-air') {
    const surface = Number(answers.surface_totale) || 0
    const isolation = String(answers.niveau_isolation || 'moyenne')
    const coef = ISOLATION_COEF_CLIM[isolation] ?? ISOLATION_COEF_CLIM.moyenne
    estimatedValue = Math.round(((surface * coef) / 1000) * 10) / 10
    explanation.push(`Puissance estimée à partir de ${surface || '—'} m² à traiter et d'une isolation "${isolation}" (${coef} W/m²).`)
  } else if (type === 'chauffe-eau-thermo') {
    const occupants = Number(answers.nb_occupants) || 1
    if (occupants <= 2) estimatedValue = 200
    else if (occupants <= 4) estimatedValue = 270
    else estimatedValue = 300
    explanation.push(`Volume de ballon estimé pour ${occupants} occupant(s).`)
  } else {
    const occupants = Number(answers.nb_occupants) || 1
    const durete = String(answers.durete_eau || 'moyenne')
    let base: number
    if (occupants <= 2) base = 12
    else if (occupants <= 4) base = 16
    else base = 20
    if (durete === 'elevee' || durete === 'tres_elevee') {
      base += 4
    }
    estimatedValue = base
    explanation.push(`Capacité de résine estimée pour ${occupants} occupant(s) et une dureté d'eau "${durete}".`)
  }

  const category =
    categories.find((c) => estimatedValue > c.min && estimatedValue <= c.max) ??
    categories.find((c) => estimatedValue <= c.max) ??
    categories[categories.length - 1]

  explanation.push(`Catégorie retenue : ${category.label}.`)

  return { category, estimatedValue, explanation }
}

export function suggestTier(answers: ChecklistAnswers): ProductTier {
  const priorite = String(answers.priorite_client || 'equilibre')
  return PRIORITE_TO_TIER[priorite] ?? 'milieu'
}

export function getCompatibleBrands(type: InstallationType): Brand[] {
  const ids = BRAND_COVERAGE[type]
  return BRANDS.filter((b) => ids.includes(b.id))
}

export function tierPriceMidpoint(category: SizeCategory, tier: ProductTier): number {
  const range = category.pricing[tier]
  return Math.round((range.min + range.max) / 2)
}

export function getSuggestedOptionIds(type: InstallationType, answers: ChecklistAnswers): string[] {
  return OPTIONS[type]
    .filter((opt) => {
      if (!opt.autoSuggestIf) return false
      const value = answers[opt.autoSuggestIf.fieldId]
      return value === opt.autoSuggestIf.equals
    })
    .map((opt) => opt.id)
}

export interface BuildDevisInput {
  type: InstallationType
  category: SizeCategory
  tier: ProductTier
  materielPrice: number
  laborHours: number
  settings: DevisSettings
  selectedOptionIds: string[]
  optionQuantities: Record<string, number>
  customOptions: OptionLine[]
}

export function buildDevis(input: BuildDevisInput): Devis {
  const { type, category, tier, materielPrice, laborHours, settings, selectedOptionIds, optionQuantities, customOptions } = input

  const materiel: DevisLine[] = [
    {
      id: 'materiel-principal',
      label: `${category.label} — ${TIER_LABELS[tier]}`,
      quantite: 1,
      prixUnitaire: materielPrice,
      total: materielPrice,
    },
  ]

  const mainOeuvre: DevisLine[] = [
    {
      id: 'main-oeuvre-installation',
      label: "Main d'œuvre installation",
      quantite: laborHours,
      prixUnitaire: settings.tauxHoraire,
      total: Math.round(laborHours * settings.tauxHoraire * 100) / 100,
    },
  ]

  const optionDefs = OPTIONS[type]
  const options: DevisLine[] = []

  for (const optId of selectedOptionIds) {
    const def = optionDefs.find((o) => o.id === optId)
    if (!def) continue
    const qty = def.perUnit ? optionQuantities[optId] ?? 1 : 1
    options.push({
      id: optId,
      label: def.perUnit ? `${def.label} (${qty} ${def.unitLabel ?? ''})` : def.label,
      quantite: qty,
      prixUnitaire: def.defaultPrice,
      total: Math.round(qty * def.defaultPrice * 100) / 100,
    })
  }

  for (const custom of customOptions) {
    if (!custom.selected) continue
    const qty = custom.quantity ?? 1
    options.push({
      id: custom.id,
      label: custom.label,
      quantite: qty,
      prixUnitaire: custom.price,
      total: Math.round(qty * custom.price * 100) / 100,
    })
  }

  const sousTotalHT =
    materiel.reduce((s, l) => s + l.total, 0) +
    mainOeuvre.reduce((s, l) => s + l.total, 0) +
    options.reduce((s, l) => s + l.total, 0)

  const montantTva = Math.round(sousTotalHT * (settings.tva / 100) * 100) / 100
  const totalTTC = Math.round((sousTotalHT + montantTva) * 100) / 100

  return {
    materiel,
    mainOeuvre,
    options,
    sousTotalHT: Math.round(sousTotalHT * 100) / 100,
    tva: settings.tva,
    montantTva,
    totalTTC,
  }
}

export function formatEUR(value: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
}
