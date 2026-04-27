"use client"

import { useState } from "react"
import { Users, Search, Plus, MoreVertical, Shield, User, UserPlus } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
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
import { managedUsers } from "@/lib/mock-data"
import type { ManagedUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<"All" | "Owner" | "Tenant">("All")

  const filteredUsers = managedUsers.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.username?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.phone?.includes(searchQuery))
    const matchesRole = filterRole === "All" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const activeCount = managedUsers.filter(u => u.status === "Active").length
  const ownersCount = managedUsers.filter(u => u.role === "Owner").length
  const tenantsCount = managedUsers.filter(u => u.role === "Tenant").length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add User</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new account for an owner or tenant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="bg-neutral-100 border-none rounded-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="text-xs">Role</Label>
                <Select>
                  <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-none shadow-lg">
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="building" className="text-xs">Building</Label>
                <Select>
                  <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-none shadow-lg">
                    <SelectItem value="1">Résidence Al Andalous</SelectItem>
                    <SelectItem value="2">Résidence Les Jardins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apt" className="text-xs">Apartment Number</Label>
                <Input id="apt" placeholder="101" className="bg-neutral-100 border-none rounded-sm" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-sm">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold">{activeCount}</p>
              <p className="text-[10px] text-neutral-500">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-sm">
              <Shield className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-bold">{ownersCount}</p>
              <p className="text-[10px] text-neutral-500">Owners</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-sm">
              <User className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-lg font-bold">{tenantsCount}</p>
              <p className="text-[10px] text-neutral-500">Tenants</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search by name, username or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-sm bg-neutral-100 border-none shadow-none text-sm"
          />
        </div>
        <div className="flex rounded-sm bg-neutral-100 p-0.5 gap-0.5">
          {(["All", "Owner", "Tenant"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer",
                filterRole === role
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <Card className="border-none bg-neutral-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">User</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Username / Phone</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Role</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Building</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Apartment</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-black/5 last:border-0 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 border border-black/5">
                          <AvatarImage src={user.avatar} alt={user.fullName} />
                          <AvatarFallback className="bg-red-100 text-[#FF0000] text-[10px] font-bold">
                            {user.fullName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-600 font-mono">
                      {user.role === "Owner" ? user.username : user.phone}
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={
                          user.role === "Owner" ? "info" : 
                          user.role === "Admin" ? "admin" : "tenant"
                        } 
                        className="text-[10px]"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-600">{user.buildingName}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600">Apt {user.apartmentNumber}</td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={user.status === "Active" ? "success" : "secondary"} 
                        className="text-[10px] px-2.5 py-1 font-normal"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer">
                        <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
