# Assistant Devis Chantier — Barreau Énergies

Application web (PWA) mobile-first pour accompagner les visites chantier et
produire un devis estimatif, pour les trois métiers de l'entreprise :
pompe à chaleur air/eau, climatisation (PAC air/air) et chauffe-eau
thermodynamique.

## Fonctionnalités

- **Check-list technique guidée** par type d'installation (logement,
  isolation, existant, emplacement, électricité, accès chantier).
- **Recommandation de matériel** : estimation de la puissance/du volume
  nécessaire à partir des réponses, gamme conseillée (entrée / milieu / haut
  de gamme) et marques compatibles (Ariston, Atlantic, Daikin, Thermor,
  Panasonic, Mitsubishi Electric, Altech, BWT).
- **Calcul automatique du devis** : matériel, main d'œuvre, options
  (dépose, ligne électrique dédiée, adoucisseur, etc.), TVA — tous les
  montants sont modifiables.
- **Fonctionne hors-ligne** une fois ouverte (PWA installable sur mobile),
  les visites sont sauvegardées localement sur l'appareil.

Les prix par défaut (`src/data/sizeCategories.ts`) et le taux horaire /
TVA (réglables directement sur l'écran devis) sont des valeurs indicatives
à ajuster à tes propres tarifs fournisseurs.

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (dist/)
npm run lint     # oxlint
```

## Structure

- `src/data/` — types d'installation, questions de check-list, marques,
  catégories de taille / grille tarifaire, options de devis.
- `src/lib/` — calculs (estimation de puissance, recommandation, devis) et
  persistance locale (localStorage).
- `src/components/wizard/` — les 5 étapes de l'assistant (type, client,
  check-list, recommandation, devis).
- `public/logos/` — logos des marques partenaires utilisés dans l'app.
- `assets-site/gallery/` — photos non utilisées par cette app, conservées
  pour un futur site vitrine.
