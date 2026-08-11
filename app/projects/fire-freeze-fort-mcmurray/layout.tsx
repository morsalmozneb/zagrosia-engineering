import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fire & Freeze Fort McMurray",
  description: "Zagrosia Engineering Inc. — Fire & Freeze Fort McMurray case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/fire-freeze-fort-mcmurray` },
  openGraph: {
    title: `Fire & Freeze Fort McMurray | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Fire & Freeze Fort McMurray case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/fire-freeze-fort-mcmurray`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
