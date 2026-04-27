# Orsyndic — Modern Property Management System (Syndic)

![Orsyndic Banner](public/og-image.png)

**Orsyndic** is a SaaS-based web application designed to simplify property co-ownership management ("Syndic"). It serves as a digital bridge between property managers (Syndic) and users (co-owners and residents), bringing transparency and efficiency to the real estate sector.

## 🚀 Project Overview

The real estate sector is undergoing a massive digital transformation. Orsyndic addresses the traditional challenges of property management — such as financial opacity, administrative burden, and communication gaps — by offering a centralized, automated, and user-friendly platform.

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
- **Payment Tracking:** Dashboard for tracking payments, cash flow visualization, and identifying arrears.
- **Document Generation:** Automatic generation of receipts (quittances) and calls for funds in PDF format.

### 🎫 Helpdesk & Maintenance (Tickets)
- **Incident Reporting:** Residents can report technical issues (leaks, elevator failures) with photo uploads.
- **Workflow Tracking:** Real-time status updates via interactive ticket badges (Open → In Progress → Resolved).
- **History:** Keep a record of all interventions and maintenance costs.

### 📢 Communication & Documents
- **News Wall:** Centralized feed for urgent announcements (e.g., water cuts, meetings).
- **Document Library:** Secure storage for meeting minutes (PV), building regulations, and insurance files.

## 👥 User Roles

The application features a robust role-based access control system ensuring users only see what they need:

| Role | Description | Key Capabilities |
| :--- | :--- | :--- |
| **Administrator (Syndic)** | The main property manager. | Configure lots, generate charges, validate payments, manage documents, and close tickets. |
| **Co-owner** | Owns one or more lots in the building. | View personal balance, access fund calls, download documents, and report incidents. |
| **Resident (Tenant)** | The physical occupant of the unit. | Restricted access: view announcements and submit technical complaints only. |

## 🛠 Technology Stack

### Frontend
- **Framework:** [Next.js App Router](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **3D Assets:** [Spline](https://spline.design/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Database (Planned/Separated)
- **Core:** Laravel (PHP) API
- **Database:** MySQL
- **Authentication:** Role-based access control with secure routing.

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
│   ├── syndic/         # Dashboard module & Auth (Login/Register)
│   ├── contact/        # Contact form page
│   └── globals.css     # Global styles & Tailwind config
├── components/         # Reusable UI components
│   ├── ui/             # Core UI elements (Shadcn/Radix)
│   ├── homepage/       # Landing page specific components
│   └── charts/         # Dashboard visualization components
├── lib/                # Utility functions and shared logic
├── public/             # Static assets (images, icons)
```

---

*Orsyndic — Modern Property Management Solution*
