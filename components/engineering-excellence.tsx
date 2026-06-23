import Image from "next/image"

export function EngineeringExcellence() {
  return (
    <section className="bg-[#fcfcfc] px-6 pt-10 pb-0 lg:px-0 lg:pt-0 lg:pb-0 lg:mb-0 mb-8">

      {/* ── MOBILE layout ── */}
      <div className="relative h-[427px] overflow-hidden lg:hidden">

        {/* Text content */}
        <div className="max-w-[175px]">
          <h2 className="zag-heading mb-5 leading-[1.22] text-[#2d2d2d]" style={{ fontSize: "20px" }}>
            ENGINEERING
            <br />
            EXCELLENCE
            <br />
            REDEFINED
          </h2>
          <p className="leading-[1.56] tracking-[0.12em] text-[#3a3a3a]" style={{ fontSize: "12px" }}>
            Seyed Hassan Mozneb brings 35+ years of structural engineering expertise, combining traditional engineering excellence with modern AI-driven workflows. Specializing in seismic assessments, building rehabilitation, industrial racking systems, and specialty structural reviews, his work is guided by BCBC, NBCC, and EGBC standards.
          </p>
        </div>

        {/* Photo + line */}
        <div className="absolute right-[-10px] top-[-20px] w-[165px]">
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/homayoun-pic-mobile.png"
              alt="Seyed Hassan Mozneb"
              fill
              className="object-contain object-bottom object-center"
            />
          </div>
          {/* Line sticking to bottom of photo */}
          <div className="h-[2px] bg-black -mt-[5px] ml-[3px]" style={{ width: "200px" }} />
          {/* Stats — same offset and width as line */}
          <div className="flex justify-between mt-3 ml-[3px] pr-[40px] text-[#2d2d2d]" style={{ width: "200px" }}>
            <div>
              <p className="font-semibold tracking-[0.08em]" style={{ fontSize: "14px" }}>35+</p>
              <p className="mt-1 tracking-[0.18em] text-[#4a4a4a]" style={{ fontSize: "10px" }}>Experience</p>
            </div>
            <div>
              <p className="font-semibold tracking-[0.08em]" style={{ fontSize: "14px" }}>200+</p>
              <p className="mt-1 tracking-[0.18em] text-[#4a4a4a]" style={{ fontSize: "10px" }}>Projects</p>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="absolute left-0 top-[387px]">
          <a
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-[#2d2d2d] text-[#2d2d2d] tracking-[0.06em] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
            style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
          >
            Learn More
          </a>
        </div>

      </div>

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:grid lg:grid-cols-2">

        {/* Left: text */}
        <div
          className="sidebar-content flex flex-col justify-center py-12"
          style={{ paddingLeft: "var(--desktop-grid-content-start)", paddingRight: "60px" }}
        >
          <h2 className="zag-heading mb-8 text-[32px] leading-[1.1] text-[#2d2d2d]">
            ENGINEERING
            <br />
            EXCELLENCE
            <br />
            REDEFINED
          </h2>

          <p className="mb-6 leading-[1.75] tracking-[0.12em] text-[#3a3a3a]" style={{ fontSize: "16px" }}>
            Seyed Hassan Mozneb brings 35+ years of structural engineering expertise, combining traditional engineering excellence with modern AI-driven workflows.
          </p>

          <p className="mb-10 leading-[1.75] tracking-[0.12em] text-[#3a3a3a]" style={{ fontSize: "16px" }}>
            Specializing in seismic assessments, building rehabilitation, industrial racking systems, and specialty structural reviews, his work is guided by BCBC, NBCC, and EGBC standards.
          </p>

          <a
            href="/contact"
            className="zag-outline-button w-[164px] border-[#2d2d2d] px-0 text-[10px] tracking-[0.18em] text-[#2d2d2d] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          >
            Contact Us
          </a>
        </div>

        {/* Right: founder photo + line + stats */}
        <div className="flex flex-col justify-center bg-[#fcfcfc] px-12">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: "320px", height: "400px" }}>
              <Image
                src="/images/homayoun-pic.png"
                alt="Seyed Hassan Mozneb"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>
          {/* Black line immediately under the photo — extends to right page edge */}
          <div className="-mr-12 flex justify-end">
            <div className="h-[3px] bg-[#2d2d2d]" style={{ width: "599px" }} />
          </div>
          {/* Stats below the line */}
          <div className="flex justify-center gap-[90px] pt-6">
            <div>
              <p className="text-[28px] font-semibold tracking-[0.06em] text-[#2d2d2d]">25+</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] text-[#4a4a4a]">Experience</p>
            </div>
            <div>
              <p className="text-[28px] font-semibold tracking-[0.06em] text-[#2d2d2d]">200+</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] text-[#4a4a4a]">Projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
