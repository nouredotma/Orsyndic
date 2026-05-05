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
  
  // Use consistent dimensions
  const sizeClasses = isSquare 
    ? "w-12 h-12 md:w-14 md:h-14" 
    : "w-12 h-12 md:w-13 md:h-13"
  
  const borderClasses = isSquare
    ? "border border-neutral-200 shadow-sm"
    : "border-2 border-primary"

  return (
    <div ref={containerRef} className={`relative ${sizeClasses}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isSquare ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isSquare ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute flex flex-col gap-1 p-1 bg-white/95 backdrop-blur-md z-10001 w-full rounded-sm ${borderClasses} ${
              isSquare ? "bottom-full mb-2" : "top-full mt-2"
            } left-0`}
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
                  className="w-full aspect-square flex items-center justify-center overflow-hidden border border-transparent hover:border-primary transition-all duration-300 bg-white p-0 cursor-pointer group rounded-sm"
                  title={lang.name}
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-full h-full object-cover shrink-0 rounded-sm"
                  />
                </motion.button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden bg-white w-full h-full rounded-sm ${borderClasses}`}
        aria-label="Select Language"
      >
        <div className="relative z-10 w-full h-full">
          <img
            src={currentLang.flag}
            alt={currentLang.name}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </motion.button>
    </div>
  )
}
