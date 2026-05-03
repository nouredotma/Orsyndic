"use client"

import { useState, useRef } from "react"
import { TicketCheck, Plus, Camera, X, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { tickets as initialTickets, buildings } from "@/lib/mock-data"
import type { Ticket } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { ImageLightbox } from "@/components/image-lightbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MyTicketsPage() {
  const { t } = useI18n()
  const user = getCurrentUser()
  const [localTickets, setLocalTickets] = useState<Ticket[]>(initialTickets)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  
  // Lightbox state
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; index: number }>({
    isOpen: false,
    images: [],
    index: 0
  })

  const openLightbox = (images: string[], index: number = 0) => {
    setLightbox({ isOpen: true, images, index })
  }

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
    const userBuilding = buildings.find(b => b.id === user.buildingId)
    const ticket: Ticket = {
      id: `TKT-${Date.now()}`,
      title,
      description,
      submittedBy: user.fullName,
      submittedByRole: user.role as "Owner" | "Tenant",
      buildingName: userBuilding?.name || "—",
      apartmentNumber: user.apartmentId?.split("-")[1] || "—",
      status: "Open",
      createdAt: new Date().toISOString().split("T")[0],
      photo: photoPreview || undefined,
      submittedByAvatar: user.avatar,
    }
    setLocalTickets(prev => [ticket, ...prev])
    setTitle(""); setDescription(""); setPhotoPreview(null); setShowForm(false)
  }

  const handleCloseForm = (open: boolean) => {
    if (!open) {
      setShowForm(false)
      setTitle("")
      setDescription("")
      setPhotoPreview(null)
    } else {
      setShowForm(true)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog open={showForm} onOpenChange={handleCloseForm}>
          <Button className="gap-2 cursor-pointer" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" />{t.myTickets.newTicket}
          </Button>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>{t.myTickets.newTicket}</DialogTitle>
              <DialogDescription>
                {t.myTickets.reportIssue}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="t-title" className="text-xs">{t.announcements.title}</Label>
                <Input 
                  id="t-title" 
                  placeholder="Elevator issue, Leakage, etc." 
                  className="bg-neutral-100 border-none rounded-sm" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="t-desc" className="text-xs">{t.announcements.content}</Label>
                <Textarea 
                  id="t-desc" 
                  placeholder="Provide more details..." 
                  className="bg-neutral-100 border-none rounded-sm min-h-[100px]" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </div>
              
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
              <Button className="w-full cursor-pointer" onClick={handleSubmit}>{t.myTickets.submit}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
                  <div className="p-2 rounded-sm shrink-0 bg-neutral-50">
                    <TicketCheck className="h-4 w-4 text-neutral-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{ticket.title}</p>
                      <Badge variant={ticket.status === "Open" ? "info" : ticket.status === "In Progress" ? "warning" : "success"} className="text-[10px]">{ticket.status === "Open" ? t.status.open : ticket.status === "In Progress" ? t.status.inProgress : t.status.resolved}</Badge>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{ticket.description}</p>
                    
                    {/* Photos Preview */}
                    {(ticket.photos?.length || ticket.photo) && (
                      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                        {ticket.photos ? (
                          ticket.photos.map((p, idx) => (
                            <div 
                              key={idx} 
                              className="relative group w-16 h-16 rounded-sm overflow-hidden border border-black/5 shrink-0 cursor-pointer hover:border-primary/50 transition-all"
                              onClick={() => openLightbox(ticket.photos!, idx)}
                            >
                              <img src={p} alt={`Attached ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                          ))
                        ) : (
                          <div 
                            className="relative group w-16 h-16 rounded-sm overflow-hidden border border-black/5 shrink-0 cursor-pointer hover:border-primary/50 transition-all"
                            onClick={() => openLightbox([ticket.photo!], 0)}
                          >
                            <img src={ticket.photo} alt="Attached" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Notes from Syndic */}
                    {ticket.notes && ticket.notes.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-black/5 pt-3">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.helpdesk.notes}</p>
                        {ticket.notes.map(note => (
                          <div key={note.id} className="p-2 rounded-sm bg-white/50 border border-black/5">
                            <p className="text-xs text-neutral-700">{note.text}</p>
                            <p className="text-[9px] text-neutral-400 mt-1">{note.author} · {note.createdAt}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-[10px] text-neutral-400 mt-3">{ticket.createdAt} · {ticket.buildingName} · {t.charges.apt} {ticket.apartmentNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ImageLightbox 
        isOpen={lightbox.isOpen} 
        images={lightbox.images} 
        initialIndex={lightbox.index} 
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  )
}
