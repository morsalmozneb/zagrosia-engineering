import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Union Park EPS 5773",
  description: "Zagrosia Engineering Inc. — Union Park EPS 5773 case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/union-park-eps-5773` },
  openGraph: {
    title: `Union Park EPS 5773 | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Union Park EPS 5773 case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/union-park-eps-5773`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
