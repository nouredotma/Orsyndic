// Mock authentication for the syndic-demo (offline demo mode)
// Uses localStorage with hardcoded demo users — no Supabase calls

export type UserRole = 'Admin' | 'Owner' | 'Tenant'

export interface DemoUser {
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

// Hardcoded demo users
const demoUsers: DemoUser[] = [
  {
    id: 'demo-admin-1',
    fullName: 'Mohammed Alami',
    email: 'admin@orsyndic.com',
    role: 'Admin',
    syndicId: 'demo-syndic-1',
  },
  {
    id: 'demo-owner-1',
    fullName: 'Ahmed Benali',
    username: 'ahmed.benali',
    email: 'karim@email.com',
    role: 'Owner',
    buildingId: 'demo-building-1',
    apartmentId: 'demo-apt-1',
    syndicId: 'demo-syndic-1',
  },
  {
    id: 'demo-tenant-1',
    fullName: 'Fatima Zahra',
    phone: '0661234567',
    role: 'Tenant',
    buildingId: 'demo-building-1',
    apartmentId: 'demo-apt-2',
    syndicId: 'demo-syndic-1',
  },
]

// Check if a demo user is logged in
export const isAuthenticatedSync = (): boolean => {
  if (typeof window === 'undefined') return false
  const user = localStorage.getItem('user')
  return !!user
}

// Get the current demo user from localStorage
export const getCurrentUser = (): DemoUser | null => {
  if (typeof window === 'undefined') return null
  const userJson = localStorage.getItem('user')
  if (!userJson) return null
  return JSON.parse(userJson) as DemoUser
}

// Login with email + password (Admin / Syndic) — demo mode
export const loginWithEmail = async (email: string, _password: string): Promise<DemoUser> => {
  const user = demoUsers.find(u => u.email === email)
  if (!user) throw new Error('User not found')
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// Login with username + password (Owner) — demo mode
export const loginWithUsername = async (username: string, _password: string): Promise<DemoUser> => {
  const user = demoUsers.find(u => u.username === username)
  if (!user) throw new Error('Invalid username or password')
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// Login with phone + password (Tenant) — demo mode
export const loginWithPhone = async (phone: string, _password: string): Promise<DemoUser> => {
  const user = demoUsers.find(u => u.phone === phone)
  if (!user) throw new Error('Invalid phone number or password')
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// Register a new syndic — demo mode (just creates a mock user)
export const registerUser = async (
  fullName: string,
  email: string,
  _password: string,
  companyName: string,
  _phone: string,
  _address: string,
): Promise<DemoUser> => {
  const user: DemoUser = {
    id: `demo-syndic-${Date.now()}`,
    fullName,
    email,
    role: 'Admin',
    syndicId: `demo-syndic-${Date.now()}`,
  }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

// Legacy login (Admin only via email)
export const loginUser = async (email: string, password: string): Promise<DemoUser> => {
  return loginWithEmail(email, password)
}

// Logout user
export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem('user')
}

// Get the dashboard path based on user role
export const getDashboardPath = (_role: UserRole): string => {
  return '/syndic-demo/dashboard'
}
