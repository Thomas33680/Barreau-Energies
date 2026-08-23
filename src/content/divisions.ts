export type Phase = "now" | "next" | "later";

export const phaseLabel: Record<Phase, string> = {
  now: "Disponible",
  next: "Bientôt",
  later: "À venir",
};

export interface CatalogService {
  code: string;
  name: string;
  phase: Phase;
  type: string;
}

export interface OfferTier {
  level: string;
  promise: string;
  content: string;
}

export interface Offer {
  name: string;
  pitch: string;
  tiers: OfferTier[];
}

export interface Division {
  key: "climate" | "water" | "energy" | "home" | "care";
  slug: string;
  name: string;
  title: string;
  mission: string;
  summary: string;
  color: "climate" | "water" | "energy" | "air" | "care";
  features: string[];
  catalog: CatalogService[];
  offer?: Offer;
  phase: Phase;
}

export const divisions: Division[] = [
  {
    key: "climate",
    slug: "climate",
    name: "CLIMATE",
    title: "Confort thermique",
    mission: "Installer et optimiser le chauffage et le rafraîchissement.",
    summary:
      "Pompes à chaleur air/air et air/eau, gainable, régulation : des installations dimensionnées pour votre logement, mises en service et expliquées.",
    color: "climate",
    phase: "now",
    features: [
      "PAC air/air mono et multi-split",
      "PAC air/eau",
      "Gainable / zoning lorsque pertinent",
      "Régulation et thermostats",
      "Mise en service et optimisation",
      "Diagnostic de performance PAC",
      "Remplacement et modernisation",
    ],
    catalog: [
      { code: "C01", name: "PAC air/air — installation", phase: "now", type: "Installation" },
      { code: "C02", name: "PAC air/eau — installation", phase: "now", type: "Installation" },
      { code: "C03", name: "Gainable / zoning", phase: "now", type: "Installation" },
      { code: "C06", name: "Entretien clim / PAC", phase: "now", type: "Récurrent" },
      { code: "C04", name: "Régulation / thermostat", phase: "next", type: "Upgrade" },
      { code: "C05", name: "PAC Performance Check", phase: "next", type: "Diagnostic" },
    ],
    offer: {
      name: "PAC Performance",
      pitch: "Une offre indépendante de la vente de PAC : évaluer, régler, suivre.",
      tiers: [
        { level: "Check", promise: "Évaluer", content: "Températures, régulation, hydraulique, consommations disponibles" },
        { level: "Tune", promise: "Optimiser", content: "Réglages, programmation, recommandations" },
        { level: "Monitor", promise: "Suivre", content: "Mesure et revue après période de fonctionnement" },
      ],
    },
  },
  {
    key: "water",
    slug: "water",
    name: "WATER",
    title: "Eau & protection",
    mission: "Traiter l'eau, produire l'ECS et prévenir les dégâts.",
    summary:
      "Adoucisseurs, chauffe-eau thermodynamiques et électriques, traitement ciblé : l'eau de votre logement, produite et protégée.",
    color: "water",
    phase: "now",
    features: [
      "Adoucisseurs",
      "Filtration et traitement ciblé",
      "Chauffe-eau thermodynamique",
      "Chauffe-eau électrique",
      "Water Protect : détection et coupure automatique",
      "Contrôle pression / réducteur",
      "Capteurs locaux dans zones critiques",
    ],
    catalog: [
      { code: "W01", name: "Adoucisseur", phase: "now", type: "Installation" },
      { code: "W02", name: "Chauffe-eau thermodynamique", phase: "now", type: "Installation" },
      { code: "W03", name: "Chauffe-eau électrique", phase: "now", type: "Installation" },
      { code: "W04", name: "Water Protect Local", phase: "next", type: "Protection" },
      { code: "W05", name: "Water Protect Auto", phase: "next", type: "Protection" },
      { code: "W06", name: "Water Protect Connect", phase: "next", type: "Protection" },
      { code: "W07", name: "Contrôle pression eau", phase: "next", type: "Diagnostic" },
      { code: "W08", name: "Filtration eau", phase: "later", type: "Installation" },
    ],
    offer: {
      name: "Water Protect",
      pitch: "Vendre la protection du logement, pas la vanne.",
      tiers: [
        { level: "Local", promise: "Détecter au point critique", content: "1 à 3 capteurs ciblés + test" },
        { level: "Auto", promise: "Couper l'eau en cas d'anomalie", content: "Détection générale + vanne motorisée" },
        { level: "Connect", promise: "Être alerté et agir à distance", content: "Coupure + notification + suivi" },
        { level: "360", promise: "Protection globale", content: "Système + capteurs stratégiques + contrôle annuel" },
      ],
    },
  },
  {
    key: "energy",
    slug: "energy",
    name: "ENERGY",
    title: "Électricité & pilotage",
    mission: "Rendre les usages visibles, pilotables et compatibles avec les nouveaux rythmes énergétiques.",
    summary:
      "Mesure des circuits principaux, pilotage de l'ECS et de la PAC, gestion de l'autoconsommation : la brique de pilotage qui arrive après l'équipement.",
    color: "energy",
    phase: "next",
    features: [
      "Sous-comptage et mesure",
      "Pilotage ECS / PAC / chauffage",
      "Délestage",
      "Optimisation heures tarifaires",
      "Gestionnaire d'énergie / HEMS",
      "Optimisation autoconsommation",
      "Recharge VE intelligente — phase future et qualification adaptée",
    ],
    catalog: [
      { code: "E01", name: "Energy Check", phase: "next", type: "Diagnostic" },
      { code: "E02", name: "Mesure circuits principaux", phase: "next", type: "Pilotage" },
      { code: "E03", name: "Pilotage ECS / heures tarifaires", phase: "next", type: "Pilotage" },
      { code: "E04", name: "Délestage intelligent", phase: "later", type: "Pilotage" },
      { code: "E05", name: "HEMS / gestionnaire énergie", phase: "later", type: "Plateforme" },
      { code: "E06", name: "Optimisation autoconsommation", phase: "later", type: "Pilotage" },
      { code: "E07", name: "Recharge VE intelligente", phase: "later", type: "Installation" },
    ],
    offer: {
      name: "Energy Control",
      pitch: "Rendre les gros usages électriques mesurables et pilotables.",
      tiers: [
        { level: "Measure", promise: "Comprendre", content: "Mesure générale + principaux usages" },
        { level: "Control", promise: "Programmer", content: "ECS/PAC + plages tarifaires" },
        { level: "Flex", promise: "Limiter / décaler", content: "Délestage + logique de priorité" },
        { level: "HEMS", promise: "Orchestrer", content: "PAC, ECS, PV, VE selon compatibilités" },
      ],
    },
  },
  {
    key: "home",
    slug: "home",
    name: "HOME",
    title: "Air & systèmes maison",
    mission: "Étendre la maîtrise technique du logement sans devenir entreprise générale du bâtiment.",
    summary:
      "Ventilation, qualité de l'air, capteurs ciblés pour une maison absente : la maîtrise technique du logement au-delà du chauffage et de l'eau.",
    color: "air",
    phase: "later",
    features: [
      "Ventilation résidentielle",
      "Contrôle fonctionnement VMC",
      "Mesure humidité / CO2 lorsque utile",
      "Qualité d'air et filtration selon équipements",
      "Maison absente : capteurs techniques ciblés",
      "Intégration de capteurs non intrusifs",
    ],
    catalog: [
      { code: "H01", name: "Contrôle VMC", phase: "next", type: "Diagnostic" },
      { code: "H02", name: "Ventilation résidentielle", phase: "later", type: "Installation" },
      { code: "H03", name: "Maison Absente", phase: "later", type: "Protection" },
    ],
  },
  {
    key: "care",
    slug: "care",
    name: "CARE",
    title: "Maintenance & assistance",
    mission: "Créer une relation continue autour de l'équipement installé.",
    summary:
      "Entretiens, rappels, suivi des garanties, Passeport Maison : la relation qui continue après le chantier, aujourd'hui via l'entretien, bientôt via l'abonnement.",
    color: "care",
    phase: "now",
    features: [
      "Entretiens périodiques",
      "Dépannage prioritaire",
      "Contrôles préventifs",
      "Rappels consommables",
      "Suivi des garanties",
      "Passeport Maison",
      "Abonnements / memberships",
    ],
    catalog: [
      { code: "S01", name: "Barreau Home Check", phase: "next", type: "Diagnostic" },
      { code: "S02", name: "Passeport Maison", phase: "next", type: "Data" },
      { code: "S03", name: "Barreau Care", phase: "next", type: "Abonnement" },
      { code: "S04", name: "Dépannage prioritaire membre", phase: "next", type: "Service" },
    ],
    offer: {
      name: "Barreau Care",
      pitch: "L'abonnement comme conséquence de la valeur créée, pas comme une taxe.",
      tiers: [
        { level: "Care", promise: "Simplicité", content: "Rappels + dossier + priorité relative — 1 équipement" },
        { level: "Care+", promise: "Prévention", content: "Entretien(s) + contrôles ciblés + remise membre — plusieurs équipements" },
        { level: "Care Protect", promise: "Sérénité", content: "Contrôles capteurs / alertes compatibles + maintenance — foyer connecté" },
      ],
    },
  },
];

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}

export const crossSell = [
  { from: "PAC air/air", next: "Entretien", second: "Energy Control", third: "Protection électrique / Home Check" },
  { from: "PAC air/eau", next: "PAC Performance", second: "Régulation", third: "Care" },
  { from: "Chauffe-eau thermodynamique", next: "Water Protect", second: "Pilotage ECS", third: "Care" },
  { from: "Chauffe-eau électrique", next: "Water Protect", second: "Pilotage ECS", third: "Remplacement futur" },
  { from: "Adoucisseur", next: "Water Protect", second: "Contrôle pression", third: "Care" },
] as const;
