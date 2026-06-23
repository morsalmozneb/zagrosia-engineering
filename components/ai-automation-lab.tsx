export function AIAutomationLab() {
  return (
    <section id="ai-lab" className="bg-black px-8 py-14 text-white lg:py-20 zag-desktop-content-pad">
      <div className="sidebar-content">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="zag-heading text-[22px] leading-[1.18] lg:text-[32px] lg:leading-[1.1]">
          AI &
          <br />
          AUTOMATION
          <br />
          LAB
        </h2>
      </div>

      {/* Description */}
      <p className="mb-10 text-[11px] leading-[1.65] tracking-[0.1em] text-white/78 lg:text-[16px]">
        Where structural engineering meets artificial intelligence. Custom Python scripts, VBA automation, and AI-powered platforms that transform how engineering firms operate.
      </p>

      {/* Stats */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <p className="text-[22px] font-semibold tracking-[0.08em] text-white lg:text-[32px]">500+</p>
          <p className="mt-1 text-[11px] lg:text-[24px] tracking-[0.18em] text-white/78">Videos</p>
        </div>
        <div>
          <p className="text-[22px] font-semibold tracking-[0.08em] text-white lg:text-[32px]">150+</p>
          <p className="mt-1 text-[11px] lg:text-[24px] tracking-[0.18em] text-white/78">Subjects</p>
        </div>
        <div>
          <p className="text-[22px] font-semibold tracking-[0.08em] text-white lg:text-[32px]">200+</p>
          <p className="mt-1 text-[11px] tracking-[0.18em] text-white/78">Views</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <a
          href="/contact"
          className="zag-outline-button whitespace-nowrap border-white px-6 tracking-[0.14em] text-white transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white lg:px-8" style={{ fontSize: "14px" }}
        >
          Request a Service
        </a>
        <a
          href="/ai-lab"
          className="zag-outline-button whitespace-nowrap border-white px-6 tracking-[0.14em] text-white transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white lg:px-8" style={{ fontSize: "14px" }}
        >
          Learn More
        </a>
      </div>

      </div>
    </section>
  )
}
