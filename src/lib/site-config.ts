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
  color: "blue" | "green" | "orange";
  summary: string;
  description: string;
  points: string[];
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
  },
];

export const partnerBrands = [
  "Mitsubishi Electric",
  "Daikin",
  "Altech",
  "Atlantic",
  "Panasonic",
  "Thermor",
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
  { href: "/realisations", label: "Réalisations" },
  { href: "/avis", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
] as const;

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

export const footerLinks = [
  { href: "/zone-intervention", label: "Zone d'intervention" },
  { href: "/mentions-legales", label: "Mentions légales" },
] as const;
