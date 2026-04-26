"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { AnimatedArrow } from "@/components/ui/animated-arrow"
import { OrsRobotIcon } from "@/components/ui/ors-robot-icon"
import { AiAssistantModal } from "@/components/homepage/ai-assistant-modal"
import { LanguageSwitcher } from "@/components/homepage/language-switcher"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

import { useLanguage } from "@/lib/language-context"

export default function HeroSection() {
  const { t } = useLanguage()
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  return (
    <TooltipProvider delayDuration={0}>
      <section className="relative w-full h-svh flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-background" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 md:px-6 lg:px-8 text-center">
          <div className="inline-flex mb-2 px-3 py-1.5 rounded-full bg-black">
            <span className="text-[10px] md:text-sm font-bold shiny-sweep">{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-3 text-black px-2 md:px-0 tracking-tight">
            {t.hero.title.part1}{" "}
            <span className="inline-flex -space-x-3 -translate-x-2">
              <img
                src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
                alt="Team member"
                className="h-9 md:h-14 rounded-full border-2 md:border-4 border-[#f0f6fe] translate-y-1 md:translate-y-1.5"
              />
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
                alt="Team member"
                className="h-9 md:h-14 rounded-full border-2 md:border-4 border-[#f0f6fe] translate-y-1 md:translate-y-1.5"
              />
              <img
                src="https://plus.unsplash.com/premium_photo-1739786996060-2769f1ded135?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2080"
                alt="Team member"
                className="h-9 md:h-14 rounded-full border-2 md:border-4 border-[#f0f6fe] translate-y-1 md:translate-y-1.5"
              />
            </span>
            {t.hero.title.build} <br className="hidden md:block" /> {t.hero.title.part2}{" "}
            <span className="relative inline-block cursor-default group">
              <span className="relative z-10">{t.hero.title.presence}</span>
              <svg
                className="absolute bottom-0 left-0 w-full h-[10px] md:h-[14px] text-primary select-none pointer-events-none"
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M5 20c40-5 90-5 130 2c35 5 55 5 65-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </svg>
            </span>
            .
          </h1>

          <p className="text-xs md:text-xl font-medium text-neutral-500 mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          <div className="flex flex-row gap-2 md:gap-4 justify-center">
            <Link href="/get-a-quote">
              <Button
                size="lg"
                className="group bg-white hover:bg-white/90 border-2 border-neutral-200 text-black font-bold rounded-full pl-2 pr-1 py-1 md:pl-4 md:pr-2 md:py-2 cursor-pointer text-xs md:text-sm h-auto flex items-center gap-2 transition-all duration-300"
              >
                {t.hero.startProject}
                <AnimatedArrow wrapperClassName="bg-black shrink-0" arrowClassName="text-white" />
              </Button>
            </Link>
            
            <Link 
              href="#use-cases"
              onClick={(e) => {
                e.preventDefault()
                const destination = document.querySelector("#use-cases")
                if (destination) {
                  destination.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <Button
                size="lg"
                className="group bg-black hover:bg-black/90 text-white border-2 border-black font-bold rounded-full pl-2 pr-1 py-1 md:pl-4 md:pr-2 md:py-2 cursor-pointer text-xs md:text-sm h-auto flex items-center gap-2 transition-all duration-300"
              >
                {t.hero.viewServices}
                <AnimatedArrow wrapperClassName="bg-white shrink-0" arrowClassName="text-black" />
              </Button>
            </Link>
          </div>
        </div>



        {/* Fixed Bottom Left Controls — AI Assistant & Language */}
        <div className="fixed bottom-3 left-3 md:bottom-6 md:left-6 z-50 flex flex-col items-center gap-1 md:gap-1.5">
          <LanguageSwitcher variant="square" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setAiModalOpen(true)}
                className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white rounded-sm md:rounded-lg transition-all duration-300 cursor-pointer overflow-hidden border border-neutral-100 shadow-sm"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                aria-label={t.hero.askAi}
              >
                {/* Google Color Ring Effect */}
                <div className="absolute inset-0 p-[2.5px] overflow-hidden rounded-[inherit] pointer-events-none">
                  <div 
                    className="absolute -inset-full animate-[spin_6s_linear_infinite]"
                    style={{
                      background: "conic-gradient(from 0deg, #4285F4 0deg, #4285F4 90deg, #EA4335 90deg, #EA4335 180deg, #FBBC05 180deg, #FBBC05 270deg, #34A853 270deg, #34A853 360deg)"
                    }}
                  />
                  <div className="absolute inset-[2.5px] bg-white rounded-xs md:rounded-md z-0" />
                </div>

                <div className="relative z-10">
                  <OrsRobotIcon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={1}>
              {t.hero.askAi}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Contact Links — Fixed Bottom Right (Appears on scroll) */}
        <div className={`
          z-50 flex flex-col items-center gap-1 transition-all duration-500
          fixed bottom-3 right-3 md:bottom-6 md:right-6
          ${scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"}
        `}>

          <Link 
            href="https://wa.me/212660715095" 
            target="_blank" 
            className="text-white border-2 border-[#25D366]/20 hover:border-[#25D366] bg-[#25D366] p-2.5 md:p-3 rounded-full transition-all duration-300"
            aria-label="WhatsApp"
          >
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </Link>

          <Link 
            href="mailto:contact@orsyndic.com" 
            className="border-2 border-neutral-200 bg-white p-2.5 md:p-3 rounded-full transition-all duration-300"
            aria-label="Email"
          >
            <svg viewBox="52 42 88 66" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
              <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
              <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
              <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
              <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
              <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
            </svg>
          </Link>
        </div>

        {/* AI Assistant Modal */}
        <AiAssistantModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
      </section>
    </TooltipProvider>
  )
}

