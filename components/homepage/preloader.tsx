"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const LETTERS = "Orsyndic".split("")

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Total animation duration:
    // Each letter takes ~0.15s stagger + 0.5s drop = last letter lands at ~1.05s + 0.5s = ~1.55s
    // Add a brief hold after all letters land, then exit
    const timer = setTimeout(() => {
      setLoading(false)
      document.documentElement.classList.remove("loading")
    }, 2800)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-999999 flex items-center justify-center bg-white overflow-hidden pointer-events-auto"
        >
          <div className="flex items-center justify-center">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "-100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-goodly text-primary inline-block"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 6rem)",
                  lineHeight: 1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
