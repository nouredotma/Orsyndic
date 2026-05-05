"use client"

import * as React from "react"
import {
  Users,
  Search,
  MoreVertical,
  Building,
  Eye,
  CheckCircle2,
  Ban,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ManageSyndicsSkeleton } from "@/components/dashboard-skeletons"
import { useAdminSyndics } from "@/lib/hooks"
import type { Syndic } from "@/lib/types"

export default function ManageSyndicsPage() {
  const { data: syndicsList, loading, refetch } = useAdminSyndics()
  const [searchQuery, setSearchQuery] = React.useState("")

  if (loading || !syndicsList) return <ManageSyndicsSkeleton />

  const syndics = syndicsList

  const filteredSyndics = syndics.filter(s => 
    s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApprove = async (id: string) => {
    await fetch('/api/admin/syndics', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'Active' }),
    })
    refetch()
  }

  const handleSuspend = async (id: string) => {
    await fetch('/api/admin/syndics', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'Suspended' }),
    })
    refetch()
  }

  // Stats
  const activeCount = syndics.filter(s => s.status === "Active").length
  const pendingCount = syndics.filter(s => s.status === "Pending" || s.status === "Pending Approval").length
  const totalBuildings = syndics.reduce((sum, s) => sum + s.buildings_count, 0)

  return (
    <div className="flex flex-col gap-4">

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-sm"><Users className="h-4 w-4 text-primary" /></div>
            <div><p className="text-lg font-bold">{activeCount}</p><p className="text-[10px] text-neutral-500">Active Syndics</p></div>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-sm"><Users className="h-4 w-4 text-amber-500" /></div>
            <div><p className="text-lg font-bold">{pendingCount}</p><p className="text-[10px] text-neutral-500">Pending</p></div>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-sm"><Building className="h-4 w-4 text-blue-500" /></div>
            <div><p className="text-lg font-bold">{totalBuildings}</p><p className="text-[10px] text-neutral-500">Total Buildings</p></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="search"
            placeholder="Search syndics..."
            className="w-full pl-9 bg-neutral-100 border-none rounded-sm h-9 text-sm shadow-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-none bg-neutral-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Syndic / Company</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Contact Details</th>
                  <th className="text-center text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Buildings</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredSyndics.length > 0 ? (
                  filteredSyndics.map((syndic) => (
                    <tr key={syndic.id} className="border-b border-black/5 last:border-0 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 border border-black/5 shrink-0">
                            <AvatarFallback className="bg-red-100 text-[#FF0000] text-[10px] font-bold">
                              {syndic.company_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-sm font-medium">{syndic.company_name}</span>
                            <div className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
                              <Users className="h-3 w-3" /> {syndic.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs text-neutral-600 font-medium">{syndic.email}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">{syndic.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-bold bg-white px-2 py-1 rounded-sm border border-black/5 shadow-xs">
                          {syndic.buildings_count}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <Badge 
                          variant="outline"
                          className={cn(
                            "text-[10px] font-bold border-none",
                            syndic.status === 'Active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : syndic.status === 'Pending Approval'
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          )}
                        >
                          {syndic.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-black/5 transition-colors">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1">
                            <DropdownMenuItem className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm">
                              <Eye className="h-3.5 w-3.5" />
                              View Details
                            </DropdownMenuItem>
                            {syndic.status === 'Pending Approval' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-xs gap-2 py-2 text-emerald-600 hover:bg-primary/5 focus:bg-primary/5 focus:text-emerald-600 rounded-sm"
                                onClick={() => handleApprove(syndic.id)}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Approve Syndic
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-black/5" />
                            <DropdownMenuItem 
                              className="cursor-pointer text-xs gap-2 py-2 text-red-500 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-500 rounded-sm"
                              onClick={() => handleSuspend(syndic.id)}
                            >
                              <Ban className="h-3.5 w-3.5" />
                              Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                        <p className="text-xs text-neutral-400">No syndics found</p>
                        <p className="text-xs text-neutral-400 mt-1">Try adjusting your search query</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
