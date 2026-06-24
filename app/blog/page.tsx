import { AboutPageHeader } from "@/components/about-page-header"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <main className="w-full overflow-hidden bg-[#FCFCFC] lg:overflow-visible lg:shadow-none">
      <div className="relative">
        <AboutPageHeader />
        <BlogSection />
      </div>
      <Footer />
    </main>
  )
}
