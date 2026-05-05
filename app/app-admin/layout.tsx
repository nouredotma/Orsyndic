"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Home, LogOut, Menu, Users, X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface SidebarItem {
  title: string
  icon: React.ElementType
  path: string
  description: string
}

// App Admin pages
const adminSidebarItems: SidebarItem[] = [
  { title: "Dashboard", icon: Home, path: "/app-admin/dashboard", description: "Platform overview" },
  { title: "Syndics", icon: Users, path: "/app-admin/syndics", description: "Manage registered syndics" },
]

const SidebarNavItem = ({ item, pathname, collapsed, isMobileSidebar }: { item: SidebarItem; pathname: string; collapsed: boolean; isMobileSidebar: boolean }) => {
  const isActive = pathname === item.path || pathname.startsWith(item.path + "/")

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
        {(!collapsed || isMobileSidebar) && <span>{item.title}</span>}
        {collapsed && !isMobileSidebar && <span className="sr-only">{item.title}</span>}
      </Button>
    </Link>
  )
}

const UserProfileSection = ({ collapsed, handleLogout, isMobileSidebar = false }: { collapsed: boolean; handleLogout: () => void; isMobileSidebar?: boolean }) => {
  return (
    <div className={cn("mt-auto pb-1", isMobileSidebar ? "px-0" : "px-0")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={cn("w-full justify-start h-auto py-2 hover:bg-white/10 cursor-pointer focus-visible:ring-0 border-none px-2 text-white", collapsed && !isMobileSidebar ? "justify-center" : "gap-3")}>
            <Avatar className="h-9 w-9 border border-white/10 bg-primary/20">
              <AvatarFallback className="text-primary font-bold text-sm">A</AvatarFallback>
            </Avatar>
            {(!collapsed || isMobileSidebar) && (
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="text-sm font-semibold truncate w-full text-white">App Admin</span>
                <span className="text-xs text-white/50 truncate w-full">Super Administrator</span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-[12.5rem] mb-2 bg-white border-none shadow-lg rounded-sm p-1.5">
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 focus:text-red-600 focus:bg-red-50 rounded-sm py-2.5 transition-colors flex items-center gap-2.5">
            <LogOut className="h-4.5 w-4.5 text-red-500" />
            <span className="text-sm font-semibold">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default function AppAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentPageTitle, setCurrentPageTitle] = useState("")
  const [animate, setAnimate] = useState(false)
  
  const isAuthPage = pathname === "/app-admin/login"
  const isDashboardPath = pathname?.startsWith("/app-admin") && !isAuthPage

  useEffect(() => {
    // Simple mock auth check for app admin
    if (typeof window !== "undefined") {
      const isAppAdmin = localStorage.getItem("isAppAdmin") === "true"
      if (isDashboardPath && !isAppAdmin) {
        router.push("/app-admin/login")
      } else if (isAuthPage && isAppAdmin) {
        router.push("/app-admin/dashboard")
      }
    }
  }, [pathname, router, isAuthPage, isDashboardPath])

  useEffect(() => {
    const currentItem = adminSidebarItems.find((item) => pathname.startsWith(item.path))
    if (currentItem) {
      setCurrentPageTitle(currentItem.title)
    }
  }, [pathname])

  useEffect(() => {
    setMobileOpen(false)
    setAnimate(false)
    const timer = setTimeout(() => { setAnimate(true) }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      await supabase.auth.signOut()
      localStorage.removeItem("isAppAdmin")
      router.push("/app-admin/login")
    }
  }

  if (!isDashboardPath) {
    return <>{children}</>
  }

  const SidebarContent = ({ isMobileSidebar = false }: { isMobileSidebar?: boolean }) => (
    <>
      {!isMobileSidebar && (
        <Button variant="ghost" className={cn("w-full justify-center mb-3 h-auto py-2.5 text-white/60 hover:bg-white/10 hover:text-white border border-white/60 hover:border-white cursor-pointer transition-colors", collapsed ? "px-2" : "px-3")} onClick={() => setCollapsed(!collapsed)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}
      <div className="space-y-1">
        {adminSidebarItems.map((item) => (
          <SidebarNavItem key={item.path} item={item} pathname={pathname} collapsed={collapsed} isMobileSidebar={isMobileSidebar} />
        ))}
      </div>
    </>
  )

  // Prevent flash of content before redirect
  if (typeof window !== "undefined" && localStorage.getItem("isAppAdmin") !== "true") {
    return null
  }

  return (
    <div className="flex h-screen flex-col md:flex-row bg-black overflow-hidden dashboard-layout max-h-screen">
      <aside className={cn("hidden md:flex md:flex-col bg-black text-white transition-all duration-300", collapsed ? "md:w-14" : "md:w-52")}>
        <div className="flex flex-col h-full p-2 pr-0">
          <div className={cn("flex justify-center items-center mb-6 mt-4", collapsed ? "px-2" : "px-3")}>
            <h2 className={cn("font-bold transition-all duration-300 text-white text-center", collapsed ? "text-xs" : "text-xl")}>
              {collapsed ? "OA" : "Orsyndic Admin"}
            </h2>
          </div>
          <div className="flex-1 flex flex-col min-h-0 overflow-x-hidden">
            <div className="relative flex-1 overflow-hidden">
              <div className="overflow-y-auto overflow-x-hidden hide-scrollbar h-full pb-4"><SidebarContent /></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
            </div>
            <UserProfileSection collapsed={collapsed} handleLogout={handleLogout} />
          </div>
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[80%] max-w-[300px] [&>button]:hidden bg-black text-white pr-2">
          <div className="flex flex-col h-full p-2">
            <div className="flex items-center justify-between mb-6 mt-4 px-3">
              <h2 className="text-xl font-semibold text-white">Orsyndic Admin</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="text-white/60 hover:bg-white/10 hover:text-white cursor-pointer"><X className="h-5 w-5" /></Button>
            </div>
            <div className="flex-1 flex flex-col min-h-0 overflow-x-hidden">
              <div className="relative flex-1 overflow-hidden">
                <div className="overflow-y-auto overflow-x-hidden hide-scrollbar h-full pb-4"><SidebarContent isMobileSidebar={true} /></div>
              </div>
              <UserProfileSection collapsed={false} handleLogout={handleLogout} isMobileSidebar={true} />
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
        </header>

        <main className="flex-1 overflow-y-auto p-3 md:p-4 overscroll-none hide-scrollbar">{children}</main>
      </div>
    </div>
  )
}
