"use client"

import { useState } from "react"
import { FolderOpen, Upload, Download, FileText, File } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { documents as initialDocs } from "@/lib/mock-data"
import type { Document } from "@/lib/mock-data"
import { getCurrentUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

const categoryColors: Record<string, string> = {
  "Assembly Minutes": "bg-blue-100 text-blue-600",
  "Regulations": "bg-purple-100 text-purple-600",
  "Financial Reports": "bg-[#00D100]/15 text-[#00D100]",
  "Contracts": "bg-amber-100 text-amber-600",
  "Other": "bg-neutral-200 text-neutral-600",
}

type DocCategory = Document["category"]

export default function DocumentsPage() {
  const { t } = useI18n()
  const user = getCurrentUser()
  const isAdmin = user?.role === "Admin"
  const [localDocs, setLocalDocs] = useState<Document[]>(initialDocs)
  const [isOpen, setIsOpen] = useState(false)
  const [docName, setDocName] = useState("")
  const [docCategory, setDocCategory] = useState<DocCategory | "">("")
  const [fileName, setFileName] = useState("")

  const handleUpload = () => {
    if (!docName || !docCategory) return
    const doc: Document = {
      id: `doc-${Date.now()}`,
      name: docName,
      category: docCategory as DocCategory,
      uploadedAt: new Date().toISOString().split("T")[0],
      fileSize: fileName ? `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 9)}  MB` : "1.0 MB",
      uploadedBy: "Admin",
    }
    setLocalDocs(prev => [doc, ...prev])
    setDocName(""); setDocCategory(""); setFileName(""); setIsOpen(false)
  }

  const handleDownload = (doc: Document) => {
    const blob = new Blob([`Document: ${doc.name}\nCategory: ${doc.category}\nUploaded: ${doc.uploadedAt}\n\nThis is a mock document file for demonstration purposes.`], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `${doc.name.replace(/\s+/g, "_")}.txt`; a.click()
    URL.revokeObjectURL(url)
  }

  const grouped = localDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = []
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, typeof localDocs>)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        {isAdmin && (
          <Dialog open={isOpen} onOpenChange={(o) => { setIsOpen(o); if (!o) { setDocName(""); setDocCategory(""); setFileName("") } }}>
            <DialogTrigger asChild><Button className="gap-2 cursor-pointer"><Upload className="h-4 w-4" />{t.documents.upload}</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
              <DialogHeader><DialogTitle>{t.documents.uploadDocument}</DialogTitle><DialogDescription>Share a file with the building residents.</DialogDescription></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2"><Label className="text-xs">{t.documents.documentName}</Label><Input placeholder="March 2026 Minutes" className="bg-neutral-100 border-none rounded-sm" value={docName} onChange={(e) => setDocName(e.target.value)} /></div>
                <div className="grid gap-2"><Label className="text-xs">{t.documents.category}</Label>
                  <Select value={docCategory} onValueChange={(v) => setDocCategory(v as DocCategory)}>
                    <SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-lg">
                      <SelectItem value="Assembly Minutes">{t.documents.assemblyMinutes}</SelectItem><SelectItem value="Regulations">{t.documents.regulations}</SelectItem>
                      <SelectItem value="Financial Reports">{t.documents.financialReports}</SelectItem><SelectItem value="Contracts">{t.documents.contracts}</SelectItem><SelectItem value="Other">{t.documents.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2"><Label className="text-xs">{t.documents.file}</Label>
                  <label className="border-2 border-dashed border-black/5 rounded-sm p-8 text-center cursor-pointer hover:bg-neutral-50 transition-colors">
                    <File className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                    <p className="text-xs text-neutral-500">{fileName || t.documents.dragDrop}</p>
                    <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
                  </label>
                </div>
              </div>
              <DialogFooter><Button className="w-full cursor-pointer" onClick={handleUpload}>{t.documents.uploadDocument}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {Object.entries(grouped).map(([category, docs]) => (
        <Card key={category} className="border-none bg-neutral-100">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-lg", categoryColors[category] || "bg-neutral-50 text-neutral-600")}><FolderOpen className="h-4 w-4" /></div>
              <CardTitle className="text-sm">{category}</CardTitle>
              <Badge variant="secondary" className="text-[10px] ml-auto">{docs.length} files</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="space-y-1.5">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-2 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-4 w-4 text-neutral-400 shrink-0" />
                    <div className="min-w-0"><p className="text-xs font-medium truncate">{doc.name}</p><p className="text-[10px] text-neutral-400">{doc.fileSize} · {doc.uploadedAt}</p></div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] h-7 gap-1 cursor-pointer text-primary hover:bg-primary hover:text-white" onClick={() => handleDownload(doc)}><Download className="h-3 w-3" />{t.documents.download}</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
