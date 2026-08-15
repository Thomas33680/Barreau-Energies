export const projectTypes = [
  { id: "pac-air-air", label: "PAC air/air" },
  { id: "pac-air-eau", label: "PAC air/eau" },
  { id: "ballon-thermodynamique", label: "Ballon thermodynamique" },
  { id: "chauffe-eau-electrique", label: "Chauffe-eau électrique" },
  { id: "adoucisseur", label: "Adoucisseur" },
] as const;

export const surfaceRanges = [
  { id: "moins-50", label: "Moins de 50 m²", test: (s: number) => s < 50 },
  { id: "50-100", label: "50 à 100 m²", test: (s: number) => s >= 50 && s <= 100 },
  { id: "100-150", label: "100 à 150 m²", test: (s: number) => s > 100 && s <= 150 },
  { id: "plus-150", label: "Plus de 150 m²", test: (s: number) => s > 150 },
] as const;

export const housingCategories = [
  { id: "maison-ancienne", label: "Maison ancienne" },
  { id: "maison-recente", label: "Maison récente" },
  { id: "appartement", label: "Appartement" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["id"];
export type HousingCategory = (typeof housingCategories)[number]["id"];

export type Project = {
  key: string;
  title: string;
  location: string;
  commune: string;
  projectType: ProjectType;
  surfaceM2: number;
  housingCategory: HousingCategory;
  specs: {
    housingType: string;
    surface: string;
    solution: string;
    brand: string;
    power: string;
  };
  context: string;
  problem: string;
  solution: string;
  whySolution: string;
  material: string;
  result: string;
  /** Dimensions réelles du fichier, pour afficher chaque photo entière (sans recadrage) au bon ratio. */
  photos: { src: string; width: number; height: number }[];
};

export const projects: Project[] = [
  {
    key: "parigne-leveque-climatisation",
    title: "Climatisation réversible mono-split",
    location: "Parigné-l'Évêque (72250)",
    commune: "Parigné-l'Évêque",
    projectType: "pac-air-air",
    surfaceM2: 55,
    housingCategory: "maison-ancienne",
    specs: {
      housingType: "Maison individuelle",
      surface: "55 m²",
      solution: "PAC air/air mono-split Hyper Heating Wi-Fi",
      brand: "Mitsubishi Electric",
      power: "5 kW",
    },
    context:
      "Maison individuelle avec un séjour traversant, peu isolé, difficile à rafraîchir l'été et coûteux à chauffer l'hiver avec des convecteurs électriques.",
    problem:
      "Le client cherchait une solution unique pour assurer confort d'été et confort d'hiver, sans multiplier les équipements ni engager de travaux lourds sur le circuit de chauffage existant.",
    solution:
      "Pour répondre au besoin du client, nous avons installé une climatisation réversible Mitsubishi Electric dimensionnée pour assurer un confort optimal été comme hiver, tout en limitant la consommation d'énergie. L'installation est également équipée d'une connexion Wi-Fi, permettant un pilotage à distance depuis un smartphone, pour un confort et une maîtrise de la consommation au quotidien.",
    whySolution:
      "Nous avons retenu une climatisation réversible plutôt qu'une PAC air/eau car le logement était chauffé par des convecteurs électriques en plus d'une cheminée à insert et le client souhaitait limiter les travaux.",
    material:
      "Groupe extérieur et unité murale Mitsubishi Electric (gamme Hyper Heating, pilotage Wi-Fi), liaison frigorifique et raccordement électrique aux normes, mise en service et réglages personnalisés.",
    result:
      "Le client bénéficie désormais d'un séjour confortable toute l'année avec une consommation de chauffage réduite par rapport à ses anciens convecteurs électriques.",
    photos: [
      { src: "/realisations/parigne-leveque-climatisation-1.jpg", width: 1672, height: 941 },
    ],
  },
  {
    key: "ruaudin-chauffe-eau-electrique",
    title: "Chauffe-eau électrique compact",
    location: "Ruaudin (72230)",
    commune: "Ruaudin",
    projectType: "chauffe-eau-electrique",
    surfaceM2: 90,
    housingCategory: "maison-ancienne",
    specs: {
      housingType: "Maison individuelle (rénovation)",
      surface: "Salle de bain à espace réduit",
      solution: "Chauffe-eau électrique compact",
      brand: "Thermor",
      power: "Adaptée à la contrainte d'espace",
    },
    context:
      "Maison individuelle en cours de rénovation, avec une salle de bain offrant peu d'espace disponible pour l'installation d'un nouveau chauffe-eau.",
    problem:
      "Le client avait besoin d'un ballon d'eau chaude électrique installé dans un espace restreint, avec une solution rapide à mettre en œuvre et maîtrisée en budget.",
    solution:
      "Nous avons installé un chauffe-eau électrique Thermor dimensionné pour s'intégrer dans l'espace disponible, dissimulé dans un placard à porte coulissante pour préserver l'esthétique de la salle de bain.",
    whySolution:
      "Le chauffe-eau électrique classique répondait à la fois à la contrainte d'espace, au besoin de rapidité d'installation et à un budget maîtrisé, sans nécessiter d'aménagement supplémentaire.",
    material:
      "Chauffe-eau électrique Thermor, raccordement hydraulique et électrique aux normes, mise en service.",
    result:
      "Le client dispose désormais d'une production d'eau chaude fiable, installée proprement dans un espace réduit sans compromis sur l'esthétique de sa salle de bain rénovée.",
    photos: [
      { src: "/realisations/ruaudin-chauffe-eau-electrique-1.jpg", width: 1086, height: 1448 },
    ],
  },
  {
    key: "lemans-chauffe-eau-electrique",
    title: "Chauffe-eau électrique plat",
    location: "Le Mans (72000)",
    commune: "Le Mans",
    projectType: "chauffe-eau-electrique",
    surfaceM2: 60,
    housingCategory: "appartement",
    specs: {
      housingType: "Appartement",
      surface: "Salle de bain, contrainte d'espace",
      solution: "Chauffe-eau électrique plat",
      brand: "Thermor",
      power: "Adaptée à la contrainte d'espace",
    },
    context:
      "Appartement au Mans avec un chauffe-eau électrique existant tombé en panne, installé dans un espace de rangement réduit.",
    problem:
      "Le client avait besoin de remplacer en urgence son chauffe-eau hors service, avec une contrainte d'espace imposant un modèle compact.",
    solution:
      "Nous avons installé un chauffe-eau électrique Thermor au format plat, adapté à l'espace disponible dans le placard technique, en remplacement de l'ancien appareil défaillant.",
    whySolution:
      "Le format plat permettait de respecter la contrainte d'espace du logement tout en assurant une production d'eau chaude fiable, sans travaux de gros œuvre.",
    material:
      "Chauffe-eau électrique Thermor au format plat, dépose de l'ancien appareil, raccordement hydraulique et électrique aux normes, mise en service.",
    result:
      "Le client dispose à nouveau d'une production d'eau chaude fiable, avec un appareil compact parfaitement intégré à son espace de rangement.",
    photos: [
      { src: "/realisations/lemans-chauffe-eau-electrique-1.jpg", width: 1448, height: 1086 },
    ],
  },
  {
    key: "arnage-climatisation-murale",
    title: "Climatisation réversible mono-split",
    location: "Arnage (72230)",
    commune: "Arnage",
    projectType: "pac-air-air",
    surfaceM2: 35,
    housingCategory: "maison-ancienne",
    specs: {
      housingType: "Maison individuelle",
      surface: "35 m²",
      solution: "PAC air/air mono-split Wi-Fi",
      brand: "Mitsubishi Electric",
      power: "3,1 kW",
    },
    context:
      "Maison individuelle de caractère (pierre et poutres apparentes), avec une pièce de vie de 35 m² à climatiser.",
    problem:
      "Le client souhaitait rafraîchir et chauffer sa pièce de vie de 35 m², avec une solution discrète et pilotable à distance.",
    solution:
      "Nous avons installé un split mural Mitsubishi Electric de 3,1 kW avec option Wi-Fi, dimensionné pour la surface de la pièce.",
    whySolution:
      "Une puissance de 3,1 kW correspond au besoin réel d'une pièce de 35 m², et l'option Wi-Fi permet un pilotage à distance depuis un smartphone.",
    material:
      "Groupe extérieur et unité murale Mitsubishi Electric 3,1 kW (option Wi-Fi), liaison frigorifique et raccordement électrique aux normes, mise en service.",
    result:
      "Le client bénéficie d'un confort thermique toute l'année dans sa pièce de vie, avec un pilotage simple depuis son smartphone.",
    photos: [
      { src: "/realisations/arnage-climatisation-murale-1.jpg", width: 1448, height: 1086 },
    ],
  },
  {
    key: "lemans-chauffe-eau-200l",
    title: "Chauffe-eau électrique 200 L",
    location: "Le Mans (72000)",
    commune: "Le Mans",
    projectType: "chauffe-eau-electrique",
    surfaceM2: 90,
    housingCategory: "maison-ancienne",
    specs: {
      housingType: "Maison individuelle",
      surface: "Salle de bain",
      solution: "Chauffe-eau électrique 200 L",
      brand: "Thermor",
      power: "200 L",
    },
    context:
      "Maison individuelle au Mans, avec un ancien chauffe-eau électrique à remplacer.",
    problem:
      "Le client souhaitait remplacer son ancien chauffe-eau par un modèle neuf, avec une capacité adaptée aux besoins du foyer.",
    solution:
      "Nous avons installé un chauffe-eau électrique Thermor de 200 litres en remplacement de l'ancien appareil.",
    whySolution:
      "Une capacité de 200 litres correspond aux besoins d'un foyer, offrant un bon compromis entre autonomie en eau chaude et encombrement.",
    material:
      "Chauffe-eau électrique Thermor 200 L, dépose de l'ancien appareil, raccordement hydraulique et électrique aux normes, mise en service.",
    result:
      "Le client dispose d'une production d'eau chaude fiable et renouvelée, avec un équipement neuf garanti.",
    photos: [
      { src: "/realisations/lemans-chauffe-eau-200l-1.jpg", width: 1448, height: 1086 },
    ],
  },
];
