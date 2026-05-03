"use client"

import { useState } from "react"
import { Building2, Plus, ChevronRight, DoorOpen, MapPin, ArrowLeft, Pencil, Trash2, MoreVertical } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
  
  // Edit & Delete State
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null)
  const [isEditBuildingOpen, setIsEditBuildingOpen] = useState(false)
  const [editingApt, setEditingApt] = useState<Apartment | null>(null)
  const [isEditAptOpen, setIsEditAptOpen] = useState(false)
  
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<"building" | "apartment">("building")
  const [itemToDelete, setItemToDelete] = useState<Building | Apartment | null>(null)

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
    
    const floorNum = parseInt(newApt.floor)
    if (selectedBuildingData && floorNum > selectedBuildingData.floors) {
      alert(t.buildings.floorValidationError)
      return
    }

    const owner = managedUsers.find(u => u.id === newApt.ownerId)
    const apt: Apartment = { id: `apt-${Date.now()}`, buildingId: selectedBuilding, floor: floorNum || 0, number: newApt.number, tantiemes: parseInt(newApt.tantiemes) || 100, ownerId: newApt.ownerId, ownerName: owner?.fullName || "Unknown" }
    setLocalApartments(prev => [...prev, apt])
    setNewApt({ floor: "", number: "", tantiemes: "", ownerId: "" })
    setIsAddAptOpen(false)
  }

  const handleEditBuilding = () => {
    if (!editingBuilding) return
    setLocalBuildings(prev => prev.map(b => b.id === editingBuilding.id ? editingBuilding : b))
    setIsEditBuildingOpen(false)
    setEditingBuilding(null)
  }

  const handleEditApartment = () => {
    if (!editingApt) return
    const owner = managedUsers.find(u => u.id === editingApt.ownerId)
    const updatedApt = { ...editingApt, ownerName: owner?.fullName || editingApt.ownerName }
    setLocalApartments(prev => prev.map(a => a.id === updatedApt.id ? updatedApt : a))
    setIsEditAptOpen(false)
    setEditingApt(null)
  }

  const handleDeleteConfirm = (item: Building | Apartment, type: "building" | "apartment") => {
    setItemToDelete(item)
    setConfirmType(type)
    setConfirmOpen(true)
  }

  const executeDelete = () => {
    if (!itemToDelete) return
    if (confirmType === "building") {
      setLocalBuildings(prev => prev.filter(b => b.id !== itemToDelete.id))
      setLocalApartments(prev => prev.filter(a => a.buildingId !== itemToDelete.id))
      if (selectedBuilding === itemToDelete.id) {
        setSelectedBuilding(null)
        setSelectedApartment(null)
      }
    } else {
      setLocalApartments(prev => prev.filter(a => a.id !== itemToDelete.id))
      if (selectedApartment?.id === itemToDelete.id) {
        setSelectedApartment(null)
      }
    }
    setConfirmOpen(false)
    setItemToDelete(null)
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
                  <div className="text-right shrink-0 mr-1">
                    <p className="text-xs font-bold">{aptCount}</p>
                    <p className="text-[10px] text-neutral-500">{t.buildings.apts}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer rounded-full hover:bg-black/5 shrink-0">
                        <MoreVertical className="h-4 w-4 text-neutral-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-none shadow-lg rounded-sm">
                      <DropdownMenuItem 
                        className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-neutral-900 rounded-sm"
                        onClick={(e) => { e.stopPropagation(); setEditingBuilding(building); setIsEditBuildingOpen(true) }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-neutral-500" />
                        {t.common.edit}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-black/5" />
                      <DropdownMenuItem 
                        className="cursor-pointer text-xs gap-2 py-2 text-red-600 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-600 rounded-sm"
                        onClick={(e) => { e.stopPropagation(); handleDeleteConfirm(building, "building") }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t.common.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Apartments Detail */}
        <div className="lg:col-span-2">
          {selectedBuildingData ? (
            <Card className="border-none bg-neutral-100">
              {selectedApartment ? (
                <>
                  <CardHeader className="p-4 pb-2 border-b border-black/5">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full hover:bg-black/5 cursor-pointer"
                        onClick={() => setSelectedApartment(null)}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div>
                        <CardTitle className="text-base">{t.buildings.residentDetails}</CardTitle>
                        <CardDescription className="text-xs">
                          {selectedBuildingData.name} · {t.buildings.apartmentNumber} {selectedApartment.number}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 cursor-pointer border-none bg-white hover:bg-primary/5"
                        onClick={() => { setEditingApt(selectedApartment); setIsEditAptOpen(true) }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-neutral-500" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 cursor-pointer border-none bg-white hover:bg-primary/5 group"
                        onClick={() => handleDeleteConfirm(selectedApartment, "apartment")}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-500 group-hover:text-red-600" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {/* Apartment Info */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.buildings.apartmentNumber} {t.common.info}</h4>
                          <div className="p-4 rounded-xl bg-white shadow-none border-none">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <DoorOpen className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-bold">{t.buildings.apartmentNumber} {selectedApartment.number}</p>
                                <p className="text-xs text-neutral-500">{t.buildings.floor} {selectedApartment.floor}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                              <div>
                                <p className="text-[10px] text-neutral-400 uppercase">{t.buildings.tantiemes}</p>
                                <p className="text-sm font-semibold">{selectedApartment.tantiemes} m²</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-neutral-400 uppercase">{t.buildings.owner}</p>
                                <p className="text-sm font-semibold">{selectedApartment.ownerName}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Occupants */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.buildings.occupants}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-black/5">
                              <Avatar className="h-10 w-10 border border-black/5">
                                <AvatarFallback className="bg-red-100 text-[#FF0000] font-bold">{selectedApartment.ownerName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-semibold">{selectedApartment.ownerName}</p>
                                <p className="text-[10px] text-neutral-500">{t.common.owner}</p>
                              </div>
                            </div>

                            {selectedApartment.tenantName && (
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-black/5">
                                <Avatar className="h-10 w-10 border border-black/5">
                                  <AvatarFallback className="bg-neutral-200 text-neutral-600">{selectedApartment.tenantName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-semibold">{selectedApartment.tenantName}</p>
                                  <p className="text-[10px] text-neutral-500">{t.common.tenant}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Payment History */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.buildings.paymentHistory}</h4>
                        </div>
                        
                        <div className="space-y-2">
                          {charges
                            .filter(c => c.apartmentId === selectedApartment.id)
                            .map((charge) => (
                              <div key={charge.id} className="flex items-center justify-between p-3 rounded-lg bg-white shadow-none border-none">
                                <div>
                                  <p className="text-sm font-medium">{charge.month} {charge.year}</p>
                                  <p className="text-xs font-bold text-neutral-900 mt-0.5">{charge.amount} MAD</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={charge.status === "Paid" ? "success" : charge.status === "Partial" ? "warning" : "danger"} className="text-[10px] mb-1 block w-fit ml-auto">
                                    {charge.status === "Paid" ? t.status.paid : charge.status === "Partial" ? t.status.partial : t.status.unpaid}
                                  </Badge>
                                  {charge.paidDate && <p className="text-[9px] text-neutral-400">{t.common.paidOn} {charge.paidDate}</p>}
                                </div>
                              </div>
                            ))}
                          {charges.filter(c => c.apartmentId === selectedApartment.id).length === 0 && (
                            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-black/5">
                              <p className="text-xs text-neutral-400 italic">{t.buildings.noHistoryFound}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{selectedBuildingData.name}</CardTitle>
                        <CardDescription className="text-xs">{selectedBuildingData.floors} {t.common.floorsAptsRegistered.split('·')[0].trim()} · {buildingApartments.length} {t.common.floorsAptsRegistered.split('·')[1].trim()}</CardDescription>
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
                            <th className="text-right text-[10px] font-medium text-neutral-500 uppercase tracking-wider px-3 py-2.5"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {buildingApartments.map((apt) => (
                            <tr 
                              key={apt.id} 
                              className="border-b border-black/5 last:border-0 hover:bg-black/5 transition-colors cursor-pointer"
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
                              <td className="px-3 py-2.5 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer rounded-full hover:bg-black/5">
                                      <MoreVertical className="h-3.5 w-3.5 text-neutral-400" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-white border-none shadow-lg rounded-sm">
                                    <DropdownMenuItem 
                                      className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-neutral-900 rounded-sm"
                                      onClick={(e) => { e.stopPropagation(); setEditingApt(apt); setIsEditAptOpen(true) }}
                                    >
                                      <Pencil className="h-3.5 w-3.5 text-neutral-500" />
                                      {t.common.edit}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-black/5" />
                                    <DropdownMenuItem 
                                      className="cursor-pointer text-xs gap-2 py-2 text-red-600 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-600 rounded-sm"
                                      onClick={(e) => { e.stopPropagation(); handleDeleteConfirm(apt, "apartment") }}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                      {t.common.delete}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-black/5 rounded-xl bg-neutral-50/50">
              <Building2 className="h-10 w-10 text-neutral-300 mb-3" />
              <p className="text-sm text-neutral-500 font-medium">{t.buildings.selectBuildingToView}</p>
            </div>
          )}
        </div>
      </div>



      {/* Add Apartment Dialog */}
      <Dialog open={isAddAptOpen} onOpenChange={(o) => { setIsAddAptOpen(o); if (!o) setNewApt({ floor: "", number: "", tantiemes: "", ownerId: "" }) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader><DialogTitle>{t.buildings.addApartment}</DialogTitle><DialogDescription>{t.buildings.addApartmentTo} {selectedBuildingData?.name}.</DialogDescription></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-3 items-start">
              <div className="grid gap-2"><Label className="text-xs">{t.buildings.apartmentNumber}</Label><Input placeholder="101" className="bg-neutral-100 border-none rounded-sm" value={newApt.number} onChange={(e) => setNewApt(p => ({ ...p, number: e.target.value }))} /></div>
              <div className="grid gap-2 items-start">
                <Label className="text-xs">{t.buildings.floor}</Label>
                <Input type="number" placeholder="1" className={cn("bg-neutral-100 border-none rounded-sm", parseInt(newApt.floor) > (selectedBuildingData?.floors || 0) && "ring-1 ring-red-500")} value={newApt.floor} onChange={(e) => setNewApt(p => ({ ...p, floor: e.target.value }))} />
                {parseInt(newApt.floor) > (selectedBuildingData?.floors || 0) && <p className="text-[10px] text-red-500 font-medium leading-tight mt-1">{t.buildings.floorValidationError}</p>}
              </div>
            </div>
            <div className="grid gap-2"><Label className="text-xs">{t.buildings.tantiemes}</Label><Input type="number" placeholder="120" className="bg-neutral-100 border-none rounded-sm" value={newApt.tantiemes} onChange={(e) => setNewApt(p => ({ ...p, tantiemes: e.target.value }))} /></div>
            <div className="grid gap-2"><Label className="text-xs">{t.buildings.owner}</Label>
              <Select value={newApt.ownerId} onValueChange={(v) => setNewApt(p => ({ ...p, ownerId: v }))}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.buildings.selectOwner} /></SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg">{managedUsers.filter(u => u.role === "Owner").map(u => (<SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>))}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button className="w-full cursor-pointer" onClick={handleAddApartment}>{t.buildings.addApartment}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Building Dialog */}
      <Dialog open={isEditBuildingOpen} onOpenChange={(o) => { setIsEditBuildingOpen(o); if (!o) setEditingBuilding(null) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader>
            <DialogTitle>{t.buildings.editBuilding}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-xs">{t.buildings.buildingName}</Label>
              <Input 
                className="bg-neutral-100 border-none rounded-sm" 
                value={editingBuilding?.name || ""} 
                onChange={(e) => setEditingBuilding(p => p ? ({ ...p, name: e.target.value }) : null)} 
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs">{t.buildings.address}</Label>
              <Input 
                className="bg-neutral-100 border-none rounded-sm" 
                value={editingBuilding?.address || ""} 
                onChange={(e) => setEditingBuilding(p => p ? ({ ...p, address: e.target.value }) : null)} 
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs">{t.buildings.totalFloors}</Label>
              <Input 
                type="number" 
                className="bg-neutral-100 border-none rounded-sm" 
                value={editingBuilding?.floors || ""} 
                onChange={(e) => setEditingBuilding(p => p ? ({ ...p, floors: parseInt(e.target.value) || 0 }) : null)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full cursor-pointer" onClick={handleEditBuilding}>{t.common.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Apartment Dialog */}
      <Dialog open={isEditAptOpen} onOpenChange={(o) => { setIsEditAptOpen(o); if (!o) setEditingApt(null) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader>
            <DialogTitle>{t.buildings.editApartment}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-3 items-start">
              <div className="grid gap-2">
                <Label className="text-xs">{t.buildings.apartmentNumber}</Label>
                <Input 
                  className="bg-neutral-100 border-none rounded-sm" 
                  value={editingApt?.number || ""} 
                  onChange={(e) => setEditingApt(p => p ? ({ ...p, number: e.target.value }) : null)} 
                />
              </div>
              <div className="grid gap-2 items-start">
                <Label className="text-xs">{t.buildings.floor}</Label>
                <Input 
                  type="number" 
                  className={cn("bg-neutral-100 border-none rounded-sm", (editingApt?.floor || 0) > (selectedBuildingData?.floors || 0) && "ring-1 ring-red-500")} 
                  value={editingApt?.floor || ""} 
                  onChange={(e) => setEditingApt(p => p ? ({ ...p, floor: parseInt(e.target.value) || 0 }) : null)} 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs">{t.buildings.tantiemes}</Label>
              <Input 
                type="number" 
                className="bg-neutral-100 border-none rounded-sm" 
                value={editingApt?.tantiemes || ""} 
                onChange={(e) => setEditingApt(p => p ? ({ ...p, tantiemes: parseInt(e.target.value) || 0 }) : null)} 
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs">{t.buildings.owner}</Label>
              <Select value={editingApt?.ownerId} onValueChange={(v) => setEditingApt(p => p ? ({ ...p, ownerId: v }) : null)}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                  <SelectValue placeholder={t.buildings.selectOwner} />
                </SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg">
                  {managedUsers.filter(u => u.role === "Owner").map(u => (
                    <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full cursor-pointer" onClick={handleEditApartment}>{t.common.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="bg-white border-none rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmType === "building" ? t.buildings.deleteBuilding : t.buildings.deleteApartment}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmType === "building" ? t.buildings.confirmDeleteBuilding : t.buildings.confirmDeleteApartment}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-neutral-100 hover:bg-neutral-200 rounded-sm text-xs cursor-pointer">{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeDelete} 
              className="border-none rounded-sm text-xs text-white cursor-pointer bg-red-600 hover:bg-red-700"
            >
              {t.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
