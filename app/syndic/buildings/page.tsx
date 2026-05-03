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
  const [localApartments, setLocalApartments] = useState<Apartment[]>(() => {
    const apts = [...initApartments];
    initBuildings.forEach(b => {
      let aptNumberCounter = 1;
      for (let f = 1; f <= b.floors; f++) {
        for (let a = 1; a <= b.aptsPerFloor; a++) {
          const numberStr = aptNumberCounter.toString();
          const exists = apts.some(apt => apt.buildingId === b.id && apt.number === numberStr);
          if (!exists) {
            apts.push({
              id: `apt-${b.id}-${f}-${a}`,
              buildingId: b.id,
              floor: f,
              number: numberStr,
              tantiemes: 100,
              ownerId: "",
              ownerName: ""
            });
          }
          aptNumberCounter++;
        }
      }
    });
    return apts;
  });
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)
  const [isAddBuildingOpen, setIsAddBuildingOpen] = useState(false)
  const [newBuilding, setNewBuilding] = useState({ name: "", address: "", floors: "", aptsPerFloor: "" })
  
  const getGridColsClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-2 sm:grid-cols-3";
    if (count === 4) return "grid-cols-2 sm:grid-cols-4";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  };
  
  // Edit & Delete State
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null)
  const [isEditBuildingOpen, setIsEditBuildingOpen] = useState(false)
  const [editingApt, setEditingApt] = useState<Apartment | null>(null)
  const [isEditAptOpen, setIsEditAptOpen] = useState(false)
  
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<"building">("building")
  const [itemToDelete, setItemToDelete] = useState<Building | null>(null)

  const selectedBuildingData = localBuildings.find(b => b.id === selectedBuilding)
  const buildingApartments = localApartments.filter(a => a.buildingId === selectedBuilding)

  const handleAddBuilding = () => {
    if (!newBuilding.name || !newBuilding.address || !newBuilding.floors || !newBuilding.aptsPerFloor) return
    const floors = parseInt(newBuilding.floors) || 1
    const aptsPerFloor = parseInt(newBuilding.aptsPerFloor) || 1
    const bId = `building-${Date.now()}`
    
    const b: Building = { id: bId, name: newBuilding.name, address: newBuilding.address, floors: floors, aptsPerFloor: aptsPerFloor }
    
    // Auto-generate apartments
    const generatedApts: Apartment[] = []
    let aptNumberCounter = 1;
    for (let f = 1; f <= floors; f++) {
      for (let a = 1; a <= aptsPerFloor; a++) {
        generatedApts.push({
          id: `apt-${bId}-${f}-${a}`,
          buildingId: bId,
          floor: f,
          number: aptNumberCounter.toString(),
          tantiemes: 100,
          ownerId: "",
          ownerName: "",
        })
        aptNumberCounter++;
      }
    }

    setLocalBuildings(prev => [...prev, b])
    setLocalApartments(prev => [...prev, ...generatedApts])
    setNewBuilding({ name: "", address: "", floors: "", aptsPerFloor: "" })
    setIsAddBuildingOpen(false)
  }

  const handleEditBuilding = () => {
    if (!editingBuilding) return
    setLocalBuildings(prev => prev.map(b => b.id === editingBuilding.id ? editingBuilding : b))
    setIsEditBuildingOpen(false)
    setEditingBuilding(null)
  }

  const handleEditApartment = () => {
    if (!editingApt) return
    setLocalApartments(prev => prev.map(a => a.id === editingApt.id ? editingApt : a))
    
    // Also update the currently viewed apartment so details reflect immediately
    if (selectedApartment?.id === editingApt.id) {
      setSelectedApartment(editingApt)
    }

    setIsEditAptOpen(false)
    setEditingApt(null)
  }

  const handleDeleteConfirm = (item: Building) => {
    setItemToDelete(item)
    setConfirmType("building")
    setConfirmOpen(true)
  }

  const executeDelete = () => {
    if (!itemToDelete) return
    setLocalBuildings(prev => prev.filter(b => b.id !== itemToDelete.id))
    setLocalApartments(prev => prev.filter(a => a.buildingId !== itemToDelete.id))
    if (selectedBuilding === itemToDelete.id) {
      setSelectedBuilding(null)
      setSelectedApartment(null)
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
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2"><Label className="text-xs">{t.buildings.totalFloors}</Label><Input type="number" placeholder="5" className="bg-neutral-100 border-none rounded-sm" value={newBuilding.floors} onChange={(e) => setNewBuilding(p => ({ ...p, floors: e.target.value }))} /></div>
                <div className="grid gap-2"><Label className="text-xs">Apts per Floor</Label><Input type="number" placeholder="4" className="bg-neutral-100 border-none rounded-sm" value={newBuilding.aptsPerFloor} onChange={(e) => setNewBuilding(p => ({ ...p, aptsPerFloor: e.target.value }))} /></div>
              </div>
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
                        onClick={(e) => { e.stopPropagation(); handleDeleteConfirm(building) }}
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
                    <div className="flex items-center justify-between">
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {/* Apartment Info */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.buildings.apartmentNumber} {t.common.info}</h4>
                          <div className="p-4 rounded-sm bg-white border border-black/5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
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
                            </div>
                          </div>
                        </div>

                        {/* Occupants */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.buildings.occupants}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 rounded-sm bg-white border border-black/5">
                              {selectedApartment.ownerName ? (
                                <>
                                  <Avatar className="h-10 w-10 border border-black/5">
                                    <AvatarFallback className="bg-red-100 text-[#FF0000] font-bold">{selectedApartment.ownerName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-semibold">{selectedApartment.ownerName}</p>
                                    <p className="text-[10px] text-neutral-500">{t.common.owner}</p>
                                  </div>
                                </>
                              ) : (
                                <p className="text-xs text-neutral-400 italic py-2">{t.buildings.selectOwner} (Empty)</p>
                              )}
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-sm bg-white border border-black/5">
                              {selectedApartment.tenantName ? (
                                <>
                                  <Avatar className="h-10 w-10 border border-black/5">
                                    <AvatarFallback className="bg-neutral-200 text-neutral-600">{selectedApartment.tenantName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-semibold">{selectedApartment.tenantName}</p>
                                    <p className="text-[10px] text-neutral-500">{t.common.tenant}</p>
                                  </div>
                                </>
                              ) : (
                                <p className="text-xs text-neutral-400 italic py-2">No Tenant</p>
                              )}
                            </div>
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
                              <div key={charge.id} className="flex items-center justify-between p-3 rounded-sm bg-white border border-black/5">
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
                            <div className="text-center py-10 bg-white rounded-sm border border-dashed border-black/5">
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
                    <div className="flex justify-between items-center">
                       <div>
                         <CardTitle className="text-base">{selectedBuildingData.name}</CardTitle>
                         <CardDescription className="text-xs">{selectedBuildingData.floors} {t.common.floorsAptsRegistered.split('·')[0].trim()} · {buildingApartments.length} {t.common.floorsAptsRegistered.split('·')[1].trim()}</CardDescription>
                       </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-4 bg-neutral-50/50 rounded-b-xl border-t border-black/5">
                    <div className="space-y-8">
                      {Array.from({ length: selectedBuildingData.floors }, (_, i) => selectedBuildingData.floors - i).map(floorNum => {
                        const aptsOnFloor = buildingApartments.filter(a => a.floor === floorNum).sort((a, b) => parseInt(a.number) - parseInt(b.number))
                        return (
                          <div key={floorNum} className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="h-px bg-neutral-200 flex-1"></div>
                              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t.buildings.floor} {floorNum}</span>
                              <div className="h-px bg-neutral-200 flex-1"></div>
                            </div>
                            <div className={cn("grid gap-3", getGridColsClass(selectedBuildingData.aptsPerFloor))}>
                              {aptsOnFloor.map(apt => {
                                const isOccupied = !!apt.ownerId
                                return (
                                  <div 
                                    key={apt.id}
                                    onClick={() => setSelectedApartment(apt)}
                                    className={cn("p-3 rounded-sm border cursor-pointer transition-all duration-200 relative group min-h-[5rem]", 
                                      isOccupied ? "bg-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary/10" : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm"
                                    )}
                                  >
                                    <div className="flex justify-between items-start mb-1.5">
                                      <div className={cn("font-bold text-lg", isOccupied ? "text-primary" : "text-neutral-400")}>{apt.number}</div>
                                      {isOccupied ? <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div> : <div className="h-2 w-2 rounded-full bg-neutral-200 mt-1.5"></div>}
                                    </div>
                                    <div className="flex flex-col justify-end">
                                      {isOccupied ? (
                                        <div className="text-[10px] font-medium text-neutral-700 truncate leading-tight">{apt.ownerName}</div>
                                      ) : (
                                        <div className="text-[10px] text-neutral-400 italic">Empty</div>
                                      )}
                                      {apt.tenantName && (
                                        <div className="text-[9px] text-neutral-500 truncate mt-0.5 leading-tight">{apt.tenantName} (T)</div>
                                      )}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
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
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label className="text-xs">{t.buildings.totalFloors}</Label>
                <Input 
                  type="number" 
                  className="bg-neutral-100 border-none rounded-sm" 
                  value={editingBuilding?.floors || ""} 
                  onChange={(e) => setEditingBuilding(p => p ? ({ ...p, floors: parseInt(e.target.value) || 0 }) : null)} 
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs">Apts per Floor</Label>
                <Input 
                  type="number" 
                  className="bg-neutral-100 border-none rounded-sm" 
                  value={editingBuilding?.aptsPerFloor || ""} 
                  onChange={(e) => setEditingBuilding(p => p ? ({ ...p, aptsPerFloor: parseInt(e.target.value) || 0 }) : null)} 
                />
              </div>
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
            <div className="grid gap-2">
              <Label className="text-xs">{t.buildings.tantiemes}</Label>
              <Input 
                type="number" 
                className="bg-neutral-100 border-none rounded-sm" 
                value={editingApt?.tantiemes || ""} 
                onChange={(e) => setEditingApt(p => p ? ({ ...p, tantiemes: parseInt(e.target.value) || 0 }) : null)} 
              />
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
              {t.buildings.deleteBuilding}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t.buildings.confirmDeleteBuilding}
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
