export function ServicesCTASection() {
  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-5 pb-14 pt-10">
        <h2
          className="mb-6 uppercase leading-[1.15] tracking-[0.12em] text-[#2D2D2D]"
          style={{ fontSize: "20px", fontWeight: 600, fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
        >
          NEED A CUSTOM SOLUTION?
        </h2>

        <p className="mb-8 leading-[1.85] tracking-[0.06em] text-[#2D2D2D]" style={{ fontSize: "12px" }}>
          Every project is unique. Contact us to discuss your specific requirements, and discover how we can help.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-[#2D2D2D] bg-transparent tracking-[0.06em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
        >
          Request a Service
        </a>
      </div>

      {/* ── DESKTOP CTA — compact stacked, matches wireframe ── */}
      <div className="hidden lg:block">
        <div className="pt-[8px] pb-[50px] zag-desktop-content-pad">
          <div className="max-w-[760px]">
            <h2
              className="mb-5 text-[28px] font-light uppercase leading-[1.15] tracking-[0.14em] text-[#2D2D2D]"
            >
              NEED A CUSTOM SOLUTION?
            </h2>
            <p className="mb-7 text-[12px] leading-[1.75] tracking-[0.10em] text-[#2D2D2D]">
              Every project is unique. Contact us to discuss your specific requirements, and Discover how we can help.
            </p>
            <a
              href="/contact"
              className="inline-flex h-[40px] items-center rounded-full border border-[#2D2D2D] bg-transparent px-6 tracking-[0.14em] text-[#2D2D2D] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white whitespace-nowrap" style={{ fontSize: "14px" }}
            >
              Request a Service
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
