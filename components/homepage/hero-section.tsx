"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedArrow } from "@/components/ui/animated-arrow"


import { useLanguage } from "@/lib/language-context"

export default function HeroSection() {
  const { t } = useLanguage()
  const [stickyOffset, setStickyOffset] = useState(0)

  const heroRef = useRef<HTMLElement>(null)
  const animationStartRef = useRef(0)

  const { scrollY } = useScroll()

  // Animation only starts after the user has scrolled past the hero content.
  // On viewports where hero fits in one screen, animationStart = 0 (starts immediately).
  // On smaller viewports, animationStart = heroHeight - viewportHeight (waits for full content visibility).
  const opacity = useTransform(scrollY, (latest) => {
    const start = animationStartRef.current
    if (latest <= start) return 1
    const progress = Math.min((latest - start) / 500, 1)
    return 1 - progress * 0.6
  })

  const scale = useTransform(scrollY, (latest) => {
    const start = animationStartRef.current
    if (latest <= start) return 1
    const progress = Math.min((latest - start) / 500, 1)
    return 1 - progress * 0.05
  })

  const y = useTransform(scrollY, (latest) => {
    const start = animationStartRef.current
    if (latest <= start) return 0
    const progress = Math.min((latest - start) / 500, 1)
    return -50 * progress
  })


  // Calculate animation start point based on hero section height vs viewport
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const updateAnimationStart = () => {
      const heroHeight = hero.offsetHeight
      const windowHeight = window.innerHeight
      const start = Math.max(0, heroHeight - windowHeight)
      animationStartRef.current = start
      setStickyOffset(-start)
    }

    updateAnimationStart()

    const resizeObserver = new ResizeObserver(updateAnimationStart)
    resizeObserver.observe(hero)
    window.addEventListener('resize', updateAnimationStart)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateAnimationStart)
    }
  }, [])




  return (
    <>
      <section 
        ref={heroRef} 
        className="sticky z-0 w-full flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-40 pb-10 md:pb-16 px-3 sm:px-6 lg:px-8 min-h-screen"
        style={{ top: stickyOffset }}
      >
        <div className="absolute inset-0 w-full h-full bg-background" />

        {/* Content */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto text-center"
          style={{ opacity, scale, y }}
        >
          <div className="inline-flex mb-2 px-3 py-1.5 rounded-sm bg-black">
            <span className="text-[10px] md:text-sm font-medium shiny-sweep">{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-medium mb-3 text-black px-2 md:px-0 tracking-tighter text-balance">
            {t.hero.title.part1} <br /> {t.hero.title.part2}.
          </h1>

          <p className="text-xs md:text-lg font-normal tracking-tight text-neutral-400 mb-4 max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          <div className="flex flex-row gap-2 md:gap-4 justify-center">
            <Link href="/syndic-demo/login">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 border-2 border-primary text-white font-medium rounded-sm pl-2 pr-1 py-1 md:pl-4 md:pr-2 md:py-2 cursor-pointer text-xs md:text-sm h-auto flex items-center gap-2 transition-all duration-300"
              >
                {t.hero.startProject}
                <AnimatedArrow wrapperClassName="bg-white shrink-0" arrowClassName="text-primary" />
              </Button>
            </Link>
            
            <Link 
              href="#functionalities"
              onClick={(e) => {
                e.preventDefault()
                const destination = document.querySelector("#functionalities")
                if (destination) {
                  destination.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <Button
                size="lg"
                className="group bg-black hover:bg-black/90 text-white border-2 border-black font-medium rounded-sm pl-2 pr-1 py-1 md:pl-4 md:pr-2 md:py-2 cursor-pointer text-xs md:text-sm h-auto flex items-center gap-2 transition-all duration-300"
              >
                {t.hero.viewServices}
                <AnimatedArrow wrapperClassName="bg-white shrink-0" arrowClassName="text-black" />
              </Button>
            </Link>
          </div>

          {/* Hero Project Image */}
          <motion.div
            className="mt-8 w-full max-w-5xl mx-auto relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Hero 1 — bottom-left decorative shape, BEHIND main image, full screen width */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
              style={{ width: "100vw" }}
            >
              <Image
                src="/hero1.webp"
                alt=""
                width={1920}
                height={1080}
                className="w-full h-auto object-contain filter-[drop-shadow(0_0_10px_rgba(0,0,0,0.20))]"
                priority
              />
            </div>

            {/* Main Project Image */}
            <div className="relative w-full rounded-sm overflow-hidden z-10">
              <Image
                src="/hero.png"
                alt="Project showcase"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Hero 2 — bottom-right decorative shape, ABOVE main image, full screen width */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-20"
              style={{ width: "100vw" }}
            >
              <Image
                src="/hero2.webp"
                alt=""
                width={1920}
                height={1080}
                className="w-full h-auto object-contain filter-[drop-shadow(0_0_10px_rgba(0,0,0,0.20))]"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
