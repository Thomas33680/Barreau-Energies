export const BRAND_LOGOS: Record<string, string> = {
  Ariston: '/brands/ariston.png',
  Atlantic: '/brands/atlantic.webp',
  Daikin: '/brands/daikin.webp',
  Thermor: '/brands/thermor.webp',
  Panasonic: '/brands/panasonic.webp',
  'Mitsubishi Electric': '/brands/mitsubishi-electric.png',
  BWT: '/brands/bwt.png',
  Altech: '/brands/altech.webp',
}

export function brandLogo(brand: string): string | undefined {
  return BRAND_LOGOS[brand]
}
