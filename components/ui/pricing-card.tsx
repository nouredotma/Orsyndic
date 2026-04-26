"use client"

import React from "react"
import { BadgeCheck, X, ArrowRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface PricingTier {
  name: string
  price: number | string
  description: string
  features: string[]
  limitations?: string[]
  cta: string
  link?: string
  popular?: boolean
  highlighted?: boolean
  primaryBorder?: boolean
  primaryLight?: boolean
  icon?: React.ElementType
}

interface PricingCardProps {
  tier: PricingTier
}

export function PricingCard({ tier }: PricingCardProps) {
  const price = tier.price
  const isDark = tier.popular || tier.highlighted
  const Icon = tier.icon

  return (
    <div
      className={cn(
        "relative flex flex-col h-full w-full rounded-sm md:rounded-xl border-2 p-1 transition-all duration-300",
        isDark 
          ? "bg-foreground text-background border-white/10" 
          : "bg-white text-foreground border-border",
        tier.primaryBorder && "ring-1 ring-primary border-primary",
        tier.primaryLight && "bg-primary/5"
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-1.5 bg-linear-to-r from-primary to-primary/80 px-4 py-1.5 rounded-full shadow-lg shadow-primary/20 border border-white/20"
          >
            <Star className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              Most Popular
            </span>
          </motion.div>
        </div>
      )}
      {/* Top Section / Header */}
      <div className={cn(
        "relative mb-4 rounded-sm md:rounded-lg border-2 px-4 py-3 overflow-hidden",
        isDark ? "bg-white/10 border-white/20" : "bg-zinc-200/50 border-zinc-200"
      )}>
        {/* Glass effect gradient for dark cards */}
        {isDark && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0) 100%)",
            }}
          />
        )}

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-4 w-4", isDark ? "text-background/90" : "text-primary")} />}
            <span className={cn(
              "text-sm font-semibold tracking-wide",
              isDark ? "text-background/90" : "text-muted-foreground"
            )}>
              {tier.name}
            </span>
          </div>
        </div>

        <div className="mb-1 flex items-baseline gap-1">
          <div className="text-4xl font-extrabold tracking-tight flex items-baseline leading-none">
            {typeof price === "number" ? (
              <span>${price}</span>
            ) : (
              <span>{price}</span>
            )}
          </div>
        </div>

        <p className={cn("text-xs", isDark ? "text-background/60" : "text-muted-foreground")}>
          {tier.description}
        </p>

        <div className="mt-4">
          <Link
            href={tier.link || "#"}
            className={cn(
              "group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold transition-all duration-200 w-full",
              isDark
                ? "bg-background text-foreground hover:bg-background/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            )}
          >
            {tier.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col flex-1 p-3">
        <ul className="space-y-3.5 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <BadgeCheck className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
              <span className={isDark ? "text-background/80" : "text-muted-foreground"}>
                {feature}
              </span>
            </li>
          ))}
          
          {tier.limitations && tier.limitations.length > 0 && (
            <>
              <div className={cn(
                "flex items-center gap-3 py-2 text-xs",
                isDark ? "text-background/40" : "text-muted-foreground/40"
              )}>
                <span className="h-px flex-1 bg-current" />
                <span className="shrink-0 uppercase tracking-widest font-bold">Limitations</span>
                <span className="h-px flex-1 bg-current" />
              </div>
              {tier.limitations.map((limitation) => (
                <li key={limitation} className={cn(
                  "flex items-start gap-3 text-sm opacity-60",
                  isDark ? "text-background/80" : "text-muted-foreground"
                )}>
                  <X className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                  <span>{limitation}</span>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Decorative background element for popular cards */}
      {tier.popular && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] pointer-events-none rounded-2xl" />
      )}
    </div>
  )
}
