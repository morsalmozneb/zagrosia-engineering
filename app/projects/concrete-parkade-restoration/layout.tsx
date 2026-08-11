import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Concrete Parkade Restoration",
  description: "Zagrosia Engineering Inc. — Concrete Parkade Restoration case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/concrete-parkade-restoration` },
  openGraph: {
    title: `Concrete Parkade Restoration | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Concrete Parkade Restoration case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/concrete-parkade-restoration`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
