// Mock data for Orsyndic property management dashboard

// ========================
// BUILDINGS & APARTMENTS
// ========================
export interface Building {
  id: string
  name: string
  address: string
  floors: number
  totalApartments: number
}

export interface Apartment {
  id: string
  buildingId: string
  floor: number
  number: string
  ownerId: string
  ownerName: string
  tenantId?: string
  tenantName?: string
}

export const buildings: Building[] = [
  { id: "building-1", name: "Résidence Al Andalous", address: "12 Rue Mohammed V, Casablanca", floors: 6, totalApartments: 24 },
  { id: "building-2", name: "Résidence Les Jardins", address: "45 Avenue Hassan II, Rabat", floors: 4, totalApartments: 16 },
  { id: "building-3", name: "Résidence Palm View", address: "8 Boulevard Zerktouni, Marrakech", floors: 5, totalApartments: 20 },
]

export const apartments: Apartment[] = [
  { id: "apt-101", buildingId: "building-1", floor: 1, number: "101", ownerId: "user-owner-1", ownerName: "Ahmed Benali", tenantId: "user-tenant-1", tenantName: "Karim Moussaoui" },
  { id: "apt-102", buildingId: "building-1", floor: 1, number: "102", ownerId: "user-owner-3", ownerName: "Youssef Alami" },
  { id: "apt-201", buildingId: "building-1", floor: 2, number: "201", ownerId: "user-owner-4", ownerName: "Rachid Tazi" },
  { id: "apt-202", buildingId: "building-1", floor: 2, number: "202", ownerId: "user-owner-2", ownerName: "Fatima Zahra" },
  { id: "apt-301", buildingId: "building-2", floor: 3, number: "301", ownerId: "user-owner-5", ownerName: "Hassan Bennani", tenantId: "user-tenant-2", tenantName: "Sara Idrissi" },
  { id: "apt-302", buildingId: "building-2", floor: 3, number: "302", ownerId: "user-owner-6", ownerName: "Amina Chraibi" },
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
}

export const charges: Charge[] = [
  { id: "chg-001", apartmentId: "apt-101", apartmentNumber: "101", buildingName: "Résidence Al Andalous", ownerName: "Ahmed Benali", month: "April", year: 2026, amount: 500, status: "Paid", paidDate: "2026-04-05", validatedByAdmin: true },
  { id: "chg-002", apartmentId: "apt-102", apartmentNumber: "102", buildingName: "Résidence Al Andalous", ownerName: "Youssef Alami", month: "April", year: 2026, amount: 500, status: "Unpaid", validatedByAdmin: false },
  { id: "chg-003", apartmentId: "apt-201", apartmentNumber: "201", buildingName: "Résidence Al Andalous", ownerName: "Rachid Tazi", month: "April", year: 2026, amount: 450, status: "Unpaid", validatedByAdmin: false },
  { id: "chg-004", apartmentId: "apt-202", apartmentNumber: "202", buildingName: "Résidence Al Andalous", ownerName: "Fatima Zahra", month: "April", year: 2026, amount: 450, status: "Paid", paidDate: "2026-04-10", validatedByAdmin: true },
  { id: "chg-005", apartmentId: "apt-301", apartmentNumber: "301", buildingName: "Résidence Les Jardins", ownerName: "Hassan Bennani", month: "April", year: 2026, amount: 600, status: "Partial", validatedByAdmin: false },
  { id: "chg-006", apartmentId: "apt-302", apartmentNumber: "302", buildingName: "Résidence Les Jardins", ownerName: "Amina Chraibi", month: "April", year: 2026, amount: 600, status: "Unpaid", validatedByAdmin: false },
  { id: "chg-007", apartmentId: "apt-101", apartmentNumber: "101", buildingName: "Résidence Al Andalous", ownerName: "Ahmed Benali", month: "March", year: 2026, amount: 500, status: "Paid", paidDate: "2026-03-08", validatedByAdmin: true },
  { id: "chg-008", apartmentId: "apt-202", apartmentNumber: "202", buildingName: "Résidence Al Andalous", ownerName: "Fatima Zahra", month: "March", year: 2026, amount: 450, status: "Paid", paidDate: "2026-03-12", validatedByAdmin: true },
]

// ========================
// HELPDESK TICKETS
// ========================
export type TicketStatus = "Open" | "In Progress" | "Resolved"
export type TicketPriority = "Low" | "Medium" | "High"

export interface Ticket {
  id: string
  title: string
  description: string
  submittedBy: string
  submittedByRole: "Owner" | "Tenant"
  buildingName: string
  apartmentNumber: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  photo?: string
}

export const tickets: Ticket[] = [
  { id: "TKT-001", title: "Water leak in bathroom", description: "There is a persistent water leak coming from the ceiling in the bathroom. It has been getting worse over the past week.", submittedBy: "Karim Moussaoui", submittedByRole: "Tenant", buildingName: "Résidence Al Andalous", apartmentNumber: "101", status: "Open", priority: "High", createdAt: "2026-04-25", photo: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400" },
  { id: "TKT-002", title: "Broken elevator", description: "The main elevator in building A has been out of service for 3 days. Elderly residents are having difficulty accessing upper floors.", submittedBy: "Ahmed Benali", submittedByRole: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "101", status: "In Progress", priority: "High", createdAt: "2026-04-22" },
  { id: "TKT-003", title: "Noisy neighbors", description: "Neighbors on the 3rd floor are consistently playing loud music past midnight. This has been ongoing for 2 weeks.", submittedBy: "Sara Idrissi", submittedByRole: "Tenant", buildingName: "Résidence Les Jardins", apartmentNumber: "301", status: "Open", priority: "Medium", createdAt: "2026-04-24" },
  { id: "TKT-004", title: "Parking space dispute", description: "Another resident has been parking in my designated spot (P-12) repeatedly.", submittedBy: "Fatima Zahra", submittedByRole: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "202", status: "Resolved", priority: "Low", createdAt: "2026-04-15" },
  { id: "TKT-005", title: "Lobby lights not working", description: "Several light fixtures in the ground floor lobby are not functioning, making it very dark at night.", submittedBy: "Karim Moussaoui", submittedByRole: "Tenant", buildingName: "Résidence Al Andalous", apartmentNumber: "101", status: "In Progress", priority: "Medium", createdAt: "2026-04-20" },
]

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
}

export const documents: Document[] = [
  { id: "doc-001", name: "General Assembly Minutes - March 2026", category: "Assembly Minutes", uploadedAt: "2026-03-20", fileSize: "2.4 MB", uploadedBy: "Admin" },
  { id: "doc-002", name: "Building Regulations v3.0", category: "Regulations", uploadedAt: "2026-01-15", fileSize: "1.8 MB", uploadedBy: "Admin" },
  { id: "doc-003", name: "Annual Financial Report 2025", category: "Financial Reports", uploadedAt: "2026-02-01", fileSize: "5.2 MB", uploadedBy: "Admin" },
  { id: "doc-004", name: "Maintenance Contract - Elevator", category: "Contracts", uploadedAt: "2026-01-10", fileSize: "890 KB", uploadedBy: "Admin" },
  { id: "doc-005", name: "General Assembly Minutes - January 2026", category: "Assembly Minutes", uploadedAt: "2026-01-25", fileSize: "2.1 MB", uploadedBy: "Admin" },
  { id: "doc-006", name: "Insurance Policy 2026", category: "Contracts", uploadedAt: "2026-01-05", fileSize: "3.4 MB", uploadedBy: "Admin" },
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
}

export const announcements: Announcement[] = [
  { id: "ann-001", title: "Water supply interruption", content: "Please be informed that water supply will be interrupted on April 30th from 9:00 AM to 2:00 PM for maintenance work on the main pipeline.", createdAt: "2026-04-26", urgent: true, createdBy: "Admin" },
  { id: "ann-002", title: "General Assembly Meeting", content: "The next General Assembly meeting is scheduled for May 15th at 6:00 PM in the ground floor meeting room. All owners are required to attend.", createdAt: "2026-04-24", urgent: false, createdBy: "Admin" },
  { id: "ann-003", title: "New parking regulations", content: "Starting May 1st, new parking regulations will be enforced. Please review the updated rules posted in the lobby.", createdAt: "2026-04-20", urgent: false, createdBy: "Admin" },
  { id: "ann-004", title: "Elevator maintenance", content: "Elevator maintenance is scheduled for May 5th. The elevator will be unavailable from 8:00 AM to 12:00 PM.", createdAt: "2026-04-18", urgent: true, createdBy: "Admin" },
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
  username?: string
  phone?: string
  role: "Owner" | "Tenant"
  buildingName: string
  apartmentNumber: string
  status: "Active" | "Inactive"
  createdAt: string
}

export const managedUsers: ManagedUser[] = [
  { id: "user-owner-1", fullName: "Ahmed Benali", username: "ahmed.benali", role: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "101", status: "Active", createdAt: "2025-06-15" },
  { id: "user-owner-2", fullName: "Fatima Zahra", username: "fatima.zahra", role: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "202", status: "Active", createdAt: "2025-07-20" },
  { id: "user-owner-3", fullName: "Youssef Alami", username: "youssef.alami", role: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "102", status: "Active", createdAt: "2025-08-10" },
  { id: "user-owner-4", fullName: "Rachid Tazi", username: "rachid.tazi", role: "Owner", buildingName: "Résidence Al Andalous", apartmentNumber: "201", status: "Active", createdAt: "2025-09-05" },
  { id: "user-owner-5", fullName: "Hassan Bennani", username: "hassan.b", role: "Owner", buildingName: "Résidence Les Jardins", apartmentNumber: "301", status: "Active", createdAt: "2025-10-01" },
  { id: "user-tenant-1", fullName: "Karim Moussaoui", phone: "0661234567", role: "Tenant", buildingName: "Résidence Al Andalous", apartmentNumber: "101", status: "Active", createdAt: "2025-11-15" },
  { id: "user-tenant-2", fullName: "Sara Idrissi", phone: "0677654321", role: "Tenant", buildingName: "Résidence Les Jardins", apartmentNumber: "301", status: "Active", createdAt: "2025-12-01" },
  { id: "user-owner-6", fullName: "Amina Chraibi", username: "amina.c", role: "Owner", buildingName: "Résidence Les Jardins", apartmentNumber: "302", status: "Inactive", createdAt: "2025-06-20" },
]
