"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  const FAQs = [
    {
      question: t.faq.questions.q1.q,
      answer: t.faq.questions.q1.a,
    },
    {
      question: t.faq.questions.q2.q,
      answer: t.faq.questions.q2.a,
    },
    {
      question: t.faq.questions.q3.q,
      answer: t.faq.questions.q3.a,
    },
    {
      question: t.faq.questions.q4.q,
      answer: t.faq.questions.q4.a,
    },
    {
      question: t.faq.questions.q5.q,
      answer: t.faq.questions.q5.a,
    },
    {
      question: t.faq.questions.q6.q,
      answer: t.faq.questions.q6.a,
    },
  ]

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="w-full py-10 px-2 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 space-y-1">
          <h2 className="text-xl font-bold md:text-4xl text-balance text-black">
            <span className="relative inline-block">
              <span className="relative z-10">{t.faq.title1}</span>
              <svg
                className="absolute bottom-0 left-0 w-full h-[6px] md:h-[10px] text-primary select-none pointer-events-none"
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
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </svg>
            </span>{" "}
            {t.faq.title2}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 max-w-7xl mx-auto items-stretch">
          {FAQs.map((faq, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`group border-2 transition-colors duration-200 rounded-sm md:rounded-xl bg-neutral-50 border-neutral-200 overflow-hidden cursor-pointer h-full ${
                openIndex === index ? "border-primary" : "border-neutral-200 hover:border-primary"
              }`}
            >
              <button
                className="w-full text-left px-3 py-3 sm:px-5 sm:py-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className={`font-medium text-sm md:text-base transition-colors duration-200 leading-tight ${
                  openIndex === index ? "text-primary" : "text-foreground group-hover:text-primary"
                }`}>{faq.question}</span>
                <Plus
                  className={`w-4 h-4 transition-all duration-200 shrink-0 ${
                    openIndex === index ? "rotate-180 text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-3 pb-3 sm:px-5 sm:pb-5 text-xs md:text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
