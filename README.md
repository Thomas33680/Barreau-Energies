# Assistant Technique Chantier — Barreau Énergies

Application web (PWA) mobile-first pour accompagner les visites chantier,
pour les quatre métiers de l'entreprise : pompe à chaleur air/eau,
climatisation (PAC air/air), chauffe-eau thermodynamique et adoucisseur
d'eau.

Outil purement technique — pas de création de devis ni de facture, ceux-ci
restent gérés dans OBAT.

## Fonctionnalités

- **Check-list technique guidée** par type d'installation (logement,
  isolation, existant, emplacement, électricité, accès chantier).
- **Recommandation de matériel** : estimation de la puissance/du volume
  nécessaire à partir des réponses, gamme conseillée (entrée / milieu / haut
  de gamme) et marques compatibles (Ariston, Atlantic, Daikin, Thermor,
  Panasonic, Mitsubishi Electric, Altech, BWT).
- **Photos du chantier** attachées à la visite (stockage local sur
  l'appareil).
- **Fiche client réutilisable** : recherche parmi les clients déjà visités
  pour préremplir une nouvelle visite.
- **Fonctionne hors-ligne** une fois ouverte (PWA installable sur mobile),
  les visites sont sauvegardées localement sur l'appareil.

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (dist/)
npm run lint     # oxlint
node scripts/gen-icons.mjs   # régénère les icônes PWA à partir de public/logo-icon.svg
```

## Structure

- `src/data/` — types d'installation, questions de check-list, marques,
  catégories de taille (puissance/volume).
- `src/lib/` — calculs (estimation de puissance, recommandation), gestion
  des photos (IndexedDB), clients connus, persistance locale (localStorage).
- `src/components/wizard/` — les 4 étapes de l'assistant (type, client,
  check-list, recommandation).
- `public/logos/` — logos des marques partenaires utilisés dans l'app.
- `public/logo-icon.svg` — logo Barreau Énergies (recréé en SVG, à
  remplacer par le fichier source officiel si besoin de fidélité exacte).
- `assets-site/gallery/` — photos non utilisées par cette app, conservées
  pour un futur site vitrine.
