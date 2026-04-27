"use client"

import { CreditCard, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { charges } from "@/lib/mock-data"
import { useI18n } from "@/lib/i18n-context"

export default function MyChargesPage() {
  const { t } = useI18n()
  const user = getCurrentUser()
  const myCharges = charges.filter(c => c.apartmentId === user?.apartmentId)
  const unpaidTotal = myCharges.filter(c => c.status !== "Paid").reduce((sum, c) => sum + c.amount, 0)

  const handleDownloadPDF = (charge: typeof charges[0]) => {
    const receipt = `
╔══════════════════════════════════════════╗
║          ${t.sidebar.dashboard.toUpperCase()} PAYMENT RECEIPT         ║
╠══════════════════════════════════════════╣
║                                           ║
║  Receipt ID:    ${charge.id.padEnd(24)}║
║  Date:          ${(charge.paidDate || "N/A").padEnd(24)}║
║  Owner:         ${charge.ownerName.padEnd(24)}║
║  Apartment:     ${charge.apartmentNumber.padEnd(24)}║
║  Building:      ${charge.buildingName.padEnd(24)}║
║  Period:        ${(charge.month + " " + charge.year).padEnd(24)}║
║  Amount:        ${(charge.amount + " MAD").padEnd(24)}║
║  Status:        ${charge.status.padEnd(24)}║
║  Validated:     ${"Yes".padEnd(24)}║
║                                           ║
╠══════════════════════════════════════════╣
║  Thank you for your payment.              ║
║  Orsyndic Property Management             ║
╚══════════════════════════════════════════╝
`.trim()
    const blob = new Blob([receipt], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `receipt_${charge.apartmentNumber}_${charge.month}_${charge.year}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-4">
            <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mb-1">{t.myCharges.outstanding}</p>
            <p className="text-2xl font-bold text-[#FF0000]">{unpaidTotal} MAD</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-4">
            <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mb-1">{t.myCharges.totalCharges}</p>
            <p className="text-2xl font-bold">{myCharges.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2"><CardTitle className="text-base">{t.myCharges.chargeHistory}</CardTitle></CardHeader>
        <CardContent className="p-4 pt-1">
          <div className="space-y-2">
            {myCharges.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-sm bg-primary/10 flex items-center justify-center"><CreditCard className="h-4 w-4 text-primary" /></div>
                  <div><p className="text-sm font-medium">{c.month} {c.year}</p><p className="text-[10px] text-neutral-500">Apt {c.apartmentNumber}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold">{c.amount} MAD</p>
                    <Badge variant={c.status === "Paid" ? "success" : c.status === "Partial" ? "warning" : "danger"} className="text-[10px]">{c.status}</Badge>
                  </div>
                  {c.status === "Paid" && c.validatedByAdmin && (
                    <Button variant="ghost" size="sm" className="text-[10px] h-7 gap-1 cursor-pointer text-primary" onClick={() => handleDownloadPDF(c)}>
                      <Download className="h-3 w-3" />{t.myCharges.downloadPDF}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
