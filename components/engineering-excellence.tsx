import Image from "next/image"

export function EngineeringExcellence() {
  return (
    <section className="bg-[#fcfcfc] px-6 pt-10 pb-12 lg:px-0 lg:pt-0 lg:pb-0">

      {/* ── MOBILE layout (unchanged) ── */}
      <div className="relative min-h-[650px] overflow-hidden lg:hidden">
        <div className="max-w-[170px]">
          <h2 className="zag-heading mb-6 text-[24px] leading-[1.22] text-[#2d2d2d]">
            ENGINEERING
            <br />
            EXCELLENCE
            <br />
            REDEFINED
          </h2>

          <p className="max-w-[170px] text-[11px] leading-[1.56] tracking-[0.18em] text-[#3a3a3a]">
            Seyed Hassan Mozneb
            brings 35+ years of
            structural engineering
            expertise, combining
            traditional engineering
            excellence with modern
            AI-driven workflows.
            Specializing in seismic
            assessments, building
            rehabilitation, industrial
            racking systems, and
            specialty structural
            reviews, his work is
            guided by BCBC, NBCC,
            and EGBC standards.
          </p>
        </div>

        <div className="absolute right-[-58px] top-[-6px] w-[282px]">
          <div className="relative h-[620px] w-full">
            <Image
              src="/images/homayoun-pic.png"
              alt="Seyed Hassan Mozneb"
              fill
              className="object-contain object-top object-right"
            />
          </div>
        </div>

        <div className="absolute left-0 top-[500px]">
          <a
            href="/about"
            className="zag-outline-button w-[164px] border-[#2d2d2d] px-0 text-[10px] tracking-[0.18em] text-[#2d2d2d] transition-colors hover:bg-[#0052A5] hover:border-[#0052A5] hover:text-white"
          >
            Learn more
          </a>
        </div>

        <div className="absolute right-[-12px] top-[430px] w-[252px] text-[#2d2d2d]">
          <div className="w-full border-t border-[#2d2d2d]" />
          <div className="flex pt-4">
            <div className="flex-1">
              <p className="text-[18px] font-semibold tracking-[0.08em]">35+</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] text-[#4a4a4a]">Experience</p>
            </div>
            <div className="flex-1">
              <p className="text-[18px] font-semibold tracking-[0.08em]">200+</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] text-[#4a4a4a]">Projects</p>
            </div>
          </div>
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
