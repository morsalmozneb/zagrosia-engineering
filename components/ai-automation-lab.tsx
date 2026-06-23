export function AIAutomationLab() {
  return (
    <section id="ai-lab" className="bg-black px-8 py-14 text-white lg:py-20 zag-desktop-content-pad">
      <div className="sidebar-content">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="zag-heading leading-[1.18] lg:text-[32px] lg:leading-[1.1]" style={{ fontSize: "20px" }}>
          AI &
          <br />
          AUTOMATION
          <br />
          LAB
        </h2>
      </div>

      {/* Description */}
      <p className="mb-10 leading-[1.65] tracking-[0.1em] text-white/78 lg:text-[16px]" style={{ fontSize: "12px" }}>
        Where structural engineering meets artificial intelligence. Custom Python scripts, VBA automation, and AI-powered platforms that transform how engineering firms operate.
      </p>

      {/* Stats */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <p className="font-semibold tracking-[0.08em] text-white lg:text-[32px]" style={{ fontSize: "20px" }}>500+</p>
          <p className="mt-1 tracking-[0.18em] text-white/78 lg:text-[24px]" style={{ fontSize: "14px" }}>Videos</p>
        </div>
        <div>
          <p className="font-semibold tracking-[0.08em] text-white lg:text-[32px]" style={{ fontSize: "20px" }}>150+</p>
          <p className="mt-1 tracking-[0.18em] text-white/78 lg:text-[24px]" style={{ fontSize: "14px" }}>Subjects</p>
        </div>
        <div>
          <p className="font-semibold tracking-[0.08em] text-white lg:text-[32px]" style={{ fontSize: "20px" }}>200+</p>
          <p className="mt-1 tracking-[0.18em] text-white/78" style={{ fontSize: "14px" }}>Views</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-white text-white tracking-[0.06em] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] lg:h-[44px] lg:px-8 lg:text-[14px]"
          style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
        >
          Request a Service
        </a>
        <a
          href="/ai-lab"
          className="inline-flex items-center justify-center rounded-full border border-white text-white tracking-[0.06em] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] lg:h-[44px] lg:px-8 lg:text-[14px]"
          style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
        >
          Learn More
        </a>
      </div>

      </div>
    </section>
  )
}
