"use client"

import { Star } from "lucide-react"
import ClassNames from "embla-carousel-class-names"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import {
  Carousel,
  Slider,
  SliderContainer,
  useCarousel,
} from "@/components/ui/carousel"
import { useLanguage } from "@/lib/language-context"

interface Review {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  review: string
  timeAgo: string
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const { selectedIndex } = useCarousel()
  const { t } = useLanguage()

  return (
    <div
      className={`
        w-full max-w-[550px] lg:max-w-none rounded-sm md:rounded-xl overflow-hidden
        bg-neutral-50 border-2 border-neutral-200
        transition-all duration-500 h-full flex flex-col
      `}
    >
      {/* Card content */}
      <div className="p-5 sm:p-6 flex flex-col h-full">
        {/* Header: Avatar + Info + Google logo */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-[2px]" style={{ background: "conic-gradient(#4285F4, #34A853, #FBBC05, #EA4335, #4285F4)" }}>
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-full h-full rounded-full object-cover border-2 border-neutral-50"
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm sm:text-[15px] font-medium text-gray-900 leading-tight">
                {review.name}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
                {review.role}
              </p>
            </div>
          </div>
          <GoogleLogo className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
        </div>

        {/* Rating + Time */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={review.rating} />
          <span className="text-[11px] sm:text-xs text-neutral-400">{review.timeAgo}</span>
        </div>

        {/* Review text */}
        <p className="text-[13px] sm:text-sm text-neutral-500 leading-relaxed line-clamp-4">
          {review.review}
        </p>

        {/* Google attribution */}
        <div className="flex items-center gap-1.5 mt-auto pt-10 border-t border-gray-50">
          <GoogleLogo className="w-3.5 h-3.5" />
          <span className="text-[10px] sm:text-[11px] text-neutral-400 font-medium">
            {t.testimonials.postedOnGoogle}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const { t } = useLanguage()

  const reviews: Review[] = [
    {
      id: 1,
      name: "Brandon Zell",
      role: t.testimonials.reviews.brandon.role,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      review: t.testimonials.reviews.brandon.review,
      timeAgo: t.testimonials.reviews.brandon.timeAgo,
    },
    {
      id: 2,
      name: "Sarah Harris",
      role: t.testimonials.reviews.sarah.role,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      review: t.testimonials.reviews.sarah.review,
      timeAgo: t.testimonials.reviews.sarah.timeAgo,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: t.testimonials.reviews.michael.role,
      avatar: "https://plus.unsplash.com/premium_photo-1675129779554-dc86569708c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      review: t.testimonials.reviews.michael.review,
      timeAgo: t.testimonials.reviews.michael.timeAgo,
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: t.testimonials.reviews.emily.role,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      review: t.testimonials.reviews.emily.review,
      timeAgo: t.testimonials.reviews.emily.timeAgo,
    },
    {
      id: 5,
      name: "David Thompson",
      role: t.testimonials.reviews.david.role,
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      review: t.testimonials.reviews.david.review,
      timeAgo: t.testimonials.reviews.david.timeAgo,
    },
    {
      id: 6,
      name: "Amara Johnson",
      role: t.testimonials.reviews.amara.role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      review: t.testimonials.reviews.amara.review,
      timeAgo: t.testimonials.reviews.amara.timeAgo,
    },
    {
      id: 7,
      name: "James Whitfield",
      role: t.testimonials.reviews.james.role,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      review: t.testimonials.reviews.james.review,
      timeAgo: t.testimonials.reviews.james.timeAgo,
    },
    {
      id: 8,
      name: "Priya Nair",
      role: t.testimonials.reviews.priya.role,
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      review: t.testimonials.reviews.priya.review,
      timeAgo: t.testimonials.reviews.priya.timeAgo,
    },
  ]

  return (
    <section id="testimonials" className="w-full py-10 bg-background overflow-hidden scroll-mt-20">
      <div className="w-full">
        <h2 className="text-xl font-medium tracking-tight md:text-3xl lg:text-4xl text-center mb-4 sm:mb-6 text-balance flex items-center justify-center">
          {t.testimonials.title}
          <span className="relative inline-flex items-center">
            <svg
              className="w-5 h-5 md:w-7 md:h-7 text-primary select-none pointer-events-none rotate-32 translate-y-0.5"
              viewBox="0 0 100 100"
              fill="none"
            >
              <motion.path
                d="M50 85 C 35 65, 25 45, 25 30 C 25 15, 40 15, 50 30 C 60 15, 75 15, 75 30 C 75 45, 65 65, 50 85"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              <motion.path
                d="M51 86 C 33 63, 23 43, 23 28 C 23 13, 41 14, 51 28 C 61 14, 77 13, 77 28 C 77 43, 67 63, 51 86"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </svg>
          </span>
        </h2>

        <Carousel
          options={{ loop: true, align: "center" }}
          plugins={[
            ClassNames() as any,
            Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }) as any,
          ]}
        >
          <SliderContainer>
            {reviews.map((review, index) => (
              <Slider
                key={review.id}
                className="
                  basis-[96%] sm:basis-1/2 lg:basis-[42%]
                  transition-opacity duration-700 ease-out
                  [&.is-in-view]:opacity-60
                  [&.is-snapped]:opacity-100
                  flex justify-center px-0 md:px-2
                "
              >
                <ReviewCard review={review} index={index} />
              </Slider>
            ))}
          </SliderContainer>
        </Carousel>
      </div>
    </section>
  )
}
