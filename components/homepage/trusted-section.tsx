"use client"

import { useLanguage } from "@/lib/language-context"

export default function TrustedSection() {
  const { t } = useLanguage()
  // 14 company/brand images with black filter
  // 14 company/brand images with their official links
  const trustedData = [
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
    { logo: "/projects/cropped-tnt-real-estate-logo.jpg", url: "#" },
  ]

  return (
    <section className="w-full py-5 px-3 md:px-16 bg-background">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-2">
          <p className="text-black/50 font-semibold text-xs md:text-md"> <span className="font-semibold text-black">{t.trusted.text.part1}</span>{t.trusted.text.part2}<span className="font-semibold text-black">{t.trusted.text.part3}</span>{t.trusted.text.part4}</p>
        </div>

        {/* Marquee Scrollers (All devices) */}
        <div className="w-full">
          {/* Row 1: Forward Marquee */}
          <div className="flex overflow-hidden py-0.5 [--gap:0.125rem] md:[--gap:0.25rem] gap-(--gap) flex-row max-w-full [--duration:30s] md:[--duration:40s] mask-[linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
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
                      className="group w-24 h-14 md:w-48 md:h-24 rounded-sm border-2 border-neutral-200 flex items-center justify-center bg-white transition-all hover:border-primary overflow-hidden"
                    >
                      <img
                        src={item.logo || "/placeholder.svg"}
                        alt={`Trusted branding ${idx}`}
                        className="w-full h-full object-contain"
                      />
                    </a>
                  ))}
                </div>
              ))}
          </div>
 
          {/* Row 2: Reverse Marquee */}
          <div className="flex overflow-hidden py-0.5 [--gap:0.125rem] md:[--gap:0.25rem] gap-(--gap) flex-row max-w-full [--duration:35s] md:[--duration:45s] mask-[linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
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
                      className="group w-24 h-14 md:w-44 md:h-24 rounded-sm border-2 border-neutral-200 flex items-center justify-center bg-white transition-all hover:border-primary overflow-hidden"
                    >
                      <img
                        src={item.logo || "/placeholder.svg"}
                        alt={`Trusted branding reverse ${idx}`}
                        className="w-full h-full object-contain"
                      />
                    </a>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
