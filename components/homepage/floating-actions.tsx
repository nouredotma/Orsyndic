"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { OrsRobotIcon } from "@/components/ui/ors-robot-icon"
import { AiAssistantModal } from "@/components/homepage/ai-assistant-modal"
import { LanguageSwitcher } from "@/components/homepage/language-switcher"
import { useLanguage } from "@/lib/language-context"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

export function FloatingActions() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show floating actions on syndic dashboard pages
  if (pathname?.startsWith("/syndic")) {
    return null
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="relative z-[100]">
        {/* Bottom Left Controls — AI Assistant & Language */}
        <div className="fixed bottom-3 left-3 md:bottom-6 md:left-6 z-50 flex flex-col items-center gap-1 md:gap-1.5">
          <LanguageSwitcher variant="square" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setAiModalOpen(true)}
                className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white rounded-sm transition-all duration-300 cursor-pointer overflow-hidden border border-neutral-100 shadow-sm"
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
                  <div className="absolute inset-[2.5px] bg-white rounded-sm z-0" />
                </div>

                <div className="relative z-10">
                  <OrsRobotIcon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={1} className="z-[10002]">
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
            className="text-white border-2 border-[#25D366]/20 hover:border-[#25D366] bg-[#25D366] p-2.5 md:p-3 rounded-sm transition-all duration-300"
            aria-label="WhatsApp"
          >
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </Link>

          <Link 
            href="mailto:contact@orsyndic.com" 
            className="border-2 border-neutral-200 bg-white p-2.5 md:p-3 rounded-sm transition-all duration-300"
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
      </div>
    </TooltipProvider>
  )
}
