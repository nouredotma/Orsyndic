"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { dashboardTranslations, DashboardLanguage, DashboardTranslations } from "./dashboard-translations"

interface I18nContextType {
  language: DashboardLanguage
  setLanguage: (lang: DashboardLanguage) => void
  t: DashboardTranslations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<DashboardLanguage>("en")

  useEffect(() => {
    const saved = localStorage.getItem("dashboard-lang") as DashboardLanguage
    if (saved && (saved === "en" || saved === "fr" || saved === "es")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: DashboardLanguage) => {
    setLanguageState(lang)
    localStorage.setItem("dashboard-lang", lang)
  }

  const t = dashboardTranslations[language]

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
