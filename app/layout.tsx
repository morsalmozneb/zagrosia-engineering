import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Sidebar } from '@/components/sidebar'
import { IntroAnimation } from '@/components/intro-animation'
import { BackToTop } from '@/components/back-to-top'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
})

const BASE_URL = "https://www.zagrosia.ca"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/images/zagrosia-logo.svg",
    shortcut: "/images/zagrosia-logo.svg",
    apple: "/images/zagrosia-logo.svg",
  },
  title: {
    default: "Zagrosia Engineering Inc. | Structural Engineers BC, AB & SK | P.Eng",
    template: "%s | Zagrosia Engineering Inc.",
  },
  description:
    "Licensed structural engineers (P.Eng) in BC, Alberta, and Saskatchewan. Seismic assessments, structural design, building rehabilitation, racking systems, and AI-powered engineering tools. 35+ years of expertise.",
  keywords: [
    "structural engineering BC",
    "structural engineer Vancouver",
    "seismic assessment BC",
    "P.Eng British Columbia",
    "building rehabilitation engineer",
    "structural design Alberta",
    "racking system engineer",
    "building envelope assessment",
    "EGBC exam prep",
    "engineering firm BC",
    "Zagrosia Engineering",
    "i3 Building Science",
  ],
  authors: [{ name: "Zagrosia Engineering Inc.", url: BASE_URL }],
  creator: "Zagrosia Engineering Inc.",
  publisher: "Zagrosia Engineering Inc.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: "Zagrosia Engineering Inc.",
    title: "Zagrosia Engineering Inc. | Structural Engineers in BC, Alberta & Saskatchewan",
    description:
      "Licensed structural engineers (P.Eng) in BC, Alberta, and Saskatchewan. Seismic assessments, structural design, building rehabilitation, and AI-powered engineering tools.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zagrosia Engineering Inc. — Structural Engineers in Western Canada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zagrosia Engineering Inc. | Structural Engineers in BC",
    description:
      "Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan. Seismic assessments, design, and AI-powered tools.",
    images: ["/images/og-image.jpg"],
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
  // After setting up Google Search Console, paste your verification code here:
  // verification: { google: "YOUR_CODE_HERE" },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// JSON-LD structured data — helps Google understand this is a local engineering business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "EngineeringFirm"],
  name: "Zagrosia Engineering Inc.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/zagrosia-logo.svg`,
  image: `${BASE_URL}/images/og-image.jpg`,
  description:
    "Licensed P.Eng structural engineering firm serving BC, Alberta, and Saskatchewan. Specializing in seismic assessment, structural design, building rehabilitation, masonry engineering, racking systems, and AI-powered engineering tools. 35+ years of combined expertise.",
  telephone: "+1-778-317-1043",
  email: "info@zagrosia.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.2827,
    longitude: -123.1207,
  },
  areaServed: [
    { "@type": "State", name: "British Columbia", sameAs: "https://en.wikipedia.org/wiki/British_Columbia" },
    { "@type": "State", name: "Alberta", sameAs: "https://en.wikipedia.org/wiki/Alberta" },
    { "@type": "State", name: "Saskatchewan", sameAs: "https://en.wikipedia.org/wiki/Saskatchewan" },
  ],
  founder: {
    "@type": "Person",
    name: "Seyed Hassan Mozneb",
    jobTitle: "P.Eng, Founder",
  },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "P.Eng — Engineers and Geoscientists BC (EGBC)" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "P.Eng — APEGA Alberta" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "P.Eng — APEGS Saskatchewan" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Structural Engineering Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seismic Assessment and Retrofit Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Design — New Construction" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building Rehabilitation and Retrofit" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Masonry Structural Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Industrial Racking System Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retaining Wall Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Foundation Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Peer Review" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permit-Ready Structural Drawings and Calculations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Structural Inspection and Field Review" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Insurance Restoration Structural Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strata Engineering Reports" } },
    ],
  },
  sameAs: [
    "https://www.linkedin.com/company/zagrosia-engineering",
  ],
  keywords: "structural engineer BC, structural engineer Vancouver, P.Eng BC, seismic assessment Vancouver, structural engineering Alberta, structural engineer Saskatchewan, building rehabilitation BC, masonry engineering Vancouver, racking system engineer BC, permit structural drawings BC",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ background: "#07131F", overflowX: "hidden" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}>
        <IntroAnimation />
        <Sidebar />
        <BackToTop />
        <div id="page-content">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
