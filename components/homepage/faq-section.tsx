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
    <section id="faq" className="w-full py-10 px-3 md:px-16 bg-background">
      <div className="max-w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Title & Subtitle */}
          <div className="text-center lg:text-left space-y-3">
            <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full text-primary text-xs md:text-sm bg-primary/5 border border-primary">
              FAQ
            </div>
            <h2 className="text-xl font-medium tracking-tight md:text-4xl text-balance text-black">
              {t.faq.title1} {t.faq.title2}
            </h2>
            <p className="text-neutral-500 font-normal text-sm md:text-base">
              {t.faq.subtitle}
            </p>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="flex flex-col gap-3">
            {FAQs.map((faq, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`group border-2 transition-colors duration-200 rounded-sm bg-neutral-50 border-neutral-200 overflow-hidden cursor-pointer ${
                  openIndex === index ? "border-primary" : "border-neutral-200 hover:border-primary"
                }`}
              >
                <button
                  className="w-full text-left px-3 py-3 sm:px-5 sm:py-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`font-normal text-sm md:text-base transition-colors duration-200 leading-tight ${
                    openIndex === index ? "text-primary" : "text-black group-hover:text-primary"
                  }`}>{faq.question}</span>
                  <Plus
                    className={`w-4 h-4 transition-all duration-200 shrink-0 ${
                      openIndex === index ? "rotate-180 text-primary" : "text-neutral-500 group-hover:text-primary"
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
                      <div className="px-3 pb-3 sm:px-5 sm:pb-5 text-xs md:text-sm font-normal text-neutral-500">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
