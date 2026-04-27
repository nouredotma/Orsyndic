import type React from "react"
import type { Metadata } from "next"
import { Inter, Urbanist, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Preloader from "@/components/homepage/preloader"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "sonner"
import { FloatingActions } from "@/components/homepage/floating-actions"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })

export const metadata: Metadata = {
  metadataBase: new URL("https://orsyndic.com"),
  title: {
    default: "Orsyndic | Gestion de Syndic Simplifiée",
    template: "%s | Orsyndic",
  },
  description:
    "Orsyndic est la solution web moderne pour la gestion de copropriétés. Transparence financière, automatisation des charges et communication fluide entre syndics et résidents.",
  keywords: [
    "gestion de syndic",
    "copropriété",
    "immobilier",
    "charges de copropriété",
    "syndic bénévole",
    "syndic professionnel",
    "Orsyndic",
    "PropTech",
    "gestion immobilière",
  ],
  authors: [{ name: "Orsyndic" }],
  creator: "Orsyndic",
  publisher: "Orsyndic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.jpeg",
    shortcut: "/icon.jpeg",
    apple: "/icon.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://orsyndic.com",
    siteName: "Orsyndic | Gestion de Syndic",
    title: "Orsyndic | Application Web de Gestion de Syndic",
    description:
      "Gérez vos copropriétés en toute simplicité. Automatisation, transparence et réactivité pour les syndics et copropriétaires.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orsyndic - Solution de gestion de syndic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@orsyndic",
    title: "Orsyndic | Logiciel de Syndic Moderne",
    description:
      "Simplifiez la gestion de vos immeubles avec Orsyndic. La plateforme tout-en-un pour les syndics d'aujourd'hui.",
    images: ["/og-image.png"],
    creator: "@orsyndic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport = {
  themeColor: "#FF0000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="loading relative" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${urbanist.variable} ${caveat.variable} font-sans antialiased relative`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Orsyndic",
              "url": "https://orsyndic.com",
              "logo": "https://orsyndic.com/icon.jpeg",
              "image": "https://orsyndic.com/og-image.png",
              "description": "Application Web de Gestion de Syndic simplifiant la vie des copropriétaires et gestionnaires.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              }
            }),
          }}
        />
        <Preloader />
        <LanguageProvider>
          {children}
          <FloatingActions />
        </LanguageProvider>
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}

