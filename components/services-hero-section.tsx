"use client"

import { ServicesTabs } from "./services-tabs"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "./scroll-reveal"

const EASE = [0.0, 0.0, 0.2, 1] as const

const GRADIENT_BORDER = "linear-gradient(135deg, rgba(45,45,45,1) 0%, rgba(45,45,45,0.56) 26%, rgba(147,147,147,0.22) 100%)"
const CLOSED_FILL = "linear-gradient(to right, rgba(45,45,45,1) 0%, rgba(115,115,115,0.22) 100%)"

export function ServicesHeroSection() {
  const reducedMotion = useReducedMotion()
  return (
    <section className="bg-[#FCFCFC] text-[#2D2D2D]">
      <div className="lg:hidden px-6 pb-10 pt-24">
        <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
          <p className="mb-4 text-[12px] font-medium tracking-[0.1em] text-[#2D2D2D]">
            CORE SERVICES
          </p>
        </Reveal>

        <div className="relative pl-5">
          <motion.div
            className="absolute left-0 top-[8px] w-[1.5px]"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{
              height: "calc(100% - 8px)",
              transformOrigin: "top",
              background:
                "linear-gradient(to bottom, rgba(45,45,45,1) 0%, rgba(45,45,45,0.8) 30%, rgba(45,45,45,0.4) 65%, rgba(45,45,45,0) 100%)",
            }}
          />

          <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
            <h2
              className="mb-5 text-[24px] font-black uppercase leading-[1.1] tracking-[0.04em]"
              style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}
              aria-hidden="true"
            >
              <span className="text-[#2D2D2D]">ENGINEERING</span>
              <br />
              <span className="text-[#0052A5]">SOLUTIONS</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2} duration={0.65}>
            <p className="mb-7 text-[12px] leading-[1.75] tracking-[0.08em] text-[#2D2D2D]">
              From new structural design to complex rehabilitation, every engagement backed by 35+ years of expertise.
            </p>
          </Reveal>

          <ServicesTabs />
        </div>

        <Reveal variant="fadeBlur" delay={0.1} duration={0.85} className="-mx-6 overflow-visible" style={{ marginTop: "-4px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/services-building-mobile.png"
            alt="Teal glass building"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <div style={{ width: "360px", height: "2px", backgroundColor: "#000000" }} />
        </Reveal>
      </div>

      {/* ── DESKTOP ── */}
      <div className="sidebar-content hidden lg:block">
        <div className="pt-[148px] pb-14 zag-desktop-content-pad">

          {/* Same structure as home page Engineering Solutions */}
          <div className="relative pl-5 lg:max-w-[1240px]">

            {/* Vertical fading line — runs through heading + accordion */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[4px]"
              initial={reducedMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{
                transformOrigin: "top",
                background: "linear-gradient(180deg, #0B0E0A 0%, rgba(150,150,150,0) 100%)",
              }}
            />

            {/* Label */}
            <Reveal variant="fadeUp" delay={0.05} duration={0.6}>
              <p className="mb-[20px] text-[20px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]">
                SERVICES WE OFFER
              </p>
            </Reveal>

            {/* Heading */}
            <Reveal variant="fadeLeft" delay={0.1} duration={0.7}>
              <h1 className="mb-5 text-[40px] font-bold uppercase leading-[1.05] tracking-[0.03em]" style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif" }}>
                <span className="mb-[8px] block text-[#2D2D2D]">ENGINEERING</span>
                <span className="block text-[#0052A5]">SOLUTIONS</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.2} duration={0.65}>
              <p className="mb-7 leading-[1.75] tracking-[0.04em] text-[#2D2D2D]" style={{ fontSize: "17px", lineHeight: 1.65 }}>
                From new structural design to complex rehabilitation, every engagement backed by 35+ years of expertise.
              </p>
            </Reveal>

            {/* Accordion */}
            <div className="w-full">
              <ServicesTabs />
            </div>

          </div>
        </div>

        {/* Building image — contained, aligned to the content edge, no overlap with the accordion */}
        <Reveal variant="fadeBlur" delay={0.1} duration={0.9} className="pt-16 pb-[96px]">
          <div style={{ marginLeft: "var(--desktop-grid-content-start)", width: "min(1000px, calc(100% - var(--desktop-grid-content-start)))" }}>
            <Image
              src="/images/services-building-cutout.png"
              alt="Teal glass building"
              width={1200}
              height={800}
              className="block h-auto w-full"
              style={{ objectFit: "contain", objectPosition: "left bottom" }}
            />
            <div className="h-[3px] w-full bg-[#000000]" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
