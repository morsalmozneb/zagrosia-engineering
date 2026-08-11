import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "144-Unit Townhouse",
  description: "Zagrosia Engineering Inc. — 144-Unit Townhouse case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/144-unit-townhouse` },
  openGraph: {
    title: `144-Unit Townhouse | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — 144-Unit Townhouse case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/144-unit-townhouse`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
