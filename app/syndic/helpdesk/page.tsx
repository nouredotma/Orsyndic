"use client"

import { useState } from "react"
import { TicketCheck, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { tickets as initialTickets } from "@/lib/mock-data"
import type { TicketStatus, Ticket } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { ImageLightbox } from "@/components/image-lightbox"

export default function HelpdeskPage() {
  const { t } = useI18n()
  const [localTickets, setLocalTickets] = useState<Ticket[]>(initialTickets)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | TicketStatus>("All")
  
  // Lightbox state
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; index: number }>({
    isOpen: false,
    images: [],
    index: 0
  })

  const filtered = localTickets.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || t.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const openLightbox = (images: string[], index: number = 0) => {
    setLightbox({ isOpen: true, images, index })
  }

  const handleUpdateStatus = (ticketId: string, newStatus: TicketStatus) => {
    setLocalTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t))
  }

  const openCount = localTickets.filter(t => t.status === "Open").length
  const inProgressCount = localTickets.filter(t => t.status === "In Progress").length
  const resolvedCount = localTickets.filter(t => t.status === "Resolved").length

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-[#FF0000]">{openCount}</p><p className="text-[10px] text-neutral-500">{t.helpdesk.open}</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-amber-600">{inProgressCount}</p><p className="text-[10px] text-neutral-500">{t.helpdesk.inProgress}</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-[#00D100]">{resolvedCount}</p><p className="text-[10px] text-neutral-500">{t.helpdesk.resolved}</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder={t.users.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-sm bg-neutral-100 border-none shadow-none text-sm" />
        </div>
        <div className="flex rounded-md bg-neutral-100 p-0.5 gap-0.5">
          {(["All", "Open", "In Progress", "Resolved"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer whitespace-nowrap", filterStatus === s ? "bg-white text-black shadow-sm" : "text-neutral-500")}>{s === "All" ? t.common.all : s === "Open" ? t.helpdesk.open : s === "In Progress" ? t.helpdesk.inProgress : t.helpdesk.resolved}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((ticket) => (
          <Card key={ticket.id} className="border-none bg-neutral-100 transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg shrink-0 bg-neutral-50">
                    <TicketCheck className="h-4 w-4 text-neutral-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{ticket.title}</p>
                      <Badge variant={ticket.status === "Open" ? "info" : ticket.status === "In Progress" ? "warning" : "success"} className="text-[10px] font-normal">{ticket.status}</Badge>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{ticket.description}</p>
                    
                    {/* Photos Preview */}
                    {(ticket.photos?.length || ticket.photo) && (
                      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                        {ticket.photos ? (
                          ticket.photos.map((p, idx) => (
                            <div 
                              key={idx} 
                              className="relative group w-16 h-16 rounded-sm overflow-hidden border border-black/5 shrink-0 cursor-pointer hover:border-primary/50 transition-all"
                              onClick={(e) => { e.stopPropagation(); openLightbox(ticket.photos!, idx) }}
                            >
                              <img src={p} alt={`Attached ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                          ))
                        ) : (
                          <div 
                            className="relative group w-16 h-16 rounded-sm overflow-hidden border border-black/5 shrink-0 cursor-pointer hover:border-primary/50 transition-all"
                            onClick={(e) => { e.stopPropagation(); openLightbox([ticket.photo!], 0) }}
                          >
                            <img src={ticket.photo} alt="Attached" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-2 text-[10px] text-neutral-400">
                      <span>{t.helpdesk.by} <strong className="text-neutral-600">{ticket.submittedBy}</strong> ({ticket.submittedByRole})</span>
                      <span>{t.charges.apt} {ticket.apartmentNumber} · {ticket.buildingName}</span>
                      <span>{ticket.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {ticket.status === "Open" && <Button variant="outline" size="sm" className="text-[10px] h-7 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleUpdateStatus(ticket.id, "In Progress") }}>Start</Button>}
                  {ticket.status === "In Progress" && <Button variant="outline" size="sm" className="text-[10px] h-7 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleUpdateStatus(ticket.id, "Resolved") }}>Resolve</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ImageLightbox 
        isOpen={lightbox.isOpen} 
        images={lightbox.images} 
        initialIndex={lightbox.index} 
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  )
}
