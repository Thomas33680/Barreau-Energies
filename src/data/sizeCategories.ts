import type { InstallationType, ProductTier } from '../types'

export interface TierPriceRange {
  min: number
  max: number
}

export interface SizeCategory {
  id: string
  label: string
  /** power range in kW, or volume range in L for chauffe-eau-thermo (see valueUnit) */
  min: number
  max: number
  valueUnit: 'kW' | 'L'
  laborHours: number
  pricing: Record<ProductTier, TierPriceRange>
}

// Indicative material price ranges (HT), for the company's own tariff reference.
// Fully editable defaults - adjust in "Réglages tarifs" to match real supplier costs.
export const SIZE_CATEGORIES: Record<InstallationType, SizeCategory[]> = {
  'pac-air-eau': [
    {
      id: 'petite',
      label: 'Petite puissance',
      min: 0,
      max: 6,
      valueUnit: 'kW',
      laborHours: 9,
      pricing: {
        entree: { min: 4500, max: 6000 },
        milieu: { min: 6500, max: 8500 },
        haut: { min: 9000, max: 11500 },
      },
    },
    {
      id: 'moyenne',
      label: 'Puissance moyenne',
      min: 6,
      max: 10,
      valueUnit: 'kW',
      laborHours: 10,
      pricing: {
        entree: { min: 6000, max: 7500 },
        milieu: { min: 8000, max: 10500 },
        haut: { min: 11000, max: 14000 },
      },
    },
    {
      id: 'grande',
      label: 'Grande puissance',
      min: 10,
      max: 100,
      valueUnit: 'kW',
      laborHours: 12,
      pricing: {
        entree: { min: 8000, max: 10000 },
        milieu: { min: 10500, max: 13500 },
        haut: { min: 14000, max: 18000 },
      },
    },
  ],
  'pac-air-air': [
    {
      id: 'mono-split',
      label: 'Mono-split (1 pièce)',
      min: 0,
      max: 3.5,
      valueUnit: 'kW',
      laborHours: 4,
      pricing: {
        entree: { min: 1200, max: 1800 },
        milieu: { min: 1800, max: 2500 },
        haut: { min: 2600, max: 3500 },
      },
    },
    {
      id: 'multi-split',
      label: 'Multi-split (2-3 pièces)',
      min: 3.5,
      max: 7,
      valueUnit: 'kW',
      laborHours: 7,
      pricing: {
        entree: { min: 2800, max: 3800 },
        milieu: { min: 3800, max: 5200 },
        haut: { min: 5500, max: 7500 },
      },
    },
    {
      id: 'multi-gainable',
      label: 'Multi-split / gainable (4+ pièces)',
      min: 7,
      max: 100,
      valueUnit: 'kW',
      laborHours: 12,
      pricing: {
        entree: { min: 5500, max: 7500 },
        milieu: { min: 7500, max: 10500 },
        haut: { min: 11000, max: 15000 },
      },
    },
  ],
  'chauffe-eau-thermo': [
    {
      id: '200l',
      label: 'Ballon 200 L (1-2 personnes)',
      min: 0,
      max: 200,
      valueUnit: 'L',
      laborHours: 4,
      pricing: {
        entree: { min: 1800, max: 2200 },
        milieu: { min: 2300, max: 2800 },
        haut: { min: 2900, max: 3500 },
      },
    },
    {
      id: '270l',
      label: 'Ballon 270 L (3-4 personnes)',
      min: 200,
      max: 270,
      valueUnit: 'L',
      laborHours: 4.5,
      pricing: {
        entree: { min: 2100, max: 2500 },
        milieu: { min: 2600, max: 3100 },
        haut: { min: 3200, max: 3900 },
      },
    },
    {
      id: '300l',
      label: 'Ballon 300 L+ (5 personnes et +)',
      min: 270,
      max: 1000,
      valueUnit: 'L',
      laborHours: 5,
      pricing: {
        entree: { min: 2400, max: 2900 },
        milieu: { min: 3000, max: 3600 },
        haut: { min: 3700, max: 4500 },
      },
    },
  ],
}

export const BRAND_COVERAGE: Record<InstallationType, string[]> = {
  'pac-air-eau': ['ariston', 'atlantic', 'daikin', 'thermor', 'panasonic', 'mitsubishi-electric', 'altech'],
  'pac-air-air': ['atlantic', 'daikin', 'panasonic', 'mitsubishi-electric', 'altech'],
  'chauffe-eau-thermo': ['ariston', 'atlantic', 'thermor', 'altech'],
}
