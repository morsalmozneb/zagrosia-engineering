import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cloverdale Rec Centre",
  description: "Zagrosia Engineering Inc. — Cloverdale Rec Centre case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/cloverdale-rec-centre` },
  openGraph: {
    title: `Cloverdale Rec Centre | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Cloverdale Rec Centre case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/cloverdale-rec-centre`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
