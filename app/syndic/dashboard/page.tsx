"use client"

import * as React from "react"
import { useState } from "react"
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
  Plus,
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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { getCurrentUser } from "@/lib/auth"
import type { UserRole } from "@/lib/auth"
import {
  adminStatsData,
  charges,
  tickets,
  announcements,
  revenueDataSets,
  chartConfig
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
// SHARED COMPONENTS
// ========================
function RevenueOverview({ timeframe, setTimeframe }: { 
  timeframe: keyof typeof revenueDataSets, 
  setTimeframe: (v: keyof typeof revenueDataSets) => void 
}) {
  return (
    <Card className="border-none bg-neutral-100 lg:col-span-2">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Revenue Overview</CardTitle>
          <CardDescription className="text-xs">Revenue statistics for the selected period</CardDescription>
        </div>
        <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)} className="w-auto">
          <TabsList className="h-8 bg-neutral-200 rounded-sm shadow-none">
            <TabsTrigger value="day" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">Day</TabsTrigger>
            <TabsTrigger value="month" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">Month</TabsTrigger>
            <TabsTrigger value="year" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">Year</TabsTrigger>
            <TabsTrigger value="all" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={revenueDataSets[timeframe]} margin={{ top: 20, left: -20, right: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              dataKey="label" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8}
              className="text-[10px]"
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8}
              className="text-[10px]"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="url(#fillRevenue)"
              fillOpacity={1}
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-revenue)", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// ========================
// ADMIN DASHBOARD
// ========================
function AdminDashboard({ firstName }: { firstName: string }) {
  const [timeframe, setTimeframe] = useState<keyof typeof revenueDataSets>("year")
  const unpaidCharges = charges.filter(c => c.status === "Unpaid" || c.status === "Partial")
  const openTickets = tickets.filter(t => t.status === "Open" || t.status === "In Progress")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">Welcome, {firstName}!</h2>
          <p className="text-xs text-neutral-500">Here's what's happening in your properties today.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer text-sm h-9">
              <Plus className="h-4 w-4" />
              Add Building
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>Add New Building</DialogTitle>
              <DialogDescription>
                Register a new building in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="b-name" className="text-xs">Building Name</Label>
                <Input id="b-name" placeholder="Résidence Al Andalous" className="bg-neutral-100 border-none rounded-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="b-address" className="text-xs">Address</Label>
                <Input id="b-address" placeholder="12 Rue Mohammed V, Casablanca" className="bg-neutral-100 border-none rounded-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="b-floors" className="text-xs">Total Floors</Label>
                <Input id="b-floors" type="number" placeholder="5" className="bg-neutral-100 border-none rounded-sm" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer">Register Building</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


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
                    <ArrowUpRight className="h-3 w-3 text-[#00D100]" />
                  ) : stat.trend === "down" ? (
                    <ArrowDownRight className="h-3 w-3 text-[#FF0000]" />
                  ) : null}
                  <span className={cn(
                    "text-[10px] font-semibold",
                    stat.trend === "up" ? "text-[#00D100]" : stat.trend === "down" ? "text-[#FF0000]" : "text-neutral-500"
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
        {/* Latest Tickets */}
        <Card className="border-none bg-neutral-100 lg:col-span-1">
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
                    <AvatarFallback className="bg-red-100 text-[#FF0000] text-[10px] font-bold">
                      {ticket.submittedBy.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-none truncate">{ticket.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-neutral-500">{ticket.submittedBy}</p>
                      <Badge variant={
                        ticket.status === "Open" ? "info" :
                        ticket.status === "In Progress" ? "warning" : "success"
                      } className="text-[9px]">
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Revenue Chart */}
        <RevenueOverview timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Announcements */}
        <Card className="border-none bg-neutral-100 lg:col-span-2">
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
                    ann.urgent ? "bg-red-100 text-[#FF0000]" : "bg-blue-100 text-blue-600"
                  )}>
                    {ann.urgent ? <AlertTriangle className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold">{ann.title}</p>
                      {ann.urgent && <Badge variant="orange" className="text-[9px]">Urgent</Badge>}
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2">{ann.content}</p>
                    <p className="text-[9px] text-neutral-400 mt-1">{ann.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unpaid Charges */}
        <Card className="border-none bg-black lg:col-span-1">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base text-white">Unpaid Charges</CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              {unpaidCharges.length} charges pending payment
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-2">
            <div className="space-y-2">
              {unpaidCharges.map((charge) => (
                <div key={charge.id} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Avatar className="h-8 w-8 border border-white/10 shrink-0">
                      <AvatarImage src={charge.ownerAvatar} alt={charge.ownerName} />
                      <AvatarFallback className="bg-white/10 text-white text-[10px] font-bold">
                        {charge.ownerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-semibold text-white truncate">{charge.ownerName}</p>
                      <p className="text-[10px] text-neutral-400 truncate">Apt {charge.apartmentNumber} · {charge.buildingName}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-white">{charge.amount} MAD</p>
                    <Badge className={cn(
                      "text-[9px] border-none text-white",
                      charge.status === "Partial" ? "bg-amber-600" : "bg-[#FF0000]"
                    )}>
                      {charge.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ========================
// OWNER DASHBOARD
// ========================
function OwnerDashboard({ firstName }: { firstName: string }) {
  const [timeframe, setTimeframe] = useState<keyof typeof revenueDataSets>("year")
  const user = getCurrentUser()
  const myCharges = charges.filter(c => c.apartmentId === user?.apartmentId)
  const unpaidTotal = myCharges.filter(c => c.status === "Unpaid" || c.status === "Partial").reduce((sum, c) => sum + c.amount, 0)
  const paidTotal = myCharges.filter(c => c.status === "Paid").reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">Hello, {firstName}!</h2>
          <p className="text-xs text-neutral-500">You have {unpaidTotal > 0 ? "some pending charges" : "no pending charges"}.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              Report Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>Submit New Ticket</DialogTitle>
              <DialogDescription>
                Describe the issue you're facing and we'll look into it.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="t-title" className="text-xs">Subject</Label>
                <Input id="t-title" placeholder="Elevator issue, Leakage, etc." className="bg-neutral-100 border-none rounded-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="t-priority" className="text-xs">Priority</Label>
                <Select>
                  <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-none shadow-lg">
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="t-desc" className="text-xs">Description</Label>
                <Textarea id="t-desc" placeholder="Provide more details..." className="bg-neutral-100 border-none rounded-sm min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer">Submit Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


      {/* Balance Cards */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Outstanding Balance</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold text-[#FF0000]">{unpaidTotal} MAD</div>
            <p className="text-[10px] text-neutral-500 mt-0.5">Unpaid charges</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Total Paid</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold text-[#00D100]">{paidTotal} MAD</div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <RevenueOverview timeframe={timeframe} setTimeframe={setTimeframe} />

        {/* Announcements for Owner */}
        <Card className="border-none bg-neutral-100 lg:col-span-1">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Latest Announcements</CardTitle>
            <CardDescription className="text-xs">Stay updated with building notices</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-2">
            <div className="space-y-2">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="flex items-start gap-3 py-2 border-b border-black/5 last:border-0">
                  <div className={cn(
                    "p-1.5 rounded-full shrink-0",
                    ann.urgent ? "bg-red-100 text-[#FF0000]" : "bg-blue-100 text-blue-600"
                  )}>
                    {ann.urgent ? <AlertTriangle className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold">{ann.title}</p>
                      {ann.urgent && <Badge variant="danger" className="text-[9px] py-0 h-3.5 px-1">Urgent</Badge>}
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
    </div>
  )
}

// ========================
// TENANT DASHBOARD
// ========================
function TenantDashboard({ firstName }: { firstName: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">Hello, {firstName}!</h2>
          <p className="text-xs text-neutral-500">Welcome to your dashboard.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              Submit Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>New Complaint</DialogTitle>
              <DialogDescription>
                We're here to help you with any issues in your apartment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tc-title" className="text-xs">Subject</Label>
                <Input id="tc-title" placeholder="Noise complaint, Plumbing, etc." className="bg-neutral-100 border-none rounded-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tc-desc" className="text-xs">Details</Label>
                <Textarea id="tc-desc" placeholder="Describe the issue..." className="bg-neutral-100 border-none rounded-sm min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer">Submit Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


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
                  ann.urgent ? "bg-red-100 text-[#FF0000]" : "bg-blue-100 text-blue-600"
                )}>
                  {ann.urgent ? <AlertTriangle className="h-3.5 w-3.5" /> : <Megaphone className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">{ann.title}</p>
                    {ann.urgent && <Badge variant="danger" className="text-[9px] py-0 h-3.5 px-1">Urgent</Badge>}
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
