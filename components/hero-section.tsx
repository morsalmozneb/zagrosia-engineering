"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "./header"
import { motion, useReducedMotion } from "framer-motion"
import { CtaButton } from "@/components/cta-button"

const INTEL_LETTERS = "INTELLIGENCE".split("")
const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

// ── Lower-content animation timing ───────────────────────────────────────────
const BASE = 0.5
const T = {
  line:  { delay: BASE,        duration: 0.70 },
  years: { delay: BASE + 0.15, duration: 0.45 },
  msc:   { delay: BASE + 0.40, duration: 0.45 },
  egbc:  { delay: BASE + 0.52, duration: 0.45 },
  desc:  { delay: BASE + 0.72, duration: 0.55 },
  btnA:  { delay: BASE + 1.00, duration: 0.45 },
  btnB:  { delay: BASE + 1.08, duration: 0.45 },
} as const


// ═══════════════════════════════════════════════════════════════════════════
// HeroSection
// ═══════════════════════════════════════════════════════════════════════════
export function HeroSection() {
  const [started, setStarted] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if ((window as Window & { __introComplete?: boolean }).__introComplete) {
      setStarted(true)
      return
    }
    const handler = () => setStarted(true)
    window.addEventListener("introComplete", handler)
    return () => window.removeEventListener("introComplete", handler)
  }, [])

  const vis = started ? 1 : 0

  const fadeUp = (t: { delay: number; duration: number }, y = 10) =>
    reducedMotion
      ? ({ initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } } as const)
      : ({
          initial:    { opacity: 0, y },
          animate:    { opacity: vis, y: started ? 0 : y },
          transition: { duration: t.duration, delay: t.delay, ease: EASE_OUT },
        } as const)

  const drawLine = reducedMotion
    ? ({ initial: { scaleY: 1 }, animate: { scaleY: 1 }, transition: { duration: 0 } } as const)
    : ({
        initial:    { scaleY: 0 },
        animate:    { scaleY: started ? 1 : 0 },
        transition: { duration: T.line.duration, delay: T.line.delay, ease: "easeInOut" },
      } as const)

  return (
    <section className="relative overflow-hidden bg-black lg:min-h-[1460px]">

      {/* ── VIDEO ── */}
      <video
        autoPlay loop muted playsInline preload="auto"
        disablePictureInPicture disableRemotePlayback
        className="hero-video hero-bg video-wrapper absolute top-0 left-0 right-0 h-screen w-full object-cover lg:-top-[140px] lg:bottom-auto lg:h-[1060px]"
        style={{ objectPosition: "70% 0%" }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAY mobile ── */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none z-10"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.16) 24%, rgba(0,0,0,0.36) 46%, rgba(0,0,0,0.68) 64%, rgba(0,0,0,0.92) 82%, rgba(0,0,0,1) 100%)" }}
      />

      {/* ── OVERLAY desktop ── */}
      <div
        className="hidden lg:block absolute pointer-events-none z-10"
        style={{ top: 0, left: 0, right: 0, height: "920px", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.22) 62%, rgba(0,0,0,0.70) 78%, rgba(0,0,0,1) 92%, rgba(0,0,0,1) 100%)" }}
      />

      {/* ── HEADER ── */}
      <div className="hero-content" style={{ position: "relative", zIndex: 50 }}>
        <Header />
      </div>

      {/* ════════════════════════════════════════════
          MOBILE CONTENT
      ════════════════════════════════════════════ */}
      <div className="lg:hidden relative z-30 flex flex-col min-h-screen">
        <div className="flex flex-1 flex-col pl-5 pr-6 pt-28">

          {/* Heading */}
          <div className="mb-[20px]">
            <h1 className="font-sans tracking-tight">
              <motion.span
                className="block text-[#EFEFEF] text-[32px] leading-[1.08] font-extrabold"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: vis, y: started ? 0 : 12 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >STRUCTURAL</motion.span>

              <span style={{ display: "block", overflow: "hidden", marginTop: "4px" }}>
                <motion.span
                  className="block text-[#2D2D2D] text-[32px] leading-[1.05] font-extrabold"
                  initial={{ y: "105%" }}
                  animate={{ y: started ? "0%" : "105%" }}
                  transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
                >ENGINEERING</motion.span>
              </span>
            </h1>

            <p className="text-[#FCFCFC]/70 text-[14px] tracking-[0.38em] mt-3 font-light">
              {INTEL_LETTERS.map((l, i) => (
                <motion.span key={`m-${i}`} style={{ display: "inline-block" }}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: vis, y: started ? 0 : 6 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.022, ease: EASE_OUT }}
                >{l}</motion.span>
              ))}
            </p>
          </div>

          {/* Lower content */}
          <div className="relative pl-8 flex-1 flex flex-col pb-6">
            <motion.div
              className="absolute left-0 top-0 w-px pointer-events-none"
              style={{ height: "100%", background: "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(252,252,252,0.6) 60%, rgba(252,252,252,0) 100%)", transformOrigin: "top" }}
              {...drawLine}
            />

            <motion.span className="text-[#FCFCFC] text-[14px] font-light tracking-[0.22em]" {...fadeUp(T.years)}>
              35 YEARS
            </motion.span>

            <div className="mt-[50px] space-y-[10px] text-[#FCFCFC] text-[9.5px] tracking-[0.24em] font-sans">
              <motion.p {...fadeUp(T.msc)}>P.ENG BC</motion.p>
              <motion.p {...fadeUp(T.egbc)}>P.ENG ALBERTA</motion.p>
              <motion.p {...fadeUp({ delay: T.egbc.delay + 0.12, duration: 0.45 })}>P.ENG SASK</motion.p>
            </div>

            <div className="mt-[90px] space-y-[10px] text-[#FCFCFC] text-[9.5px] tracking-[0.24em] font-sans">
              <motion.p {...fadeUp({ delay: T.msc.delay + 0.24, duration: 0.45 })}>M.Sc. STRUCTURAL</motion.p>
              <motion.p {...fadeUp({ delay: T.egbc.delay + 0.24, duration: 0.45 })}>EGBC COMPLIANT</motion.p>
            </div>

            <motion.div className="mt-[40px]" style={{ display: "flex", flexDirection: "column", gap: "8px" }} {...fadeUp(T.desc, 14)}>
              <p className="text-[#FCFCFC] font-mono leading-[1.75] tracking-[0.04em]" style={{ fontSize: "12px" }}>
                Engineering Excellence · Intelligent Structural Design · Seismic Expertise · AI-Driven Innovation
              </p>
              <p className="text-[#FCFCFC]/78 font-sans leading-[1.72] tracking-[0.04em]" style={{ fontSize: "12px" }}>
                Bridging structural engineering with advanced automation and modern digital workflows.
              </p>
            </motion.div>

            {/* Mobile CTA buttons */}
            <div className="mt-auto pt-4 flex gap-3">
              <motion.div {...fadeUp(T.btnA, 12)}>
                <CtaButton
                  href="/projects"
                  className="w-[119px] h-[40px] bg-[#FCFCFC] text-[#2D2D2D] font-medium rounded-full text-center flex items-center justify-center hover:bg-[#FCFCFC]/90 transition-colors tracking-[0.06em] text-[9.5px]"
                >
                  View Projects
                </CtaButton>
              </motion.div>
              <motion.div {...fadeUp(T.btnB, 12)}>
                <CtaButton
                  href="/contact"
                  className="w-[119px] h-[40px] border border-[#FCFCFC] text-[#FCFCFC] font-medium rounded-full text-center flex items-center justify-center hover:bg-[#94B8DC]/30 transition-colors tracking-[0.06em] text-[9.5px]"
                >
                  Contact Us
                </CtaButton>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — BUILDING IMAGE
      ══════════════════════════════════════════ */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: 0, top: "840px", bottom: 0, width: "75%", zIndex: 20 }}>
        <Image src="/images/architectural-building.png" alt="Modern architectural building" fill className="object-cover" style={{ objectPosition: "left top" }} priority />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — UNIFIED CONTENT
      ══════════════════════════════════════════ */}
      <div
        className="hero-content hidden lg:block relative z-30 pr-[60px] pt-[154px] pb-20"
        style={{ paddingLeft: "calc(var(--desktop-grid-content-start) + 4px)" }}
      >
        <div className="max-w-[700px]">

          {/* Heading */}
          <h1 className="font-sans font-bold tracking-tight">
            <motion.span
              className="block text-[#FCFCFC]"
              style={{ fontSize: "65px", lineHeight: 1.02 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: vis, y: started ? 0 : 12 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >STRUCTURAL</motion.span>

            <span style={{ display: "block", overflow: "hidden", marginTop: "2px" }}>
              <motion.span
                className="block text-[#2D2D2D]"
                style={{ fontSize: "65px", lineHeight: 1.01 }}
                initial={{ y: "105%" }}
                animate={{ y: started ? "0%" : "105%" }}
                transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
              >ENGINEERING</motion.span>
            </span>
          </h1>

          <p className="mt-6 text-[#FCFCFC] font-light" style={{ fontSize: "36px", letterSpacing: "0.34em" }}>
            {INTEL_LETTERS.map((l, i) => (
              <motion.span key={`d-${i}`} style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: vis, y: started ? 0 : 8 }}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.022, ease: EASE_OUT }}
              >{l}</motion.span>
            ))}
          </p>

          {/* Lower block */}
          <div className="relative mt-10 pl-8">

            {/* 1. Vertical line */}
            <motion.div
              className="absolute left-0 top-0 w-px pointer-events-none"
              style={{
                height: "calc(100% - 48px)",
                background: "linear-gradient(180deg, rgba(252,252,252,1) 0%, rgba(252,252,252,0.6) 55%, rgba(252,252,252,0) 100%)",
                transformOrigin: "top",
              }}
              {...drawLine}
            />

            {/* 2. 35 YEARS */}
            <motion.p className="text-[#FCFCFC]" style={{ fontSize: "24px", letterSpacing: "0.2em" }} {...fadeUp(T.years)}>
              35 YEARS
            </motion.p>

            {/* 3. M.Sc. STRUCTURAL */}
            <motion.p className="text-[#FCFCFC]" style={{ fontSize: "18px", letterSpacing: "0.22em", marginTop: "76px" }} {...fadeUp(T.msc)}>
              M.Sc. STRUCTURAL
            </motion.p>

            {/* 3b. EGBC COMPLIANT */}
            <motion.p className="text-[#FCFCFC]" style={{ fontSize: "18px", letterSpacing: "0.22em", marginTop: "38px" }} {...fadeUp(T.egbc)}>
              EGBC COMPLIANT
            </motion.p>

            {/* 4. Description */}
            <motion.div style={{ marginTop: "76px" }} {...fadeUp(T.desc, 14)}>
              <p className="font-mono text-[#FCFCFC]" style={{ fontSize: "18px", lineHeight: 1.65, letterSpacing: "0.02em" }}>
                Engineering Excellence · Intelligent Structural Design · Seismic Expertise · AI-Driven Innovation
              </p>
              <p className="font-sans text-[#FCFCFC]/80" style={{ fontSize: "18px", lineHeight: 1.6, letterSpacing: "0.03em", marginTop: "14px" }}>
                Bridging structural engineering with advanced automation and modern digital workflows.
              </p>
            </motion.div>

            {/* 5. Desktop CTA buttons */}
            <div className="mt-10 flex gap-3">
              <motion.div {...fadeUp(T.btnA, 12)}>
                <CtaButton
                  href="/projects"
                  className="inline-flex items-center rounded-full bg-[#FCFCFC] px-6 py-[11px] text-[14px] font-medium tracking-[0.04em] text-[#2D2D2D] transition-colors hover:bg-[#94B8DC] hover:text-white"
                >
                  View Projects
                </CtaButton>
              </motion.div>
              <motion.div {...fadeUp(T.btnB, 12)}>
                <CtaButton
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-[#FCFCFC] px-6 py-[11px] text-[14px] font-medium tracking-[0.04em] text-[#FCFCFC] transition-colors hover:bg-[#94B8DC] hover:border-[#94B8DC] hover:text-white"
                >
                  Contact Us
                </CtaButton>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
