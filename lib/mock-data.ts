// Mock data for Orsyndic property management dashboard

// ========================
// BUILDINGS & APARTMENTS
// ========================
export interface Building {
  id: string
  name: string
  address: string
  floors: number
  aptsPerFloor: number
}

export interface Apartment {
  id: string
  buildingId: string
  floor: number
  number: string
  tantiemes: number
  ownerId: string
  ownerName: string
  tenantId?: string
  tenantName?: string
}

export const buildings: Building[] = [
  { id: "building-1", name: "Résidence Al Andalous", address: "12 Rue Mohammed V, Casablanca", floors: 6, aptsPerFloor: 4 },
  { id: "building-2", name: "Résidence Les Jardins", address: "45 Avenue Hassan II, Rabat", floors: 4, aptsPerFloor: 3 },
  { id: "building-3", name: "Résidence Palm View", address: "8 Boulevard Zerktouni, Marrakech", floors: 3, aptsPerFloor: 6 },
]

export const apartments: Apartment[] = [
  { id: "apt-1", buildingId: "building-1", floor: 1, number: "1", tantiemes: 120, ownerId: "user-owner-1", ownerName: "Ahmed Benali", tenantId: "user-tenant-1", tenantName: "Karim Moussaoui" },
  { id: "apt-2", buildingId: "building-1", floor: 1, number: "2", tantiemes: 120, ownerId: "user-owner-3", ownerName: "Youssef Alami" },
  { id: "apt-5", buildingId: "building-1", floor: 2, number: "5", tantiemes: 100, ownerId: "user-owner-4", ownerName: "Rachid Tazi" },
  { id: "apt-6", buildingId: "building-1", floor: 2, number: "6", tantiemes: 100, ownerId: "user-owner-2", ownerName: "Fatima Zahra" },
  { id: "apt-b2-1", buildingId: "building-2", floor: 1, number: "1", tantiemes: 150, ownerId: "user-owner-5", ownerName: "Hassan Bennani", tenantId: "user-tenant-2", tenantName: "Sara Idrissi" },
  { id: "apt-b2-2", buildingId: "building-2", floor: 1, number: "2", tantiemes: 150, ownerId: "user-owner-6", ownerName: "Amina Chraibi" },
]

// ========================
// CHARGES & PAYMENTS
// ========================
export type ChargeStatus = "Paid" | "Unpaid" | "Partial"

export interface Charge {
  id: string
  apartmentId: string
  apartmentNumber: string
  buildingName: string
  ownerName: string
  month: string
  year: number
  amount: number
  status: ChargeStatus
  paidDate?: string
  validatedByAdmin: boolean
  ownerAvatar?: string
}

export const charges: Charge[] = [
  { id: "chg-001", apartmentId: "apt-1", apartmentNumber: "1", buildingName: "Résidence Al Andalous", ownerName: "Ahmed Benali", month: "April", year: 2026, amount: 500, status: "Paid", paidDate: "2026-04-05", validatedByAdmin: true, ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { id: "chg-002", apartmentId: "apt-2", apartmentNumber: "2", buildingName: "Résidence Al Andalous", ownerName: "Youssef Alami", month: "April", year: 2026, amount: 500, status: "Unpaid", validatedByAdmin: false, ownerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
  { id: "chg-003", apartmentId: "apt-4", apartmentNumber: "4", buildingName: "Résidence Al Andalous", ownerName: "Rachid Tazi", month: "April", year: 2026, amount: 450, status: "Unpaid", validatedByAdmin: false, ownerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  { id: "chg-004", apartmentId: "apt-5", apartmentNumber: "5", buildingName: "Résidence Al Andalous", ownerName: "Fatima Zahra", month: "April", year: 2026, amount: 450, status: "Paid", paidDate: "2026-04-10", validatedByAdmin: true, ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
  { id: "chg-005", apartmentId: "apt-b2-1", apartmentNumber: "1", buildingName: "Résidence Les Jardins", ownerName: "Hassan Bennani", month: "April", year: 2026, amount: 600, status: "Partial", validatedByAdmin: false, ownerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
  { id: "chg-006", apartmentId: "apt-b2-2", apartmentNumber: "2", buildingName: "Résidence Les Jardins", ownerName: "Amina Chraibi", month: "April", year: 2026, amount: 600, status: "Unpaid", validatedByAdmin: false, ownerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" },
  { id: "chg-007", apartmentId: "apt-1", apartmentNumber: "1", buildingName: "Résidence Al Andalous", ownerName: "Ahmed Benali", month: "March", year: 2026, amount: 500, status: "Paid", paidDate: "2026-03-08", validatedByAdmin: true, ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { id: "chg-008", apartmentId: "apt-5", apartmentNumber: "5", buildingName: "Résidence Al Andalous", ownerName: "Fatima Zahra", month: "March", year: 2026, amount: 450, status: "Paid", paidDate: "2026-03-12", validatedByAdmin: true, ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
]

// ========================
// HELPDESK TICKETS
// ========================
export type TicketStatus = "Open" | "In Progress" | "Resolved"

export interface TicketNote {
  id: string
  text: string
  createdAt: string
  author: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  submittedBy: string
  submittedByRole: "Owner" | "Tenant"
  buildingName: string
  apartmentNumber: string
  status: TicketStatus
  createdAt: string
  photo?: string
  photos?: string[]
  submittedByAvatar?: string
  notes?: TicketNote[]
}

export const tickets: Ticket[] = [
  { 
    id: "TKT-001", 
    title: "Water leak in bathroom", 
    description: "There is a persistent water leak coming from the ceiling in the bathroom. It has been getting worse over the past week.", 
    submittedBy: "Karim Moussaoui", 
    submittedByRole: "Tenant", 
    buildingName: "Résidence Al Andalous", 
    apartmentNumber: "1", 
    status: "Open", 
    createdAt: "2026-04-25", 
    photo: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800",
    photos: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800"
    ],
    submittedByAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" 
  },
  { id: "TKT-002", title: "Broken elevator", description: "The main elevator in building A has been out of service for 3 days. Elderly residents are having difficulty accessing upper floors.", submittedBy: "Ahmed Benali", submittedByRole: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "1", status: "In Progress", createdAt: "2026-04-22", submittedByAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { id: "TKT-003", title: "Noisy neighbors", description: "Neighbors on the 3rd floor are consistently playing loud music past midnight. This has been ongoing for 2 weeks.", submittedBy: "Sara Idrissi", submittedByRole: "Tenant", buildingName: "Résidence Les Jardins", apartmentNumber: "1", status: "Open", createdAt: "2026-04-24", submittedByAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
  { id: "TKT-004", title: "Parking space dispute", description: "Another resident has been parking in my designated spot (P-12) repeatedly.", submittedBy: "Fatima Zahra", submittedByRole: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "5", status: "Resolved", createdAt: "2026-04-15", submittedByAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
  { id: "TKT-005", title: "Lobby lights not working", description: "Several light fixtures in the ground floor lobby are not functioning, making it very dark at night.", submittedBy: "Karim Moussaoui", submittedByRole: "Tenant", buildingName: "Résidence Al Andalous", apartmentNumber: "1", status: "In Progress", createdAt: "2026-04-20", submittedByAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" },
];

// ========================
// DOCUMENTS
// ========================
export interface Document {
  id: string
  name: string
  category: "Assembly Minutes" | "Regulations" | "Financial Reports" | "Contracts" | "Other"
  uploadedAt: string
  fileSize: string
  uploadedBy: string
  buildingIds: string[]
}

export const documents: Document[] = [
  { id: "doc-001", name: "General Assembly Minutes - March 2026", category: "Assembly Minutes", uploadedAt: "2026-03-20", fileSize: "2.4 MB", uploadedBy: "Admin", buildingIds: ["building-1", "building-2"] },
  { id: "doc-002", name: "Building Regulations v3.0", category: "Regulations", uploadedAt: "2026-01-15", fileSize: "1.8 MB", uploadedBy: "Admin", buildingIds: ["building-1"] },
  { id: "doc-003", name: "Annual Financial Report 2025", category: "Financial Reports", uploadedAt: "2026-02-01", fileSize: "5.2 MB", uploadedBy: "Admin", buildingIds: ["building-2"] },
  { id: "doc-004", name: "Maintenance Contract - Elevator", category: "Contracts", uploadedAt: "2026-01-10", fileSize: "890 KB", uploadedBy: "Admin", buildingIds: ["building-1", "building-3"] },
  { id: "doc-005", name: "General Assembly Minutes - January 2026", category: "Assembly Minutes", uploadedAt: "2026-01-25", fileSize: "2.1 MB", uploadedBy: "Admin", buildingIds: ["building-3"] },
  { id: "doc-006", name: "Insurance Policy 2026", category: "Contracts", uploadedAt: "2026-01-05", fileSize: "3.4 MB", uploadedBy: "Admin", buildingIds: ["building-1", "building-2", "building-3"] },
]

// ========================
// ANNOUNCEMENTS
// ========================
export interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
  urgent: boolean
  createdBy: string
  audience: "Both" | "Owners" | "Tenants"
  buildingIds: string[]
}

export const announcements: Announcement[] = [
  { id: "ann-001", title: "Water supply interruption", content: "Please be informed that water supply will be interrupted on April 30th from 9:00 AM to 2:00 PM for maintenance work on the main pipeline.", createdAt: "2026-04-26", urgent: true, createdBy: "Admin", audience: "Both", buildingIds: ["building-1", "building-2"] },
  { id: "ann-002", title: "General Assembly Meeting", content: "The next General Assembly meeting is scheduled for May 15th at 6:00 PM in the ground floor meeting room. All owners are required to attend.", createdAt: "2026-04-24", urgent: false, createdBy: "Admin", audience: "Owners", buildingIds: ["building-1"] },
  { id: "ann-003", title: "New parking regulations", content: "Starting May 1st, new parking regulations will be enforced. Please review the updated rules posted in the lobby.", createdAt: "2026-04-20", urgent: false, createdBy: "Admin", audience: "Both", buildingIds: ["building-2", "building-3"] },
  { id: "ann-004", title: "Elevator maintenance", content: "Elevator maintenance is scheduled for May 5th. The elevator will be unavailable from 8:00 AM to 12:00 PM.", createdAt: "2026-04-18", urgent: true, createdBy: "Admin", audience: "Both", buildingIds: ["building-1", "building-2", "building-3"] },
]

// ========================
// ADMIN DASHBOARD STATS
// ========================
export interface AdminStatCard {
  title: string
  value: string
  description: string
  trend: "up" | "down" | "neutral"
  trendValue: string
  iconName: string
}

export const adminStatsData: AdminStatCard[] = [
  { title: "Unpaid Charges", value: "12", description: "Charges pending this month", trend: "down", trendValue: "-3", iconName: "CreditCard" },
  { title: "Open Tickets", value: "5", description: "Active helpdesk tickets", trend: "up", trendValue: "+2", iconName: "TicketCheck" },
  { title: "Total Buildings", value: "3", description: "Buildings under management", trend: "neutral", trendValue: "0", iconName: "Building2" },
  { title: "Total Apartments", value: "60", description: "Across all buildings", trend: "up", trendValue: "+4", iconName: "DoorOpen" },
  { title: "Active Users", value: "48", description: "Owners & Tenants", trend: "up", trendValue: "+6", iconName: "Users" },
]

// ========================
// USER MANAGEMENT (for Admin)
// ========================
export interface ManagedUser {
  id: string
  fullName: string
  email: string
  username?: string
  phone?: string
  role: "Owner" | "Tenant" | "Admin"
  buildingId: string
  buildingName: string
  apartmentNumber: string
  status: "Active" | "Inactive"
  createdAt: string
  avatar?: string
}

export const managedUsers: ManagedUser[] = [
  { id: "user-owner-1", fullName: "Ahmed Benali", email: "ahmed.benali@example.com", username: "ahmed.benali", role: "Owner", buildingId: "building-1", buildingName: "Résidence Al Andalous", apartmentNumber: "1", status: "Active", createdAt: "2025-06-15", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
  { id: "user-owner-2", fullName: "Fatima Zahra", email: "fatima.zahra@example.com", username: "fatima.zahra", role: "Owner", buildingId: "building-1", buildingName: "Résidence Al Andalous", apartmentNumber: "6", status: "Active", createdAt: "2025-07-20", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
  { id: "user-owner-3", fullName: "Youssef Alami", email: "youssef.alami@example.com", username: "youssef.alami", role: "Owner", buildingId: "building-1", buildingName: "Résidence Al Andalous", apartmentNumber: "2", status: "Active", createdAt: "2025-08-10", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
  { id: "user-owner-4", fullName: "Rachid Tazi", email: "rachid.tazi@example.com", username: "rachid.tazi", role: "Owner", buildingId: "building-1", buildingName: "Résidence Al Andalous", apartmentNumber: "5", status: "Active", createdAt: "2025-09-05", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  { id: "user-owner-5", fullName: "Hassan Bennani", email: "hassan.b@example.com", username: "hassan.b", role: "Owner", buildingId: "building-2", buildingName: "Résidence Les Jardins", apartmentNumber: "1", status: "Active", createdAt: "2025-10-01", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
  { id: "user-tenant-1", fullName: "Karim Moussaoui", email: "karim.moussaoui@example.com", phone: "0661234567", role: "Tenant", buildingId: "building-1", buildingName: "Résidence Al Andalous", apartmentNumber: "1", status: "Active", createdAt: "2025-11-15", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" },
  { id: "user-tenant-2", fullName: "Sara Idrissi", email: "sara.idrissi@example.com", phone: "0677654321", role: "Tenant", buildingId: "building-2", buildingName: "Résidence Les Jardins", apartmentNumber: "1", status: "Active", createdAt: "2025-12-01", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
  { id: "user-owner-6", fullName: "Amina Chraibi", email: "amina.c@example.com", username: "amina.c", role: "Owner", buildingId: "building-2", buildingName: "Résidence Les Jardins", apartmentNumber: "2", status: "Inactive", createdAt: "2025-06-20", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" },
]

// ========================
// CHART DATA
// ========================
export const revenueDataSets = {
  day: [
    { label: "08:00", revenue: 120 },
    { label: "10:00", revenue: 450 },
    { label: "12:00", revenue: 890 },
    { label: "14:00", revenue: 1200 },
    { label: "16:00", revenue: 950 },
    { label: "18:00", revenue: 1500 },
    { label: "20:00", revenue: 1100 },
  ],
  month: [
    { label: "Week 1", revenue: 12000 },
    { label: "Week 2", revenue: 15000 },
    { label: "Week 3", revenue: 11000 },
    { label: "Week 4", revenue: 18000 },
  ],
  year: [
    { label: "Jan", revenue: 4500 },
    { label: "Feb", revenue: 4800 },
    { label: "Mar", revenue: 5000 },
    { label: "Apr", revenue: 4200 },
    { label: "May", revenue: 5100 },
    { label: "Jun", revenue: 4900 },
    { label: "Jul", revenue: 5500 },
    { label: "Aug", revenue: 5800 },
    { label: "Sep", revenue: 5200 },
    { label: "Oct", revenue: 6000 },
    { label: "Nov", revenue: 5700 },
    { label: "Dec", revenue: 6200 },
  ],
  all: [
    { label: "2022", revenue: 45000 },
    { label: "2023", revenue: 58000 },
    { label: "2024", revenue: 62000 },
    { label: "2025", revenue: 75000 },
  ],
}

export const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
}

// ========================
// PLATFORM ADMIN DATA
// ========================
export const recentSyndics = [
  { id: "1", name: "Ahmed Benali", company: "Benali Management", buildings: 12, users: 450, status: "Active", joined: "2 days ago" },
  { id: "2", name: "Sara Idrissi", company: "Idrissi Syndic", buildings: 8, users: 210, status: "Active", joined: "1 week ago" },
  { id: "3", name: "Mohammed Amine", company: "Casa Syndic Pro", buildings: 24, users: 890, status: "Active", joined: "2 weeks ago" },
  { id: "4", name: "Youssef Tazi", company: "Tazi Immobilier", buildings: 5, users: 120, status: "Pending", joined: "1 month ago" },
]

export const initialSyndicsList = [
  { id: "1", name: "Ahmed Benali", email: "ahmed@benali-management.ma", phone: "+212 661-234567", company: "Benali Management", buildings: 12, status: "Active", joined: "2 days ago" },
  { id: "2", name: "Sara Idrissi", email: "sara@idrissi-syndic.com", phone: "+212 677-654321", company: "Idrissi Syndic", buildings: 8, status: "Active", joined: "1 week ago" },
  { id: "3", name: "Mohammed Amine", email: "amine@casasyndic.ma", phone: "+212 600-112233", company: "Casa Syndic Pro", buildings: 24, status: "Active", joined: "2 weeks ago" },
  { id: "4", name: "Youssef Tazi", email: "contact@tazi-immo.com", phone: "+212 699-887766", company: "Tazi Immobilier", buildings: 5, status: "Pending", joined: "1 month ago" },
  { id: "5", name: "Karim Mansour", email: "k.mansour@syndic.ma", phone: "+212 611-223344", company: "Mansour Gestion", buildings: 0, status: "Pending Approval", joined: "1 hour ago" },
  { id: "6", name: "Laila Houssani", email: "laila@houssani-gestion.com", phone: "+212 655-443322", company: "Houssani Syndic", buildings: 0, status: "Pending Approval", joined: "3 hours ago" },
  { id: "7", name: "Omar Ziri", email: "omar@ziri-management.ma", phone: "+212 622-334455", company: "Ziri Management", buildings: 0, status: "Pending Approval", joined: "5 hours ago" },
  { id: "demo", name: "Demo Admin", email: "demo@orsyndic.ma", phone: "+212 522-000000", company: "Orsyndic Demo", buildings: 3, status: "Active", joined: "1 month ago" },
]

export const platformStats = [
  { 
    title: "Total Syndics", 
    value: initialSyndicsList.length.toString(), 
    trend: "+12%", 
    iconName: "Users" 
  },
  { 
    title: "Total Buildings", 
    value: initialSyndicsList.reduce((acc, s) => acc + s.buildings, 0).toString(), 
    trend: "+8%", 
    iconName: "Building2" 
  },
  { 
    title: "Total Users", 
    value: (recentSyndics.reduce((acc, s) => acc + s.users, 0) + managedUsers.length).toLocaleString(), 
    trend: "+15%", 
    iconName: "Activity" 
  },
  { 
    title: "Platform Revenue", 
    value: "84.2K MAD", 
    trend: "+5%", 
    iconName: "CreditCard" 
  },
]
