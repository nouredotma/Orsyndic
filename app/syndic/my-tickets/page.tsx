"use client"

import { useState, useRef } from "react"
import { TicketCheck, Plus, Camera, X, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { tickets as initialTickets } from "@/lib/mock-data"
import type { Ticket, TicketPriority } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

export default function MyTicketsPage() {
  const { t } = useI18n()
  const user = getCurrentUser()
  const [localTickets, setLocalTickets] = useState<Ticket[]>(initialTickets)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const myTickets = localTickets.filter(t => t.submittedBy === user?.fullName)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!title || !description || !user) return
    const ticket: Ticket = {
      id: `TKT-${Date.now()}`,
      title,
      description,
      submittedBy: user.fullName,
      submittedByRole: user.role as "Owner" | "Tenant",
      buildingName: "Résidence Al Andalous",
      apartmentNumber: user.apartmentId?.split("-")[1] || "—",
      status: "Open",
      priority: "Medium" as TicketPriority,
      createdAt: new Date().toISOString().split("T")[0],
      photo: photoPreview || undefined,
      submittedByAvatar: user.avatar,
    }
    setLocalTickets(prev => [ticket, ...prev])
    setTitle(""); setDescription(""); setPhotoPreview(null); setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Button className="gap-2 cursor-pointer" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />{t.myTickets.newTicket}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-sm font-semibold">{t.myTickets.newTicket}</h3>
            <input type="text" placeholder={t.announcements.title} value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 text-sm rounded-sm border border-none bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-primary" />
            <textarea placeholder={t.announcements.content} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 text-sm rounded-sm border border-none bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            {photoPreview && (
              <div className="relative w-24 h-24 rounded-sm overflow-hidden border border-black/10">
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                <button onClick={() => { setPhotoPreview(null); if (fileRef.current) fileRef.current.value = "" }} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 cursor-pointer"><X className="h-3 w-3 text-white" /></button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              <Button variant="outline" size="sm" className="gap-1.5 text-xs cursor-pointer" onClick={() => fileRef.current?.click()}><Camera className="h-3.5 w-3.5" />{t.myTickets.attachPhoto}</Button>
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="text-xs cursor-pointer" onClick={() => { setShowForm(false); setTitle(""); setDescription(""); setPhotoPreview(null) }}>{t.myTickets.cancel}</Button>
              <Button size="sm" className="text-xs cursor-pointer" onClick={handleSubmit}>{t.myTickets.submit}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {myTickets.length === 0 ? (
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-8 text-center">
            <TicketCheck className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-500">{t.myTickets.noTickets}</p>
            <p className="text-xs text-neutral-400 mt-1">{t.myTickets.reportIssue}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {myTickets.map((ticket) => (
            <Card key={ticket.id} className="border-none bg-neutral-100 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-sm shrink-0", ticket.priority === "High" ? "bg-orange-50" : ticket.priority === "Medium" ? "bg-amber-50" : "bg-neutral-50")}>
                    <TicketCheck className={cn("h-4 w-4", ticket.priority === "High" ? "text-orange-600" : ticket.priority === "Medium" ? "text-amber-500" : "text-neutral-500")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{ticket.title}</p>
                      <Badge variant={ticket.status === "Open" ? "info" : ticket.status === "In Progress" ? "warning" : "success"} className="text-[10px]">{ticket.status}</Badge>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{ticket.description}</p>
                    {ticket.photo && (
                      <div className="mt-2 w-20 h-20 rounded-sm overflow-hidden border border-black/5">
                        <img src={ticket.photo} alt="Attached" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="text-[10px] text-neutral-400 mt-2">{ticket.createdAt} · {ticket.buildingName} · Apt {ticket.apartmentNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
