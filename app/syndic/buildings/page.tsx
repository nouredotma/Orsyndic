"use client"

import { useState } from "react"
import { Building2, Plus, ChevronRight, DoorOpen, MapPin } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { buildings, apartments } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function BuildingsPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

  const selectedBuildingData = buildings.find(b => b.id === selectedBuilding)
  const buildingApartments = apartments.filter(a => a.buildingId === selectedBuilding)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Button className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Building</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Buildings List */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-1">Buildings ({buildings.length})</p>
          {buildings.map((building) => {
            const aptCount = apartments.filter(a => a.buildingId === building.id).length
            return (
              <Card
                key={building.id}
                className={cn(
                  "border-none bg-neutral-100 cursor-pointer transition-all hover:shadow-md",
                  selectedBuilding === building.id && "border-primary ring-1 ring-primary/20"
                )}
                onClick={() => setSelectedBuilding(building.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{building.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-neutral-400" />
                      <p className="text-[10px] text-neutral-500 truncate">{building.address}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{aptCount}</p>
                    <p className="text-[10px] text-neutral-500">Apts</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-300 shrink-0" />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Apartments Detail */}
        <div className="lg:col-span-2">
          {selectedBuildingData ? (
            <Card className="border-none bg-neutral-100">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{selectedBuildingData.name}</CardTitle>
                    <CardDescription className="text-xs">{selectedBuildingData.floors} floors · {buildingApartments.length} apartments registered</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs cursor-pointer">
                    <Plus className="h-3.5 w-3.5" />
                    Add Apartment
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/5">
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">Apt #</th>
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">Floor</th>
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">Owner</th>
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">Tenant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildingApartments.map((apt) => (
                        <tr key={apt.id} className="border-b border-black/5 last:border-0 hover:bg-neutral-50 transition-colors">
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <DoorOpen className="h-3.5 w-3.5 text-primary" />
                              <span className="text-sm font-semibold">{apt.number}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-xs text-neutral-600">Floor {apt.floor}</td>
                          <td className="px-3 py-2.5 text-xs font-medium">{apt.ownerName}</td>
                          <td className="px-3 py-2.5 text-xs text-neutral-600">{apt.tenantName || <span className="text-neutral-300 italic">No tenant</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-black/5 rounded-xl bg-neutral-50/50">
              <Building2 className="h-10 w-10 text-neutral-300 mb-3" />
              <p className="text-sm text-neutral-500 font-medium">Select a building to view apartments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
