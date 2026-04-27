"use client"

import { useState } from "react"
import { Megaphone, Plus, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { announcements as initialAnnouncements } from "@/lib/mock-data"
import type { Announcement } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"

export default function AnnouncementsPage() {
  const { t } = useI18n()
  const [localAnnouncements, setLocalAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [urgent, setUrgent] = useState(false)

  const handlePost = () => {
    if (!title || !content) return
    const ann: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      createdAt: new Date().toISOString().split("T")[0],
      urgent,
      createdBy: "Admin",
    }
    setLocalAnnouncements(prev => [ann, ...prev])
    setTitle(""); setContent(""); setUrgent(false); setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog open={isOpen} onOpenChange={(o) => { setIsOpen(o); if (!o) { setTitle(""); setContent(""); setUrgent(false) } }}>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer"><Plus className="h-4 w-4" />{t.announcements.newAnnouncement}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader><DialogTitle>{t.announcements.newAnnouncement}</DialogTitle><DialogDescription>Post a notice for all building residents.</DialogDescription></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label htmlFor="title" className="text-xs">{t.announcements.title}</Label><Input id="title" placeholder="Water supply interruption" className="bg-neutral-100 border-none rounded-sm" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div className="grid gap-2"><Label htmlFor="content" className="text-xs">{t.announcements.content}</Label><Textarea id="content" placeholder="Details about the announcement..." className="bg-neutral-100 border-none rounded-sm min-h-[100px]" value={content} onChange={(e) => setContent(e.target.value)} /></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1"><Label htmlFor="urgent" className="text-sm font-medium">{t.announcements.urgent}</Label><span className="text-xs text-neutral-500">{t.announcements.urgentDescription}</span></div>
                <Switch id="urgent" checked={urgent} onCheckedChange={setUrgent} />
              </div>
            </div>
            <DialogFooter><Button className="w-full cursor-pointer" onClick={handlePost}>{t.announcements.postAnnouncement}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {localAnnouncements.map((ann) => (
          <Card key={ann.id} className={cn("border-none bg-neutral-100", ann.urgent && "border-red-200")}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg shrink-0", ann.urgent ? "bg-red-50" : "bg-blue-50")}>
                  {ann.urgent ? <AlertTriangle className="h-4 w-4 text-[#FF0000]" /> : <Megaphone className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{ann.title}</h3>
                    {ann.urgent && <Badge variant="orange" className="text-[10px]">Urgent</Badge>}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{ann.content}</p>
                  <p className="text-[10px] text-neutral-400 mt-2">Posted on {ann.createdAt} by {ann.createdBy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
