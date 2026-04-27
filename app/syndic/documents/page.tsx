"use client"

import { FolderOpen, Upload, Download, FileText, File } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { documents } from "@/lib/mock-data"
import { getCurrentUser } from "@/lib/auth"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  "Assembly Minutes": "bg-blue-100 text-blue-600",
  "Regulations": "bg-purple-100 text-purple-600",
  "Financial Reports": "bg-[#00D100]/15 text-[#00D100]",
  "Contracts": "bg-amber-100 text-amber-600",
  "Other": "bg-neutral-200 text-neutral-600",
}

export default function DocumentsPage() {
  const user = getCurrentUser()
  const isAdmin = user?.role === "Admin"

  const grouped = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = []
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, typeof documents>)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        {isAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 cursor-pointer">
                <Upload className="h-4 w-4" />
                Upload File
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Share a file with the building residents.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fileName" className="text-xs">Document Name</Label>
                  <Input id="fileName" placeholder="March 2026 Minutes" className="bg-neutral-100 border-none rounded-sm" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-xs">Category</Label>
                  <Select>
                    <SelectTrigger className="bg-neutral-100 border-none rounded-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-lg">
                      <SelectItem value="Assembly Minutes">Assembly Minutes</SelectItem>
                      <SelectItem value="Regulations">Regulations</SelectItem>
                      <SelectItem value="Financial Reports">Financial Reports</SelectItem>
                      <SelectItem value="Contracts">Contracts</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">File</Label>
                  <div className="border-2 border-dashed border-black/5 rounded-sm p-8 text-center cursor-pointer hover:bg-neutral-50 transition-colors">
                    <File className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                    <p className="text-xs text-neutral-500">Click to browse or drag and drop</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full cursor-pointer">Upload Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {Object.entries(grouped).map(([category, docs]) => (
        <Card key={category} className="border-none bg-neutral-100">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-lg", categoryColors[category] || "bg-neutral-50 text-neutral-600")}>
                <FolderOpen className="h-4 w-4" />
              </div>
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
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{doc.name}</p>
                      <p className="text-[10px] text-neutral-400">{doc.fileSize} · {doc.uploadedAt}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] h-7 gap-1 cursor-pointer text-primary hover:text-primary">
                    <Download className="h-3 w-3" />Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
