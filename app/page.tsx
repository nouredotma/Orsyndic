import Header from "@/components/homepage/header"
import HeroSection from "@/components/homepage/hero-section"
import TrustedSection from "@/components/homepage/trusted-section"
import FeaturesSection from "@/components/homepage/features-section"
import TestimonialsSection from "@/components/homepage/testimonials-section"
import CTASection from "@/components/homepage/cta-section"
import PriceSection from "@/components/homepage/price-section"
import FAQSection from "@/components/homepage/faq-section"
import Footer from "@/components/homepage/footer"
import TransformationSection from "@/components/homepage/transformation-section"
import FunctionalitiesSection from "@/components/homepage/functionalities-section"

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <HeroSection />
      <div className="relative z-10 bg-background">
        <TrustedSection />
        <FeaturesSection />
        <TransformationSection />
        <FunctionalitiesSection />
        <PriceSection />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
        <Footer />
      </div>
    </main>
  )
}
