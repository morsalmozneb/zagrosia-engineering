import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Seismic Upgrade Program",
  description: "Zagrosia Engineering Inc. — Seismic Upgrade Program case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/seismic-upgrade-program` },
  openGraph: {
    title: `Seismic Upgrade Program | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Seismic Upgrade Program case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/seismic-upgrade-program`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
