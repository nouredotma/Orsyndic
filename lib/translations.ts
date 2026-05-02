export type Language = "en" | "fr" | "es";

export interface Translations {
  nav: {
    about: string;
    functionalities: string;
    pricing: string;
    testimonials: string;
    faq: string;
    contact: string;
    access: string;
  };
  hero: {
    badge: string;
    title: {
      part1: string;
      part2: string;
    };
    description: string;
    startProject: string;
    viewServices: string;
    chatWhatsApp: string;
    sendEmail: string;
    stats: {
      solutions: { value: string; label: string };
      experience: { value: string; label: string };
    };
  };
  trusted: {
    text: {
      part1: string;
      part2: string;
      part3: string;
      part4: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      buildings: { value: string; label: string };
      hoursSaved: { value: string; label: string };
      coOwners: { value: string; label: string };
    };
  };
  functionalities: {
    title: { part1: string; part2: string };
    subtitle: string;
    cards: {
      payments: {
        title: string;
        description: string;
        table: {
          apt: string;
          owner: string;
          amount: string;
          status: { paid: string; overdue: string };
        };
      };
      access: {
        title: string;
        description: string;
        roles: {
          syndic: string;
          owner: string;
          resident: string;
        };
      };
      incidents: {
        title: string;
        description: string;
        status: string;
        ticket: string;
      };
      documents: {
        title: string;
        description: string;
        files: {
          minutes: string;
          regulations: string;
          insurance: string;
        };
      };
      automation: {
        title: string;
        stats: string;
        progress: string;
      };
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      step1: { title: string; description: string };
      step2: { title: string; description: string };
      step3: { title: string; description: string };
    };
  };
  cta: {
    title: string;
    subtitle: string;
    primaryBtn: string;
    secondaryBtn: string;
    features: {
      engaging: { title: string; description: string };
      secure: { title: string; description: string };
      scale: { title: string; description: string };
    };
  };
  pricing: {
    title: string;
    pricing: string;
    subtitle: string;
    tiers: {
      starter: {
        name: string;
        description: string;
        cta: string;
        features: string[];
        limitations: string[];
      };
      professional: {
        name: string;
        description: string;
        cta: string;
        features: string[];
        limitations: string[];
      };
      enterprise: {
        name: string;
        price: string;
        description: string;
        cta: string;
        features: string[];
        limitations: string[];
      };
    };
  };
  testimonials: {
    title: string;
    postedOnGoogle: string;
    reviews: {
      brandon: { role: string; review: string; timeAgo: string };
      sarah: { role: string; review: string; timeAgo: string };
      michael: { role: string; review: string; timeAgo: string };
      emily: { role: string; review: string; timeAgo: string };
      david: { role: string; review: string; timeAgo: string };
      amara: { role: string; review: string; timeAgo: string };
      james: { role: string; review: string; timeAgo: string };
      priya: { role: string; review: string; timeAgo: string };
    };
  };
  faq: {
    title1: string;
    title2: string;
    subtitle: string;
    questions: {
      q1: { q: string; a: string };
      q2: { q: string; a: string };
      q3: { q: string; a: string };
      q4: { q: string; a: string };
      q5: { q: string; a: string };
      q6: { q: string; a: string };
    };
  };
  footer: {
    columns: {
      agency: string;
      resources: string;
      legal: string;
      connect: string;
      contact: string;
    };
    links: {
      home: string;
      about: string;
      functionalities: string;
      testimonials: string;
      pricing: string;
      faq: string;
      contact: string;
      blog: string;
      help: string;
      privacy: string;
      terms: string;
      cookie: string;
    };
    soon: string;
    rights: string;
    status: string;
    phoneNumber: string;
    address: string;
  };
  contactPage: {
    metadata: {
      title: string;
      description: string;
    };
    badge: string;
    heading: string;
    subheading: string;
    emailUs: string;
    callUs: string;
    visitUs: string;
    phoneNumber: string;
    address: string;
    form: {
      labels: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        subject: string;
        message: string;
      };
      placeholders: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        subject: string;
        message: string;
      };
      subjects: {
        demo: string;
        sales: string;
        support: string;
        partnership: string;
        other: string;
      };
      submit: string;
      whatsapp: string;
      footerAgreement: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      functionalities: "Functionalities",
      pricing: "Pricing",
      testimonials: "Testimonials",
      faq: "FAQ",
      contact: "Contact",
      access: "Access Syndic",
    },
    hero: {
      badge: "Simplified Syndic Management",
      title: {
        part1: "Manage your properties",
        part2: "with transparency",
      },
      description: "Orsyndic centralizes your finances, automates your charges, and streamlines communication between managers, owners, and residents.",
      startProject: "Get a demo",
      viewServices: "Features",
      chatWhatsApp: "WhatsApp Support",
      sendEmail: "Email Us",
      stats: {
        solutions: { value: "100%", label: "Transparency" },
        experience: { value: "24/7", label: "Availability" },
      },
    },
    trusted: {
      text: {
        part1: "Orsyndic",
        part2: " is the trusted solution for ",
        part3: "numerous residential compounds",
        part4: " across the region, ensuring seamless property management.",
      },
    },
    about: {
      title: "Built for modern syndic management.",
      subtitle: "About Orsyndic",
      description: "Managing a co-ownership shouldn't mean drowning in spreadsheets and endless phone calls. Orsyndic replaces the chaos with a single, intuitive platform where syndics generate charges automatically, co-owners track every payment in real-time, and residents report incidents that get resolved — not forgotten. Built for the way modern buildings actually operate.",
      stats: {
        buildings: { value: "120+", label: "Buildings Managed" },
        hoursSaved: { value: "5,000+", label: "Hours Saved Monthly" },
        coOwners: { value: "3,200+", label: "Co-owners Onboarded" },
      },
    },
    functionalities: {
      title: {
        part1: "Core",
        part2: "Functionalities",
      },
      subtitle: "Orsyndic centralizes everything you need to manage your co-ownership efficiently and transparently.",
      cards: {
        payments: {
          title: "Payment Tracking",
          description: "Real-time monitoring of all building contributions.",
          table: {
            apt: "Apt",
            owner: "Owner",
            amount: "Amount",
            status: { paid: "Paid", overdue: "Overdue" },
          },
        },
        access: {
          title: "3-Role Access Control",
          description: "Tailored interfaces for every user type.",
          roles: {
            syndic: "Syndic",
            owner: "Co-owner",
            resident: "Resident",
          },
        },
        incidents: {
          title: "Incident Reporting",
          description: "Technical issues resolution tracking.",
          status: "In Progress",
          ticket: "Elevator maintenance required - Floor 4",
        },
        documents: {
          title: "Document Library",
          description: "Secure access to building documents.",
          files: {
            minutes: "AG_Minutes_2024.pdf",
            regulations: "Building_Rules.pdf",
            insurance: "Insurance_Policy.pdf",
          },
        },
        automation: {
          title: "Auto Charge Generation",
          stats: "Building A — 12 apartments",
          progress: "24,000 MAD generated this month",
        },
      },
    },
    pricing: {
      title: "Simple, Transparent ",
      pricing: "Pricing",
      subtitle: "Choose the perfect plan for your needs",
      tiers: {
        starter: {
          name: "Starter",
          description: "Perfect for single buildings and small associations",
          cta: "Order Now",
          features: [
            "Up to 50 lots",
            "Automated charge generation",
            "Resident incident reporting",
            "Basic document library",
            "Email support",
            "Financial dashboard",
          ],
          limitations: ["Multi-building management", "Advanced accounting exports", "Custom web application"],
        },
        professional: {
          name: "Professional",
          description: "For growing syndics and property managers",
          cta: "Order Now",
          features: [
            "Everything in Starter",
            "Up to 200 lots",
            "Multi-building management",
            "Advanced accounting exports",
            "Automated payment reminders",
            "Priority support",
          ],
          limitations: ["Dedicated account manager", "Custom integrations", "White-label platform"],
        },
        enterprise: {
          name: "Enterprise",
          price: "Custom",
          description: "For large-scale property management firms",
          cta: "Get a Quote",
          features: [
            "Everything in Pro",
            "Unlimited lots",
            "Dedicated account manager",
            "Custom integrations",
            "White-label platform",
            "API Access",
          ],
          limitations: [],
        },
      },
    },
    testimonials: {
      title: "Don't just take our word for it",
      postedOnGoogle: "Posted on Google",
      reviews: {
        brandon: {
          role: "Property Manager",
          review: "Managing 5 buildings used to be a nightmare of spreadsheets. Orsyndic automated our charge calculations and saved us 20 hours a week.",
          timeAgo: "2 weeks ago",
        },
        sarah: {
          role: "Co-owner",
          review: "The transparency is incredible. Co-owners no longer complain about opaque charges because everything is visible in real-time.",
          timeAgo: "1 month ago",
        },
        michael: {
          role: "Operations Director",
          review: "We reduced overdue payments by 40% in the first month thanks to the automated tracking and notifications.",
          timeAgo: "3 weeks ago",
        },
        emily: {
          role: "Syndic Associate",
          review: "Reporting incidents is so easy now. Our residents use the platform to report issues, and we track the resolution without missing anything.",
          timeAgo: "1 month ago",
        },
        david: {
          role: "CEO, Property Management Firm",
          review: "Orsyndic is the most intuitive property management tool we've used. Transitioning our 15 buildings was completely seamless.",
          timeAgo: "2 months ago",
        },
        amara: {
          role: "Building President",
          review: "The document library alone is worth the price. No more emailing building regulations or meeting minutes to new owners.",
          timeAgo: "3 weeks ago",
        },
        james: {
          role: "Managing Partner",
          review: "We've scaled our syndic agency to 30 buildings without hiring additional administrative staff. The automation handles the heavy lifting.",
          timeAgo: "1 month ago",
        },
        priya: {
          role: "Co-founder, Real Estate",
          review: "A game-changer for our co-ownership. Everyone is on the same page, and financial disputes have completely disappeared.",
          timeAgo: "2 weeks ago",
        },
      },
    },
    howItWorks: {
      title: "How Orsyndic works.",
      subtitle: "Three simple steps to take full control of your co-ownership management — from setup to daily operations.",
      steps: {
        step1: {
          title: "Set up your building",
          description: "Define your building structure — floors, apartments, and co-owners. Orsyndic organizes everything in a clear hierarchy so you can manage with confidence.",
        },
        step2: {
          title: "Generate & track charges",
          description: "Automatically generate monthly charges based on shares, track payment statuses in real-time, and identify overdue accounts instantly.",
        },
        step3: {
          title: "Stay in the loop",
          description: "Monitor building activity at a glance — from financial summaries to incident tickets. Send notifications and resolve issues without missing a beat.",
        },
      },
    },
    cta: {
      title: "Ready to transform your property management?",
      subtitle: "Join hundreds of syndics who trust ORSYNDIC to manage their buildings efficiently and transparently.",
      primaryBtn: "Start Your Project",
      secondaryBtn: "Schedule Consultation",
      features: {
        engaging: {
          title: "Automated Efficiency",
          description: "Save hours of administrative work every month with automated charge calculations and document generation.",
        },
        secure: {
          title: "Secure & Transparent",
          description: "Bank-level security for your financial data and complete transparency for all co-owners and residents.",
        },
        scale: {
          title: "Built to Scale",
          description: "Whether you manage one building or fifty, Orsyndic grows effortlessly with your property portfolio.",
        },
      },
    },
    faq: {
      title1: "Frequently",
      title2: "asked questions",
      subtitle: "Everything you need to know about Orsyndic and how it simplifies your building management.",
      questions: {
        q1: {
          q: "What is Orsyndic?",
          a: "Orsyndic is a comprehensive digital platform designed to simplify property and co-ownership (syndic) management through automation and transparency.",
        },
        q2: {
          q: "Who can use the platform?",
          a: "Orsyndic offers tailored interfaces for three main roles: Syndics (managers), Co-owners, and Residents, ensuring everyone has the tools they need.",
        },
        q3: {
          q: "Is my financial data secure?",
          a: "Yes, absolutely. We use industry-standard encryption and robust security protocols to ensure that all financial tracking and transactions are fully protected.",
        },
        q4: {
          q: "Can I report and track building incidents?",
          a: "Definitely. Our incident reporting module allows residents to report technical issues, while managers can track resolution progress in real-time.",
        },
        q5: {
          q: "How does automated charge generation work?",
          a: "The system automatically calculates building charges based on pre-defined shares and configurations, generating invoices and tracking payments without manual effort.",
        },
        q6: {
          q: "Is Orsyndic available on mobile devices?",
          a: "Yes, Orsyndic is built with a mobile-first approach. It is fully responsive and optimized for use on smartphones, tablets, and desktops.",
        },
      },
    },
    footer: {
      columns: {
        agency: "Agency",
        resources: "Resources",
        legal: "Legal",
        connect: "Connect",
        contact: "Contact Us",
      },
      links: {
        home: "Home",
        about: "About",
        functionalities: "Functionalities",
        testimonials: "Testimonials",
        pricing: "Pricing",
        faq: "FAQ",
        contact: "Contact",
        blog: "Blog",
        help: "Help Center",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        cookie: "Cookie Policy",
      },
      soon: "Soon",
      rights: "All rights reserved.",
      status: "All Systems Operational",
      phoneNumber: "+212 704 749 027",
      address: "Martil, Morocco",
    },
    contactPage: {
      metadata: {
        title: "Contact Us | Orsyndic",
        description: "Get in touch with the Orsyndic team to start simplifying your property management.",
      },
      badge: "Let's Talk",
      heading: "Ready to simplify your property management?",
      subheading: "Fill out the form and our team will get back to you within 24 hours to schedule a demo and discuss your needs.",
      emailUs: "Email us",
      callUs: "Call us",
      visitUs: "Visit us",
      phoneNumber: "+212 704 749 027",
      address: "Martil, Morocco",
      form: {
        labels: {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email Address",
          phone: "Phone Number",
          company: "Company Name",
          subject: "Subject",
          message: "Message",
        },
        placeholders: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+212 600 000 000",
          company: "Acme Corp",
          subject: "Select a subject",
          message: "Tell us how we can help you...",
        },
        subjects: {
          demo: "Schedule a Demo",
          sales: "Sales Inquiry",
          support: "Technical Support",
          partnership: "Partnership",
          other: "Other",
        },
        submit: "Send Message",
        whatsapp: "WhatsApp",
        footerAgreement: "By submitting this form, you agree to our privacy policy and terms of service.",
      },
    },
  },
  fr: {
    nav: {
      about: "À propos",
      functionalities: "Fonctionnalités",
      pricing: "Tarifs",
      testimonials: "Témoignages",
      faq: "FAQ",
      contact: "Contact",
      access: "Accès Syndic",
    },
    hero: {
      badge: "Gestion de Syndic Simplifiée",
      title: {
        part1: "Gérez vos copropriétés",
        part2: "avec transparence",
      },
      description: "Orsyndic centralizes vos finances, automatise vos charges et fluidifie la communication entre syndics, copropriétaires et résidents.",
      startProject: "Demander une démo",
      viewServices: "Fonctionnalités",
      chatWhatsApp: "Support WhatsApp",
      sendEmail: "Envoyer un email",
      stats: {
        solutions: { value: "100%", label: "Transparence" },
        experience: { value: "24/7", label: "Disponibilité" },
      },
    },
    trusted: {
      text: {
        part1: "Orsyndic",
        part2: " est la solution de confiance pour de ",
        part3: "nombreux complexes résidentiels",
        part4: " à travers la région, assurant une gestion fluide des copropriétés.",
      },
    },
    about: {
      title: "Conçu pour la gestion moderne de syndic.",
      subtitle: "À propos d'Orsyndic",
      description: "Gérer une copropriété ne devrait pas signifier crouler sous les tableurs et les appels sans fin. Orsyndic remplace le désordre par une plateforme unique et intuitive où les syndics génèrent les charges automatiquement, les copropriétaires suivent chaque paiement en temps réel, et les résidents signalent des incidents qui sont résolus — pas oubliés. Conçu pour la façon dont les immeubles modernes fonctionnent réellement.",
      stats: {
        buildings: { value: "120+", label: "Immeubles Gérés" },
        hoursSaved: { value: "5 000+", label: "Heures Économisées / Mois" },
        coOwners: { value: "3 200+", label: "Copropriétaires Intégrés" },
      },
    },
    functionalities: {
      title: {
        part1: "Fonctionnalités",
        part2: "Clés",
      },
      subtitle: "Orsyndic centralise tout ce dont vous avez besoin pour gérer votre copropriété de manière efficace et transparente.",
      cards: {
        payments: {
          title: "Suivi des Paiements",
          description: "Surveillance en temps réel de toutes les contributions de l'immeuble.",
          table: {
            apt: "Appt",
            owner: "Propriétaire",
            amount: "Montant",
            status: { paid: "Payé", overdue: "Impayé" },
          },
        },
        access: {
          title: "Contrôle d'Accès 3 Rôles",
          description: "Interfaces adaptées pour chaque utilisateur.",
          roles: {
            syndic: "Syndic",
            owner: "Copropriétaire",
            resident: "Résident",
          },
        },
        incidents: {
          title: "Signalement d'Incidents",
          description: "Suivi de résolution des problèmes techniques.",
          status: "En cours",
          ticket: "Maintenance ascenseur requise - Étage 4",
        },
        documents: {
          title: "Bibliothèque Documentaire",
          description: "Accès sécurisé aux documents de l'immeuble.",
          files: {
            minutes: "PV_AG_2024.pdf",
            regulations: "Reglement_Co-pro.pdf",
            insurance: "Contrat_Assurance.pdf",
          },
        },
        automation: {
          title: "Génération Auto des Charges",
          stats: "Bâtiment A — 12 appartements",
          progress: "24 000 MAD générés ce mois",
        },
      },
    },
    pricing: {
      title: "Des Tarifs Simples et ",
      pricing: "Transparents",
      subtitle: "Choisissez le plan parfait pour vos besoins",
      tiers: {
        starter: {
          name: "Starter",
          description: "Parfait pour les petits immeubles",
          cta: "Commander",
          features: [
            "Jusqu'à 50 lots",
            "Génération automatique des charges",
            "Signalement d'incidents",
            "Bibliothèque de documents de base",
            "Support par email",
            "Tableau de bord financier",
          ],
          limitations: ["Gestion multi-immeubles", "Exports comptables avancés", "Application Web Personnalisée"],
        },
        professional: {
          name: "Professionnel",
          description: "Pour les syndics en croissance",
          cta: "Commander",
          features: [
            "Tout ce qui est dans Starter",
            "Jusqu'à 200 lots",
            "Gestion multi-immeubles",
            "Exports comptables avancés",
            "Rappels de paiement automatisés",
            "Support prioritaire",
          ],
          limitations: ["Gestionnaire de compte dédié", "Intégrations sur mesure", "Plateforme en marque blanche"],
        },
        enterprise: {
          name: "Entreprise",
          price: "Sur Mesure",
          description: "Pour les grands cabinets de gestion",
          cta: "Obtenir un devis",
          features: [
            "Tout ce qui est dans Pro",
            "Lots illimités",
            "Gestionnaire de compte dédié",
            "Intégrations sur mesure",
            "Plateforme en marque blanche",
            "Accès API",
          ],
          limitations: [],
        },
      },
    },
    testimonials: {
      title: "Ne vous contentez pas de nous croire sur parole",
      postedOnGoogle: "Publié sur Google",
      reviews: {
        brandon: {
          role: "Gestionnaire de copropriété",
          review: "Gérer 5 immeubles était un cauchemar de tableurs. Orsyndic a automatisé nos calculs de charges et nous a fait gagner 20 heures par semaine.",
          timeAgo: "Il y a 2 semaines",
        },
        sarah: {
          role: "Copropriétaire",
          review: "La transparence est incroyable. Les copropriétaires ne se plaignent plus des charges opaques car tout est visible en temps réel.",
          timeAgo: "Il y a 1 mois",
        },
        michael: {
          role: "Directeur des Opérations",
          review: "Nous avons réduit les impayés de 40% dès le premier mois grâce au suivi et aux notifications automatisés.",
          timeAgo: "Il y a 3 semaines",
        },
        emily: {
          role: "Syndic Bénévole",
          review: "Signaler un incident est si simple maintenant. Nos résidents utilisent la plateforme et nous suivons la résolution sans rien oublier.",
          timeAgo: "Il y a 1 mois",
        },
        david: {
          role: "CEO, Cabinet de Syndic",
          review: "Orsyndic est l'outil de gestion de copropriété le plus intuitif que nous ayons utilisé. La transition de nos 15 immeubles s'est faite en douceur.",
          timeAgo: "Il y a 2 mois",
        },
        amara: {
          role: "Présidente de Conseil Syndical",
          review: "La bibliothèque de documents justifie à elle seule le prix. Plus besoin d'envoyer le règlement ou les PV par email aux nouveaux propriétaires.",
          timeAgo: "Il y a 3 semaines",
        },
        james: {
          role: "Associé Gérant",
          review: "Nous avons développé notre cabinet de syndic à 30 immeubles sans embaucher de personnel administratif supplémentaire.",
          timeAgo: "Il y a 1 mois",
        },
        priya: {
          role: "Copropriétaire",
          review: "Une révolution pour notre copropriété. Tout le monde est sur la même longueur d'onde et les litiges financiers ont totalement disparu.",
          timeAgo: "Il y a 2 semaines",
        },
      },
    },
    howItWorks: {
      title: "Comment fonctionne Orsyndic.",
      subtitle: "Trois étapes simples pour prendre le contrôle total de votre gestion de copropriété — de la configuration aux opérations quotidiennes.",
      steps: {
        step1: {
          title: "Configurez votre immeuble",
          description: "Définissez la structure de votre immeuble — étages, appartements et copropriétaires. Orsyndic organise tout dans une hiérarchie claire.",
        },
        step2: {
          title: "Générez & suivez les charges",
          description: "Générez automatiquement les charges mensuelles selon les tantièmes, suivez les statuts de paiement en temps réel et identifiez les impayés.",
        },
        step3: {
          title: "Restez informé",
          description: "Surveillez l'activité de l'immeuble en un coup d'œil — des résumés financiers aux tickets d'incidents. Envoyez des notifications et résolvez les problèmes.",
        },
      },
    },
    cta: {
      title: "Prêt à transformer votre gestion de copropriété ?",
      subtitle: "Rejoignez des centaines de syndics qui font confiance à ORSYNDIC pour gérer leurs immeubles efficacement.",
      primaryBtn: "Lancer votre projet",
      secondaryBtn: "Planifier un appel",
      features: {
        engaging: {
          title: "Efficacité Automatisée",
          description: "Gagnez des heures de travail administratif chaque mois grâce à l'automatisation des calculs et des documents.",
        },
        secure: {
          title: "Sécurisé & Transparent",
          description: "Sécurité bancaire pour vos données financières et transparence totale pour tous les copropriétaires.",
        },
        scale: {
          title: "Conçu pour Évoluer",
          description: "Que vous gériez un ou cinquante immeubles, Orsyndic grandit facilement avec votre portefeuille.",
        },
      },
    },
    faq: {
      title1: "Questions",
      title2: "fréquemment posées",
      subtitle: "Tout ce que vous devez savoir sur Orsyndic et comment il simplifie la gestion de votre immeuble.",
      questions: {
        q1: {
          q: "Qu'est-ce qu'Orsyndic ?",
          a: "Orsyndic est une plateforme numérique complète conçue pour simplifier la gestion de copropriété (syndic) grâce à l'automatisation et à la transparence.",
        },
        q2: {
          q: "Qui peut utiliser la plateforme ?",
          a: "Orsyndic propose des interfaces adaptées pour trois rôles clés : Syndics (gestionnaires), Copropriétaires et Résidents, garantissant à chacun les outils nécessaires.",
        },
        q3: {
          q: "Mes données financières sont-elles sécurisées ?",
          a: "Oui, absolument. Nous utilisons des protocoles de cryptage standards et une sécurité robuste pour garantir la protection totale de vos suivis financiers.",
        },
        q4: {
          q: "Puis-je signaler et suivre les incidents de l'immeuble ?",
          a: "Certainement. Notre module de signalement permet aux résidents de déclarer des problèmes techniques, tandis que les syndics suivent la résolution en temps réel.",
        },
        q5: {
          q: "Comment fonctionne la génération automatique des charges ?",
          a: "Le système calcule automatiquement les charges selon les tantièmes définis, génère les avis d'échéance et suit les paiements sans intervention manuelle.",
        },
        q6: {
          q: "Orsyndic est-il disponible sur appareils mobiles ?",
          a: "Oui, Orsyndic est conçu avec une approche mobile-first. Il est entièrement responsive et optimisé pour smartphones, tablettes et ordinateurs.",
        },
      },
    },
    footer: {
      columns: {
        agency: "Agence",
        resources: "Ressources",
        legal: "Juridique",
        connect: "Suivez-nous",
        contact: "Contactez-nous",
      },
      links: {
        home: "Accueil",
        about: "À propos",
        functionalities: "Fonctionnalités",
        testimonials: "Témoignages",
        pricing: "Tarification",
        faq: "FAQ",
        contact: "Contact",
        blog: "Blog",
        help: "Centre d'Aide",
        privacy: "Politique de Confidentialité",
        terms: "Conditions Générales",
        cookie: "Politique de Cookies",
      },
      soon: "Bientôt",
      rights: "Tous droits réservés.",
      status: "Tous les systèmes sont opérationnels",
      phoneNumber: "+212 704 749 027",
      address: "Martil, Maroc",
    },
    contactPage: {
      metadata: {
        title: "Contactez-nous | Orsyndic",
        description: "Contactez l'équipe Orsyndic pour simplifier la gestion de votre copropriété.",
      },
      badge: "Parlons de votre Projet",
      heading: "Prêt à simplifier la gestion de votre copropriété ?",
      subheading: "Remplissez le formulaire et notre équipe vous recontactera sous 24 heures pour planifier une démo et discuter de vos besoins.",
      emailUs: "Écrivez-nous",
      callUs: "Appelez-nous",
      visitUs: "Visitez-nous",
      phoneNumber: "+212 704 749 027",
      address: "Martil, Maroc",
      form: {
        labels: {
          firstName: "Prénom",
          lastName: "Nom",
          email: "Adresse E-mail",
          phone: "Numéro de Téléphone",
          company: "Nom de l'Entreprise",
          subject: "Sujet de votre demande",
          message: "Message",
        },
        placeholders: {
          firstName: "Jean",
          lastName: "Dupont",
          email: "jean@exemple.com",
          phone: "+212 600 000 000",
          company: "Acme Corp",
          subject: "Sélectionnez un sujet",
          message: "Dites-nous comment nous pouvons vous aider...",
        },
        subjects: {
          demo: "Demander une démo",
          sales: "Question commerciale",
          support: "Support technique",
          partnership: "Partenariat",
          other: "Autre",
        },
        submit: "Envoyer le Message",
        whatsapp: "WhatsApp",
        footerAgreement: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité et nos conditions d'utilisation.",
      },
    },
  },
  es: {
    nav: {
      about: "Nosotros",
      functionalities: "Funcionalidades",
      pricing: "Precios",
      testimonials: "Testimonios",
      faq: "FAQ",
      contact: "Contacto",
      access: "Acceso Síndico",
    },
    hero: {
      badge: "Experiencia Digital Re-imaginada",
      title: {
        part1: "Donde los visionarios construyen",
        part2: "su presencia digital",
      },
      description: "Nos asociamos con personas y equipos ambiciosos para crear sitios web impresionantes, plataformas potentes y estrategias de crecimiento inteligentes.",
      startProject: "Solicitar una demo",
      viewServices: "Ver Servicios",
      chatWhatsApp: "Chat por WhatsApp",
      sendEmail: "Enviar un Email",
      stats: {
        solutions: { value: "500", label: "Soluciones Digitales" },
        experience: { value: "12", label: "Años de Experiencia" },
      },
    },
    trusted: {
      text: {
        part1: "Orsyndic",
        part2: " es la solución de confianza para ",
        part3: "numerosos complejos residenciales",
        part4: " en toda la región, garantizando una gestión fluida de la propiedad.",
      },
    },
    about: {
      title: "Diseñado para la gestión moderna de síndicos.",
      subtitle: "Acerca de Orsyndic",
      description: "Gestionar una copropiedad no debería significar ahogarse en hojas de cálculo y llamadas interminables. Orsyndic reemplaza el caos con una plataforma única e intuitiva donde los síndicos generan cargos automáticamente, los copropietarios rastrean cada pago en tiempo real y los residentes reportan incidentes que se resuelven — no se olvidan. Diseñado para la forma en que los edificios modernos realmente operan.",
      stats: {
        buildings: { value: "120+", label: "Edificios Gestionados" },
        hoursSaved: { value: "5.000+", label: "Horas Ahorradas / Mes" },
        coOwners: { value: "3.200+", label: "Copropietarios Integrados" },
      },
    },
    functionalities: {
      title: {
        part1: "Funcionalidades",
        part2: "Principales",
      },
      subtitle: "Orsyndic centraliza todo lo que necesitas para gestionar tu copropiedad de forma eficiente y transparente.",
      cards: {
        payments: {
          title: "Seguimiento de Pagos",
          description: "Monitoreo en tiempo real de todas las contribuciones del edificio.",
          table: {
            apt: "Apto",
            owner: "Propietario",
            amount: "Monto",
            status: { paid: "Pagado", overdue: "Vencido" },
          },
        },
        access: {
          title: "Control de Acceso de 3 Roles",
          description: "Interfaces personalizadas por tipo de usuario.",
          roles: {
            syndic: "Síndico",
            owner: "Copropietario",
            resident: "Residente",
          },
        },
        incidents: {
          title: "Reporte de Incidentes",
          description: "Seguimiento de resolución de fallos técnicos.",
          status: "En Progreso",
          ticket: "Mantenimiento de ascensor requerido - Piso 4",
        },
        documents: {
          title: "Biblioteca de Documentos",
          description: "Acceso seguro a documentos del edificio.",
          files: {
            minutes: "Acta_AG_2024.pdf",
            regulations: "Reglas_Edificio.pdf",
            insurance: "Poliza_Seguro.pdf",
          },
        },
        automation: {
          title: "Generación Automática de Cargos",
          stats: "Edificio A — 12 apartamentos",
          progress: "24,000 MAD generados este mes",
        },
      },
    },
    pricing: {
      title: "Precios Simples y ",
      pricing: "Transparentes",
      subtitle: "Elige el plan perfecto para tus necesidades",
      tiers: {
        starter: {
          name: "Starter",
          description: "Perfecto para edificios pequeños",
          cta: "Ordenar ahora",
          features: [
            "Hasta 50 lotes",
            "Generación automática de cargos",
            "Reporte de incidentes",
            "Biblioteca de documentos básica",
            "Soporte por email",
            "Panel financiero",
          ],
          limitations: ["Gestión multi-edificio", "Exportaciones contables avanzadas", "Aplicación Web Personalizada"],
        },
        professional: {
          name: "Profesional",
          description: "Para síndicos en crecimiento",
          cta: "Ordenar ahora",
          features: [
            "Todo lo de Starter",
            "Hasta 200 lotes",
            "Gestión multi-edificio",
            "Exportaciones contables avanzadas",
            "Recordatorios automáticos",
            "Soporte prioritario",
          ],
          limitations: ["Gestor de cuenta dedicado", "Integraciones personalizadas", "Marca blanca"],
        },
        enterprise: {
          name: "Enterprise",
          price: "Personalizado",
          description: "Para grandes firmas de gestión",
          cta: "Obtener presupuesto",
          features: [
            "Todo lo de Pro",
            "Lotes ilimitados",
            "Gestor de cuenta dedicado",
            "Integraciones personalizadas",
            "Marca blanca",
            "Acceso API",
          ],
          limitations: [],
        },
      },
    },
    testimonials: {
      title: "No te quedes solo con nuestra palabra",
      postedOnGoogle: "Publicado en Google",
      reviews: {
        brandon: {
          role: "Gestor de Propiedades",
          review: "Gestionar 5 edificios era una pesadilla de hojas de cálculo. Orsyndic automatizó nuestros cargos y nos ahorró 20 horas a la semana.",
          timeAgo: "Hace 2 semanas",
        },
        sarah: {
          role: "Copropietaria",
          review: "La transparencia es increíble. Los copropietarios ya no se quejan de cargos opacos porque todo es visible en tiempo real.",
          timeAgo: "Hace 1 mes",
        },
        michael: {
          role: "Director de Operaciones",
          review: "Redujimos la morosidad en un 40% en el primer mes gracias al seguimiento y las notificaciones automatizadas.",
          timeAgo: "Hace 3 semanas",
        },
        emily: {
          role: "Síndico Asociado",
          review: "Reportar un incidente es muy fácil ahora. Nuestros residentes usan la plataforma y nosotros hacemos seguimiento sin olvidar nada.",
          timeAgo: "Hace 1 mes",
        },
        david: {
          role: "CEO, Firma de Gestión",
          review: "Orsyndic es la herramienta de gestión más intuitiva que hemos usado. La transición de nuestros 15 edificios fue perfecta.",
          timeAgo: "Hace 2 meses",
        },
        amara: {
          role: "Presidenta de Edificio",
          review: "La biblioteca de documentos por sí sola vale el precio. Se acabó el enviar reglamentos o actas por email a los nuevos dueños.",
          timeAgo: "Hace 3 semanas",
        },
        james: {
          role: "Socio Director",
          review: "Hemos escalado nuestra agencia de síndico a 30 edificios sin contratar más personal administrativo.",
          timeAgo: "Hace 1 mes",
        },
        priya: {
          role: "Cofundadora, Inmobiliaria",
          review: "Un cambio radical para nuestra copropiedad. Todos estamos en sintonía y las disputas financieras han desaparecido por completo.",
          timeAgo: "Hace 2 semanas",
        },
      },
    },
    howItWorks: {
      title: "Cómo funciona Orsyndic.",
      subtitle: "Tres pasos simples para tomar el control total de la gestión de su copropiedad — desde la configuración hasta las operaciones diarias.",
      steps: {
        step1: {
          title: "Configure su edificio",
          description: "Defina la estructura de su edificio — pisos, apartamentos y copropietarios. Orsyndic organiza todo en una jerarquía clara.",
        },
        step2: {
          title: "Genere y rastree cargos",
          description: "Genere automáticamente cargos mensuales según cuotas, rastree estados de pago en tiempo real e identifique cuentas vencidas.",
        },
        step3: {
          title: "Manténgase informado",
          description: "Supervise la actividad del edificio de un vistazo — desde resúmenes financieros hasta tickets de incidentes. Envíe notificaciones y resuelva problemas.",
        },
      },
    },
    cta: {
      title: "¿Listo para transformar la gestión de tu copropiedad?",
      subtitle: "Únete a cientos de síndicos que confían en ORSYNDIC para gestionar sus edificios de manera eficiente.",
      primaryBtn: "Inicia tu Proyecto",
      secondaryBtn: "Programar Consultoría",
      features: {
        engaging: {
          title: "Eficiencia Automatizada",
          description: "Ahorra horas de trabajo administrativo cada mes con cálculos de cargos y documentos automatizados.",
        },
        secure: {
          title: "Seguro y Transparente",
          description: "Seguridad a nivel bancario para tus datos financieros y total transparencia para los copropietarios.",
        },
        scale: {
          title: "Construido para Escalar",
          description: "Ya sea que gestiones uno o cincuenta edificios, Orsyndic crece fácilmente con tu portafolio.",
        },
      },
    },
    faq: {
      title1: "Preguntas",
      title2: "frecuentes",
      subtitle: "Todo lo que necesitas saber sobre Orsyndic y cómo simplifica la gestión de tu edificio.",
      questions: {
        q1: {
          q: "¿Qué es Orsyndic?",
          a: "Orsyndic es una plataforma digital integral diseñada para simplificar la gestión de copropiedades (síndicos) mediante la automatización y la transparencia.",
        },
        q2: {
          q: "¿Quién puede utilizar la plataforma?",
          a: "Orsyndic ofrece interfaces personalizadas para tres roles principales: Síndicos (gestores), Copropietarios y Residentes, asegurando herramientas específicas para cada uno.",
        },
        q3: {
          q: "¿Son seguros mis datos financieros?",
          a: "Sí, por supuesto. Utilizamos cifrado estándar de la industria y protocolos de seguridad robustos para garantizar que todos tus datos financieros estén protegidos.",
        },
        q4: {
          q: "¿Puedo informar y rastrear incidentes en el edificio?",
          a: "Sin duda. Nuestro módulo de incidentes permite a los residentes reportar fallos técnicos, mientras que los gestores rastrean la resolución en tiempo real.",
        },
        q5: {
          q: "¿Cómo funciona la generación automática de cargos?",
          a: "El sistema calcula automáticamente los cargos del edificio según las cuotas definidas, generando facturas y rastreando pagos sin esfuerzo manual.",
        },
        q6: {
          q: "¿Está Orsyndic disponible en dispositivos móviles?",
          a: "Sí, Orsyndic está desarrollado con un enfoque móvil primero. Es totalmente responsivo y está optimizado para smartphones, tablets y ordenadores.",
        },
      },
    },
    footer: {
      columns: {
        agency: "Agencia",
        resources: "Recursos",
        legal: "Legal",
        connect: "Conectar",
        contact: "Contáctenos",
      },
      links: {
        home: "Inicio",
        about: "Nosotros",
        functionalities: "Funcionalidades",
        testimonials: "Testimonios",
        pricing: "Precios",
        faq: "FAQ",
        contact: "Contacto",
        blog: "Blog",
        help: "Centro de Ayuda",
        privacy: "Política de Privacidad",
        terms: "Términos y Condiciones",
        cookie: "Política de Cookies",
      },
      soon: "Próximamente",
      rights: "Todos los derechos reservados.",
      status: "Todos los sistemas operativos",
      phoneNumber: "+212 704 749 027",
      address: "Martil, Marruecos",
    },
    contactPage: {
      metadata: {
        title: "Contáctanos | Orsyndic",
        description: "Ponte en contacto con el equipo de Orsyndic para simplificar la gestión de tu copropiedad.",
      },
      badge: "Hablemos de tu Proyecto",
      heading: "¿Listo para simplificar la gestión de tu copropiedad?",
      subheading: "Completa el formulario y nuestro equipo se pondrá en contacto contigo en un plazo de 24 horas para programar una demostración y discutir tus necesidades.",
      emailUs: "Envíanos un correo",
      callUs: "Llámanos",
      visitUs: "Visítanos",
      phoneNumber: "+212 704 749 027",
      address: "Martil, Marruecos",
      form: {
        labels: {
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Correo Electrónico",
          phone: "Número de Teléfono",
          company: "Nombre de la Empresa",
          subject: "Asunto de contacto",
          message: "Mensaje",
        },
        placeholders: {
          firstName: "Juan",
          lastName: "Pérez",
          email: "juan@ejemplo.com",
          phone: "+212 600 000 000",
          company: "Acme Corp",
          subject: "Selecciona un asunto",
          message: "Cuéntanos cómo podemos ayudarte...",
        },
        subjects: {
          demo: "Programar una Demo",
          sales: "Consulta Comercial",
          support: "Soporte Técnico",
          partnership: "Asociación",
          other: "Otro",
        },
        submit: "Enviar Mensaje",
        whatsapp: "WhatsApp",
        footerAgreement: "Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.",
      },
    },
  },
};
