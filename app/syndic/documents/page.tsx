"use client"

import { FolderOpen, Upload, Download, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { documents } from "@/lib/mock-data"
import { getCurrentUser } from "@/lib/auth"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  "Assembly Minutes": "bg-blue-50 text-blue-600",
  "Regulations": "bg-purple-50 text-purple-600",
  "Financial Reports": "bg-emerald-50 text-emerald-600",
  "Contracts": "bg-amber-50 text-amber-600",
  "Other": "bg-neutral-50 text-neutral-600",
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
          <Button className="gap-2 cursor-pointer"><Upload className="h-4 w-4" />Upload File</Button>
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
