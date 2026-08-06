import type { InstallationType } from '../types'

export interface SizeCategory {
  id: string
  label: string
  /** power range in kW, or volume range in L for chauffe-eau-thermo / adoucisseur (see valueUnit) */
  min: number
  max: number
  valueUnit: 'kW' | 'L'
}

export const SIZE_CATEGORIES: Record<InstallationType, SizeCategory[]> = {
  'pac-air-eau': [
    { id: 'petite', label: 'Petite puissance', min: 0, max: 6, valueUnit: 'kW' },
    { id: 'moyenne', label: 'Puissance moyenne', min: 6, max: 10, valueUnit: 'kW' },
    { id: 'grande', label: 'Grande puissance', min: 10, max: 100, valueUnit: 'kW' },
  ],
  'pac-air-air': [
    { id: 'mono-split', label: 'Mono-split (1 pièce)', min: 0, max: 3.5, valueUnit: 'kW' },
    { id: 'multi-split', label: 'Multi-split (2-3 pièces)', min: 3.5, max: 7, valueUnit: 'kW' },
    { id: 'multi-gainable', label: 'Multi-split / gainable (4+ pièces)', min: 7, max: 100, valueUnit: 'kW' },
  ],
  'chauffe-eau-thermo': [
    { id: '200l', label: 'Ballon 200 L (1-2 personnes)', min: 0, max: 200, valueUnit: 'L' },
    { id: '270l', label: 'Ballon 270 L (3-4 personnes)', min: 200, max: 270, valueUnit: 'L' },
    { id: '300l', label: 'Ballon 300 L+ (5 personnes et +)', min: 270, max: 1000, valueUnit: 'L' },
  ],
  adoucisseur: [
    { id: '12l', label: 'Adoucisseur 12 L (1-2 personnes)', min: 0, max: 12, valueUnit: 'L' },
    { id: '16l', label: 'Adoucisseur 16 L (3-4 personnes)', min: 12, max: 16, valueUnit: 'L' },
    { id: '20l', label: 'Adoucisseur 20 L+ (5 personnes et +)', min: 16, max: 100, valueUnit: 'L' },
  ],
}

export const BRAND_COVERAGE: Record<InstallationType, string[]> = {
  'pac-air-eau': ['ariston', 'atlantic', 'daikin', 'thermor', 'panasonic', 'mitsubishi-electric', 'altech'],
  'pac-air-air': ['atlantic', 'daikin', 'panasonic', 'mitsubishi-electric', 'altech'],
  'chauffe-eau-thermo': ['ariston', 'atlantic', 'thermor', 'altech'],
  adoucisseur: ['bwt', 'altech'],
}
