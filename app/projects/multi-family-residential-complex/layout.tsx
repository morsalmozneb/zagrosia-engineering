import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Multi-Family Residential Complex",
  description: "Zagrosia Engineering Inc. — Multi-Family Residential Complex case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/multi-family-residential-complex` },
  openGraph: {
    title: `Multi-Family Residential Complex | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Multi-Family Residential Complex case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/multi-family-residential-complex`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
