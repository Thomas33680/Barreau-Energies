# Pricebook — Barreau Énergies

Application interne (usage personnel) pour centraliser le pricebook de Barreau
Énergies : toutes les données techniques et financières des produits (pompes
à chaleur, climatisation, chauffe-eaux thermodynamiques, adoucisseurs…) et
services, avec calcul automatique des marges.

## Démarrage

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Créer le fichier de configuration :

   ```bash
   cp .env.example .env.local
   ```

   Puis remplir dans `.env.local` :
   - `APP_PASSWORD` : le mot de passe pour accéder à l'application.
   - `AUTH_SECRET` : une valeur aléatoire secrète, générée par exemple avec
     `openssl rand -hex 32`.

3. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

   Ouvrir [http://localhost:3000](http://localhost:3000), se connecter avec
   `APP_PASSWORD`, puis ajouter vos premiers articles.

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

## Données

Les données sont stockées dans une base SQLite locale : `data/pricebook.db`
(non versionnée — voir `.gitignore`). C'est un fichier unique : pensez à le
sauvegarder régulièrement (copie vers un espace de stockage sûr) si vous
déployez l'application.

## Déploiement

L'application est un projet Next.js classique :

```bash
npm run build
npm start
```

Elle a besoin :
- Des variables d'environnement `APP_PASSWORD` et `AUTH_SECRET` (voir ci-dessus).
- D'un **disque persistant** à l'endroit où vit `data/pricebook.db` (SQLite
  est un fichier local). Un petit VPS, un conteneur Docker avec volume, ou un
  hébergeur type Railway/Render conviennent. Un hébergement purement
  serverless (fonctions éphémères sans disque persistant) n'est pas adapté
  tel quel.

## Stack technique

Next.js 16 (App Router, Server Actions), TypeScript, Tailwind CSS, SQLite
(`better-sqlite3`).
