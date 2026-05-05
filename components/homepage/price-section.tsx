"use client"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"

import { Rocket } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function PriceSection() {
  const { t } = useLanguage()

  const TIER: PricingTier & { limitations: string[] } = {
    name: t.pricing.tiers.pro.name,
    price: t.pricing.tiers.pro.price,
    description: t.pricing.tiers.pro.description,
    features: t.pricing.tiers.pro.features,
    limitations: [],
    cta: t.pricing.tiers.pro.cta,
    link: "/syndic/register",
    popular: true,
    icon: Rocket,
  }

  return (
    <section id="pricing" className="w-full py-10 px-3 md:px-16 bg-background overflow-hidden scroll-mt-20">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-2 text-center">
            <div className="space-y-1">
              <h1 className="text-xl font-medium tracking-tight md:text-4xl text-balance">
                {t.pricing.title} {t.pricing.pricing}
              </h1>
              <p className="text-neutral-500 font-normal text-sm md:text-base">{t.pricing.subtitle}</p>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <PricingCard tier={TIER} />
          </div>
        </div>
      </div>
    </section>
  )
}
