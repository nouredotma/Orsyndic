// React hooks for fetching data from Supabase API routes
// These replace direct mock-data imports in page components

import { useState, useEffect, useCallback } from 'react'

// Generic fetch hook
function useApiData<T>(url: string | null, key: string, initialValue: T | null = null) {
  const [data, setData] = useState<T | null>(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (!url) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(url)
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Fetch failed')
      setData(result[key] ?? result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [url, key])

  useEffect(() => { refetch() }, [refetch])

  return { data: data as T, loading, error, refetch, setData }
}

// ==================
// BUILDINGS
// ==================
import type { Building } from '@/lib/types'

export function useBuildings(syndicId: string | undefined) {
  return useApiData<Building[]>(
    syndicId ? `/api/buildings?syndic_id=${syndicId}` : null,
    'buildings'
  )
}

// ==================
// APARTMENTS
// ==================
import type { Apartment } from '@/lib/types'

export function useApartments(syndicId: string | undefined) {
  return useApiData<Apartment[]>(
    syndicId ? `/api/apartments?syndic_id=${syndicId}` : null,
    'apartments'
  )
}

export function useApartmentsByBuilding(buildingId: string | undefined) {
  return useApiData<Apartment[]>(
    buildingId ? `/api/apartments?building_id=${buildingId}` : null,
    'apartments'
  )
}

// ==================
// PROFILES (Managed Users)
// ==================
import type { Profile } from '@/lib/types'

export function useProfiles(syndicId: string | undefined) {
  return useApiData<Profile[]>(
    syndicId ? `/api/profiles?syndic_id=${syndicId}` : null,
    'profiles'
  )
}

// ==================
// CHARGES
// ==================
import type { Charge } from '@/lib/types'

export function useCharges(syndicId: string | undefined) {
  return useApiData<Charge[]>(
    syndicId ? `/api/charges?syndic_id=${syndicId}` : null,
    'charges'
  )
}

export function useChargesByApartment(apartmentId: string | undefined) {
  return useApiData<Charge[]>(
    apartmentId ? `/api/charges?apartment_id=${apartmentId}` : null,
    'charges'
  )
}

// ==================
// TICKETS
// ==================
import type { Ticket } from '@/lib/types'

export function useTickets(syndicId: string | undefined) {
  return useApiData<Ticket[]>(
    syndicId ? `/api/tickets?syndic_id=${syndicId}` : null,
    'tickets'
  )
}

export function useTicketsByUser(submittedById: string | undefined) {
  return useApiData<Ticket[]>(
    submittedById ? `/api/tickets?submitted_by_id=${submittedById}` : null,
    'tickets'
  )
}

// ==================
// TICKET NOTES
// ==================
import type { TicketNote } from '@/lib/types'

export function useTicketNotes(ticketId: string | undefined) {
  return useApiData<TicketNote[]>(
    ticketId ? `/api/ticket-notes?ticket_id=${ticketId}` : null,
    'notes'
  )
}

// ==================
// DOCUMENTS
// ==================
import type { Document } from '@/lib/types'

export function useDocuments(syndicId: string | undefined) {
  return useApiData<Document[]>(
    syndicId ? `/api/documents?syndic_id=${syndicId}` : null,
    'documents'
  )
}

// ==================
// ANNOUNCEMENTS
// ==================
import type { Announcement } from '@/lib/types'

export function useAnnouncements(syndicId: string | undefined) {
  return useApiData<Announcement[]>(
    syndicId ? `/api/announcements?syndic_id=${syndicId}` : null,
    'announcements'
  )
}

// ==================
// DASHBOARD STATS
// ==================
export interface DashboardStats {
  totalBuildings: number
  totalApartments: number
  totalUsers: number
  activeTickets: number
  unpaidCharges: number
  totalRevenue: number
  collectionRate: number
}

export interface DashboardData {
  stats: DashboardStats
  revenueData: { name: string; revenue: number }[]
}

export function useDashboardStats(syndicId: string | undefined) {
  return useApiData<DashboardData>(
    syndicId ? `/api/dashboard/stats?syndic_id=${syndicId}` : null,
    'stats'
  )
}

// ==================
// ADMIN: SYNDICS LIST
// ==================
import type { Syndic } from '@/lib/types'

export function useAdminSyndics() {
  return useApiData<Syndic[]>('/api/admin/syndics', 'syndics')
}

// ==================
// ADMIN: PLATFORM STATS
// ==================
export interface AdminStats {
  totalSyndics: number
  activeSyndics: number
  pendingSyndics: number
  totalBuildings: number
  totalApartments: number
  totalUsers: number
}

export interface AdminDashboardData {
  stats: AdminStats
  recentSyndics: Syndic[]
}

export function useAdminDashboardData() {
  const [data, setData] = useState<AdminDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      const result = await res.json()
      if (!res.ok) throw new Error(result.error)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refetch() }, [refetch])

  return { data, loading, error, refetch, setData }
}
