"use client"

import Header from "@/components/homepage/header"
import Footer from "@/components/homepage/footer"
import QuoteForm from "@/components/get-a-quote/quote-form"
import { useLanguage } from "@/lib/language-context"

export default function GetAQuotePage() {
  const { t } = useLanguage()

  return (
    <main className="w-full min-h-screen flex flex-col">
      <Header />
      
      {/* Main Content Area */}
      <section className="flex-grow pt-40 md:pt-32 pb-20 w-full bg-white relative">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
            
            {/* Left side: Information / Copy */}
            <div className="flex flex-col justify-start max-w-xl lg:sticky lg:top-40">
              <div className="inline-flex mb-4 px-3 py-1.5 rounded-full bg-primary/5 border border-primary w-fit">
                <span className="text-xs md:text-sm font-semibold text-primary">{t.getQuote.badge}</span>
              </div>
              
              <h1 className="text-xl md:text-5xl font-medium mb-6 text-black tracking-tight">
                {t.getQuote.heading}
              </h1>
              
              <p className="text-xs md:text-base font-medium text-neutral-400 mb-8">
                {t.getQuote.subheading}
              </p>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-1">{t.getQuote.emailUs}</span>
                  <a href="mailto:contact@orsyndic.com" className="text-base md:text-lg font-medium text-black hover:underline decoration-2 underline-offset-4">
                    contact@orsyndic.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right side: Form Component */}
            <QuoteForm />

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
