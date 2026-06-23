import Image from "next/image"
import { Header } from "./header"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black lg:min-h-[1460px]">

      {/* ── VIDEO — background layer, locked at left:0, never transforms ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="hero-video hero-bg video-wrapper absolute top-0 left-0 right-0 h-screen w-full object-cover lg:-top-[140px] lg:bottom-auto lg:h-[1060px]"
        style={{ objectPosition: "50% 0%" }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAY — mobile only ── */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.16) 24%, rgba(0,0,0,0.36) 46%, rgba(0,0,0,0.68) 64%, rgba(0,0,0,0.92) 82%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* ── OVERLAY — desktop: smooth fade across video ── */}
      <div
        className="hidden lg:block absolute pointer-events-none z-10"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: "920px",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0.70) 78%, rgba(0,0,0,1) 92%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* ── HEADER — content layer, shifts with sidebar on desktop ── */}
      <div className="hero-content" style={{ position: "relative", zIndex: 50 }}>
        <Header />
      </div>

      {/* ════════════════════════════════════
          MOBILE CONTENT
      ════════════════════════════════════ */}
      <div className="lg:hidden relative z-30 flex flex-col min-h-screen">

        {/* Content area — grows above the building */}
        <div className="flex flex-1 flex-col pl-10 pr-6 pt-28">

          {/* Heading */}
          <div className="mb-3">
            <h1 className="font-sans font-bold tracking-tight">
              <span className="block text-[#2D2D2D] text-[32px] leading-[1.08]">STRUCTURAL</span>
              <span className="block text-[#2D2D2D] text-[32px] leading-[1.05] mt-1">ENGINEERING</span>
            </h1>
            <p className="text-[#FCFCFC]/70 text-[14px] tracking-[0.38em] mt-3 font-light">
              INTELLIGENCE
            </p>
          </div>

          {/* Line + credentials + description + buttons — single wrapper so line spans everything */}
          <div className="relative pl-8 flex-1 flex flex-col pb-6">
            <div
              className="absolute left-0 top-0 w-px pointer-events-none"
              style={{
                height: "100%",
                background: "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(252,252,252,0.6) 60%, rgba(252,252,252,0) 100%)",
              }}
            />

            {/* 35 YEARS */}
            <span className="text-[#FCFCFC] text-[14px] font-light tracking-[0.22em]">35 YEARS</span>

            {/* P.ENG rows — no gap from 35 YEARS */}
            <div className="mt-[2px] space-y-[3px] text-[#FCFCFC] text-[9.5px] tracking-[0.24em] font-sans">
              <p>P.ENG BC</p>
              <p>P.ENG ALBERTA</p>
              <p>P.ENG SASK</p>
            </div>

            {/* M.Sc. rows — no gap from P.ENG */}
            <div className="mt-[3px] space-y-[3px] text-[#FCFCFC] text-[9.5px] tracking-[0.24em] font-sans">
              <p>M.Sc. STRUCTURAL</p>
              <p>EGBC COMPLIANT</p>
            </div>

            {/* Description — small fixed gap from credentials */}
            <div className="mt-4 space-y-3">
              <p className="text-[#FCFCFC] text-[12px] font-mono leading-[1.75] tracking-[0.04em]">
                Engineering Excellence · Intelligent Structural Design · Seismic Expertise · AI-Driven Innovation
              </p>
              <p className="text-[#FCFCFC]/78 text-[12px] font-sans leading-[1.72] tracking-[0.04em]">
                Bridging structural engineering with advanced automation and modern digital workflows.
              </p>
            </div>

            {/* CTA Buttons — pushed to bottom */}
            <div className="mt-auto pt-4 flex gap-3">
              <a href="/projects" className="flex-1 bg-[#FCFCFC] text-[#2D2D2D] font-medium py-3 px-5 rounded-full text-center hover:bg-[#FCFCFC]/90 transition-colors tracking-[0.06em] text-[9.5px]">
                View Projects
              </a>
              <a href="/contact" className="flex-1 border border-[#FCFCFC] text-[#FCFCFC] font-medium py-3 px-5 rounded-full text-center hover:bg-[#94B8DC]/30 transition-colors tracking-[0.06em] text-[9.5px]">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Building image — just the tip visible at bottom of viewport */}
        <div className="relative w-full flex-shrink-0 bg-black" style={{ height: "70px" }}>
          <div
            className="absolute inset-x-0 top-0 h-[40px] z-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)" }}
          />
          <Image
            src="/images/architectural-building.png"
            alt="Modern architectural building"
            fill
            className="object-cover object-top"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,1) 100%)" }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — BUILDING IMAGE
          Above main gradient overlay (z-20), below text (z-30).
          Sits at the bottom of the section, visible over the dark area.
      ══════════════════════════════════════════ */}
      <div
        className="hidden lg:block absolute pointer-events-none"
        style={{ left: 0, top: "840px", bottom: 0, width: "75%", zIndex: 20 }}
      >
        <Image
          src="/images/architectural-building.png"
          alt="Modern architectural building"
          fill
          className="object-cover"
          style={{ objectPosition: "left top" }}
          priority
        />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — UNIFIED CONTENT
          Single flow: heading → line → 35 YEARS →
          M.Sc. → EGBC → descriptions → buttons
      ══════════════════════════════════════════ */}
      <div
        className="hero-content hidden lg:block relative z-30 pr-[60px] pt-[154px] pb-20"
        style={{ paddingLeft: "calc(var(--desktop-grid-content-start) + 4px)" }}
      >
        <div className="max-w-[700px]">

          {/* Heading */}
          <h1 className="font-sans font-bold tracking-tight">
            <span className="block text-[#FCFCFC]" style={{ fontSize: "65px", lineHeight: 1.02 }}>
              STRUCTURAL
            </span>
            <span className="mt-[2px] block text-[#2D2D2D]" style={{ fontSize: "65px", lineHeight: 1.01 }}>
              ENGINEERING
            </span>
          </h1>

          <p className="mt-6 text-[#FCFCFC] font-light" style={{ fontSize: "36px", letterSpacing: "0.34em" }}>
            INTELLIGENCE
          </p>

          {/* Vertical line block — line fades from 100% → 0% at buttons */}
          <div className="relative mt-10 pl-8">
            <div
              className="absolute left-0 top-0 w-px pointer-events-none"
              style={{
                height: "calc(100% - 48px)",
                background: "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(252,252,252,0.6) 55%, rgba(252,252,252,0) 100%)",
              }}
            />

            {/* 35 YEARS */}
            <p className="text-[#FCFCFC]" style={{ fontSize: "24px", letterSpacing: "0.2em" }}>
              35 YEARS
            </p>

            {/* M.Sc. STRUCTURAL — 4 lines down */}
            <p
              className="text-[#FCFCFC]"
              style={{ fontSize: "18px", letterSpacing: "0.22em", marginTop: "76px" }}
            >
              M.Sc. STRUCTURAL
            </p>

            {/* EGBC COMPLIANT — 2 lines down */}
            <p
              className="text-[#FCFCFC]"
              style={{ fontSize: "18px", letterSpacing: "0.22em", marginTop: "38px" }}
            >
              EGBC COMPLIANT
            </p>

            {/* Descriptions — 4 lines down */}
            <div style={{ marginTop: "76px" }}>
              <p className="font-mono text-[#FCFCFC]" style={{ fontSize: "18px", lineHeight: 1.65, letterSpacing: "0.02em" }}>
                Engineering Excellence · Intelligent Structural Design · Seismic Expertise · AI-Driven Innovation
              </p>
              <p className="font-sans text-[#FCFCFC]/80" style={{ fontSize: "18px", lineHeight: 1.6, letterSpacing: "0.03em", marginTop: "14px" }}>
                Bridging structural engineering with advanced automation and modern digital workflows.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex gap-3">
              <a
                href="/projects"
                className="inline-flex items-center rounded-full bg-[#FCFCFC] px-6 py-[11px] text-[14px] font-medium tracking-[0.04em] text-[#2D2D2D] transition-colors hover:bg-[#94B8DC] hover:text-white"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-full border border-[#FCFCFC] px-6 py-[11px] text-[14px] font-medium tracking-[0.04em] text-[#FCFCFC] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
