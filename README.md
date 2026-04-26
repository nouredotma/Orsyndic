# Orsyndic | Application Web de Gestion de Syndic

![Orsyndic Banner](public/og-image.png)

**Orsyndic** est une plateforme web de type SaaS dédiée à la gestion simplifiée des copropriétés. Elle fait office de pont numérique entre le syndic (gestionnaire) et les usagers (copropriétaires et résidents).

## 🚀 Overview

Le secteur de l'immobilier connaît une transformation numérique sans précédent (PropTech). Orsyndic répond aux défis de la gestion de syndic traditionnelle en offrant transparence, automatisation et communication fluide.

- **🛠 Tech Stack:** Next.js, React, Tailwind CSS, MySQL, Laravel (Backend conceptuel).
- **🎯 Mission:** Centralisation, Transparence, et Automatisation des processus métiers.

## ✨ Key Features

### A. Centralisation et Transparence
- **Espace Client unique** pour chaque copropriétaire.
- Consultation du **solde personnel** et historique des charges.
- Accès à l'**historique des documents** (PV d'AG, règlements).

### B. Automatisation des Processus Métiers
- **Calcul automatique des charges** selon les tantièmes.
- Génération de **quittances et appels de fonds** (PDF).
- Tableau de bord de **suivi des paiements** et impayés.

### C. Optimisation de la Maintenance et Communication
- **Helpdesk (Tickets):** Signalement d'incidents avec photo et suivi d'état.
- **Mur d'actualités:** Diffusion d'annonces urgentes.
- **Espace Documentaire:** Bibliothèque de fichiers partagés.

## 👥 Profils Utilisateurs

1. **Administrateur (Syndic):** Gestionnaire principal (Lots, charges, paiements, documents, tickets).
2. **Copropriétaire:** Détenteur de lots (Solde, appels de fonds, documents, incidents).
3. **Résident (Locataire):** Occupant (Mur d'annonces, réclamations techniques).

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Typography:** Inter (via Google Fonts)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Orsyndic
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Launch Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
.
├── app/                # Next.js App Router (Pages, Layouts, Metadata)
├── components/         # UI Components (Dashboard, Helpdesk, Finance)
├── hooks/              # Custom React hooks
├── lib/                # Shared utilities and context
├── public/             # Static assets
├── styles/             # Global CSS
```

## 📜 Planning Prévisionnel (4 Semaines)

- **Semaine 1:** Analyse, Conception et Infrastructure (Auth, Rôles).
- **Semaine 2:** Patrimoine & Finances (CRUD Immeubles, Moteur de calcul).
- **Semaine 3:** Interactivité & Incidents (Helpdesk, Espace Documentaire).
- **Semaine 4:** Finalisation, Qualité et Livraison.

---

*Orsyndic — Cahier des Charges PFE | v1.0 — 2025/2026*
