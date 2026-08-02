export const siteConfig = {
  name: "Barreau Énergies",
  tagline: "Le confort thermique en toute confiance.",
  domain: "barreau-energies.fr",
  url: "https://barreau-energies.fr",
  gerant: "Thomas Barreau",
  phone: "06 12 99 62 03",
  phoneHref: "tel:+33612996203",
  email: "barreauenergies@gmail.com",
  address: {
    line: "Parigné-l'Évêque",
    postalCode: "72250",
    zone: "Le Mans et alentours",
    zoneDetailed: "Le Mans et un rayon de 50 km",
    radiusKm: 50,
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
} as const;

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  color: "blue" | "green" | "orange" | "teal" | "amber";
  summary: string;
  description: string;
  points: string[];
  howItWorks: string;
  /** Uniquement pour les services chauffants comparables à un chauffage électrique classique. */
  savings?: string;
  /** Facteur d'économie approximatif vs. chauffage/eau chaude électrique classique (ex : 3.5 = 3,5 fois moins d'énergie consommée). Omis pour les services non concernés (traitement de l'eau, chauffe-eau électrique). */
  comparisonFactor?: number;
};

export const services: Service[] = [
  {
    slug: "pompes-a-chaleur",
    name: "Installation de pompes à chaleur",
    shortName: "Pompes à chaleur",
    color: "green",
    summary:
      "Chauffage économique et écologique pour toute l'année, air/eau ou air/air.",
    description:
      "Nous étudions votre logement pour dimensionner et installer la pompe à chaleur la plus adaptée à vos besoins : confort thermique toute l'année, baisse de la facture énergétique et solution durable pour l'environnement.",
    points: [
      "Étude thermique et dimensionnement sur mesure",
      "Pompes à chaleur air/eau et air/air",
      "Matériel de qualité, marques reconnues",
      "Mise en service et suivi après installation",
    ],
    howItWorks:
      "Une pompe à chaleur ne « fabrique » pas la chaleur : elle capte les calories déjà présentes dans l'air extérieur, même par temps froid, et les concentre pour chauffer votre logement. On distingue deux systèmes : la pompe à chaleur air/air diffuse directement de l'air chaud (ou frais) dans les pièces via des unités murales — c'est la même technologie qu'une climatisation réversible, sans travaux sur votre circuit de chauffage. La pompe à chaleur air/eau, elle, chauffe l'eau qui circule dans vos radiateurs ou votre plancher chauffant, et peut aussi produire votre eau chaude sanitaire : c'est la solution la plus adaptée pour remplacer une chaudière fioul ou gaz.",
    savings:
      "Une pompe à chaleur restitue en moyenne 3 à 4 kWh de chaleur pour seulement 1 kWh d'électricité consommé (ce rapport s'appelle le COP, coefficient de performance). Concrètement, à confort égal, elle consomme donc 3 à 4 fois moins d'énergie qu'un chauffage électrique classique (convecteurs), ce qui se traduit par une baisse significative et durable de votre facture de chauffage.",
    comparisonFactor: 3.5,
  },
  {
    slug: "climatisation",
    name: "Installation de climatisation",
    shortName: "Climatisation",
    color: "blue",
    summary: "Rafraîchissement et qualité de l'air pour votre habitat ou vos locaux.",
    description:
      "Réversibles ou non, nos solutions de climatisation s'adaptent à votre logement ou vos locaux professionnels pour un confort optimal en toute saison, avec un souci constant de performance énergétique.",
    points: [
      "Climatisation réversible (chaud/froid)",
      "Mono-split et multi-split",
      "Installation soignée, discrète et durable",
      "Conseils d'entretien pour préserver la performance",
    ],
    howItWorks:
      "Une climatisation réversible fonctionne exactement comme une pompe à chaleur air/air : elle capte les calories de l'air extérieur pour chauffer votre intérieur en hiver, et inverse simplement son cycle pour rafraîchir en été. Un même équipement assure donc confort d'hiver et confort d'été, sans avoir besoin d'un second système de chauffage.",
    savings:
      "Utilisée pour le chauffage, une climatisation réversible consomme 3 à 4 fois moins d'électricité qu'un radiateur électrique classique pour produire la même quantité de chaleur (grâce à son COP de 3 à 4). C'est donc un investissement qui s'amortit aussi sur votre facture de chauffage, pas seulement en été.",
    comparisonFactor: 3.5,
  },
  {
    slug: "chauffe-eau-thermodynamique",
    name: "Installation de chauffe-eau thermodynamiques",
    shortName: "Chauffe-eau thermodynamique",
    color: "orange",
    summary: "Eau chaude sanitaire économique grâce à l'énergie captée dans l'air.",
    description:
      "Le chauffe-eau thermodynamique utilise les calories de l'air pour chauffer votre eau sanitaire, avec une consommation électrique fortement réduite par rapport à un ballon classique.",
    points: [
      "Jusqu'à 70 % d'économies sur la facture d'eau chaude",
      "Adapté à la maison individuelle comme à la rénovation",
      "Installation propre et rapide",
      "Un conseil personnalisé pour bien dimensionner votre équipement",
    ],
    howItWorks:
      "Aussi appelé « ballon thermodynamique », cet équipement associe un ballon d'eau chaude classique à une petite pompe à chaleur intégrée. Celle-ci capte les calories de l'air ambiant (buanderie, garage ou air extérieur selon le modèle) pour chauffer l'eau, au lieu d'utiliser une résistance électrique qui consomme beaucoup d'énergie. Il ne chauffe que l'eau sanitaire (douche, robinets), pas votre logement.",
    savings:
      "Grâce à sa pompe à chaleur intégrée, un chauffe-eau thermodynamique consomme environ 3 fois moins d'électricité qu'un cumulus électrique classique à résistance pour produire la même quantité d'eau chaude, soit jusqu'à 70 % d'économies sur ce poste de votre facture.",
    comparisonFactor: 3,
  },
  {
    slug: "chauffe-eau-electrique",
    name: "Installation de chauffe-eau électriques",
    shortName: "Chauffe-eau électrique",
    color: "amber",
    summary:
      "Solution simple et économique à l'achat pour votre eau chaude sanitaire.",
    description:
      "En alternative au chauffe-eau thermodynamique, nous installons aussi des chauffe-eau électriques classiques (résistance blindée ou stéatite) : une solution éprouvée, avec un investissement de départ plus faible, adaptée aux petits logements, aux résidences secondaires ou aux budgets serrés.",
    points: [
      "Ballons à résistance blindée ou stéatite",
      "Toutes capacités, du studio à la grande famille",
      "Installation et raccordement aux normes en vigueur",
      "Conseil pour choisir entre chauffe-eau électrique et thermodynamique",
    ],
    howItWorks:
      "Le chauffe-eau électrique chauffe l'eau grâce à une résistance immergée dans le ballon (ou protégée par un fourreau en stéatite, plus adapté aux eaux calcaires). Simple et fiable, il ne nécessite ni unité extérieure ni emplacement technique particulier, contrairement au chauffe-eau thermodynamique.",
  },
  {
    slug: "adoucisseur-eau",
    name: "Installation d'adoucisseurs d'eau",
    shortName: "Adoucisseur d'eau",
    color: "teal",
    summary:
      "Traitement de l'eau dure pour protéger vos installations et votre confort.",
    description:
      "Notre secteur est concerné par une eau particulièrement calcaire. Nous installons des adoucisseurs d'eau pour préserver la durée de vie de vos équipements (chauffe-eau, pompe à chaleur, robinetterie, électroménager), réduire votre consommation de produits d'entretien et améliorer votre confort au quotidien.",
    points: [
      "Diagnostic de la dureté de votre eau",
      "Adoucisseurs à résine, dimensionnés selon votre consommation",
      "Protection de vos équipements et canalisations contre le calcaire",
      "Mise en service et suivi de l'entretien (sel, régénération)",
    ],
    howItWorks:
      "Un adoucisseur capte le calcium et le magnésium responsables de la dureté de l'eau grâce à une résine échangeuse d'ions, et les remplace par des ions sodium. L'eau distribuée dans votre logement est ainsi débarrassée du calcaire, ce qui protège durablement vos canalisations et tous les appareils utilisant de l'eau chaude.",
  },
];

export const partnerBrands = [
  { name: "Mitsubishi Electric", logo: "/brands/mitsubishi-electric.png", width: 540, height: 158 },
  { name: "Daikin", logo: "/brands/daikin.png", width: 310, height: 76 },
  { name: "Altech", logo: "/brands/altech.png", width: 245, height: 61 },
  { name: "Atlantic", logo: "/brands/atlantic.png", width: 330, height: 78 },
  { name: "Panasonic", logo: "/brands/panasonic.png", width: 296, height: 56 },
  { name: "Thermor", logo: "/brands/thermor.png", width: 240, height: 117 },
] as const;

export const values = [
  {
    name: "Confiance",
    description: "Des installations fiables et durables.",
  },
  {
    name: "Expertise",
    description: "Un savoir-faire technique à votre service.",
  },
  {
    name: "Performance",
    description: "Des solutions éco-performantes et économiques.",
  },
  {
    name: "Proximité",
    description: "Une entreprise locale, réactive et disponible.",
  },
  {
    name: "Responsabilité",
    description: "Des choix durables pour un avenir meilleur.",
  },
  {
    name: "Innovation",
    description: "Des technologies modernes pour votre confort.",
  },
] as const;

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/simulateur", label: "Simulateur" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/faq", label: "FAQ" },
  { href: "/avis", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Quelle est la différence entre une pompe à chaleur air/air et air/eau ?",
    answer:
      "La pompe à chaleur air/air capte les calories de l'air extérieur et les diffuse directement sous forme d'air chaud (ou frais) via des unités murales — c'est la même technologie qu'une climatisation réversible. La pompe à chaleur air/eau chauffe l'eau qui circule dans vos radiateurs ou votre plancher chauffant, et peut aussi produire l'eau chaude sanitaire : elle remplace une chaudière fioul ou gaz. Nous vous aidons à choisir la solution la plus adaptée à votre logement.",
  },
  {
    question: "Proposez-vous un devis gratuit ?",
    answer:
      "Oui, chaque devis est gratuit et sans engagement. Contactez-nous avec quelques informations sur votre logement et votre projet, nous revenons vers vous rapidement.",
  },
  {
    question: "Combien de temps dure une installation ?",
    answer:
      "Cela dépend du type d'équipement et de la configuration de votre logement : comptez généralement d'une demi-journée à deux jours pour une installation standard (climatisation, pompe à chaleur ou chauffe-eau thermodynamique). Un délai précis vous sera communiqué avec votre devis.",
  },
  {
    question: "Vos installations sont-elles garanties ?",
    answer:
      "Oui : nos installations sont couvertes par notre garantie décennale et notre assurance responsabilité civile professionnelle (coordonnées dans nos mentions légales). Chaque équipement bénéficie en complément de la garantie du fabricant, généralement de 2 à 5 ans selon la marque et le modèle.",
  },
  {
    question: "Faut-il entretenir régulièrement une pompe à chaleur ou un climatiseur ?",
    answer:
      "Oui, un entretien régulier (nettoyage des filtres, contrôle du circuit frigorifique) permet de préserver les performances et la durée de vie de votre équipement. Nous pouvons vous conseiller sur le suivi adapté à votre installation.",
  },
  {
    question: "Un chauffe-eau thermodynamique fait-il beaucoup de bruit ?",
    answer:
      "Comme tout équipement avec un compresseur, il émet un léger bruit de fonctionnement, comparable à celui d'un réfrigérateur. Nous étudions avec vous le meilleur emplacement (garage, buanderie...) pour un confort optimal.",
  },
  {
    question: "Dans quelles villes intervenez-vous ?",
    answer:
      "Nous sommes basés à Parigné-l'Évêque (72250) et intervenons au Mans ainsi que dans un rayon de 50 km autour. Consultez notre page Zone d'intervention pour plus de détails, ou contactez-nous directement pour vérifier si nous couvrons votre secteur.",
  },
];

export type Testimonial = {
  name: string;
  location: string;
  service: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

// Aucun avis client réel pour le moment : tableau volontairement vide.
// Ajoutez vos vrais avis ici au fur et à mesure (nom, ville, service, citation, note).
export const testimonials: Testimonial[] = [];

/**
 * Fourchettes de prix indicatives (positionnement haut de gamme : matériel
 * premium + pose incluse). À ajuster si vos tarifs réels diffèrent — ce
 * sont des ordres de grandeur du marché, pas une grille tarifaire figée.
 */
export const simulatorPricing = {
  airEau: { minPerKw: 1600, maxPerKw: 2400 },
  airAir: { minPerKw: 900, maxPerKw: 1300 },
  cet: {
    150: { min: 2800, max: 3600 },
    200: { min: 3000, max: 3900 },
    250: { min: 3400, max: 4300 },
    300: { min: 3800, max: 4800 },
  } as Record<number, { min: number; max: number }>,
} as const;

export const footerLinks = [
  { href: "/zone-intervention", label: "Zone d'intervention" },
  { href: "/mentions-legales", label: "Mentions légales" },
] as const;
