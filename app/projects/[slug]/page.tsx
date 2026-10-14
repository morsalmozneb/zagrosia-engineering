import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProject, projects } from "@/lib/projects-data"
import { ProjectCaseStudy } from "@/components/project-case-study"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const title = project.title
    .toLowerCase()
    .replace(/(^|[\s/-])([a-z])/g, (_m, sep: string, ch: string) => sep + ch.toUpperCase())
  const url = `https://www.zagrosia.ca/projects/${project.slug}`
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Zagrosia Engineering`, description: project.summary, url },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return <ProjectCaseStudy project={project} />
}
