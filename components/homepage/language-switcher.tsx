"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { type Language as LangCode } from "@/lib/translations"

interface Language {
  code: LangCode
  name: string
  flag: string
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
  },
  {
    code: "fr",
    name: "Français",
    flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
  },
  {
    code: "es",
    name: "Español",
    flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
  },
]

interface LanguageSwitcherProps {
  align?: "left" | "center" | "right"
  variant?: "circle" | "square"
}

export function LanguageSwitcher({ align = "center", variant = "circle" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language: currentLangCode, setLanguage } = useLanguage()
  const currentLang = languages.find((lang) => lang.code === currentLangCode) || languages[0]
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const isSquare = variant === "square"

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isSquare ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isSquare ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute flex flex-col gap-1.5 p-1.5 md:p-2 bg-white/90 backdrop-blur-md border-2 border-neutral-200 z-10001 min-w-[120px] md:min-w-0 rounded-full ${
              isSquare ? "bottom-full mb-3" : "top-full mt-3"
            } ${
              align === "center" ? "left-1/2 -translate-x-1/2" : align === "right" ? "right-0" : "left-0"
            }`}
          >
            {languages
              .filter((lang) => lang.code !== currentLang.code)
              .map((lang) => (
                <motion.button
                  key={lang.code}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className="w-full md:w-12 h-10 md:h-12 flex items-center gap-3 px-3 md:px-0 overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 bg-white/50 md:bg-white p-0 cursor-pointer group rounded-full"
                  title={lang.name}
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-8 h-8 md:w-full md:h-full object-cover shrink-0 rounded-full"
                  />
                  <span className="text-sm font-medium text-black md:hidden">
                    {lang.name}
                  </span>
                </motion.button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden bg-white ${
          isSquare 
            ? "w-12 h-12 md:w-14 md:h-14 rounded-full border border-neutral-100 shadow-sm" 
            : "w-12 h-12 md:w-13 md:h-13 rounded-full border-2 border-primary"
        }`}
        aria-label="Select Language"
      >
        <div className="relative z-10 w-full h-full">
          <img
            src={currentLang.flag}
            alt={currentLang.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.button>
    </div>
  )
}
