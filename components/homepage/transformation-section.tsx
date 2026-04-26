"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

function StepCard({
  step,
  index,
  totalSteps,
}: {
  step: any
  index: number
  totalSteps: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  })

  // Each card scales down slightly as it scrolls away
  // The last card doesn't scale down
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    index === totalSteps - 1 ? [1, 1] : [1, 0.92]
  )

  return (
    <div
      ref={cardRef}
      className="h-[80svh] w-full flex items-center justify-center sticky top-[18svh] px-2 md:px-6 lg:px-8"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full max-w-7xl"
      >
        <div
          className="rounded-sm md:rounded-xl overflow-hidden bg-black"
        >
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left: Number (Desktop) */}
            <div
              className="hidden md:flex flex-col items-center justify-center md:h-[420px] md:w-[420px] shrink-0 relative overflow-hidden"
            >
              <video
                src={step.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-bottom opacity-60 pointer-events-none"
              />
              <span
                className="text-9xl tracking-tighter leading-none text-white relative z-10 select-none"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                {step.number}
              </span>
            </div>

            {/* Right: Content */}
            <div 
              className="flex-1 flex flex-col justify-center px-3 py-3 md:px-10 md:py-10 relative overflow-hidden"
              style={{ backgroundColor: step.color }}
            >
              {/* Mobile Black Square */}
              <div className="md:hidden w-20 h-20 rounded-sm flex items-center justify-center mb-5 shrink-0 relative overflow-hidden">
                <video
                  src={step.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-bottom opacity-60 pointer-events-none"
                />
                <span 
                  className="text-3xl tracking-tighter leading-none text-white relative z-10"
                  style={{ fontFamily: "var(--font-caveat)" }}
                >
                  {step.number}
                </span>
              </div>

              <h3 
                className="text-2xl md:text-5xl font-semibold mb-2 md:mb-5 tracking-tighter"
                style={{ color: step.textColor }}
              >
                {step.title}
              </h3>

              <p 
                className="text-sm md:text-lg tracking-tight max-w-xl"
                style={{ 
                  color: step.textColor,
                  opacity: step.textColor === "#ffffff" ? 0.7 : 0.85 
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function TransformationSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: "01",
      title: t.transformation.steps.step1.title,
      description: t.transformation.steps.step1.description,
      color: "#dce8f8",
      textColor: "#1d407e",
      lightBg: "#e8f1fc",
      video: "/steps/1.mp4",
    },
    {
      number: "02",
      title: t.transformation.steps.step2.title,
      description: t.transformation.steps.step2.description,
      color: "#9abfef",
      textColor: "#1d407e",
      lightBg: "#f0f6fe",
      video: "/steps/2.mp4",
    },
    {
      number: "03",
      title: t.transformation.steps.step3.title,
      description: t.transformation.steps.step3.description,
      color: "#5995e6",
      textColor: "#ffffff",
      lightBg: "#e8f1fc",
      video: "/steps/3.mp4",
    },
    {
      number: "04",
      title: t.transformation.steps.step4.title,
      description: t.transformation.steps.step4.description,
      color: "#226fd3",
      textColor: "#ffffff",
      lightBg: "#f0f6fe",
      video: "/steps/4.mp4",
    },
  ]

  return (
    <section id="process" className="w-full bg-background">
      {/* Cards container — header + cards share the same sticky scope */}
      <div ref={containerRef} className="relative pb-4">
        {/* Header — sticky behind cards, scrolls away with the container */}
        <div className="sticky top-[12svh] h-[86svh] z-0 pointer-events-none">
          <div className="max-w-7xl mx-auto text-center space-y-1 py-5 px-3 md:px-6 lg:px-8 pointer-events-auto">
            <h2 className="text-xl font-medium md:text-4xl text-balance tracking-tighter">
              {t.transformation.title}
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base font-normal tracking-tight">
              {t.transformation.subtitle}
            </p>
          </div>
        </div>

        {/* Stacking Cards */}
        <div className="relative -mt-[86svh] pt-12 md:pt-14">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
