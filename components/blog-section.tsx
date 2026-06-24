"use client"

import Image from "next/image"
import { useRef, useState } from "react"

const GRAD_BORDER = "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)"
const COMPACT_GRAD_BORDER = "linear-gradient(135deg, rgba(45,45,45,0.5) 0%, rgba(147,147,147,0.18) 100%)"

const articleContent = `The BC Building Code 2024 introduces significant updates to seismic design requirements for structures across British Columbia. These changes reflect advances in earthquake engineering research and updated hazard maps based on more comprehensive ground motion data.

Key changes include updated spectral acceleration values for major urban centres including Vancouver, Victoria, and Prince George. Engineers must now account for site-specific amplification factors using the new NBCC 2020-aligned methodology.

For structural engineers, this means re-evaluating existing designs and ensuring new projects incorporate the revised load combinations. The new provisions affect both new construction and significant renovations requiring seismic upgrades.

Ductility requirements have been refined for steel moment frames and concrete shear walls. The updated code provides clearer guidance on capacity design principles, helping engineers size members more efficiently without sacrificing safety margins.

Site classification has also been updated. The new Vs30-based approach replaces older empirical methods, requiring more thorough geotechnical investigations for most project sites.

Foundation design sees notable changes as well, particularly for sites with liquefiable soils. Engineers should work closely with geotechnical consultants early in the design process to identify and mitigate seismic risks at the foundation level.`

const paragraphs = articleContent.split("\n\n")

function MobileArticleScroll({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [thumbTop, setThumbTop] = useState(0)
  const thumbHeight = 35

  function handleScroll() {
    const el = ref.current
    if (!el) return
    const scrollable = el.scrollHeight - el.clientHeight
    if (scrollable <= 0) return
    setThumbTop((el.scrollTop / scrollable) * (100 - thumbHeight))
  }

  return (
    <div className="flex gap-2">
      <div className="relative w-[3px] flex-shrink-0 self-stretch rounded-full bg-[#E8EDF4]">
        <div
          className="absolute left-0 right-0 rounded-full bg-[#0052A5]"
          style={{ top: `${thumbTop}%`, height: `${thumbHeight}%`, transition: "top 0.05s linear" }}
        />
      </div>
      <div
        ref={ref}
        onScroll={handleScroll}
        className="max-h-[200px] flex-1 overflow-y-auto pr-1 text-[10px] leading-[1.75] tracking-[0.05em] text-[#4A4A4A]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {content.split("\n\n").map((para, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
        ))}
      </div>
    </div>
  )
}

function ScrollableArticle({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [thumbTop, setThumbTop] = useState(0)
  const thumbHeight = 40

  function handleScroll() {
    const el = ref.current
    if (!el) return
    const scrollable = el.scrollHeight - el.clientHeight
    if (scrollable <= 0) return
    setThumbTop((el.scrollTop / scrollable) * (100 - thumbHeight))
  }

  return (
    <div className="flex gap-3">
      <div className="relative w-[4px] flex-shrink-0 self-stretch rounded-full bg-[#E8EDF4]">
        <div
          className="absolute left-0 right-0 rounded-full bg-[#0052A5] transition-none"
          style={{ top: `${thumbTop}%`, height: `${thumbHeight}%` }}
        />
      </div>
      <div
        ref={ref}
        onScroll={handleScroll}
        className="blog-article max-h-[280px] flex-1 overflow-y-auto leading-[1.78] tracking-[0.06em] text-[#4A4A4A]"
        style={{ fontSize: "16px", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {content.split("\n\n").map((para, i) => (
          <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
        ))}
      </div>
    </div>
  )
}

export function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [thumbTop, setThumbTop] = useState(0)
  const thumbHeight = 40
  const [openCards, setOpenCards] = useState<Set<number>>(new Set([0]))

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const scrollable = el.scrollHeight - el.clientHeight
    if (scrollable <= 0) return
    setThumbTop((el.scrollTop / scrollable) * (100 - thumbHeight))
  }

  const desktopArticles = [
    {
      category: "Seismic",
      title: "BCBC 2024 Seismic Requirements: What Every Structural Engineer Needs to Know",
      summary: "The 2024 BC Building Code introduces major updates to seismic design requirements, bringing stricter performance standards and improved earthquake resilience for buildings across British Columbia.",
      date: "May 2026",
      readTime: "8 min read",
      image: "/images/Blog-pic-1.png",
      content: `The BC Building Code 2024 introduces significant updates to seismic design requirements for structures across British Columbia. These changes reflect advances in earthquake engineering research and updated hazard maps based on more comprehensive ground motion data.

Key changes include updated spectral acceleration values for major urban centres including Vancouver, Victoria, and Prince George. Engineers must now account for site-specific amplification factors using the new NBCC 2020-aligned methodology.

For structural engineers, this means re-evaluating existing designs and ensuring new projects incorporate the revised load combinations. The new provisions affect both new construction and significant renovations requiring seismic upgrades.

Ductility requirements have been refined for steel moment frames and concrete shear walls. The updated code provides clearer guidance on capacity design principles, helping engineers size members more efficiently without sacrificing safety margins.

Site classification has also been updated. The new Vs30-based approach replaces older empirical methods, requiring more thorough geotechnical investigations for most project sites.

Foundation design sees notable changes as well, particularly for sites with liquefiable soils. Engineers should work closely with geotechnical consultants early in the design process to identify and mitigate seismic risks at the foundation level.`,
    },
    {
      category: "Technology",
      title: "How Python is Transforming Structural Engineering Practice",
      summary: "From automated calculations to AI-powered report reviews, the tools changing how engineers work.",
      date: "Apr 2026",
      readTime: "6 min read",
      image: "/images/Blog-pic-2.png",
      content: `Python has emerged as the dominant scripting language in structural engineering offices across Canada, replacing spreadsheet-driven workflows with flexible, auditable, and version-controlled analysis scripts.

The appeal is straightforward: engineers can automate repetitive calculations, generate code-compliant load combinations, and produce formatted reports in a fraction of the time. Libraries like NumPy, SciPy, and pandas handle the numerical heavy lifting, while tools like Jupyter Notebook make it easy to document assumptions alongside calculations.

At Zagrosia Engineering, Python scripts now automate seismic load generation, connection design checks, and drawing revision tracking. This reduces human error and frees engineers to focus on judgment-intensive design decisions.

Integration with software like ETABS, SAP2000, and Revit via APIs is increasingly common. Engineers can drive structural models programmatically, run parametric studies, and extract results without manual data entry.

For engineers looking to start, learning the basics of Python takes only a few weeks. The investment pays off quickly in time savings and in the confidence that comes from reproducible, peer-reviewable calculations.

The profession is shifting. Firms that embrace computational tools today will be better positioned to deliver complex projects faster and with greater accuracy in the years ahead.`,
    },
    {
      category: "EGBC",
      title: "Top 5 Strategies for Passing the EGBC NPPE Exam",
      summary: "Practical advice for internationally trained engineers preparing for Canada's professional practice exam.",
      date: "Mar 2026",
      readTime: "5 min read",
      image: "/images/Blog-pic-3.png",
      content: `The National Professional Practice Examination is a critical milestone for internationally trained engineers seeking licensure in British Columbia. With a pass rate that demands serious preparation, a structured study approach makes all the difference.

First, understand the exam format. The NPPE covers Canadian law, engineering ethics, and professional practice. It is open-book, which rewards candidates who know their references — not just the material.

Second, focus on the key references: the APEGBC Act, the Engineers and Geoscientists BC Bylaws, and the Canadian Engineering Accreditation Board guidelines. Tab and annotate these documents before exam day.

Third, practice with past questions. EGBC and third-party providers offer sample questions that closely mirror the actual exam. Time yourself and simulate exam conditions to build confidence.

Fourth, study the case studies. Ethical dilemmas and professional responsibility scenarios are consistently tested. Work through real disciplinary cases published by engineering regulators to sharpen your judgment.

Fifth, join a study group. Candidates who discuss scenarios with peers retain concepts more effectively and catch blind spots in their understanding. Many provincial associations facilitate NPPE preparation workshops.

With focused preparation over six to eight weeks, most candidates can pass on their first attempt. Treat it like a professional project: plan your schedule, allocate resources, and deliver.`,
    },
  ]

  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-5 pb-14 pt-24">

        {/* Label */}
        <p className="mb-4 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">INSIGHTS</p>

        {/* Vertical line + heading + body */}
        <div className="relative pl-[12px]">
          <div
            className="absolute left-0 top-[8px] w-px"
            style={{
              height: "calc(100% - 8px)",
              background: "linear-gradient(180deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.82) 38%, rgba(45,45,45,0.42) 72%, rgba(45,45,45,0) 100%)",
            }}
          />
          <h1
            className="mb-5 text-[24px] font-black uppercase leading-[1.25] tracking-[0.12em]"
            style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
          >
            <span className="text-[#2D2D2D]">ENGINEERING</span>
            <br />
            <span className="text-[#0052A5]">BLOG</span>
          </h1>
          <p className="mb-8 text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
            Insights, technical breakdowns, and industry updates from the Zagrosia Engineering team.
          </p>
        </div>

        {/* Mobile blog cards — interactive, matches desktop layout */}
        {desktopArticles.map((article, index) => {
          const isOpen = openCards.has(index)
          return (
            <div
              key={index}
              className="mb-[10px] rounded-[20px] bg-[#FCFCFC] p-4"
              style={{
                boxShadow: "0px 4px 19.6px 0px rgba(0,0,0,0.34)",
                backdropFilter: "blur(61.5px)",
                WebkitBackdropFilter: "blur(61.5px)",
              }}
            >
              {/* Closed state */}
              {!isOpen && (
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="mb-2 inline-block rounded-full border border-[#2D2D2D] px-3 py-[3px] text-[8px] font-semibold tracking-[0.12em] text-[#2D2D2D]">
                      {article.category}
                    </span>
                    <h2 className="mb-1 text-[12px] font-bold leading-[1.35] tracking-[0.04em] text-[#2D2D2D]">
                      {article.title}
                    </h2>
                    <p className="mb-2 text-[9px] tracking-[0.08em] text-[#0052A5]">
                      {article.date} · {article.readTime}
                    </p>
                    <p className="text-[10px] leading-[1.6] tracking-[0.04em] text-[#666]">
                      {article.summary}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setOpenCards(prev => { const next = new Set(prev); next.add(index); return next })}
                      className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-[#D0D0D0] text-[#2D2D2D] transition-colors hover:border-[#0052A5] hover:text-[#0052A5]"
                      aria-label="Expand article"
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    <div className="relative h-[90px] w-[80px] overflow-hidden rounded-[10px]">
                      <Image src={article.image} alt={article.title} fill className="object-cover object-center" />
                    </div>
                  </div>
                </div>
              )}

              {/* Open state */}
              {isOpen && (
                <>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1 min-w-0">
                      <span className="mb-2 inline-block rounded-full border border-[#0052A5] px-3 py-[3px] text-[8px] font-semibold tracking-[0.12em] text-[#0052A5]">
                        {article.category}
                      </span>
                      <h2 className="mb-1 text-[12px] font-bold leading-[1.35] tracking-[0.04em] text-[#2D2D2D]">
                        {article.title}
                      </h2>
                      <p className="text-[9px] tracking-[0.08em] text-[#0052A5]">
                        {article.date} · {article.readTime}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenCards(prev => { const next = new Set(prev); next.delete(index); return next })}
                      className="flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-full border border-[#D0D0D0] text-[#2D2D2D] transition-colors hover:border-[#0052A5] hover:text-[#0052A5]"
                      aria-label="Collapse article"
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="my-3 h-px w-full bg-[#E0E0E0]" />
                  <div className="mb-3 relative h-[160px] w-full overflow-hidden rounded-[12px]">
                    <Image src={article.image} alt={article.title} fill className="object-cover object-center" />
                  </div>
                  <MobileArticleScroll content={article.content} />
                </>
              )}
            </div>
          )
        })}

        {/* Mobile CTA */}
        <div className="mt-10">
          <p className="mb-3 text-[10px] font-medium tracking-[0.14em] text-[#2D2D2D]">GET IN TOUCH</p>
          <h2
            className="mb-6 uppercase leading-[1.45] tracking-[0.12em] text-[#2D2D2D]"
            style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
          >
            THINK WE SHOULD COVER MORE TOPICS?
          </h2>
          <p className="mb-8 text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
            Have a subject or category you'd like us to write about? We'd love to hear from you.
          </p>
          <div className="flex gap-[15px]">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.06em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              Contact Us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.06em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              Get In Touch
            </a>
          </div>
        </div>

      </div>

      <div className="sidebar-content hidden lg:block">
        <div className="w-full pt-[148px] pb-20 zag-desktop-content-pad">

          {/* Header */}
          <div className="mb-10">
            <div className="relative pl-5">
              {/* Vertical fading line */}
              <div
                className="absolute left-0 top-[4px] bottom-0 w-[4px]"
                style={{ background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)" }}
              />
              <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]">
                INSIGHTS
              </p>
              <h1
                className="text-[52px] font-bold uppercase leading-[0.96] tracking-[0.06em]"
                style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
              >
                <span className="mb-[8px] block text-[#2D2D2D]">ENGINEERING</span>
                <span className="block text-[#0052A5]">BLOG</span>
              </h1>
              <p className="mt-5 max-w-[680px] leading-[1.6] tracking-[0.08em] text-[#2D2D2D]" style={{ fontSize: "18px" }}>
                Technical insights and practical guidance from a practicing P.Eng. with 35+ years of experience.
              </p>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="flex flex-col gap-4">
            {desktopArticles.map((article, index) => {
              const isOpen = openCards.has(index)
              return (
                <div
                  key={index}
                  className="rounded-[20px] bg-[#FCFCFC] px-6 py-5 backdrop-blur-[61.5px]"
                  style={{ boxShadow: "0 4px 19.6px 0 rgba(0,0,0,0.34)" }}
                >
                  {/* Closed layout */}
                  {!isOpen && (
                    <div className="flex items-start gap-4">
                      {/* Left: text */}
                      <div className="flex-1 min-w-0">
                        <span className="mb-3 inline-block rounded-full border border-[#2D2D2D] px-3 py-[3px] text-[9px] font-semibold tracking-[0.12em] text-[#2D2D2D]">
                          {article.category}
                        </span>
                        <h2 className="text-[18px] font-bold leading-[1.25] tracking-[0.03em] text-[#2D2D2D]">
                          {article.title}
                        </h2>
                        <p className="mt-2 text-[10px] tracking-[0.1em] text-[#0052A5]">
                          {article.date} · {article.readTime}
                        </p>
                        <p className="mt-3 leading-[1.5] tracking-[0.06em] text-[#666]" style={{ fontSize: "14px" }}>
                          {article.summary}
                        </p>
                      </div>
                      {/* Middle: thumbnail */}
                      <div className="relative flex-shrink-0 overflow-hidden rounded-[12px]" style={{ width: 130, height: 130 }}>
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      {/* Right: + button (same position as - button in open state) */}
                      <button
                        type="button"
                        onClick={() => setOpenCards(prev => { const next = new Set(prev); next.add(index); return next })}
                        className="mt-1 flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full border border-[#D0D0D0] text-[#2D2D2D] transition-colors hover:border-[#0052A5] hover:text-[#0052A5]"
                        aria-label="Expand article"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Open layout */}
                  {isOpen && (
                    <>
                      <div className="flex items-start justify-between gap-6 mb-1">
                        <div className="flex-1 min-w-0">
                          <span className="mb-3 inline-block rounded-full border border-[#0052A5] px-3 py-[3px] text-[9px] font-semibold tracking-[0.12em] text-[#0052A5]">
                            {article.category}
                          </span>
                          <h2 className="text-[18px] font-bold leading-[1.25] tracking-[0.03em] text-[#2D2D2D]">
                            {article.title}
                          </h2>
                          <p className="mt-2 text-[10px] tracking-[0.1em] text-[#0052A5]">
                            {article.date} · {article.readTime}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOpenCards(prev => { const next = new Set(prev); next.delete(index); return next })}
                          className="mt-1 flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full border border-[#D0D0D0] text-[#2D2D2D] transition-colors hover:border-[#0052A5] hover:text-[#0052A5]"
                          aria-label="Collapse article"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                      <div className="my-5 h-px w-full bg-[#E0E0E0]" />
                      <div className="grid grid-cols-[1fr_300px] gap-8">
                        <ScrollableArticle content={article.content} />
                        <div className="relative overflow-hidden rounded-[12px]" style={{ minHeight: 300 }}>
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Desktop CTA ── */}
      <div className="hidden bg-[#FCFCFC] text-[#2D2D2D] lg:block">
        <div className="zag-desktop-content-pad pt-[10px] pb-[80px]">
          <h2 className="text-[32px] uppercase leading-[1.1] tracking-[0.18em] text-[#2D2D2D]">
            THINK WE SHOULD COVER MORE TOPICS?
          </h2>
          <p className="mt-[18px] text-[16px] leading-[1.45] tracking-[0.14em] text-[#2D2D2D]">
            Have a subject or category you'd like us to write about? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="mt-[26px] inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D]/50 px-[18px] tracking-[0.16em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
            style={{ fontSize: "16px" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
