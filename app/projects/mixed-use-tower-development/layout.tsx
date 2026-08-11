import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mixed-Use Tower Development",
  description: "Zagrosia Engineering Inc. — Mixed-Use Tower Development case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/mixed-use-tower-development` },
  openGraph: {
    title: `Mixed-Use Tower Development | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Mixed-Use Tower Development case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/mixed-use-tower-development`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
