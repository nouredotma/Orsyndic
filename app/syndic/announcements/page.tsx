"use client"

import { useState } from "react"
import { Megaphone, Plus, AlertTriangle } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { announcements } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white border-none rounded-sm">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>
                Post a notice for all building residents.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input id="title" placeholder="Water supply interruption" className="bg-neutral-100 border-none rounded-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content" className="text-xs">Content</Label>
                <Textarea id="content" placeholder="Details about the announcement..." className="bg-neutral-100 border-none rounded-sm min-h-[100px]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="urgent" className="text-sm font-medium">Mark as Urgent</Label>
                  <span className="text-xs text-neutral-500">This will highlight the announcement in red.</span>
                </div>
                <Switch id="urgent" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer">Post Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {announcements.map((ann) => (
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
