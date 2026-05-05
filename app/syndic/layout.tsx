"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Building2, CreditCard, FileText, Home, LogOut, Menu, Users, X,
  TicketCheck, Megaphone, FolderOpen, UserCircle, DoorOpen,
  UserPlus, AlertTriangle,
} from "lucide-react"

import { logoutUser, getCurrentUser } from "@/lib/auth"
import type { UserRole } from "@/lib/auth"
import { I18nProvider, useI18n } from "@/lib/i18n-context"
import type { DashboardLanguage } from "@/lib/dashboard-translations"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarItem {
  title: string
  translationKey: string
  icon: React.ElementType
  path: string
  description: string
}

// Admin pages
const adminSidebarItems: SidebarItem[] = [
  { title: "Dashboard", translationKey: "dashboard", icon: Home, path: "/syndic/dashboard", description: "Overview, unpaid charges, tickets, announcements" },
  { title: "Buildings", translationKey: "buildings", icon: Building2, path: "/syndic/buildings", description: "Buildings, floors, and apartments" },
  { title: "Users", translationKey: "users", icon: Users, path: "/syndic/users", description: "Manage Owner and Tenant accounts" },
  { title: "Charges", translationKey: "charges", icon: CreditCard, path: "/syndic/charges", description: "Generate and track monthly charges" },
  { title: "Helpdesk", translationKey: "helpDesk", icon: TicketCheck, path: "/syndic/helpdesk", description: "View and manage all tickets" },
  { title: "Documents", translationKey: "documents", icon: FolderOpen, path: "/syndic/documents", description: "Upload and organize files" },
  { title: "Announcements", translationKey: "announcements", icon: Megaphone, path: "/syndic/announcements", description: "Post notices for all users" },
]

// Owner pages
const ownerSidebarItems: SidebarItem[] = [
  { title: "Dashboard", translationKey: "dashboard", icon: Home, path: "/syndic/dashboard", description: "Balance and announcements" },
  { title: "My Charges", translationKey: "myCharges", icon: CreditCard, path: "/syndic/my-charges", description: "Charge history and receipts" },
  { title: "Documents", translationKey: "documents", icon: FolderOpen, path: "/syndic/documents", description: "Download shared files" },
  { title: "My Tickets", translationKey: "myTickets", icon: TicketCheck, path: "/syndic/my-tickets", description: "Submit and track incidents" },
]

// Tenant pages
const tenantSidebarItems: SidebarItem[] = [
  { title: "Dashboard", translationKey: "dashboard", icon: Home, path: "/syndic/dashboard", description: "Announcements" },
  { title: "My Tickets", translationKey: "myTickets", icon: TicketCheck, path: "/syndic/my-tickets", description: "Submit and track complaints" },
]

const getSidebarItems = (role: UserRole): SidebarItem[] => {
  switch (role) {
    case "Admin": return adminSidebarItems
    case "Owner": return ownerSidebarItems
    case "Tenant": return tenantSidebarItems
    default: return []
  }
}

const allowedRoutes: Record<UserRole, string[]> = {
  Admin: ["/syndic/dashboard", "/syndic/users", "/syndic/buildings", "/syndic/charges", "/syndic/helpdesk", "/syndic/documents", "/syndic/announcements", "/syndic/profile"],
  Owner: ["/syndic/dashboard", "/syndic/my-charges", "/syndic/documents", "/syndic/my-tickets", "/syndic/profile"],
  Tenant: ["/syndic/dashboard", "/syndic/my-tickets", "/syndic/profile"],
}

const languages = [
  { name: "English", code: "en", flag: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" },
  { name: "French", code: "fr", flag: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg" },
  { name: "Spanish", code: "es", flag: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg" },
]

const SidebarNavItem = ({ item, pathname, collapsed, isMobileSidebar }: { item: SidebarItem; pathname: string; collapsed: boolean; isMobileSidebar: boolean }) => {
  const { t } = useI18n()
  const isActive = pathname === item.path
  
  // Use explicit translation key if available, otherwise fallback to path logic
  const title = t.sidebar[item.translationKey as keyof typeof t.sidebar] || item.title

  return (
    <Link href={item.path} className="block">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start h-auto py-2.5 text-sm text-white/60 cursor-pointer transition-colors relative",
          !isActive && "hover:bg-white/10 hover:text-white",
          collapsed && !isMobileSidebar ? "justify-center px-2" : "px-3",
          isActive && "bg-primary/15 text-primary hover:bg-primary/15 hover:text-primary",
        )}
      >
        {isActive && <div className="absolute right-0 top-[15%] bottom-[15%] w-1 bg-primary rounded-l-full" />}
        <item.icon className={cn("h-5.5 w-5.5", collapsed && !isMobileSidebar ? "" : "mr-2.5")} />
        {(!collapsed || isMobileSidebar) && <span>{title}</span>}
        {collapsed && !isMobileSidebar && <span className="sr-only">{title}</span>}
      </Button>
    </Link>
  )
}

const UserProfileSection = ({ collapsed, userData, handleLogout, isMobileSidebar = false }: { collapsed: boolean; userData: { fullName: string; role: string; avatar?: string } | null; handleLogout: () => void; isMobileSidebar?: boolean }) => {
  const { t } = useI18n()
  if (!userData) return null
  return (
    <div className={cn("mt-auto pb-1", isMobileSidebar ? "px-0" : "px-0")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={cn("w-full justify-start h-auto py-2 hover:bg-white/10 cursor-pointer focus-visible:ring-0 border-none px-2 text-white", collapsed && !isMobileSidebar ? "justify-center" : "gap-3")}>
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarImage src={userData.avatar} alt={userData.fullName} />
              <AvatarFallback className="bg-red-100 text-[#FF0000] font-bold text-sm">{userData.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            {(!collapsed || isMobileSidebar) && (
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="text-sm font-semibold truncate w-full text-white">{userData.fullName}</span>
                <span className="text-xs text-white/50 truncate w-full">{userData.role === "Admin" ? "Admin" : userData.role === "Owner" ? t.common.owner : t.common.tenant}</span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-[12.5rem] mb-2 bg-white border-none shadow-lg rounded-sm p-1.5">
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-black/5 focus:bg-black/5 focus:text-black rounded-sm py-2.5 transition-colors group">
            <Link href="/syndic/profile" className="flex items-center gap-2.5 w-full">
              <UserCircle className="h-4.5 w-4.5 text-black/60 group-hover:text-black group-focus:text-black" />
              <span className="text-sm font-medium text-black">{t.header.profile}</span>
            </Link>
          </DropdownMenuItem>
          <div className="h-px bg-black/5 my-1.5" />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 focus:text-red-600 focus:bg-red-50 rounded-sm py-2.5 transition-colors flex items-center gap-2.5">
            <LogOut className="h-4.5 w-4.5 text-red-500" />
            <span className="text-sm font-semibold">{t.header.logout}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default function SyndicLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <SyndicLayoutContent>{children}</SyndicLayoutContent>
    </I18nProvider>
  )
}

function SyndicLayoutContent({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<{ fullName: string; role: UserRole; avatar?: string } | null>(null)
  const [currentPageTitle, setCurrentPageTitle] = useState("")
  const [animate, setAnimate] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  
  const currentLanguage = languages.find(l => l.code === language) || languages[0]

  useEffect(() => {
    const checkScreenSize = () => { setIsDesktop(window.innerWidth >= 1024) }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const isAuthPage = pathname === "/syndic/login" || pathname === "/syndic/register"
  const isDashboardPath = pathname?.startsWith("/syndic") && !isAuthPage && pathname !== "/syndic"

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setUserData({ fullName: user.fullName, role: user.role, avatar: user.avatar })
      // Route-level role guard
      if (isDashboardPath && pathname) {
        const allowed = allowedRoutes[user.role] || []
        if (!allowed.includes(pathname)) {
          router.push("/syndic/dashboard")
        }
      }
    } else if (isDashboardPath) {
      router.push("/syndic/login")
    }
  }, [pathname, router])

  useEffect(() => {
    if (userData) {
      const items = getSidebarItems(userData.role)
      const currentItem = items.find((item) => item.path === pathname)
      if (currentItem) {
        // Use translated title from sidebar map
        const key = currentItem.path.split("/").pop() || "dashboard"
        const translatedTitle = t.sidebar[key as keyof typeof t.sidebar] || currentItem.title
        setCurrentPageTitle(translatedTitle)
      } else if (pathname === "/syndic/profile") {
        setCurrentPageTitle(t.header.profile)
      }
    }
  }, [pathname, userData, language, t])

  useEffect(() => {
    setMobileOpen(false)
    setAnimate(false)
    const timer = setTimeout(() => { setAnimate(true) }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  const handleLogout = async () => {
    await logoutUser()
    router.push("/syndic/login")
  }

  if (!isDashboardPath) {
    return <>{children}</>
  }

  const sidebarItems = userData ? getSidebarItems(userData.role) : []

  const SidebarContent = ({ isMobileSidebar = false }: { isMobileSidebar?: boolean }) => (
    <>
      {!isMobileSidebar && (
        <Button variant="ghost" className={cn("w-full justify-center mb-3 h-auto py-2.5 text-white/60 hover:bg-white/10 hover:text-white border border-white/60 hover:border-white cursor-pointer transition-colors", collapsed ? "px-2" : "px-3")} onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}
      <div className="space-y-1">
        {sidebarItems.map((item) => (
          <SidebarNavItem key={item.path} item={item} pathname={pathname} collapsed={collapsed} isMobileSidebar={isMobileSidebar} />
        ))}
      </div>
    </>
  )

  return (
    <div className="flex h-screen flex-col md:flex-row bg-black overflow-hidden dashboard-layout max-h-screen">
      <aside className={cn("hidden md:flex md:flex-col bg-black text-white transition-all duration-300", collapsed ? "md:w-14" : "md:w-52")}>
        <div className="flex flex-col h-full p-2 pr-0">
          <div className={cn("flex justify-center items-center mb-6 mt-4", collapsed ? "px-2" : "px-3")}>
            <h2 className={cn("font-bold transition-all duration-300 text-white text-center", collapsed ? "text-xs" : "text-xl")}>
              {collapsed ? "O" : "Orsyndic"}
            </h2>
          </div>
          <div className="flex-1 flex flex-col min-h-0 overflow-x-hidden">
            <div className="relative flex-1 overflow-hidden">
              <div className="overflow-y-auto overflow-x-hidden hide-scrollbar h-full pb-4"><SidebarContent /></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
            </div>
            <UserProfileSection collapsed={collapsed} userData={userData} handleLogout={handleLogout} />
          </div>
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[80%] max-w-[300px] [&>button]:hidden bg-black text-white pr-2">
          <div className="flex flex-col h-full p-2">
            <div className="flex items-center justify-between mb-6 mt-4 px-3">
              <h2 className="text-xl font-semibold text-white">Orsyndic</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="text-white/60 hover:bg-white/10 hover:text-white cursor-pointer"><X className="h-5 w-5" /></Button>
            </div>
            <div className="flex-1 flex flex-col min-h-0 overflow-x-hidden">
              <div className="relative flex-1 overflow-hidden">
                <div className="overflow-y-auto overflow-x-hidden hide-scrollbar h-full pb-4"><SidebarContent isMobileSidebar={true} /></div>
              </div>
              <UserProfileSection collapsed={false} userData={userData} handleLogout={handleLogout} isMobileSidebar={true} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className={`flex flex-1 flex-col overflow-hidden bg-white transition-all duration-700 ease-out md:rounded-sm md:m-2 ${animate ? "opacity-100 scale-100 transform-none" : "opacity-0 scale-0 transform origin-center"}`}>
        <header className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-2.5 md:rounded-t-sm sticky top-0 z-10 min-h-[64px]">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="ghost" size="icon" className="md:hidden cursor-pointer" onClick={() => setMobileOpen(true)}><Menu className="h-5 w-5" /></Button>
            <h1 className="text-lg font-bold truncate hidden lg:block">{currentPageTitle}</h1>
          </div>
          <div className="flex-1 flex justify-center max-w-md mx-4">
          </div>
          <div className="flex items-center gap-1.5 flex-1 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 p-0 bg-neutral-100 hover:bg-primary/15 rounded-full cursor-pointer overflow-hidden border border-black/10 transition-colors">
                  <img src={currentLanguage.flag} alt={currentLanguage.name} className="h-full w-full object-cover" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1.5">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as DashboardLanguage)} className="flex items-center gap-2.5 cursor-pointer hover:bg-black/5 focus:bg-black/5 focus:text-black rounded-sm py-2 px-2.5 transition-colors">
                    <img src={lang.flag} alt={lang.name} className="h-5 w-5 object-cover rounded-full border border-black/10" />
                    <span className={cn("text-xs font-medium", currentLanguage.code === lang.code ? "text-primary font-bold" : "text-black")}>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>


          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 md:p-4 overscroll-none hide-scrollbar">{children}</main>
      </div>
    </div>
  )
}
