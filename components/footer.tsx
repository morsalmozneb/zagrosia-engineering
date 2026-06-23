import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="bg-[#000000] py-8 text-[#FCFCFC] lg:py-10">
      <div className="sidebar-content px-8 zag-desktop-content-pad">

      {/* ── DESKTOP: Row 1 — logo + tagline + P.ENG ── */}
      <div className="hidden lg:block mb-8">
        <div className="mb-4">
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/images/zagrosia-logo.svg"
              alt="Zagrosia Engineering Inc."
              width={148}
              height={34}
              className="h-auto w-[148px]"
            />
          </Link>
        </div>

        <h3 className="mb-3 text-[16px] font-medium tracking-[0.12em] text-[#FCFCFC]">Engineered to Solve</h3>
        <p className="mb-6 text-[13px] leading-[1.55] tracking-[0.1em] text-[#FCFCFC]/78">
          A next-generation structural engineering ecosystem, combining 35+ years of expertise with AI automation, education, and industry partnerships across Western Canada.
        </p>

        <div className="flex text-[13px] leading-[1.4] tracking-[0.1em] text-[#FCFCFC]/80">
          <div className="pr-6">
            <span className="font-medium text-[#FCFCFC]">P.ENG</span>
            <br />British Columbia
          </div>
          <div className="border-l border-[#FCFCFC]/22 px-6">
            <span className="font-medium text-[#FCFCFC]">P.ENG</span>
            <br />Alberta
          </div>
          <div className="border-l border-[#FCFCFC]/22 pl-6">
            <span className="font-medium text-[#FCFCFC]">P.ENG</span>
            <br />Saskatchewan
          </div>
        </div>
      </div>

      {/* ── DESKTOP: Row 2 — Services / Platform / Contact ── */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12 lg:mb-8">

        {/* Services */}
        <div>
          <h4 className="mb-3 font-medium tracking-[0.12em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Services</h4>
          <ul className="space-y-[6px] tracking-[0.1em] text-[#FCFCFC]/78" style={{ fontSize: "13px" }}>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Structural Design</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Seismic Assessment</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Rehabilitation</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Racking Systems</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Building Envelope</Link></li>
            <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Specialty Reviews</Link></li>
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h4 className="mb-3 font-medium tracking-[0.12em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Platform</h4>
          <ul className="space-y-[6px] tracking-[0.1em] text-[#FCFCFC]/78" style={{ fontSize: "13px" }}>
            <li><Link href="/ai-lab" className="hover:text-[#FCFCFC] transition-colors">AI Automation Lab</Link></li>
            <li><Link href="/academy" className="hover:text-[#FCFCFC] transition-colors">EGBC Exam Prep</Link></li>
            <li><Link href="/projects" className="hover:text-[#FCFCFC] transition-colors">Project Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-[#FCFCFC] transition-colors">Blog</Link></li>
            <li><Link href="/about" className="hover:text-[#FCFCFC] transition-colors">About</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 font-medium tracking-[0.12em] text-[#FCFCFC]" style={{ fontSize: "14px" }}>Contact</h4>
          <ul className="space-y-[6px] tracking-[0.1em] mb-5" style={{ fontSize: "13px" }}>
            <li><a href="tel:+17783171043" className="text-[#0052A5] hover:text-[#2b73bf]">+1 (778) 317-1043</a></li>
            <li><a href="mailto:shmozneb@zagrosia.ca" className="text-[#0052A5] hover:text-[#2b73bf]">shmozneb@zagrosia.ca</a></li>
            <li><a href="https://www.zagrosia.ca" className="text-[#0052A5] hover:text-[#2b73bf]">www.zagrosia.ca</a></li>
          </ul>
          <Link
            href="/contact"
            className="zag-outline-button min-h-[36px] w-[140px] whitespace-nowrap border-[#FCFCFC] px-0 text-[10px] tracking-[0.18em] text-[#FCFCFC] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* ── MOBILE: logo + tagline ── */}
      <div className="lg:hidden mb-8 -mt-[35px]">
        <div className="mb-8">
          <Link href="/" aria-label="Go to homepage">
            <Image src="/images/zagrosia-logo.svg" alt="Zagrosia Engineering Inc." width={172} height={40} className="h-auto w-[172px]" />
          </Link>
        </div>
        <h3 className="mb-5 text-[12px] font-medium tracking-[0.14em] text-[#FCFCFC] -mt-[50px]">Engineered to Solve</h3>
        <p className="mb-[20px] max-w-[305px] text-[11px] leading-[1.46] tracking-[0.14em] text-[#FCFCFC]/78">
          A next-generation structural engineering ecosystem, combining 35+ years of expertise with AI automation, education, and industry partnerships across Western Canada.
        </p>
        <div className="mb-12 flex text-[11px] leading-[1.25] tracking-[0.13em] text-[#FCFCFC]/80">
          <div className="pr-4"><span className="font-medium text-[#FCFCFC]">P.ENG</span><br />British Columbia</div>
          <div className="border-l border-[#FCFCFC]/22 px-4"><span className="font-medium text-[#FCFCFC]">P.ENG</span><br />Alberta</div>
          <div className="border-l border-[#FCFCFC]/22 pl-4"><span className="font-medium text-[#FCFCFC]">P.ENG</span><br />Saskatchewan</div>
        </div>
      </div>

      {/* ── MOBILE-only sections ── */}
      <div className="lg:hidden">
        <div className="mb-11 flex gap-12">
          <div>
            <h4 className="mb-4 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Services</h4>
            <ul className="space-y-[10px] text-[11px] tracking-[0.15em] text-[#FCFCFC]/78">
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Structural Design</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Seismic Assessment</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Rehabilitation</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Racking Systems</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Building Envelope</Link></li>
              <li><Link href="/services" className="hover:text-[#FCFCFC] transition-colors">Specialty Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Platform</h4>
            <ul className="space-y-[10px] text-[11px] tracking-[0.15em] text-[#FCFCFC]/78">
              <li><Link href="/ai-lab" className="hover:text-[#FCFCFC] transition-colors">AI Automation Lab</Link></li>
              <li><Link href="/academy" className="hover:text-[#FCFCFC] transition-colors">EGBC Exam Prep</Link></li>
              <li><Link href="/projects" className="hover:text-[#FCFCFC] transition-colors">Project Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-[#FCFCFC] transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-[#FCFCFC] transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="mb-11">
          <h4 className="mb-4 text-[13px] font-medium tracking-[0.14em] text-[#FCFCFC]">Contact</h4>
          <div className="flex items-center justify-between">
            <ul className="space-y-[10px] text-[11px] tracking-[0.15em]">
              <li><a href="tel:+17783171043" className="text-[#0052A5] hover:text-[#2b73bf]">+1 (778) 317-1043</a></li>
              <li><a href="mailto:shmozneb@zagrosia.ca" className="text-[#0052A5] hover:text-[#2b73bf]">shmozneb@zagrosia.ca</a></li>
              <li><a href="https://www.zagrosia.ca" className="text-[#0052A5] hover:text-[#2b73bf]">www.zagrosia.ca</a></li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#FCFCFC] text-[#FCFCFC] tracking-[0.06em] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white flex-shrink-0"
              style={{ fontSize: "9.5px", width: "142px", height: "40px" }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright — both layouts */}
      <div className="border-t border-[#FCFCFC]/12 pt-5">
        <p className="max-w-[310px] leading-[1.42] tracking-[0.11em] text-[#FCFCFC]/46 lg:max-w-none" style={{ fontSize: "6px" }}>
          2025 Zagrosia Engineering Inc. — All rights reserved. Founded by Seyed Hassan Mozneb, M.Sc., P.Eng.
        </p>
      </div>

      </div>
    </footer>
  )
}
