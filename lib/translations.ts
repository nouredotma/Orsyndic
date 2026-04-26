export type Language = "en" | "fr" | "es";

export interface Translations {
  nav: {
    work: string;
    functionalities: string;
    pricing: string;
    testimonials: string;
    faq: string;
    getQuote: string;
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
    askAi: string;
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
  features: {
    projects: {
      saas: { category: string; mobileCategory: string; description: string };
      corporate: { category: string; mobileCategory: string; description: string };
      ecommerce: { category: string; mobileCategory: string; description: string };
      association: { category: string; mobileCategory: string; description: string };
      travel: { category: string; mobileCategory: string; description: string };
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
  transformation: {
    title: string;
    subtitle: string;
    steps: {
      step1: { title: string; description: string };
      step2: { title: string; description: string };
      step3: { title: string; description: string };
      step4: { title: string; description: string };
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
      work: string;
      functionalities: string;
      testimonials: string;
      pricing: string;
      faq: string;
      blog: string;
      help: string;
      privacy: string;
      terms: string;
      cookie: string;
    };
    soon: string;
    rights: string;
    status: string;
  };
  getQuote: {
    metadata: {
      title: string;
      description: string;
    };
    badge: string;
    heading: string;
    subheading: string;
    emailUs: string;
    form: {
      labels: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        service: string;
        message: string;
      };
      placeholders: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        service: string;
        message: string;
      };
      services: {
        webDev: string;
        uiux: string;
        aiSolutions: string;
        transformation: string;
        marketing: string;
        ecommerce: string;
        branding: string;
        other: string;
      };
      submit: string;
      whatsapp: string;
      footerAgreement: string;
    };
  };
  ai: {
    modalTitle: string;
    modalDescription: string;
    headerTitleDesktop: string;
    headerTitleMobile: string;
    welcomeTitle: string;
    initialBotMessage: string;
    suggestedQuestions: string[];
    inputPlaceholder: string;
    inputPlaceholderContinue: string;
    disclaimer: string;
    errors: {
      failResponse: string;
      failConnect: string;
    };
    recording: {
      start: string;
      stop: string;
      notSupported: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      work: "Our Work",
      functionalities: "Functionalities",
      pricing: "Pricing",
      testimonials: "Testimonials",
      faq: "FAQ",
      getQuote: "Get a Quote",
    },
    hero: {
      badge: "Simplified Syndic Management",
      title: {
        part1: "Manage your properties",
        part2: "with transparency",
      },
      description: "Orsyndic centralizes your finances, automates your charges, and streamlines communication between managers, owners, and residents.",
      startProject: "Discover Orsyndic",
      viewServices: "Features",
      askAi: "Ask Orsyndic AI",
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
        part2: " uses modern ",
        part3: "cutting-edge technologies",
        part4: " to build robust and scalable digital experiences.",
      },
    },
    features: {
      projects: {
        saas: {
          category: "SaaS Dashboard",
          mobileCategory: "SaaS",
          description: "A comprehensive analytics and management solution built for modern SaaS platforms. Featuring real-time data visualization, user behavioral tracking, and a seamless administrative interface to drive business growth.",
        },
        corporate: {
          category: "Corporate Business",
          mobileCategory: "Corporate",
          description: "A high-performance corporate website designed to establish authority and trust. We focused on optimized conversion funnels, professional identity branding, and a sleek, fast-loading interface for global business.",
        },
        ecommerce: {
          category: "E-commerce Store",
          mobileCategory: "E-comm",
          description: "An end-to-end e-commerce experience with a focus on user journey and sales conversion. Featuring lightning-fast checkout, mobile-first product exploration, and a premium aesthetic that elevates the shopping experience.",
        },
        association: {
          category: "Moroccan Association",
          mobileCategory: "Non-Profit",
          description: "Empowering local Moroccan associations with a digital platform to coordinate volunteer work and manage community impact. The design blends modern web standards with subtle cultural aesthetics.",
        },
        travel: {
          category: "Traveling Service",
          mobileCategory: "Travel",
          description: "A vibrant and intuitive booking platform that simplifies trip planning for explorers. We integrated immersive high-quality imagery and a modern brand identity to inspire global travelers and adventurers.",
        },
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
          description: "Perfect for individuals and small projects",
          cta: "Order Now",
          features: [
            "Responsive Web Design",
            "Up to 5 Pages",
            "Basic SEO Setup",
            "Contact Form Integration",
            "Mobile Optimization",
            "1 Month Support",
            "Social Media Integration",
            "Basic Analytics Setup",
          ],
          limitations: ["Advanced SEO Optimization", "E-commerce Integration", "Custom Web Application"],
        },
        professional: {
          name: "Professional",
          description: "For growing teams and businesses",
          cta: "Order Now",
          features: [
            "Everything in Starter",
            "Up to 15 Pages",
            "Advanced SEO Optimization",
            "E-commerce Integration",
            "Custom Animations",
            "3 Months Support",
            "Advanced Analytics",
            "Performance Optimization",
          ],
          limitations: ["Custom Web Application", "Custom CMS", "Priority Development"],
        },
        enterprise: {
          name: "Enterprise",
          price: "Custom",
          description: "For large-scale operations",
          cta: "Get a Quote",
          features: [
            "Everything in Pro",
            "Unlimited Pages",
            "Custom Web Application",
            "Advanced Integrations",
            "Premium Support",
            "6 Months Support",
            "Custom CMS",
            "Priority Development",
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
          role: "Chief Accounting Officer",
          review: "We needed a website that could match our brand's ambition — orsyndic delivered beyond anything we imagined. Our bounce rate dropped 45% and enquiries tripled within weeks of launch.",
          timeAgo: "2 weeks ago",
        },
        sarah: {
          role: "Marketing Director, Bloom Studio",
          review: "Their design instinct is unreal. We showed up with a mood board and left with a pixel-perfect, lightning-fast site that our competitors openly envy. The ROI paid for itself in the first month.",
          timeAgo: "1 month ago",
        },
        michael: {
          role: "Operations Director",
          review: "From discovery call to go-live in under 3 weeks — and the quality didn't suffer one bit. The site is blazing fast, SEO-ready, and our conversion rate jumped 40% on day one.",
          timeAgo: "3 weeks ago",
        },
        emily: {
          role: "Founder & CEO, Vellura",
          review: "After two failed attempts with other agencies, orsyndic finally got it right. They listened, iterated fast, and built a website that actually sounds like us. Best decision we made all year.",
          timeAgo: "1 month ago",
        },
        david: {
          role: "CEO, ThompsonTech",
          review: "Our old site was embarrassing — now clients literally compliment us on it during sales calls. orsyndic turned our digital presence from a liability into our strongest asset.",
          timeAgo: "2 months ago",
        },
        amara: {
          role: "Head of Growth, Kinetic",
          review: "They don't just build websites — they build revenue machines. Our new landing pages convert 3x better than what we had before. The team is sharp, responsive, and genuinely cares about results.",
          timeAgo: "3 weeks ago",
        },
        james: {
          role: "Managing Partner, Whitfield Legal",
          review: "For a law firm, trust is everything — and our new site communicates exactly that. Clean, professional, mobile-first. We've seen a 60% increase in contact form submissions since launch.",
          timeAgo: "1 month ago",
        },
        priya: {
          role: "Co-founder, Solace Wellness",
          review: "We run a wellness brand and needed a site that felt calming yet premium. orsyndic nailed the aesthetic on the first draft. Our online bookings have doubled — can't recommend them enough.",
          timeAgo: "2 weeks ago",
        },
      },
    },
    transformation: {
      title: "How we bring your vision to life.",
      subtitle: "From first idea to final launch — four clear steps to transform your concept into a polished, high-performing digital product.",
      steps: {
        step1: {
          title: "Discovery & Brief",
          description: "We start by understanding your vision, goals, and audience. Through in-depth research and strategic planning, we define the project scope.",
        },
        step2: {
          title: "UI/UX Design",
          description: "Our designers craft pixel-perfect mockups and interactive prototypes that bring your brand to life, focusing on intuitive experiences.",
        },
        step3: {
          title: "Development",
          description: "We build your project using cutting-edge technologies and clean, scalable code, optimized for performance and security.",
        },
        step4: {
          title: "Launch & Go Live",
          description: "After rigorous testing, we deploy your project. We handle hosting, domain configuration, and post-launch support.",
        },
      },
    },
    cta: {
      title: "Ready to transform your digital presence?",
      subtitle: "Join innovative brands that trust ORSYNDIC to build, scale, and optimize their online platforms.",
      primaryBtn: "Start Your Project",
      secondaryBtn: "Schedule Consultation",
      features: {
        engaging: {
          title: "Engaging Experiences",
          description: "We build beautifully designed, high-performance websites that captivate your audience and elevate your brand identity.",
        },
        secure: {
          title: "Secure & Reliable",
          description: "Our code is built on industry-leading security practices, keeping your website robust, fast, and safe from threats.",
        },
        scale: {
          title: "Built to Scale",
          description: "Leverage modern web architectures ensuring your digital platforms grow seamlessly alongside your expanding business.",
        },
      },
    },
    faq: {
      title1: "Frequently",
      title2: "asked questions",
      subtitle: "Everything you need to know about our web development process and services.",
      questions: {
        q1: {
          q: "What services does Orsyndic offer?",
          a: "We specialize in custom web design, robust web development, UI/UX design, mobile app development, eCommerce solutions, and comprehensive SEO optimization to help your business grow online.",
        },
        q2: {
          q: "How long does it take to design and develop a custom website?",
          a: "The timeline varies depending on the project's complexity. A standard web design project typically takes 4-8 weeks, while custom web applications or eCommerce solutions may take longer. We'll provide a detailed timeline during our initial consultation.",
        },
        q3: {
          q: "Do you provide ongoing support after the website goes live?",
          a: "Yes, absolutely. We offer ongoing maintenance and support packages to ensure your digital platform remains secure, up-to-date, and performs optimally long after the initial launch.",
        },
        q4: {
          q: "Will my website be mobile-friendly and optimized for search engines?",
          a: "Definitely. All of our websites are built with a mobile-first approach, ensuring full responsiveness across devices. We also implement best-practice SEO structures off the bat, so your site is ready to rank well on Google.",
        },
        q5: {
          q: "Can you help redesign or improve an existing website?",
          a: "Yes, we frequently revamp existing websites. Whether you need a fresh UI/UX overhaul, performance optimization, or new features integrated into your current platform, our team can help elevate your brand identity.",
        },
        q6: {
          q: "Which platforms and technologies do you use for web development?",
          a: "We utilize modern, high-performance tech stacks tailored to your project. This includes Next.js, React, Tailwind CSS, and robust backend solutions. For eCommerce, we work with custom architectures to ensure scalable growth.",
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
        work: "Our Work",
        functionalities: "Functionalities",
        testimonials: "Testimonials",
        pricing: "Pricing",
        faq: "FAQ",
        blog: "Blog",
        help: "Help Center",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        cookie: "Cookie Policy",
      },
      soon: "Soon",
      rights: "All rights reserved.",
      status: "All Systems Operational",
    },
    getQuote: {
      metadata: {
        title: "Get a Quote | Ors",
        description: "Contact us to start your project. We'd love to hear from you.",
      },
      badge: "Let's Talk",
      heading: "Ready to transform your digital presence?",
      subheading: "Fill out the form and our team will get back to you within 24 hours to discuss your project and how we can help.",
      emailUs: "Email us",
      form: {
        labels: {
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email Address",
          phone: "Phone Number (WhatsApp available)",
          company: "Company Name",
          service: "Service you are interested in",
          message: "Project Details",
        },
        placeholders: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+1 234 567 890",
          company: "Acme Corp",
          service: "Select a service",
          message: "Tell us about your goals, timeline, and budget...",
        },
        services: {
          webDev: "Web Development",
          uiux: "UI/UX Design",
          aiSolutions: "AI Solutions & Automation",
          transformation: "Digital Transformation",
          marketing: "Digital Marketing",
          ecommerce: "E-commerce Solutions",
          branding: "Branding & Identity",
          other: "Other",
        },
        submit: "Send Message",
        whatsapp: "WhatsApp",
        footerAgreement: "By submitting this form, you agree to our privacy policy and terms of service.",
      },
    },
    ai: {
      modalTitle: "Orsyndic AI Assistant",
      modalDescription: "Chat with Ors, the Orsyndic AI assistant, to learn about our services.",
      headerTitleDesktop: "Orsyndic AI — Orsyndic",
      headerTitleMobile: "Orsyndic AI",
      welcomeTitle: "Hey! I'm Ors 👋 Ask me about Orsyndic",
      initialBotMessage: "Hey! I'm Ors, the AI assistant for Orsyndic. I can tell you about our services, showcase our portfolio, or help you start a project. What would you like to know?",
      suggestedQuestions: [
        "What services do you offer?",
        "Can I see your portfolio?",
        "How can I start a project?",
      ],
      inputPlaceholder: "Ask me anything...",
      inputPlaceholderContinue: "Continue the conversation...",
      disclaimer: "Ors can make mistakes. Check important info.",
      errors: {
        failResponse: "I didn't get a reply — please try again.",
        failConnect: "Sorry, I'm having trouble connecting right now. Please try again later.",
      },
      recording: {
        start: "Start recording",
        stop: "Stop recording",
        notSupported: "Speech recognition is not supported in your browser.",
      },
    },
  },
  fr: {
    nav: {
      work: "Nos Réalisations",
      functionalities: "Fonctionnalités",
      pricing: "Tarifs",
      testimonials: "Témoignages",
      faq: "FAQ",
      getQuote: "Obtenir un devis",
    },
    hero: {
      badge: "Gestion de Syndic Simplifiée",
      title: {
        part1: "Gérez vos copropriétés",
        part2: "avec transparence",
      },
      description: "Orsyndic centralise vos finances, automatise vos charges et fluidifie la communication entre syndics, copropriétaires et résidents.",
      startProject: "Découvrir Orsyndic",
      viewServices: "Fonctionnalités",
      askAi: "Demander à l'IA Orsyndic",
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
        part2: " utilise des ",
        part3: "technologies de pointe",
        part4: " pour créer des expériences numériques robustes et évolutives.",
      },
    },
    features: {
      projects: {
        saas: {
          category: "Tableau de Bord SaaS",
          mobileCategory: "SaaS",
          description: "Une solution complète de gestion et d'analyse pour les plateformes SaaS modernes. Visualisation de données en temps réel et interface fluide pour stimuler la croissance.",
        },
        corporate: {
          category: "Entreprise",
          mobileCategory: "Entreprise",
          description: "Un site institutionnel haute performance conçu pour instaurer autorité et confiance. Focus sur les tunnels de conversion et une identité professionnelle forte.",
        },
        ecommerce: {
          category: "Boutique E-commerce",
          mobileCategory: "E-comm",
          description: "Une expérience e-commerce de bout en bout axée sur le parcours utilisateur. Paiement ultra-rapide et esthétique premium pour sublimer l'achat.",
        },
        association: {
          category: "Association Marocaine",
          mobileCategory: "ONG",
          description: "Digitalisation des associations locales marocaines pour coordonner le bénévolat. Un design alliant standards modernes et touches culturelles subtiles.",
        },
        travel: {
          category: "Service de Voyage",
          mobileCategory: "Voyage",
          description: "Une plateforme de réservation intuitive pour les explorateurs. Intégration d'imagerie immersive pour inspirer les voyageurs du monde entier.",
        },
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
          description: "Parfait pour les particuliers et les petits projets",
          cta: "Commander",
          features: [
            "Design Web Réactif",
            "Jusqu'à 5 Pages",
            "Configuration SEO de Base",
            "Intégration Formulaire de Contact",
            "Optimisation Mobile",
            "1 Mois de Support",
            "Intégration Réseaux Sociaux",
            "Configuration Analytics de Base",
          ],
          limitations: ["Optimisation SEO Avancée", "Intégration E-commerce", "Application Web Personnalisée"],
        },
        professional: {
          name: "Professionnel",
          description: "Pour les équipes et entreprises en croissance",
          cta: "Commander",
          features: [
            "Tout ce qui est dans Starter",
            "Jusqu'à 15 Pages",
            "Optimisation SEO Avancée",
            "Intégration E-commerce",
            "Animations Personnalisées",
            "3 Mois de Support",
            "Analytique Avancée",
            "Optimisation des Performances",
          ],
          limitations: ["Application Web Personnalisée", "CMS Personnalisé", "Développement Prioritaire"],
        },
        enterprise: {
          name: "Entreprise",
          price: "Sur Mesure",
          description: "Pour les opérations à grande échelle",
          cta: "Obtenir un devis",
          features: [
            "Tout ce qui est dans Pro",
            "Pages Illimitées",
            "Application Web Personnalisée",
            "Intégrations Avancées",
            "Support Premium",
            "6 Mois de Support",
            "CMS Personnalisé",
            "Développement Prioritaire",
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
          role: "Directeur Comptable",
          review: "Nous avions besoin d'un site web à la hauteur des ambitions de notre marque — orsyndic a dépassé toutes nos attentes. Notre taux de rebond a chuté de 45% et les demandes ont triplé quelques semaines après le lancement.",
          timeAgo: "Il y a 2 semaines",
        },
        sarah: {
          role: "Directrice Marketing, Bloom Studio",
          review: "Leur instinct de designer est incroyable. Nous sommes venus avec un moodboard et sommes repartis avec un site ultra-rapide et au pixel près que nos concurrents nous envient. Le retour sur investissement a été rentabilisé dès le premier mois.",
          timeAgo: "Il y a 1 mois",
        },
        michael: {
          role: "Directeur des Opérations",
          review: "Du premier appel à la mise en ligne en moins de 3 semaines — et la qualité n'en a pas souffert une seconde. Le site est extrêmement rapide, optimisé pour le SEO, et notre taux de conversion a bondi de 40% dès le premier jour.",
          timeAgo: "Il y a 3 semaines",
        },
        emily: {
          role: "Fondatrice & CEO, Vellura",
          review: "Après deux échecs avec d'autres agences, orsyndic a enfin réussi. Ils ont écouté, itéré rapidement et construit un site qui nous ressemble enfin. La meilleure décision de l'année.",
          timeAgo: "Il y a 1 mois",
        },
        david: {
          role: "CEO, ThompsonTech",
          review: "Notre ancien site était embarrassant — maintenant, les clients nous font littéralement des compliments lors des appels de vente. orsyndic a transformé notre présence numérique d'un fardeau en notre meilleur atout.",
          timeAgo: "Il y a 2 mois",
        },
        amara: {
          role: "Responsable de la Croissance, Kinetic",
          review: "Ils ne se contentent pas de créer des sites — ils créent des machines à revenus. Nos nouvelles pages de vente convertissent 3 fois mieux qu'avant. L'équipe est vive, réactive et se soucie réellement des résultats.",
          timeAgo: "Il y a 3 semaines",
        },
        james: {
          role: "Associé Gérant, Whitfield Legal",
          review: "Pour un cabinet d'avocats, la confiance est primordiale — et notre nouveau site communique exactement cela. Propre, professionnel et mobile-first. Nous avons vu une augmentation de 60% des soumissions de formulaires depuis le lancement.",
          timeAgo: "Il y a 1 mois",
        },
        priya: {
          role: "Co-fondatrice, Solace Wellness",
          review: "Nous gérons une marque de bien-être et avions besoin d'un site à la fois apaisant et premium. orsyndic a parfaitement saisi l'esthétique dès le premier jet. Nos réservations en ligne ont doublé — je ne peux que les recommander.",
          timeAgo: "Il y a 2 semaines",
        },
      },
    },
    transformation: {
      title: "Comment nous donnons vie à votre vision.",
      subtitle: "De la première idée au lancement final — quatre étapes claires pour transformer votre concept en un produit numérique performant.",
      steps: {
        step1: {
          title: "Découverte & Brief",
          description: "Nous commençons par comprendre votre vision et vos objectifs. Par une recherche approfondie, nous définissons la portée du projet.",
        },
        step2: {
          title: "Design UI/UX",
          description: "Nos designers créent des maquettes et prototypes interactifs, en se concentrant sur une expérience utilisateur intuitive.",
        },
        step3: {
          title: "Développement",
          description: "Nous construisons votre projet avec des technologies de pointe et un code propre, optimisé pour la performance.",
        },
        step4: {
          title: "Lancement",
          description: "Après des tests rigoureux, nous déployons votre projet et assurons la configuration du domaine et le support post-lancement.",
        },
      },
    },
    cta: {
      title: "Prêt à transformer votre présence numérique ?",
      subtitle: "Rejoignez les marques innovantes qui font confiance à ORSYNDIC pour construire et optimiser leurs plateformes.",
      primaryBtn: "Lancer votre projet",
      secondaryBtn: "Planifier un appel",
      features: {
        engaging: {
          title: "Expériences Engageantes",
          description: "Nous créons des sites performants et esthétiques qui captivent votre audience et valorisent votre identité.",
        },
        secure: {
          title: "Sécurisé & Fiable",
          description: "Nos développements suivent les meilleures pratiques de sécurité pour une plateforme robuste et rapide.",
        },
        scale: {
          title: "Évolutif",
          description: "Profitez d'architectures modernes garantissant que votre plateforme grandit avec votre entreprise.",
        },
      },
    },
    faq: {
      title1: "Questions",
      title2: "fréquemment posées",
      subtitle: "Tout ce que vous devez savoir sur notre processus de développement web et nos services.",
      questions: {
        q1: {
          q: "Quels services propose Orsdweb ?",
          a: "Nous sommes spécialisés dans la conception web personnalisée, le développement web robuste, le design UI/UX, le développement d'applications mobiles, les solutions e-commerce et l'optimisation SEO complète pour aider votre entreprise à se développer en ligne.",
        },
        q2: {
          q: "Combien de temps faut-il pour concevoir et développer un site web sur mesure ?",
          a: "Le délai varie en fonction de la complexité du projet. Un projet de conception web standard prend généralement 4 à 8 semaines, tandis que les applications web personnalisées ou les solutions e-commerce peuvent prendre plus de temps. Nous fournissons un calendrier détaillé lors de notre consultation initiale.",
        },
        q3: {
          q: "Fournissez-vous un support continu après la mise en ligne du site ?",
          a: "Oui, absolument. Nous proposons des forfaits de maintenance et de support continus pour garantir que votre plateforme numérique reste sécurisée, à jour et performante de manière optimale longtemps après le lancement initial.",
        },
        q4: {
          q: "Mon site web sera-t-il adapté aux mobiles et optimisé pour les moteurs de recherche ?",
          a: "Certainement. Tous nos sites web sont construits avec une approche mobile-first, garantissant une réactivité totale sur tous les appareils. Nous mettons également en œuvre les meilleures pratiques structurelles SEO dès le départ, afin que votre site soit prêt à bien se classer sur Google.",
        },
        q5: {
          q: "Pouvez-vous aider à refondre ou à améliorer un site web existant ?",
          a: "Oui, nous modernisons fréquemment des sites web existants. Que vous ayez besoin d'une refonte complète de l'UI/UX, d'une optimisation des performances ou de l'intégration de nouvelles fonctionnalités dans votre plateforme actuelle, notre équipe peut vous aider à élever l'identité de votre marque.",
        },
        q6: {
          q: "Quelles plateformes et technologies utilisez-vous pour le développement web ?",
          a: "Nous utilisons des piles technologiques modernes et performantes adaptées à votre projet. Cela inclut Next.js, React, Tailwind CSS et des solutions backend robustes. Pour l'e-commerce, nous travaillons avec des architectures personnalisées pour garantir une croissance évolutive.",
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
        work: "Nos Travaux",
        functionalities: "Fonctionnalités",
        testimonials: "Témoignages",
        pricing: "Tarification",
        faq: "FAQ",
        blog: "Blog",
        help: "Centre d'Aide",
        privacy: "Politique de Confidentialité",
        terms: "Conditions Générales",
        cookie: "Politique de Cookies",
      },
      soon: "Bientôt",
      rights: "Tous droits réservés.",
      status: "Tous les systèmes sont opérationnels",
    },
    getQuote: {
      metadata: {
        title: "Obtenir un Devis | Ors",
        description: "Contactez-nous pour démarrer votre projet. Nous aimerions avoir de vos nouvelles.",
      },
      badge: "Parlons de votre Projet",
      heading: "Prêt à transformer votre présence numérique ?",
      subheading: "Remplissez le formulaire et notre équipe vous recontactera sous 24 heures pour discuter de votre projet et de la manière dont nous pouvons vous aider.",
      emailUs: "Écrivez-nous",
      form: {
        labels: {
          firstName: "Prénom",
          lastName: "Nom",
          email: "Adresse E-mail",
          phone: "Numéro de Téléphone (WhatsApp disponible)",
          company: "Nom de l'Entreprise",
          service: "Service qui vous intéresse",
          message: "Détails du Projet",
        },
        placeholders: {
          firstName: "Jean",
          lastName: "Dupont",
          email: "jean@exemple.com",
          phone: "+33 1 23 45 67 89",
          company: "Acme Corp",
          service: "Sélectionnez un service",
          message: "Parlez-nous de vos objectifs, de votre calendrier et de votre budget...",
        },
        services: {
          webDev: "Développement Web",
          uiux: "Design UI/UX",
          aiSolutions: "Solutions IA & Automatisations",
          transformation: "Transformation Numérique",
          marketing: "Marketing Numérique",
          ecommerce: "Solutions E-commerce",
          branding: "Image de Marque & Identité",
          other: "Autre",
        },
        submit: "Envoyer le Message",
        whatsapp: "WhatsApp",
        footerAgreement: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité et nos conditions d'utilisation.",
      },
    },
    ai: {
      modalTitle: "Assistant IA Ors",
      modalDescription: "Discutez avec Ors, l'assistant IA de Orsyndic, pour en savoir plus sur nos services.",
      headerTitleDesktop: "Ors IA — Orsyndic",
      headerTitleMobile: "Ors IA",
      welcomeTitle: "Salut ! Je suis Ors 👋 Pose-moi une question sur Orsyndic",
      initialBotMessage: "Salut ! Je suis Ors, l'assistant IA de Orsyndic. Je peux vous parler de nos services, vous montrer notre portfolio ou vous aider à démarrer un projet. Que aimeriez-vous savoir ?",
      suggestedQuestions: [
        "Quels services proposez-vous ?",
        "Puis-je voir votre portfolio ?",
        "Comment démarrer un projet ?",
      ],
      inputPlaceholder: "Posez-moi n'importe quoi...",
      inputPlaceholderContinue: "Continuez la conversation...",
      disclaimer: "Ors peut faire des erreurs. Vérifiez les infos importantes.",
      errors: {
        failResponse: "Je n'ai pas reçu de réponse — veuillez réessayer.",
        failConnect: "Désolé, j'ai des difficultés à me connecter pour le moment. Veuillez réessayer plus tard.",
      },
      recording: {
        start: "Démarrer l'enregistrement",
        stop: "Arrêter l'enregistrement",
        notSupported: "La reconnaissance vocale n'est pas prise en charge par votre navigateur.",
      },
    },
  },
  es: {
    nav: {
      work: "Proyectos",
      functionalities: "Funcionalidades",
      pricing: "Precios",
      testimonials: "Testimonios",
      faq: "FAQ",
      getQuote: "Presupuesto",
    },
    hero: {
      badge: "Experiencia Digital Re-imaginada",
      title: {
        part1: "Donde los visionarios construyen",
        part2: "su presencia digital",
      },
      description: "Nos asociamos con personas y equipos ambiciosos para crear sitios web impresionantes, plataformas potentes y estrategias de crecimiento inteligentes.",
      startProject: "Inicia tu Proyecto",
      viewServices: "Ver Servicios",
      askAi: "Preguntar a Orsyndic AI",
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
        part2: " utiliza ",
        part3: "tecnologías de vanguardia",
        part4: " para crear experiencias digitales robustas y escalables.",
      },
    },
    features: {
      projects: {
        saas: {
          category: "Panel de SaaS",
          mobileCategory: "SaaS",
          description: "Solución analítica integral para plataformas SaaS modernas. Visualización de datos en tiempo real e interfaz fluida para el crecimiento empresarial.",
        },
        corporate: {
          category: "Empresa Corporativa",
          mobileCategory: "Corporativo",
          description: "Sitio web corporativo de alto rendimiento para establecer autoridad y confianza. Optimizado para la conversión y una identidad profesional.",
        },
        ecommerce: {
          category: "Tienda E-commerce",
          mobileCategory: "E-comm",
          description: "Experiencia de comercio electrónico completa centrada en el usuario. Pago ultra rápido y estética premium para elevar la experiencia de compra.",
        },
        association: {
          category: "Asociación Marroquí",
          mobileCategory: "ONG",
          description: "Plataforma digital para asociaciones marroquíes locales para coordinar el voluntariado. Diseño moderno con sutiles toques culturales.",
        },
        travel: {
          category: "Servicio de Viajes",
          mobileCategory: "Viajes",
          description: "Plataforma de reservas intuitiva para exploradores. Imágenes inmersivas de alta calidad para inspirar a viajeros de todo el mundo.",
        },
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
          description: "Perfecto para individuos y proyectos pequeños",
          cta: "Ordenar ahora",
          features: [
            "Diseño Web Responsivo",
            "Hasta 5 Páginas",
            "Configuración SEO Básica",
            "Integración de Formulario de Contacto",
            "Optimización Móvil",
            "1 Mes de Soporte",
            "Integración de Redes Sociales",
            "Configuración de Analítica Básica",
          ],
          limitations: ["Optimización SEO Avanzada", "Integración de E-commerce", "Aplicación Web Personalizada"],
        },
        professional: {
          name: "Profesional",
          description: "Para equipos y empresas en crecimiento",
          cta: "Ordenar ahora",
          features: [
            "Todo lo de Starter",
            "Hasta 15 Páginas",
            "Optimización SEO Avanzada",
            "Integración de E-commerce",
            "Animaciones Personalizadas",
            "3 Meses de Soporte",
            "Analítica Avanzada",
            "Optimización de Rendimiento",
          ],
          limitations: ["Aplicación Web Personalizada", "CMS Personalizado", "Desarrollo Prioritario"],
        },
        enterprise: {
          name: "Enterprise",
          price: "Personalizado",
          description: "Para operaciones a gran escala",
          cta: "Obtener presupuesto",
          features: [
            "Todo lo de Pro",
            "Páginas Ilimitadas",
            "Aplicación Web Personalizada",
            "Integraciones Avanzadas",
            "Soporte Premium",
            "6 Meses de Soporte",
            "CMS Personalizado",
            "Desarrollo Prioritario",
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
          role: "Director de Contabilidad",
          review: "Necesitábamos un sitio web que estuviera a la altura de nuestra ambición de marca; orsyndic superó todo lo que imaginábamos. Nuestra tasa de rebote cayó un 45 % y las consultas se triplicaron a las pocas semanas del lanzamiento.",
          timeAgo: "Hace 2 semanas",
        },
        sarah: {
          role: "Directora de Marketing, Bloom Studio",
          review: "Su instinto de diseño es increíble. Llegamos con un tablero de inspiración y salimos con un sitio ultrarrápido y con un diseño perfecto que nuestros competidores envidian. El ROI se amortizó en el primer mes.",
          timeAgo: "Hace 1 mes",
        },
        michael: {
          role: "Director de Operaciones",
          review: "Desde la llamada inicial hasta la puesta en marcha en menos de 3 semanas, y la calidad no sufrió ni un ápice. El sitio es ultrarrápido, está listo para SEO y nuestra tasa de conversión saltó un 40 % desde el primer día.",
          timeAgo: "Hace 3 semanas",
        },
        emily: {
          role: "Fundadora y CEO, Vellura",
          review: "Tras dos intentos fallidos con otras agencias, orsyndic finalmente lo logró. Escucharon, iteraron rápido y construyeron un sitio web que realmente suena como nosotros. La mejor decisión que tomamos en todo el año.",
          timeAgo: "Hace 1 mes",
        },
        david: {
          role: "CEO, ThompsonTech",
          review: "Nuestra antigua web era vergonzosa; ahora los clientes literalmente nos felicitan por ella durante las llamadas de ventas. orsyndic transformó nuestra presencia digital de un lastre a nuestro mayor activo.",
          timeAgo: "Hace 2 meses",
        },
        amara: {
          role: "Directora de Crecimiento, Kinetic",
          review: "No solo construyen sitios web, construyen máquinas de generación de ingresos. Nuestras nuevas páginas de destino convierten 3 veces mejor que antes. El equipo es brillante, atento y realmente se preocupa por los resultados.",
          timeAgo: "Hace 3 semanas",
        },
        james: {
          role: "Socio Director, Whitfield Legal",
          review: "Para un bufete de abogados, la confianza lo es todo, y nuestro nuevo sitio comunica exactamente eso. Limpio, profesional y enfocado en móviles. Hemos visto un aumento del 60 % en los envíos de formularios desde el lanzamiento.",
          timeAgo: "Hace 1 mes",
        },
        priya: {
          role: "Cofundadora, Solace Wellness",
          review: "Gestionamos una marca de bienestar y necesitábamos un sitio que se sintiera calmante pero premium. orsyndic clavó la estética en el primer borrador. Nuestras reservas en línea se han duplicado; no puedo recomendarlos lo suficiente.",
          timeAgo: "Hace 2 semanas",
        },
      },
    },
    transformation: {
      title: "Cómo hacemos realidad su visión.",
      subtitle: "Desde la idea inicial hasta el lanzamiento final: cuatro pasos claros para transformar su concepto en un producto digital de alto rendimiento.",
      steps: {
        step1: {
          title: "Descubrimiento & Brief",
          description: "Comenzamos entendiendo su visión y metas. A través de una investigación profunda, definimos el alcance del proyecto.",
        },
        step2: {
          title: "Diseño UI/UX",
          description: "Nuestros diseñadores crean prototipos interactivos, centrándose en experiencias de usuario intuitivas y estética moderna.",
        },
        step3: {
          title: "Desarrollo",
          description: "Construimos su proyecto utilizando tecnologías de vanguardia y código escalable, optimizado para el rendimiento.",
        },
        step4: {
          title: "Lanzamiento",
          description: "Tras pruebas exhaustivas, desplegamos su proyecto. Gestionamos el hosting, dominio y soporte post-lanzamiento.",
        },
      },
    },
    cta: {
      title: "¿Listo para transformar tu presencia digital?",
      subtitle: "Únete a las marcas innovadoras que confían en ORSYNDIC para construir y optimizar sus plataformas online.",
      primaryBtn: "Inicia tu Proyecto",
      secondaryBtn: "Programar Consultoría",
      features: {
        engaging: {
          title: "Experiencias Atractivas",
          description: "Creamos sitios web de alto rendimiento y diseño excepcional que cautivan a tu audiencia.",
        },
        secure: {
          title: "Seguro y Confiable",
          description: "Nuestro código sigue las mejores prácticas de seguridad, manteniendo tu web robusta y protegida.",
        },
        scale: {
          title: "Escalable",
          description: "Arquitecturas modernas que aseguran que tus plataformas crezcan junto con tu negocio.",
        },
      },
    },
    faq: {
      title1: "Preguntas",
      title2: "frecuentes",
      subtitle: "Todo lo que necesitas saber sobre nuestro proceso de desarrollo web y servicios.",
      questions: {
        q1: {
          q: "¿Qué servicios ofrece Orsdweb ?",
          a: "Nos especializamos en diseño web personalizado, desarrollo web robusto, diseño UI/UX, desarrollo de aplicaciones móviles, soluciones de comercio electrónico y optimización SEO integral para ayudar a que su negocio crezca en línea.",
        },
        q2: {
          q: "¿Cuánto tiempo se tarda en diseñar y desarrollar un sitio web a medida ?",
          a: "El tiempo varía según la complejidad del proyecto. Un proyecto de diseño web estándar suele tardar de 4 a 8 semanas, mientras que las aplicaciones web personalizadas o las soluciones de comercio electrónico pueden tardar más. Proporcionaremos un cronograma detallado durante nuestra consulta inicial.",
        },
        q3: {
          q: "¿Ofrecen soporte continuo después de que el sitio web esté activo ?",
          a: "Sí, absolutamente. Ofrecemos paquetes de mantenimiento y soporte continuos para garantizar que su plataforma digital se mantenga segura, actualizada y funcione de manera óptima mucho después del lanzamiento inicial.",
        },
        q4: {
          q: "¿Mi sitio web será compatible con dispositivos móviles y estará optimizado para motores de búsqueda ?",
          a: "Definitivamente. Todos nuestros sitios web se construyen con un enfoque móvil primero, lo que garantiza una capacidad de respuesta total en todos los dispositivos. También implementamos estructuras SEO de mejores prácticas desde el principio, para que su sitio esté listo para posicionarse bien en Google.",
        },
        q5: {
          q: "¿Pueden ayudar a rediseñar o mejorar un sitio web existente ?",
          a: "Sí, renovamos con frecuencia sitios web existentes. Ya sea que necesite una revisión completa de UI/UX, optimización del rendimiento o nuevas características integradas en su plataforma actual, nuestro equipo puede ayudarlo a elevar la identidad de su marca.",
        },
        q6: {
          q: "¿Qué plataformas y tecnologías utilizan para el desarrollo web ?",
          a: "Utilizamos pilas tecnológicas modernas y de alto rendimiento adaptadas a su proyecto. Esto incluye Next.js, React, Tailwind CSS y soluciones backend robustas. Para el comercio electrónico, trabajamos con arquitecturas personalizadas para asegurar un crecimiento escalable.",
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
        work: "Nuestro Trabajo",
        functionalities: "Funcionalidades",
        testimonials: "Testimonios",
        pricing: "Precios",
        faq: "FAQ",
        blog: "Blog",
        help: "Centro de Ayuda",
        privacy: "Política de Privacidad",
        terms: "Términos y Condiciones",
        cookie: "Política de Cookies",
      },
      soon: "Próximamente",
      rights: "Todos los derechos reservados.",
      status: "Todos los sistemas operativos",
    },
    getQuote: {
      metadata: {
        title: "Obtén un Presupuesto | Ors",
        description: "Contáctanos para iniciar tu proyecto. Nos encantaría saber de ti.",
      },
      badge: "Hablemos de tu Proyecto",
      heading: "¿Listo para transformar tu presencia digital?",
      subheading: "Completa el formulario y nuestro equipo se pondrá en contacto contigo en un plazo de 24 horas para discutir tu proyecto y cómo podemos ayudarte.",
      emailUs: "Envíanos un correo",
      form: {
        labels: {
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Correo Electrónico",
          phone: "Número de Teléfono (WhatsApp disponible)",
          company: "Nombre de la Empresa",
          service: "Servicio que te interesa",
          message: "Detalles del Proyecto",
        },
        placeholders: {
          firstName: "Juan",
          lastName: "Pérez",
          email: "juan@ejemplo.com",
          phone: "+34 912 34 56 78",
          company: "Acme Corp",
          service: "Selecciona un servicio",
          message: "Cuéntanos sobre tus objetivos, plazos y presupuesto...",
        },
        services: {
          webDev: "Desarrollo Web",
          uiux: "Diseño UI/UX",
          aiSolutions: "Soluciones de IA y Automatización",
          transformation: "Transformación Digital",
          marketing: "Marketing Digital",
          ecommerce: "Soluciones de Comercio Electrónico",
          branding: "Imagen de Marca e Identidad",
          other: "Otro",
        },
        submit: "Enviar Mensaje",
        whatsapp: "WhatsApp",
        footerAgreement: "Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.",
      },
    },
    ai: {
      modalTitle: "Asistente de IA de Ors",
      modalDescription: "Chatea con Ors, el asistente de IA de Orsyndic, para conocer nuestros servicios.",
      headerTitleDesktop: "Ors IA — Orsyndic",
      headerTitleMobile: "Ors IA",
      welcomeTitle: "¡Hola! Soy Ors 👋 Pregúntame sobre Orsyndic",
      initialBotMessage: "¡Hola! Soy Ors, el asistente de IA de Orsyndic. Puedo hablarte de nuestros servicios, mostrarte nuestro portafolio o ayudarte a iniciar un proyecto. ¿Qué te gustaría saber?",
      suggestedQuestions: [
        "¿Qué servicios ofrecen?",
        "¿Puedo ver su portafolio?",
        "¿Cómo puedo empezar un proyecto?",
      ],
      inputPlaceholder: "Pregúntame lo que quieras...",
      inputPlaceholderContinue: "Continúa la conversación...",
      disclaimer: "Ors puede cometer errores. Verifica la información importante.",
      errors: {
        failResponse: "No recibí respuesta, por favor inténtalo de nuevo.",
        failConnect: "Lo siento, tengo problemas para conectarme en este momento. Por favor, inténtalo más tarde.",
      },
      recording: {
        start: "Iniciar grabación",
        stop: "Detener grabación",
        notSupported: "El reconocimiento de voz no es compatible con tu navegador.",
      },
    },
  },
};
