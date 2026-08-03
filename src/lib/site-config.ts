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
  /** Facteur d'économie approximatif vs. chauffage/eau chaude électrique classique (ex : 3.5 = 3,5 fois moins d'énergie consommée). Sert à documenter le calcul de annualSavingsExample. */
  comparisonFactor?: number;
  /**
   * Exemple chiffré concret pour la page services (facture annuelle estimée
   * en € pour un cas de référence donné). Basé sur un prix moyen de
   * l'électricité de 0,25 €/kWh et le comparisonFactor du service — à
   * ajuster si ces hypothèses changent.
   */
  annualSavingsExample?: {
    reference: string;
    classicCost: number;
    solutionCost: number;
  };
  /** Grand chiffre mis en avant dans le bloc économies d'énergie, avec sa note de bas de page. */
  tenYearSavings?: {
    headline: string;
    note: string;
  };
  /** Libellé affiché dans le bloc économies d'énergie à la place de shortName, si le service couvre plusieurs solutions. */
  savingsLabel?: string;
  useCases?: {
    title: string;
    items: string[];
  };
  images?: {
    src: string;
    alt: string;
    caption: string;
  }[];
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
      "Profitez d'un confort optimal toute l'année grâce à une climatisation réversible. Une seule installation vous permet de chauffer efficacement en hiver et de rafraîchir votre intérieur en été, tout en réduisant votre consommation d'énergie. Disponible en version monosplit, multisplit ou gainable, elle s'adapte à tous les types de logements.",
    points: [
      "Chauffage et climatisation toute l'année",
      "Monosplit, multisplit et gainable",
      "Installation soignée et garantie",
      "Pilotage à distance par Wi-Fi",
    ],
    howItWorks:
      "Une climatisation réversible ne produit pas la chaleur, elle la capte dans l'air extérieur puis la restitue à l'intérieur. Le même équipement chauffe votre logement en hiver et le rafraîchit en été, tout en consommant beaucoup moins d'électricité qu'un chauffage électrique classique.",
    savings:
      "Grâce à son rendement élevé, une climatisation réversible peut consommer jusqu'à trois à quatre fois moins d'électricité qu'un radiateur électrique classique pour produire la même quantité de chaleur. Dans de nombreuses situations, l'investissement est compensé progressivement par les économies réalisées sur les factures de chauffage.",
    comparisonFactor: 3.5,
    annualSavingsExample: {
      reference: "Pour une pièce de 20 m² chauffée avec des radiateurs électriques.",
      classicCost: 500,
      solutionCost: 145,
    },
    images: [
      {
        src: "/services/climatisation-reversible-monosplit.jpg",
        alt: "Unité murale de climatisation réversible mono-split installée dans un salon",
        caption: "Mono-split",
      },
      {
        src: "/services/climatisation-reversible-gainable.jpg",
        alt: "Système de climatisation réversible gainable, diffusion d'air par grilles au plafond",
        caption: "Gainable",
      },
    ],
  },
  {
    slug: "pompe-a-chaleur-air-eau",
    name: "Installation de pompes à chaleur air/eau",
    shortName: "Pompe à chaleur air/eau",
    color: "green",
    summary:
      "Remplacez votre chaudière fioul, gaz ou électrique par une pompe à chaleur performante pour réduire votre consommation d'énergie.",
    description:
      "La pompe à chaleur air/eau remplace efficacement une chaudière fioul, gaz ou électrique tout en conservant vos radiateurs ou votre plancher chauffant. Elle assure le chauffage de votre logement et peut également produire votre eau chaude sanitaire, tout en réduisant significativement votre consommation d'énergie. Chaque installation est dimensionnée sur mesure selon les caractéristiques de votre habitation.",
    points: [
      "Étude thermique et dimensionnement sur mesure",
      "Remplacement de chaudière fioul ou gaz",
      "Compatible radiateurs et plancher chauffant",
      "Mise en service et suivi après installation",
    ],
    howItWorks:
      "Une pompe à chaleur air/eau capte les calories présentes dans l'air extérieur et les transmet à l'eau qui alimente vos radiateurs ou votre plancher chauffant. Avec un seul équipement, vous chauffez votre logement et, selon le modèle choisi, produisez également votre eau chaude sanitaire.",
    useCases: {
      title: "Dans quels cas choisir une PAC air/eau ?",
      items: [
        "Vous remplacez une chaudière fioul.",
        "Vous remplacez une chaudière gaz.",
        "Vous possédez un plancher chauffant.",
        "Vous avez des radiateurs à eau.",
        "Vous souhaitez produire également votre eau chaude sanitaire.",
      ],
    },
    savings:
      "Grâce à son excellent rendement, une pompe à chaleur air/eau restitue généralement trois à quatre fois plus d'énergie qu'elle n'en consomme. À confort égal, elle peut réduire fortement votre facture de chauffage par rapport à un système électrique classique.",
    comparisonFactor: 3.5,
    annualSavingsExample: {
      reference: "Pour un logement de 100 m² chauffé à l'année (environ 12 000 kWh de besoin)",
      classicCost: 3000,
      solutionCost: 860,
    },
    tenYearSavings: {
      headline: "Plus de 21 000 € d'économies sur 10 ans*",
      note: "*Estimation selon les hypothèses présentées.",
    },
    images: [
      {
        src: "/services/pompe-a-chaleur-air-eau.jpg",
        alt: "Unité extérieure de pompe à chaleur air/eau et ballon tampon installé en intérieur",
        caption: "Pompe à chaleur air/eau",
      },
    ],
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
      "Le chauffe-eau thermodynamique (ou « ballon thermodynamique ») associe un ballon d'eau chaude classique à une petite pompe à chaleur intégrée, qui capte les calories de l'air ambiant pour chauffer l'eau au lieu d'utiliser une résistance électrique gourmande en énergie. Le chauffe-eau électrique classique chauffe directement l'eau grâce à une résistance immergée. Plus simple et moins coûteux à l'achat, il reste une excellente solution lorsque le budget est prioritaire ou que le logement ne se prête pas à l'installation d'un chauffe-eau thermodynamique.",
    savings:
      "Grâce à sa pompe à chaleur intégrée, un chauffe-eau thermodynamique consomme environ 3 fois moins d'électricité qu'un chauffe-eau électrique classique à résistance pour produire la même quantité d'eau chaude, soit jusqu'à 70 % d'économies sur ce poste de votre facture.",
    comparisonFactor: 3,
    annualSavingsExample: {
      reference: "Pour une famille de 4 personnes (environ 2 500 kWh/an pour l'eau chaude)",
      classicCost: 625,
      solutionCost: 210,
    },
    tenYearSavings: {
      headline: "Jusqu'à 4 150 € économisés sur 10 ans*",
      note: "*Estimation selon les hypothèses présentées.",
    },
    savingsLabel: "Chauffe-eau thermodynamique",
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
    question: "Chauffe-eau électrique ou thermodynamique : lequel choisir ?",
    answer:
      "Le chauffe-eau thermodynamique consomme environ 3 fois moins d'électricité qu'un chauffe-eau électrique classique, mais représente un investissement de départ plus élevé. Le chauffe-eau électrique reste une solution simple et économique à l'achat, adaptée aux petits logements, aux résidences secondaires ou aux budgets serrés. Nous vous conseillons selon votre logement, votre budget et votre consommation d'eau chaude.",
  },
  {
    question: "Pourquoi installer un adoucisseur d'eau ?",
    answer:
      "Notre secteur est concerné par une eau assez calcaire. Un adoucisseur protège vos canalisations et vos équipements (chauffe-eau, pompe à chaleur, robinetterie, électroménager) du tartre, réduit votre consommation de produits d'entretien et améliore votre confort au quotidien. Il nécessite un suivi régulier (recharge en sel, régénération) que nous pouvons assurer.",
  },
  {
    question: "Proposez-vous un contrat d'entretien pour mes équipements ?",
    answer:
      "Oui, nous proposons des contrats d'entretien annuel pour vos pompes à chaleur, climatisations, chauffe-eaux et adoucisseurs, toutes marques confondues. En cas de panne, nous intervenons aussi en dépannage pour un diagnostic rapide et une remise en service dans les meilleurs délais.",
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
