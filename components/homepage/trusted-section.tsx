"use client"

import { useLanguage } from "@/lib/language-context"

export default function TrustedSection() {
  const { t } = useLanguage()
  // 14 company/brand images with black filter
  // 14 company/brand images with their official links
  const trustedData = [
    { logo: "https://cdn.simpleicons.org/nextdotjs", url: "https://nextjs.org" },
    { logo: "https://cdn.simpleicons.org/react", url: "https://react.dev" },
    { logo: "https://cdn.simpleicons.org/tailwindcss", url: "https://tailwindcss.com" },
    { logo: "https://cdn.simpleicons.org/typescript", url: "https://www.typescriptlang.org" },
    { logo: "https://cdn.simpleicons.org/nodedotjs", url: "https://nodejs.org" },
    { logo: "https://cdn.simpleicons.org/cloudflare", url: "https://cloudflare.com" },
    { logo: "https://cdn.simpleicons.org/rust", url: "https://www.rust-lang.org" },
    { logo: "https://cdn.simpleicons.org/github", url: "https://github.com" },
    { logo: "https://cdn.simpleicons.org/postgresql", url: "https://www.postgresql.org" },
    { logo: "https://cdn.simpleicons.org/python", url: "https://www.python.org" },
    { logo: "https://cdn.simpleicons.org/supabase", url: "https://supabase.com" },
    { logo: "https://cdn.simpleicons.org/resend", url: "https://resend.com" },
    { logo: "https://cdn.simpleicons.org/docker", url: "https://docker.com" },
    { logo: "https://cdn.simpleicons.org/kubernetes", url: "https://kubernetes.io" },
  ]

  return (
    <section className="w-full py-5 px-3 md:px-16 bg-background">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-2">
          <p className="text-black/50 font-semibold text-xs md:text-md"> <span className="font-semibold text-black">{t.trusted.text.part1}</span>{t.trusted.text.part2}<span className="font-semibold text-black">{t.trusted.text.part3}</span>{t.trusted.text.part4}</p>
        </div>

        {/* Mobile: Marquee Scrollers */}
        <div className="md:hidden">
          {/* Row 1: Forward Marquee */}
          <div className="group flex overflow-hidden py-1 [--gap:0.5rem] gap-(--gap) flex-row max-w-full [--duration:30s] mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  className="flex shrink-0 justify-around gap-(--gap) animate-marquee flex-row"
                  key={i}
                >
                  {trustedData.slice(0, 7).map((item, idx) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={idx}
                      className="w-20 h-14 rounded-sm flex items-center justify-center bg-neutral-50 border-2 border-neutral-200 active:border-black transition-all"
                    >
                      <img
                        src={item.logo || "/placeholder.svg"}
                        alt={`Trusted branding ${idx}`}
                        className="w-6 h-6 object-contain grayscale brightness-0"
                      />
                    </a>
                  ))}
                </div>
              ))}
          </div>
 
          {/* Row 2: Reverse Marquee */}
          <div className="group flex overflow-hidden py-1 [--gap:0.5rem] gap-(--gap) flex-row max-w-full [--duration:35s] mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  className="flex shrink-0 justify-around gap-(--gap) animate-marquee-reverse flex-row"
                  key={i}
                >
                  {trustedData.slice(7, 14).map((item, idx) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={idx}
                      className="w-20 h-14 rounded-sm flex items-center justify-center bg-neutral-50 border-2 border-neutral-200 active:border-black transition-all"
                    >
                      <img
                        src={item.logo || "/placeholder.svg"}
                        alt={`Trusted branding reverse ${idx}`}
                        className="w-6 h-6 object-contain grayscale brightness-0"
                      />
                    </a>
                  ))}
                </div>
              ))}
          </div>
        </div>

        {/* Desktop: 7-column grid */}
        <div className="hidden md:grid grid-cols-7 gap-3">
          {trustedData.map((item, index) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="rounded-sm flex items-center justify-center bg-neutral-50 border-2 border-neutral-200 p-2 h-20 hover:border-black transition-all duration-300 group"
            >
              <img
                src={item.logo || "/placeholder.svg"}
                alt={`Trusted company ${index + 1}`}
                className="w-8 h-8 object-contain grayscale brightness-0 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
