"use client"

import { useState, useEffect } from "react"
import { FolderOpen, Upload, Download, FileText, File, MoreVertical, Pencil, Trash2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { documents as initialDocs } from "@/lib/mock-data"
import type { Document } from "@/lib/mock-data"
import { getCurrentUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import { DocumentsPageSkeleton } from "@/components/dashboard-skeletons"

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
  const [isLoading, setIsLoading] = useState(true)
  const [localDocs, setLocalDocs] = useState<Document[]>(initialDocs)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Create state
  const [isOpen, setIsOpen] = useState(false)
  const [docName, setDocName] = useState("")
  const [docCategory, setDocCategory] = useState<DocCategory | "">("")
  const [fileName, setFileName] = useState("")

  // Edit state
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Document | null>(null)
  const [editName, setEditName] = useState("")
  const [editCategory, setEditCategory] = useState<DocCategory | "">("")

  // Delete state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<Document | null>(null)

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

  const handleOpenEdit = (doc: Document) => {
    setEditingDoc(doc)
    setEditName(doc.name)
    setEditCategory(doc.category)
    setIsEditOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editingDoc || !editName || !editCategory) return
    setLocalDocs(p => p.map(d => d.id === editingDoc.id ? { ...d, name: editName, category: editCategory as DocCategory } : d))
    setIsEditOpen(false); setEditingDoc(null)
  }

  const handleDeleteClick = (doc: Document) => {
    setPendingDelete(doc)
    setIsConfirmOpen(true)
  }

  const executeDelete = () => {
    if (!pendingDelete) return
    setLocalDocs(p => p.filter(d => d.id !== pendingDelete.id))
    setIsConfirmOpen(false); setPendingDelete(null)
  }

  const handleDownload = (doc: Document) => {
    const blob = new Blob([`Document: ${doc.name}\nCategory: ${doc.category}\nUploaded: ${doc.uploadedAt}\n\nThis is a mock document file for demonstration purposes.`], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `${doc.name.replace(/\s+/g, "_")}.txt`; a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <DocumentsPageSkeleton />

  const filteredDocs = localDocs.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const grouped = filteredDocs.reduce((acc, doc) => {
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
              <DialogHeader><DialogTitle>{t.documents.uploadDocument}</DialogTitle><DialogDescription>{t.documents.shareFile}</DialogDescription></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2"><Label className="text-xs">{t.documents.documentName}</Label><Input placeholder="March 2026 Minutes" className="bg-neutral-100 border-none rounded-sm" value={docName} onChange={(e) => setDocName(e.target.value)} /></div>
                <div className="grid gap-2"><Label className="text-xs">{t.documents.category}</Label>
                  <Select value={docCategory} onValueChange={(v) => setDocCategory(v as DocCategory)}>
                    <SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.documents.selectCategory} /></SelectTrigger>
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

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input 
          placeholder={t.documents.searchDocuments} 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="pl-9 rounded-sm bg-neutral-100 border-none shadow-none text-sm" 
        />
      </div>

      {Object.entries(grouped).map(([category, docs]) => (
        <Card key={category} className="border-none bg-neutral-100">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-lg", categoryColors[category] || "bg-neutral-50 text-neutral-600")}><FolderOpen className="h-4 w-4" /></div>
              <CardTitle className="text-sm">
                {category === "Assembly Minutes" ? t.documents.assemblyMinutes :
                 category === "Regulations" ? t.documents.regulations :
                 category === "Financial Reports" ? t.documents.financialReports :
                 category === "Contracts" ? t.documents.contracts : t.documents.other}
              </CardTitle>
              <Badge variant="secondary" className="text-[10px] ml-auto">{docs.length} {t.documents.filesCount}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="space-y-1.5">
              {docs.map((doc) => (
                <div 
                  key={doc.id} 
                  className="flex items-center justify-between py-2 px-2 rounded-lg transition-colors cursor-pointer hover:bg-white/60 group/row"
                  onClick={() => handleDownload(doc)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-4 w-4 text-neutral-400 shrink-0 group-hover/row:text-primary transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate group-hover/row:text-primary transition-colors">{doc.name}</p>
                      <p className="text-[10px] text-neutral-400">{doc.fileSize} · {doc.uploadedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-primary group transition-colors">
                          <MoreVertical className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-lg rounded-sm p-1">
                        <DropdownMenuItem 
                          onClick={(e) => { e.stopPropagation(); handleDownload(doc); }} 
                          className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {t.documents.download}
                        </DropdownMenuItem>
                        
                        {isAdmin && (
                          <>
                            <DropdownMenuSeparator className="bg-black/5" />
                            <DropdownMenuItem 
                              onClick={(e) => { e.stopPropagation(); handleOpenEdit(doc); }} 
                              className="cursor-pointer text-xs gap-2 py-2 hover:bg-primary/5 focus:bg-primary/5 focus:text-black rounded-sm"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              {t.documents.editDocument}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-black/5" />
                            <DropdownMenuItem 
                              onClick={(e) => { e.stopPropagation(); handleDeleteClick(doc); }} 
                              className="cursor-pointer text-xs gap-2 py-2 text-red-500 hover:bg-primary/5 focus:bg-primary/5 focus:text-red-500 rounded-sm"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              {t.documents.deleteDocument}
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(o) => { setIsEditOpen(o); if (!o) setEditingDoc(null) }}>
        <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
          <DialogHeader><DialogTitle>{t.documents.editDocument}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label className="text-xs">{t.documents.documentName}</Label><Input className="bg-neutral-100 border-none rounded-sm" value={editName} onChange={(e) => setEditName(e.target.value)} /></div>
            <div className="grid gap-2"><Label className="text-xs">{t.documents.category}</Label>
              <Select value={editCategory} onValueChange={(v) => setEditCategory(v as DocCategory)}>
                <SelectTrigger className="bg-neutral-100 border-none rounded-sm"><SelectValue placeholder={t.documents.selectCategory} /></SelectTrigger>
                <SelectContent className="bg-white border-none shadow-lg">
                  <SelectItem value="Assembly Minutes">{t.documents.assemblyMinutes}</SelectItem><SelectItem value="Regulations">{t.documents.regulations}</SelectItem>
                  <SelectItem value="Financial Reports">{t.documents.financialReports}</SelectItem><SelectItem value="Contracts">{t.documents.contracts}</SelectItem><SelectItem value="Other">{t.documents.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button className="w-full cursor-pointer" onClick={handleSaveEdit}>{t.users.saveChanges}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="bg-white border-none rounded-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t.documents.deleteDocument}</AlertDialogTitle>
            <AlertDialogDescription>{t.documents.confirmDelete}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none bg-neutral-100 hover:bg-neutral-200 rounded-sm text-xs cursor-pointer">{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="border-none rounded-sm text-xs text-white cursor-pointer bg-red-600 hover:bg-red-700">
              {t.common.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
