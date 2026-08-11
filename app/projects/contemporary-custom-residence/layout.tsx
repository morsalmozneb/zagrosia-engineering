import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contemporary Custom Residence",
  description: "Zagrosia Engineering Inc. — Contemporary Custom Residence case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/contemporary-custom-residence` },
  openGraph: {
    title: `Contemporary Custom Residence | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Contemporary Custom Residence case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/contemporary-custom-residence`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
