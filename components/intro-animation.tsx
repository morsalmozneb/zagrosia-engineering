"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// ── Timing constants (seconds) ──────────────────────────────────────────────
const TOTAL   = 2.5    // total keyframe duration
const UNMOUNT = 2550   // ms — component unmounts (TOTAL + 50ms buffer)

// Logo opacity keyframes over TOTAL seconds:
//   0 → fade in → hold → fade out → 0
// fade-in completes at ~0.43s (0.17 × 2.5)
// fade-out starts  at ~2.15s (0.86 × 2.5), lasts 0.35s
const LOGO_TIMES: number[] = [0, 0.17, 0.86, 1.0]

// Scale keyframes: 0.92 → 1.0 (easeOut over ~0.55s), then holds
const SCALE_TIMES: number[] = [0, 0.22, 0.86, 1.0]

// Exit starts at 1.9s → CSS blur transition (0.6s) clears by 2.5s = TOTAL ✓
const EXIT_MS = 1900

export function IntroAnimation() {
  const [done,      setDone]      = useState(false)
  const [unblurred, setUnblurred] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setUnblurred(true), EXIT_MS)
    const t2 = setTimeout(() => {
      setDone(true)
      if (typeof window !== "undefined") {
        ;(window as Window & { __introComplete?: boolean }).__introComplete = true
        window.dispatchEvent(new CustomEvent("introComplete"))
      }
    }, UNMOUNT)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (done) return null

  return (
    <div
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        99999,
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >

      {/* ══════════════════════════════════════════════════════
          1. HOMEPAGE BLUR
          Transparent div — backdrop-filter blurs the homepage
          without covering it. Logo sits above, unaffected.
          On exit: 0.6s CSS transition clears both blur + dim.
      ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position:              "absolute",
          inset:                 0,
          backdropFilter:        unblurred
            ? "blur(0px) brightness(1)"
            : "blur(40px) brightness(0.82)",
          WebkitBackdropFilter:  unblurred
            ? "blur(0px) brightness(1)"
            : "blur(40px) brightness(0.82)",
          transition:
            "backdrop-filter 0.6s ease-out, -webkit-backdrop-filter 0.6s ease-out",
        }}
      />

      {/* ══════════════════════════════════════════════════════
          2. RADIAL SPOTLIGHT
          Feathered center-to-edge gradient. Slightly brighter
          at centre, slightly darker at edges. Appears and
          disappears in sync with the logo.
          Not a glow — just natural depth.
      ══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: TOTAL, times: LOGO_TIMES, ease: "easeInOut" }}
        style={{
          position:   "absolute",
          inset:      0,
          background:
            "radial-gradient(ellipse 62% 52% at 50% 50%, " +
            "rgba(255,255,255,0.055) 0%, " +
            "transparent 52%, " +
            "rgba(0,0,0,0.13) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ══════════════════════════════════════════════════════
          3. DRAFTING LINE
          Single continuous path, 2 precise 90° turns.
          Enters left edge near logo height → turns up left
          of logo → exits right above logo.
          Appears briefly as it draws, fades before the exit.
      ══════════════════════════════════════════════════════ */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <motion.path
          d="M -10 472 L 590 472 L 590 298 L 1460 298"
          fill="none"
          stroke="rgba(255,255,255,0.52)"
          strokeWidth="0.7"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity:    [0, 0.52, 0.52, 0],
          }}
          transition={{
            pathLength: {
              duration: 1.4,
              delay:    0.35,
              ease:     [0.4, 0, 0.2, 1],
            },
            opacity: {
              duration: TOTAL,
              times:    [0, 0.17, 0.76, 1],
              ease:     "linear",
            },
          }}
        />
      </svg>

      {/* ══════════════════════════════════════════════════════
          4. LOGO — scale entrance + shimmer
      ══════════════════════════════════════════════════════ */}
      <div
        style={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}
      >
        {/*
          Scale: 0.96 → 1.0, easeOut, completes in ~0.85s.
          Opacity: 0 → 1 → hold → 0, synced via LOGO_TIMES.
          No bounce, no overshoot — gentle and expensive.
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale:   [0.92, 1, 1, 1],
          }}
          transition={{
            opacity: {
              duration: TOTAL,
              times:    LOGO_TIMES,
              ease:     "easeInOut",
            },
            scale: {
              duration: TOTAL,
              times:    SCALE_TIMES,
              ease:     [0.0, 0.0, 0.2, 1],  // pure easeOut
            },
          }}
          style={{ position: "relative" }}
        >
          {/*
            overflow:hidden clips the shimmer to the logo bounds.
            The shimmer never bleeds outside the logo area.
          */}
          <div style={{ position: "relative", width: "270px", overflow: "hidden" }}>
            <Image
              src="/images/zagrosia-logo.svg"
              alt="Zagrosia Engineering"
              width={270}
              height={135}
              priority
              style={{
                width:   "270px",
                height:  "auto",
                display: "block",
                // Subtle contrast lift — makes the logo read cleanly
                // against the heavily blurred background. No colour shift.
                filter:  "contrast(1.07) saturate(1.04)",
              }}
            />

            {/*
              Shimmer — polished steel catching light.
              Sweeps left → right once, 0.65s, after logo is visible.
              Extremely subtle. mix-blend-mode:overlay confines it
              to non-transparent parts of the logo.
            */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "260%" }}
              transition={{
                duration: 0.65,
                delay:    0.6,              // starts just after logo fully appears
                ease:     [0.4, 0, 0.6, 1], // smooth deceleration
              }}
              style={{
                position:     "absolute",
                top:          0,
                bottom:       0,
                left:         0,
                width:        "50%",
                background:
                  "linear-gradient(90deg, " +
                  "transparent 0%, " +
                  "rgba(255,255,255,0.14) 50%, " +
                  "transparent 100%)",
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>
      </div>

    </div>
  )
}
