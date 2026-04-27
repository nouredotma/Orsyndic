"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CreditCard,
  DoorOpen,
  TicketCheck,
  Users,
  Activity,
  Megaphone,
  AlertTriangle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getCurrentUser } from "@/lib/auth"
import type { UserRole } from "@/lib/auth"
import {
  adminStatsData,
  charges,
  tickets,
  announcements,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, any> = {
  CreditCard,
  TicketCheck,
  Building2,
  DoorOpen,
  Users,
}

// ========================
// ADMIN DASHBOARD
// ========================
function AdminDashboard({ firstName }: { firstName: string }) {
  const unpaidCharges = charges.filter(c => c.status === "Unpaid" || c.status === "Partial")
  const openTickets = tickets.filter(t => t.status === "Open" || t.status === "In Progress")

  return (
    <div className="flex flex-col gap-4">


      {/* Stats Cards */}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {adminStatsData.map((stat) => {
          const Icon = iconMap[stat.iconName] || Activity
          return (
            <Card key={stat.title} className="overflow-hidden border-none bg-neutral-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3.5 px-2">
                <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div className="p-1.5 bg-primary/10 rounded-sm">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-3.5">
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  ) : stat.trend === "down" ? (
                    <ArrowDownRight className="h-3 w-3 text-rose-500" />
                  ) : null}
                  <span className={cn(
                    "text-[10px] font-semibold",
                    stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-rose-500" : "text-neutral-500"
                  )}>
                    {stat.trendValue}
                  </span>
                  <span className="text-[10px] text-neutral-500 ml-0.5">
                    vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Unpaid Charges */}
        <Card className="border-none bg-neutral-100 lg:col-span-2">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Unpaid Charges</CardTitle>
            <CardDescription className="text-xs">
              {unpaidCharges.length} charges pending payment
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-2">
            <div className="space-y-2">
              {unpaidCharges.map((charge) => (
                <div key={charge.id} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-black/5">
                      <AvatarImage src={charge.ownerAvatar} alt={charge.ownerName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                        {charge.ownerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-semibold">{charge.ownerName}</p>
                      <p className="text-[10px] text-neutral-500">Apt {charge.apartmentNumber} · {charge.buildingName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{charge.amount} MAD</p>
                    <Badge variant={charge.status === "Partial" ? "secondary" : "destructive"} className="text-[9px] py-0 h-4 px-1.5">
                      {charge.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Tickets */}
        <Card className="border-none bg-neutral-100">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Latest Tickets</CardTitle>
            <CardDescription className="text-xs">
              {openTickets.length} open tickets
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-2">
            <div className="space-y-2">
              {tickets.slice(0, 4).map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-3 py-1.5">
                  <Avatar className="h-8 w-8 border border-black/5 shrink-0">
                    <AvatarImage src={ticket.submittedByAvatar} alt={ticket.submittedBy} />
                    <AvatarFallback className="bg-neutral-200 text-neutral-600 text-[10px] font-bold">
                      {ticket.submittedBy.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-none truncate">{ticket.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-neutral-500">{ticket.submittedBy}</p>
                      <Badge variant={
                        ticket.status === "Open" ? "destructive" :
                        ticket.status === "In Progress" ? "secondary" : "default"
                      } className="text-[9px] py-0 h-3.5 px-1">
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Announcements Board</CardTitle>
          <CardDescription className="text-xs">
            Recent notices posted to all residents
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1 pb-2">
          <div className="space-y-2">
            {announcements.map((ann) => (
              <div key={ann.id} className="flex items-start gap-3 py-2 border-b border-black/5 last:border-0">
                <div className={cn(
                  "p-1.5 rounded-full shrink-0",
                  ann.urgent ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                )}>
                  {ann.urgent ? <AlertTriangle className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">{ann.title}</p>
                    {ann.urgent && <Badge variant="destructive" className="text-[9px] py-0 h-3.5 px-1">Urgent</Badge>}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2">{ann.content}</p>
                  <p className="text-[9px] text-neutral-400 mt-1">{ann.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========================
// OWNER DASHBOARD
// ========================
function OwnerDashboard({ firstName }: { firstName: string }) {
  const user = getCurrentUser()
  const myCharges = charges.filter(c => c.apartmentId === user?.apartmentId)
  const unpaidTotal = myCharges.filter(c => c.status === "Unpaid" || c.status === "Partial").reduce((sum, c) => sum + c.amount, 0)
  const paidTotal = myCharges.filter(c => c.status === "Paid").reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="flex flex-col gap-4">


      {/* Balance Cards */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold text-rose-600">{unpaidTotal} MAD</div>
            <p className="text-[10px] text-neutral-500 mt-0.5">Unpaid charges</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Total Paid</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold text-emerald-600">{paidTotal} MAD</div>
            <p className="text-[10px] text-neutral-500 mt-0.5">This year</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">My Apartment</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold">Apt {user?.apartmentId?.split("-")[1] || "—"}</div>
            <p className="text-[10px] text-neutral-500 mt-0.5">Résidence Al Andalous</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements for Owner */}
      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Latest Announcements</CardTitle>
          <CardDescription className="text-xs">Stay updated with building notices</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1 pb-2">
          <div className="space-y-2">
            {announcements.map((ann) => (
              <div key={ann.id} className="flex items-start gap-3 py-2 border-b border-black/5 last:border-0">
                <div className={cn(
                  "p-1.5 rounded-full shrink-0",
                  ann.urgent ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                )}>
                  {ann.urgent ? <AlertTriangle className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">{ann.title}</p>
                    {ann.urgent && <Badge variant="destructive" className="text-[9px] py-0 h-3.5 px-1">Urgent</Badge>}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2">{ann.content}</p>
                  <p className="text-[9px] text-neutral-400 mt-1">{ann.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========================
// TENANT DASHBOARD
// ========================
function TenantDashboard({ firstName }: { firstName: string }) {
  return (
    <div className="flex flex-col gap-4">


      {/* Announcements */}
      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Announcements</CardTitle>
          <CardDescription className="text-xs">Building notices and updates</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1 pb-2">
          <div className="space-y-2">
            {announcements.map((ann) => (
              <div key={ann.id} className="flex items-start gap-3 py-2 border-b border-black/5 last:border-0">
                <div className={cn(
                  "p-1.5 rounded-full shrink-0",
                  ann.urgent ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                )}>
                  {ann.urgent ? <AlertTriangle className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">{ann.title}</p>
                    {ann.urgent && <Badge variant="destructive" className="text-[9px] py-0 h-3.5 px-1">Urgent</Badge>}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2">{ann.content}</p>
                  <p className="text-[9px] text-neutral-400 mt-1">{ann.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ========================
// HELPERS
// ========================
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

// ========================
// MAIN DASHBOARD PAGE
// ========================
export default function DashboardPage() {
  const [userRole, setUserRole] = React.useState<UserRole | null>(null)
  const [firstName, setFirstName] = React.useState("User")

  React.useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setUserRole(user.role)
      setFirstName(user.fullName.split(" ")[0])
    }
  }, [])

  if (!userRole) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-neutral-400 text-sm">Loading dashboard...</div>
      </div>
    )
  }

  switch (userRole) {
    case "Admin":
      return <AdminDashboard firstName={firstName} />
    case "Owner":
      return <OwnerDashboard firstName={firstName} />
    case "Tenant":
      return <TenantDashboard firstName={firstName} />
    default:
      return null
  }
}
