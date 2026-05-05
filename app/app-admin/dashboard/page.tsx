"use client"

import * as React from "react"
import {
  Users,
  Building2,
  Activity,
  CreditCard,
  ArrowUpRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { platformStats, recentSyndics } from "@/lib/app-admin-mock-data"

const iconMap: Record<string, any> = {
  Users,
  Building2,
  Activity,
  CreditCard,
}

export default function AppAdminDashboard() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col gap-4">

      {/* Stats Grid */}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat) => {
          const Icon = iconMap[stat.iconName] || Activity
          return (
            <Card key={stat.title} className="overflow-hidden border-none bg-neutral-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3.5 px-4">
                <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div className="p-1.5 bg-primary/10 rounded-sm">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-green-600 font-medium">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>{stat.trend}</span>
                  <span className="text-neutral-500 ml-1 font-normal text-[10px]">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 grid-cols-1">
        {/* Recent Syndics Activity */}
        <Card className="border-none bg-neutral-100">
          <CardContent className="p-4">
            <div className="space-y-3">
              {recentSyndics.map((syndic) => (
                <div key={syndic.id} className="flex items-center justify-between border-b border-black/5 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-black/5">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                        {syndic.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 leading-none">{syndic.name}</p>
                      <p className="text-[10px] text-neutral-500 mt-1">{syndic.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-semibold text-neutral-900">{syndic.buildings} Buildings</p>
                      <p className="text-[10px] text-neutral-500">{syndic.users} Users</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                        syndic.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {syndic.status.toUpperCase()}
                      </span>
                      <p className="text-[10px] text-neutral-500 mt-1">{syndic.joined}</p>
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
