"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Loader2, ChevronLeft, Mail, User, Phone } from "lucide-react"
import { isAuthenticated, loginWithEmail, loginWithUsername, loginWithPhone, getDashboardPath } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n-context"
import type { DashboardLanguage } from "@/lib/dashboard-translations"

const languages = [
  { name: "English", code: "en", flag: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" },
  { name: "French", code: "fr", flag: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg" },
  { name: "Spanish", code: "es", flag: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg" },
]

type LoginMode = "owner" | "tenant" | "admin"

export default function LoginPage() {
  const { t, language, setLanguage } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginMode, setLoginMode] = useState<LoginMode>("owner")


  const currentLanguage = languages.find(l => l.code === language) || languages[0]

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
  })

  useEffect(() => {
    if (isAuthenticated()) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      router.push(getDashboardPath(userData.role))
    }
  }, [router, pathname])

  const renderTitle = (text: string) => {
    if (text.includes("Orsyndic")) {
      const parts = text.split("Orsyndic")
      return (<>{parts[0]}<span className="font-goodly text-primary">Orsyndic</span>{parts[1]}</>)
    }
    return text
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (loginMode === "admin") {
        if (!formData.email || !formData.password) throw new Error(t.profile.passwordRequired)
        const user = await loginWithEmail(formData.email, formData.password)
        router.push(getDashboardPath(user.role))
      } else if (loginMode === "owner") {
        if (!formData.username || !formData.password) throw new Error(t.profile.passwordRequired)
        const user = await loginWithUsername(formData.username, formData.password)
        router.push(getDashboardPath(user.role))
      } else {
        if (!formData.phone || !formData.password) throw new Error(t.profile.passwordRequired)
        const user = await loginWithPhone(formData.phone, formData.password)
        router.push(getDashboardPath(user.role))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="flex min-h-screen flex-col md:flex-row relative">
      <Link href="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-black md:text-white/90 hover:opacity-80 transition-opacity">
        <ChevronLeft className="h-4 w-4" />{t.login.goBack}
      </Link>

      {/* Left Column */}
      <div className="relative hidden md:flex md:w-1/2 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1732194516739-9325055c35de?q=80&w=897&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }} />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute top-0 right-0 w-16 h-16 bg-white z-20" />
        <div className="absolute top-[20%] right-16 w-16 h-16 bg-white z-20" />
        <div className="absolute top-[35%] right-0 w-16 h-16 bg-white z-20" />
        <div className="absolute top-[50%] right-16 w-16 h-16 bg-white z-20" />
        <div className="absolute top-[55%] right-16 w-16 h-16 bg-white z-20" />
        <div className="absolute bottom-[15%] right-0 w-16 h-16 bg-white z-20" />
        <div className="absolute bottom-[calc(15%+48px)] right-0 w-16 h-16 bg-white z-20" />
        <div className="absolute bottom-[calc(15%+48px)] right-16 w-16 h-16 bg-white z-20" />
        <div className="absolute bottom-[calc(15%+96px)] right-0 w-16 h-16 bg-white z-20" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-full text-center px-8">
            <h1 className="text-3xl font-semibold text-white md:text-4xl">{t.login.managementReimagined}</h1>
            <p className="mt-1 text-sm md:text-base text-neutral-200 font-normal">{t.login.allInOnePlatform}</p>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 z-10 flex items-center">
          <Image src="/logo.png" alt="Orsyndic Logo" width={40} height={40} className="mr-1" />
          <span className="text-sm font-medium text-white">{t.login.byNoureddine}</span>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:w-1/2 overflow-y-auto relative">
        {/* Language Switcher */}
        <div className="absolute top-6 right-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 p-0 bg-neutral-100 hover:bg-primary/15 rounded-full cursor-pointer overflow-hidden border border-black/5 transition-colors">
                <img src={currentLanguage.flag} alt={currentLanguage.name} className="h-full w-full object-cover" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-xl rounded-sm p-1.5">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as DashboardLanguage)} className="flex items-center gap-2.5 cursor-pointer hover:bg-black/5 focus:bg-black/5 focus:text-black rounded-sm py-2 px-2.5 transition-colors">
                  <img src={lang.flag} alt={lang.name} className="h-5 w-5 object-cover rounded-full border border-black/10" />
                  <span className={cn("text-xs font-semibold", currentLanguage.code === lang.code ? "text-primary font-bold" : "text-black")}>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full max-w-md space-y-6 py-4">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{renderTitle(t.login.welcome)}</h2>
            <p className="text-neutral-500">{t.login.subtitle}</p>
          </div>

          {/* Login Mode Toggle — 3 tabs */}
          <div className="flex rounded-sm bg-neutral-100 p-1 gap-1">
            <button type="button" onClick={() => { setLoginMode("owner"); setError("") }}
              className={cn("flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-xs font-medium transition-all cursor-pointer", loginMode === "owner" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-neutral-700")}>
              <User className="h-3.5 w-3.5" />{t.common.owner}
            </button>
            <button type="button" onClick={() => { setLoginMode("tenant"); setError("") }}
              className={cn("flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-xs font-medium transition-all cursor-pointer", loginMode === "tenant" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-neutral-700")}>
              <Phone className="h-3.5 w-3.5" />{t.common.tenant}
            </button>
            <button type="button" onClick={() => { setLoginMode("admin"); setError("") }}
              className={cn("flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-xs font-medium transition-all cursor-pointer", loginMode === "admin" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-neutral-700")}>
              <Mail className="h-3.5 w-3.5" />Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            {error && <div className="rounded-sm bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

            {loginMode === "admin" ? (
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin@orsyndic.com" autoComplete="email" required className="rounded-sm bg-neutral-100 border-transparent focus:bg-white" value={formData.email} onChange={handleChange} disabled={isLoading} />
              </div>
            ) : loginMode === "owner" ? (
              <div className="space-y-1">
                <Label htmlFor="username">{t.users.username}</Label>
                <Input id="username" name="username" type="text" placeholder="e.g. ahmed.benali" autoComplete="username" required className="rounded-sm bg-neutral-100 border-transparent focus:bg-white" value={formData.username} onChange={handleChange} disabled={isLoading} />
              </div>
            ) : (
              <div className="space-y-1">
                <Label htmlFor="phone">{t.users.phone}</Label>
                <Input id="phone" name="phone" type="tel" placeholder="e.g. 0661234567" autoComplete="tel" required className="rounded-sm bg-neutral-100 border-transparent focus:bg-white" value={formData.phone} onChange={handleChange} disabled={isLoading} />
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="password">{t.profile.currentPassword.replace(/current /i, "")}</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" required value={formData.password} onChange={handleChange} disabled={isLoading} spellCheck="false" autoCorrect="off" className="pr-10 rounded-sm bg-neutral-100 border-transparent focus:bg-white" />
                {formData.password && (
                  <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent rounded-sm" onClick={() => setShowPassword(!showPassword)} disabled={isLoading} tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                )}
              </div>
            </div>



            <Button type="submit" className="w-full mt-2 rounded-sm cursor-pointer hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.login.loggingIn}</>) : (t.login.login)}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="rounded-sm bg-neutral-50 border border-neutral-200 p-3 space-y-2">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t.login.demoCredentials}</p>
            {loginMode === "admin" ? (
              <div className="text-xs text-neutral-600 space-y-0.5">
                <p><span className="font-medium text-neutral-800">Email:</span> admin@orsyndic.com</p>
                <p><span className="font-medium text-neutral-800">Password:</span> password123</p>
              </div>
            ) : loginMode === "owner" ? (
              <div className="text-xs text-neutral-600 space-y-0.5">
                <p><span className="font-medium text-neutral-800">{t.users.username}:</span> ahmed.benali</p>
                <p><span className="font-medium text-neutral-800">Password:</span> password123</p>
              </div>
            ) : (
              <div className="text-xs text-neutral-600 space-y-0.5">
                <p><span className="font-medium text-neutral-800">{t.users.phone}:</span> 0661234567</p>
                <p><span className="font-medium text-neutral-800">Password:</span> password123</p>
              </div>
            )}
          </div>

          {loginMode === "admin" && (
            <div className="mt-2 text-center text-sm">
              {t.login.noAccount}{" "}
              <Link href="/syndic-demo/register" className="font-medium text-primary underline underline-offset-4">{t.login.register}</Link>
            </div>
          )}
        </div>
      </div>


    </div>
  )
}
