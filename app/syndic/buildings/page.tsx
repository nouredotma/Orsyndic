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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { buildings as initBuildings, apartments as initApartments, charges, managedUsers } from "@/lib/mock-data"
import type { Apartment, Building } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

export default function BuildingsPage() {
  const { t } = useI18n()
  const [localBuildings, setLocalBuildings] = useState<Building[]>(initBuildings)
  const [localApartments, setLocalApartments] = useState<Apartment[]>(initApartments)
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)
  const [isAddBuildingOpen, setIsAddBuildingOpen] = useState(false)
  const [isAddAptOpen, setIsAddAptOpen] = useState(false)
  const [newBuilding, setNewBuilding] = useState({ name: "", address: "", floors: "" })
  const [newApt, setNewApt] = useState({ floor: "", number: "", tantiemes: "", ownerId: "" })

  const selectedBuildingData = localBuildings.find(b => b.id === selectedBuilding)
  const buildingApartments = localApartments.filter(a => a.buildingId === selectedBuilding)

  const handleAddBuilding = () => {
    if (!newBuilding.name || !newBuilding.address || !newBuilding.floors) return
    const b: Building = { id: `building-${Date.now()}`, name: newBuilding.name, address: newBuilding.address, floors: parseInt(newBuilding.floors) || 1, totalApartments: 0 }
    setLocalBuildings(prev => [...prev, b])
    setNewBuilding({ name: "", address: "", floors: "" })
    setIsAddBuildingOpen(false)
  }

  const handleAddApartment = () => {
    if (!selectedBuilding || !newApt.floor || !newApt.number || !newApt.tantiemes || !newApt.ownerId) return
    const owner = managedUsers.find(u => u.id === newApt.ownerId)
    const apt: Apartment = { id: `apt-${Date.now()}`, buildingId: selectedBuilding, floor: parseInt(newApt.floor) || 1, number: newApt.number, tantiemes: parseInt(newApt.tantiemes) || 100, ownerId: newApt.ownerId, ownerName: owner?.fullName || "Unknown" }
    setLocalApartments(prev => [...prev, apt])
    setNewApt({ floor: "", number: "", tantiemes: "", ownerId: "" })
    setIsAddAptOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog open={isAddBuildingOpen} onOpenChange={setIsAddBuildingOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{t.buildings.addBuilding}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>{t.buildings.addBuilding}</DialogTitle>
              <DialogDescription>{t.buildings.registerBuilding}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label className="text-xs">{t.buildings.buildingName}</Label><Input placeholder="Résidence Al Andalous" className="bg-neutral-100 border-none rounded-sm" value={newBuilding.name} onChange={(e) => setNewBuilding(p => ({ ...p, name: e.target.value }))} /></div>
              <div className="grid gap-2"><Label className="text-xs">{t.buildings.address}</Label><Input placeholder="12 Rue Mohammed V, Casablanca" className="bg-neutral-100 border-none rounded-sm" value={newBuilding.address} onChange={(e) => setNewBuilding(p => ({ ...p, address: e.target.value }))} /></div>
              <div className="grid gap-2"><Label className="text-xs">{t.buildings.totalFloors}</Label><Input type="number" placeholder="5" className="bg-neutral-100 border-none rounded-sm" value={newBuilding.floors} onChange={(e) => setNewBuilding(p => ({ ...p, floors: e.target.value }))} /></div>
            </div>
            <DialogFooter><Button className="w-full cursor-pointer" onClick={handleAddBuilding}>{t.buildings.registerBuilding}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Buildings List */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-1">
            {t.sidebar.buildings} ({localBuildings.length})
          </p>
          {localBuildings.map((building) => {
            const aptCount = localApartments.filter(a => a.buildingId === building.id).length
            return (
              <Card
                key={building.id}
                className={cn(
                  "border-none bg-neutral-100 cursor-pointer transition-all",
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
                    <p className="text-[10px] text-neutral-500">{t.buildings.apts}</p>
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
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs cursor-pointer" onClick={() => setIsAddAptOpen(true)}>
                    <Plus className="h-3.5 w-3.5" />
                    {t.buildings.addApartment}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/5">
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">{t.buildings.apartmentNumber} #</th>
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">{t.buildings.floor}</th>
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">{t.buildings.tantiemes}</th>
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">{t.buildings.owner}</th>
                        <th className="text-left text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5">{t.buildings.tenant}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildingApartments.map((apt) => (
                        <tr 
                          key={apt.id} 
                          className="border-b border-black/5 last:border-0 transition-colors cursor-pointer"
                          onClick={() => setSelectedApartment(apt)}
                        >
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <DoorOpen className="h-3.5 w-3.5 text-primary" />
                              <span className="text-sm font-semibold">{apt.number}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-xs text-neutral-600">{t.buildings.floor} {apt.floor}</td>
                          <td className="px-3 py-2.5 text-xs font-medium">{apt.tantiemes}</td>
                          <td className="px-3 py-2.5 text-xs font-medium">{apt.ownerName}</td>
                          <td className="px-3 py-2.5 text-xs text-neutral-600">{apt.tenantName || <span className="text-neutral-300 italic">{t.buildings.noTenant}</span>}</td>
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
              <p className="text-sm text-neutral-500 font-medium">{t.buildings.selectBuildingToView}</p>
            </div>
          )}
        </div>
      </div>

      <Sheet open={!!selectedApartment} onOpenChange={(open) => !open && setSelectedApartment(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedApartment && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <DoorOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <SheetTitle>{t.buildings.apartmentNumber} {selectedApartment.number}</SheetTitle>
                    <SheetDescription>
                      {selectedBuildingData?.name} · {t.buildings.floor} {selectedApartment.floor} · {selectedApartment.tantiemes} {t.buildings.tantiemes}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                {/* People Info */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.buildings.occupants}</h4>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 border border-black/5">
                    <Avatar className="h-10 w-10 border border-black/5">
                      <AvatarFallback className="bg-red-100 text-[#FF0000] font-bold">{selectedApartment.ownerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{selectedApartment.ownerName}</p>
                      <p className="text-[10px] text-neutral-500">Owner</p>
                    </div>
                  </div>

                  {selectedApartment.tenantName && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 border border-black/5">
                      <Avatar className="h-10 w-10 border border-black/5">
                        <AvatarFallback className="bg-neutral-200 text-neutral-600">{selectedApartment.tenantName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{selectedApartment.tenantName}</p>
                        <p className="text-[10px] text-neutral-500">Tenant</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment History */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.buildings.paymentHistory}</h4>
                    <Button variant="outline" size="sm" className="h-7 text-[10px] px-2">{t.buildings.viewAll}</Button>
                  </div>
                  
                  <div className="space-y-2">
                    {charges
                      .filter(c => c.apartmentId === selectedApartment.id)
                      .map((charge) => (
                        <div key={charge.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-black/5">
                          <div>
                            <p className="text-sm font-medium">{charge.month} {charge.year}</p>
                            <p className="text-xs font-bold text-neutral-900 mt-0.5">{charge.amount} MAD</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={charge.status === "Paid" ? "success" : charge.status === "Partial" ? "warning" : "danger"} className="text-[10px] mb-1 block w-fit ml-auto">
                              {charge.status}
                            </Badge>
                            {charge.paidDate && <p className="text-[9px] text-neutral-400">Paid on {charge.paidDate}</p>}
                          </div>
                        </div>
                      ))}
                    {charges.filter(c => c.apartmentId === selectedApartment.id).length === 0 && (
                      <p className="text-xs text-neutral-500 text-center py-4 italic">{t.buildings.noHistoryFound}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Apartment Dialog */}
      <Dialog open={isAddAptOpen} onOpenChange={(o) => { setIsAddAptOpen(o); if (!o) setNewApt({ floor: "", number: "", tantiemes: "", ownerId: "" }) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader><DialogTitle>{t.buildings.addApartment}</DialogTitle><DialogDescription>{t.buildings.addApartmentTo} {selectedBuildingData?.name}.</DialogDescription></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2"><Label className="text-xs">Apartment Number</Label><Input placeholder="101" className="bg-neutral-100 border-none rounded-sm" value={newApt.number} onChange={(e) => setNewApt(p => ({ ...p, number: e.target.value }))} /></div>
              <div className="grid gap-2"><Label className="text-xs">Floor</Label><Input type="number" placeholder="1" className="bg-neutral-100 border-none rounded-sm" value={newApt.floor} onChange={(e) => setNewApt(p => ({ ...p, floor: e.target.value }))} /></div>
            </div>
            <div className="grid gap-2"><Label className="text-xs">Tantièmes (m²)</Label><Input type="number" placeholder="120" className="bg-neutral-100 border-none rounded-sm" value={newApt.tantiemes} onChange={(e) => setNewApt(p => ({ ...p, tantiemes: e.target.value }))} /></div>
            <div className="grid gap-2"><Label className="text-xs">Owner</Label>
              <Select value={newApt.ownerId} onValueChange={(v) => setNewApt(p => ({ ...p, ownerId: v }))}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder="Select owner" /></SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg">{managedUsers.filter(u => u.role === "Owner").map(u => (<SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button className="w-full cursor-pointer" onClick={handleAddApartment}>{t.buildings.addApartment}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
