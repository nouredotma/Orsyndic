"use client"

import * as React from "react"
import {
  Users,
  Building2,
  Activity,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AppAdminDashboardSkeleton } from "@/components/dashboard-skeletons"
import { useAdminDashboardData } from "@/lib/hooks"

const iconMap: Record<string, any> = {
  Users,
  Building2,
  Activity,
  CreditCard,
}

export default function AppAdminDashboard() {
  const { data, loading } = useAdminDashboardData()

  if (loading || !data) return <AppAdminDashboardSkeleton />

  const { stats, recentSyndics } = data

  const platformStatsCards = [
    { title: "Total Syndics", value: stats.totalSyndics.toString(), iconName: "Users", trend: `${stats.activeSyndics} active` },
    { title: "Total Buildings", value: stats.totalBuildings.toString(), iconName: "Building2", trend: `${stats.pendingSyndics} pending` },
    { title: "Total Users", value: stats.totalUsers.toString(), iconName: "Activity", trend: "All roles" },
    { title: "Total Apartments", value: stats.totalApartments.toString(), iconName: "CreditCard", trend: "Platform-wide" },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
  const dateStr = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="flex flex-col gap-4">

      {/* Greeting Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{greeting}, Admin!</h1>
          <p className="text-xs text-neutral-500">
            {dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {platformStatsCards.map((stat) => {
          const Icon = iconMap[stat.iconName] || Activity
          return (
            <Card key={stat.title} className="overflow-hidden border-none bg-neutral-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3.5 px-2">
                <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div className="p-1.5 bg-primary/10 rounded-sm">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-3.5">
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <ArrowUpRight className="h-3 w-3 text-[#00D100]" />
                  <span className="text-[10px] font-semibold text-[#00D100]">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 grid-cols-1">
        {/* Recent Syndics Activity */}
        <Card className="border-none bg-neutral-100">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Recent Syndics</CardTitle>
            <CardDescription className="text-xs">
              Latest syndic activity on the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-4">
            <div className="space-y-2">
              {recentSyndics.map((syndic) => (
                <div key={syndic.id} className="flex items-center justify-between border-b border-black/5 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-black/5">
                      <AvatarFallback className="bg-red-100 text-[#FF0000] font-bold text-xs">
                        {syndic.full_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold leading-none">{syndic.full_name}</p>
                      <p className="text-[10px] text-neutral-500 mt-1">{syndic.company_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-semibold">{syndic.buildings_count} Buildings</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-[10px] font-bold border-none",
                          syndic.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                        )}>
                        {syndic.status}
                      </Badge>
                      <p className="text-[10px] text-neutral-500 mt-1">{new Date(syndic.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
