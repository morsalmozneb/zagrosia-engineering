"use client"

/**
 * CtaButton — drop-in replacement for <a> / <button> CTA elements.
 *
 * Three stacked effects:
 *  1. Magnetic pull  — button drifts toward the cursor while hovered (spring physics)
 *  2. Shimmer sweep  — diagonal light brushes across on hover-enter
 *  3. Spring press   — scale-down snap on tap/click, springs back immediately
 *
 * Usage (same API as a plain <a>):
 *   <CtaButton href="/contact" className="... rounded-full ...">Contact Us</CtaButton>
 *   <CtaButton as="button" onClick={fn} className="...">Submit</CtaButton>
 */

import { useRef, useState, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"

// ─── Props ────────────────────────────────────────────────────────────────────

interface BaseProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

interface AsAnchor extends BaseProps {
  as?: "a"
  href?: string
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  type?: never
  disabled?: never
}

interface AsButton extends BaseProps {
  as: "button"
  href?: never
  target?: never
  rel?: never
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

type CtaButtonProps = AsAnchor | AsButton

// ─── Component ───────────────────────────────────────────────────────────────

export function CtaButton({
  as,
  href,
  target,
  rel,
  type,
  disabled,
  onClick,
  className = "",
  style,
  children,
}: CtaButtonProps) {
  const reducedMotion = useReducedMotion()
  const elRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  // Shimmer overlay — diagonal white streak sweeps left → right on hover
  const shimmer = reducedMotion ? null : (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0"
      style={{
        left: "-8%",
        width: "52%",
        background:
          "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.22) 55%, transparent 100%)",
        transform: "skewX(-14deg)",
        zIndex: 1,
      }}
      initial={{ x: "-160%" }}
      animate={hovered ? { x: "320%" } : { x: "-160%" }}
      transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
    />
  )

  const sharedProps = {
    className: `relative overflow-hidden ${className}`.trim(),
    style,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: handleMouseLeave,
    whileHover: reducedMotion ? undefined : { backgroundColor: "#0052A5", borderColor: "#0052A5", color: "#ffffff" },
    whileTap: reducedMotion ? undefined : { scale: 0.95 },
    transition: reducedMotion ? undefined : {
      backgroundColor: { duration: 0.18, ease: "easeInOut" },
      borderColor:     { duration: 0.18, ease: "easeInOut" },
      color:           { duration: 0.14, ease: "easeInOut" },
      scale: { type: "spring" as const, stiffness: 420, damping: 24, mass: 0.4 },
    },
  }

  if (as === "button" || (!href && !as)) {
    return (
      <motion.button
        {...sharedProps}
        ref={elRef as React.Ref<HTMLButtonElement>}
        type={type ?? "button"}
        disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      >
        {shimmer}
        {children}
      </motion.button>
    )
  }

  return (
    <motion.a
      {...sharedProps}
      ref={elRef as React.Ref<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
    >
      {shimmer}
      {children}
    </motion.a>
  )
}
