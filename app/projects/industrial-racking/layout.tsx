import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industrial Racking",
  description: "Zagrosia Engineering Inc. — Industrial Racking case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/industrial-racking` },
  openGraph: {
    title: `Industrial Racking | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Industrial Racking case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/industrial-racking`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
