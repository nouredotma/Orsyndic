"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Loader2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function AppAdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAppAdmin = localStorage.getItem("isAppAdmin") === "true"
      if (isAppAdmin) {
        router.push("/app-admin/dashboard")
      }
    }
  }, [router])

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
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

      if (!adminEmail || !adminPassword) {
        throw new Error("Admin credentials are not configured.")
      }

      if (formData.email !== adminEmail || formData.password !== adminPassword) {
        throw new Error("Invalid email or password.")
      }

      localStorage.setItem("isAppAdmin", "true")
      router.push("/app-admin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row relative">
      <Link href="/" className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-black md:text-white/90 hover:opacity-80 transition-opacity">
        <ChevronLeft className="h-4 w-4" />Go Back
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
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Management Reimagined</h1>
            <p className="mt-1 text-sm md:text-base text-neutral-200 font-normal">The all-in-one platform for syndics</p>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 z-10 flex items-center">
          <Image src="/logo.png" alt="Orsyndic Logo" width={40} height={40} className="mr-1" />
          <span className="text-sm font-medium text-white">by Noureddine</span>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:w-1/2 overflow-y-auto relative">
        <div className="w-full max-w-md space-y-6 py-4">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{renderTitle("Welcome to Orsyndic")}</h2>
            <p className="text-neutral-500">Sign in to manage the platform and syndics</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            {error && <div className="rounded-sm bg-red-50 border border-red-100 p-3 text-sm text-[#FF0000]">{error}</div>}

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@orsyndic.app" autoComplete="email" required className="rounded-sm bg-neutral-100 border-transparent focus:bg-white" value={formData.email} onChange={handleChange} disabled={isLoading} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
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
              {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging in...</>) : ("Login")}
            </Button>
          </form>

        </div>
      </div>
    </div>
  )
}
