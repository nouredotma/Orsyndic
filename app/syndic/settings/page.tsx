"use client"

import { useState } from "react"
import { Settings, Bell, Globe, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-context"
import type { DashboardLanguage } from "@/lib/dashboard-translations"

export default function SettingsPage() {
  const { language, setLanguage, t } = useI18n()
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsNotifs, setSmsNotifs] = useState(false)
  const [ticketUpdates, setTicketUpdates] = useState(true)
  const [chargeReminders, setChargeReminders] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLanguageChange = (val: string) => {
    setLanguage(val as DashboardLanguage)
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /><CardTitle className="text-base">{t.settings.notifications}</CardTitle></div>
          <CardDescription className="text-xs">{t.settings.notificationsDesc}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-4">
          <div className="flex items-center justify-between">
            <div><Label className="text-sm font-medium">{t.settings.emailNotifs}</Label><p className="text-xs text-neutral-500">Receive updates via email</p></div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div><Label className="text-sm font-medium">{t.settings.smsNotifs}</Label><p className="text-xs text-neutral-500">Receive alerts via SMS</p></div>
            <Switch checked={smsNotifs} onCheckedChange={setSmsNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div><Label className="text-sm font-medium">{t.settings.ticketUpdates}</Label><p className="text-xs text-neutral-500">Get notified when ticket status changes</p></div>
            <Switch checked={ticketUpdates} onCheckedChange={setTicketUpdates} />
          </div>
          <div className="flex items-center justify-between">
            <div><Label className="text-sm font-medium">{t.settings.chargeReminders}</Label><p className="text-xs text-neutral-500">Monthly payment reminders</p></div>
            <Switch checked={chargeReminders} onCheckedChange={setChargeReminders} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /><CardTitle className="text-base">{t.settings.language}</CardTitle></div>
          <CardDescription className="text-xs">{t.settings.languageDesc}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="bg-neutral-50 border-black/10 rounded-sm w-full max-w-xs"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-white border-none shadow-lg">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Button className="w-fit cursor-pointer" onClick={handleSave}>
        {saved ? t.settings.saved : t.settings.save}
      </Button>
    </div>
  )
}
