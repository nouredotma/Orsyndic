"use client"

import { useState } from "react"
import { TicketCheck, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { tickets } from "@/lib/mock-data"
import type { TicketStatus } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function HelpdeskPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | TicketStatus>("All")

  const filtered = tickets.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "All" || t.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-[#FF0000]">{tickets.filter(t => t.status === "Open").length}</p><p className="text-[10px] text-neutral-500">Open</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-amber-600">{tickets.filter(t => t.status === "In Progress").length}</p><p className="text-[10px] text-neutral-500">In Progress</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-[#00D100]">{tickets.filter(t => t.status === "Resolved").length}</p><p className="text-[10px] text-neutral-500">Resolved</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-sm bg-neutral-50 border-black/10 text-sm" />
        </div>
        <div className="flex rounded-md bg-neutral-100 p-0.5 gap-0.5">
          {(["All", "Open", "In Progress", "Resolved"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer whitespace-nowrap", filterStatus === s ? "bg-white text-black shadow-sm" : "text-neutral-500")}>{s}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((ticket) => (
          <Card key={ticket.id} className="border-none bg-neutral-100 transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={cn("p-2 rounded-lg shrink-0", ticket.priority === "High" ? "bg-orange-50" : ticket.priority === "Medium" ? "bg-amber-50" : "bg-neutral-50")}>
                    <TicketCheck className={cn("h-4 w-4", ticket.priority === "High" ? "text-orange-600" : ticket.priority === "Medium" ? "text-amber-500" : "text-neutral-500")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{ticket.title}</p>
                      <Badge variant={ticket.status === "Open" ? "info" : ticket.status === "In Progress" ? "warning" : "success"} className="text-[10px] font-normal">{ticket.status}</Badge>
                      <Badge variant={ticket.priority === "High" ? "orange" : ticket.priority === "Medium" ? "warning" : "success"} className="text-[10px] font-normal">{ticket.priority}</Badge>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{ticket.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-neutral-400">
                      <span>By <strong className="text-neutral-600">{ticket.submittedBy}</strong> ({ticket.submittedByRole})</span>
                      <span>Apt {ticket.apartmentNumber} · {ticket.buildingName}</span>
                      <span>{ticket.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {ticket.status === "Open" && <Button variant="outline" size="sm" className="text-[10px] h-7 cursor-pointer">Start</Button>}
                  {ticket.status === "In Progress" && <Button variant="outline" size="sm" className="text-[10px] h-7 cursor-pointer">Resolve</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
