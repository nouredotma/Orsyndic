// Database types for Supabase tables
// These mirror the schema defined in supabase/migrations/001_initial_schema.sql

// ========================
// SYNDICS (Platform-level)
// ========================
export type SyndicStatus = 'Active' | 'Pending' | 'Pending Approval' | 'Suspended'

export interface Syndic {
  id: string
  auth_user_id: string | null
  full_name: string
  email: string
  phone: string | null
  company_name: string
  address: string | null
  status: SyndicStatus
  buildings_count: number
  created_at: string
  updated_at: string
}

// ========================
// BUILDINGS
// ========================
export interface Building {
  id: string
  syndic_id: string
  name: string
  address: string
  floors: number
  apts_per_floor: number
  created_at: string
  updated_at: string
}

// ========================
// PROFILES (Managed Users)
// ========================
export type UserRole = 'Admin' | 'Owner' | 'Tenant'
export type UserStatus = 'Active' | 'Inactive'

export interface Profile {
  id: string
  auth_user_id: string | null
  syndic_id: string
  full_name: string
  email: string | null
  username: string | null
  phone: string | null
  role: UserRole
  avatar_url: string | null
  building_id: string | null
  apartment_id: string | null
  status: UserStatus
  created_at: string
  updated_at: string
}

// ========================
// APARTMENTS
// ========================
export interface Apartment {
  id: string
  building_id: string
  floor: number
  number: string
  tantiemes: number
  owner_id: string | null
  owner_name: string | null
  tenant_id: string | null
  tenant_name: string | null
  created_at: string
  updated_at: string
}

// ========================
// CHARGES
// ========================
export type ChargeStatus = 'Paid' | 'Unpaid' | 'Partial'

export interface Charge {
  id: string
  syndic_id: string
  apartment_id: string
  apartment_number: string
  building_name: string
  owner_name: string
  owner_avatar: string | null
  month: string
  year: number
  amount: number
  status: ChargeStatus
  paid_date: string | null
  validated_by_admin: boolean
  created_at: string
  updated_at: string
}

// ========================
// TICKETS
// ========================
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved'

export interface Ticket {
  id: string
  syndic_id: string
  title: string
  description: string
  submitted_by_id: string | null
  submitted_by_name: string
  submitted_by_role: 'Owner' | 'Tenant'
  submitted_by_avatar: string | null
  building_name: string
  apartment_number: string
  status: TicketStatus
  photos: string[] | null
  created_at: string
  updated_at: string
}

// ========================
// TICKET NOTES
// ========================
export interface TicketNote {
  id: string
  ticket_id: string
  text: string
  author: string
  created_at: string
}

// ========================
// DOCUMENTS
// ========================
export type DocumentCategory = 'Assembly Minutes' | 'Regulations' | 'Financial Reports' | 'Contracts' | 'Other'

export interface Document {
  id: string
  syndic_id: string
  name: string
  category: DocumentCategory
  file_url: string | null
  file_size: string | null
  uploaded_by: string
  building_ids: string[] | null
  created_at: string
  updated_at: string
}

// ========================
// ANNOUNCEMENTS
// ========================
export type AnnouncementAudience = 'Both' | 'Owners' | 'Tenants'

export interface Announcement {
  id: string
  syndic_id: string
  title: string
  content: string
  urgent: boolean
  created_by: string
  audience: AnnouncementAudience
  building_ids: string[] | null
  created_at: string
  updated_at: string
}

// ========================
// APP ADMINS
// ========================
export interface AppAdmin {
  id: string
  auth_user_id: string
  email: string
  created_at: string
}

// ========================
// CHART CONFIG (moved from mock-data.ts)
// ========================
export const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
}
