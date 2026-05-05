"use client"

import { jsPDF } from "jspdf"

import { useState, useEffect } from "react"
import { CreditCard, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { charges } from "@/lib/mock-data"
import { useI18n } from "@/lib/i18n-context"
import { MyChargesPageSkeleton } from "@/components/dashboard-skeletons"

export default function MyChargesPage() {
  const { t, language } = useI18n()
  const user = getCurrentUser()
  const [isLoading, setIsLoading] = useState(true)
  const myCharges = charges.filter(c => c.apartmentId === user?.apartmentId)
  const unpaidTotal = myCharges.filter(c => c.status !== "Paid").reduce((sum, c) => sum + c.amount, 0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <MyChargesPageSkeleton />

  const handleDownloadPDF = (charge: typeof charges[0]) => {
    const doc = new jsPDF()
    
    // Header
    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.setTextColor(30, 30, 30)
    doc.text("ORSYNDIC", 105, 20, { align: "center" })
    
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text(t.common.propertyManagement, 105, 27, { align: "center" })
    
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(20, 35, 190, 35)
    
    // Title
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text(t.common.paymentReceipt, 20, 50)
    
    // Content Table
    doc.setFontSize(10)
    let y = 65
    const col1 = 20
    const col2 = 70
    const lineSpacing = 10
    
    const rows = [
      [t.common.receiptId, charge.id],
      [t.common.date, charge.paidDate || "N/A"],
      [t.buildings.owner, charge.ownerName],
      [t.buildings.apartmentNumber, charge.apartmentNumber],
      [t.sidebar.buildings, charge.buildingName],
      [t.common.period, `${charge.month} ${charge.year}`],
    ]
    
    rows.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold")
      doc.text(`${label}:`, col1, y)
      doc.setFont("helvetica", "normal")
      doc.text(String(value), col2, y)
      doc.setDrawColor(240, 240, 240)
      doc.line(col1, y + 2, 190, y + 2)
      y += lineSpacing
    })
    
    y += 10
    
    // Summary
    doc.setFillColor(245, 245, 245)
    doc.rect(20, y, 170, 30, "F")
    
    y += 10
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text(t.charges.amount, 30, y + 5)
    doc.setTextColor(0, 150, 0)
    doc.text(`${charge.amount} MAD`, 180, y + 5, { align: "right" })
    
    y += 12
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(t.charges.status, 30, y + 5)
    doc.text(charge.status === "Paid" ? t.status.paid : charge.status === "Partial" ? t.status.partial : t.status.unpaid, 180, y + 5, { align: "right" })
    
    // Validation
    y += 40
    doc.setFont("helvetica", "italic")
    doc.setFontSize(9)
    doc.setTextColor(120, 120, 120)
    doc.text(`${t.common.validated}: ${language === "fr" ? "Oui" : language === "es" ? "Sí" : "Yes"}`, 105, y, { align: "center" })
    
    // Footer
    doc.setFont("helvetica", "normal")
    doc.text(t.common.thankYou, 105, 280, { align: "center" })
    
    doc.save(`receipt_${charge.apartmentNumber}_${charge.month}_${charge.year}.pdf`)
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
            {myCharges.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <CreditCard className="h-8 w-8 text-neutral-300 mb-2" />
                <p className="text-xs text-neutral-400">{t.emptyStates.noChargesFound}</p>
              </div>
            ) : myCharges.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-sm bg-primary/10 flex items-center justify-center"><CreditCard className="h-4 w-4 text-primary" /></div>
                  <div><p className="text-sm font-medium">{c.month} {c.year}</p><p className="text-[10px] text-neutral-500">Apt {c.apartmentNumber}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold">{c.amount} MAD</p>
                    <Badge variant={c.status === "Paid" ? "success" : c.status === "Partial" ? "warning" : "danger"} className="text-[10px]">{c.status === "Paid" ? t.status.paid : c.status === "Partial" ? t.status.partial : t.status.unpaid}</Badge>
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
