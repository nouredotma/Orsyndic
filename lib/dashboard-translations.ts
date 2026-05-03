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
  }
  announcements: {
    newAnnouncement: string
    title: string
    content: string
    urgent: string
    urgentDescription: string
    postAnnouncement: string
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
    },
    announcements: {
      newAnnouncement: "New Announcement",
      title: "Title",
      content: "Content",
      urgent: "Mark as Urgent",
      urgentDescription: "This will highlight the announcement in red.",
      postAnnouncement: "Post Announcement",
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
    },
    announcements: {
      newAnnouncement: "Nouvelle Annonce",
      title: "Titre",
      content: "Contenu",
      urgent: "Marquer comme Urgent",
      urgentDescription: "Cela mettra l'annonce en évidence en rouge.",
      postAnnouncement: "Publier l'Annonce",
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
      fullName: "Nombre Complet",
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
    },
    announcements: {
      newAnnouncement: "Nuevo Anuncio",
      title: "Título",
      content: "Contenido",
      urgent: "Marcar como Urgente",
      urgentDescription: "Esto resaltará el anuncio en rojo.",
      postAnnouncement: "Publicar Anuncio",
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
    },
  },
}
