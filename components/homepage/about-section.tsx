"use client"

import { useLanguage } from "@/lib/language-context"
import { Building2, Clock, Users, CheckCircle2, Bell, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  const { t } = useLanguage()

  const stats = [
    {
      icon: <Building2 size={18} />,
      value: t.about.stats.buildings.value,
      label: t.about.stats.buildings.label,
    },
    {
      icon: <Clock size={18} />,
      value: t.about.stats.hoursSaved.value,
      label: t.about.stats.hoursSaved.label,
    },
    {
      icon: <Users size={18} />,
      value: t.about.stats.coOwners.value,
      label: t.about.stats.coOwners.label,
    },
  ]

  return (
    <section id="about" className="w-full py-10 px-3 md:px-16 bg-background scroll-mt-20">
      <div className="max-w-full mx-auto">
        <div className="grid md:grid-cols-[5fr_7fr] gap-6 md:gap-8 items-center">
          {/* ── Left: Image card with floating elements ── */}
          <div className="relative aspect-square w-full">
            {/* Main image */}
            <div className="w-full h-full rounded-sm overflow-hidden relative">
              <Image
                src="/about.png"
                alt="Modern building management"
                fill
                className="object-cover"
              />
              {/* Dark overlay for contrast with floating elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>

            {/* Floating element — top right: notification */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white rounded-sm shadow-lg px-3 py-2.5 flex items-center gap-2.5 animate-pulse-slow">
              <div className="w-7 h-7 rounded-sm bg-red-50 flex items-center justify-center shrink-0">
                <Bell size={14} className="text-[#FF0000]" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-neutral-800 leading-tight">Payment received</p>
                <p className="text-[10px] text-neutral-400">Apt 201 · just now</p>
              </div>
            </div>

            {/* Floating element — bottom left: progress card */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white rounded-sm shadow-lg px-3 py-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp size={13} className="text-emerald-500" />
                <span className="text-[11px] font-semibold text-neutral-800">Collection Rate</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-neutral-900 tracking-tight">94.2%</span>
                <span className="text-[10px] font-medium text-emerald-500">+12%</span>
              </div>
              {/* Mini progress bar */}
              <div className="w-28 h-1.5 bg-neutral-100 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full w-[94%] bg-[#FF0000] rounded-full" />
              </div>
            </div>

            {/* Floating element — bottom right: status badge */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-sm shadow-lg px-3 py-2 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="text-[11px] font-semibold text-neutral-700">All synced</span>
            </div>
          </div>

          {/* ── Right: Text content + stats ── */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center mb-4 px-3 py-1 rounded-sm text-primary text-xs md:text-sm bg-primary/5 border border-primary">
                {t.about.subtitle}
              </span>
              <h2 className="text-xl md:text-4xl font-medium tracking-tighter text-balance">
                {t.about.title}
              </h2>
              <p className="text-neutral-500 text-sm md:text-base font-normal leading-relaxed">
                {t.about.description}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center text-[#FF0000]">
                    {stat.icon}
                  </div>
                  <span className="text-xl md:text-2xl font-bold tracking-tighter text-neutral-900 block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] md:text-xs text-neutral-500 font-medium block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
