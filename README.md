# Barreau-Energies

Site web pour Barreau Énergies : installation de pompes à chaleur, climatisation et chauffe-eau thermodynamiques — et, à terme, l'ensemble des systèmes techniques du logement.

## Operating Model 2026-2030

Le modèle d'exploitation stratégique de l'entreprise est documenté dans [`docs/operating-model/`](docs/operating-model/Barreau_Energies_Operating_Model_2026_2030.md). Il sert de référence pour la structure du site, le catalogue de services et le positionnement de marque.

**Vision :** ne pas être seulement une entreprise d'installation CVC, mais une marque capable de gérer les principaux systèmes techniques du logement sur toute leur durée de vie — Équiper | Protéger | Piloter | Entretenir.

**Cinq divisions :**
- **CLIMATE** — confort thermique (PAC air/air, air/eau, régulation)
- **WATER** — eau & protection (adoucisseurs, chauffe-eau, Water Protect)
- **ENERGY** — électricité & pilotage (mesure, HEMS, optimisation)
- **HOME** — air & systèmes maison (ventilation, qualité d'air)
- **CARE** — maintenance & assistance (entretien, abonnements, Passeport Maison)

Document de travail stratégique : les noms d'offres et de divisions sont des noms de travail, à valider juridiquement avant exploitation commerciale.

## Site web

Application Next.js (App Router, TypeScript, Tailwind CSS v4) : page d'accueil, une page par division
(`/climate`, `/water`, `/energy`, `/home`, `/care`), `/a-propos` et `/contact`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint
```

**Avant mise en ligne**, remplacer les valeurs à compléter :
- `src/content/company.ts` — téléphone, email et zone d'intervention (actuellement des valeurs de test)
- `src/app/mentions-legales/page.tsx` — SIRET, forme juridique, adresse, hébergeur (obligatoire pour un site commercial en France)
- Le formulaire de contact (`src/components/ContactForm.tsx`) ouvre la messagerie du visiteur avec le message pré-rempli ; brancher un envoi d'email côté serveur (Resend, SMTP...) si un vrai formulaire est préféré.
