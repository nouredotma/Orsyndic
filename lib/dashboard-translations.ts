export type DashboardLanguage = "en" | "fr" | "es"

export interface DashboardTranslations {
  sidebar: {
    dashboard: string
    users: string
    buildings: string
    charges: string
    helpdesk: string
    documents: string
    announcements: string
    myCharges: string
    myTickets: string
  }
  header: {
    profile: string
    logout: string
  }
  dashboard: {
    welcomeBack: string
    goodMorning: string
    goodAfternoon: string
    goodEvening: string
    admin: {
      totalBuildings: string
      totalApartments: string
      monthlyRevenue: string
      activeUsers: string
      unpaidCharges: string
      latestTickets: string
      announcements: string
      addBuilding: string
      registerBuilding: string
      buildingName: string
      address: string
      totalFloors: string
      revenueOverview: string
      revenueDescription: string
      announcementsBoard: string
      announcementsDescription: string
      unpaidChargesTitle: string
      chargesPending: string
      vsLastMonth: string
      openTicketsLabel: string
      day: string
      month: string
      year: string
      allTime: string
    }
    owner: {
      outstanding: string
      totalPaid: string
      apartment: string
      reportIncident: string
      subject: string
      description: string
      submitTicket: string
      incidentDescription: string
    }
    tenant: {
      submitComplaint: string
      subject: string
      details: string
      submitTicket: string
      complaintDescription: string
    }
  }
  users: {
    addUser: string
    createUser: string
    fullName: string
    role: string
    building: string
    apartment: string
    username: string
    phone: string
    password: string
    editUser: string
    saveChanges: string
    deactivate: string
    activate: string
    activeUsers: string
    owners: string
    tenants: string
    search: string
    status: string
    selectRole: string
    selectBuilding: string
    userHeader: string
    usernamePhoneHeader: string
    deleteUser: string
    confirmDeactivate: string
    confirmActivate: string
    confirmDelete: string
  }
  buildings: {
    addBuilding: string
    registerBuilding: string
    addApartment: string
    buildingName: string
    address: string
    totalFloors: string
    apartmentNumber: string
    floor: string
    tantiemes: string
    owner: string
    tenant: string
    paymentHistory: string
    occupants: string
    apts: string
    floorsRegistered: string
    noTenant: string
    selectBuildingToView: string
    viewAll: string
    noHistoryFound: string
    addApartmentTo: string
    selectOwner: string
    selectBuilding: string
    floorValidationError: string
    residentDetails: string
    editBuilding: string
    deleteBuilding: string
    confirmDeleteBuilding: string
    editApartment: string
    deleteApartment: string
    confirmDeleteApartment: string
  }
  charges: {
    total: string
    paid: string
    unpaid: string
    generateCharges: string
    calculateCharges: string
    rate: string
    perTantieme: string
    emailNotifications: string
    sendAutomatedEmail: string
    validate: string
    markPaid: string
    search: string
    all: string
    partial: string
    amount: string
    status: string
    actions: string
    owner: string
    apt: string
    period: string
    validated: string
  }
  helpdesk: {
    open: string
    inProgress: string
    resolved: string
    start: string
    resolve: string
    search: string
    by: string
  }
  documents: {
    upload: string
    download: string
    documentName: string
    category: string
    file: string
    uploadDocument: string
    assemblyMinutes: string
    regulations: string
    financialReports: string
    contracts: string
    other: string
    dragDrop: string
    shareFile: string
    selectCategory: string
    filesCount: string
    editDocument: string
    deleteDocument: string
    confirmDelete: string
  }
  announcements: {
    newAnnouncement: string
    title: string
    content: string
    urgent: string
    urgentDescription: string
    postAnnouncement: string
    editAnnouncement: string
    deleteAnnouncement: string
    confirmDelete: string
    audience: string
    selectAudience: string
  }
  myCharges: {
    outstanding: string
    totalCharges: string
    chargeHistory: string
    downloadPDF: string
  }
  myTickets: {
    newTicket: string
    submit: string
    attachPhoto: string
    cancel: string
    noTickets: string
    reportIssue: string
  }
  profile: {
    accountInfo: string
    changePassword: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
    updatePassword: string
    passwordRequired: string
    currentPasswordIncorrect: string
    passwordTooShort: string
    passwordsDoNotMatch: string
    passwordUpdated: string
    securityDescription: string
  }
  login: {
    welcome: string
    subtitle: string
    forgotPassword: string
    login: string
    loggingIn: string
    goBack: string
    managementReimagined: string
    allInOnePlatform: string
    byNoureddine: string
    demoCredentials: string
    noAccount: string
    register: string
    resetPassword: string
    resetSubtitle: string
    sendResetLink: string
    resetLinkSent: string
    resetLinkSentSubtitle: string
  }
  register: {
    title: string
    subtitle: string
    register: string
    registering: string
    haveAccount: string
    login: string
  }
  common: {
    all: string
    search: string
    cancel: string
    save: string
    delete: string
    edit: string
    close: string
    confirm: string
    loading: string
    noResults: string
    back: string
    added: string
    addPhoto: string
    unpaidCharges: string
    thisYear: string
    recentUpdates: string
    buildingNotices: string
    info: string
    owner: string
    tenant: string
    paidOn: string
    floorsAptsRegistered: string
    postedOn: string
    by: string
    paymentReceipt: string
    receiptId: string
    date: string
    period: string
    validated: string
    thankYou: string
    propertyManagement: string
    submitted: string
  }
  status: {
    open: string
    inProgress: string
    resolved: string
    paid: string
    unpaid: string
    partial: string
    urgent: string
    active: string
    inactive: string
  }
}

export const dashboardTranslations: Record<DashboardLanguage, DashboardTranslations> = {
  en: {
    sidebar: {
      dashboard: "Dashboard",
      users: "Users",
      buildings: "Buildings",
      charges: "Charges",
      helpdesk: "Helpdesk",
      documents: "Documents",
      announcements: "Announcements",
      myCharges: "My Charges",
      myTickets: "My Tickets",
    },
    header: {
      profile: "Profile",
      logout: "Log out",
    },
    dashboard: {
      welcomeBack: "Welcome back",
      goodMorning: "Good morning",
      goodAfternoon: "Good afternoon",
      goodEvening: "Good evening",
      admin: {
        totalBuildings: "Total Buildings",
        totalApartments: "Total Apartments",
        monthlyRevenue: "Monthly Revenue",
        activeUsers: "Active Users",
        unpaidCharges: "Unpaid Charges",
        latestTickets: "Latest Tickets",
        announcements: "Announcements",
        addBuilding: "Add Building",
        registerBuilding: "Register Building",
        buildingName: "Building Name",
        address: "Address",
        totalFloors: "Total Floors",
        revenueOverview: "Revenue Overview",
        revenueDescription: "Revenue statistics for the selected period",
        announcementsBoard: "Announcements Board",
        announcementsDescription: "Recent notices posted to all residents",
        unpaidChargesTitle: "Unpaid Charges",
        chargesPending: "charges pending payment",
        vsLastMonth: "vs last month",
        openTicketsLabel: "open tickets",
        day: "Day",
        month: "Month",
        year: "Year",
        allTime: "All Time",
      },
      owner: {
        outstanding: "Outstanding",
        totalPaid: "Total Paid",
        apartment: "Apartment",
        reportIncident: "Report Incident",
        subject: "Subject",
        description: "Description",
        submitTicket: "Submit Ticket",
        incidentDescription: "Describe the issue you're facing and we'll look into it.",
      },
      tenant: {
        submitComplaint: "Submit Complaint",
        subject: "Subject",
        details: "Details",
        submitTicket: "Submit Ticket",
        complaintDescription: "We're here to help you with any issues in your apartment.",
      },
    },
    users: {
      addUser: "Add User",
      createUser: "Create User",
      fullName: "Full Name",
      role: "Role",
      building: "Building",
      apartment: "Apartment Number",
      username: "Username",
      phone: "Phone Number",
      password: "Password",
      editUser: "Edit User",
      saveChanges: "Save Changes",
      deactivate: "Deactivate",
      activate: "Activate",
      activeUsers: "Active Users",
      owners: "Owners",
      tenants: "Tenants",
      search: "Search by name, username or phone...",
      status: "Status",
      selectRole: "Select role",
      selectBuilding: "Select building",
      userHeader: "User",
      usernamePhoneHeader: "Username / Phone",
      deleteUser: "Delete User",
      confirmDeactivate: "Are you sure you want to deactivate this user?",
      confirmActivate: "Are you sure you want to activate this user?",
      confirmDelete: "Are you sure you want to permanently delete this user? This action cannot be undone.",
    },
    buildings: {
      addBuilding: "Add Building",
      registerBuilding: "Register Building",
      addApartment: "Add Apartment",
      buildingName: "Building Name",
      address: "Address",
      totalFloors: "Total Floors",
      apartmentNumber: "Apartment Number",
      floor: "Floor",
      tantiemes: "Tantièmes (m²)",
      owner: "Owner",
      tenant: "Tenant",
      paymentHistory: "Payment History",
      occupants: "Occupants",
      apts: "Apts",
      floorsRegistered: "floors · apartments registered",
      noTenant: "No tenant",
      selectBuildingToView: "Select a building to view apartments",
      viewAll: "View All",
      noHistoryFound: "No payment history found.",
      addApartmentTo: "Add a new apartment to",
      selectOwner: "Select owner",
      selectBuilding: "Select building",
      floorValidationError: "Floor cannot exceed the building's total floors",
      residentDetails: "Resident Details",
      editBuilding: "Edit Building",
      deleteBuilding: "Delete Building",
      confirmDeleteBuilding: "Are you sure you want to delete this building? All associated apartments and data will be removed.",
      editApartment: "Edit Apartment",
      deleteApartment: "Delete Apartment",
      confirmDeleteApartment: "Are you sure you want to delete this apartment?",
    },
    charges: {
      total: "Total",
      paid: "Paid",
      unpaid: "Unpaid",
      generateCharges: "Generate Charges",
      calculateCharges: "Automatically calculate charges based on apartment tantièmes (m²).",
      rate: "Rate (MAD)",
      perTantieme: "per tantième",
      emailNotifications: "Email Notifications",
      sendAutomatedEmail: "Send an automated email to owners.",
      validate: "Validate",
      markPaid: "Mark Paid",
      search: "Search by owner or apartment...",
      all: "All",
      partial: "Partial",
      amount: "Amount",
      status: "Status",
      actions: "Actions",
      owner: "Owner",
      apt: "Apt",
      period: "Period",
      validated: "Validated",
    },
    helpdesk: {
      open: "Open",
      inProgress: "In Progress",
      resolved: "Resolved",
      start: "Start",
      resolve: "Resolve",
      search: "Search...",
      by: "By",
    },
    documents: {
      upload: "Upload File",
      download: "Download",
      documentName: "Document Name",
      category: "Category",
      file: "File",
      uploadDocument: "Upload Document",
      assemblyMinutes: "Assembly Minutes",
      regulations: "Regulations",
      financialReports: "Financial Reports",
      contracts: "Contracts",
      other: "Other",
      dragDrop: "Click to browse or drag and drop",
      shareFile: "Share a file with the building residents.",
      selectCategory: "Select category",
      filesCount: "files",
      editDocument: "Edit Document",
      deleteDocument: "Delete Document",
      confirmDelete: "Are you sure you want to delete this document?",
    },
    announcements: {
      newAnnouncement: "New Announcement",
      title: "Title",
      content: "Content",
      urgent: "Mark as Urgent",
      urgentDescription: "This will highlight the announcement in red.",
      postAnnouncement: "Post Announcement",
      editAnnouncement: "Edit Announcement",
      deleteAnnouncement: "Delete Announcement",
      confirmDelete: "Are you sure you want to delete this announcement?",
      audience: "Audience",
      selectAudience: "Select who can see this",
    },
    myCharges: {
      outstanding: "Outstanding",
      totalCharges: "Total Charges",
      chargeHistory: "Charge History",
      downloadPDF: "PDF",
    },
    myTickets: {
      newTicket: "New Ticket",
      submit: "Submit",
      attachPhoto: "Attach Photo",
      cancel: "Cancel",
      noTickets: "No tickets submitted yet.",
      reportIssue: "Click \"New Ticket\" to report an issue.",
    },
    profile: {
      accountInfo: "Account Information",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      updatePassword: "Update Password",
      passwordRequired: "All password fields are required.",
      currentPasswordIncorrect: "Current password is incorrect.",
      passwordTooShort: "New password must be at least 6 characters.",
      passwordsDoNotMatch: "New passwords do not match.",
      passwordUpdated: "Password updated successfully!",
      securityDescription: "Update your password to keep your account secure",
    },
    login: {
      welcome: "Welcome to Orsyndic 👋",
      subtitle: "Log in to your account to continue",
      forgotPassword: "Forgot password?",
      login: "Login",
      loggingIn: "Logging in...",
      goBack: "Go back",
      managementReimagined: "Management, Reimagined.",
      allInOnePlatform: "The all-in-one platform for modern property syndics.",
      byNoureddine: "by Noureddine",
      demoCredentials: "Demo Credentials",
      noAccount: "Don't have an account?",
      register: "Register",
      resetPassword: "Reset your password",
      resetSubtitle: "Enter your email and we'll send you a reset link.",
      sendResetLink: "Send reset link",
      resetLinkSent: "Reset link sent!",
      resetLinkSentSubtitle: "Check your inbox for the password reset link.",
    },
    register: {
      title: "Create your account",
      subtitle: "Register as an admin to start managing your buildings",
      register: "Register",
      registering: "Registering...",
      haveAccount: "Already have an account?",
      login: "Login",
    },
    common: {
      all: "All",
      search: "Search",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      confirm: "Confirm",
      loading: "Loading...",
      noResults: "No results found",
      back: "Back",
      added: "Added!",
      addPhoto: "Add Photo",
      unpaidCharges: "Unpaid charges",
      thisYear: "This year",
      recentUpdates: "Recent updates for residents",
      buildingNotices: "Building notices and updates",
      info: "Info",
      owner: "Owner",
      tenant: "Tenant",
      paidOn: "Paid on",
      floorsAptsRegistered: "floors · apartments registered",
      postedOn: "Posted on",
      by: "by",
      paymentReceipt: "PAYMENT RECEIPT",
      receiptId: "Receipt ID",
      date: "Date",
      period: "Period",
      validated: "Validated",
      thankYou: "Thank you for your payment.",
      propertyManagement: "Orsyndic Property Management",
      submitted: "Submitted!",
    },
    status: {
      open: "Open",
      inProgress: "In Progress",
      resolved: "Resolved",
      paid: "Paid",
      unpaid: "Unpaid",
      partial: "Partial",
      urgent: "Urgent",
      active: "Active",
      inactive: "Inactive",
    },
  },
  fr: {
    sidebar: {
      dashboard: "Tableau de bord",
      users: "Utilisateurs",
      buildings: "Immeubles",
      charges: "Charges",
      helpdesk: "Support",
      documents: "Documents",
      announcements: "Annonces",
      myCharges: "Mes Charges",
      myTickets: "Mes Tickets",
    },
    header: {
      profile: "Profil",
      logout: "Déconnexion",
    },
    dashboard: {
      welcomeBack: "Bon retour",
      goodMorning: "Bon matin",
      goodAfternoon: "Bon après-midi",
      goodEvening: "Bonsoir",
      admin: {
        totalBuildings: "Immeubles",
        totalApartments: "Appartements",
        monthlyRevenue: "Revenus Mensuels",
        activeUsers: "Utilisateurs Actifs",
        unpaidCharges: "Charges Impayées",
        latestTickets: "Derniers Tickets",
        announcements: "Annonces",
        addBuilding: "Ajouter un Immeuble",
        registerBuilding: "Enregistrer l'Immeuble",
        buildingName: "Nom de l'Immeuble",
        address: "Adresse",
        totalFloors: "Nombre d'Étages",
        revenueOverview: "Aperçu des Revenus",
        revenueDescription: "Statistiques des revenus pour la période sélectionnée",
        announcementsBoard: "Tableau d'Annonces",
        announcementsDescription: "Avis récents affichés pour tous les résidents",
        unpaidChargesTitle: "Charges Impayées",
        chargesPending: "charges en attente de paiement",
        vsLastMonth: "par rapport au mois dernier",
        openTicketsLabel: "tickets ouverts",
        day: "Jour",
        month: "Mois",
        year: "Année",
        allTime: "Tout",
      },
      owner: {
        outstanding: "Impayé",
        totalPaid: "Total Payé",
        apartment: "Appartement",
        reportIncident: "Signaler un Incident",
        subject: "Sujet",
        description: "Description",
        submitTicket: "Soumettre le Ticket",
        incidentDescription: "Décrivez le problème que vous rencontrez et nous l'examinerons.",
      },
      tenant: {
        submitComplaint: "Soumettre une Plainte",
        subject: "Sujet",
        details: "Détails",
        submitTicket: "Soumettre le Ticket",
        complaintDescription: "Nous sommes là pour vous aider avec tout problème dans votre appartement.",
      },
    },
    users: {
      addUser: "Ajouter un Utilisateur",
      createUser: "Créer l'Utilisateur",
      fullName: "Nom Complet",
      role: "Rôle",
      building: "Immeuble",
      apartment: "Numéro d'Appartement",
      username: "Nom d'Utilisateur",
      phone: "Numéro de Téléphone",
      password: "Mot de Passe",
      editUser: "Modifier l'Utilisateur",
      saveChanges: "Enregistrer",
      deactivate: "Désactiver",
      activate: "Activer",
      activeUsers: "Utilisateurs Actifs",
      owners: "Propriétaires",
      tenants: "Locataires",
      search: "Rechercher par nom, identifiant ou téléphone...",
      status: "Statut",
      selectRole: "Sélectionner le rôle",
      selectBuilding: "Sélectionner l'immeuble",
      userHeader: "Utilisateur",
      usernamePhoneHeader: "Identifiant / Tél",
      deleteUser: "Supprimer l'Utilisateur",
      confirmDeactivate: "Êtes-vous sûr de vouloir désactiver cet utilisateur ?",
      confirmActivate: "Êtes-vous sûr de vouloir activer cet utilisateur ?",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer définitivement cet utilisateur ? Cette action est irréversible.",
    },
    buildings: {
      addBuilding: "Ajouter un Immeuble",
      registerBuilding: "Enregistrer l'Immeuble",
      addApartment: "Ajouter un Appartement",
      buildingName: "Nom de l'Immeuble",
      address: "Adresse",
      totalFloors: "Nombre d'Étages",
      apartmentNumber: "Numéro d'Appartement",
      floor: "Étage",
      tantiemes: "Tantièmes (m²)",
      owner: "Propriétaire",
      tenant: "Locataire",
      paymentHistory: "Historique des Paiements",
      occupants: "Occupants",
      apts: "Appts",
      floorsRegistered: "étages · appartements enregistrés",
      noTenant: "Pas de locataire",
      selectBuildingToView: "Sélectionnez un immeuble pour voir les appartements",
      viewAll: "Voir Tout",
      noHistoryFound: "Aucun historique de paiement trouvé.",
      addApartmentTo: "Ajouter un nouvel appartement à",
      selectOwner: "Sélectionner le propriétaire",
      selectBuilding: "Sélectionner l'immeuble",
      floorValidationError: "L'étage ne peut pas dépasser le nombre total d'étages de l'immeuble",
      residentDetails: "Détails du Résident",
      editBuilding: "Modifier l'Immeuble",
      deleteBuilding: "Supprimer l'Immeuble",
      confirmDeleteBuilding: "Êtes-vous sûr de vouloir supprimer cet immeuble ? Tous les appartements et données associés seront supprimés.",
      editApartment: "Modifier l'Appartement",
      deleteApartment: "Supprimer l'Appartement",
      confirmDeleteApartment: "Êtes-vous sûr de vouloir supprimer cet appartement ?",
    },
    charges: {
      total: "Total",
      paid: "Payé",
      unpaid: "Impayé",
      generateCharges: "Générer les Charges",
      calculateCharges: "Calculer automatiquement les charges basées sur les tantièmes (m²) de l'appartement.",
      rate: "Taux (MAD)",
      perTantieme: "par tantième",
      emailNotifications: "Notifications par Email",
      sendAutomatedEmail: "Envoyer un e-mail automatique aux propriétaires.",
      validate: "Valider",
      markPaid: "Marquer Payé",
      search: "Rechercher par propriétaire ou appartement...",
      all: "Tous",
      partial: "Partiel",
      amount: "Montant",
      status: "Statut",
      actions: "Actions",
      owner: "Propriétaire",
      apt: "Appt",
      period: "Période",
      validated: "Validé",
    },
    helpdesk: {
      open: "Ouvert",
      inProgress: "En Cours",
      resolved: "Résolu",
      start: "Démarrer",
      resolve: "Résoudre",
      search: "Rechercher...",
      by: "Par",
    },
    documents: {
      upload: "Importer un Fichier",
      download: "Télécharger",
      documentName: "Nom du Document",
      category: "Catégorie",
      file: "Fichier",
      uploadDocument: "Importer le Document",
      assemblyMinutes: "Procès-Verbaux d'AG",
      regulations: "Règlements",
      financialReports: "Rapports Financiers",
      contracts: "Contrats",
      other: "Autre",
      dragDrop: "Cliquez pour parcourir ou glissez-déposez",
      shareFile: "Partagez un fichier avec les résidents de l'immeuble.",
      selectCategory: "Sélectionner la catégorie",
      filesCount: "fichiers",
      editDocument: "Modifier le Document",
      deleteDocument: "Supprimer le Document",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer ce document ?",
    },
    announcements: {
      newAnnouncement: "Nouvelle Annonce",
      title: "Titre",
      content: "Contenu",
      urgent: "Marquer comme Urgent",
      urgentDescription: "Cela mettra l'annonce en évidence en rouge.",
      postAnnouncement: "Publier l'Annonce",
      editAnnouncement: "Modifier l'Annonce",
      deleteAnnouncement: "Supprimer l'Annonce",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer cette annonce ?",
      audience: "Audience",
      selectAudience: "Sélectionner qui peut voir ceci",
    },
    myCharges: {
      outstanding: "Impayé",
      totalCharges: "Total des Charges",
      chargeHistory: "Historique des Charges",
      downloadPDF: "PDF",
    },
    myTickets: {
      newTicket: "Nouveau Ticket",
      submit: "Soumettre",
      attachPhoto: "Joindre une Photo",
      cancel: "Annuler",
      noTickets: "Aucun ticket soumis pour le moment.",
      reportIssue: "Cliquez sur \"Nouveau Ticket\" pour signaler un problème.",
    },
    profile: {
      accountInfo: "Informations du Compte",
      changePassword: "Changer le Mot de Passe",
      currentPassword: "Mot de Passe Actuel",
      newPassword: "Nouveau Mot de Passe",
      confirmPassword: "Confirmer le Nouveau Mot de Passe",
      updatePassword: "Mettre à Jour le Mot de Passe",
      passwordRequired: "Tous les champs de mot de passe sont requis.",
      currentPasswordIncorrect: "Le mot de passe actuel est incorrect.",
      passwordTooShort: "Le nouveau mot de passe doit comporter au moins 6 caractères.",
      passwordsDoNotMatch: "Les nouveaux mots de passe ne correspondent pas.",
      passwordUpdated: "Mot de passe mis à jour avec succès !",
      securityDescription: "Mettez à jour votre mot de passe pour sécuriser votre compte",
    },
    login: {
      welcome: "Bienvenue sur Orsyndic 👋",
      subtitle: "Connectez-vous à votre compte pour continuer",
      forgotPassword: "Mot de passe oublié ?",
      login: "Connexion",
      loggingIn: "Connexion en cours...",
      goBack: "Retour",
      managementReimagined: "La Gestion, Réimaginée.",
      allInOnePlatform: "La plateforme tout-en-un pour les syndics de copropriété modernes.",
      byNoureddine: "par Noureddine",
      demoCredentials: "Identifiants de Démo",
      noAccount: "Vous n'avez pas de compte ?",
      register: "S'inscrire",
      resetPassword: "Réinitialisez votre mot de passe",
      resetSubtitle: "Entrez votre email et nous vous enverrons un lien de réinitialisation.",
      sendResetLink: "Envoyer le lien",
      resetLinkSent: "Lien envoyé !",
      resetLinkSentSubtitle: "Vérifiez votre boîte de réception pour le lien de réinitialisation.",
    },
    register: {
      title: "Créez votre compte",
      subtitle: "Inscrivez-vous en tant qu'administrateur pour commencer à gérer vos immeubles",
      register: "S'inscrire",
      registering: "Inscription en cours...",
      haveAccount: "Vous avez déjà un compte ?",
      login: "Connexion",
    },
    common: {
      all: "Tous",
      search: "Rechercher",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",
      edit: "Modifier",
      close: "Fermer",
      confirm: "Confirmer",
      loading: "Chargement...",
      noResults: "Aucun résultat trouvé",
      back: "Retour",
      added: "Ajouté !",
      addPhoto: "Ajouter une Photo",
      unpaidCharges: "Charges impayées",
      thisYear: "Cette année",
      recentUpdates: "Mises à jour récentes pour les résidents",
      buildingNotices: "Avis et mises à jour de l'immeuble",
      info: "Infos",
      owner: "Propriétaire",
      tenant: "Locataire",
      paidOn: "Payé le",
      floorsAptsRegistered: "étages · appartements enregistrés",
      postedOn: "Publié le",
      by: "par",
      paymentReceipt: "REÇU DE PAIEMENT",
      receiptId: "ID du Reçu",
      date: "Date",
      period: "Période",
      validated: "Validé",
      thankYou: "Merci pour votre paiement.",
      propertyManagement: "Gestion Immobilière Orsyndic",
      submitted: "Envoyé !",
    },
    status: {
      open: "Ouvert",
      inProgress: "En cours",
      resolved: "Résolu",
      paid: "Payé",
      unpaid: "Impayé",
      partial: "Partiel",
      urgent: "Urgent",
      active: "Actif",
      inactive: "Inactif",
    },
  },
  es: {
    sidebar: {
      dashboard: "Panel",
      users: "Usuarios",
      buildings: "Edificios",
      charges: "Cargos",
      helpdesk: "Soporte",
      documents: "Documentos",
      announcements: "Anuncios",
      myCharges: "Mis Cargos",
      myTickets: "Mis Tickets",
    },
    header: {
      profile: "Perfil",
      logout: "Cerrar Sesión",
    },
    dashboard: {
      welcomeBack: "Bienvenido de nuevo",
      goodMorning: "Buenos días",
      goodAfternoon: "Buenas tardes",
      goodEvening: "Buenas noches",
      admin: {
        totalBuildings: "Edificios Totales",
        totalApartments: "Apartamentos Totales",
        monthlyRevenue: "Ingresos Mensuales",
        activeUsers: "Usuarios Activos",
        unpaidCharges: "Cargos Impagos",
        latestTickets: "Últimos Tickets",
        announcements: "Anuncios",
        addBuilding: "Agregar Edificio",
        registerBuilding: "Registrar Edificio",
        buildingName: "Nombre del Edificio",
        address: "Dirección",
        totalFloors: "Número de Pisos",
        revenueOverview: "Resumen de Ingresos",
        revenueDescription: "Estadísticas de ingresos para el período seleccionado",
        announcementsBoard: "Tablón de Anuncios",
        announcementsDescription: "Avisos recientes publicados para todos los residentes",
        unpaidChargesTitle: "Cargos Impagos",
        chargesPending: "cargos pendientes de pago",
        vsLastMonth: "vs mes anterior",
        openTicketsLabel: "tickets abiertos",
        day: "Día",
        month: "Mes",
        year: "Año",
        allTime: "Todo",
      },
      owner: {
        outstanding: "Pendiente",
        totalPaid: "Total Pagado",
        apartment: "Apartamento",
        reportIncident: "Reportar Incidente",
        subject: "Asunto",
        description: "Descripción",
        submitTicket: "Enviar Ticket",
        incidentDescription: "Describe el problema que estás enfrentando y lo revisaremos.",
      },
      tenant: {
        submitComplaint: "Enviar Queja",
        subject: "Asunto",
        details: "Detalles",
        submitTicket: "Enviar Ticket",
        complaintDescription: "Estamos aquí para ayudarte con cualquier problema en tu apartamento.",
      },
    },
    users: {
      addUser: "Agregar Usuario",
      createUser: "Crear Usuario",
      fullName: "Nombre Completo",
      role: "Rol",
      building: "Edificio",
      apartment: "Número de Apartamento",
      username: "Nombre de Usuario",
      phone: "Número de Teléfono",
      password: "Contraseña",
      editUser: "Editar Usuario",
      saveChanges: "Guardar Cambios",
      deactivate: "Desactivar",
      activate: "Activar",
      activeUsers: "Usuarios Activos",
      owners: "Propietarios",
      tenants: "Inquilinos",
      search: "Buscar por nombre, usuario o teléfono...",
      status: "Estado",
      selectRole: "Seleccionar rol",
      selectBuilding: "Seleccionar edificio",
      userHeader: "Usuario",
      usernamePhoneHeader: "Usuario / Tel",
      deleteUser: "Eliminar Usuario",
      confirmDeactivate: "¿Está seguro de que desea desactivar a este usuario?",
      confirmActivate: "¿Está seguro de que desea activar a este usuario?",
      confirmDelete: "¿Está seguro de que desea eliminar permanentemente a este usuario? Esta acción no se puede deshacer.",
    },
    buildings: {
      addBuilding: "Agregar Edificio",
      registerBuilding: "Registrar Edificio",
      addApartment: "Agregar Apartamento",
      buildingName: "Nombre del Edificio",
      address: "Dirección",
      totalFloors: "Número de Pisos",
      apartmentNumber: "Número de Apartamento",
      floor: "Piso",
      tantiemes: "Tantièmes (m²)",
      owner: "Propietario",
      tenant: "Inquilino",
      paymentHistory: "Historial de Pagos",
      occupants: "Ocupantes",
      apts: "Aptos",
      floorsRegistered: "pisos · apartamentos registrados",
      noTenant: "Sin inquilino",
      selectBuildingToView: "Seleccione un edificio para ver los apartamentos",
      viewAll: "Ver Todo",
      noHistoryFound: "No se encontró historial de pagos.",
      addApartmentTo: "Agregar un nuevo apartamento a",
      selectOwner: "Seleccionar propietario",
      selectBuilding: "Seleccionar edificio",
      floorValidationError: "El piso no puede exceder el total de pisos del edificio",
      residentDetails: "Detalles del Residente",
      editBuilding: "Editar Edificio",
      deleteBuilding: "Eliminar Edificio",
      confirmDeleteBuilding: "¿Está seguro de que desea eliminar este edificio? Todos los apartamentos y datos asociados serán eliminados.",
      editApartment: "Editar Apartamento",
      deleteApartment: "Eliminar Apartamento",
      confirmDeleteApartment: "¿Está seguro de que desea eliminar este apartamento?",
    },
    charges: {
      total: "Total",
      paid: "Pagado",
      unpaid: "Impago",
      generateCharges: "Generar Cargos",
      calculateCharges: "Calcule automáticamente los cargos basados en los tantièmes (m²) del apartamento.",
      rate: "Tasa (MAD)",
      perTantieme: "por tantième",
      emailNotifications: "Notificaciones por Email",
      sendAutomatedEmail: "Enviar un correo electrónico automático a los propietarios.",
      validate: "Validar",
      markPaid: "Marcar Pagado",
      search: "Buscar por propietario o apartamento...",
      all: "Todos",
      partial: "Parcial",
      amount: "Monto",
      status: "Estado",
      actions: "Acciones",
      owner: "Propietario",
      apt: "Apt",
      period: "Período",
      validated: "Validado",
    },
    helpdesk: {
      open: "Abierto",
      inProgress: "En Progreso",
      resolved: "Resuelto",
      start: "Iniciar",
      resolve: "Resolver",
      search: "Buscar...",
      by: "Por",
    },
    documents: {
      upload: "Subir Archivo",
      download: "Descargar",
      documentName: "Nombre del Documento",
      category: "Categoría",
      file: "Archivo",
      uploadDocument: "Subir Documento",
      assemblyMinutes: "Actas de Asamblea",
      regulations: "Reglamentos",
      financialReports: "Informes Financieros",
      contracts: "Contratos",
      other: "Otro",
      dragDrop: "Haga clic para explorar o arrastre y suelte",
      shareFile: "Comparte un archivo con los residentes del edificio.",
      selectCategory: "Seleccionar categoría",
      filesCount: "archivos",
      editDocument: "Editar Documento",
      deleteDocument: "Eliminar Documento",
      confirmDelete: "¿Está seguro de que desea eliminar este documento?",
    },
    announcements: {
      newAnnouncement: "Nuevo Anuncio",
      title: "Título",
      content: "Contenido",
      urgent: "Marcar como Urgente",
      urgentDescription: "Esto resaltará el anuncio en rojo.",
      postAnnouncement: "Publicar Anuncio",
      editAnnouncement: "Editar Anuncio",
      deleteAnnouncement: "Eliminar Anuncio",
      confirmDelete: "¿Está seguro de que desea eliminar este anuncio?",
      audience: "Audiencia",
      selectAudience: "Seleccionar quién puede ver esto",
    },
    myCharges: {
      outstanding: "Pendiente",
      totalCharges: "Total de Cargos",
      chargeHistory: "Historial de Cargos",
      downloadPDF: "PDF",
    },
    myTickets: {
      newTicket: "Nuevo Ticket",
      submit: "Enviar",
      attachPhoto: "Adjuntar Foto",
      cancel: "Cancelar",
      noTickets: "No se han enviado tickets aún.",
      reportIssue: "Haga clic en \"Nuevo Ticket\" para reportar un problema.",
    },
    profile: {
      accountInfo: "Información de la Cuenta",
      changePassword: "Cambiar Contraseña",
      currentPassword: "Contraseña Actual",
      newPassword: "Nueva Contraseña",
      confirmPassword: "Confirmar Nueva Contraseña",
      updatePassword: "Actualizar Contraseña",
      passwordRequired: "Todos los campos de contraseña son obligatorios.",
      currentPasswordIncorrect: "La contraseña actual es incorrecta.",
      passwordTooShort: "La nueva contraseña debe tener al menos 6 caracteres.",
      passwordsDoNotMatch: "Las nuevas contraseñas no coinciden.",
      passwordUpdated: "¡Contraseña actualizada con éxito!",
      securityDescription: "Actualice su contraseña para mantener su cuenta segura",
    },
    login: {
      welcome: "Bienvenido a Orsyndic 👋",
      subtitle: "Inicie sesión en su cuenta para continuar",
      forgotPassword: "¿Olvidó su contraseña?",
      login: "Iniciar Sesión",
      loggingIn: "Iniciando sesión...",
      goBack: "Volver",
      managementReimagined: "Gestión, Reimaginada.",
      allInOnePlatform: "La plataforma todo en uno para los síndicos de propiedad modernos.",
      byNoureddine: "por Noureddine",
      demoCredentials: "Credenciales de Demostración",
      noAccount: "¿No tiene una cuenta?",
      register: "Registrarse",
      resetPassword: "Restablecer su contraseña",
      resetSubtitle: "Ingrese su correo electrónico y le enviaremos un enlace de restablecimiento.",
      sendResetLink: "Enviar enlace",
      resetLinkSent: "¡Enlace enviado!",
      resetLinkSentSubtitle: "Revise su bandeja de entrada para el enlace de restablecimiento.",
    },
    register: {
      title: "Cree su cuenta",
      subtitle: "Regístrese como administrador para comenzar a gestionar sus edificios",
      register: "Registrarse",
      registering: "Registrando...",
      haveAccount: "¿Ya tiene una cuenta?",
      login: "Iniciar Sesión",
    },
    common: {
      all: "Todos",
      search: "Buscar",
      cancel: "Cancelar",
      save: "Guardar",
      delete: "Eliminar",
      edit: "Editar",
      close: "Cerrar",
      confirm: "Confirmar",
      loading: "Cargando...",
      noResults: "No se encontraron resultados",
      back: "Volver",
      added: "¡Agregado!",
      addPhoto: "Agregar Foto",
      unpaidCharges: "Cargos impagos",
      thisYear: "Este año",
      recentUpdates: "Actualizaciones recientes para residentes",
      buildingNotices: "Avisos y actualizaciones del edificio",
      info: "Información",
      owner: "Propietario",
      tenant: "Inquilino",
      paidOn: "Pagado el",
      floorsAptsRegistered: "pisos · apartamentos registrados",
      postedOn: "Publicado el",
      by: "por",
      paymentReceipt: "RECIBO DE PAGO",
      receiptId: "ID del Recibo",
      date: "Fecha",
      period: "Período",
      validated: "Validado",
      thankYou: "Gracias por su pago.",
      propertyManagement: "Gestión de Propiedades Orsyndic",
      submitted: "¡Enviado!",
    },
    status: {
      open: "Abierto",
      inProgress: "En progreso",
      resolved: "Resuelto",
      paid: "Pagado",
      unpaid: "Impago",
      partial: "Parcial",
      urgent: "Urgente",
      active: "Activo",
      inactive: "Inactivo",
    },
  },
}
