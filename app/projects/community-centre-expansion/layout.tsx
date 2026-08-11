import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Community Centre Expansion",
  description: "Zagrosia Engineering Inc. — Community Centre Expansion case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/community-centre-expansion` },
  openGraph: {
    title: `Community Centre Expansion | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Community Centre Expansion case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/community-centre-expansion`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
