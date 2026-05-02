"use client"

import Header from "@/components/homepage/header"
import Footer from "@/components/homepage/footer"
import ContactForm from "@/components/contact/contact-form"
import { useLanguage } from "@/lib/language-context"

export default function ContactPage() {
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
              <div className="inline-flex mb-4 px-3 py-1.5 rounded-sm bg-primary/5 border border-primary w-fit">
                <span className="text-xs md:text-sm font-semibold text-primary">{t.contactPage.badge}</span>
              </div>
              
              <h1 className="text-xl md:text-5xl font-medium mb-6 text-black tracking-tight">
                {t.contactPage.heading}
              </h1>
              
              <p className="text-xs md:text-base font-medium text-neutral-400">
                {t.contactPage.subheading}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-1">{t.contactPage.emailUs}</span>
                  <a href="mailto:contact@orsyndic.com" className="text-base md:text-sm font-medium text-black hover:underline decoration-2 underline-offset-4">
                    contact@orsyndic.com
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-1">{t.contactPage.callUs}</span>
                  <a href={`tel:${t.contactPage.phoneNumber.replace(/\s/g, "")}`} className="text-base md:text-sm font-medium text-black hover:underline decoration-2 underline-offset-4">
                    {t.contactPage.phoneNumber}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-1">{t.contactPage.visitUs}</span>
                  <span className="text-base md:text-sm font-medium text-black">
                    {t.contactPage.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: Form Component */}
            <ContactForm />

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
