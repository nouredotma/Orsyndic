"use client"

import { useState } from "react"
import { TicketCheck, Plus, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { tickets } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function MyTicketsPage() {
  const user = getCurrentUser()
  const myTickets = tickets.filter(t => t.submittedBy === user?.fullName)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Button className="gap-2 cursor-pointer" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />New Ticket
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 space-y-3">
            <h3 className="text-sm font-semibold">Submit a new {user?.role === "Owner" ? "incident" : "complaint"}</h3>
            <input type="text" placeholder="Title" className="w-full px-3 py-2 text-sm rounded-sm border border-none bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-primary" />
            <textarea placeholder="Description..." rows={3} className="w-full px-3 py-2 text-sm rounded-sm border border-none bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs cursor-pointer"><Camera className="h-3.5 w-3.5" />Attach Photo</Button>
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="text-xs cursor-pointer" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button size="sm" className="text-xs cursor-pointer">Submit</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {myTickets.length === 0 ? (
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-8 text-center">
            <TicketCheck className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-500">No tickets submitted yet.</p>
            <p className="text-xs text-neutral-400 mt-1">Click &ldquo;New Ticket&rdquo; to report an issue.</p>
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
