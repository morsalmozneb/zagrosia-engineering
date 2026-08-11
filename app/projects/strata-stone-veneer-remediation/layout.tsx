import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Strata Stone Veneer Remediation",
  description: "Zagrosia Engineering Inc. — Strata Stone Veneer Remediation case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/strata-stone-veneer-remediation` },
  openGraph: {
    title: `Strata Stone Veneer Remediation | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Strata Stone Veneer Remediation case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/strata-stone-veneer-remediation`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
