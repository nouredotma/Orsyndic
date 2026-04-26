# SyndiCare — Modern Property Management System (Syndic)

![SyndiCare Banner](public/og-image.png)

**SyndiCare** is a SaaS-based web application designed to simplify property co-ownership management ("Syndic"). It serves as a digital bridge between property managers (Syndic) and users (co-owners and residents), bringing transparency and efficiency to the real estate sector (PropTech).

## 🚀 Project Overview

The real estate sector is undergoing a massive digital transformation. SyndiCare addresses the traditional challenges of property management — such as financial opacity, administrative burden, and communication gaps — by offering a centralized, automated, and user-friendly platform.

### 🎯 Mission
- **Centralization:** A single access point for all property-related data.
- **Transparency:** Real-time visibility into finances and maintenance history.
- **Automation:** Streamlining repetitive tasks like charge calculations and document generation.

## ✨ Key Features

### 🏢 Property & Asset Management
- **Hierarchical Structure:** Manage multiple buildings, floors, and apartments.
- **Owner Mapping:** Link units to their respective co-owners.
- **Multi-Building Support:** Admins can manage several properties from a single dashboard.

### 💰 Financial Module
- **Charge Calculation:** Automated distribution of charges based on "tantièmes" (square meters/shares).
- **Payment Tracking:** Dashboard for tracking payments and identifying arrears.
- **Document Generation:** Automatic generation of receipts (quittances) and calls for funds in PDF format.

### 🎫 Helpdesk & Maintenance (Tickets)
- **Incident Reporting:** Residents can report technical issues (leaks, elevator failures) with photo uploads.
- **Workflow Tracking:** Real-time status updates (Open → In Progress → Resolved).
- **History:** Keep a record of all interventions and maintenance costs.

### 📢 Communication & Documents
- **News Wall:** Centralized feed for urgent announcements (e.g., water cuts, meetings).
- **Document Library:** Secure storage for meeting minutes (PV), building regulations, and insurance files.

## 👥 User Roles

| Role | Description | Key Capabilities |
| :--- | :--- | :--- |
| **Administrator (Syndic)** | The main property manager. | Configure lots, generate charges, validate payments, manage documents, and close tickets. |
| **Co-owner** | Owns one or more lots in the building. | View personal balance, access fund calls, download documents, and report incidents. |
| **Resident (Tenant)** | The physical occupant of the unit. | Restricted access: view announcements and submit technical complaints only. |

## 🛠 Technology Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Database
- **Core:** [Laravel](https://laravel.com/) (PHP)
- **Database:** MySQL (Relational)
- **Authentication:** Secure role-based access control (BCrypt hashing, SQL/XSS protection).

## 📊 Scope & Prioritization (MoSCoW)

### ✅ In-Scope
- Multi-building management.
- Charge calculation engine.
- Ticket workflow system.
- PDF Exporting.

### ❌ Out-of-Scope
- Double-entry professional accounting.
- Real-time online payment integration.
- Electronic voting for general meetings.

### 📌 MoSCoW
- **Must Have:** Auth, role management, property CRUD, charge generation.
- **Should Have:** Helpdesk, PDF exports, document library.
- **Could Have:** Statistics dashboard, email notifications.

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

```text
.
├── app/                # Next.js App Router (Pages, Layouts, API Routes)
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and shared logic
├── public/             # Static assets (images, icons)
├── styles/             # Global CSS and themes
```

## 📅 Roadmap (4-Week PFE Plan)

- **Week 1:** Analysis & Infrastructure (Technical modeling, UI Mockups, Auth/Roles).
- **Week 2:** Core Business Logic (Property CRUD, Charge Calculation Engine).
- **Week 3:** Interactivity & Incidents (Helpdesk, Document Center, News Wall).
- **Week 4:** Quality & Delivery (Testing, Responsive Optimization, Deployment).

---

*SyndiCare — Cahier des Charges PFE | v1.0 — 2025/2026*
*Institut Supérieur de Génie Informatique (ISGI)*
