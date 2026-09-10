# Pricebook — Barreau Énergies

Application interne (usage personnel) pour centraliser le pricebook de Barreau
Énergies : toutes les données techniques et financières des produits (pompes
à chaleur, climatisation, chauffe-eaux thermodynamiques, adoucisseurs…) et
services, avec calcul automatique des marges.

## Mettre l'application en ligne (à faire une fois)

Pas besoin d'installer quoi que ce soit sur votre ordinateur : tout se fait
dans le navigateur, avec des services gratuits. Ça prend environ 5 minutes.

**1. Créer un compte sur [vercel.com](https://vercel.com)**
Cliquez sur *Sign Up*, puis *Continue with GitHub* et autorisez l'accès avec
le même compte GitHub que celui de ce projet.

**2. Importer le projet**
Sur le tableau de bord Vercel, cliquez sur *Add New* → *Project*, puis
sélectionnez le dépôt **Barreau-Energies**.

Avant de cliquer sur *Deploy*, ouvrez *Configure* / les réglages du projet
et vérifiez ces deux points (importants, sinon le déploiement échoue) :
- **Root Directory** → `pricebook-app` (le code de l'application est dans ce
  sous-dossier, pas à la racine du dépôt).
- **Branch** → `claude/brave-curie-p0vmm7` (si Vercel ne le propose pas tout
  de suite, vous pourrez le changer juste après dans *Settings → Git →
  Production Branch*).

**3. Ajouter une base de données**
Toujours dans le projet Vercel : onglet **Storage** → *Create Database* (ou
*Browse Marketplace*) → choisissez **Neon** (PostgreSQL, offre gratuite très
suffisante pour cet usage) → suivez les étapes proposées. Vercel relie
automatiquement la base au projet (une variable `DATABASE_URL` est ajoutée
toute seule).

**4. Ajouter vos deux réglages secrets**
Onglet **Settings → Environment Variables**, ajoutez :

| Nom | Valeur |
|---|---|
| `APP_PASSWORD` | le mot de passe que *vous* choisissez pour vous connecter à l'application |
| `AUTH_SECRET` | `7f7d5c17f017bcaaa1a049fa4e1b5be219846b942345760bfc6cbf5fa2ddd5c7` (déjà généré, à copier tel quel) |

**5. Déployer**
Cliquez sur *Deploy*. Au bout d'une minute, Vercel affiche un lien du type
`barreau-energies.vercel.app`. Ouvrez-le, entrez le mot de passe choisi à
l'étape 4 : votre pricebook est en ligne, accessible depuis votre téléphone
et votre ordinateur. Vous pouvez ajouter ce lien à l'écran d'accueil de votre
téléphone pour l'ouvrir comme une application.

*Si l'étape "Deploy" échoue en signalant `DATABASE_URL` manquant* : allez
dans l'onglet **Storage** de votre base Neon, copiez la chaîne de connexion
affichée, et ajoutez-la manuellement dans **Settings → Environment
Variables** sous le nom `DATABASE_URL`, puis relancez le déploiement
(*Deployments* → *…* → *Redeploy*).

## Fonctionnement

- **Tableau de bord** (`/`) : nombre d'articles, valeur totale du catalogue,
  marge moyenne, répartition par catégorie et par marque.
- **Pricebook** (`/pricebook`) : liste recherchable et filtrable (catégorie,
  marque, type, statut) de tous les produits et services.
- Chaque article regroupe : informations générales (référence, marque,
  modèle, unité, fournisseur), une **fiche technique** libre (lignes
  caractéristique / valeur, ex. « Puissance → 8 kW »), et la **tarification**
  (prix d'achat HT, prix de vente HT, TVA, marge calculée automatiquement).
- L'accès est protégé par un simple mot de passe (usage individuel — pas de
  gestion multi-utilisateurs).

## Développement local

Pour modifier l'application sur votre ordinateur (nécessite
[Node.js](https://nodejs.org)) :

1. `npm install`
2. `cp .env.example .env.local` puis remplir `APP_PASSWORD`, `AUTH_SECRET`
   (`openssl rand -hex 32`) et `DATABASE_URL` (une base Postgres locale ou un
   second projet Neon gratuit dédié au développement).
3. `npm run dev`, puis ouvrir [http://localhost:3000](http://localhost:3000).

## Stack technique

Next.js 16 (App Router, Server Actions), TypeScript, Tailwind CSS,
PostgreSQL (`pg`). Le schéma de la base est créé automatiquement au premier
lancement.
