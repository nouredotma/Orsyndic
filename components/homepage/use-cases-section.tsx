"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function UseCasesSection() {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<any>(null)

  const useCases = [
    {
      role: t.useCases.services.seo.role,
      description: t.useCases.services.seo.description,
      image: "/usecases/seo.svg",
      details: t.useCases.services.seo.details
    },
    {
      role: t.useCases.services.mobile.role,
      description: t.useCases.services.mobile.description,
      image: "/usecases/mobile.svg",
      details: t.useCases.services.mobile.details
    },
    {
      role: t.useCases.services.performance.role,
      description: t.useCases.services.performance.description,
      image: "/usecases/performance.svg",
      details: t.useCases.services.performance.details
    },
    {
      role: t.useCases.services.web.role,
      description: t.useCases.services.web.description,
      image: "/usecases/web.svg",
      details: t.useCases.services.web.details
    },
    {
      role: t.useCases.services.uiux.role,
      description: t.useCases.services.uiux.description,
      image: "/usecases/uiux.svg",
      details: t.useCases.services.uiux.details
    },
    {
      role: t.useCases.services.ecommerce.role,
      description: t.useCases.services.ecommerce.description,
      image: "/usecases/ecommerce.svg",
      details: t.useCases.services.ecommerce.details
    },
  ]

  return (
    <section id="use-cases" className="w-full py-10 px-3 md:px-16 bg-background scroll-mt-20">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-medium md:text-4xl text-balance tracking-tighter">
            {t.useCases.title.part1} {t.useCases.title.part2}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base font-normal">
            {t.useCases.subtitle}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 mt-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.role}
              className="relative flex flex-col bg-neutral-50 rounded-sm md:rounded-xl overflow-hidden border-2 border-neutral-200 transition-all duration-300 cursor-pointer hover:border-primary group"
              onClick={() => setSelectedService(useCase)}
            >
              {/* Image Container */}
              <div className="relative h-36 md:h-56 overflow-hidden">
                <img
                  src={useCase.image}
                  alt={useCase.role}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Content */}
              <div className="p-2 md:p-4 flex flex-col flex-1">
                  <h3 className="text-sm md:text-lg font-semibold tracking-tight text-black leading-tight group-hover:text-primary transition-colors">{useCase.role}</h3>
                  <p className="text-neutral-400 text-[11px] md:text-sm">
                    {useCase.description}
                  </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-sm bg-white p-4 md:p-6 shadow-xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 rounded-full p-1 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-neutral-500" />
              </button>
              
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-neutral-50">
                <img
                  src={selectedService.image}
                  alt={selectedService.role}
                  className="h-16 w-16 object-contain"
                />
              </div>
              
              <h3 className="mb-2 text-lg md:text-2xl font-bold text-gray-900">{selectedService.role}</h3>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                {selectedService.details}
              </p>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {t.useCases.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
