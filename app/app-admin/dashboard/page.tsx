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
    <div className="flex flex-col gap-6 p-2 md:p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Platform Overview</h1>
          <p className="text-sm text-neutral-500">Monitor Orsyndic platform statistics and syndic activity.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat) => {
          const Icon = iconMap[stat.iconName] || Activity
          return (
            <Card key={stat.title} className="border-none shadow-xs bg-neutral-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
                <CardTitle className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-md">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-600 font-medium">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>{stat.trend}</span>
                  <span className="text-neutral-500 ml-1 font-normal">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Syndics Activity */}
        <Card className="lg:col-span-2 border-none shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg">Recent Syndic Registrations</CardTitle>
            <CardDescription>Latest syndics who joined the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentSyndics.map((syndic) => (
                <div key={syndic.id} className="flex items-center justify-between border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-neutral-200">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {syndic.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{syndic.name}</p>
                      <p className="text-xs text-neutral-500">{syndic.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-neutral-900">{syndic.buildings} Buildings</p>
                      <p className="text-xs text-neutral-500">{syndic.users} Users</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        syndic.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {syndic.status}
                      </span>
                      <p className="text-xs text-neutral-500 mt-1">{syndic.joined}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status / Quick Actions */}
        <div className="space-y-6">
          <Card className="border-none shadow-xs bg-neutral-900 text-white">
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
              <CardDescription className="text-neutral-400">Platform operational metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-300">Server Uptime</span>
                  <span className="font-medium">99.99%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-300">Database Load</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-300">Storage Used</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
