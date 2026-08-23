// Coordonnées de l'entreprise — valeurs à remplacer avant mise en ligne.
// Centralisées ici pour n'avoir qu'un seul endroit à modifier.
export const company = {
  name: "Barreau Énergies",
  positioning: "Les systèmes techniques de votre habitat, maîtrisés.",
  fieldTagline: "Le confort thermique en toute confiance.",
  pitch:
    "Pompes à chaleur, climatisation, eau chaude et traitement de l'eau : un seul interlocuteur pour équiper, protéger, piloter et entretenir les systèmes techniques de votre logement.",

  // TODO(thomas) : remplacer par les vraies coordonnées avant mise en ligne.
  phoneDisplay: "01 23 45 67 89",
  phoneHref: "tel:+33123456789",
  email: "contact@barreau-energies.fr",
  serviceArea: "votre région",

  hours: "Du lundi au vendredi, 8h – 18h",
} as const;

export const pillars = [
  {
    key: "equiper",
    label: "Équiper",
    detail: "PAC, ECS, eau, ventilation",
    color: "climate",
  },
  {
    key: "proteger",
    label: "Protéger",
    detail: "Fuite, pression, électrique",
    color: "water",
  },
  {
    key: "piloter",
    label: "Piloter",
    detail: "Consommation, HEMS, régulation",
    color: "energy",
  },
  {
    key: "entretenir",
    label: "Entretenir",
    detail: "Maintenance, alertes, suivi",
    color: "care",
  },
] as const;

export const servicePromises = [
  {
    name: "Barreau Clear",
    detail: "Prix et périmètre expliqués avant intervention.",
  },
  {
    name: "Barreau Clean",
    detail: "Zone protégée et laissée propre.",
  },
  {
    name: "Barreau Start",
    detail: "Mise en service et explication client.",
  },
  {
    name: "Barreau Digital",
    detail: "Rapport, photos et références conservés.",
  },
  {
    name: "Barreau Follow",
    detail: "Suivi post-installation sur travaux éligibles.",
  },
  {
    name: "Barreau Priority",
    detail: "Priorité définie pour les membres Care selon conditions.",
  },
] as const;
