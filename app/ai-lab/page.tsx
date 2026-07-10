import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Engineering Lab",
  description:
    "Zagrosia Engineering's AI Lab — AI-powered structural engineering tools, automated seismic analysis, and intelligent building assessment software built for licensed P.Eng engineers.",
  alternates: { canonical: "https://www.zagrosia.ca/ai-lab" },
  openGraph: {
    title: "AI Engineering Lab | Zagrosia Engineering Inc.",
    description:
      "AI-powered tools for structural engineers — automated seismic analysis, intelligent building assessments, and more from Zagrosia Engineering.",
    url: "https://www.zagrosia.ca/ai-lab",
  },
}

import { AboutPageHeader } from "@/components/about-page-header"
import { AILabSection } from "@/components/ai-lab-section"
import { Footer } from "@/components/footer"

export default function AILabPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <AILabSection />
      </div>
      <Footer />
    </main>
  )
}
