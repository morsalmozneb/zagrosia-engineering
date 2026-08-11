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
  title: {
    default: "Zagrosia Engineering Inc.",
    template: "%s",
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
  "@type": "ProfessionalService",
  name: "Zagrosia Engineering Inc.",
  alternateName: "i3 Building Science & Consulting Inc.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/zagrosia-logo.svg`,
  description:
    "Licensed structural engineering firm (P.Eng) serving BC, Alberta, and Saskatchewan. Specializing in seismic assessment, structural design, building rehabilitation, and AI-powered engineering tools.",
  telephone: "+1-778-317-1043",
  email: "info@zagrosia.ca",
  address: {
    "@type": "PostalAddress",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "Province", name: "British Columbia" },
    { "@type": "Province", name: "Alberta" },
    { "@type": "Province", name: "Saskatchewan" },
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "P.Eng — British Columbia" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "P.Eng — Alberta" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "P.Eng — Saskatchewan" },
  ],
  sameAs: [],
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
