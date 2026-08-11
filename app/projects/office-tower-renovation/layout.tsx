import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Office Tower Renovation",
  description: "Zagrosia Engineering Inc. — Office Tower Renovation case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/office-tower-renovation` },
  openGraph: {
    title: `Office Tower Renovation | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Office Tower Renovation case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/office-tower-renovation`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
