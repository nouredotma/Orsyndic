// Mock authentication functions for local storage

// Types
export type UserRole = "Admin" | "Owner" | "Tenant"

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
}

// Mock users for testing
// Admin logs in with email + password
// Owner logs in with username + password
// Tenant logs in with phone + password
const mockUsers: (User & { password: string; email?: string; username?: string; phone?: string })[] = [
  {
    id: "user-admin-1",
    fullName: "Noureddine Elm",
    email: "admin@orsyndic.com",
    password: "password123",
    role: "Admin",
    avatar: "/me.webp",
  },
  {
    id: "user-owner-1",
    fullName: "Ahmed Benali",
    username: "ahmed.benali",
    password: "password123",
    role: "Owner",
    avatar: "",
    buildingId: "building-1",
    apartmentId: "apt-101",
  },
  {
    id: "user-owner-2",
    fullName: "Fatima Zahra",
    username: "fatima.zahra",
    password: "password123",
    role: "Owner",
    avatar: "",
    buildingId: "building-1",
    apartmentId: "apt-202",
  },
  {
    id: "user-tenant-1",
    fullName: "Karim Moussaoui",
    phone: "0661234567",
    password: "password123",
    role: "Tenant",
    avatar: "",
    buildingId: "building-1",
    apartmentId: "apt-101",
  },
  {
    id: "user-tenant-2",
    fullName: "Sara Idrissi",
    phone: "0677654321",
    password: "password123",
    role: "Tenant",
    avatar: "",
    buildingId: "building-2",
    apartmentId: "apt-301",
  },
]

// Helper to generate IDs
const generateId = () => `id-${Math.random().toString(36).substring(2, 9)}`

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  const user = localStorage.getItem("user")
  return !!user
}

// Get the current user from localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userJson = localStorage.getItem("user")
  if (!userJson) return null
  return JSON.parse(userJson) as User
}

// Login with email + password (Admin)
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password && u.role === "Admin"
  )

  if (!user) {
    throw new Error("Invalid email or password")
  }

  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem("user", JSON.stringify(userWithoutPassword))

  return userWithoutPassword
}

// Login with username + password (Owner)
export const loginWithUsername = async (username: string, password: string): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password && u.role === "Owner"
  )

  if (!user) {
    throw new Error("Invalid username or password")
  }

  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem("user", JSON.stringify(userWithoutPassword))

  return userWithoutPassword
}

// Login with phone + password (Tenant)
export const loginWithPhone = async (phone: string, password: string): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = mockUsers.find(
    (u) => u.phone === phone && u.password === password && u.role === "Tenant"
  )

  if (!user) {
    throw new Error("Invalid phone number or password")
  }

  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem("user", JSON.stringify(userWithoutPassword))

  return userWithoutPassword
}

// Legacy login (kept for compatibility — Admin only via email)
export const loginUser = async (email: string, password: string): Promise<User> => {
  return loginWithEmail(email, password)
}

// Register a new admin user (admin-only registration)
export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
  companyName: string,
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const existingUser = mockUsers.find((user) => user.email === email)
  if (existingUser) {
    throw new Error("Email already in use")
  }

  const userId = generateId()
  const user: User & { password: string } = {
    id: userId,
    fullName,
    email,
    password,
    role: "Admin",
  }

  const { password: _, ...userWithoutPassword } = user
  localStorage.setItem("user", JSON.stringify(userWithoutPassword))

  return userWithoutPassword
}

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem("user")
}

// Get the dashboard path based on user role
export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case "Admin":
      return "/syndic/dashboard"
    case "Owner":
      return "/syndic/dashboard"
    case "Tenant":
      return "/syndic/dashboard"
    default:
      return "/syndic/dashboard"
  }
}
