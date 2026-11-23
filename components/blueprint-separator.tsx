"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

const BRAND_BLUE = "#0052A5"

// Small version of the engineer's seal, stamped on the drawing once it is "built"
function Seal({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
      <defs>
        <path id="sep-seal-top" d="M 23.6,81 A 42,42 0 1 1 96.4,81" />
        <path id="sep-seal-bottom" d="M 18.4,84 A 48,48 0 0 0 101.6,84" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#fff" fillOpacity="0.92" />
      <g fill="none" stroke={BRAND_BLUE}>
        <circle cx="60" cy="60" r="56" strokeWidth="2.6" />
        <circle cx="60" cy="60" r="52" strokeWidth="1" />
        <circle cx="60" cy="60" r="33" strokeWidth="1" />
      </g>
      <g fill={BRAND_BLUE} fontFamily="Inter, Arial, sans-serif" fontWeight="700">
        <text fontSize="8" letterSpacing="0.9"><textPath href="#sep-seal-top" startOffset="50%" textAnchor="middle">PROFESSIONAL ENGINEER</textPath></text>
        <text fontSize="8" letterSpacing="1.2"><textPath href="#sep-seal-bottom" startOffset="50%" textAnchor="middle">SIGNED &amp; SEALED</textPath></text>
        <text x="60" y="68" fontSize="20" textAnchor="middle" letterSpacing="0.4">P.ENG</text>
      </g>
    </svg>
  )
}

// Ruler ticks (small every 20px, long every 100px), drawn with gradients so there is no extra markup
const RULER =
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.75) 0 1px, transparent 1px 20px)," +
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.95) 0 1px, transparent 1px 100px)"

/**
 * Full-width strip between two home sections: the building starts as a blueprint and
 * is "built" from left to right as the visitor scrolls, then the P.Eng seal is stamped on it.
 */
export function BlueprintSeparator() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.18"] })
  // how much of the real building is revealed (0 = pure blueprint, 1 = finished)
  const p = useTransform(scrollYProgress, [0, 1], [0.06, 1])
  const clip = useTransform(p, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`)
  const lineLeft = useTransform(p, (v) => `${v * 100}%`)
  const lineOpacity = useTransform(p, [0.06, 0.12, 0.94, 1], [0, 1, 1, 0])
  const stampOpacity = useTransform(p, [0.9, 0.97], [0, 1])
  const stampScale = useTransform(p, [0.9, 0.97, 1], [1.6, 0.94, 1])
  const stampRotate = useTransform(p, [0.9, 1], [-26, -8])

  const photo = (
    <Image
      src="/images/home-separator-townhouse.jpg"
      alt="Townhouse complex built by Zagrosia, shown as an architectural blueprint on the left turning into the finished building on the right"
      fill
      sizes="100vw"
      className="object-cover object-[50%_38%]"
    />
  )

  return (
    <div
      ref={ref}
      className="relative mt-6 aspect-[1.8/1] w-full overflow-hidden bg-[#06214d] lg:mb-16 lg:mt-0 lg:aspect-[3.1/1]"
      style={{ borderBottom: `3px solid ${BRAND_BLUE}` }}
    >
      {/* 1. The blueprint: the same picture, drawn in blue */}
      <div className="absolute inset-0" style={{ filter: "grayscale(1) contrast(1.15) brightness(0.8)" }}>
        {photo}
      </div>
      <div className="absolute inset-0" style={{ background: "#0b3d8f", mixBlendMode: "color" }} />
      <div className="absolute inset-0" style={{ background: "rgba(6,33,77,0.55)" }} />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* 2. The finished building, revealed from the left */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath: clip }}>
        {photo}
      </motion.div>

      {/* 3. Scan line with a handle where the drawing becomes the building */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute bottom-0 top-0 z-10 w-px"
          style={{ left: lineLeft, opacity: lineOpacity, background: "rgba(255,255,255,0.95)", boxShadow: "0 0 14px 2px rgba(80,160,255,0.75)" }}
        >
          <span
            className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-[#0052A5]/90 text-white backdrop-blur-sm"
            aria-hidden
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4 2 8l4 4M10 4l4 4-4 4" />
            </svg>
          </span>
        </motion.div>
      )}

      {/* 4. Drafting details: ruler along the top, corner marks, small labels */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[10px]" style={{ backgroundImage: RULER, backgroundSize: "100% 6px, 100% 10px", backgroundRepeat: "no-repeat" }} />
      <div className="zag-ticks pointer-events-none absolute inset-3 z-20 hidden lg:block" aria-hidden />

      {/* 5. The P.Eng seal is stamped on the finished building */}
      <motion.div
        className="pointer-events-none absolute bottom-4 right-4 z-20 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] lg:bottom-6 lg:right-6"
        style={reduce ? undefined : { opacity: stampOpacity, scale: stampScale, rotate: stampRotate }}
      >
        <span className="block lg:hidden"><Seal size={64} /></span>
        <span className="hidden lg:block"><Seal size={92} /></span>
      </motion.div>

      {/* 6. Project caption */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 flex items-stretch gap-3 lg:bottom-6 lg:left-[calc(var(--desktop-grid-content-start)-8px)]">
        <span className="w-[3px] rounded-full bg-white/90" aria-hidden />
        <div className="text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.55)]">
          <p className="text-[14px] font-semibold tracking-[0.12em] lg:text-[16px]">TOWNHOUSE COMPLEX</p>
          <p className="mt-[2px] text-[12px] tracking-[0.08em] text-white/85 lg:text-[14px]">Zagrosia Project</p>
        </div>
      </div>
    </div>
  )
}
