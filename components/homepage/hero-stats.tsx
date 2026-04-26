"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface StatItemProps {
  value: string
  label: string
}

function StatItem({ value: targetValueStr, label }: StatItemProps) {
  const targetValue = parseInt(targetValueStr.replace(/\D/g, ""))
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, targetValue, {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    })

    return controls.stop
  }, [count, targetValue])

  return (
    <div className="flex flex-col items-start gap-0.5 pointer-events-none select-none" style={{ fontFamily: "var(--font-caveat)" }}>
      <div className="flex items-center gap-1">
        <span className="text-sm md:text-3xl font-bold text-neutral-700 tabular-nums">
          {displayValue}
        </span>
        <span className="text-sm md:text-2xl font-bold text-neutral-700">+</span>
      </div>
      <span className="text-[10px] md:text-lg font-medium text-neutral-700/60 whitespace-nowrap tracking-wider">
        {label}
      </span>
    </div>
  )
}

interface HeroStatsProps {
  stats: {
    solutions: { value: string; label: string }
    experience: { value: string; label: string }
  }
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="flex flex-row gap-8 md:gap-12">
      <StatItem value={stats.solutions.value} label={stats.solutions.label} />
      <StatItem value={stats.experience.value} label={stats.experience.label} />
    </div>
  )
}
