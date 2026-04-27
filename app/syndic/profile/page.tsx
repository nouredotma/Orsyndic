"use client"

import { useState } from "react"
import { UserCircle, Eye, EyeOff, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentUser } from "@/lib/auth"

export default function ProfilePage() {
  const user = getCurrentUser()
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl">


      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
          <div className="flex items-center gap-4 pb-3 border-b border-black/5">
            <div className="relative group">
              <Avatar className="h-16 w-16 border border-black/5">
                <AvatarImage src={previewImage || user?.avatar} />
                <AvatarFallback className="bg-red-100 text-[#FF0000] text-xl font-bold">
                  {user?.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-5 w-5 text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            <div>
              <p className="text-sm font-bold">{user?.fullName || "User"}</p>
              <p className="text-xs text-neutral-500">{user?.role}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user?.email && (
              <div>
                <p className="text-[10px] font-medium text-neutral-500 uppercase mb-0.5">Email</p>
                <p className="text-sm">{user.email}</p>
              </div>
            )}
            {user?.username && (
              <div>
                <p className="text-[10px] font-medium text-neutral-500 uppercase mb-0.5">Username</p>
                <p className="text-sm font-mono">{user.username}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-medium text-neutral-500 uppercase mb-0.5">Role</p>
              <p className="text-sm">{user?.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-neutral-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Change Password</CardTitle>
          <CardDescription className="text-xs">Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-2 space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Current Password</Label>
            <div className="relative">
              <Input type={showOld ? "text" : "password"} placeholder="••••••••" className="rounded-sm bg-neutral-50 border-black/10 pr-10" />
              <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowOld(!showOld)} tabIndex={-1}>
                {showOld ? <EyeOff className="h-4 w-4 text-neutral-400" /> : <Eye className="h-4 w-4 text-neutral-400" />}
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">New Password</Label>
            <div className="relative">
              <Input type={showNew ? "text" : "password"} placeholder="••••••••" className="rounded-sm bg-neutral-50 border-black/10 pr-10" />
              <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowNew(!showNew)} tabIndex={-1}>
                {showNew ? <EyeOff className="h-4 w-4 text-neutral-400" /> : <Eye className="h-4 w-4 text-neutral-400" />}
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Confirm New Password</Label>
            <Input type="password" placeholder="••••••••" className="rounded-sm bg-neutral-50 border-black/10" />
          </div>
          <Button className="cursor-pointer">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
