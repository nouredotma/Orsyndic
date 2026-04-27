"use client"

import { Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 max-w-2xl">


      <Card className="border-none bg-neutral-100">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <Settings className="h-10 w-10 text-neutral-300 mb-3" />
            <p className="text-sm text-neutral-500 font-medium">
              System settings are coming soon.
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Notifications, language preferences, and more.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
