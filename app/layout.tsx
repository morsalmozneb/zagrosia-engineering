import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Sidebar } from '@/components/sidebar'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Zagrosia Engineering Inc. | Structural Engineering Intelligence',
  description: 'Bridging structural engineering with advanced automation and modern digital workflows. 35+ years of expertise in seismic assessments, building rehabilitation, and AI-driven innovation.',
  keywords: ['structural engineering', 'seismic assessment', 'building rehabilitation', 'P.Eng', 'BC', 'Alberta', 'Saskatchewan', 'EGBC'],
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ background: "#eff2f9", overflowX: "hidden" }}>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}>
        <Sidebar />
        <div id="page-content">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
