import type { AideEstimate, ChecklistAnswers, InstallationType } from '../types'

type Categorie = 'bleu' | 'jaune' | 'violet' | 'rose'

const CATEGORIE_LABELS: Record<Categorie, string> = {
  bleu: 'Très modeste',
  jaune: 'Modeste',
  violet: 'Intermédiaire',
  rose: 'Supérieur',
}

// Barème indicatif du revenu fiscal de référence (RFR) par catégorie MaPrimeRénov'.
// À VÉRIFIER sur france-renov.gouv.fr : ces seuils sont réévalués chaque année.
const BAREME_HORS_IDF = [
  { bleu: 17173, jaune: 22015, violet: 30844 },
  { bleu: 25115, jaune: 32197, violet: 45340 },
  { bleu: 30206, jaune: 38719, violet: 54592 },
  { bleu: 35285, jaune: 45234, violet: 63844 },
  { bleu: 40388, jaune: 51775, violet: 73098 },
]
const EXTRA_HORS_IDF = { bleu: 5094, jaune: 6525, violet: 9254 }

const BAREME_IDF = [
  { bleu: 23541, jaune: 28657, violet: 40018 },
  { bleu: 34551, jaune: 42058, violet: 58827 },
  { bleu: 41493, jaune: 50513, violet: 70382 },
  { bleu: 48447, jaune: 58981, violet: 81839 },
  { bleu: 55427, jaune: 67473, violet: 93398 },
]
const EXTRA_IDF = { bleu: 6970, jaune: 8486, violet: 11683 }

function getThresholds(personnes: number, ileDeFrance: boolean) {
  const bareme = ileDeFrance ? BAREME_IDF : BAREME_HORS_IDF
  const extra = ileDeFrance ? EXTRA_IDF : EXTRA_HORS_IDF
  const clamped = Math.max(1, Math.round(personnes))
  if (clamped <= 5) return bareme[clamped - 1]
  const base = bareme[4]
  const extraPersons = clamped - 5
  return {
    bleu: base.bleu + extra.bleu * extraPersons,
    jaune: base.jaune + extra.jaune * extraPersons,
    violet: base.violet + extra.violet * extraPersons,
  }
}

function getRevenueCategory(rfr: number, personnes: number, ileDeFrance: boolean): Categorie {
  const t = getThresholds(personnes, ileDeFrance)
  if (rfr <= t.bleu) return 'bleu'
  if (rfr <= t.jaune) return 'jaune'
  if (rfr <= t.violet) return 'violet'
  return 'rose'
}

// Forfaits indicatifs MaPrimeRénov' + CEE (Coup de pouce), hors bonus "sortie de passoire" /
// parcours accompagné. À VÉRIFIER — ces montants évoluent chaque année.
const AIDES_PAC_AIR_EAU: Record<Categorie, { maPrimeRenov: number; cee: number }> = {
  bleu: { maPrimeRenov: 5000, cee: 2500 },
  jaune: { maPrimeRenov: 4000, cee: 2000 },
  violet: { maPrimeRenov: 3000, cee: 1200 },
  rose: { maPrimeRenov: 0, cee: 500 },
}

const AIDES_CHAUFFE_EAU_THERMO: Record<Categorie, { maPrimeRenov: number; cee: number }> = {
  bleu: { maPrimeRenov: 1200, cee: 300 },
  jaune: { maPrimeRenov: 800, cee: 250 },
  violet: { maPrimeRenov: 400, cee: 150 },
  rose: { maPrimeRenov: 0, cee: 100 },
}

export function estimateAides(type: InstallationType, answers: ChecklistAnswers): AideEstimate {
  if (type === 'pac-air-air' || type === 'adoucisseur') {
    return {
      eligible: false,
      categorie: null,
      lignes: [],
      total: 0,
      note:
        type === 'pac-air-air'
          ? "La climatisation réversible (PAC air/air) n'est en général pas éligible à MaPrimeRénov' ni aux CEE, sauf cas particuliers."
          : "L'adoucisseur d'eau n'est pas un équipement éligible aux aides à la rénovation énergétique.",
    }
  }

  const rfr = Number(answers.rfr_foyer)
  const personnes = Number(answers.nb_personnes_foyer)
  const ileDeFrance = answers.zone_ile_de_france === true

  if (!rfr || !personnes) {
    return {
      eligible: true,
      categorie: null,
      lignes: [],
      total: 0,
      note: 'Renseigne le revenu fiscal de référence et la composition du foyer (section Synthèse) pour estimer les aides.',
    }
  }

  const categorie = getRevenueCategory(rfr, personnes, ileDeFrance)
  const table = type === 'pac-air-eau' ? AIDES_PAC_AIR_EAU : AIDES_CHAUFFE_EAU_THERMO
  const aide = table[categorie]

  const lignes = [
    { label: "MaPrimeRénov'", amount: aide.maPrimeRenov },
    { label: 'CEE (Coup de pouce)', amount: aide.cee },
  ].filter((l) => l.amount > 0)

  const total = lignes.reduce((s, l) => s + l.amount, 0)

  return {
    eligible: total > 0,
    categorie: CATEGORIE_LABELS[categorie],
    lignes,
    total,
    note:
      categorie === 'rose'
        ? "Ménage classé « supérieur » : peu ou pas d'aides individuelles à ce jour."
        : 'Estimation indicative à confirmer sur france-renov.gouv.fr — montants et barèmes évoluent chaque année.',
  }
}
