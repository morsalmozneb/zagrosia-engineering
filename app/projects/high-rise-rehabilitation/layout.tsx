import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "High-Rise Rehabilitation",
  description: "Zagrosia Engineering Inc. — High-Rise Rehabilitation case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/high-rise-rehabilitation` },
  openGraph: {
    title: `High-Rise Rehabilitation | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — High-Rise Rehabilitation case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/high-rise-rehabilitation`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
