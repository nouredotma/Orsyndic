"use client"

import { useState } from "react"
import { Users, Search, Plus, MoreVertical, Shield, User, Pencil, Ban, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { managedUsers as initialUsers, buildings } from "@/lib/mock-data"
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
  const [newUser, setNewUser] = useState({ fullName: "", role: "" as "" | "Owner" | "Tenant", building: "", apartment: "", username: "", phone: "", password: "" })
  const [editForm, setEditForm] = useState({ fullName: "", building: "", apartment: "", username: "", phone: "" })

  const filteredUsers = localUsers.filter((u) => {
    const s = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || (u.username?.toLowerCase().includes(searchQuery.toLowerCase())) || (u.phone?.includes(searchQuery))
    return s && (filterRole === "All" || u.role === filterRole)
  })

  const activeCount = localUsers.filter(u => u.status === "Active").length
  const ownersCount = localUsers.filter(u => u.role === "Owner").length
  const tenantsCount = localUsers.filter(u => u.role === "Tenant").length
  const resetNew = () => setNewUser({ fullName: "", role: "", building: "", apartment: "", username: "", phone: "", password: "" })

  const handleCreate = () => {
    if (!newUser.fullName || !newUser.role || !newUser.building || !newUser.apartment) return
    if (newUser.role === "Owner" && (!newUser.username || !newUser.password)) return
    if (newUser.role === "Tenant" && (!newUser.phone || !newUser.password)) return
    const bd = buildings.find(b => b.id === newUser.building)
    const u: ManagedUser = { id: `user-${Date.now()}`, fullName: newUser.fullName, username: newUser.role === "Owner" ? newUser.username : undefined, phone: newUser.role === "Tenant" ? newUser.phone : undefined, role: newUser.role, buildingName: bd?.name || "", apartmentNumber: newUser.apartment, status: "Active", createdAt: new Date().toISOString().split("T")[0] }
    setLocalUsers(prev => [u, ...prev]); resetNew(); setIsAddOpen(false)
  }

  const handleToggle = (id: string) => setLocalUsers(p => p.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u))

  const handleOpenEdit = (user: ManagedUser) => {
    setEditingUser(user)
    const building = buildings.find(b => b.name === user.buildingName)
    setEditForm({ fullName: user.fullName, building: building?.id || "", apartment: user.apartmentNumber, username: user.username || "", phone: user.phone || "" })
    setIsEditOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editingUser || !editForm.fullName) return
    const bd = buildings.find(b => b.id === editForm.building)
    setLocalUsers(p => p.map(u => u.id === editingUser.id ? { ...u, fullName: editForm.fullName, buildingName: bd?.name || u.buildingName, apartmentNumber: editForm.apartment || u.apartmentNumber, username: u.role === "Owner" ? (editForm.username || u.username) : u.username, phone: u.role === "Tenant" ? (editForm.phone || u.phone) : u.phone } : u))
    setIsEditOpen(false); setEditingUser(null)
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
              <div className="grid gap-2"><Label className="text-xs">{t.users.role}</Label>
                <Select value={newUser.role} onValueChange={(v) => setNewUser(p => ({ ...p, role: v as "Owner" | "Tenant" }))}><SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.users.selectRole} /></SelectTrigger><SelectContent className="bg-white border-none shadow-lg"><SelectItem value="Owner">{t.users.owners.replace(/s$/i, "")}</SelectItem><SelectItem value="Tenant">{t.users.tenants.replace(/s$/i, "")}</SelectItem></SelectContent></Select>
              </div>
              {newUser.role === "Owner" && <div className="grid gap-2"><Label className="text-xs">{t.users.username}</Label><Input placeholder="john.doe" className="bg-neutral-100 border-none rounded-sm" value={newUser.username} onChange={(e) => setNewUser(p => ({ ...p, username: e.target.value }))} /></div>}
              {newUser.role === "Tenant" && <div className="grid gap-2"><Label className="text-xs">{t.users.phone}</Label><Input placeholder="0661234567" className="bg-neutral-100 border-none rounded-sm" value={newUser.phone} onChange={(e) => setNewUser(p => ({ ...p, phone: e.target.value }))} /></div>}
              {newUser.role && <div className="grid gap-2"><Label className="text-xs">{t.users.password}</Label><Input type="password" placeholder="••••••••" className="bg-neutral-100 border-none rounded-sm" value={newUser.password} onChange={(e) => setNewUser(p => ({ ...p, password: e.target.value }))} /></div>}
              <div className="grid gap-2"><Label className="text-xs">{t.users.building}</Label>
                <Select value={newUser.building} onValueChange={(v) => setNewUser(p => ({ ...p, building: v }))}><SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.users.selectBuilding} /></SelectTrigger><SelectContent className="bg-white border-none shadow-lg">{buildings.map(b => (<SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>))}</SelectContent></Select>
              </div>
              <div className="grid gap-2"><Label className="text-xs">{t.users.apartment}</Label><Input placeholder="101" className="bg-neutral-100 border-none rounded-sm" value={newUser.apartment} onChange={(e) => setNewUser(p => ({ ...p, apartment: e.target.value }))} /></div>
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
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" /><Input placeholder={t.users.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-sm bg-neutral-100 border-none shadow-none text-sm" /></div>
        <div className="flex rounded-sm bg-neutral-100 p-0.5 gap-0.5">{(["All", "Owner", "Tenant"] as const).map((r) => (<button key={r} onClick={() => setFilterRole(r)} className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer", filterRole === r ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-neutral-700")}>{r === "All" ? t.common.all : r === "Owner" ? t.users.owners : t.users.tenants}</button>))}</div>
      </div>

      <Card className="border-none bg-neutral-100"><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-black/5"><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.userHeader}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.usernamePhoneHeader}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.role}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.building}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.apartment}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">{t.users.status}</th><th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3"></th></tr></thead>
        <tbody>{filteredUsers.map((user) => (
          <tr key={user.id} className="border-b border-black/5 last:border-0 transition-colors">
            <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar className="h-8 w-8 border border-black/5"><AvatarImage src={user.avatar} alt={user.fullName} /><AvatarFallback className="bg-red-100 text-[#FF0000] text-[10px] font-bold">{user.fullName.charAt(0)}</AvatarFallback></Avatar><span className="text-sm font-medium">{user.fullName}</span></div></td>
            <td className="px-4 py-3 text-xs text-neutral-600 font-mono">{user.role === "Owner" ? user.username : user.phone}</td>
            <td className="px-4 py-3"><Badge variant={user.role === "Owner" ? "info" : user.role === "Admin" ? "admin" : "tenant"} className="text-[10px]">{user.role}</Badge></td>
            <td className="px-4 py-3 text-xs text-neutral-600">{user.buildingName}</td>
            <td className="px-4 py-3 text-xs text-neutral-600">Apt {user.apartmentNumber}</td>
            <td className="px-4 py-3"><Badge variant={user.status === "Active" ? "success" : "secondary"} className="text-[10px] px-2.5 py-1 font-normal">{user.status}</Badge></td>
            <td className="px-4 py-3">{user.role !== "Admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-primary group transition-colors">
                    <MoreVertical className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1">
                  <DropdownMenuItem onClick={() => handleOpenEdit(user)} className="cursor-pointer text-xs gap-2 py-2 hover:bg-black/5 focus:bg-black/5 focus:text-black rounded-sm">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggle(user.id)} className={cn("cursor-pointer text-xs gap-2 py-2 rounded-sm focus:text-black", user.status === "Active" ? "text-red-500 hover:bg-red-50 focus:bg-red-50" : "text-emerald-600 hover:bg-emerald-50 focus:bg-emerald-50")}>
                    {user.status === "Active" ? (
                      <><Ban className="h-3.5 w-3.5" />Deactivate</>
                    ) : (
                      <><CheckCircle2 className="h-3.5 w-3.5" />Activate</>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}</td>
          </tr>))}</tbody></table></div></CardContent></Card>

      <Dialog open={isEditOpen} onOpenChange={(o) => { setIsEditOpen(o); if (!o) setEditingUser(null) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader><DialogTitle>Edit User</DialogTitle><DialogDescription>Update {editingUser?.fullName}&apos;s account details.</DialogDescription></DialogHeader>
          {editingUser && (<div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label className="text-xs">Full Name</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editForm.fullName} onChange={(e) => setEditForm(p => ({ ...p, fullName: e.target.value }))} /></div>
            {editingUser.role === "Owner" && <div className="grid gap-2"><Label className="text-xs">Username</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editForm.username} onChange={(e) => setEditForm(p => ({ ...p, username: e.target.value }))} /></div>}
            {editingUser.role === "Tenant" && <div className="grid gap-2"><Label className="text-xs">Phone Number</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editForm.phone} onChange={(e) => setEditForm(p => ({ ...p, phone: e.target.value }))} /></div>}
            <div className="grid gap-2"><Label className="text-xs">Building</Label>
              <Select value={editForm.building} onValueChange={(v) => setEditForm(p => ({ ...p, building: v }))}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                  <SelectValue placeholder="Select building" />
                </SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg">
                  {buildings.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label className="text-xs">Apartment Number</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editForm.apartment} onChange={(e) => setEditForm(p => ({ ...p, apartment: e.target.value }))} /></div>
          </div>)}
          <DialogFooter><Button className="w-full cursor-pointer" onClick={handleSaveEdit}>Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
