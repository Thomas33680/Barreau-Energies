import { BRAND_COVERAGE, SIZE_CATEGORIES, type SizeCategory } from '../data/sizeCategories'
import { BRANDS } from '../data/brands'
import type { Brand, ChecklistAnswers, InstallationType, ProductTier } from '../types'

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
  const gamme = String(answers.gamme_souhaitee || 'milieu')
  return gamme === 'entree' || gamme === 'haut' ? gamme : 'milieu'
}

export function getCompatibleBrands(type: InstallationType): Brand[] {
  const ids = BRAND_COVERAGE[type]
  return BRANDS.filter((b) => ids.includes(b.id))
}
