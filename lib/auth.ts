// Supabase-backed authentication functions
// Replaces the previous localStorage-based mock auth

import { supabase } from '@/lib/supabase'
import type { UserRole } from '@/lib/types'

// Re-export types for backward compatibility
export type { UserRole } from '@/lib/types'

export interface User {
  id: string
  fullName: string
  email?: string
  username?: string
  phone?: string
  role: UserRole
  avatar?: string
  apartmentId?: string
  buildingId?: string
  syndicId?: string
}

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

// Synchronous check using cached session (for guards that need sync check)
export const isAuthenticatedSync = (): boolean => {
  if (typeof window === 'undefined') return false
  const user = localStorage.getItem('user')
  return !!user
}

// Get the current user from Supabase session + profile
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const userJson = localStorage.getItem('user')
  if (!userJson) return null
  return JSON.parse(userJson) as User
}

// Fetch and cache user profile after Supabase auth
const fetchAndCacheProfile = async (authUserId: string): Promise<User> => {
  // First check if user is a syndic (Admin)
  const { data: syndic } = await supabase
    .from('syndics')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single()

  if (syndic) {
    const user: User = {
      id: syndic.id,
      fullName: syndic.full_name,
      email: syndic.email,
      role: 'Admin',
      avatar: undefined,
      syndicId: syndic.id,
    }
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }

  // Otherwise check profiles table (Owner/Tenant)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single()

  if (profile) {
    const user: User = {
      id: profile.id,
      fullName: profile.full_name,
      email: profile.email || undefined,
      username: profile.username || undefined,
      phone: profile.phone || undefined,
      role: profile.role as UserRole,
      avatar: profile.avatar_url || undefined,
      apartmentId: profile.apartment_id || undefined,
      buildingId: profile.building_id || undefined,
      syndicId: profile.syndic_id,
    }
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }

  throw new Error('User profile not found')
}

// Login with email + password (Admin / Syndic)
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return fetchAndCacheProfile(data.user.id)
}

// Login with username + password (Owner)
// Looks up the email via API route, then signs in with Supabase
export const loginWithUsername = async (username: string, password: string): Promise<User> => {
  const res = await fetch('/api/auth/lookup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'username', value: username }),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error || 'User not found')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: result.email,
    password,
  })
  if (error) throw new Error('Invalid username or password')
  return fetchAndCacheProfile(data.user.id)
}

// Login with phone + password (Tenant)
// Looks up the email via API route, then signs in with Supabase
export const loginWithPhone = async (phone: string, password: string): Promise<User> => {
  const res = await fetch('/api/auth/lookup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'phone', value: phone }),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error || 'User not found')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: result.email,
    password,
  })
  if (error) throw new Error('Invalid phone number or password')
  return fetchAndCacheProfile(data.user.id)
}

// Register a new syndic (Admin)
export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
  companyName: string,
  phone: string,
  address: string,
): Promise<User> => {
  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, company_name: companyName },
    },
  })
  if (authError) throw new Error(authError.message)
  if (!authData.user) throw new Error('Registration failed')

  // Create syndic record via API route (needs service role)
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authUserId: authData.user.id,
      fullName,
      email,
      phone,
      companyName,
      address,
    }),
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.error || 'Registration failed')

  const user: User = {
    id: result.syndic.id,
    fullName,
    email,
    role: 'Admin',
    syndicId: result.syndic.id,
  }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// Legacy login (kept for compatibility — Admin only via email)
export const loginUser = async (email: string, password: string): Promise<User> => {
  return loginWithEmail(email, password)
}

// Logout user
export const logoutUser = async (): Promise<void> => {
  await supabase.auth.signOut()
  localStorage.removeItem('user')
}

// Get the dashboard path based on user role
export const getDashboardPath = (role: UserRole): string => {
  const isDemo = typeof window !== 'undefined' && window.location.pathname.startsWith('/syndic-demo')
  const prefix = isDemo ? '/syndic-demo' : '/syndic'
  return `${prefix}/dashboard`
}
