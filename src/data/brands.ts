import type { Brand } from '../types'

export const BRANDS: Brand[] = [
  { id: 'ariston', name: 'Ariston', logo: '/logos/ariston.png' },
  { id: 'atlantic', name: 'Atlantic', logo: '/logos/atlantic.webp' },
  { id: 'daikin', name: 'Daikin', logo: '/logos/daikin.webp' },
  { id: 'thermor', name: 'Thermor', logo: '/logos/thermor.webp' },
  { id: 'panasonic', name: 'Panasonic', logo: '/logos/panasonic.webp' },
  { id: 'mitsubishi-electric', name: 'Mitsubishi Electric', logo: '/logos/mitsubishi-electric.png' },
  { id: 'altech', name: 'Altech', logo: '/logos/altech.webp' },
  { id: 'bwt', name: 'BWT', logo: '/logos/bwt.png' },
]

export function getBrand(id: string): Brand | undefined {
  return BRANDS.find((b) => b.id === id)
}
