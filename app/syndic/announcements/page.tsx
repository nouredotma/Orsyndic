"use client"

import { useState, useEffect } from "react"
import { Megaphone, Plus, AlertTriangle, MoreVertical, Pencil, Trash2, Check, ChevronsUpDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { announcements as initialAnnouncements, buildings } from "@/lib/mock-data"
import type { Announcement } from "@/lib/mock-data"
import { getCurrentUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { AnnouncementsPageSkeleton } from "@/components/dashboard-skeletons"

export default function AnnouncementsPage() {
  const { t } = useI18n()
  const user = getCurrentUser()
  const isAdmin = user?.role === "Admin"
  const [isLoading, setIsLoading] = useState(true)
  const [localAnnouncements, setLocalAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  
  // Create state
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [urgent, setUrgent] = useState(false)
  const [audience, setAudience] = useState<Announcement["audience"]>("Both")
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>([])

  // Edit state
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editUrgent, setEditUrgent] = useState(false)
  const [editAudience, setEditAudience] = useState<Announcement["audience"]>("Both")
  const [editSelectedBuildings, setEditSelectedBuildings] = useState<string[]>([])

  // Delete state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<Announcement | null>(null)

  const handlePost = () => {
    if (!title || !content) return
    const ann: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      createdAt: new Date().toISOString().split("T")[0],
      urgent,
      createdBy: "Admin",
      audience,
      buildingIds: selectedBuildings,
    }
    setLocalAnnouncements(prev => [ann, ...prev])
    setTitle(""); setContent(""); setUrgent(false); setAudience("Both"); setSelectedBuildings([]); setIsOpen(false)
  }

  const handleOpenEdit = (ann: Announcement) => {
    setEditingAnn(ann)
    setEditTitle(ann.title)
    setEditContent(ann.content)
    setEditUrgent(ann.urgent)
    setEditAudience(ann.audience)
    setEditSelectedBuildings(ann.buildingIds || [])
    setIsEditOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editingAnn || !editTitle || !editContent) return
    setLocalAnnouncements(p => p.map(a => a.id === editingAnn.id ? { ...a, title: editTitle, content: editContent, urgent: editUrgent, audience: editAudience, buildingIds: editSelectedBuildings } : a))
    setIsEditOpen(false); setEditingAnn(null)
  }

  const handleDeleteClick = (ann: Announcement) => {
    setPendingDelete(ann)
    setIsConfirmOpen(true)
  }

  const executeDelete = () => {
    if (!pendingDelete) return
    setLocalAnnouncements(p => p.filter(a => a.id !== pendingDelete.id))
    setIsConfirmOpen(false); setPendingDelete(null)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <AnnouncementsPageSkeleton />

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        {isAdmin && (
          <Dialog open={isOpen} onOpenChange={(o) => { setIsOpen(o); if (!o) { setTitle(""); setContent(""); setUrgent(false); setAudience("Both"); setSelectedBuildings([]) } }}>
            <DialogTrigger asChild>
              <Button className="gap-2 cursor-pointer"><Plus className="h-4 w-4" />{t.announcements.newAnnouncement}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
              <DialogHeader><DialogTitle>{t.announcements.newAnnouncement}</DialogTitle><DialogDescription>{t.common.buildingNotices}</DialogDescription></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2"><Label htmlFor="title" className="text-xs">{t.announcements.title}</Label><Input id="title" placeholder={t.announcements.title} className="bg-neutral-100 border-none rounded-sm" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div className="grid gap-2"><Label htmlFor="content" className="text-xs">{t.announcements.content}</Label><Textarea id="content" placeholder={t.announcements.content} className="bg-neutral-100 border-none rounded-sm min-h-[100px]" value={content} onChange={(e) => setContent(e.target.value)} /></div>
                <div className="grid gap-2"><Label className="text-xs">{t.announcements.audience}</Label>
                  <Select value={audience} onValueChange={(v) => setAudience(v as Announcement["audience"])}>
                    <SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.announcements.selectAudience} /></SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-lg">
                      <SelectItem value="Both">{t.common.all}</SelectItem>
                      <SelectItem value="Owners">{t.users.owners}</SelectItem>
                      <SelectItem value="Tenants">{t.users.tenants}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">{t.announcements.buildings}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between bg-neutral-100 border-none rounded-sm font-normal h-10 px-3 hover:bg-neutral-200 hover:text-neutral-900 cursor-pointer">
                        <span className="truncate">
                          {selectedBuildings.length === 0 
                            ? t.announcements.selectBuildings 
                            : selectedBuildings.length === buildings.length 
                              ? t.common.all 
                              : `${selectedBuildings.length} ${t.documents.filesCount}`}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border-none shadow-lg rounded-sm" align="start">
                      <div className="p-2 space-y-1">
                        <div 
                          className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-neutral-100 cursor-pointer"
                          onClick={() => {
                            if (selectedBuildings.length === buildings.length) {
                              setSelectedBuildings([])
                            } else {
                              setSelectedBuildings(buildings.map(b => b.id))
                            }
                          }}
                        >
                          <Checkbox checked={selectedBuildings.length === buildings.length} className="border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                          <span className="text-sm font-medium">{t.common.all}</span>
                        </div>
                        <div className="h-px bg-neutral-100 my-1" />
                        {buildings.map((building) => (
                          <div 
                            key={building.id}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-neutral-100 cursor-pointer"
                            onClick={() => {
                              setSelectedBuildings(prev => 
                                prev.includes(building.id) 
                                  ? prev.filter(id => id !== building.id) 
                                  : [...prev, building.id]
                              )
                            }}
                          >
                            <Checkbox checked={selectedBuildings.includes(building.id)} className="border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            <span className="text-sm">{building.name}</span>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1 cursor-pointer" onClick={() => setUrgent(!urgent)}>
                    <Label htmlFor="urgent" className="text-sm font-medium cursor-pointer">{t.announcements.urgent}</Label>
                    <span className="text-xs text-neutral-500 cursor-pointer">{t.announcements.urgentDescription}</span>
                  </div>
                  <Switch id="urgent" checked={urgent} onCheckedChange={setUrgent} className="cursor-pointer" />
                </div>
              </div>
              <DialogFooter><Button className="w-full cursor-pointer" onClick={handlePost}>{t.announcements.postAnnouncement}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-3">
        {(() => {
          const filtered = localAnnouncements.filter(ann => {
            if (isAdmin) return true
            const user = getCurrentUser()
            const matchesAudience = user?.role === "Owner" ? (ann.audience === "Both" || ann.audience === "Owners") : (ann.audience === "Both" || ann.audience === "Tenants")
            const matchesBuilding = !ann.buildingIds || ann.buildingIds.length === 0 || (user?.buildingId && ann.buildingIds.includes(user.buildingId))
            return matchesAudience && matchesBuilding
          })
          return filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-black/5 rounded-xl bg-neutral-50/50">
              <Megaphone className="h-10 w-10 text-neutral-300 mb-3" />
              <p className="text-sm text-neutral-500 font-medium">{t.emptyStates.noAnnouncementsPosted}</p>
            </div>
          ) : filtered.map((ann) => (
          <Card key={ann.id} className={cn("border-none bg-neutral-100 overflow-hidden", ann.urgent && "border-red-200")}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg shrink-0", ann.urgent ? "bg-red-50" : "bg-blue-50")}>
                  {ann.urgent ? <AlertTriangle className="h-4 w-4 text-[#FF0000]" /> : <Megaphone className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold truncate">{ann.title}</h3>
                      {ann.urgent && <Badge variant="orange" className="text-[10px]">{t.status.urgent}</Badge>}
                      {isAdmin && (
                        <Badge variant="secondary" className="text-[9px] font-normal opacity-70">
                          {ann.audience === "Both" ? t.common.all : ann.audience === "Owners" ? t.users.owners : t.users.tenants}
                        </Badge>
                      )}
                      {isAdmin && ann.buildingIds && ann.buildingIds.length > 0 && (
                        <Badge variant="outline" className="text-[9px] font-normal opacity-70 border-neutral-300">
                          {ann.buildingIds.length === buildings.length ? t.common.all : `${ann.buildingIds.length} ${t.sidebar.buildings}`}
                        </Badge>
                      )}
                    </div>
                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-primary group transition-colors -mt-1 -mr-1">
                            <MoreVertical className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1">
                          <DropdownMenuItem onClick={() => handleOpenEdit(ann)} className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm">
                            <Pencil className="h-3.5 w-3.5" />
                            {t.announcements.editAnnouncement}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-black/5" />
                          <DropdownMenuItem onClick={() => handleDeleteClick(ann)} className="cursor-pointer text-xs gap-2 py-2 text-red-500 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-500 rounded-sm">
                            <Trash2 className="h-3.5 w-3.5" />
                            {t.announcements.deleteAnnouncement}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{ann.content}</p>
                  <p className="text-[10px] text-neutral-400 mt-2">{t.common.postedOn} {ann.createdAt} {t.common.by} {ann.createdBy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
        })()}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(o) => { setIsEditOpen(o); if (!o) setEditingAnn(null) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader><DialogTitle>{t.announcements.editAnnouncement}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label className="text-xs">{t.announcements.title}</Label><Input placeholder={t.announcements.title} className="bg-neutral-100 border-none rounded-sm" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></div>
            <div className="grid gap-2"><Label className="text-xs">{t.announcements.content}</Label><Textarea placeholder={t.announcements.content} className="bg-neutral-100 border-none rounded-sm min-h-[100px]" value={editContent} onChange={(e) => setEditContent(e.target.value)} /></div>
            <div className="grid gap-2"><Label className="text-xs">{t.announcements.audience}</Label>
              <Select value={editAudience} onValueChange={(v) => setEditAudience(v as Announcement["audience"])}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.announcements.selectAudience} /></SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg">
                  <SelectItem value="Both">{t.common.all}</SelectItem>
                  <SelectItem value="Owners">{t.users.owners}</SelectItem>
                  <SelectItem value="Tenants">{t.users.tenants}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs">{t.announcements.buildings}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between bg-neutral-100 border-none rounded-sm font-normal h-10 px-3 hover:bg-neutral-200 hover:text-neutral-900 cursor-pointer">
                    <span className="truncate">
                      {editSelectedBuildings.length === 0 
                        ? t.announcements.selectBuildings 
                        : editSelectedBuildings.length === buildings.length 
                          ? t.common.all 
                          : `${editSelectedBuildings.length} ${t.documents.filesCount}`}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border-none shadow-lg rounded-sm" align="start">
                  <div className="p-2 space-y-1">
                    <div 
                      className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-neutral-100 cursor-pointer"
                      onClick={() => {
                        if (editSelectedBuildings.length === buildings.length) {
                          setEditSelectedBuildings([])
                        } else {
                          setEditSelectedBuildings(buildings.map(b => b.id))
                        }
                      }}
                    >
                      <Checkbox checked={editSelectedBuildings.length === buildings.length} className="border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      <span className="text-sm font-medium">{t.common.all}</span>
                    </div>
                    <div className="h-px bg-neutral-100 my-1" />
                    {buildings.map((building) => (
                      <div 
                        key={building.id}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-neutral-100 cursor-pointer"
                        onClick={() => {
                          setEditSelectedBuildings(prev => 
                            prev.includes(building.id) 
                              ? prev.filter(id => id !== building.id) 
                              : [...prev, building.id]
                          )
                        }}
                      >
                        <Checkbox checked={editSelectedBuildings.includes(building.id)} className="border-neutral-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                        <span className="text-sm">{building.name}</span>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1 cursor-pointer" onClick={() => setEditUrgent(!editUrgent)}>
                <Label htmlFor="edit-urgent" className="text-sm font-medium cursor-pointer">{t.announcements.urgent}</Label>
                <span className="text-xs text-neutral-500 cursor-pointer">{t.announcements.urgentDescription}</span>
              </div>
              <Switch id="edit-urgent" checked={editUrgent} onCheckedChange={setEditUrgent} className="cursor-pointer" />
            </div>
          </div>
          <DialogFooter><Button className="w-full cursor-pointer" onClick={handleSaveEdit}>{t.users.saveChanges}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="bg-white border-none rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.announcements.deleteAnnouncement}</AlertDialogTitle>
            <AlertDialogDescription>{t.announcements.confirmDelete}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-neutral-100 hover:bg-neutral-200 rounded-sm text-xs cursor-pointer">{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="border-none rounded-sm text-xs text-white cursor-pointer bg-red-600 hover:bg-red-700">
              {t.common.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
