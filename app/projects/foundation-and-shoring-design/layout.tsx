import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Foundation and Shoring Design",
  description: "Zagrosia Engineering Inc. — Foundation and Shoring Design case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
  alternates: { canonical: `https://www.zagrosia.ca/projects/foundation-and-shoring-design` },
  openGraph: {
    title: `Foundation and Shoring Design | Zagrosia Engineering`,
    description: "Zagrosia Engineering Inc. — Foundation and Shoring Design case study. Licensed P.Eng structural engineers in BC, Alberta & Saskatchewan.",
    url: `https://www.zagrosia.ca/projects/foundation-and-shoring-design`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
