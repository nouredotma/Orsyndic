"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Camera, Check, Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentUser } from "@/lib/demo-auth"
import { useI18n } from "@/lib/i18n-context"
import { ProfilePageSkeleton } from "@/components/dashboard-skeletons"

export default function ProfilePage() {
  const { t } = useI18n()
  const user = getCurrentUser()
  const [isLoading, setIsLoading] = useState(true)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)
  
  // Editable profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editFullName, setEditFullName] = useState(user?.fullName || "")
  const [editPhone, setEditPhone] = useState(user?.phone || "")
  const [editEmail, setEditEmail] = useState(user?.email || "")
  const [profileSaved, setProfileSaved] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
        // Save to localStorage so it persists
        const stored = localStorage.getItem("user")
        if (stored) {
          const userData = JSON.parse(stored)
          userData.avatar = result
          localStorage.setItem("user", JSON.stringify(userData))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdatePassword = () => {
    setPasswordMsg(null)
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: "error", text: t.profile.passwordRequired })
      return
    }
    if (oldPassword !== "password123") {
      setPasswordMsg({ type: "error", text: t.profile.currentPasswordIncorrect })
      return
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: t.profile.passwordTooShort })
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: t.profile.passwordsDoNotMatch })
      return
    }
    setPasswordMsg({ type: "success", text: t.profile.passwordUpdated })
    setOldPassword(""); setNewPassword(""); setConfirmPassword("")
    setTimeout(() => setPasswordMsg(null), 3000)
  }

  const handleSaveProfile = () => {
    // Save to localStorage
    const stored = localStorage.getItem("user")
    if (stored) {
      const userData = JSON.parse(stored)
      userData.fullName = editFullName
      userData.phone = editPhone
      userData.email = editEmail
      localStorage.setItem("user", JSON.stringify(userData))
    }
    setIsEditingProfile(false)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const getRoleLabel = (role: string) => {
    if (role === "Admin") return t.common.admin
    if (role === "Owner") return t.common.owner
    return t.common.tenant
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <ProfilePageSkeleton />

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t.profile.accountInfo}</CardTitle>
            {!isEditingProfile && (
              <Button variant="outline" size="sm" className="text-xs gap-1.5 cursor-pointer border-none bg-white hover:bg-primary/5" onClick={() => setIsEditingProfile(true)}>
                <Pencil className="h-3 w-3" />{t.profile.editProfile}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
          {profileSaved && (
            <div className="rounded-sm p-3 text-sm bg-emerald-50 text-emerald-700">
              <Check className="h-4 w-4 inline mr-1.5" />{t.common.profileSaved}
            </div>
          )}
          <div className="flex items-center gap-4 pb-3 border-b border-black/5">
            <div className="relative group">
              <Avatar className="h-16 w-16 border border-black/5">
                <AvatarImage src={previewImage || user?.avatar} />
                <AvatarFallback className="bg-red-100 text-[#FF0000] text-xl font-bold">{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-5 w-5 text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            <div>
              <p className="text-sm font-bold">{editFullName || user?.fullName || "User"}</p>
              <p className="text-xs text-neutral-500">{user?.role ? getRoleLabel(user.role) : ""}</p>
            </div>
          </div>
          
          {isEditingProfile ? (
            <div className="space-y-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">{t.profile.fullName}</Label>
                <Input className="bg-white border-black/10 rounded-sm" value={editFullName} onChange={(e) => setEditFullName(e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">{t.profile.email}</Label>
                <Input type="email" className="bg-white border-black/10 rounded-sm" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">{t.profile.phone}</Label>
                <Input className="bg-white border-black/10 rounded-sm" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
              </div>
              <div className="flex gap-2 pt-1">
                <Button className="flex-1 cursor-pointer" onClick={handleSaveProfile}>{t.common.save}</Button>
                <Button variant="outline" className="flex-1 cursor-pointer border-none bg-white hover:bg-neutral-200" onClick={() => { setIsEditingProfile(false); setEditFullName(user?.fullName || ""); setEditPhone(user?.phone || ""); setEditEmail(user?.email || "") }}>{t.common.cancel}</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(editEmail || user?.email) && (<div><p className="text-[10px] font-medium text-neutral-500 uppercase mb-0.5">{t.profile.email}</p><p className="text-sm">{editEmail || user?.email}</p></div>)}
              {user?.username && (<div><p className="text-[10px] font-medium text-neutral-500 uppercase mb-0.5">{t.users.username}</p><p className="text-sm font-mono">{user.username}</p></div>)}
              {(editPhone || user?.phone) && (<div><p className="text-[10px] font-medium text-neutral-500 uppercase mb-0.5">{t.profile.phone}</p><p className="text-sm">{editPhone || user?.phone}</p></div>)}
              <div><p className="text-[10px] font-medium text-neutral-500 uppercase mb-0.5">{t.users.role}</p><p className="text-sm">{user?.role ? getRoleLabel(user.role) : ""}</p></div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">{t.profile.changePassword}</CardTitle>
          <CardDescription className="text-xs">{t.profile.securityDescription}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
          {passwordMsg && (
            <div className={`rounded-sm p-3 text-sm ${passwordMsg.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
              {passwordMsg.type === "success" && <Check className="h-4 w-4 inline mr-1.5" />}{passwordMsg.text}
            </div>
          )}
          <div className="space-y-1.5">
            <Label className="text-xs">{t.profile.currentPassword}</Label>
            <div className="relative">
              <Input type={showOld ? "text" : "password"} className="bg-neutral-50 border-black/10 pr-9" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowOld(!showOld)} tabIndex={-1}>{showOld ? <EyeOff className="h-4 w-4 text-neutral-400" /> : <Eye className="h-4 w-4 text-neutral-400" />}</Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">{t.profile.newPassword}</Label>
            <div className="relative">
              <Input type={showNew ? "text" : "password"} className="bg-neutral-50 border-black/10 pr-9" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowNew(!showNew)} tabIndex={-1}>{showNew ? <EyeOff className="h-4 w-4 text-neutral-400" /> : <Eye className="h-4 w-4 text-neutral-400" />}</Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">{t.profile.confirmPassword}</Label>
            <Input type={showNew ? "text" : "password"} className="bg-neutral-50 border-black/10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button className="w-full mt-2 cursor-pointer" onClick={handleUpdatePassword}>{t.profile.updatePassword}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
