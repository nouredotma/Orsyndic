"use client"

import { useState } from "react"
import { CreditCard, Search, Zap, Check, X, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { charges, apartments, buildings } from "@/lib/mock-data"
import type { ChargeStatus, Charge } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function ChargesPage() {
  const { t } = useI18n()
  const [localCharges, setLocalCharges] = useState<Charge[]>(charges)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | ChargeStatus>("All")
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [ratePerTantieme, setRatePerTantieme] = useState("5")
  const [sendEmail, setSendEmail] = useState(true)
  const [genBuilding, setGenBuilding] = useState("")
  const [genMonth, setGenMonth] = useState(MONTHS[new Date().getMonth()])
  const [genYear, setGenYear] = useState(new Date().getFullYear().toString())

  // Edit charge state
  const [editingCharge, setEditingCharge] = useState<Charge | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  // Delete charge state
  const [deleteChargeId, setDeleteChargeId] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const filteredCharges = localCharges.filter((c) => {
    const matchesSearch = c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) || c.apartmentNumber.includes(searchQuery)
    const matchesStatus = filterStatus === "All" || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPaid = localCharges.filter(c => c.status === "Paid").length
  const totalUnpaid = localCharges.filter(c => c.status === "Unpaid" || c.status === "Partial").length
  const totalCollectedAmt = localCharges.filter(c => c.status === "Paid").reduce((sum, c) => sum + c.amount, 0)
  const totalOutstandingAmt = localCharges.filter(c => c.status === "Unpaid" || c.status === "Partial").reduce((sum, c) => sum + c.amount, 0)

  const handleGenerate = () => {
    const rate = parseFloat(ratePerTantieme) || 0
    if (rate <= 0 || !genBuilding) return

    const selectedBuilding = buildings.find(b => b.id === genBuilding)
    const buildingApts = apartments.filter(a => a.buildingId === genBuilding)

    const newCharges: Charge[] = buildingApts.map(apt => ({
      id: `chg-new-${Date.now()}-${apt.id}`,
      apartmentId: apt.id,
      apartmentNumber: apt.number,
      buildingName: selectedBuilding?.name || "",
      ownerName: apt.ownerName || "—",
      month: genMonth,
      year: parseInt(genYear),
      amount: Math.round(apt.tantiemes * rate),
      status: "Unpaid" as ChargeStatus,
      validatedByAdmin: false,
    }))

    setLocalCharges(prev => [...newCharges, ...prev])
    setIsGenerateOpen(false)
  }

  const handleValidate = (id: string) => {
    setLocalCharges(prev => prev.map(c => c.id === id ? { ...c, validatedByAdmin: true } : c))
  }

  const handleMarkAsPaid = (id: string) => {
    setLocalCharges(prev => prev.map(c => c.id === id ? { ...c, status: "Paid" as ChargeStatus, paidDate: new Date().toISOString().split('T')[0] } : c))
  }

  const handleEditSave = () => {
    if (!editingCharge) return
    setLocalCharges(prev => prev.map(c => c.id === editingCharge.id ? editingCharge : c))
    setIsEditOpen(false)
    setEditingCharge(null)
  }

  const handleDeleteConfirm = () => {
    if (!deleteChargeId) return
    setLocalCharges(prev => prev.filter(c => c.id !== deleteChargeId))
    setIsDeleteOpen(false)
    setDeleteChargeId(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer"><Zap className="h-4 w-4" />{t.charges.generateCharges}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>{t.charges.generateCharges}</DialogTitle>
              <DialogDescription>
                {t.charges.calculateCharges}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-xs">{t.charges.selectBuilding}</Label>
                <Select value={genBuilding} onValueChange={setGenBuilding}>
                  <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                    <SelectValue placeholder={t.charges.selectBuilding} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-none shadow-lg rounded-sm">
                    {buildings.map(b => (
                      <SelectItem key={b.id} value={b.id} className="text-xs">{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label className="text-xs">{t.charges.selectMonth}</Label>
                  <Select value={genMonth} onValueChange={setGenMonth}>
                    <SelectTrigger className="bg-neutral-100 border-none rounded-sm text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-lg rounded-sm">
                      {MONTHS.map(m => (
                        <SelectItem key={m} value={m} className="text-xs">{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">{t.charges.period}</Label>
                  <Input 
                    type="number" 
                    className="bg-neutral-100 border-none rounded-sm" 
                    value={genYear} 
                    onChange={(e) => setGenYear(e.target.value)} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rate" className="text-right text-xs font-semibold">
                  {t.charges.rate}
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input 
                    id="rate" 
                    value={ratePerTantieme} 
                    onChange={(e) => setRatePerTantieme(e.target.value)} 
                    className="col-span-3 text-sm bg-neutral-100 border-none rounded-sm" 
                  />
                  <span className="text-xs text-neutral-500 whitespace-nowrap">{t.charges.perTantieme}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email-notifications" className="text-sm font-medium">{t.charges.emailNotifications}</Label>
                  <span className="text-xs text-neutral-500">{t.charges.sendAutomatedEmail}</span>
                </div>
                <Switch id="email-notifications" checked={sendEmail} onCheckedChange={setSendEmail} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleGenerate} className="w-full cursor-pointer">{t.charges.generateCharges}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 bg-[#00D100]/10 rounded-sm">
              <Check className="h-4 w-4 text-[#00D100]" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalPaid}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.charges.paid}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 bg-[#FF0000]/10 rounded-sm">
              <X className="h-4 w-4 text-[#FF0000]" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalUnpaid}</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.charges.unpaid}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 bg-emerald-50 rounded-sm">
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalCollectedAmt.toLocaleString()} <span className="text-xs font-normal">MAD</span></p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.charges.totalCollected}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 bg-amber-50 rounded-sm">
              <CreditCard className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalOutstandingAmt.toLocaleString()} <span className="text-xs font-normal">MAD</span></p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.charges.totalOutstanding}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" /><Input placeholder={t.charges.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-sm bg-neutral-100 border-none shadow-none text-sm" /></div>
        <div className="flex rounded-sm bg-neutral-100 p-0.5 gap-0.5">{(["All", "Paid", "Unpaid", "Partial"] as const).map((s) => (<button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer", filterStatus === s ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-neutral-700")}>{s === "All" ? t.common.all : s === "Paid" ? t.charges.paid : s === "Unpaid" ? t.charges.unpaid : t.status.partial}</button>))}</div>
      </div>

      <Card className="border-none bg-neutral-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">{t.charges.owner}</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">{t.charges.apt}</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">{t.charges.period}</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">{t.charges.amount}</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">{t.charges.status}</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">{t.charges.validated}</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">{t.charges.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredCharges.map((c) => (
                  <tr key={c.id} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3 text-sm font-medium">{c.ownerName}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600">{c.apartmentNumber}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600">{c.month} {c.year}</td>
                    <td className="px-4 py-3 text-xs font-bold">{c.amount} MAD</td>
                    <td className="px-4 py-3"><Badge variant={c.status === "Paid" ? "success" : c.status === "Partial" ? "warning" : "danger"} className="text-[10px]">{c.status === "Paid" ? t.status.paid : c.status === "Partial" ? t.status.partial : t.status.unpaid}</Badge></td>
                    <td className="px-4 py-3">{c.validatedByAdmin ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-neutral-300" />}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 items-center">
                        {(c.status === "Unpaid" || c.status === "Partial") && <Button variant="outline" size="sm" className="text-[10px] h-7 cursor-pointer border-none bg-white hover:bg-primary/5" onClick={() => handleMarkAsPaid(c.id)}>{t.charges.markPaid}</Button>}
                        {!c.validatedByAdmin && c.status === "Paid" && <Button variant="outline" size="sm" className="text-[10px] h-7 cursor-pointer border-none bg-white hover:bg-primary/5" onClick={() => handleValidate(c.id)}>{t.charges.validate}</Button>}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-primary group transition-colors">
                              <MoreVertical className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1">
                            <DropdownMenuItem onClick={() => { setEditingCharge(c); setIsEditOpen(true) }} className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm">
                              <Pencil className="h-3.5 w-3.5" />
                              {t.charges.editCharge}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-black/5" />
                            <DropdownMenuItem onClick={() => { setDeleteChargeId(c.id); setIsDeleteOpen(true) }} className="cursor-pointer text-xs gap-2 py-2 text-red-500 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-500 rounded-sm">
                              <Trash2 className="h-3.5 w-3.5" />
                              {t.charges.deleteCharge}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Charge Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(o) => { setIsEditOpen(o); if (!o) setEditingCharge(null) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader><DialogTitle>{t.charges.editCharge}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-xs">{t.charges.amount} (MAD)</Label>
              <Input type="number" className="bg-neutral-100 border-none rounded-sm" value={editingCharge?.amount || ""} onChange={(e) => setEditingCharge(p => p ? ({ ...p, amount: parseInt(e.target.value) || 0 }) : null)} />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs">{t.charges.status}</Label>
              <Select value={editingCharge?.status || "Unpaid"} onValueChange={(v) => setEditingCharge(p => p ? ({ ...p, status: v as ChargeStatus }) : null)}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg rounded-sm">
                  <SelectItem value="Paid" className="text-xs">{t.status.paid}</SelectItem>
                  <SelectItem value="Unpaid" className="text-xs">{t.status.unpaid}</SelectItem>
                  <SelectItem value="Partial" className="text-xs">{t.status.partial}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button className="w-full cursor-pointer" onClick={handleEditSave}>{t.common.save}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Charge Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-white border-none rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.charges.deleteCharge}</AlertDialogTitle>
            <AlertDialogDescription>{t.charges.confirmDeleteCharge}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-neutral-100 hover:bg-neutral-200 rounded-sm text-xs cursor-pointer">{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="border-none rounded-sm text-xs text-white cursor-pointer bg-red-600 hover:bg-red-700">{t.common.delete}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
