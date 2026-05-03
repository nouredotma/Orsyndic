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
  Camera,
  Check,
  X,
  ImageIcon,
} from "lucide-react"
import { useRef } from "react"
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
  chartConfig,
  buildings,
  managedUsers,
  apartments
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { ImageLightbox } from "@/components/image-lightbox"

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
  const { t } = useI18n()
  return (
    <Card className="border-none bg-neutral-100 lg:col-span-2 h-full flex flex-col">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{t.dashboard.admin.revenueOverview}</CardTitle>
          <CardDescription className="text-xs">{t.dashboard.admin.revenueDescription}</CardDescription>
        </div>
        <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)} className="w-auto">
          <TabsList className="h-8 bg-neutral-200 rounded-sm shadow-none">
            <TabsTrigger value="day" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">{t.dashboard.admin.day}</TabsTrigger>
            <TabsTrigger value="month" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">{t.dashboard.admin.month}</TabsTrigger>
            <TabsTrigger value="year" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">{t.dashboard.admin.year}</TabsTrigger>
            <TabsTrigger value="all" className="h-6 text-[10px] px-2.5 rounded-sm shadow-none data-[state=active]:shadow-none">{t.dashboard.admin.allTime}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart data={revenueDataSets[timeframe]} margin={{ top: 20, left: -12, right: 10, bottom: 0 }}>
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
              tickFormatter={(value) => `${value}`}
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
function AdminDashboard({ firstName, greeting, dateStr }: { firstName: string, greeting: string, dateStr: string }) {
  const { t } = useI18n()
  const [timeframe, setTimeframe] = useState<keyof typeof revenueDataSets>("year")
  const unpaidCharges = charges.filter(c => c.status === "Unpaid" || c.status === "Partial")
  const openTicketsCount = tickets.filter(t => t.status === "Open").length
  const totalBuildingsCount = buildings.length
  const totalApartmentsCount = apartments.length
  const activeUsersCount = managedUsers.filter(u => u.status === "Active").length
  const [buildingForm, setBuildingForm] = useState({ name: "", address: "", floors: "" })
  const [buildingAdded, setBuildingAdded] = useState(false)
  
  // Lightbox state
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; index: number }>({
    isOpen: false,
    images: [],
    index: 0
  })

  const openLightbox = (images: string[], index: number = 0) => {
    setLightbox({ isOpen: true, images, index })
  }

  const handleAddBuilding = () => {
    if (!buildingForm.name || !buildingForm.address || !buildingForm.floors) return
    setBuildingAdded(true)
    setBuildingForm({ name: "", address: "", floors: "" })
    setTimeout(() => setBuildingAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{greeting}, {firstName}!</h1>
          <p className="text-xs text-neutral-500">
            {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer text-sm h-9">
              <Plus className="h-4 w-4" />
              {t.dashboard.admin.addBuilding}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>{t.dashboard.admin.addBuilding}</DialogTitle>
              <DialogDescription>
                {t.dashboard.admin.registerBuilding}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label htmlFor="b-name" className="text-xs">{t.dashboard.admin.buildingName}</Label><Input id="b-name" placeholder="Résidence Al Andalous" className="bg-neutral-100 border-none rounded-sm" value={buildingForm.name} onChange={(e) => setBuildingForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div className="grid gap-2"><Label htmlFor="b-address" className="text-xs">{t.dashboard.admin.address}</Label><Input id="b-address" placeholder="12 Rue Mohammed V, Casablanca" className="bg-neutral-100 border-none rounded-sm" value={buildingForm.address} onChange={(e) => setBuildingForm(p => ({ ...p, address: e.target.value }))} /></div>
              <div className="grid gap-2"><Label htmlFor="b-floors" className="text-xs">{t.dashboard.admin.totalFloors}</Label><Input id="b-floors" type="number" placeholder="5" className="bg-neutral-100 border-none rounded-sm" value={buildingForm.floors} onChange={(e) => setBuildingForm(p => ({ ...p, floors: e.target.value }))} /></div>
            </div>
            <DialogFooter>
              <Button className="w-full cursor-pointer" onClick={handleAddBuilding}>{buildingAdded ? <><Check className="h-4 w-4 mr-1" />{t.common.added}</> : t.dashboard.admin.registerBuilding}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


      {/* Stats Cards */}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {[
          { ...adminStatsData[2], title: t.dashboard.admin.totalBuildings, value: totalBuildingsCount.toString() },
          { ...adminStatsData[3], title: t.dashboard.admin.totalApartments, value: totalApartmentsCount.toString() },
          { ...adminStatsData[4], title: t.dashboard.admin.activeUsers, value: activeUsersCount.toString() },
          { ...adminStatsData[0], title: t.dashboard.admin.unpaidCharges, value: unpaidCharges.length.toString() },
          { ...adminStatsData[1], title: t.dashboard.admin.latestTickets, value: openTicketsCount.toString() },
        ].map((stat) => {
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
                    {t.dashboard.admin.vsLastMonth}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Latest Tickets */}
        <Card className="border-none bg-neutral-100 lg:col-span-1 h-full flex flex-col">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">{t.dashboard.admin.latestTickets}</CardTitle>
            <CardDescription className="text-xs">
              {openTicketsCount} {t.dashboard.admin.openTicketsLabel}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-4 flex-1">
            <div className="h-[260px] overflow-y-auto pr-1 hide-scrollbar">
              <div className="space-y-2">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-start gap-3 py-1.5 border-b border-black/5 last:border-0">
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
                          {ticket.status === "Open" ? t.status.open : 
                           ticket.status === "In Progress" ? t.status.inProgress : t.status.resolved}
                        </Badge>
                      </div>
                      {/* Photos Preview */}
                      {(ticket.photos?.length || ticket.photo) && (
                        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
                          {ticket.photos ? (
                            ticket.photos.map((p, idx) => (
                              <div 
                                key={idx} 
                                className="relative group w-10 h-10 rounded-sm overflow-hidden border border-black/5 shrink-0 cursor-pointer hover:border-primary/50 transition-all"
                                onClick={(e) => { e.stopPropagation(); openLightbox(ticket.photos!, idx) }}
                              >
                                <img src={p} alt={`Attached ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              </div>
                            ))
                          ) : (
                            <div 
                              className="relative group w-10 h-10 rounded-sm overflow-hidden border border-black/5 shrink-0 cursor-pointer hover:border-primary/50 transition-all"
                              onClick={(e) => { e.stopPropagation(); openLightbox([ticket.photo!], 0) }}
                            >
                              <img src={ticket.photo} alt="Attached" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <ImageLightbox 
          isOpen={lightbox.isOpen} 
          images={lightbox.images} 
          initialIndex={lightbox.index} 
          onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))} 
        />
        
        {/* Revenue Chart */}
        <RevenueOverview timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Announcements */}
        <Card className="border-none bg-neutral-100 lg:col-span-2 h-full flex flex-col">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">{t.dashboard.admin.announcementsBoard}</CardTitle>
            <CardDescription className="text-xs">
              {t.common.recentUpdates}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-4">
            <div className="h-[240px] overflow-y-auto pr-1 hide-scrollbar">
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
                        {ann.urgent && <Badge variant="orange" className="text-[9px]">{t.status.urgent}</Badge>}
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2">{ann.content}</p>
                      <p className="text-[9px] text-neutral-400 mt-1">{ann.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unpaid Charges */}
        <Card className="border-none bg-black lg:col-span-1 h-full flex flex-col">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base text-white">{t.dashboard.admin.unpaidChargesTitle}</CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              {unpaidCharges.length} {t.dashboard.admin.chargesPending}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-4">
            <div className="h-[240px] overflow-y-auto pr-1 hide-scrollbar">
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
                        {charge.status === "Paid" ? t.status.paid :
                         charge.status === "Unpaid" ? t.status.unpaid : t.status.partial}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
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
function OwnerDashboard({ firstName, greeting, dateStr }: { firstName: string, greeting: string, dateStr: string }) {
  const { t } = useI18n()
  const [timeframe, setTimeframe] = useState<keyof typeof revenueDataSets>("year")
  const user = getCurrentUser()
  const building = buildings.find(b => b.id === user?.buildingId)
  const apartment = apartments.find(a => a.id === user?.apartmentId)
  const myCharges = charges.filter(c => c.apartmentId === user?.apartmentId)
  const unpaidTotal = myCharges.filter(c => c.status === "Unpaid" || c.status === "Partial").reduce((sum, c) => sum + c.amount, 0)
  const paidTotal = myCharges.filter(c => c.status === "Paid").reduce((sum, c) => sum + c.amount, 0)
  const [ticketForm, setTicketForm] = useState({ title: "", description: "" })
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitTicket = () => {
    if (!ticketForm.title || !ticketForm.description) return
    setTicketSubmitted(true)
    setTicketForm({ title: "", description: "" })
    setPhotoPreview(null)
    setTimeout(() => setTicketSubmitted(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{greeting}, {firstName}!</h1>
          <p className="text-xs text-neutral-500">
            {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
          </p>
        </div>
        <Dialog onOpenChange={(open) => { if (!open) { setPhotoPreview(null); setTicketForm({ title: "", description: "" }) } }}>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              {t.myTickets.newTicket}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>{t.myTickets.newTicket}</DialogTitle>
              <DialogDescription>
                {t.dashboard.owner.incidentDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label htmlFor="t-title" className="text-xs">{t.dashboard.owner.subject}</Label><Input id="t-title" placeholder="Elevator issue, Leakage, etc." className="bg-neutral-100 border-none rounded-sm" value={ticketForm.title} onChange={(e) => setTicketForm(p => ({ ...p, title: e.target.value }))} /></div>
              <div className="grid gap-2"><Label htmlFor="t-desc" className="text-xs">{t.dashboard.owner.description}</Label><Textarea id="t-desc" placeholder="Provide more details..." className="bg-neutral-100 border-none rounded-sm min-h-[100px]" value={ticketForm.description} onChange={(e) => setTicketForm(p => ({ ...p, description: e.target.value }))} /></div>
              
              <div className="grid gap-2">
                <Label className="text-xs">{t.myTickets.attachPhoto}</Label>
                <div className="flex items-center gap-3">
                  {photoPreview ? (
                    <div className="relative w-20 h-20 rounded-sm overflow-hidden border border-black/10">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={() => setPhotoPreview(null)} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 cursor-pointer">
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-20 h-20 border-dashed border-2 flex flex-col gap-1 cursor-pointer hover:bg-neutral-50" onClick={() => fileRef.current?.click()}>
                      <Camera className="h-5 w-5 text-neutral-400" />
                      <span className="text-[9px] text-neutral-400">{t.common.addPhoto}</span>
                    </Button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full cursor-pointer" onClick={handleSubmitTicket}>{ticketSubmitted ? <><Check className="h-4 w-4 mr-1" />{t.common.added}</> : t.myTickets.submit}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


      {/* Balance Cards */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">{t.dashboard.owner.outstanding}</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold text-[#FF0000]">{unpaidTotal} MAD</div>
            <p className="text-[10px] text-neutral-500 mt-0.5">{t.common.unpaidCharges}</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">{t.dashboard.owner.totalPaid}</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold text-[#00D100]">{paidTotal} MAD</div>
            <p className="text-[10px] text-neutral-500 mt-0.5">{t.common.thisYear}</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardHeader className="pb-1.5 pt-3.5 px-4">
            <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">{t.dashboard.owner.apartment}</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3.5">
            <div className="text-2xl font-bold">Apt {apartment?.number || user?.apartmentId?.split("-")[1] || "—"}</div>
            <p className="text-[10px] text-neutral-500 mt-0.5">{building?.name || "—"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <RevenueOverview timeframe={timeframe} setTimeframe={setTimeframe} />

        {/* Announcements for Owner */}
        <Card className="border-none bg-neutral-100 lg:col-span-1">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">{t.dashboard.admin.announcements}</CardTitle>
            <CardDescription className="text-xs">{t.common.recentUpdates}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-2">
            <div className="space-y-2">
              {announcements.filter(ann => ann.audience === "Both" || ann.audience === "Owners").slice(0, 3).map((ann) => (
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
                      {ann.urgent && <Badge variant="danger" className="text-[9px] py-0 h-3.5 px-1">{t.status.urgent}</Badge>}
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
function TenantDashboard({ firstName, greeting, dateStr }: { firstName: string, greeting: string, dateStr: string }) {
  const { t } = useI18n()
  const [complaintForm, setComplaintForm] = useState({ title: "", description: "" })
  const [complaintSubmitted, setComplaintSubmitted] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitComplaint = () => {
    if (!complaintForm.title || !complaintForm.description) return
    setComplaintSubmitted(true)
    setComplaintForm({ title: "", description: "" })
    setPhotoPreview(null)
    setTimeout(() => setComplaintSubmitted(false), 2000)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{greeting}, {firstName}!</h1>
          <p className="text-xs text-neutral-500">
            {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
          </p>
        </div>
        <Dialog onOpenChange={(open) => { if (!open) { setPhotoPreview(null); setComplaintForm({ title: "", description: "" }) } }}>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              {t.myTickets.newTicket}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>{t.myTickets.newTicket}</DialogTitle>
              <DialogDescription>
                {t.dashboard.tenant.complaintDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label htmlFor="tc-title" className="text-xs">{t.dashboard.tenant.subject}</Label><Input id="tc-title" placeholder="Noise complaint, Plumbing, etc." className="bg-neutral-100 border-none rounded-sm" value={complaintForm.title} onChange={(e) => setComplaintForm(p => ({ ...p, title: e.target.value }))} /></div>
              <div className="grid gap-2"><Label htmlFor="tc-desc" className="text-xs">{t.dashboard.tenant.details}</Label><Textarea id="tc-desc" placeholder="Describe the issue..." className="bg-neutral-100 border-none rounded-sm min-h-[100px]" value={complaintForm.description} onChange={(e) => setComplaintForm(p => ({ ...p, description: e.target.value }))} /></div>
              
              <div className="grid gap-2">
                <Label className="text-xs">{t.myTickets.attachPhoto}</Label>
                <div className="flex items-center gap-3">
                  {photoPreview ? (
                    <div className="relative w-20 h-20 rounded-sm overflow-hidden border border-black/10">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={() => setPhotoPreview(null)} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 cursor-pointer">
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-20 h-20 border-dashed border-2 flex flex-col gap-1 cursor-pointer hover:bg-neutral-50" onClick={() => fileRef.current?.click()}>
                      <Camera className="h-5 w-5 text-neutral-400" />
                      <span className="text-[9px] text-neutral-400">{t.common.addPhoto}</span>
                    </Button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full cursor-pointer" onClick={handleSubmitComplaint}>{complaintSubmitted ? <><Check className="h-4 w-4 mr-1" />{t.common.submitted}</> : t.myTickets.submit}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>


      {/* Announcements */}
      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">{t.dashboard.admin.announcements}</CardTitle>
          <CardDescription className="text-xs">{t.common.buildingNotices}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1 pb-2">
          <div className="space-y-2">
            {announcements.filter(ann => ann.audience === "Both" || ann.audience === "Tenants").map((ann) => (
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
                    {ann.urgent && <Badge variant="danger" className="text-[9px] py-0 h-3.5 px-1">{t.status.urgent}</Badge>}
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


// ========================
// MAIN DASHBOARD PAGE
// ========================
export default function DashboardPage() {
  const { t, language } = useI18n()
  const [mounted, setMounted] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    setMounted(true)
    setUser(getCurrentUser())
  }, [])

  if (!mounted) {
    return null // Or a loading skeleton
  }

  const firstName = user?.fullName.split(" ")[0] || "User"
  const hour = new Date().getHours()
  const greeting = hour < 12 ? t.dashboard.goodMorning : hour < 18 ? t.dashboard.goodAfternoon : t.dashboard.goodEvening
  const dateStr = new Date().toLocaleDateString(language === "en" ? "en-US" : language === "fr" ? "fr-FR" : "es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="flex flex-col gap-4">
      {user?.role === "Admin" && <AdminDashboard firstName={firstName} greeting={greeting} dateStr={dateStr} />}
      {user?.role === "Owner" && <OwnerDashboard firstName={firstName} greeting={greeting} dateStr={dateStr} />}
      {user?.role === "Tenant" && <TenantDashboard firstName={firstName} greeting={greeting} dateStr={dateStr} />}
    </div>
  )
}
