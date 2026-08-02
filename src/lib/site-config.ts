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
    slug: "climatisation-reversible",
    name: "Installation de climatisation réversible",
    shortName: "Climatisation réversible",
    color: "blue",
    summary:
      "Rafraîchissement l'été, chauffage économique l'hiver, pour un confort optimal toute l'année.",
    description:
      "Réversible, notre climatisation capte les calories de l'air extérieur pour chauffer votre intérieur en hiver et inverse simplement son cycle pour rafraîchir en été — c'est la même technologie qu'une pompe à chaleur air/air. Mono-split ou multi-split, nos installations s'adaptent à votre logement ou vos locaux professionnels pour un confort optimal toute l'année.",
    points: [
      "Climatisation réversible (chaud/froid), aussi appelée PAC air/air",
      "Mono-split et multi-split",
      "Installation soignée, discrète et durable",
      "Conseils d'entretien pour préserver la performance",
    ],
    howItWorks:
      "Une climatisation réversible ne « fabrique » pas la chaleur : elle capte les calories déjà présentes dans l'air extérieur, même par temps froid, et les diffuse directement sous forme d'air chaud (ou frais) dans les pièces via des unités murales. Un même équipement assure donc confort d'hiver et confort d'été, sans avoir besoin d'un second système de chauffage ni de travaux sur un circuit d'eau.",
    savings:
      "Utilisée pour le chauffage, une climatisation réversible consomme 3 à 4 fois moins d'électricité qu'un radiateur électrique classique pour produire la même quantité de chaleur (grâce à son COP de 3 à 4). C'est donc un investissement qui s'amortit aussi sur votre facture de chauffage, pas seulement en été.",
    comparisonFactor: 3.5,
  },
  {
    slug: "pompe-a-chaleur-air-eau",
    name: "Installation de pompes à chaleur air/eau",
    shortName: "Pompe à chaleur air/eau",
    color: "green",
    summary:
      "Remplacez votre chaudière fioul, gaz ou électrique par une pompe à chaleur performante pour réduire votre consommation d'énergie.",
    description:
      "Nous étudions votre logement pour dimensionner et installer la pompe à chaleur air/eau la plus adaptée à vos besoins : elle chauffe l'eau qui circule dans vos radiateurs ou votre plancher chauffant, et peut aussi produire votre eau chaude sanitaire. Confort thermique toute l'année, baisse de la facture énergétique et solution durable pour l'environnement.",
    points: [
      "Étude thermique et dimensionnement sur mesure",
      "Remplacement de chaudière fioul ou gaz",
      "Matériel de qualité, marques reconnues",
      "Mise en service et suivi après installation",
    ],
    howItWorks:
      "Une pompe à chaleur air/eau ne « fabrique » pas la chaleur : elle capte les calories déjà présentes dans l'air extérieur, même par temps froid, et les concentre pour chauffer l'eau qui circule dans vos radiateurs ou votre plancher chauffant. Elle peut aussi produire votre eau chaude sanitaire : c'est la solution la plus adaptée pour remplacer une chaudière fioul ou gaz.",
    savings:
      "Une pompe à chaleur air/eau restitue en moyenne 3 à 4 kWh de chaleur pour seulement 1 kWh d'électricité consommé (ce rapport s'appelle le COP, coefficient de performance). Concrètement, à confort égal, elle consomme donc 3 à 4 fois moins d'énergie qu'un chauffage électrique classique (convecteurs), ce qui se traduit par une baisse significative et durable de votre facture de chauffage.",
    comparisonFactor: 3.5,
  },
  {
    slug: "eau-chaude-sanitaire",
    name: "Installation de chauffe-eau : thermodynamique ou électrique",
    shortName: "Eau chaude sanitaire",
    color: "orange",
    summary:
      "Ballons thermodynamiques et chauffe-eau électriques adaptés à votre logement et à votre budget.",
    description:
      "Pour votre eau chaude sanitaire, nous installons le chauffe-eau thermodynamique — qui utilise les calories de l'air pour chauffer votre eau avec une consommation électrique fortement réduite — ou le chauffe-eau électrique classique, une solution éprouvée avec un investissement de départ plus faible. Nous vous conseillons sur le choix le plus adapté à votre logement et votre budget.",
    points: [
      "Chauffe-eau thermodynamique : jusqu'à 70 % d'économies",
      "Chauffe-eau électrique : résistance blindée ou stéatite",
      "Adapté à la maison individuelle comme à la rénovation",
      "Conseil personnalisé pour bien dimensionner votre équipement",
    ],
    howItWorks:
      "Le chauffe-eau thermodynamique (ou « ballon thermodynamique ») associe un ballon d'eau chaude classique à une petite pompe à chaleur intégrée, qui capte les calories de l'air ambiant pour chauffer l'eau au lieu d'utiliser une résistance électrique gourmande en énergie. Le chauffe-eau électrique classique, lui, chauffe l'eau grâce à une résistance immergée dans le ballon (blindée ou protégée par un fourreau en stéatite) : plus simple, sans unité extérieure, avec un investissement de départ plus faible.",
    savings:
      "Grâce à sa pompe à chaleur intégrée, un chauffe-eau thermodynamique consomme environ 3 fois moins d'électricité qu'un chauffe-eau électrique classique à résistance pour produire la même quantité d'eau chaude, soit jusqu'à 70 % d'économies sur ce poste de votre facture.",
    comparisonFactor: 3,
  },
  {
    slug: "traitement-eau",
    name: "Traitement de l'eau",
    shortName: "Traitement de l'eau",
    color: "teal",
    summary:
      "Adoucisseurs d'eau pour protéger vos installations et améliorer votre confort au quotidien.",
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
  {
    slug: "entretien-depannage",
    name: "Entretien et dépannage",
    shortName: "Entretien & dépannage",
    color: "amber",
    summary:
      "Entretien, maintenance et dépannage de vos équipements pour garantir leurs performances et leur longévité.",
    description:
      "Un entretien régulier préserve les performances, la fiabilité et la durée de vie de vos équipements (pompe à chaleur, climatisation, chauffe-eau, adoucisseur). Nous intervenons aussi en dépannage en cas de panne ou de baisse de performance, pour un diagnostic rapide et une remise en service dans les meilleurs délais.",
    points: [
      "Contrats d'entretien annuel, toutes marques",
      "Nettoyage des filtres et contrôle du circuit frigorifique",
      "Diagnostic de panne et dépannage",
      "Suivi et conseils pour préserver vos performances",
    ],
    howItWorks:
      "Un entretien régulier permet de repérer une baisse de performance ou une anomalie avant qu'elle ne devienne une panne : nettoyage des filtres, contrôle du circuit frigorifique, vérification des pressions et des raccordements. En cas de panne, nous intervenons pour un diagnostic précis et une remise en service rapide de votre installation.",
  },
];

export const partnerBrands = [
  { name: "Mitsubishi Electric", logo: "/brands/mitsubishi-electric.png" },
  { name: "Daikin", logo: "/brands/daikin.png" },
  { name: "Altech", logo: "/brands/altech.png" },
  { name: "Atlantic", logo: "/brands/atlantic.png" },
  { name: "Panasonic", logo: "/brands/panasonic.png" },
  { name: "Thermor", logo: "/brands/thermor.png" },
  { name: "Ariston", logo: "/brands/ariston.png" },
  { name: "BWT", logo: "/brands/bwt.png" },
] as const;

export const values = [
  {
    name: "Devis clair et transparent",
    description: "Un chiffrage détaillé, sans surprise ni frais cachés.",
  },
  {
    name: "Installation soignée",
    description: "Un travail précis et durable, dans le respect de votre logement.",
  },
  {
    name: "Réactivité",
    description: "Des réponses rapides et des interventions dans les meilleurs délais.",
  },
  {
    name: "Entreprise locale",
    description: "Implantée près de chez vous, disponible et à votre écoute.",
  },
  {
    name: "Accompagnement personnalisé",
    description: "Un interlocuteur unique, du premier contact au suivi après travaux.",
  },
  {
    name: "Matériel reconnu",
    description: "Des équipements de marques reconnues, choisis pour leur fiabilité.",
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
      "Cela dépend du type d'équipement et de la configuration de votre logement : comptez généralement d'une demi-journée à deux jours pour une installation standard (climatisation, pompe à chaleur, chauffe-eau ou adoucisseur). Un délai précis vous sera communiqué avec votre devis.",
  },
  {
    question: "Vos installations sont-elles garanties ?",
    answer:
      "Oui : nos installations sont couvertes par notre garantie décennale et notre assurance responsabilité civile professionnelle (coordonnées dans nos mentions légales). Chaque équipement bénéficie en complément de la garantie du fabricant, généralement de 2 à 5 ans selon la marque et le modèle.",
  },
  {
    question: "Faut-il entretenir régulièrement une pompe à chaleur ou un climatiseur ?",
    answer:
      "Oui, un entretien régulier (nettoyage des filtres, contrôle du circuit frigorifique) permet de préserver les performances et la durée de vie de votre équipement. Nous proposons des contrats d'entretien annuel et intervenons en dépannage en cas de panne, pour toutes marques.",
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
 * Fourchettes de prix indicatives (matériel + pose). Méthode : prix matériel
 * relevés chez des fournisseurs pro, majorés de 35 % (pose, marge), le
 * 02/08/2026 — à recalculer si les tarifs fournisseurs évoluent.
 * - airEau : cedeo.fr, 4 références (ensembles/monobloc complets, 11-14 kW).
 * - airAir : climplus.com (Mitsubishi Série M résidentiel), 2 systèmes
 *   mono-split reconstitués (unité intérieure + groupe extérieur assortis),
 *   sur la puissance chaud (Pc). Échantillon réduit, à élargir.
 * - cet : climplus.com, une seule référence confirmée par volume (200L
 *   Atlantic Égéo, 250L Thermor Aeromax Access) ; 150L et 300L pas encore
 *   mis à jour faute de référence au volume confirmé.
 * - chauffeEauElectrique : climplus.com. 200L a un vrai écart min/max
 *   (entrée de gamme stéatite vs ACI Hybride premium) ; 150L sur une seule
 *   référence ; 250L/300L pas de référence confirmée, repris du 200L en
 *   attendant.
 * - adoucisseur : cedeo.fr (BWT), 10L sur une seule référence confirmée ;
 *   20L/25L/30L pas encore mis à jour faute de référence au volume
 *   confirmé.
 */
export const simulatorPricing = {
  airEau: { minPerKw: 990, maxPerKw: 1360 },
  airAir: { minPerKw: 730, maxPerKw: 945 },
  cet: {
    150: { min: 2800, max: 3600 },
    200: { min: 2600, max: 3000 },
    250: { min: 2700, max: 3100 },
    300: { min: 3800, max: 4800 },
  } as Record<number, { min: number; max: number }>,
  chauffeEauElectrique: {
    150: { min: 1300, max: 1300 },
    200: { min: 640, max: 1460 },
    250: { min: 640, max: 1460 },
    300: { min: 640, max: 1460 },
  } as Record<number, { min: number; max: number }>,
  adoucisseur: {
    10: { min: 2400, max: 2400 },
    20: { min: 1300, max: 1900 },
    25: { min: 1600, max: 2200 },
    30: { min: 1900, max: 2600 },
  } as Record<number, { min: number; max: number }>,
} as const;

export const footerLinks = [
  { href: "/zone-intervention", label: "Zone d'intervention" },
  { href: "/mentions-legales", label: "Mentions légales" },
] as const;
