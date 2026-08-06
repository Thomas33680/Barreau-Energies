import type { InstallationTypeInfo } from '../types'

export const INSTALLATION_TYPES: InstallationTypeInfo[] = [
  {
    id: 'pac-air-eau',
    label: 'Pompe à chaleur Air/Eau',
    shortLabel: 'PAC Air/Eau',
    description: 'Chauffage central (radiateurs, plancher chauffant) et éventuellement eau chaude sanitaire.',
    icon: '🌡️',
  },
  {
    id: 'pac-air-air',
    label: 'Pompe à chaleur Air/Air (climatisation)',
    shortLabel: 'Clim / PAC Air/Air',
    description: 'Climatisation réversible mono-split, multi-split ou gainable.',
    icon: '❄️',
  },
  {
    id: 'chauffe-eau-thermo',
    label: 'Chauffe-eau thermodynamique',
    shortLabel: 'Chauffe-eau thermo',
    description: "Production d'eau chaude sanitaire par pompe à chaleur.",
    icon: '🚿',
  },
]

export function getInstallationTypeInfo(id: string | null | undefined): InstallationTypeInfo | undefined {
  return INSTALLATION_TYPES.find((t) => t.id === id)
}
