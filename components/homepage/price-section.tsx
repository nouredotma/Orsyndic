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
    <section id="pricing" className="w-full py-10 px-3 sm:px-6 lg:px-8 bg-background overflow-hidden scroll-mt-20">
      <div className="max-w-7xl  mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-2 text-center">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight md:text-4xl text-balance">
                {t.pricing.title}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t.pricing.pricing}</span>
                  <svg
                    className="absolute -inset-x-2.5 -inset-y-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] text-primary select-none pointer-events-none -rotate-12"
                    viewBox="0 0 160 60"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <motion.path
                      d="M 10,30 C 10,10 50,5 90,8 C 130,11 150,15 150,30 C 150,45 120,55 80,52 C 40,49 10,45 10,30"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-neutral-400 tracking-tight text-sm md:text-base">{t.pricing.subtitle}</p>
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
