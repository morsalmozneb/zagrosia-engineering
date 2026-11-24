"use client"

import { useEffect, useRef } from "react"
import { useInView, useReducedMotion } from "framer-motion"

/**
 * The founder walks toward the camera and folds his arms. The clip is shot on plain white,
 * so it is multiplied onto the page colour and the white disappears (no box around him).
 * It plays once each time the section scrolls into view and then holds the last frame.
 */
export function FounderVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduce) {
      // no motion: show the finished pose
      const toEnd = () => { try { v.currentTime = v.duration } catch {} }
      if (v.readyState >= 1) toEnd()
      else v.addEventListener("loadedmetadata", toEnd, { once: true })
      return
    }
    if (inView) {
      try { v.currentTime = 0 } catch {}
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView, reduce])

  return (
    <video
      ref={ref}
      className={className}
      src="/videos/founder-walk.mp4"
      poster="/videos/founder-walk-poster.jpg"
      muted
      playsInline
      preload="auto"
      aria-label="Seyed Hassan Mozneb"
      style={{ mixBlendMode: "multiply" }}
    />
  )
}
