"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, Shield, Rocket } from "lucide-react"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { useLanguage } from "@/lib/language-context"

export default function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-10 px-2 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Black background container */}
        <div className="bg-black rounded-lg md:rounded-xl px-5 py-10 md:px-20 md:py-12 ">
          {/* Centered content */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-white mb-2">
              {t.cta.title}
            </h2>
            <p className="text-white/80 mb-2 md:mb-10 text-sm md:text-base">
              {t.cta.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-2 md:gap-4 justify-center">
              <Link href="/get-a-quote">
                <Button
                  className="group bg-white hover:bg-white/90 text-black rounded-full pl-2 pr-1 py-1 md:pl-4 md:pr-2 md:py-2 cursor-pointer w-full font-semibold text-xs md:text-base h-auto border border-white flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {t.cta.primaryBtn}
                  <AnimatedArrow wrapperClassName="bg-black shrink-0" arrowClassName="text-white" />
                </Button>
              </Link>
              <Link href="https://wa.me/212660715095" target="_blank">
                <Button
                  className="group bg-transparent hover:bg-white/10 border border-white text-white rounded-full pl-2 pr-1 py-1 md:pl-4 md:pr-2 md:py-2 cursor-pointer w-full font-semibold text-xs md:text-base h-auto flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {t.cta.secondaryBtn}
                  <AnimatedArrow wrapperClassName="bg-white shrink-0" arrowClassName="text-black" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Three columns with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="text-left">
              <div className="mb-4 inline-block p-3 bg-white/10 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-md font-bold text-white mb-1 md:mb-2">{t.cta.features.engaging.title}</h3>
              <p className="text-white/70 text-xs md:text-sm">
                {t.cta.features.engaging.description}
              </p>
            </div>

            {/* Column 2 */}
            <div className="text-left">
              <div className="mb-4 inline-block p-3 bg-white/10 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-md font-bold text-white mb-1 md:mb-2">{t.cta.features.secure.title}</h3>
              <p className="text-white/70 text-xs md:text-sm">
                {t.cta.features.secure.description}
              </p>
            </div>

            {/* Column 3 */}
            <div className="text-left">
              <div className="mb-4 inline-block p-3 bg-white/10 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-md font-bold text-white mb-1 md:mb-2">{t.cta.features.scale.title}</h3>
              <p className="text-white/70 text-xs md:text-sm">
                {t.cta.features.scale.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
