"use client"

import { useState } from "react"
import { Users, Search, Plus, MoreVertical, Shield, User, Pencil, Ban, CheckCircle2, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { managedUsers as initialUsers, buildings, apartments } from "@/lib/mock-data"
import type { ManagedUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

export default function UsersPage() {
  const { t } = useI18n()
  const [localUsers, setLocalUsers] = useState<ManagedUser[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<"All" | "Owner" | "Tenant">("All")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null)
  const [newUser, setNewUser] = useState({ fullName: "", email: "", role: "" as "" | "Owner" | "Tenant", building: "", apartment: "", apartments: [] as string[], username: "", phone: "", password: "" })
  const [editForm, setEditForm] = useState({ fullName: "", email: "", building: "", apartment: "", apartments: [] as string[], username: "", phone: "" })
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<"toggle" | "delete">("toggle")
  const [pendingUser, setPendingUser] = useState<ManagedUser | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const filteredUsers = localUsers.filter((u) => {
    const s = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || (u.username?.toLowerCase().includes(searchQuery.toLowerCase())) || (u.phone?.includes(searchQuery))
    return s && (filterRole === "All" || u.role === filterRole)
  })

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE))
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const activeCount = localUsers.filter(u => u.status === "Active").length
  const ownersCount = localUsers.filter(u => u.role === "Owner").length
  const tenantsCount = localUsers.filter(u => u.role === "Tenant").length
  const resetNew = () => setNewUser({ fullName: "", email: "", role: "", building: "", apartment: "", apartments: [], username: "", phone: "", password: "" })

  const handleCreate = () => {
    if (!newUser.fullName || !newUser.email || !newUser.role || !newUser.building) return
    if (newUser.role === "Owner" && (!newUser.username || !newUser.password || newUser.apartments.length === 0)) return
    if (newUser.role === "Tenant" && (!newUser.phone || !newUser.password || !newUser.apartment)) return
    const bd = buildings.find(b => b.id === newUser.building)
    const aptNumber = newUser.role === "Owner" ? newUser.apartments.join(", ") : newUser.apartment
    const u: ManagedUser = { id: `user-${Date.now()}`, fullName: newUser.fullName, email: newUser.email, username: newUser.role === "Owner" ? newUser.username : undefined, phone: newUser.role === "Tenant" ? newUser.phone : undefined, role: newUser.role, buildingId: newUser.building, buildingName: bd?.name || "", apartmentNumber: aptNumber, status: "Active", createdAt: new Date().toISOString().split("T")[0] }
    setLocalUsers(prev => [u, ...prev]); resetNew(); setIsAddOpen(false)
  }

  const handleToggleConfirm = (user: ManagedUser) => {
    setPendingUser(user)
    setConfirmType("toggle")
    setIsConfirmOpen(true)
  }

  const handleDeleteConfirm = (user: ManagedUser) => {
    setPendingUser(user)
    setConfirmType("delete")
    setIsConfirmOpen(true)
  }

  const executeAction = () => {
    if (!pendingUser) return
    if (confirmType === "toggle") {
      setLocalUsers(p => p.map(u => u.id === pendingUser.id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u))
    } else {
      setLocalUsers(p => p.filter(u => u.id !== pendingUser.id))
    }
    setIsConfirmOpen(false)
    setPendingUser(null)
  }

  const handleOpenEdit = (user: ManagedUser) => {
    setEditingUser(user)
    const building = buildings.find(b => b.name === user.buildingName)
    setEditForm({ fullName: user.fullName, email: user.email || "", building: building?.id || "", apartment: user.role === "Tenant" ? user.apartmentNumber : "", apartments: user.role === "Owner" ? user.apartmentNumber.split(",").map(s => s.trim()).filter(Boolean) : [], username: user.username || "", phone: user.phone || "" })
    setIsEditOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editingUser || !editForm.fullName) return
    const bd = buildings.find(b => b.id === editForm.building)
    const aptNumber = editingUser.role === "Owner" ? editForm.apartments.join(", ") : editForm.apartment
    setLocalUsers(p => p.map(u => u.id === editingUser.id ? { ...u, fullName: editForm.fullName, email: editForm.email || u.email, buildingId: editForm.building || u.buildingId, buildingName: bd?.name || u.buildingName, apartmentNumber: aptNumber || u.apartmentNumber, username: u.role === "Owner" ? (editForm.username || u.username) : u.username, phone: u.role === "Tenant" ? (editForm.phone || u.phone) : u.phone } : u))
    setIsEditOpen(false); setEditingUser(null)
  }

  const selectedBuildingForNew = buildings.find(b => b.id === newUser.building)
  let availableAptsForNew: string[] = []
  if (selectedBuildingForNew) {
    const totalApts = selectedBuildingForNew.floors * selectedBuildingForNew.aptsPerFloor
    for (let i = 1; i <= totalApts; i++) {
      const aptNum = i.toString()
      const existingApt = apartments.find(a => a.buildingId === selectedBuildingForNew.id && a.number === aptNum)
      if (newUser.role === "Owner" && (!existingApt || !existingApt.ownerId)) availableAptsForNew.push(aptNum)
      else if (newUser.role === "Tenant" && (!existingApt || !existingApt.tenantId)) availableAptsForNew.push(aptNum)
    }
  }

  const selectedBuildingForEdit = buildings.find(b => b.id === editForm.building)
  let availableAptsForEdit: string[] = []
  if (selectedBuildingForEdit) {
    const totalApts = selectedBuildingForEdit.floors * selectedBuildingForEdit.aptsPerFloor
    for (let i = 1; i <= totalApts; i++) {
      const aptNum = i.toString()
      const existingApt = apartments.find(a => a.buildingId === selectedBuildingForEdit.id && a.number === aptNum)
      let isCurrentApt = false
      if (editingUser) {
          const currentApts = editingUser.apartmentNumber.split(",").map(s => s.trim())
          if (currentApts.includes(aptNum)) isCurrentApt = true
      }
      if (editingUser?.role === "Owner" && (isCurrentApt || !existingApt || !existingApt.ownerId)) availableAptsForEdit.push(aptNum)
      else if (editingUser?.role === "Tenant" && (isCurrentApt || !existingApt || !existingApt.tenantId)) availableAptsForEdit.push(aptNum)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog open={isAddOpen} onOpenChange={(o) => { setIsAddOpen(o); if (!o) resetNew() }}>
          <DialogTrigger asChild><Button className="gap-2 cursor-pointer"><Plus className="h-4 w-4" /><span className="hidden sm:inline">{t.users.addUser}</span></Button></DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader><DialogTitle>{t.users.addUser}</DialogTitle><DialogDescription>{t.users.createUser}</DialogDescription></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label className="text-xs">{t.users.fullName}</Label><Input placeholder="John Doe" className="bg-neutral-100 border-none rounded-sm" value={newUser.fullName} onChange={(e) => setNewUser(p => ({ ...p, fullName: e.target.value }))} /></div>
              <div className="grid gap-2"><Label className="text-xs">Email</Label><Input type="email" placeholder="john@example.com" className="bg-neutral-100 border-none rounded-sm" value={newUser.email} onChange={(e) => setNewUser(p => ({ ...p, email: e.target.value }))} /></div>
              <div className="grid gap-2"><Label className="text-xs">{t.users.role}</Label>
                <Select value={newUser.role} onValueChange={(v) => setNewUser(p => ({ ...p, role: v as "Owner" | "Tenant" }))}><SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.users.selectRole} /></SelectTrigger><SelectContent className="bg-white border-none shadow-lg"><SelectItem value="Owner">{t.common.owner}</SelectItem><SelectItem value="Tenant">{t.common.tenant}</SelectItem></SelectContent></Select>
              </div>
              {newUser.role === "Owner" && <div className="grid gap-2"><Label className="text-xs">{t.users.username}</Label><Input placeholder="john.doe" className="bg-neutral-100 border-none rounded-sm" value={newUser.username} onChange={(e) => setNewUser(p => ({ ...p, username: e.target.value }))} /></div>}
              {newUser.role === "Tenant" && <div className="grid gap-2"><Label className="text-xs">{t.users.phone}</Label><Input placeholder="0661234567" className="bg-neutral-100 border-none rounded-sm" value={newUser.phone} onChange={(e) => setNewUser(p => ({ ...p, phone: e.target.value }))} /></div>}
              {newUser.role && <div className="grid gap-2"><Label className="text-xs">{t.users.password}</Label><Input type="password" placeholder="••••••••" className="bg-neutral-100 border-none rounded-sm" value={newUser.password} onChange={(e) => setNewUser(p => ({ ...p, password: e.target.value }))} /></div>}
              <div className="grid gap-2"><Label className="text-xs">{t.users.building}</Label>
                <Select value={newUser.building} onValueChange={(v) => setNewUser(p => ({ ...p, building: v, apartment: "" }))}><SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.users.selectBuilding} /></SelectTrigger><SelectContent className="bg-white border-none shadow-lg">{buildings.map(b => (<SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>))}</SelectContent></Select>
              </div>
              <div className="grid gap-2"><Label className="text-xs">{t.users.apartment}</Label>
                 {newUser.role === "Owner" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button disabled={!newUser.building} variant="outline" className="w-full justify-start bg-neutral-100 border-none rounded-sm text-left font-normal text-sm h-9 px-3 hover:bg-neutral-200">
                          {newUser.apartments.length > 0 ? newUser.apartments.map(a => `${t.charges.apt} ${a}`).join(", ") : <span className="text-neutral-500">{t.users.selectApartments}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-2 bg-white border-none shadow-lg rounded-sm min-w-[200px]" align="start">
                        <ScrollArea className="h-48">
                          <div className="flex flex-col gap-1">
                            {availableAptsForNew.map(num => (
                              <div key={num} className="flex items-center space-x-2 p-1.5 hover:bg-neutral-100 rounded-sm">
                                <Checkbox 
                                  id={`new-apt-${num}`} 
                                  checked={newUser.apartments.includes(num)}
                                  onCheckedChange={(c) => {
                                    setNewUser(p => ({
                                      ...p, 
                                      apartments: c ? [...p.apartments, num] : p.apartments.filter(x => x !== num)
                                    }))
                                  }}
                                />
                                <Label htmlFor={`new-apt-${num}`} className="flex-1 cursor-pointer text-sm font-normal">{t.charges.apt} {num}</Label>
                              </div>
                            ))}
                            {availableAptsForNew.length === 0 && <div className="text-xs text-neutral-500 p-2 text-center">{t.users.noAvailableApartments}</div>}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
                 ) : (
                    <Select disabled={!newUser.building} value={newUser.apartment} onValueChange={(v) => setNewUser(p => ({ ...p, apartment: v }))}>
                        <SelectTrigger className="bg-neutral-100 border-none rounded-sm h-9"><SelectValue placeholder={t.users.selectApartment} /></SelectTrigger>
                        <SelectContent className="bg-white border-none shadow-lg">
                          {availableAptsForNew.map(num => (
                              <SelectItem key={num} value={num}>{t.charges.apt} {num}</SelectItem>
                          ))}
                          {availableAptsForNew.length === 0 && <div className="text-xs text-neutral-500 p-2 text-center">{t.users.noAvailableApartments}</div>}
                        </SelectContent>
                    </Select>
                 )}
              </div>
            </div>
            <DialogFooter><Button className="w-full cursor-pointer" onClick={handleCreate}>{t.users.createUser}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-sm"><Users className="h-4 w-4 text-primary" /></div><div><p className="text-lg font-bold">{activeCount}</p><p className="text-[10px] text-neutral-500">{t.users.activeUsers}</p></div></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 flex items-center gap-3"><div className="p-2 bg-blue-50 rounded-sm"><Shield className="h-4 w-4 text-blue-500" /></div><div><p className="text-lg font-bold">{ownersCount}</p><p className="text-[10px] text-neutral-500">{t.users.owners}</p></div></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 flex items-center gap-3"><div className="p-2 bg-amber-50 rounded-sm"><User className="h-4 w-4 text-amber-500" /></div><div><p className="text-lg font-bold">{tenantsCount}</p><p className="text-[10px] text-neutral-500">{t.users.tenants}</p></div></CardContent></Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" /><Input placeholder={t.users.search} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }} className="pl-9 rounded-sm bg-neutral-100 border-none shadow-none text-sm" /></div>
        <div className="flex rounded-sm bg-neutral-100 p-0.5 gap-0.5">{(["All", "Owner", "Tenant"] as const).map((r) => (<button key={r} onClick={() => { setFilterRole(r); setCurrentPage(1) }} className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer", filterRole === r ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-neutral-700")}>{r === "All" ? t.common.all : r === "Owner" ? t.users.owners : t.users.tenants}</button>))}</div>
      </div>

      <Card className="border-none bg-neutral-100"><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-black/5"><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.userHeader}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.usernamePhoneHeader}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.role}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.building}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.apartment}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.status}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3"></th></tr></thead>
        <tbody>{paginatedUsers.map((user) => (
          <tr key={user.id} className="border-b border-black/5 last:border-0 transition-colors">
            <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar className="h-8 w-8 border border-black/5"><AvatarImage src={user.avatar} alt={user.fullName} /><AvatarFallback className="bg-red-100 text-[#FF0000] text-[10px] font-bold">{user.fullName.charAt(0)}</AvatarFallback></Avatar><span className="text-sm font-medium">{user.fullName}</span></div></td>
            <td className="px-4 py-3 text-xs text-neutral-600 font-mono">{user.role === "Owner" ? user.username : user.phone}</td>
            <td className="px-4 py-3 text-xs text-neutral-600">{user.role === "Owner" ? t.common.owner : user.role === "Admin" ? t.common.admin : t.common.tenant}</td>
            <td className="px-4 py-3 text-xs text-neutral-600">{user.buildingName}</td>
            <td className="px-4 py-3 text-xs text-neutral-600">{t.charges.apt} {user.apartmentNumber}</td>
            <td className="px-4 py-3"><Badge variant={user.status === "Active" ? "success" : "secondary"} className="text-[10px] px-2.5 py-1 font-normal">{user.status === "Active" ? t.status.active : t.status.inactive}</Badge></td>
            <td className="px-4 py-3">{user.role !== "Admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-primary group transition-colors">
                    <MoreVertical className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1">
                  <DropdownMenuItem onClick={() => handleOpenEdit(user)} className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm">
                    <Pencil className="h-3.5 w-3.5" />
                    {t.users.editUser}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleConfirm(user)} className={cn("cursor-pointer text-xs gap-2 py-2 rounded-sm hover:bg-primary/5 focus:bg-primary/5 focus:text-black", user.status === "Active" ? "text-amber-600" : "text-emerald-600")}>
                    {user.status === "Active" ? (
                      <><Ban className="h-3.5 w-3.5" />{t.users.deactivate}</>
                    ) : (
                      <><CheckCircle2 className="h-3.5 w-3.5" />{t.users.activate}</>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-black/5" />
                  <DropdownMenuItem onClick={() => handleDeleteConfirm(user)} className="cursor-pointer text-xs gap-2 py-2 text-red-500 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-500 rounded-sm">
                    <Trash2 className="h-3.5 w-3.5" />
                    {t.common.delete}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}</td>
          </tr>))}</tbody></table></div>
          {filteredUsers.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-black/5">
              <p className="text-xs text-neutral-500">{t.users.page} {currentPage} {t.users.of} {totalPages}</p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-7 w-7 border-none bg-white hover:bg-neutral-200 cursor-pointer disabled:opacity-40" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft className="h-3.5 w-3.5" /></Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page: number
                  if (totalPages <= 5) page = i + 1
                  else if (currentPage <= 3) page = i + 1
                  else if (currentPage >= totalPages - 2) page = totalPages - 4 + i
                  else page = currentPage - 2 + i
                  return (<button key={page} onClick={() => setCurrentPage(page)} className={cn("h-7 w-7 rounded-sm text-xs font-medium transition-all cursor-pointer", currentPage === page ? "bg-primary text-white" : "hover:bg-neutral-200 text-neutral-600")}>{page}</button>)
                })}
                <Button variant="outline" size="icon" className="h-7 w-7 border-none bg-white hover:bg-neutral-200 cursor-pointer disabled:opacity-40" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          )}
        </CardContent></Card>

      <Dialog open={isEditOpen} onOpenChange={(o) => { setIsEditOpen(o); if (!o) setEditingUser(null) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader><DialogTitle>{t.users.editUser}</DialogTitle><DialogDescription>{t.users.editAccountDetails}</DialogDescription></DialogHeader>
          {editingUser && (<div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label className="text-xs">{t.users.fullName}</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editForm.fullName} onChange={(e) => setEditForm(p => ({ ...p, fullName: e.target.value }))} /></div>
            <div className="grid gap-2"><Label className="text-xs">Email</Label><Input type="email" className="bg-neutral-100 border-none rounded-sm" value={editForm.email} onChange={(e) => setEditForm(p => ({ ...p, email: e.target.value }))} /></div>
            {editingUser.role === "Owner" && <div className="grid gap-2"><Label className="text-xs">{t.users.username}</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editForm.username} onChange={(e) => setEditForm(p => ({ ...p, username: e.target.value }))} /></div>}
            {editingUser.role === "Tenant" && <div className="grid gap-2"><Label className="text-xs">{t.users.phone}</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editForm.phone} onChange={(e) => setEditForm(p => ({ ...p, phone: e.target.value }))} /></div>}
            <div className="grid gap-2"><Label className="text-xs">{t.users.building}</Label>
              <Select value={editForm.building} onValueChange={(v) => setEditForm(p => ({ ...p, building: v, apartment: "" }))}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                  <SelectValue placeholder={t.users.selectBuilding} />
                </SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg">
                  {buildings.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label className="text-xs">{t.users.apartment}</Label>
                 {editingUser.role === "Owner" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button disabled={!editForm.building} variant="outline" className="w-full justify-start bg-neutral-100 border-none rounded-sm text-left font-normal text-sm h-9 px-3 hover:bg-neutral-200">
                          {editForm.apartments.length > 0 ? editForm.apartments.map(a => `${t.charges.apt} ${a}`).join(", ") : <span className="text-neutral-500">{t.users.selectApartments}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-2 bg-white border-none shadow-lg rounded-sm min-w-[200px]" align="start">
                        <ScrollArea className="h-48">
                          <div className="flex flex-col gap-1">
                            {availableAptsForEdit.map(num => (
                              <div key={num} className="flex items-center space-x-2 p-1.5 hover:bg-neutral-100 rounded-sm">
                                <Checkbox 
                                  id={`edit-apt-${num}`} 
                                  checked={editForm.apartments.includes(num)}
                                  onCheckedChange={(c) => {
                                    setEditForm(p => ({
                                      ...p, 
                                      apartments: c ? [...p.apartments, num] : p.apartments.filter(x => x !== num)
                                    }))
                                  }}
                                />
                                <Label htmlFor={`edit-apt-${num}`} className="flex-1 cursor-pointer text-sm font-normal">{t.charges.apt} {num}</Label>
                              </div>
                            ))}
                            {availableAptsForEdit.length === 0 && <div className="text-xs text-neutral-500 p-2 text-center">{t.users.noAvailableApartments}</div>}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
                 ) : (
                    <Select disabled={!editForm.building} value={editForm.apartment} onValueChange={(v) => setEditForm(p => ({ ...p, apartment: v }))}>
                        <SelectTrigger className="bg-neutral-100 border-none rounded-sm h-9"><SelectValue placeholder={t.users.selectApartment} /></SelectTrigger>
                        <SelectContent className="bg-white border-none shadow-lg">
                          {availableAptsForEdit.map(num => (
                              <SelectItem key={num} value={num}>{t.charges.apt} {num}</SelectItem>
                          ))}
                          {availableAptsForEdit.length === 0 && <div className="text-xs text-neutral-500 p-2 text-center">{t.users.noAvailableApartments}</div>}
                        </SelectContent>
                    </Select>
                 )}
            </div>
          </div>)}
          <DialogFooter><Button className="w-full cursor-pointer" onClick={handleSaveEdit}>{t.users.saveChanges}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="bg-white border-none rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmType === "delete" ? t.users.deleteUser : pendingUser?.status === "Active" ? t.users.deactivate : t.users.activate}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmType === "delete" 
                ? t.users.confirmDelete 
                : pendingUser?.status === "Active" 
                  ? t.users.confirmDeactivate 
                  : t.users.confirmActivate}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-neutral-100 hover:bg-neutral-200 rounded-sm text-xs cursor-pointer">{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={executeAction} className={cn("border-none rounded-sm text-xs text-white cursor-pointer", confirmType === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90")}>
              {t.common.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
