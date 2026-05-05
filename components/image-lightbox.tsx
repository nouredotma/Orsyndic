"use client"

import * as React from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageLightboxProps {
  images: string[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ images, initialIndex = 0, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)

  React.useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || images.length === 0) return
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
      } else if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, images, onClose])

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  if (!isOpen || images.length === 0) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[110] cursor-pointer"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 && (
        <>
          <button 
            onClick={handlePrevious}
            className="absolute left-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[110] cursor-pointer"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[110] cursor-pointer"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
        <img 
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1}`} 
          className="max-w-full max-h-full object-contain select-none shadow-2xl rounded-sm"
        />
        
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}
