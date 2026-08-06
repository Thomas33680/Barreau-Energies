import type { ChecklistSection, InstallationType } from '../types'

const PRIORITE_FIELD_ID = 'priorite_client'

const electriciteSection: ChecklistSection = {
  id: 'electricite',
  title: 'Installation électrique',
  fields: [
    {
      id: 'alimentation_electrique',
      label: 'Type d\'alimentation disponible',
      type: 'select',
      required: true,
      options: [
        { value: 'mono', label: 'Monophasé 230V' },
        { value: 'tri', label: 'Triphasé 400V' },
        { value: 'inconnu', label: 'À vérifier' },
      ],
    },
    {
      id: 'disjoncteur_dedie',
      label: 'Emplacement disponible pour un disjoncteur dédié',
      type: 'boolean',
    },
    {
      id: 'tableau_aux_normes',
      label: 'Tableau électrique aux normes',
      type: 'boolean',
    },
    {
      id: 'ligne_dediee_a_creer',
      label: 'Une ligne électrique dédiée est à créer',
      type: 'boolean',
      helpText: 'Coché automatiquement en option du devis si oui',
    },
  ],
}

const accesSection: ChecklistSection = {
  id: 'acces',
  title: 'Accès & contraintes chantier',
  fields: [
    { id: 'etage_acces', label: 'Étage / niveau d\'accès', type: 'text', placeholder: 'ex: RDC, 2e étage sans ascenseur' },
    { id: 'ascenseur', label: 'Ascenseur disponible', type: 'boolean' },
    { id: 'stationnement', label: 'Stationnement à proximité pour véhicule utilitaire', type: 'boolean' },
    { id: 'remarques_acces', label: 'Particularités / remarques', type: 'textarea', placeholder: 'Copropriété, accès chantier difficile, animaux, etc.' },
  ],
}

const prioriteField = {
  id: PRIORITE_FIELD_ID,
  label: 'Priorité exprimée par le client',
  type: 'select' as const,
  required: true,
  options: [
    { value: 'prix', label: 'Budget serré / prix avant tout' },
    { value: 'equilibre', label: 'Bon équilibre prix / qualité' },
    { value: 'qualite', label: 'Qualité / performance avant tout' },
  ],
  helpText: 'Utilisé pour orienter la recommandation de matériel',
}

const CHECKLISTS: Record<InstallationType, ChecklistSection[]> = {
  'pac-air-eau': [
    {
      id: 'logement',
      title: 'Logement & isolation',
      fields: [
        {
          id: 'type_logement',
          label: 'Type de logement',
          type: 'select',
          required: true,
          options: [
            { value: 'maison', label: 'Maison individuelle' },
            { value: 'appartement', label: 'Appartement' },
          ],
        },
        { id: 'annee_construction', label: 'Année de construction', type: 'number' },
        { id: 'surface_chauffee', label: 'Surface chauffée', type: 'number', unit: 'm²', required: true },
        { id: 'hauteur_plafond', label: 'Hauteur sous plafond', type: 'number', unit: 'm' },
        {
          id: 'niveau_isolation',
          label: "Niveau d'isolation estimé",
          type: 'select',
          required: true,
          options: [
            { value: 'faible', label: 'Faible (avant 1980, non rénové)' },
            { value: 'moyenne', label: 'Moyenne (rénové partiellement)' },
            { value: 'bonne', label: 'Bonne (rénové / double vitrage)' },
            { value: 'rt2012', label: 'Très bonne (RT2012 ou +)' },
          ],
        },
      ],
    },
    {
      id: 'chauffage_existant',
      title: 'Chauffage existant',
      fields: [
        {
          id: 'chauffage_actuel',
          label: 'Type de chauffage actuel',
          type: 'select',
          options: [
            { value: 'electrique', label: 'Électrique (convecteurs)' },
            { value: 'gaz', label: 'Chaudière gaz' },
            { value: 'fioul', label: 'Chaudière fioul' },
            { value: 'pac', label: 'PAC existante' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        {
          id: 'type_emetteurs',
          label: "Type d'émetteurs en place",
          type: 'select',
          required: true,
          options: [
            { value: 'radiateurs_ht', label: 'Radiateurs haute température' },
            { value: 'radiateurs_bt', label: 'Radiateurs basse température / ventilo-convecteurs' },
            { value: 'plancher_chauffant', label: 'Plancher chauffant' },
            { value: 'mixte', label: 'Mixte' },
          ],
        },
        { id: 'puissance_chaudiere_actuelle', label: 'Puissance chaudière/PAC actuelle', type: 'number', unit: 'kW' },
        { id: 'besoin_ecs', label: "Production d'eau chaude sanitaire couplée souhaitée", type: 'boolean' },
        { id: 'desembouage_necessaire', label: 'Purge / désembouage du circuit existant nécessaire', type: 'boolean' },
      ],
    },
    {
      id: 'emplacement_exterieur',
      title: 'Emplacement unité extérieure',
      fields: [
        {
          id: 'emplacement_ext',
          label: "Emplacement prévu de l'unité extérieure",
          type: 'select',
          options: [
            { value: 'jardin', label: 'Jardin / sol' },
            { value: 'terrasse', label: 'Terrasse' },
            { value: 'toiture', label: 'Toiture' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        { id: 'distance_liaison_hydraulique', label: 'Distance liaison hydraulique intérieur/extérieur', type: 'number', unit: 'm' },
        { id: 'contrainte_acoustique', label: 'Contrainte acoustique / voisinage proche', type: 'boolean' },
        { id: 'percement_supplementaire', label: 'Percement mur supplémentaire nécessaire', type: 'boolean' },
      ],
    },
    electriciteSection,
    accesSection,
    {
      id: 'synthese',
      title: 'Synthèse visite',
      fields: [prioriteField, { id: 'notes_generales', label: 'Notes complémentaires', type: 'textarea' }],
    },
  ],
  'pac-air-air': [
    {
      id: 'besoins',
      title: 'Besoins du client',
      fields: [
        { id: 'nb_pieces', label: 'Nombre de pièces à traiter', type: 'number', required: true },
        { id: 'surface_totale', label: 'Surface totale à traiter', type: 'number', unit: 'm²', required: true },
        {
          id: 'type_systeme',
          label: 'Type de système souhaité',
          type: 'select',
          options: [
            { value: 'mono-split', label: 'Mono-split (1 pièce)' },
            { value: 'multi-split', label: 'Multi-split (plusieurs pièces)' },
            { value: 'gainable', label: 'Gainable' },
          ],
        },
        {
          id: 'usage',
          label: 'Usage souhaité',
          type: 'select',
          options: [
            { value: 'rafraichissement', label: 'Rafraîchissement seul' },
            { value: 'reversible', label: 'Réversible (chauffage + climatisation)' },
          ],
        },
        {
          id: 'niveau_isolation',
          label: "Niveau d'isolation / vitrage",
          type: 'select',
          options: [
            { value: 'faible', label: 'Faible' },
            { value: 'moyenne', label: 'Moyenne' },
            { value: 'bonne', label: 'Bonne' },
            { value: 'rt2012', label: 'Très bonne (RT2012 ou +)' },
          ],
        },
        {
          id: 'orientation',
          label: 'Orientation / exposition principale',
          type: 'select',
          options: [
            { value: 'nord', label: 'Nord' },
            { value: 'sud', label: 'Sud' },
            { value: 'est', label: 'Est' },
            { value: 'ouest', label: 'Ouest' },
            { value: 'multiple', label: 'Multiple / traversant' },
          ],
        },
      ],
    },
    {
      id: 'emplacement_unites',
      title: 'Emplacement des unités',
      fields: [
        {
          id: 'emplacement_ext',
          label: "Emplacement unité(s) extérieure(s)",
          type: 'select',
          options: [
            { value: 'jardin', label: 'Jardin / sol' },
            { value: 'terrasse', label: 'Terrasse' },
            { value: 'toiture', label: 'Toiture' },
            { value: 'facade', label: 'Façade / support mural' },
          ],
        },
        { id: 'distance_liaison_frigo', label: 'Distance liaison frigorifique estimée (moyenne)', type: 'number', unit: 'm' },
        { id: 'emplacement_int', label: 'Emplacement unités intérieures envisagé', type: 'textarea' },
        { id: 'contrainte_acoustique', label: 'Contrainte acoustique / voisinage proche', type: 'boolean' },
      ],
    },
    electriciteSection,
    accesSection,
    {
      id: 'synthese',
      title: 'Synthèse visite',
      fields: [prioriteField, { id: 'notes_generales', label: 'Notes complémentaires', type: 'textarea' }],
    },
  ],
  'chauffe-eau-thermo': [
    {
      id: 'besoin_ecs',
      title: 'Besoin en eau chaude sanitaire',
      fields: [
        { id: 'nb_occupants', label: "Nombre d'occupants du logement", type: 'number', required: true },
        { id: 'ballon_existant', label: 'Ballon existant à déposer', type: 'boolean' },
        { id: 'volume_ballon_actuel', label: 'Volume du ballon actuel', type: 'number', unit: 'L' },
      ],
    },
    {
      id: 'local',
      title: "Local d'installation",
      fields: [
        {
          id: 'emplacement_local',
          label: "Emplacement envisagé",
          type: 'select',
          required: true,
          options: [
            { value: 'cellier', label: 'Cellier / buanderie' },
            { value: 'garage', label: 'Garage' },
            { value: 'combles', label: 'Combles' },
            { value: 'exterieur', label: 'Extérieur sous abri' },
          ],
        },
        { id: 'volume_local', label: 'Volume du local', type: 'number', unit: 'm³' },
        { id: 'local_ventile', label: 'Local ventilé ou gainable vers l\'extérieur', type: 'boolean' },
        { id: 'hors_gel', label: 'Local hors gel toute l\'année', type: 'boolean' },
      ],
    },
    {
      id: 'raccordements',
      title: 'Raccordements',
      fields: [
        { id: 'evacuation_condensats', label: 'Évacuation des condensats possible à proximité', type: 'boolean' },
        { id: 'arrivee_eau', label: "Arrivée/départ d'eau à proximité", type: 'boolean' },
        { id: 'eau_dure', label: "Eau dure / entartrage connu sur le secteur", type: 'boolean', helpText: 'Oriente vers une proposition d\'adoucisseur BWT en option' },
      ],
    },
    electriciteSection,
    accesSection,
    {
      id: 'synthese',
      title: 'Synthèse visite',
      fields: [prioriteField, { id: 'notes_generales', label: 'Notes complémentaires', type: 'textarea' }],
    },
  ],
  adoucisseur: [
    {
      id: 'qualite_eau',
      title: "Besoin & qualité de l'eau",
      fields: [
        { id: 'nb_occupants', label: "Nombre d'occupants du logement", type: 'number', required: true },
        {
          id: 'durete_eau',
          label: "Dureté de l'eau mesurée",
          type: 'select',
          required: true,
          helpText: "Mesure au testeur de dureté ou donnée du fournisseur d'eau local",
          options: [
            { value: 'faible', label: 'Faible (< 15°f)' },
            { value: 'moyenne', label: 'Moyenne (15 à 25°f)' },
            { value: 'elevee', label: 'Élevée (25 à 35°f)' },
            { value: 'tres_elevee', label: 'Très élevée (> 35°f)' },
          ],
        },
        { id: 'gout_odeur_eau', label: "Goût, odeur ou traces de tartre constatés par le client", type: 'boolean' },
      ],
    },
    {
      id: 'existant',
      title: 'Installation existante',
      fields: [
        { id: 'adoucisseur_existant', label: 'Adoucisseur déjà en place à déposer', type: 'boolean' },
        { id: 'marque_modele_existant', label: 'Marque / modèle existant', type: 'text' },
      ],
    },
    {
      id: 'raccordement',
      title: 'Emplacement & raccordement',
      fields: [
        {
          id: 'emplacement_local',
          label: 'Emplacement envisagé',
          type: 'select',
          required: true,
          options: [
            { value: 'cellier', label: 'Cellier / buanderie' },
            { value: 'garage', label: 'Garage' },
            { value: 'sous_evier', label: "Sous évier / meuble cuisine" },
            { value: 'local_technique', label: 'Local technique' },
          ],
        },
        { id: 'arrivee_generale_accessible', label: "Arrivée d'eau générale accessible à cet emplacement", type: 'boolean', required: true },
        {
          id: 'diametre_arrivee',
          label: "Diamètre de l'arrivée d'eau",
          type: 'select',
          options: [
            { value: '15-21', label: '15/21 (standard maison)' },
            { value: '20-27', label: '20/27' },
            { value: '26-34', label: '26/34' },
            { value: 'inconnu', label: 'À vérifier' },
          ],
        },
        { id: 'evacuation_disponible', label: 'Évacuation disponible à proximité (régénération)', type: 'boolean', helpText: 'Nécessaire pour l\'évacuation des eaux de régénération' },
        { id: 'prise_electrique_proximite', label: 'Prise électrique à proximité', type: 'boolean' },
      ],
    },
    accesSection,
    {
      id: 'synthese',
      title: 'Synthèse visite',
      fields: [prioriteField, { id: 'notes_generales', label: 'Notes complémentaires', type: 'textarea' }],
    },
  ],
}

export function getChecklist(type: InstallationType): ChecklistSection[] {
  return CHECKLISTS[type]
}
