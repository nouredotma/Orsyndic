"use client"

import { useState, useEffect } from "react"
import { Search, MoreVertical, Pencil, Trash2, MessageSquare, Eye, RotateCcw, ChevronRight, ArrowLeft, X, TicketCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { tickets as initTickets } from "@/lib/mock-data"
import type { Ticket, TicketStatus, TicketNote } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { HelpdeskPageSkeleton } from "@/components/dashboard-skeletons"
import { ImageLightbox } from "@/components/image-lightbox"

export default function HelpdeskPage() {
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(true)
  const [localTickets, setLocalTickets] = useState<Ticket[]>(initTickets)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | TicketStatus>("All")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newNote, setNewNote] = useState("")

  // Delete state
  const [deleteTicketId, setDeleteTicketId] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Image lightbox
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; index: number }>({ isOpen: false, index: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <HelpdeskPageSkeleton />

  const filteredTickets = localTickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || ticket.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const openCount = localTickets.filter(t => t.status === "Open").length
  const inProgressCount = localTickets.filter(t => t.status === "In Progress").length
  const resolvedCount = localTickets.filter(t => t.status === "Resolved").length

  const handleStatusChange = (id: string, newStatus: TicketStatus) => {
    setLocalTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
    if (selectedTicket?.id === id) {
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null)
    }
  }

  const handleDelete = () => {
    if (!deleteTicketId) return
    setLocalTickets(prev => prev.filter(t => t.id !== deleteTicketId))
    if (selectedTicket?.id === deleteTicketId) setSelectedTicket(null)
    setIsDeleteOpen(false)
    setDeleteTicketId(null)
  }

  const handleAddNote = () => {
    if (!selectedTicket || !newNote.trim()) return
    const note: TicketNote = {
      id: `note-${Date.now()}`,
      text: newNote,
      createdAt: new Date().toISOString().split("T")[0],
      author: "Admin"
    }
    setLocalTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, notes: [...(t.notes || []), note] } : t))
    setSelectedTicket(prev => prev ? { ...prev, notes: [...(prev.notes || []), note] } : null)
    setNewNote("")
  }

  const getRoleLabel = (role: "Owner" | "Tenant") => role === "Owner" ? t.common.owner : t.common.tenant

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-amber-600">{openCount}</p><p className="text-[10px] text-neutral-500">{t.helpdesk.open}</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-blue-600">{inProgressCount}</p><p className="text-[10px] text-neutral-500">{t.helpdesk.inProgress}</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-emerald-600">{resolvedCount}</p><p className="text-[10px] text-neutral-500">{t.helpdesk.resolved}</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" /><Input placeholder={t.helpdesk.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-sm bg-neutral-100 border-none shadow-none text-sm" /></div>
        <div className="flex rounded-sm bg-neutral-100 p-0.5 gap-0.5">{(["All", "Open", "In Progress", "Resolved"] as const).map((s) => (<button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer", filterStatus === s ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-neutral-700")}>{s === "All" ? t.common.all : s === "Open" ? t.helpdesk.open : s === "In Progress" ? t.helpdesk.inProgress : t.helpdesk.resolved}</button>))}</div>
      </div>

      {selectedTicket ? (
        /* Ticket Detail View */
        <Card className="border-none bg-neutral-100">
          <CardHeader className="p-4 pb-2 border-b border-black/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-black/5 cursor-pointer" onClick={() => setSelectedTicket(null)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <CardTitle className="text-base">{selectedTicket.title}</CardTitle>
                  <CardDescription className="text-xs">{selectedTicket.id} · {selectedTicket.buildingName} · {t.charges.apt} {selectedTicket.apartmentNumber}</CardDescription>
                </div>
              </div>
              <Badge variant={selectedTicket.status === "Open" ? "warning" : selectedTicket.status === "In Progress" ? "default" : "success"} className="text-[10px]">
                {selectedTicket.status === "Open" ? t.helpdesk.open : selectedTicket.status === "In Progress" ? t.helpdesk.inProgress : t.helpdesk.resolved}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Submitted By */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.helpdesk.by}</h4>
                  <div className="flex items-center gap-3 p-3 rounded-sm bg-white border border-black/5">
                    <Avatar className="h-10 w-10 border border-black/5">
                      <AvatarImage src={selectedTicket.submittedByAvatar} />
                      <AvatarFallback className="bg-red-100 text-[#FF0000] font-bold">{selectedTicket.submittedBy.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{selectedTicket.submittedBy}</p>
                      <p className="text-[10px] text-neutral-500">{getRoleLabel(selectedTicket.submittedByRole)} · {selectedTicket.createdAt}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.announcements.content}</h4>
                  <div className="p-4 rounded-sm bg-white border border-black/5">
                    <p className="text-sm text-neutral-700 leading-relaxed">{selectedTicket.description}</p>
                  </div>
                </div>

                {/* Photos */}
                {selectedTicket.photos && selectedTicket.photos.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.helpdesk.photos}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedTicket.photos.map((photo, i) => (
                        <img
                          key={i}
                          src={photo}
                          alt={`Attachment ${i + 1}`}
                          className="w-full h-24 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity border border-black/5"
                          onClick={() => setLightbox({ isOpen: true, index: i })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {selectedTicket.status === "Open" && (
                    <Button size="sm" className="text-xs cursor-pointer" onClick={() => handleStatusChange(selectedTicket.id, "In Progress")}>{t.helpdesk.start}</Button>
                  )}
                  {selectedTicket.status === "In Progress" && (
                    <Button size="sm" className="text-xs cursor-pointer" onClick={() => handleStatusChange(selectedTicket.id, "Resolved")}>{t.helpdesk.resolve}</Button>
                  )}
                  {selectedTicket.status === "Resolved" && (
                    <Button size="sm" variant="outline" className="text-xs cursor-pointer border-none bg-white hover:bg-amber-50" onClick={() => handleStatusChange(selectedTicket.id, "Open")}>
                      <RotateCcw className="h-3 w-3 mr-1" />{t.helpdesk.reopen}
                    </Button>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.helpdesk.notes}</h4>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 hide-scrollbar">
                  {(selectedTicket.notes || []).length > 0 ? (
                    (selectedTicket.notes || []).map(note => (
                      <div key={note.id} className="p-3 rounded-sm bg-white border border-black/5">
                        <p className="text-sm text-neutral-700">{note.text}</p>
                        <p className="text-[9px] text-neutral-400 mt-1">{note.author} · {note.createdAt}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-white rounded-sm border border-dashed border-black/5">
                      <MessageSquare className="h-6 w-6 text-neutral-300 mx-auto mb-2" />
                      <p className="text-xs text-neutral-400">{t.helpdesk.notePlaceholder}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder={t.helpdesk.notePlaceholder}
                    className="bg-white border-black/5 rounded-sm text-sm min-h-[60px] resize-none"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                </div>
                <Button className="w-full cursor-pointer text-xs" size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                  <MessageSquare className="h-3 w-3 mr-1" />{t.helpdesk.addNote}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Ticket List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTickets.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-black/5 rounded-xl bg-neutral-50/50">
              <TicketCheck className="h-10 w-10 text-neutral-300 mb-3" />
              <p className="text-sm text-neutral-500 font-medium">{t.emptyStates.noTicketsFound}</p>
            </div>
          ) : filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="border-none bg-neutral-100 cursor-pointer hover:bg-neutral-200/60 transition-colors" onClick={() => setSelectedTicket(ticket)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border border-black/5 shrink-0">
                    <AvatarImage src={ticket.submittedByAvatar} />
                    <AvatarFallback className="bg-red-100 text-[#FF0000] text-[10px] font-bold">{ticket.submittedBy.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold truncate pr-2">{ticket.title}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer shrink-0 hover:bg-black/5">
                            <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedTicket(ticket) }} className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm">
                            <Eye className="h-3.5 w-3.5" />{t.helpdesk.ticketDetails}
                          </DropdownMenuItem>
                          {ticket.status === "Open" && (
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange(ticket.id, "In Progress") }} className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm">
                              <ChevronRight className="h-3.5 w-3.5" />{t.helpdesk.start}
                            </DropdownMenuItem>
                          )}
                          {ticket.status === "In Progress" && (
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange(ticket.id, "Resolved") }} className="cursor-pointer text-xs gap-2 py-2 text-emerald-600 hover:bg-primary/5 focus:bg-primary/5 focus:text-emerald-600 rounded-sm">
                              <ChevronRight className="h-3.5 w-3.5" />{t.helpdesk.resolve}
                            </DropdownMenuItem>
                          )}
                          {ticket.status === "Resolved" && (
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange(ticket.id, "Open") }} className="cursor-pointer text-xs gap-2 py-2 text-amber-600 hover:bg-primary/5 focus:bg-primary/5 focus:text-amber-600 rounded-sm">
                              <RotateCcw className="h-3.5 w-3.5" />{t.helpdesk.reopen}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-black/5" />
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDeleteTicketId(ticket.id); setIsDeleteOpen(true) }} className="cursor-pointer text-xs gap-2 py-2 text-red-500 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-500 rounded-sm">
                            <Trash2 className="h-3.5 w-3.5" />{t.helpdesk.deleteTicket}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-xs text-neutral-600 line-clamp-2 mb-2">{ticket.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-neutral-500">{t.helpdesk.by} {ticket.submittedBy}</span>
                        <span className="text-[10px] text-neutral-400">({getRoleLabel(ticket.submittedByRole)})</span>
                      </div>
                      <Badge variant={ticket.status === "Open" ? "warning" : ticket.status === "In Progress" ? "default" : "success"} className="text-[9px]">
                        {ticket.status === "Open" ? t.helpdesk.open : ticket.status === "In Progress" ? t.helpdesk.inProgress : t.helpdesk.resolved}
                      </Badge>
                    </div>
                    <p className="text-[9px] text-neutral-400 mt-1">{ticket.buildingName} · {t.charges.apt} {ticket.apartmentNumber} · {ticket.createdAt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-white border-none rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.helpdesk.deleteTicket}</AlertDialogTitle>
            <AlertDialogDescription>{t.helpdesk.confirmDeleteTicket}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-neutral-100 hover:bg-neutral-200 rounded-sm text-xs cursor-pointer">{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="border-none rounded-sm text-xs text-white cursor-pointer bg-red-600 hover:bg-red-700">{t.common.delete}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Lightbox */}
      <ImageLightbox 
        isOpen={lightbox.isOpen}
        images={selectedTicket?.photos || []}
        initialIndex={lightbox.index}
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  )
}
