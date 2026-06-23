import Image from "next/image"

const articles = [
  {
    id: 1,
    title: "BCBC 2024 Seismic Requirements",
    description: "Key changes in the 2024 BC Building Code seismic provisions and what they mean for your projects.",
    image: "/images/Blog-pic-1.png",
  },
  {
    id: 2,
    title: "How Python is Transforming Structural Practice",
    description: "From automated calculations to AI-powered report reviews, the tools changing how engineers work.",
    image: "/images/Blog-pic-2.png",
  },
  {
    id: 3,
    title: "Top 5 Strategies for the EGBC NPPE Exam",
    description: "Practical advice for internationally trained engineers preparing for Canada's professional practice exam.",
    image: "/images/Blog-pic-3.png",
  },
]

const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
  <div>
    {/* Mobile */}
    <article className="flex overflow-hidden lg:hidden" style={{ width: "319px", height: "89px", borderRadius: "20px", backgroundColor: "#FCFCFC", boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)", backdropFilter: "blur(61.5px)", WebkitBackdropFilter: "blur(61.5px)" }}>
      <div className="flex flex-col justify-center flex-1 min-w-0 px-3 py-2">
        <h3 className="font-medium leading-[1.2] tracking-[0.08em] text-[#2d2d2d] mb-1" style={{ fontSize: "11px" }}>
          {article.title}
        </h3>
        <p className="leading-[1.4] tracking-[0.08em] text-[#4f4f4f]" style={{ fontSize: "9px" }}>
          {article.description}
        </p>
      </div>
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "100px", borderRadius: "0 20px 20px 0" }}>
        <Image src={article.image} alt={article.title} fill className="object-cover object-center" />
      </div>
    </article>

    {/* Desktop */}
    <article
      className="hidden lg:flex items-stretch rounded-[19px] bg-[#fcfcfc] overflow-hidden"
      style={{
        boxShadow: "0 4px 19.6px 0px rgba(0,0,0,0.34)",
        backdropFilter: "blur(61.5px)",
        WebkitBackdropFilter: "blur(61.5px)",
      }}
    >
      <div className="min-w-0 flex-1 flex flex-col px-5 py-5">
        <h3 className="mb-3 text-[24px] leading-[1.28] font-medium tracking-[0.12em] text-[#2d2d2d]">
          {article.title}
        </h3>
        <p className="text-[16px] leading-[1.45] tracking-[0.12em] text-[#4f4f4f]">
          {article.description}
        </p>
        <a href="/blog" className="mt-4 inline-block text-[14px] tracking-[0.1em] text-[#1f69d7] underline">Read More</a>
      </div>
      <div className="relative w-[220px] flex-shrink-0 overflow-hidden rounded-r-[19px]">
        <Image src={article.image} alt={article.title} fill className="object-cover object-center" />
      </div>
    </article>
  </div>
)

export function EngineeringBlog() {
  return (
    <section id="blog" className="bg-[#fcfcfc] pb-14">

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-8 pt-8">
        <h2 className="zag-heading mb-5 leading-none text-[#2d2d2d]" style={{ fontSize: "20px" }}>ENGINEERING BLOG</h2>
        <p className="mb-8 max-w-[292px] leading-[1.5] tracking-[0.17em] text-[#2d2d2d]" style={{ fontSize: "12px" }}>
          Technical insights and practical guidance from a practicing P.Eng. with 35+ years of experience.
        </p>
        <div className="space-y-4">
          {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
        <div className="mt-8">
          <a
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-[#2d2d2d] text-[#2d2d2d] tracking-[0.06em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
            style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
          >
            View All Articles
          </a>
        </div>
      </div>

      {/* ── DESKTOP: stacked ── */}
      <div className="sidebar-content hidden lg:block lg:pt-16 lg:pb-16 zag-desktop-content-pad">
        <h2 className="zag-heading mb-5 text-[32px] leading-[1.1] text-[#2d2d2d]">ENGINEERING BLOG</h2>
        <p className="mb-8 leading-[1.65] tracking-[0.14em] text-[#2d2d2d] whitespace-nowrap" style={{ fontSize: "16px" }}>
          Technical insights and practical guidance from a practicing P.Eng. with 35+ years of experience.
        </p>
        <div className="mb-8 space-y-4">
          {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
        <a
          href="/blog"
          className="zag-outline-button min-h-[48px] w-[240px] whitespace-nowrap border-[#2d2d2d] px-0 tracking-[0.18em] text-[#2d2d2d] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          style={{ fontSize: "16px" }}
        >
          View All Articles
        </a>
      </div>
    </section>
  )
}
