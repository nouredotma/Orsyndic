"use client"

import { useState } from "react"
import { CreditCard, Search, Zap, Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { charges, apartments } from "@/lib/mock-data"
import type { ChargeStatus, Charge } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ChargesPage() {
  const [localCharges, setLocalCharges] = useState<Charge[]>(charges)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | ChargeStatus>("All")
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [ratePerTantieme, setRatePerTantieme] = useState("5")
  const [sendEmail, setSendEmail] = useState(true)

  const filteredCharges = localCharges.filter((c) => {
    const matchesSearch = c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) || c.apartmentNumber.includes(searchQuery)
    const matchesStatus = filterStatus === "All" || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPaid = localCharges.filter(c => c.status === "Paid").length
  const totalUnpaid = localCharges.filter(c => c.status === "Unpaid" || c.status === "Partial").length

  const handleGenerate = () => {
    const rate = parseFloat(ratePerTantieme) || 0
    if (rate <= 0) return

    const newCharges: Charge[] = apartments.map(apt => ({
      id: `chg-new-${Date.now()}-${apt.id}`,
      apartmentId: apt.id,
      apartmentNumber: apt.number,
      buildingName: "Résidence Al Andalous", // Simplified for mockup
      ownerName: apt.ownerName,
      month: "May",
      year: 2026,
      amount: Math.round(apt.tantiemes * rate),
      status: "Unpaid",
      validatedByAdmin: false,
    }))

    setLocalCharges(prev => [...newCharges, ...prev])
    setIsGenerateOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer"><Zap className="h-4 w-4" />Generate Charges</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate Monthly Charges</DialogTitle>
              <DialogDescription>
                Automatically calculate charges based on apartment tantièmes (m²).
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rate" className="text-right text-xs font-semibold">
                  Rate (MAD)
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input 
                    id="rate" 
                    value={ratePerTantieme} 
                    onChange={(e) => setRatePerTantieme(e.target.value)} 
                    className="col-span-3 text-sm" 
                  />
                  <span className="text-xs text-neutral-500 whitespace-nowrap">per tantième</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email-notifications" className="text-sm font-medium">Email Notifications</Label>
                  <span className="text-xs text-neutral-500">Send an automated email to owners.</span>
                </div>
                <Switch id="email-notifications" checked={sendEmail} onCheckedChange={setSendEmail} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleGenerate} className="w-full">Generate for May 2026</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold">{localCharges.length}</p><p className="text-[10px] text-neutral-500">Total</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-[#00D100]">{totalPaid}</p><p className="text-[10px] text-neutral-500">Paid</p></CardContent></Card>
        <Card className="border-none bg-neutral-100"><CardContent className="p-3 text-center"><p className="text-lg font-bold text-[#FF0000]">{totalUnpaid}</p><p className="text-[10px] text-neutral-500">Unpaid</p></CardContent></Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 rounded-sm bg-neutral-50 border-black/10 text-sm" />
        </div>
        <div className="flex rounded-md bg-neutral-100 p-0.5 gap-0.5">
          {(["All", "Paid", "Unpaid", "Partial"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer", filterStatus === s ? "bg-white text-black shadow-sm" : "text-neutral-500")}>{s}</button>
          ))}
        </div>
      </div>

      <Card className="border-none bg-neutral-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">Owner</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">Apt</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">Period</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">Amount</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">Status</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">Validated</th>
                  <th className="text-left text-[10px] font-medium text-neutral-500 uppercase px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCharges.map((c) => (
                  <tr key={c.id} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3 text-sm font-medium">{c.ownerName}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600">{c.apartmentNumber}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600">{c.month} {c.year}</td>
                    <td className="px-4 py-3 text-xs font-bold">{c.amount} MAD</td>
                    <td className="px-4 py-3"><Badge variant={c.status === "Paid" ? "success" : c.status === "Partial" ? "warning" : "danger"} className="text-[10px]">{c.status}</Badge></td>
                    <td className="px-4 py-3">{c.validatedByAdmin ? <Check className="h-4 w-4 text-emerald-500" /> : <X className="h-4 w-4 text-neutral-300" />}</td>
                    <td className="px-4 py-3">{!c.validatedByAdmin && c.status !== "Unpaid" && <Button variant="outline" size="sm" className="text-[10px] h-7 cursor-pointer">Validate</Button>}</td>
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
