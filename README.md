# Barreau Énergies

Site vitrine pour Barreau Énergies — installation de pompes à chaleur,
climatisation et chauffe-eaux thermodynamiques à Parigné-l'Évêque, Le Mans
et alentours.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [lucide-react](https://lucide.dev) pour les icônes

## Développement

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

## Contenu à compléter

Certaines sections contiennent des placeholders volontaires, à remplacer
avant la mise en ligne définitive :

- **Logo** : le header/footer utilise une recomposition CSS des couleurs de
  marque (bandes bleu/vert/orange + wordmark). Déposez les fichiers de logo
  officiels (`public/logo.svg`, `public/logo-mark.svg`, favicon) puis mettez
  à jour `src/components/Logo.tsx`.
- **Réalisations** (`/realisations`) : galerie en attente de vraies photos
  de chantiers.
- **Avis clients** (`/avis`) : le tableau `testimonials` dans
  `src/lib/site-config.ts` est vide, à compléter avec de vrais avis.
- **Mentions légales** (`/mentions-legales`) : forme juridique, SIRET,
  RCS/RM, assurance décennale et hébergeur à renseigner.
- **Aides & Financements** : contenu générique sur les dispositifs publics,
  à vérifier/actualiser régulièrement (montants et conditions évoluent).

Toutes les informations de contact (téléphone, email, adresse, zone
d'intervention) sont centralisées dans `src/lib/site-config.ts`.
