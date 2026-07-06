"use client"

/**
 * scroll-reveal.tsx
 * Shared scroll-triggered animation primitives used across all home-page sections.
 *
 * Variants:
 *   fadeUp   — opacity 0→1, y 24→0  (default, headings + text)
 *   fadeBlur — opacity 0→1, blur 8px→0, y 16→0  (cards, images)
 *   fadeLeft — opacity 0→1, x -32→0  (left-edge content)
 *   fadeRight— opacity 0→1, x  32→0  (right-edge content)
 *   scaleUp  — opacity 0→1, scale 0.92→1  (CTA buttons, stat numbers)
 *   lineGrow — scaleY/scaleX 0→1  (decorative lines)
 *
 * Usage:
 *   <Reveal>          — single element, fadeUp
 *   <Reveal variant="fadeBlur" delay={0.2}>
 *   <StaggerReveal staggerDelay={0.08}>
 *     <div> ... </div>
 *     <div> ... </div>
 *   </StaggerReveal>
 */

import { motion, useReducedMotion, Variants, useInView } from "framer-motion"
import React, { ReactNode, useEffect, useRef, useState } from "react"

const EASE = [0.0, 0.0, 0.2, 1] as const

// ─── Variant definitions ────────────────────────────────────────────────────

const variantMap: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28, filter: "blur(0px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeBlur: {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -32, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 32, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.88, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  lineGrowY: {
    hidden: { scaleY: 0, opacity: 1 },
    visible: { scaleY: 1, opacity: 1 },
  },
  lineGrowX: {
    hidden: { scaleX: 0, opacity: 1 },
    visible: { scaleX: 1, opacity: 1 },
  },
}

// ─── Reveal ─────────────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode
  variant?: keyof typeof variantMap
  delay?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  as?: keyof React.JSX.IntrinsicElements
  once?: boolean
  amount?: number
}

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.65,
  className,
  style,
  as,
  once = false,
  amount = 0.15,
}: RevealProps) {
  const reducedMotion = useReducedMotion()
  const Tag = (as ? motion[as as keyof typeof motion] : motion.div) as typeof motion.div

  if (reducedMotion) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <Tag
      className={className}
      style={style}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

// ─── StaggerReveal ───────────────────────────────────────────────────────────

interface StaggerRevealProps {
  children: ReactNode
  staggerDelay?: number
  baseDelay?: number
  variant?: keyof typeof variantMap
  duration?: number
  className?: string
  style?: React.CSSProperties
  once?: boolean
  amount?: number
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  variant = "fadeUp",
  duration = 0.6,
  className,
  style,
  once = false,
  amount = 0.1,
}: StaggerRevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className} style={style}>{children}</div>
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {(children as ReactNode[])
        ? (Array.isArray(children) ? children : [children]).map((child, i) => (
          <motion.div
            key={i}
            variants={variantMap[variant]}
            transition={{ duration, ease: EASE }}
          >
            {child}
          </motion.div>
        ))
        : children}
    </motion.div>
  )
}

// ─── CountUp (for stat numbers) ─────────────────────────────────────────────

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export function CountUp({ end, suffix = "", duration = 1.6, className, style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })
  const [value, setValue] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || reducedMotion) { setValue(end); return }
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration, reducedMotion])

  return (
    <span ref={ref} className={className} style={style}>
      {value}{suffix}
    </span>
  )
}
