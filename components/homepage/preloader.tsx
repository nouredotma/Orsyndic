"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

const words = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Olá",
  "Hallo",
  "こんにちは",
  "你好",
  "مرحبًا",
  "Привет",
]

function Logo({ index }: { index: number }) {
  return (
    <div className="relative flex items-center justify-center pointer-events-none">
      <p className="text-white text-3xl md:text-5xl font-medium tracking-tight">
        {words[index]}
      </p>
    </div>
  )
}

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      document.documentElement.classList.remove("loading")
    }, 3000) // 3s total loading

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length) // Loop back to start
    }, 100) // 100ms transitions

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-999999 flex flex-row h-svh w-full overflow-hidden pointer-events-none">
          {/* Left Panel */}
          <motion.div
            key="left-panel"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full flex-1 bg-linear-to-t from-primary to-white overflow-hidden pointer-events-auto"
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
              <Logo index={index} />
            </div>
            
            {/* Small White Logo in Bottom Left */}
            <div className="absolute bottom-5 left-5 w-12 h-12">
              <Image 
                src="/whitelogo.png" 
                alt="Orsyndic Logo" 
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            key="right-panel"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full flex-1 bg-linear-to-t from-primary to-white overflow-hidden pointer-events-auto"
          >
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
              <Logo index={index} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
