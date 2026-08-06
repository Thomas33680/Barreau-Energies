import type { InstallationType } from '../types'

export interface OptionDef {
  id: string
  label: string
  defaultPrice: number
  perUnit?: boolean
  unitLabel?: string
  /** answers key + expected value that auto-suggests enabling this option */
  autoSuggestIf?: { fieldId: string; equals: string | boolean }
}

const commonOptions: OptionDef[] = [
  {
    id: 'depose_ancien',
    label: 'Dépose et évacuation ancien équipement',
    defaultPrice: 150,
  },
  {
    id: 'ligne_electrique_dediee',
    label: 'Création ligne électrique dédiée',
    defaultPrice: 280,
    autoSuggestIf: { fieldId: 'ligne_dediee_a_creer', equals: true },
  },
]

export const OPTIONS: Record<InstallationType, OptionDef[]> = {
  'pac-air-eau': [
    ...commonOptions,
    {
      id: 'percement_mur',
      label: 'Percement mur / traversée supplémentaire',
      defaultPrice: 120,
      autoSuggestIf: { fieldId: 'percement_supplementaire', equals: true },
    },
    {
      id: 'liaison_hydraulique_excedentaire',
      label: 'Liaison hydraulique excédentaire (au-delà de 10 m)',
      defaultPrice: 35,
      perUnit: true,
      unitLabel: 'mètre',
    },
    {
      id: 'desembouage',
      label: 'Purge / désembouage du circuit existant',
      defaultPrice: 220,
      autoSuggestIf: { fieldId: 'desembouage_necessaire', equals: true },
    },
  ],
  'pac-air-air': [
    ...commonOptions,
    {
      id: 'liaison_frigo_excedentaire',
      label: 'Liaison frigorifique excédentaire (au-delà de 5 m par unité)',
      defaultPrice: 45,
      perUnit: true,
      unitLabel: 'mètre',
    },
    {
      id: 'unite_interieure_supplementaire',
      label: 'Unité intérieure supplémentaire',
      defaultPrice: 450,
      perUnit: true,
      unitLabel: 'unité',
    },
  ],
  'chauffe-eau-thermo': [
    ...commonOptions,
    {
      id: 'gainage_air',
      label: "Gainage air extrait/rejeté (local non ventilé)",
      defaultPrice: 320,
      autoSuggestIf: { fieldId: 'local_ventile', equals: false },
    },
    {
      id: 'adoucisseur_bwt',
      label: 'Adoucisseur / traitement d\'eau BWT (option)',
      defaultPrice: 890,
      autoSuggestIf: { fieldId: 'eau_dure', equals: true },
    },
  ],
  adoucisseur: [
    {
      id: 'depose_ancien',
      label: 'Dépose et évacuation ancien adoucisseur',
      defaultPrice: 150,
      autoSuggestIf: { fieldId: 'adoucisseur_existant', equals: true },
    },
    {
      id: 'creation_evacuation',
      label: 'Création d\'une évacuation pour la régénération',
      defaultPrice: 180,
      autoSuggestIf: { fieldId: 'evacuation_disponible', equals: false },
    },
    {
      id: 'bypass_general',
      label: "Pose d'un bypass général",
      defaultPrice: 90,
    },
    {
      id: 'kit_sel_demarrage',
      label: 'Kit de sel de démarrage (1 an)',
      defaultPrice: 60,
    },
  ],
}
