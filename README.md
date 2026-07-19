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

- **Réalisations** (`/realisations`) : 1 chantier illustré pour l'instant
  (climatisation à Parigné-l'Évêque), à compléter au fil des prochains
  chantiers.
- **Avis clients** (`/avis`) : le tableau `testimonials` dans
  `src/lib/site-config.ts` est vide, à compléter avec de vrais avis.
- **Mentions légales** (`/mentions-legales`) : il ne manque plus que le
  numéro de contrat d'assurance.
- **Accueil** (`/`) : la vignette « Chauffe-eau thermodynamique » est en
  attente d'une vraie photo de chantier (même chose que pour la galerie
  Réalisations).

Pas de page « Aides & Financements » : l'entreprise n'étant pas certifiée
RGE, mentionner MaPrimeRénov'/CEE serait trompeur pour les clients (ces
aides sont conditionnées à un installateur RGE dans la plupart des cas).

Toutes les informations de contact (téléphone, email, adresse, zone
d'intervention) sont centralisées dans `src/lib/site-config.ts`.

## Images

- `public/realisations/*` : vraies photos de chantiers (climatisation à
  Parigné-l'Évêque), EXIF/GPS supprimées avant publication.
- `public/hero-pompe-a-chaleur.jpg` : visuel du hero de l'accueil,
  générée par IA (illustration générique, ce n'est pas une photo d'un
  chantier réel) — à remplacer par une vraie photo de pompe à chaleur
  installée dès qu'une sera disponible.
- `public/brands/*` : logos des marques installées (Mitsubishi Electric,
  Daikin, Altech, Atlantic, Panasonic, Thermor), fond transparent, affichés
  sur l'accueil pour indiquer les équipements posés — ce ne sont pas des
  partenariats officiels revendiqués, juste les marques du matériel
  installé.

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

## Mise en ligne (hébergement)

Le site est hébergé sur [Vercel](https://vercel.com) (créateurs de
Next.js) : configuration automatique, HTTPS gratuit, et gestion simple du
nom de domaine `barreau-energies.fr`.

Pour mettre le site en ligne :

1. Créer un compte sur [vercel.com](https://vercel.com) (gratuit, connexion
   possible avec le compte GitHub `Thomas33680`).
2. « Add New Project » → sélectionner le dépôt `Barreau-Energies` → laisser
   les réglages par défaut (Vercel détecte Next.js automatiquement) →
   Deploy.
3. Une fois déployé, aller dans **Project Settings → Domains** et ajouter
   `barreau-energies.fr` (et `www.barreau-energies.fr`), puis suivre les
   instructions pour pointer le domaine (enregistrements DNS à ajouter chez
   le registrar où le nom de domaine a été acheté).
4. Chaque nouveau push sur la branche principale republie automatiquement
   le site.
