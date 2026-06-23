import { AboutPageHeader } from "@/components/about-page-header"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[390px] overflow-hidden bg-[#FCFCFC] shadow-[0_0_0_1px_rgba(13,44,96,0.05)] lg:max-w-none lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <BlogSection />
      </div>
      <Footer />
    </main>
  )
}
