"use client"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"

import { motion } from "framer-motion"

import { Zap, Rocket, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function PriceSection() {
  const { t } = useLanguage()

  const TIERS: (PricingTier & { limitations: string[] })[] = [
    {
      name: t.pricing.tiers.starter.name,
      price: t.pricing.tiers.enterprise.price,
      description: t.pricing.tiers.starter.description,
      features: t.pricing.tiers.starter.features,
      limitations: t.pricing.tiers.starter.limitations,
      cta: t.pricing.tiers.starter.cta,
      link: "/get-a-quote",
      primaryBorder: true,
      icon: Zap,
    },
    {
      name: t.pricing.tiers.professional.name,
      price: t.pricing.tiers.enterprise.price,
      description: t.pricing.tiers.professional.description,
      features: t.pricing.tiers.professional.features,
      limitations: t.pricing.tiers.professional.limitations,
      cta: t.pricing.tiers.professional.cta,
      link: "/get-a-quote",
      popular: true,
      icon: Rocket,
    },
    {
      name: t.pricing.tiers.enterprise.name,
      price: t.pricing.tiers.enterprise.price,
      description: t.pricing.tiers.enterprise.description,
      features: t.pricing.tiers.enterprise.features,
      limitations: t.pricing.tiers.enterprise.limitations,
      cta: t.pricing.tiers.enterprise.cta,
      link: "/get-a-quote",
      icon: Building2,
    },
  ]

  return (
    <section id="pricing" className="w-full py-10 px-3 md:px-16 bg-background overflow-hidden scroll-mt-20">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-2 text-center">
            <div className="space-y-1">
              <h1 className="text-xl font-medium tracking-tight md:text-4xl text-balance">
                {t.pricing.title} {t.pricing.pricing}
              </h1>
              <p className="text-neutral-500 tracking-tight text-sm md:text-base">{t.pricing.subtitle}</p>
            </div>
          </div>

          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
