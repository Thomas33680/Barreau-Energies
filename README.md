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

## Logo

Le logo officiel (`public/brand/carte-de-visite-recto.png`, fourni par
l'entreprise) a été découpé en assets réutilisables avec fond transparent :

- `public/logo-mark.png` — symbole seul (utilisé dans le header/footer et
  pour l'icône du site)
- `public/logo-full.png` — logo complet avec wordmark et signature
  ("Le confort thermique en toute confiance.")

Le favicon (`src/app/icon.png`, `src/app/apple-icon.png`) et l'image de
partage social (`src/app/opengraph-image.png`) sont générés à partir de ces
mêmes assets. Si le logo évolue, régénérez-les à partir d'un nouveau
fichier source de haute qualité plutôt que de les modifier à la main.
