import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bridge Rehabilitation Project",
  description: "Zagrosia Engineering Inc. — Bridge Rehabilitation Project case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/bridge-rehabilitation-project` },
  openGraph: {
    title: `Bridge Rehabilitation Project | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Bridge Rehabilitation Project case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/bridge-rehabilitation-project`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
